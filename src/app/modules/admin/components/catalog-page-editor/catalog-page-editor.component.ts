import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ICatalogElementsPages } from '../../../../models/catalogElementsPages';
import { TableService } from '../../services/table.service';
import { DialogService } from '../../services/dialog.service';
import { ImageService } from '../../services/image.service';
import { ICatalogElement } from '../../../../models/catalogElements';
// tslint:disable-next-line: max-line-length
import { ModalEditCatalogElementPageComponent } from '../../modal/modal-edit-catalog-element-page/modal-edit-catalog-element-page.component';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-catalog-page-editor',
  templateUrl: './catalog-page-editor.component.html',
  styleUrls: ['./catalog-page-editor.component.scss']
})
export class CatalogPageEditorComponent implements OnInit {
  dataSource: ICatalogElementsPages[];
  displayedColumns = ['id', 'catalogElement', 'headText', 'img', 'paragraphText', 'text', 'spreadsheetId', 'spreadSheetPageNum', 'check'];
  markedPage = [];
  dialogRefEdit;
  catalogElements: ICatalogElement[];

  constructor(
    private tableSrv: TableService,
    public dialog: MatDialog,
    private dialogSrv: DialogService,
    private imgSrv: ImageService,
  ) { }

  ngOnInit() {
    this.getCatalogElements();
    this.getCatalogPages();
  }

  getCatalogElements() {
    this.tableSrv.getCatalogElements()
    .subscribe(x => {
        this.catalogElements = x;
    });
  }

  getCatalogPages() {
    this.tableSrv.getCatalogPages()
    .subscribe(x => {
        this.dataSource = x;
    });
  }

  getCatalogViewName(id) {
    return this.catalogElements.find(x => x.id === id).viewName;
  }

  getFullPath(fileName: string): string {
    return this.imgSrv.getFullThumbPath(fileName);
  }

  onCheck(page) {
    if (this.markedPage.includes(page)) {
        return this.markedPage.splice(this.markedPage.indexOf(page), 1);
    }
    this.markedPage.push(page);
  }

  onCheckAll(event) {
    if (!event.checked) {
        return this.markedPage = [];
    }
    this.markedPage = this.dataSource.slice(0, this.dataSource.length);
  }

  onCreate() {
    // tslint:disable-next-line: no-unused-expression
    !this.dialogRefEdit || this.dialogRefEdit.close();
    this.dialogRefEdit =  this.dialog.open(ModalEditCatalogElementPageComponent, {
        data: {
            element: {},
            text: 'New element',
        }
    });
    this.dialogRefEdit.afterClosed().pipe(
        switchMap(x => x ? this.tableSrv.createCatalogPage(x) : of(x)),
        switchMap(() => this.tableSrv.getCatalogPages())
    )
    .subscribe(x => {
        this.dataSource = x;
        this.markedPage = [];
    });
  }

  async onDelete() {
    const message = () => {
        return `Are you sure to delete ${this.markedPage.length} page?`;
    };

    if (await this.dialogSrv.confirm(message())) {
    this.tableSrv.deleteCatalogPage(this.markedPage.map(x => x.id)).pipe(
        switchMap(() => this.tableSrv.getCatalogPages()),
        tap(() => this.markedPage = []),
    )
    .subscribe(x => {
        this.dataSource = x;
        this.markedPage = [];
    });
    }
  }

  onEdit() {
    // tslint:disable-next-line: no-unused-expression
    !this.dialogRefEdit || this.dialogRefEdit.close();
    this.dialogRefEdit =  this.dialog.open(ModalEditCatalogElementPageComponent, {
        data: {
            element: this.markedPage[0],
            text: 'Edit page',
        }
    });
    this.dialogRefEdit.afterClosed().pipe(
        switchMap(x => x ? this.tableSrv.updateCatalogPage(x) : of(x)),
        switchMap(() => this.tableSrv.getCatalogPages())
    )
    .subscribe(x => {
        this.dataSource = x;
        this.markedPage = [];
    });
}

}
