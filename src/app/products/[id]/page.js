// Indiquez que c'est un composant client si vous utilisez Next.js 12 ou plus avec des composants serveur/client.
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CircumIcon from "@klarr-agency/circum-icons-react";

import "./styles.scss";

export default function Page() {
    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [imgSelected, setImgSelected] = useState(product?.packshot);

    useEffect(() => {
        fetch(`https://backend-api-dev-rob6.onrender.com/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data.results);
                setImgSelected(data.results.packshot);
            })
            .catch((error) => console.error("Error fetching product", error));
    }, [id]);

    return (
        <div className="product__container">
            <div
                className="product__container__header"
                onClick={() => router.back()}
            >
                <CircumIcon name="circle_chev_left" />
            </div>
            {product && (
                <div className="product__container__content">
                    <div className="product__image-container">
                        <img
                            className="product__image"
                            src={imgSelected}
                            alt={product?.name}
                            onError={(e) => {
                                e.target.src =
                                    "https://circumicons.com/icon/image_off";
                                e.target.onerror = null;
                            }}
                        />
                        <div className="product__image__other">
                            <img
                                className="product__image"
                                src={product?.packshot}
                                alt={product?.name}
                                onClick={() =>
                                    setImgSelected(product?.packshot)
                                }
                                onError={(e) => {
                                    e.target.src =
                                        "https://circumicons.com/icon/image_off";
                                    e.target.onerror = null;
                                }}
                            />
                            <img
                                className="product__image"
                                src={product?.thumbnail}
                                alt={product?.name}
                                onClick={() =>
                                    setImgSelected(product?.thumbnail)
                                }
                                onError={(e) => {
                                    e.target.src =
                                        "https://circumicons.com/icon/image_off";
                                    e.target.onerror = null;
                                }}
                            />
                        </div>
                    </div>

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
                    </div>
                </div>
            )}
        </div>
    );
}
