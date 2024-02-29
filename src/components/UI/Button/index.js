import styles from './index.module.scss'

const Index = ({ type, title, clickHandler }) => {
    return (
        <button className={`${styles.Button}`} type={type} onClick={clickHandler}>{title}</button>
    );
}

export default Index;