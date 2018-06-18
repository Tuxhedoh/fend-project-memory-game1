let myDeck,
    lastClick,
    moves = 0,
    flippedCards = [],
    matches = 0,
    myStars ="",
    score,
    totalSeconds = 0;

    
const moveTracker = document.querySelector(".moves"),
      restartBtn = document.querySelector(".restart"),
      stars = document.querySelector(".stars"),
      timer = document.querySelector(".timer"),
      deck = document.querySelector(".deck"),
      fullStar =`<li><i class="fa fa-star"></i></li>`,
      halfStar =`<li><i class="fa fa-star-half-o"></i></li>`,
      timerVar = setInterval(countTimer, 1000),
      resetModal = document.getElementById('resetModal'),
      winModal = document.getElementById('winModal'),
      yourScore = document.querySelector(".scoreSpan"),
      resetBtn = document.getElementsByClassName("resetBtn"),
      closeBtn = document.getElementsByClassName("close")[0];


restartBtn.addEventListener("click",gameStart);
    
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

// Feature
    // flipping cards
    // match cards
    // diamond, plane, anchor, paper-plane, bolt, leaf, bicycle, bomb


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
        } else {
            cardsNotMatched();
        }
    }    
    if(flippedCards.length > 2){
        resetCards();
    }
}

function cardsMatched(){                // we need to do some more stuff here
    console.log("You Matched!");
    matches++;
    buildStarsString(matches);

    for(let i = 0; i<flippedCards.length; i++){
        flippedCards[i].parentElement.removeEventListener("click", clickCard);
        flippedCards[i].parentElement.classList.add("match");
    }
    flippedCards = [];

    gameWin();
}

function gameWin(){
    yourScore.innerText = score;
    if(matches === 8){
        winModal.style.display = "block";
    }
}

function cardsNotMatched() {
    deck.classList.add("shake");
    console.log("Keep Trying");
    
}

function compareCards(array) {  // checking for match
            const class1 = array[0].classList[1];
            const class2 =array[1].classList[1];
            return (class1 === class2)   // if the cards match, return true, otherwise false   
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

function buildStarsString(matches){
    myStars="";
    let wholeStars = Math.floor(matches / 2);
    let partialStars = matches %2;
    for(let i = 0; i< wholeStars; i++){
        myStars+=fullStar;
    }
    if(partialStars){
        myStars+=halfStar;
    }
    stars.innerHTML = myStars;
}


function gameEnd(){


}

function gameStart(){
    totalSeconds=0;
    createDeck();
    createGameboard();
    resetModal.style.display="none";
    winModal.style.display="none";
    
    
    
    if(moves === 0){
        stars.innerHTML=`<li><i class="fa fa-star-o"></i></li>
    <li><i class="fa fa-star-o"></i></li>
    <li><i class="fa fa-star-o"></i></li>
    <li><i class="fa fa-star-o"></i></li>
    `} else {
        stars.innerHTML="";
    }
    moves = 0;
    moveTracker.innerText = moves;

}
gameStart();

// https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function countTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds /3600);
    let minute = Math.floor((totalSeconds - hour*3600)/60);
    let seconds = totalSeconds - (hour*3600 + minute*60);
    score =   minute + "m :" + seconds+"s"
    timer.innerHTML =  score;
} 

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