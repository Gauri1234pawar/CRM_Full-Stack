import { Component } from '@angular/core';
import { EnquiryService } from '../../enquiry.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-builder',
  imports: [CommonModule],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
})
export class BuilderComponent {
enquiries: any[] = [];

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit(): void {
    this.enquiryService.getEnquiries().subscribe({
      next: (data) => this.enquiries = data,
      error: (err) => console.error(err)
    });
  }
}
