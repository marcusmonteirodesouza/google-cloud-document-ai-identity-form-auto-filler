import { IDate } from './idate';

class USPatent {
  constructor(
    readonly applicantLine1: string | null,
    readonly applicationNumber: string | null,
    readonly classInternational: string | null,
    readonly classUS: string | null,
    readonly filingDate: IDate | null,
    readonly inventorLine1: string | null,
    readonly issuer: string | null,
    readonly patentNumber: string | null,
    readonly publicationDate: IDate | null,
    readonly titleLine1: string | null,
  ) {}
}

export { USPatent };
