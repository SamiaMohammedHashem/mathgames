"use strict";
const btnNew = document.querySelector(".btn--new");
const btnRetry = document.querySelector(".btn--retry");
let score1 = 0;
let score2 = 0;
let gameOver = false;

const neew = function () {
  document.querySelector(".winner").classList.add("hidden");
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  let arr = [0, 1, 2];
  let operand_1, operand_2;
  let option = [];
  let keyboard1 = ["a", "s", "d"];
  let keyboard2 = ["j", "k", "l"];

  operand_1 = Math.trunc(Math.random() * 50) + 1;
  operand_2 = Math.trunc(Math.random() * 50) + 1;
  shuffle(arr);
  option = [
    operand_1 + operand_2,
    operand_1 + operand_2 + Math.trunc(Math.random() * 50) - 25,
    operand_1 + operand_2 + Math.trunc(Math.random() * 50) - 10,
  ];

  document.querySelector(`.question`).textContent = `${operand_1}+${operand_2}`;
  for (let i = 0; i < keyboard1.length; i++) {
    document.querySelector(`.btn--${keyboard1[i]}`).textContent =
      option[arr[i]];
  }
  for (let i = 0; i < keyboard2.length; i++) {
    document.querySelector(`.btn--${keyboard2[i]}`).textContent =
      option[arr[i]];
  }

  const keyPressHandler = function (e) {
    if (gameOver) return;

    const btn = document.querySelector(`.btn--${e.key}`);
    if (
      Number(document.querySelector(`.btn--${e.key}`).textContent) ===
      operand_1 + operand_2
    ) {
      if (e.key == "a" || e.key == "s" || e.key == "d") {
        score1 += 1;
        document.querySelector("#score--0").textContent = score1;
        if (score1 >= 10) {
          document.querySelector(".winner").textContent = "Player 1 wins🎉🎊";
          document.querySelector(".winner").classList.remove("hidden");
          btn.classList.add("active");
          gameOver = true;
        } else {
          neew();
        }
      } else if (e.key == "j" || e.key == "k" || e.key == "l") {
        score2 += 1;
        document.querySelector("#score--1").textContent = score2;
        if (score2 >= 10) {
          document.querySelector(".winner").textContent = "Player 2 wins🎉🎊";
          document.querySelector(".winner").classList.remove("hidden");
          gameOver = true; // Set game over flag
        } else {
          neew();
        }
      }
      if (gameOver) {
        document.removeEventListener("keypress", keyPressHandler);
      }
    }
  };

  document.addEventListener("keypress", keyPressHandler);
};

btnNew.addEventListener("click", neew);

btnRetry.addEventListener("click", function () {
  score1 = 0;
  score2 = 0;
  document.querySelector("#score--0").textContent = score1;
  document.querySelector("#score--1").textContent = score2;
  gameOver = false;
  neew();
});

document.querySelector(".btn--new").click();
