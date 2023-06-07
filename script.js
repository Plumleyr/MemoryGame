const gameContainer = document.getElementById("game");
const card = document.getElementsByClassName('card');
const resetDiv = document.getElementById('reset');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const score = document.getElementById('score');
const lowestScoreH2 = document.getElementById('lowestscore');
const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow"
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

// creates an object from the shuffled colors array
let shuffledObject = {};
function createShuffledObject(){
    for (let i = 0; i < shuffledColors.length; i++) {
        let object = {id: i, color: shuffledColors[i], isToggled: false};
        shuffledObject[i] = object;
    }
}


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let i = 0; i < colorArray.length; i++) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(colorArray[i]);
    newDiv.classList.add('card');
    newDiv.setAttribute("id", i);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    }
}

// click on card variables
let clickCount = 0;
let cards = [];
let matchedCards = [];
let scoreCount = 0;
// when you click on a card
function handleCardClick(event) {
    const clickedCard = event.target;

    if (clickCount <  2 && !shuffledObject[clickedCard.id].isToggled) {
        clickCount++;
        clickedCard.style.backgroundColor = shuffledObject[clickedCard.id].color;
        shuffledObject[clickedCard.id].isToggled = true;
        cards.push(clickedCard.id);

    }

    if(clickCount === 2 && shuffledObject[cards[0]].color === shuffledObject[cards[1]].color){
    clickCount = 0;
    scoreCount++;
    updateScore();
    matchedCards.push(cards[0], cards[1]);
    cards = [];
    if(matchedCards.length === shuffledColors.length){
        setLowestScore();
        alert('You win!');
    }
    }else if(clickCount === 2) {
    setTimeout(function(){
        for(let i = 0; i < cards.length; i++) {
            document.getElementById(cards[i]).style.backgroundColor = 'transparent';
            shuffledObject[cards[i]].isToggled = false;
        }
        scoreCount++;
        clickCount = 0;
        cards = [];
        updateScore();
    },1000);
    }
}
// when game starts
function startGame(){
    createShuffledObject();
    updateScore();
    createDivsForColors(shuffledColors);
    startBtn.style.display = 'none';
    resetButton();
    getLowestScore();
}

// creates reset button
function resetButton(){
    resetDiv.style.display = "flex";
    resetBtn.style.display = "flex";
}

resetBtn.addEventListener('click', function(){
    gameContainer.innerHTML='';
    shuffle(COLORS);
    shuffledColors = COLORS;
    scoreCount = 0;
    matchedCards = [];
    score.style.display = 'none';
    resetBtn.style.display= 'none';
    startBtn.style.display='block';
})

//score
function updateScore(){
    score.style.display = 'flex';
    score.innerText =`Score: ${scoreCount}`;
}

// get lowest score
let lowestScore;
function getLowestScore(){
    let getLowestScore;
    if(localStorage.getItem('lowestScore') !== null){
       getLowestScore = parseInt(localStorage.getItem('lowestScore'));
        lowestScoreH2.innerText = `Lowest Score: ${getLowestScore}`;
    }
}
// update Lowest Score
function setLowestScore(){
    if(localStorage.getItem('lowestScore') === null){
        lowestScore = Infinity;
    } else{
        lowestScore = parseInt(localStorage.getItem('lowestScore'));
    }
    if(scoreCount < lowestScore){
        lowestScore = scoreCount;
        localStorage.setItem('lowestScore', lowestScore);
        lowestScoreH2.innerText = `Lowest Score: ${lowestScore}`;
    }
}
