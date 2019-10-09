import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public authState$;

  constructor(
    private authSrv: AuthService
  ) {
    this.authState$ = this.authSrv.authState$;
  }

  ngOnInit() {
  }

  logout() {
    this.authSrv.logout();
  }

}
