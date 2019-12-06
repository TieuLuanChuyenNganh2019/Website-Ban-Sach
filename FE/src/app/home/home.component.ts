import { Component, OnInit } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';
import { CateService } from '../service/cate.service';
import { Cate } from '../models/cate';
import { BookPubComponent } from '../book-pub/book-pub.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Books[];
  cates: Cate[];
  searchbook: Books;

  constructor(private BooksService: BooksService,
              private CateService: CateService, ) { }

  ngOnInit() {
    this.getAllBook();
    this.getAllCate();
  }

  private getAllBook() {
    this.BooksService.getBooks().subscribe(res => this.books = res);
  }
  private getAllCate() {
    this.CateService.getCates().subscribe(res => this.cates = res);
  }
  // search(searchTerm: string) {
  //   this.searchbook = undefined;
  //   if (searchTerm) {
  //     this.heroesService
  //       .searchHeroes(searchTerm)
  //       .subscribe(heroes => (this.heroes = heroes));
  //   }
  // }
}
