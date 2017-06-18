import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';


@IonicPage()
@Component({
  selector: 'page-unidade',
  templateUrl: 'unidade.html',
})
export class UnidadePage {
  unidade: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService) {

    this.unidade = {};
  }

  addUnid() {
    this.backand.object.create("unidade", this.unidade).then((resp) => {
      console.log(this.unidade);
    }).catch((err) => {
      console.log(err);
    });
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad UnidadePage');
}

}
