let unitSwitcherRadios;

let temperatureHolder;

const convertToFahrenheit = (number) => number * 9 / 5 + 32;

const convertToCelsius = (number) => (number - 32) * 5 / 9;

const findElements = () => {
	unitSwitcherRadios = document.querySelectorAll('.unit-switcher__radio');
	temperatureHolder = document.querySelector('.main-info__value span');
};

const onInput = ({target}) => {
	const currentTemperature = temperatureHolder.textContent;

	let newTemperature =
		target.id === 'celsius'
			? Math.round(convertToCelsius(currentTemperature))
			: Math.round(convertToFahrenheit(currentTemperature));

	temperatureHolder.textContent = newTemperature;
};

const subscribeUnitSwitcher = (unitSwitcher) => {
	unitSwitcher.addEventListener('input', onInput);
};

const subscribe = () => {
	unitSwitcherRadios.forEach(subscribeUnitSwitcher);
};

export default () => {
	findElements();
	subscribe();
};
