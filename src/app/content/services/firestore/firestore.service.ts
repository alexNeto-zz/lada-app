import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  create(collection: string, data: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(collection)
        .add(data)
        .then(res => { resolve(res) }, err => reject(err));
    });
  }

  read(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  update(collection: string, data: any) {
    return this.firestore
      .collection(collection)
      .doc(data.payload.doc.id) // ?
      .set({ completed: true }, { merge: true });
  }

  delete(collection: string, data: any) {
    return this.firestore
      .collection(collection)
      .doc(data.payload.doc.id) // ?
      .delete();
  }
}
