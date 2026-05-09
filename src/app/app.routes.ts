import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Bianca Boutique — Moda donna ricercata, Milano Brera'
  },
  {
    path: 'collezione',
    loadComponent: () => import('./pages/collezione/collezione.component').then((m) => m.CollezioneComponent),
    title: 'Collezione — Bianca Boutique'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Bianca Boutique'
  },
  {
    path: 'lookbook',
    loadComponent: () => import('./pages/lookbook/lookbook.component').then((m) => m.LookbookComponent),
    title: 'Lookbook — Bianca Boutique'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti — Bianca Boutique'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
