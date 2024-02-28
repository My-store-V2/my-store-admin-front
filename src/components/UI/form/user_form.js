
const Index = ({ dataForm: ProductForm, handleChange }) => {

    return (
        <>
            <input
                label="firstname"
                type="text"
                name="firstname"
                value={ProductForm?.firstname}
                required
                placeholder="firstname"
                onChange={(e) => handleChange(e)}
            />
            <input
                label="lastname"
                type="text"
                name="lastname"
                value={ProductForm?.lastname}
                required
                placeholder="lastname"
                onChange={(e) => handleChange(e)}
            />
            <input
                label="email"
                type="email"
                name="email"
                value={ProductForm?.email}
                required
                placeholder="email"
                onChange={(e) => handleChange(e)}
            />
            <input
                label="address"
                type="text"
                name="address"
                value={ProductForm?.address}
                placeholder="address"
                onChange={(e) => handleChange(e)}
            />
            <input
                label="zipcode"
                type="number"
                name="zipcode"
                value={ProductForm?.zipcode}
                placeholder="zipcode"
                onChange={(e) => handleChange(e)}
            />
            <input
                label="city"
                type="text"
                name="city"
                value={ProductForm?.city}
                placeholder="city"
                onChange={(e) => handleChange(e)}
            />
            <input
                label="phone"
                type="number"
                name="phone"
                value={ProductForm?.phone}
                placeholder="phone"
                onChange={(e) => handleChange(e)}
            />
            <input
                label="admin"
                type="checkbox"
                name="admin"
                value={ProductForm?.admin}
                placeholder="admin"
                onChange={(e) => handleChange(e)}
            />
        </>
    );
}

export default Index;
