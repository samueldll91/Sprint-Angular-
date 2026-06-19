import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient)

  login(nome: string, senha: string) {
    return this.http.post(
      "http://localhost:3001/login",
      { nome, senha }
    )
  }
}