import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFornecedorComponent } from './listarfornecedor/listarfornecedor.component';
import { FornecedorFormComponent } from './form-fornecedor/form-fornecedor.component';


const routes: Routes = [
  {path:"",component: ListarFornecedorComponent},
  {path:"novo",component: FornecedorFormComponent},
  {path:"editar/:id",component:FornecedorFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
