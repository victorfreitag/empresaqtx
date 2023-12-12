import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FornecedorFormComponent } from './fornecedor/form-fornecedor/form-fornecedor.component';
import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { FormDepartamentoComponent } from './departamento/form-departamento/form-departamento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormEmpresaComponent } from './empresa/form-empresa/form-empresa.component';
import { FormFuncionarioComponent } from './funcionario/form-funcionario/form-funcionario.component';
import { FormProjetoComponent } from './projeto/form-projeto/form-projeto.component';



@NgModule({
  declarations: [
    AppComponent,
    FornecedorFormComponent,
    FormClientesComponent,
    FormDepartamentoComponent,
    FormEmpresaComponent,
    FormFuncionarioComponent,
    FormProjetoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
