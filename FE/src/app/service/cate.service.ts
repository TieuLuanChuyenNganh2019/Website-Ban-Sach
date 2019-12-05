import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Cate } from '../models/cate';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CateService {

  constructor(
    private ApiService: ApiService,
    private http: HttpClient
  ) { }
  bookURL = 'http://localhost:8080/books';

  // getBooks(): Observable<Books[]> {
  //   return this.ApiService.get<Books[]>(this.bookURL).pipe();
  // }
  // addBook(Books: Books1): Observable<RootObj<Books1>> {
  //   return this.ApiService.post<RootObj<Books1>>(this.ApiService.apiURL.getbooks, Books );
  // }
  // delete(id: string): Observable<Books> {
  //   return this.ApiService.delete<Books>(`${this.bookURL}/${id}`);
  // }
  getCateFromID(id: string): Observable<Cate[]> {
    const url = `${this.bookURL}/${id}/cate`;
    return this.http.get<Cate[]>(url).pipe();
  }

}

