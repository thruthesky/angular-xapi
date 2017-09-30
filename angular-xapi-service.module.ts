import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { XapiService } from './services/xapi';
export { XapiService } from './services/xapi';
import { ForumService } from './services/forum.service';
export { ForumService } from './services/forum.service';
import { UserService } from './services/user.service';
export { UserService } from './services/user.service';
import { FileService } from './services/file.service';
export { FileService } from './services/file.service';

export { SERVER_ERROR_CODE } from './services/defines';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [ XapiService, ForumService, UserService, FileService ],
})
export class AngularXapiServiceModule { }
