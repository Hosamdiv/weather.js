

document.addEventListener('DOMContentLoaded', () => {
    let container = document.querySelector(".container");
    let search = document.querySelector(".search-box button");
    let weatherBox = document.querySelector(".weather-box");
    let weatherDetails = document.querySelector(".weather-details");
    
    search.addEventListener('click', () => {
        const APIkey = "183850d15b30b81c435aa64a7881472c";
        const city = document.querySelector(".search-box input").value;
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(json => {
                let image = document.querySelector(".weather-box img");
                let temperature = document.querySelector(".weather-box .box");
                let description = document.querySelector(".weather-box .temp");
                let humidity = document.querySelector(".weather-box .humidity");
                let wind = document.querySelector(".weather-box .wind");
    
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = "images/clear.png";
                        break;
                    case 'Rain':
                        image.src = "images/rain.png";
                        break;
                    case 'Snow':
                        image.src = "images/snow.png";
                        break;
                    case 'Clouds':
                        image.src = "images/clouds.png";
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = "images/mist.png";
                        break;
                    default:
                        image.src = "images/default.png";
                }
    
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°c</span>`;
                description.innerHTML = json.weather[0].description;
                humidity.innerHTML = `${json.main.humidity}<span>%</span>`;
                wind.innerHTML = `${parseInt(json.wind.speed)}<span>km/h</span>`;
                
                // Show weather details container
                // weatherDetails.style.display = "block";
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    });

});

