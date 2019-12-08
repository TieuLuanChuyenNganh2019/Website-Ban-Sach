import { Component, OnInit } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-book-pub',
  templateUrl: './book-pub.component.html',
  styleUrls: ['./book-pub.component.css']
})
export class BookPubComponent implements OnInit {

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
    await this.getAllBookFromPubID();
  }

  async getAllBookFromPubID() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.BooksService.getBooksFromPubID(id).toPromise().then(res => this.books = res);
  }
  refresh(): void {
    location.reload();
  }
  async add(){
    await alert('Thêm Thành Công');
  }

}
