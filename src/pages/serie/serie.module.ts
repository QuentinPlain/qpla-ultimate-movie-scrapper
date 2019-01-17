import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriePage } from './serie';

@NgModule({
  declarations: [
    SeriePage,
  ],
  imports: [
    IonicPageModule.forChild(SeriePage),
  ],
})
export class SeriePageModule {}
