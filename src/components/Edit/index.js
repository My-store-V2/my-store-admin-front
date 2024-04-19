import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FetchApi from "../useFetch";
import { toast } from "react-hot-toast";

const Index = ({
    setIsOpen,
    data,
    FormData,
    db_name,
    dataList,
    setDataList,
    product,
}) => {
  const [dataForm, setDataForm] = useState();
  const [edit, setEdit] = useState(false);

    console.log("dataForm : ", dataForm);

    // handle change input
    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        console.log("Input name: ", name);
        console.log("Input type: ", type);

        if (type === "file") {
            const file = files[0];
            console.log("Uploaded file: ", file.name);
            setDataForm({ ...dataForm, [name]: file });
        } else {
            setDataForm({ ...dataForm, [name]: value });
        }

    };
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
        if (edit) {
            // run edit request
            const result = FetchApi({
                url: `/api/${db_name}/${dataForm.id}`,
                method: edit ? "PUT" : "POST",
                body: product ? formData : JSON.stringify(dataForm),
                headers: product ? {} : { "Content-Type": "application/json" },
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
                });
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
                });
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
                {/* form data initiated in props */}
                <FormData
                    dataForm={dataForm}
                    handleChange={handleChange}
                    deleteElement={deleteElement}
                />
                {(edit && (
                    <Button
                        type="submit"
                        className="btn__primary"
                        title="Modify"
                    />
                )) || (
                    <Button
                        type="submit"
                        className="btn__primary"
                        title="Add"
                    />
                )}
            </form>
        </Modal>
    );

};

export default Index;
