import "babel-polyfill";
import {store} from "../js/store";
import {euCountries, weatherByCapital} from "../js/apiCalls";
import {bounce, loose} from "../js/events";
import {mapbox, geocodeIt, newMarker} from "../js/mapbox";

const selectedCountry = async (event) => {
	if (event && event.target && event.target.value) {
		const targetValue = event.target.value
		const targetName = event.target.selectedOptions[0].innerText

		const place = await geocodeIt(targetName);
		
		store.oldCountry = store.newCountry;
		store.newCountry = targetName;

		store.oldHeat = store.newHeat;
		store.newHeat = await weatherByCapital(targetValue);

		event.target.selectedOptions[0].setAttribute("disabled", "true")

		if (store.oldHeat < store.newHeat) {
			store.score = store.score + 100;
			document.getElementById("score").textContent = store.score;
			document.getElementById("o-heat").textContent = store.oldHeat;
			document.getElementById("n-heat").textContent = store.newHeat;
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
			loose(store.newHeat);
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