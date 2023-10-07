import { displayModal, closeModal } from "../utils/modal.js";
import { getPhotographers, createElement, getUserCardDOM } from "../utils/index.js";

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

const headerGenerator = () => {
    const headerContainer = document.getElementsByClassName("photograph-header")[0];
    const domElements = getUserCardDOM(infos);
    const textContainer = createElement("div", { class: "photograph-header__text" }, [domElements.name, domElements.cityCountry, domElements.description]);

    // Ajoute notre division contenant nos éléments texte avant notre bouton
    headerContainer.prepend(textContainer);

    // Ajoute notre division contenant la photo du photographe à la suite des autres éléments dans la div
    headerContainer.appendChild(domElements.picture);
}

const mediaGenerator = async () => {
    const { media } = await getPhotographers();
    const photoGraphMedia = media.filter((m) => m.photographerId === idPage);

    photoGraphMedia.map((m) => {
        const mediaElement = `./assets/images/media/${infos.name}/${(m.image) ? m.image : m.video}`;
        let pictureVideo = null;
    
        if(m.image) pictureVideo = createElement("img", { src: mediaElement, alt: `${m.title} image` });

        if(m.video) {
            const source = createElement("source", { src: mediaElement, type: "video/mp4" });
            pictureVideo = createElement("video", { controls: "true" }, [source]);
        }

        const divMedia = createElement("div", { class: "media-element" }, [pictureVideo]);
        
        const title = createElement("p", { class: "title" }, m.title);
        const stats = createElement("p", { class: "title likes" }, m.likes.toString());
        const heart = createElement("img", { class:  "heart", src: "assets/icons/heart.svg", alt: `Heart` });

        const divStats = createElement("div", { class: "media-stats__container" }, [stats, heart]);
        const divTextContainer = createElement("div", { class: "media-text__container" }, [title, divStats]);        
    
        const finalMedia = createElement("div", { class: "media__container" }, [divMedia, divTextContainer]);
        document.getElementsByClassName("media")[0].appendChild(finalMedia);
    })
}

// Initialisation Functions
headerGenerator();
mediaGenerator();