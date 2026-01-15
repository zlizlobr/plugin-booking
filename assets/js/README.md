# 📚 Dokumentace WPCBooking JavaScript

## 🎯 Přehled
Tento adresář obsahuje veškerý JavaScript kód pro WPCBooking plugin, organizovaný do dvou hlavních částí: **public** (frontend rezervační systém) a **admin** (administrační rozhraní).

## 📁 Struktura adresářů

### 📂 public/ - Frontend rezervační systém (Preact)
**Entry point:** `public/index.js`

#### public/booking/components/ - React/Preact komponenty
- **BookingApp.jsx** - Hlavní komponenta rezervačního systému
- **BookingHeader.jsx** - Hlavička rezervačního formuláře
- **BookingSection.jsx** - Sekce s obsahem formuláře
- **BookingButtons.jsx** - Navigační tlačítka formuláře
- **GlassComponent.jsx** - Glass morphism efekt komponenta
- **SummarySection.jsx** - Shrnutí rezervace

#### public/booking/blocks/ - Pole formuláře
- **BaseBookingComponent.jsx** - Základní třída pro všechna pole
- **BlockRenderer.jsx** - Renderer pro dynamické načítání polí
- **DatePicker.jsx** - Kalendář pro výběr data
- **EmailInput.jsx** - Pole pro zadání emailu
- **GoogleMap.jsx** - Mapa pro výběr lokace
- **IconsList.jsx** - Seznam ikon pro výběr
- **InputBookingComponent.jsx** - Základní třída pro textová pole
- **NumberInput.jsx** - Pole pro zadání čísel s tlačítky
- **PhoneInput.jsx** - Pole pro zadání telefonního čísla
- **TextInput.jsx** - Pole pro zadání textu
- **TimePicker.jsx** - Pole pro výběr času
- **Calendar.jsx** - Kalendářová komponenta
- **ProductList.jsx** - Seznam produktů
- **ProductGrid.jsx** - Mřížka produktů

#### public/booking/contexts/ - React Contexts
- **BookingContext.jsx** - Context pro sdílení stavu rezervace

#### public/booking/hooks/ - Custom Hooks
- **useStepCondition.js** - Hook pro podmínky zobrazení kroků
- **useInputField.js** - Hook pro správu vstupních polí

#### public/booking/utils/ - Utility funkce
- **storage.js** - Správa úložiště formulářů
- **bookingFormManager.js** - Správa validace formulářů
- **validationOrchestrator.js** - Orchestrace validace
- **formStore.js** - Úložiště dat formuláře
- **mutations.js** - GraphQL mutace
- **saveStep.js** - Ukládání kroků
- **backNavigation.js** - Zpětná navigace
- **devTools.js** - Vývojářské nástroje
- **errorManager.js** - Správa chyb
- **card.js** - Karty pro zobrazení
- **summaryQueries.js** - GraphQL queries pro souhrn
- **useSummaryData.js** - Hook pro summary data
- **user.js** - Uživatelské funkce
- **markerIcon.js** - Ikony pro mapy

### 📂 admin/ - Administrační rozhraní (React + Preact)
**Entry point:** `admin/index.js`

#### admin/summary/ - Summary quote admin komponenty
- **initAdminSummary.js** - Inicializace admin summary
- **components/** - Summary React komponenty
  - **AdminSummary.jsx** - Hlavní admin summary komponenta
  - **SummaryItem.jsx** - Položka v souhrnu
  - **SummaryItemEdit.jsx** - Editace položky
  - **AddNewRow.jsx** - Přidání nového řádku
  - **SummaryCart.jsx** - Košík v souhrnu
- **blocks/** - Admin bloky pro editaci
  - **BlockComponent.jsx** - Základní admin block komponenta
  - **BlockRenderer.jsx** - Renderer pro admin bloky
  - **AdminCalculator.jsx** - Kalkulačka
  - **DatePicker.jsx**, **TimePicker.jsx**, **GoogleMap.jsx**, atd.
- **hooks/** - Admin hooks
  - **usePriceCalculations.js** - Výpočty cen
- **utils/** - Admin utility funkce
  - **calculations.js** - Cenové kalkulace
  - **priceFormatting.js** - Formátování cen
  - **configHelpers.js** - Pomocné funkce pro konfiguraci

#### admin/wpify/ - WordPress integrace
- **FieldIdManager.js** - Správa unikátních ID polí
- **subTabs.js** - Správa podtabulí v admin rozhraní
- **componentLoader.js** - Dynamické načítání wpify komponent
- **components/** - Wpify custom field komponenty (React)
  - **PriceTable.js** - Cenová tabulka
  - **GoogleMaps.js** - Google Maps pole

#### admin/utils/ - Sdílené admin utility
- **calculations.js** - Výpočetní funkce
- **configHelpers.js** - Pomocné funkce pro konfiguraci
- **priceFormatting.js** - Formátování cen
- **markerIcon.js** - Ikony pro mapy

#### admin/ - Ostatní admin soubory
- **TableBuilderComponent.jsx** - Komponenta pro tvorbu tabulek
- **multiGroupToggle.js** - Toggle pro multi-group pole
- **fieldManagerInstance.js** - Instance správce polí
- **useGutenbergWatchdog.js** - Watchdog pro Gutenberg

## 🎨 Architektura

### Public část (Preact)
Veškerá frontend logika pro rezervační systém je soustředěna v `public/booking/`:

1. **BookingApp** - Koordinuje celý rezervační proces
2. **BookingHeader** - Zobrazuje hlavičku s navigací
3. **BookingSection** - Obsahuje pole formuláře
4. **BookingButtons** - Navigační tlačítka
5. **BookingContext** - Sdílení stavu mezi komponentami

### Admin část (React + Preact)
Administrační rozhraní je rozděleno do několika modulů:

1. **Admin Summary** - Správa quote souhrnu (Preact)
   - AdminSummary komponenta s editací položek
   - Admin bloky pro různé typy polí
   - Cenové kalkulace

2. **Wpify integrace** - WordPress custom fields (React)
   - PriceTable komponenta
   - GoogleMaps komponenta
   - Dynamické načítání přes componentLoader

### Pole formuláře
- **BaseBookingComponent** - Základní funkcionalita pro public bloky
- **BlockComponent** - Základní funkcionalita pro admin bloky
- **InputBookingComponent** - Textová pole
- **Specializované komponenty** - DatePicker, GoogleMap, TimePicker, atd.

### Utility systémy
- **Public utils** - storage, bookingFormManager, validationOrchestrator, mutations
- **Admin utils** - calculations, priceFormatting, configHelpers, markerIcon

## 🔗 Návaznosti mezi komponentami

### Public část (Frontend rezervační systém)

#### BookingApp → BookingProvider → Child komponenty
- **Co dělá**: BookingContext sdílí stav mezi všemi komponentami
- **Data flow**: Context API pro globální stav

#### BookingApp → BookingHeader, BookingSection, BookingButtons
- **Co dělá**: Koordinuje zobrazení a komunikaci
- **Data flow**: Props pro konfiguraci a data

#### BookingSection → BlockRenderer → Pole formuláře
- **Co dělá**: Dynamicky načítá pole podle konfigurace
- **Data flow**: Props pro data a callbacks

#### Pole formuláře → bookingFormManager → formStore
- **Co dělá**: Validace a ukládání dat
- **Data flow**: Event-driven komunikace

#### bookingFormManager → mutations → Server
- **Co dělá**: Server-side validace přes GraphQL
- **Data flow**: GraphQL mutace

### Admin část

#### admin/index.js → Inicializační funkce
- **componentLoader** - Načítá wpify komponenty (PriceTable, GoogleMaps)
- **subTabs** - Inicializuje podtaby
- **FieldIdManager** - Správce ID polí
- **multiGroupToggle** - Toggle pro skupiny
- **fieldManagerInstance** - Instance správce polí
- **adminSummary** - Inicializuje admin summary

#### AdminSummary → SummaryItem → Admin bloky
- **Co dělá**: Editace summary položek s různými typy polí
- **Data flow**: State management pro editaci a cenové kalkulace

## ⚠️ Důležité poznámky

### Kompilace
- **Public komponenty** - kompilují se s **Preact** (pragma `h`)
- **Admin wpify komponenty** - kompilují se s **React** (kvůli wpify-custom-fields kompatibilitě)
- **Admin summary komponenty** - kompilují se s **Preact**
- Build targets: `npm run build:public`, `npm run build:admin`, `npm run build:blocks`

### Vývoj
- Public komponenty používají Preact: `import { h } from 'preact'`
- Wpify komponenty používají React: `import React from 'react'`
- Podporuje WordPress i18n pro překlady
- Responzivní design pro všechny velikosti obrazovek

### Bezpečnost
- Automatická validace všech vstupů
- Bezpečné ukládání dat do localStorage
- GraphQL mutace pro server-side validaci

### Výkon
- Debouncing pro optimalizaci validace
- Batchování pro lepší výkon
- Automatický cleanup při odchodu ze stránky
- Dynamické načítání wpify komponent (lazy loading)

## 🚀 Rychlý start

### Public - Základní použití
```javascript
import BookingApp from './public/booking/components/BookingApp.jsx';

// Inicializace rezervačního systému
<BookingApp
  bookingID="123"
  general={{
    title: "Rezervace",
    steps: {...},
    sections: {...}
  }}
/>
```

### Přidání nového public pole
1. Vytvořte komponentu v `public/booking/blocks/`
2. Importujte `BaseBookingComponent` nebo `InputBookingComponent`
3. Přidejte export do `public/booking/blocks/index.js`
4. Nakonfigurujte v WordPress admin

### Přidání nového admin pole
1. Vytvořte komponentu v `admin/summary/blocks/`
2. Použijte `BlockComponent` jako základní třídu
3. Přidejte export do `admin/summary/blocks/index.js`
4. Nakonfigurujte v WordPress admin

### Validace
```javascript
import { createBookingFormManager } from './public/booking/utils/bookingFormManager.js';

const manager = createBookingFormManager('booking_123');
manager.handle_input_change('field_name', 'value');
```

### Build
```bash
# Development s watch mode
npm run dev:public    # Public část
npm run dev:admin     # Admin část

# Production build
npm run build:public  # Public část
npm run build:admin   # Admin část
npm run build         # Vše najednou
```

## 📊 Kompletní struktura projektu

```
assets/js/
├── public/                          ← Frontend (Preact)
│   ├── index.js                     ← Entry point
│   └── booking/                     ← Veškerá booking logika
│       ├── components/              ← UI komponenty
│       ├── blocks/                  ← Pole formuláře
│       ├── contexts/                ← React Contexts
│       ├── hooks/                   ← Custom hooks
│       └── utils/                   ← Utility funkce
│
├── admin/                           ← Backend (React + Preact)
│   ├── index.js                     ← Entry point
│   ├── summary/                     ← Summary quote modul
│   │   ├── initAdminSummary.js
│   │   ├── components/              ← Summary komponenty
│   │   ├── blocks/                  ← Admin bloky
│   │   ├── hooks/                   ← Admin hooks
│   │   └── utils/                   ← Summary utils
│   ├── wpify/                       ← WordPress integrace
│   │   ├── componentLoader.js       ← Dynamické načítání
│   │   ├── components/              ← Custom field komponenty (React)
│   │   ├── FieldIdManager.js
│   │   └── subTabs.js
│   ├── utils/                       ← Sdílené admin utility
│   ├── TableBuilderComponent.jsx   ← Tabulkový builder
│   ├── multiGroupToggle.js
│   └── fieldManagerInstance.js
│
├── utils/                           ← Globální utility (starší struktura)
│   └── markerIcon.js
│
└── dist/                            ← Zkompilované soubory
    ├── public.js                    ← Public bundle
    ├── admin.js                     ← Admin bundle
    └── wpify/                       ← Dynamicky načítané wpify chunks
```

## 🔄 Jak to funguje dohromady

### Public část
1. WordPress načte `dist/public.js`
2. `public/index.js` inicializuje `BookingApp`
3. `BookingApp` vytvoří `BookingContext` pro sdílení stavu
4. Komponenty používají hooks (`useBookingContext`, `useStepCondition`)
5. Bloky se načítají dynamicky přes `BlockRenderer`
6. Validace běží přes `bookingFormManager` s GraphQL mutacemi

### Admin část
1. WordPress načte `dist/admin.js`
2. `admin/index.js` spustí všechny inicializační funkce
3. `componentLoader` dynamicky načte wpify komponenty (PriceTable, GoogleMaps)
4. Admin summary se renderuje do `#admin-summary-root`
5. Bloky se načítají dynamicky podle typu pole

## 📞 Podpora
Pro otázky a problémy se obraťte na vývojový tým nebo zkontrolujte dokumentaci jednotlivých komponent.

