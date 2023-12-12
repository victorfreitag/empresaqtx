import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ClientesModule } from './clientes/clientes.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ProjetoModule } from './projeto/projeto.module';
import { FuncionarioModule } from './funcionario/funcionario.module'

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:''},
  {path:'fornecedor',loadChildren:()=> FornecedorModule},
  {path:'cliente',loadChildren:()=> ClientesModule},
  {path:'empresa',loadChildren:()=> EmpresaModule},
  {path:'projeto',loadChildren:()=> ProjetoModule},
  {path:'funcionario',loadChildren:()=> FuncionarioModule},
  {path:'departamento',loadChildren:()=> DepartamentoModule},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
