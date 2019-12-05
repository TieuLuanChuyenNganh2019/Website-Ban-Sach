import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../service/book.service';
import { Books } from '../models/book';
import { ReviewsService } from '../service/review.service';
import { Review } from '../models/review';
import { AuthorService } from '../service/author.service';
import { Author } from '../models/author';
import { CateService } from '../service/cate.service';
import { Cate } from '../models/cate';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  books: Books;
  review: Review;
  idrv: string;
  reviews: Review[];
  addreivew: Review;
  author: Author;
  cates: Cate[];
  constructor(
    private route: ActivatedRoute,
    private BooksService: BooksService,
    private ReviewService: ReviewsService,
    private AuthorsService: AuthorService,
    private CateService: CateService,
  ) { }

  async ngOnInit() {
    await this.getAssignfromRoute();
    await this.getReviewfromIDBook();
    await this.getAuthorfromIDBook();
    await this.getCatefromIDBook();
  }

  async getAssignfromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.BooksService.getBooksFromID(id).toPromise().then(res => this.books = res,);
    console.log(this.books.reviews);

  }
  // getReviewfromID(id: string) {
  //   const idrv = this.books.reviews;
  //   this.ReviewService.getReviewFromID(id).subscribe(res => this.review = res);
  //   console.log(this.review);
  // }
  async getReviewfromIDBook() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.ReviewService.getReviewFromIDBook(id).toPromise().then(res => this.reviews = res);
    console.log(this.reviews);
  }
  async save(review: number, comment: string ) {
    const id = this.route.snapshot.paramMap.get('id');
    const newReview: Review = { id, review, comment } as Review;
    await this.ReviewService.addReview(newReview).toPromise().then(res => this.addreivew = res);
    await this.getReviewfromIDBook();
  }
  async getAuthorfromIDBook() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.AuthorsService.getAuthorFromIDBook(id).toPromise().then(res => this.author = res);
  }
  async getCatefromIDBook() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.CateService.getCateFromID(id).toPromise().then(res => this.cates = res);
  }
}
