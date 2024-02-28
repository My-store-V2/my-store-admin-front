


const Index = ({ data: product }) => {
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <img src={product.thumbnail} alt={product.name} width={"250px"} />
        </div>
    );
}

export default Index;