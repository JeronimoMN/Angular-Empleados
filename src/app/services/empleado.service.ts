import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { getDoc, orderBy, query } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: Firestore) { }

  agregarEmpleado(empleado: any): Promise<any> {
    const empleadod= collection(this.firestore, 'empleado');
    return addDoc(empleadod, empleado)
  }

  getEmpleados(): Observable<any> {
    const empleadod= collection(this.firestore, 'empleado');
    const queryRef = query(empleadod, orderBy('fechaCreacion', 'asc'))
    return collectionData(queryRef, {idField: 'id'}) as Observable<any>
  }

  deleteEmpleado(id: string): Promise<any> {
    const empleadod= collection(this.firestore, 'empleado');
    const empleadoDocRef= doc(this.firestore, `empleado/${id}`)
    return deleteDoc(empleadoDocRef)
  }

  getEmpleado(id:string): Observable<any>{
    const empleadod= doc(this.firestore, `empleado/${id}`)
    return from(getDoc(empleadod)).pipe(map(doc => ({ id: doc.id, ...doc.data() }))
    ) as Observable<any>;
  }

  updateEmpleado(id: string, data:any): Promise<any> {
    const empleadod= doc(this.firestore, 'empleado', id);
    return updateDoc(empleadod, {
      ...data
    })

  }
}


