import { h, Fragment } from "preact";
import IconsListData from "./IconsListData.jsx";
import TextInputData from "./TextInputData.jsx";
import DatePickerData from "./DatePickerData.jsx";
import GoogleMapData from "./GoogleMapData.jsx";
import NumberInputData from "./NumberInputData.jsx";
import PhoneInputData from "./PhoneInputData.jsx";
import EmailInputData from "./EmailInputData.jsx";
import TimePickerData from "./TimePickerData.jsx";
import ProductListData from "./ProductListData.jsx";

const BLOCK_TYPE_MAP = {
  "booking/icons-list": IconsListData,
  "booking/text-input": TextInputData,
  "booking/date-picker": DatePickerData,
  "booking/google-map": GoogleMapData,
  "booking/number-input": NumberInputData,
  "booking/phone-input": PhoneInputData,
  "booking/email-input": EmailInputData,
  "booking/time-picker": TimePickerData,
  "booking/product-list": ProductListData,
  "booking/product-grid": ProductListData,
};

const SummaryDataRenderer = ({ render_data = [] }) => {
  if (!Array.isArray(render_data) || render_data.length === 0) {
    console.warn('⚠️ [SummaryDataRenderer] No render_data to display');
    return null;
  }

  return (
    <div className="user-data w-full p-4 shadow-lg mt-4 rounded-[35px]">
      {render_data.map((item, index) => {
        const Component = BLOCK_TYPE_MAP[item.block_type];
        
        if (!Component) {
          console.warn(`⚠️ [SummaryDataRenderer] No renderer for block type: ${item.block_type}`);
          return null;
        }

        return <Component key={index} data={item} />;
      })}
    </div>
  );
};

export default SummaryDataRenderer;

