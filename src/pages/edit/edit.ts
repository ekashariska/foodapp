import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ViewController,  LoadingController, Platform, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Camera, CameraOptions } from '@ionic-native/camera';
import { storage} from 'firebase';
import { ImagehandlerProvider } from '../../providers/imagehandler';
import { FoodcrudProvider } from '../../providers/foodcrud/foodcrud';
import { User } from '../../models/user';
import { Menu } from '../../models/menu';
import { ListPage } from '../list/list';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
  providers: [FoodcrudProvider,ImagehandlerProvider]
})
export class EditPage implements OnInit{
  private win: any = window;
  public menuForm: FormGroup;
  reportNumber:any;
  imageUrl:any = "null";
  detail:any ;
  reportID :any;
  feedback:any;
  rating:any;
  location:any;
  status: string = 'ongoing';
  keyID:any;
  menu = {} as Menu;
  user = {} as User
  menuId:any;
  browser:boolean = false;
  isImageCaptured: boolean;
  imageIsSet: boolean;
  editMode:boolean = true;
  private modeName: string = "EDIT";
  url: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth, 
    public formBuilder: FormBuilder, 
    private camera:Camera,
    public imagehandler: ImagehandlerProvider,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public foodservice:FoodcrudProvider,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,) {
    this.keyID = this.navParams.get('id'); //ambik param dari sebelah
    console.log(this.keyID);
    console.log("test")
    // this.menuId = this.afAuth.auth.currentUser.uid;

  }
  ngOnInit(){
    console.log("test")
    this.initializeForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
    var person = firebase.auth().currentUser;
    var uuid = person.uid;

    var menuDetails = firebase.database().ref(`menu/${uuid}`);

    menuDetails.on('value', snapshot => {
      this.user = snapshot.val();
      console.log('menuDetails',this.user);
    });
  }

  // loadmenudetails(){
  //   this.foodservice.getMenuDetails().then((res:any) => {
  //     this.
  //   })
  // }

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

  randomNumber(){ //generate unique report number
    const currentDate = new Date();
    currentDate.toISOString().substring(0,4);
    return this.reportNumber = Math.floor((Math.random()* 9999999)) + 'PHB' + currentDate.toISOString().substring(2,4);;
  }

  private initializeForm() {
    const userId = this.afAuth.auth.currentUser.uid;
    this.reportID = userId;    
      this.menuForm = this.formBuilder.group({
        'imageurl' : [null, Validators.required],
        'menuname' : [null, Validators.required],
        'menuprice' : [null, Validators.required],
        'menudesc' : [null, Validators.required],
        'quantity' : [null, Validators.required],
        'time' : [null, Validators.required],
      });
      this.getLead(this.keyID);
      }

  getLead(keyID) {
    firebase.database().ref('menu/'+keyID).on('value', resp => {
      let item = convertData(resp);
      this.menuForm.controls['imageurl'].setValue(item.imageurl);
      this.menuForm.controls['menuname'].setValue(item.menuname);
      this.menuForm.controls['menuprice'].setValue(item.menuprice);
      this.menuForm.controls['menudesc'].setValue(item.menudesc);
      this.menuForm.controls['quantity'].setValue(item.quantity);
      this.menuForm.controls['time'].setValue(item.time);
      this.menu = item;
    });
  }

  private presentAlert(title: string, message: string, buttons: Array<string>) {
    let alert = this.alertCtrl.create({
        subTitle: title,
        message: message,
        buttons: buttons
    });
    alert.present();
  }

  takePhoto() {
    this.imagehandler.uploadMenuCamera().then((url: any) => {
      this.foodservice.updateMenuPic(url).then((res: any) => {
        if (res.success) {
          this.presentAlert(this.translate.instant('SUCCESS'), this.translate.instant('Image successfully updated'), ['OK'])
          this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
            let index = this.viewCtrl.index;
            this.navCtrl.remove(index);
         })
        }
      console.log('url after db',url);
      }).catch((err) => {
        this.presentAlert(this.translate.instant('FAIL'), this.translate.instant('Image update unsuccessful'), ['OK'])
      })
      console.log('url after upload',url);
      })
  }

  selectPicture() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imagehandler.uploadMenuAlbum().then((url: any) => {
      this.foodservice.updateMenuPic(url).then((res: any) => {
        if (res.success) {
          this.presentAlert(this.translate.instant('SUCCESS'), this.translate.instant('Image successfully updated'), ['OK'])
          this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
            let index = this.viewCtrl.index;
            this.navCtrl.remove(index);
         })
        }
      console.log('url after db',url);
      }).catch((err) => {
        this.presentAlert(this.translate.instant('FAIL'), this.translate.instant('Image update unsuccessful'), ['OK'])
      })
      console.log('url after upload',url);
      })
  }

  changeListener($event) : void {
    this.url = $event.target.files[0];
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imagehandler.uploadImageFromBrowser(this.url).then((url: any) => {
      this.foodservice.updateMenuPic(url).then((res: any) => {
        if (res.success) {
          this.presentAlert(this.translate.instant('SUCCESS'), this.translate.instant('Image Successfully Updated'), ['OK'])
          this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
            let index = this.viewCtrl.index;
            this.navCtrl.remove(index);
         })
        }
      console.log('url after db',url);
      }).catch((err) => {
        this.presentAlert(this.translate.instant('FAIL'), this.translate.instant('Image update unsuccessful'), ['OK'])
      })
      console.log('url after upload',url);
      }).catch((err) => {
        this.presentAlert(this.translate.instant('FAIL'), this.translate.instant('Image update unsuccessful'), ['OK'])
        })
  }

  onToggleEdit() {
    if (this.modeName == "EDIT") {
      this.editMode = false;
      this.modeName = "CANCEL";
    } else if (this.modeName == "CANCEL") {
      this.editMode = true;
      this.modeName = "EDIT";
    }
  }

  update() {
    firebase.database().ref('menu/'+this.keyID).update(this.menuForm.value).then(()=>{
      this.presentAlert(this.translate.instant('SUCCESS'), this.translate.instant('Menu Successfully Updated'), ['OK'])
      this.onToggleEdit();
    })
    this.navCtrl.setRoot(ListPage);

  }


  getTrustImg(imageSrc) {  //function untuk read url from local string
    let path = this.win.Ionic.WebView.convertFileSrc(imageSrc);
    console.log(path);
    return path;
  }

  // async takePhoto() {
  //   try {
  //     const options: CameraOptions = {

  //       quality: 50,
  //       targetHeight: 600,
  //       targetWidth: 600,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE,
  //       correctOrientation: true,
  //       saveToPhotoAlbum: true,
  //     }

  //     const result = await this.camera.getPicture(options)
  //     const menu = storage().ref('menu/photo');
  //     const image = `data:image/jpeg;base64,${result}`;
  //     menu.putString(image, 'imageUrl');
  //     this.isImageCaptured = true;
  //     this.imageIsSet = true;
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // }

  // async selectPicture() {
  //   try {
  //     const optionsGallery: CameraOptions = {

  //       quality: 50,
  //       targetHeight: 600,
  //       targetWidth: 600,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE,
  //       correctOrientation: true,
  //       saveToPhotoAlbum: true,
  //     }

  //     const result = await this.camera.getPicture(optionsGallery)
  //     const menu = storage().ref('menu/photo');
  //     const image = `data:image/jpeg;base64,${result}`;
  //     menu.putString(image, 'imageUrl');
  //     this.isImageCaptured = true;
  //     this.imageIsSet = true;
  //   }
  //   catch (e) {
  //     console.error(e);

  //   }
  // }

  // takePhoto() {
  //   let statusalert = this.alertCtrl.create({
  //     buttons: ['okay']
  //   });
  //   this.imagehandler.uploadMenuCamera().then((url: any) => {
  //     this.foodservice.updateMenuPic(url).then((res: any) => {
  //       if (res.success) {
  //         statusalert.setTitle('Updated');
  //         statusalert.setSubTitle('Your menu image has been changed successfully!!');
  //         statusalert.present();
  //         this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
  //           let index = this.viewCtrl.index;
  //           this.navCtrl.remove(index);
  //        })
  //       }
  //     console.log('url after db',url);
  //     }).catch((err) => {
  //         statusalert.setTitle('Failed');
  //         statusalert.setSubTitle('Your menu image was not changed');
  //         statusalert.present();
  //     })
  //     console.log('url after upload',url);
  //     })
  // }

  // selectPicture() {
  //   let statusalert = this.alertCtrl.create({
  //     buttons: ['okay']
  //   });
  //   this.imagehandler.uploadMenuAlbum().then((url: any) => {
  //     this.foodservice.updateMenuPic(url).then((res: any) => {
  //       if (res.success) {
  //         statusalert.setTitle('Updated');
  //         statusalert.setSubTitle('Your menu image has been changed successfully!!');
  //         statusalert.present();
  //         this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
  //           let index = this.viewCtrl.index;
  //           this.navCtrl.remove(index);
  //        })
  //       }
  //     console.log('url after db',url);
  //     }).catch((err) => {
  //         statusalert.setTitle('Failed');
  //         statusalert.setSubTitle('Your menu image was not changed');
  //         statusalert.present();
  //     })
  //     console.log('url after upload',url);
  //     })
  // }


  // update() {
  //   let newlead = firebase.database().ref('menu/'+this.navParams.get('id')).update(this.menuForm.value);
  //   this.navCtrl.setRoot(ListPage);
  // }

}

export const convertData = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}


 
  