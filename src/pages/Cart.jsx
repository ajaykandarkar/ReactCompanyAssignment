import React from "react";
import { useSelector } from "react-redux";
import "./Cart.css";
import {remove} from '../store/cartSlice'
import { useDispatch} from "react-redux";

export const Cart = () => {
  const products = useSelector((state) => state.cartState.cartList);
  const dispatch =useDispatch()

  return (
    <div className="cartContainer">
           <h1 className="header">Cart Items : {products.length} </h1>
      {products.map((product) => (
        <div className="cartCard" key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <p className="productName">{product.name}</p>
          <p className="productPrice">${product.price}</p>
          <button onClick={()=>dispatch(remove(product))}>Remove</button>
        </div>
      ))}
    </div>
  );
};
