import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ICatalogTypes } from '../../models/catalogTypes';

@Component({
  selector: 'app-modal-edit-catalog-type',
  templateUrl: './modal-edit-catalog-type.component.html',
  styleUrls: ['./modal-edit-catalog-type.component.scss']
})
export class ModalEditCatalogTypeComponent implements OnInit {

  readonly minLength = 5;
  formGroup = new FormGroup({
    id: new FormControl(this.data.element.id || 0),
    name: new FormControl(this.data.element.name || '', [Validators.required]),
    viewName: new FormControl(this.data.element.viewName || '', [Validators.required]),
    order: new FormControl(this.data.element.order || 1, [Validators.required]),
  });

  constructor(
      public dialogRef: MatDialogRef<ModalEditCatalogTypeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
        element: ICatalogTypes,
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

}
