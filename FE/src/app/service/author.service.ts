import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Books, Books1 } from '../models/book';
import { RootObj, RootObj1 } from '../models/root-obj';
import { ApiService } from './api.service';
import { Author } from '../models/author';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private ApiService: ApiService,
    private http: HttpClient,
  ) { }
  URL = 'http://localhost:8080/books';

  getAuthors(): Observable<RootObj1<[Author]>> {
    return this.ApiService.get<RootObj1<[Author]>>(this.ApiService.apiURL.getauthors);
  }
  getAuthorFromIDBook(id: string): Observable<Author> {
    const url = `${this.URL}/${id}/author`;
    return this.http.get<Author>(url).pipe();
  }

  // addBook(Books: Books1): Observable<RootObj<Books1>> {
  //   return this.ApiService.post<RootObj<Books1>>(this.ApiService.apiURL.getbooks, Books );
  // }
  // delete(id: string): Observable<RootObj<Books>> {
  //   return this.ApiService.delete<RootObj<Books>>(`${this.ApiService.apiURL.getbooks}/${id}`);
  // }
}

