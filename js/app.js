// Define Global Variables
let myDeck,
    lastClick,
    moves = 0,
    flippedCards = [],
    matches = 0,
    myStars = 0,
    score = 0,
    totalSeconds = 0,
    timerVar = setInterval(countTimer, 1000),
    runningTimer=false;

    
const moveTracker = document.querySelector(".moves"),
      restartBtn = document.querySelector(".restart"),
      stars = document.querySelector(".stars"),
      timer = document.querySelector(".timer"),
      
      deck = document.querySelector(".deck"),
      fullStar =`<li><i class="fa fa-star"></i></li>`,
      halfStar =`<li><i class="fa fa-star-half-o"></i></li>`,
      emptyStar =`<li><i class="fa fa-star-o"></i></li>`,
      resetModal = document.getElementById('resetModal'),
      winModal = document.getElementById('winModal'),
      yourScore = document.querySelector(".scoreSpan"),
      resetBtn = document.getElementsByClassName("resetBtn"),
      closeBtn = document.getElementsByClassName("close")[0];

// Event Listeners

// Modal Logic
    // Close Modal without reset.
window.addEventListener("click", function(e){
    if (e.target == winModal || e.target == resetModal) {
        e.target.style.display = "none";
    }
})

restartBtn.addEventListener("click",function(){
    resetModal.style.display="block";
});

for(let i =0; i< resetBtn.length; i++){
    resetBtn[i].addEventListener("click",gameStart);
 
}

    
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Game Functions
//create a single card    
function createCard(className) {
    return myCard =
    `<li class="card">
        <i class="fa ${className}"></i>
    </li>`
}

// create the deck of cards
function createDeck(){
    myDeck = [];
    const suites=["fa-diamond","fa-paper-plane","fa-anchor","fa-bolt","fa-leaf","fa-bicycle","fa-bomb","fa-cube"];
    for(let suite of suites){
        for(let i = 0; i<2; i++){
            myDeck.push(createCard(suite));
        }
    }
    return shuffle(myDeck);
}

// add the deck of cards to the gameboard.
function createGameboard(){
   
   deck.innerHTML = myDeck.join("\n");

   const cards = document.querySelectorAll(".card");
   for(card of cards){
        card.addEventListener('click',clickCard)
   }
}

function clickCard(card){   // when we click a card what happens?
    if(!runningTimer){
        runningTimer=true;
        timerVar = setInterval(countTimer, 1000);
    }
    // console.log(card);
    if(lastClick === card) {
        console.log("Clicked the same card twice");
    } else {
        lastClick = card;
        flipCard(card.target);
    }
}

function flipCard(card){            // what happens when card is clicked?
    moves++;
    moveTracker.innerText=moves;
    card.removeEventListener("click",clickCard)
    card.classList.add("show");     // shows the card
    card.classList.add("open");  
    flippedCards.push(card.lastElementChild);   // adds clicked card to flippedCards array

    if(flippedCards.length === 2){ 
        if(compareCards(flippedCards)){ 
            cardsMatched();                
        }
    }    
    if(flippedCards.length > 2){
        resetCards();
    }
}

function gameWin(){
    yourScore.innerText = score;
    if(matches === 8){
        winModal.style.display = "block";
    }
}

function compareCards(array) {  // checking for match
            const class1 = array[0].classList[1];
            const class2 =array[1].classList[1];
            return (class1 === class2)   // if the cards match, return true, otherwise false   
}

function cardsMatched(){              // When a card matches we do this 
    matches++;

    for(let i = 0; i<flippedCards.length; i++){
        flippedCards[i].parentElement.removeEventListener("click", clickCard);
        flippedCards[i].parentElement.classList.add("match");
    }
    flippedCards = [];

    gameWin();
}

function resetCards(){  // after 2 cards are clicked and not matched

    if(flippedCards.length>2){
        let lastClicked = flippedCards.pop();
        for(let i=0; i < flippedCards.length; i++){
            flippedCards[i].parentElement.addEventListener("click", clickCard);
            flippedCards[i].parentElement.classList.remove("show");
            flippedCards[i].parentElement.classList.remove("open");
            
        }
        flippedCards =[lastClicked];
    }
    
}

function gameStart(){
    runningTimer=false;
    clearInterval(timerVar);
    totalSeconds=0;
    score =   "0 min 0 secs";
    matches=0;
    moves = 0;
    moveTracker.innerText = moves;
    stars.innerHTML=fullStar+fullStar+fullStar+fullStar;
    timer.innerHTML =  score;
    
    resetModal.style.display="none";
    winModal.style.display="none";

    createDeck();
    createGameboard();
}


// https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

function countTimer() {
        ++totalSeconds;
        let hour = Math.floor(totalSeconds /3600);
        let minute = Math.floor((totalSeconds - hour*3600)/60);
        let seconds = totalSeconds - (hour*3600 + minute*60);
        score =   minute + " min " + seconds+" secs"
        timer.innerHTML =  score;
        newStars(totalSeconds);
} 

function newStars(num){
       
    switch(true){
        case num <= 30:
            stars.innerHTML=fullStar+fullStar+fullStar+fullStar;
            break;
        case num  > 30 && num <=60 :
            stars.innerHTML=fullStar+fullStar+fullStar+halfStar;
            break;
        case num  > 60 && num <=90 :
            stars.innerHTML=fullStar+fullStar+fullStar+emptyStar;
            break;
        case num  > 90 && num <=120 :
            stars.innerHTML=fullStar+fullStar+halfStar+emptyStar;
            break;
        case num  > 120 && num <=150 :
            stars.innerHTML=fullStar+fullStar+emptyStar+emptyStar;
            break;
        case num  > 150 && num <=180 :
            stars.innerHTML=fullStar+halfStar+emptyStar+emptyStar;
            break;
        case num  > 180 && num <=210 :
            stars.innerHTML=fullStar+emptyStar+emptyStar+emptyStar;
            break;
        case num  > 210 && num <= 240:
            stars.innerHTML = halfStar+emptyStar+emptyStar+emptyStar;
            break;
        case num  > 240 :
            stars.innerHTML=emptyStar+emptyStar+emptyStar+emptyStar;
            break;
        default:
            console.log("Not matching any condition")
    }
}



gameStart();