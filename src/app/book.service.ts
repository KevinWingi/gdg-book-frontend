import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IBook } from '../domain/book';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  api = `${environment.api}/books`;

  constructor(private http: HttpClient) { }

  create(data: any): Observable<IBook> {
    return this.http.post<IBook>(this.api, JSON.stringify(data), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  list(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.api);
  }

  update(data: any): Observable<IBook> {
    return this.http.put<IBook>(this.api, JSON.stringify(data), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  delete(bookId: number): Observable<IBook> {
    return this.http.delete(`${this.api}/${bookId}`);
  }

}
