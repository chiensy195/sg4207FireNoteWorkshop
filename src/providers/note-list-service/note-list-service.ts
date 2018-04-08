import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Note } from '../../model/note';
/*
  Generated class for the NoteListServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoteListServiceProvider {

  private noteListRef = this.db.list<Note>('note-list');

  constructor(public http: HttpClient, private db: AngularFireDatabase) {
    console.log('Hello NoteListServiceProvider Provider');
  }

  getNoteList(){
    return this.noteListRef;
  }

  addNote(note: Note){
    return this.noteListRef.push(note);
  }

  updateNote(note: Note){
    return this.noteListRef.update(note.key, note);
  }

  removeNote(note: Note){
    return this.noteListRef.remove(note.key);
  }
}
