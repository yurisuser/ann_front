import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IRole } from '../../models/role';
import { IUser } from '../../models/user';
import { isExistValidator } from '../../validators/exist-name.validator';
import { passwordsValidator } from '../../validators/passwords.validator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styleUrls: ['./modal-new-user.component.scss']
})
export class ModalNewUserComponent implements OnInit {
  readonly minLength = 5;
  newUser = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength),
    ], [isExistValidator('login', this.userSrv)]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ], [isExistValidator('email', this.userSrv)]
    ),
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    patronymic: new FormControl(''),
    lastName: new FormControl(''),
  }, passwordsValidator('password', 'confirm'));

  constructor(
    public dialogRef: MatDialogRef<ModalNewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      roles: IRole[],
      users: IUser[],
    },
    private userSrv: UserService,
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
