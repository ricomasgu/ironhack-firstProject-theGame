class Pile {
    constructor(increasing) {
        this.increasing=increasing;
        if(increasing){
            this.cards=[new Card(1)];
        } else {
            this.cards=[new Card(100)];
        }        
    }

    add(card){
        if(this.canAdd(card)){
            this.cards.push(card);
            return true;
        } else {
            return false;
        }
    }

    canAdd(card){
        //It is possible to add a new card if its value is more that the last card
        // or if it is the last value minus 10. And vice-versa. It depends on the increasing variable.
        const lastCard = this.cards.slice(-1)[0];
        const lastCardValue = lastCard.showCard();
        const newCardValue = card.showCard();
        let increasingTrue = ((newCardValue > lastCardValue) || (newCardValue === (lastCardValue-10)));
        let increasingFalse = ((newCardValue < lastCardValue) || (newCardValue === (lastCardValue+10)));
        if(this.increasing){
            return increasingTrue;
        } else {
            return increasingFalse;
        }
    }

    showPile(){
        const lastCard = this.cards.length - 1;
        return this.cards[lastCard];
    }

}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = Pile;