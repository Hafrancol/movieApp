import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchPopularMovie } from '../interfaces/popularMovies.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Movie } from '../interfaces/movie.interface';
import { Providers } from '../interfaces/providers.service';
import { Credits } from '../interfaces/credits.interface';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
	//https://www.youtube.com/watch?v=h6hZkvrFIj0 key to watch using get video
	//https://www.themoviedb.org/talk/5955219ec3a3680d73048c7e
	private apiKey:string = '8b2cabf793b68b007b80387825d050b8';
	private baseUrl:string = 'https://api.themoviedb.org/3/';

	params = new HttpParams()
		.set('api_key',this.apiKey)
		.set('language','en-US')

  constructor(
		private http:HttpClient
	) { }

	popularMovies():Observable<SearchPopularMovie>{
		return this.http.get<SearchPopularMovie>(`${this.baseUrl}movie/popular`,{params:this.params})
		
	}

	fetchInfoAndVideos(id:number):Observable<Movie>{
		const params = new HttpParams()
		.set('api_key',this.apiKey)
		.set('append_to_response','videos');

		return this.http.get<Movie>(`${this.baseUrl}/movie/${id}`,{params})
	}

	fetchWatchProviders(id:number):Observable<Providers>{

		return this.http.get<Providers>(`${this.baseUrl}/movie/${id}/watch/providers?api_key=${this.apiKey}`)

	}

	fetchCredits(id:number):Observable<Credits>{
		const params = new HttpParams().set('api_key',this.apiKey)
		return this.http.get<Credits>(`${this.baseUrl}movie/${id}/credits`,{params})
	}

	fetchBuscar(query:string):Observable<SearchPopularMovie>{
		const params = new HttpParams()
		.set('api_key',this.apiKey)
		.set('page','1')
		.set('query',query)
		
	
		return this.http.get<SearchPopularMovie>(`${this.baseUrl}search/movie`,{params})
	}

	

}
