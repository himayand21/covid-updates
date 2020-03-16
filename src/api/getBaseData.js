import { BASE_API_ROUTE } from "../constants/apiConstants"

export const getBaseData = async () => {
    const response = await fetch(BASE_API_ROUTE);
    if (!response.ok) throw response;
    else {
        const responseJSON = await response.json();
        return responseJSON;
    }
}