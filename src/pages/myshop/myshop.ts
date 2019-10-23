import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { FormPage } from '../form/form';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-myshop',
  templateUrl: 'myshop.html',
})
export class MyshopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyshopPage');
  }

  FormPage(){
    this.navCtrl.push(FormPage);
  }
  
  ListmenuPage(){
    this.navCtrl.push(ListPage);
  }

}
