import setting from './settings';
import countriesApi from '../api/countries';
import countryListTemplate from '../../templates/countryList.hbs';
import countryCardTemplate from '../../templates/CountryCard.hbs';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const { BASE_URL } = setting;

class Countries {
  #countries = [];

  constructor(selector) {
    this.element = document.querySelector(selector);
    this.#countries = [];
  }

  get countries() {
    return this.#countries;
  }

  set countries(countriesList) {
    if (!countriesList) {
      return;
    }

    if (countriesList.length > 10) {
      return error({
        text: 'To many matches found. Please ener a more specific query!',
      });
    }

    this.#countries = countriesList;
    this.render();
  }

  fetchCountries(searchQuery) {
    const url = BASE_URL + searchQuery;

    return countriesApi(url).then(result => {
      // if (result.status === 404) {
      //   return;
      // }
      this.countries = result;
    });
  }

  render() {
    console.log(this.countries);
    this.countries.length > 1
      ? (this.element.innerHTML = countryListTemplate(this.countries))
      : (this.element.innerHTML = countryCardTemplate(this.countries[0]));
  }
}

export default Countries;
