import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewUserComponent } from '../../modal/modal-new-user/modal-new-user.component';
import { IRole } from '../../models/role';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  public roles: IRole[];
  public users: IUser[];
  dialogRef;

  constructor(
    private userSrv: UserService,
    public dialog: MatDialog
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
    !this.dialogRef || this.dialogRef.close();
    this.dialogRef =  this.dialog.open(ModalNewUserComponent, {
      data: {
        roles: this.roles,
        users: this.users
      }
    });
    this.dialogRef.afterClosed().subscribe(x => console.log(x));
  }
}
