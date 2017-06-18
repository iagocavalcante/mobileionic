import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';


@IonicPage()
@Component({
  selector: 'page-granel',
  templateUrl: 'granel.html',
})
export class GranelPage {
  granel: any;
  user: any;


  auth_type: string = "N/A";
  is_auth_error: boolean = false;
  auth_status: string = null;
  loggedInUser: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService) {

    this.granel = {};
    this.user = {};
/*
    let id = this.navParams.get("id");
    if (id != undefined) {
      this.backand.object.getOne("users", id).then((resp) => {
        this.user = usuario;
        if (this.user.items == null) {
          this.user.items = [];
        }

      }).catch((errp) => {
      });
    }
*/
    this.backand.user.getUserDetails().then(
      (data: any) => {
        console.log(data);
        if (data.data) {
          this.loggedInUser = data.data.username;
          this.auth_status = 'OK';
          this.auth_type = data.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
        }
        else {
          this.auth_status = null;
        }
      },
      (err: any) => {
        console.log(err);
        this.loggedInUser = null;
        this.auth_status = null;
        this.auth_type = null;
      }
    );

  }
  /*addGranel() {
    this.backand.object.create("granel", this.granel).then((resp) => {
      console.log(this.granel);
      console.log(this.loggedInUser);

    }).catch((err) => {
      console.log(err);
    });
  }*/

  addGranel() {
    this.loggedInUser = this.granel.email;
    this.backand.object.create("granel", this.granel, this.granel.email).then((response) => {
      //this.user.items
      this.granel = {};
      console.log(this.granel)
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GranelPage');
  }

}
