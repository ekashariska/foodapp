import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { Menu } from '../../models/menu';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { User } from '../../models/user';

const CART_KEY = 'cartMenu';

@Injectable()
export class CartProvider {
  // menuRef = firebase.database().ref("menu");
  // menu:Array<any> =[];

  // user = {} as User;
  // menu= {} as Menu;
  // events: any;
  constructor(public http: HttpClient,public storage: Storage,
    public afStorage: AngularFireStorage,private afireAuth:AngularFireAuth,
    public alertController: AlertController) {
    console.log('Hello CartProvider Provider');
  }

  addToCart(menu) {
    return this.getCartItems().then(result => {
      if (result) {
        if (!this.containsObject(menu, result)) {
          result.push(menu);
          return this.storage.set(CART_KEY, result);
        } else {
          let index = result.findIndex(x => x.menu_id == menu.menu.uid);
          let prevQuantity = parseInt(result[index].count);
          menu.count = (prevQuantity + menu.count);
          let currentPrice = (parseInt(menu.totalPrice) * menu.count);
          menu.totalPrice =currentPrice;
           result.splice(index, 1);
          result.push(menu);
          return this.storage.set(CART_KEY, result);
        }

      } else {
        return this.storage.set(CART_KEY, [menu]);
      }
    })
  }

  removeFromCart(menu) {
    return this.getCartItems().then(result => {
      if (result) {
        var menuIndex = result.indexOf(menu);
        result.splice(menuIndex, 1);
        return this.storage.set(CART_KEY, result);
      }
    })
  }

  removeAllCartItems() {
    return this.storage.remove(CART_KEY).then(res => {
      return res;
    });
  }


  containsObject(obj, list): boolean {
    if (!list.length) {
      return false;
    }

    if (obj == null) {
      return false;
    }
    var i;
    for (i = 0; i < list.length; i++) {
      // if (list[i].menu.id == obj.menu.id)
      if (list[i] === obj) 
 
      {
        return true;
      }
    }
    return false;
  }



  getCartItems() {
    return this.storage.get(CART_KEY);
  }

}
