import { h } from "preact";

const ProductListData = ({ data }) => {
  const { label, products = [] } = data;

  if (!products || products.length === 0) {
    console.warn('⚠️ [ProductListData] No products to render');
    return null;
  }

  return (
    <div className="mt-4 ml-[25px] mb-[25px]">
      <ul className="flex flex-row flex-wrap gap-2">
        {products.map((product, index) => (
          <li key={index} className="flex items-center gap-x-2 p-2">
            <div className="">
              {product.image && (
                <img
                  src={product.image}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-th-grey"
                  alt={product.name || ''}
                />
              )}
            </div>
            <div className="text-th-grey font-medium text-base">
              {product.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListData;

