let myDeck,
    lastClick,
    flippedCards = [];
    
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
   const deck = document.querySelector(".deck");
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
    // console.log(card.target);
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
    for(let i = 0; i<flippedCards.length; i++){
        flippedCards[i].parentElement.removeEventListener("click", clickCard);
    }
    flippedCards = [];
}

function cardsNotMatched() {
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
function gameEnd(){


}

function gameStart(){
    createDeck();
    createGameboard();
}
gameStart();