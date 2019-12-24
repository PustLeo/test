import {Injectable} from '@angular/core';
import {VideosModel} from './videos.model';
import {VideosHttpService} from '../utils/videos-http.service';
import {from, fromEvent, Observable, Subject} from 'rxjs';
import {concatMap, switchMap, takeUntil, toArray} from 'rxjs/operators';
import {CommonStaticService} from '@common/services/common-static/common-static.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ElementComponent} from '../element/element.component';

/**
 * Сервис отображения списка видео элементов
 */
@Injectable()
export class VideosService {
  /** Модель данных */
  public model: VideosModel = new VideosModel();
  /** Предмет события поиска */
  protected searchEventSubject: Subject<string> = new Subject<string>();
  /** Отслеживание изменений события поиска */
  protected searchEvent: Observable<string> = this.searchEventSubject.asObservable();
  /** Предмет события уничтожения компонента */
  protected destroyEventSubject: Subject<boolean> = new Subject<boolean>();
  /** Отслеживание изменений события уничтожения компонента */
  protected destroyEvent: Observable<boolean> = this.destroyEventSubject.asObservable();
  /** Отслеживание изменений события хранилища */
  protected event: Observable<any> = fromEvent(window, 'storage');

  /**
   * Конструктор
   * @param {VideosHttpService} httpService
   * @param {MatDialog} dialog
   * @param {Router} router
   * @param {ActivatedRoute} route
   */
  constructor(protected httpService: VideosHttpService,
              public dialog: MatDialog,
              protected router: Router,
              protected route: ActivatedRoute) {}

  /**
   * Инициализация
   */
  public init(): void {
    this.searchEvent
      .pipe(takeUntil(this.destroyEvent),
        switchMap((value: string) => this.httpService.doSearchVideosByNameRequest(value)))
      .subscribe((request: any) => this.model.searchResponse = request);
    this.loadSavedElements();
    this.route.queryParamMap
      .pipe(takeUntil(this.destroyEvent))
      .subscribe((params: ParamMap) => this.queryHandler(params));
    this.event
      .pipe(takeUntil(this.destroyEvent))
      .subscribe(() => this.loadSavedElements());
  }

  /**
   * Уничтожение
   */
  public destroy(): void {
    this.destroyEventSubject.next(true);
  }

  /**
   * Обработка поиска
   */
  public changeSearchValue(): void {
    this.model.clearSearchValues();
    if (this.model.search.length <= 3) {
      return;
    }
    this.searchEventSubject.next(this.model.search);
  }

  /**
   * Сохранение выбранного элемента
   * @param value
   * @return {Promise<void>}
   */
  public async addVideoElement(value: any): Promise<void> {
    const listIds = CommonStaticService.loadInStorage(CommonStaticService.SAVED_LIST_KEY);
    listIds.push(value.imdbID);
    CommonStaticService.setToStorage(CommonStaticService.SAVED_LIST_KEY, JSON.stringify(listIds));
    const element: any = await this.httpService.doLoadVideoByIdRequest(value.imdbID)
      .toPromise();
    this.model.list.push(element);
  }

  /**
   * Загрузка сохраненных элементов
   */
  protected loadSavedElements(): void {
    const list: string[] | null = CommonStaticService.loadInStorage(CommonStaticService.SAVED_LIST_KEY);
    if (!list) {
      return;
    }
    from(list)
      .pipe(
        concatMap((id: string) => this.httpService.doLoadVideoByIdRequest(id)),
        toArray()
      )
      .subscribe((data: any) => this.model.savedListResponse = data);
  }

  /**
   * Удаление конкретного элемента
   * @param $event
   * @param {number} index
   */
  public deleteSavedElement($event: any, index: number): void {
    $event.preventDefault();
    const deletedElement = this.model.clearSavedValues(index);
    if (deletedElement) {
      const listIds = CommonStaticService.loadInStorage(CommonStaticService.SAVED_LIST_KEY);
      const idIndex = listIds.indexOf(deletedElement.imdbID);
      if (idIndex !== -1) {
        listIds.splice(idIndex, 1);
      }
      CommonStaticService.setToStorage(CommonStaticService.SAVED_LIST_KEY, JSON.stringify(listIds));
    }
    $event.stopImmediatePropagation();
  }

  /**
   * Обработка query-данных
   * @param {ParamMap} params
   * @return {Promise<void>}
   */
  protected async queryHandler(params: ParamMap): Promise<void> {
    if (!params.has('id')) {
      return;
    }
    const id: string = params.get('id');
    const element: any = this.model.searchById(id) ||
      await this.httpService.doLoadVideoByIdRequest(id).toPromise();

    const dialogRef = this.dialog.open(ElementComponent, {
      width: '450px',
      data: element
    });
    dialogRef.afterClosed()
      .subscribe(() => this.queryReset());
    dialogRef.backdropClick()
      .subscribe(() => this.queryReset());
  }

  /**
   * Сброс query-данных
   */
  public queryReset(): void {
    this.router.navigate([''], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
}
