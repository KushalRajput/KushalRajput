import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {
  transform(InputArray: any[], FilterQuery?: any, FilterOnKeys?: any[]): any {
    if (FilterQuery) {
      return InputArray.filter(row => this.filterProcess(row, FilterQuery, FilterOnKeys))
    }
    else {
      return InputArray;
    }
  }
  filterProcess(row: any, FilterQuery: string, FilterOn: any) {
    let KeysArr = Object.keys(FilterOn);
    FilterQuery = FilterQuery.toLowerCase();
    let FilterStr: String = "";

    for (let keyObj of KeysArr) {
      if (row[keyObj] != undefined && row[keyObj] != null && row[keyObj] != "")
        FilterStr += row[keyObj].toString().toLowerCase();
    }
    let ind = ((FilterStr.trim()).toLowerCase()).indexOf(FilterQuery.toLowerCase());
    if (ind > -1) {
      return true
    }
    else {
      return false;
    }    
  }
}
