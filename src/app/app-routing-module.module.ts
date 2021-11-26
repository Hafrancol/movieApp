import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './movies-app/movies/pages/main-page/main-page.component';
import { VerMasComponent } from './movies-app/movies/pages/ver-mas/ver-mas.component';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { BuscarComponent } from './movies-app/movies/pages/buscar/buscar.component';

const routes: Routes = [
	{path: '',component: MainPageComponent},
	{path:'vermas/:id', component: VerMasComponent},
	{path:'buscar/:name',component:BuscarComponent},
	{path:'**',redirectTo:''}


];

@NgModule({
  declarations: [

	],
  imports: [
    CommonModule,
		RouterModule.forRoot(routes)
  ],
	exports:[
		RouterModule
	]
})
export class AppRoutingModuleModule { }
