// Basket.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';

const Basket = () => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];
    setBasket(storedBasket);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedBasket = basket.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    setBasket(updatedBasket);
  };

  const clearBasket = () => {
    localStorage.removeItem('basket');
    setBasket([]);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleQuantityChange(record.id, record.quantity - 1)}>-</Button>
          {record.quantity}
          <Button onClick={() => handleQuantityChange(record.id, record.quantity + 1)}>+</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Basket</h1>
      <Table dataSource={basket} columns={columns} rowKey="id" />

      <Button type="primary" onClick={clearBasket}>Place Order</Button>
    </div>
  );
};

export default Basket;
