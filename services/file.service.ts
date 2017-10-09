import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { XapiService } from './xapi.service';
import { UserService } from './user.service';
import { FILE, FILE_DELETE } from './defines';






@Injectable()
export class FileService {

    constructor(
        private http: HttpClient,
        private x: XapiService,
        private user: UserService
    ) {

    }

    uploadForm(event): Observable<any> {

        console.log("uplodaForm");
        if (event === void 0 || event.target === void 0 || event.target.files === void 0) {
            return Observable.throw(new Error('file_is_not_selected'));
        }

        let files = event.target.files;
        if (files === void 0 || files[0] === void 0 || !files[0]) {
            return Observable.throw(new Error('file_is_not_selected_or_file_does_not_exist'));
        }
        let file = files[0];

        let formData = new FormData();
        formData.append('userfile', file, file.name);
        formData.append('route', 'file.upload');
        formData.append('session_id', this.user.sessionId);

        console.log("url: ", this.x.getServerUrl());
        console.log("data: ", formData);
        let req = new HttpRequest('POST', this.x.getServerUrl(), formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req)
            .map(e => {
                if (e instanceof HttpResponse) { // success event.
                    if ( e.status === 200 ) {
                        if ( e.body && e.body['code'] === 0) {
                            return e.body['data'];
                        }
                        else return e.body; // Return Wordpress Xapi Server error
                    }
                }
                else if ( e instanceof HttpHeaderResponse ) { // header event
                    return {};
                }
                else if (e.type === HttpEventType.UploadProgress) { // progress event
                    return Math.round(100 * e.loaded / e.total);
                }
                return e; // other events
            });

    }



    getFileType(file: FILE ) {
        if ( typeof file.type === 'string' ) return file.type.indexOf('image/') === -1 ? 'attachment' : 'image';
        else return 'attachment';
    }


    
    delete( req: FILE_DELETE ): Observable<number> {
        req.route =  'wordpress.delete_attachment';
        req.session_id = this.user.sessionId;
        return this.x.post(req);
    }
    

}
