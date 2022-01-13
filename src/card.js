//Class Card, contains the value of the card and nothing more, for now.

class Card {
    constructor(value) {
        this.value=value;
    }

    showCard(){
        return this.value;
    }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = Card;