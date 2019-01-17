import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {RequestProvider} from "../../providers/request/request";
import {MovieDetailPage} from "../movie-detail/movie-detail";
import {FavoriteFileProvider} from "../../providers/favorite-file/favorite-file";


/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  private favorites = [];
  private msg;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
              public request: RequestProvider, public alertCtrl: AlertController,
              private file: FavoriteFileProvider) {
  }

  ionViewWillEnter() {
    this.setFavorites();
  }

  ionViewDidEnter() {
    this.favorites = this.favorites.sort((a, b) => {
      return a.Title > b.Title ? 1 : -1;
    })
  }

  getDetail(id) {
    this.navCtrl.push(MovieDetailPage, {'imdbID': id}).then().catch();
  }

  removeFavorite(fav) {
    {
      console.log(fav);
      this.favorites.splice(this.favorites.indexOf(fav.imdbID));
      this.storage.remove(fav.imdbID).then().catch();
    }
  }


  exportFavorites(ext) {
    try {
      this.file.getPermissionAndWrite(ext, this.favorites);
      this.msg = "File favorites." + ext + " was succesfully added to Download folder";
    } catch (e) {
      this.msg = e.toString();
    }
  }

  importFavorites() {
    let alert = this.alertCtrl.create({
      title: 'Confirm import',
      message: 'Do you want to import this favorite file ? ' +
        'All your favorites will be reset.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Import',
          handler: () => {
            this.file.getFileAndImport();
          }
        }
      ]
    });
    alert.present().then(()=>this.setFavorites()).catch();
  }

  setFavorites(){
    this.favorites = [];
    this.storage.keys()
      .then(keys => {
        for (let key of keys) {
          this.storage.get(key).then(data => {
            this.favorites.push(data);
          })
        }
      }).catch(err => {
      console.log(err);
    })
  }

}
