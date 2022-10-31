var cityInputEl = document.querySelector("#city");
var citiesContainerEl = document.querySelector("#cities-container");
var apikey = "b07a28e49d19fc8ff6bd321bf865b6f5";
var cityFormEl = document.querySelector("#city-form");
var citiesSearchTerm = document.querySelector("#city-search-term");

//submit city
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

//fetch api after searcghing city
var getCityName = function(city) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
  
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
      if (response.ok) {
        //console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayCities(data, city);
        });
      } else {
        //if not ok
        alert('City Not Found');
      }
    })
    .catch(function(error) {
      alert('Unable to find City');
  });
};
//getUserCities("cities");

//display city weather forecast
var displayCities = function(city, searchCity) {
  //check if api returned any repos
  if (city.length === 0) {
    citiesContainerEl.textContent = 'No cities found.';
    return;
  }

citiesSearchTerm.textContent = searchCity;

  // loop over repos
  for (var i = 0; i < city.length; i++) {
    // format city name
    var cityName = cities[i].owner.login + '/' + repos[i].name;

    // create a container for each city
    var cityEl = document.createElement('div');
    cityEl.classList = 'list-item flex-row justify-space-between align-center';

    // create a span element to hold city
    var titleEl = document.createElement('span');
    titleEl.textContent = cityName;

    // append to container
    cityEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    // check if current repo has issues or not
    if (cities[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + cities[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    cityEl.appendChild(statusEl);

    // append container to the dom
    citiesContainerEl.appendChild(cityEl);
  } 
};

// add event listeners to form and button container
cityFormEl.addEventListener("submit", formSubmitHandler);