import Card from './card.js'
//deck class which represents all props and methods of deck
export default class Deck{
    constructor(){
        this.deck=[];
    }
    //crates a deck of 52 cards
    createDeck(){
        this.deck=[];
        var suits=['spades','diamonds','clubs','hearts'];
        var values=[2,3,4,5,6,7,8,9,10,'ace','jack','queen','king'];
        for(let suit in suits){
            for(let value in values){
                this.deck
                .push(
                    new Card(
                            `${values[value]}-${suits[suit]}`,
                            (typeof values[value] === 'number')?values[value]:(values[value]==='ace')?[1,11]:10
                        )
                );
            }
        }
        return this.deck;
    }
    //shuffles the deck randomly
    shuffle(){
        for(let card in this.deck){
            let r1=Math.floor(Math.random()*this.deck.length);
            let temp=this.deck[r1];
            this.deck[r1]=this.deck[card];
            this.deck[card]=temp;
        }
        return this.deck;
    }
    //deals a card from top of the deck
    dealCard(){
        return this.deck.splice(0,1)[0];
    }
    //returns the styling for the deck
    deckStyle(){
        return {
            'width':'90px',
            'height':'125px',
            'background-image': `url(/images/deck/backside.PNG)`,
            'background-repeat': 'no-repeat',
            'background-size': 'contain',
            'background-position': 'center',
            'box-sizing': 'border-box',
            'border-radius': '3px',
            'box-shadow': 'black 8px 8px 16px',
            'margin':'3px',
            'border':'0.1px solid #f3f3f3',
            'background-color':'black'
        }
    }
}