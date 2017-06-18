import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnidadePage } from './unidade';

@NgModule({
  declarations: [
    UnidadePage,
  ],
  imports: [
    IonicPageModule.forChild(UnidadePage),
  ],
  exports: [
    UnidadePage
  ]
})
export class UnidadePageModule {}
