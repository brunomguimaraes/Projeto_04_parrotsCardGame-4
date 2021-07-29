/* -------- Beginning of the global variables -------- */

let FrontCardImage = `"Images/front.png"`;
let BackCardImages = [ 
`"Images/GIFs/Ex Parrot.gif"`,
`"Images/GIFs/It's a stiff.gif"`,
`"Images/GIFs/It rests in peace!.gif"`,
`"Images/GIFs/Lovely Plummage.gif"`,
`"Images/GIFs/Parrot is no more.gif"`,
`"Images/GIFs/Pining for the Fjords.gif"`,
`"Images/GIFs/Wake up!.gif"`
]

let NumberOfCards;
let CorrectCards = 0;
let FirstActivedImage;
let RoundsCounter = 0;

/* -------- End of the global variables -------- */

/* -------- Beginning of the functions running at the opening of the page -------- */

PickNumberOfCards ();
AddCardsIntoGame ();

/* -------- End of the functions running at the opening of the page -------- */

/* -------- Beginning of the functions definitions -------- */

function PickNumberOfCards () {
    while (NumberOfCards%2 !== 0 || NumberOfCards< 4 || NumberOfCards >14){
        NumberOfCards = Number(prompt("Insira um número par de cartas entre 4 e 14"));
    }
}

function comparison() { 
	return Math.random() - 0.5; 
}

function ShuffleCards() {
    let ListOfCards = [];
    let ShuffledBackCardImages = BackCardImages.sort(comparison);
    for (i=0 ; i < NumberOfCards/2 ; i++){
        ListOfCards.push(ShuffledBackCardImages[i]);
        ListOfCards.push(ShuffledBackCardImages[i]);
    }
    ListOfCards = ListOfCards.sort(comparison);
    return ListOfCards
}

function AddCardsIntoGame () {
    let ShuffledCards = ShuffleCards();
    let CardsList = "";

    for (let i = 0 ; i < NumberOfCards; i++) {
        CardsList +=`<li onclick="ActivateCard(this)";>
                        <div class="front-face">
                            <img src=${FrontCardImage}/>
                        </div>
                        <div class="back-face">
                            <img src=${ShuffledCards[i]} id="${i}">
                        </div>
                    </li>`;
    }
    document.querySelector(".cards").innerHTML = CardsList;
}

function CheckEndOfGame() {
    if (CorrectCards === NumberOfCards ) {
        alert(`Parabéns! Você ganhou em ${RoundsCounter} Rodadas!`);
    }
}

function TestSecondCard(ClickedLi,ActiveCard) {
    if (ActiveCard.src === FirstActivedImage.src) { /*If player got a correct pair*/
        ClickedLi.classList.add("turned-up");
        CorrectCards += 2;
    } else {  /*If player got a wrong pair*/
        FirstActivedImage.parentNode.parentNode.classList.remove("turned-up");
        ClickedLi.classList.remove("turned-up");
    }
    FirstActivedImage = undefined;
    RoundsCounter += 1;
    CheckEndOfGame();
}



function ActivateCard(ClickedLi){
    let ActiveImage = ClickedLi.querySelector(".back-face img");
    if (!FirstActivedImage){ /*If this is the first card played*/
        ClickedLi.classList.add("turned-up");
        FirstActivedImage = ActiveImage;
    } else { /*If this is the second card played*/
        if (ActiveImage.id !== FirstActivedImage.id) { /*Making sure the clicked card is not the first one played*/
            TestSecondCard(ClickedLi,ActiveImage);
        }
    }
}

/* -------- End of the functions definitions -------- */

