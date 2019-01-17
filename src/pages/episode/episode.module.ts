import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EpisodePage } from './episode';

@NgModule({
  declarations: [
    EpisodePage,
  ],
  imports: [
    IonicPageModule.forChild(EpisodePage),
  ],
})
export class EpisodePageModule {}
