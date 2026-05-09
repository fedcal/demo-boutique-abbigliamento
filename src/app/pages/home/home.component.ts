import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <p class="hero-eyebrow">Via Madonnina 8 · Brera, Milano</p>
        <h1>Moda donna ricercata nel cuore di Milano</h1>
        <p class="hero-tagline">Capi selezionati a mano, brand italiani esclusivi, atmosfera senza tempo. Ogni visita è un'esperienza.</p>
        <div class="hero-actions">
          <a routerLink="/collezione" class="btn btn-primary">Scopri la collezione</a>
          <a routerLink="/lookbook" class="btn btn-secondary">Lookbook</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Bianca Boutique</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">✂️</span>
          <h3>Selezione artigianale</h3>
          <p>Ogni capo è scelto personalmente da Bianca tra centinaia di proposte, solo i migliori entrano in boutique.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🧵</span>
          <h3>Brand italiani esclusivi</h3>
          <p>Collaborazioni dirette con atelier di Milano, Firenze e Roma. Non troverai questi brand ovunque.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">👒</span>
          <h3>Consulenza personale</h3>
          <p>Il nostro team ti accompagna nella scelta, dal casual quotidiano agli abiti da cerimonia più importanti.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎁</span>
          <h3>Gift card & alterazioni</h3>
          <p>Gift card da €50 a €500, confezione regalo e servizio sartoriale a pochi passi dalla boutique.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredProdotti$ | async as prodotti">
      <div class="section-header">
        <h2>Nuovi arrivi in boutique</h2>
        <a routerLink="/collezione" class="link-more">Tutta la collezione →</a>
      </div>
      <ul class="prodotti-grid">
        <li *ngFor="let p of prodotti" class="prodotto-card">
          <div class="prodotto-card__placeholder" aria-label="{{ p.nome }}">
            <span class="prodotto-card__emoji" aria-hidden="true">👗</span>
          </div>
          <div class="prodotto-card__body">
            <p class="prodotto-card__brand">{{ p.brand }}</p>
            <h3>{{ p.nome }}</h3>
            <span class="prodotto-card__price">{{ p.prezzo | currency: 'EUR' : 'symbol' : '1.0-0' }}</span>
          </div>
          <div class="prodotto-card__badges">
            <span *ngIf="p.nuovo" class="badge badge--nuovo">Nuovo</span>
            <span *ngIf="p.bestseller" class="badge badge--best">Bestseller</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Vieni a trovarci in Brera</h2>
        <p>Via Madonnina 8 · Aperto 7 giorni su 7 · Consulenza gratuita su appuntamento</p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Vieni in boutique</a>
          <a href="https://wa.me/393498765432" target="_blank" rel="noopener" class="btn btn-secondary">WhatsApp</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 6rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fdf2f8 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero-eyebrow {
        font-size: 0.85rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--color-accent);
        font-weight: 600;
        margin: 0 0 1rem;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
        line-height: 1.2;
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #6b1236;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .prodotti-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.25rem;
      }
      .prodotto-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .prodotto-card__placeholder {
        aspect-ratio: 3 / 4;
        background: linear-gradient(135deg, #fdf2f8, #fce7f3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
      }
      .prodotto-card__body {
        padding: 1rem 1rem 0.5rem;
      }
      .prodotto-card__brand {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-accent);
        font-weight: 600;
        margin: 0 0 0.25rem;
      }
      .prodotto-card__body h3 {
        margin: 0 0 0.4rem;
        font-size: 1rem;
      }
      .prodotto-card__price {
        font-weight: 700;
        color: var(--color-fg-default);
        font-size: 1.05rem;
      }
      .prodotto-card__badges {
        padding: 0.5rem 1rem 1rem;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--nuovo {
        background: #fce7f3;
        color: var(--color-accent);
      }
      .badge--best {
        background: #fff8c5;
        color: var(--color-warning);
      }
      .cta-band {
        padding: 5rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredProdotti$ = this.mockData.prodotti$.pipe(
    map((data) => data.prodotti.filter((p) => p.nuovo).slice(0, 3))
  );
}
