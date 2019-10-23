import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UsercrudProvider {

  firedata = firebase.database().ref('/user-profile');

  constructor(public http: HttpClient, private afireAuth:AngularFireAuth) {
    console.log('Hello UsercrudProvider Provider');
  }


    addUser(newuser) { // user registration
      var promise = new Promise((resolve , reject) => {
          this.afireAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(()=>{
            this.afireAuth.auth.currentUser.updateProfile({
               displayName: newuser.level,
               photoURL: 'https://firebasestorage.googleapis.com/v0/b/foodapp-ab746.appspot.com/o/icon%2Fuser.png?alt=media&token=eafabe55-2727-4c87-a4f2-4f172d427ca4'
            }).then(() => {
              this.firedata.child(this.afireAuth.auth.currentUser.uid).set({
                uid:this.afireAuth.auth.currentUser.uid,
                displayName: newuser.level,
                email: newuser.email,
                address:newuser.address,
                phoneNumber: newuser.phonenumber,
                FullName:newuser.name,
                photoURL:'https://firebasestorage.googleapis.com/v0/b/foodapp-ab746.appspot.com/o/icon%2Fuser.png?alt=media&token=eafabe55-2727-4c87-a4f2-4f172d427ca4'
              }).then(()=>{
                resolve(true);
                console.log('saveprofile');
              }).catch((err)=>{
                reject(err);
              })
            }).catch((err)=>{
              reject(err);
            })
          }).catch((err)=>{
            reject(err);
          })
      })
      return promise
    }

    getUserDetails(){
      var promise = new Promise((resolve , reject) => {
        this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
            resolve(snapshot.val());
        }).catch((err) => {
          console.log(err);
            reject(err);
        })
      })
      return promise;
    }

    updateProfilePic(photoURL) { //store profilepic from storage to db
      var promise = new Promise((resolve, reject) => {
        this.afireAuth.auth.currentUser.updateProfile({
         photoURL: photoURL
        }).then(() => {
          this.firedata.child(this.afireAuth.auth.currentUser.uid).update({photoURL:photoURL}).then(() => {
          firebase.database().ref('user-profile/' + firebase.auth().currentUser.uid).update({
          photoURL: photoURL,
          }).then(() => {
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
              })
            })
          }).catch((err) => {
            reject(err);
          })
      })
        return promise;
    }
  
}
