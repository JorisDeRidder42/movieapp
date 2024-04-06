import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.page.html',
  styleUrls: ['./tvshows.page.scss'],
})
export class TvshowsPage implements OnInit {
  shows:any[] = [];
  currentPage:number = 1;
  imageBaseUrl = environment.images;
  searchTerm: string = "";

  constructor(private showService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadShows()
  }

  async loadShows(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      spinner: 'bubbles',
    })
    await loading.present();

    this.showService.getTopRatedShows(this.currentPage).subscribe((res:any) => {
      loading.dismiss()
      this.shows.push(...res.results)

      event?.target.complete()
      //swift guard that it Can never run while at last page
      if(event){
        event.target.disabled = res.total_pages  === this.currentPage
      } 
    })
   }
   loadMoreShows(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadShows(event);
  }

}
