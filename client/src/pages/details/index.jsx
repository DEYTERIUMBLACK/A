import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Details = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [id]);

  const addToBasket = () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    
    basket.push(products);

    localStorage.setItem('basket', JSON.stringify(basket));

    alert('Product added to basket!');
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    wishlist.push(products);

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    alert('Product added to wishlist!');
  };

  return (
    <div>
      <h1>{products.name}</h1>
      <img src={products.image} alt={products.name}></img>
      <span>{products.price}</span>
      <button onClick={addToBasket}>Add to Basket</button>
      <button onClick={addToWishlist}>Add to Wishlist</button>
    </div>
  );
};

export default Details;
