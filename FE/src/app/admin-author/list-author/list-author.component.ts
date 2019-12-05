import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.css']
})
export class ListAuthorComponent implements OnInit {
  authors: [Author];
  title = 'A';

  constructor(private AuthorService: AuthorService) { }

  ngOnInit() {
    this.getAllAuthor();
  }

  getAllAuthor() {
    this.AuthorService.getAuthors().subscribe(res => { this.authors = res.authors });
  }
}
