const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let cardOne = null;
let cardTwo = null;
let clickedCard = 0;
let cardsClicked = 0;
let noClicking = false;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (noClicking) return;
  if (event.target.classList.contains("clicked")) return;

// card that is clicked will have color applied to it
let clickedCard = event.target;
clickedCard.style.backgroundColor = clickedCard.classList[0];


//if not cardone(null) or not card two(null) adding clicked to classlist
 if (!cardOne || !cardTwo) {
  clickedCard.classList.add("clicked");
  cardOne = cardOne || clickedCard;
  cardTwo = clickedCard === cardOne ? null : clickedCard;
  }

  if (cardOne && cardTwo) {
    noClicking = true;//applying logic to not click when two cards are not selected

    let elementOne = cardOne.className;
    let elementTwo = cardTwo.className;

    //checking to see if cards match, if they match remove being able to click it. 
    //Will then reset cardOne and CardTwo to null
    if (elementOne === elementTwo) {
      cardsClicked += 2;
      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);
      cardOne = null;
      cardTwo = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        cardOne.style.backgroundColor = "";
        cardTwo.style.backgroundColor = "";
        cardOne.classList.remove("clicked");
        cardTwo.classList.remove("clicked");
        cardOne = null;
        cardTwo = null;
        noClicking = false;
      }, 1000);
    }
  }
  
  if(cardsClicked === COLORS.length)
  alert("GAME OVER");
  
}

// when the DOM loads
createDivsForColors(shuffledColors);
