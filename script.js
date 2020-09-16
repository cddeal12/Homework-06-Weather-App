//Store global variables

//Html items
var searchButton = $("#search-button");
var searchInput = $("#search-input");
var citiesList = $("#cities-list");
var mainWeather = $("#main-weather");
var fiveDay = $("#five-day");
var weatherHeader = $("#todays-forecast");

// <p> tags for weather info
var tempWrite = $("#temperature");
var humidWrite = $("#humidity");
var windWrite = $("#wind-speed");
var uvWrite = $("#uv-index");

//For Storage
var searchedCities = [];
var queryUrl = "";
var apikey = "995176d5da40c8cd5255df4136c49185";
var cityCall = "";

// For Writing the dates
var date = new Date();
var month = date.getMonth()+1;
var day = date.getDate();
var year = date.getFullYear();
date = month + "/" + day + "/" + year;


//When search button is pressed call the weather handler
searchButton.on("click", function() {
    handleWeather();
});


function handleWeather() {
    if (searchInput.val() !== "") {
        cityCall = searchInput.val()
        // Calls the chosen city and writes the MAIN data to the appropriate divs
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityCall + "&appid=" + apikey + "&units=imperial",
            method: "GET"
        }).then(function(response) {
            weatherHeader.text("Today's Forecast: " + response.name + " (" + date + ")");
            tempWrite.text("Temperature: " + response.main.temp + " Farenheit");
            humidWrite.text("Humidity: " + response.main.humidity + "%");
            windWrite.text("Wind Speed: " + response.wind.speed + " mph");

            //Performs one more ajax call in this function to get uv data
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apikey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
                method: "GET"
            }).then(function(response) {
                uvWrite.text("UV index: ");
                var uvBadge = $("<span>");
                uvBadge.text(response.value);
                uvBadge.addClass("badge");
                //Handles the color change of the UV index
                if (response.value < 3) {
                    uvBadge.attr("style", "background-color: green;")
                } else if (response.value > 3 && response.value < 6) {
                    uvBadge.attr("style", "background-color: orange;")
                } else if (response.value > 6) {
                    uvBadge.attr("style", "background-color: red;")
                };
                uvWrite.append(uvBadge);
            });
        });


        // Calls the city and writes its 5-Day forecast data to divs
        $.ajax({
            url:"http://api.openweathermap.org/data/2.5/forecast?q=" + cityCall + "&appid=" + apikey + "&units=imperial",
            method: "GET"
        }).then(function(response) {

            fiveDay.empty();

            for (i=3, d=1; i<=35; i = i + 8, d++) {
                var foreDay = day + d;
                var newForecast = $("<div>");
                newForecast.addClass("bg-primary mx-4 text-light px-3 py-1 mb-3");
                newForecast.attr("style", "border-radius: 10px");

                // Adds the new date
                var forecastDate = $("<h4>");
                forecastDate.text(month + "/" + foreDay + "/" + year)
                newForecast.append(forecastDate);

                // Adds a weather Icon
                var forecastIcon = $("<img>");
                forecastIcon.attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                newForecast.append(forecastIcon);

                // Adds the temperature
                var tempForecast = $("<p>");
                tempForecast.text("Temp: " + response.list[i].main.temp + " F");
                newForecast.append(tempForecast);

                // Adds the humidity
                var humidForecast = $("<p>");
                humidForecast.text("Humidity: " + response.list[i].main.humidity + "%")
                newForecast.append(humidForecast);

                // Adds the new forecast div
                fiveDay.append(newForecast);
            }
        })

        //Writes the city name to a new button in a list if it is not already there
        if (searchedCities.indexOf(cityCall) == -1 || searchedCities == []) {
            var newCity = $("<li>");
            newCity.addClass("list-group-item");
            newCity.text(cityCall);
            // Add a listener so that when a list item is clicked, call the weather handler with its text as the search.val()
            newCity.on("click", function() {
                console.log("you clicked a list element")
                searchInput.val($(this).text());
                handleWeather();
            });
            citiesList.prepend(newCity);
            searchedCities.push(cityCall);
        }

    }
}