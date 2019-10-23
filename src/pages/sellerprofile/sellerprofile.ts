import { Component } from '@angular/core';
import {  NavController, NavParams, App, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyshopPage } from '../myshop/myshop';
import { WelcomePage } from '../welcome/welcome';
import { EditprofilePage } from '../editprofile/editprofile';

@Component({
  selector: 'page-sellerprofile',
  templateUrl: 'sellerprofile.html',
})
export class SellerprofilePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     public afAuth: AngularFireAuth,
     private app:App) 
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerprofilePage');
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

  editprofile(){
    this.navCtrl.push(EditprofilePage);
  }

  myshop(){
    this.navCtrl.push(MyshopPage);
  }
}
