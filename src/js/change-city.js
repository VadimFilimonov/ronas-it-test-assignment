let changeCityButton;

let myLocationButton;

let currentCityContainer;

let currentCityTitle;

let searchForm;

const findElements = () => {
	changeCityButton = document.querySelector('.current-city__parameter--change-city');
	myLocationButton = document.querySelector('.current-city__parameter--my-location');
	currentCityContainer = document.querySelector('.current-city');
	currentCityTitle = currentCityContainer.querySelector('.current-city__title');
	searchForm = document.querySelector('.search-form');
};

const onCityButtonClick = (event) => {
	event.preventDefault();
	currentCityContainer.classList.add('visually-hidden');
	searchForm.classList.remove('visually-hidden');
};

const onSubmit = (event) => {
	event.preventDefault();
	const formData = new FormData(event.target);
	const city = formData.get('city');

	searchForm.reset();
	currentCityTitle.textContent = city;
	currentCityContainer.classList.remove('visually-hidden');
	searchForm.classList.add('visually-hidden');
};

const subscribe = () => {
	changeCityButton.addEventListener('click', onCityButtonClick);
	myLocationButton.addEventListener('click', (event) => event.preventDefault());
	searchForm.addEventListener('submit', onSubmit);
};

export default () => {
	findElements();
	subscribe();
};
