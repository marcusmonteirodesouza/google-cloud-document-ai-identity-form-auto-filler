import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  DocumentsService,
  DocumentsServiceErrorResponse,
  USIDProofing,
} from '../services/documents';
import { toYYYYMMDD } from '../utils/date-utils';
import { toDataURL } from '../utils/file-utils';

@Component({
  selector: 'mv-upload-document',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css'],
})
export class UploadDocumentComponent {
  usDriverLicenseImageData: string | null = null;
  usDriverLicenseImageName: string | null = null;
  usDriverLicenseImageDataReadingError: string | null = null;
  usDriverLicenseParsingErrorMessage: string | null = null;
  usDriverLicenseIdProofingErrorMessage: string | null = null;
  usDriverLicenseIdProofing: USIDProofing | null = null;
  usDriverLicenseForm = this.fb.group({
    address: [''],
    dateOfBirth: [''],
    documentId: [''],
    expirationDate: [''],
    familyName: [''],
    givenNames: [''],
    issueDate: [''],
  });
  usDriverLicensePortraitImageData: string | null | undefined = null;
  usDriverLicensePortraitImageType: string | null | undefined = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly documentsService: DocumentsService,
  ) {}

  async onUSDriverLicenseChange(event: Event) {
    if (!event.target) {
      throw new Error('event.target must be defined');
    }

    const target = event.target as HTMLInputElement;

    if (!target.files) {
      throw new Error('target.files must be defined');
    }

    const document = target.files[0];

    if (!document) {
      return this.resetUSDriverLicenseState();
    }

    const documentDataURL = await toDataURL(document);

    if (!documentDataURL) {
      return (this.usDriverLicenseImageDataReadingError = `Error reading US Driver License document. Document name: ${document.name}`);
    }

    this.usDriverLicenseImageData = documentDataURL.toString();
    this.usDriverLicenseImageName = document.name;

    this.documentsService.parseUSDriverLicense(document).subscribe({
      next: (response) => {
        this.usDriverLicenseParsingErrorMessage = null;

        const {
          address,
          dateOfBirth,
          documentId,
          expirationDate,
          familyName,
          givenNames,
          issueDate,
          portraitImage,
        } = response;

        this.usDriverLicenseForm.patchValue({
          address,
          dateOfBirth: dateOfBirth
            ? toYYYYMMDD(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day)
            : '',
          documentId,
          expirationDate: expirationDate
            ? toYYYYMMDD(
                expirationDate.year,
                expirationDate.month,
                expirationDate.day,
              )
            : '',
          familyName,
          givenNames,
          issueDate: issueDate
            ? toYYYYMMDD(issueDate.year, issueDate.month, issueDate.day)
            : '',
        });

        this.usDriverLicensePortraitImageData = portraitImage?.data;
        this.usDriverLicensePortraitImageType = portraitImage?.mimeType;
      },
      error: (error: DocumentsServiceErrorResponse) => {
        this.usDriverLicenseParsingErrorMessage = `Error parsing US Driver License: ${error.message}`;
      },
    });

    this.documentsService.usIdProof(document).subscribe({
      next: (response) => {
        this.usDriverLicenseIdProofing = response;
      },
      error: (error: DocumentsServiceErrorResponse) => {
        this.usDriverLicenseIdProofingErrorMessage = `Error ID proofing US Driver License: ${error.message}`;
      },
    });
  }

  private resetUSDriverLicenseState() {
    this.usDriverLicenseImageData = null;
    this.usDriverLicenseImageDataReadingError = null;
    this.usDriverLicenseParsingErrorMessage = null;
    this.usDriverLicenseIdProofingErrorMessage = null;
    this.usDriverLicenseIdProofing = null;
    this.usDriverLicenseForm.reset();
    this.usDriverLicensePortraitImageData = null;
    this.usDriverLicensePortraitImageType = null;
  }
}
