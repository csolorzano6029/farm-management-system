import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  private readonly transactionService = inject(TransactionService);

  transactions = signal<Transaction[]>([]);
  total = signal(0);
  page = signal(1);
  limit = signal(5);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading.set(true);
    this.transactionService.findAllPaged(this.page(), this.limit()).subscribe({
      next: (response) => {
        this.transactions.set(response.data);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Error al cargar las transacciones');
        this.loading.set(false);
      },
    });
  }

  onPageChange(event: any) {
    this.page.set(event.page + 1); // PrimeNG is 0-indexed
    this.limit.set(event.rows);
    this.loadTransactions();
  }
}
