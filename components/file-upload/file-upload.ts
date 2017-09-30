import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'file-upload-component',
    templateUrl: 'file-upload.html'
})
export class FileUploadComponent implements OnInit {

    url: string; // serverUrl
    progressPercentage = 0;
    // @Input() files: FILES;
    // @Input() post_password;
    // @Input() title: boolean = true;
    // @Input() fileSelectionButton: boolean = true;
    // @Input() showUploadedFiles: boolean = true;
    // @Output() success = new EventEmitter<any>();

    @Input() titleText = 'File Upload';

    constructor() { }

    ngOnInit() { }
}
