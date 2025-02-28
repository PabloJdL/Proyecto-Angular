import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Empresa } from '../../../../core/models/empresa.model';
import { EmpresaService } from '../../../../core/services/empresa.service';

@Component({
  selector: 'app-empresa-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.css',
})
export class EmpresaListComponent {
  empresasList: Observable<Empresa[]>;

  constructor(private empresaService: EmpresaService) {
    this.empresasList = this.empresaService.getEmpresas();
  }
}
