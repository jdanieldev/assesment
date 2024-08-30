import { Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from 'src/app/interfaces/movies';
import { Observable, Subject, Subscription, debounceTime, filter, fromEvent, map, of, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnDestroy {

  private readonly _$destroy = new Subject<void>();

  @ViewChild('movieSearchInput', { static: true }) movieSearchInput!: ElementRef;
  movies: Movie[] = [];

  private readonly movieService: MovieService = inject(MovieService);

  ngOnInit() {
    fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup').pipe(
      takeUntil(this._$destroy),
      map((e: Event) => (e.target as HTMLInputElement).value),
      //filter((searchTerm: string) => searchTerm.length > 3),
      debounceTime(500),
      //distinct(),
      switchMap((searchTerm: string) => (searchTerm.length > 3 ? this.movieService.getMovies(searchTerm) : of([])))
    ).subscribe((value: Movie[]) => this.movies = value)
  }

  ngOnDestroy(): void {
    this._$destroy.next();
    this._$destroy.complete();
  }
}
