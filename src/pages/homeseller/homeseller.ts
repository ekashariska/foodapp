import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-homeseller',
  templateUrl: 'homeseller.html',
})
export class HomesellerPage {

  menu = [];
  refDatabase = firebase.database().ref('menu');

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private fbAuth: AngularFireAuth, public alertController: AlertController) {
    this.refDatabase.on('value', resp => {
      this.menu = [];
      this.menu = convertData(resp);
  });
}

ionViewDidLoad(){
  console.log('ionViewDidLoad HomesellerPage');
}

}

export const convertData = snapshot => {
  let returnArr = [];
  
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });
  // console.log(returnArr);
  
  return returnArr;
   
  }
