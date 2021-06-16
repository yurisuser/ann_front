import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { TableService } from '../../services/table.service';
import { DialogService } from '../../services/dialog.service';
import { IGaleryTypes } from '../../../../models/galeryTypes';
import { ModalEditGaleryTypesComponent } from '../../modal/modal-edit-galery-types/modal-edit-galery-types.component';

@Component({
  selector: 'app-galery-types-editor',
  templateUrl: './galery-types-editor.component.html',
  styleUrls: ['./galery-types-editor.component.scss']
})
export class GaleryTypesEditorComponent implements OnInit {

  public dataSource: IGaleryTypes[];
  public displayedColumns = ['id', 'name', 'viewName', 'order', 'check'];
  public markedElement = [];
  private dialogRefEdit;
  galeryTypes: IGaleryTypes[];

  constructor(
      private tableSrv: TableService,
      public dialog: MatDialog,
      private dialogSrv: DialogService,
  ) { }

  ngOnInit() {
      this.getGaleryTypes();
  }

  getGaleryTypes() {
      this.tableSrv.getGaleryTypes()
          .subscribe(x => {
              this.dataSource = x;
          });
  }

  onEdit() {
      // tslint:disable-next-line: no-unused-expression
      !this.dialogRefEdit || this.dialogRefEdit.close();
      this.dialogRefEdit =  this.dialog.open(ModalEditGaleryTypesComponent, {
          data: {
              element: this.markedElement[0],
              text: 'Edit type',
          }
      });
      this.dialogRefEdit.afterClosed().pipe(
          switchMap(x => x ? this.tableSrv.updateGaleryType(x) : of(x)),
          switchMap(() => this.tableSrv.getGaleryTypes())
      )
      .subscribe(x => {
          this.dataSource = x;
          this.markedElement = [];
      });
  }

  onCreate() {
      // tslint:disable-next-line: no-unused-expression
      !this.dialogRefEdit || this.dialogRefEdit.close();
      this.dialogRefEdit =  this.dialog.open(ModalEditGaleryTypesComponent, {
          data: {
              element: {},
              text: 'New type',
          }
      });
      this.dialogRefEdit.afterClosed().pipe(
          switchMap(x => x ? this.tableSrv.createGaleryType(x) : of(x)),
          switchMap(() => this.tableSrv.getGaleryTypes())
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
        this.tableSrv.deleteGaleryType(this.markedElement.map(x => x.id)).pipe(
          switchMap(() => this.tableSrv.getGaleryTypes()),
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

}
