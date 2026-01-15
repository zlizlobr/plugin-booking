

import { h } from 'preact';
import { useEffect, useRef, useCallback } from 'preact/hooks';
import { __ } from '@wordpress/i18n';

const TimePicker = (props) => {
	const attrs = props.attrs || {};
	const fieldId = attrs.field_id || '';
	const value = props.value || '';
	const onChange = props.onChange;
	
	const inputRef = useRef(null);
	const flatpickrInstanceRef = useRef(null);
	const onChangeRef = useRef(onChange);
	const fieldIdRef = useRef(fieldId);
	
	useEffect(() => {
		onChangeRef.current = onChange;
		fieldIdRef.current = fieldId;
	}, [onChange, fieldId]);
	
	const { general = {} } = attrs;
	const time_picker_options = general['time_picker_options'] || general['timepicker_options'] || {};
	const {
		display_format = 'H:i',
		minute_increment = '1'
	} = time_picker_options;
	
	const handleChange = useCallback((newValue) => {
		if (typeof onChangeRef.current === 'function') {
			onChangeRef.current(fieldIdRef.current, newValue);
		}
	}, []);

	const format_time = (date, format) => {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const pad = (num) => num.toString().padStart(2, '0');
		
		return format
			.replace('H', pad(hours))
			.replace('i', pad(minutes));
	};

	useEffect(() => {
		const initializeFlatpickr = () => {
			if (!inputRef.current) {
				console.warn('[TimePicker INIT] ✗ inputRef is not available');
				return false;
			}

			if (typeof flatpickr === 'undefined') {
				console.warn('[TimePicker INIT] ✗ Flatpickr library is not loaded');
				return false;
			}

			if (flatpickrInstanceRef.current) {
				return false;
			}

			const validFormat = (display_format && display_format !== 'other' && display_format !== '')
				? display_format
				: 'H:i';

			flatpickrInstanceRef.current = flatpickr(inputRef.current, {
			enableTime: true,
			noCalendar: true,
			time_24hr: true,
			dateFormat: validFormat,
			minuteIncrement: parseInt(minute_increment, 10),
			clickOpens: true,
			onClose: (selectedDates, dateStr) => {
				handleChange(dateStr);
			},
			onReady: (selectedDates, dateStr, instance) => {
				const calendar = instance.calendarContainer;
				if (calendar) {
					instance._calendarContainer = calendar;
					instance._inputElement = inputRef.current;
					
					const buttons_container = document.createElement('div');
					buttons_container.className = 'flatpickr-time-buttons';
					
					const now_btn = document.createElement('button');
					now_btn.type = 'button';
					now_btn.className = 'flatpickr-time-btn flatpickr-time-btn-now';
					now_btn.textContent = __('Now', 'wpcbooking');
					now_btn.addEventListener('click', (e) => {
						e.preventDefault();
						e.stopPropagation();
						const now = new Date();
						instance.setDate(now, false);
					});
					
					const select_btn = document.createElement('button');
					select_btn.type = 'button';
					select_btn.className = 'flatpickr-time-btn flatpickr-time-btn-select';
					select_btn.textContent = __('Select', 'wpcbooking');
					select_btn.addEventListener('click', (e) => {
						e.preventDefault();
						e.stopPropagation();
						const selected_date = instance.selectedDates[0] || new Date();
						const time_str = format_time(selected_date, validFormat);
						handleChange(time_str);
						instance.close();
					});
					
					buttons_container.appendChild(now_btn);
					buttons_container.appendChild(select_btn);
					calendar.appendChild(buttons_container);
				}
			},
			clickOutside: (selectedDates, dateStr, instance, clickEvent) => {
				if (!clickEvent || !instance._calendarContainer) {
					return true;
				}

				const target = clickEvent.target;
				const calendar = instance._calendarContainer;
				const input = instance._inputElement;

				const isInsideCalendar = calendar && calendar.contains(target);
				const isOnInput = input && (input === target || input.contains(target));

				const isTimeElement = target && target.closest && (
					target.closest('.arrowUp') ||
					target.closest('.arrowDown') ||
					target.closest('.flatpickr-time') ||
					target.closest('.flatpickr-time-wrapper') ||
					target.closest('.numInputWrapper') ||
					target.closest('.flatpickr-hour') ||
					target.closest('.flatpickr-minute') ||
					target.closest('.flatpickr-time-buttons')
				);

				const isArrowButton = target && target.classList && (
					target.classList.contains('arrowUp') ||
					target.classList.contains('arrowDown') ||
					target.classList.contains('flatpickr-hour') ||
					target.classList.contains('flatpickr-minute') ||
					target.classList.contains('numInput') ||
					target.classList.contains('flatpickr-time-btn')
				);

				if (isInsideCalendar || isOnInput || isTimeElement || isArrowButton) {
					return false;
				}

				return true;
			}
		});

			if (value && flatpickrInstanceRef.current && value !== 'ot3er' && value.length > 0) {
				try {
					flatpickrInstanceRef.current.setDate(value, false);
				} catch (e) {
					console.error('[TimePicker INIT] ✗ Failed to set initial value:', e);
				}
			}

			return true;
		};

		if (!initializeFlatpickr()) {
			const retryTimer = setTimeout(() => {
				initializeFlatpickr();
			}, 100);

			return () => {
				clearTimeout(retryTimer);
				if (flatpickrInstanceRef.current) {
					flatpickrInstanceRef.current.destroy();
					flatpickrInstanceRef.current = null;
				}
			};
		}

		return () => {
			if (flatpickrInstanceRef.current) {
				flatpickrInstanceRef.current.destroy();
				flatpickrInstanceRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (!flatpickrInstanceRef.current) {
			return;
		}
		
		if (value && value !== 'ot3er' && value.length > 0) {
			try {
				flatpickrInstanceRef.current.setDate(value, false);
			} catch (e) {
				console.error('AdminTimePicker - Failed to update value:', e);
			}
		}
	}, [value]);

	const label = general?.label || __('Time', 'wpcbooking');
	const iconUrl = general?.icon_url;
	
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
			
			<div className="w-full">
				<input
					ref={inputRef}
					type="text"
					id={fieldId}
					name={fieldId}
					className="px-3 py-2 border border-gray-300 rounded bg-white w-full"
					placeholder={`Format: ${display_format && display_format !== 'other' ? display_format : 'H:i'}`}
				/>
			</div>
		</div>
	);
};

export default TimePicker;

