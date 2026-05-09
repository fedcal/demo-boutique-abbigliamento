// Tipi TypeScript per i dati mock di Bianca Boutique

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziAttivita {
  clickAndCollect: boolean;
  consegnaACasa: boolean;
  giftCard: boolean;
  alterazioni: boolean;
  accessibileDisabili: boolean;
  wifiGratuito: boolean;
  parcheggioVicino: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziAttivita;
  metaSeo: MetaSeo;
}

export type CategoriaProdotto = 'abiti' | 'top' | 'pantaloni' | 'capispalla' | 'accessori';

export interface Prodotto {
  id: number;
  categoria: CategoriaProdotto;
  nome: string;
  brand: string;
  descrizione: string;
  prezzo: number;
  taglie: string[];
  colori: string[];
  nuovo?: boolean;
  bestseller?: boolean;
  image: string;
}

export interface Prodotti {
  categorie: { id: CategoriaProdotto; nome: string; ordine: number }[];
  prodotti: Prodotto[];
}

export interface Membro {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  image: string;
  specialita: string[];
}

export interface Team {
  team: Membro[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}
