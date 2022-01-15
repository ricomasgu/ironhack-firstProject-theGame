const Card = require('../src/card');
const Pile = require('../src/pile');

let pile;
const increasing = true;

describe('Pile', () => {
    beforeEach(() => {
        pile = new Pile(increasing);
    });

    it('should be declared', () => {
        expect(typeof Pile).toBe('function');
    });

    describe('constructor method', () => {
        it('should receive `increasing` as a parameter and store the value in its own `increasing` property', () => {
            expect(Pile.constructor.length).toBe(1);
            expect(pile.increasing === increasing).toBe(true);
        });

        it('should create an attribute array of cards empty', () => {
            expect(pile.cards instanceof Array).toBe(true);            
            expect(pile.cards.length).toBe(0);
        });
    });

    describe('add method', () => {
        beforeEach(() => {
            pile = new Pile();
        });
    
        it('should be declared', () => {
            expect(typeof pile.add).toBe('function');
        });
    
        it('should add one element to the pile', () => {
            const lengthBefore = pile.cards.length;
            pile.add(new Card(25));
            const lengthAfter = pile.cards.length;
            expect(lengthAfter === lengthBefore+1).toBe(true);
        });
    });

    describe('canAdd method', () => {
        beforeEach(() => {
            pile = new Pile();
        });
    
        it('should be declared', () => {
            expect(typeof pile.canAdd).toBe('function');
        });
    
        it('should return true if it is possible to add an element to the pile', () => {
            expect(pile.canAdd(new Card(10))).toBe(true);
            pile.add(new Card(25));
            expect(pile.canAdd(new Card(10))).toBe(false);
            //expect(pile.canAdd(new Card(15))).toBe(true);
            expect(pile.canAdd(new Card(26))).toBe(true);
        });
    });

    describe('showPile method', () => {
        beforeEach(() => {
            pile = new Pile();
        });
    
        it('should be declared', () => {
            expect(typeof pile.showPile).toBe('function');
        });
    
        it('should show the pile, it means return an array', () => {
            const cardsInPile = pile.showPile();
            expect(cardsInPile instanceof Array).toBe(true);
        });
    });
});