import React, { useState } from "react";
import Form from "../Form";

const Purchase = ({ order, setOrder, products, setProducts }) => {
  const [price, setPrice] = useState({ productDTO: "", priceMap: "" });
  return (
    <div>
      <h2>Purchase</h2>
      <Form
        order={order}
        setOrder={setOrder}
        products={products}
        setProducts={setProducts}
        price={price}
        setPrice={setPrice}
      />
    </div>
  );
};

export default Purchase;
