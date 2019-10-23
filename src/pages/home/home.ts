import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';

import { ViewmenuPage } from '../viewmenu/viewmenu';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { initializeApp } from 'firebase';
import { AddtocartPage } from '../addtocart/addtocart';
import { CartProvider } from '../../providers/cart/cart';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

   item= {menuname:'',menuprice:'',menudesc:'',imageUrl:''};

  menu = [];
  refDatabase = firebase.database().ref('menu');

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public alertController: AlertController,private auth: AngularFireAuth,
     private db:AngularFireDatabase,private cartService:CartProvider) {
      this.refDatabase.on('value', resp => {
        this.menu = [];
        this.menu = convertData(resp);
      });
      
  }

viewmenu(item){
 
  this.navCtrl.push(ViewmenuPage,{item:item});
}

addtocart(){
  this.navCtrl.push(AddtocartPage);
}

}
export const convertData = snapshot => {
  let returnArr = [];
  
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });
  console.log(returnArr);
  
  return returnArr;
   
  }


