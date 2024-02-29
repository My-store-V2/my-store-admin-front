import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";



import { useEffect, useState } from "react";
import FetchApi from "../useFetch";




const Index = ({ setIsOpen, data, FormData, db_name }) => {
    const [dataForm, setDataForm] = useState();
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);


    // handle change input
    const handleChange = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    // handle image input
    const handleImage = async (e) => {
        if (e?.target?.files[0] == undefined || e?.target?.files[0] == null) return console.log("no image")
        setLoading(true)
        // preview image
        const preview_url = URL.createObjectURL(e.target.files[0]);
        // convert image to base64 and set it to dataForm state
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = async () => {
            const base64 = reader.result;
            setDataForm({ ...dataForm, [e.target.name + "_name"]: e.target.files[0].name, [e.target.name + "_base64"]: base64, [e.target.name]: preview_url })
        }
        setLoading(false)
    }




    // delete element (image, file, video, etc...)
    const deleteElement = async (name) => {
        setDataForm({ ...dataForm, [name]: "" })
    }

    useEffect(() => {
        if (data != undefined) {
            setDataForm(data)
            setEdit(true)
        }
    }, [data])



    // submit form (edit or add data)
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (edit) {
            // run edit request
            FetchApi({ url: `/api/${db_name}/${dataForm.id}`, method: 'PUT', body: dataForm}).then(({ message, success }) => {
                if (success) {
                    console.log("result : ", message)
                    setLoading(false)
                    setIsOpen(false)
                } else {
                    console.log("message : ", message)
                    setLoading(false)
                }
            })
        } else {
            // run add request
            FetchApi({ url: `/api/${db_name}/`, method: 'POST', body: dataForm }).then(({ message, success }) => {
                if (success) {
                    console.log("result : ", message)
                    setLoading(false)
                    setIsOpen(false)
                } else {
                    console.log("success : ", message)
                    setLoading(false)
                }
            })
        }
    }

    // modal component
    return (
        <Modal title="data" closeModal={() => setIsOpen(false)}>
            {/* {loading ? <Loading /> : ( */}
            <form onSubmit={(e) => { submitForm(e) }}>
                {/* form data initiated in props */}
                <FormData dataForm={dataForm} handleChange={handleChange} handleImage={handleImage} deleteElement={deleteElement} />
                {edit &&
                    <button type="submit" className="btn__primary" >modifier</button>
                    ||
                    <button type="submit" className="btn__primary" >ajouter</button>
                }
            </form>
            {/* )} */}
        </Modal>
    );
}

export default Index;