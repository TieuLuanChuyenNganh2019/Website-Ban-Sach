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
  async save(title: string, description: string, pageCount: number,
          price: number , availableQuantity: number , publisher: string , author: string,
           categories: string , discount: number , image: File ) {
    const newBook: Books1 = { title, description, pageCount, price, availableQuantity,
                              publisher, author, categories, discount, image } as Books1;
    await this.BooksService.addBook(newBook).toPromise().then(res => this.Book = res,
                                           error => this.showMessage = error);
    await alert(this.showMessage);

  }
  save1() {
    this.BooksService.addBook(this.Book).subscribe(res => this.Book = res,
                                                error => this.showMessage = error) ;
    alert(this.showMessage);
    console.log(this.Book);
  }
  onFileChanged(event: any) {
    this.files = event.target.files;
    //console.log(this.files);
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
