"use client";
import React from "react";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import Button from "@/components/UI/Button";
import "./styles.scss";

const Index = () => {
    const router = useRouter();

    const token = getCookie("token");

    const pathname = usePathname();

    const handleLogout = () => {
        deleteCookie("token");
        router.push("/login");
    };

    const isActiveLink = (href) => {
        return pathname === href;
    };

    return (
        <header className="header">
            <div className="header__logo">
                <Link href="/">
                    <span className="header__logo__title">mystore.</span>
                </Link>
            </div>
            {token ? (
                <div className="header__nav">
                    <div className="header__nav__items">
                        <Link href="/users">
                            <span
                                className={`header__nav__item ${
                                    isActiveLink("/users") ? "active" : ""
                                }`}
                            >
                                Users
                            </span>
                        </Link>

                        <Link href="/products">
                            <span
                                className={`header__nav__item ${
                                    isActiveLink("/products") && "active"
                                }`}
                            >
                                Products
                            </span>
                        </Link>

                        <Link href="/orders">
                            <span
                                className={`header__nav__item ${
                                    isActiveLink("/orders") && "active"
                                }`}
                            >
                                Orders
                            </span>
                        </Link>
                    </div>
                    <div className="header__logout">
                        <Button title={"Logout"} clickHandler={handleLogout} />
                    </div>
                </div>
            ) : null}
        </header>
    );
};

export default Index;
