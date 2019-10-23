import { Component, NgZone } from '@angular/core';
import { Platform, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { Tab1Page } from '../pages/tab1/tab1';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { UsercrudProvider } from '../providers/usercrud/usercrud';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // rootPage:any = SignupPage;
  // rootPage:any = SignupFormPage;
  rootPage:any;
  level:any;

  
  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              private fbAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public zone:NgZone, 
              public userservice: UsercrudProvider,
              public loadingCtrl:LoadingController) 
  {
  this.initializePlatform();
  // let loader = this.loadingCtrl.create();
  // loader.present();
  // this.listenToUserStatusUpdate(loader);
  // let fireBaseUser = firebase.auth().currentUser;
  // console.log(fireBaseUser);
  // this.rootPage = fireBaseUser ? TabsPage : LoginPage // so aku set if login masuk tabs, not login masuk LoginPage 
  // this.rootPage = WelcomePage;

  firebase.auth().onAuthStateChanged((user) => {
    // console.log("3");
    if (user) {  //if signed in
      this.userservice.getUserDetails().then((res: any) => {
        this.level = res.displayName;
        // console.log(this.username);
        if (this.level === 'seller'){
          this.rootPage = Tab1Page;
        } else if (this.level === 'buyer' ) {
          this.rootPage = TabsPage;
        } 
          }).catch(()=>{
            console.log("first time");
            this.rootPage = LoginPage;
          });
        } 
      })
      
  let fireBaseUser = firebase.auth().currentUser;
  this.rootPage = fireBaseUser ? TabsPage : WelcomePage;
  }

  initializePlatform(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // listenToUserStatusUpdate(loader: any) {
  //   firebase.auth().onAuthStateChanged((user) => {
  //   if(loader)
  //   loader.dismiss();
  //   console.log('The User:', user);
  //   if (user) {  //if signed in
  //           if(user.displayName == 'buyer'){  
  //             this.rootPage = TabsPage;
  //             console.log('buyer');
  //             } else { // kalau seller
  //             this.rootPage = Tab1Page;
  //             console.log('seller');
  //           }
  //       } else {
  //         // no user
  //         this.rootPage = WelcomePage;
  //         console.log('tak login');
  //         }
  //   });
  // }

  
   
}

