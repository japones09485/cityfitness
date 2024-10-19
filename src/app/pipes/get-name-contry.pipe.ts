import { Pipe, PipeTransform } from '@angular/core';
import { ApiRestService } from '../services/api-rest.service';

@Pipe({
  name: 'getNameContry'
})
export class GetNameContryPipe implements PipeTransform {

  constructor(private api: ApiRestService) { }

  transform(codigo: string): string {
    const country = this.api.paises.find(ps => ps.alpha3Code === codigo);
    return country.name;
  }

}
