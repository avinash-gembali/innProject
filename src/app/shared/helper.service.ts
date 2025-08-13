import { Helper } from './helper';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  msg: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})

export class HelperService {
  constructor(private http: HttpClient) {}

  getHelpers(): Observable<ApiResponse<Helper[]>> {
    return this.http.get<ApiResponse<Helper[]>>('http://localhost:3000/api/helpers');
  }

  addHelper(helper: Helper): Observable<ApiResponse<Helper>> {
    return this.http.post<ApiResponse<Helper>>('http://localhost:3000/api/helpers', helper);
  }
  getHelperById(id: number): Observable<ApiResponse<Helper>> {
    return this.http.get<ApiResponse<Helper>>(`http://localhost:3000/api/helpers/${id}`);
  }

  updateHelper(id: number, updatedHelper: Helper): Observable<ApiResponse<Helper>> {
    return this.http.put<ApiResponse<Helper>>(
      `http://localhost:3000/api/helpers/${id}`,
      updatedHelper
    );
  }

  uploadImage(file : File) : Observable<ApiResponse<string>>{
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<ApiResponse<string>>('http://localhost:3000/api/upload', formData);
  }

  deleteHelper(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`http://localhost:3000/api/helpers/${id}`);
  }

}
