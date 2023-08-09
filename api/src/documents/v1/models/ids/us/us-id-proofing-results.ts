interface USIDProofingResults {
  fraudSignalsIsIdentityDocument: string | null;
  fraudSignalsSuspiciousWords: string | null;
  evidenceSuspiciousWord: string[];
  evidenceInconclusiveSuspiciousWord: string[];
  fraudSignalsImageManipulation: string | null;
  fraudSignalsOnlineDuplicate: string | null;
  evidenceThumbnailUrl: string[];
  evidenceHostname: string[];
}

export {USIDProofingResults};
