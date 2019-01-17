import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SerieDetailPage } from './serie-detail';

@NgModule({
  declarations: [
    SerieDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SerieDetailPage),
  ],
})
export class SerieDetailPageModule {}
