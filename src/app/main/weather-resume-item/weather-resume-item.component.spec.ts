import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherResumeItemComponent } from './weather-resume-item.component';

describe('WeatherResumeItemComponent', () => {
  let component: WeatherResumeItemComponent;
  let fixture: ComponentFixture<WeatherResumeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherResumeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherResumeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
