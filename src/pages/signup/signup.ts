import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'
import { HomePage } from "../home/home";
//implementar alert de confirmação de cadastro.
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  ngOnInit() {
  }

  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, public alertCtrl: AlertController) {

    this.user = {};

  }

  public signUp() {
    if (this.backand.object.signUpPassword != this.backand.object.confirmPassword) {
      let alertd = this.alertCtrl.create({
          title: 'Senhas diferentes!',
          subTitle: 'As senhas não são iguais.',
          buttons: ['OK']
        });
        alertd.present();
      //alert('Senhas não batem!');
      return;
    }
    this.backand.signup(this.user.firstName, this.user.lastName, this.user.email, this.user.signUpPassword, this.user.confirmPassword)
      .then((data: any) => {
         let alertd = this.alertCtrl.create({
          title: 'Obrigado '+ this.user.firstName + '!',
          subTitle: 'Email cadastrado: '+ this.user.email ,
          buttons: ['OK']
        });
        alertd.present();
        //alert('Sign up succeeded');
        this.user.email = this.user.signUpPassword = this.user.confirmPassword = this.user.firstName = this.user.lastName = '';
        this.navCtrl.setRoot(HomePage);
      },
      (err: any) => {
        console.log(err)
      }
      );

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
