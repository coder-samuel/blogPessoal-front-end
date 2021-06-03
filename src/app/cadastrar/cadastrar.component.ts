  
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  //variavél é declarada sempre antes dos construtores
  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  constructor( //quando insere uma variável no construtor é uma injeção de dependencia
    private authService: AuthService,
    private router: Router //injeta routerLink no typescript
  ) { }

  ngOnInit() { //indica o que deve a página deve fazer no inicio
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      alert('As senhas estão incorretas.')
    }

    else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => { // => é arrow function
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

}