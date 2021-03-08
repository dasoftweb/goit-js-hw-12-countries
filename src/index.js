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
    const countries = new Countries('.search-results');
    countries.fetchCountries(inputRef.value);
}