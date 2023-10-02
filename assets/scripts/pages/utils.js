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