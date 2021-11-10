import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTrendingComponent } from './slider-trending.component';

describe('SliderTrendingComponent', () => {
  let component: SliderTrendingComponent;
  let fixture: ComponentFixture<SliderTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderTrendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
