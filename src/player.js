class Player{
    constructor(name,maxCards){
        this.name = name;
        this.cards = [];
        this.maxCards = maxCards;
    }

    pickCard(card){
        if(this.cards.length < this.maxCards){
            this.cards.push(card);
            return true;
        } else {
            return false;
        }
    }

    discardCard(position){
        return this.cards.splice(position,1);
    }

    showCards(){
        return this.cards;
    }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = Player;