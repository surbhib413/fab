import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { LcFormService } from 'src/app/service/lc-form.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  id : string;
  lcComments : any;
  numOfComments : 0;
  showComments : boolean;
  fieldName : string;
  position : string;
  role:string;
  isChecker:boolean;
  // @ViewChild('commentDiv') private elementRef: ElementRef;
  @ViewChild('comment') inputComment:ElementRef;

  constructor(private sharedService : SharedService,private lcFormService : LcFormService,private datePipe: DatePipe) { 
    this.role = localStorage.getItem('role');
    if(this.role === "maker"){
      this.isChecker = false;
    }else{
      this.isChecker = true;
    }
  }

  
  
  
  ngOnInit() {

    // this.elementRef.nativeElement.focus();

    // this.sharedService.commentIdservice.subscribe(res => {
    //   this.id= res;
    // })


    this.sharedService.lcCommentService.subscribe(res => {
      this.lcComments= res;
      console.log("on init commetns",this.lcComments);
    })

    this.sharedService.commentDetailsservice.subscribe(res =>{
      var response = JSON.parse(JSON.stringify(res));
      this.id = response.id;
      this.fieldName = response.fieldName;
      this.position = response.position;
      //console.log("updated variable",this.lcComments[this.id].updated);
      if(this.lcComments[this.id].updated){
        this.lcComments[this.id].updated = false;
        var query = this.formCommentQuery();
        this.updateLcFormComment(query);
      }
    });
  
  }

  closeComment(){
    this.sharedService.updateShowComment('close');
  }

  getFormattedDate(date){
    if(date){
      return this.datePipe.transform(date,"h:mm a, d MMM y")
    }
    else{
      return '---';
    }
  }

  saveComment(comment){
    var c = {
      name : localStorage.getItem('userId'),
      profile_url:localStorage.getItem('profile_url'),
      comment : comment,
      savedOn : new Date()
    }
    this.lcComments[this.id].comments.push(c);
    if(this.isChecker){
      this.lcComments[this.id].updated = true;
    }
    else{
      this.lcComments[this.id].updated = false;
    }
    var query = this.formCommentQuery();
    //console.log("queryyyyyyyyyyyy",query);
    this.updateLcFormComment(query);
    this.inputComment.nativeElement.value = '';
  }

  updateLcFormComment(query:any){
    this.lcFormService.updateLcFormComment((response, err) => {
      if(response){
        console.log("in comment ts, received response from service layer",response);
      }
      if(err){
        console.log(err);
        this.lcComments[this.id].comments.pop();
      }
    }, query);
  }

  formCommentQuery() {
    var query ='';
    if(this.id.startsWith("general_")){
      query = 
      `general_info : {
        applicant_detail : {
          issuer_reference : {
            comments:${JSON.stringify(this.lcComments['general_applicant_issuerReference'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
            updated:${this.lcComments['general_applicant_issuerReference'].updated}
          },
          bank_name : {
            comments:${JSON.stringify(this.lcComments['general_applicant_bankName'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
            updated:${this.lcComments['general_applicant_bankName'].updated}
          },
        }
      }`;
    }
    else if(this.id.startsWith("payment_")){
      query = 
      `payment_detail:{
        amount_charges:{
          currency:{
            comments:${JSON.stringify(this.lcComments['payment_amount_currency'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
            updated:${this.lcComments['payment_amount_currency'].updated}
          },
          lc_amount:{
            comments:${JSON.stringify(this.lcComments['payment_amount_lcAmount'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
            updated:${this.lcComments['payment_amount_lcAmount'].updated}
          },
        }
      }`;
    }
    else if(this.id.startsWith("bank_")){
      query =
      `bank_other_party_detail:{
        credit_available:{
          type:{
            comments:${JSON.stringify(this.lcComments['bank_creditAvailable_type'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
            updated:${this.lcComments['bank_creditAvailable_type'].updated}
          },
          drawee_detail:{
            comments:${JSON.stringify(this.lcComments['bank_creditAvailable_draweeDetails'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
            updated:${this.lcComments['bank_creditAvailable_draweeDetails'].updated}
          },
        }
      }`;
    }
    else if(this.id.startsWith("shipment_")){
      query =
      `shipment_detail:{
        general_info:{
          named_place:{
            comments:${JSON.stringify(this.lcComments['shipment_generalInfo_namedPlace'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
            updated:${this.lcComments['shipment_generalInfo_namedPlace'].updated}
          },
          insurance_company_name:{
            comments:${JSON.stringify(this.lcComments['shipment_generalInfo_nameOfInsuranceCompany'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
            updated:${this.lcComments['shipment_generalInfo_nameOfInsuranceCompany'].updated}
          },
        }
      }`;
    }
    else if(this.id.startsWith("narrative_")){
      query =
      `narrative_detail:{
        description_of_goods:{
          comments:${JSON.stringify(this.lcComments['narrative_descriptionOfGoods'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
          updated:${this.lcComments['narrative_descriptionOfGoods'].updated}
        },
        documents_required:{
          comments:${JSON.stringify(this.lcComments['narrative_documentRequired'].comments).replace(/\"([^(\")"]+)\":/g,"$1:")},
          updated:${this.lcComments['narrative_documentRequired'].updated}
        }
      }`;
    }
    
    return query;
  }

}
