import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { switchMap,tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Movie, ProductionCompany } from '../../interfaces/movie.interface';
import { ServiceService } from '../../services/service.service';
import { Providers, Flatrate } from '../../interfaces/providers.service';
import { Cast } from '../../interfaces/credits.interface';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.scss']
})
export class VerMasComponent implements OnInit {
	public movie!:Movie;
	public providers:Flatrate [] = [];
	public actors:Cast[]= [];
	public productionCompany:ProductionCompany [] = []
	private id:number = 0;
	private key:string = "";
	dangerousVideoUrl:string = '';
	safeURL:any;

  constructor(
		private route:ActivatedRoute,
		private movieService:ServiceService,
		private sanitizer: DomSanitizer,
	) {  
	}
  ngOnInit(): void {


		this.route.params
			.pipe(
				switchMap(({id})=>this.movieService.fetchInfoAndVideos(id))
			)
			.subscribe((res)=>{
				this.movie = res;
				this.productionCompany = res.production_companies;
				console.log(res.production_companies)
				this.key = res.videos.results[0].key;
				this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.key;
				this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
			})

			this.route.params
			.pipe(
				switchMap(({id})=>this.movieService.fetchWatchProviders(id))
			)
			.subscribe((res)=>{
				this.providers = res.results.CO.flatrate;
			
			})

			this.route.params
			.pipe(
				switchMap(({id})=>this.movieService.fetchCredits(id))
			)
			.subscribe((res)=>{				
				this.actors = res.cast.splice(0,7);			
			})


  }

}
