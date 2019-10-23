import { Injectable } from '@angular/core';
import { LoadingController, NavParams} from 'ionic-angular';
// import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path/ngx';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
import firebase from 'firebase';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class ImagehandlerProvider {
  nativepath: any;
  firestore = firebase.storage();
  isImageCaptured: boolean = false;
  imageIsSet: boolean=false;
  imageurl: any = "null";
  imagekita: any;

  constructor(public filePath: FilePath,
    // public fileChooser: FileChooser,
    private crop: Crop,
    public loadingCtrl: LoadingController,
    private camera: Camera) {
    console.log('Hello ImagehandlerProvider Provider');
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  uploadImageCamera() { //upload profile pic to storage via camera
    let loader = this.loadingCtrl.create({
      content: 'Please wait',
      duration: 5000
    });
    loader.present();
    var promise = new Promise((resolve, reject) => {
      const options: CameraOptions = {
        quality: 50,
        // destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }
      this.camera.getPicture(options).then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {
                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob).then((res) => {
                  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                    resolve(url);
                    loader.dismiss();
                  }).catch((err) => {
                    loader.dismiss();
                    reject(err);
                  })
                }).catch((err) => {
                  loader.dismiss();
                  reject(err);
                })
              }
            })
          })
        })
      })
      loader.dismiss();
    })
    return promise;

  }

  uploadImageAlbum() { //upload profile pic to storage via file
    let loader = this.loadingCtrl.create({
      content: 'Please wait',
      duration: 5000
    });
    loader.present();
    var promise = new Promise((resolve, reject) => {
      const options: CameraOptions = {
        quality: 50,
        // destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
        //  maximumImagesCount: 1 //Image count
      }
      this.camera.getPicture(options).then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {
                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob).then((res) => {
                  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                    resolve(url);
                    loader.dismiss();
                  }).catch((err) => {
                    loader.dismiss();
                    reject(err);
                  })
                }).catch((err) => {
                  loader.dismiss();
                  reject(err);
                })
              }
            })
          })
        })
      })
      loader.dismiss();
    })
    return promise;
  }

  // uploadToStorage(url) { //upload report image
  //   let loader = this.loadingCtrl.create({
  //     content: 'Please wait',
  //     duration:5000
  //   });
  //   loader.present();
  //   var promise = new Promise((resolve, reject) => {
  //     (<any>window).FilePath.resolveNativePath(url, (result) => {
  //       this.nativepath = result;
  //       (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
  //         res.file((resFile) => {
  //           var reader = new FileReader();
  //           reader.readAsArrayBuffer(resFile);
  //           reader.onloadend = (evt: any) => {
  //             var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
  //             var uuid = this.guid();
  //             var imageStore = this.firestore.ref('/menu').child(uuid);
  //             imageStore.put(imgBlob).then((res) => {
  //               this.firestore.ref('/menu').child(uuid).getDownloadURL().then((url) => {
  //                 resolve(url);
  //                 loader.dismiss();
  //               }).catch((err) => {
  //                 loader.dismiss();
  //                   reject(err);
  //               })
  //             }).catch((err) => {
  //               loader.dismiss();
  //               reject(err);
  //             })
  //           }
  //         })
  //       })
  //     })
  //   })
  //    return promise;
  // }

  uploadToStorage(url) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait',
      duration: 5000
    });
    loader.present();
    var promise = new Promise((resolve, reject) => {
      var byteString = atob(url.split(',')[1]);
      var mimeString = url.split(',')[0].split(':')[1].split(';')[0];
      var arrayBuffer = new ArrayBuffer(byteString.length);
      var _ia = new Uint8Array(arrayBuffer);
      for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
      }
      var dataView = new DataView(arrayBuffer);
      var uuid = this.guid();
      var imgBlob = new Blob([dataView], { type: mimeString });
      var imageStore = this.firestore.ref('/menu').child(uuid);
      imageStore.put(imgBlob).then((res) => {
        this.firestore.ref('/menu').child(uuid).getDownloadURL().then((url) => {
          resolve(url);
          loader.dismiss();
        }).catch((err) => {
          loader.dismiss();
          reject(err);
        })
      }).catch((err) => {
        loader.dismiss();
        reject(err);
      })
    })
    return promise;
  }



  uploadMenuCamera() { //upload profile pic to storage via camera
    let loader = this.loadingCtrl.create({
      content: 'Please wait',
      duration: 5000
    });
    loader.present();
    var promise = new Promise((resolve, reject) => {
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }
      this.camera.getPicture(options).then((url) => {
        this.imageurl = "data:image/jpeg;base64," +url;
        this.isImageCaptured = true;
        this.imageIsSet = true;
          var byteString = atob(url.split(',')[1]);
          var mimeString = url.split(',')[0].split(':')[1].split(';')[0];
          var arrayBuffer = new ArrayBuffer(byteString.length);
          var _ia = new Uint8Array(arrayBuffer);
          for (var i = 0; i < byteString.length; i++) {
            _ia[i] = byteString.charCodeAt(i);
          }
          var dataView = new DataView(arrayBuffer);
          var uuid = this.guid();
          var imgBlob = new Blob([dataView], { type: mimeString });
          var imageStore = this.firestore.ref('/menu').child(uuid);
          imageStore.put(imgBlob).then((res) => {
            this.firestore.ref('/menu').child(uuid).getDownloadURL().then((url) => {
              resolve(url);
              loader.dismiss();
            }).catch((err) => {
              loader.dismiss();
              reject(err);
            })
          })
        // })

        // return promise;

      })
    })
    return promise;

  }

  uploadMenuAlbum() { //upload profile pic to storage via file
    let loader = this.loadingCtrl.create({
      content: 'Please wait',
      duration: 5000
    });

    loader.present();
    var promise = new Promise((resolve, reject) =>  
    {
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
        //  maximumImagesCount: 1 //Image count
      }
      this.camera.getPicture(options).then((url) => {
        this.imageurl = "data:image/jpeg;base64," +url;
        this.isImageCaptured = true;
        this.imageIsSet = true;
          var byteString = atob(url.split(',')[1]);
          var mimeString = url.split(',')[0].split(':')[1].split(';')[0];
          var arrayBuffer = new ArrayBuffer(byteString.length);
          var _ia = new Uint8Array(arrayBuffer);
          for (var i = 0; i < byteString.length; i++) {
            _ia[i] = byteString.charCodeAt(i);
          }
          var dataView = new DataView(arrayBuffer);
          var uuid = this.guid();
          var imgBlob = new Blob([dataView], { type: mimeString });
          var imageStore = this.firestore.ref('/menu').child(uuid);
          imageStore.put(imgBlob).then((res) => {
            this.firestore.ref('/menu').child(uuid).getDownloadURL().then((url) => {
              resolve(url);
              loader.dismiss();
            }).catch((err) => {
              loader.dismiss();
              reject(err);
            })
          }).catch((err) => {
            loader.dismiss();
            reject(err);
          })
        // })

        // return promise;

      })
    })
    return promise;

  }

  uploadImageFromBrowser(url) { //store image from browser 
    let loader = this.loadingCtrl.create({
      content: 'Please wait',
      duration: 5000
    });
    loader.present();
    var promise = new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsArrayBuffer(url);
      reader.onloadend = (evt: any) => {
        var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
        var uuid = this.guid();
        var imageStore = this.firestore.ref('/menu').child(uuid);
        imageStore.put(imgBlob).then((res) => {
          this.firestore.ref('/menu').child(uuid).getDownloadURL().then((url) => {
            resolve(url);
            loader.dismiss();
          }).catch((err) => {
            loader.dismiss();
            reject(err);
          })
        }).catch((err) => {
          loader.dismiss();
          reject(err);
        })
      }
    })
    return promise;
  }

}

//     (<any>window).FilePath.resolveNativePath(url, (result) => {
        //         this.nativepath = result;
        //         (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
        //           res.file((resFile) => {
        //             var reader = new FileReader();
        //             reader.readAsArrayBuffer(resFile);
        //             reader.onloadend = (evt: any) => {
        //               var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
        //               var imageStore = this.firestore.ref('/menu').child(firebase.auth().currentUser.uid);
        //               imageStore.put(imgBlob).then((res) => {
        //                 this.firestore.ref('/menu').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
        //                   resolve(url);
        //                   loader.dismiss();
        //                 }).catch((err) => {
        //                   loader.dismiss();
        //                     reject(err);
        //                 })
        //               }).catch((err) => {
        //                 loader.dismiss();
        //                 reject(err);
        //               })
        //             }
        //           })
        //         })
        //       })
        //   })
        //   loader.dismiss();
        // })
        // return promise;
        // var promise = new Promise((resolve, reject) => {


             //     (<any>window).FilePath.resolveNativePath(url, (result) => {
        //         this.nativepath = result;
        //         (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
        //           res.file((resFile) => {
        //             var reader = new FileReader();
        //             reader.readAsArrayBuffer(resFile);
        //             reader.onloadend = (evt: any) => {
        //               var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
        //               var imageStore = this.firestore.ref('/menu').child(firebase.auth().currentUser.uid);
        //               imageStore.put(imgBlob).then((res) => {
        //                 this.firestore.ref('/menu').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
        //                   resolve(url);
        //                   loader.dismiss();
        //                 }).catch((err) => {
        //                   loader.dismiss();
        //                     reject(err);
        //                 })
        //               }).catch((err) => {
        //                 loader.dismiss();
        //                 reject(err);
        //               })
        //             }
        //           })
        //         })
        //       })
        //   })
        //   loader.dismiss();
        // })
        // return promise;
        // var promise = new Promise((resolve, reject) => {