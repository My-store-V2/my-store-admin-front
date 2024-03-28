// Indiquez que c'est un composant client si vous utilisez Next.js 12 ou plus avec des composants serveur/client.
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FetchApi from "@/components/useFetch";
import CircumIcon from "@klarr-agency/circum-icons-react";
import { getCookie } from "cookies-next";
import Link from "next/link";

import "./styles.scss";

export default function Page() {
    const router = useRouter();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        FetchApi({ url: `/api/users/${id}`, method: "GET" }).then((data) => {
            setUser(data.results);
        });
        FetchApi({ url: `/api/orders/user/${id}`, method: "GET" }).then(
            (data) => {
                setOrders(data.results);
            }
        );
    }, [id]);

    return (
        <div className="user__container">
            <div
                className="user__container__header"
                onClick={() => router.back()}
            >
                <CircumIcon name="circle_chev_left" />
            </div>
            {error && (
                <div className="user__container__content">
                    <h3 className="user__error">{error}</h3>
                </div>
            )}

            {user && (
                <div className="user__container__content">
                    <div className="user__image-container">
                        <img
                            className="user__image"
                            src="https://circumicons.com/icon/image_off"
                            alt={user?.name}
                            onError={(e) => {
                                e.target.src =
                                    "https://circumicons.com/icon/image_off";
                                e.target.onerror = null;
                            }}
                        />
                    </div>
                    <div className="user__info">
                        <div>
                            <h1 className="label ">firstname : </h1>
                            <span>{user?.firstname}</span>
                        </div>
                        <div>
                            <h1 className="label ">lastname : </h1>
                            <span>{user?.lastname}</span>
                        </div>
                        <div>
                            <h1 className="label">email :</h1>
                            <span>{user?.email}</span>
                        </div>
                        <div>
                            <h1 className="label ">phone : </h1>
                            <span>{user?.phone}</span>
                        </div>
                        <div>
                            <h1 className="label ">address : </h1>
                            <span>{user?.address}</span>
                        </div>
                        <div>
                            <h1 className="label">zipcode :</h1>
                            <span>{user?.zipcode}</span>
                        </div>

                        <div>
                            <h1 className="label">city :</h1>
                            <span>{user?.city}</span>
                        </div>
                    </div>
                </div>
            )}
            {orders.length > 0 ? (
                <div className="user__order__content">
                    <h1 className="user__title">Orders</h1>
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            className="user__order__content__orders"
                            href={`/orders/${order.id}`}
                        >
                            <div>
                                <h1>Order ID: {order.id}</h1>
                                <h1>Order Date: {order.order_date}</h1>
                                <h1>Status: {order.status}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="user__order__content">
                    <h1 className="user__title">Orders</h1>
                    <h1>No orders</h1>
                </div>
            )}
        </div>
    );
}
