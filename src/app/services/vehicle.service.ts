import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:3001/vehicles';

  constructor(private http: HttpClient) { }

  // GET todos os veículos
  getVehicles(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // GET veículo por VIN (caso sua API suporte query)
  getVehicleByVin(vin: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?vin=${vin}`);
  }
}
