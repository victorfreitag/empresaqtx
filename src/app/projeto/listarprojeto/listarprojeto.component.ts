import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';
import { Iprojeto } from '../service/iprojeto';
import { ProjetoService } from '../service/projeto.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listarprojeto',
  templateUrl: './listarprojeto.component.html',
  styleUrls: ['./listarprojeto.component.scss']
})
export class ListarprojetoComponent implements OnInit{
  projeto:Iprojeto[]=[];

  
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    descricao: new FormControl(''),
    quantidadeparticipante: new FormControl(),
    responsavel: new FormControl(''),
    custo: new FormControl()
})







  constructor(
    private service: ProjetoService, 
    private router: Router, 
    private route: ActivatedRoute){ }

  ngOnInit(): void {
     this.Listar();
  }

  Listar(){

     this.service.listar().subscribe(dados => this.projeto = dados);
  }

  Editar(id:number){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  Excluir(id:number){
    this.service.excluir(id).subscribe(
      success => {
        Swal.fire({
          title: "Operação concluida!",
          text: "Projeto deletado com sucesso!",
          icon: "success"
        }).then((result) => {
          this.service.listar().subscribe(dados => this.projeto = dados);
      });
    },
      Error =>{
        Swal.fire({
          title: "Erro ao deletar Projeto!",
          text: "ERRO, ERRO, ERRO!",
          icon: "error"
        })
      }
    );
  }}






