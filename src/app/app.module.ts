import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FormPage } from '../pages/form/form';
import { LoginPage } from '../pages/login/login';
import { EditPage } from '../pages/edit/edit';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';
import { PurchasePage } from '../pages/purchase/purchase';
import { MyshopPage } from '../pages/myshop/myshop';
import { SignupFormPage } from '../pages/signup-form/signup-form';
import { HomesellerPage } from '../pages/homeseller/homeseller';
import { SellerprofilePage } from '../pages/sellerprofile/sellerprofile';
import { Tab1Page } from '../pages/tab1/tab1';
import { WelcomePage } from '../pages/welcome/welcome';

// import {AngularFireModule} from '@angular/fire';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireDatabaseModule } from '@angular/fire/database';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { UsercrudProvider } from '../providers/usercrud/usercrud';
import { FoodcrudProvider } from '../providers/foodcrud/foodcrud';

//baru punya
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { CartProvider } from '../providers/cart/cart';
import { IonicStorageModule } from '@ionic/storage';
import { OrderProvider } from '../providers/order/order';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ViewmenuPage } from '../pages/viewmenu/viewmenu';
import { AddtocartPage } from '../pages/addtocart/addtocart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { ImagehandlerProvider } from '../providers/imagehandler';
import { TranslateModule } from '@ngx-translate/core';


export const firebaseConfig = {
  apiKey: "AIzaSyCSqKUEIXvI4Fg0KvD-CM_h0X8ytrjmbLE",
  authDomain: "foodapp-ab746.firebaseapp.com",
  databaseURL: "https://foodapp-ab746.firebaseio.com",
  projectId: "foodapp-ab746",
  storageBucket: "foodapp-ab746.appspot.com",
  messagingSenderId: "663563616969",
  appId: "1:663563616969:web:22f962d88a6423a8"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ListPage,
    FormPage,
    EditPage,
    MePage,
    TabsPage,
    PurchasePage,
    MyshopPage,
    SignupFormPage,
    HomesellerPage,
    SellerprofilePage,
    Tab1Page,
    WelcomePage,
    EditprofilePage,
    ViewmenuPage,
    AddtocartPage,
    CheckoutPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFirestoreModule,
    AngularFireStorageModule ,
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ListPage,
    FormPage,
    EditPage,
    MePage,
    TabsPage,
    PurchasePage,
    MyshopPage,
    SignupFormPage,
    HomesellerPage,
    SellerprofilePage,
    Tab1Page,
    WelcomePage,
    EditprofilePage,
    ViewmenuPage,
    AddtocartPage,
    CheckoutPage,
    

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
   {provide: ErrorHandler, useClass: IonicErrorHandler},
    FoodcrudProvider,
    UsercrudProvider,
    CartProvider,
    OrderProvider,
    AuthProvider,    
    FilePath,
    Crop,
    WebView,
    ImagePicker,
    ImagehandlerProvider,
    
    // FileChooser
  ]
})
export class AppModule {}
