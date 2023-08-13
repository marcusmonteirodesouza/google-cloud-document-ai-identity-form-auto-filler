function toYYYYMMDD(year: number, month: number, day: number) {
  return new Date(year, month, day).toISOString().slice(0, 10);
}

export { toYYYYMMDD };
