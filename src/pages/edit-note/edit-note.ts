import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Note } from '../../model/note';
import { NoteListServiceProvider } from '../../providers/note-list-service/note-list-service';
import { HomePage } from '../home/home'
/**
 * Generated class for the EditNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'edit-note'
})
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {

   note: Note = {
     title:'',
     content:''
   }
  constructor(public navCtrl: NavController, public navParams: NavParams, private noteListService: NoteListServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditNotePage');

    this.note = this.navParams.get('note');
  }

  updateNote(note: Note){
    this.noteListService.updateNote(note).then(()=>{
      this.navCtrl.setRoot(HomePage);
    });
  }

  removeNote(note: Note){
    this.noteListService.removeNote(note).then(()=>{
      this.navCtrl.setRoot(HomePage);
    });
  }
}
