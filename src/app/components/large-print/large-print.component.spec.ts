import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargePrintComponent } from './large-print.component';

describe('LargePrintComponent', () => {
  let component: LargePrintComponent;
  let fixture: ComponentFixture<LargePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
