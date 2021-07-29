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
let FirstActivedCard;

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
        CardsList +=`<li onclick="TurnCardUp(this)";>
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




function TurnCardUp(ThisElement){
    let ActiveCard = ThisElement.querySelector(".back-face img");
    let CardSource = ActiveCard.src
    let CardID = ActiveCard.id;
    if (!FirstActivedCard){ /*If this is the first card played*/
        ThisElement.classList.add("turned-up");
        FirstActivedCard = ActiveCard;
        console.log()
    } else { /*If this is the second card played*/
        if (CardID !== FirstActivedCard.id) { /*Making sure the clicked card is not the first one played*/
            if (CardSource === FirstActivedCard.src) { /*If player got a correct pair*/
                ThisElement.classList.add("turned-up");
            } else {  /*If player got a wrong pair*/
                FirstActivedCard.parentNode.parentNode.classList.remove("turned-up");
                ThisElement.classList.remove("turned-up");
            }
            FirstActivedCard = undefined;
        }
    }
}

/* -------- End of the functions definitions -------- */

