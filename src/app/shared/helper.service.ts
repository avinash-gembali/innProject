import { Helper } from './helper';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpClient) {}

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

  uploadImage(file : File) : Observable<{ url : string }>{
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<{url : string}>('http://localhost:3000/api/upload', formData);
  }

  deleteHelper(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/helpers/${id}`);
  }

}
