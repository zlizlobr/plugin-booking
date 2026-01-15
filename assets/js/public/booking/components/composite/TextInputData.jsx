import { h } from "preact";

const TextInputData = ({ data }) => {
  const { label, value } = data;

  if (!value) {
    return null;
  }

  return (
    <div className="ml-[25px] flex items-center">
      <label className="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">
        {label}:
      </label>
      <span className="text-base text-th-grey font-medium align-middle">
        {value}
      </span>
    </div>
  );
};

export default TextInputData;

