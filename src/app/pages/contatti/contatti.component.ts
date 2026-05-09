import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti</h1>
        <p>Vieni a trovarci in boutique, scrivici o chiamaci. Risponderemo entro 30 minuti.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Dove siamo</h2>
          <p>
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            Quartiere Brera
          </p>

          <h2>Contatti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">{{ info.contatti.whatsapp }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>

          <h2>Servizi</h2>
          <ul class="servizi-list">
            <li *ngIf="info.servizi.clickAndCollect">Click & Collect disponibile</li>
            <li *ngIf="info.servizi.consegnaACasa">Consegna a domicilio</li>
            <li *ngIf="info.servizi.giftCard">Gift card</li>
            <li *ngIf="info.servizi.alterazioni">Servizio alterazioni</li>
            <li *ngIf="info.servizi.accessibileDisabili">Accesso disabili</li>
            <li *ngIf="info.servizi.wifiGratuito">Wi-Fi gratuito</li>
          </ul>
        </section>

        <section class="form-block">
          <h2>Scrivici</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome</label>
              <input id="nome" type="text" formControlName="nome" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" autocomplete="email" required />
            </div>
            <div class="field">
              <label for="telefono">Telefono (opzionale)</label>
              <input id="telefono" type="tel" formControlName="telefono" autocomplete="tel" />
            </div>
            <div class="field">
              <label for="oggetto">Oggetto</label>
              <select id="oggetto" formControlName="oggetto" required>
                <option value="">Scegli un argomento</option>
                <option value="info-prodotto">Informazioni su un capo</option>
                <option value="appuntamento">Richiesta appuntamento</option>
                <option value="gift-card">Gift card</option>
                <option value="reso">Reso o cambio</option>
                <option value="altro">Altro</option>
              </select>
            </div>
            <div class="field">
              <label for="messaggio">Messaggio</label>
              <textarea id="messaggio" formControlName="messaggio" rows="4" required></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Acconsento al trattamento dei dati personali ai sensi del GDPR per rispondere alla mia richiesta.
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia messaggio</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun messaggio viene inviato. In un sito reale riceveresti risposta via email entro 30 minuti negli orari di apertura.
            </p>
          </form>
          <ng-template #thankyou>
            <div class="thankyou">
              <h3>Grazie {{ form.value.nome }}!</h3>
              <p>Il tuo messaggio è stato ricevuto (demo simulato). In un sito reale verrebbe inviato una email di conferma e risposta entro 30 minuti.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuovo messaggio</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
        color: var(--color-accent);
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .info-block p {
        margin: 0;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
        color: var(--color-fg-muted);
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
      .servizi-list li {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        padding-left: 1.2rem;
        position: relative;
      }
      .servizi-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-success);
        font-weight: 700;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.5rem;
      }
      .thankyou {
        text-align: center;
      }
      .thankyou h3 {
        color: var(--color-success);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    oggetto: ['', Validators.required],
    messaggio: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue]
  });

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false });
    this.submitted.set(false);
  }
}
