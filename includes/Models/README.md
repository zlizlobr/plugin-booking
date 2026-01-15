# Field System - Systém pro správu fieldů a závislostí

## Rychlý přehled

Field System je event-driven systém pro správu formulářových polí (fields) a jejich závislostí v booking blocích. Umožňuje automatickou aktualizaci bloků při změně závislých fieldů.

## Soubory

- **FieldEventBus.php** - Event bus pro publish-subscribe komunikaci mezi bloky
- **FieldManager.php** - Singleton pro správu fieldů, závislostí a vyplněných hodnot
- **FIELD_SYSTEM.md** - Podrobná dokumentace systému
- **README.md** - Tento soubor

## Hlavní funkce

### 🎯 Automatická registrace fieldů
Všechny fieldy se automaticky registrují při přípravě bloku.

### 🔗 Správa závislostí
Systém sleduje, které bloky závisí na kterých fieldech.

### 📡 Event-driven updates
Bloky reagují na změny pomocí event busů bez přímých vazeb.

### 📍 Step-aware aktualizace
Aktualizace probíhají pouze na správném stepu.

### 🔍 Centralizovaná správa
Všechny fieldy a jejich hodnoty na jednom místě.

## Rychlý start

### 1. Vytvoření bloku s fieldy

```php
class MyNumberBlock extends AbstractBlock
{
    // Block automaticky:
    // - Zaregistruje field při prepare_block
    // - Označí field jako vyplněný při save_block
    // - Emituje eventy field_filled
}
```

### 2. Vytvoření produktového bloku se závislostmi

```php
class MyProductBlock extends AbstractProductBlock
{
    // Block automaticky:
    // - Zaregistruje všechny závislosti z product_definitions
    // - Reaguje na změny závislých fieldů
    // - Aktualizuje produkt na správném stepu
    
    protected function update_product_block(string $block_field_id, string $dependency_field_id, mixed $value, int $step): void
    {
        // Vaše logika aktualizace produktu
    }
}
```

### 3. Práce s FieldManagerem

```php
$manager = FieldManager::get_instance();

// Získání hodnoty fieldu
$value = $manager->get_field_value('booking_12345');

// Kontrola, zda je field vyplněn
if ($manager->is_field_filled('booking_12345')) {
    // Field je vyplněn
}

// Získání options pro select
$options = $manager->get_field_options_for_select($booking_id);
```

### 4. Event handling

```php
$bus = FieldEventBus::get_instance('product-list');

$bus->on('field_filled', function($data) {
    // Vaše logika při vyplnění fieldu
});

$bus->on('dependency_updated', function($data) {
    // Vaše logika při aktualizaci závislosti
});
```

## Integrace do stávajícího kódu

### AbstractBlock
✅ Přidány use statementy pro FieldEventBus a FieldManager  
✅ Upravena metoda `init_hooks()` pro registraci event listenerů  
✅ Přidána metoda `register_block_field()` pro automatickou registraci  
✅ Upravena metoda `save_block()` pro označení fieldu jako vyplněného  
✅ Přidána metoda `on_field_filled()` pro override v child třídách  
✅ Přidána metoda `get_block_step()` pro získání stepu fieldu  
✅ Upravena metoda `get_booking_fields()` pro použití FieldManageru  

### AbstractProductBlock
✅ Přidány use statementy pro FieldEventBus a FieldManager  
✅ Přidána metoda `init_hooks()` pro registraci dependency listeners  
✅ Přidána metoda `register_product_dependencies()` pro automatickou registraci závislostí  
✅ Přidána metoda `handle_dependency_update()` pro zpracování update eventů  
✅ Přidána metoda `update_product_block()` pro override v child třídách  
✅ Upravena metoda `prepare_block()` pro přidání filled_fields do atributů  

## Flow diagramy

### Registrace fieldu
```
Block vytvoření
    ↓
prepare_block()
    ↓
register_block_field()
    ↓
FieldManager::register_field()
    ↓
Event: field_registered
```

### Uložení hodnoty
```
Formulář submit
    ↓
save_block()
    ↓
FieldManager::mark_field_filled()
    ↓
Event: field_filled
    ↓
notify_dependent_blocks()
    ↓
Event: dependency_updated
```

### Aktualizace závislého bloku
```
Event: dependency_updated
    ↓
handle_dependency_update()
    ↓
should_update_on_step()?
    ↓ (ano)
update_product_block()
```

## Příklad use case: Table Price

1. **Setup (editor):**
   - Vytvoříte NumberInput field pro "Počet osob" (booking_12345)
   - Vytvoříte NumberInput field pro "Počet dní" (booking_54321)
   - Vytvoříte ProductList s table price
   - V table price nastavíte row_field → booking_12345, column_field → booking_54321

2. **Runtime (frontend):**
   - Uživatel vyplní "Počet osob" = 10 na stepu 1
   - Systém označí booking_12345 jako vyplněný s hodnotou 10
   - Uživatel přejde na step 2 a vyplní "Počet dní" = 5
   - Systém označí booking_54321 jako vyplněný s hodnotou 5
   - Uživatel přejde na step s produkty (např. step 3)
   - ProductList detekuje, že má závislosti na booking_12345 a booking_54321
   - Obě závislosti jsou vyplněny → ProductList se aktualizuje
   - Zobrazí se správná cena z tabulky pro 10 osob a 5 dní

## Debug

```php
// Zobrazit všechny fieldy
$all_fields = FieldManager::get_instance()->get_all_fields();
error_log(print_r($all_fields, true));

// Zobrazit závislosti
$deps = FieldManager::get_instance()->get_all_dependencies();
error_log(print_r($deps, true));

// Zobrazit vyplněné fieldy
$filled = FieldManager::get_instance()->get_filled_fields();
error_log(print_r($filled, true));

// Sledovat eventy
$bus = FieldEventBus::get_instance('product-list');
$bus->on('dependency_updated', function($data) {
    error_log('[DEBUG] ' . print_r($data, true));
});
```

## Další dokumentace

- **FIELD_SYSTEM.md** - Podrobná dokumentace API a architektury
- **EXAMPLE_USAGE.php** - Konkrétní příklady kódu pro různé use cases

## Kontakt a podpora

Pro další dotazy viz hlavní dokumentace projektu.

