var cityInputEl = document.querySelector("#city");
var citiesContainerEl = document.querySelector("#cities-container");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityName = cityInputEl.value.trim();

    if(cityName) {
      getCityName(cityName);

      // clear old content
      citiesContainerEl.textContent = "";
      cityInputEl.value = "";
    } else {
      alert("Please search city name");
    }
  };


var getUserCities = function(city) {
    // format the github api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}" + city + "/cities";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };
  
getUserCities("cities");