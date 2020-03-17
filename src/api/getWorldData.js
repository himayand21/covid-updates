import { WORLD_API_ROUTE } from "../constants/apiConstants"

export const getWorldData = async () => {
    const response = await fetch(WORLD_API_ROUTE);
    if (!response.ok) throw response;
    else {
        const responseJSON = await response.json();
        return responseJSON;
    }
}