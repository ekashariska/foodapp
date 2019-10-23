import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FoodcrudProvider } from '../../providers/foodcrud/foodcrud';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MyshopPage } from '../myshop/myshop';
// import { File } from '@ionic-native/file';
import { ImagehandlerProvider } from '../../providers/imagehandler';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { storage } from 'firebase';
import { ListPage } from '../list/list';


@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
  providers: [FoodcrudProvider,ImagehandlerProvider]

})
export class FormPage implements OnInit {
  // newmenu = { uid: '', menuname: '', menudesc: '', menuprice: '', quantity: '' }
  private win: any = window;
  public menuForm: FormGroup; //declare form
  reportNumber: any;
  imageUrl: any = "null";
  url:any; 
  viewLanguage: boolean = false;
  date: any;
  dateNew: any;
  menuOption: any;
  isImageCaptured: boolean = false;
  imageIsSet: boolean=false;
  browser:boolean = false;
  translate: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth, 
              public zone: NgZone,
              private formBuilder: FormBuilder,
              private foodService: FoodcrudProvider,
              private camera: Camera,
              public imghandler: ImagehandlerProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public platform: Platform,
              public loadingCtrl: LoadingController,
              private webview:WebView) 
  {
    if (this.platform.is('cordova')) {
      this.browser = false;
    } else {
      this.browser = true;
    } 
  }

  ngOnInit() {
    this.initializeForm();
  }

  currentDate() {

    var d = new Date();
    // var n = d.toLocaleDateString() + " " + d.toLocaleTimeString();
    var n = d.toLocaleDateString();
    console.log(n);
    this.date = n;
    this.dateNew = d;
    return n;
  }

  randomNumber() { //generate unique report number
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    var k = currentDate.toISOString().substring(0, 10);
    console.log(k);
    // return this.reportNumber = Math.floor((Math.random()* 9999999)) + 'PHB' + currentDate.toISOString().substring(2,4);;
    return k;
  }

  private initializeForm() {

    this.menuForm = this.formBuilder.group({ //initialize dalam constructor
      menuname: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      menuprice: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      menudesc: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      quantity: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      // imageUrl: [this.imageUrl],
      time: [this.currentDate()],

    });
  }

  // getTrustImg(imageUrl) {  //function untuk read url from local string
  //   let path = this.win.Ionic.WebView.convertFileSrc(imageUrl);
  //   console.log(path);
  //   return path;
  // }

  // onSubmit() {
  //   let statusalert = this.alertCtrl.create({
  //     buttons: ['okay']
  //   })
  //   this.imghandler.testimage(this.imageUrl).then((url: any) => {  // tukar gambar ke blob then simpan dalam storage and pass url
  //   this.foodService.saveMenu(url,this.menuForm.value).then((res) => { // simpan data termasuk reference gambar dari storage
  //     if (res) {
  //       statusalert.setTitle('Updated');
  //       statusalert.setSubTitle('Stored!!!');
  //       statusalert.present();
  //     console.log("Jadi");
  //     }
  //       }).catch((err) => {
  //           statusalert.setTitle('Failed');
  //           statusalert.setSubTitle('Not stored');
  //           statusalert.present(); 
  //       console.log("Failed",err);
  //       })
  //       // console.log("url jadi",url);
  //       this.navCtrl.popToRoot();
  //   })
  //     // this.menuForm.value.menuname,
  //     // this.menuForm.value.menuprice, this.menuForm.value.menudesc,
  //     // this.menuForm.value.imageUrl,
  //     // this.menuForm.value.quantity,
  //     // this.menuForm.value.time)
  //   // loader.dismiss();
  //   // this.navCtrl.setRoot(ListPage);
  // }

  onCancel() {
    this.navCtrl.push(MyshopPage);
  }

  onTakePhoto(){ //new
    const options: CameraOptions  = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
    }
     this.camera.getPicture(options).then((url) => {
      // this.imageUrl = url;
      this.imageUrl = "data:image/jpeg;base64," +url;

      this.isImageCaptured = true;
      this.imageIsSet = true;
    });
  }

  onOpenGallery(){ //new
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    //  maximumImagesCount: 1 //Image count
    }
    this.camera.getPicture(options).then((url) => {
      // this.imageUrl = url;
      this.imageUrl = "data:image/jpeg;base64," +url;

      this.isImageCaptured = true;
      this.imageIsSet = true;
  
    });
  }

  onSubmit(){
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    if (this.imageUrl == 'null'){
      statusalert.setTitle(this.translate.instant('Report Not Complete'));
      statusalert.setSubTitle(this.translate.instant('Please take photo'));
      statusalert.present();
    } 
    // else if (this.imageIsSet === true) { 
    //     this.foodService.saveMenu(this.url,this.menuForm.value).then((res) => {
    //     // this.foodService.saveMenu(this.menuForm.value).then((res) => {
    //       if (res) {
    //         let alert = this.alertCtrl.create({
    //           title: 'SUCCESS',
    //           message: 'Menu is added',
    //           buttons: ['okay']
    //         });
    //         alert.present();
    //       }
    //     }).catch((err) => {
    //       statusalert.setTitle('Failed');
    //         statusalert.setSubTitle('Menu failed to sent');
    //         statusalert.present();
    //     })
    //       this.imageIsSet = true;
    //       // this.navCtrl.popToRoot();
    //       this.navCtrl.setRoot(ListPage);
      
    // }
  
    else {
      this.imghandler.uploadToStorage(this.imageUrl).then((url: any) => { 
        this.foodService.saveMenu(url,this.menuForm.value).then((res) => {
          console.log(url);
        // this.foodService.saveMenu(this.menuForm.value).then((res) => {
          if (res) {
            let alert = this.alertCtrl.create({
              title: 'SUCCESS',
              message: 'Menu is added',
              buttons: ['okay']
            });
            alert.present();
          }
        }).catch((err) => {
          statusalert.setTitle('Failed');
            statusalert.setSubTitle('Menu failed to sent');
            statusalert.present();
        })
          this.isImageCaptured = false;
          // this.navCtrl.popToRoot();
          this.navCtrl.setRoot(ListPage);
      })
    }
}

  getTrustImg(imageUrl){
    let path = this.win.Ionic.WebView.convertFileSrc(imageUrl);
    return path;
    }

    changeListener($event) : void {
      this.url = $event.target.files[0];
      let statusalert = this.alertCtrl.create({
        buttons: ['okay']
      });
      this.imghandler.uploadImageFromBrowser(this.url).then((url: any) => {
            this.imageUrl = url;
          this.imageIsSet = true;
        // this.foodService.saveMenu(url,this.menuForm.value).then((res) => {
        //   console.log(url);
        // // this.foodService.saveMenu(this.menuForm.value).then((res) => {
        //   if (res) {
        //     let alert = this.alertCtrl.create({
        //       title: 'SUCCESS',
        //       message: 'Menu is added',
        //       buttons: ['okay']
        //     });
        //     alert.present();
        //   }
        // }).catch((err) => {
        //   statusalert.setTitle('Failed');
        //     statusalert.setSubTitle('Menu failed to sent');
        //     statusalert.present();
        // })
        //   this.imageIsSet = false;
        //   this.navCtrl.popToRoot();
          })
    }

}
