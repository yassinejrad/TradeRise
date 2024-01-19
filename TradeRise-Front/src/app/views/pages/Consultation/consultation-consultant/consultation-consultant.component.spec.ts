import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationConsultantComponent } from './consultation-consultant.component';

describe('ConsultationConsultantComponent', () => {
  let component: ConsultationConsultantComponent;
  let fixture: ComponentFixture<ConsultationConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationConsultantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
