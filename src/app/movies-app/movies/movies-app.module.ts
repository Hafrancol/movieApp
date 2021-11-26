import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { InputComponent } from './components/input/input.component';
import { GrillaComponent } from './components/grilla/grilla.component';
import { VerMasComponent } from './pages/ver-mas/ver-mas.component';
import { SliderComponent } from './components/slider/slider.component';
import { RouterModule } from '@angular/router';
import { SliderActorsComponent } from './components/slider-actors/slider-actors.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
	
		InputComponent,
		SliderComponent,
		MainPageComponent,
		VerMasComponent,
		GrillaComponent,
  	SliderActorsComponent,
   	BuscarComponent


  
    
  ],
  imports: [
    CommonModule,
		HttpClientModule,
		RouterModule,
		FormsModule
  ],
	exports:[
		MainPageComponent,
		VerMasComponent,
		BuscarComponent
		
		
	]
})
export class MoviesAppModule { }
