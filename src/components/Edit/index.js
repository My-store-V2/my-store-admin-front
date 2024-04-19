import Modal from "@/components/UI/Modal";

import Button from "@/components/UI/Button";
import { useEffect, useState } from "react";
import FetchApi from "../useFetch";
import { toast } from "react-hot-toast";

const Index = ({
  setIsOpen,
  data,
  FormData,
  db_name,
  dataList,
  setDataList,
}) => {
    const [dataForm, setDataForm] = useState();
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(null);
    const [Loading, setLoading] = useState(false);


  // handle change input
  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  // handle image input
  const handleImage = async (e) => {
    if (e?.target?.files[0] == undefined || e?.target?.files[0] == null)
      return console.log("no image");

    // preview image
    const preview_url = URL.createObjectURL(e.target.files[0]);
    // convert image to base64 and set it to dataForm state
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async () => {
      const base64 = reader.result;
      setDataForm({
        ...dataForm,
        [e.target.name + "_name"]: e.target.files[0].name,
        [e.target.name + "_base64"]: base64,
        [e.target.name]: preview_url,
      });
    };
  };

  // delete element (image, file, video, etc...)
  const deleteElement = async (name) => {
    setDataForm({ ...dataForm, [name]: "" });
  };

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


          setIsOpen(false);
          toast.success("Vos modifications ont été envoyées avec succès !");
        })
        .catch((error) => {
          console.log("error : ", error);
          toast.error("Une erreur s'est produite. Veuillez réessayer.");
        });
    } else {
      FetchApi({
        url: `/api/${db_name}`,
        method: "POST",
        body: dataForm,
      })
        .then((response) => {
          setDataList([...dataList, response.results]);
          setIsOpen(false);
          toast.success("Votre creation a été envoyée avec succès !");
        })

                } catch (error) {
                    console.error("Failed to submit form: ", error.message); // Affichage plus clair des erreurs dans la console
                    setError(error.message);
                } finally {
                    setLoading(false);
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
