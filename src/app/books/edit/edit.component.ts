import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from '../books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  bookForm: Books = {
    id: 0,
    title: '',
    totalPages: 0,
    rating: 0,
    publishedDate: ''
  };
  error=false
  exceptionMessage=""
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private bookService: BooksService
  ) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });
  }
 
  getById(id: number) {
    this.bookService.getById(id).subscribe(
      {
        next:(data)=>{
          console.log(data)
          this.bookForm=data.data
          this.error=false
        },
        error:(err)=>{
          console.log(err)
          this.error=true
          this.exceptionMessage=err.error.exception
        }
      }
    );
  }
 
  update() {
    this.bookService.update(this.bookForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/books/home"]);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}
