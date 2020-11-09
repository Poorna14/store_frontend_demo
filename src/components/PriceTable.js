import React from "react";

const PriceTable = ({ price }) => {
  return (
    <div>
      <h1>Store Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Num of Units</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(price.priceMap).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{price.priceMap[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
