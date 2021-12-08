
// Mapping for when the openweather API is used to get the corresponding icon
const openWeatherIconMap = {
    200: "WiThunderstorm",
    201: "WiThunderstorm",
    202: "WiThunderstorm",
    210: "WiLightning",
    211: "WiLightning",
    212: "WiLightning",
    221: "WiLightning",
    230: "WiThunderstorm",
    231: "WiThunderstorm",
    232: "WiThunderstorm",
    300: "WiSprinkle",
    301: "WiSprinkle",
    302: "WiRain",
    310: "WiRainMix",
    311: "WiRain",
    312: "WiRain",
    313: "WiShowers",
    314: "WiRain",
    321: "WiSprinkle",
    500: "WiSprinkle",
    501: "WiRain",
    502: "WiRain",
    503: "WiRain",
    504: "WiRain",
    511: "WiRainMix",
    520: "WiShowers",
    521: "WiShowers",
    522: "WiShowers",
    531: "WiStormShowers",
    600: "WiSnow",
    601: "WiSnow",
    602: "WiSleet",
    611: "WiRainMix",
    612: "WiRainMix",
    615: "WiRainMix",
    616: "WiRainMix",
    620: "WiRainMix",
    621: "WiSnow",
    622: "WiSnow",
    701: "WiFog",
    711: "WiSmoke",
    721: "WiDayHaze",
    731: "WiDust",
    741: "WiFog",
    761: "WiDust",
    762: "WiDust",
    771: "WiCloudyGusts",
    781: "WiTornado",
    800: "WiDaySunny",
    801: "WiCloud",
    802: "WiCloud",
    803: "WiCloudy",
    804: "WiCloudy",
    900: "WiTornado",
    901: "WiStormShowers",
    902: "WiHurricane",
    903: "WiSnowflakeCold",
    904: "WiHot",
    905: "WiWindy",
    906: "WiHail",
    957: "WiStrongWind"
}

// Mapping for when the microsoft API is used to get the corresponding icon
const microsoftIconMap = {
    1: "WiDaySunny",
    2: "WiDaySunnyOvercast",
    3: "WiDayCloudyHigh",
    4: "WiDayCloudy",
    5: "WiDayHaze",
    6: "WiCloud",
    7: "WiCloud",
    8: "WiCloudy",
    11: "WiFog",
    12: "WiShowers",
    13: "WiDayShowers",
    14: "WiDayShowers",
    15: "WiThunderstorm",
    16: "WiDayThunderstorm",
    17: "WiDayThunderstorm",
    18: "WiRain",
    19: "WiRainMix",
    20: "WiDayRainMix",
    21: "WiDayRainMix",
    22: "WiSnow",
    23: "WiDaySnow",
    24: "WiSleet",
    25: "WiSleet",
    26: "WiHail",
    29: "WiRainMix",
    30: "WiHot",
    31: "WiCloud",
    32: "WiWindy",
    33: "WiNightClear",
    34: "WiNightPartlyCloudy",
    35: "WiNightCloudy",
    36: "WiNightAltCloudyHigh",
    37: "WiNightFog",
    38: "WiNightCloudyWindy",
    39: "WiNightShowers",
    40: "WiNightRain",
    41: "WiNightStormShowers",
    42: "WiNightThunderstorm",
    43: "WiNightStormShowers",
    44: "WiNightSnow"

}

/*

    All API calls are rebounded of my server (maxjay.co.uk), this allows for API calls to be cached for a set amount of time
    reducing the amount of calls are done for testing purposes.

    All server responses with the correct url format recieve *a* response, however tests are needed to make sure 

*/


// Function that given a date (object or string) and a timezone, it returns a Date object of the date given in the specified timezone, allowing
// for the same Date object manipulation as standard
export function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

// Function to get MinuteData from Microsoft
// This is used to provide data for the rainchart
export function getMinuteDataMicrosoft(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=microsoft&type=minutely&lat=" + sdata.lat + "&lon=" + sdata.lon;
    console.log("API: URL: ", url);                                                                                 // Console Log the url for debugging
    return fetch(url)                                                                                               // Return the promise to be used if needed
    .then(res => res.json())                                                                                        // The response from the server is always in json format 
    .then(result => {                                                                                                   
        if (result["intervals"]) {                                                                                  // If the response has the data included
            let minutely = result["intervals"].map(function(item) {                                                 // Map the data appropriately to be used later
                return (
                    {
                        minute: item.minute,
                        intensity: item.dbz
                    }
                )
            });
            minutely["summary"] = result["summary"];                                                                // Include the summary as custom summaries are given for rain and theyre helpful
            if (callBack) {                                                                                         // If callBack is defined, call it with the data that was recieved and mapped
                callBack({minutely: minutely});
            }
        }
    });
}

// Function to get HourData from Microsoft
// This is used to provide hourly data for the current day (and a bit more)
export function getHourDataMicrosoft(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=microsoft&type=hourly&lat=" + sdata.lat + "&lon=" + sdata.lon;
    console.log("API: URL: ", url);                                                                                 // Console log the url for debugging
    return fetch(url)                                                                                               // Return the promise to be used if needed
    .then(res => res.json())                                                                                        // The response from the server is always in json format
    .then(result => {
        if (result["forecasts"]) {                                                                                  // If the response has the data included
            let hourly = result["forecasts"].slice(0, 29).map(function(item) {                                      // Map the data appropriately to be used later
                return (
                    {
                        time: convertTZ(item.date, sdata.timezone),                                                 // TimeZones are provided, convert the time given from the response to a Date object with correct TimeZones
                        temperature: item.temperature.value,                                                    
                        weatherIcon: microsoftIconMap[item.iconCode],                                               // Map the given icon to our internal icon
                        weatherDesc: item.iconPhrase,
                        wind:item.wind
                    }
                )
            });
            if (callBack) {                                                                                         
                callBack({hourly: hourly});                                                                         // If callBack is defined, call it with the data that was recieved and mapped
            }
        }
    });
}

// Function to get DailyData from Microsoft
// This is used to provide daily data for the next week (and a bit more)
export function getDailyDataMicrosoft(sdata, callBack) {                                    
    let url = "https://maxjay.dev/weatherAppData.php?api=microsoft&type=daily&lat=" + sdata.lat + "&lon=" + sdata.lon;
    console.log("API: URL: ", url);                                                                                 // Console log the url for debugging
    return fetch(url)                                                                                               // Return the promise to be used if needed
    .then(res => res.json())                                                                                        // The response from the server is always in json format
    .then(result => {
        if (result["forecasts"]) {                                                                                  // If the response has the data included
            let daily = result["forecasts"].map(function(item) {                                                    // Map the data appropriately to be used later
                return (
                    {
                        time: convertTZ(item.date, sdata.timezone),                                                 // TimeZones are provided, convert the time given from the response to a Date object with correct TimeZones 
                        temperature: (item.temperature.maximum.value + item.temperature.minimum.value) / 2,         // Average the temperature to get day temperature
                        weatherIcon: microsoftIconMap[item.day.iconCode],                                           // Map the given icon to our internal icon
                        weatherDesc: item.day.iconPhrase,
                        wind:item.day.wind
                    }
                )
            });
            if (callBack) {                                                                                         // If callBack is defined, call it with the data that was recieved and mapped
                callBack({daily: daily});
            }
        }
    });
}

// Function to get Minutely, Daily and Hourly data from OpenWeath
export function getOpenWeatherData(sdata, callBack) {
    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + sdata.lat + "&lon=" + sdata.lon + "&appid=c695a976493f941bab51ff0dd89acb52" + "&units=metric";
    return fetch(url)                                                                                              // Return the promise to be used if needed
    .then(res => res.json())                                                                        
    .then(result => {
        console.log("API: URL: ", url)                                                                             // Console log the url for debugging
        let daily = result["daily"].map(function(item) {                                                           // Map the daily data provided by the server
            return (
                {
                    time: convertTZ(new Date(item.dt*1000), sdata.timezone),                                       // TimeZones are provided, convert the time given from the response to a Date object with correct TimeZones 
                    temperature: item.temp.day,
                    weatherIcon: openWeatherIconMap[item.weather[0].id],                                           // Map the given icon to our internal icon
                    weatherDesc: item.weather[0].description,
                    wind: {speed:{value: item.wind_speed*3.6}}                                                     // Convert for formatting
                }
            )
        });
        let startTime = convertTZ(new Date(result["hourly"][0].dt * 1000), sdata.timezone)                         // Get the start time for hourly data
        let hourly = result["hourly"].slice(0, 29 - startTime.getHours()).map(function(item) {                     // Calculate how many hours are left in the day (+ 5) and map the item accordingly
            return (
                {
                    time: convertTZ(new Date(item.dt*1000), sdata.timezone),                                       // TimeZones are provided, convert the time given from the response to a Date object with correct TimeZones 
                    temperature: item.temp,
                    temperatureApparent: item.feels_like,                                                          
                    weatherIcon: openWeatherIconMap[item.weather[0].id],                                           // Map the given icon to our internal icon
                    weatherDesc: item.weather[0].description,
                    wind: {speed:{value: item.wind_speed*3.6}}                                                     // Convert for formatting
                }
            )
        });
        let minutely = result["minutely"].map(function(item) {
            return (
                {
                    time: convertTZ(new Date(item.dt*1000), sdata.timezone),
                    intensity: item.precipitation
                }
            )
        });
        console.log("API: FETCHING DATA (OPENWEATHER): ", daily, "\n\t\t\t\t  ", hourly, "\n\t\t\t\t  ", minutely); //Console log results for debugging
        if (callBack) {
            callBack({hourly: hourly, minutely: minutely, daily: daily});
        }
    });
}


// Function to suggest places based on what the user has currently entered
// This uses Google Places API and based on their query, provides 5 locations with placeIds (googles internal system)
export function placeSuggestions(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?input="+sdata;
    return fetch(url)                                                                                             // Return the promise to be used if needed
    .then(res => res.json())
    .then(result => {                                                                                   
        console.log("API URL: ", url);                                                                            // Console log url for debugging
        let suggestions = result["predictions"].map(function(item, i) {                                           // Map the results
            return (
                {
                    main: item.structured_formatting.main_text,                                                   // Provide text to show to the user
                    secondary: item.structured_formatting.secondary_text,                                         // Provide text to show to the user
                    placeId: item.place_id                                                                        // PlaceId to be then used to get the lat/lon for that location
                }
            )
        })
        if (callBack) {                                                                                           // CallBack
            callBack({suggestions: suggestions})
        }
        return result["predictions"];
    });
}


// Function to get the lattitude and longitude of a place given a PlaceId that was recieved from the suggestion function above
// This uses Google Place API and another to include the timezone for the returned lat and lon
export function getGeoCoords(sdata, callBack) {
    //this is an example url, after setting up places api, you have to run this server side due to cors restrictions
    let url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + sdata + "&fields=geometry&%2Cformatted_address&key=YOUR_API_KEY"
  
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let loc = result["result"]["geometry"]["location"];                                                   // Grab the Location
        if (callBack) {                                                                                           // CallBack a dictionary of the results
            callBack({lat: loc.lat, lon: loc.lng, address: result["result"]["formatted_address"], timezone: '"Europe/London"'});
        }
        return loc;
    });
}