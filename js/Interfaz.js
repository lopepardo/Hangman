// Modulos a importar
// Arreglo con las letras del abecedario para armar el teclado
import { arrayKeys } from "./arrayKeys.js";

// Clase interfaz que se encarga de mostrar todo en pantalla
export class Interfaz {
  // Función que genera un teclado para el juego
  createKeyboard() {
    const keys = document.querySelector(".keys");
    const frag = document.createDocumentFragment();
    arrayKeys.forEach((elemt) => {
      const key = document.createElement("div");
      key.id = elemt;
      key.classList.add("key");
      key.classList.add("key-button");
      key.textContent = elemt;
      frag.appendChild(key);
    });
    keys.appendChild(frag);
  }

  // Función que genera los espacios para cada letra dependiendo de la palabra seleccionada
  createSpaces(wordFormat) {
    const wordsContainer = document.getElementById("wordsContainer");
    while (wordsContainer.hasChildNodes()) {
      wordsContainer.removeChild(wordsContainer.firstElementChild);
    }
    const frag = document.createDocumentFragment();
    for (let i = 0; i < wordFormat.length; i++) {
      const div = document.createElement("div");
      div.className = "letter";
      frag.appendChild(div);
    }
    wordsContainer.appendChild(frag);
  }

  // Función que verifica si el jugador gano antes de usar todos los intentos
  verifyWin(wordLength) {
    const letters = document.querySelectorAll(".letter");
    let cont = 0;
    letters.forEach((letter) => {
      if (letter.textContent !== "") cont++;
    });
    if (wordLength === cont) return true;
    else return false;
  }

  // Función que dibuja en los espacios la letra contenida en la palabra
  drawLetters(letter, pos) {
    const letters = document.querySelectorAll(".letter");
    pos.forEach((p) => {
      letters[p].textContent = letter;
    });
  }

  // Función que dibuja toda la palabra en los espacios, se usa cuando el jugador pierde todos los intentos
  drawAllWord(word) {
    const letters = document.querySelectorAll(".letter");
    [...word].forEach((letter, index) => {
      letters[index].textContent = letter;
    });
  }

  // Función que habilita o desabilita las letras del teclado
  disableOrEnableKey(arrayKeys, type) {
    if (type === "disable") {
      arrayKeys.forEach((key) => {
        key.classList.replace("key", "disable");
      });
    } else if (type === "enable") {
      arrayKeys.forEach((key) => {
        key.classList.replace("disable", "key");
      });
    }
  }

  // Función que muestra la animación simulando un intento
  animationAttempt(animation, attempt) {
    const part = animation[attempt];
    part.classList.remove("hide");
    part.classList.add("animation");
  }

  // Función que reinicia la animación cuando el jugador pierde
  animationReset(parts) {
    parts.forEach((part) => {
      part.classList.add("hide");
      part.classList.remove("animation");
    });
  }
}
