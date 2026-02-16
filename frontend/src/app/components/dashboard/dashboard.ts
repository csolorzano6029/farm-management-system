import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { DashboardStats } from '../../models/transaction.model';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ChartModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private readonly transactionService = inject(TransactionService);
  stats: DashboardStats | null = null;
  loading = true;
  error: string | null = null;
  currentDate = new Date();
  private statsSubscription?: Subscription;

  data: any;
  options: any;

  incomeExpenseChartData: any;
  incomeExpenseChartOptions: any;

  cropProductionChartData: any;
  cropProductionChartOptions: any;

  ngOnInit() {
    this.initChartOptions(); // Initialize options first
    this.loadStats();
    this.loadChartData(); // Load real data
  }

  initChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.incomeExpenseChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
            borderDash: [5, 5],
          },
        },
      },
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart',
      },
    };

    // Keep Crop Production Chart as is for now (hardcoded) or remove if not needed
    this.cropProductionChartOptions = { ...this.incomeExpenseChartOptions }; // Same options for now
    this.cropProductionChartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Limón',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: '#10b981',
          tension: 0.4,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'Cacao',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: true,
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderColor: '#f59e0b',
          tension: 0.4,
          pointBackgroundColor: '#f59e0b',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  }

  loadChartData() {
    this.transactionService.getChartData().subscribe({
      next: (data) => {
        this.incomeExpenseChartData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Ingresos',
              backgroundColor: '#10b981',
              borderColor: '#10b981',
              data: data.income,
              barThickness: 20,
              borderRadius: 4,
            },
            {
              label: 'Gastos',
              backgroundColor: '#ef4444',
              borderColor: '#ef4444',
              data: data.expense,
              barThickness: 20,
              borderRadius: 4,
            },
          ],
        };
      },
      error: (err) => console.error('Error loading chart data', err),
    });

    this.transactionService.getProductionData().subscribe({
      next: (data) => {
        // Apply point styles to the datasets received from backend
        const datasets = data.datasets.map((dataset: any) => ({
          ...dataset,
          pointBackgroundColor: dataset.borderColor,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        }));

        this.cropProductionChartData = {
          labels: data.labels,
          datasets: datasets,
        };
      },
      error: (err) => console.error('Error loading production data', err),
    });
  }

  ngOnDestroy() {
    this.statsSubscription?.unsubscribe();
  }

  loadStats() {
    this.statsSubscription = interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.transactionService.getStats()),
      )
      .subscribe({
        next: (data) => {
          this.stats = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar las estadísticas';
          this.loading = false;
          console.error(err);
        },
      });
  }
}
