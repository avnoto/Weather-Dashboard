$(document).ready(function() {

    doInit();

    function doInit() {
        currentDay();
    }
    
    function currentDay() {
        let currentDay = moment().format('MMMM Do YYYY, h:mm a');
        $("#currentDay").text(currentDay);
    }


    function getWeatherInfo(city) {
    
        var APIKey = "83161a29ff65cf40e504ac5568f7c577";

        var city = $("#userInput").val();

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

            $.ajax({
                url: queryURL,
                method:"GET"  
            }).then(function(response) {
                console.log(response);

                $(".speed").text("Speed: " + response.wind.speed + " mph");
                $(".direction").text("Direction : " + response.wind.deg + "°");
                $(".humidity").text("Humidity: " + response.main.humidity + "%");
                $(".cityInfo").text(response.name + ", " + response.sys.country);
                $(".sunrise").text("Sunrise " + response.sys.sunrise);
                $(".sunset").text("Sunset " + response.sys.sunset);
                $(".currentSky").text(response.weather[0].main);
                

                var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                var feelsLikeTemp = (response.main.feels_like - 273.15) * 1.80 + 32;

                $(".currentTemp").text(tempF.toFixed(2) + "°F");
                $(".feelsLike").text("Feels like " + feelsLikeTemp.toFixed(2) + "°F");

            });
    }


            


     $(".search-button").on("click", function(event) {
        console.log("click");
        event.preventDefault();

        var inputCity = $("#userInput").val().trim();

        getWeatherInfo(inputCity);

     });


});
