import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { XapiService } from './xapi';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ForumService {

    constructor(
        private x: XapiService
    ) {

    }

    postCreate(data): Observable<any> {
        data.route = 'post.create';
        // console.log(data);
        return this.x.post(data);
    }

}
