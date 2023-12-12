import { Component,OnInit} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { map,switchMap } from 'rxjs';
import { Iprojeto } from '../service/iprojeto';
import { ProjetoService } from '../service/projeto.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-projeto',
  templateUrl: './form-projeto.component.html',
  styleUrls: ['./form-projeto.component.scss']
})
export class FormProjetoComponent {

  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    descricao: new FormControl(''),
    quantidadeparticipante: new FormControl(),
    responsavel: new FormControl(''),
    custo: new FormControl()

})

constructor(
private service:ProjetoService,
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
          text: "Projeto atualizado com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/projeto']);
      });
      },
      Error =>{
        Swal.fire({
          title: "Erro em atualizar Projeto!",
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
          text: "Projeto salvo com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/projeto'])
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

  ).subscribe(projeto => this.atualizarForm(projeto));
}

atualizarForm(projeto: Iprojeto){
  // o comando abaixo refere-se esse vormulário recebera o 
  // valor do caminho = valor da URL
  this.form.patchValue({
    id:projeto.id,
    nome:projeto.nome,
    descricao:projeto.descricao,
    quantidadeparticipante:projeto.quantidadeparticipante,
    responsavel:projeto.responsavel,
    custo:projeto.custo
  });

}


Cancelar() {

  console.log('Cancelado');
  this.form.reset();
  
  this.router.navigate(['/projeto']);
  
  }

}

