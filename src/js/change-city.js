let changeCityButton;

let myLocationButton;

let currentCityBlock;

let currentCityTitle;

let searchForm;

let searchFormInput;

const findElements = () => {
	changeCityButton = document.querySelector('.current-city__parameter--change-city');
	myLocationButton = document.querySelector('.current-city__parameter--my-location');
	currentCityBlock = document.querySelector('.current-city');
	currentCityTitle = document.querySelector('.current-city__title');
	searchForm = document.querySelector('.search-form');
	searchFormInput = document.querySelector('.search-form__input');
};

const onCityButtonClick = (event) => {
	event.preventDefault();
	currentCityBlock.classList.add('visually-hidden');
	searchForm.classList.remove('visually-hidden');
};

const onSubmit = (event) => {
	event.preventDefault();
	const city = searchFormInput.value;

	searchForm.reset();
	currentCityTitle.textContent = city;
	currentCityBlock.classList.remove('visually-hidden');
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
