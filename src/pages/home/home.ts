import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SignupPage } from "../signup/signup";
import { ForgetPage } from "../forget/forget";
import { TabsPage } from "../tabs/tabs";
import { BackandService } from '@backand/angular2-sdk';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  ngOnInit() { };
  username: string = 'teste123@gmail.com';
  password: string = '12345678';
  auth_type: string = "N/A";
  is_auth_error: boolean = false;
  auth_status: string = null;
  loggedInUser: string = '';
  signupPage = SignupPage;
  esqPage = ForgetPage;
  constructor(public navCtrl: NavController, private backand: BackandService, public loadingCtrl: LoadingController) {


  }
  public getAuthTokenSimple(loading) {
    this.auth_type = 'Token';
    this.backand.signin(this.username, this.password)
      .then((data: any) => {
        console.log(data);
        this.auth_status = 'OK';
        this.is_auth_error = false;
        this.loggedInUser = data.data.username;
        this.username = '';
        this.password = '';
        let loading = this.loadingCtrl.create({
          content: 'Efetuando login...'
        });
        loading.present();
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      },
      (error: any) => {
        console.log(error);
        let errorMessage: string = error.data.error_description;
        this.auth_status = `Error: ${errorMessage}`;
        this.is_auth_error = true;
        console.log(errorMessage)
        this.auth_status = 'ERROR';
      }
      );
  }


}
