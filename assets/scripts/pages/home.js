function photographerTemplate(data) {
	const { name, portrait } = data;

	const picture = `assets/images/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("article");

		const divPicture = document.createElement("div");
		const img = document.createElement("img");

		divPicture.className += "pfp";
		img.setAttribute("src", picture);
		divPicture.appendChild(img);

		const h2 = document.createElement("h2");
		h2.textContent = name;

		article.appendChild(divPicture);
		article.appendChild(h2);

		return article;
	}

	return { name, picture, getUserCardDOM };
}