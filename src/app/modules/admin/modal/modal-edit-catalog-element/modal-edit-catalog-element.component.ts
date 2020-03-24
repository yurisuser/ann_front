import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { ICatalogElement } from '../../models/catalogElements';
import { ImageService } from '../../services/image.service';
import { ModalImagerComponent } from '../modal-imager/modal-imager.component';

@Component({
  selector: 'app-modal-edit-catalog-element',
  templateUrl: './modal-edit-catalog-element.component.html',
  styleUrls: ['./modal-edit-catalog-element.component.scss']
})
export class ModalEditCatalogElementComponent implements OnInit {

  readonly minLength = 5;
  formGroup = new FormGroup({
    id: new FormControl(this.data.element.id || 0),
    viewName: new FormControl(this.data.element.viewName || '', [Validators.required]),
    img: new FormControl(this.data.element.img || '', [Validators.required]),
    catalogType: new FormControl(this.data.element.catalogType || '', [Validators.required]),
    order: new FormControl(this.data.element.order || 1, [Validators.required]),
  });
  private openDialogRefEdit;
  isExistImage: boolean;

  constructor(
    public dialog: MatDialog,
    private imgSrv: ImageService,
    public dialogRef: MatDialogRef<ModalEditCatalogElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      element: ICatalogElement,
      text: string,
    }
  ) {}

  ngOnInit() {}

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
