import { Component, OnInit, Input } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';

@Component({
  selector: 'app-book1',
  templateUrl: './book1.component.html',
  styleUrls: ['./book1.component.css']
})
export class Book1Component implements OnInit {
  books: Books[];


  constructor(private BooksService: BooksService) { }

  ngOnInit() {
    this.getAllBook();
  }

  private getAllBook() {
    this.BooksService.getBooks().subscribe(res => this.books =res);
  }
}
