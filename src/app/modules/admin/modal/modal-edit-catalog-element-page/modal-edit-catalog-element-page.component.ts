import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ImageService } from '../../services/image.service';
import { TableService } from '../../services/table.service';
import { ICatalogElementsPages } from '../../../../models/catalogElementsPages';
import { ICatalogElement } from '../../../../models/catalogElements';
import { ModalImagerComponent } from '../modal-imager/modal-imager.component';

@Component({
  selector: 'app-modal-edit-catalog-element-page',
  templateUrl: './modal-edit-catalog-element-page.component.html',
  styleUrls: ['./modal-edit-catalog-element-page.component.scss']
})
export class ModalEditCatalogElementPageComponent implements OnInit {
  readonly minLength = 5;
  formGroup = new FormGroup({
    id: new FormControl(this.data.element.id || 0),
    catalogElement: new FormControl(this.data.element.catalogElement || '', [Validators.required]),
    headText: new FormControl(this.data.element.headText || ''),
    img: new FormControl(this.data.element.img || ''),
    paragraphText: new FormControl(this.data.element.paragraphText || ''),
    text: new FormControl(this.data.element.text || ''),
    spreadsheetId: new FormControl(this.data.element.spreadsheetId || ''),
    spreadSheetPageNum: new FormControl(this.data.element.spreadSheetPageNum || 1,[Validators.pattern('^[0-9]*$')]),
  });
  private openDialogRefEdit;
  isExistImage: boolean;
  catalogElements: ICatalogElement[];

  constructor(
    public dialog: MatDialog,
    private imgSrv: ImageService,
    private tableSrv: TableService,
    public dialogRef: MatDialogRef<ModalEditCatalogElementPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      element: ICatalogElementsPages,
      text: string,
    }
  ) { }

  ngOnInit() {
    this.tableSrv.getCatalogElements()
    .subscribe(x => this.catalogElements = x);
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }

  onEdit() {
    // tslint:disable-next-line: no-unused-expression
    !this.openDialogRefEdit || this.openDialogRefEdit.close();
    this.openDialogRefEdit =  this.dialog.open(ModalImagerComponent, {data: { fileName: this.data.element.img }});
    this.openDialogRefEdit.afterClosed()
      .subscribe(x => {
        if (x) {
          this.formGroup.controls.img.setValue(x);
          this.data.element.img = x;
        }
      });
  }

  getFullThumbPath() {
    return this.imgSrv.getFullThumbPath(this.formGroup.controls.img.value);
  }

  onClickImg() {
    this.onEdit();
  }
}
