import { Pipe, PipeTransform } from '@angular/core';
import { SomeRepository } from '../repositories/some.repository';
import { Observable } from 'rxjs';
import { Some } from '../models/some.model';

@Pipe({
  name: 'some'
})

export class SomePipe implements PipeTransform {
  constructor(
    private someRepository: SomeRepository
  ) { }

  transform(id: number): Observable<Some> {
    // http request
    return this.someRepository.getSome(id);
  }

}
