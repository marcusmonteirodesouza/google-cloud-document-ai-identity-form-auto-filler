class USIDProofing {
  constructor(
    readonly fraudSignalsIsIdentityDocument: string | null,
    readonly fraudSignalsSuspiciousWords: string | null,
    readonly evidenceSuspiciousWord: string[],
    readonly evidenceInconclusiveSuspiciousWord: string[],
    readonly fraudSignalsImageManipulation: string | null,
    readonly fraudSignalsOnlineDuplicate: string | null,
    readonly evidenceThumbnailUrl: string[],
    readonly evidenceHostname: string[],
  ) {}
}

export { USIDProofing };
