import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonStaticService} from '@common/services/common-static/common-static.service';

/**
 * Компонент отображения конркетного видео-элемента
 */
@Component({
  selector: 'app-element',
  templateUrl: './element.component.html'
})
export class ElementComponent {
  /** Сопоставление данных */
  public trackByFn = CommonStaticService.trackByFn;

  /**
   * Конструктор
   * @param {MatDialogRef<ElementComponent>} dialogRef
   * @param data
   */
  constructor(
    public dialogRef: MatDialogRef<ElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  /**
   * Закрытие модального окна
   */
  public close(): void {
    this.dialogRef.close();
  }
}
