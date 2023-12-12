import { Component, OnInit } from '@angular/core';
import { Idepartamento } from '../service/idepartamento';
import { DepartamentoService } from '../service/departamento.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listardepartamento',
  templateUrl: './listardepartamento.component.html',
  styleUrls: ['./listardepartamento.component.scss']
})
export class ListardepartamentoComponent implements OnInit{
departamento:Idepartamento[]=[];


form = new FormGroup({
  id: new FormControl(),
  nome: new FormControl(''),
  localidade: new FormControl(''),
  descricaoatividade: new FormControl(''),
  endereco: new FormControl(''),
  email: new FormControl('')
})

constructor(
  private service: DepartamentoService, 
  private router: Router, 
  private route: ActivatedRoute){ }

ngOnInit(): void {
   this.Listar();
}

Listar(){

   this.service.listar().subscribe(dados => this.departamento = dados);
}

Editar(id:number){
  this.router.navigate(['editar', id], {relativeTo: this.route});
}

Excluir(id:number){
  this.service.excluir(id).subscribe(
    success => {
      Swal.fire({
        title: "Operação concluida!",
        text: "Departamento deletado com sucesso!",
        icon: "success"
      }).then((result) => {
        this.service.listar().subscribe(dados => this.departamento = dados);
    });
  },
    Error =>{
      Swal.fire({
        title: "Erro ao deletar Fornecedor!",
        text: "ERRO, ERRO, ERRO!",
        icon: "error"
      })
    }
  );
}}