import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../components/Card';

export const ListOfCard = () => {
  
  const [Productdata, setProducts] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
 

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    console.log("Data from API:", Productdata);
  }, [Productdata]); 

  return (
    <>
      <Card Productdata={Productdata} setProducts={setProducts} />
    </>
  );
};
