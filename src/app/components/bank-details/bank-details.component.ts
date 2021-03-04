import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LcFormService } from 'src/app/service/lc-form.service';
import { SharedService } from 'src/app/service/shared.service';
import { PrefernceFormService } from '../../service/prefernce-form.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  bankTypeArray:Array<any> = [];
  draweeDetailsArray:Array<any> = [];

  @Input() lcForm: FormGroup;
  @Input() bank: FormGroup;
  role:string;
  isChecker:boolean = false;
  lcComment : any;
  isSwiftSelected: boolean = false;
  showComment:string;

  constructor(private lcFormService: LcFormService,private sharedService : SharedService,private preferenceFormService: PrefernceFormService) {
    this.role = localStorage.getItem('role');
    if(this.role === "maker"){
      this.isChecker = false;
    }else{
      this.isChecker = true;
    }
  }

  ngOnInit() {
    this.preferenceFormService.isSwiftOpen.subscribe(res => {
      this.isSwiftSelected = res;
      })

    this.lcFormService.getBankType((res)=>{
      this.bankTypeArray=res.data.getBankType;
    })

    this.lcFormService.getBankDraweeDetails((res)=>{
      this.draweeDetailsArray=res.data.getBankDraweeDetails;
    })

    this.sharedService.lcCommentService.subscribe(res => {
      this.lcComment= res;
    })

    this.sharedService.showCommentService.subscribe(res => {
      this.showComment= res;
    })

    this.lcForm.get('bank').valueChanges.pipe(debounceTime(1000)).subscribe(formData => {
      if(this.lcForm.get('bank').valid){
        this.lcForm.get('bank').value.valid = true;
      }else{
        this.lcForm.get('bank').value.valid = false;
      }
    });
    
  }

  openComment(position,fieldId,fieldName){
    this.updateCommentDetails({position:position,id:fieldId,fieldName:fieldName});
    //this.sharedService.updateShowComment(true);
    this.sharedService.updateShowComment(fieldId);
  }

  updateCommentDetails(commentDetails) {
    this.sharedService.updateCommentDetails(commentDetails);
  }

}
