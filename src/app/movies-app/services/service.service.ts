import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { SearchPopularMovie, Result } from '../interfaces/popularMovies.interface';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

	private apiKey:string = '8b2cabf793b68b007b80387825d050b8';
	private baseUrl:string = 'https://api.themoviedb.org/3/';

	private resultsPopularMovies:Result[] = [];
	private resultsTrendingMovies:Result[] = [];
	



  constructor(private http: HttpClient) {

		this.fetchPopularMovies();
		this.fetchTrendingMovies();
	 }


	 get popularMovies(){
		 return [...this.resultsPopularMovies]
		 };

		get trendingMovies(){
			return [...this.resultsTrendingMovies]
		}





	 fetchPopularMovies(){
		const params = new HttpParams()
		.set('api_key',this.apiKey)
		.set('language','en-US')
		.set('page','1');

		console.log({params})

		this.http.get<SearchPopularMovie>(`${this.baseUrl}movie/popular`,{params})
			.subscribe((response)=>{
				this.resultsPopularMovies = response.results;
			});
	 }

	fetchTrendingMovies(){

		const params = new HttpParams()
		.set('api_key',this.apiKey)

		this.http.get<SearchPopularMovie>(`${this.baseUrl}/trending/all/day`,{params})
			.subscribe((response)=>{
					this.resultsTrendingMovies = response.results;
					console.log(this.resultsTrendingMovies)
			});

	}


}
