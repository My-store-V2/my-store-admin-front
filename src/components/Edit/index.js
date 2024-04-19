import Modal from "@/components/UI/Modal";

import Button from "@/components/UI/Button";
import { getCookie } from "cookies-next";

import { useEffect, useState } from "react";
import FetchApi from "../useFetch";

const Index = ({
    setIsOpen,
    data,
    Form,
    db_name,
    dataList,
    setDataList,
    product,
}) => {
    const [dataForm, setDataForm] = useState();
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(null);
    const [Loading, setLoading] = useState(false);

    // handle change input
    const handleChange = (e) => {
        const { name, type, value, files } = e.target;

        if (type === "file") {
            const file = files[0];
            setDataForm({ ...dataForm, [name]: file });
        } else {
            setDataForm({ ...dataForm, [name]: value });
        }
    };

    // delete element (image, file, video, etc...)
    const deleteElement = async (name) => {
        setDataForm({ ...dataForm, [name]: "" });
    };

    useEffect(() => {
        if (data != undefined) {
            setDataForm(data);
            setEdit(true);
        }
    }, [data]);

    // submit form (edit or add data)
    const submitForm = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (edit) {
            if (product) {
                setLoading(true);
                try {
                    const formData = new FormData();
                    for (const key in dataForm) {
                        if (key === "thumbnail" || key === "packshot") {
                            formData.append(key, dataForm[key]);
                        } else {
                            formData.append(key, dataForm[key]);
                        }
                    }

                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/${db_name}/${dataForm.id}`,
                        {
                            method: "PUT",
                            body: formData,
                            headers: {
                                Authorization: `${getCookie("token")}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        // Vérifie le succès de la réponse de façon plus robuste
                        const errorData = await response.json(); // Tentative de récupération du message d'erreur du serveur
                        throw new Error(
                            errorData.message || "Error submitting form"
                        );
                    }

                    const dataJson = await response.json(); // Parse la réponse en JSON si la réponse est un succès

                    setDataList(
                        dataList.map((data) =>
                            data.id == dataJson.results.id
                                ? dataJson.results
                                : data
                        )
                    );

                    setIsOpen(false);
                } catch (error) {
                    console.error("Failed to submit form: ", error.message); // Affichage plus clair des erreurs dans la console
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            } else {
                // run edit request
                const result = FetchApi({
                    url: `/api/${db_name}/${dataForm.id}`,
                    method: edit ? "PUT" : "POST",
                    body: dataForm,
                    headers: product
                        ? {}
                        : { "Content-Type": "application/json" },
                })
                    .then((response) => {
                        setDataList(
                            dataList.map((data) =>
                                data.id == response.results.id
                                    ? response.results
                                    : data
                            )
                        );
                        setIsOpen(false);
                    })
                    .catch((error) => {
                        console.log("error : ", error);
                        setError(error.message);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        } else {
            if (product) {
                setLoading(true);
                try {
                    const formData = new FormData();
                    for (const key in dataForm) {
                        if (key === "thumbnail" || key === "packshot") {
                            console.log("key : ", key);
                            console.log("file : ", dataForm[key]);
                            formData.append(key, dataForm[key]);
                        } else {
                            formData.append(key, dataForm[key]);
                        }
                    }

                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/${db_name}`,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                Authorization: `${getCookie("token")}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        // Vérifie le succès de la réponse de façon plus robuste
                        const errorData = await response.json(); // Tentative de récupération du message d'erreur du serveur
                        throw new Error(
                            errorData.message || "Error submitting form"
                        );
                    }

                    const dataJson = await response.json(); // Parse la réponse en JSON si la réponse est un succès
                    setDataList([...dataList, dataJson.results]);
                    setIsOpen(false);
                } catch (error) {
                    console.error("Failed to submit form: ", error.message); // Affichage plus clair des erreurs dans la console
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            } else {
                // run add request
                FetchApi({
                    url: `/api/${db_name}`,
                    method: "POST",
                    body: dataForm,
                })
                    .then((response) => {
                        setDataList([...dataList, response.results]);
                        setIsOpen(false);
                    })
                    .catch((error) => {
                        console.log("error : ", error);
                        setError(error.message);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    };

    // modal component
    return (
        <Modal
            title={edit ? "Modify" : "Add"}
            closeModal={() => setIsOpen(false)}
        >
            <form
                onSubmit={(e) => {
                    submitForm(e);
                }}
            >
                {error && <p style={{ color: "red" }}>{error}</p>}
                {/* form data initiated in props */}
                <Form dataForm={dataForm} handleChange={handleChange} />
                {(edit && (
                    <Button
                        type="submit"
                        className="btn__primary"
                        title={Loading ? "Modification en cours ..." : "Modify"}
                    />
                )) || (
                    <Button
                        type="submit"
                        className="btn__primary"
                        title={Loading ? "Ajout en cours ..." : "Add"}
                    />
                )}
            </form>
        </Modal>
    );
};

export default Index;
