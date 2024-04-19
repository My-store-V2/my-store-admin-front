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
}) => {
  const [dataForm, setDataForm] = useState();
  const [edit, setEdit] = useState(false);

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

  useEffect(() => {
    if (data != undefined) {
      setDataForm(data);
      setEdit(true);
    }
  }, [data]);

  // submit form (edit or add data)
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(dataForm.id);
    if (edit) {
      const result = FetchApi({
        url: `/api/${db_name}/${dataForm.id}`,
        method: "PUT",
        body: dataForm,
      })
        .then((response) => {
          setDataList(
            dataList.map((data) =>
              data.id == response.results.id ? response.results : data
            )
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

        .catch((error) => {
          console.log("error : ", error);
        });
    }
  };

  // modal component
  return (
    <Modal title={edit ? "Modify" : "Add"} closeModal={() => setIsOpen(false)}>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}>
        {/* form data initiated in props */}
        <FormData
          dataForm={dataForm}
          handleChange={handleChange}
          handleImage={handleImage}
          deleteElement={deleteElement}
        />
        {(edit && (
          <Button type="submit" className="btn__primary" title="Modify" />
        )) || <Button type="submit" className="btn__primary" title="Add" />}
      </form>
    </Modal>
  );
};

export default Index;
