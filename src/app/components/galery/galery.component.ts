import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

import { IGaleryElement } from '../../models/galeryElements';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-galery',
    templateUrl: './galery.component.html',
    styleUrls: ['./galery.component.scss']
})
export class GaleryComponent implements OnInit {

    galeryShowArr: IGaleryElement[];

    constructor(
        private dataSrv: DataService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(x => this.dataSrv.getGalleryElements().pipe(
                    map(z  =>  !x.type ? z : z.filter(c => c.galeryType === Number(x.type)))))
            )
        .subscribe(x => {
            this.galeryShowArr = x;
        });
    }

    getFullImgPath(img: string) {
        return this.dataSrv.getFullImgPath(img);
    }

}
