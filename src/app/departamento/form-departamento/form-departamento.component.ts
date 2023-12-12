import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { DepartamentoService } from '../service/departamento.service';
import { ActivatedRoute,Router } from '@angular/router';
import { map,switchMap } from 'rxjs';
import { Idepartamento } from '../service/idepartamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-departamento',
  templateUrl: './form-departamento.component.html',
  styleUrls: ['./form-departamento.component.scss']
})
export class FormDepartamentoComponent implements OnInit{

  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    localidade: new FormControl(''),
    descricaoatividades: new FormControl(''),
    email: new FormControl(''),
})

constructor(
private service:DepartamentoService,
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
          text: "Departamento atualizado com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/departamento']);
      });
      },
      Error =>{
        Swal.fire({
          title: "Erro em atualizar Departamento!",
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
          text: "Departamento salvo com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/departamento'])
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

  ).subscribe(departamento => this.atualizarForm(departamento));
}

atualizarForm(departamento: Idepartamento){
  // o comando abaixo refere-se esse vormulário recebera o 
  // valor do caminho = valor da URL
  this.form.patchValue({
    id: departamento.id,
    nome:departamento.nome,
    localidade:departamento.localidade,
    descricaoatividades: departamento.descricaoatividades,
    email:departamento.email
    

  });

}


Cancelar() {

  console.log('Cancelado');
  this.form.reset();
  
  this.router.navigate(['/departamento']);
  
  }

}
