import {Injectable} from '@angular/core';
import {VideosUrlService} from './videos-url.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Http-сервис для модуля отображения видео-элементов
 */
@Injectable()
export class VideosHttpService extends VideosUrlService {
  /**
   * Конструктор
   * @param {HttpClient} httpClient
   */
  constructor(protected httpClient: HttpClient) {
    super();
  }

  /**
   * Поиск элементов
   * @param {string} search
   * @return {Observable<any>}
   */
  public doSearchVideosByNameRequest(search: string): Observable<any> {
    const params: HttpParams = new HttpParams({fromObject: {s: search, page: '1'}});
    return this.httpClient.get(this.SEARCH_VIDEOS_BY_NAME_URL, {params});
  }

  /**
   * Загрузка конкретного видео-элемента
   * @param {string} id
   * @return {Observable<any>}
   */
  public doLoadVideoByIdRequest(id: string): Observable<any> {
    const params: HttpParams = new HttpParams({fromObject: {i: id}});
    return this.httpClient.get(this.LOAD_VIDEO_BY_ID_URL, {params});
  }
}
