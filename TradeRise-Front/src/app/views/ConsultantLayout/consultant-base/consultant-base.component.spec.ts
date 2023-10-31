import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantBaseComponent } from './consultant-base.component';

describe('ConsultantBaseComponent', () => {
  let component: ConsultantBaseComponent;
  let fixture: ComponentFixture<ConsultantBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
