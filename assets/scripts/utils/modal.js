export const displayModal = async (name) => {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
	
	scrollTo(0, 0);
	
	document.getElementById("modal-name").textContent = name;
	document.body.style.overflow = "hidden";
}

export const closeModal = () => {
	const modal = document.getElementById("contact_modal");

	modal.style.display = "none";
	document.body.style.overflow = "unset";
}