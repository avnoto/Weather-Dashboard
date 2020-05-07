$(document).ready(function() {

    doInit();

    function doInit() {
        currentDay();
    }
    
    function currentDay() {
        let currentDay = moment().format('MMMM Do YYYY, h:mm a');
        $("#currentDay").text(currentDay);
        };


    //var APIKey = "83161a29ff65cf40e504ac5568f7c577";


















});