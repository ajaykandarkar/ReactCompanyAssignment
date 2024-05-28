import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UpdateCard = ({ productId, closeUpdateModal, setProducts, productData }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        brand: '',
        quantity: '',
        stock: '',
    });

    useEffect(() => {
        if (Array.isArray(productData)) {
            const product = productData.find(p => p.id === productId);
            if (product) {
                setFormData({
                    name: product.name || '',
                    description: product.description || '',
                    price: product.price || '',
                    brand: product.brand || '',
                    quantity: product.quantity || '',
                    stock: product.stock || '', // Initialize stock field
                });
            }
        }
    }, [productId, productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        const updatedData = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            brand: formData.brand,
            quantity: formData.quantity,
            stock: formData.stock, 
        };

        axios.put(`http://localhost:5000/api/products/${productId}`, updatedData)
            .then((res) => { 
                const updatedProducts = productData.map(p => p.id === productId ? res.data : p);
                setProducts(updatedProducts);
                window.location.reload()
                closeUpdateModal();
              
            })
            .catch((err) => {
                console.log("Error occurred while updating data:", err);
            });
    };

    useEffect(() => {
        console.log('Form Data:', formData); 
    }, [formData]);

    return (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Product</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeUpdateModal}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="brand" className="form-label">Brand</label>
                                <input type="text" className="form-control" id="brand" name="brand" value={formData.brand} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input type="number" className="form-control" id="stock" name="stock" value={formData.stock} onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"  onClick={closeUpdateModal}>Close</button>
                        <button type="button" className="btn btn-primary"  onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
