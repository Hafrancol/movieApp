import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { SharedModule } from './movies-app/shared/shared.module';
import { MoviesAppModule } from './movies-app/movies/movies-app.module';
import { AppRoutingModuleModule } from './app-routing-module.module';






@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
		SharedModule,
		MoviesAppModule,
		AppRoutingModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
