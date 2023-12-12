import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { ListarFornecedorComponent } from './listarfornecedor/listarfornecedor.component';

@NgModule({
  declarations: [
    ListarFornecedorComponent
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule
  ]
})
export class FornecedorModule { }
