const apikey = '30ddfa6f056dce68ac473a75097a5034'
const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=mumbai&aqi=yes';
const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apikey}`;
const locurl = `http://api.openweathermap.org/geo/1.0/direct?q=Mumbai&limit=1&appid=${apikey}`

async function getweather(city){
	let searchedcity = document.querySelector(".search-box").value
	if (searchedcity == ''){
		searchedcity = city
	}
	var { lat, lon , city , state } = await cordinategen(`${searchedcity}`); // Using await to get the coordinates

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
        let background = document.querySelector(".wrapper");
        let dt = document.querySelector(".data-time");
        weatherimg.innerHTML = `<img src="./img/weathericon/${weatherData.weather[0].icon}.png" alt="">`;
		cityname.innerHTML = `${city}`
		statename.innerHTML = `${state}`
		condition.innerHTML = `${weatherData.weather[0].description}`
		temp.innerHTML = `${(weatherData.main.temp - 273.15).toFixed(0)}&deg;`;
		let date = new Date();
		let monthNames = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		];
		
		let hours = date.getHours().toString().padStart(2, '0');
		let minutes = date.getMinutes().toString().padStart(2, '0');
		
		let month = monthNames[date.getMonth()];
		let formattedDate = `${date.getDate()} ${month}, ${hours}:${minutes}`;
		

		dt.innerHTML = formattedDate
		if (weatherData.weather[0].icon === "01d") {
			background.style.background = "linear-gradient(120deg, #000000d6, #776004d6)";
			console.log(555);
		} else if (weatherData.weather[0].icon === "01n") {
			background.style.background = "linear-gradient(120deg, #000000d6, #011272)";
		} else if (weatherData.weather[0].icon === "02d") {
			background.style.background = "linear-gradient(120deg, rgb(1, 66, 66), #312801d6)";
		} else if (weatherData.weather[0].icon === "02n") {
			background.style.background = "linear-gradient(120deg, rgb(0, 15, 15), rgba(43, 42, 41, 0.839))";
		} else if (weatherData.weather[0].icon === "03d" || weatherData.weather[0].icon === "03n") {
			background.style.background = "linear-gradient(120deg, rgb(3, 3, 3), rgba(43, 42, 41, 0.839))";
			console.log(3333);
		} else if (weatherData.weather[0].icon === "04d" || weatherData.weather[0].icon === "04n") {
			background.style.background = "linear-gradient(120deg, rgb(3, 3, 3), rgba(36, 36, 36, 0.839))";
			console.log(4444);
		} else if (weatherData.weather[0].icon === "09d") {
			background.style.background = "linear-gradient(120deg, rgb(41, 37, 27), rgba(2, 66, 61, 0.839))";
		} else if (weatherData.weather[0].icon === "09n") {
			background.style.background = "linear-gradient(120deg, rgb(41, 37, 27), rgba(0, 1, 29, 0.986))";
		} else if (weatherData.weather[0].icon === "10d" || weatherData.weather[0].icon === "10n") {
			background.style.background = "linear-gradient(120deg, rgb(0, 0, 0), rgba(48, 48, 48, 0.986))";
		} else if (weatherData.weather[0].icon === "11d" || weatherData.weather[0].icon === "11n") {
			background.style.background = "linear-gradient(120deg, rgb(0, 0, 0), rgba(48, 48, 48, 0.897))";
		} else if (weatherData.weather[0].icon === "13d" || weatherData.weather[0].icon === "13n") {
			background.style.background = "linear-gradient(120deg, rgb(59, 59, 59), rgba(124, 255, 238, 0.397))";
		} else if (weatherData.weather[0].icon === "50d" || weatherData.weather[0].icon === "50n") {
			background.style.background = "linear-gradient(120deg, rgb(59, 59, 59), rgba(0, 8, 7, 0.397))";
		} else {
			background.style.background = "linear-gradient(120deg, #000000d6, #776004d6)";
		}
		
	}

}

getweather('mumbai')




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


