import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, map, of, pipe } from 'rxjs';
import { ApiResponse } from '../ApiResponse';
import { Books } from '../books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Books[] = [];
  idTodelete: number = 0;
 
  constructor(private booksService: BooksService, private http:HttpClient) {}
 
  ngOnInit(): void {
 
 
    this.get();
  }

  compareFn = (a:Books, b:Books) => {
    if (a.id < b.id)
      return -1;
    if (a.id > b.id)
      return 1;
    return 0;
  };
 
  get() {
    this.booksService.get().pipe(
      map(data=>{
        return data.data.sort(this.compareFn)
      })
    ).subscribe((data) => {
      console.log(data)
      this.books = data;
    });

    // Types of responses

    // this.http.get<ApiResponse>("https://v7zqr09hdf.execute-api.us-east-1.amazonaws.com/dev/book-api",
    // {
    //   observe:"response"
    // }
    // ).subscribe({
    //   next:(data)=>{
    //     console.log(data)
    //   }
    // })

    //RxJS operator
    // this.http.get<ApiResponse>("https://v7zqr09hdf.execute-api.us-east-1.amazonaws.com/dev/book-api")
    // .pipe(
    //   map(data=>data.data.filter(d=>d.rating>3))
    // )
    // .subscribe(data=>{
    //   console.log(data)
    //   this.books = data;
    // })

    // Pass Authorization token in headers
    // this.http.get('https://v7zqr09hdf.execute-api.us-east-1.amazonaws.com/dev/book-api-auth').subscribe({
    //   next:(data)=>{
    //     console.log(data)
    //   },
    //   error:(err)=>{
    //     console.log(err,"error")
    //   },
    //   complete:()=>{
    //     console.log("completed")
    //   }
    // })
  }
  delete(id:number) {
    this.booksService.delete(id).subscribe({
      next: (data) => {
        console.log(data)
        this.get()
      },
    });
  }
}
