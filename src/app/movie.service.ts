import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
  query: string;
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  searchTerm:string = "";
  movies:any[] = [];

  constructor(private http: HttpClient) { }

  getTopRatedMovies(page = 1) : Observable<ApiResult>{  
    return this.http.get<ApiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`)
  }
  getTopRatedShows(page = 1) : Observable<ApiResult>{  
    return this.http.get<ApiResult>(`${environment.baseUrl}/tv/popular?api_key=${environment.apiKey}&page=${page}`)
  }

  getSearchedMovie(searchTerm:string): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/search/movie?query=${searchTerm}&api_key=${environment.apiKey}`)
    // return this.http.get<any>('https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=3329aa4b909d13a4c1b9b9f507bc3008');
  }

  getMovieDetails(id: string){
    return this.http.get(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`)
  }
  getAddToFavoriteMovies(id: string){
    this.http.get(`${environment.baseUrl}/account/${id}/movies?api_key=${environment.apiKey}`)
  }
}
