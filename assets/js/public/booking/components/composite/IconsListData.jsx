import { h } from "preact";

const IconsListData = ({ data }) => {
  const { label, value, items = [] } = data;

  if (!items || items.length === 0) {
    console.warn('⚠️ [IconsListData] No items to render');
    return null;
  }

  return (
    <div className="ml-[25px] flex items-center">
      {/* Label only if not empty */}
      {label && label.trim().length > 0 && (
        <label className="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">
          {label}:
        </label>
      )}
      <ul className="flex flex-col gap-10p">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-x-5 p-4">
            {/* Icon wrapper */}
            <div className="w-50p h-50p flex items-center justify-center rounded-full bg-white border border-th-grey">
              {item.icon && (
                <div
                  style={{ "--mask-img": `url('${item.icon}')` }}
                  className="w-25p h-25p cs-mask bg-black"
                />
              )}
            </div>
            {/* Label */}
            <div className="text-th-grey font-medium text-base">{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IconsListData;

