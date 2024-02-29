import React from "react";
import Input from "../Input";

import "./userFormStyles.scss";

const Index = ({ dataForm: ProductForm, handleChange }) => {
    return (
        <div className="form__group">
            <Input
                label="firstname"
                type="text"
                name="firstname"
                value={ProductForm?.firstname}
                required
                placeholder="firstname"
                onChange={(e) => handleChange(e)}
            />
            <Input
                label="lastname"
                type="text"
                name="lastname"
                value={ProductForm?.lastname}
                required
                placeholder="lastname"
                onChange={(e) => handleChange(e)}
            />
            <Input
                label="email"
                type="email"
                name="email"
                value={ProductForm?.email}
                required
                placeholder="email"
                onChange={(e) => handleChange(e)}
            />
            <Input
                label="address"
                type="text"
                name="address"
                value={ProductForm?.address}
                placeholder="address"
                onChange={(e) => handleChange(e)}
            />
            <Input
                label="zipcode"
                type="number"
                name="zipcode"
                value={ProductForm?.zipcode}
                placeholder="zipcode"
                onChange={(e) => handleChange(e)}
            />
            <Input
                label="city"
                type="text"
                name="city"
                value={ProductForm?.city}
                placeholder="city"
                onChange={(e) => handleChange(e)}
            />
            <Input
                label="phone"
                type="number"
                name="phone"
                value={ProductForm?.phone}
                placeholder="phone"
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export default Index;
