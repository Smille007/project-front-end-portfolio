const url = 'https://flashlive-sports.p.rapidapi.com/v1/search/multi-search?query=mess&locale=en_INT';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a3b67fd5ccmsh90f5a7e5d1a53cdp1ea23ajsna4c6728664a5',
		'X-RapidAPI-Host': 'flashlive-sports.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}