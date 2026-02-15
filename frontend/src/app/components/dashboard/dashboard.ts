import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { DashboardStats } from '../../models/transaction.model';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private readonly transactionService = inject(TransactionService);
  stats: DashboardStats | null = null;
  loading = true;
  error: string | null = null;
  private statsSubscription?: Subscription;

  ngOnInit() {
    this.loadStats();
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
