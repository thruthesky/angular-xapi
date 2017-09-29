import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { XapiService } from './services/xapi';
export { XapiService } from './services/xapi';
import { ForumService } from './services/forum.service';
export { ForumService } from './services/forum.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [ XapiService, ForumService ],
})
export class AngularXapiServiceModule { }
