import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {File} from "@ionic-native/file";
import {AndroidPermissions} from "@ionic-native/android-permissions";

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {
  private url: string = "http://www.omdbapi.com/?apikey=e966fb5c";
  private poster_url: string = "http://img.omdbapi.com/?apikey=75522B56";

  constructor(public http: HttpClient, public file: File, private androidPermissions: AndroidPermissions) {}

  getById(str: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "&i=" + str + "&plot=full").subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

  searchMoviesByTitle(str: string, page: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "&s=" + str + "&page=" + page + "&type=movie").subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

  searchSeriesByTitle(str: string, page: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "&s=" + str + "&page=" + page + "&type=series").subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

  getSeason(id: string, season: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "&i=" + id + "&plot=full" + "&Season=" + season).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

  getEpisode(id: string, season: string, episode: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "&i=" + id + "&plot=full" + "&Season=" + season + "&Episode=" + episode).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

  getMoviePoster(movie_id: string) {
    return this.poster_url + "&i=" + movie_id + "&h=2048";
  }

  getAndWritePoster(movie_id: string) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.http.get(this.poster_url + "&i=" + movie_id + "&h=2048", {responseType: 'arraybuffer'}).toPromise()
            .then(data => {
              return this.file.writeFile(
                this.file.externalRootDirectory + "/Download/",
                movie_id + ".jpeg",
                data,
                {replace: true}
              );
            }).catch(err=>console.log(err));
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if (status.hasPermission) {
                this.http.get(this.poster_url + "&i=" + movie_id + "&h=2048", {responseType: 'arraybuffer'}).toPromise()
                  .then(data => {
                    return this.file.writeFile(
                      this.file.externalRootDirectory + "/Download/",
                      movie_id + ".jpeg",
                      data,
                      {replace: true}
                    );
                  }).catch(err=>console.log(err));
              }
            });
        }
      });
  }
}
