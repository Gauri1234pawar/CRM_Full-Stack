import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EnquiryService } from '../enquiry.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {
  searchText: string = '';
  enquiries: any[] = [];
  showEnquiries: boolean = false;
  filterDate: string = '';
  allEnquiries: any[] = []; // Store all data to filter/reset
username: string = '';

  constructor(private enquiryService: EnquiryService, private router: Router) { }

  // Load all enquiries
  onViewEnquiriesClick() {
    this.showEnquiries = true;
    this.enquiryService.getEnquiries().subscribe({
      next: (data) => {
        this.enquiries = data;
      },
      error: (err) => console.error('Error loading enquiries:', err)
    });
  }

  
  onSearchClick() {
    const search = this.searchText.trim().toLowerCase();

    if (search === '') {
      this.onViewEnquiriesClick(); 
    } else {
      this.enquiryService.searchEnquiries(search).subscribe({
        next: (data) => {
          this.enquiries = data;
          this.showEnquiries = true;
        },
        error: (err) => console.error('Search error:', err)
      });
    }
  }

  // For displaying array values properly
  formatArray(value: string): string {
    return value ? value.split(',').map(item => item.trim()).join(', ') : 'N/A';
  }

  onLogout() {

    this.router.navigate(['/login']);
  }

  downloadEnquiriesAsPDF() {
    const doc = new jsPDF();

    doc.text('Enquiry List', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Name', 'Location', 'Preferred Location', 'Requirements', 'Budget', 'Builder', 'Project']],
      body: this.enquiries.map(e => [
        e.name,
        e.location,
        e.preferredLocation,
        this.formatArray(e.requirements),
        this.formatArray(e.budget),
        e.builder,
        e.project
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [13, 110, 253] } 
    });

    doc.save('Enquiries.pdf');
  }




}
