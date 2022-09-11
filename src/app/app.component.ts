import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBook } from '../domain/book';
import { BookService } from './book.service';
import { Subscription } from 'rxjs';
import { NzModalService } from "ng-zorro-antd/modal";
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'GDG Book';

  books: IBook[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private bookService: BookService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.subscriptions.push(this.bookService.list().subscribe(books => this.books = books));
  }

  delete(book: IBook) {
    this.subscriptions.push(this.bookService.delete(book.id).subscribe(() => {
      this.books = this.books.filter(b => b.id !== book.id);
    }
    ));
  }

  onAddBook() {
    const modal = this.modalService.create({
      nzTitle: "New book",
      nzContent: AddBookComponent,
      nzWidth: "50%",
    });
    this.subscriptions.push(
      modal.afterClose.subscribe((result: IBook) => {
        if (result) {
          this.books = [...this.books, result];
        }
      })
    );
  }

  onUpdateBook(book: IBook) {
    const idx = this.books.findIndex(bk => bk.id === book.id);
    const modal = this.modalService.create({
      nzTitle: `Update book ${book.title}`,
      nzComponentParams: { book },
      nzContent: UpdateBookComponent,
      nzWidth: "50%",
    });
    this.subscriptions.push(
      modal.afterClose.subscribe((result: IBook) => {
        if (result) {
          this.books = this.books.map(bk => {
            if (bk.id === book.id) bk = result;
            return bk;
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.filter(s => s).forEach(s => s.unsubscribe());
  }

}
