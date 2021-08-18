import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitcommandComponent } from './gitcommand.component';

describe('GitcommandComponent', () => {
  let component: GitcommandComponent;
  let fixture: ComponentFixture<GitcommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitcommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitcommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
