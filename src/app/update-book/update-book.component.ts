import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookService } from '../book.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { IBook } from '../../domain/book';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  subscriptions: Subscription[] = [];

  @Input() book: IBook = null;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private modal: NzModalRef) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      title: [],
      numPages: [],
      autor: []
    });

    this.form.patchValue(this.book);

  }

  submitForm() {
    this.subscriptions.push(this.bookService.update(this.form.value).subscribe((data) => this.destroyModal(data)));
  }

  destroyModal(data?: any) {
    this.modal.destroy(data);
  }

  ngOnDestroy(): void {
    this.subscriptions.filter(s => s).forEach(s => s.unsubscribe());
  }
}
