import styles from "./index.module.scss";

const Index = ({ data: user }) => {
    return (
        <div className={styles.container}>
            <p className={styles.name}>
                {user.firstname} {user.lastname}
            </p>
        </div>
    );
};

export default Index;
