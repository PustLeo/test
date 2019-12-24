import {Pipe, PipeTransform} from '@angular/core';

/**
 * Трансформация объекта для отображения конкретного элемента
 */
@Pipe({name: 'videoInfo'})
export class VideoInfoPipe implements PipeTransform {

  transform(value: any): any {
    const tempValue: any = Object.assign({}, value);
    if ('imdbID' in tempValue) {
      delete tempValue.imdbID;
    }
    if ('Poster' in tempValue) {
      delete tempValue.Poster;
    }
    if ('Title' in tempValue) {
      delete tempValue.Title;
    }
    if ('Ratings' in tempValue && typeof Array.isArray(tempValue.Ratings)) {
      tempValue.Ratings = tempValue.Ratings.map(({Source, Value}) => Source + ': ' + Value).join(';\n\r');
    }
    return tempValue;
  }
}
