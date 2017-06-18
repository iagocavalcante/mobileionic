import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GranelPage } from './granel';

@NgModule({
  declarations: [
    GranelPage,
  ],
  imports: [
    IonicPageModule.forChild(GranelPage),
  ],
  exports: [
    GranelPage
  ]
})
export class GranelPageModule {}
