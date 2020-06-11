// Modulos a importar
import { Interfaz } from "./Interfaz.js";
import { Game } from "./Game.js";

// Instancias
const UI = new Interfaz();
const gameGlobal = new Game();

// Varibles
const keys = document.querySelector(".keys");
const bodyAll = document.querySelectorAll(".bodyAll");

// Funciones
// Reinicia el juego, limpia la palabra de los espacios, habilita el teclado,
// reinicia la animación y los intentos y selecciona una nueva palabra.
const ResetAll = () => {
  UI.disableOrEnableKey(keys.childNodes, "enable");
  UI.animationReset([...bodyAll]);
  gameGlobal.attempt = 4;
  gameGlobal.selectWord();
  UI.createSpaces(gameGlobal.word);
};

// Add eventlisteners
// Añade un evento a cada letra del teclado
keys.addEventListener("click", (e) => {
  // Comprueba que solo te presionen las teclas
  if (e.target.classList[0] === "key") {
    // Desabilita la tecla cuando se presiona
    UI.disableOrEnableKey([e.target], "disable");
    let letterPos = gameGlobal.verifyWord(e.target.textContent);

    // Entra cuando el jugador acierta una de las letras de la palabra
    // Si se equivoca muestra la animación y reduce en uno los intentos restantes
    if (letterPos.length != 0) {
      UI.drawLetters(e.target.textContent, letterPos);
      const win = UI.verifyWin(gameGlobal.word.length);
      // Entra si el jugador adivina la palabra antes de acabar sus intentos
      if (win) {
        UI.disableOrEnableKey(keys.childNodes, "disable");

        // Reinicia el juego despues de 3 segundos
        setTimeout(() => {
          ResetAll();
        }, 3000);
      }
    } else {
      UI.animationAttempt([...bodyAll].reverse(), gameGlobal.attempt);
      gameGlobal.subAttempt();

      // Entra cuando el jugador se queda sin intentos
      if (gameGlobal.attempt === -1) {
        UI.disableOrEnableKey(keys.childNodes, "disable");
        UI.drawAllWord(gameGlobal.word);

        // Reinicia el juego despues de 3 segundos
        setTimeout(() => {
          ResetAll();
        }, 3000);
      }
    }
  }
});

// Eventlisteners
// Genera el teclado en la interfaz
document.addEventListener("DOMContentLoaded", () => {
  UI.createKeyboard();
  gameGlobal.selectWord();
  UI.createSpaces(gameGlobal.word);
});
