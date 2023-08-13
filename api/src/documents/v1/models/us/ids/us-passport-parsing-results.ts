import {google} from '@google-cloud/documentai/build/protos/protos';

interface USPassportParsingResults {
  address: string | null;
  dateOfBirth: google.type.IDate | null;
  documentId: string | null;
  expirationDate: google.type.IDate | null;
  familyName: string | null;
  givenNames: string | null;
  issueDate: google.type.IDate | null;
  mrzCode: string | null;
  portraitImage: {
    data: string;
    mimeType: string;
  } | null;
}

export {USPassportParsingResults};
