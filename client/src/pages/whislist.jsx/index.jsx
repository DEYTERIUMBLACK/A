import React, { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    setWishlist(updatedWishlist);
  };

  const moveToBasket = (productId) => {
    const basket = JSON.parse(localStorage.getItem("basket")) || [];

    const selectedProduct = wishlist.find((item) => item.id === productId);

    if (selectedProduct) {
      basket.push(selectedProduct);

      localStorage.setItem("basket", JSON.stringify(basket));

      removeFromWishlist(productId);
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => moveToBasket(record.id)}>
            Move to Basket
          </Button>
          <Button type="danger" onClick={() => removeFromWishlist(record.id)}>
            Remove from Wishlist
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Wishlist</h1>
      <Table dataSource={wishlist} columns={columns} rowKey="id" />

      <Button type="primary">Move All to Basket</Button>
    </div>
  );
};

export default Wishlist;
