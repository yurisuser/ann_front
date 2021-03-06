import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
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
