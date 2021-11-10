import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-slider-trending',
  templateUrl: './slider-trending.component.html',
  styleUrls: ['./slider-trending.component.scss']
})
export class SliderTrendingComponent implements OnInit {

  constructor(private serviceMovie:ServiceService) { }

	get result(){
		return this.serviceMovie.trendingMovies;
	}

  ngOnInit(): void {
  }

}
