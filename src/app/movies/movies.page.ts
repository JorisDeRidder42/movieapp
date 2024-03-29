import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getTopRatedMovies().subscribe((res: any) => {
      console.log(res)
    })
  }

}
