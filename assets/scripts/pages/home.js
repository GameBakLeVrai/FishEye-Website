import { getPhotographers, createElement, getUserCardDOM } from "../utils/index.js";

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");

	photographers.forEach((photographer) => {
		const domElements = getUserCardDOM(photographer);

		const link = createElement("a", { href: `/photographer.html?id=${photographer.id}`, "aria-label": "Page du photographe"}, [domElements.picture, domElements.name]);
		const article = createElement("article", {}, [link, domElements.cityCountry, domElements.description, domElements.price]);

		photographersSection.appendChild(article);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

await init();