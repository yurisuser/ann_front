import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { ICatalogElement } from '../../../../models/catalogElements';
import { ImageService } from '../../services/image.service';
import { ModalImagerComponent } from '../modal-imager/modal-imager.component';
import { ICatalogTypes } from '../../../../models/catalogTypes';
import { TableService } from '../../services/table.service';
import { IGaleryTypes } from 'src/app/models/galeryTypes';
import { IGaleryElement } from 'src/app/models/galeryElements';

@Component({
  selector: 'app-modal-edit-galery-elements',
  templateUrl: './modal-edit-galery-elements.component.html',
  styleUrls: ['./modal-edit-galery-elements.component.scss']
})
export class ModalEditGaleryElementsComponent implements OnInit {

  readonly minLength = 5;
  formGroup = new FormGroup({
    id: new FormControl(this.data.element.id || 0),
    viewName: new FormControl(this.data.element.viewName || '', [Validators.required]),
    img: new FormControl(this.data.element.img || '', [Validators.required]),
    galeryType: new FormControl(this.data.element.galeryType || '', [Validators.required]),
    order: new FormControl(this.data.element.order || 1, [Validators.required]),
  });
  private openDialogRefEdit;
  isExistImage: boolean;
  galeryTypes: IGaleryTypes[];

  constructor(
    public dialog: MatDialog,
    private imgSrv: ImageService,
    private tableSrv: TableService,
    public dialogRef: MatDialogRef<ModalEditGaleryElementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      element: IGaleryElement,
      text: string,
    }
  ) {}

  ngOnInit() {
    this.tableSrv.getGaleryTypes()
      .subscribe(x => this.galeryTypes = x);
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
