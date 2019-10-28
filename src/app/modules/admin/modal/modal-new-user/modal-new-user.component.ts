import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IRole } from '../../models/role';
import { IUser } from '../../models/user';
import { ExistUserValidator } from '../../validators/exist-name.validator';

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styleUrls: ['./modal-new-user.component.scss']
})
export class ModalNewUserComponent implements OnInit {
  readonly minLength = 5;
  newUser = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength),
      ExistUserValidator(this.data.users.map(x => x.login)),
    ]),
    role: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<ModalNewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      roles: IRole[],
      users: IUser[],
    }
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.newUser.value);
  }
}
