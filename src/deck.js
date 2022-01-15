const Card = require("./card");

class Deck {
    constructor() {
        this.cards=[];
        for(let i=2;i<100;i++){
            this.cards.push(new Card(i));
        }
    }

    shuffleCards(){
        //Source Wikipedia Fisher and Yates
        //-- To shuffle an array a of n elements (indices 0..n-1):
        //for i from n−1 downto 1 do
        //j ← random integer such that 0 ≤ j ≤ i
        //exchange a[j] and a[i]
        for(let i=this.cards.length-1;i>0;i--){
            const j = Math.floor(Math.random()*this.cards.length);
            const aux=this.cards[i];
            this.cards[i]=this.cards[j];
            this.cards[j]=aux;
        }
    }

    isEmpty(){
        return !this.cards.length;
    }

    leaseCard(){
        return this.cards.pop();
    }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = Deck;