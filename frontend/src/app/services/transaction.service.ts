import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Transaction,
  CreateTransactionDto,
  DashboardStats,
  PaginatedResponse,
} from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly baseUrl = '/transactions';

  constructor(private readonly http: HttpClient) {}

  create(data: CreateTransactionDto): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, data);
  }

  update(id: string, data: CreateTransactionDto): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  findAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  findAllPaged(page: number, limit: number): Observable<PaginatedResponse<Transaction>> {
    return this.http.get<PaginatedResponse<Transaction>>(`${this.baseUrl}/paged`, {
      params: { page, limit },
    });
  }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/stats`);
  }
}
