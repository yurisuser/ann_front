import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IRole } from '../../models/role';
import { isExistValidator } from '../../validators/exist-name.validator';
import { passwordsValidator } from '../../validators/passwords.validator';
import { UserService } from '../../services/user.service';
import { IUserData } from '../../models/userData';

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-new-user.component.html',
  styleUrls: ['./modal-new-user.component.scss']
})
export class ModalNewUserComponent implements OnInit {
  readonly minLength = 5;
  newUser = new FormGroup({
    login: new FormControl(this.data.user.login, [
      Validators.required,
      Validators.minLength(this.minLength),
    ], [isExistValidator('login', this.userSrv, this.data.user)]),
    role: new FormControl(this.data.user.role.id || '', [Validators.required]),
    email: new FormControl(this.data.user.email, [
      Validators.required,
      Validators.email,
    ], [isExistValidator('email', this.userSrv, this.data.user)]
    ),
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required]),
    firstName: new FormControl(this.data.user.firstName),
    patronymic: new FormControl(this.data.user.patronymic),
    lastName: new FormControl(this.data.user.lastName),
  }, passwordsValidator('password', 'confirm'));

  constructor(
    public dialogRef: MatDialogRef<ModalNewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      isEdit: boolean,
      roles: IRole[],
      user: IUserData,
    },
    private userSrv: UserService,
  ) {}

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.newUser.value);
  }
}
