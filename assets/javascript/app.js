$(document).ready(function() {

    doInit();

    //current day and time displayed on page load
    function doInit() {
        currentDay();

        //default search displaying on page load
        var city = $("#userInput").val("Sacramento");
        getWeatherInfo(city);
        changeTempF(city);
        changeTempC(city);

        //clears search form on click
        $(city).on("click", function() {
            $("#userInput").val("");
        });
    }
    
    //function for retrieving current day and time
    function currentDay() {
        let currentDay = moment().format('MMMM Do YYYY, h:mm a');
        $("#currentDay").text(currentDay);
    }



    //weather information being retrieved (temp is in Celsius by default until Fahrenheit button is clicked)
    function getWeatherInfo(city) {
    
        var APIKey = "83161a29ff65cf40e504ac5568f7c577";

        var city = $("#userInput").val();

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

            $.ajax({
                url: queryURL,
                method:"GET",
                error: function() {
                    alert("Please enter a valid location.");
                    
                    
                },

                success: (function () {
                    $.ajax({
                        url: queryURL,
                        method:"GET" 
                
                    }).then(function(response) {

                        $(".speed").text("Speed: " + response.wind.speed + " mph");
                        $(".direction").text("Direction: " + response.wind.deg + "°");
                        $(".humidity").text("Humidity: " + response.main.humidity + "%");
                        $(".cityInfo").text(response.name + ", " + response.sys.country);
                        $(".currentSky").text(response.weather[0].main);

                        
                        $(".sunrise").text(displayTime(response.sys.sunrise));
                        $(".sunset").text(displayTime(response.sys.sunset));

                        //formula for converting Kelvin to Celsius and stored in variables
                        var tempC = (response.main.temp - 273.15);
                        var feelsLikeTempC = (response.main.feels_like - 273.15);

                        //temperature will be displayed as whole number
                        $(".currentTemp").text(tempC.toFixed(0) + "°C");
                        $(".feelsLike").text("Feels like " + feelsLikeTempC.toFixed(0) + "°C");

                        //weather icon ids in the api's json matches with .png names in icons folder
                        var weatherIcon= response.weather[0].icon;
                        var iconEl = $(".weather-icon");
                        iconEl.html($(`<img src="./assets/images/icons/${weatherIcon}.png"/>`));

                        //grabbing lat and lon coordinates from this api call to use for next api call
                        var latitude = response.coord.lat;
                        var longitude = response.coord.lon;
                    
                    
                        //One Call API to get 5 day forecast
                        var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + APIKey;
                        
                        $.ajax({
                            url: forecastURL,
                            method:"GET"
                    
                        }).then(function(response) {

                            //displayDate function converts api response's dt property into a date
                            $(".date1").text(displayDate(response.daily[1].dt));
                            $(".date2").text(displayDate(response.daily[2].dt));
                            $(".date3").text(displayDate(response.daily[3].dt));
                            $(".date4").text(displayDate(response.daily[4].dt));
                            $(".date5").text(displayDate(response.daily[5].dt));

                            var weatherIcon1= response.daily[1].weather[0].icon;
                            var iconEl1 = $(".weather-icon1");
                            iconEl1.html($(`<img src="./assets/images/icons/${weatherIcon1}.png"/>`));

                            var weatherIcon2= response.daily[2].weather[0].icon;
                            var iconEl2 = $(".weather-icon2");
                            iconEl2.html($(`<img src="./assets/images/icons/${weatherIcon2}.png"/>`));

                            var weatherIcon3= response.daily[3].weather[0].icon;
                            var iconEl3 = $(".weather-icon3");
                            iconEl3.html($(`<img src="./assets/images/icons/${weatherIcon3}.png"/>`));

                            var weatherIcon4= response.daily[4].weather[0].icon;
                            var iconEl4 = $(".weather-icon4");
                            iconEl4.html($(`<img src="./assets/images/icons/${weatherIcon4}.png"/>`));

                            var weatherIcon5= response.daily[5].weather[0].icon;
                            var iconEl5 = $(".weather-icon5");
                            iconEl5.html($(`<img src="./assets/images/icons/${weatherIcon5}.png"/>`));

                            var highTempC1 = (response.daily[1].temp.max - 273.15);
                            var lowTempC1 = (response.daily[1].temp.min - 273.15);
                            var highTempC2 = (response.daily[2].temp.max - 273.15);
                            var lowTempC2 = (response.daily[2].temp.min - 273.15);
                            var highTempC3 = (response.daily[3].temp.max - 273.15);
                            var lowTempC3 = (response.daily[3].temp.min - 273.15);
                            var highTempC4 = (response.daily[4].temp.max - 273.15);
                            var lowTempC4 = (response.daily[4].temp.min - 273.15);
                            var highTempC5 = (response.daily[5].temp.max - 273.15);
                            var lowTempC5 = (response.daily[5].temp.min - 273.15);

                            $(".high-temp1").text("High: " + highTempC1.toFixed(0) + "°C");
                            $(".low-temp1").text("Low: " + lowTempC1.toFixed(0) + "°C");
                            $(".high-temp2").text("High: " + highTempC2.toFixed(0) + "°C");
                            $(".low-temp2").text("Low: " + lowTempC2.toFixed(0) + "°C");
                            $(".high-temp3").text("High: " + highTempC3.toFixed(0) + "°C");
                            $(".low-temp3").text("Low: " + lowTempC3.toFixed(0) + "°C");
                            $(".high-temp4").text("High: " + highTempC4.toFixed(0) + "°C");
                            $(".low-temp4").text("Low: " + lowTempC4.toFixed(0) + "°C");
                            $(".high-temp5").text("High: " + highTempC5.toFixed(0) + "°C");
                            $(".low-temp5").text("Low: " + lowTempC5.toFixed(0) + "°C");
                            

                        })
                   
                    })
                })  
            });
    }


            

    //event listener for search button
    $(".search-button").on("click", function(event) {
        
        event.preventDefault();

        var inputCity = $("#userInput").val().trim();

        getWeatherInfo(inputCity);
        changeTempF(inputCity);
        changeTempC(inputCity);


        recentSearch();

        let linkArray = $(".nav-link");
        

        if (linkArray.length > 8) {
            $(".history a:last-child").remove();

        }
        $("#userInput").val("");


     });

     //prevents page reload on "enter", as well as doing the same function as clicking the search button
     $("#userInput").keypress(function (e) {                                       
        if (e.which == 13) {
             e.preventDefault();

             var inputCity = $("#userInput").val().trim();

        getWeatherInfo(inputCity);
        changeTempF(inputCity);
        changeTempC(inputCity);


        recentSearch();

        let linkArray = $(".nav-link");
        

        if (linkArray.length > 8) {
            $(".history a:last-child").remove();

        }
        $("#userInput").val("");
               
        }

     });
    

     //function for changing the temperature to Fahrenheit when the button is clicked
    function changeTempF() {
     
        $("#option2").on("click", function() {
            console.log("click");

            var APIKey = "83161a29ff65cf40e504ac5568f7c577";

            var city = $("#userInput").val();
    
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
            
                $.ajax({
                    url: queryURL,
                    method:"GET",
                     
                }).then(function(response) {

                    //formula for converting Kelvin to Fahrenheit and stored in variables 
                    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                    var feelsLikeTempF = (response.main.feels_like - 273.15) * 1.80 + 32;

                    $(".currentTemp").text(tempF.toFixed(0) + "°F");
                    $(".feelsLike").text("Feels like " + feelsLikeTempF.toFixed(0) + "°F");

                        var latitude = response.coord.lat;
                        var longitude = response.coord.lon;
                    
                    
                        //One Call API to get 5 day forecast
                        var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + APIKey;
                        
                        $.ajax({
                            url: forecastURL,
                            method:"GET"
                    
                        }).then(function(response) {


                            var highTempF1 = (response.daily[1].temp.max - 273.15) * 1.80 + 32;
                            var lowTempF1 = (response.daily[1].temp.min - 273.15) * 1.80 + 32;
                            var highTempF2 = (response.daily[2].temp.max - 273.15) * 1.80 + 32;
                            var lowTempF2 = (response.daily[2].temp.min - 273.15) * 1.80 + 32;
                            var highTempF3 = (response.daily[3].temp.max - 273.15) * 1.80 + 32;
                            var lowTempF3 = (response.daily[3].temp.min - 273.15) * 1.80 + 32;
                            var highTempF4 = (response.daily[4].temp.max - 273.15) * 1.80 + 32;
                            var lowTempF4 = (response.daily[4].temp.min - 273.15) * 1.80 + 32;
                            var highTempF5 = (response.daily[5].temp.max - 273.15) * 1.80 + 32;
                            var lowTempF5 = (response.daily[5].temp.min - 273.15) * 1.80 + 32;

                            $(".high-temp1").text("High: " + highTempF1.toFixed(0) + "°F");
                            $(".low-temp1").text("Low: " + lowTempF1.toFixed(0) + "°F");
                            $(".high-temp2").text("High: " + highTempF2.toFixed(0) + "°F");
                            $(".low-temp2").text("Low: " + lowTempF2.toFixed(0) + "°F");
                            $(".high-temp3").text("High: " + highTempF3.toFixed(0) + "°F");
                            $(".low-temp3").text("Low: " + lowTempF3.toFixed(0) + "°F");
                            $(".high-temp4").text("High: " + highTempF4.toFixed(0) + "°F");
                            $(".low-temp4").text("Low: " + lowTempF4.toFixed(0) + "°F");
                            $(".high-temp5").text("High: " + highTempF5.toFixed(0) + "°F");
                            $(".low-temp5").text("Low: " + lowTempF5.toFixed(0) + "°F");
                            
                        });
     
                });

            });

    }

    //function for changing back to Celsius when button is clicked, otherwise it will stay in fahrenheit temps
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


                    var tempC = (response.main.temp - 273.15);
                    var feelsLikeTempC = (response.main.feels_like - 273.15);

               
                    $(".currentTemp").text(tempC.toFixed(0) + "°C");
                    $(".feelsLike").text("Feels like " + feelsLikeTempC.toFixed(0) + "°C");


                        var latitude = response.coord.lat;
                        var longitude = response.coord.lon;
                    
                    
                        //One Call API to get 5 day forecast
                        var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + APIKey;
                        
                        $.ajax({
                            url: forecastURL,
                            method:"GET"
                    
                        }).then(function(response) {


                            var highTempC1 = (response.daily[1].temp.max - 273.15);
                            var lowTempC1 = (response.daily[1].temp.min - 273.15);
                            var highTempC2 = (response.daily[2].temp.max - 273.15);
                            var lowTempC2 = (response.daily[2].temp.min - 273.15);
                            var highTempC3 = (response.daily[3].temp.max - 273.15);
                            var lowTempC3 = (response.daily[3].temp.min - 273.15);
                            var highTempC4 = (response.daily[4].temp.max - 273.15);
                            var lowTempC4 = (response.daily[4].temp.min - 273.15);
                            var highTempC5 = (response.daily[5].temp.max - 273.15);
                            var lowTempC5 = (response.daily[5].temp.min - 273.15);

                            $(".high-temp1").text("High: " + highTempC1.toFixed(0) + "°C");
                            $(".low-temp1").text("Low: " + lowTempC1.toFixed(0) + "°C");
                            $(".high-temp2").text("High: " + highTempC2.toFixed(0) + "°C");
                            $(".low-temp2").text("Low: " + lowTempC2.toFixed(0) + "°C");
                            $(".high-temp3").text("High: " + highTempC3.toFixed(0) + "°C");
                            $(".low-temp3").text("Low: " + lowTempC3.toFixed(0) + "°C");
                            $(".high-temp4").text("High: " + highTempC4.toFixed(0) + "°C");
                            $(".low-temp4").text("Low: " + lowTempC4.toFixed(0) + "°C");
                            $(".high-temp5").text("High: " + highTempC5.toFixed(0) + "°C");
                            $(".low-temp5").text("Low: " + lowTempC5.toFixed(0) + "°C");
                            
                        });
     
                });
                

            });

    }

    //prepending new searches to sidebar 
   function recentSearch() {
    
        var inputCity = $("#userInput").val().trim();
        var newLink = $("<a>").addClass("nav-link text-white p-3 mb-2 sidebar-link").text(inputCity);
        $(newLink).attr("id", "inputCity");
        $(".history").prepend(newLink);

        //adds .current class to a link that is clicked
        $(".nav-link").on("click", function() {

            var links = $(".nav-link");
    
            for (var i = 0; i < links.length; i++) {
                $(links[i]).removeClass("current");
    
            }
    
            $(this).addClass("current");
        });
        
    }

    function displayDate(data) {
        let timeStamp = data;
        let date = new Date(timeStamp * 1000);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let returnDate = month + "/" + day;
        return returnDate;
    }

    function displayTime(data) {
        let timeStamp = data;
        let date = new Date(timeStamp*1000);
        let hour = date.getHours();
        let minutes = addZero(date.getMinutes());
        let returnDate = hour + ":" + minutes;
        return returnDate;

    }

    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      

   
});






