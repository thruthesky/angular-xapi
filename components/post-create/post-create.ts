import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { UserService } from './../../angular-xapi-service.module';
import { ForumService } from './../../angular-xapi-service.module';
import { POST_CREATE, POST_CREATE_RESPONSE, FILES } from './../../services/defines';


@Component({
    selector: 'post-create-component',
    templateUrl: 'post-create.html',
    styleUrls: ['./post-create.scss']
})

export class PostCreateComponent implements OnInit {
    @Input() category = 'No Category';
    @Input() caption = '';
    @Output() success = new EventEmitter<number>();


    /// files
    files: FILES = [];




    ///
    post_title;
    post_author_name;
    post_author_email;
    post_author_phone_number;
    post_password;
    post_content;
    constructor(
        public user: UserService,
        public forum: ForumService
    ) { }


    ngOnInit() {
        
    }

    onSubmit() {

        console.log("onSubmit()");

        let data: POST_CREATE = {
            category: this.category,
            post_title: this.post_title,
            post_content: this.post_content,
            session_id: this.user.sessionId
        };

        data.fid = this.files.reduce((_, file) => { _.push(file.id); return _; }, []);

        console.log(data);

        this.forum.postCreate(data).subscribe((ID: POST_CREATE_RESPONSE) => {
            console.log("post create success: ID: ", ID);
            this.success.next( ID );
        }, e => {
            alert(e.message);
        });


    }
}
