import { h } from 'preact';
import { useState, useCallback, useMemo, useEffect, useRef } from 'preact/hooks';
import { __ } from '@wordpress/i18n';

const DAYS_IN_WEEK = 7;

const get_months = () => [
  __('January', 'wpcbooking'),
  __('February', 'wpcbooking'),
  __('March', 'wpcbooking'),
  __('April', 'wpcbooking'),
  __('May', 'wpcbooking'),
  __('June', 'wpcbooking'),
  __('July', 'wpcbooking'),
  __('August', 'wpcbooking'),
  __('September', 'wpcbooking'),
  __('October', 'wpcbooking'),
  __('November', 'wpcbooking'),
  __('December', 'wpcbooking')
];

const get_weekday_labels = () => [
  { short: __('Mon', 'wpcbooking'), full: __('Monday', 'wpcbooking'), day: 1 },
  { short: __('Tue', 'wpcbooking'), full: __('Tuesday', 'wpcbooking'), day: 2 },
  { short: __('Wed', 'wpcbooking'), full: __('Wednesday', 'wpcbooking'), day: 3 },
  { short: __('Thu', 'wpcbooking'), full: __('Thursday', 'wpcbooking'), day: 4 },
  { short: __('Fri', 'wpcbooking'), full: __('Friday', 'wpcbooking'), day: 5 },
  { short: __('Sat', 'wpcbooking'), full: __('Saturday', 'wpcbooking'), day: 6 },
  { short: __('Sun', 'wpcbooking'), full: __('Sunday', 'wpcbooking'), day: 0 }
];

const Calendar = ({
  selected_date = null,
  on_date_select,
  allow_past_dates = false,
  date_min = null,
  date_max = '2050-12-31',
  locale = 'cs',
  show = false,
  on_close
}) => {
  const calendar_ref = useRef(null);
  const [current_month, set_current_month] = useState(new Date().getMonth());
  const [current_year, set_current_year] = useState(new Date().getFullYear());

  const MONTHS = useMemo(() => get_months(), []);
  const WEEKDAY_LABELS = useMemo(() => get_weekday_labels(), []);

  // Parse selected date
  const selected_date_obj = useMemo(() => {
    if (!selected_date) return null;
    try {
      const dateObj = new Date(selected_date);
      dateObj.setHours(0, 0, 0, 0);
      return dateObj;
    } catch {
      console.error('[Calendar] Failed to parse selected_date:', selected_date);
      return null;
    }
  }, [selected_date]);

  // Parse date constraints
  const min_date = useMemo(() => {
    if (date_min) {
      return new Date(date_min);
    }
    if (!allow_past_dates) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
    return null;
  }, [date_min, allow_past_dates]);

  const max_date = useMemo(() => {
    return date_max ? new Date(date_max) : null;
  }, [date_max]);

  // Generate calendar days
  const calendar_days = useMemo(() => {
    const first_day = new Date(current_year, current_month, 1);
    const last_day = new Date(current_year, current_month + 1, 0);

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    // Convert to Monday = 0
    let first_weekday = first_day.getDay() - 1;
    if (first_weekday === -1) first_weekday = 6;

    const days_in_month = last_day.getDate();

    // Get previous month info
    const prev_month_last_day = new Date(current_year, current_month, 0);
    const prev_month_days = prev_month_last_day.getDate();

    const days = [];

    // Add days from previous month
    for (let i = first_weekday - 1; i >= 0; i--) {
      const day_number = prev_month_days - i;
      const date_obj = new Date(current_year, current_month - 1, day_number);
      date_obj.setHours(0, 0, 0, 0);

      const date_string = `${date_obj.getFullYear()}-${String(date_obj.getMonth() + 1).padStart(2, '0')}-${String(day_number).padStart(2, '0')}`;

      const is_disabled = (min_date && date_obj < min_date) ||
        (max_date && date_obj > max_date);

      days.push({
        type: 'day',
        day: day_number,
        date: date_string,
        date_obj,
        date_month: 'prev',
        is_selected: false,
        is_today: false,
        is_disabled: true, // Previous month days are always disabled
        key: `prev-${day_number}`
      });
    }

    // Add days from current month
    for (let day_number = 1; day_number <= days_in_month; day_number++) {
      const date_obj = new Date(current_year, current_month, day_number);
      date_obj.setHours(0, 0, 0, 0);

      const date_string = `${current_year}-${String(current_month + 1).padStart(2, '0')}-${String(day_number).padStart(2, '0')}`;

      const is_selected = selected_date_obj &&
        date_obj.getTime() === selected_date_obj.getTime();

      const is_today = (() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date_obj.getTime() === today.getTime();
      })();

      const is_disabled = (min_date && date_obj < min_date) ||
        (max_date && date_obj > max_date);

      days.push({
        type: 'day',
        day: day_number,
        date: date_string,
        date_obj,
        date_month: 'current',
        is_selected,
        is_today,
        is_disabled,
        key: `day-${day_number}`
      });
    }

    // Add days from next month to complete the grid
    const total_cells = Math.ceil(days.length / DAYS_IN_WEEK) * DAYS_IN_WEEK;
    const remaining_cells = total_cells - days.length;

    for (let day_number = 1; day_number <= remaining_cells; day_number++) {
      const date_obj = new Date(current_year, current_month + 1, day_number);
      date_obj.setHours(0, 0, 0, 0);

      const date_string = `${date_obj.getFullYear()}-${String(date_obj.getMonth() + 1).padStart(2, '0')}-${String(day_number).padStart(2, '0')}`;

      const is_disabled = (min_date && date_obj < min_date) ||
        (max_date && date_obj > max_date);

      days.push({
        type: 'day',
        day: day_number,
        date: date_string,
        date_obj,
        date_month: 'next',
        is_selected: false,
        is_today: false,
        is_disabled: true, // Next month days are always disabled
        key: `next-${day_number}`
      });
    }

    return days;
  }, [current_year, current_month, selected_date_obj, min_date, max_date]);

  const handle_prev_month = useCallback(() => {
    if (current_month === 0) {
      set_current_month(11);
      set_current_year(current_year - 1);
    } else {
      set_current_month(current_month - 1);
    }
  }, [current_month, current_year]);

  const handle_next_month = useCallback(() => {
    if (current_month === 11) {
      set_current_month(0);
      set_current_year(current_year + 1);
    } else {
      set_current_month(current_month + 1);
    }
  }, [current_month, current_year]);

  const handle_day_click = useCallback((day_data) => {
    if (day_data.is_disabled) return;

    if (on_date_select) {
      on_date_select(day_data.date);
    }
  }, [on_date_select]);

  // Handle click outside
  useEffect(() => {
    if (!show) return;

    const handle_click_outside = (e) => {
      if (calendar_ref.current && !calendar_ref.current.contains(e.target)) {
        const datepicker_input = e.target.closest('[data-datepicker-input]');
        if (!datepicker_input && on_close) {
          on_close();
        }
      }
    };

    setTimeout(() => {
      document.addEventListener('click', handle_click_outside);
    }, 0);

    return () => {
      document.removeEventListener('click', handle_click_outside);
    };
  }, [show, on_close]);

  if (!show) return null;

  return (
    <div
      ref={calendar_ref}
      className="vc"
      data-vc="calendar"
      data-vc-theme=""
      data-vc-type="default"
      role="application"
      tabindex="0"
      aria-label="Calendar"
      data-vc-position="bottom"
      style={{ position: 'absolute', top: '100%', left: 0, zIndex: 50 }}
    >
      <div className="--single-month flex flex-col overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3" data-vc="header">
          <div className="col-span-1">
            <button
              type="button"
              className="vc-arrow vc-arrow_prev"
              data-vc-arrow="prev"
              onClick={handle_prev_month}
              aria-label={__('Previous month', 'wpcbooking')}
            >
            </button>
          </div>

          <div className="col-span-3 flex justify-center items-center gap-x-1">
            <button
              type="button"
              className="vc-month"
              data-vc="month"
              data-vc-month={current_month}
              aria-label={__('Select month', 'wpcbooking') + `, ${__('current selected month', 'wpcbooking')}: ${MONTHS[current_month]}`}
            >
              {MONTHS[current_month]}
            </button>
            <span className="text-gray-800 dark:text-neutral-200">/</span>
            <button
              type="button"
              className="vc-year"
              data-vc="year"
              data-vc-year={current_year}
              aria-label={__('Select year', 'wpcbooking') + `, ${__('current selected year', 'wpcbooking')}: ${current_year}`}
            >
              {current_year}
            </button>
          </div>

          <div className="col-span-1 flex justify-end">
            <button
              type="button"
              className="vc-arrow vc-arrow_next"
              data-vc-arrow="next"
              onClick={handle_next_month}
              aria-label={__('Next month', 'wpcbooking')}
            >
            </button>
          </div>
        </div>

        <div data-vc="wrapper">
          <div data-vc="content">
            {/* Weekday labels */}
            <div className="vc-week" data-vc="week" role="row" aria-label={__('Days of the week', 'wpcbooking')}>
              {WEEKDAY_LABELS.map((weekday) => {
                const is_weekend = weekday.day === 0 || weekday.day === 6;
                return (
                  <b
                    key={weekday.day}
                    className="vc-week__day"
                    role="columnheader"
                    aria-label={weekday.full}
                    data-vc-week-day={weekday.day}
                    {...(is_weekend ? { 'data-vc-week-day-off': '' } : {})}
                  >
                    {weekday.short}
                  </b>
                );
              })}
            </div>

            {/* Days grid */}
            <div className="vc-dates" data-vc="dates" role="grid" aria-live="assertive" aria-label={__('Dates in the current month', 'wpcbooking')}>
              {calendar_days.map((day_data) => {
                const data_attrs = {
                  'data-vc-date': day_data.date,
                  'data-vc-date-month': day_data.date_month || 'current',
                  'data-vc-date-week-day': day_data.date_obj.getDay()
                };

                if (day_data.is_selected) {
                  data_attrs['data-vc-date-selected'] = '';
                }

                if (day_data.is_today) {
                  data_attrs['data-vc-date-today'] = '';
                  data_attrs['aria-current'] = 'date';
                }

                if (day_data.is_disabled) {
                  data_attrs['data-vc-date-disabled'] = '';
                }

                const is_weekend = day_data.date_obj.getDay() === 0 || day_data.date_obj.getDay() === 6;
                if (is_weekend) {
                  data_attrs['data-vc-date-weekend'] = '';
                }

                const month_name = MONTHS[day_data.date_obj.getMonth()];
                const year = day_data.date_obj.getFullYear();

                // Build button class
                let button_class = 'vc-date__btn';
                if (day_data.is_selected) {
                  button_class += ' vc-date__btn--selected';
                }
                if (day_data.is_today) {
                  button_class += ' vc-date__btn--today';
                }

                // Inline styling for selected date
                const button_style = day_data.is_selected ? {
                  backgroundColor: '#ff8c00',
                  color: 'white',
                  fontWeight: '600'
                } : {};

                return (
                  <div
                    key={day_data.key}
                    className="vc-date"
                    {...data_attrs}
                  >
                    <button
                      className={button_class}
                      style={button_style}
                      type="button"
                      role="gridcell"
                      aria-label={`${month_name} ${day_data.day}, ${year}`}
                      data-vc-date-btn=""
                      onClick={() => handle_day_click(day_data)}
                      disabled={day_data.is_disabled}
                      aria-disabled={day_data.is_disabled ? 'true' : undefined}
                      tabindex={day_data.is_disabled ? '-1' : undefined}
                    >
                      {day_data.day}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

