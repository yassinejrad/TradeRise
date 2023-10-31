import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantFootrComponent } from './consultant-footr.component';

describe('ConsultantFootrComponent', () => {
  let component: ConsultantFootrComponent;
  let fixture: ComponentFixture<ConsultantFootrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantFootrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantFootrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
