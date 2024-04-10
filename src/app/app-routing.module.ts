import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
    {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tvshows',
    loadChildren: () => import('./tvshows/tvshows.module').then( m => m.TvshowsPageModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'movies/:id',
    loadChildren: () => import('./movie-details/movie-details.module').then( m => m.MovieDetailsPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
