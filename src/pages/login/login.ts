import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { TabsPage } from '../tabs/tabs';
import { SignupFormPage } from '../signup-form/signup-form';
import { HomesellerPage } from '../homeseller/homeseller';
import { Tab1Page } from '../tab1/tab1';
import firebase from 'firebase';
import { WelcomePage } from '../welcome/welcome';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
// currentUser: User;
public showPassword: boolean = false;
public showConfirmPassword: boolean = false;
// backgroundImage = 'assets/imgs/bg-pattern.png';
signinForm: FormGroup;
rootPage:any;

constructor(public navCtrl: NavController, private menuCtrl: MenuController,
            public navParams: NavParams, private loadingCtrl: LoadingController,
            private alertCtrl: AlertController, private fbAuth: AngularFireAuth,
             public toastCtrl: ToastController)
            {}

ionViewDidLoad() {
  console.log('ionViewDidLoad SigninPage');
}

ngOnInit() {
  let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  this.signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    password: new FormControl('', [Validators.required]),
  });
}

 
Signin(form: NgForm) {
  const loading = this.loadingCtrl.create({
    content: 'Signin ',
    duration: 2000
  });
  loading.present();
  this.fbAuth.auth.signInWithEmailAndPassword(form.value.email, form.value.password) //firebase auth
  .then((_auth) => {
      loading.dismiss();
      console.log('good');
      this.navCtrl.setRoot(TabsPage);
      
    })
  .catch( error => {
    loading.dismiss();
      const alert = this.alertCtrl.create({
      title: 'Signin Failed!',
      message: error.message,
      buttons: ['OK']
    });
    alert.present();
  });  
  // if(form.value.level == "seller"){
  //   this.navCtrl.setRoot(Tab1Page);
  // }else {
  //   this.navCtrl.setRoot(TabsPage);
  // }
  
}

togglePassword(input:any): void {
  let currentType:string = document.getElementById(input).querySelector('.text-input').getAttribute('type');

  if (currentType === 'password') {
    if(input === 'password') {
      this.showPassword = true;
    } else {
      this.showConfirmPassword = true;
    }
    document.getElementById(input).querySelector('.text-input').setAttribute('type', 'text');
  } else {
    if(input === 'password') {
      this.showPassword = false;
    } else {
      this.showConfirmPassword = false;
    }
    document.getElementById(input).querySelector('.text-input').setAttribute('type', 'password');
  }
}

onPasswordReset() {
  // this.navCtrl.push(ResetPasswordPage);
}

signup(){
  this.navCtrl.push(SignupFormPage);
}

}
