import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  imageBaseUrl = environment.images;
  movie: any | null = null;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
      this.movieService.getMovieDetails(id!).subscribe((res) => {
        this.movie = res;
      });
  }
  openHomePage(){
    window.open(this.movie.homepage);
  }
  addToFavorites(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id', id)
  }
}
