import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    // Asegúrate de que el valor tenga formato HH:mm:ss
    const [hours, minutes] = value.split(':');
    return `${hours}:${minutes}`;
  }
}
