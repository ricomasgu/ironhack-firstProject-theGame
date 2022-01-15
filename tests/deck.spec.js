const Card = require('../src/card');
const Deck = require('./../src/deck');

let deck;

describe('Deck', () => {
    beforeEach(() => {
        deck = new Deck();
    });

    it('should be declared', () => {
        expect(typeof Deck).toBe('function');
    });

    describe('constructor method', () => {
        /* it('should not expect any parameter', () => {
            expect(Deck.constructor.length).toBe(0);
        }); */

        it('should create an attribute array cards', () => {
            expect(deck.cards instanceof Array).toBe(true);
        });

        it('should have 98 cards, from 2 to 99', () => {
            expect(deck.cards.length).toBe(98);
        });
    });

    describe('shuffleCards method', () => {
        beforeEach(() => {
            deck = new Deck();
        });
    
        it('should be declared', () => {
            expect(typeof deck.shuffleCards).toBe('function');
        });
    
        it('should return the shuffled array of cards', () => {
            const defaultCards = deck.cards.map((card) => card.value);
            deck.shuffleCards();
            const shuffledCards = deck.cards.map((card) => card.value);
            expect(defaultCards === shuffledCards).toBe(false);
        });
    });

    describe('isEmpty method', () => {
        beforeEach(() => {
            deck = new Deck();
        });
    
        it('should be declared', () => {
            expect(typeof deck.isEmpty).toBe('function');
        });
    
        it('should return true if the deck is empty', () => {
            expect(!deck.cards.length).toBe(false);
        });
    });

    describe('leaseCard method', () => {
        beforeEach(() => {
            deck = new Deck();
        });
    
        it('should be declared', () => {
            expect(typeof deck.leaseCard).toBe('function');
        });
    
        it('should return one card of the deck', () => {
            const leasedCard = deck.leaseCard();
            expect(leasedCard instanceof Card).toBe(true);
        });

        it('should remove the card returned from the deck', () => {
            const lengthBefore = deck.cards.length;
            deck.leaseCard();
            const lengthAfter = deck.cards.length;
            expect(lengthBefore===lengthAfter+1).toBe(true);
        });
    });
});