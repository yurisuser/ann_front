import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ModalEditGaleryElementsComponent } from '../../modal/modal-edit-galery-elements/modal-edit-galery-elements.component';
import { TableService } from '../../services/table.service';
import { DialogService } from '../../services/dialog.service';
import { ImageService } from '../../services/image.service';
import { IGaleryElement } from '../../../../models/galeryElements';
import { IGaleryTypes } from '../../../../models/galeryTypes';

@Component({
  selector: 'app-galery-elements-editor',
  templateUrl: './galery-elements-editor.component.html',
  styleUrls: ['./galery-elements-editor.component.scss']
})
export class GaleryElementsEditorComponent implements OnInit {

  public dataSource: IGaleryElement[];
  public displayedColumns = ['id', 'viewName', 'img', 'galeryType', 'order', 'check'];
  public markedElement = [];
  private dialogRefEdit;
  galeryTypes: IGaleryTypes[];

  constructor(
      private tableSrv: TableService,
      public dialog: MatDialog,
      private dialogSrv: DialogService,
      private imgSrv: ImageService,
  ) { }

  ngOnInit() {
      this.getGaleryElements();
      this.getGaleryTypes();
  }

  getGaleryElements() {
      this.tableSrv.getGaleryElements()
          .subscribe(x => {
              this.dataSource = x;
          });
  }

  getGaleryTypes() {
      this.tableSrv.getGaleryTypes()
      .subscribe(x => {
          this.galeryTypes = x;
      });
  }

  getGaleryViewName(id) {
      return this.galeryTypes.find(x => x.id === id).viewName;
  }

  onEdit() {
      // tslint:disable-next-line: no-unused-expression
      !this.dialogRefEdit || this.dialogRefEdit.close();
      this.dialogRefEdit =  this.dialog.open(ModalEditGaleryElementsComponent, {
          data: {
              element: this.markedElement[0],
              text: 'Edit element',
          }
      });
      this.dialogRefEdit.afterClosed().pipe(
          switchMap(x => x ? this.tableSrv.updateGaleryElement(x) : of(x)),
          switchMap(() => this.tableSrv.getGaleryElements())
      )
      .subscribe(x => {
          this.dataSource = x;
          this.markedElement = [];
      });
  }

  onCreate() {
      // tslint:disable-next-line: no-unused-expression
      !this.dialogRefEdit || this.dialogRefEdit.close();
      this.dialogRefEdit =  this.dialog.open(ModalEditGaleryElementsComponent, {
          data: {
              element: {},
              text: 'New element',
          }
      });
      this.dialogRefEdit.afterClosed().pipe(
          switchMap(x => x ? this.tableSrv.createGaleryElement(x) : of(x)),
          switchMap(() => this.tableSrv.getGaleryElements())
      )
      .subscribe(x => {
          this.dataSource = x;
          this.markedElement = [];
      });
  }

  async onDelete() {
      const message = () => {
          return `Are you sure to delete ${this.markedElement.length} element?`;
      };

      if (await this.dialogSrv.confirm(message())) {
      this.tableSrv.deleteGaleryElement(this.markedElement.map(x => x.id)).pipe(
          switchMap(() => this.tableSrv.getGaleryElements()),
          tap(() => this.markedElement = []),
      )
      .subscribe(x => {
          this.dataSource = x;
          this.markedElement = [];
      });
      }
  }

  onCheck(element) {
      if (this.markedElement.includes(element)) {
          return this.markedElement.splice(this.markedElement.indexOf(element), 1);
      }
      this.markedElement.push(element);
  }

  onCheckAll(event) {
      if (!event.checked) {
          return this.markedElement = [];
      }
      this.markedElement = this.dataSource.slice(0, this.dataSource.length);
  }

  getFullPath(fileName: string): string {
      return this.imgSrv.getFullThumbPath(fileName);
  }
}
