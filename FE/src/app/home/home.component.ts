import { Component, OnInit } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Books[];


  constructor(private BooksService: BooksService) { }

  ngOnInit() {
    this.getAllBook();
  }

  private getAllBook() {
    this.BooksService.getBooks().subscribe(res => this.books = res);
  }
}
