//card class to create differnt instances(cards) from this.
export default class Card{
    constructor(name,value){
        this.name=name;
        this.value=value;
    };
    //to create card's dom element through jquery
    DOMelement(){
        return $(`<div class='${this.name}'></div>`);
    };
    //to apply css for that particular card instance through jquery
    cardStyle(){
        return {
            'width':'90px',
            'height':'125px',
            'background-image': `url(/images/deck/${this.name}.PNG)`,
            'background-repeat': 'no-repeat',
            'background-size': 'contain',
            'background-position': 'center',
            'box-sizing': 'border-box',
            'border-radius': '3px',
            'box-shadow': 'black 2px 2px 4px',
            'margin':'3px',
            'border':'0.1px solid #f3f3f3',
            'background-color':'white'
        };
    };
};
