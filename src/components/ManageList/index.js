'use client';
import { useCallback, useEffect, useState } from "react";
import useFetch from '@/components/useFetch'

// appelé apres avoir remplie le form,
// il doit fetch la bonne route en fonction des args

const Index = ({title, db_name}) => {
    const [dataList, setDataList] = useState([]);
    // const [openForm , setOpenForm] = useState(false);
    // const [selectedData, setSelectedData] = useState()

    const method = "GET";
    useEffect(()=> {
        useFetch({method});
    }, [])

    // const fetchData = useCallback(() => {
    //     if (title == undefined || id == undefined || db_name == undefined ) {
    //         setMethod(null);
    //         return;
    //     }
    //     if (title == 'modifier') {
    //         setMethod('UPDATE');
    //     } else if (title == 'supprimer') {
    //         setMethod('DELETE');
    //     }
    //     useFetch(method, db_name, id ).then(({result, error}) => {
    //         if (!error) {
    //             let data_array = []
    //             if (result.data() == undefined || result.data()[tab_name] == undefined || result.data()[tab_name].length == 0) {
    //                 setDataArray([])
    //                 return;
    //             }
    //             if (result.data()[tab_name] == undefined || result.data()[tab_name].length == 0) {
    //                 setDataArray([])
    //                 return;
    //             }
    //             for(let data of result.data()[tab_name]) {
    //                 getDocument(collection_name, data.id).then(({result, error}) => {
    //                     if (!error && result.exists()) {
    //                         data_array.push(result)
    //                         setDataArray(data_array)
    //                     } else {
    //                         console.log("error : ", error)
    //                     }
    //                 })
    //             }
    //         } else {
    //             console.log("error : ", error)
    //         }
    //     })
    // }, [page, collection_name, tab_name])

    // const deleteData = async (data) => {
    //     useFetch('DELETE', body)
    // }

    return(
        <>
            {/* {
                // formulaire ajouter supprimer et modifier utilisateur ou article en absolute
                openForm && (
                    <Form></Form>
                )
            } */}

            <h1>User/article</h1>
            {
                dataList.map((data)=> (
                    <div key={data.id}>
                        <h1>{data.name}</h1>
                        <button onClick={()=>{setOpenForm(true); selectedData(data.id);}}>modifier</button>
                    </div>
                ))
            }
            <button>ajouter</button>


        </>
    );
}
export default Index;