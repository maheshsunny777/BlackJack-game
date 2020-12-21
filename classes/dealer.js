//delear class
export default class Dealer{
    
    constructor(deck){
        this.hand=[];
        let playerTemplate=`<div class='col-sm-3' style='margin-left:25%'>
                                <div class='cardsContainer dealerCards'></div>
                                <p class='playerHeading'>Dealer</p>
                            </div>`
        $('.dealer').append(playerTemplate);
        this.hit(deck);
        this.hit(deck);
    }

    hit(deck){
        if(!this.didBust() && !this.gotBlackJack()){
            let newCard=deck.dealCard();
            this.hand.push(newCard);
            let style=newCard.cardStyle();
            if(this.hand.length>1){
                style['position']='absolute';
                style['bottom']=`${(this.hand.length-1)*25}px`;
                style['left']=`${(this.hand.length-1)*35}px`;
                if(this.hand.length===2){
                    style['background-image']='url(/images/deck/backside.PNG)';
                }else{
                    this.reveal();
                }
            }
            $(`.dealerCards`).append(newCard.DOMelement().css(style));
        }
    }

    reveal(){
        let closedCard=this.hand[1]
        let style=closedCard.cardStyle();
        style['background-image']=`url(/images/deck/${closedCard.name}.PNG)`
        $(`.${closedCard.name}`).css(style);
    }

    handValue(){
        let total=0;
        let haveAce=false;
        this.hand.forEach(card=>{
           if(typeof card.value!='number'){
               haveAce=true;
           }
           total+=typeof card.value==='number' ? card.value : 0;
        });
        if(haveAce){
            total+=total+11>21 ? 1 : 11;
        }
        return total; 
     }

     didBust(){
         if(this.handValue() > 21)
         $(`.dealerCards`).append($(`<div class='handStatus'>BUST</div>`));
         return this.handValue() > 21;
     }

     gotBlackJack(){
         if(this.handValue()===21 && this.hand.length===2) 
         $(`.dealerCards`).append($(`<div class='handStatus' style='color:#2548a8;left:10%;'>Black Jack</div>`));
         return this.handValue()===21 && this.hand.length===2;
     }

}