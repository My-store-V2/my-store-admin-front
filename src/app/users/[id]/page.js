// Indiquez que c'est un composant client si vous utilisez Next.js 12 ou plus avec des composants serveur/client.
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CircumIcon from "@klarr-agency/circum-icons-react";

import "./styles.scss";

export default function Page() {
    const router = useRouter();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    //https://backend-api-dev-rob6.onrender.com
    useEffect(() => {
        fetch(`http://localhost:3001/api/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success === false) {
                    setError(data.message);
                    setIsLoading(false);
                    return;
                }
                setUser(data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                setError("Error fetching user");
                setIsLoading(false);
            });
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
            {isLoading && (
                <div className="user__container__content">
                    <h3 className="user__loading">Loading...</h3>
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
        </div>
    );
}
