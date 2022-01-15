class Pile {
    constructor(increasing) {
        this.increasing=increasing;
        this.cards=[];
    }

    add(card){
        if(this.canAdd(card)){
            this.cards.push(card);
        }
    }

    canAdd(card){
        //It is possible to add a new card if its value is more that the last card or if it is the last value minus 10. And vice-versa. It depends on the increasing variable.
        if(this.cards.length){
            const lastCard = this.cards.slice(-1)[0];
            const lastCardValue = lastCard.showCard();
            const actualCardValue = card.showCard();
            let increasingTrue = ((lastCardValue > actualCardValue) || (actualCardValue === (lastCardValue-10)));
            let increasingFalse = ((lastCardValue < actualCardValue) || (actualCardValue === (lastCardValue+10)));
            if(this.increasing){
                return increasingTrue;
            } else {
                return increasingFalse;
            } 
        } else {
            return true;
        }
    }

    showPile(){
        return this.cards;
    }

}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = Pile;