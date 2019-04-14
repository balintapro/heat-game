import "babel-polyfill";
import mapboxgl from 'mapbox-gl';

const APIKEY = "19b2288059c1f9dd1164ecaf9ca7b295";
const mapboxAccessToken = "pk.eyJ1IjoiYWJhbGludDg4IiwiYSI6ImNqdWUwamFieTA0amU0NHF4dGF0NXA0ajUifQ.cxLl7qyDfSRk-GM62qT1xA";
const store = { oldCountry: "", oldHeat: "", newCountry: "", newHeat: "", score: 0, map};

const euCountries = async () => {
	const fetchedCapital = await fetch(
		"https://restcountries.eu/rest/v2/regionalbloc/eu"
	);
	const fetchedCapitalData = await fetchedCapital.json();
	console.log(fetchedCapitalData)
	return fetchedCapitalData;
};

const weatherByCapital = async weather => {
	const fetchedWeather = await fetch(
		"http://api.openweathermap.org/data/2.5/weather?q=" + weather + "&APPID=" + APIKEY
	);
	const fetchedWeatherData = await fetchedWeather.json();
	const fetchedWeatherByCapital = await fetchedWeatherData;
	const fahrenheit = fetchedWeatherByCapital.main.temp
	const roundedFahrenheit = Math.round(fahrenheit)
	return roundedFahrenheit;
};

const geocode = async place => {
	const fetchedLatlng = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + place + ".json?types=country&access_token=" + mapboxAccessToken)
	const fetchedLatlngData = await fetchedLatlng.json();
	return fetchedLatlngData.features[0].center
}

const mapbox = () => {
	mapboxgl.accessToken = mapboxAccessToken;
	store.map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/abalint88/cjue86suc0tjo1fpnzuitbrt9',
		center: [15, 48],
		zoom: 4
	});
}

const bounce = () => {
	const plusPoints = document.getElementById("plus-points")
		plusPoints.classList.add('bounce-me');
		setTimeout( () => {
			plusPoints.classList.remove('bounce-me');
		}, 3000);
}

const loose = () => {
	const plusPoints = document.getElementById("lose")
	plusPoints.classList.add('restart-me');
	setTimeout(() => {
		location.reload();
	}, 15000);
}

const newMarker = (place) => {
	let marker = new mapboxgl.Marker()
	.setLngLat(place)
	.addTo(store.map);
	return marker;
}


const selectedCountry = async (event) => {
	if (event && event.target && event.target.value) {
		let targetValue = event.target.value
		let targetName = event.target.selectedOptions[0].innerText

		let place = await geocode(targetName);

		store.oldCountry = store.newCountry;
		store.oldHeat = store.newHeat;

		store.newCountry = targetName;
		store.newHeat = await weatherByCapital(targetValue);

		event.target.selectedOptions[0].setAttribute("disabled", "true")

		if (store.oldHeat < store.newHeat) {
			store.score = store.score + 100;
			document.getElementById("score").textContent = store.score;
			document.getElementById("o-heat").textContent = store.oldHeat - 273;
			document.getElementById("n-heat").textContent = store.newHeat - 273;
			bounce();
			newMarker(place);
			store.map.flyTo({
				center: place,
				zoom: 6,
				speed: 1,
				curve: 2,
			});
		}
		else {
			loose();
		}
	}
};

const main = async () => {
	const select = document.getElementById("select");
	let countries = await euCountries();

	for (let country of countries) {
		let element = document.createElement("option");
		element.textContent = country.name;
		if (country.name == "Faroe Islands" || country.name == "Cyprus") {
			element.value = country.name;
		}
		else if (country.capital) {
			element.value = country.capital;
		}
		else {
			element.value = country.name;
		}
		select.appendChild(element);
	}
	select.addEventListener("change", selectedCountry);
};

main();
selectedCountry();
mapbox();