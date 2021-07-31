/* -------- Beginning of the global variables -------- */

let frontCardImage = `"Images/front.png"`;
let backCardImages = [ 
`"Images/GIFs/Ex Parrot.gif"`,
`"Images/GIFs/It's a stiff.gif"`,
`"Images/GIFs/It rests in peace!.gif"`,
`"Images/GIFs/Lovely Plummage.gif"`,
`"Images/GIFs/Parrot is no more.gif"`,
`"Images/GIFs/Pining for the Fjords.gif"`,
`"Images/GIFs/Wake up!.gif"`
];

let numberOfCards;
let correctCards = 0;
let firstActivedCard;
let roundsCounter = 0;
let secondsCounter = 0;
let timerID;
let ranking = document.querySelector(".ranking-list");
let allPlayers= [];
let activePlayer = {name: "" , score:0};

/* -------- End of the global variables -------- */

/* -------- Beginning of the functions definitions -------- */

/* Beginning of functions to start the game */

function startTheGame () {
    let activePlayerName = prompt("Qual é o seu nome?");
    while (!activePlayerName) {
        activePlayerName = prompt("Qual é o seu nome?");
    }
    activePlayer.name = activePlayerName; 
    pickNumberOfCards();
    distributeCards ()
    restartCounters ();
    startTimer(document.querySelector(".clock"));
}

function pickNumberOfCards () {
    numberOfCards = Number(prompt("Insira um número par de cartas entre 4 e 14"));
    while (numberOfCards%2 !== 0 || numberOfCards< 4 || numberOfCards >14){
        numberOfCards = Number(prompt("Insira um número par de cartas entre 4 e 14"));
    }
}

function distributeCards () {
    let shuffledCards = shuffleCards();
    let cardsHTML = "";
    for (let i = 0 ; i < numberOfCards; i++) {
        cardsHTML +=`<li onclick="activateCard(this)";>
                        <div class="front-face">
                            <img src=${frontCardImage}/>
                        </div>
                        <div class="back-face">
                            <img src=${shuffledCards[i]} id="${i}">
                        </div>
                    </li>`;
    }
    document.querySelector(".cards").innerHTML = cardsHTML;
}

function comparison () { 
    return Math.random() - 0.5; 
}

function shuffleCards () {
    let listOfCards = [];
    let shuffledBackCardImages = backCardImages.sort(comparison);
    for (i=0 ; i < numberOfCards/2 ; i++){
        listOfCards.push(shuffledBackCardImages[i]);
        listOfCards.push(shuffledBackCardImages[i]);
    }
    listOfCards = listOfCards.sort(comparison);
    return listOfCards;
}

function restartCounters () {
    secondsCounter = 0;
    correctCards = 0;
    roundsCounter = 0;
}

function startTimer (clock) {
    let minutes = clock.querySelector(".minutes");
    let seconds = clock.querySelector(".seconds");
    minutes.innerHTML = "00:";
    seconds.innerHTML = "00";
    timerID = setInterval(updateTimer,1000,minutes,seconds);
}

function updateTimer (minutes,seconds) {
    secondsCounter += 1;
    if( secondsCounter%60 < 10) {
        seconds.innerHTML = "0" + secondsCounter%60;
    } else{
        seconds.innerHTML = secondsCounter%60;
    }
    minutes.innerHTML = (secondsCounter - secondsCounter%60)/60;
    if( minutes.innerHTML < 10) {
        minutes.innerHTML = "0" + minutes.innerHTML;
    }
    minutes.innerHTML += ":";
}

/* End of functions to start the game */

/* Beginning of functions resulting of playing the game */

function activateCard (clickedCard) {
    if (!clickedCard.classList.contains("turned-up")){
        clickedCard.classList.add("turned-up");
        if (!firstActivedCard){ /*If this is the first card played*/
            firstActivedCard = clickedCard;
        } else { /*If this is the second card played*/
            testSecondCard(clickedCard);
        }
    }
}

function testSecondCard (clickedCard) {
    let activeImage = clickedCard.querySelector(".back-face img");
    let firstActivedImage = firstActivedCard.querySelector(".back-face img");
    if (activeImage.src === firstActivedImage.src) { /*If player got a correct pair*/
        correctCards += 2;
    } else {  /*If player got a wrong pair*/
        setTimeout(turnWrongCardsDown,1000,clickedCard,firstActivedCard);
    }
    firstActivedCard = false; /* Starting a new round*/
    roundsCounter += 1;
    if (correctCards === numberOfCards ) {
        setTimeout(endOfGame,100)
    }
}

function turnWrongCardsDown (clickedCard,firstActivedCard) {
    firstActivedCard.classList.remove("turned-up");
    clickedCard.classList.remove("turned-up");
}

function endOfGame () {
    clearInterval(timerID);
    calculateActiveScore();
    updateRanking();
    finalMessage = writeFinalMessage();
    alert(finalMessage);
    let checkRestartGame = prompt("Gostaria de reiniciar o jogo?");
    let acceptableRestartAnswers = ["Sim","sim","SIM","S","s","Yes","yes","YES","Y","y"];
    if (acceptableRestartAnswers.includes(checkRestartGame)) {
        startTheGame ();
    }
}

function calculateActiveScore () {
    let activePlayerScore = (numberOfCards*100) - (roundsCounter*10) - (secondsCounter);
    activePlayer.score = activePlayerScore;
}

function writeFinalMessage () {
    let finalMessage = `Parabéns, ${activePlayer.name}! Você ganhou em ${roundsCounter} rodadas e o seu tempo foi de `;
    if ((secondsCounter - secondsCounter%60) !== 0) {
        finalMessage += `${(secondsCounter - secondsCounter%60)/60}`;
        if ((secondsCounter - secondsCounter%60)/60 === 1){
            finalMessage += ` minuto e `;
        } else {
            finalMessage += ` minutos e `;
        }
    }
    finalMessage += `${secondsCounter%60} segundos! Você fez incríveis ${activePlayer.score} pontos!`;
    return finalMessage;
}

function updateRanking () {
    let playersString = ``;
    let scoresString = ``;
    let mostRecentPlayer = Object.assign({},activePlayer); /* Needs to be saved as a copy so it doesn't change when activePlayer is updated */
    let inclusionOfPlayer = false;
    for (let i = 0 ; i < allPlayers.length ; i++){
        if (mostRecentPlayer.score > allPlayers[i].score && !inclusionOfPlayer) { 
            allPlayers.splice(i,0,mostRecentPlayer); /* Increases the array length, next allPlayers[i].score will be the same as the one just checked*/
            inclusionOfPlayer = true; /* Important, otherwise it'd keep on adding mostRecentPlayer to the list */
        }
        playersString += `<li>${i+1}° - ${allPlayers[i].name}</li>`;
        scoresString += `<li><span>${allPlayers[i].score} Pontos</span></li>`;
    }
    if (!inclusionOfPlayer){ /* In case mostRecentPlayer is currently the last place or first one to play */
        allPlayers.push(mostRecentPlayer);        
        playersString += `<li>${allPlayers.length}° - ${mostRecentPlayer.name}</li>`;
        scoresString += `<li><span>${mostRecentPlayer.score} Pontos</span></li>`;
    }
    ranking.querySelector(".players").innerHTML = playersString;
    ranking.querySelector(".scores").innerHTML = scoresString;
}

/* -------- End of the functions definitions -------- */

/* -------- Beginning of the functions running at the opening of the page -------- */

startTheGame ();

/* -------- End of the functions running at the opening of the page -------- */