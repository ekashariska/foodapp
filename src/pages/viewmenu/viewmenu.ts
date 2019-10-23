import { Component } from '@angular/core';
import { NavController, NavParams , ToastController, Menu, AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { AddtocartPage } from '../addtocart/addtocart';
import { CartProvider } from '../../providers/cart/cart';
import { ImagehandlerProvider } from '../../providers/imagehandler';

@Component({
  selector: 'page-viewmenu',
  templateUrl: 'viewmenu.html',
})
export class ViewmenuPage {

selectMenu: any;
menuCount: number = 1;
cartMenu: any[];
menu = [];
imageUrl: any = "null";
refDatabase = firebase.database().ref('menu');
imageIsSet: boolean;
productCount: number = 1;
cartItems: any[];
keyID:any;

constructor(public navCtrl: NavController,
            public navParams: NavParams,
            private cartService: CartProvider, 
            public toastCtrl: ToastController, 
            public alertCtrl: AlertController,              
            public imghandler: ImagehandlerProvider,
  ) {
    this.refDatabase.on('value', resp => {
      this.menu = [];
      this.menu = convertData(resp);
      if (this.navParams.get("menu")) {
        window.localStorage.setItem('selectedMenu', JSON.stringify(this.navParams.get("menu")));
      }
})
this.keyID = this.navParams.get('id');

}

decreaseMenuCount() {
  if (this.menuCount > 1) {
    this.menuCount--;
  }
}

incrementMenuCount() {
  this.menuCount++;
}

// addToCart(){
//   this.navCtrl.push(AddtocartPage);
// }

addToCart(menu) {
  var menuPrice = this.menuCount * parseInt(menu.price);
  let cartMenu = {
    menu_id: menu.uid,
    name: menu.menuname,
    thumb: menu.thumb,
    count: this.menuCount,
    totalPrice: menuPrice
  };
  this.cartService.addToCart(cartMenu).then((val) => {
    this.presentToast(cartMenu.name);
  });
  
}

presentToast(name) {
  let toast = this.toastCtrl.create({
    message: `${name} has been added to cart`,
    showCloseButton: true,
    closeButtonText: 'View Cart'
  });

  toast.onDidDismiss(() => {
    this.navCtrl.push(AddtocartPage);
  });
  toast.present();
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
