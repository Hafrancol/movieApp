import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { SearchPopularMovie, Result } from '../../interfaces/popularMovies.interface';
import { tap } from 'rxjs/operators'
import { Results } from '../../interfaces/providers.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

	public popularsMovies:Result[] = [];
	public Moviesrecomendations: Result[] = [];
	public terminoBusqueda:string = '';
	public statusError:Boolean = false;

  constructor(
		private moviesService:ServiceService
	) { }

  ngOnInit(): void {
		this.moviesService.popularMovies()
			.subscribe(res => this.popularsMovies = res.results)
  }

	buscar(movie:string){
		
		this.terminoBusqueda = movie;
		this.moviesService.fetchBuscar(movie)
		.subscribe(
			res=>{
				this.Moviesrecomendations = res.results.splice(0,8);
				if(res.results.length){
					this.statusError = false;
					console.log(this.statusError)

				}else{
					this.statusError = true;
					console.log(this.statusError)
				}
			},
			err=> {
				console.log(err)
				this.statusError = true}
			)

	}

}
