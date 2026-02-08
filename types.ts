
export type Subject = "ni" | "hi" | "hura" | "gu" | "zu" | "zuek" | "haiek" | "nik" | "hik" | "hark" | "guk" | "zuk" | "zuek_nork" | "haiek_nork";
export type Tense = "oraina" | "iragana" | "baldintza";

export interface ConjugationData {
  [verb: string]: {
    [caseType: string]: {
      [tense: string]: {
        [key: string]: any;
      };
    };
  };
}

export interface Question {
  id: string;
  subject: string;
  tense: string;
  verb: string;
  objectNumber?: "singular" | "plural";
  correctAnswer: string;
  options: string[];
}
