import { COUNTRIES_API_ROUTE } from "../constants/apiConstants"

export const getCountries = async () => {
    const response = await fetch(COUNTRIES_API_ROUTE);
    if (!response.ok) throw response;
    else {
        const responseJSON = await response.json();
        const {countries, iso3} = responseJSON;
        const countryList = Object.entries(countries).map(([label, iso2]) => {
            return ({
                label,
                value: iso3[iso2]
            })
        })
        return countryList;
    }
}