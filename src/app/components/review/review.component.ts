import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { saveAs } from 'file-saver';
import { LcFormService } from 'src/app/service/lc-form.service';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() lcForm: FormGroup;
  @Output() switchTab: EventEmitter<any> = new EventEmitter();
  role : string;
  isChecker:boolean;
  
  fileUrl;
  constructor(private sanitizer: DomSanitizer, private lcFormService : LcFormService) {
    this.role = localStorage.getItem('role');
    if(this.role === "maker"){
      this.isChecker = false;
    }else{
      this.isChecker = true;
    }
   }

  ngOnInit() {

  }

  // downloadSwiftFile(){
  //   console.log("in download method");
  //   this.lcFormService.getSwiftFile().subscribe(
  //     data => {
  //       saveAs(data, `swift.txt`)
  //     },
  //     err => {
  //       alert("Problem while downloading the file.");
  //       console.error(err);
  //     }
  //   );
  // }

  

  goToTab(tabNum : boolean){
    this.switchTab.emit(tabNum);
  }

  downloadFile(file_name){
    let _attached_documents_list = this.lcForm.value.attached_documents
    let temp = _attached_documents_list.filter(obj => {
      return obj.file_name == file_name
    })
    this.lcFormService.downLoadFile(temp[0].file_path).subscribe(response => {
      // console.log(response)
      // const data = 'abc'
      // const blob = new Blob([data], { type: 'application/octet-stream' });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(response));
      // console.log(this.fileUrl)
    }, err =>{
      console.log(err)
    })

    // this.fileUrl = 'http://localhost:2001/download'
  }

}
