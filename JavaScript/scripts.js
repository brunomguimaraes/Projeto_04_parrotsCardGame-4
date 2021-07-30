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
let Ranking = document.querySelector(".ranking-list");
let AllPlayers= [];
let ActivePlayer = ["",0] /* [Player Name, Player pontuation] */

/* -------- End of the global variables -------- */

/* -------- Beginning of the functions running at the opening of the page -------- */

StartTheGame ();

/* -------- End of the functions running at the opening of the page -------- */

/* -------- Beginning of the functions definitions -------- */

function PickNumberOfCards () {
    NumberOfCards = Number(prompt("Insira um número par de cartas entre 4 e 14"));
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
    let ActivePlayerName = prompt("Qual é o seu nome?");
    while (!ActivePlayerName) {
        ActivePlayerName = prompt("Qual é o seu nome?");
    }
    ActivePlayer[0] = ActivePlayerName; 
    PickNumberOfCards ();
    let ShuffledCards = ShuffleCards();
    let CardsHTML = "";
    for (let i = 0 ; i < NumberOfCards; i++) {
        CardsHTML +=`<li onclick="ActivateCard(this)";>
                        <div class="front-face">
                            <img src=${FrontCardImage}/>
                        </div>
                        <div class="back-face">
                            <img src=${ShuffledCards[i]} id="${i}">
                        </div>
                    </li>`;
    }
    document.querySelector(".cards").innerHTML = CardsHTML;
    CorrectCards = 0;
    RoundsCounter = 0;
    StartTimer(document.querySelector(".clock"));
}

function CalculateActiveResult() {
    let ActivePlayerResult = (NumberOfCards*100) - (RoundsCounter*10) - (SecondsCounter);
    ActivePlayer[1] = ActivePlayerResult
}

function WriteFinalMessage () {
    let FinalMessage = `Parabéns, ${ActivePlayer[0]}! Você ganhou em ${RoundsCounter} rodadas e o seu tempo foi de `;
    if ((SecondsCounter - SecondsCounter%60) !== 0) {
        FinalMessage += `${(SecondsCounter - SecondsCounter%60)/60}`;
        if ((SecondsCounter - SecondsCounter%60)/60 === 1){
            FinalMessage += ` minuto e `;
        } else {
            FinalMessage += ` minutos e `;
        }
    }
    FinalMessage += `${SecondsCounter%60} segundos! Você fez incríveis ${ActivePlayer[1]} pontos!`;
    return FinalMessage;
}

function UpdateRanking(){
    let PlayersString = ``;
    let ResultsString = ``;
    let Player = ActivePlayer.slice();
    let InclusionOfPlayer = false;
    if (AllPlayers.length === 0) {
        AllPlayers.push(Player);        
        PlayersString += `<li>1° - ${Player[0]}</li>`;
        ResultsString += `<li><span>${Player[1]} Pontos</span></li>`;
    } else {
        for (let i = 0 ; i < AllPlayers.length ; i++){
            if (Player[1] > AllPlayers[i][1] && !InclusionOfPlayer) {
                AllPlayers.splice(i,0,Player);
                InclusionOfPlayer = true;
            }
            PlayersString += `<li>${i+1}° - ${AllPlayers[i][0]}</li>`;
            ResultsString += `<li><span>${AllPlayers[i][1]} Pontos</span></li>`;
        }
    }
    Ranking.querySelector(".players").innerHTML = PlayersString;
    Ranking.querySelector(".results").innerHTML = ResultsString;
}

function CheckEndOfGame() {
    if (CorrectCards === NumberOfCards ) {
        clearInterval(TimerID);
        CalculateActiveResult();
        UpdateRanking();
        FinalMessage = WriteFinalMessage();
        alert(FinalMessage);
        let CheckRestartGame = prompt("Gostaria de reiniciar o jogo?");
        let AcceptableRestartAnswers = ["Sim","sim","SIM","S","s","Yes","yes","YES","Y","y"]
        if (AcceptableRestartAnswers.includes(CheckRestartGame)) {
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
    if (ActiveCard.src === FirstActivedImage.src) { /*If player got a correct pair*/
        CorrectCards += 2;
    } else {  /*If player got a wrong pair*/
        setTimeout(FlipTwoWrongCards,1000,ClickedLi,FirstActivedImage);
    }
    FirstActivedImage = false; /* Starting a new round*/
    RoundsCounter += 1;
    setTimeout(CheckEndOfGame,100);
}

function ActivateCard(ClickedLi){
    let ActiveImage = ClickedLi.querySelector(".back-face img");
    ClickedLi.classList.add("turned-up");
    if (!FirstActivedImage){ /*If this is the first card played*/
        FirstActivedImage = ActiveImage;
    } else { /*If this is the second card played*/
        if (ActiveImage.id !== FirstActivedImage.id) { /*Making sure the clicked card is not the first one played*/
            TestSecondCard(ClickedLi,ActiveImage);
        }
    }
}
/* -------- End of the functions definitions -------- */

