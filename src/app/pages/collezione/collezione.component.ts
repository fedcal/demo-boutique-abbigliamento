import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { MockDataService } from '../../data/mock-data.service';
import type { CategoriaProdotto } from '../../data/types';

@Component({
  selector: 'app-collezione',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>La collezione</h1>
        <p>20 capi selezionati, brand italiani esclusivi, taglie XS – XL. Aggiornata ogni stagione.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="prodottiData() as data">
      <div class="filtri-bar" role="group" aria-label="Filtra per categoria">
        <button
          *ngFor="let cat of categorie()"
          class="filtro-btn"
          [class.is-active]="categoriaAttiva() === cat.id"
          (click)="setCategoriaAttiva(cat.id)"
          type="button"
        >
          {{ cat.nome }}
        </button>
        <button
          class="filtro-btn"
          [class.is-active]="categoriaAttiva() === null"
          (click)="setCategoriaAttiva(null)"
          type="button"
        >
          Tutti
        </button>
      </div>

      <p class="risultati-count">{{ prodottiFiltrati().length }} capi</p>

      <ul class="prodotti-grid">
        <li *ngFor="let p of prodottiFiltrati()" class="prodotto-card">
          <div class="prodotto-card__image" [attr.aria-label]="p.nome">
            <span class="prodotto-card__emoji" aria-hidden="true">👗</span>
            <div class="prodotto-card__badges">
              <span *ngIf="p.nuovo" class="badge badge--nuovo">Nuovo</span>
              <span *ngIf="p.bestseller" class="badge badge--best">Bestseller</span>
            </div>
          </div>
          <div class="prodotto-card__body">
            <p class="prodotto-card__brand">{{ p.brand }}</p>
            <h3>{{ p.nome }}</h3>
            <p class="prodotto-card__desc">{{ p.descrizione }}</p>
            <div class="prodotto-card__meta">
              <span class="prodotto-card__price">{{ p.prezzo | currency: 'EUR' : 'symbol' : '1.0-0' }}</span>
              <span class="prodotto-card__taglie">Taglie: {{ p.taglie.join(' · ') }}</span>
            </div>
            <div class="prodotto-card__colori">
              <span *ngFor="let c of p.colori" class="colore-tag">{{ c }}</span>
            </div>
          </div>
        </li>
      </ul>

      <p *ngIf="prodottiFiltrati().length === 0" class="empty-state">
        Nessun capo trovato per questa categoria.
      </p>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: linear-gradient(180deg, #fdf2f8 0%, #ffffff 100%);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .filtri-bar {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
      }
      .filtro-btn {
        padding: 0.45rem 1rem;
        border-radius: 9999px;
        border: 1px solid var(--color-border);
        background: #ffffff;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .filtro-btn:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }
      .filtro-btn.is-active {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: #ffffff;
        font-weight: 600;
      }
      .risultati-count {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
      }
      .prodotti-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
      }
      .prodotto-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
        background: #ffffff;
      }
      .prodotto-card__image {
        aspect-ratio: 3 / 4;
        background: linear-gradient(135deg, #fdf2f8, #fce7f3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        position: relative;
      }
      .prodotto-card__badges {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        font-weight: 600;
        display: inline-block;
      }
      .badge--nuovo {
        background: #fce7f3;
        color: var(--color-accent);
      }
      .badge--best {
        background: #fff8c5;
        color: var(--color-warning);
      }
      .prodotto-card__body {
        padding: 1rem;
      }
      .prodotto-card__brand {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-accent);
        font-weight: 700;
        margin: 0 0 0.25rem;
      }
      .prodotto-card__body h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
      }
      .prodotto-card__desc {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .prodotto-card__meta {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-bottom: 0.5rem;
      }
      .prodotto-card__price {
        font-weight: 700;
        font-size: 1.1rem;
        color: var(--color-fg-default);
      }
      .prodotto-card__taglie {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
      }
      .prodotto-card__colori {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
      }
      .colore-tag {
        font-size: 0.72rem;
        padding: 0.15rem 0.5rem;
        background: var(--color-bg-subtle);
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .empty-state {
        text-align: center;
        color: var(--color-fg-muted);
        padding: 3rem 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollezioneComponent {
  private readonly mockData = inject(MockDataService);

  readonly prodottiData = toSignal(this.mockData.prodotti$);
  readonly categoriaAttiva = signal<CategoriaProdotto | null>(null);

  readonly categorie = computed(() => {
    const data = this.prodottiData();
    return data ? [...data.categorie].sort((a, b) => a.ordine - b.ordine) : [];
  });

  readonly prodottiFiltrati = computed(() => {
    const data = this.prodottiData();
    const attiva = this.categoriaAttiva();
    if (!data) return [];
    return attiva ? data.prodotti.filter((p) => p.categoria === attiva) : data.prodotti;
  });

  setCategoriaAttiva(id: CategoriaProdotto | null): void {
    this.categoriaAttiva.set(id);
  }
}
