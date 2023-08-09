interface USIDProofingResultsEvidenceSuspiciousWord {
  value: string;
}

interface USIDProofingResultsEvidenceInconclusiveSuspiciousWord {
  value: string;
}

interface USIDProofingResultsEvidenceThumbnailUrl {
  value: string;
}

interface USIDProofingResultsEvidenceHostname {
  value: string;
}

interface USIDProofingResults {
  fraudSignalsIsIdentityDocument: {
    value: string;
  } | null;
  fraudSignalsSuspiciousWords: {
    value: string;
  } | null;
  evidenceSuspiciousWord: USIDProofingResultsEvidenceSuspiciousWord[];
  evidenceInconclusiveSuspiciousWord: USIDProofingResultsEvidenceInconclusiveSuspiciousWord[];
  fraudSignalsImageManipulation: {
    value: string;
  } | null;
  fraudSignalsOnlineDuplicate: {
    value: string;
  } | null;
  evidenceThumbnailUrl: USIDProofingResultsEvidenceThumbnailUrl[];
  evidenceHostname: USIDProofingResultsEvidenceHostname[];
}

export {USIDProofingResults};
