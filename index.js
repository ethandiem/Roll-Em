document.addEventListener("DOMContentLoaded", function() {
  const rectangle = document.getElementById("number-container");

  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttons-container");
  rectangle.appendChild(buttonContainer);

  let numbersContainer = document.createElement("div");
  numbersContainer.classList.add("numbers-container");
  rectangle.appendChild(numbersContainer);

  for (let n = 1; n <= 10; n++) {
      let holesButton = document.createElement("button");
      holesButton.classList.add("button");
      holesButton.innerText = `Button ${n}`;
      holesButton.addEventListener("click", function() {
          alert(`You clicked Button ${n}`);
      });
      buttonContainer.appendChild(holesButton);

      let numsToTen = document.createElement("span");
      numsToTen.innerText = n;
      numbersContainer.appendChild(numsToTen);
  }
});
