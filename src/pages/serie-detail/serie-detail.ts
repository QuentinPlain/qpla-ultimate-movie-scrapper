import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RequestProvider} from "../../providers/request/request";
import {SeasonDetailPage} from "../season-detail/season-detail";
import {Storage} from '@ionic/storage';

/**
 * Generated class for the SerieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serie-detail',
  templateUrl: 'serie-detail.html',
})
export class SerieDetailPage {
  public serie ;
  private seasons ;
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
    this.request.getById(this.navParams.data['imdbID'])
      .then(data =>{
        this.serie = data;
        this.seasons = Array(parseInt(this.serie.totalSeasons));
      })
      .catch(err=>{
        console.log(err);
      })
  }
  itemTapped(id:string, season:string) {
    this.navCtrl.push(SeasonDetailPage, {
      imdbID: id,
      season:season
    })
  }

  addFavorite() {
    this.storage.set(this.serie.imdbID, this.serie).then(data => {
      this.favorite = true;
    })
      .catch(err => {
        console.log(err);
      });
  }

  removeFavorite() {
    this.storage.remove(this.serie.imdbID)
      .then(data => {
        this.favorite = false;
      }).catch(err => {
      console.log(err)
    })
  }

}
