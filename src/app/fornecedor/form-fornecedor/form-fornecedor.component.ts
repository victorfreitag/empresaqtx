import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FornecedorService } from '../service/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Ifornecedor } from '../service/ifornecedor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './form-fornecedor.component.html',
  styleUrls: ['./form-fornecedor.component.scss']
})
export class FornecedorFormComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),  
    cnpj:new FormControl(''),
    ie:new FormControl(''),
    endereco:new FormControl(''),
    email:new FormControl('')
    
})

constructor(
private service:FornecedorService,
private route:ActivatedRoute,
private router: Router
){ }

ngOnInit(){ this.ListarPorId(); }

Salvar() {
  if(this.form.value.id){
    this.service.atualizar(this.form.value).subscribe(
      success => {
        Swal.fire({
          title: "Operação concluida!",
          text: "Fornecedor atualizado com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/fornecedor']);
      });
      },
      Error =>{
        Swal.fire({
          title: "Erro em atualizar Fornecedor!",
          text: "ERRO, ERRO, ERRO!",
          icon: "error"
        })
      }
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        Swal.fire({
          title: "Operação concluida!",
          text: "Fornecedor salvo com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/fornecedor'])
        });
      },
      Error =>{
        Swal.fire({
          title: "Erro em Salvar o Forncedor!",
          text: "ERRO, ERRO, ERRO!",
          icon: "error"
        })
      }
    );
  }

  this.form.reset();

}

ListarPorId(){
  // essa função captura os parametros da rota. captura o valor da rota, seja ele nulo 
  // ou não e adiciona o parametro capturado no formulário através da função atualizarForm
  // o Pipe garante que será feita uma requisição no servidor e essa requisição será finalizada.
  // O subscribe inscreve / executa a função.
  this.route.params
  .pipe(
    map((params: any) => params['id']),
    switchMap(id => this.service.listarPorId(id))

  ).subscribe(fornecedor => this.atualizarForm(fornecedor));
}

atualizarForm(fornecedor: Ifornecedor){
  // o comando abaixo refere-se esse vormulário recebera o 
  // valor do caminho = valor da URL
  this.form.patchValue({
    id: fornecedor.id,
    nome:fornecedor.nome,
    cnpj:fornecedor.cnpj,
     ie:fornecedor.ie,
     endereco:fornecedor.endereco,
     email:fornecedor.email
  });

}


Cancelar() {

  console.log('Cancelado');
  this.form.reset();
  
  this.router.navigate(['/fornecedor']);
  
  }

}
