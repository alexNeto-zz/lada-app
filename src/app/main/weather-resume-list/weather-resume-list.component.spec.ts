import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherResumeListComponent } from './weather-resume-list.component';

describe('WeatherResumeListComponent', () => {
  let component: WeatherResumeListComponent;
  let fixture: ComponentFixture<WeatherResumeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherResumeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherResumeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
