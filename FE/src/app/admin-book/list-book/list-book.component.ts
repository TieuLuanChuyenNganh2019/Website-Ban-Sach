import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/models/book';
import { BooksService } from 'src/app/service/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  books: [Books];


  constructor(private BooksService: BooksService) { }

  ngOnInit() {
    this.getAllBook();
  }

  private getAllBook() {
    this.BooksService.getBooks().subscribe(res => { this.books = res.books });
  }
}
