import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  readonly filterObject = {};
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() sourceData = [];
  @Input() fields;
  @Output() filterEmiter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  aplyFilter(): void {
    let result = this.sourceData;
    for (const key in this.filterObject) {
      if (!this.filterObject[key]) continue;
      result = result.filter(x => {
        if(typeof x[key].includes !== "undefined"){ //если строка
          return x[key].includes(this.filterObject[key]);
        }
        return x[key] == this.filterObject[key];
      })
    }
    this.filterEmiter.emit(result);
  }

  setFilter({ target: { value, id } }: { target: HTMLInputElement }): void {
    this.filterObject[id] = value;
    this.aplyFilter();
  }
}
