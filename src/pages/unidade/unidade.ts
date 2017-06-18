import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { ListaPage } from "../lista/lista";


@IonicPage()
@Component({
  selector: 'page-unidade',
  templateUrl: 'unidade.html',
})
export class UnidadePage {
lPage = ListaPage;

  unidade: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, public loadingCtrl:LoadingController) {

    this.unidade = {};
    let id  = this.navParams.get("id");
    // if nao for edicao este parametro sera undefined mas se for ele contera o ID do produto
    if(id!=undefined){
      // apenas mostra uma msg para o usuario
      let loading = this.loadingCtrl.create({
          content: 'Recuperando informações...'
      });
      loading.present();
      // busca um registro especifico pelo ID
      this.backand.object.getOne("unidade",id).then((resp)=>{
        // obtem o objeto e adiciona na variavel produto
        this.unidade = resp.data;
        //dispensa a mensagem
        loading.dismiss();
      }).catch((errp)=>{
      });
    }
  }
  
/*
  addUnid() {
    this.backand.object.create("unidade", this.unidade).then((resp) => {
      console.log(this.unidade);
    
    }).catch((err) => {
      console.log(err);
    });
  }
*/
  criar(loading){
    // apenas cria um produto
     this.backand.object.create("unidade", this.unidade).then((resp) => {
      loading.dismiss();
      // apos criar o produto, vai para a tela de Lista
    }).catch((err) => {
      console.log(err);
    });
  }

  cadastrar() {

    let loading = this.loadingCtrl.create({
      content: 'Salvando...'
    });
    loading.present();

    // se o produto tiver um ID é pq ele já foi cadastrado e esta operação é de UPDATE - Atualizar
    if( this.unidade.id!=undefined){
      // invoca a função atualizar
       this.atualizar(loading);
    }else{
      // caso o produto n"oa tenhan ID é pq ele nao foi cadastrado, logo CRIAR"
       this.criar(loading);
    }
  }

   atualizar(loading){
    // apenas atualiza o produto
       this.backand.object.update("unidade",this.unidade.id, this.unidade).then((resp) => {
      loading.dismiss();
       // apos atualizar o produto, vai para a tela de Lista
    }).catch((err) => {
      console.log(err);
    });
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad UnidadePage');
}

}
