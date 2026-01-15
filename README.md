# WPCBooking

WordPress plugin pro vytváření rezervačních formulářů s integrací WooCommerce, WPGraphQL a FluentCRM.

## Funkce

- **Gutenberg bloky** - Date Picker, Time Picker, Google Map, Product Grid/List, Phone Input, Email Input a další
- **WooCommerce integrace** - Vytváření objednávek z rezervací
- **WPGraphQL API** - GraphQL queries a mutations pro headless použití
- **FluentCRM integrace** - Automatizace a triggery pro CRM
- **Multi-step formuláře** - Podpora vícekrokových rezervačních formulářů
- **Wpify Custom Fields** - Pokročilá správa polí v admin rozhraní

## Požadavky

- WordPress 5.0+
- PHP 7.4+
- Node.js 18+
- Composer

## Instalace

```bash
# Klonování repozitáře
git clone https://github.com/your-username/wpcbooking.git

# Instalace PHP závislostí
composer install

# Instalace npm závislostí
npm install

# Build assets
npm run build
```

## Vývoj

```bash
# Development s watch mode (admin, public i bloky)
npm run dev

# Nebo jednotlivě:
npm run dev:admin
npm run dev:public
npm run dev:blocks

# Production build
npm run build

# Analýza velikosti výstupních souborů
npm run analyze
```

## Struktura projektu

```
wpcbooking/
├── assets/
│   ├── css/           # Styly (admin, public, blocks, shared)
│   ├── js/            # JavaScript soubory
│   └── img/           # Obrázky
├── includes/
│   ├── Api/           # Externí API integrace (Google Distance)
│   ├── Blocks/        # Gutenberg bloky
│   ├── Controllers/   # Admin a Public controllery
│   ├── Core/          # Loader, Activator, Deactivator
│   ├── CPT/           # Custom Post Types (Booking, Quote)
│   ├── Models/        # Datové modely a Fields
│   ├── Plugins/       # Integrace (WooCommerce, WPGraphQL, FluentCRM)
│   ├── Traits/        # PHP traits
│   └── Views/         # PHP šablony
├── languages/         # Překlady
└── vendor/            # Composer závislosti
```

## Technologie

- **Frontend**: Preact, Preact Signals, Tailwind CSS
- **Build**: Webpack, Babel, PostCSS
- **Backend**: PHP 7.4+, PSR-4 autoloading
- **Integrace**: WooCommerce, WPGraphQL, FluentCRM, Wpify Custom Fields

## Gutenberg bloky

| Blok | Popis |
|------|-------|
| `booking-form` | Hlavní rezervační formulář |
| `step-section` | Sekce pro multi-step formuláře |
| `date-picker` | Výběr data |
| `time-picker` | Výběr času |
| `google-map` | Google mapa s address autocomplete |
| `product-grid` | Mřížka produktů |
| `product-list` | Seznam produktů |
| `icons-list` | Seznam s ikonami |
| `text-input` | Textový vstup |
| `email-input` | Email vstup s validací |
| `phone-input` | Telefonní vstup s předvolbou |
| `number-input` | Číselný vstup |

## Licence

GPL v2 or later
