import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LcFormService } from 'src/app/service/lc-form.service';
import { version } from 'punycode';
import { MatDialog } from '@angular/material';
import { LCDialogComponent } from '../lc-dialog/lc-dialog.component';
import { saveAs } from 'file-saver';
import { AuditLogService } from 'src/app/service/audit-log.service';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';
import {ReturnDialogComponent} from '../return-dialog/return-dialog.component';
import { AuthorizeDialogComponent } from '../authorize-dialog/authorize-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  formIds = {
    _id: '',
    uuid: '',
    version: 0
  };

  message:string;
  @Input() lcForm: FormGroup;
  @Input() selectedTabIndex: number;
  @Output() auditLogEvent = new EventEmitter<string>();
  @Output() switchTab: EventEmitter<any> = new EventEmitter();
  @Output() saveLcFormEvent = new EventEmitter<string>();
  termsChecked:boolean;
  disableSubmitButton:boolean = true;
  role:string;
  isChecker:boolean;

  tabNumbers = {
    0 : 'general',
    1 : 'payment',
    2 : 'bank',
    3 : 'shipment',
    4 : 'narrative'
  }

  constructor(private lcFormService : LcFormService , public dialog: MatDialog, private auditLogService : AuditLogService, private sharedService : SharedService, private router: Router) {
    this.role = localStorage.getItem('role');
    if(this.role === "maker"){
      this.isChecker = false;
    }else{
      this.isChecker = true;
    }
  }

  ngOnInit() {

    // this.openDialog();
    // getting form Id form lc form component
    // console.log("footer nginit");
    // console.log(this.lcForm.value);
    // console.log("footer nginit end");
    this.lcFormService.serviceFormIds.subscribe(res => {
      this.formIds= JSON.parse(res)
    })

    this.sharedService.termsCheckedService.subscribe(res => {
      this.termsChecked= res;
      if(this.termsChecked && this.lcForm.valid){
        this.disableSubmitButton = false;
      }
      else{
        this.disableSubmitButton = true;
      }
    })

    this.sharedService.selectedIndexService.subscribe(res => {
      if(res == 5 && this.lcForm.valid && this.termsChecked){
        this.disableSubmitButton = false;
      }
      else{
        this.disableSubmitButton = true;
      }
    })

  }
  //open dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(LCDialogComponent,{
      panelClass: 'my-class',
      disableClose: true,
      data: this.lcForm.value.common_info_lc_id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAuthoriseDialog(): void{   
    const dialogRef = this.dialog.open(AuthorizeDialogComponent,{
      disableClose: true,
      panelClass: 'my-class',
      data: this.lcForm.value.common_info_lc_id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openReturnDialog(): void {
    
    const dialogRef = this.dialog.open(ReturnDialogComponent,{
      disableClose: true,
      panelClass: 'my-class',
      data: this.lcForm.value.common_info_lc_id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });


  }

  // save lc form and create new version
  // saveLcForm(){
  //   this.lcFormService.saveLcForm(this.lcForm.value, this.formIds,(
  //     response => {
  //       var res = JSON.parse(JSON.stringify(response))
  //       this.formIds._id = res.data[0]._id
  //       this.formIds.uuid = res.data[0].uuid
  //       this.formIds.version = res.data[0].version
  //     },
  //     err => {
  //       console.log("Error occured in saveLcForm"+err);
  //     }
  //   );
  // }


  // save lc form
  saveLcForm(clickedButton:string){
    if(clickedButton === 'next'){
      this.switchTab.emit(this.selectedTabIndex+1);
    }else{
      this.sendLcForm()
    }
    // this.sendAuditLogs()
    console.log('save and next get called', this.formIds)
  }

  // submit lc form
  submitLcForm(){
    var status = 'acknowledged';
    this.sendAuditLogs()
    this.lcFormService.saveLcForm(this.lcForm.value, this.formIds,(allData, err) =>{
      if(allData['data']['updateLcForm']){
        let response = allData['data']['updateLcForm'];
        this.updateStatusOfLcForm(status)
        this.openDialog();
        console.log("lc form submitted", response);
      }else{
        console.log("form not updated", allData)
      }
      if(err){
        console.log('error', err)
      }

    })
    
  }

  toggleSubmit(){
    this.termsChecked = !this.termsChecked;
    console.log("in toggle submit",this.termsChecked);
    this.sharedService.updateTermsChecked(this.termsChecked);
  }

  updateStatusOfLcForm(status:string){
    console.log(status);
    
    this.lcFormService.updateStatusOfLcForm((resp, err) => {
      if(resp['data']['updateLcForm']){
        if(status === "not_processed") {
          this.openReturnDialog();
        }else if(status === "submitted_to_bank_for_authorization") {
          this.openAuthoriseDialog();
        }
      }else{
        console.log('form not updated')
      }
      if (err) console.log(err)
    },this.formIds.uuid,status);

  }


  // downloadSwiftFile(){
  //   this.lcFormService.getSwiftFile().subscribe(
  //     data => {
  //       saveAs(data, `swift.txt`)
  //     },
  //     err => {
  //       console.error(err);
  //     }
  //   );
  // }

  // send audit logs from lc form component
  sendAuditLogs() {
    this.auditLogEvent.emit('')
  }

  // send lc form from lc form component
  sendLcForm() {
    this.saveLcFormEvent.emit('')
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

}
