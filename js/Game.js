// Modulos a importar
// Arreglo que contiene mas de 2000 palabras
import { arrayWords } from "./arrayWords.js";

// Clase palabra que almacena un string con una palabra seleccionada
// aleatoriamente y el numero de intentos que tiene el jugador
export class Game {
  constructor(attempt) {
    this.word = "";
    this.attempt = 4;
  }

  // Función que selecciona una palabra aleatoriamente
  selectWord() {
    this.word = arrayWords.filter((word) => word.length <= 10 && word != " ");
    const wordLength = this.word.length;
    const wordSelect = arrayWords[Math.ceil(Math.random() * wordLength)];
    this.word = wordSelect
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }

  // Función que encuentra las letra seleccionda en la palabra
  // Retorna un arreglo con la/s posición/es si encuentra una letra en la palabra
  // Si no, retorna un arreglo vacio
  verifyWord(letterSelect) {
    const arrayPos = [];
    [...this.word].forEach((letterWord, l) => {
      if (letterWord === letterSelect) {
        arrayPos.push(l);
      }
    });
    return arrayPos;
  }

  // Función que reduce el numero de intentos
  subAttempt() {
    this.attempt--;
  }
}
