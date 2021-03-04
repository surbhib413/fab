import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { LcFormService } from 'src/app/service/lc-form.service';
import { HighlightTag } from 'angular-text-input-highlight';
import { PrefernceFormService } from '../../service/prefernce-form.service';
import { SharedService } from 'src/app/service/shared.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-narrative-details',
  templateUrl: './narrative-details.component.html',
  styleUrls: ['./narrative-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NarrativeDetailsComponent implements OnInit {

  fileUrl;
  hasError: boolean = false;
  // expanded: boolean = false;
  descExpanded: boolean = false;
  docsExpanded: boolean = false;
  instExpanded: boolean = false;
  payExpanded: boolean = false;
  isSwiftSelected: boolean = false;
  isChecker:boolean = false;
  showComment : string;
  lcComment : any;

  constructor(private sanitizer: DomSanitizer, private lcFormService: LcFormService,private preferenceFormService: PrefernceFormService,private sharedService : SharedService) {
    var role = localStorage.getItem('role');
    if(role === "maker"){
      this.isChecker = false;
    }else{
      this.isChecker = true;
    }
   }

  @Input() lcForm: FormGroup;
  @Input() narrative: FormGroup;

  ngOnInit() {
    this.preferenceFormService.isSwiftOpen.subscribe(res => {
      this.isSwiftSelected = res;
    });
    this.sharedService.showCommentService.subscribe(res => {
      this.showComment= res;
    });
    this.sharedService.lcCommentService.subscribe(res => {
      this.lcComment= res;
    });
    this.lcForm.get('narrative').valueChanges.pipe(debounceTime(1000)).subscribe(formData => {
      if(this.lcForm.get('narrative').valid){
        this.lcForm.get('narrative').value.valid = true;
      }else{
        this.lcForm.get('narrative').value.valid = false;
      }
    });
  }
  descExpandedArea() {
    this.descExpanded = !this.descExpanded;
  }
  docsExpandedArea() {
    this.docsExpanded = !this.docsExpanded;
  }
  instExpandedArea() {
    this.instExpanded = !this.instExpanded;
  }
  payExpandedArea() {
    this.payExpanded = !this.payExpanded;
  }

  tags1: HighlightTag[] = [];
  tags2: HighlightTag[] = [];
  tags3: HighlightTag[] = [];
  tags4: HighlightTag[] = [];

  matchMentions = /([^a-zA-Z0-9/?:().,'+-=!%&*<>;{@#_\s"])/g;
  // matchMentions = /(@\w+) ?/g;

  //Invalid Character Counting variables
  descCount = 0;
  docsCount = 0;
  instCount = 0;
  payCount = 0;

  countInvalidChar(str) {
    return ((str || '').match(this.matchMentions) || []).length
  }

  addTagsDesc() {
    this.tags1 = [];
    let mention;
    // tslint:disable-next-line
    while ((mention = this.matchMentions.exec(this.narrative.value.descriptionOfGoods))) {
      this.tags1.push({
        indices: {
          start: mention.index,
          end: mention.index + mention[1].length
        },
        data: mention[1]
      });
    }
    window.dispatchEvent(new Event('resize'));
    this.descCount = this.countInvalidChar(this.narrative.value.descriptionOfGoods);
  }

  addTagsDocs() {
    this.tags2 = [];
    let mention;
    // tslint:disable-next-line
    while ((mention = this.matchMentions.exec(this.narrative.value.documentRequired))) {
      this.tags2.push({
        indices: {
          start: mention.index,
          end: mention.index + mention[1].length
        },
        data: mention[1]
      });
    }
    window.dispatchEvent(new Event('resize'));
    this.docsCount = this.countInvalidChar(this.narrative.value.documentRequired);
  }


  addTagsInst() {
    this.tags3 = [];
    let mention;
    // tslint:disable-next-line
    while ((mention = this.matchMentions.exec(this.narrative.value.additionalInstructions))) {
      this.tags3.push({
        indices: {
          start: mention.index,
          end: mention.index + mention[1].length
        },
        data: mention[1]
      });
    }
    window.dispatchEvent(new Event('resize'));
    this.instCount = this.countInvalidChar(this.narrative.value.additionalInstructions);
  }

  addTagsPay() {
    this.tags4 = [];
    let mention;
    // tslint:disable-next-line
    while ((mention = this.matchMentions.exec(this.narrative.value.special_paymentCondition))) {
      this.tags4.push({
        indices: {
          start: mention.index,
          end: mention.index + mention[1].length
        },
        data: mention[1]
      });
    }
    window.dispatchEvent(new Event('resize'));
    this.payCount = this.countInvalidChar(this.narrative.value.special_paymentCondition);
  }

  openComment(position,fieldId,fieldName){
    this.updateCommentDetails({position:position,id:fieldId,fieldName:fieldName});
    this.sharedService.updateShowComment(fieldId);
  }

  updateCommentDetails(commentDetails) {
    this.sharedService.updateCommentDetails(commentDetails);
  }

}
