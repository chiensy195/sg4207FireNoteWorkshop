import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { FIREBASE_CONFIG } from '../../app/firebase.credential';
/**
 * Generated class for the SoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'sound-page'
})
@Component({
  selector: 'page-sound',
  templateUrl: 'sound.html',
})
export class SoundPage {
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  constructor(public navCtrl: NavController, 
    private media: Media,
    private file: File,
    public platform: Platform) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoundPage');
  }

  ionViewWillEnter(){
    this.getAudioList();
  }

  getAudioList(){
    if(localStorage.getItem("audioList")){
      this.audioList = JSON.parse(localStorage.getItem("audioList"));
      console.log(this.audioList);
    }
  }


  startRecord(){
    if(this.platform.is('ios')){
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+
        new Date().getHours()+ new Date().getMinutes()+new Date().getSeconds()+'.m4a';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '')+this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    else if(this.platform.is('android')){
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+
        new Date().getHours()+ new Date().getMinutes()+new Date().getSeconds()+'.m4a';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '')+this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    //this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, ''+this.fileName);
    //this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord(){
    this.audio.startRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file,idx){
    if(this.platform.is('ios')){
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '')+file;
      this.audio = this.media.create(this.filePath);
    }
    else if(this.platform.is('android')){
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '')+file;
      this.audio = this.media.create(this.filePath);
    }
    
    this.audio.play();
    this.audio.setVolume(0.8);
  }

}
