import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'post-create-component',
    templateUrl: 'post-create.html',
    styleUrls: ['./post-create.scss']
})

export class PostCreateComponent implements OnInit {
    category = 'No Category';
    post_title;
    post_author_name;
    post_author_email;
    post_author_phone_number;
    post_password;
    post_content;
    constructor() { }

    ngOnInit() { }

    onSubmit() {

    }
}
