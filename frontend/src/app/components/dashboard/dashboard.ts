import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Implies imports: [CommonModule]
import { TransactionService } from '../../services/transaction.service';
import { DashboardStats } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly transactionService = inject(TransactionService);
  stats: DashboardStats | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.transactionService.getStats().subscribe({
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
