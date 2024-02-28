// Indiquez que c'est un composant client si vous utilisez Next.js 12 ou plus avec des composants serveur/client.
"use client";

import React, { useEffect, useState } from "react";
// Importez useRouter depuis next/router
import { useParams } from "next/navigation";

import "./styles.scss";

export default function Page() {
    // Utilisez useRouter pour obtenir les paramètres de l'URL
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [imgSelected, setImgSelected] = useState(product?.packshot);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data.results);
                setImgSelected(data.results.packshot);
            })
            .catch((error) => console.error("Error fetching product", error));
    }, [id]);

    console.log("product", product);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleButtonClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="product__container">
            <div className="product__container__content">
                <div className="product__image-container">
                    <img
                        className="product__image"
                        src={imgSelected}
                        alt={product?.name}
                    />
                    <div className="product__image__other">
                        <img
                            className="product__image"
                            src={product?.packshot}
                            alt={product?.name}
                            onClick={() => setImgSelected(product?.packshot)}
                        />
                        <img
                            className="product__image"
                            src={product?.thumbnail}
                            alt={product?.name}
                            onClick={() => setImgSelected(product?.thumbnail)}
                        />
                    </div>
                </div>
                {isEditing ? (
                    <div className="product__info">
                        <h1 className="product__info__title">
                            {product?.name}
                        </h1>
                        <p className="product__info__description">
                            {product?.description}
                        </p>
                        <p className="product__info__price">
                            ${product?.price}
                        </p>
                        <div className="product__actions">
                            <div className="product__actions__checkbox">
                                <label htmlFor="myCheckbox">online</label>
                                <input
                                    type="checkbox"
                                    id="myCheckbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                            <button
                                className="product__actions__btn"
                                onClick={handleButtonClick}
                            >
                                Modify
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="product__info">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="product__info__title"
                            value={product?.name}
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="product__info__description"
                            value={product?.description}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    description: e.target.value,
                                })
                            }
                        />
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="product__info__price"
                            value={product?.price}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    price: e.target.value,
                                })
                            }
                        />

                        <div className="product__actions">
                            <div className="product__actions__checkbox">
                                <label htmlFor="myCheckbox">online</label>
                                <input
                                    type="checkbox"
                                    id="myCheckbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                            <button
                                className="product__actions__btn"
                                onClick={handleButtonClick}
                            >
                                Validate
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
