import { Carousel as BootstrapCarousel } from "bootstrap";
import { Carousel } from "../components/Carousel";
import images from "../storage/homepageCarousel.json";

/**
 * Page d'accueil
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Home = (element) => {
  element.innerHTML = `
     <h1 class="display-4 text-center">Accueil</h1>
    <p class="lead text-center">Bienvenue dans notre boutique !</p>
    <p class="text-center">Nous avons les articles les plus drôles et adorables pour vos chers minous. Venez découvrir nos trésors et rendez vos chats encore plus heureux ! Miaou !</p>
    <div id="carousel-container"></div>
    `;

  document.getElementById('carousel-container').innerHTML = Carousel(images);

  // Initialisation du carrousel
  const carouselElement = document.querySelector('#carouselExampleCaptions');
  const carousel = new BootstrapCarousel(carouselElement, {
    interval: 1000, // Intervalle d'auto-défilement en millisecondes
    ride: 'carousel' // Démarrage automatique du défilement
  });
};

