import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/empresas', pathMatch: 'full' },
  {
    path: 'empresas',
    loadChildren: () =>
      import('./features/empresa/empresa.routes').then((m) => m.EMPRESA_ROUTES),
  },
  {
    path: 'empleados',
    loadChildren: () =>
      import('./features/empleado/empleado.routes').then(
        (m) => m.EMPLEADO_ROUTES
      ),
  },
  { path: '**', redirectTo: '/empresas' },
];
