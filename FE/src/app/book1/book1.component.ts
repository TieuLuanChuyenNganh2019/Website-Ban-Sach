import { Component, OnInit, Input } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-book1',
  templateUrl: './book1.component.html',
  styleUrls: ['./book1.component.css']
})
export class Book1Component implements OnInit {
  books: Books[];
  mySubscription: any;
  id1: string = this.route.snapshot.paramMap.get('id1');
  constructor(private BooksService: BooksService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,) {
                this.router.routeReuseStrategy.shouldReuseRoute = function () {
                  return false;
                };
                this.mySubscription = this.router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    // Trick the Router into believing it's last link wasn't previously loaded
                    this.router.navigated = false;
                  }
                });
               }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
      }
  }
  async ngOnInit() {
    await this.getAllBookFromCateID();
  }

  private getAllBook() {
    this.BooksService.getBooks().subscribe(res => this.books =res);
  }
  async getAllBookFromCateID() {
    const id = this.route.snapshot.paramMap.get('id');
    const id1 = this.route.snapshot.paramMap.get('id1');
    await this.BooksService.getBooksFromCateID(id).toPromise().then(res => this.books = res);
    //this.refresh();
  }
  refresh(): void {
    location.reload();
  }
  async add(){
    await alert('Thêm Thành Công');
  }


}
