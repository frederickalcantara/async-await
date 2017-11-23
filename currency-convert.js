// USD CAD $23
// 23 USD is equal to 28 CAD. You can spend these in the following countries:

const axios = require('axios');

// const getExchangeRateOrig = (from, to) => {
// 	return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
// 		return response.data.rates[to];
// 	});
// }

// const getCountriesOrig = (currencyCode) => {
// 	return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
// 	.then((response) => {
// 		return response.data.map((country) => country.name);
// 	});
// }

// const convertCurrencyOrig = (from, to, amount) => {
// 	let countries;
// 	return getCountries(to).then((tempCountries) => {
// 		countries = tempCountries;
// 		return getExchangeRate(from, to);
// 	}).then((rate) => {
// 		const exchangedAmount = amount * rate;

// 		return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
// 	});
// };

const getExchangeRate = async (from, to) => {
	try {
		const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
		const rate = response.data.rates[to];

		if (rate) {
			return rate;
		} else {
			throw new Error();
		}
	} catch (e) {
		throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
	}
};

const getCountries = async (currencyCode) => {
	try {
		const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    	return response.data.map(country => country.name);
	} catch (e) {
		throw new Error(`Unable to get countries that use ${currencyCode}`);
	}
};

const convertCurrency = async (from, to, amount) => {
	let countries = await getCountries(to);
	let rate = await getExchangeRate(from, to);
	const exchangedAmount = amount * rate;

  	return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(", ")}`;
};

// convertCurrencyOrig('USD', 'CAD', 100).then((status) => {
// 	console.log(status);
// });

convertCurrency("USD", "EUR", 100).then(status => {
  	console.log(status);
}).catch((e) => {
	console.log(e.message);
});

//  await is useful for waiting for functions with apis

// functions with Orig at the end are es5 promise code
