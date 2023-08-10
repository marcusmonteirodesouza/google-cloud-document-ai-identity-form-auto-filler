interface USDriverLicenseParsingResults {
  address: string | null;
  dateOfBirth: string | null;
  documentId: string | null;
  expirationDate: string | null;
  familyName: string | null;
  givenNames: string | null;
  issueDate: string | null;
  portraitImage: string | null;
}

export {USDriverLicenseParsingResults};
