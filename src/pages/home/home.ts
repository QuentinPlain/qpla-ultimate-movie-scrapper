import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RequestProvider} from "../../providers/request/request";
import {MoviePage} from "../movie/movie";
import {SeriePage} from "../serie/serie";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public movies;
  constructor(public navCtrl: NavController, public request: RequestProvider) {


  }
  itemTapped(event, item){
    this.navCtrl.push(MoviePage, {
      imdbID:item.imdbID
    })
  }
}
