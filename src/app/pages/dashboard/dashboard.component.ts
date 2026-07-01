import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- ADICIONE
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  vehicles: any[] = [];

  // Busca por modelo
  modelSearch: string = '';
  filteredModels: any[] = [];

  // Veículo selecionado
  selectedVehicle: any = null;

  // Busca por VIN
  vinSearch: string = '';
  vehicleData: any = null;

  constructor(
    private vehicleService: VehicleService,
    private router: Router // <-- ADICIONE
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  // Carrega os veículos
  loadVehicles() {
    this.vehicleService.getVehicles().subscribe({
      next: (data: any) => {

        this.vehicles = data.vehicles;
        this.filteredModels = data.vehicles;

        if (this.vehicles.length > 0) {
          this.selectedVehicle = this.vehicles[0];
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Filtra os modelos pelo nome
  filterModels() {
    const search = this.modelSearch.toLowerCase();

    this.filteredModels = this.vehicles.filter(vehicle =>
      vehicle.vehicle?.toLowerCase().includes(search)
    );
  }

  // Seleciona um modelo
  selectModel(vehicle: any) {
    this.selectedVehicle = vehicle;
    this.modelSearch = vehicle.vehicle;
    this.filteredModels = [];
  }

  // Busca por VIN
  searchByVin() {
    if (!this.vinSearch) return;

    this.vehicleService.getVehicleByVin(this.vinSearch).subscribe({
      next: (data) => {

        // Atualiza somente a tabela
        this.vehicleData = data;

        console.log('Dados do VIN:', data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // LOGOUT
  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  // Cards do dashboard
  get totalSales(): number {
    return this.selectedVehicle?.volumetotal ?? 0;
  }

  get totalConnected(): number {
    return this.selectedVehicle?.connected ?? 0;
  }

  get totalUpdated(): number {
    return this.selectedVehicle?.softwareUpdates ?? 0;
  }
}