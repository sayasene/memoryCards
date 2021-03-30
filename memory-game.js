"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    let counter=0; //temporary element name in order to assign classnames and event listeners
    counter=document.createElement('div');
    counter.className=color;
    counter.classList.add('cardDiv');
    counter.style.background='white';
    counter.addEventListener('click',handleCardClick);
    document.getElementById("game").appendChild(counter);
    counter++;
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.style.background=card.classList.item(0);
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.background='white';
}

/** Handle clicking on a card: this could be first-card or second-card. */

let clickCounter=0;
let card1='';
let card2='';
let cardDivs=document.getElementsByClassName('cardDiv');
let divArray=[...cardDivs];
let flippedCount=0;

function handleCardClick(evt) {
  let card=evt.target;
  //if click counter is 0 flip and add class
  if(clickCounter===0){
    flipCard(card);
    card1=card;
    card1.classList.add('flipped');
    flippedCount++;
    clickCounter++;
  }

  else if(clickCounter===1){
    flipCard(card);
    card2=card;
    card2.classList.add('flipped');
    flippedCount++;
    clickCounter++;
  }


  while(clickCounter===2){
    //if number of cards with class 'flipped' is 2, disable clicks on other cards
    if(card1.style.background!==card2.style.background){
      setTimeout(function(){
        unFlipCard(card1)
        unFlipCard(card2)
      },1000);
      divArray.forEach(div => {
        div.classList.remove("flipped","disable")
      });
      clickCounter=0;
      flippedCount=0;
    }
    else if(card1.style.background===card2.style.background){
      card1.classList.add("matched");
      card2.classList.add("matched");
      divArray.forEach(div => {
        div.classList.remove("flipped","disable")
      });
      clickCounter=0;
      flippedCount=0;
    }
  }
}
