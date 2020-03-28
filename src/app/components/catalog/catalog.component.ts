import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { ICatalogElement } from '../../modules/admin/models/catalogElements';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

    catalogElementsArr: ICatalogElement[];

    constructor(
        private dataSrv: DataService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(x => this.dataSrv.getCatalogElements().pipe(
                map(z  =>  !x.type ? z : z.filter(c => c.catalogType === Number(x.type)))))
            )
        .subscribe(x => {
        this.catalogElementsArr = x;
        });
    }

    getFullImgPath(img: string) {
        return this.dataSrv.getFullImgPath(img);
    }

}
