const apikey = '30ddfa6f056dce68ac473a75097a5034'
const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=mumbai&aqi=yes';
const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apikey}`;
const locurl = `http://api.openweathermap.org/geo/1.0/direct?q=Mumbai&limit=1&appid=${apikey}`

async function getweather(){

	let searchedcity = document.querySelector(".search-box").value
	const { lat, lon , city , state } = await cordinategen(`${searchedcity}`); // Using await to get the coordinates

    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
        .then(response => response.json())
        .catch(error => console.log('Error fetching weather data:', error));

	if(weatherData){
		console.log(weatherData)
		let container = document.querySelector(".weather-box");
        let weatherimg = document.querySelector(".main-box-img");
        let cityname= document.querySelector(".city");
        let statename = document.querySelector(".country");
        let condition = document.querySelector(".condition h1");
        let temp = document.querySelector(".temp");
        weatherimg.innerHTML = `<img src="./img/weathericon/${weatherData.weather[0].icon}.png" alt="">`;
		cityname.innerHTML = `${city}`
		statename.innerHTML = `${state}`
		condition.innerHTML = `${weatherData.weather[0].description}`
		temp.innerHTML = `${(weatherData.main.temp - 273.15).toFixed(0)}&deg;`;
	}

}


async function cordinategen(City) {
	const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${City}&limit=1&appid=${apikey}`);
	const data = await response.json();
	console.log(data)
	const lat = data[0].lat;
	const lon = data[0].lon;
	const city = data[0].name;
	const state = data[0].country;
	return { lat, lon, city , state };
}


