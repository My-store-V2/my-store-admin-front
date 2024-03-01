import styles from "./index.module.scss";

const Index = ({ children, title, closeModal }) => {
    return (
        <>
            <div className={styles.overlay} onClick={closeModal}></div>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <button onClick={closeModal}>
                        <img
                            src="https://circumicons.com/icon/square_remove"
                            alt="close"
                        />
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </>
    );
};

export default Index;
