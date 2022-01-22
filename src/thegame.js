const canvas = document.getElementById('game');
let ctx;
let game;
let maxCards;
let cardClicked;
let pileClicked;
let gameStarted;
let gameFinished;

function restartSelected(){
    pileClicked = {pos: 0, clicked: false};
    cardClicked = {pos: 0, clicked: false};
}

function reDrawScenario(){
    ctx.clearRect(0 , 0 , canvas.width, canvas.height);
    drawDeck();
    drawPiles();
    drawPlayerCards();
}

function drawInitial(){
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    maxCards = 8;
    restartSelected();
    game = new Game("Rick", maxCards);
    gameStarted = false;
    drawPiles();
    drawDeck();
}

function drawPile(color, i){
    ctx.fillStyle = "white";
    ctx.strokeRect(175 + i * 125, 25, 100, 150);
    ctx.fillRect(175 + i * 125, 25, 100, 150);
    ctx.fillStyle = color;
    const value = game.piles[i].showPile().value;
    ctx.fillText(value, 225 + i * 125, 135, 90);
}

function drawPiles(){    
    ctx.font = "100px sans-serif";
    ctx.textAlign = "center";
    for(let i = 0; i < 4; i++){
        drawPile("black",i);
    }
}

function drawDeck(){
    ctx.font = "50px sans-serif";
    for(let i = 0; i < 2; i++){
        ctx.fillStyle = "white";
        ctx.strokeRect(50 + i * 550, 225, 150, 100);
        ctx.fillRect(50 + i * 550, 225, 150, 100);
        ctx.fillStyle = "black";
        ctx.fillText("Deck", 125 + i * 550, 290);
    }
}

function drawCard(color, i){
    const cardsPlayer = game.player.showCards();
    const card = cardsPlayer[i].showCard();
    ctx.fillStyle = "white";
    ctx.strokeRect(12 + i * 100, 365, 75, 112);
    ctx.fillRect(12 + i * 100, 365, 75, 112);
    ctx.fillStyle = color;
    if(card.toString().length === 1){
        ctx.fillText(card, 50 + i * 100, 455, 35);
    } else {
        ctx.fillText(card, 50 + i * 100, 455, 70);
    }
}

function drawPlayerCards(){
    ctx.fillStyle = "black";
    ctx.fillRect(300, 300, 200, 55);
    ctx.fillStyle = "white";
    ctx.font = "50px sans-serif";
    ctx.fillText(game.player.name, 400, 345);
    ctx.font = "100px sans-serif";
    for(let i = 0 ; i < game.player.cards.length ; i++){
        drawCard("black", i);
    }
}

function drawFinishGame(youWin){
    ctx.fillStyle = "white";
    ctx.font = "100px sans-serif";
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    if(youWin){
        ctx.fillText("You Win!", 400, 250, 700);
    } else {
        ctx.fillText("Game Over :( , Go ahead, try again ;)", 400, 250, 700);
    }
}

function clickDeck(event){
    const posX = event.layerX;
    const posY = event.layerY;
    const firstDeck = (posX >= 50 && posX <= 200) && (posY >= 225 && posY <= 325);
    const secondDeck = (posX >= 600 && posX <= 750) && (posY >= 225 && posY <= 325);
    if(firstDeck || secondDeck){
        console.log(game);
        game.deal();
        reDrawScenario();
        if(game.gameOver()){
            gameStarted = false;
            gameFinished = true;
        }
    }
}

function clickCard(event){
    const posX = event.layerX;
    const posY = event.layerY;
    for(let i = 0 ; i < maxCards ; i++){
        const posCard = (posX >= 12 + i * 100 && posX <= 87 + i * 100) && (posY >= 365 && posY <= 477);
        if(posCard){
            drawPlayerCards();
            if(cardClicked.pos === i && cardClicked.clicked){                
                cardClicked = {pos: i, clicked: false};
            } else {
                drawCard("red",i);
                cardClicked = {pos: i, clicked: true};
            }
        }
    }
}

function clickPile(event){
    const posX = event.layerX;
    const posY = event.layerY;
    for(let i = 0 ; i < 4 ; i++){
        const posCard = (posX >= 175 + i * 125 && posX <= 275 + i * 125) && (posY >= 25 && posY <= 175);
        if(posCard){
            drawPiles();
            if(pileClicked.pos === i && pileClicked.clicked){                
                pileClicked = {pos: i, clicked: false};
            } else {
                drawPile("red",i);
                pileClicked = {pos: i, clicked: true};
            }
        }
    }
}

document.getElementById("start").addEventListener("click", () => {
    if(gameStarted || gameFinished){
        game = new Game("Rick", maxCards);
        gameFinished = false;
    }
    gameStarted = true;
    game.deal();
    reDrawScenario();
    restartSelected();
});

canvas.addEventListener("click",(event) => {
    if(gameStarted){
        clickDeck(event);
        clickCard(event);
        clickPile(event);
        if(pileClicked.clicked && cardClicked.clicked){
            if(game.discardCard(cardClicked.pos , pileClicked.pos)){
                const youNotWin = !game.youWin();
                const youWin = game.youWin();
                const youNotLose = !game.gameOver();

                console.log(youNotLose,youNotWin);
                if(youNotWin && youNotLose){
                    restartSelected();
                    reDrawScenario(); 
                } else {
                    youWin ? drawFinishGame(true) : drawFinishGame(false);
                    gameStarted = false;
                    gameFinished = true;
                }
            }    
        }
    }
});

drawInitial();