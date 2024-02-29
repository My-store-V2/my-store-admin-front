
const Index = ({ dataForm: ProductForm, handleChange, handleImage, deleteElement }) => {
    return (
        <>
            <input
                label="title"
                type="text"
                name="name"
                value={ProductForm?.name}
                required
                placeholder="Product name"
                onChange={(e) => handleChange(e)}
            />
            <input
                label="description courte du Produit"
                type="text"
                name="description"
                value={ProductForm?.description}
                required
                placeholder="Product description"
                onChange={(e) => handleChange(e)}
            />
            <input
                label="prix du Produit"
                type="number"
                name="price"
                value={ProductForm?.price}
                required
                placeholder="Product price"
                onChange={(e) => handleChange(e)}
            />
            {ProductForm?.thumbnail &&
                <>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={ProductForm?.thumbnail}
                    />
                    <button onClick={() => deleteElement("thumbnail")} className="btn__remove" >
                        Supprimer l'image
                    </button>
                </>
            }
            <input
                label="miniature (image)"
                type="file"
                name="thumbnail"
                required={ProductForm?.thumbnail ? false : true}
                placeholder="Article thumbnail"
                onChange={(e) => handleImage(e)}
            />
            {ProductForm?.packshot &&
                <>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={ProductForm?.packshot}
                    />
                    <button onClick={() => deleteElement("packshot")} className="btn__remove" >
                        Supprimer l'image
                    </button>
                </>
            }
            <input
                label="packshot (image)"
                type="file"
                name="packshot"
                required={ProductForm?.packshot ? false : true}
                placeholder="Article packshot"
                onChange={(e) => handleImage(e)}
            />
            <input
                label="désactiver"
                type="checkBox"
                name="active"
                value={ProductForm?.active}
                placeholder="Product Disable"
                onChange={(e) => handleChange(e)}
            />
        </>
    );
}

export default Index;
