import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { SliderPopularComponent } from './slider-popular/slider-popular.component';
import { SliderTrendingComponent } from './slider-trending/slider-trending.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GrillaComponent } from './grilla/grilla.component';



@NgModule({
  declarations: [
    NavigationComponent,
    SliderPopularComponent,
    SliderTrendingComponent,
    MainPageComponent,
    GrillaComponent
  ],
  imports: [
    CommonModule
  ],
	exports:[
		MainPageComponent
	]
})
export class MoviesAppModule { }
