import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { IUserData } from '../../../models/userData';
import { passwordsValidator } from '../../../validators/passwords.validator';

@Component({
  selector: 'app-modal-pswchange-force',
  templateUrl: './modal-pswchange-force.component.html',
  styleUrls: ['./modal-pswchange-force.component.scss']
})
export class ModalPSWChangeForceComponent implements OnInit {
  formPsw = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required]),
  }, passwordsValidator('password', 'confirm'));

  constructor(
    public dialogRef: MatDialogRef<ModalPSWChangeForceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {}

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close({ id: this.data.user.id, password: this.formPsw.value});
  }

}
