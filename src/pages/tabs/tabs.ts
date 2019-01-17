import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import {SeriePage} from "../serie/serie";
import {MoviePage} from "../movie/movie";
import {FavoritesPage} from "../favorites/favorites";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabMovies = MoviePage;
  tabSeries = SeriePage;
  tabFavorites = FavoritesPage;

  constructor() {

  }
}
