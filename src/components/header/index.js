"use client";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import "./styles.scss";

const Index = () => {
    const router = useRouter();

    return (
        <header className="header">
            <div className="header__logo">
                <Link href="/">
                    <span className="header__logo__title">mystore.</span>
                </Link>
            </div>
            {/* <Button
                title={"Logout"}
                clickHandler={() => {
                    deleteCookie("token");
                    router.push("/login");
                }}
            /> */}
        </header>
    );
};

export default Index;
