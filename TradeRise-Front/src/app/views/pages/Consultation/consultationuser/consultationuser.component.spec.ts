import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationuserComponent } from './consultationuser.component';

describe('ConsultationuserComponent', () => {
  let component: ConsultationuserComponent;
  let fixture: ComponentFixture<ConsultationuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
