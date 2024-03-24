import { Component, OnInit } from '@angular/core';
import { Review } from '../review.model';
import { ReviewService } from '../review-service.service';
import { SearchServiceService } from '../search-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviewcard',
  templateUrl: './reviewcard.component.html',
  styleUrls: ['./reviewcard.component.css']
})
export class ReviewCardComponent implements OnInit {
  reviews: Review[] = [];
  isLoading: boolean = false;

  constructor(private reviewService: ReviewService, private searchService: SearchServiceService) { }

  ngOnInit(): void {
    this.searchService.getSearchItem().subscribe((term: string) => {
      if (term.trim()) { // Ensure term is not empty
        this.fetchReviews(term);
      }
    });
  }

  fetchReviews(searchTerm: string): void {
    this.isLoading = true;
    this.reviews = []; 
    this.reviewService.fetchReviews(searchTerm).subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
        this.isLoading = false;
      }
    );
  }
}
