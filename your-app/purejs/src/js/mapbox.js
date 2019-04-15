import mapboxgl from 'mapbox-gl';
import {mapboxAccessToken} from "../js/config";

import {store} from "../js/store";
export const mapbox = () => {
	mapboxgl.accessToken = mapboxAccessToken;
	store.map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/abalint88/cjue86suc0tjo1fpnzuitbrt9',
		center: [15, 48],
		zoom: 4
	});
}

export const geocodeIt = async place => {
	const fetchedLatlng = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + place + ".json?types=country&access_token=" + mapboxAccessToken)
	const fetchedLatlngData = await fetchedLatlng.json();
	return fetchedLatlngData.features[0].center
}

export const newMarker = (place) => {
	let marker = new mapboxgl.Marker()
	.setLngLat(place)
	.addTo(store.map);
	return marker;
}