var x = document.getElementById("demo");

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeather,showError);
	}
	else{
		x.innerHTML = "Geolocation is not support by this browser.";
	}
}

//error handling
function showError(error){
	switch(error.code){
		case error.PERRMISSION_DENIED:
			x.innerHTML ="Request denied."
			break;
		case error.POSITION_UNAVAILABLE:
			x.innerHTML = "Unable to get the position."
			break;
		case error.TIMEOUT:
			x.innerHTML = "Time Out! "
			break;
		case error.UNKNOWN_ERROR:
			x.innerHTML = "Unknown problem."
			break;
	}
}

//clock
function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = checkTime(today.getMinutes());

	document.getElementById("clock").innerHTML = h + " : " + m;
}

function checkTime(i) {
	if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}

//flipclock
function startFlip() {
	$('#clock').FlipClock({
			clockFace: 'TwentyFourHourClock',
			showSeconds: true
		});
}

//weather report
function getWeather(position){
	
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric"; 	//use C instead of F

	//get api from openweather
	var report = new XMLHttpRequest();
	report.open("GET",url,true);
	report.send();
	
	report.onreadystatechange = function() {
		
			var weatherReport = JSON.parse(report.responseText);
			var clockFlag = true;		// true: flipClock; false: regular clock
			test(weatherReport, clockFlag);
		
	}
}

function test(val, flag) {
	if (!flag) {
		startTime();
		setInterval(startTime, 1000);
	}
	else startFlip();

	var cityname = val.name;
	var windspeed = "Wind: "+ val.wind.speed + "m/s";
	var humidity = "Humidity: "+ val.main.humidity +"%";
	var left = "<p class='primary'>" + cityname + "</p><p class='secondary'>" + windspeed + "</p><p class='secondary'>" + humidity + "</p>";

	var icon = "<img src = http://openweathermap.org/img/w/"+ val.weather[0].icon + ".png>";
	var icon_text = val.weather[0].main;
	var middle = "<p class='image'>" + icon + "</p><p>" + icon_text + "</p>";

	var temp = val.main.temp+"℃";
	var temp_min = "Min: " + val.main.temp_min + "℃";
	var temp_max = "Max: " + val.main.temp_max + "℃";
	var right = "<p class='primary'>" + temp + "</p><p class='secondary'>" + temp_min + "</p><p class='secondary'>" + temp_max + "</p>";


	document.getElementById("left").innerHTML = left;
	document.getElementById("middle").innerHTML = middle;
	document.getElementById("right").innerHTML = right;
}

getLocation();
