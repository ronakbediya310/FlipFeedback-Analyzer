import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SearchServiceService } from '../search-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() item: string = '';
  @ViewChild('searchInput') searchInput!: ElementRef; // Reference to the input element
  @Output() filterEvent = new EventEmitter<{ sentiment: string, rating: string }>();

  sentimentFilter: string = '';
  ratingFilter: string = '';

  constructor(private searchService: SearchServiceService) { }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus(); // Set focus to the input element on component initialization
  }

  searchReviews(): void {
    if (this.item.trim()) { // Ensure the item is not empty or whitespace
      this.searchService.setSearchItem(this.item);
      this.item = ''; // Clear input field after searching
    }
  }

  applyFilters(): void {
    this.filterEvent.emit({ sentiment: this.sentimentFilter, rating: this.ratingFilter });
  }
}
