import { Component, OnInit } from '@angular/core';

import { TableService } from '../../services/table.service';
import { DialogService } from '../../services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss']
})
export class TableEditorComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
