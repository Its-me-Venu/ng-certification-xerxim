import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConverter',
})
export class DateConverterPipe implements PipeTransform {
  transform(miliseconds: any): any {
    return new Date(miliseconds * 1000);
  }
}
