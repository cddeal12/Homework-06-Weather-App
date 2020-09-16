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

// For Writing the date
var date = new Date();
var month = date.getMonth()+1;
var day = date.getDate();
date = month + "/" + day + "/" + date.getFullYear();


//When search button is pressed call the weather APIs
searchButton.on("click", function () {
    console.log("HEwwo");
    if (searchInput.val() !== "") {
        cityCall = searchInput.val()
        // Calls the chosen city and writes the MAIN data to the appropriate divs
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityCall + "&appid=" + apikey + "&units=imperial",
            method: "GET"
        }).then(function(response) {
            console.log(response);
            weatherHeader.text("Today's Forecast: " + response.name + " (" + date + ")");
            tempWrite.text("Temperature: " + response.main.temp + " Farenheit");
            humidWrite.text("Humidity: " + response.main.humidity + "%");
            windWrite.text("Wind Speed: " + response.wind.speed + " mph");

            //Performs one more ajax call in this function to get uv data
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apikey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
                method: "GET"
            }).then(function(response) {
                console.log(response);
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
            url:
        })
    }
});