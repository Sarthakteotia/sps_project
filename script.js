const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-button");
const modalRules = document.querySelector(".modal");

const CHOICES = [
    {
      name: "paper",
      beats: "stone",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "stone",
      beats: "scissors",
    },
  ];

const choiceButtons = document.querySelectorAll(".button");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results_result");
const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");
const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector("#your_score");
const pcNumber = document.querySelector("#computer_score");
let adv1 = 0;
let adv = 0;
let score = 0;

// local storage
if (localStorage.getItem("score")) {
  score = JSON.parse(localStorage.getItem("score"));
}

keepScore.innerHTML = score.your_score;
pcScore.innerHTML = score.computer_score;
/*game logic*/
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
    });
  });
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
  }
  
  function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
  }
  
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="./assets/img-${results[idx].name}.png" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 1000);
    });
  
    gameDiv.classList.toggle("hide");
    resultsDiv.classList.toggle("hide");
  }
  
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());
  
      if (userWins) {
        resultText.innerText = "you win against pc";
        resultDivs[0].classList.toggle("winner");
        keepScore(1);
        
      } else if (aiWins) {
        resultText.innerText = "you lost against pc";
        resultDivs[1].classList.toggle("winner");
        pcScore(1);
      } else {
        resultText.innerText = "Tie up";
      }
      resultWinner.classList.toggle("hide");
      resultsDiv.classList.toggle("show-winner");
    }, 1000);
  }
  
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  
  function keepScore(point) {
    adv = adv + point;
    scoreNumber.innerText = adv;
  }
 function pcScore(point){
  adv1 = adv1 + point;
  pcNumber.innerText = adv1;
 }
  
// Play Again
playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hide");
    resultsDiv.classList.toggle("hide");
  
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hide");
    resultsDiv.classList.toggle("show-winner");
  });
  
// show hide rules 
btnRules.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal')
  });
  btnClose.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal')
  });

