import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KDatatableComponent } from './k-datatable.component';

describe('KDatatableComponent', () => {
  let component: KDatatableComponent;
  let fixture: ComponentFixture<KDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KDatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
