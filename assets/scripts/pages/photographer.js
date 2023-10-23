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
const closeModalElement = document.querySelectorAll(".closeModal");

// Définition du message d'accessibilité pour le bouton d'ouverture de modal
openModalElement.setAttribute("aria-label", `Contact me ${infos.name}`);

openModalElement.addEventListener("click", async () => displayModal("contact", infos.name));
closeModalElement.forEach((btn) => btn.addEventListener("click", (e) => closeModal(e)));


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

const mediaGenerator = async (option) => {
    if(document.getElementsByClassName("media")[0].getElementsByClassName("media__container")[0])
        [...document.getElementsByClassName("media__container")].forEach((element) => element.remove());

    const { media } = await getPhotographers();
    const photoGraphMedia = media.filter((m) => m.photographerId === idPage);

    photoGraphMedia.sort((a, b) => {
        switch(option) {
            case "Titre":
                return (a.title < b.title) ? -1 : 1;

            case "Date":
                return new Date(b.date) - new Date(a.date);

            default:
                return b.likes - a.likes;
        }
    });

    photoGraphMedia.map((m) => {
        const mediaElement = `./assets/images/media/${infos.name}/${(m.image) ? m.image : m.video}`;
        let pictureVideo = null;
    
        if(m.image) pictureVideo = createElement("img", { src: mediaElement, alt: `${m.title} image` });

        if(m.video) {
            const source = createElement("source", { src: mediaElement, type: "video/mp4" });
            pictureVideo = createElement("video", {}, [source]);
        }

        const divMedia = createElement("div", { class: "media-element", tabindex: "0" }, [pictureVideo]);
        divMedia.addEventListener("click", () => displayModal("lightbox", m.title, pictureVideo));
        
        const title = createElement("p", { class: "title" }, m.title);
        const stats = createElement("p", { class: "title likes" }, m.likes.toString());
        const heart = createElement("i", { class: "fa-regular fa-heart", "aria-label": "likes" });

        // Déclenche la fonction heartIsLiked à chaque fois qu'on clique sur le coeur
        heart.addEventListener("click", (e) => heartIsLiked(e));

        const divStats = createElement("div", { class: "media-stats__container" }, [stats, heart]);
        const divTextContainer = createElement("div", { class: "media-text__container" }, [title, divStats]);        
    
        const finalMedia = createElement("div", { class: "media__container" }, [divMedia, divTextContainer]);
        document.getElementsByClassName("media")[0].appendChild(finalMedia);
    })

    loadGlobalStats();
}

const loadGlobalStats = () => {
    // Vérifie si la division contenant nos statistiques contient des éléments, si oui, il supprime tout pour pas qu'il y ai de bug au niveau des likes
    if(document.getElementsByClassName("photograph-stats")[0].hasChildNodes()) {
        document.getElementsByClassName("photograph-stats")[0].getElementsByClassName("media-stats__container")[0].remove();
        document.getElementsByClassName("photograph-stats")[0].getElementsByClassName("price")[0].remove();
    }

    const domElements = getUserCardDOM(infos);

	const globalDivStats = document.getElementsByClassName("photograph-stats")[0];
	const divStats = document.getElementsByClassName("media-stats__container");

    // Défini stats à 0 et ajoute le nombre de coeur que chaque media possède à stats afin d'obtenir le nombre total de coeur
    let stats = 0;
    [...divStats].forEach(s => stats += parseInt(s.textContent));

    const likes = createElement("p", { class: "title likes" }, stats.toString());
    const heart = createElement("i", { class: "fa-solid fa-heart", "aria-label": "likes" });

    const divStatsFinal = createElement("div", { class: "media-stats__container" }, [likes, heart]);

    globalDivStats.appendChild(divStatsFinal);
    globalDivStats.appendChild(domElements.price);
};

const heartIsLiked = (e) => {
    let likes = parseInt(e.target.parentNode.querySelector("p").textContent);

    const addRemoveLike = (option) => {
        const p = e.target.parentNode.querySelector("p");
        const globalHearts = document.getElementsByClassName("media-stats__container")[0].querySelector("p");

        p.innerText = (option === "add") ? likes + 1 : likes - 1;
        globalHearts.innerText = (option === "add") ? parseInt(globalHearts.textContent) + 1 : parseInt(globalHearts.textContent) - 1;
    }
    
    if(e.target.classList.toString().includes("fa-regular")) {
        e.target.classList.remove("fa-regular");
        e.target.classList.add("fa-solid");

        addRemoveLike("add");
    } else {
        e.target.classList.remove("fa-solid");
        e.target.classList.add("fa-regular");

        addRemoveLike("remove");
    }
}

// Initialisation Functions

headerGenerator();
mediaGenerator("Popularité");

// Lorsque que l'utilisateur choisis de changer l'ordre de tri, execute la fonction mediaGenerator pour regénérer les medias en fonction de l'ordre choisis
document.getElementById("media-sort").addEventListener("change", (e) => mediaGenerator(e.target.value));

// Quand le formulaire de contact est envoyer
document.getElementsByClassName("contact_button")[1].addEventListener("click", (e) => {
    e.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log({
        firstname: firstname,
        lastname: lastname,
        email: email,
        message: message
    })
});