import React, { useEffect } from "react";

const PRODUCT_API_URL = `${process.env.REACT_APP_API_HOST}/products`;
const PRODUCT_PRICE_API_URL = `${process.env.REACT_APP_API_HOST}/products/`;

const ProductSelector = ({ products, setProducts, setPrice }) => {
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    await fetch(`${PRODUCT_API_URL}`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
  };

  const getPrice = async (param) => {
    await fetch(`${PRODUCT_PRICE_API_URL}` + param)
      .then((res) => res.json())
      .then((json) => setPrice(json));
  };

  const onClickHandler = (e) => {
    getPrice(e.target.value);
  };

  return (
    <select defaultValue={"DEFAULT"} onChange={onClickHandler}>
      <option value="DEFAULT" disabled hidden>
        select a product
      </option>
      {products.map((product) => (
        <option key={product.id} value={product.code}>
          {product.code}
        </option>
      ))}
    </select>
  );
};

export default ProductSelector;
