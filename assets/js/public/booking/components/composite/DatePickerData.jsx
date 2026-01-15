import { h } from "preact";

const DatePickerData = ({ data }) => {
  const { label, value, formatted_value } = data;

  if (!value && !formatted_value) {
    console.warn('⚠️ [DatePickerData] No value or formatted_value');
    return null;
  }

  return (
    <div className="ml-[25px] flex items-center">
      <label className="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">
        {label}:
      </label>
      <span className="text-base text-th-grey font-medium align-middle">
        {formatted_value || value}
      </span>
    </div>
  );
};

export default DatePickerData;

