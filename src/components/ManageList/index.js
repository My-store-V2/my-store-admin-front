'use client';
import { useCallback, useEffect, useState } from "react";
import FetchApi from '@/components/useFetch'
import Edit from '@/components/Edit'

// appelé apres avoir remplie le form,
// il doit fetch la bonne route en fonction des args

const Index = ({ title, db_name, Card, Form }) => {
    const [dataList, setDataList] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedData, setSelectedData] = useState()
    const [isEdit, setIsEdit] = useState(false)

    const method = "GET";


    const fetchData = () => {
        FetchApi({ url: `/api/${db_name}`, method: 'GET' }).then(({ results, success }) => {
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
                    />
                )
            }

            <h1>{title}</h1>
            {
                dataList.map((data) => (
                    <div key={data.id}>
                        <Card key={data.id} data={data} />
                        <button onClick={() => deleteData(data.id)}>delete</button>
                        <button onClick={() => {
                            setSelectedData(data)
                            setOpenForm(true)
                            setIsEdit(true)
                        }}>edit</button>
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