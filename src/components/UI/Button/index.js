import styles from './index.module.scss'

const Index = ({ type, title, clickHandler, className }) => {
    return (
        <button className={`${styles.Button} ${styles[className]}`} type={type} onClick={clickHandler}>{title}</button>
    );
}

export default Index;