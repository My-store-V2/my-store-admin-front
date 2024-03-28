"use client";
import React from "react";
import { useRouter } from "next/navigation";

import "./styles.scss";

function Card({ title, description, image, path }) {
    const router = useRouter();
    return (
        <div className="card" onClick={() => router.push(path)}>
            <img src={image} alt="Avatar" style={{ width: "100%" }} />
            <div className="container">
                <h4>
                    <b>{title}</b>
                </h4>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Card;
