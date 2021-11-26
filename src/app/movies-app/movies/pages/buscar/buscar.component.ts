import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ServiceService } from '../../services/service.service';
import { Result } from '../../interfaces/popularMovies.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {
	public name:string = '';
	public movies!:Result[];

  constructor(
		private route:ActivatedRoute,
		private movieService:ServiceService,
	) { }

  ngOnInit(): void {
		this.route.params	
			.pipe(
				switchMap(({name})=>{
					this.name = name;
					return this.movieService.fetchBuscar(name)
				}),
			)
			.subscribe(
				res=> this.movies = res.results,
				err=> console.log('este es',err)
				
				);
			
  }

}
