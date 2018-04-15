import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Note } from '../../model/note';
import { NoteListServiceProvider } from '../../providers/note-list-service/note-list-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  noteList: Observable<Note[]>;


  constructor(public navCtrl: NavController, public db: AngularFireDatabase, private noteListService: NoteListServiceProvider) {
    this.noteList = this.noteListService.getNoteList().snapshotChanges().map(
      changes => {
        return changes.map(c=>({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );
  }


  ionViewDidEnter(): void {

  }

  addNote() {
    this.navCtrl.push('add-note');
  }

  editItem(note: Note){
    this.navCtrl.push('edit-note',{note: note});
  }

  removeItem(note: Note){
    this.noteListService.removeNote(note);
  }

  addPhoto(){
    this.navCtrl.push('photo-page');
  }

  viewMap(){
    this.navCtrl.push('map-view');
  }
  
  addVoice(){
    this.navCtrl.push('sound-page');
  }

  addVideo(){
    this.navCtrl.push('video-page');
  }
}
