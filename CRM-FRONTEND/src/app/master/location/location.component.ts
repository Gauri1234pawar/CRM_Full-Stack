import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EnquiryService } from '../../enquiry.service';

@Component({
  selector: 'app-location',
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
locationEnquiries: any[] = [];

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit(): void {
    this.enquiryService.getEnquiries().subscribe({
      next: (data) => {
        this.locationEnquiries = data.map((e: any) => ({
          name: e.name,
          location: e.location
        }));
      },
      error: (err) => console.error('Failed to load enquiries:', err)
    });
  }
}
