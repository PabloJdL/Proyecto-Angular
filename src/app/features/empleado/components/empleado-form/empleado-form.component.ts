import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../../../core/models/empleado.model';
import { Empresa } from '../../../../core/models/empresa.model';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { EmpresaService } from '../../../../core/services/empresa.service';

@Component({
  selector: 'app-empleado-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css'],
})
export class EmpleadoFormComponent implements OnInit {
  empleadoForm!: FormGroup;
  empresas: Empresa[] = [];
  esEdicion = false;
  empleadoId!: number;
  empresaId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit() {
    this.empresaService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    });

    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'));
    this.empresaId = Number(this.route.snapshot.paramMap.get('empresaId'));

    if (isNaN(this.empleadoId) || isNaN(this.empresaId)) {
      console.error('Error: ID no válido');
      this.router.navigate(['/empleados']);
      return;
    }

    this.esEdicion = !!this.empleadoId;

    this.empleadoForm = this.fb.group({
      id: [{ value: this.empleadoId, disabled: !this.esEdicion }],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', Validators.required],
      empresaId: [this.empresaId, Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    if (this.esEdicion) {
      this.empleadoService.getEmpleadoPorId(this.empleadoId).subscribe(
        (empleado) => {
          if (!empleado) {
            console.error('Empleado no encontrado');
            this.router.navigate(['/empleados']);
          } else {
            this.empleadoForm.patchValue(empleado);
          }
        },
        (error) => {
          console.error('Error al obtener empleado:', error);
          this.router.navigate(['/empleados']);
        }
      );
    }
  }

  guardarEmpleado() {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    let empleado: Empleado = this.empleadoForm.getRawValue();

    empleado.empresaId = Number(empleado.empresaId);

    if (this.esEdicion) {
      this.empleadoService.actualizarEmpleado(empleado).subscribe(() => {
        this.router.navigate(['/empleados', empleado.empresaId]);
      });
    } else {
      this.empleadoService.agregarEmpleado(empleado).subscribe(nuevoEmpleado => {
        this.router.navigate(['/empleados', nuevoEmpleado.empresaId]);
      });
    }
  }
}
