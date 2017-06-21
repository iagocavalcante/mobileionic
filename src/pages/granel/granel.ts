import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { ListaPage } from "../lista/lista";


@IonicPage()
@Component({
	selector: 'page-granel',
	templateUrl: 'granel.html',
})
export class GranelPage {
	lPage = ListaPage;

	granel: any;
	user: any;

	/*
	  auth_type: string = "N/A";
	  is_auth_error: boolean = false;
	  auth_status: string = null;
	  loggedInUser: string = '';
	*/
	constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, public loadingCtrl: LoadingController) {

		this.granel = {};
		this.user = {};

		this.backand.user.getUserDetails().then(
			(data: any) => {
				this.user = data.data;
				console.log("USUARIO", data.data);
			},
			(err: any) => {
				console.log(err);

			}
		);

		let id = this.navParams.get("id");
		// if nao for edicao este parametro sera undefined mas se for ele contera o ID do produto
		if (id != undefined) {
			// apenas mostra uma msg para o usuario
			let loading = this.loadingCtrl.create({
				content: 'Recuperando informações...'
			});
			loading.present();
			// busca um registro especifico pelo ID
			this.backand.object.getOne("granel", id).then((resp) => {
				// obtem o objeto e adiciona na variavel produto
				this.granel = resp.data;
				//dispensa a mensagem
				loading.dismiss();
			}).catch((errp) => {
			});
		}

	}

	/*
	addGranel() {
	  this.backand.object.create("granel", this.granel).then((resp) => {
		console.log(this.granel);
		console.log(this.loggedInUser);
  
	  }).catch((err) => {
		console.log(err);
	  });
	}*/


	/*
	addGranel() {
	  //this.loggedInUser = this.granel.email;
	  this.backand.object.create("granel", this.granel, this.granel.email).then((response) => {
		//this.user.items
		this.granel = {};
		console.log(this.granel);
  
	  });
  
	}
  */

	criar(loading) {
		// apenas cria um produto
		let id = this.user.userId
		this.granel.user = id
		this.backand.object.create("granel", this.granel).then((resp) => {
				loading.dismiss();
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
		if (this.granel.id != undefined) {
			// invoca a função atualizar
			this.atualizar(loading);
		} else {
			// caso o produto n"oa tenhan ID é pq ele nao foi cadastrado, logo CRIAR"
			this.criar(loading);
		}
	}

	atualizar(loading) {
		// apenas atualiza o produto
		this.backand.object.update("granel", this.granel.id, this.granel).then((resp) => {
			loading.dismiss();
			// apos atualizar o produto, vai para a tela de Lista
		}).catch((err) => {
			console.log(err);
		});
	}


	ionViewDidLoad() {
		console.log('ionViewDidLoad GranelPage');
	}

}
