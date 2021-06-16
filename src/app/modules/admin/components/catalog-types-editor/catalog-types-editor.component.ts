import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ICatalogTypes } from '../../../../models/catalogTypes';
import { TableService } from '../../services/table.service';
import { DialogService } from '../../services/dialog.service';
import { ModalEditCatalogTypeComponent } from '../../modal/modal-edit-catalog-type/modal-edit-catalog-type.component';

@Component({
    selector: 'app-catalog-types-editor',
    templateUrl: './catalog-types-editor.component.html',
    styleUrls: ['./catalog-types-editor.component.scss']
})
export class CatalogTypesEditorComponent implements OnInit {

    public dataSource: ICatalogTypes[];
    public displayedColumns = ['id', 'name', 'viewName', 'order', 'check'];
    public markedElement = [];
    private dialogRefEdit;
    catalogTypes: ICatalogTypes[];

    constructor(
        private tableSrv: TableService,
        public dialog: MatDialog,
        private dialogSrv: DialogService,
    ) { }

    ngOnInit() {
        this.getCatalogTypes();
    }

    getCatalogTypes() {
        this.tableSrv.getCatalogTypes()
            .subscribe(x => {
                this.dataSource = x;
            });
    }

    onEdit() {
        // tslint:disable-next-line: no-unused-expression
        !this.dialogRefEdit || this.dialogRefEdit.close();
        this.dialogRefEdit =  this.dialog.open(ModalEditCatalogTypeComponent, {
            data: {
                element: this.markedElement[0],
                text: 'Edit type',
            }
        });
        this.dialogRefEdit.afterClosed().pipe(
            switchMap(x => x ? this.tableSrv.updateCatalogType(x) : of(x)),
            switchMap(() => this.tableSrv.getCatalogTypes())
        )
        .subscribe(x => {
            this.dataSource = x;
            this.markedElement = [];
        });
    }

    onCreate() {
        // tslint:disable-next-line: no-unused-expression
        !this.dialogRefEdit || this.dialogRefEdit.close();
        this.dialogRefEdit =  this.dialog.open(ModalEditCatalogTypeComponent, {
            data: {
                element: {},
                text: 'New type',
            }
        });
        this.dialogRefEdit.afterClosed().pipe(
            switchMap(x => x ? this.tableSrv.createCatalogtype(x) : of(x)),
            switchMap(() => this.tableSrv.getCatalogTypes())
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
          this.tableSrv.deleteCatalogType(this.markedElement.map(x => x.id)).pipe(
            switchMap(() => this.tableSrv.getCatalogTypes()),
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
