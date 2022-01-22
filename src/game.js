class Game{
    constructor(name, maxCards){
        this.player = new Player(name, maxCards);
        this.deck = new Deck();
        this.deck.shuffleCards();
        this.piles = [new Pile(true), new Pile(true), new Pile(false), new Pile(false)];
        this.minCardsToDiscard = 0;
    }

    deal(){
        if(this.canDeal()){
            const numCards = this.player.cards.length;
            this.minCardsToDiscard = 2;
            for( let i = 0 ; i < this.player.maxCards - numCards ; i++ ){
                const cardFromDeck = this.deck.leaseCard();
                this.player.pickCard(cardFromDeck);
            }
        }        
    }

    canDeal(){
        return !this.deck.isEmpty() && this.minCardsToDiscard <= 0 ? true : false;
    }

    discardCard(posCard,numPile){
        const cardPlayer = this.player.cards[posCard];
        if(this.piles[numPile].add(cardPlayer)){
            this.player.discardCard(posCard);
            this.minCardsToDiscard--;
            return true;
        } else {
            return false;
        }
    }

    showPiles(){
        const cardPile1 = this.piles[0].showPile();
        const cardPile2 = this.piles[1].showPile();
        const cardPile3 = this.piles[2].showPile();
        const cardPile4 = this.piles[3].showPile();
        return [cardPile1 , cardPile2 , cardPile3 , cardPile4];
    }

    youWin(){
        if(this.deck.isEmpty() && !this.player.cards.length) {
            return true;
        } else {
            return false;
        }        
    }

    gameOver(){
        if(this.canDeal()){
            let gameOver = true;
            this.player.cards.forEach( (card) => {
                if (this.piles[0].canAdd(card) || this.piles[1].canAdd(card) || this.piles[2].canAdd(card) || this.piles[3].canAdd(card)) {
                    gameOver = false;
                }
            });
            return gameOver;
        }    
    }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = Game;