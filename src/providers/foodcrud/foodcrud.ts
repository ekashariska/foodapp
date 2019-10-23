import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { ListPage } from '../../pages/list/list';

@Injectable()
export class FoodcrudProvider {
  // newmenu = {uid:'', menuname:'', menudesc:'',menuprice:'', quantity:'', imageUrl:''}

  // menuRef = firebase.database().ref('/menu');
  // menu: Array<any> = [];
  firedata = firebase.database().ref('/menu');
  
  constructor(public http: HttpClient, public events: Events,
    public afStorage: AngularFireStorage, public db: AngularFireDatabase,
    private afireAuth:AngularFireAuth,
    public navParams: NavParams,) {
    console.log('Hello FoodcrudProvider Provider');
  }

  //   saveMenu(menuname: string,  menudesc: string,menuprice: string, 
  //     imageUrl: string,
  //      quantity:number, time: Date): any { //add to firebase
  //       return firebase.database().ref('menu').push({uid:this.afireAuth.auth.currentUser.uid, menudesc,menuname, menuprice ,quantity,imageUrl, time }); 

  // } 

  saveMenu(url,menuForm){
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('menu').push({
      uid:this.afireAuth.auth.currentUser.uid,
      menuname: menuForm.menuname,
      menudesc: menuForm.menudesc,
      menuprice: menuForm.menuprice,
      quantity: menuForm.quantity,
      time: menuForm.time,
      imageurl: url
      }).then(() => {
        console.log("jadi");
          resolve({ success: true });
          }).catch((err) => {
        console.log("tak jadi");
              reject(err);
          })
      })
      return promise;
  }

  // getMenuDetails(){
  //   var promise = new Promise((resolve , reject) => {
  //     this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
  //         resolve(snapshot.val());
  //     }).catch((err) => {
  //       console.log(err);
  //         reject(err);
  //     })
  //   })
  //   return promise;
  // }


    updateMenuPic(imageurl) { //store profilepic from storage to db
      var promise = new Promise((resolve, reject) => {
        // this.afireAuth.auth.currentUser.updateMenu({
        //   imageurl: imageurl,
        // }).then(() => {
          this.firedata.child(this.afireAuth.auth.currentUser.uid).update({imageurl: imageurl,
          }).then(() => {
          firebase.database().ref('menu/' + firebase.auth().currentUser.uid).update({
          imageurl: imageurl,
          }).then(() => {
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
              })
            })
          })
          // .catch((err) => {
          //   reject(err);
          // })
      // })
        return promise;
}
 
}


