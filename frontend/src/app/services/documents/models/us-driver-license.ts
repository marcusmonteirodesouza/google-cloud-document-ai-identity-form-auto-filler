import { IDate } from './idate';

class USDriverLicense {
  constructor(
    readonly address: string | null,
    readonly dateOfBirth: IDate | null,
    readonly documentId: string | null,
    readonly expirationDate: IDate | null,
    readonly familyName: string | null,
    readonly givenNames: string | null,
    readonly issueDate: IDate | null,
    readonly portraitImage: {
      data: string;
      mimeType: string;
    } | null,
  ) {}
}

export { USDriverLicense };
