/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
{/* 
    <li class="card">
        <i class="fa fa-leaf"></i>
    </li>
 */}
function createCard(className) {
    return myCard =
    `<li class="card open show">
        <i class="fa ${className}"></i>
    </li>`
}
let myDeck 
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
function createGameboard(){
   document.querySelector(".deck").innerHTML = myDeck.join("\n");
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