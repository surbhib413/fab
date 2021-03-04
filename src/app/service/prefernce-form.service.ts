import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefernceFormService {

  private isSwift = new BehaviorSubject<boolean>(true);
  isSwiftOpen = this.isSwift.asObservable();

  updateSwift(data: boolean){
    this.isSwift.next(data);
  }

  private isTabData = new BehaviorSubject<boolean>(true);
  isTabDataService = this.isTabData.asObservable();

  toggleData(data: boolean){
    this.isTabData.next(data);
  }

  private isLcName = new BehaviorSubject<boolean>(false);
  isisLcNameService = this.isLcName.asObservable();

  toggleLcName(data: boolean){
    this.isLcName.next(data);
  }

  private isLcNum = new BehaviorSubject<boolean>(false);
  isLcNumService = this.isLcNum.asObservable();

  toggleLcNum(data: boolean){
    this.isLcNum.next(data);
  }
  private isStatusQuo = new BehaviorSubject<boolean>(false);
  isStatusQuoService = this.isStatusQuo.asObservable();

  toggleStatusQuo(data: boolean){
    this.isStatusQuo.next(data);
  }
  private isType = new BehaviorSubject<boolean>(true);
  isisTypeService = this.isType.asObservable();

  toggleType(data: boolean){
    this.isType.next(data);
  }
  private isLcRole = new BehaviorSubject<boolean>(true);
  isLcRoleService = this.isLcRole.asObservable();

  toggleLcRole(data: boolean){
    this.isLcRole.next(data);
  }
  private isLcId = new BehaviorSubject<boolean>(true);
  isLcIdService = this.isLcId.asObservable();

  toggleLcId(data: boolean){
    this.isLcId.next(data);
  }

  private lcPerPage = new BehaviorSubject<number>(20);
  updateLcPerPageService = this.lcPerPage.asObservable();

  updatePaginator(data: number){
    this.lcPerPage.next(data);
  }
}
