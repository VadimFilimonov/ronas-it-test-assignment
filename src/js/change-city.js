const changeCityButton = document.querySelector('.current-city__parameter--change-city');
const myLocationButton = document.querySelector('.current-city__parameter--my-location');
const currentCityBlock = document.querySelector('.current-city');
const currentCityTitle = document.querySelector('.current-city__title');
const searchForm = document.querySelector('.search-form');
const searchFormInput = document.querySelector('.search-form__input');

changeCityButton.addEventListener('click', (event) => {
	event.preventDefault();
	currentCityBlock.classList.add('visually-hidden');
	searchForm.classList.remove('visually-hidden');
});

myLocationButton.addEventListener('click', (event) => {
	event.preventDefault();
});

searchForm.addEventListener('submit', (event) => {
	const city = searchFormInput.value;

	searchFormInput.value = '';
	currentCityTitle.textContent = city;
	currentCityBlock.classList.remove('visually-hidden');
	searchForm.classList.add('visually-hidden');
	event.preventDefault();
});
