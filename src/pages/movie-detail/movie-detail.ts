import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RequestProvider} from "../../providers/request/request";
import {Storage} from '@ionic/storage';
import {LocalNotifications} from "@ionic-native/local-notifications";


/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {
  private movie;
  private poster;
  private favorite = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public request: RequestProvider,
              private storage: Storage, private notif:LocalNotifications) {
    this.storage.get(this.navParams.data['imdbID']) 
      .then(data => {
        if(data){
          this.favorite = true;
        }
      }).catch(err => {
      console.log(err);
    });
    this.request.getById(this.navParams.data['imdbID'])
      .then(data => {
        this.movie = data;
        this.poster = request.getMoviePoster(this.navParams.data['imdbID']);
      })
      .catch(err => {
        console.log(err);
      })
  }

  addFavorite() {
    this.storage.set(this.movie.imdbID, this.movie).then(data => {
      this.favorite = true;
    })
      .catch(err => {
        console.log(err);
      });
  }

  removeFavorite() {
    this.storage.remove(this.movie.imdbID)
      .then(data => {
        this.favorite = false;
      }).catch(err => {
      console.log(err)
    })
  }
  downloadPoster(){
    this.request.getAndWritePoster(this.movie.imdbID);
    this.notif.schedule({
      text: "Movie poster is available in download folder."
    })
  }
}
