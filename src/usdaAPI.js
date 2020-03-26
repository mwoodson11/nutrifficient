const API_KEY = "KqBwC25CfgRxoNXgvoA3ej3Qxv205mji8YsVpvgo";
const SEARCH_ENDPOINT = query =>
	`https://api.nal.usda.gov/fdc/v1/search/?format=json&generalSearchInput=${query}&sort=r&api_key=${API_KEY}`;
const NUTRIENT_ENDPOINT = fdcId =>
	// `https://api.nal.usda.gov/fdc/v1/nutrients/?format=json&api_key=${API_KEY}&nutrients=203&nutrients=204&nutrients=205&fdcId=${fdcId}`;
	`https://api.nal.usda.gov/fdc/v1/${fdcId}?format=json&api_key=${API_KEY}&foodNutrients.nutrient=203&nutrients=204&nutrients=205`;

export { SEARCH_ENDPOINT, NUTRIENT_ENDPOINT };
