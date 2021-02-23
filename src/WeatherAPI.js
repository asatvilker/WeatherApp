const weatherCode = {
    0: "Unknown",
    1000: "Clear",
    1001: "Cloudy",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    3000: "Light Wind",
    3001: "Wind",
    3002: "Strong Wind",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm"
}

export function placeSuggestions(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?input="+sdata;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let suggestions = result["predictions"].map(function(item, i) {
            return (
                {
                    main: item.structured_formatting.main_text,
                    secondary: item.structured_formatting.secondary_text,
                    placeId: item.place_id
                }
            )
        })
        if (callBack) {
            callBack({suggestions: suggestions})
        }
        return result["predictions"];
    });
}

export function getGeoCoords(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?placeId=" + sdata;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let loc = result["results"][0]["geometry"]["location"];
        if (callBack) {
            callBack({lat: loc.lat, lon: loc.lng, address: result["results"][0]["formatted_address"]});
            //callBack({lat: loc.lat, lon: loc.lng});
        }
        return loc;
    });
};

export function getMinuteData(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=climacell&type=rain&lat=" + sdata.lat + "&lon=" + sdata.lon;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        console.log(result);
        let rainData = result["data"]["timelines"][0]["intervals"].map(function(item, i) {
            return (
                {
                    type: item.values.precipitationType,
                    intensity: item.values.precipitationIntensity,
                    probability: item.values.precipitationProbability,
                    temperature: item.values.temperature,
                    time: item.startTime,
                    index: i
                }
            )
        });
        if (callBack) {
            callBack({minutely: rainData});
        }
        return rainData;
    });
}

export function getDayForecastClimaCell(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=climacell&type=forecast&lat=" + sdata.lat + "&lon=" + sdata.lon;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let forecast = result["data"]["timelines"][0]["intervals"].map(function(item, i) {
            return ( 
                {
                    time: new Date(item.startTime),
                    temperature: item.values.temperature,
                    weatherCode: item.values.weatherCode,
                    weatherDesc: weatherCode[item.values.weatherCode]
                }
            )
        })
        if (callBack) {
            callBack({daily: forecast});
        }
        return forecast;
    });
}

export function getDayForecastOpenWeather(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=openweather&lat=" + sdata.lat + "&lon=" + sdata.lon;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let forecast = result["daily"].map(function(item, i) {
            return ( 
                {
                    time: new Date(item.dt),
                    temperature: item.temp.day,
                    weatherCode: item.weather[0].icon,
                    weatherType: item.weather[0].main
                }
            )
        })
    });
}

export function getHourForecastOpenWeather(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=openweather&lat=" + sdata.lat + "&lon=" + sdata.lon;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        console.log(result, new Date());
        let forecast = result["hourly"].slice(0, 24).map(function(item, i) {
            return ( 
                {
                    time: new Date(item.dt),
                    temperature: item.temp.day,
                    weatherCode: item.weather[0].icon,
                    weatherType: item.weather[0].main
                }
            )
        })
        console.log(forecast);
    });
}

export function getHourForecastClimaCell(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=climacell&type=now&lat=" + sdata.lat + "&lon=" + sdata.lon;
    console.log(url);
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        console.log(result);
        let forecast = result["data"]["timelines"][0]["intervals"].map(function(item, i) {
            return ( 
                {
                    time: new Date(item.startTime),
                    temperature: item.values.temperature,
                    weatherCode: item.values.weatherCode,
                    weatherDesc: weatherCode[item.values.weatherCode]
                }
            )
        })
        if (callBack) {
            callBack({hourly: forecast});
        }
        return forecast;
    });
}