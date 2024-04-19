"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import FetchApi from "@/components/useFetch";
import Edit from "@/components/Edit";
import Button from "@/components/UI/Button";
import CardProduct from "@/components/UI/card/product_card";
import FormUser from "@/components/UI/form/product_form";
import { Toaster, toast } from "react-hot-toast";
export default function Products() {
  const title = "products";
  const db_name = "products";
  const add = true;

  const [dataList, setDataList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

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
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet élément ?"
    );
    if (confirmDelete) {
      try {
        await FetchApi({ url: `/api/${db_name}/${id}`, method: "DELETE" });
        setDataList(dataList.filter((item) => item.id !== id));
        console.log(`Product with ID ${id} deleted successfully`);
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

      <Toaster />

      <div className={styles.listContainer}>
        <h1 className={styles.listTitle}>{title}</h1>
        {dataList.map((data) => (
          <div
            key={data.id}
            className={`${styles.list} ${
              title === "product" ? styles.small : ""
            }`}>
            <CardProduct data={data} />
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
}
