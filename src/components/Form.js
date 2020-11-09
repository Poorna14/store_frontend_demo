import React, { useState, useEffect } from "react";
import ProductSelector from "./ProductSelector";

const API_HOST = "http://localhost:8085";
const PRODUCT_ORDER_API_URL = `${API_HOST}/order`;

let orderArr = [];

const Form = ({ order, setOrder, products, setProducts, price, setPrice }) => {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    let copyOrder = { ...order };
    copyOrder.code = price.productDTO["code"];
    setOrder(copyOrder);
  }, [price.productDTO["code"]]);

  const inputUnitHandler = (e) => {
    let copyOrder = { ...order };
    if (isNaN(parseFloat(e.target.value)) || e.target.value < 0) {
      copyOrder.numOfUnits = 0;
    } else {
      copyOrder.numOfUnits = parseInt(e.target.value, 10);
    }
    setOrder(copyOrder);
  };

  const inputCartonHandler = (e) => {
    let copyOrder = { ...order };
    if (isNaN(parseFloat(e.target.value)) || e.target.value < 0) {
      copyOrder.numOfCartons = 0;
    } else {
      copyOrder.numOfCartons = parseInt(e.target.value, 10);
    }
    setOrder(copyOrder);
  };

  const addButtonHandler = (e) => {
    e.preventDefault();
    if (order.code !== undefined) {
      let oldOrder = orderArr.filter(
        (orderElement) => orderElement.code === order.code
      );
      if (oldOrder.length === 0) {
        orderArr.push(order);
      } else {
        oldOrder[0].numOfCartons += order.numOfCartons;
        oldOrder[0].numOfUnits += order.numOfUnits;
      }

      let copyOrder = { ...order };
      copyOrder.numOfCartons = 0;
      copyOrder.numOfUnits = 0;
      setOrder(copyOrder);
    }
  };

  const submitButtonHandler = async (e) => {
    e.preventDefault();
    await fetch(`${PRODUCT_ORDER_API_URL}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderArr),
    })
      .then((response) => response.json())
      .then((json) => setCost(json));
    orderArr = [];
  };

  return (
    <div>
      <form>
        <ProductSelector
          products={products}
          setProducts={setProducts}
          setPrice={setPrice}
        />
        <input
          value={order.numOfCartons}
          placeholder={"Num of Cartons"}
          onChange={inputCartonHandler}
          pattern={"[0-9]"}
          type={"number"}
        />
        <input
          value={order.numOfUnits}
          placeholder={"Num of Units"}
          onChange={inputUnitHandler}
          pattern={"[0-9]"}
          type={"number"}
        />
        <button onClick={addButtonHandler} type="button">
          Add
        </button>
        <button onClick={submitButtonHandler} type="submit">
          Calculate
        </button>
        <p>Total Price : {cost}</p>
      </form>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Num of Cartons</th>
            <th>Num of Units</th>
          </tr>
        </thead>
        <tbody>
          {orderArr.map((o) => (
            <tr key={o.code}>
              <td>{o.code}</td>
              <td>{o.numOfCartons}</td>
              <td>{o.numOfUnits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;
