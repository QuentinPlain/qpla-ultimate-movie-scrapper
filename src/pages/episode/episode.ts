import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RequestProvider} from "../../providers/request/request";
import {Storage} from '@ionic/storage';

/**
 * Generated class for the EpisodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html',
})
export class EpisodePage {
  private episode ;
  private favorite = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public request:RequestProvider, private storage: Storage) {
    this.storage.get(this.navParams.data['imdbID']) 
      .then(data => {
        if(data){
          this.favorite = true;
        }
      }).catch(err => {
      console.log(err);
    });
    this.request.getEpisode(this.navParams.data['imdbID'], this.navParams.data['season'], this.navParams.data['episode'])
      .then(data =>{
        this.episode = data ;
        console.log(this.episode);
      })
      .catch(err =>{
        console.log(err);
      })
  }

  addFavorite() {
    this.storage.set(this.episode.imdbID, this.episode).then(data => {
      this.favorite = true;
    })
      .catch(err => {
        console.log(err);
      });
  }

  removeFavorite() {
    this.storage.remove(this.episode.imdbID)
      .then(data => {
        this.favorite = false;
      }).catch(err => {
      console.log(err)
    })
  }
}
