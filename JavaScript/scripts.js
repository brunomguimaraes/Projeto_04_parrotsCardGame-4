/* -------- Beginning of the global variables -------- */

let CardsNumber;

/* -------- End of the global variables -------- */

/* -------- Beginning of the functions running at the opening of the page -------- */

PickCardsNumber ()

/* -------- End of the functions running at the opening of the page -------- */

/* -------- Beginning of the functions definitions -------- */

function PickCardsNumber () {
    while (CardsNumber%2 !== 0 || CardsNumber< 4 || CardsNumber >14){
        CardsNumber = Number(prompt("Insira um número par de cartas entre 4 e 14"));
    }
    alert("Deu certo!")
}

/* -------- End of the functions definitions -------- */

