import { h, Fragment } from "preact";

const GoogleMapData = ({ data }) => {
  const { label, value, parsed_address } = data;

  if (!value && !parsed_address) {
    console.warn('⚠️ [GoogleMapData] No value or parsed_address');
    return null;
  }

  const address = parsed_address || (typeof value === 'string' ? JSON.parse(value) : value);

  return (
    <Fragment>
      {address.address && (
        <div className="ml-[25px] flex items-start">
          <label className="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap mt-0 pt-0">
            Street:
          </label>
          <span>{address.address}</span>
        </div>
      )}
      {address.city && (
        <div className="ml-[25px] flex items-start">
          <label className="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap mt-0 pt-0">
            City:
          </label>
          <span>{address.city}</span>
        </div>
      )}
      {address.country && (
        <div className="ml-[25px] flex items-start">
          <label className="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap mt-0 pt-0">
            Country:
          </label>
          <span>{address.country}</span>
        </div>
      )}
    </Fragment>
  );
};

export default GoogleMapData;

