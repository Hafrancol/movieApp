import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';







@Component({
  selector: 'app-slider-popular',
  templateUrl: './slider-popular.component.html',
  styleUrls: ['./slider-popular.component.scss']
})
export class SliderPopularComponent  {
	
	

  constructor(private serviceMovie:ServiceService) { }

		get result(){
			return this.serviceMovie.popularMovies;
		}
  

}
