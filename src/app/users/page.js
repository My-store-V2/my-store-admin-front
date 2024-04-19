"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import FetchApi from "@/components/useFetch";
import Edit from "@/components/Edit";
import Button from "@/components/UI/Button";
import CardUser from "@/components/UI/card/user_card";
import FormUser from "@/components/UI/form/user_form";

export default function Users() {
  const title = "users";
  const db_name = "users";
  const add = false;

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
          FormData={FormUser}
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
            }`}>
            <CardUser data={data} />
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
