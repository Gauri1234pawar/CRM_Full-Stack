import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnquiryService } from '../enquiry.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-enquiry-form',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './enquiry-form.component.html',
  styleUrl: './enquiry-form.component.css'
})
export class EnquiryFormComponent {
  model = {
    name: '',
    location: '',
    preferredLocation: '',      // <-- Added this line
    requirements: [] as string[],
    budget: [] as string[],
    builder: '',
    project: '',
  };
  constructor(private enquiryService: EnquiryService) {}
  locations = ['Mumbai', 'Pune', 'Delhi', 'Nashik', 'Nagpure', 'Lature', 'Pandharpure', 'Andheri', 'Thane'];

  reqs = ['1BHK', '2BHK', '1RK', '3BHK', 'Plot'];
  budgets = ['10-20L', '20-30L', '40-50L', '50-60L', '60-70L', '70-80L'];

  builders = ['Lodha', 'Godrej', 'Runwal', 'Shapoorji Pallonji', 'Sobha'];

  builderProjectsMap: { [key: string]: string[] } = {
    'Lodha': ['Casa Viva', 'Amara', 'Splendora'],
    'Godrej': ['Godrej Horizon', 'Godrej Nest', 'Godrej Sky'],
    'Runwal': ['Runwal Forest', 'Runwal Bliss', 'Runwal Greens'],
    'Shapoorji Pallonji': ['Shapoorji Magnolia', 'Shapoorji Seasons', 'Shapoorji Skyview'],
    'Sobha': ['Sobha Dream Acres', 'Sobha City', 'Sobha Palm Court']
  };

  projects: string[] = [];

  onRequirementChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.model.requirements.push(checkbox.value);
    } else {
      this.model.requirements = this.model.requirements.filter(r => r !== checkbox.value);
    }
  }

  onBudgetChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.model.budget.push(checkbox.value);
    } else {
      this.model.budget = this.model.budget.filter(b => b !== checkbox.value);
    }
  }

  onBuilderChange() {
    if (this.model.builder && this.builderProjectsMap[this.model.builder]) {
      this.projects = this.builderProjectsMap[this.model.builder];
    } else {
      this.projects = [];
      this.model.project = '';
    }
  }

  onSubmit() {
  const payload = {
    ...this.model,
    requirements: this.model.requirements.join(','), // Convert array to comma-separated string
    budget: this.model.budget.join(',')
  };

  this.enquiryService.submitEnquiry(payload).subscribe({
    next: (res) => {
      console.log('Server response:', res);
      alert('Enquiry submitted successfully!');
      // Optionally reset form
      this.model = {
        name: '',
        location: '',
        preferredLocation: '',
        requirements: [],
        budget: [],
        builder: '',
        project: ''
      };
      this.projects = [];
    },
    error: (err) => {
      console.error('Submission failed:', err);
      alert('Failed to submit enquiry. Try again.');
    }
  });
}

addPreferredLocation() {
  const newLocation = this.model.preferredLocation.trim();

  if (newLocation && !this.locations.includes(newLocation)) {
    this.locations.push(newLocation);         // Add to dropdown
    this.model.location = newLocation;        // Optionally select it
    // ❌ Don't clear preferred location field
  } else if (!newLocation) {
    alert('Please enter a preferred location.');
  } else {
    alert('This location is already added.');
  }
}


}

