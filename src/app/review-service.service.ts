import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review } from './review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5000/api/showreview';

  constructor(private http: HttpClient) { }

  fetchReviews(item: string, sentiment?: string, rating?: string): Observable<Review[]> {
    let params = new HttpParams().set('item', item);

    // Add sentiment filter if provided
    if (sentiment) {
      params = params.set('sentiment', sentiment);
    }

    // Add rating filter if provided
    if (rating) {
      params = params.set('rating', rating);
    }

    return this.http.get<Review[]>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
