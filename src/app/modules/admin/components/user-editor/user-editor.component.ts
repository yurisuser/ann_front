import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';
import { ModalNewUserComponent } from '../../modal/modal-new-user/modal-new-user.component';
import { IRole } from '../../models/role';
import { DialogService } from '../../services/dialog.service';
import { IUserData } from '../../models/userData';
import { ModalEditUserComponent } from '../../modal/modal-edit-user/modal-edit-user.component';
import { ModalPSWChangeForceComponent } from '../../modal/modal-psw-change-force/modal-pswchange-force/modal-pswchange-force.component';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})

export class UserEditorComponent implements OnInit {
  public roles: IRole[];
  public users: IUser[];
  public markedUsers: IUser[] = [];
  private dialogRefCreateUser;
  private dialogRefEditUser;
  private dialogRefPswForce;
  public displayedColumns = ['id', 'login', 'role', 'email', 'firstName', 'patronymic', 'lastName', 'registration', 'check'];

  constructor(
    private userSrv: UserService,
    public dialog: MatDialog,
    private dialogSrv: DialogService,
  ) { }

  ngOnInit() {
    this.getRole();
    this.getUsers();
  }

  getRole() {
    this.userSrv.getRoles()
      .subscribe(x => {
        this.roles = x;
      });
  }

  getUsers() {
    this.userSrv.getUsers().subscribe(x => this.users = x);
  }

  onUser(user) {
    console.log(user, 'click');
  }

  onCreateUser() {
    // tslint:disable-next-line: no-unused-expression
    !this.dialogRefCreateUser || this.dialogRefCreateUser.close();
    this.dialogRefCreateUser =  this.dialog.open(ModalNewUserComponent, {
      data: {
        isEdit: false,
        roles: this.roles,
        user: {role: {id: 0}} as IUserData
      }
    });
    this.dialogRefCreateUser.afterClosed().pipe(
      switchMap(x => this.userSrv.createUser(x)),
      switchMap(() => this.userSrv.getUsers())
    )
      .subscribe(x => {
        this.users = x;
        this.markedUsers = [];
      });
  }

  async onDeleteUser() {
    const message = () => {
      return `Are you sure to delete ${this.markedUsers.length} users?`;
    };

    if (await this.dialogSrv.confirm(message())) {
      this.userSrv.deleteUsers(this.markedUsers.map(x => x.id)).pipe(
        switchMap(() => this.userSrv.getUsers()),
        tap(() => this.markedUsers = []),
      )
      .subscribe(x => {
        this.users = x;
        this.markedUsers = [];
      });
    }

  }

  onEditUser() {
    // tslint:disable-next-line: no-unused-expression
    !this.dialogRefEditUser || this.dialogRefEditUser.close();
    this.dialogRefEditUser =  this.dialog.open(ModalEditUserComponent, {
      data: {
        isEdit: true,
        roles: this.roles,
        user: this.markedUsers[0]
      }
    });
    this.dialogRefEditUser.afterClosed().pipe(
      switchMap(x => this.userSrv.updateUser(x)),
      switchMap(() => this.userSrv.getUsers())
    )
    .subscribe(x => {
      this.users = x;
      this.markedUsers = [];
    });
  }

  onCheck(user) {
    if (this.markedUsers.includes(user)) {
      return this.markedUsers.splice(this.markedUsers.indexOf(user), 1);
    }
    this.markedUsers.push(user);
  }

  onCheckAll(event) {
    if (!event.checked) {
      return this.markedUsers = [];
    }
    this.markedUsers = this.users.slice(0, this.users.length);
  }

  onChangeForcePassword() {
    // tslint:disable-next-line: no-unused-expression
    !this.dialogRefPswForce || this.dialogRefPswForce.close();
    this.dialogRefPswForce =  this.dialog.open(ModalPSWChangeForceComponent, {
      data: {
        user: this.markedUsers[0]
      }
    });
    this.dialogRefPswForce.afterClosed().pipe(
      switchMap(x => this.userSrv.forcePswChange(x)),
      switchMap(() => this.userSrv.getUsers())
    )
    .subscribe(x => {
      this.users = x;
      this.markedUsers = [];
    });

  }
}
