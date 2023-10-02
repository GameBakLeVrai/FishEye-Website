import { getPhotographers, createElement } from "./utils.js";

function photographerTemplate(data) {
	const { id, name, portrait, city, country, tagline, price } = data;
	const picture = `assets/images/photographers/${portrait}`;

	function getUserCardDOM() {
		const link = createElement("a", { href: `/photographer.html?id=${id}` });
		const divPicture = createElement("div", { class: "pfp" });

		// Ajoute l'image à la div
		const pfp = createElement("img", { src: picture, alt: "picture of profile" });
		divPicture.appendChild(pfp);

		const nameTitle = createElement("h2", { class: "name" }, name);
		const cityCountry = createElement("p", { class: "country" }, `${city}, ${country}`);
		const desc = createElement("p", { class: "desc" }, tagline);
		const dailyPrice = createElement("p", { class: "price" }, `${price.toString()}€/jour`);

		// Création de notre div global qui va contenir tout nos éléments
		const article = createElement("article", {}, [divPicture, nameTitle, cityCountry, desc, dailyPrice]);
		link.appendChild(article);

		console.log(data);

		// Retourne la structure DOM de la carte utilisateur
		return link;
	}

	// Retourne les données du photographe et la fonction pour créer la structure DOM
	return { name, picture, getUserCardDOM };
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");

	photographers.forEach((photographer) => {
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();

		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();