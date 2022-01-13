const Card = require('./../src/card');

let card;
const value = Math.floor(Math.random()*100);

describe('Card', () => {
    beforeEach(() => {
        card = new Card(value);
    });

    it('should be declared', () => {
        expect(typeof Card).toBe('function');
    });

    describe('constructor method', () => {
        it('should receive `value` as a parameter and store the value in its own `value` property', () => {
            expect(Card.constructor.length).toBe(1);
            expect(card.value === value).toBe(true);
        });
    });

    describe('showCard method', () => {
        beforeEach(() => {
          card = new Card(value);
        });
    
        it('should be declared', () => {
          expect(typeof card.showCard).toBe('function');
        });
    
        it('should return the value of the card', () => {
            expect(card.showCard() === card.value).toBe(true);
        });
    });
});