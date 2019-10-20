import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  public roles;
  public users: IUser[];

  constructor(
    private userSrv: UserService
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
}
