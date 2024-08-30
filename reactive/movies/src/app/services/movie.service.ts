import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, debounce, debounceTime, delay, map } from 'rxjs';
import { ApiResponse, Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // key 2e389e30
  private readonly API_URL: string = 'https://www.omdbapi.com/?apikey=2e389e30';

  private readonly http: HttpClient = inject(HttpClient);

  getMovies(searchTerm: string): Observable<Movie[]> {
    return this.http.get<ApiResponse>(`${this.API_URL}&s=${searchTerm}`).pipe(
      map(response => response.Search)
    );
  }
}
