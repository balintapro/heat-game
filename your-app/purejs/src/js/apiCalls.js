import {APIKEY} from "../js/config";

export const euCountries = async () => {
	const fetchedCapital = await fetch(
		"https://restcountries.eu/rest/v2/regionalbloc/eu"
	);
	const fetchedCapitalData = await fetchedCapital.json();
	console.log(fetchedCapitalData)
	return fetchedCapitalData;
};

export const weatherByCapital = async weather => {
	const fetchedWeather = await fetch(
		"https://api.openweathermap.org/data/2.5/weather?q=" + weather + "&APPID=" + APIKEY
	);
	const fetchedWeatherData = await fetchedWeather.json();
	const fetchedWeatherByCapital = await fetchedWeatherData;
	const fahrenheit = fetchedWeatherByCapital.main.temp
	const roundedFahrenheit = Math.round(fahrenheit)
	return roundedFahrenheit -273;
};
