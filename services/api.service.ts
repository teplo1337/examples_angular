import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, } from '@angular/common/http';
import { map, catchError, share } from 'rxjs/operators';
import { SomeClass } from '../models/example.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postLogin(body: SomeData): Observable<SomeAuthCLass> {
    return this.http.post('login', body)
      .pipe(map((res: SomeAuthCLassInterface) => new SomeAuthCLass({...body, ...res })));
  }

  getSome(): Observable<SomeClass[]> {
    return this.http.get('some')
      .pipe(map((res: SomeClassInterface[]) => res && res.map(r => new SomeClass(r))));
  }

  putSome(someData: SomeData) {
    const { id } = someData;
    return this.http.put('some/' + id, someData)
      .pipe(map((res: SomeClassInterface) => new SomeClass(res)));
  }
}
