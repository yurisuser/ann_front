import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamicTable.component.html',
  styleUrls: ['./dynamicTable.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @Input() spreadSheetId: string;
  @Input() spreadSheetList: number;
  tableName: string;
  displayedColumns: string[] = [];
  dataSource;

  constructor(
    private tabSrv: TableService
  ) { }

  ngOnInit() {
    this.tabSrv.getGoogleSpreadSheet(this.spreadSheetId, this.spreadSheetList)
      .subscribe(x => {
        this.tableName = x.name;
        this.displayedColumns = x.columns;
        this.dataSource = x.result;
      });
  }
}
