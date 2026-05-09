import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface LookbookItem {
  id: number;
  titolo: string;
  descrizione: string;
  stagione: string;
  emoji: string;
  capi: string[];
}

@Component({
  selector: 'app-lookbook',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Lookbook</h1>
        <p>Idee outfit della stagione — come abbinare i capi della nostra selezione.</p>
      </div>
    </section>

    <article class="demo-container content">
      <ul class="lookbook-grid">
        <li *ngFor="let look of looks" class="look-card">
          <div class="look-card__image" [attr.aria-label]="look.titolo">
            <span class="look-card__emoji" aria-hidden="true">{{ look.emoji }}</span>
            <span class="look-card__stagione">{{ look.stagione }}</span>
          </div>
          <div class="look-card__body">
            <h3>{{ look.titolo }}</h3>
            <p class="look-card__desc">{{ look.descrizione }}</p>
            <ul class="look-card__capi">
              <li *ngFor="let c of look.capi">{{ c }}</li>
            </ul>
          </div>
        </li>
      </ul>

      <p class="disclaimer">
        In un sito reale le immagini lookbook vengono realizzate con servizio fotografico professionale:
        modella, fotografo, stylist. Costo medio in Italia: €800–1.800 per una sessione completa di stagione.
        Questi sono placeholder demo — le emoji rappresentano la categoria dell'outfit.
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
      .lookbook-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 3rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
      }
      .look-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
        background: #ffffff;
      }
      .look-card__image {
        aspect-ratio: 3 / 4;
        background: linear-gradient(135deg, #fdf2f8, #fce7f3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        position: relative;
      }
      .look-card__stagione {
        position: absolute;
        bottom: 0.75rem;
        right: 0.75rem;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 700;
        background: var(--color-accent);
        color: #ffffff;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
      }
      .look-card__body {
        padding: 1.25rem;
      }
      .look-card__body h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .look-card__desc {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .look-card__capi {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .look-card__capi li {
        font-size: 0.8rem;
        color: var(--color-accent);
        font-weight: 600;
        padding-left: 1rem;
        position: relative;
      }
      .look-card__capi li::before {
        content: '→';
        position: absolute;
        left: 0;
        color: var(--color-accent);
      }
      .disclaimer {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 0 auto;
        max-width: 680px;
        padding: 1rem;
        border: 1px dashed var(--color-border);
        border-radius: var(--radius-md);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LookbookComponent {
  readonly looks: LookbookItem[] = [
    {
      id: 1,
      titolo: 'Giornata in città',
      descrizione: 'Eleganza pratica per la giornata lavorativa milanese: confortevole dal mattino alla sera.',
      stagione: 'Primavera',
      emoji: '👗',
      capi: ['Camicia Popeline Plissé', 'Pantalone Cigarette Lana', 'Blazer Sartoriale Lino', 'Borsa Bucket Pelle']
    },
    {
      id: 2,
      titolo: 'Aperitivo in Brera',
      descrizione: "L'aperitivo milanese richiede un outfit capace di passare dall'ufficio al locale senza cambiare.",
      stagione: 'Estate',
      emoji: '✨',
      capi: ['Bustier Raso', 'Gonna Midi Plissé', 'Cintura Pelle Intrecciata', 'Collana Perle Barocche']
    },
    {
      id: 3,
      titolo: 'Weekend fuori porta',
      descrizione: 'Comfort senza rinunciare allo stile per una gita fuori città o un weekend in campagna.',
      stagione: 'Estate',
      emoji: '🌿',
      capi: ['Abito Lino Lungo', 'Cappello Feltro Wide Brim', 'Sciarpa Cashmere Lurex']
    },
    {
      id: 4,
      titolo: 'Cerimonia importante',
      descrizione: 'Matrimoni, battesimi, eventi di gala: il capo giusto per le occasioni speciali che restano nel ricordo.',
      stagione: 'Primavera',
      emoji: '💐',
      capi: ['Abito Cocktail Crepe', 'Collana Perle Barocche', 'Borsa Bucket Pelle']
    },
    {
      id: 5,
      titolo: 'Autunno sartoriale',
      descrizione: 'La palette calda dell'autunno milanese: cachemire, lana, colori che riscaldano.',
      stagione: 'Autunno',
      emoji: '🍂',
      capi: ['Cappotto Cachemire Doppio', 'Pantalone Palazzo Seta', 'Top in Maglia Merino', 'Sciarpa Cashmere Lurex']
    },
    {
      id: 6,
      titolo: 'Contemporanea chic',
      descrizione: 'Mix di pezzi nuovi stagione per un look attuale ma non effimero, con carattere deciso.',
      stagione: 'Primavera',
      emoji: '🎨',
      capi: ['Abito Seta Floreale', 'Gonna Asimmetrica Raso', 'Mini Abito Jacquard', 'Cintura Pelle Intrecciata']
    },
    {
      id: 7,
      titolo: 'Business casual',
      descrizione: 'Riunioni, presentazioni, meeting con clienti: professionale senza apparire formale.',
      stagione: 'Autunno',
      emoji: '💼',
      capi: ['Blusa Seta Drappeggiata', 'Pantalone Cigarette Lana', 'Trench Cotone Gabardine']
    },
    {
      id: 8,
      titolo: 'Vacanza mare',
      descrizione: 'Capi leggeri da portare in valigia, che si abbinano facilmente dalla spiaggia alla cena.',
      stagione: 'Estate',
      emoji: '🌊',
      capi: ['Abito Lino Lungo', 'Top in Maglia Merino', 'Gonna Midi Plissé', 'Cappello Feltro Wide Brim']
    },
    {
      id: 9,
      titolo: 'Serata teatro',
      descrizione: 'La Scala merita un outfit all\'altezza: sobrio, curato nei dettagli, impeccabile.',
      stagione: 'Inverno',
      emoji: '🎭',
      capi: ['Abito Cocktail Crepe', 'Cappotto Cachemire Doppio', 'Collana Perle Barocche']
    },
    {
      id: 10,
      titolo: 'Domenica a Brera',
      descrizione: 'Mercatino, gallerie d\'arte, brunch: il look giusto per la domenica nel quartiere più bello di Milano.',
      stagione: 'Primavera',
      emoji: '☕',
      capi: ['Mini Abito Jacquard', 'Blazer Sartoriale Lino', 'Borsa Bucket Pelle']
    },
    {
      id: 11,
      titolo: 'Inverno elegante',
      descrizione: 'Il lusso discreto della stagione fredda: tessuti pregiati che parlano da soli.',
      stagione: 'Inverno',
      emoji: '❄️',
      capi: ['Cappotto Cachemire Doppio', 'Bustier Raso', 'Gonna Asimmetrica Raso', 'Sciarpa Cashmere Lurex']
    },
    {
      id: 12,
      titolo: 'Viaggio in Europa',
      descrizione: 'Capi versatili che funzionano in contesti diversi: dal museo alla cena stellata.',
      stagione: 'Primavera',
      emoji: '✈️',
      capi: ['Trench Cotone Gabardine', 'Blusa Seta Drappeggiata', 'Pantalone Palazzo Seta', 'Borsa Bucket Pelle']
    }
  ];
}
