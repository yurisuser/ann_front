import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { ICatalogElementsPages } from '../../models/catalogElementsPages';

@Component({
  selector: 'app-catalog-element-page',
  templateUrl: './catalog-element-page.component.html',
  styleUrls: ['./catalog-element-page.component.scss']
})
export class CatalogElementPageComponent implements OnInit {

  page: ICatalogElementsPages;

  constructor(
    private route: ActivatedRoute,
    private dataSrv: DataService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(x => this.dataSrv.getCatalogElementPages().pipe(
        map(p => p.filter(f => Number(f.catalogElement) === Number(x.page))))))
      .subscribe(x => this.page = x.length > 0 ? x[0] : null);
  }

  getImgLink(): string {
    return this.dataSrv.getFullImgPath(this.page.img);
  }

}
