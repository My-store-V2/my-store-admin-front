import styles from './index.module.scss'

const Index = ({ data: user }) => {
    return (
        <div className={styles.container}>
            <p>{user.firstname} {user.lastname}</p>
            <p>{user.email}</p>
            <p>{user.city}</p>
            <p>admin : {user.admin ? 'true' : 'false' }</p>
        </div>
    );
}

export default Index;