import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FILE, FILES, FILE_DELETE } from './../../services/defines';
import { XapiService, FileService } from './../../angular-xapi-service.module';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
    selector: 'file-upload-component',
    templateUrl: 'file-upload.html',
    styleUrls: [ './file-upload.scss' ]
})
export class FileUploadComponent implements OnInit {

    url: string; // serverUrl
    progressPercentage = 0;
    @Input() files: FILES;
    @Input() post_password;
    @Input() title = true;
    @Input() fileSelectionButton = true;
    @Input() showUploadedFiles = true;
    @Output() success = new EventEmitter<any>();

    @Input() titleText = 'File Upload';

    constructor(
        private x: XapiService,
        public file: FileService
    ) { }

    ngOnInit() { }



    onChangeFile(evt) {
        
        //
        // if (this.x.isCordova) return;

        // console.log("onChangeFile()");
        this.file.uploadForm(evt).subscribe(event => {
            console.log(event);
            if (typeof event === 'number') {
                // console.log(`File is ${event}% uploaded.`);
                this.onProgress(event);
            }
            else if (event.id !== void 0) {
                // console.log('File is completely uploaded!');
                // console.log(event);
                this.insertFile(event);
            }
            else if (event === null) {
                // console.log("what is it?");
            }
            else if ( event['code'] ) {
                // console.log('error: ', event);
                this.onUploadFailure();
                alert( event.message );
            }
        }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                // console.log("Client-side error occured.");
            } else {
                // console.log("ERROR?", err);
                if (err.message === 'file_is_not_selected' || err.message === 'file_is_not_selected_or_file_does_not_exist') {
                    alert('File uploaded cancelled. No file was selected.');
                }
                else alert('File upload filed. Filesize is too large? ' + err.message);
            }
            this.onUploadFailure();
        });
    }


    onProgress(p: number) {
        this.progressPercentage = p;
        this.x.render();
    }

    insertFile(file) {
        this.files.push(file);
        console.log("this.files: ", this.files);
        this.progressPercentage = 0;
        this.success.emit(file);
        this.x.render();
    }

    onUploadFailure() {
        this.progressPercentage = 0;
    }


    onClickDeleteButton(file) {
        this.deleteFile(file);
    }

    deleteFile(file: FILE) {
        let data: FILE_DELETE = {};

        data.id = file.id;
        data.post_password = this.post_password;

        this.file.delete(data).subscribe(id => {
            console.log("file deleted: ", id);
            // this.files = this.files.filter( file => file.id != id ); //
            let index = this.files.findIndex( _data => _data.id === id);
            this.files.splice(index, 1);
            console.log('onClickDeleteButton::', this.files);
            this.x.render();
        }, e => alert(e));
    }


}
