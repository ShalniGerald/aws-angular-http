import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ApiResponseSingleRec } from './ApiResponse';
import { Books } from './books';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseUrl="https://v7zqr09hdf.execute-api.us-east-1.amazonaws.com/dev"

  constructor(private http: HttpClient) { }


  get() {
    const url=`${this.baseUrl}/book-api`
    return this.http.get<ApiResponse>(url);
  }

  create(payload: Books) {
    const url=`${this.baseUrl}/book-api`
    return this.http.post<Books>(url, payload);
  }

  getById(id: number) {
    const url=`${this.baseUrl}/book-api/${id}`
    return this.http.get<ApiResponseSingleRec>(url);
   }
    
  update(payload:Books){
    const url=`${this.baseUrl}/book-api/${payload.id}`
    return this.http.put(url,payload);
   }

   delete(id:number){
    const url=`${this.baseUrl}/book-api/${id}`
    return this.http.delete<Books>(url);
 }
}
