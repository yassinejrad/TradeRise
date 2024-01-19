import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommenatireuserComponent } from './commenatireuser.component';

describe('CommenatireuserComponent', () => {
  let component: CommenatireuserComponent;
  let fixture: ComponentFixture<CommenatireuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommenatireuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommenatireuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
