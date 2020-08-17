var unitSwitcherRadios = document.querySelectorAll('.unit-switcher__radio');
var currentTemperature = document.querySelector('.main-info__value span');

var unitSwitcherClick = function (unitSwitcher) {
	unitSwitcher.addEventListener('input', function () {
		var temperature = currentTemperature.textContent;
		if (unitSwitcher.id === 'unit-switcher-celsius') {
			currentTemperature.textContent = Math.round(fromFahrenheitToCelsius(temperature));
		} else {
			currentTemperature.textContent = Math.round(fromCelsiusToFahrenheit(temperature));
		}
	});
}

for (var i = 0; i < unitSwitcherRadios.length; i++) {
	unitSwitcherClick(unitSwitcherRadios[i]);
}

var fromCelsiusToFahrenheit = function (number) {
	return (number * 9 / 5) + 32;
}

var fromFahrenheitToCelsius = function (number) {
	return (number - 32) * 5 / 9;
}