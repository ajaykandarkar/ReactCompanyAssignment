import React, { useEffect, useState } from 'react';
import "./Card.css";
import axios from 'axios';
import { DeleteCard } from './DeleteCard'; 
import { UpdateCard } from './UpdateCard'; 
import { add, remove } from '../store/cartSlice'
import { useDispatch, useSelector } from 'react-redux';

export const Card = ({ Productdata, setProducts }) => {
  
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.cartState.cartList);

    const [productStatus, setProductStatus] = useState({}); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);


    useEffect(() => {
        const updatedStatus = {};
        Productdata.forEach(product => {
            updatedStatus[product.id] = cartList.some(item => item.id === product.id);
        });
        setProductStatus(updatedStatus);
    }, [cartList, Productdata]);

    const handleAddToCart = (product) => {
        dispatch(add(product));
    };

    const handleRemoveFromCart = (product) => {
        dispatch(remove(product));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/products/${id}`)
            .then((res) => {
                const newData = Productdata.filter((product) => product.id !== id);
                setProducts(newData);
                console.log(res.data.msg);
            })
            .catch((err) => {
                console.log("Error occurred while deleting data:", err);
            });
    };

    const openDeleteModal = (id) => {
        setSelectedProductId(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedProductId(null);
    };

    const openUpdateModal = (id) => {
        setSelectedProductId(id);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedProductId(null);
    };
    
    return (
        <div className='container'>
            <div className='row row-cols-1 row-cols-md-3 g-4 py-5'>
                {Productdata.map(product => (
                    <div className='col' key={product.id}>
                        <div className="card">
                            <img src={product.imageUrl} className="card-img-top" alt="productImage" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className='card-text'>{product.description}</p>
                                <h3>Brand : {product.brand}</h3>
                            </div>
                            <div className='d-flex justify-content-around mb-3'>
                                <h3>$ {product.price}</h3>
                                {productStatus[product.id] ? (
                                    <button className='btn btn-primary btn-remove' onClick={() => handleRemoveFromCart(product)}>Remove</button>
                                ) : (
                                    <button className='btn btn-primary btn-style' onClick={() => handleAddToCart(product)}>Add Cart</button>
                                )} 
                            </div>
                            <div className='d-flex justify-content-around mb-3'>
                                <button className='btn btn-danger btn-delete' onClick={() => openDeleteModal(product.id)}>Delete</button>
                                <button className='btn btn-primary btn-style' onClick={() => openUpdateModal(product.id)}>Update</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showDeleteModal && 
                <DeleteCard 
                    productId={selectedProductId} 
                    handleDelete={handleDelete} 
                    closeDeleteModal={closeDeleteModal} 
                />}
            {showUpdateModal && 
                <UpdateCard 
                    productId={selectedProductId} 
                    closeUpdateModal={closeUpdateModal} 
                    setProducts={setProducts}
                    Productdata={Productdata}
                />}
        </div>
    );
};
