
const FetchApi = async ({ url, method, body, token }) => {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, 100000);
    });
    try {
        const responsePromise = fetch(`https://backend-api-dev-rob6.onrender.com${url}`, {
            headers: {
                "Content-Type": "Application/json",
                ...token && {
                    "authorization": token
                }
            },
            method: method,
            ...body && {
                body: JSON.stringify(body)
            }
        });

        const response = await Promise.race([responsePromise, timeout]);
        const dataJson = await response.json();

        let status_code = response.status;
        if (status_code < 200 || status_code >= 300) {
            throw new Error(dataJson.message);
        }
        console.log("dataJson : ", dataJson)
        return dataJson;
    }
    catch (error) {
        return Promise.reject(error);
    }

}

export default FetchApi;