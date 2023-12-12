import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { map,switchMap } from 'rxjs';
import { Iempresa } from '../service/iempresa';
import { EmpresaService } from '../service/empresa.service';
import { FormControl,FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.scss']
})
export class FormEmpresaComponent {

  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cnpj: new FormControl(''),
    endereco: new FormControl(''),
    socios: new FormControl(''),
    faturamento: new FormControl(),
})

constructor(
  private service:EmpresaService,
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
            text: "Empresa atualizado com sucesso!",
            icon: "success"
          }).then((result) => {
          this.router.navigate(['/empresa']);
        });
        },
        Error =>{
          Swal.fire({
            title: "Erro em atualizar Empresa!",
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
            text: "Empresa salvo com sucesso!",
            icon: "success"
          }).then((result) => {
          this.router.navigate(['/empresa'])
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
  
    ).subscribe(empresa => this.atualizarForm(empresa));
  }
  
  atualizarForm(empresa: Iempresa){
    // o comando abaixo refere-se esse vormulário recebera o 
    // valor do caminho = valor da URL
    this.form.patchValue({
      id: empresa.id,
      nome:empresa.nome,
      cnpj:empresa.cnpj,
      endereco:empresa.endereco,
      socios:empresa.socios,
      faturamento:empresa.faturamento,
    });
  
  }
  

  Cancelar() {

    console.log('Cancelado');
    this.form.reset();
    
    this.router.navigate(['/empresa']);
    
    }
  
  }
  