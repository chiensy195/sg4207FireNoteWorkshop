import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import * as firebase from 'firebase';

/**
 * Generated class for the MapViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//Declare Gooogle variable before '@Component'
 declare var google: any;

@IonicPage({
  name: 'map-view'
})
@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html',
})
export class MapViewPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  //Array variable for holds markers
  markers = [];

  //reference to firebase database to store updated geolocation infor
  ref = firebase.database().ref('geolocations/');

  //Inject Ionic Platform and required framework to the constructor
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, private geolocation: Geolocation, private device: Device) {
    platform.ready().then(()=>{
      this.initMap();
    });

    //Detecting Firebase Data change then update the markers.
    this.ref.on('value', resp=>{
      this.deleteMarkers();
      snapshotToArray(resp).forEach(data=>{
        if(data.uuid !== this.device.uuid){
          let image = 'assets/icon/ic_location_on.png';
          let updatelocation = new google.maps.LatLng(data.latitude, data.longtitude);
          this.addMarker(updatelocation, image);
          this.setMapOnAll(this.map);
        }
        else{
          let image = 'assets/icon/ic_my_location.png';
          let updatelocation = new google.maps.LatLng(data.latitude, data.longtitude);
          this.addMarker(updatelocation, image);
          this.setMapOnAll(this.map);
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapViewPage');
  }

  //Init or load the Google Maps
  initMap(){
    this.geolocation.getCurrentPosition({maximumAge: 3000, timeout: 5000, 
    enableHighAccuracy: true}).then((resp)=>{
      let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: mylocation
      });
    });
    
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      this.updateGeolocation(this.device.uuid, data.coords.latitude, data.coords.longitude);
      let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      let image = 'assets/icon/ic_my_location.png';
      this.addMarker(updatelocation, image);
      this.setMapOnAll(this.map);
    });
  }
  
  //Required functions for delete and sest markers on maps
  addMarker(location, image){
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }

  setMapOnAll(map){
    for(var i = 0; i < this.markers.length; i++){
      this.markers[i].setMap(map);
    }
  }

  clearMarkers(){
    this.setMapOnAll(null);
  }

  deleteMarkers(){
    this.clearMarkers();
    this.markers = [];
  }

  //function for update/add geolocation data to the firebase database
  updateGeolocation(uuid, lat, lng){
    if(localStorage.getItem('mykey')){
      firebase.database().ref('geolocaitons/'+localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longtitude: lng
      });
    }
    else{
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longtitude: lng
      });
      localStorage.setItem('mykey', newData.key);
    }
  }
} /*End of MapViewPage Class*/

//get the list of other device position
//1. Create this function below the closing of the Class to conver Firebase object to an array
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot =>{
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};