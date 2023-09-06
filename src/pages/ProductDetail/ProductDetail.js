import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail({ match }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://63a572122a73744b008e28d5.mockapi.io/api/Products/${match.params.id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <h2>Chi tiết sản phẩm</h2>
      <div className="product-detail">
        <img src={product.img} alt={product.namep} className="product-image" />
        <div className="product-info">
          <p className="product-name">Tên sản phẩm: {product.namep}</p>
          <p className="product-price">Giá: {product.price}</p>
          <p className="product-quantity">Số lượng: {product.quantity}</p>
          <p className="product-desc">Mô tả: {product.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;