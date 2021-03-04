import { Injectable } from '@angular/core';
import { ApolloModule, Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { InMemoryCache } from 'apollo-cache-inmemory';


@Injectable({
  providedIn: 'root'
})
export class LcFormService {

  BASEURL= environment.loc_microservice
  //BASEURL = "https://34.83.143.14/loc"
  token = window.localStorage.getItem('currentUser')
  user_id = window.localStorage.getItem('userId')

  private formIdSource = new BehaviorSubject('{}');
  serviceFormIds = this.formIdSource.asObservable();
  constructor(private http: HttpClient,private apollo: Apollo, private httpLink: HttpLink) {

  }
  lcForm = {};
  shipmentDetails = {};
  narrativeDetails = {};

  updateServiceFormId(data: string) {
    this.formIdSource.next(data)
  }
 
  submitLcForm(status:string, value: any, formIds,cb) {
    
    value.active = "true";
    let user_id = localStorage.getItem('userId');
    value.shipment.period_noOfDays=null;
    value.shipment.period_narrative=null;
    // value.payment.amount_lcAmount=null;
    //console.log("----------",value.payment.amount_lcAmount)
    if(value.payment.amount_lcAmount===''){
      value.payment.amount_lcAmount = 0;
    }
    if(!formIds.version || formIds.version === undefined){
      formIds.version = 1;
    }
    if(!formIds.uuid || formIds.uuid === undefined){
      formIds.uuid = "";
    }
    value.payment.amount_variantPlus=null;
    value.payment.amount_variantMinus=null;
    value.shipment.period_narrative ='Test';
    value.shipment.period_noOfDays = 0;
    //console.log("Form Submitted Values",value);
    this.apollo
      .mutate({
        mutation: gql`mutation{
        createLcForm(
          user_id:"${user_id}",
          uuid:"${formIds.uuid}",
          version:${formIds.version},
          status:"${status}",
          valid:${value.valid},
          visited:${value.visited},
          common_info:{
            system_id:"${value.common_info_system_id}",
            initiation_date:"${value.common_info_initiation_date}",
            lc_type:"${value.common_info_lc_type}",
            lc_name:"${value.common_info_lc_name}",
            lc_id:"${value.common_info_lc_id}"
          },
          general_info:{
            applicant_detail:{
              bank_name:"${value.general.applicant_bankName}",
              issuer_reference:"${value.general.applicant_issuerReference}",
              name:"${value.general.applicant_name}",
              address_line1:"${value.general.applicant_addressLine1}",
              address_line2:"${value.general.applicant_addressLine2}",
              address_line3:"${value.general.applicant_addressLine3}",
              customer_reference:"${value.general.applicant_customerReference}",
              contract_number: "${value.general.applicant_contractNumber}",
              country: "${value.general.applicant_country}"
            },
            beneficiary_detail: {
              name: "${value.general.beneficiary_name}",
              address_line1:"${value.general.beneficiary_addressLine1}",
              address_line2:"${value.general.beneficiary_addressLine2}",
              address_line3:"${value.general.beneficiary_addressLine3}",
              country:"${value.general.beneficiary_country}"
            },
            lc_detail: {
              form_of_lc:"${value.general.lc_form}",
              form_of_lc_standby:"${value.general.lc_form_standBy}",
              expiry_date:"${value.general.lc_expiryDate}",
              place_of_expiry:"${value.general.lc_placeOfExpiry}",
              confirmation_instructions:"${value.general.lc_confirmationInstructions}",
              rules_applicable:"${value.general.lc_rulesApplicable}",
              send_lc_by:"${value.general.lc_sendLcBy}",
              principal_account:"${value.general.lc_principleAccount}",
              fee_account:"${value.general.lc_feeAccount}",
              other_info:"${value.general.lc_otherInfo}"
          },
          valid:${value.general.valid},
          visited:${value.general.visited}
        },
        payment_detail: {
          amount_charges: {
            lc_amount:${value.payment.amount_lcAmount},
            variant_plus:${value.payment.amount_variantPlus},
            variant_minus:${value.payment.amount_variantMinus},
            currency:"${value.payment.amount_currency}",
            issuing_bank_charges:"${value.payment.amount_issuingBankCharges}",
            outside_country_charges:"${value.payment.amount_outsideCountryCharges}",
            legalization_charges:"${value.payment.amount_legalizationCharges}",
            confirmation_charges:"${value.payment.amount_confirmationCharges}",
            payment_condition_for_beneficiary:"${value.payment.amount_paymentCondition}"
          },
          country:"${value.payment.amount_country}",
          valid:${value.payment.valid},
          visited:${value.payment.visited}
        },
        bank_other_party_detail: {
          advising_bank: {
            bank_name:"${value.bank.advisingBank_bankName}",
            address:"${value.bank.advisingBank_address}",
            bic_code:"${value.bank.advisingBank_bic_code}"
          },
          advise_thru_bank: {
            bank_name:"${value.bank.adviseThru_bankName}",
            address:"${value.bank.adviseThru_address}",
            bic_code:"${value.bank.adviseThru_bic_code}"
          },
          requested_confirmation_party: "${value.bank.requestedConfirmationParty}",
          credit_available: {
            type: "${value.bank.creditAvailable_type}",
            name:"${value.bank.creditAvailable_name}",
            addressLine1:"${value.bank.creditAvailable_addressLine1}",
          addressLine2:"${value.bank.creditAvailable_addressLine2}",
          addressLine3:"${value.bank.creditAvailable_addressLine3}",
            credit_available_by:"${value.bank.creditAvailable_creditAvailableBy}",
            payment_draft_at: "${value.bank.creditAvailable_paymentDraftAt}",
            drawee_detail: "${value.bank.creditAvailable_draweeDetails}"
          },
          valid:${value.bank.valid},
          visited:${value.bank.visited}
        },
        shipment_detail: {
          general_info: {
            shipment_from: "${value.shipment.generalInfo_shipmentFrom}",
            place_of_loading: "${value.shipment.generalInfo_placeOfLoading}",
            place_of_discharge: "${value.shipment.generalInfo_placeOfDischarge}",
            shipment_to: "${value.shipment.generalInfo_shipmentTo}",
            partial_shipment:"${value.shipment.generalInfo_partialShipment}",
            transhipment:"${value.shipment.generalInfo_transhipment}",
            latest_shipment_date: "${value.shipment.generalInfo_latestShipmentDate}",
            purchase_terms: "${value.shipment.generalInfo_purchaseTerms}",
            named_place:"${value.shipment.generalInfo_namedPlace}",
            insurance_company_name: "${value.shipment.generalInfo_nameOfInsuranceCompany}",
            policy_number: "${value.shipment.generalInfo_policyNumber}"
          },
          shipment_period: "${value.shipment.shipmentPeriod}",
          additional_amount:"${value.shipment.additionalAmount}",
          period_for_presentation: {
            no_of_days: ${value.shipment.period_noOfDays},
            narrative: "${value.shipment.period_narrative}"
          },
          valid:${value.shipment.valid},
          visited:${value.shipment.visited}
        },
        narrative_detail: {
          description_of_goods: """${value.narrative.descriptionOfGoods}""",
          documents_required: """${value.narrative.documentRequired}""",
          additional_instructions: """${value.narrative.additionalInstructions}""",
          special_payment_condition: """${value.narrative.special_paymentCondition}""",
          valid:${value.narrative.valid},
          visited:${value.narrative.visited}
        }
        ){
          _id
          uuid
          user_id
          status
          common_info{
            lc_name,
            lc_id,
            initiation_date,
            lc_type,
          },
          general_info{
            applicant_detail{
                bank_name
                issuer_reference
            }
          }
          version
        }
      }
      `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        }
      })
      .subscribe(res => {
        // console.log(res);
        cb(res, null);
      }, err => {
        console.log(null,err)
        cb(null, err)
      });
  }

  getLcFormDetails(uuid : string){
    let headers = new HttpHeaders().set('Authorization',  `Bearer ${this.token}`);
    // let params = new HttpParams().set("uuid",'2c6000c0-b067-11e9-a4a0-17e9fda88833');
    let params = new HttpParams().set("uuid",uuid);

    return this.http.get(this.BASEURL+'/lc_form/',{headers: headers, params: params})
  }
  updateStatusOfLcForm(cb,formID:any, status:string){

    this.apollo
    .mutate({
      mutation: gql`mutation{
      updateLcForm(
        uuid:"${formID}",
        status:"${status}"
        status_updated_at: ${Date.now()}
    ){
      user_id
      status
      status_updated_at
      general_info{
          applicant_detail{
              bank_name
              name
              issuer_reference
          }
        }
      }
    }
    `,
      context: {
        headers:{
          authorization: `Bearer ${this.token}`
        },
        uri: this.BASEURL+'/graphQl/'
      }
    })
    .subscribe(res => {
      // console.log(res);
      cb(res);
    });
}

  saveLcForm(value:any, formIds,cb){
    
    //formIds give _id uuid version 
    // value.common_info_lc_id="";
    let user_id = window.localStorage.getItem('userId')
    value.shipment.period_noOfDays=null;
    value.shipment.period_narrative=null; 
    if(value.payment.amount_lcAmount===''){
      value.payment.amount_lcAmount = 0;
    }
    if(!formIds.version || formIds.version === undefined){
      formIds.version = 1;
    }
    value.payment.amount_variantPlus=null;
    value.payment.amount_variantMinus=null;
    value.shipment.period_narrative ='Test';
    value.shipment.period_noOfDays = 0;
     //console.log("",value);
    this.apollo
    .mutate({
      mutation: gql`mutation{
      updateLcForm(
        uuid:"${formIds.uuid}",
        user_id: "${user_id}",
        common_info:{
          system_id:"${value.common_info_system_id}",
          initiation_date:"${value.common_info_initiation_date}",
          lc_type:"${value.common_info_lc_type}",
          lc_name:"${value.common_info_lc_name}",
          lc_id:"${value.common_info_lc_id}"
        },
        general_info:{
          applicant_detail:{
          bank_name:"${value.general.applicant_bankName}",
          issuer_reference:"${value.general.applicant_issuerReference}",
          name:"${value.general.applicant_name}",
          address_line1:"${value.general.applicant_addressLine1}",
          address_line2:"${value.general.applicant_addressLine2}",
          address_line3:"${value.general.applicant_addressLine3}",
          customer_reference:"${value.general.applicant_customerReference}",
          contract_number: "${value.general.applicant_contractNumber}",
          country: "${value.general.applicant_country}"

        },
        beneficiary_detail: {
          name: "${value.general.beneficiary_name}",
          address_line1:"${value.general.beneficiary_addressLine1}",
          address_line2:"${value.general.beneficiary_addressLine2}",
          address_line3:"${value.general.beneficiary_addressLine3}",
          country:"${value.general.beneficiary_country}"
        },
        lc_detail: {
          form_of_lc:"${value.general.lc_form}",
          form_of_lc_standby:"${value.general.lc_form_standBy}",
          expiry_date:"${value.general.lc_expiryDate}",
          place_of_expiry:"${value.general.lc_placeOfExpiry}",
          confirmation_instructions:"${value.general.lc_confirmationInstructions}",
          rules_applicable:"${value.general.lc_rulesApplicable}",
          send_lc_by:"${value.general.lc_sendLcBy}",
          principal_account:"${value.general.lc_principleAccount}",
          fee_account:"${value.general.lc_feeAccount}",
          other_info:"${value.general.lc_otherInfo}"
        },
        valid:${value.general.valid},
        visited:${value.general.visited}
      },
      payment_detail: {
        amount_charges: {
          lc_amount:${value.payment.amount_lcAmount},
          variant_plus:${value.payment.amount_variantPlus},
          variant_minus:${value.payment.amount_variantMinus},
          currency:"${value.payment.amount_currency}",
          issuing_bank_charges:"${value.payment.amount_issuingBankCharges}",
          outside_country_charges:"${value.payment.amount_outsideCountryCharges}",
          legalization_charges:"${value.payment.amount_legalizationCharges}",
          confirmation_charges:"${value.payment.amount_confirmationCharges}",
          payment_condition_for_beneficiary:"${value.payment.amount_paymentCondition}"

        },
        country:"${value.payment.amount_country}",
        valid:${value.payment.valid},
        visited:${value.payment.visited}
      },
      bank_other_party_detail: {
        advising_bank: {
          bank_name:"${value.bank.advisingBank_bankName}",
          address:"${value.bank.advisingBank_address}",
          bic_code:"${value.bank.advisingBank_bic_code}"
        },
        advise_thru_bank: {
          bank_name:"${value.bank.adviseThru_bankName}",
          address:"${value.bank.adviseThru_address}",
          bic_code:"${value.bank.adviseThru_bic_code}"
        },
        requested_confirmation_party: "${value.bank.requestedConfirmationParty}",
        credit_available: {
          type: "${value.bank.creditAvailable_type}",
          name:"${value.bank.creditAvailable_name}",
          addressLine1:"${value.bank.creditAvailable_addressLine1}",
          addressLine2:"${value.bank.creditAvailable_addressLine2}",
          addressLine3:"${value.bank.creditAvailable_addressLine3}",
          credit_available_by:"${value.bank.creditAvailable_creditAvailableBy}",
          payment_draft_at: "${value.bank.creditAvailable_paymentDraftAt}",
          drawee_detail: "${value.bank.creditAvailable_draweeDetails}"
        },
        valid:${value.bank.valid},
        visited:${value.bank.visited}
      },
      shipment_detail: {
        general_info: {
          shipment_from: "${value.shipment.generalInfo_shipmentFrom}",
          place_of_loading: "${value.shipment.generalInfo_placeOfLoading}",
          place_of_discharge: "${value.shipment.generalInfo_placeOfDischarge}",
          shipment_to: "${value.shipment.generalInfo_shipmentTo}",
          partial_shipment:"${value.shipment.generalInfo_partialShipment}",
          transhipment:"${value.shipment.generalInfo_transhipment}",
          latest_shipment_date: "${value.shipment.generalInfo_latestShipmentDate}",
          purchase_terms: "${value.shipment.generalInfo_purchaseTerms}",
          named_place:"${value.shipment.generalInfo_namedPlace}",
          insurance_company_name: "${value.shipment.generalInfo_nameOfInsuranceCompany}",
          policy_number: "${value.shipment.generalInfo_policynumber}"
        },
        shipment_period: "${value.shipment.shipmentPeriod}",
        additional_amount:"${value.shipment.additionalAmount}",
        period_for_presentation: {
          no_of_days: ${value.shipment.period_noOfDays},
          narrative: "${value.shipment.period_narrative}"
        },
        valid:${value.shipment.valid},
        visited:${value.shipment.visited}
      },
      narrative_detail: {
        description_of_goods: """${value.narrative.descriptionOfGoods}""",
        documents_required: """${value.narrative.documentRequired}""",
        additional_instructions: """${value.narrative.additionalInstructions}""",
        special_payment_condition: """${value.narrative.special_paymentCondition}""",
        valid:${value.narrative.valid},
        visited:${value.narrative.visited}
      },
    version:${formIds.version},
    valid:${value.valid},
    visited:${value.visited}
    ){
      _id
      user_id,
      uuid,
      common_info{
        lc_name,
        lc_id,
        initiation_date,
        lc_type,
      },
      general_info{
        applicant_detail{
          bank_name,
          issuer_reference,
          name,
        },
        beneficiary_detail{
          name
        },
        lc_detail{
          expiry_date,
          place_of_expiry
        },
        valid,
        visited
      },
      payment_detail{
        amount_charges{
          lc_amount,
          currency
        },
        valid,
        visited
      },
      bank_other_party_detail{
        credit_available{
          type,
          credit_available_by
        },
        valid,
        visited
      },
      shipment_detail{
        general_info{
          shipment_from,
          shipment_to,
          policy_number,
          place_of_loading,
          place_of_discharge,
          partial_shipment,
          transhipment,
          latest_shipment_date,
          purchase_terms,
          named_place,
          insurance_company_name,
          policy_number
        },
        valid,
        visited
      },
      narrative_detail{
        valid,
        visited
      }
      version,
      status,
      updatedAt,
      createdAt
      }
    }
    `,
      context: {
        headers:{
          authorization: `Bearer ${this.token}`
        },
        uri: this.BASEURL+'/graphQl/'
      }
    })
    .subscribe(res => {
       //console.log("RES", res);
      cb(res, null);
    }, err => {
      console.log(err)
      cb(null, err);
    });
}

  getSwiftFile(uuid: string){
    let headers = new HttpHeaders().set('Authorization',  `Bearer ${this.token}`);
    headers.append("Content-Type", "text/plain");
    let params = new HttpParams().set("uuid",uuid);
    return this.http.get(this.BASEURL+'/lc_form/swiftFile', {
      responseType: "blob",
      headers: headers,
      params: params
    });
  }
  
  // uploadFile(files: Array<File>,uuid: string, attached_documents: any, _id:string): Observable<any> {
  //   const formData: any = new FormData();
  //   if(!attached_documents) attached_documents = [];
  //   // for(let i =0; i < files.length; i++){
  //   //     attached_documents[files[i]['name']] = uuid+"_"+files[i]['name'];
  //   //     formData.append("uploads[]", files[i], uuid+"_"+files[i]['name']);
  //   // }
  //   for(let i =0; i < files.length; i++){
  //       //attached_documents[files[i]['name']] = uuid+"_"+files[i]['name'];
  //       attached_documents.push({file_name:files[i]['name'],file_path:uuid+"_"+files[i]['name']});
  //       formData.append("uploads[]", files[i], uuid+"_"+files[i]['name']);
  //   }
  //   formData.append('attached_documents', JSON.stringify(attached_documents));
  //   formData.append('_id',_id);
  //   const req = new HttpRequest('POST', this.BASEURL+'/upload', formData, {reportProgress: true});
  //   return this.http.request(req);
  // }

  uploadFile(formData :FormData): Observable<any> {
    const req = new HttpRequest('POST', this.BASEURL+'/upload', formData, {reportProgress: true});
    return this.http.request(req);
  }

  deleteFile(data : any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.token}`)
    }
    return this.http.post(this.BASEURL+'/deleteFile', data)
  }

  downLoadFile(file_name){
    return this.http.get(this.BASEURL + '/download?file_name=' + file_name, {
      responseType: 'blob',
    })
  }

  // get lc form by user id
  getLcFormsByUserId(callback, user_id) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getLcFormsByUserId( user_id: "${user_id}"){
            user_id,
            uuid,
            common_info{
              lc_name,
              lc_id,
              initiation_date,
              lc_type,
            },
            general_info{
              applicant_detail{
                bank_name,
                issuer_reference,
                name,
              },
              beneficiary_detail{
                name
              },
              lc_detail{
                expiry_date
              },
              valid,
              visited
            },
            payment_detail{
              amount_charges{
                lc_amount,
                currency
              },
              valid,
              visited
            },
            bank_other_party_detail{
              credit_available{
                type,
                credit_available_by
              },
              valid,
              visited
            },
            shipment_detail{
              general_info{
                shipment_from,
                shipment_to
              },
              valid,
              visited
            },
            narrative_detail{
              valid,
              visited
            },
            attached_documents{
              file_name,
              file_path
            },
            status,
            status_updated_at,
            updatedAt,
            createdAt,
            valid,
            visited
          }
        }
        `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        }
      })
      .valueChanges.subscribe(res => {
        console.log("lc form list", JSON.stringify(res.data['getLcFormsByUserId']));
        callback(res.data['getLcFormsByUserId'], null)
      }, err => {
        console.log(err)
        callback(null, err)
      });
  }

  // get lc form by user id
  getLcFormsByCheckerId(callback, user_id) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getLcFormsByCheckerId( checker_id: "${user_id}"){
            user_id,
            uuid,
            common_info{
              lc_name,
              lc_id,
              initiation_date,
              lc_type,
            },
            general_info{
              applicant_detail{
                bank_name,
                issuer_reference,
                name,
              },
              beneficiary_detail{
                name
              },
              valid,
              visited
            },
            payment_detail{
              amount_charges{
                lc_amount,
                currency
              },
              valid,
              visited
            },
            bank_other_party_detail{
              credit_available{
                type,
                credit_available_by
              },
              valid,
              visited
            },
            shipment_detail{
              general_info{
                shipment_from,
                shipment_to
              },
              valid,
              visited
            },
            narrative_detail{
              valid,
              visited
            },
            attached_documents{
              file_name,
              file_path
            },
            status,
            status_updated_at,
            updatedAt,
            createdAt,
            valid,
            visited
          }
        }
        `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        }
      })
      .valueChanges.subscribe(res => {
        //console.log("lc form list", res.data['getLcFormsByUserId']);
        callback(res.data['getLcFormsByCheckerId'], null)
      }, err => {
        console.log(err)
        callback(null, err)
      });
  }

  getBankType(cb) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getBankType{
            name
          }
        }
        `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        }
      })
      .valueChanges.subscribe(res => {
        // console.log("Bank Type in service", res);
        cb(res, null)
      }, err => {
        console.log(err)
        cb(null, err)
      });
  }

  getGeneralBankName(cb) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getBankName{
            name
          }
        }
        `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        }
      })
      .valueChanges.subscribe(res => {
        // console.log("Bank Name List in service", res);
        cb(res, null)
      }, err => {
        console.log(err)
        cb(null, err)
      });
  }

  getBankDraweeDetails(cb) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getBankDraweeDetails{
            name
          }
        }
        `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        }
      })
      .valueChanges.subscribe(res => {
        // console.log("Bank Drawee List in service", res);
        cb(res, null)
      }, err => {
        console.log(err)
        cb(null, err)
      });
  }

  getBeneficiaryName(cb) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getBeneficiaryName{
            name
          }
        }
        `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        }
      })
      .valueChanges.subscribe(res => {
        // console.log("Beneficiary Name List in service", res);
        cb(res, null)
      }, err => {
        console.log(err)
        cb(null, err)
      });
  }



  getIssuerReference(cb) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getIssuerRefrence{
            issuer_reference
            name
            address_line1
            address_line2
            address_line3
          }
        }
        `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        }
      })
      .valueChanges.subscribe(res => {
        // console.log("Issuer Reference List in service", res);
        cb(res, null)
      }, err => {
        console.log(err)
        cb(null, err)
      });
  }


  getLcFormComments(uuid : string){
    let headers = new HttpHeaders().set('Authorization',  `Bearer ${this.token}`);
    // let params = new HttpParams().set("uuid",'2c6000c0-b067-11e9-a4a0-17e9fda88833');
    let params = new HttpParams().set("uuid",uuid);

    return  this.http.get(this.BASEURL+'/getLcComments',{headers: headers, params: params})
  }

  getLcFormComment(cb, uuid) {
    // var comment = `{
    //   name,
    //   profile_url,
    //   comment,
    //   savedOn
    // }`

    var comment = `{
      comments{
        name
        profile_url
        comment
        savedOn
      },
      updated
    }`
    
    this.apollo
      .watchQuery({
        query: gql`
        {
          getLcFormComment( uuid: "${uuid}"){
            general_info{
              applicant_detail{
                bank_name ${comment},
                issuer_reference ${comment},
                name ${comment},
                address_line1 ${comment},
                address_line2 ${comment},
                address_line3 ${comment},
                customer_reference ${comment},
                contract_number ${comment}
              },
              beneficiary_detail{
                name ${comment},
                address_line1 ${comment},
                address_line2 ${comment},
                address_line3 ${comment},
                country ${comment}
              },
              lc_detail{
                form_of_lc ${comment},
                expiry_date ${comment},
                place_of_expiry ${comment},
                confirmation_instructions ${comment},
                rules_applicable ${comment},
                send_lc_by ${comment},
                principal_account ${comment},
                fee_account ${comment},
                other_info ${comment}
              }
            },
            payment_detail{
              amount_charges{
                lc_amount ${comment},
                variant_plus ${comment},
                variant_minus ${comment},
                currency ${comment},
                issuing_bank_charges ${comment},
                outside_country_charges ${comment},
                legalization_charges ${comment},
                confirmation_charges ${comment},
                payment_condition_for_beneficiary ${comment}
              }
            },
            bank_other_party_detail{
              advising_bank{
                bank_name ${comment},
                address ${comment},
                bic_code ${comment}
              },
              advise_thru_bank{
                bank_name ${comment},
                address ${comment},
                bic_code ${comment}
              },
              requested_confirmation_party ${comment},
              credit_available{
                type ${comment},
                name ${comment},
                addressLine1 ${comment},
                addressLine2 ${comment},
                addressLine3 ${comment},
                credit_available_by ${comment},
                payment_draft_at ${comment},
                drawee_detail ${comment}
              }
            },
            shipment_detail{
              general_info{
                shipment_from ${comment},
                place_of_loading ${comment},
                place_of_discharge ${comment},
                shipment_to ${comment},
                partial_shipment ${comment},
                transhipment ${comment},
                latest_shipment_date ${comment},
                purchase_terms ${comment},
                named_place ${comment},
                insurance_company_name ${comment},
                policy_number ${comment}
              },
              shipment_period ${comment},
              additional_amount ${comment},
              period_for_presentation{
                no_of_days ${comment},
                narrative ${comment}
              }
            },
            narrative_detail{
              description_of_goods ${comment},  
              documents_required ${comment},
              additional_instructions ${comment},
              special_payment_condition ${comment}
            }
          }
        }
        `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        },
      })
      .valueChanges.subscribe(res => {
        console.log("comments in lc form service",res.data['getLcFormComment']);
        cb(res.data['getLcFormComment'], null)
      }, err => {
        cb(null, err)
      });
  }

  updateLcFormComment(cb,query:any){
      var uuid = '';
      this.serviceFormIds.subscribe(res => {
        uuid = JSON.parse(res).uuid;
      })
      this.apollo
      .mutate({
        mutation: gql`mutation{
          updateLcFormComment(
            uuid: "${uuid}",
              ${query}
          )
          {
            uuid
          }
        }
        `,
        context: {
          headers:{
            authorization: `Bearer ${this.token}`
          },
          uri: this.BASEURL+'/graphQl/'
        }
      })
      .subscribe(res => {
        console.log("Response from update commment");
        console.log(res);
        cb(res);
      });
  }

  getLcFormStatusCount(){
    return this.http.get(this.BASEURL + '/lc_form/status/count')
  }

  getLcFormAmountCount(){
    return this.http.get(this.BASEURL + '/lc_form/lc_amount/count')
  }

  getLcFormExpiryCount(){
    return this.http.get(this.BASEURL + '/lc_form/expiry/count')
  }

}
