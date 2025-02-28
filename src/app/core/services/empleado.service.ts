import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Empleado } from '../models/empleado.model';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/empleados';

  constructor(
    private http: HttpClient,
    private empresaService: EmpresaService
  ) {}

  getEmpleadosByEmpresa(empresaId: number): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}?empresaId=${empresaId}`);
  }

  borrarEmpleado(id: number, empresaId: number): Observable<void> {
    console.log(`Eliminando empleado con ID: ${id}`);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      switchMap(() => {
        console.log(`Empleado ${id} eliminado`);
        return this.empresaService.removerEmpleadoDeEmpresa(id, empresaId);
      })
    );
  }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  getEmpleadoPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  agregarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.getEmpleados().pipe(
      map((empleados) => {
        const maxId =
          empleados.length > 0 ? Math.max(...empleados.map((e) => e.id)) : 0;
        empleado.id = maxId + 1;
        return empleado;
      }),
      switchMap((nuevoEmpleado) =>
        this.http.post<Empleado>(this.apiUrl, nuevoEmpleado)
      )
    );
  }

  actualizarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${empleado.id}`, empleado);
  }
}
