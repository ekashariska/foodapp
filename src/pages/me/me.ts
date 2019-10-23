import { Component } from '@angular/core';
import {  NavController, NavParams, App,Events } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { PurchasePage } from '../purchase/purchase';
import { WelcomePage } from '../welcome/welcome';
import { EditprofilePage } from '../editprofile/editprofile';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth,private app:App) {
  
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }

PurchasePage(){
  this.navCtrl.push(PurchasePage);
}

editprofile(){
  this.navCtrl.push(EditprofilePage);
}

 onLogout(){
   this.afAuth.auth.signOut()
  .then(() => {
    this.navCtrl.setRoot(WelcomePage);
    // this.nav.rootNav.setRoot(WelcomePage);
     this.app.getRootNav().setRoot(WelcomePage);
    console.log('logout');
  }).catch(function(error) {
    // An error happened.
  });
}

}
