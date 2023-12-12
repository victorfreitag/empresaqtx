import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { FuncionarioService } from '../service/funcionario.service';
import { Ifuncionario } from '../service/ifuncionario';
import { ActivatedRoute,Router } from '@angular/router';
import { map,switchMap } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.scss']
})
export class FormFuncionarioComponent {

  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cargo: new FormControl(''),
    salario: new FormControl(),
    areaatuacao: new FormControl(''),
    localtrabalho: new FormControl('')
})

constructor(
private service:FuncionarioService,
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
          text: "Funcionario atualizado com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/funcionario']);
      });
      },
      Error =>{
        Swal.fire({
          title: "Erro em atualizar Funcionario!",
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
          text: "Funcionario salvo com sucesso!",
          icon: "success"
        }).then((result) => {
        this.router.navigate(['/funcionario'])
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

  ).subscribe(funcionario => this.atualizarForm(funcionario));
}

atualizarForm(funcionario: Ifuncionario){
  // o comando abaixo refere-se esse vormulário recebera o 
  // valor do caminho = valor da URL
  this.form.patchValue({
    id: funcionario.id,
    nome:funcionario.nome,
    cargo:funcionario.cargo,
    salario:funcionario.salario,
    areaatuacao:funcionario.areaatuacao,
    localtrabalho:funcionario.localtrabalho
  });

}


Cancelar() {

  console.log('Cancelado');
  this.form.reset();
  
  this.router.navigate(['/funcionario']);
  
  }
}
