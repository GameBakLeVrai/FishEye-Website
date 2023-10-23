import { getMediaIndex } from "./index.js";

export const displayModal = async (type, name, media) => {
	const modal = document.getElementsByClassName("modal__container")[(type === "contact") ? 0 : 1];
	modal.style.display = "block";
	
	scrollTo(0, 0);
	document.body.style.overflow = "hidden";

	if(media) {
		const div = document.getElementsByClassName("media-content")[0].getElementsByClassName("media-element")[0];
		const clone = media.cloneNode(true);

		if(clone instanceof HTMLVideoElement) clone.setAttribute("controls", "true");
		div.replaceChildren(clone);
		
		lightboxNavigator(clone, div);
	}

	document.getElementsByClassName("modal-name")[(type === "contact") ? 0 : 1].textContent = name;
}

export const closeModal = (e) => {
	const modal = e.target.closest(".modal").parentNode;

	modal.style.display = "none";
	document.body.style.overflow = "unset";
}

export const lightboxNavigator = (child, div) => {
	const mediaList = document.querySelectorAll(".media__container");

	const nextLightbox = document.getElementById("next");
	const previousLightbox = document.getElementById("previous");

	let index = getMediaIndex(child, mediaList);

	const nextPrevious = (option) => {
		if(option === "previous" && index === 0) return;
		if(option === "next" && index === mediaList.length-1) return;

		const media = (mediaList[(option === "next") ? index+1 : index-1].querySelector(".media-element").childNodes)[0];
		const mediaText = media.closest(".media__container").querySelector("p").textContent;

		const title = document.getElementsByClassName("lightbox")[0].querySelector("p");
		
		const clone = media.cloneNode(true);
		if(clone instanceof HTMLVideoElement) clone.setAttribute("controls", "true");
		
		if(option === "next") {
			index += 1;
			title.innerText = mediaText;

			return div.replaceChildren(clone);
		}

		if(option === "previous") {
			index -= 1;
			title.innerText = mediaText;

			return div.replaceChildren(clone);
		}
	}

	nextLightbox.addEventListener("click", () => nextPrevious("next"));
	previousLightbox.addEventListener("click", () => nextPrevious("previous"));

	// Change lightbox media with arrow of keyboard
	document.addEventListener("keydown", (e) => {
		if(document.querySelectorAll(".modal__container")[1].style.display !== "block") return;

		switch(e.key) {
			case "ArrowRight":
				nextPrevious("next");
				break;

			case "ArrowLeft":
				nextPrevious("previous");
				break;
				
			default: return;
		}
	});
}