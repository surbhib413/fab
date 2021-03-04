import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortLcData'
})
export class SortLcData implements PipeTransform {

  transform(items: any[], field: string): any[] {


    let orderByStrArr = field.split(".");
    let orderLevel1 = orderByStrArr[0];
    // let orderLevel2 = orderByStrArr[1];
    // let orderLevel3 = orderByStrArr[2];

    console.log('orderLevel1', orderLevel1);
    // console.log('orderLevel2', orderLevel2);
    // console.log('orderLevel3', orderLevel3);

    // alert(orderLevel1);
    // alert(orderLevel2);
    // alert(orderLevel3);

    if (!items) return [];

    // if (field) items.sort((a, b) => a[orderLevel1][orderLevel2][orderLevel3] > b[orderLevel1][orderLevel2][orderLevel3] ? 1 : -1);
    // else items.sort((a, b) => a > b ? 1 : -1);


    if (field) items.sort((a, b) => a[orderLevel1] > b[orderLevel1] ? 1 : -1);
    else items.sort((a, b) => a > b ? 1 : -1);
    return items;
  }

}
