import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent {
  empleados: any[]= [];

  constructor(private _empleadoService: EmpleadoService, private toastr: ToastrService) {}

  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados= [];
      data.forEach((element:any) => {
       this.empleados.push({
        id: element.id,
        ...element
       })
      });
      console.log(this.empleados)
    })
  }
 
  eliminarEmpleado(id: string){
    this._empleadoService.deleteEmpleado(id).then(() => {
      console.log('Empleado eliminado');
      this.toastr.error('El empleado fue eliminado con exito', 'Registro Eliminado', {positionClass: 'toast-bottom-right'})
    }).catch(error => {
      console.log(error)
    })
  }


  ngOnInit(): void{
    this.getEmpleados()
  }
}
