import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nome = '';
  senha = '';
  mensagemErro = '';

  private loginService = inject(LoginService);
  private router = inject(Router);

  fazerLogin() {

    // limpa mensagem antiga
    this.mensagemErro = '';

    this.loginService
      .login(this.nome, this.senha)
      .subscribe({

        next: (res) => {

          console.log('Login realizado:', res);

          // salva o usuário para o AuthGuard
          localStorage.setItem(
            'usuario',
            JSON.stringify(res)
          );

          // redireciona para home
          this.router.navigate(['/home']);
        },

        error: (err) => {

          this.mensagemErro =
            err.error?.message ||
            'Erro ao tentar realizar o login.';
        }

      });
  }
}