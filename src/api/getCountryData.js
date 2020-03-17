import { COUNTRY_API_ROUTE } from "../constants/apiConstants";
import { dashboardCountKeys, colors } from "../constants/dashboard";

export const getCountryData = async (country) => {
    const response = await fetch(`${COUNTRY_API_ROUTE}${country}`);
    if (!response.ok) throw response;
    else {
        const responseJSON = await response.json();
        const countryData = dashboardCountKeys.map((dashboardCountKey) => {
            return ({
                label: dashboardCountKey,
                value: responseJSON[dashboardCountKey].value,
                fill: colors[dashboardCountKey].hover,
                country
            })
        })
        return countryData;
    }
}