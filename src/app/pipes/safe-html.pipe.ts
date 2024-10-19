import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer){}

  transform(value: string): unknown {
    value = value.replace('width="400" height="300"', 'style="max-width:600px; max-height:600px"');
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
