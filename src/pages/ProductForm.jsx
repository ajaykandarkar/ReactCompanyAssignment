import React, { useState } from 'react';
import './ProductForm.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ProductForm = () => {

    const [image, setImage] = useState(null);
    const [products, setProducts] = useState({
        name: "",
        price: "",
        quantity: 0,
        stock: 0,
        brand: "",
        description: ""
    });

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducts({
            ...products,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        for (const key in products) {
            formData.append(key, products[key]);
        }

        console.log("formdat" ,formData);

        axios.post("http://localhost:5000/api/products", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            toast.success(res.data.message);
            setProducts({
                name: "",
                price: "",
                quantity: 0,
                stock: 0,
                brand: "",
                description: ""
            });
            setImage(null);
        })
        .catch((err) => {
            toast.error("Error occurred while inserting the data");
        });
    };

    return (
        <div className='container col-5 p-3 my-4 formBaground rounded'>
            <form onSubmit={handleSubmit}>
                <h3 className='header'>Add Products</h3>
                <div className='d-flex justify-content-between'>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label white-label ">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            placeholder="Enter product name"
                            name="name"
                            value={products.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label white-label ">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productPrice"
                            placeholder="Enter product price"
                            name="price"
                            value={products.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className="mb-3">
                        <label htmlFor="productQuantity" className="form-label white-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productQuantity"
                            placeholder="Enter quantity"
                            name="quantity"
                            value={products.quantity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productStock" className="form-label white-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productStock"
                            placeholder="Enter stock level"
                            name="stock"
                            value={products.stock}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className="mb-3">
                        <label htmlFor="productBrand" className="form-label white-label ">Brand</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productBrand"
                            placeholder="Enter brand"
                            name="brand"
                            value={products.brand}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3 col-5 '>
                        <label   htmlFor="productImages" className="form-label white-label">Product Images</label>
                        <input
                            type="file"
                            className="form-control"
                            id="productImages"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label white-label">Description</label>
                    <textarea
                        className="form-control"
                        id="productDescription"
                        rows="3"
                        placeholder="Enter product description"
                        name="description"
                        value={products.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Products</button>
            </form>
        </div>
    );
};
