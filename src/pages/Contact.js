import { InputLabel } from "../components/InputLabel";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextInput } from "../components/TextInput";
import { TextareaInput } from "../components/TextareaInput";

/**
 * Page de contact
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Contact = (element) => {
  element.innerHTML = `
        <h1 class="text-center my-4">Contact</h1>
        <form class="p-4 border rounded shadow-sm bg-white">
          <div class="form-group mb-3">
            ${InputLabel("name", "Nom")}
            ${TextInput("name", "", "text", "Votre nom")}
          </div>
          <div class="form-group mb-3">
            ${InputLabel("email", "Email")}
            ${TextInput("email", "", "email", "Votre email")}
          </div>
          <div class="form-group mb-3">
            ${InputLabel("message", "Message")}
            ${TextareaInput("message", "", "Votre message", 5)}
          </div>
          <div class="text-center">
            ${PrimaryButton("Envoyer", "submit")}
          </div>
        </form>
    `;

  const form = element.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);

    // On affiche les données dans une alerte pour l'exemple
    alert(`
    Nom : ${data.get("name") ? data.get("name") : "?"}
    Email : ${data.get("email") ? data.get("email") : "?"}
    Message : ${data.get("message") ? data.get("message") : "?"}
    `);

    form.reset();
  });
};
