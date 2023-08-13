import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { USDriverLicense, USIDProofing, USPassport } from './models';
import { DocumentsServiceErrorResponse } from './errors';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private readonly http: HttpClient) {}

  parseUSDriverLicense(usDriverLicense: File): Observable<USDriverLicense> {
    const url = `${environment.apiBaseUrl}/v1/documents/countries/us/ids/driver-licenses/parse`;

    const formData = new FormData();

    formData.append(
      usDriverLicense.name,
      usDriverLicense,
      usDriverLicense.name,
    );

    return this.http.post<USDriverLicense>(url, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => {
          throw this.mapError(error);
        });
      }),
    );
  }

  parseUSPassport(usPassport: File): Observable<USPassport> {
    const url = `${environment.apiBaseUrl}/v1/documents/countries/us/ids/us-passport/parse`;

    const formData = new FormData();

    formData.append(usPassport.name, usPassport, usPassport.name);

    return this.http.post<USPassport>(url, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => {
          throw this.mapError(error);
        });
      }),
    );
  }

  usIdProof(idDocument: File): Observable<USIDProofing> {
    const url = `${environment.apiBaseUrl}/v1/documents/countries/us/ids/id-proof`;

    const formData = new FormData();

    formData.append(idDocument.name, idDocument, idDocument.name);

    return this.http.post<USIDProofing>(url, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => {
          throw this.mapError(error);
        });
      }),
    );
  }

  private mapError(error: HttpErrorResponse): DocumentsServiceErrorResponse {
    const { code, message, innerError } = error.error;

    return new DocumentsServiceErrorResponse(code, message, innerError);
  }
}
