import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeasonDetailPage } from './season-detail';

@NgModule({
  declarations: [
    SeasonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SeasonDetailPage),
  ],
})
export class SeasonDetailPageModule {}
