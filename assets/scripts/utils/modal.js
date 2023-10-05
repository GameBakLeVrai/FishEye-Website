export const displayModal = async (name) => {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
	
	document.getElementById("modal-name").textContent = name;
}

export const closeModal = () => {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
}