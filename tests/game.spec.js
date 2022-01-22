const Deck = require('../src/deck');
const Pile = require('../src/pile');
const Game = require('../src/game');
const Player = require('../src/player');

const name = "Rick";
let game;
const maxCards = 6;
describe('Game', () => {
    beforeEach(() => {        
        game = new Game(name, maxCards);
    });

    it('should be declared', () => {
        expect(typeof Game).toBe('function');
    });

    describe('constructor method', () => {
        it('should receive `name` and `maxCards` as a parameter and create a player with this `name` and this `maxCards`', () => {
            expect(Game.constructor.length).toBe(1);
            expect(game.player instanceof Player).toBe(true);
            const player = game.player;
            expect(player.name === name).toBe(true);
            expect(player.maxCards === maxCards).toBe(true);
        });

        it('should create 4 piles', () => {
            expect(game.piles instanceof Array).toBe(true);            
            expect(game.piles.length).toBe(4);
            expect(game.piles[0] instanceof Pile).toBe(true);
        });

        it('should create 1 deck', () => {
            expect(game.deck instanceof Deck).toBe(true);
        });

        it('should create `minCardsToDiscard` and the value has to be 2', () => {           
            expect(game.minCardsToDiscard).toBe(2);
        });
    });

    describe('start method', () => {
        beforeEach(() => {
            game = new Game(name, maxCards);
        });
    
        it('should be declared', () => {
            expect(typeof game.start).toBe('function');
        });
    
        it('should assign the first `maxCards` to the player from the deck', () => {
            game.start();
            const player = game.player;
            const playerCards = player.showCards();
            expect(playerCards.length).toBe(maxCards);
        });
    });

    describe('youWin method', () => {
        beforeEach(() => {
            game = new Game(name, maxCards);
        });
    
        it('should be declared', () => {
            expect(typeof game.youWin).toBe('function');
        });
    
        it('should stop the game and show a `you win` message', () => {
            const win = game.youWin();
            expect(win.localeCompare("you win!")).toBe(0);
        });
    });

    describe('gameOver method', () => {
        beforeEach(() => {
            game = new Game(name, maxCards);
        });
    
        it('should be declared', () => {
            expect(typeof game.gameOver).toBe('function');
        });
    
        it('should stop the game and show a `game over` message', () => {
            const lose = game.gameOver();
            expect(lose.localeCompare("game over!")).toBe(0);
        });
    });
});