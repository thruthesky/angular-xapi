import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface ERROR_RESPONSE {
    code: number;
    message?: string;
};

@Injectable()
export class XapiService {

    private serverUrl = '';
    constructor(
        private http: HttpClient
    ) { }

    setServerUrl(url: string): void {
        this.serverUrl = url + '/wp-json/xapi/v2/do';
        console.log("serverUrl: ", this.serverUrl);
    }
    getServerUrl(): string {
        return this.serverUrl;
    }

    post(data): Observable<any> {
        console.log('url: ', this.serverUrl);
        return this.http.post(this.serverUrl, data)
            .map(e => this.checkResult(e, data))
        // .map(e => {
        //     setTimeout(() => this.ngZone.run(() => { }), 100); // redraw the page. Angular is not 100% redraw when XHR is done.
        //     return e;
        // })
    }


    
    checkResult(res, data) {
        // console.log("res: ", res);
        if (!res) {
            console.error("Response from backend is empty");
            console.log("Requested data(that cause empty response): ", data);
            throw this.errorResponse(-4008, 'Response from backend is empty');
        }
        else if (res['code'] === void 0) throw this.errorResponse(-4009, 'Response has no code');
        else if (res['code'] !== 0) {
            // console.log("WordPressApiService::checkResult => error : ", res);
            throw this.errorResponse(res['code'], res['message']);
        }
        else return res['data'];
    }

    errorResponse(code, message?): ERROR_RESPONSE {
        if (!message) message = '';
        return { code: code, message: message };
    }

    version() {
        return this.post({route: 'wordpress.version'});
    }

}
