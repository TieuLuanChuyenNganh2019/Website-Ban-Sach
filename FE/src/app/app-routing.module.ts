import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Book1Component } from './book1/book1.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { ListBookComponent } from './admin-book/list-book/list-book.component';
import { AddBookComponent } from './admin-book/add-book/add-book.component';
import { CreateBookComponent } from './admin-book/create-book/create-book.component';
import { ListAuthorComponent } from './admin-author/list-author/list-author.component';


const routes: Routes = [
  {path: 'book1', component: Book1Component},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent},
  {path: 'details/:id', component: ProductDetailsComponent},
  {path: 'adminbooks', component: AdminBooksComponent},
  {path: 'admin/listbook', component: ListBookComponent},
  {path: 'admin/addbook', component: AddBookComponent},
  {path: 'admin/createbook', component: CreateBookComponent},
  {path: 'admin/listauthor', component: ListAuthorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
