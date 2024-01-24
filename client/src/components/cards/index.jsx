import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(response => setProducts(response.data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setProducts('data is not found!');
      });
  }, []);

  return (
    <div className="row">
      {typeof products === 'string' && products === 'data not found' ? (
        <p>No elements</p>
      ) : (
        products.map(product => (
          <div key={product._id} className="col-4 box">
            <Link to={`/details/${product._id}`}>
              <h4>{product.name}</h4>
            </Link>
              <img src={product.image} alt="" />
              <p>{product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
