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