import { CardsList } from "../../components/CardsList";
import categories from "../../storage/categories.json";
import { CategorieCard } from "../Categories/Partials/CategorieCard";

/**
 * Page de la liste des categories
 * Affichage en grille uniquement
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Categories = (element) => {
  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Categories</h1>
    </div>
    <div id="categories-list"></div>
  `;

  const categoriesList = element.querySelector("#categories-list");

  // Fonction pour afficher les categories
  const render = () => {
    CardsList(categoriesList, categories, CategorieCard, ["id", "name", "description", "image"]);
  };

  // Initialisation de la page
  render();
};