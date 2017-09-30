import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { XapiService } from './xapi.service';
import {
    KEY_LOGIN,
    REQUEST,
    USER_LOGIN, USER_LOGIN_RESPONSE,
    USER_REGISTER, USER_REGISTER_RESPONSE,
    USER_UPDATE, USER_UPDATE_RESPONSE,
    USER_CHANGE_PASSWORD,
    USER_DATA, USER_DATA_RESPONSE
} from './defines';



@Injectable()
export class UserService {

    profile: USER_LOGIN_RESPONSE = null;
    constructor(
        private x: XapiService
    ) { }




    login(user_email: string, user_pass: string): Observable<USER_LOGIN_RESPONSE> {
        let data: USER_LOGIN = {
            user_email: user_email,
            user_pass: user_pass,
            route: 'user.login',
            // timezone_offset: this.getTimezoneOffset()
        };
        return this.x.post(data)
            .map(res => this.setUserProfile(res));
    }

    logout() {
        console.log('user service::logout');
        this.rawSetUserProfile(null);
    }


    register(data: USER_REGISTER): Observable<USER_REGISTER_RESPONSE> {
        data.route = 'user.register';
        return this.x.post(data)
            .map(res => this.setUserProfile(res));
    }



    setUserProfile(res: USER_LOGIN_RESPONSE) {
        if (res && res.session_id && typeof res.session_id === 'string' && res.session_id) {
            this.rawSetUserProfile(res);
            return res;
        }
        else throw this.x.errorResponse(-35, "Error on setUserProfile(). No session id exists. It may be a wrong session id or User login failed.");
    }

    /**
     * This must only be called by setUserProfile() and logout()
     * @param data
     */
    rawSetUserProfile(data) {
        this.profile = data;
        this.x.set(KEY_LOGIN, data);
    }





    /**
     *
     * @Warning This will load user profile from localStorage.
     * @Warning So, this must be case on every bootstrap.
     * @Attention This is being called in UserService::constructor which will be called by AppService::constructor.
     *          Meaning, if you inject AppService on every module, user profile will be loaded automatically.
     */
    loadProfile() {
        let re = this.x.get(KEY_LOGIN);
        if (re === null) this.profile = <USER_LOGIN_RESPONSE>{};
        else this.profile = re;
        return this.profile;
    }




    get isLogin(): boolean {
        /// one time data load from localStorage
        if (this.profile === null) this.loadProfile();
        if (this.sessionId) return true;
        else return false;
    }

    get isLogout(): boolean {
        return !this.isLogin;
    }


    get sessionId(): string {
        if (this.profile && this.profile.session_id && typeof this.profile.session_id === 'string') return this.profile.session_id;
        else return '';
    }
    get id(): number {
        if (this.profile && this.profile.ID) return this.profile.ID;
        else return 0;
    }
    get uid(): number {
        return this.id;
    }

    get name(): string {
        if (this.profile && this.profile.display_name) return this.profile.display_name;
        else return '';
    }

    get email(): string {
        if (this.profile && this.profile.user_email) return this.profile.user_email;
        else return '';
    }

    get provider(): string {
        if (this.profile && this.profile.provider) return this.profile.provider;
        else return '';
    }
    get photoURL(): string {
        if (this.profile && this.profile.photoURL) return this.profile.photoURL;
        else return '';
    }


    get nameOrAnonymous() {
        return this.name || 'Anonymous';
    }




    update(data: USER_UPDATE): Observable<USER_UPDATE_RESPONSE> {
        data.session_id = this.sessionId;
        data.route = 'user.profile';
        return this.x.post(data)
            .map(res => this.setUserProfile(res));
    }


    changePassword(data: USER_CHANGE_PASSWORD): Observable<any> {
        data.session_id = this.sessionId;
        data.route = 'user.password';
        return this.x.post(data)
            .map(res => this.setUserProfile(res));
    }

    resign(): Observable<any> {
        let data: REQUEST = {
            session_id: this.sessionId,
            route: 'user.resign'
        };
        return this.x.post(data)
            .map(res => {
                if (res === this.email) this.logout();
                return res;
            });

    }

    data(): Observable<USER_DATA_RESPONSE> {
        let data: USER_DATA = {
            route: 'user.data',
            session_id: this.sessionId
        };
        return this.x.post(data);
    }


    update_user_meta(key, value): Observable<string> {
        let data = {
            route: 'wordpress.update_user_meta',
            session_id: this.sessionId,
            key: key,
            value: value
        };
        return this.x.post(data);
    }

    update_user_metas( keys_values ): Observable<any> {
        let data = {
            route: 'wordpress.update_user_metas',
            session_id: this.sessionId,
            keys_values: keys_values
        };
        // console.log('data', data);
        return this.x.post( data );
    }


}
