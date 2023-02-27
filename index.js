let inputEL = document.querySelector('.location-input')
const errorMsg =  document.getElementById('errorMsg')
const render = document.getElementById('render')

let locationName = ``
document.getElementById('btn').addEventListener('click', () => {

        locationName = inputEL.value
        if(locationName.length < 1){
            errorMsg.style.display = 'block'
            errorMsg.textContent = "Please Enter City Name"
            render.style.display = 'none'
            console.log(locationName.length)
        } else{
            render.style.display = 'block'
            errorMsg.style.display = 'none'
            console.log(locationName)
            inputEL.value = ""
            getWhetherData()
        }
    })


const getWhetherData = () => {
   let url = `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${locationName}&units=metric` 
    fetch(url).then(res => {
        if(!res.ok){
            throw Error("Something Error Occured")
        }
        return res.json()
    })
    .then(data => {

        if(data.cod ==='404'){
            errorMsg.style.display = 'block'
            errorMsg.textContent = "Enter Correct City Name"
            render.style.display = 'none'
        } else{
            render.style.display = 'block'
            errorMsg.style.display = 'none'

            let imgSrc
            console.log(data)
            console.log(data.weather[0].main)
            if(data.weather[0].main == 'Clear'){
                imgSrc = `clear.svg`
            } else if(data.weather[0].main == 'Mist'){
                imgSrc = 'mist.svg'
            } else if(data.weather[0].main == 'Clouds'){
                imgSrc = 'cloudy.svg'
            } else if(data.weather[0].main == 'Rain'){
                imgSrc = 'rain.svg'
            } else if(data.weather[0].main == 'Snow'){
                imgSrc = 'snow.svg'
            } else if(data.weather[0].main == 'Smoke'){
                imgSrc = 'smoke.svg'
            } else if(data.weather[0].main == 'Haze'){
                imgSrc = 'haze.svg'
            }
            render.innerHTML = `
            
            <div class="weather-container">
            <img src="/images/${imgSrc}" alt="" class="weather-img">
            <h1 class="temp">${Math.round(data.main.temp)}<sup class="deg">°C</sup></h1>
            <h2 class="weather-condition">${data.weather[0].main}</h2>

                <div class="weather-details">
                    <div class="humidity-container">
                    <p class="humidity-percent">${data.main.humidity}%</p>
                    <p class="humidity">Humidity</p>
                    </div>
                    
                    <p class="city-name">${data.name}</p>
                    
                    <div class="wind-container">
                    <p class="wind-percent">${data.wind.speed}Km/h</p>
                    <p class="wind">Windspeed</p>
                    </div>
                    </div>
                    </div>`
                }
                    
                })
            }