import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonStaticService} from '@common/services/common-static/common-static.service';
import {ApiSettingsModel} from '@common/services/common-static/api-settings.model';

/**
 * Сервис перехватчика http-запросов
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(protected staticService: CommonStaticService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!CommonStaticService.ASSETS_PATH_REGEX.test(req.url)) {
      const api: ApiSettingsModel = this.staticService.apiSettings;
      const url: string = api.host + req.url;
      let params: HttpParams = req.params;
      params = params.append('apikey', api.apiKey);
      req = req.clone({url, params});
    }

    return next.handle(req);
  }

}
