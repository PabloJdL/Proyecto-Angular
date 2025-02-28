import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empleado } from '../../../../core/models/empleado.model';
import { EmpleadoService } from '../../../../core/services/empleado.service';

@Component({
  selector: 'app-empleado-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './empleado-list.component.html',
  styleUrl: './empleado-list.component.css',
})
export class EmpleadoListComponent {
  empleados: Empleado[] = [];
  empresaId!: number;

  constructor(
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.empresaId = Number(this.route.snapshot.paramMap.get('empresaId'));

    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService
      .getEmpleadosByEmpresa(this.empresaId)
      .subscribe((empleados) => {
        this.empleados = empleados.filter(
          (emp) => emp.empresaId === this.empresaId
        );
      });
  }

  editarEmpleado(id: number) {
    this.router.navigate(['/empleados/editar', id]);
  }

  borrarEmpleado(id: number) {
    if (confirm('¿Seguro que quieres eliminar este empleado?')) {
      this.empleadoService.borrarEmpleado(id, this.empresaId).subscribe(() => {
        console.log(`Empleado ${id} eliminado correctamente`);
        this.cargarEmpleados();
      });
    }
  }
}
