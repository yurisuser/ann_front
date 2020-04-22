import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  public readonly mainMenu = [
    { name: 'Каталог продукции', param: '/main/catalog', sub: 'catalog' },
    { name: 'Галерея макетов', param: '/main/galery', sub: 'galery' },
    { name: 'Сезонные товары', param: '/main/season' },
    { name: 'Оригинальные изделия', param: '/main/idea' },
    { name: 'Отзывы / предложения', param: '/main/callback' },
  ];
  public currentRoute;
  public catalogSubMenu;
  public galerySubMenu;
  public isShowMenu = false;

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
}
