$(document).ready(function(){
// Setup variables for our forecast.io request
var apiKey = 'c71da6cd4fe6cfb58b704f3a5b6b282c';
var apiURL = 'https://api.forecast.io/forecast/' + apiKey;
var defaultLat = '40.6760148';
var defaultLng = '-73.9785012';
/*
1. Request the user's location via their browser
*/
// Request the user's latitude/longitude
if ( Modernizr.geolocation ) {
navigator.geolocation.getCurrentPosition(success, error);
}
else {
// Prompt user
}
// Recieved a latitude/longitude from the browser
function success(position) {
// console.log(position);
getWeatherWithPos(position.coords.latitude,position.coords.longitude);
}
// Unable to find a latitude/longitude
function error(error) {
// console.log(error);
getWeatherWithPos(defaultLat,defaultLng);
}
/*
2. Request weather data for a location
*/
// Request weather from forecast.io with a latitude/longitude
function getWeatherWithPos(lat,lng) {
// Construct the url to request
apiURL += "/" + lat + "," + lng;
// console.log(apiURL);
// Make a request to forecast.io
$.ajax({
url: apiURL,
type: "GET",
crossDomain: true,
dataType: 'jsonp',
success: function (response) {
// The request succeeded
console.log(response);
parseWeather(response);
$('#loader').remove();
},
error: function (xhr, status) {
// The request failed
// console.log(status);
$('#loader').remove();
showError();
}
});
}
/*
3. Insert weather data into app and stylize
*/
function parseWeather(data) {
var currentWeather = data.currently.icon;
var location = data.timezone;
var currentTemp = Math.floor(data.currently.temperature);
var currentApparent = Math.floor(data.currently.apparentTemperature);
var currentMin = Math.floor(data.daily.data[0].temperatureMin);
var currentMax = Math.floor(data.daily.data[0].temperatureMax);
var tempMinFirst = Math.floor(data.daily.data[1].temperatureMin);
var tempMinSecond = Math.floor(data.daily.data[2].temperatureMin);
var tempMinThird = Math.floor(data.daily.data[3].temperatureMin);
var tempMinFourth = Math.floor(data.daily.data[4].temperatureMin);
var tempMinFifth = Math.floor(data.daily.data[5].temperatureMin);
var tempMinSixth = Math.floor(data.daily.data[6].temperatureMin);
var tempMinSeventh = Math.floor(data.daily.data[7].temperatureMin);
var tempMaxFirst = Math.floor(data.daily.data[1].temperatureMax);
var tempMaxSecond = Math.floor(data.daily.data[2].temperatureMax);
var tempMaxThird = Math.floor(data.daily.data[3].temperatureMax);
var tempMaxFourth = Math.floor(data.daily.data[4].temperatureMax);
var tempMaxFifth = Math.floor(data.daily.data[5].temperatureMax);
var tempMaxSixth = Math.floor(data.daily.data[6].temperatureMax);
var tempMaxSeventh = Math.floor(data.daily.data[7].temperatureMax);
$('#currentLoc').text(location);
$('#degreesFarenheit').text(currentTemp);
$('#apparentTemp').text("feels "+ currentApparent);
$('#minTemp').text(currentMin);
$('#maxTemp').text(currentMax);
$('#minTempFirst').text(tempMinFirst);
$('#minTempSecond').text(tempMinSecond);
$('#minTempThird').text(tempMinThird);
$('#minTempFourth').text(tempMinFourth);
$('#minTempFifth').text(tempMinFifth);
$('#minTempSixth').text(tempMinSixth);
$('#minTempSeventh').text(tempMinSeventh);
$('#maxTempFirst').text(tempMaxFirst);
$('#maxTempSecond').text(tempMaxSecond);
$('#maxTempThird').text(tempMaxThird);
$('#maxTempFourth').text(tempMaxFourth);
$('#maxTempFifth').text(tempMaxFifth);
$('#maxTempSixth').text(tempMaxSixth);
$('#maxTempSeventh').text(tempMaxSeventh);
var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var dailyTime = data.daily.data;
// console.log(dailyTime);
var timeArray = [];
// console.log(timeArray);
for (var i = 0; i < dailyTime.length; i++) {
timeArray.push(dailyTime[i].time*1000);
}
// console.log(timeArray);
var dateArrayOne = new Date(timeArray[1]);
var dateFirst = days[dateArrayOne.getDay()];
// console.log(dateFirst);
var dateArrayTwo = new Date(timeArray[2]);
var dateSecond = days[dateArrayTwo.getDay()];
var dateArrayThree = new Date(timeArray[3]);
var dateThird = days[dateArrayThree.getDay()];
var dateArrayFour = new Date(timeArray[4]);
var dateFourth = days[dateArrayFour.getDay()];
var dateArrayFive = new Date(timeArray[5]);
var dateFifth = days[dateArrayFive.getDay()];
var dateArraySix = new Date(timeArray[6]);
var dateSixth = days[dateArraySix.getDay()];
var dateArraySeven = new Date(timeArray[7]);
var dateSeventh = days[dateArraySeven.getDay()];
$('#firstDay').text(dateFirst);
$('#secondDay').text(dateSecond);
$('#thirdDay').text(dateThird);
$('#fourthDay').text(dateFourth);
$('#fifthDay').text(dateFifth);
$('#sixthDay').text(dateSixth);
$('#seventhDay').text(dateSeventh);
var daytypes = {
clearDay: {
text: "clear day",
images: [
]
},
clearNight: {
text: "clear night",
images: [

]
},
rain: {
text: "rain",
images: [
]
},
snow: {
text: "snow",
images: [
]
},
sleet: {
text: "sleet",
images: [
]
},
wind: {
text: "wind",
images: [
]
},
fog: {
text: "fog",
images: [
]
},
cloudy: {
text: "cloudy",
images: [
]
},
partlyCloudyDay: {
text: "partly cloudy day",
images: [
},
partlyCloudyNight: {
text: "partly cloudy night",
images: [

]
}
};
function getIconText (weather){
if(weather === "clear-day")
return daytypes.clearDay.text;
if(weather === "clear-night")
return daytypes.clearNight.text;
if(weather === "rain")
return daytypes.rain.text;
if(weather === "snow")
return daytypes.snow.text;
if(weather === "sleet")
return daytypes.sleet.text;
if(weather === "wind")
return daytypes.wind.text;
if(weather === "fog")
return daytypes.fog.text;
if(weather === "cloudy")
return daytypes.cloudy.text;
if(weather === "partly-cloudy-day")
return daytypes.partlyCloudyDay.text;
if(weather === "partly-cloudy-night")
return daytypes.partlyCloudyNight.text;
}
function getIcon (day){
if(day == "clear-day")
return daytypes.clearDay.images[Math.floor(Math.random()*daytypes.clearDay.images.length)];
if(day == "clear-night")
return daytypes.clearNight.images[Math.floor(Math.random()*daytypes.clearNight.images.length)];
if(day == "rain")
return daytypes.rain.images[Math.floor(Math.random()*daytypes.rain.images.length)];
if(day == "snow")
return daytypes.snow.images[Math.floor(Math.random()*daytypes.snow.images.length)];
if(day == "sleet")
return daytypes.sleet.images[Math.floor(Math.random()*daytypes.sleet.images.length)];
if(day == "wind")
return daytypes.wind.images[Math.floor(Math.random()*daytypes.wind.images.length)];
if(day == "fog")
return daytypes.fog.images[Math.floor(Math.random()*daytypes.fog.images.length)];
if(day == "cloudy")
return daytypes.cloudy.images[Math.floor(Math.random()*daytypes.cloudy.images.length)];
if(day == "partly-cloudy-day")
return daytypes.partlyCloudyDay.images[Math.floor(Math.random()*daytypes.partlyCloudyDay.images.length)];
if(day == "partly-cloudy-night")
return daytypes.partlyCloudyNight.images[Math.floor(Math.random()*daytypes.partlyCloudyNight.images.length)];
}
// daytypes.clearDay.text;
// daytypes.clearDay.images;
var dayTypeText = getIconText(data.currently.icon);
$('#condition').text(dayTypeText);
var dayType = getIcon(data.currently.icon);
$('body').css('background-image','url(' + dayType + ')');
console.log(dayType);
}
// Show an error if we can't access the weather
function showError(){
$('#temp').text('Oh no! Your forecast is currently unavailable.');
$('body').css('background-color','rgb(240,14,10');
}
});

	 function parseIcon(icon)
	 {
	    	switch(icon) 
	    	{
	    		case "cloudy":
	    			var img = "cloudy.png";
	    		break;
	    		
    			case "clearDay":	
                	   var img = "clear-day.png";
			
				break;

			case "sleet":	
                	   var img = "sleet.png";

	               		 break;
    			case "rain":
                	  var img = "rainy.jpg";

	               		 break;
    		case "Snow":
    		var img = "Snow.pgn";


                	
				break;

			case "clear-night":
				var img = "clear-night.png";
    				break;	
		}
		return img;
    	}


	// Show an error if we can't access the weather
	function showError()
	{
		$('#temp').text('Oops! There is a problem with the connection.');
		$('body').css('background-color','rgb(236,93,183');	
	}