import { CatalogueValue } from './catalogue.model';

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  date: string; // ISO string
  type: TransactionType;
  category: CatalogueValue;
  categoryId: string;
  workerId?: string;
  quantity?: number;
  unitPrice?: number;
  totalAmount: number;
  notes?: string;
  createdAt?: string;
}

export interface CreateTransactionDto {
  date: string; // ISO string
  type: TransactionType;
  categoryId: string;
  workerId?: string;
  quantity?: number;
  unitPrice?: number;
  totalAmount: number;
  notes?: string;
}

export interface DashboardStats {
  income: number;
  expense: number;
  balance: number;
  recentTransactions: Transaction[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
