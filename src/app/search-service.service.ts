import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  private searchItemSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchItem$: Observable<string> = this.searchItemSubject.asObservable();

  constructor() {}

  setSearchItem(searchItem: string): void {
    // Ensure that the searchItem is not null or undefined
    if (searchItem != null) {
      this.searchItemSubject.next(searchItem.trim()); // Trim the searchItem
    }
  }

  getSearchItem(): Observable<string> {
    return this.searchItem$;
  }
}
