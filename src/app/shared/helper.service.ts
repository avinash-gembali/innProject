import { Helper } from './helper';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpClient) {}

  private helpers: Helper[] = [];

  getHelpers(): Observable<Helper[]> {
    return this.http.get<Helper[]>('http://localhost:3000/api/helpers');
  }

  addHelper(helper: Helper): Observable<Helper> {
    return this.http.post<Helper>('http://localhost:3000/api/helpers', helper);
  }
  getHelperById(id: number): Observable<Helper> {
    return this.http.get<Helper>(`http://localhost:3000/api/helpers/${id}`);
  }

  updateHelper(id: number, updatedHelper: Helper): Observable<Helper> {
    return this.http.put<Helper>(
      `http://localhost:3000/api/helpers/${id}`,
      updatedHelper
    );
  }

  deleteHelper(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/helpers/${id}`);
  }

}
