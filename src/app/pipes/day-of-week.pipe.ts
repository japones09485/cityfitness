import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  transform(fecha: string): string {
    const a = moment(fecha);
    /*
    console.log(moment().format('MMMM D YYYY, h:mm:ss a'));
    const b = a.clone().add(1, 'week');
    console.log(a.format('YYYY-MM-DD'));
    console.log(b.add(1, 'week').format('YYYY-MM-DD'));*/
    return a.format('dddd, MMMM D');
  }

}
