import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { SearchPopularMovie, Result } from '../../interfaces/popularMovies.interface';
import { tap } from 'rxjs/operators'
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
	public popularsMovies:Result[] = [];
  constructor(
		private moviesService:ServiceService
	) { }

  ngOnInit(): void {
		this.moviesService.popularMovies()
			.subscribe(res => this.popularsMovies = res.results)
  }

}
