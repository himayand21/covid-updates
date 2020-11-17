import { COUNTRY_API_ROUTE } from "../constants/apiConstants";

export const getStateData = async (country) => {
    const response = await fetch(`${COUNTRY_API_ROUTE}${country}/deaths`);
    if (!response.ok) throw response;
    else {
        const responseJSON = await response.json();
        return responseJSON;
    }
}