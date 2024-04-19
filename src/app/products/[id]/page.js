// Indiquez que c'est un composant client si vous utilisez Next.js 12 ou plus avec des composants serveur/client.
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CircumIcon from "@klarr-agency/circum-icons-react";
import FetchApi from "@/components/useFetch";
import Button from '@/components/UI/Button';
import Edit from  '@/components/Edit';
import FormUser from "@/components/UI/form/product_form";
import {Toaster, toast} from 'react-hot-toast';
import "./styles.scss";

export default function Page() {

    const db_name = "products";

    const [dataList, setDataList] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [imgSelected, setImgSelected] = useState(product?.packshot);

    useEffect(() => {
        FetchApi({ url: `/api/products/${id}`, method: "GET" }).then((data) => {
            setProduct(data.results);
            setImgSelected(data?.results.packshot);
        });
    }, [id]);

    const deleteData = async (id) => {
        const confirmDelete = window.confirm(
            "Êtes-vous sûr de vouloir supprimer cet élément ?"
        );
        if (confirmDelete) {    
            try {
                await FetchApi({ url: `/api/${db_name}/${id}`, method: "DELETE" });
                setDataList(dataList.filter((item) => item.id !== id));
                console.log(`Product with ID ${id} deleted successfully`);
                router.push('/products');
                toast.success(`Product deleted successfully`);
            } catch (error) {
                console.error("Deletion error: ", error);
                console.log(`Failed to delete product with ID ${id}`);
                toast.error(`Failed to delete product with ID ${id}`);
            }
        }
    };

    return (
        <>
            <Toaster />
            {openForm && (
                <Edit
                    setIsOpen={setOpenForm}
                    data={selectedData}
                    edit={isEdit}
                    FormData={FormUser}
                    db_name={db_name}
                    setDataList={setDataList}
                    dataList={dataList}
                />
            )}

            <div className="product__container">
                <div className="product__container__header">
                    <div
                        className="product__container__header__back"
                        onClick={() => router.back()}
                    >
                        <CircumIcon name="circle_chev_left" />
                    </div>
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
                                {product?.price} EUR
                            </p>
                        </div>
                        <Button
                            className="red"
                            clickHandler={() => deleteData(user.id)}
                            title="delete"
                        />
                        <Button
                            clickHandler={() => {
                                setSelectedData(user);
                                setOpenForm(true);
                                setIsEdit(true);
                            }}
                            title="edit"
                        />
                    </div>
                )}
            </div>
        </>
    );
}
