import { Injectable, NgZone } from '@angular/core';
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
        private http: HttpClient,
        private zone: NgZone
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
        // data.session_id = this.user.sessionId;
        // data.route = 'post.create';
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
        // console.log("version: ");
        return this.post({ route: 'wordpress.version' });
    }



    /**
     * .set() automatically JSON.stringify()
     * .get() automatically JSON.parse()
     *
     * @return .get() returns null if there is error or the value is falsy.
     *
     */
    get(key) {
        let value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                return null;
            }
        }
        return null;
    }

    set(key, data) {
        // console.log("storage::set()", data);
        return localStorage.setItem(key, JSON.stringify(data));
    }




    /**
     * Returns true if the app is running as Cordova mobile app.
     */
    isCordova(): boolean {
        if (window['cordova']) return true;
        if (document.URL.indexOf('http://') === -1
            && document.URL.indexOf('https://') === -1) return true;
        return false;
    }

    isWeb(): boolean {
        if (document.URL.indexOf('http://') !== -1
            || document.URL.indexOf('https://') !== -1) return true;
        else return false;
    }


    
    render(timer = 10) {
        setTimeout(() => this.zone.run(() => { }), timer);
    }


}



