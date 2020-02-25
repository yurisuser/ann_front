import { Component, OnInit } from '@angular/core';

import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss']
})
export class TableEditorComponent implements OnInit {
  public selectedTableData;
  public selectedTableHeaders;
  readonly tableObject = {
    types: {
      get: this.tableSrv.getCatalogTypes(),
    },
    elements: {
      get: this.tableSrv.getCatalogElements()
    },
  };
  constructor(
    private tableSrv: TableService,
  ) { }

  ngOnInit() {
  }

  onSelectTable(evt) {
    this.tableObject[evt.target.value].get
      .subscribe(x => {
        console.log(x);
        this.selectedTableHeaders = Object.getOwnPropertyNames(x[0]);
        this.selectedTableData = x.map(z => {
            return Object.values(z);
        });
    });
  }
}
