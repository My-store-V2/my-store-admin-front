import styles from './index.module.scss'

const Index = ({ label, name, value, placeholder, type, onChange, isRequired }) => {
    return (
      <div className={`${styles.container}`}>
        {
          label && (
            <label className={`${styles.Label}`} htmlFor={name}>{label}</label>
          )
        }
        <input className={`${styles.Input}`} type={type} name={name} id={name} value={value} required={isRequired} placeholder={placeholder} onChange={onChange}/>
      </div>
    );
  }
    
  export default Index;