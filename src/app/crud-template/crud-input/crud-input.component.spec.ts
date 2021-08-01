import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInputComponent } from './crud-input.component';

describe('CrudInputComponent', () => {
  let component: CrudInputComponent;
  let fixture: ComponentFixture<CrudInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
