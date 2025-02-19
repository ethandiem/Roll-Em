document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");

  //creating Roll Dice button and adding it to a CSS class and ensuring it's displayed first and above
  const rollButton = document.createElement("button");
  rollButton.innerText = "Roll Dice";
  rollButton.classList.add("roll-button");
  container.prepend(rollButton);

  //creating the Dice and adding it to a CSS class and ensuring it's displayed first and above
  const diceContainer = document.createElement("div");
  diceContainer.classList.add("dice-container");
  container.prepend(diceContainer);

  //Ensuring there are two Dice and adding them to html, adds dice CSS class, adds dice to diceContainer class
  for (let i = 0; i < 2; i++) {
    let dice = document.createElement("div");
    dice.classList.add("dice");
    dice.innerText = "🎲";
    diceContainer.appendChild(dice);
  }

  //creating woodRectangle variable and adding it to number-container to aid with alignment
  const woodRectangle = document.getElementById("number-container");

  //creating buttonContainer for the pins and adds the button Container inside of the woodRectangle to aid with alignment
  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttons-container");
  woodRectangle.appendChild(buttonContainer);

  //Creates numbersContainer and adds the button Container inside of the woodRectangle to aid with alignment
  let numbersContainer = document.createElement("div");
  numbersContainer.classList.add("numbers-container");
  woodRectangle.appendChild(numbersContainer);

  //creates the rollFaces variable and creats CSS class as well as puts it inside the woodRectangle class
  let rollFaces = document.createElement("div");
  rollFaces.classList.add("faces-display");
  woodRectangle.appendChild(rollFaces);

  //dictates the three posible colors the pins can be and defining the pins as an array (used later when defining propor pairs)
  const pinColors = ["#d60000", "#007a0a", "#0003ad"];
  let pins = [];

  //defines the individual pin buttons and creates 10 of them, adding them to the button class
  for (let n = 1; n <= 10; n++) {
    let indivPins = document.createElement("button");
    indivPins.classList.add("button");
    indivPins.setAttribute("data-number", n);

    //sets the pin color randomly based on the three given colors in the array
    let randomColor = pinColors[Math.floor(Math.random() * pinColors.length)];
    indivPins.style.backgroundColor = randomColor;

    //Sets the default behavior for the pins to not be clickable so it can be specified later
    indivPins.disabled = true;
    indivPins.style.cursor = "default";
    buttonContainer.appendChild(indivPins);
    pins.push(indivPins);

    //creates the nums below the pins and uses the same equation as the pins to create the same amount
    let numsToTen = document.createElement("span");
    numsToTen.innerText = n;
    numbersContainer.appendChild(numsToTen);
  }

  // function to fetch a joke
  // function fetchProgrammingJoke() {
  //   fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.joke) {
  //         showMessage(data.joke);
  //       }
  //     })
  //     .catch(err => console.log('Error fetching joke:', err));
  // }

  //Generates 2 "random" numbers to act as the 1st and 2nd rolls as well as disables the button so the user can't roll again + adds the totalRoll
  rollButton.addEventListener("click", function () {
    rollButton.disabled = true;
    rollFaces.innerText = "";
    const firstRoll = Math.floor(Math.random() * 6) + 1;
    const secondRoll = Math.floor(Math.random() * 6) + 1;
    const totalRoll = firstRoll + secondRoll;

    //defines diceElemts to easily access the result of the rolls and convert them into the dice faces with a function below
    const diceElements = document.querySelectorAll(".dice");
    diceElements[0].innerText = getDiceEmoji(firstRoll);
    diceElements[1].innerText = getDiceEmoji(secondRoll);

    //disables the pin buttons after the dice are rolled
    pins.forEach(button => {
      button.disabled = true;
      button.style.cursor = "default";
      button.onclick = null;
    });

    //defines the allowed pair arrays for each totalRoll
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

    //defines the turnsLeft variable and sets default to false, used to indicate when round is over
    let turnsLeft = false;

    //Makes it so that the TotalRoll matches up with an array in allowedPairs and only allows for the buttons available in the array to be pressed
    //sets btn1 to valid Pairs and btn2 to non valid pairs
    if (allowedPairs[totalRoll]) {
      allowedPairs[totalRoll].forEach(pair => {
        const btn1 = pins[pair[0] - 1];
        const btn2 = pair[1] ? pins[pair[1] - 1] : null;

    //Represents if there are turns left and so we do not display the Try Again alert
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

    //Hides the clicked buttons
    function handleClick() {
      btn1.style.visibility = "hidden";
      btn1.style.pointerEvents = "none";
      if (btn2) {
      btn2.style.visibility = "hidden";
      btn2.style.pointerEvents = "none";
      }

    //disables the other pin buttons after a pin is clicked
      pins.forEach(button => {
      button.style.cursor = "default";
      button.disabled = true;
      button.onclick = null
    });

    //re-enables the Roll Dice button so the User can now roll again after removing pins
    rollButton.disabled = false;

    //creates a variable called remainingPins to filter through the pins that are not hidden
    //creates a You Win! message if there are 0 pins left and fetches a quote and puts it above the message
    let remainingPins = pins.filter(btn => btn.style.visibility !== "hidden").length;
    if(remainingPins === 0) {
      showMessage("You Win!");
      fetchRandomQuote();
      rollButton.disabled = true;
    }
  }

  //Continues the flow of the game by calling the handleClick function
    btn1.onclick = handleClick;
      if(btn2) btn2.onclick = handleClick;
      }
    });
  }

  //calls winOrLoss function defined later
  winOrLoss(turnsLeft);
});

//creates an element called resultMessage and a CSS class which starts off as hidden. It is also a child of woodRectangle
let resultMessage = document.createElement("div");
resultMessage.classList.add("result-message");
resultMessage.style.display = "none";
  woodRectangle.appendChild(resultMessage);

//creates a tryAgainButton that is a child of the resultMessage and starts hidden
let tryAgainButton = document.createElement("button");
  tryAgainButton.innerText = "Try Again";
  tryAgainButton.classList.add("try-again-button");
  tryAgainButton.style.display = "none";
  resultMessage.appendChild(tryAgainButton);

//creates a quoteDisplay variable that is displayed in the body separate from all the other variables
  const quoteDisplay = document.createElement("div");
  quoteDisplay.classList.add("quote-display");
  document.body.prepend(quoteDisplay);

//creates function to fetch a random quote from this source and inputs only the Text followed by the author.
  function fetchRandomQuote() {
    fetch("http://api.quotable.io/random")
      .then(response => response.json())
      .then(data => {
        displayQuote(`${data.content} — ${data.author}`);
      })
      .catch(error => {
        displayQuote("Error fetching a quote.", error);
      });
  }

//creates a new function to display the quote inside the quoteDisplay variable
  function displayQuote(quote) {
    if(quote) {
    quoteDisplay.innerHTML = `<p>${quote}</p>`;
    quoteDisplay.style.display = "block";
  } else {
    quoteDisplay.style.display = "none";
    }
  }

//creates a function to reset the game, making all pins visible and returning them to their original functionality
  function resetGame() {
    pins.forEach(button => {
      button.style.visibility = "visible";
      button.style.pointerEvents = "auto";
      button.disabled = true;
    });

  //ensures that the dice return to the 🎲 emoji appearance once the game is reset by making 🎲 the default
    const defaultDiceAppearance = document.querySelectorAll(".dice");
    defaultDiceAppearance.forEach(dice => {
        dice.innerText = "🎲";
      });

  //makes result message, try again button, and quote dissapear
    resultMessage.style.display = "none";
    tryAgainButton.style.display = "none"
    rollButton.disabled = false;
    quoteDisplay.style.display = "none";
  }

  //gives the tryAgainButton the functionality to use the function resetGame when clicked
  tryAgainButton.addEventListener("click", resetGame);

  //defines the winOrLoss function by basically defining a loss, if there are no turns left for the user
function winOrLoss(turnsLeft) {
  if(!turnsLeft) {
  let remainingPins = pins.filter(btn => btn.style.visibility !== "hidden").length;

  //a "Close" message will appear inside the resultMessage after 1.5 seconds and a quote will be fetched
    setTimeout(() => {
      showMessage(`Close! Only ${remainingPins} pins left`);
      fetchRandomQuote();
      rollButton.disabled = true;
    }, 1500);
  }
}

//makes it so the resultMessage box will display the appropriate message
function showMessage(text) {
  resultMessage.innerHTML = `<p> ${text} </p>`;
  resultMessage.appendChild(tryAgainButton);
  resultMessage.style.display = "flex";
  tryAgainButton.style.display = "block";
}

//Defines all the diceFaces used above and asigns the rolls the proper array number in diceFaces and creates 🎲 as the default
  function getDiceEmoji(number) {
    const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return diceFaces[number - 1] || "🎲";
  }
});
