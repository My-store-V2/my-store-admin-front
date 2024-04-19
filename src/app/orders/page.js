"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import FetchApi from "@/components/useFetch";
import Button from "@/components/UI/Button";
import CardOrder from "@/components/UI/card/order_card";
import { Toaster, toast } from "react-hot-toast";

export default function Orders() {
  const title = "orders";
  const db_name = "orders";
  const add = false;

  const [dataList, setDataList] = useState([]);

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

  const refundedOrder = async (id) => {
    const confirmRefund = window.confirm(
      "Êtes-vous sûr de vouloir rembourser pour cet élément ?"
    );
    if (confirmRefund) {
      try {
        await FetchApi({ url: `/api/${db_name}/${id}`, method: "PUT" });
        setDataList(dataList.filter((item) => item.id !== id));
        console.log(`Order with ID ${id} refunded successfully`);
        toast.success(`Order refunded successfully`);
      } catch (error) {
        console.error("Update error: ", error);
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className={styles.listContainer}>
        <h1 className={styles.listTitle}>{title}</h1>
        {dataList.map((data) => (
          <div
            key={data.id}
            className={`${styles.list} ${
              title === "product" ? styles.small : ""
            }`}>
            <CardOrder data={data} />
            <div className={styles.flexrow}>
              {data.status === "refunded on demand" && (
                <Button
                  className="red"
                  clickHandler={() => refundedOrder(data.id)}
                  title="refund"
                />
              )}
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
