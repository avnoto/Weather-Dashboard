$(document).ready(function() {

    doInit();

    //current day and time displayed on page load
    function doInit() {
        currentDay();
    }
    
    //function for retrieving current day and time
    function currentDay() {
        let currentDay = moment().format('MMMM Do YYYY, h:mm a');
        $("#currentDay").text(currentDay);
    }

    //default weather information being retrieved (temp is in Celsius until Fahrenheit button is clicked)
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
                
                //formula for converting Kelvin to Celsius and stored in variables
                var tempC = (response.main.temp - 273.15);
                var feelsLikeTempC = (response.main.feels_like - 273.15);

               //temperature will be displayed as whole number
                $(".currentTemp").text(tempC.toFixed(0) + "°C");
                $(".feelsLike").text("Feels like " + feelsLikeTempC.toFixed(0) + "°C");


            });
    }


            

    //event listener for search button
    $(".search-button").on("click", function(event) {
        
        event.preventDefault();

        var inputCity = $("#userInput").val().trim();

        getWeatherInfo(inputCity);
        changeTempF(inputCity);
        changeTempC(inputCity);

     });

     //function for changing the temperature to Fahrenheit when the button is clicked
    function changeTempF() {
     
        $("#option2").on("click", function() {

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

                    //formula for converting Kelvin to Fahrenheit and stored in variables 
                    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                    var feelsLikeTempF = (response.main.feels_like - 273.15) * 1.80 + 32;

                    $(".currentTemp").text(tempF.toFixed(0) + "°F");
                    $(".feelsLike").text("Feels like " + feelsLikeTempF.toFixed(0) + "°F");
     
                });

            });

    }

    //function for changing back to default (Celsius) when button is clicked 
    function changeTempC() {
     
        $("#option1").on("click", function() {

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


                    var tempC = (response.main.temp - 273.15);
                    var feelsLikeTempC = (response.main.feels_like - 273.15);

               
                    $(".currentTemp").text(tempC.toFixed(0) + "°C");
                    $(".feelsLike").text("Feels like " + feelsLikeTempC.toFixed(0) + "°C");
                    
     
                });

            });

    }






});
