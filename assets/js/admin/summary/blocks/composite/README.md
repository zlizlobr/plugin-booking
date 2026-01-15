# Composite Admin Components

Tato složka obsahuje znovupoužitelné utility komponenty, které lze používat napříč různými admin blocky.

## 📚 Dokumentace

- **[FIELD_VALUES_SIGNAL.md](./FIELD_VALUES_SIGNAL.md)** - Reaktivní propojení hodnot mezi bloky pomocí signals
- **[TABLE_PRICE_CONTROL_FIX.md](./TABLE_PRICE_CONTROL_FIX.md)** - Fix pro TablePriceControl komponenty

## ValuePriceControl

Komponenta pro nastavení ceny typu "Value" - umožňuje nastavit množství, cenu a jejich celkový součin.

### Props

- `value` (object, default: {}) - Aktuální hodnota obsahující:
  - `qty_type` (string) - 'not_connected' nebo 'field_connected'
  - `qty_field` (string) - ID připojeného pole (pokud je field_connected)
  - `quantity` (number) - Množství
  - `price` (number) - Cena
- `onChange` (function) - Callback volaný při změně hodnoty
- `className` (string, default: '') - Dodatečné CSS třídy
- `currencySymbol` (string, default: '') - Symbol měny
- `numberFields` (array, default: []) - Pole s dostupnými number fieldy pro připojení

### Příklad použití

```jsx
import ValuePriceControl from './composite/ValuePriceControl.jsx';

<ValuePriceControl
	value={product}
	onChange={(data) => handleProductUpdate(data)}
	currencySymbol="€"
	numberFields={numberFields}
/>
```

## PercentagePriceControl

Komponenta pro nastavení ceny typu "Percentage" - umožňuje přičíst nebo odečíst procenta ze základní ceny.

### Props

- `value` (object, default: {}) - Aktuální hodnota obsahující:
  - `percentage_operation` (string) - 'add' nebo 'subtract'
  - `percentage_value` (number) - Procenta
- `onChange` (function) - Callback volaný při změně hodnoty
- `className` (string, default: '') - Dodatečné CSS třídy
- `currencySymbol` (string, default: '') - Symbol měny

### Příklad použití

```jsx
import PercentagePriceControl from './composite/PercentagePriceControl.jsx';

<PercentagePriceControl
	value={product}
	onChange={(data) => handleProductUpdate(data)}
	currencySymbol="€"
/>
```

## TablePriceControl

Komponenta pro nastavení ceny typu "Table" - podobné jako ValuePriceControl, ale určeno pro tabulkové ceny.

### Props

- `value` (object, default: {}) - Aktuální hodnota obsahující:
  - `qty_type` (string) - 'not_connected' nebo 'field_connected'
  - `qty_field` (string) - ID připojeného pole (pokud je field_connected)
  - `quantity` (number) - Množství
  - `price` (number) - Cena
- `onChange` (function) - Callback volaný při změně hodnoty
- `className` (string, default: '') - Dodatečné CSS třídy
- `currencySymbol` (string, default: '') - Symbol měny
- `numberFields` (array, default: []) - Pole s dostupnými number fieldy pro připojení

### Příklad použití

```jsx
import TablePriceControl from './composite/TablePriceControl.jsx';

<TablePriceControl
	value={product}
	onChange={(data) => handleProductUpdate(data)}
	currencySymbol="€"
	numberFields={numberFields}
/>
```

## PriceIncreaseControl

Komponenta pro výpočet ceny s procentuální úpravou (+/-).

### Props

- `basePrice` (number, default: 0) - Základní cena pro výpočet
- `value` (object, default: {}) - Aktuální hodnota obsahující:
  - `operator` (string) - '+' nebo '-'
  - `percentage` (number) - Procenta
  - `total` (number) - Vypočítaná celková hodnota
- `onChange` (function) - Callback volaný při změně hodnoty
- `className` (string, default: '') - Dodatečné CSS třídy

### Příklad použití v Admin Blocku

```jsx
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { BaseAdminBlockComponent } from '../BaseAdminBlockComponent.jsx';
import PriceIncreaseControl from '../composite/PriceIncreaseControl.jsx';

const MyAdminBlock = (props) => {
	const component = new BaseAdminBlockComponent(props);
	const [priceData, setPriceData] = useState(component.value || {});

	const handlePriceChange = (newValue) => {
		setPriceData(newValue);
		component.handle_change(newValue);
	};

	component.render_input = () => {
		return (
			<div>
				<PriceIncreaseControl
					basePrice={1000}
					value={priceData}
					onChange={handlePriceChange}
				/>
			</div>
		);
	};

	return component.render();
};

export default MyAdminBlock;
```

### Příklad použití jako standalone komponenta

```jsx
import { h } from 'preact';
import { useState } from 'preact/hooks';
import PriceIncreaseControl from './composite/PriceIncreaseControl.jsx';

const MyComponent = () => {
	const [price, setPrice] = useState({});

	return (
		<div>
			<h3>Upravit cenu</h3>
			<PriceIncreaseControl
				basePrice={500}
				value={price}
				onChange={(newPrice) => {
					console.log('Nová cena:', newPrice.total);
					setPrice(newPrice);
				}}
			/>
		</div>
	);
};
```

## Struktura výstupní hodnoty

`onChange` callback vrací objekt:

```javascript
{
	operator: '+',        // nebo '-'
	percentage: 10,       // číslo
	total: 550,          // vypočítaná hodnota
	base_price: 500      // původní základní cena
}
```

## PHP Formát

Pokud potřebujete ukládat data v PHP formátu (např. pro WordPress meta fields), použijte transformaci:

### JavaScript → PHP

```javascript
const phpFormat = [{
	price_increase: priceData.percentage,
	operation: priceData.operator === '+' ? 'add' : 'subtract'
}];
```

### PHP → JavaScript

```javascript
const transformPriceIncreaseData = (phpData) => {
	if (!phpData) return {};
	
	const data = Array.isArray(phpData) ? phpData[0] : phpData;
	
	if (!data) return {};

	return {
		operator: data.operation === 'add' ? '+' : '-',
		percentage: parseFloat(data.price_increase) || 0,
		total: 0,
		base_price: 0
	};
};
```

### Příklad v AdminGoogleMap

```javascript
// Načtení z PHP
const [priceIncrease, setPriceIncrease] = useState(
	transformPriceIncreaseData(props.attrs._price_increase)
);

// Uložení do PHP
const handlePriceIncreaseChange = (newPriceData) => {
	const phpFormat = [{
		price_increase: newPriceData.percentage,
		operation: newPriceData.operator === '+' ? 'add' : 'subtract'
	}];
	
	props.onChange('_price_increase', phpFormat);
};
```

