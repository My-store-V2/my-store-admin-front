import styles from './index.module.scss'

const Index = ({ data: user }) => {
    return (
        <div className={styles.container}>
            <h1>{user.firstname} {user.lastname}</h1>
            <p>{user.email}</p>
            <p>{user.city}</p>
            <p>is admin : {user.admin ? 'true' : 'false' }</p>
        </div>
    );
}

export default Index;