import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IincludeMenu } from '../../models/includeMenu';
import * as data from '../../data';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  private menu: IincludeMenu[];
  public currentRoute;

  constructor(
    private router: Router
  ) {
    this.menu = data.menu;
  }

  ngOnInit() {
    this.router.events.subscribe(x => {
      this.currentRoute = x;
    });
  }

  onClick(str: IincludeMenu) {
    console.log(this.menu);


  }

}
