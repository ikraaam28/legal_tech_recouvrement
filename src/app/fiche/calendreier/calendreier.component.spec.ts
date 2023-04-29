import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendreierComponent } from './calendreier.component';

describe('CalendreierComponent', () => {
  let component: CalendreierComponent;
  let fixture: ComponentFixture<CalendreierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendreierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendreierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
