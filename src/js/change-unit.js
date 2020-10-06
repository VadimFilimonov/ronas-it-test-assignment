const unitSwitcherRadios = document.querySelectorAll('.unit-switcher__radio');
const currentTemperature = document.querySelector('.main-info__value span');

const fromCelsiusToFahrenheit = (number) => number * 9 / 5 + 32;

const fromFahrenheitToCelsius = (number) => (number - 32) * 5 / 9;

const unitSwitcherClick = (unitSwitcher) => {
	unitSwitcher.addEventListener('input', () => {
		const temperature = currentTemperature.textContent;

		if (unitSwitcher.id === 'unit-switcher-celsius') {
			currentTemperature.textContent = Math.round(fromFahrenheitToCelsius(temperature)).toString();
		} else {
			currentTemperature.textContent = Math.round(fromCelsiusToFahrenheit(temperature)).toString();
		}
	});
}

for (let index = 0; index < unitSwitcherRadios.length; index += 1) {
	unitSwitcherClick(unitSwitcherRadios[index]);
}
