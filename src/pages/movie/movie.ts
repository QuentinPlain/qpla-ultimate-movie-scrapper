import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RequestProvider} from "../../providers/request/request";
import {MovieDetailPage} from "../movie-detail/movie-detail";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the MoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})
export class MoviePage {
  private movies = new Set(); // les 10 films à afficher
  private searchTerm: any = ""; // la recherche
  private searchResult; // le nombre de résultat
  private page_paginator = "1"; // la page en cours
  private enableSearchbar = true;
  private favorites = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public request: RequestProvider, private storage: Storage) {
    this.storage.keys()
      .then(keys => {
        for (let key of keys) {
          this.favorites.push(key);
        }
      }).catch(err => {
      console.log(err);
    })
  }

  onInput() {
    /**
     * Event handler pour la saisie d'un utilisateur
     */
    if (this.searchTerm.length >= 3) {
      this.request.searchMoviesByTitle(this.searchTerm, this.page_paginator)
        .then(data => {
          if (data['Response'] === "True") {
            this.searchResult = data["totalResults"];
            this.movies = data['Search'];
            console.log(this.favorites);
          } else {
            this.searchResult = "0";
          }
        })
        .catch(err => console.log(err));
    } else {
      // permet de reset l'affichage
      this.movies = new Set();
      delete this.searchResult;
    }
  }

  getNext(infiniteScroll) {
    this.page_paginator = (parseInt(this.page_paginator) + 1).toString();
    setTimeout(function (self) {
      self.request.searchMoviesByTitle(self.searchTerm, self.page_paginator)
        .then(data => {
          if (data['Response'] === "True") {
            self.searchResult = data["totalResults"];
            if (data['Search'] !== self.movies) {
              self.movies = self.movies.concat(data['Search']);
              infiniteScroll.complete();
            }
          } else {
            self.searchResult = "0";
          }
        })
        .catch(err => console.log(err));
    }, 500, this);

  }


  toggleSearchbar() {
    if (this.enableSearchbar) {
      this.enableSearchbar = false;
    } else {
      this.enableSearchbar = true;
    }
  }

  itemTapped(item) {
    this.navCtrl.push(MovieDetailPage, {
      imdbID: item.imdbID
    })
  }

  isFavorite(id) {
    let is_fav = false;
    this.storage.get(this.navParams.data['imdbID']) // si le film est dans les favoris de l'user
      .then(data => {
        if (data) {
          is_fav = true;
          return is_fav;
        }
      }).catch(err => {
      return is_fav;
    });
  }
}



