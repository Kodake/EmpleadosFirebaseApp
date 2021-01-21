import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {

  listEmpleados: any[] = [];

  constructor(private empleadoService: EmpleadoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe(data => {
      this.listEmpleados = [];
      data.forEach((element: any) => {
        this.listEmpleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  eliminarEmpleado(id: string) {
    this.empleadoService.eliminarEmpleado(id).then(() => {
      console.log('Empleado Eliminado con éxito!')
      this.toastr.error('El empleado ha sido eliminado con éxito!', 'Empleado Eliminado', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    });
  }
  key:string = 'nombre';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}