import styles from './index.module.scss'

const Index = ({ type, title }) => {
    return (
        <button className={`${styles.Button}`} type={type}>{title}</button>
    );
}

export default Index;