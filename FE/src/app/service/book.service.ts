import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Books } from '../models/book';
import { RootObj } from '../models/root-obj';
import { ApiService } from './api.service';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private ApiService: ApiService
  ) { }

  getBooks(): Observable<RootObj<[Books]>> {
    return this.ApiService.get<RootObj<[Books]>>(this.ApiService.apiURL.books);
  }

}

