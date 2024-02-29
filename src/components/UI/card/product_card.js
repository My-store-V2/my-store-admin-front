import styles from './index.module.scss'

const Index = ({ data: product }) => {
    return (
        <div className={styles.flexrow}>
            <img src={product.thumbnail} alt={product.name} width={"250px"} />
            <div className={styles.flexcolumn}>
                <h1>{product.name}</h1>
                <p>{product.price}</p>
            </div>
        </div>
    );
}

export default Index;