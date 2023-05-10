import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Books } from '../books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  bookForm: Books = {
    id: 0,
    title: '',
    totalPages: 0,
    rating: 0,
    publishedDate: ''
  };
 
  constructor(private bookService:BooksService,private http:HttpClient,
    private router:Router,private fb: FormBuilder) {}
 
  ngOnInit(): void {}
 
  create(){
    let data={
      id: 0,
    title: 'dsgsf',
    totalPages: 45,
    publishedDate: '2022-09-08'
    }
    // this.http.post("https://v7zqr09hdf.execute-api.us-east-1.amazonaws.com/dev/book-api",data).subscribe({
    //   next:(data)=>{
    //     console.log(data)
    //     this.router.navigate(["/books/home"])
    //   }
    // })
    this.bookService.create(this.bookForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/books/home"])
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}
