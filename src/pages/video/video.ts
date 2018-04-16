import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { ToastController, ToastOptions } from 'ionic-angular';
/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 const MEDIA_FILES_KEY = "mediaFiles";

@IonicPage({
  name: 'video-page'
})
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  mediaFiles = [];
  toastOptions: ToastOptions;

  @ViewChild('myvideo') myVideo: any;
  
  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture, 
    private storage: Storage, private file: File, private media: Media, 
    private toast: ToastController) {
      this.toastOptions = {
        message:'Toast:',
        duration: 3000
      }
    }
 
  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    })
  }

  captureAudio(){
    this.mediaCapture.captureAudio().then(res => {
      this.storeMediaFiles(res);
    }, (err: CaptureError) => console.error(err) );
  }

  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30
    }
    this.mediaCapture.captureVideo(options).then
    ((res: MediaFile[]) => {
        let capturedFile = res[0];
        let fileName = capturedFile.name;
        let dir = capturedFile['localURL'].split('/');
        dir.pop();
        let fromDirectory = dir.join('/');      
        var toDirectory = this.file.dataDirectory;
        
        this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
          this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
        },err => {
          console.log('err: ', err);
        });
      }, (err: CaptureError) => console.error(err)
    );
  }
 
  play(myFile) {
    this.toastOptions.message = 'Playing Files: ' + myFile.name;
    this.toast.create(this.toastOptions).present();

    if (myFile.name.indexOf('.wav') > -1) {
      const audioFile: MediaObject = this.media.create(myFile.localURL);
      audioFile.play();
    } else {
      let path = this.file.dataDirectory + myFile.name;
      let url = path.replace(/^file:\/\//, '');
      let video = this.myVideo.nativeElement;
      video.src = url;
      video.play();
    }
  }
 
  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }

  showToast() {
    this.toast.create(this.toastOptions); 
  }
}
