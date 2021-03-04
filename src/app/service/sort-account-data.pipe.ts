import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAccountData'
})
export class SortAccountData implements PipeTransform {
  transform(items: any[], field: string): any[] {

    let orderByStrArr = field.split(".");
    let orderLevel1 = orderByStrArr[0];

    console.log('order Level 1', orderLevel1);
    console.log('items',items);
    if (!items) return [];
    if (field) items.sort((a, b) => a[orderLevel1] > b[orderLevel1] ? 1 : -1);
    else items.sort((a, b) => a > b ? 1 : -1);
    return items;
  }

}



