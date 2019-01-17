import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import {File} from '@ionic-native/file';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RequestProvider } from '../providers/request/request';
import {HttpClientModule} from "@angular/common/http";
import {MoviePage} from "../pages/movie/movie";
import {SeriePage} from "../pages/serie/serie";
import {TabsPage} from "../pages/tabs/tabs"
import {MovieDetailPage} from "../pages/movie-detail/movie-detail";
import {SerieDetailPage} from "../pages/serie-detail/serie-detail";
import {SeasonDetailPage} from "../pages/season-detail/season-detail";
import {EpisodePage} from "../pages/episode/episode";
import {FavoritesPage} from "../pages/favorites/favorites";
import {FileChooser} from "@ionic-native/file-chooser";

import { FavoriteFileProvider } from '../providers/favorite-file/favorite-file';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {FilePath} from "@ionic-native/file-path";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MoviePage,
    SeriePage,
    TabsPage,
    MovieDetailPage,
    SerieDetailPage,
    SeasonDetailPage,
    EpisodePage,
    FavoritesPage,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MoviePage,
    SeriePage,
    TabsPage,
    MovieDetailPage,
    SerieDetailPage,
    SeasonDetailPage,
    EpisodePage,
    FavoritesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RequestProvider,
    File,
    FileChooser,
    FavoriteFileProvider,
    AndroidPermissions,
    LocalNotifications,
    FilePath
  ]
})
export class AppModule {}
