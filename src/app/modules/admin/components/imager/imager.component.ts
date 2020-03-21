import { Component, OnInit, Input, Output } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { EventEmitter } from 'protractor';
import { MatDialog } from '@angular/material';

import { ImageService } from '../../services/image.service';
import * as env from '../../../../../environments/environment';

@Component({
  selector: 'app-imager',
  templateUrl: './imager.component.html',
  styleUrls: ['./imager.component.scss']
})
export class ImagerComponent implements OnInit {

  @Input() incomeImg: string;
  // @Output() outputImg = new EventEmitter();
  list = [];


  constructor(
    private imgSrv: ImageService
  ) { }

  ngOnInit() {
    this.imgSrv.getListImg().pipe(
      map(x => {
        const arr = [];
        x.forEach(e => {
          arr.push(`${env.backEnd.address}/files/thumb/${e}`);
        });
        return arr;
      }),
    )
      .subscribe(x => this.list = x);
  }

}
