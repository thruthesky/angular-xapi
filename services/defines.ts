export const SERVER_ERROR_CODE = {
    CODE_USER_NOT_FOUND_BY_THAT_EMAIL: -42053
};
export const KEY_LOGIN = 'user-login';

export interface REQUEST {
    route?: string;
    session_id?: string;
};

export interface FILE {
    id: number;
    type: string;          // can be 'false' if file type is not recognized.
    url: string;
    url_thumbnail?: string;
    url_thumbnail_wide?: string; // only available for the first image. @see google doc
    name: string;
};
export type FILES = Array<FILE>;

export interface USER_LOGIN {
    route?: string;
    user_email: string;
    user_pass: string;
};


export type USER_DATA = REQUEST;


export interface USER_REGISTER extends REQUEST {
    user_email: string;
    user_pass?: string;
    user_login?: string;
    name?: string;
    display_name?: string;
    mobile?: string;
    gender?: string;
    address?: string;
    birthday?: string;
    landline?: string;
    photoURL?: string;
    photo?: FILE;
};

export type USER_UPDATE = USER_REGISTER;
export type USER_DATA_RESPONSE = USER_REGISTER;



export interface USER_LOGIN_RESPONSE {
    ID: number;
    user_email: string;
    display_name: string;
    session_id: string;
    photoURL: string;
    photo: FILE;
    provider: string;
};
export type USER_REGISTER_RESPONSE = USER_LOGIN_RESPONSE;
export type USER_UPDATE_RESPONSE = USER_LOGIN_RESPONSE;





export interface USER_CHANGE_PASSWORD extends REQUEST {
    old_password: string;
    new_password: string;
};



