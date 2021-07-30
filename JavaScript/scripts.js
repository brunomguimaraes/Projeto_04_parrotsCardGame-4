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
let SecondsCounter = 0;
let TimerID;

/* -------- End of the global variables -------- */

/* -------- Beginning of the functions running at the opening of the page -------- */

PickNumberOfCards ();
StartTheGame ();

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

function UpdateTimer(Minutes,Seconds) {
    SecondsCounter += 1;
    if( SecondsCounter%60 < 10) {
        Seconds.innerHTML = "0" + SecondsCounter%60;
    } else{
        Seconds.innerHTML = SecondsCounter%60;
    }
    Minutes.innerHTML = (SecondsCounter - SecondsCounter%60)/60;
    if( Minutes.innerHTML < 10) {
        Minutes.innerHTML = "0" + Minutes.innerHTML;
    }
    Minutes.innerHTML += ":"
}

function StartTimer(Clock) {
    let Minutes = Clock.querySelector(".minutes");
    let Seconds = Clock.querySelector(".seconds");
    Minutes.innerHTML = "00:";
    Seconds.innerHTML = "00";
    SecondsCounter = 0;   
    TimerID = setInterval(UpdateTimer,1000,Minutes,Seconds);
}



function StartTheGame () {
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
    CorrectCards = 0;
    RoundsCounter = 0;
    StartTimer(document.querySelector(".clock"));
}

function WriteFinalMessage () {
    let FinalMessage = `Parabéns! Você ganhou em ${RoundsCounter} Rodadas! Seu tempo foi de `;
    if ((SecondsCounter - SecondsCounter%60) !== 0) {
        FinalMessage += `${(SecondsCounter - SecondsCounter%60)/60}`;
        if ((SecondsCounter - SecondsCounter%60)/60 === 1){
            FinalMessage += ` minuto e `;
        } else {
            FinalMessage += ` minutos e `;
        }
    }
    FinalMessage += `${SecondsCounter%60} segundos!`;
    return FinalMessage;
}

function CheckEndOfGame() {
    if (CorrectCards === NumberOfCards ) {
        clearInterval(TimerID);
        FinalMessage = WriteFinalMessage();
        alert(FinalMessage);
        let CheckRestartGame = prompt("Gostaria de reiniciar o jogo?");
        if (CheckRestartGame === "Sim" || CheckRestartGame === "sim" || CheckRestartGame === "SIM" || CheckRestartGame === "S"|| CheckRestartGame === "s") {
            PickNumberOfCards ();
            StartTheGame ();
        }
    }
}

function FlipTwoWrongCards (ClickedLi,FirstActivedImage) {
    FirstActivedLi = FirstActivedImage.parentNode.parentNode;
    FirstActivedLi.classList.remove("turned-up");
    ClickedLi.classList.remove("turned-up");
}

function TestSecondCard(ClickedLi,ActiveCard) {
    ClickedLi.classList.add("turned-up");
    if (ActiveCard.src === FirstActivedImage.src) { /*If player got a correct pair*/
        CorrectCards += 2;
    } else {  /*If player got a wrong pair*/
        setTimeout(FlipTwoWrongCards,1000,ClickedLi,FirstActivedImage);
    }
    FirstActivedImage = undefined; /* Starting a new round*/
    RoundsCounter += 1;
    setTimeout(CheckEndOfGame,100);
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

