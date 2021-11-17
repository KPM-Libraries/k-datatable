import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KMylibComponent } from './k-mylib.component';

describe('KMylibComponent', () => {
  let component: KMylibComponent;
  let fixture: ComponentFixture<KMylibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KMylibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KMylibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
