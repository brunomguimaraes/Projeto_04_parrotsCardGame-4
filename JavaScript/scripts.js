/* -------- Beginning of the global variables -------- */

let NumberOfCards;

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

function AddCardsIntoGame () {
    let CardCounter = 0;
    let CardsList = "";
    while (CardCounter < NumberOfCards) {
        CardsList += `<li><img src="Images/front.png"></li>`;
        CardCounter ++;
    }
    document.querySelector(".cards").innerHTML = CardsList;
}

/* -------- End of the functions definitions -------- */

