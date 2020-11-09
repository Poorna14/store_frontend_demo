import React, { useState } from "react";
import PriceTable from "../PriceTable";
import ProductSelector from "../ProductSelector";

const Catalogue = ({ products, setProducts }) => {
  const [price, setPrice] = useState({ productDTO: "", priceMap: "" });
  return (
    <div>
      <h2>Catalogue</h2>
      <ProductSelector
        products={products}
        setProducts={setProducts}
        setPrice={setPrice}
      />
      <PriceTable price={price} />
    </div>
  );
};

export default Catalogue;
