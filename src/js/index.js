import Notiflix from 'notiflix';
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

const notiflixParams = {
    width: '720px',
    svgSize: '240px',
    position: 'center-top',
    fontSize: '18px',
    distance: '100px',
    cssAnimationStyle: 'from-top',
}

const refs = {
    breedSelect: document.querySelector(".breed-select"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
    catInfo: document.querySelector(".cat-info"),
}

createSelectMarkup();
refs.breedSelect.addEventListener("change", handleSelect);

function handleSelect(evt) {
    hideElement(refs.catInfo);
    showElement(refs.loader);
    fetchCatByBreed(evt.currentTarget.value)
        .then(data => {
            const catInfo = data[0].breeds[0];
            refs.catInfo.innerHTML = `
            <img src="${data[0].url}" alt="${catInfo.name}" class="cat-img">
            <div class="cat-descript">
            <h2>${catInfo.name}</h2>
            <p>${catInfo.description}</p>
            <p><span class="temper">Temperament: </span>${catInfo.temperament}</p>
            </div>`
            showElement(refs.catInfo);
            hideElement(refs.loader);
        })
        .catch(error => {
            console.log(error);
            Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!", notiflixParams);
            hideElement(refs.loader);
        })
}

function createSelectMarkup() {
    fetchBreeds()
        .then(arr => {
            refs.breedSelect.innerHTML = arr.map(breed => {
                return `<option value="${breed.id}">${breed.name}</option>`
            }).join("");
            showElement(refs.breedSelect);
            hideElement(refs.loader);
        })
        .catch(error => {
            console.log(error);
            Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!", notiflixParams);
            hideElement(refs.loader);
        })
}

function hideElement(element) {
    element.classList.add("hidden");
}

function showElement(element) {
    element.classList.remove("hidden");
}