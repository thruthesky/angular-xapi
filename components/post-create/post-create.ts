import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './../../angular-xapi-service.module';


@Component({
    selector: 'post-create-component',
    templateUrl: 'post-create.html',
    styleUrls: ['./post-create.scss']
})

export class PostCreateComponent implements OnInit {
    @Input() category = 'No Category';
    @Input() caption = '';

    post_title;
    post_author_name;
    post_author_email;
    post_author_phone_number;
    post_password;
    post_content;
    constructor(
        public user: UserService
    ) { }

    ngOnInit() {
        
    }

    onSubmit() {

        console.log("onSubmit()");
        
    }
}
