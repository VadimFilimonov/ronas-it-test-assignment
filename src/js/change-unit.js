let unitSwitcherRadios;

let temperatureHolder;

let temperatureValue;

const convertToFahrenheit = (number) => number * 9 / 5 + 32;

const convertToCelsius = (number) => (number - 32) * 5 / 9;

const findElements = () => {
	unitSwitcherRadios = document.querySelectorAll('.unit-switcher__radio');
	temperatureHolder = document.querySelector('.main-info__value span');
	temperatureValue = temperatureHolder.textContent;
};

const onInput = ({target}) => {
	temperatureValue =
		target.id === 'celsius'
			? Math.round(convertToCelsius(temperatureValue))
			: Math.round(convertToFahrenheit(temperatureValue));

	temperatureHolder.textContent = temperatureValue;
};

const subscribe = () => {
	unitSwitcherRadios.forEach((item) => {
		item.addEventListener('input', onInput);
	});
};

export default () => {
	findElements();
	subscribe();
};
