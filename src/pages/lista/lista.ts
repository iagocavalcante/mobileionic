import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UnidadePage } from "../unidade/unidade";
import { GranelPage } from "../granel/granel";
import { BackandService } from '@backand/angular2-sdk';


@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  unidade: any;
  granel: any;
  unidPage = UnidadePage;
  grlPage = GranelPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toast: ToastController, public backand: BackandService) {
  }
  listar() {
    let loader = this.loadingCtrl.create({
      content: "Atualizando lista de produtos..."
    });
    loader.present();

    this.backand.object.getList("unidade")
      .then((resp) => {
        this.unidade = resp.data;
      }).catch((err) => {
      });
    this.backand.object.getList("granel")
      .then((resp) => {
        this.granel = resp.data;
        loader.dismiss();
      }).catch((err) => {
      });

  }

  excluir(p) {
    let confirm = this.alertCtrl.create({
      title: 'Excluir produto',
      message: 'Deseja realmente excluir este registro?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Excluindo...'
            });
            loading.present();
            this.backand.object.remove("unidade", p.id).then((resp) => {
              let toast = this.toast.create({
                message: 'Produto excuído com sucesso!',
                duration: 2000
              });
              toast.present();
              loading.dismiss();
              this.listar();
            }).catch((err) => {

            });
          }
        }
      ]
    });
    confirm.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
    this.listar();
  }

}
