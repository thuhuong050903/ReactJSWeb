import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import ProductDetail from '../ProductDetail/ProductDetail';

function Home() {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get('https://63a572122a73744b008e28d5.mockapi.io/api/Products')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDetailClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <div className="home-container">
        {data.map((item) => (
          <div className="home-card" key={item.id}>
            <img src={item.img} alt={item.namep} />
            <h2>{item.namep}</h2>
            <p>{item.price}</p>
            <p>{item.desc}</p>
            <p>Quantity: {item.quantity}</p>
            <div className="card-buttons">
              <button className="detail-button" onClick={() => handleDetailClick(item)}>
                Chi Tiết
              </button>
              <button className="add-to-cart-button">Thêm giỏ hàng</button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && <ProductDetail product={selectedProduct} />}
    </div>
  );
}

export default Home;
