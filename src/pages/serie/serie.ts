import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RequestProvider} from "../../providers/request/request";
import {SerieDetailPage} from "../serie-detail/serie-detail";

/**
 * Generated class for the SeriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serie',
  templateUrl: 'serie.html',
})
export class SeriePage {
  private series;
  private searchTerm: any = "";
  private searchResult;
  private paginator = 0;
  private page_paginator = "1";
  private all_series;
  private enableSearchbar = true ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: RequestProvider) {
  }

  onInput() {
    /**
     * Event handler pour la saisie d'un utilisateur
     */
    if (this.searchTerm.length >= 3) {
      this.request.searchSeriesByTitle(this.searchTerm, this.page_paginator)
        .then(data => {
          if (data['Response'] === "True") {
            this.searchResult = data["totalResults"];
            if (parseInt(data["totalResults"]) > 2) {
              this.all_series = data['Search'];
              this.series = data['Search'].slice(0, 2);

            } else {
              this.series = data['Search'];
            }
          } else {
            this.searchResult = "0";
          }

        })
        .catch(err => console.log(err));
    }else{
      // permet de reset l'affichage
      this.series = [] ;
      delete this.searchResult ;
      delete this.all_series ;
    }
  }

  getNext() {
    if (this.paginator === 8) {
      this.series = [] ;
      this.paginator = 0 ;
      this.page_paginator = (parseInt(this.page_paginator) + 1).toString() ;
      this.onInput();
    }
    this.paginator += 2;
    this.series = this.all_series.slice(this.paginator, this.paginator + 2);
  }

  getPrev() {
    if (this.paginator === 2){
      this.paginator = 8 ;
      this.series = [];
      this.page_paginator = (parseInt(this.page_paginator) - 1).toString() ;
      this.onInput();
    }
    this.series = this.all_series.slice(this.paginator - 2, this.paginator);
    this.paginator -= 2;
  }

  toggleSearchbar(){
    if(this.enableSearchbar){
      this.enableSearchbar = false ;
    }else{
      this.enableSearchbar = true ;
    }
  }

  itemTapped(item) {
    this.navCtrl.push(SerieDetailPage, {
      imdbID: item.imdbID
    })
  }

}
