import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Implies imports: [CommonModule]
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  private readonly transactionService = inject(TransactionService);

  transactions = signal<Transaction[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading.set(true);
    this.transactionService.findAll().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Error al cargar las transacciones');
        this.loading.set(false);
      },
    });
  }
}
