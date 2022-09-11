import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookService } from '../book.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  subscriptions: Subscription[] = [];

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private modal: NzModalRef) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [],
      numPages: [],
      autor: [],
      publishYear: []
    });
  }

  submitForm() {
    this.subscriptions.push(this.bookService.create(this.form.value).subscribe((data) => this.destroyModal(data)));
  }

  destroyModal(data?: any) {
    this.modal.destroy(data);
  }

  ngOnDestroy(): void {
    this.subscriptions.filter(s => s).forEach(s => s.unsubscribe());
  }

}
