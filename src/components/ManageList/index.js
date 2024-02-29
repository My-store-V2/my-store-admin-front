'use client';
import styles from "@/app/page.module.scss";
import { useEffect, useState } from "react";
import FetchApi from '@/components/useFetch'
import Edit from '@/components/Edit'
import Link from 'next/link'
import Button from '@/components/UI/Button'

// appelé apres avoir remplie le form,
// il doit fetch la bonne route en fonction des args

const Index = ({ title, db_name, Card, Form }) => {
    const [dataList, setDataList] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedData, setSelectedData] = useState()
    const [isEdit, setIsEdit] = useState(false)

    const fetchData = () => {
        FetchApi({ url: `/api/${db_name}`, method: 'GET'}).then(({ results, success }) => {
            if (success) {
                console.log("result : ", results)
                setDataList(results)
            } else {
                console.log("success : ", success)
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteData = async (data) => {
        FetchApi({ url: `/api/${db_name}/${data}`, method: 'DELETE' }).then(({ results, success }) => {
            if (success) {
                console.log("result : ", results)
                fetchData()
            } else {
                console.log("success : ", success)
            }
        })
    }

    return (
        <>
            {
                // formulaire ajouter supprimer et modifier utilisateur ou article en absolute
                openForm && (
                    <Edit
                        setIsOpen={setOpenForm}
                        data={selectedData}
                        edit={isEdit}
                        FormData={Form}
                        db_name={db_name}
                    />
                )
            }

            <h1>{title}</h1>
            {
                dataList.map((data) => (
                    <div key={data.id} className={`${styles.list}`}>
                        <Card key={data.id} data={data} />
                        <div className={`${styles.flexrow}`}>
                            <Button className={'red'} clickHandler={() => deleteData(data.id)} title={'delete'} />
                            <Button clickHandler={() => { setSelectedData(data); setOpenForm(true); setIsEdit(true); }} title={'edit'}/>
                            <Link href={`/${db_name}/${data.id}`}>
                                <p>voir</p>
                            </Link>
                        </div>
                    </div>
                ))
            }
            <button onClick={() => {
                setSelectedData(null)
                setOpenForm(true)
                setIsEdit(false)
            }}>add</button>
        </>
    );
}
export default Index;