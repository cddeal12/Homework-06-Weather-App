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


//When search button is pressed call the weather APIs
searchButton.on("click", function () {
    console.log("HEwwo");
    if (searchInput.val() !== "") {
        cityCall = searchInput.val()
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityCall + "&appid=" + apikey + "&units=imperial",
            method: "GET"
        }).then(function(response) {
            console.log(response);
            weatherHeader.text("Today's Forecast: " + response.name);
            tempWrite.text("Temperature: " + response.main.temp + " Farenheit");
            humidWrite.text("Humidity: " + response.main.humidity + "%");
            windWrite.text("Wind Speed: " + response.wind.speed + " mph");
            uvWrite.text("UV index: " + response.main)
        });
    }
});