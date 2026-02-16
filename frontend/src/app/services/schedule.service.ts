import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleModel, CreateScheduleDto } from '../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly baseUrl = '/schedules';

  constructor(private readonly http: HttpClient) {}

  findAllByMonth(year: number, month: number): Observable<ScheduleModel[]> {
    return this.http.get<ScheduleModel[]>(`${this.baseUrl}?year=${year}&month=${month}`);
  }

  create(schedule: CreateScheduleDto): Observable<ScheduleModel> {
    return this.http.post<ScheduleModel>(this.baseUrl, schedule);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
