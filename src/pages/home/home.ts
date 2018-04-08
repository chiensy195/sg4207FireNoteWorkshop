import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  site = {
    url: 'DangChienSy.com',
    description: 'Testing the application firebase'
  }
  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
    this.db.list('site').push(this.site);
  }

}
