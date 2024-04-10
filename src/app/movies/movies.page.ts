import { LoadingController } from '@ionic/angular';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies:any[] = [];
  currentPage:number = 1;
  imageBaseUrl = environment.images;
  searchTerm: string = "";
  

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController,private route: ActivatedRoute) { }

  ngOnInit() {
   this.loadMovies();
  }

  searchMovie() {
    this.movies = [];
    this.movieService.getSearchedMovie(this.searchTerm).subscribe((res:any) => {
      this.movies.push(...res.results)
    })
  }

  async loadMovies(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      spinner: 'bubbles',
    })
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res:any) => {
      loading.dismiss()
      this.movies.push(...res.results)

      event?.target.complete()
      //swift guard that it Can never run while at last page
      if(event){
        event.target.disabled = res.total_pages  === this.currentPage
      } 
    })
   }
   loadMoreMovies(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
    }
    addToFavorites(){
      const id = this.route.snapshot.paramMap.get('id');
      console.log('id', id)
    }
  } 
