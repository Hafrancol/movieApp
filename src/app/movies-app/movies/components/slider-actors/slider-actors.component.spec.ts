import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderActorsComponent } from './slider-actors.component';

describe('SliderActorsComponent', () => {
  let component: SliderActorsComponent;
  let fixture: ComponentFixture<SliderActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderActorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
