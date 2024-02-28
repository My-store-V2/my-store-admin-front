const Index = async ({method, db_name}) => {
    console.log('method: ', method);
    const response = await fetch(`http://localhost:3030/api/${db_name}`, {
        headers: {
            "Content-Type":"Application/json"
        },
        method: method
        // body: JSON.stringify({body})
    })
    console.log(response.json())
    return response.json();
}
export default Index;