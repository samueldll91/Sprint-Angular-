import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  // Buscar todos os veículos
  getVehicles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles`);
  }

  // Buscar dados do veículo pelo VIN
  getVehicleByVin(vin: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/vehicleData`,
      { vin }
    );
  }
}