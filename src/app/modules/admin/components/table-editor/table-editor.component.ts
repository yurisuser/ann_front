import { Component, OnInit } from '@angular/core';

import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss']
})
export class TableEditorComponent implements OnInit {
  public imageExtensions = ['.jpg', '.jpeg', '.gif', '.png'];
  public selectedTableData;
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
