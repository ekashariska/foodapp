import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomesellerPage } from '../homeseller/homeseller';
import { SellerprofilePage } from '../sellerprofile/sellerprofile';

@Component({
  templateUrl: 'tab1.html',
})
export class Tab1Page {
  tab1Root = HomesellerPage;
  // tab3Root = SettingPage;
  tab2Root = SellerprofilePage;
  constructor() {
  }

}
