const Card = require('../src/card');
const Player = require('../src/player');

const name = "Rick";
let player;
const MAX_CARDS = 6;
describe('Player', () => {
    beforeEach(() => {        
        player = new Player(name,MAX_CARDS);
    });

    it('should be declared', () => {
        expect(typeof Player).toBe('function');
    });

    describe('constructor method', () => {
        it('should receive `name` as a parameter and store the value in its own `name` property', () => {
            expect(Player.constructor.length).toBe(1);
            expect(player.name === name).toBe(true);
        });

        it('should create an attribute array of cards empty', () => {
            expect(player.cards instanceof Array).toBe(true);            
            expect(player.cards.length).toBe(0);
        });
    });

    describe('pickCard method', () => {
        beforeEach(() => {
            player = new Player(name,MAX_CARDS);
        });
    
        it('should be declared', () => {
            expect(typeof player.pickCard).toBe('function');
        });
    
        it('should pick one card and add to the cards that belong the player', () => {
            const cardsBefore = player.cards.length;
            player.pickCard();
            const cardsAfter = player.cards.length;
            expect(cardsAfter === cardsBefore+1).toBe(true);
        });

        it('should (the player) not have more than MAX_CARDS', () => {
            for(let i = 0 ; i <= MAX_CARDS ; i++){
                player.pickCard(new Card(i));
            }
            expect(player.cards.length>MAX_CARDS).toBe(false);
        });
    });

    describe('discardCard method', () => {
        beforeEach(() => {
            player = new Player(name,MAX_CARDS);
            player.pickCard(new Card(30));
            player.pickCard(new Card(31));
        });
    
        it('should be declared', () => {
            expect(typeof player.discardCard).toBe('function');
        });
    
        it('should discard one card of the player and return it', () => {
            const cardsBefore = player.cards.length;
            const discartedCard = player.discardCard(0)[0];
            const cardsAfter = player.cards.length;
            expect(cardsBefore === cardsAfter+1).toBe(true);
            expect(discartedCard instanceof Card).toBe(true);
        });
    });

    describe('showCards method', () => {
        beforeEach(() => {
            player = new Player(name,MAX_CARDS);
        });
    
        it('should be declared', () => {
            expect(typeof player.showCards).toBe('function');
        });
    
        it('should show the cards of the player, it means return an array', () => {
            const cardsPlayer = player.showCards();
            expect(cardsPlayer instanceof Array).toBe(true);
        });
    });
});