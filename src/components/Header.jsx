import React from 'react';
import { Link } from 'react-router-dom'; 
import "./Header.css"
import { useSelector } from 'react-redux';

const Header = () => {
  const Products = useSelector(state=>state.cartState.cartList);
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow rounded">
      <div className="container">
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-5">
              <Link className="nav-link fs-5 text-bold" to="/" >Home</Link> 
            </li>
            <li className="nav-item mx-5">
              <Link className="nav-link fs-5 text-bold" to="/products">Products</Link> 
            </li>
            <li className="nav-item mx-5"/>
              <Link className="nav-link fs-5 text-bold" to="/cart">Cart </Link> 
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
