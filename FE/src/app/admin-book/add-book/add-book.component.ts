import { Component, OnInit, Input } from '@angular/core';
import { Books, Books1 } from 'src/app/models/book';
import { BooksService } from 'src/app/service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @Input()
  aaa = 'aaaa';
  Book: Books1;
  showMessage: string;
  files: any[];
  imageUR = '/assets/image/00128.jpg';
  FileUpload : File = null;
  selectFile = null;
  constructor(private BooksService: BooksService) { }

  ngOnInit() {

  }
  save(title: string, description: string, pageCount: number,
          price: number , availableQuantity: number, image: File ) {
    const newBook: Books1 = { title, description, pageCount, price, availableQuantity, image } as Books1;
    this.BooksService.addBook(newBook).subscribe(res => this.Book = res.books,
                                           error => this.showMessage = error);
    alert(this.showMessage);

  }
  save1() {
    this.BooksService.addBook(this.Book).subscribe(res => this.Book = res.books,
                                                error => this.showMessage = error) ;
    alert(this.showMessage);
    console.log(this.Book);
  }
  onFileChanged(event: any) {
    this.files = event.target.files;
    console.log(this.files);
  }
  handleFileInput(file: FileList) {
    this.FileUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUR = event.target.result;
    }
    reader.readAsDataURL(this.FileUpload);
    console.log(this.FileUpload);
  }
  OnSubmit(title, description, pageCount,price,availableQuantity,image){

  }
}
