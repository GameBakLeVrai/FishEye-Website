export const displayModal = async (type, name, media) => {
	const modal = document.getElementsByClassName("modal__container")[(type === "contact") ? 0 : 1];
	modal.style.display = "block";
	
	scrollTo(0, 0);
	document.body.style.overflow = "hidden";

	if(media) {		
		const clone = media.cloneNode(true);
		if(clone instanceof HTMLVideoElement) clone.setAttribute("controls", "true");
		
		document.getElementsByClassName("media-content")[0].getElementsByClassName("media-element")[0].replaceChildren(clone);
	}

	document.getElementsByClassName("modal-name")[(type === "contact") ? 0 : 1].textContent = name;
}

export const closeModal = (e) => {
	const modal = e.target.closest(".modal").parentNode;

	modal.style.display = "none";
	document.body.style.overflow = "unset";
}