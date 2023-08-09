interface USIDProofingResults {
  evidenceInconclusiveSuspiciousWord?: {
    value: string;
    confidence: number;
  };
  evidenceHostname?: {
    value: string;
    confidence: number;
  };
  evidenceSuspiciousWord?: {
    value: string;
    confidence: number;
  };
  evidenceThumbnailUrl?: {
    value: string;
    confidence: number;
  };
  fraudSignalsIsIdentityDocument?: {
    value: string;
    confidence: number;
  };
  fraudSignalsImageManipulation?: {
    value: string;
    confidence: number;
  };
  fraudSignalsSuspiciousWords?: {
    value: string;
    confidence: number;
  };
  fraudSignalsOnlineDuplicate?: {
    value: string;
    confidence: number;
  };
}

export {USIDProofingResults};
