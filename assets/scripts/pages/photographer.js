import { displayModal, closeModal } from "../utils/modal.js";
import { getPhotographers } from "./utils.js";

// Vérification si l'url contient un id sinon on redirige vers la page principal
const idPage = (window.location.href.includes("id") && window.location.href.split("id=")[1] !== "") ? parseInt(window.location.href.split("id=")[1]) : window.location.href = "/";

// Récupération des informations des photographes
const { photographers } = await getPhotographers();

// Tri afin de récupérer uniquement les infos correspondant à l'id
const infos = photographers.filter((r) => r.id === idPage)[0];

// Si il ne trouve pas d'informations par rapport à l'id fournis, c'est que l'id est invalide, alors on redirige 
if(!infos) window.location.href = "/";

// Modal

const openModalElement = document.getElementById("openModal");
const closeModalElement = document.getElementById("closeModal");

// Définition du message d'accessibilité pour le bouton d'ouverture de modal
openModalElement.setAttribute("aria-label", `Contact me ${infos.name}`);

openModalElement.addEventListener("click", async () => displayModal(infos.name));
closeModalElement.addEventListener("click", closeModal);

// Generate elements

const globalDiv = document.getElementsByClassName("photograph-header")[0];