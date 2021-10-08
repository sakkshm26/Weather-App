let weather = {
    "apiKey" : "79be5ffcc23c8615784d65220e3587a8",
    fetchWeather: function(city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    
    displayWeather: function(data){
        const {name} = data; 
        const {icon,description} = data.weather[0];
        const {temp,feels_like,humidity} = data.main;
        const {speed} = data.wind;

        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.temp').innerText = `${temp}°C`
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind Speed: ${speed} km/h`;
        document.querySelector('.temperature p').innerText = `(Feels Like: ${feels_like}°C)`;
        
        document.querySelector('.weather').classList.remove('loading');

        document.body.style.backgroundImage =
        `url('https://source.unsplash.com/1600x900/?"${name}"')`;
    },

    search: function(){
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
}

document.querySelector('.search button').addEventListener('click', () => {
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', (e) => {
    if(e.key == "Enter")
    weather.search();
});

weather.fetchWeather("Barcelona")
