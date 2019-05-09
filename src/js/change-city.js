var changeCityButton = document.querySelector('.current-city__parameter--change-city');
var myLocationButton = document.querySelector('.current-city__parameter--my-location');
var currentCityBlock = document.querySelector('.current-city');
var currentCityTitle = document.querySelector('.current-city__title');
var searchFormBlock = document.querySelector('.search-form');
var searchFormInput = document.querySelector('.search-form__input');
var searchFormButton = document.querySelector('.search-form__button');


changeCityButton.addEventListener('click', function(evt) {
    currentCityBlock.classList.add('visually-hidden');
    searchFormBlock.classList.remove('visually-hidden');
    evt.preventDefault();
});

myLocationButton.addEventListener('click', function(evt) {
    evt.preventDefault();
});

searchFormBlock.addEventListener('submit', function(evt) {
    var city = searchFormInput.value;
    searchFormInput.value = '';
    currentCityTitle.textContent = city;
    currentCityBlock.classList.remove('visually-hidden');
    searchFormBlock.classList.add('visually-hidden');
    evt.preventDefault();
});