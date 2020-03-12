import { Component, OnInit } from '@angular/core';

import { TableService } from '../../services/table.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss']
})
export class TableEditorComponent implements OnInit {
  public imageExtensions = ['.jpg', '.jpeg', '.gif', '.png'];
  public selectedTableData = [];
  public selectedTableHeaders;
  public selectedTableName;
  public editableRowIndex: number;
  readonly tableObject = {
    types: {
      get: () => this.tableSrv.getCatalogTypes(),
      post: (x) => this.tableSrv.updateCatalogType(x),
    },
    elements: {
      get: () => this.tableSrv.getCatalogElements(),
      post: (x) => this.tableSrv.updateCatalogElement(x),
    },
  };

  constructor(
    private tableSrv: TableService,
    private dialogSrv: DialogService,
  ) { }

  ngOnInit() {
  }

  onLoadTable(tableName: string) {
    this.editableRowIndex = null;
    if (!tableName) {
      this.selectedTableData = null;
      this.selectedTableHeaders = null;
      this.selectedTableName = null;
      return;
    }
    this.selectedTableName = tableName;
    this.tableObject[tableName].get()
      .subscribe(x => {
        this.selectedTableHeaders = Object.getOwnPropertyNames(x[0]);
        this.selectedTableData = x.map(z => {
            return Object.values(z);
        });
    });
  }

  isImage(str: string): boolean {
    for (const ext of this.imageExtensions) {
      if (str.toString().endsWith(ext)) {
        return true;
      }
    }
    return false;
  }

  onEditRow(rowIndex?: number) {
    if (rowIndex >= 0) {
      this.editableRowIndex = rowIndex;
      return;
    }
    this.editableRowIndex = null;
  }

  async onDeleteRow(rowIndex) {
    if (rowIndex >= 0) {
      const message = () => {
        return `Are you sure to delete ${rowIndex} row?`;
      };
      if (await this.dialogSrv.confirm(message())) {
        this.tableSrv.deleteCatalogElement(this.selectedTableData[rowIndex][0])
          .subscribe(() => this.onLoadTable(this.selectedTableName));
      }
    }

  }
  onAdd() {
    const n = [];
    for (let i = 0; i < this.selectedTableData.length; i++) {
      n.push([]);
    }

    this.selectedTableData.push(n);
    console.log(this.selectedTableData);

    this.editableRowIndex = this.selectedTableData.length;
  }

  onAccept(row) {
    const obj = {};
    for (let i = 0; i < this.selectedTableHeaders.length; i++) {
      obj[this.selectedTableHeaders[i]] = row[i];
    }
    this.editableRowIndex = null;
    this.tableObject[this.selectedTableName].post(obj)
      .subscribe(() => this.onLoadTable(this.selectedTableName));
  }
}
