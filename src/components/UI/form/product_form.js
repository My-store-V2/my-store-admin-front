import React from "react";
import Input from "../Input";

import "./productFormStyles.scss";

const Index = ({ dataForm: ProductForm, handleChange }) => {
    return (
        <div className="form__group">
            <div className="form__product__group">
                <Input
                    label="title"
                    type="text"
                    name="name"
                    value={ProductForm?.name}
                    required
                    placeholder="Product name"
                    onChange={(e) => handleChange(e)}
                />
                <div className="form__product__group__description">
                    <label htmlFor="description">
                        short description of the product
                    </label>
                    <textarea
                        label="short description of the product"
                        type="text"
                        name="description"
                        value={ProductForm?.description}
                        required
                        placeholder="Product description"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <Input
                    label="price"
                    type="number"
                    name="price"
                    value={ProductForm?.price}
                    required
                    placeholder="Product price"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="form__product__group__image">
                <div className="form__product__group__image__thumbnail">
                    {ProductForm?.thumbnail && (
                        <img
                            alt="not found"
                            width={"250px"}
                            className="thumbnail__image"
                            src={
                                typeof ProductForm?.thumbnail === "object"
                                    ? URL.createObjectURL(
                                          ProductForm?.thumbnail
                                      )
                                    : ProductForm?.thumbnail
                            }
                        />
                    )}
                    {/* <Button
                            onClick={() => deleteElement("thumbnail")}
                            className="btn__remove"
                            title="Delete the image"
                        /> */}
                    <input
                        label="miniature (image)"
                        type="file"
                        name="thumbnail"
                        onChange={(e) => handleChange(e, "thumbnail")}
                    />
                </div>

                <div className="form__product__group__image__packshot">
                    {ProductForm?.packshot && (
                        <img
                            alt="not found"
                            width={"250px"}
                            className="packshot__image"
                            src={
                                typeof ProductForm?.packshot === "object"
                                    ? URL.createObjectURL(ProductForm?.packshot)
                                    : ProductForm?.packshot
                            }
                        />
                    )}
                    {/* <Button
                            onClick={() => deleteElement("packshot")}
                            className="btn__remove"
                            title="Delete the image"
                        /> */}
                    <input
                        label="packshot (image)"
                        type="file"
                        name="packshot"
                        placeholder="Article packshot"
                        onChange={(e) => handleChange(e, "packshot")}
                    />
                </div>
            </div>
            <div className="form__product__group__disable">
                <label htmlFor="active">disable</label>
                <input
                    label="disable"
                    type="checkBox"
                    name="active"
                    checked={!ProductForm?.active}
                    placeholder="Product Disable"
                    onChange={() =>
                        handleChange({
                            target: {
                                name: "active",
                                value: !ProductForm?.active,
                            },
                        })
                    }
                />
            </div>
        </div>
    );
};

export default Index;
