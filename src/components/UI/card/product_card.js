import styles from "./index.module.scss";

const Index = ({ data: product }) => {
    return (
        <div className={styles.flexrow}>
            <img src={product.thumbnail} alt={product.name} width={"100px"} />
            <div className={styles.productText}>
                <h1>{product.name}</h1>
                <p>{product.price} EUR</p>
            </div>
        </div>
    );
};

export default Index;
