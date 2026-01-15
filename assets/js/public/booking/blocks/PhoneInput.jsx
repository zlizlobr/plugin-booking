import { h } from 'preact';
import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { useBookingContext } from '../contexts/BookingContext.jsx';
import { useInputField } from '../hooks/useInputField.js';
import { InputBookingComponent } from './InputBookingComponent.jsx';
import CountryList from 'country-list-with-dial-code-and-flag';
const PhoneInput = ({ attrs = {}, rules = {} }) => {
  const context = useBookingContext();
  const user = useMemo(() => {
    return context.bookingFormManager?.getUser() || null;
  }, [context.bookingFormManager]);
  const {
    currentValue,
    handleChange,
    error,
    isValid,
    inputClasses
  } = useInputField({
    fieldId: attrs.field_id,
    rules,
    ...context
  });

  const phoneOptions = attrs.general?.phone_number_options || {};

  const getUserCountry = () => {
    if (user) {
      const storedCountryCode = user.get('user_country_code');
      if (storedCountryCode) {
        return storedCountryCode.toUpperCase();
      }
      const stored_country = user.get('user_country');
      if (stored_country) {
        return stored_country.toUpperCase();
      }
    }
    return null;
  };

  const userCountry = getUserCountry();
  if (userCountry) {
    phoneOptions.default_country = userCountry;
  }

  const normalizeToggle = (value) => {
    if (value === true || value === 1 || value === '1') return true;
    if (value === false || value === 0 || value === '0') return false;
    return value !== false;
  };

  const allowDropdown = normalizeToggle(phoneOptions.allow_dropdown) !== false;
  const separateDialCode = normalizeToggle(phoneOptions.separate_dial_code) !== false;
  const nativeNames = normalizeToggle(phoneOptions.native_names) === true;
  const isRequired = attrs.advanced?.required === true || attrs.advanced?.required === 'Required' || attrs.advanced?.required === 1 || attrs.advanced?.required === '1';

  const get_initial_country = () => {
    const default_country = phoneOptions.default_country;
    if (default_country) {
      return default_country.toUpperCase();
    }

    // 3. Konečný fallback na 'US'
    return 'US';
  };

  const [selectedCountry, setSelectedCountry] = useState(get_initial_country);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localValue, setLocalValue] = useState(currentValue || '');
  const [searchQuery, setSearchQuery] = useState('');
  const pendingValueRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownListRef = useRef(null);
  const searchInputRef = useRef(null);
  const skipAutoDetectionRef = useRef(false);
  const autoDetectionTimeoutRef = useRef(null);

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

  const filteredCountries = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') return countries;

    const normalizeText = (text) => {
      if (!text) return '';
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };

    const searchTerm = normalizeText(searchQuery.trim());

    return countries.filter(country => {
      const normalizedCode = normalizeText(country.code);
      const normalizedName = normalizeText(country.name);
      const normalizedDialCode = normalizeText(country.dialCode);
      return normalizedCode.includes(searchTerm) || 
             normalizedName.includes(searchTerm) || 
             normalizedDialCode.includes(searchTerm);
    });
  }, [countries, searchQuery]);

  const selectedCountryData = countries.find(c => c.code === selectedCountry) || (countries.length > 0 ? countries[0] : null);

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
    if (!currentValue || typeof currentValue !== 'string') {
      if (selectedCountryData) {
        return selectedCountryData.dialCode;
      }
      return '';
    }

    if (currentValue.startsWith('+')) {
      return formatPhoneNumber(currentValue, selectedCountryData?.dialCode);
    }

    if (selectedCountryData) {
      const phoneNumber = currentValue.replace(/[^\d]/g, '');
      const combinedValue = combineDialCodeAndNumber(selectedCountryData.dialCode, phoneNumber);
      return formatPhoneNumber(combinedValue, selectedCountryData.dialCode);
    }

    return currentValue;
  }, [currentValue, selectedCountryData, combineDialCodeAndNumber, formatPhoneNumber]);

  useEffect(() => {
    setLocalValue(displayValue);
  }, [displayValue]);

  useEffect(() => {
    if (skipAutoDetectionRef.current) {
      return;
    }

    if (currentValue && typeof currentValue === 'string' && currentValue.trim() !== '') {
      const detectedCountry = parseDialCodeFromValue(currentValue);

      if (detectedCountry && countries.some(c => c.code === detectedCountry) && selectedCountry !== detectedCountry) {
        setSelectedCountry(detectedCountry);
      }
    }
  }, [currentValue, parseDialCodeFromValue, countries, selectedCountry]);

  useEffect(() => {
    // Pouze pokud není žádná hodnota zadána
    if (currentValue) {
      return;
    }

    // 1. Primárně zkus user_country ze storage
    let target_country = null;

    // 2. Fallback na default_country z attrs
    if (!target_country) {
      const default_country = phoneOptions.default_country;
      target_country = default_country ? default_country.toUpperCase() : 'US';
    }

    // 3. Kontrola, zda země existuje v seznamu
    const country_exists = countries.some(c => c.code === target_country);

    if (country_exists && selectedCountry !== target_country) {
      setSelectedCountry(target_country);
    } else if (!country_exists && countries.length > 0) {
      const first_country_code = countries[0].code;
      if (selectedCountry !== first_country_code) {
        setSelectedCountry(first_country_code);
      }
    }
  }, [phoneOptions.default_country, countries.length, selectedCountry, currentValue, context.formStore]);

  // Listen for user_country changes from storage (e.g., from GoogleMap)
  useEffect(() => {
    if (!context.formStore) {
      return;
    }

    const handle_storage_update = (event) => {
      // Check if user_country was updated
      if (event.type === 'field_change' && event.fieldName === 'user_country') {
        const new_country = event.newValue;
        if (new_country) {
          const new_country_code = new_country.toUpperCase();
          const country_exists = countries.some(c => c.code === new_country_code);

          if (country_exists && selectedCountry !== new_country_code) {
            // Zakázat automatickou detekci země při systémové změně
            skipAutoDetectionRef.current = true;

            setSelectedCountry(new_country_code);

            // If there's already a phone number, update it with new country code
            if (currentValue) {
              const new_country_data = countries.find(c => c.code === new_country_code);
              if (new_country_data && selectedCountryData) {
                const phone_number_without_dial_code = extractPhoneNumberWithoutDialCode(
                  currentValue,
                  selectedCountryData.dialCode
                );
                const combined_value = combineDialCodeAndNumber(
                  new_country_data.dialCode,
                  phone_number_without_dial_code
                );

                // Nastavení hodnoty bez validace při systémové změně země
                context.setFormData({ [attrs.field_id]: combined_value });

                // Po krátké době povolit automatickou detekci zpět
                if (autoDetectionTimeoutRef.current) {
                  clearTimeout(autoDetectionTimeoutRef.current);
                }
                autoDetectionTimeoutRef.current = setTimeout(() => {
                  skipAutoDetectionRef.current = false;
                  autoDetectionTimeoutRef.current = null;
                }, 100);
              }
            }
          }
        }
      }
    };

    // Add listener for form store events
    context.formStore.add_listener(handle_storage_update);

    return () => {
      context.formStore.remove_listener(handle_storage_update);
    };
  }, [context.formStore, countries, selectedCountry, selectedCountryData, currentValue, extractPhoneNumberWithoutDialCode, combineDialCodeAndNumber, handleChange]);

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
      if (user) {
        user.set('user_country_code', countryCode);
      }
      // Zakázat automatickou detekci země po manuálním výběru
      skipAutoDetectionRef.current = true;

      setSelectedCountry(countryCode);
      setDropdownOpen(false);
      setSearchQuery('');

      const phoneNumberWithoutDialCode = localValue
        ? extractPhoneNumberWithoutDialCode(localValue, selectedCountryData?.dialCode || '')
        : '';

      const combinedValue = combineDialCodeAndNumber(newCountryData.dialCode, phoneNumberWithoutDialCode);
      const formattedValue = formatPhoneNumber(combinedValue, newCountryData.dialCode);

      setLocalValue(formattedValue);

      // Nastavení hodnoty bez validace při změně dialCode
      context.setFormData({ [attrs.field_id]: combinedValue });

      // Po krátké době povolit automatickou detekci zpět (po update currentValue)
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
    const newState = !dropdownOpen;
    setDropdownOpen(newState);
    if (!newState) {
      setSearchQuery('');
    }
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

  // Cleanup timeout při unmount
  useEffect(() => {
    return () => {
      if (autoDetectionTimeoutRef.current) {
        clearTimeout(autoDetectionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [dropdownOpen]);

  return (
    <div className="flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full mb-4">
      <div className="flex items-center gap-x-4">
        {attrs.general?.icon_url && (
          <div
            style={{ '--mask-img': `url('${attrs.general.icon_url}')` }}
            className="w-25p h-30p bg-th-orange-light cs-mask"
          />
        )}
        <div className="af-p24 max-medium:text-[1.25rem] text-black w-full">
          {attrs.general?.label || __('Phone Number', 'wpcbooking')}
        </div>
      </div>

      <div className="af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]">
        <div className="w-full relative" ref={dropdownRef}>
          <div className="flex items-center w-full">
            {allowDropdown && selectedCountryData && (
              <div>
                <button
                  id={`${attrs.field_id}-dropdown-button`}
                  type="button"
                  onClick={toggleDropdown}
                  className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border-2 border-th-blue border-r-0 rounded-s-[10px] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-55p"
                >
                  <span className="me-2">{selectedCountryData.flag}</span>
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
              </div>
            )}

            {!allowDropdown && selectedCountryData && (
              <div className="shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border-2 border-th-blue border-r-0 rounded-s-[10px] h-55p">
                <span className="me-2">{selectedCountryData.flag}</span>
              </div>
            )}

            <input
              type="tel"
              id={attrs.field_id}
              name={attrs.field_id}
              value={localValue}
              onChange={handleInputChange}
              onInput={handleInput}
              onBlur={commitValue}
              className={`flex-1 w-full border-2 border-th-blue ${allowDropdown ? 'border-s-0 rounded-e-[10px]' : 'rounded-[10px]'} h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder={attrs.general?.placeholder || '123-456-7890'}
              required={isRequired}
              aria-invalid={!!error}
              aria-describedby={error ? `${attrs.field_id}-error` : undefined}
            />
          </div>

          {dropdownOpen && (
            <div
              id={`${attrs.field_id}-dropdown`}
              className="absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-lg left-0 right-0 top-full mt-1"
            >
              <div className="p-2 border-b border-gray-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onInput={(e) => setSearchQuery(e.target.value)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={__('Search country...', 'wpcbooking')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="off"
                />
              </div>
              <ul
                ref={dropdownListRef}
                className="py-2 text-sm text-left max-h-60 overflow-y-auto"
                aria-labelledby={`${attrs.field_id}-dropdown-button`}
              >
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <li key={country.code}>
                      <button
                        type="button"
                        data-country-code={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                        className={`inline-flex w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${selectedCountry === country.code
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-900'
                          }`}
                        role="menuitem"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span className="font-mono text-xs text-gray-500">{country.code}</span>
                          <span>{country.name}</span>
                          <span className="text-gray-400">({country.dialCode})</span>
                        </span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500 text-center">
                    {__('No countries found', 'wpcbooking')}
                  </li>
                )}
              </ul>
            </div>
          )}

          {InputBookingComponent.render_validation_indicator(error, isValid)}
          {InputBookingComponent.render_error_message(attrs.field_id, error)}
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
