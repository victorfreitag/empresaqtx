import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ClientesService } from '../service/clientes.service';
import { ActivatedRoute,Router } from '@angular/router';
import { map,switchMap } from 'rxjs';
import { Iclientes } from '../service/iclientes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent implements OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cpf: new FormControl(''),
    rg: new FormControl(''),
    endereco: new FormControl(''),
    email: new FormControl(''),
})

constructor(
private service:ClientesService,
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
          text: "Cliente atualizado com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/cliente']);
      });
      },
      Error => Swal.fire({
        title: "Erro em atualizar Cliente!",
        text: "ERRO, ERRO, ERRO!",
        icon: "error"
      })
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        Swal.fire({
          title: "Operação concluida!",
          text: "Cliente salvo com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/cliente'])
        });
      },
      Error =>{
        Swal.fire({
          title: "Erro em Salvar o Cliente!",
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

  ).subscribe(cliente => this.atualizarForm(cliente));
}

atualizarForm(cliente: Iclientes){
  // o comando abaixo refere-se esse vormulário recebera o 
  // valor do caminho = valor da URL
  this.form.patchValue({
    id: cliente.id,
    nome:cliente.nome,
    cpf:cliente.cpf,
    rg:cliente.rg,
    endereco:cliente.endereco,
    email:cliente.endereco
  });

}

Cancelar() {

console.log('Cancelado');
this.form.reset();

this.router.navigate(['/cliente']);

}

}
