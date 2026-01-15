import { h } from "preact";

const InfoTooltip = ({ description = "" }) => {
  if (!description) return null;

  return (
    <div className="relative flex items-center group">
      <div className="h-10 w-10 flex items-center justify-center bg-blue-50 border-2 border-blue-200 rounded-full cursor-help">
        <span className="text-base font-bold text-blue-700">i</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-64 rounded-md bg-gray-800 px-3 py-2 text-xs text-white group-hover:block z-10 shadow-lg">
        <div className="text-center">{description}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
};

export default InfoTooltip;

