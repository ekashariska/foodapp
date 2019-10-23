import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from "firebase";
import { Events } from 'ionic-angular';

@Injectable()
export class AuthProvider {
  firedata = firebase.database().ref('/buyer');
  constructor(public http: HttpClient,public events: Events) {
    console.log('Hello AuthProvider Provider');
  }
  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }

}
