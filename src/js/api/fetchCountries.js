import setting from './settings';
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

  async fetchCountries(searchQuery) {
    if (!searchQuery) {
      this.element.innerHTML = '';
      return;
    }
    const url = BASE_URL + searchQuery;

    try {
      const result = await fetch(url)
        .then(response => {
          if (response.status === 404) {
            return;
          }
          return response.json();
        })
        .then(result => {
          this.countries = result;
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    this.countries.length > 1
      ? (this.element.innerHTML = countryListTemplate(this.countries))
      : (this.element.innerHTML = countryCardTemplate(this.countries[0]));
  }
}

export default Countries;
