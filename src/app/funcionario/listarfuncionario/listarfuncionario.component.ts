import { Component,OnInit } from '@angular/core';
import { Ifuncionario } from '../service/ifuncionario';
import { FuncionarioService } from '../service/funcionario.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listarfuncionario',
  templateUrl: './listarfuncionario.component.html',
  styleUrls: ['./listarfuncionario.component.scss']
})
export class ListarfuncionarioComponent implements OnInit{
  funcionario:Ifuncionario[]=[];

  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cargo: new FormControl(''),
    salario: new FormControl(),
    areaatuacao: new FormControl(''),
    localtrabalho: new FormControl('')
})

  constructor(
    private service: FuncionarioService, 
    private router: Router, 
    private route: ActivatedRoute){ }

  ngOnInit(): void {
     this.Listar();
  }

  Listar(){

     this.service.listar().subscribe(dados => this.funcionario = dados);
  }

  Editar(id:number){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  Excluir(id:number){
    this.service.excluir(id).subscribe(
      success => {
        Swal.fire({
          title: "Operação concluida!",
          text: "Funcionario deletado com sucesso!",
          icon: "success"
        }).then((result) => {
          this.service.listar().subscribe(dados => this.funcionario = dados);
      });
    },
      Error =>{
        Swal.fire({
          title: "Erro ao deletar Funcionario!",
          text: "ERRO, ERRO, ERRO!",
          icon: "error"
        })
      }
    );
  }}






