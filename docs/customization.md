# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Boutique Abbigliamento'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## Possibili Sviluppi Personalizzabili

Estendere il template base con feature di nicchia:

- **AI Virtual Try-On LLaVA**: selfie → body pose analysis + rendering 3D indumenti real-time (180h)
- **AI Personal Stylist RAG**: RediSearch HNSW skin tone matching + outfit pairing conversazionale (160h)
- **Click & Collect + AR Provatura**: prenotazione cabina fitting + smart QR inventory (200h)
- **Circular Resale Marketplace**: LLaVA condition grading + Stripe escrow + sustainability badge (240h)
- **Stock Multi-canale Kafka**: event-driven inventory real-time negozio+e-shop+Instagram (200h)
- **Loyalty 2.0 + Churn Prediction**: LightGBM weekly retraining, tier VIP gamified (190h)
- **E-fattura SDI + POS Cassa Cloud**: integrazione XML automatica, multi-transazione offline-first (120h)
- **Newsletter segmentazione**: A/B testing subject line, dynamic content per category preferita (60h)
- **Instagram Shopping automazione**: feed sync + shoppable carousel, UGC content moderation (90h)
- **Predictive inventory**: demand forecasting per stagione, automation reorder supplier (100h)
- **Size recommendation ML**: storico fit + brand fit bias, confidence score indossabilità (80h)
- **Multi-currency tax compliance**: VAT EU cross-border, dichiarativo IVA per market (110h)

Vedi [Tier & Funzionalità](/tier-features) per architettura completa moduli avanzati.

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `boutique-abbigliamento` con nome cliente (`acme-pizzeria`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account
