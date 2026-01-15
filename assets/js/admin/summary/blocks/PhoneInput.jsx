import { h } from 'preact';
import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import CountryList from 'country-list-with-dial-code-and-flag';

const PhoneInput = (props) => {
	const attrs = props.attrs || {};
	const fieldId = attrs.field_id || '';
	const value = props.value || '';
	const onChange = props.onChange;

	const phoneOptions = attrs.general?.phone_number_options || {};

	const normalizeToggle = (value) => {
		if (value === true || value === 1 || value === '1') return true;
		if (value === false || value === 0 || value === '0') return false;
		return value !== false;
	};

	const allowDropdown = normalizeToggle(phoneOptions.allow_dropdown) !== false;
	const separateDialCode = normalizeToggle(phoneOptions.separate_dial_code) !== false;
	const nativeNames = normalizeToggle(phoneOptions.native_names) === true;

	const get_initial_country = () => {
		const default_country = phoneOptions.default_country;
		if (default_country) {
			return default_country.toUpperCase();
		}
		return 'US';
	};

	const [selectedCountry, setSelectedCountry] = useState(get_initial_country);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [localValue, setLocalValue] = useState('');
	const pendingValueRef = useRef(null);
	const dropdownRef = useRef(null);
	const dropdownListRef = useRef(null);
	const skipAutoDetectionRef = useRef(false);
	const autoDetectionTimeoutRef = useRef(null);

	const handleChange = (newValue) => {
		if (typeof onChange === 'function') {
			onChange(fieldId, newValue);
		}
	};

	useEffect(() => {
		return () => {
			if (autoDetectionTimeoutRef.current) {
				clearTimeout(autoDetectionTimeoutRef.current);
			}
		};
	}, []);

	const countries = useMemo(() => {
		const allCountries = CountryList.getAll();

		const allowedCountries = phoneOptions.countries;
		let filteredCountries = allCountries;

		if (allowedCountries && Array.isArray(allowedCountries) && allowedCountries.length > 0) {
			filteredCountries = allCountries.filter(country =>
				allowedCountries.includes(country.code.toUpperCase())
			);
		}

		const mappedCountries = filteredCountries.map(country => ({
			code: country.code.toUpperCase(),
			name: nativeNames ? (country.localName || country.name) : country.name,
			dialCode: country.dialCode,
			flag: country.flag
		}));

		const preferredCountries = phoneOptions.preferred_countries;
		if (preferredCountries && Array.isArray(preferredCountries) && preferredCountries.length > 0) {
			const preferredCodes = preferredCountries.map(code => code.toUpperCase());
			const preferred = mappedCountries.filter(c => preferredCodes.includes(c.code));
			const rest = mappedCountries.filter(c => !preferredCodes.includes(c.code));
			return [...preferred, ...rest];
		}

		return mappedCountries;
	}, [phoneOptions, nativeNames]);

	const selectedCountryData = useMemo(() => {
		return countries.find(c => c.code === selectedCountry) || (countries.length > 0 ? countries[0] : null);
	}, [countries, selectedCountry]);

	const extractPhoneNumberWithoutDialCode = useMemo(() => {
		return (value, dialCode) => {
			if (!value || typeof value !== 'string') return '';

			const cleanDialCode = dialCode.replace(/[^\d]/g, '');
			const cleanValue = value.replace(/^\+/, '').replace(/[^\d]/g, '');

			if (cleanValue.startsWith(cleanDialCode)) {
				return cleanValue.slice(cleanDialCode.length);
			}

			return cleanValue;
		};
	}, []);

	const combineDialCodeAndNumber = useMemo(() => {
		return (dialCode, phoneNumber) => {
			const cleanDialCode = dialCode.replace(/[^\d]/g, '');
			const cleanNumber = phoneNumber.replace(/[^\d]/g, '');

			if (!cleanNumber) {
				return `+${cleanDialCode}`;
			}

			return `+${cleanDialCode}${cleanNumber}`;
		};
	}, []);

	const formatPhoneNumber = useMemo(() => {
		return (value, dialCodeForFormatting = null) => {
			if (!value || typeof value !== 'string') return '';

			const cleaned = value.replace(/[^\d+]/g, '');

			if (!cleaned.startsWith('+')) {
				return value;
			}

			let dialCode = '';
			let phoneNumber = '';

			let dialCodeToUse = dialCodeForFormatting;
			if (!dialCodeToUse && selectedCountryData) {
				dialCodeToUse = selectedCountryData.dialCode;
			}

			if (dialCodeToUse) {
				const cleanDialCode = dialCodeToUse.replace(/[^\d]/g, '');
				dialCode = `+${cleanDialCode}`;

				const cleanedWithoutPlus = cleaned.replace(/^\+/, '');

				if (cleanedWithoutPlus.startsWith(cleanDialCode)) {
					phoneNumber = cleanedWithoutPlus.slice(cleanDialCode.length);
				} else {
					phoneNumber = cleanedWithoutPlus;
				}
			} else {
				const matches = cleaned.match(/^(\+\d{1,4})(\d*)$/);
				if (!matches) {
					return value;
				}
				dialCode = matches[1];
				phoneNumber = matches[2];
			}

			if (!phoneNumber || phoneNumber.length === 0) {
				return dialCode;
			}

			const formattedNumber = phoneNumber.match(/.{1,3}/g)?.join(' ') || phoneNumber;

			return `${dialCode} ${formattedNumber}`;
		};
	}, [selectedCountryData]);

	const unformatPhoneNumber = useMemo(() => {
		return (value) => {
			if (!value || typeof value !== 'string') return '';
			return value.replace(/[^\d+]/g, '');
		};
	}, []);

	const parseDialCodeFromValue = useMemo(() => {
		return (value) => {
			if (!value || typeof value !== 'string') return null;

			const valueWithoutPlus = value.replace(/^\+/, '').replace(/[^\d]/g, '');

			const sortedCountries = [...countries].sort((a, b) => {
				const dialCodeA = a.dialCode.replace(/[^\d]/g, '').length;
				const dialCodeB = b.dialCode.replace(/[^\d]/g, '').length;
				return dialCodeB - dialCodeA;
			});

			for (const country of sortedCountries) {
				const dialCode = country.dialCode.replace(/[^\d]/g, '');
				if (valueWithoutPlus.startsWith(dialCode)) {
					return country.code;
				}
			}

			return null;
		};
	}, [countries]);

	const displayValue = useMemo(() => {
		if (!value || typeof value !== 'string') {
			if (selectedCountryData) {
				return selectedCountryData.dialCode;
			}
			return '';
		}

		if (value.startsWith('+')) {
			return formatPhoneNumber(value, selectedCountryData?.dialCode);
		}

		if (selectedCountryData) {
			const phoneNumber = value.replace(/[^\d]/g, '');
			const combinedValue = combineDialCodeAndNumber(selectedCountryData.dialCode, phoneNumber);
			return formatPhoneNumber(combinedValue, selectedCountryData.dialCode);
		}

		return value;
	}, [value, selectedCountryData, combineDialCodeAndNumber, formatPhoneNumber]);

	useEffect(() => {
		setLocalValue(displayValue);
	}, [displayValue]);

	useEffect(() => {
		if (skipAutoDetectionRef.current) {
			return;
		}

		if (value && typeof value === 'string' && value.trim() !== '') {
			const detectedCountry = parseDialCodeFromValue(value);

			if (detectedCountry && countries.some(c => c.code === detectedCountry) && selectedCountry !== detectedCountry) {
				setSelectedCountry(detectedCountry);
			}
		}
	}, [value, parseDialCodeFromValue, countries, selectedCountry]);

	useEffect(() => {
		if (value) {
			return;
		}

		let target_country = null;

		if (!target_country) {
			const default_country = phoneOptions.default_country;
			target_country = default_country ? default_country.toUpperCase() : 'US';
		}

		const country_exists = countries.some(c => c.code === target_country);

		if (country_exists && selectedCountry !== target_country) {
			setSelectedCountry(target_country);
		} else if (!country_exists && countries.length > 0) {
			const first_country_code = countries[0].code;
			if (selectedCountry !== first_country_code) {
				setSelectedCountry(first_country_code);
			}
		}
	}, [phoneOptions.default_country, countries.length, selectedCountry, value]);

	const handleInputChange = (e) => {
		const inputValue = e.target.value;

		const unformattedValue = unformatPhoneNumber(inputValue);

		let valueToSave = '';
		if (unformattedValue.startsWith('+')) {
			valueToSave = unformattedValue;
		} else if (selectedCountryData) {
			valueToSave = combineDialCodeAndNumber(selectedCountryData.dialCode, unformattedValue);
		} else {
			valueToSave = unformattedValue;
		}

		setLocalValue(inputValue);
		pendingValueRef.current = valueToSave;
	};

	const handleInput = (e) => {
		const inputValue = e.target.value;

		const unformattedValue = unformatPhoneNumber(inputValue);

		let valueToSave = '';

		if (unformattedValue.startsWith('+')) {
			valueToSave = unformattedValue;
		} else if (selectedCountryData) {
			valueToSave = combineDialCodeAndNumber(selectedCountryData.dialCode, unformattedValue);
		} else {
			valueToSave = unformattedValue;
		}

		setLocalValue(inputValue);
		pendingValueRef.current = valueToSave;
	};

	const commitValue = () => {
		if (pendingValueRef.current !== null) {
			handleChange(pendingValueRef.current);
			pendingValueRef.current = null;
		}
	};

	const handleCountrySelect = (countryCode) => {
		const newCountryData = countries.find(c => c.code === countryCode);

		if (newCountryData) {
			skipAutoDetectionRef.current = true;

			setSelectedCountry(countryCode);
			setDropdownOpen(false);

			const phoneNumberWithoutDialCode = localValue
				? extractPhoneNumberWithoutDialCode(localValue, selectedCountryData?.dialCode || '')
				: '';

			const combinedValue = combineDialCodeAndNumber(newCountryData.dialCode, phoneNumberWithoutDialCode);
			const formattedValue = formatPhoneNumber(combinedValue, newCountryData.dialCode);

			setLocalValue(formattedValue);
			handleChange(combinedValue);

			if (autoDetectionTimeoutRef.current) {
				clearTimeout(autoDetectionTimeoutRef.current);
			}
			autoDetectionTimeoutRef.current = setTimeout(() => {
				skipAutoDetectionRef.current = false;
				autoDetectionTimeoutRef.current = null;
			}, 100);
		}
	};

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};

		if (dropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownOpen]);

	useEffect(() => {
		if (!dropdownOpen) return;

		const handleKeyPress = (event) => {
			if (event.target.tagName === 'INPUT' && event.target.type === 'tel') return;

			const key = event.key.toLowerCase();

			if (key.length === 1 && /[a-z0-9]/.test(key)) {
				const normalizeText = (text) => {
					return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
				};

				const foundCountry = countries.find(country => {
					const normalizedName = normalizeText(country.name);
					return normalizedName.startsWith(key);
				});

				if (foundCountry && dropdownListRef.current) {
					const countryElement = dropdownListRef.current.querySelector(
						`[data-country-code="${foundCountry.code}"]`
					);

					if (countryElement) {
						countryElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
						countryElement.focus();
					}
				}
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [dropdownOpen, countries]);

	const label = attrs.general?.label || __('Phone', 'wpcbooking');
	const iconUrl = attrs.general?.icon_url;

	const iconStyle = iconUrl ? {
		WebkitMask: `url('${iconUrl}') no-repeat center`,
		mask: `url('${iconUrl}') no-repeat center`,
		WebkitMaskSize: 'contain',
		maskSize: 'contain',
		width: '20px',
		height: '20px',
		backgroundColor: 'currentColor'
	} : null;

	return (
		<div className="mb-4">
			<div className="flex items-center gap-2 mb-2">
				{iconUrl && (
					<i
						className="text-gray-700"
						style={iconStyle}
					/>
				)}
				<label className="font-semibold text-gray-700" htmlFor={fieldId}>
					{label}
				</label>
			</div>

			<div className="w-full relative">
				<div className="flex items-center w-full">
					{allowDropdown && selectedCountryData && (
						<div className="relative" ref={dropdownRef}>
							<button
								type="button"
								onClick={toggleDropdown}
								className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 border-r-0 rounded-s-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
								key={selectedCountry}
							>
								<span className="me-2" key={`flag-${selectedCountry}`}>{selectedCountryData.flag}</span>
								{separateDialCode && <span key={`dial-${selectedCountry}`}>{selectedCountryData.dialCode}</span>}
								<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
								</svg>
							</button>

							{dropdownOpen && (
								<div className="absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48 top-full mt-1 max-h-60 overflow-y-auto">
									<ul
										ref={dropdownListRef}
										className="py-2 text-sm"
									>
										{countries.map((country) => (
											<li key={country.code}>
												<button
													type="button"
													data-country-code={country.code}
													onClick={() => handleCountrySelect(country.code)}
													className={`inline-flex w-full px-4 py-2 text-sm hover:bg-gray-100 ${selectedCountry === country.code
														? 'bg-gray-100 text-gray-900'
														: 'text-gray-900'
														}`}
												>
													<span className="inline-flex items-center">
														<span className="me-2">{country.flag}</span>
														{country.name} ({country.dialCode})
													</span>
												</button>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					)}

					{!allowDropdown && selectedCountryData && (
						<div className="shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 border-r-0 rounded-s-lg" key={selectedCountry}>
							<span className="me-2" key={`flag-${selectedCountry}`}>{selectedCountryData.flag}</span>
							{separateDialCode && <span key={`dial-${selectedCountry}`}>{selectedCountryData.dialCode}</span>}
						</div>
					)}

					<input
						type="tel"
						id={fieldId}
						name={fieldId}
						value={localValue}
						onChange={handleInputChange}
						onInput={handleInput}
						onBlur={commitValue}
						placeholder={attrs.general?.placeholder || '+123 456 7890'}
						className={`flex-1 w-full px-3 py-2 border border-gray-300 ${allowDropdown ? 'border-s-0 rounded-e-lg' : 'rounded-lg'} bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
					/>
				</div>
			</div>
		</div>
	);
};

export default PhoneInput;

