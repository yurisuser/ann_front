import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import { ImageService } from '../../services/image.service';
import * as env from '../../../../../environments/environment';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-imager',
  templateUrl: './imager.component.html',
  styleUrls: ['./imager.component.scss']
})
export class ImagerComponent implements OnInit {

  list = [];
  selected = [];


  constructor(
    private imgSrv: ImageService,
    private dialogSrv: DialogService
  ) { }

  ngOnInit() {
    this.imgSrv.getListImg().pipe(
      map(x => {
        const arr = [];
        x.forEach(e => {
          arr.push({link: `${env.backEnd.address}/files/thumb/${e}`, name: e});
        });
        return arr;
      }),
    )
      .subscribe(x => this.list = x);
  }

  onClick(i) {
    const index = this.selected.indexOf(this.list[i]);
    if (index < 0) {
      this.selected.push(this.list[i]);
      return;
    }
    this.selected.splice(index, 1);
    console.log(this.selected);
  }

  isSelected(i) {
    return this.selected.includes(this.list[i]);
  }

  revertSelected() {
    this.selected = this.list.filter(x => !this.selected.includes(x));
  }

  clearSelected() {
    this.selected = [];
  }

  async deleteSelected() {
    const message = () => {
      return `Are you sure to delete ${this.selected.length} images?`;
    };
    if (await this.dialogSrv.confirm(message())) {
      const delarr = [];
      this.selected.map(x => delarr.push(x.name));
      this.imgSrv.deleteImages(delarr).pipe(
        switchMap(() => this.imgSrv.getListImg().pipe(
          map(x => {
            const arr = [];
            x.forEach(e => {
              arr.push({link: `${env.backEnd.address}/files/thumb/${e}`, name: e});
            });
            return arr;
          })
        )))
        .subscribe(x => {
          this.list = x;
          this.selected = [];
        });
    }
  }
}
