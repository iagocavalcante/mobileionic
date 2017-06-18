import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { BackandService, Response } from '@backand/angular2-sdk'


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  res: string;
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private backand: BackandService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


  }
  getList(): void {
    this.res = 'fetching objects...';
    this.backand.object.getList('users').then((res: any) => {
      this.res = `${res.data.length} objects fetched`;
      console.log(res);
    })
  }
  ngOnInit(): void {
    this.backand.init({
      appName: 'trampo01',
      signUpToken: '22d7028f-eca1-4eac-b486-a5df79cefda7',
      anonymousToken: 'eb346060-f0c9-4770-9c78-e1432134690b',
    });
    this.getList();
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

