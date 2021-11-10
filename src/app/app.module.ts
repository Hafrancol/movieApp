import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { MoviesAppModule } from './movies-app/movies-app.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
		MoviesAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
