import { displayModal, closeModal } from "../utils/modal.js";

// Modal

const openModalElement = document.getElementById("openModal");
const closeModalElement = document.getElementById("closeModal");

openModalElement.addEventListener("click", async () => displayModal());
closeModalElement.addEventListener("click", closeModal);