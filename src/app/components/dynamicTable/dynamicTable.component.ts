import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './dynamicTable.component.html',
  styleUrls: ['./dynamicTable.component.scss']
})
export class DynamicTableComponent implements OnInit {
  tableName: string;
  displayedColumns: string[] = [];
  dataSource;

  constructor(
    private tabSrv: TableService
  ) { }

  ngOnInit() {
    this.tabSrv.getGoogleSpreadSheet('1RcqPesW1hDsTqc57iNDxzgMHXfLxxAPJYkz26wCQv3c', 2)
      .subscribe(x => {
        this.tableName = x.name;
        console.log(x.name);
        this.displayedColumns = x.columns;
        console.log(x.columns);
        this.dataSource = x.result;
        console.log(x.result);
      });
  }
}
