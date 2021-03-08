import './styles.css';
import debounce from 'lodash';
import Countries from './js/api/fetchCountries';

const inputRef = document.querySelector('.search-form__input');
inputRef.addEventListener(
  'input',
  _.debounce(() => {
    searchCountry()
  }, 500),
);

function searchCountry() {
  if (inputRef.value) {
    const countries = new Countries('.search-results');
    countries.fetchCountries(inputRef.value);
  }
}