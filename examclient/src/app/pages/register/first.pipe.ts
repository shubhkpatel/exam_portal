import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'first',
})
export class FirstPipe implements PipeTransform {
  transform(obj: any) {
    if (obj === null || obj === undefined) return;
    var keys = Object.keys(obj);
    if (keys && keys.length > 0) {
      return keys[0];
    }
    return null;
  }
}
