let myDeck;
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
   deck.addEventListener('click',function(e){  //click listener to flip cards.
    flippedCards.push(e.target.firstElementChild.classList);
   })
   
}

function flipCard(card1, card2){


}

function compareCards(card1, card2) {


}

function gameEnd(){


}

function gameStart(){
    createDeck();
    createGameboard();
}
gameStart();