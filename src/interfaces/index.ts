export interface Slip {
  id: number;
  advice: string;
}

export interface DataSlip {
  slip: Slip;
}

export interface Search {
  total_results: number;
  query: string;
  slips: Array<Slip>;
}

export interface Message {
  type: 'noticed' | 'warning' | 'error';
  text: string;
}

export interface Translation {
  translatedText: string;
}

export interface TranslatedAdvice {
  id: number;
  advice: string;
  translation: string;
}
