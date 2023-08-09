import {google} from '@google-cloud/documentai/build/protos/protos';

interface USDriverLicenseParsingResults {
  address?: {
    value: string;
    confidence: number;
  };
  dateOfBirth?: {
    value: string;
    confidence: number;
  };
  documentId?: {
    value: string;
    confidence: number;
  };
  expirationDate?: {
    value: string;
    confidence: number;
  };
  familyName?: {
    value: string;
    confidence: number;
  };
  givenNames?: {
    value: string;
    confidence: number;
  };
  issueDate?: {
    value: string;
    confidence: number;
  };
  portrait?: {
    page: number;
    normalizedVertices: google.cloud.documentai.v1.INormalizedVertex[];
    image: string;
    confidence: number;
  };
}

export {USDriverLicenseParsingResults};
