import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RequestProvider} from "../../providers/request/request";
import {EpisodePage} from "../episode/episode";
import {Storage} from '@ionic/storage';

/**
 * Generated class for the SeasonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-season-detail',
  templateUrl: 'season-detail.html',
})
export class SeasonDetailPage {
  private season ;
  public season_id;
  public serie_id;
  private favorite = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public request:RequestProvider, private storage: Storage) {
    this.season_id = this.navParams.data['season'];
    this.serie_id = this.navParams.data['imdbID'];
    this.storage.get(this.navParams.data['imdbID'])
      .then(data => {
        if(data){
          this.favorite = true;
        }
      }).catch(err => {
      console.log(err);
    });
    this.request.getSeason(this.navParams.data['imdbID'], this.navParams.data['season'])
      .then(data =>{
        this.season = data;
      })
      .catch(err=>{
        console.log(err);
      })

      

  }

  itemTapped(episode){
    this.navCtrl.push(EpisodePage, {
      imdbID: this.serie_id,
      season:this.season_id,
      episode:episode
    })
  }

  addFavorite() {
    this.storage.set(this.season.imdbID, this.season).then(data => {
      this.favorite = true;
    })
      .catch(err => {
        console.log(err);
      });
  }

  removeFavorite() {
    this.storage.remove(this.season.imdbID)
      .then(data => {
        this.favorite = false;
      }).catch(err => {
      console.log(err)
    })
  }

}
