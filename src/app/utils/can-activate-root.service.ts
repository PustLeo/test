import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommonStaticService} from '@common/services/common-static/common-static.service';
import {flatMap} from 'rxjs/operators';

/**
 * Активация компонента
 */
@Injectable()
export class CanActivateRootService implements CanActivate {

  constructor(protected httpClient: HttpClient,
              protected staticService: CommonStaticService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.httpClient.get(CommonStaticService.SETTINGS_PATH)
      .pipe(flatMap((data: any) => {
        this.staticService.apiSettings = data;
        return of(true);
      }));
  }
}
