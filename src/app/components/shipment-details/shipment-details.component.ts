import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LcFormService } from 'src/app/service/lc-form.service';
import { SharedService } from 'src/app/service/shared.service';
import { Condition } from 'selenium-webdriver';
import { Conditional } from '@angular/compiler';
import {FormControl} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss']
})
export class ShipmentDetailsComponent implements OnInit {

  generalInfo_partialShipment = new FormControl();

  @Input() lcForm: FormGroup;
  @Input() shipment: FormGroup;
  addFieldDiv:boolean=false;
  role:string;
  isChecker:boolean = false;
  lcComment : any;
  showComment:string;
  partialships : string[] = [
    'Allowed',
    'Conditional',
    'Not Allowed'
  ]
  transships : string[] = [
    'Allowed',
    'Conditional',
    'Not Allowed'
  ]
  purchaseterms : string[] = [
    'CFR',
    'CPT',
    'EXW',
    'FAS',
    'FCA',
    'FOB'
  ]

  constructor(private lcFormService: LcFormService,private sharedService : SharedService) {
    this.role = localStorage.getItem('role');
    //console.log("lc form in shipment",this.lcForm.value);
    if(this.role === "maker"){
      this.isChecker = false;
      this.addFieldDiv=false;
    }else{
      this.isChecker = true;
      this.addFieldDiv=true;
    }
  }

  ngOnInit() {
    //console.log("This is  shipment checking lc Form ",this.lcForm.value);
    // this.sharedService.getLcForm(response=>{
    //   console.log("This is checking lc service",response);
    // });
    this.sharedService.lcFormValueService.subscribe(res =>{
      console.log("Final Testing",res)
      if(res != '{}')
      {
        if(res.shipment_detail.general_info.place_of_loading || res.shipment_detail.general_info.shipment_from || res.shipment_detail.general_info.place_of_discharge || res.shipment_detail.general_info.shipment_to || res.shipment_detail.general_info.partial_shipments || res.shipment_detail.general_info.transhipment || res.shipment_detail.general_info.latest_shipment_date || res.shipment_detail.general_info.purchase_terms ){
          this.addFieldDiv=true;
        }
        else{
          this.addFieldDiv=false;
        }
      }
  })

    this.sharedService.lcCommentService.subscribe(res => {
      this.lcComment= res;
    })
    this.sharedService.showCommentService.subscribe(res => {
      this.showComment= res;
    })
    this.lcForm.get('shipment').valueChanges.pipe(debounceTime(1000)).subscribe(formData => {
      if(this.lcForm.get('shipment').valid){
        this.lcForm.get('shipment').value.valid = true;
      }else{
        this.lcForm.get('shipment').value.valid = false;
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

  displayAdditonalFields(){
    this.addFieldDiv=true;
  }

}
