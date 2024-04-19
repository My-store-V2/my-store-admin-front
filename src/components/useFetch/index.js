import { getCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";

const FetchApi = async ({ url, method, body }) => {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Request timed out"));
        }, 100000);
    });
    try {
        const responsePromise = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${url}`,
            {
                headers: {
                    "Content-Type": "Application/json",
                    authorization: getCookie("token"),
                },
                method: method,
                ...(body && {
                    body: JSON.stringify(body),
                }),
            }
        );

        const response = await Promise.race([responsePromise, timeout]);
        const dataJson = await response.json();

        let status_code = response.status;

        if (status_code == 401) {
            deleteCookie("token");
            window.location.href = "/login";
        }
        // if (status_code < 200 || status_code >= 300) {
        //     throw new Error(dataJson.message);
        // }

        return dataJson;
    } catch (error) {
        throw new Error(error);
    }
};

export default FetchApi;
