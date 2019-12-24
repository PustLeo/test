/**
 * Модель данных
 */
export class VideosModel {
  /** */
  public list: any[] = [];
  /** */
  public search: string = '';
  /** */
  public searchResult: any[] = [];

  /**
   * Конструктор
   */
  constructor() {}

  /**
   * Обработка ответа при поиске данных
   * @param data
   */
  public set searchResponse(data: any) {
    this.clearSearchValues();
    if (data.Response === 'True') {
      data.Search.forEach((element: any) => this.searchResult.push(element));
    }
  }

  /**
   * Удаление найденных элементов
   */
  public clearSearchValues(): void {
    this.searchResult.splice(0);
  }

  /**
   * Обработка ответа при загрузке сохраненных данных
   * @param {any[]} data
   */
  public set savedListResponse(data: any[]) {
    this.clearSavedValues();
    data.forEach((element: any) => this.list.push(element));
  }

  /**
   * Удаление всех/конкретного элемента из сохраненного списка
   * @param {number} index
   * @return {any | void}
   */
  public clearSavedValues(index?: number): any | void {
    if (index === undefined) {
      this.list.splice(0);
    } else if (this.list[index]) {
      return this.list.splice(index, 1).shift();
    }
  }

  /**
   * Поиск по спику по идентификатору
   * @param {string} id
   * @return {any}
   */
  public searchById(id: string): any {
    const result = this.list.filter((element: any) => element.imdbID === id)
      .shift();
    return result || null;
  }
}
