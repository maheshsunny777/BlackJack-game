export default class Player{

    constructor(number){
        this.number=number;
        this.hand=[];
        this.stay=false;
        this.didLoose=false;
        this.push=false;
        this.didWin=false;
        this.currentbet=0;
        let playerTemplate=`<div class='col-sm-3' style='margin:90px 0px 30px 0px'>
                                <div class='cardsContainer card-${number}'></div>
                                <p class='playerHeading'>Player ${number}</p>
                                <div class='options container'>
                                <div class='row'>
                                    <div class='col-sm-4'><button class='btn btn-primary' id='Hit${number}'>Hit</button></div>
                                    <div class='col-sm-4'><button class='btn btn-primary' id='Stay${number}'>Stay</button></div>
                                </div>
                                </div>
                                <div class='bet${this.number}'></div>
                                <div class='return${this.number}'></div>
                            </div>`
        $('.players').append(playerTemplate);
    }

    hit(deck){
        let newCard=deck.dealCard();
        this.hand.push(newCard);
        let style=newCard.cardStyle();
        if(this.hand.length>1){
            style['position']='absolute';
            style['bottom']=`${(this.hand.length-1)*25}px`;
            style['left']=`${(this.hand.length-1)*35}px`;
        }
        $(`.card-${this.number}`).append(newCard.DOMelement().css(style));
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
        $(`.card-${this.number}`).append($(`<div class='handStatus'>BUST</div>`));
        return this.handValue() > 21;
    }

    gotBlackJack(){
        if(this.handValue()===21 && this.hand.length===2)
        $(`.card-${this.number}`).append($(`<div class='handStatus' style='color:#2548a8;left:10%;'>Black Jack</div>`));
        return this.handValue()===21 && this.hand.length===2;
    }

    addListeners(deck){
        $(`#Hit${this.number}`).click(()=>{
            (!this.didBust() && !this.gotBlackJack())?this.hit(deck):$(`#Hit${this.number}`).off();  
            this.didBust();  
        });
        $(`#Stay${this.number}`).click(()=>{
            this.stay=true;
            $(`#Hit${this.number}`).off();
        });
    }

    message(message){
        if(message==='You Lost') this.didLoose=true;
        if(message==='You Win') this.didWin=true;
        if(message==='Push') this.push=true;
        $(`.card-${this.number}`).append($(`<div class='handStatus' style='color:#2548a8'>${message}</div>`));
    }

    bet(amount){
        this.currentbet=amount;
        $(`.bet${this.number}`).text(`Your bet : ${amount}$`)
    }

    returnBet(amount){
        $(`.return${this.number}`).text(`Your return : ${amount}$`)
    }

}