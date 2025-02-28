import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = 'http://localhost:3000/empresas';

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  removerEmpleadoDeEmpresa(
    empleadoId: number,
    empresaId: number
  ): Observable<void> {
    console.log(
      `Eliminando referencia de empleado ${empleadoId} en empresa ${empresaId}`
    );

    return this.getEmpresas().pipe(
      map((empresas: Empresa[]) => {
        const empresa = empresas.find((e) => e.id === empresaId);
        if (empresa) {
          empresa.empleados = empresa.empleados.filter(
            (empId) => empId !== empleadoId
          );
          console.log(`Empresa ${empresaId} actualizada:`, empresa);
        }
        return empresa;
      }),
      switchMap((empresaActualizada) =>
        this.http.patch<void>(`${this.apiUrl}/${empresaId}`, {
          empleados: empresaActualizada?.empleados,
        })
      )
    );
  }
}
