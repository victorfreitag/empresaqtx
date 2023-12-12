import { Component, OnInit } from '@angular/core';
import { Iempresa } from '../service/iempresa';
import { EmpresaService } from '../service/empresa.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listarempresa',
  templateUrl: './listarempresa.component.html',
  styleUrls: ['./listarempresa.component.scss']
})
export class ListarempresaComponent implements OnInit{
    empresa: Iempresa[]=[];

    form = new FormGroup({
      id: new FormControl(),
      nome: new FormControl(''),
      cnpj: new FormControl(''),
      endereco: new FormControl(''),
      socios: new FormControl(''),
      faturamento: new FormControl()
  })
  
  constructor(
    private service: EmpresaService, 
    private router: Router, 
    private route: ActivatedRoute){ }

  ngOnInit(): void {
     this.Listar();
  }

  Listar(){
     this.service.listar().subscribe(dados => this.empresa = dados);
  }

  Editar(id:number){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  Excluir(id:number){
    this.service.excluir(id).subscribe(
      success => {
        Swal.fire({
          title: "Operação concluida!",
          text: "Empresa deletado com sucesso!",
          icon: "success"
        }).then((result) => {
          this.service.listar().subscribe(dados => this.empresa = dados);
      });
    },
      Error =>{
        Swal.fire({
          title: "Erro ao deletar Empresa!",
          text: "ERRO, ERRO, ERRO!",
          icon: "error"
        })
      }
    );
  }}





