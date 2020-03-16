import { DAILY_API_ROUTE } from "../constants/apiConstants"

export const getDailyData = async () => {
    const response = await fetch(DAILY_API_ROUTE);
    if (!response.ok) throw response;
    else {
        const responseJSON = await response.json();
        return responseJSON;
    }
}