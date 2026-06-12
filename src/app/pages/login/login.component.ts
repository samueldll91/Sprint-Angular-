import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- IMPORTADO O ROUTER
import { CommonModule } from '@angular/common'; // <-- IMPORTADO PARA USAR O *ngIf
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // <-- ADICIONADO O CommonModule AQUI
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  nome = '';
  senha = '';
  mensagemErro = ''; // <-- VARIÁVEL PARA GUARDAR A MENSAGEM DE ERRO

  private loginService = inject(LoginService);
  private router = inject(Router); // <-- INJETADO O ROUTER

  fazerLogin() {
    // Limpa o erro antigo antes de tentar logar novamente
    this.mensagemErro = ''; 

    this.loginService.login(this.nome, this.senha)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          // Guarda no LocalStorage que o usuário está logado (opcional, para segurança da rota)
          localStorage.setItem('userLogged', 'true'); 
          
          // REDIRECIONA PARA A HOME
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          // CAPTURA A MENSAGEM DO BACK-END E ADICIONA NA VARIÁVEL
          this.mensagemErro = err.error?.message || 'Erro ao tentar realizar o login.';
        }
      });
  }
}