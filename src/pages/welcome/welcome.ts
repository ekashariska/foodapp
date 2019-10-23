import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupFormPage } from '../signup-form/signup-form';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

signup(){
  this.navCtrl.push(SignupFormPage);
}

login(){
  this.navCtrl.push(LoginPage);
}

}
