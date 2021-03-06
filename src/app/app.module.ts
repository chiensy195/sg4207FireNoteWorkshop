import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credential';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NoteListServiceProvider } from '../providers/note-list-service/note-list-service';

import { AngularFireStorageModule } from 'angularfire2/storage';
import { HttpClientModule } from '@angular/common/http';

import { Camera } from '@ionic-native/camera';

import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

import { MediaCapture } from '@ionic-native/media-capture'
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NoteListServiceProvider,
    Camera,
    LoadingController,
    Geolocation,
    Device,
    MediaCapture,
    Media,
    File
  ]
})
export class AppModule {}
