import { COUNTRIES_API_ROUTE } from "../constants/apiConstants"

export const getCountries = async () => {
    const response = await fetch(COUNTRIES_API_ROUTE);
    if (!response.ok) throw response;
    else {
        const responseJSON = await response.json();
        const {countries} = responseJSON;
        const countryList = countries.map(({name, iso3}) => {
            return ({
                label: name,
                value: iso3
            })
        })
        return countryList;
    }
}