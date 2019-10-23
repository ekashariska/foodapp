import * as firebase from 'firebase';
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { CartProvider } from '../../providers/cart/cart';
import { CheckoutPage } from '../checkout/checkout';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-addtocart',
  templateUrl: 'addtocart.html',
})
export class AddtocartPage {
  cartItems: any[] = [];
  totalAmount: number = 0;
  isCartItemLoaded: boolean = false;
  isEmptyCart: boolean = true;
  menu:any[] =[];
  cartMenu: any[] = [];
  isCartMenuLoaded: boolean = false;
  alertController: any;
  refDatabase = firebase.database().ref('menu');


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) { 
      // this.refDatabase.on('value', resp => {
    // this.menu = [];
    // this.menu = convertData(resp);
// }) 
}

  ionViewDidLoad() {
    this.loadCartItems();
  }

  loadCartItems() {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    // loader.present();
    this.cartService
      .getCartItems()
      .then(val => {
        this.cartItems = val;

        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.totalAmount += parseInt(v.totalPrice);
          });
          this.isEmptyCart = false;
        }

        this.isCartItemLoaded = true;
        loader.dismiss();
      })
      .catch(err => {});
  }

  checkOut() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.navCtrl.push(CheckoutPage);
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }

  removeItem(item) {
    this.cartService.removeFromCart(item).then(() => {
      this.loadCartItems();
    });
  }

}

// export const convertData = snapshot => {
//   let returnArr = [];
  
//   snapshot.forEach(childSnapshot => {
//       let item = childSnapshot.val();
//       item.key = childSnapshot.key;
//       returnArr.push(item);
//   });
//   // console.log(returnArr);
  
//   return returnArr;
   
//   }



