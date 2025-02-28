import { Routes } from '@angular/router';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './components/empleado-list/empleado-list.component';

export const EMPLEADO_ROUTES: Routes = [
  { path: ':empresaId', component: EmpleadoListComponent },
  { path: 'nuevo/:empresaId', component: EmpleadoFormComponent },
  { path: 'editar/:id', component: EmpleadoFormComponent }
];
