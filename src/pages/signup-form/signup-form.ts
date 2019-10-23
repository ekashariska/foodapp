import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder, AbstractControl, NgForm } from '@angular/forms';
import { UsercrudProvider } from '../../providers/usercrud/usercrud';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { Tab1Page } from '../tab1/tab1';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage } from 'firebase';




@Component({
  selector: 'page-signup-form',
  templateUrl: 'signup-form.html',
})
export class SignupFormPage implements OnInit {
  private win: any = window;
  newuser = { email:'', name:'',password:'',cnfpassword:'', phonenumber:'', level:'User',address:''}

  email:AbstractControl;
  name:AbstractControl;
  password:AbstractControl;
  cnfpass:AbstractControl;
  phonenumber:AbstractControl;
  level:AbstractControl;
  address:AbstractControl;

  authForm : FormGroup;
  passwordtype:string='password';
  cnfpasswordtype:string='password';
  cnfpasseye:string='eye';
  passeye:string ='eye';
  isNo:any = 'No';
  // rootPage: typeof TabsPage;
  rootPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController, public toastCtrl : ToastController,
              public formBuilder: FormBuilder, public userService: UsercrudProvider,private camera: Camera, ) {
               
  }
 
  newlevel
  options =  [
          {
           "level" : "buyer",
          },
          {
          "level" : "seller",
          }
        ];

  public optionsFn(item): void { 
      console.log(this.newuser.level);
      item = this.newuser.level;
      this.newlevel = item;
        }

  ngOnInit(){
    this.initialiazeForm();
  }

  initialiazeForm(){

    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.authForm = this.formBuilder.group({
      'email' : [null, Validators.compose([Validators.required,  Validators.pattern(EMAILPATTERN)]),],
      'name': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'cnfpass': [null, Validators.compose([Validators.required])],
      'phonenumber': [null, Validators.compose([Validators.required])],
      'level': [null],
      'address': [null],

    });
    this.email = this.authForm.controls['email'];
    this.name = this.authForm.controls['name'];
    this.password = this.authForm.controls['password'];
    this.cnfpass = this.authForm.controls['cnfpass'];
    this.phonenumber = this.authForm.controls['phonenumber'];
    this.level = this.authForm.controls['level'];
    this.address = this.authForm.controls['address'];
  }

  managePassword() {
    if(this.passwordtype == 'password'){
      this.passwordtype='text';
      this.passeye='eye-off';
    }else{
      this.passwordtype='password';
      this.passeye = 'eye';
    }
  }
  managecnfPassword() {
    if(this.cnfpasswordtype == 'password'){
      this.cnfpasswordtype='text';
      this.cnfpasseye='eye-off';
    }else{
      this.cnfpasswordtype='password';
      this.cnfpasseye = 'eye';
    }
  }

  doSignup(form: NgForm){

    let toaster = this.toastCtrl.create({
      message: 'Error Code ',
      duration:3000,
      position:'bottom'
    });
    if(this.newuser.email == '' || this.newuser.password == '' ){
      toaster.setMessage('All field are Required!');
      toaster.present();
    } else if (this.newuser.password.length < 6){
        toaster.setMessage('Password is Not Strong');
        toaster.present();
      } else {
        
        if (this.newuser.password == this.newuser.cnfpassword){

        let loader = this.loadingCtrl.create({
          content:'Please wait'
        })
        loader.present();
          this.userService.addUser(this.newuser).then((res)=>{
            loader.dismiss();
            if(res){
              // this.navCtrl.setRoot(TabsPage);
              if(this.newuser.level=="seller"){
                this.navCtrl.setRoot(Tab1Page);
              }
              else{
                this.navCtrl.push(TabsPage);
              }
            }
          })
        } else {
          toaster.setMessage('Both Password not matched');
          toaster.present();
        }
      }
  
  }
      
  login(){
    this.navCtrl.push(LoginPage);
  }

  // getTrustImg(imageUrl) {  //function untuk read url from local string
  //   let path = this.win.Ionic.WebView.convertFileSrc(imageUrl);
  //   console.log(path);
  //   return path;
  // }

  async takePhoto() {
    try {
      const options: CameraOptions = {

        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: true,
      }

      const result = await this.camera.getPicture(options)
      const profilepictures = storage().ref('profilepictures/photo');
      const image = `data:image/jpeg;base64,${result}`;
      profilepictures.putString(image, 'imageUrl');
    }
    catch (e) {
      console.error(e);
    }
  }



  async selectPicture() {
    try {
      const optionsGallery: CameraOptions = {

        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: true,
      }

      const result = await this.camera.getPicture(optionsGallery)
      const profilepictures = storage().ref('profilepictures/photo');
      const image = `data:image/jpeg;base64,${result}`;
      profilepictures.putString(image, 'imageUrl');
    }
    catch (e) {
      console.error(e);

    }
  }

}

  
