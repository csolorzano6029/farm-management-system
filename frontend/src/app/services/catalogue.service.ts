import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogueType, CatalogueValue } from '../models/catalogue.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  private baseUrl = '/catalogue';

  constructor(private http: HttpClient) {}

  createType(data: CatalogueType): Observable<CatalogueType> {
    return this.http.post<CatalogueType>(`${this.baseUrl}/types`, data);
  }

  findAllTypes(): Observable<CatalogueType[]> {
    return this.http.get<CatalogueType[]>(`${this.baseUrl}/types`);
  }

  createValue(data: CatalogueValue): Observable<CatalogueValue> {
    return this.http.post<CatalogueValue>(`${this.baseUrl}/values`, data);
  }

  findAllValues(): Observable<CatalogueValue[]> {
    return this.http.get<CatalogueValue[]>(`${this.baseUrl}/values`);
  }

  findValuesByType(code: string): Observable<CatalogueValue[]> {
    return this.http.get<CatalogueValue[]>(`${this.baseUrl}/values/type/${code}`);
  }

  updateValue(id: string, data: Partial<CatalogueValue>): Observable<CatalogueValue> {
    return this.http.post<CatalogueValue>(`${this.baseUrl}/values/${id}`, data);
  }

  removeValue(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/values/${id}/delete`, {});
  }
}
