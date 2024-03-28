"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CircumIcon from "@klarr-agency/circum-icons-react";
import { useEffect, useState } from "react";
import FetchApi from "@/components/useFetch";
import "./styles.scss";

function Order() {
    const { id } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState(null);
    useEffect(() => {
        FetchApi({ url: `/api/orders/${id}`, method: "GET" }).then((data) => {
            setOrder(data);
            console.log(data.results);
        });
    }, [id]);
    return (
        <div className="order__container">
            <div className="order__container__header">
                <div
                    className="order__container__header__back"
                    onClick={() => router.back()}
                >
                    <CircumIcon name={"circle_chev_left"} />
                </div>
            </div>
            <div className="order__container__content">
                {order && (
                    <>
                        <div className="order__container__content__orderInfo">
                            <p>Order ID: {order.orders[0]?.id}</p>
                            <p>
                                {" "}
                                Client Name :{" "}
                                {order.user?.firstname +
                                    " " +
                                    order.user?.lastname}
                            </p>
                            <p>Order Date: {order.orders[0]?.order_date}</p>
                            <p>Status: {order.orders[0]?.status}</p>
                            <p>
                                Address:{" "}
                                {order.orders[0]?.delivery_address +
                                    " " +
                                    order.orders[0]?.delivery_city +
                                    " " +
                                    order.orders[0]?.delivery_zipcode}
                            </p>
                        </div>
                        <div className="order__container__content__products">
                            {order.results > 0 ? (
                                <>
                                    {order.results.map((product) => (
                                        <div
                                            className="order__container__content__products__product"
                                            key={product.products.id}
                                        >
                                            <div className="order__container__content__products__product__img">
                                                <img
                                                    src={
                                                        product.products
                                                            .packshot
                                                    }
                                                    alt={product.products.name}
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "https://circumicons.com/icon/image_off";
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                            </div>
                                            <div className="order__container__content__products__product__info">
                                                <div className="order__container__content__products__product__info__name">
                                                    <p>
                                                        {product.products.name}
                                                    </p>
                                                    <p>
                                                        Quantity:{" "}
                                                        {product.quantity}
                                                    </p>
                                                </div>

                                                <p className="order__container__content__products__product__info__price">
                                                    Price:{" "}
                                                    {product.products.price} €
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p>No products</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Order;
