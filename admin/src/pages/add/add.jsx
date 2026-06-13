import React, { useState } from "react";
import "./add.css";
import image1 from "../../assets/upload-image.webp";
import axios from "axios";
import { toast } from "react-toastify";
const Add = () => {

    const url = "https://medicare-app-backend-g95p.onrender.com";
    const [image, setImage] = React.useState(false);
    const [data, setData] = React.useState({
        name: "",
        description: "",
        price: "",
    });
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("image", image);
        const response = await axios.post(`${url}/api/medicine/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
            })
            setImage(false);
            toast.success("Product added successfully");
            // alert("Product added successfully");

            }else {
                    toast.error("Error in adding product");
                // alert("Error in adding product");
            }
               
    }



        return (
            <>
                <div className="add">
                    <form className="flex-col" onSubmit={onSubmitHandler}>
                        <div className="add-image-up  flex-col">
                            <p>Upload Image</p>
                            <label htmlFor="image">
                                <img src={image ? URL.createObjectURL(image) : image1} alt="upload" />
                            </label>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                        </div>
                        <div className="add-product-name flex-col">
                            <p>Product Name</p>
                            <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
                        </div>
                        <div className="add-product-des">
                            <p>Product Description</p>
                            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Type here" required></textarea>
                        </div>
                        <div className="add-product-price flex-col">
                            <p>Product Price</p>
                            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="₹ Price" required />
                        </div>
                        <button className="add-button" type="submit">Add Product</button>
                    </form>
                </div>
            </>
        );
    }

    export default Add;
