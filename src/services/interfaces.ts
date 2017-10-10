export const SERVER_ERROR_CODE = {
    CODE_USER_NOT_FOUND_BY_THAT_EMAIL: -42053
};
export const KEY_LOGIN = 'user-login';

export interface REQUEST {
    route?: string;
    session_id?: string;
};


export interface ID {
    ID: number;
};
export interface ID_O {
    ID?: number;
};
export interface CATEGORY {
    category: string;
};
// interface CATEGORY_O {
//     category?: string;
// };



export interface FILE {
    id: number;
    type: string;          // can be 'false' if file type is not recognized.
    url: string;
    url_thumbnail?: string;
    url_thumbnail_wide?: string; // only available for the first image. @see google doc
    name: string;
};


export type FILES = Array<FILE>;

export interface FILE_DELETE extends REQUEST {
    id?: number;
    guid?: string;
    post_password?: string;
};




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



export interface USER_LOGIN_RESPONSE extends ID {
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




export interface POST_CREATE_COMMON {
    post_title: string;
    post_content?: string;
    post_content_pre?: string;              /// pre process 'post_content' by forum.service.ts that is available only on client end.
    post_password?: string;
    post_author_name?: string;             /// This is anonymous user name when a anonymous post without login.
    post_author_email?: string;            /// post_author_name, post_author_email, post_author_phone_number will only be available on create.
    post_author_phone_number?: string;     /// 'author' field will be available for reading.
    fid?: Array<number>;
    int_1?: number;
    int_2?: number;
    int_3?: number;
    char_1?: string;
    char_2?: string;
    char_3?: string;
    varchar_1?: string;
    varchar_2?: string;
    varchar_3?: string;
    varchar_4?: string;
    varchar_5?: string;
    site_preview_id?: number; /// available only
};


export interface POST_CREATE extends REQUEST, ID_O, CATEGORY, POST_CREATE_COMMON {};
export type POST_CREATE_RESPONSE = number;
