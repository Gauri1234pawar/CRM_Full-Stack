import { Component } from '@angular/core';
import { EnquiryService } from '../../enquiry.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
 enquiries: any[] = [];

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit(): void {
    this.enquiryService.getEnquiries().subscribe({
      next: (data) => this.enquiries = data,
      error: (err) => console.error(err)
    });
  }
}
