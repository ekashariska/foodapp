import { Component, OnInit, NgZone } from '@angular/core';
import {  NavController, NavParams,LoadingController, ViewController, AlertController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User } from '../../models/user';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage } from 'firebase';
import { UsercrudProvider } from '../../providers/usercrud/usercrud';
import { ImagehandlerProvider } from '../../providers/imagehandler';

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  user = {} as User;
  // refDatabase = firebase.database().ref('user');
  private win: any = window;
    public sellerForm: FormGroup;
    reportNumber:any;
    imageUrl:any = "null";
    avatar:any;
    url:any;
    level:any;
    browser:boolean = false;
    
    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public afAuth: AngularFireAuth, 
                public formBuilder: FormBuilder,
                public viewCtrl: ViewController,
                public alertCtrl: AlertController, 
                public userservice:UsercrudProvider,
                public loadingCtrl: LoadingController,
                public imagehandler: ImagehandlerProvider,
                public zone:NgZone,
                public platform: Platform,
                private camera:Camera) 
    {
      if (this.platform.is('cordova')) {
        this.browser = false;
      } else {
        this.browser = true;
      }
    }

    ionViewWillLoad(){
      this.loaduserdetails();
    }

    loaduserdetails() {
      this.userservice.getUserDetails().then((res: any) => {
        this.zone.run(() => {
          this.avatar = res.photoURL;
        })
      })
    }

    changeListener($event) : void {
      this.url = $event.target.files[0];
      let statusalert = this.alertCtrl.create({
        buttons: ['okay']
      });
      this.imagehandler.uploadImageFromBrowser(this.url).then((url: any) => {
        this.userservice.updateProfilePic(url).then((res: any) => {
          if (res.success) {
            statusalert.setTitle('Updated');
            statusalert.setSubTitle('Your profile picture has been changed successfully!!');
            statusalert.present();
            this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
              let index = this.viewCtrl.index;
              this.navCtrl.remove(index);
           })
          }
        console.log('url after db',url);
        }).catch((err) => {
            statusalert.setTitle('Failed');
            statusalert.setSubTitle('Your profile picture was not changed');
            statusalert.present();
        })
        console.log('url after upload',url);
        }).catch((err) => {
              statusalert.setTitle('Failed');
              statusalert.setSubTitle('Your profile picture was not changed');
              statusalert.present();
      })
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad EditprofilePage');
      var person = firebase.auth().currentUser;
      var uid = person.uid;
  
      var profileDetails = firebase.database().ref(`user-profile/${uid}`);
      profileDetails.on('value', snapshot => {
        this.user = snapshot.val();
        console.log('profileDetails',this.user);
      });
    }
  
    updateProfile() {
      var person = firebase.auth().currentUser;
      var uid = person.uid;
  
      const profileDetails = firebase.database().ref(`user-profile/${uid}`);
  
      profileDetails.update({
        FullName: this.user.FullName,
        address: this.user.address,
        phoneNumber: this.user.phoneNumber,
        photoURL: this.user.photoURL,
      }).then((result) => {
        let loader = this.loadingCtrl.create({
          spinner: 'dots',
          content: 'Updating your profile',
          duration: 1000
        });
  
        loader.present();
  
      }).catch(function (error) {
        // var errorCode = error['code'];
        var errorMessage = error.message;
        let alert = this.alertCtrl.create({
          subTitle: errorMessage,
          buttons: ['Ok']
        });
        alert.present();
      });
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
    //     const profilepictures = storage().ref('profilepictures/photo');
    //     const image = `data:image/jpeg;base64,${result}`;
    //     profilepictures.putString(image, 'imageUrl');
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
    //       encodingType: this.camera.EncodingType.JPEG,
    //       mediaType: this.camera.MediaType.PICTURE,
    //       correctOrientation: true,
    //       saveToPhotoAlbum: true,
    //     }
  
    //     const result = await this.camera.getPicture(optionsGallery)
    //     const profilepictures = storage().ref('profilepictures/photo');
    //     const image = `data:image/jpeg;base64,${result}`;
    //     profilepictures.putString(image, 'imageUrl');
    //   }
    //   catch (e) {
    //     console.error(e);
  
    //   }
    // }
  
    currentDate() {
      const currentDate = new Date();
      return currentDate.toISOString().substring(0,10);
    }

    openCamera() {
      let statusalert = this.alertCtrl.create({
        buttons: ['okay']
      });
      this.imagehandler.uploadImageCamera().then((url: any) => {
        this.userservice.updateProfilePic(url).then((res: any) => {
          if (res.success) {
            statusalert.setTitle('Updated');
            statusalert.setSubTitle('Your profile picture has been changed successfully!!');
            statusalert.present();
            this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
              let index = this.viewCtrl.index;
              this.navCtrl.remove(index);
           })
          }
        console.log('url after db',url);
        }).catch((err) => {
            statusalert.setTitle('Failed');
            statusalert.setSubTitle('Your profile picture was not changed');
            statusalert.present();
        })
        console.log('url after upload',url);
        })
    }
  
    openAlbum() {
      let statusalert = this.alertCtrl.create({
        buttons: ['okay']
      });
      this.imagehandler.uploadImageAlbum().then((url: any) => {
        this.userservice.updateProfilePic(url).then((res: any) => {
          if (res.success) {
            statusalert.setTitle('Updated');
            statusalert.setSubTitle('Your profile picture has been changed successfully!!');
            statusalert.present();
            this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
              let index = this.viewCtrl.index;
              this.navCtrl.remove(index);
           })
          }
        console.log('url after db',url);
        }).catch((err) => {
            statusalert.setTitle('Failed');
            statusalert.setSubTitle('Your profile picture was not changed');
            statusalert.present();
        })
        console.log('url after upload',url);
        })
    }

}
