import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import FetchApi from "@/components/useFetch";
import Edit from "@/components/Edit";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

const Index = ({ title, db_name, Card, Form, add }) => {
    const [dataList, setDataList] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { results, success } = await FetchApi({
                    url: `/api/${db_name}`,
                    method: "GET",
                });
                if (success) {
                    setDataList(results);
                } else {
                    console.log("fetching data failed");
                }
            } catch (error) {
                console.error("Fetching error: ", error);
            }
        };

        fetchData();
    }, [db_name]);

    const deleteData = async (id) => {
        try {
            await FetchApi({ url: `/api/${db_name}/${id}`, method: "DELETE" });
            setDataList(dataList.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Deletion error: ", error);
        }
    };

    return (
        <>
            {openForm && (
                <Edit
                    setIsOpen={setOpenForm}
                    data={selectedData}
                    edit={isEdit}
                    FormData={Form}
                    db_name={db_name}
                    setDataList={setDataList}
                    dataList={dataList}
                />
            )}

            <div className={styles.listContainer}>
                <h1 className={styles.listTitle}>{title}</h1>
                {dataList.map((data) => (
                    <div
                        key={data.id}
                        className={`${styles.list} ${
                            title === "product" ? styles.small : ""
                        }`}
                    >
                        <Card data={data} />
                        <div className={styles.flexrow}>
                            <Button
                                className="red"
                                clickHandler={() => deleteData(data.id)}
                                title="delete"
                            />
                            <Button
                                clickHandler={() => {
                                    setSelectedData(data);
                                    setOpenForm(true);
                                    setIsEdit(true);
                                }}
                                title="edit"
                            />
                            <Link href={`/${db_name}/${data.id}`}>
                                <Button title="view" />
                            </Link>
                        </div>
                    </div>
                ))}
                {add && (
                    <Button
                        clickHandler={() => {
                            setSelectedData(null);
                            setOpenForm(true);
                            setIsEdit(false);
                        }}
                        title="add"
                    />
                )}
            </div>
        </>
    );
};

export default Index;
