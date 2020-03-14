import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ICatalogElement } from '../../models/catalogElements';

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

  constructor(
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
}
