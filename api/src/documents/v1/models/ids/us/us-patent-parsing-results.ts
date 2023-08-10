interface USPatentParsingResults {
  applicantLine1: string | null;
  applicationNumber: string | null;
  classInternational: string | null;
  classUS: string | null;
  filingDate: string | null;
  inventorLine1: string | null;
  issuer: string | null;
  patentNumber: string | null;
  publicationDate: string | null;
  titleLine1: string | null;
}

export {USPatentParsingResults};
