// Zadanie 1 : Twój wiek w dniach
function ageInDays(){
var birthYear = prompt('W którym roku się urodziłeś ?');
var ageInDayzz=(2019 - birthYear)*365;
var h1 = document.createElement('h1');
var textAnswer = document.createTextNode('Masz '+ageInDayzz+' dni !');
h1.setAttribute('id','ageInDays');
h1.appendChild(textAnswer);
document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

//Zadanie 2 : Generator kotów
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById("flex-cat-gen");
    image.src= "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Zadanie 3 : Papier, Kamień, Norzyce
function rpsGame(yourChoice){
    //console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randomToRpsInt());
    //console.log('Computer choice:',botChoice);
    results = decideWinner(humanChoice,botChoice); //[0,1] human lost,bot won
   //console.log(results)
    message = finalMessage(results); // dictionary=object in javascript {'message' : 'Wygrałeś !', 'color': 'green'}
    //console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randomToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDataBase ={
        'rock' : {'scissors':1 ,'rock':0.5, 'paper':0},
        'paper': {'rock':1, 'paper':0.5, 'scissors':0},
        'scissors':{'paper':1, 'scissors':0.5, 'rock':0}
    };

var yourScore = rpsDataBase[yourChoice][computerChoice];
var computerChoice = rpsDataBase[computerChoice][yourChoice];

return [yourScore, computerChoice];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0) {
        return {'message':'Przegrałeś !','color':'red'};
    }else if (yourScore ===0.5){
        return{'message': 'Remis !','color':'yellow'};
    }else {
        return{'message':'Wygrałeś !','color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice, finalMessage){
    var imagesDataBase = {
        'rock':document.getElementById("rock").src,
        'paper':document.getElementById("paper").src,
        'scissors':document.getElementById("scissors").src
    }
    //usunąć wszyskie zdjęcia
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv= document.createElement('div');
    var BotDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML="<img src='" + imagesDataBase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,58,233,1);'>"
    messageDiv.innerHTML="<h1 style='color: "+ finalMessage['color'] +"; font-size:60px: padding:30px; '>" + finalMessage['message'] + "</h1>"
    BotDiv.innerHTML="<img src='" + imagesDataBase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"
    

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(BotDiv);

   
}
 
//Zadanie 4 zmiana kolorów wszystkich przycisków

var allButtons=document.getElementsByTagName('button');
var copyAllButtons =[];
for (let i=0; i<allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1]);
}
//console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonsRed();
    }else if (buttonThingy.value === 'green'){
        buttonsGreen();
    }else if (buttonThingy.value === 'random'){
        randomColors();
    }else if (buttonThingy.value === 'reset'){
        buttonColorReset();
    }
}

function buttonsRed(){
    for (let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for (let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for (let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    let choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success']
    for (let i=0; i< allButtons.length; i++){
    let randomNumber = [Math.floor(Math.random()*4)];
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(choices[randomNumber]);

    }
}

//Zadanie 5 : BlackJack
let blackJackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score':0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,"K":10,'J':10,'Q':10,'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackJackGame['you']
const DEALER =blackJackGame['dealer']

const hitSound = new Audio('blackjack/sounds/swish.m4a');
const winSound = new Audio('blackjack/sounds/cash.mp3');
const lossSound = new Audio('blackjack/sounds/aww.mp3')

document.querySelector('#blackjack-1-button').addEventListener('click',blackjack1);
document.querySelector('#blackjack-2-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-3-button').addEventListener('click',blackjack3);

function blackjack1(){
    if (blackJackGame['isStand'] === false){
let card = randomCard();
showCard(card, YOU);
updateScore(card,YOU);
showScore(YOU);
    }
}

function randomCard(){
    let randomIndex =Math.floor(Math.random()*13);
    return blackJackGame['cards'][randomIndex]
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `blackjack/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjack3(){
    if (blackJackGame['turnsOver'] === true){

    blackJackGame['isStand']=false;

    //showResult(computeWinner());
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');


    for (i=0; i <yourImages.length; i++) {
        yourImages[i].remove();
    }
    for (i=0; i <dealerImages.length; i++) {
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] =0;

    document.querySelector('#your-blackjack-result').textContent =0;
    document.querySelector('#dealer-blackjack-result').textContent =0;

    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

    document.querySelector('#blackjackResult').textContent = 'Zagrajmy !';
    document.querySelector('#blackjackResult').style.color = 'black';

    blackJackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer){
    // jeśli dodanie 11 będzie poniżej 21 , dodaj 11 inaczej 1
    if (card === 'A'){
    if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
        activePlayer['score'] += blackJackGame['cardsMap'][card][1];
    }else{
        activePlayer['score'] += blackJackGame['cardsMap'][card][0];
    }
    }else {
    activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Niepowodzenie';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

    }else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise (resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    blackJackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackJackGame['isStand']  === true){
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep (1000);
    }

    blackJackGame['turnsOver'] = true;
    let winner =computeWinner();
    showResult(winner);
}


// compute winner and return who just won
// update wins,draws and losses
function computeWinner(){
    let winner;

    if (YOU['score'] <= 21) {
        //condition higher score than dealer or when dealer busts but you're 21
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21 )){
            blackJackGame['wins'] ++;
            winner = YOU;
        
        }else if (YOU['score'] < DEALER['score']) {
            blackJackGame['losses'] ++;
            winner = DEALER;

        }else if (YOU['score'] === DEALER['score'] ){
            blackJackGame['draws'] ++;
        }
    //condition: when user busts but dealer doesn't
    }else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        blackJackGame['losses'] ++;
        winner=DEALER;

    // condition : when you and dealer busts
    }else if (YOU['score'] >21 && DEALER['score'] >21){
        blackJackGame['draws'] ++;
    }
    //console.log(blackJackGame);
    return winner;
}
function showResult(winner) {
    let message1 , messageColor;

    if (blackJackGame['turnsOver'] === true){

    
    if (winner === YOU){
        document.querySelector('#wins').textContent=blackJackGame['wins'];
        message1 = 'Wygrałeś!';
        messageColor = 'green';
        winSound.play();
    }else if (winner === DEALER){
        document.querySelector('#losses').textContent=blackJackGame['losses'];
        message1= 'Przegrałeś!';
        messageColor = 'red';
        lossSound.play()
    }else {
        document.querySelector('#draws').textContent=blackJackGame['draws'];
        message1='Remis!';
        messageColor ='black';
    }

    document.querySelector('#blackjackResult').textContent=message1;
    document.querySelector('#blackjackResult').style.color = messageColor;
    }
}

//Zadanie 6 : AJAX z Javascript

const url = 'https://randomuser.me/api/?results=10'; //10 random users
fetch(url)
.then(resp => resp.json())
.then (data=> {
    let authors = data.results;
    console.log(authors);
    for (i=0; i<authors.length; i++){
        let div =document.createElement('div');
        let image =document.createElement('img');
        let p= document.createElement('p');
        p.appendChild(document.createTextNode(`${title(authors[i].name.first)} ${title(authors[i].name.last)}`));
        image.src = authors[i].picture.large;
        div.appendChild(image);
        div.appendChild(p);
        document.querySelector('.container-6 .flex-ajax-row-1').appendChild(div);
    }
});

let title = str => str[0].toUpperCase() + str.slice(1);

