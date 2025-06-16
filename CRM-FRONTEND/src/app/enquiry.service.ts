import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

 private apiUrl = 'https://localhost:7280/api/Enquiry';  // ✅ Your backend endpoint
  private apiUrl2 = 'https://localhost:7280/api/Enquiry';
  constructor(private http: HttpClient) {}

  submitEnquiry(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

   getEnquiries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }
  searchEnquiries(query: string): Observable<any[]> {
  return this.http.get<any[]>(`https://localhost:7280/api/Enquiry/search?query=${query}`);
}

}
