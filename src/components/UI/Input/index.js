const Index = ({ label, name, value, placeholder, type, onChange, isRequired }) => {
    return (
      <>
        {
          label && (
            <label htmlFor={name}>{label}</label>
          )
        }
        <input type={type} name={name} id={name} value={value} required={isRequired} placeholder={placeholder} onChange={onChange}/>
      </>
    );
  }
    
  export default Index;