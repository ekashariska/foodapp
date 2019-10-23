import { Component } from '@angular/core';
import {  NavParams, AlertController, NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import { EditPage } from '../edit/edit';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private win: any = window;
  
  menu = [];
  refDatabase = firebase.database().ref('menu');
  content: any;
  public session: any ;
  constructor (public navParams: NavParams, public navCtrl: NavController, public alertController: AlertController ) {
    this.refDatabase.on('value', resp => {
      this.menu = [];
      this.menu = convertData(resp); 
      console.log(this.menu)     
    });
  } 


  getTrustImg(imageSrc){
    let path = this.win.Ionic.WebView.convertFileSrc(imageSrc);
    return path;
    }
  
  edit(key) {
    this.navCtrl.push(EditPage,{'id':key});
  }

  async delete(key) {
    const alert = await this.alertController.create({
      title: 'Confirm Delete',
      message: 'Are you sure want to delete this menu?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (x) => {
            
          }
        }, {
          text: 'Delete',
          handler: () => {
            firebase.database().ref('menu/'+key).remove();
          }
        }
      ]
    });

    await alert.present();
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
