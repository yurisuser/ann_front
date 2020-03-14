import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { switchMap, tap } from 'rxjs/operators';

import { TableService } from '../../services/table.service';
import { DialogService } from '../../services/dialog.service';
import { ICatalogElement } from '../../models/catalogElements';
import { ModalEditCatalogElementComponent } from '../../modal/modal-edit-catalog-element/modal-edit-catalog-element.component';

@Component({
  selector: 'app-catalog-elements-editor',
  templateUrl: './catalog-elements-editor.component.html',
  styleUrls: ['./catalog-elements-editor.component.scss']
})
export class CatalogElementsEditorComponent implements OnInit {

  public dataSource: ICatalogElement[];
  public displayedColumns = ['id', 'viewName', 'img', 'catalogType', 'order', 'check'];
  public markedElement = [];
  private dialogRefEdit;

  constructor(
      private tableSrv: TableService,
      public dialog: MatDialog,
      private dialogSrv: DialogService,
  ) { }

  ngOnInit() {
      this.getCatalogTypes();
  }

  getCatalogTypes() {
      this.tableSrv.getCatalogElements()
          .subscribe(x => {
              this.dataSource = x;
          });
  }

  onEdit() {
      // tslint:disable-next-line: no-unused-expression
      !this.dialogRefEdit || this.dialogRefEdit.close();
      this.dialogRefEdit =  this.dialog.open(ModalEditCatalogElementComponent, {
          data: {
              element: this.markedElement[0],
              text: 'Edit element',
          }
      });
      this.dialogRefEdit.afterClosed().pipe(
          switchMap(x => this.tableSrv.updateCatalogElement(x)),
          switchMap(() => this.tableSrv.getCatalogElements())
      )
      .subscribe(x => {
          this.dataSource = x;
          this.markedElement = [];
      });
  }

  onCreate() {
      // tslint:disable-next-line: no-unused-expression
      !this.dialogRefEdit || this.dialogRefEdit.close();
      this.dialogRefEdit =  this.dialog.open(ModalEditCatalogElementComponent, {
          data: {
              element: {},
              text: 'New element',
          }
      });
      this.dialogRefEdit.afterClosed().pipe(
          switchMap(x => this.tableSrv.createCatalogElement(x)),
          switchMap(() => this.tableSrv.getCatalogElements())
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
        this.tableSrv.deleteCatalogElement(this.markedElement.map(x => x.id)).pipe(
          switchMap(() => this.tableSrv.getCatalogElements()),
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
