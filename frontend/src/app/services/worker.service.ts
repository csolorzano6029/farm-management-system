import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker, CreateWorkerDto, UpdateWorkerDto } from '../models/worker.model';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private baseUrl = '/workers';

  constructor(private http: HttpClient) {}

  create(data: CreateWorkerDto): Observable<Worker> {
    return this.http.post<Worker>(this.baseUrl, data);
  }

  findAll(): Observable<Worker[]> {
    return this.http.get<Worker[]>(this.baseUrl);
  }

  findOne(id: string): Observable<Worker> {
    return this.http.get<Worker>(`${this.baseUrl}/${id}`);
  }

  update(id: string, data: UpdateWorkerDto): Observable<Worker> {
    return this.http.patch<Worker>(`${this.baseUrl}/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
