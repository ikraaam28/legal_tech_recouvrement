import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallcenterComponent } from './callcenter.component';

describe('CallcenterComponent', () => {
  let component: CallcenterComponent;
  let fixture: ComponentFixture<CallcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallcenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
