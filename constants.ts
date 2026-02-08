
import { ConjugationData } from './types';
import { NOR_DATA } from './norData';
import { NOR_NORK_DATA } from './norNorkData';
import { NOR_NORI_DATA } from './norNoriData';
import { NOR_NORI_NORK_DATA } from './norNoriNorkData';

export const VERB_DATA: ConjugationData = {
  "izan": {
    "nor": NOR_DATA,
    "nor-nori": NOR_NORI_DATA
  },
  "ukan": {
    "nor-nork": NOR_NORK_DATA,
    "nor-nori-nork": NOR_NORI_NORK_DATA
  }
};

export const TENSE_NAMES: Record<string, string> = {
  oraina: "Oraina",
  iragana: "Iragana",
  baldintza: "Baldintza",
  hipotetikoa: "Hipotetikoa",
  hipotetikoa_iragana: "Hipotetikoa (Ir.)",
  hipotetikoa_oraina: "Hipot. (Oraina)",
  hipotetikoa_iragana_izan: "Hipot. (Iragana)",
  ahalera: "Ahalera",
  ahalera_oraina: "Ahalera (Oraina)",
  ahalera_iragana: "Ahalera (Iragana)",
  ahalera_iragana_n3k: "Ahalera (Ir.)",
  ahalera_alegiazkoa: "Ahalera (Aleg.)",
  ahalera_alegiazkoa_n3k: "Ahalera (Al.)",
  subjuntiboa_oraina: "Subjuntiboa (Or.)",
  subjuntiboa_iragana: "Subjuntiboa (Ir.)",
  subjuntiboa_oraina_n3k: "Subjuntiboa (Or.)",
  subjuntiboa_iragana_n3k: "Subjuntiboa (Ir.)",
  singularra: "Singularra (hark)",
  plurala: "Plurala (haiek)",
  "nor-nori": "NOR-NORI",
  "nor-nori-nork": "NOR-NORI-NORK"
};

export const SUBJECT_FULL_NAMES: Record<string, string> = {
  ni: "Ni", hi: "Hi", hura: "Hura", gu: "Gu", zu: "Zu", zuek: "Zuek", haiek: "Haiek",
  nik: "Nik", hik: "Hik", hark: "Hark", guk: "Guk", zuk: "Zuk", zuek_nork: "Zuek", haiek_nork: "Haiek",
  niri: "Niri", hiri: "Hiri", hari: "Hari", guri: "Guri", zuri: "Zuri", zuei: "Zuei", haiei: "Haiei"
};
