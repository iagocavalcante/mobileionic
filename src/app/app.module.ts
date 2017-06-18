import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { GranelPage } from '../pages/granel/granel';
import { ListaPage } from '../pages/lista/lista';
import { UnidadePage } from '../pages/unidade/unidade';
import { TabsPage } from '../pages/tabs/tabs';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { UsuarioPage } from '../pages/usuario/usuario';
import { SignupPage } from "../pages/signup/signup";
import { ForgetPage } from "../pages/forget/forget";

import { BackandService } from '@backand/angular2-sdk'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GranelPage,
    ListaPage,
    UnidadePage,
    TabsPage,
    FavoritosPage,
    UsuarioPage,
    SignupPage,
    ForgetPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GranelPage,
    ListaPage,
    UnidadePage,
    TabsPage,
    FavoritosPage,
    UsuarioPage,
    SignupPage,
    ForgetPage
  ],
  providers: [
    BackandService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
