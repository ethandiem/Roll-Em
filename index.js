document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");

  const rollButton = document.createElement("button");
  rollButton.innerText = "Roll Dice";
  rollButton.classList.add("roll-button");
  container.prepend(rollButton);

  const diceContainer = document.createElement("div");
  diceContainer.classList.add("dice-container");
  container.prepend(diceContainer);

  for (let i = 0; i < 2; i++) {
    let dice = document.createElement("div");
    dice.classList.add("dice");
    dice.innerText = "🎲";
    diceContainer.appendChild(dice);
  }

  const rectangle = document.getElementById("number-container");

  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttons-container");
  rectangle.appendChild(buttonContainer);

  let numbersContainer = document.createElement("div");
  numbersContainer.classList.add("numbers-container");
  rectangle.appendChild(numbersContainer);

  let messageDisplay = document.createElement("div");
  messageDisplay.classList.add("message-display");
  rectangle.appendChild(messageDisplay);

  const colors = ["#d60000", "#007a0a", "#0003ad"];
  let buttons = [];

  for (let n = 1; n <= 10; n++) {
    let holesButton = document.createElement("button");
    holesButton.classList.add("button");
    holesButton.setAttribute("data-number", n);

    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    holesButton.style.backgroundColor = randomColor;

    holesButton.disabled = true;
    holesButton.style.cursor = "default";
    buttonContainer.appendChild(holesButton);
    buttons.push(holesButton);

    let numsToTen = document.createElement("span");
    numsToTen.innerText = n;
    numbersContainer.appendChild(numsToTen);
  }

  rollButton.addEventListener("click", function () {
    messageDisplay.innerText = "";
    const firstRoll = Math.floor(Math.random() * 6) + 1;
    const secondRoll = Math.floor(Math.random() * 6) + 1;
    const totalRoll = firstRoll + secondRoll;

    const diceElements = document.querySelectorAll(".dice");
    diceElements[0].innerText = getDiceEmoji(firstRoll);
    diceElements[1].innerText = getDiceEmoji(secondRoll);


    buttons.forEach(button => {
      button.disabled = true;
      button.style.cursor = "default";
      button.onclick = null;
    });


    const allowedPairs = {
      2: [[2]],
      3: [[2, 1], [3]],
      4: [[3, 1], [4]],
      5: [[4, 1], [3, 2], [5]],
      6: [[4, 2], [1, 5], [6]],
      7: [[3, 4], [6, 1], [5, 2], [7]],
      8: [[5, 3], [6, 2], [1, 7], [8]],
      9: [[5, 4], [6, 3], [7, 2], [8, 1], [9]],
      10: [[3, 7], [6, 4], [2, 8], [1, 9], [10]],
      11: [[3, 8], [6, 5], [2, 9], [1, 10], [4, 7]],
      12: [[5, 7], [8, 4], [3, 9], [10, 2]],
    };

    let turnsLeft = false;

    if (allowedPairs[totalRoll]) {
      allowedPairs[totalRoll].forEach(pair => {

        const btn1 = buttons[pair[0] - 1];
        const btn2 = pair[1] ? buttons[pair[1] - 1] : null;

        if (
          btn1.style.visibility !== "hidden" &&
          (!btn2 || btn2.style.visibility !== "hidden")
        ) {
        btn1.disabled = false;
        btn1.style.cursor = "pointer";
        if (btn2) {
          btn2.disabled = false;
          btn2.style.cursor = "pointer";
        }

      turnsLeft = true;

    function handleClick() {
      btn1.style.visibility = "hidden";
      btn1.style.pointerEvents = "none";
      if (btn2) {
      btn2.style.visibility = "hidden";
      btn2.style.pointerEvents = "none";
      }

    buttons.forEach(button => {
      button.style.cursor = "default";
      button.disabled = true;
      button.onclick = null
    });
  }

    btn1.onclick = handleClick;
      if(btn2) btn2.onclick = handleClick;
      }
    });
  }

  winOrLoss(turnsLeft);
});

let resultMessage = document.createElement("div");
resultMessage.classList.add("result-message");
resultMessage.style.display = "none";
  rectangle.appendChild(resultMessage);

  function showMessage(text) {
    resultMessage.innerText = text;
    resultMessage.style.display = "flex";
  }

function winOrLoss(turnsLeft) {
  let remainingButtons = buttons.filter(btn => btn.style.visibility !== "hidden").length;

  if(remainingButtons === 0) {
    showMessage("You Win!");
    rollButton.disabled = true;
  } else if(!turnsLeft) {
    setTimeout(() => {
      showMessage(`Close! Only ${remainingButtons} pins left`);
      rollButton.disabled = true;
    }, 2500);
  }
}
  function getDiceEmoji(number) {
    const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return diceFaces[number - 1] || "🎲";
  }
});
