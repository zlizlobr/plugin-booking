# Validation Orchestrator

Tento modul implementuje orchestrátor pro validaci inputů podle specifikace:

## Flow validace

1. **Input změna** - Input publikuje změnu (fieldName, newValue, source) → formStore
2. **Porovnání se storage** - Orchestrátor se podívá, zda newValue = validatedStorage[fieldName]. Pokud ano → skip validace
3. **Queue a rozhodování** - Pokud změna přišla od uživatele → debounce → validace jednoho pole. Pokud od programu → batch → validace více polí
4. **GraphQL validace** - Pošle query/mutaci na server a čeká na výsledek
5. **Úspěšná validace** - Aktualizuje se formStore.errors[fieldName] = null, hodnota se uloží do validatedStorage[fieldName] = newValue
6. **Neúspěšná validace** - Aktualizuje se formStore.errors[fieldName] = errorMessage, validatedStorage se nemění

## Komponenty

### FormStore (`formStore.js`)
Centrální úložiště pro stav formuláře:
- `formData` - aktuální data formuláře
- `errors` - chyby validace
- `validatedStorage` - validované hodnoty
- `publish_change()` - publikuje změnu pole
- `compare_with_storage()` - porovná se storage
- `set_error()` - nastaví chybu
- `update_validated_storage()` - aktualizuje validované hodnoty

### ValidationOrchestrator (`validationOrchestrator.js`)
Orchestrátor pro validaci:
- `handle_input_change()` - hlavní metoda pro zpracování změny
- `handle_user_change()` - debounce pro uživatelské změny
- `handle_program_change()` - batch pro programové změny
- `validate_single_field()` - validace jednoho pole
- `validate_batch_fields()` - batch validace
- `execute_graphql_validation()` - GraphQL validace

### BookingFormManager (`bookingFormManager.js`)
Hlavní manager integrující všechny komponenty:
- `handle_input_change()` - deleguje na orchestrátor
- `get_form_state()` - získá stav formuláře
- `get_field_error()` - získá chybu pole
- `has_errors()` - zkontroluje chyby
- `add_listener()` - přidá listener
- `useBookingFormManager()` - React hook

## Použití

### Základní použití
```javascript
import { createBookingFormManager } from './utils/bookingFormManager.js';

const bookingFormManager = createBookingFormManager('booking-123');

// Zpracování změny inputu
bookingFormManager.handle_input_change('email', 'user@example.com', 'user');

// Získání chyby
const error = bookingFormManager.get_field_error('email');

// Získání stavu
const state = bookingFormManager.get_form_state();
```

### V React komponentě
```javascript
import { useBookingFormManager } from './utils/bookingFormManager.js';

const MyComponent = ({ bookingId }) => {
  const {
    handleInputChange,
    getFieldError,
    hasErrors,
    addListener
  } = useBookingFormManager(bookingId);

  const handleChange = (fieldName, value) => {
    handleInputChange(fieldName, value, 'user');
  };

  return (
    <input 
      onChange={(e) => handleChange('email', e.target.value)}
      className={getFieldError('email') ? 'error' : ''}
    />
  );
};
```

### V BaseBookingComponent
```javascript
export class MyInputComponent extends BaseBookingComponent {
  handle_change(field_id, value, source = 'user') {
    // BookingFormManager se používá automaticky
    super.handle_change(field_id, value, source);
  }

  render_input(field_id, current_value) {
    const error = this.get_field_error(field_id);
    const classes = this.get_field_classes(field_id, 'base-class');
    
    return (
      <div>
        <input className={classes} />
        {error && <div className="error">{error}</div>}
      </div>
    );
  }
}
```

## Konfigurace

```javascript
const config = {
  debounceDelay: 1000,    // Delay pro debounce (ms)
  batchDelay: 100,        // Delay pro batch (ms)
  maxBatchSize: 10,       // Maximální velikost batch
  autoSave: true          // Automatické ukládání
};

const manager = createBookingFormManager('booking-123', config);
```

## Eventy

BookingFormManager emituje následující eventy:

- `input_change` - změna inputu
- `field_change` - změna pole v formStore
- `error_change` - změna chyby
- `form_reset` - reset formuláře

```javascript
manager.addListener((event) => {
  console.log('Event:', event.type, event);
});
```

## Integrace s mutations.js a storage.js

Orchestrátor automaticky používá:
- `mutations.js` pro GraphQL validace
- `storage.js` pro ukládání draft dat
- FormStore pro správu stavu

Všechny komponenty jsou navrženy pro snadnou integraci s existujícími systémy.

## Zobrazení chyb

### CSS animace
Přidejte do vašeho CSS souboru:
```css
@import url('./validation-animations.css');
```

### Automatické zobrazení chyb
Input komponenty automaticky zobrazují chyby pod polem s animací:
- Červené ohraničení pro chybné pole
- Animace shake při chybě
- Fade-in animace pro chybové zprávy
- Ikona chyby vedle textu

### Testovací komponenta
Pro testování validace použijte `TestValidationInput`:
```javascript
// V BlockRenderer registry
'booking/test-validation': Components.TestValidationInput
```

Testovací komponenta simuluje různé typy chyb:
- Prázdné hodnoty
- Neplatné emaily
- Příliš krátké hodnoty
- Zakázaná slova

## Oprava GraphQL mutace

Opravil jsem PHP mutaci pro správné zpracování parametrů:
- Přidány `blockName` a `quoteHash` do input fields
- Opravena chyba v `validate_block_value()` metodě
- Vylepšeno zpracování GraphQL chyb v `mutations.js`

## Debug informace

Pro debugování použijte:
```javascript
// Získání statistik
const stats = bookingFormManager.get_stats();
console.log('Validation stats:', stats);

// Sledování eventů
bookingFormManager.addListener((event) => {
  console.log('Validation event:', event);
});
```

## Dev Tools (`devTools.js`)

Vývojářské nástroje pro debugování a testování formuláře:

### Funkce

**DEV_RESET_FORM_DATA**
- Vymaže všechna uložená data při načtení aplikace
- Resetuje formulář na krok 1 s prázdnými daty
- Užitečné pro testování čistého formuláře od začátku

**DEV_LOG_STORAGE_DATA**
- Loguje detailní informace o uložených datech do konzole
- Zobrazuje: Booking ID, verzi, aktuální krok, čas uložení, velikost dat
- Aktivuje logování při: načtení, změně kroku, změně formData
- Výstup je barevný a přehledný s emoji ikonami

**logStorageData(bookingID)**
- Funkce pro ruční logování storage dat
- Vytváří hravý výpis s barvami a strukturou
- Zobrazuje console.table() pro přehledné zobrazení dat

### Použití

```javascript
// V devTools.js změň konstanty:
export const DEV_RESET_FORM_DATA = true;    // Pro vymazání dat
export const DEV_LOG_STORAGE_DATA = true;   // Pro logování dat
```

### Import

```javascript
import { DEV_RESET_FORM_DATA, DEV_LOG_STORAGE_DATA, logStorageData } from '../utils/devTools.js';
```

### Odstranění

Pro odstranění dev nástrojů z produkce stačí:
1. Smazat soubor `devTools.js`
2. Odstranit import z `BookingApp.jsx`
3. Odstranit podmíněné bloky s `DEV_*` konstantami
