import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Books } from '../models/book';
import { RootObj } from '../models/root-obj';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }
  private BooksURL = 'http://localhost:8080/';
  apiURL = {
  books: `${this.BooksURL}books`,
  };


  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

}

