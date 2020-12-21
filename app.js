//main app through which javascript starts
import Deck from './classes/deck.js';
import Player from './classes/player.js';
import Dealer from './classes/dealer.js';

$('document').ready(()=>{
    //main logic goes here.

    //creates a deck of cards.
    function createDeck(){
        let deck = new Deck();
        deck.createDeck();
        deck.shuffle();
        $('.deck').css(deck.deckStyle());
        return deck;
    }

    //creating a dealer
    function createDealer(deck){
        let dealer= new Dealer(deck);
        return dealer;
    }

    //function to create players.
    function createPlayers(n){
        let players=[]
        for(let i=0;i<n;i++){
            players.push(new Player(i+1))
        }
        return players;
    }

    //inital function which sets up the game.
    function init(player_number){
        let deck = createDeck();
        let dealer = createDealer(deck);
        let players = createPlayers(player_number);
        players.forEach(player => {
            player.bet(prompt(`Place your bet player${player.number}: `))
            player.hit(deck);
            player.hit(deck);
            player.addListeners(deck);
        });
        return {deck,dealer,players};
    }

    // start
    function start(){
        var no_player=prompt('How many of you are playing ?');
        return init(no_player);
    }

    var {deck,dealer,players}=start();

    //checks if all players finished with there game or not for every 1sec.
    var checkPlaying=setInterval(() => {
        function playing(){
            let inPlay=false;
            players.forEach(player=>{
                if(!player.didBust() && !player.gotBlackJack() && !player.stay){
                    inPlay=true;
                }
            });
            return inPlay;
        }
        if(!playing()){
            $(document).trigger('playended');
            clearInterval(checkPlaying);
        }
    }, 1000);

    //Fires when all the players games end.
    $(document).on('playended',()=>{
        //reveals the hidden card
        dealer.reveal();
        //variables
        let playersStatus=[];
        let didStay=false;
        // to get players hand status and get the highest
        players.forEach(player=>{
            let status='';
            if(player.didBust()){
                status='bust';
            }
            else if(player.gotBlackJack()){
                status='blackjack';
            }
            else if(player.stay){
                status='stay';
                didStay=true;
            }
            playersStatus.push(status);
        })
        
        //delear plays if any of the player stays.
        if(didStay){
            // dealer hits till 16 and stays at 17
            while(dealer.handValue()<=16){
                dealer.hit(deck);
                if(dealer.didBust() || dealer.gotBlackJack()){
                    break;
                }
            }
        }
        //dealer doesn't need to play
        else{
            $(document).trigger('handleBets');
            $(document).off('playended');
        }

        //logic to compare dealer's hand with player's hand
        if(!dealer.didBust()){
            for(let i=0;i<playersStatus.length;i++){
                if(playersStatus[i]==='stay'){
                    if(dealer.handValue()<players[i].handValue())
                        players[i].message('You Win');
                    else if(dealer.handValue()>players[i].handValue())
                        players[i].message('You Lost');
                    else
                        players[i].message('Push');
                }
            }
        }else{
            for(let i=0;i<playersStatus.length;i++){
                if(playersStatus[i]==='stay'){
                    players[i].message('You Win');
                }
            }
        }
        // remove playendend event listener
        $(document).trigger('handleBets');
        $(document).off('playended');
    });

    $(document).on('handleBets',()=>{
        players.forEach(player=>{
            if(player.didWin) player.returnBet(player.currentbet*2);
            if(player.didBust() || player.didLoose ) player.returnBet(0);
            if(player.gotBlackJack()) player.returnBet((player.currentbet*2)+(player.currentbet/2));
            if(player.push) player.returnBet(player.currentbet);
        })
        $(document).off('handelBets');
    });

    $('.playAgain').click(()=>{
       location.reload(true);
    })
});