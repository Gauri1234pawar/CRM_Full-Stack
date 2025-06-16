import { Component } from '@angular/core';
import { EnquiryService } from '../../enquiry.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requirement',
  imports: [CommonModule],
  templateUrl: './requirement.component.html',
  styleUrl: './requirement.component.css'
})
export class RequirementComponent {
  enquiries: any[] = [];

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit(): void {
    this.enquiryService.getEnquiries().subscribe({
      next: (data) => this.enquiries = data,
      error: (err) => console.error(err)
    });
  }

  formatArray(val: string): string {
    return val.split(',').join(', ');
  }
}
