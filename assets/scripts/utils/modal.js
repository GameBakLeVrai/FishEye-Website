import { getPhotographers } from "../pages/utils.js";

export const displayModal = async () => {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
	
	// Vérification si l'url contient un id
	const idPage = (window.location.href.includes("id")) ? parseInt(window.location.href.split("id=")[1]) : "";
	
	if(idPage) {
		const { photographers } = await getPhotographers();

		// Tri afin de récupérer uniquement les infos correspondant à l'id
		const infos = photographers.filter((r) => r.id === idPage)[0];

		document.getElementById("modal-name").textContent = infos.name;
	}
}

export const closeModal = () => {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
}