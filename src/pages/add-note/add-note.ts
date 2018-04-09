import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Note } from '../../model/note';
import { NoteListServiceProvider } from '../../providers/note-list-service/note-list-service';
import { not } from '@angular/compiler/src/output/output_ast';
import { HomePage } from '../home/home'

/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'add-note'
})
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {

  note: Note = {
    title: '',
    content: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private noteListService: NoteListServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  addNote(note: Note){
    this.noteListService.addNote(note).then(ref => {
      this.navCtrl.setRoot(HomePage);
    });
  }

}
