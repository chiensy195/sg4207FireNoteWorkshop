import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../../app/firebase.credential';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the PhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'photo-page'
})
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {

  someTextUrl;
  selectedPhoto;
  loading;
  currentImage;

  constructor(public navCtrl: NavController, 
    public camera: Camera, public loadingCrtl: LoadingController) {
      this.getSomeText();
  }

  getSomeText(){
    firebase.storage().ref().child('some text').getDownloadURL()
      .then(response => this.someTextUrl = response)
      .catch(error => console.log('error',error));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoPage');
  }

  grabPicture(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData)=>{
      this.loading = this.loadingCrtl.create({
        content: 'Please wait...'
      });
      this.loading.present();
      this.selectedPhoto = this.dataURItoBlob('data:image/jpeg;base64,'+imageData);
      this.upload();
    }, (err)=>{
      console.log('error',err);
    });
  }

  dataURItoBlob(dataURI){
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for(let i = 0; i < binary.length; i++){
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)],{ type: 'image/jpeg'});
  }

  upload(){
    if(this.selectedPhoto){
      var uploadTask = firebase.storage().ref().child('image/uploaded.png').put(this.selectedPhoto);
      uploadTask.then(this.onSuccess, this.onError);
    }
  }

  onSuccess = (snapshot) => {
    this.currentImage = snapshot.downloadURL;
    this.loading.dismiss();
  }

  onError = (error) => {
    console.log('error',error);
    this.loading.dismiss();
  }

}
