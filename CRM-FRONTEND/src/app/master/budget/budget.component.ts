import { Component } from '@angular/core';
import { EnquiryService } from '../../enquiry.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-budget',
  imports: [CommonModule,RouterLink],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {
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
