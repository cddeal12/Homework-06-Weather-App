Deployed Here: https://cddeal12.github.io/Homework-06-Weather-App/

# Homework-06-Weather-App
This project is a weather and forecast display app that functions on a user's city search. The app is powered by the Openweather api and uses it to call current weather, uv index, and a five-day forecast for the city the user specifies in their search. Additionally, the app saves the cities the user has checked in a list, and clicking on it will automatically search for the city's data again without the need for the user to search manually. The list will not update with the same city twice.

# Method
The entire method of populating the page's weather data is contained in a single function, handleWeather(), which takes no arguments but uses global variables and reads the value of the search bar to make a query of the Openweather api with the appropriate city. In the case of the uv index it also takes the city's coordinates from the initial api return and uses them to make another query. For the 5 day forecast the function populates a div with the appropriate information five times, indexing the coresponding day and time from the Openweather five-day forecast api. The function then checks to see whether the city it just displayed has been displayed before by means of checking an array of all the used city names. If the city has not ben used it is added to the list of cities for the user to click on to pull up the information again.

# Screenshot
![screenshot](https://user-images.githubusercontent.com/70077316/93286610-81992180-f78c-11ea-8f7c-f76e4cdbefc0.PNG)
