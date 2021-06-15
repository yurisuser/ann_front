import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatSidenav, MatAccordion } from '@angular/material';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;
  @ViewChild('accordion', {static: true}) accordion: MatAccordion;

  public readonly mainMenu = [
    { name: 'Каталог', param: '/main/catalog', sub: 'catalog' },
    { name: 'Галерея', param: '/main/galery', sub: 'galery' },
    { name: 'Сезонные', param: '/main/season'},
    { name: 'Эксклюзив', param: '/main/idea'},
    { name: 'Отзывы', param: '/main/callback'},
  ];

  public currentRoute;
  public catalogSubMenu;
  public galerySubMenu;
  opened = false;

  constructor(
    private router: Router,
    private dataSrv: DataService,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(x => {
      this.currentRoute = x;
    });
    this.dataSrv.getCatalogSubMenu()
      .pipe(
        map(x => x.sort((a, b) => a.order >= b.order ? 1 : -1)),
      )
      .subscribe( x => this.catalogSubMenu = x );
    this.dataSrv.getGallerySubMenu()
      .pipe(
        map(x => x.sort((a, b) => a.order >= b.order ? 1 : -1)),
      )
      .subscribe( x => this.galerySubMenu = x );
  }

  isActiveRoute(params: any[]): boolean {
    return this.router.isActive(this.router.createUrlTree(params), false);
  }

  close() {
    this.sidenav.close();
  }
}
