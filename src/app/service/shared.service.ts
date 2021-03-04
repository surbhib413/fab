import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  // breadCrumbDetailsservice: any;

  constructor() { }

  private isExpandedVar = new BehaviorSubject<boolean>(false);
  isExpandedVarservice = this.isExpandedVar.asObservable();

  updateIsExpandedVar(data: boolean) {
    this.isExpandedVar.next(data);
  }

  private userId = new BehaviorSubject<string>("");
  serviceUserId = this.userId.asObservable();

  updateUserId(data: string) {
    this.userId.next(data);
  }

  appendBreadcrumb(data: boolean) {
    this.createLc.next(data);
  }

  private createLc = new BehaviorSubject<boolean>(false);
  createLcBreadcrumb = this.createLc.asObservable();

  appendLcIdInBreadcrumb(data: boolean) {
    this.lcIdBreadCrumb.next(data);
  }

  private lcIdBreadCrumb = new BehaviorSubject<boolean>(false);
  updateLcIdForBreadCrumb = this.lcIdBreadCrumb.asObservable();

  appendLcId(data: string) {
    this.lcId.next(data);
  }

  private lcId = new BehaviorSubject<string>("");
  getLcId = this.lcId.asObservable();

  // private commentId = new BehaviorSubject<string>('');
  // commentIdservice = this.commentId.asObservable();

  // updateCommentId(data: string) {
  //   this.commentId.next(data)
  // }

  private commentDetails = new BehaviorSubject("{}");
  commentDetailsservice = this.commentDetails.asObservable();

  updateCommentDetails(data: any) {
    this.commentDetails.next(data);
  }

  private lcComment = new BehaviorSubject("{}");
  lcCommentService = this.lcComment.asObservable();

  updateLcComment(data: any) {
    this.lcComment.next(data);
  }

  private showComment = new BehaviorSubject<string>("");
  showCommentService = this.showComment.asObservable();

  updateShowComment(data: string) {
    this.showComment.next(data);
  }

  private lcFormValue = new BehaviorSubject<any>("{}");
  lcFormValueService = this.lcFormValue.asObservable();

  patchLcForm(data: any) {
    this.lcFormValue.next(data);
  }

  getRole() {
    const role = localStorage.getItem("role");
    console.log("role aftr login", role);
    return role;
  }

  // setLcForm(value){
  //   this.lcFormValue=value;
  //   console.log("I am set",this.lcFormValue);
  // }

  // getLcForm(cb){
  //   console.log("I am get",this.lcFormValue);
  //   cb(this.lcFormValue);
  // }

  private termsChecked = new BehaviorSubject<boolean>(false);
  termsCheckedService = this.termsChecked.asObservable();

  updateTermsChecked(data: boolean) {
    this.termsChecked.next(data);
  }

  private selectedIndex = new BehaviorSubject<number>(0);
  selectedIndexService = this.selectedIndex.asObservable();

  updateSelectedIndex(data: number) {
    this.selectedIndex.next(data);
  }

  private bredCrumbDetails = new BehaviorSubject({
    accountService: false,
    lcDashboard: true,
    createLC: false,
    breadCrumbLcId: false
  });
  breadCrumbDetailsservice = this.bredCrumbDetails.asObservable();

  updateBreadCrumbDetails(data: any) {
    this.bredCrumbDetails.next(data);
  }

  private lcPerPage = new BehaviorSubject<number>(5);
  updateLcPerPageService = this.lcPerPage.asObservable();

  updatePaginator(data: number) {
    this.lcPerPage.next(data);
  }

  private accountTab = new BehaviorSubject<number>(0);
  accountTabService = this.accountTab.asObservable();

  updateAccountTab(data: number) {
    this.accountTab.next(data);
  }

  private fabAccountsFilter = new BehaviorSubject<boolean>(false);
  fabAccountsFilterService = this.fabAccountsFilter.asObservable();

  updateFabAccountsFilter(data: boolean) {
    this.fabAccountsFilter.next(data);
  }

  private showFilter = new BehaviorSubject<string>("");
  showFilterService = this.showFilter.asObservable();

  updateShowFilter(data: string) {
    this.showFilter.next(data);
  }


  private showAccountListFilter = new BehaviorSubject<string>("");
  showAccountListFilterService = this.showAccountListFilter.asObservable();

  updateAccountList(data: string) {
    this.showAccountListFilter.next(data);
  }


  private stackedGraph = new BehaviorSubject<boolean>(false);
  updateStackedGraphService = this.stackedGraph.asObservable();

  updateStackedGraph(data: boolean) {
    this.stackedGraph.next(data);
  }

  private heatMap = new BehaviorSubject<boolean>(false);
  updateHeatMapService = this.heatMap.asObservable();

  updateHeatMap(data: boolean) {
    this.heatMap.next(data);
  }

  private doughnutChart = new BehaviorSubject<boolean>(false);
  updateDoughnutChartService = this.doughnutChart.asObservable();

  updatedoughnutChart(data: boolean) {
    this.doughnutChart.next(data);
  }

}
