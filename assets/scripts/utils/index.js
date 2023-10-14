// Import Photographers Json data
export const getPhotographers = async () => await fetch("/assets/scripts/data/photographers.json").then((r) => r.json());

// Crée un élément HTML en utilisant les éléments passer en paramètre
export const createElement = (type, attributes = {}, children = []) => {
	// Crée un élément HTML
	const element = document.createElement(type);

	// Parcours l'objet attributes passé en paramètre pour définir les attributs de l'élément
	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}

	// Parcours les enfants passés en paramètre et les ajoute à l'élément
	for (const child of children) {
		// Si child fait partie de HTMLElement on l'ajoute en tant qu'enfant à notre HTML Element
		if (child instanceof HTMLElement) {
			element.appendChild(child);
		} else {
			// Sinon on crée un nodeText et on l'ajoute ensuite à notre HTML Element
			const textNode = document.createTextNode(child);
			element.appendChild(textNode);
		}
	}

	// Retourne l'élément HTML créé
	return element;
};

// Fonction qui va crée et retourner uniquement les HTMLElements utile concernant le photographe voulu
export const getUserCardDOM = (data) => {
	const { name, portrait, city, country, tagline, price } = data;
	const picture = `assets/images/photographers/${portrait}`;

	const divPicture = createElement("div", { class: "pfp" });
	const pfp = createElement("img", { class:  (name.includes("Tracy") ? "tracy" : ""), src: picture, alt: "picture of profile" });
	divPicture.appendChild(pfp);

	const nameTitle = createElement("h2", { class: "name" }, name);
	const cityCountry = createElement("p", { class: "country" }, `${city}, ${country}`);
	const desc = createElement("p", { class: "desc" }, tagline);
	const dailyPrice = createElement("p", { class: "price" }, `${price.toString()}€/jour`);

	return {
		picture: divPicture,
		name: nameTitle,
		cityCountry: cityCountry,
		description: desc,
		price: dailyPrice
	};
}

export const getMediaIndex = (child, mediaList) => {
	const typeMedia = (child.tagName === "VIDEO") ? "video" : "image";
	var index = 0;	

	for(let i = 0; i < mediaList.length; i++) {
		const childs = mediaList[i].getElementsByClassName("media-element")[0].childNodes;

		switch(typeMedia) {
			case "video":
				const source = (childs[0].childNodes)[0];

				if(source) {
					if(source.isEqualNode((child.childNodes)[0])) return index = i;
				}

				break;

			default:
				if(childs[0].isEqualNode(child)) return index = i;
		}
	}

	return index;
}