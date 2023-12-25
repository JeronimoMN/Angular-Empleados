import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: Firestore) { }

  agregarEmpleado(empleado: any): Promise<any> {
    const empleadod= collection(this.firestore, 'empleado') 
    return addDoc(empleadod, empleado)
  }
}

