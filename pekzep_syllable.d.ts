type PekzepSyllable = { onset: string, nucleus: string, coda: string, tone: string };

export function from_latin(input_string: string): PekzepSyllable;
export function to_kana(o: PekzepSyllable): string;