import {google} from '@google-cloud/documentai/build/protos/protos';

interface USPatentParsingResults {
  applicantLine1: string | null;
  applicationNumber: string | null;
  classInternational: string | null;
  classUS: string | null;
  filingDate: google.type.IDate | null;
  inventorLine1: string | null;
  issuer: string | null;
  patentNumber: string | null;
  publicationDate: google.type.IDate | null;
  titleLine1: string | null;
}

export {USPatentParsingResults};
