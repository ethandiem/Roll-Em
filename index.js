document.addEventListener("DOMContentLoaded", function() {
  const buttonContainer = document.getElementById("buttons-container");
  const numberContainer = document.getElementById("number-container");

  for(let n = 1; n <= 10; i++) {
    let holesButton = document.createElement("button");
    holesButton.classList.add("button");
    button.addEventListener("click", function() {
      //functionality of the button holes
    });
    buttonContainer.appendChild(holesButton);

    let numsToTen = document.createElement("span");
        numsToTen.innerText = i;
        numberContainer.appendChild(numsToTen);
    }
});