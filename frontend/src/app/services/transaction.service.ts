import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, CreateTransactionDto, DashboardStats } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = '/transactions';

  constructor(private http: HttpClient) {}

  create(data: CreateTransactionDto): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, data);
  }

  findAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/stats`);
  }
}
