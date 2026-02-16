import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkerModel, CreateWorkerDto, UpdateWorkerDto } from '../models/worker.model';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private readonly baseUrl = '/workers';

  constructor(private readonly http: HttpClient) {}

  create(data: CreateWorkerDto): Observable<WorkerModel> {
    return this.http.post<WorkerModel>(this.baseUrl, data);
  }

  findAll(): Observable<WorkerModel[]> {
    return this.http.get<WorkerModel[]>(this.baseUrl);
  }

  findAllPaged(page: number, limit: number): Observable<{ data: WorkerModel[]; total: number }> {
    return this.http.get<{ data: WorkerModel[]; total: number }>(
      `${this.baseUrl}/paginated?page=${page}&limit=${limit}`,
    );
  }

  findOne(id: string): Observable<WorkerModel> {
    return this.http.get<WorkerModel>(`${this.baseUrl}/${id}`);
  }

  update(id: string, data: UpdateWorkerDto): Observable<WorkerModel> {
    return this.http.patch<WorkerModel>(`${this.baseUrl}/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
