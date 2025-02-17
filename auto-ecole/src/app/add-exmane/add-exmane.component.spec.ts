import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExmaneComponent } from './add-exmane.component';

describe('AddExmaneComponent', () => {
  let component: AddExmaneComponent;
  let fixture: ComponentFixture<AddExmaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExmaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExmaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
