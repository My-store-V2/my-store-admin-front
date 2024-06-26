"use client";
import styles from "@/app/page.module.scss";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import FetchApi from "@/components/useFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";
import "./styles.scss";

export default function Page() {
    const router = useRouter();
    const [userForm, setUserForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();

        FetchApi({
            url: `/api/auth/signin`,
            method: "POST",
            body: userForm,
            token: null,
        })
            .then(({ token, success }) => {
                if (success) {
                    setCookie("token", `Bearer ${token}`);
                    router.push("/");
                } else {
                    console.log("success : ", success);
                }
            })
            .catch((error) => {
                console.error("Error fetching: ", error);
            });
    };

    return (
        <div className="login__container">
            <form
                onSubmit={(e) => submit(e)}
                className={`${styles.wrapper} ${styles.small}`}
            >
                <h1
                    style={{
                        marginBottom: "20px",
                    }}
                >
                    Connexion
                </h1>

                <Input
                    label={"Adresse email"}
                    name={"email"}
                    value={userForm.email}
                    placeholder={"email"}
                    type={"email"}
                    onChange={(e) => handleChange(e)}
                    isRequired={true}
                />
                <Input
                    label={"Mot de passe"}
                    name={"password"}
                    value={userForm.password}
                    placeholder={"mot de passe"}
                    type={"password"}
                    onChange={(e) => handleChange(e)}
                    isRequired={true}
                />
                <Button
                    className={"large"}
                    type={"submit"}
                    title={"Se connecter"}
                />
            </form>
        </div>
    );
}
