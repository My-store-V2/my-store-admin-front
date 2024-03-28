import styles from "./index.module.scss";

const Index = ({ data: order }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formattedDate = formatDate(order.order_date);

    return (
        <div className={styles.container}>
            <p className={styles.name}>
                {order.users.firstname} {order.users.lastname}
            </p>
            <p className={styles.name}> Date : {formattedDate} </p>
            <p className={styles.name}> Status : {order.status} </p>
        </div>
    );
};

export default Index;
