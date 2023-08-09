import {google} from '@google-cloud/documentai/build/protos/protos';

interface USPassportParsingResults {
  address: {
    value: string;
    confidence: number;
  } | null;
  dateOfBirth: {
    value: string;
    confidence: number;
  } | null;
  documentId: {
    value: string;
    confidence: number;
  } | null;
  expirationDate: {
    value: string;
    confidence: number;
  } | null;
  familyName: {
    value: string;
    confidence: number;
  } | null;
  givenNames: {
    value: string;
    confidence: number;
  } | null;
  issueDate: {
    value: string;
    confidence: number;
  } | null;
  mrzCode: {
    value: string;
    confidence: number;
  } | null;
  portrait: {
    page: number;
    normalizedVertices: google.cloud.documentai.v1.INormalizedVertex[];
    image: string;
    confidence: number;
  } | null;
}

export {USPassportParsingResults};
