import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedAccountComponent } from './consolidated-account.component';

describe('ConsolidatedAccountComponent', () => {
  let component: ConsolidatedAccountComponent;
  let fixture: ComponentFixture<ConsolidatedAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
