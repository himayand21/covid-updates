import { BASE_API_ROUTE } from "../constants/apiConstants"

export const getBaseData = async () => {
    const response = await fetch(BASE_API_ROUTE);
    const responseJSON = await response.json();
    return responseJSON;
}