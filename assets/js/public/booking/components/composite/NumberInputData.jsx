import { h } from "preact";

const NumberInputData = ({ data }) => {
  const { label, value, suffix } = data;

  if (!value && value !== 0) {
    console.warn('⚠️ [NumberInputData] No value');
    return null;
  }

  return (
    <div className="ml-[25px] flex items-center">
      <label className="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">
        {label}:
      </label>
      <span className="text-base text-th-grey font-medium align-middle">
        {value}{suffix ? ` ${suffix}` : ''}
      </span>
    </div>
  );
};

export default NumberInputData;

