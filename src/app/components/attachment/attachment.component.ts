import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileHandle } from '../../directives/dragDrop.directive';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() uploadFile: EventEmitter<any> = new EventEmitter(); 
  @Output() deleteFile: EventEmitter<any> = new EventEmitter();
  @Input() attachedDocuments: any;
  @Input() progress: number;
  
  filesToUpload: Array<File> = [];
  attachedFiles: Array<any> = [];

  constructor() { }

  ngOnInit() {
    //console.log("atached___documents"+JSON.stringify(this.attachedDocuments));
    if(this.attachedDocuments){
      // Object.keys(this.attachedDocuments).forEach(key => {
      //   this.attachedFiles.push({"name":key, "progress":100});
      // });
      this.attachedDocuments.forEach(element => {
        this.attachedFiles.push({"name":element.file_name, "progress":100});
      });
    }
  }

  closeAttachment(){
    this.closeModal.emit();
  }

  filesDropped(files: FileHandle[]): void {
    this.filesToUpload = [];
    files.forEach(element => {
      this.filesToUpload.push(element.file);
      this.attachedFiles.push({"name":element.file.name, "progress":0});
    });
    this.uploadFile.emit(this.filesToUpload);
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = [];
    this.filesToUpload = <Array<File>>fileInput.target.files;
    for(var f=0;f<this.filesToUpload.length;f++){
      this.attachedFiles.push({"name":this.filesToUpload[f].name, "progress":0});
    }
    this.uploadFile.emit(this.filesToUpload);
  }

  deleteAttachedFile(fileName : string){
    var updatedFileList = {};
    this.attachedFiles.forEach(element => {
      if(element.name != fileName){
        updatedFileList[element.name]="";
      }
      else{
        this.attachedFiles.splice(this.attachedFiles.indexOf(element), 1);
      }
    });
    this.deleteFile.emit(updatedFileList);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes['progress'] !== "undefined") {
        var change = changes['progress'];
        if (!change.isFirstChange()) {
            //console.log("________________changed___________________________",this.progress);
            if(this.progress == 100){
              for(var f=0;f<this.filesToUpload.length;f++){
                //console.log("nameeeeeeeeeeeeeee"+this.filesToUpload[f].name);
                var obj = this.attachedFiles.find(x => x.name === this.filesToUpload[f].name);
                if(obj){
                  obj.progress = 100;
                }
              }
            }
        }
    }
}


}
