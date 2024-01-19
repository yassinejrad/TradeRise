import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseuserComponent } from './priseuser.component';

describe('PriseuserComponent', () => {
  let component: PriseuserComponent;
  let fixture: ComponentFixture<PriseuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriseuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriseuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
