import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Una boutique nata da una passione, cresciuta con le sue clienti dal 2009.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>La storia di Bianca Boutique</h2>
        <p>
          Nel 2009, Bianca Ferretti — laureata allo IED di Milano dopo esperienze negli showroom di Parigi e Londra —
          apre le porte di uno spazio intimo in Via Madonnina 8, nel cuore del quartiere Brera. L'idea è semplice
          quanto ambiziosa: creare una selezione di capi donna che sfidino il fast fashion, privilegiando
          la qualità dei tessuti, la sartorialità italiana e i brand indipendenti.
        </p>
        <p>
          Negli anni la boutique diventa punto di riferimento per le donne milanesi che cercano qualcosa di diverso:
          non la griffe urlata, ma il capo perfetto trovato dopo un'ora di conversazione autentica con chi lo conosce
          davvero. Ogni stagione Bianca seleziona personalmente la collezione durante le fiere di Parigi,
          Berlino e Milano Unica.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Qualità senza compromessi</h3>
            <p>Tessuti certificati, cuciture sartoriali, brand che conosciamo direttamente dai loro fondatori.</p>
          </li>
          <li>
            <h3>Cura della persona</h3>
            <p>Non vendiamo vestiti. Ascoltiamo, consigliamo, e troviamo insieme il capo che valorizza chi sei.</p>
          </li>
          <li>
            <h3>Moda consapevole</h3>
            <p>Collezioni contenute, riassortimenti mirati, zero overstock. Meglio pochi capi giusti di tanti sbagliati.</p>
          </li>
          <li>
            <h3>Radici nel quartiere</h3>
            <p>Brera è la nostra casa. Sosteniamo gli artigiani locali e collaboriamo con le realtà creative del quartiere.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as data">
        <h2>Il nostro team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of data.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq-section" *ngIf="faq$ | async as data">
        <h2>Domande frequenti</h2>
        <dl class="faq-list">
          <div *ngFor="let item of data.faq" class="faq-item">
            <dt>{{ item.domanda }}</dt>
            <dd>{{ item.risposta }}</dd>
          </div>
        </dl>
      </section>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-accent);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
        font-size: 1rem;
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.5;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__bio {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.5;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: var(--color-fg-muted);
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: #fce7f3;
        color: var(--color-accent);
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
      }
      .faq-section h2 {
        margin-bottom: 2rem;
      }
      .faq-list {
        margin: 0;
        padding: 0;
      }
      .faq-item {
        border-bottom: 1px solid var(--color-border);
        padding: 1.25rem 0;
      }
      .faq-item dt {
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--color-fg-default);
      }
      .faq-item dd {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
