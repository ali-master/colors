'use strict';

import Dice from "./components/dice";
import Info from "./components/info";

import pryStore from './modules/pryStore';
import SoundEffect from "./modules/SoundEffect";

class SnakesAndLadders{
    constructor() {
        /**
         * Set
         * The Set object lets you store unique values of any type, whether primitive values or object references.
         * * Set objects are collections of values. You can iterate through the elements of a set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.
         */
        this.Store = new Set();

        // Dice Config
        this.Roll      = 0;
        this.NextIndex = 0;

        this.game  = $(".game") || (() => {});
        this.user  = this.game.find('.user') || (() => {});

        // store
        this._good  = 0;
        this._bad   = 0;
        this._best  = 0;

        this._store = new pryStore();

        // sound event
        this._sound = new SoundEffect();

        this._binded = false;
        if(this._store.get('a')){
            this._binded = true;
            this._getInitialState.call(this);
        }
    }

    _getInitialState() {
        this._info = new Info();

        this.a = parseInt(this._store.get('a'));
        this.b = parseInt(this._store.get('b'));
        this.d = parseInt(this._store.get('d'));

        let Snakes = this._store.get('snakes');

        this.NextIndex = parseInt(this._store.get("currentIndex")) || 1;
        
        this._best  = this._store.get("best")  || 0;
        this._good  = this._store.get("goods") || 0;
        this._bad   = this._store.get("bads")  || 0;
        this._total = this._store.get("total") || 0;

        this.Draw.call(this);
        setTimeout(() => {
            this.GetInitialCalc.call(this);
            this.DefaultSnakes.call(this, Snakes);
            // this.Dice.call(this, 0);

            const position = $(this.cell[this.cell.length - this.NextIndex]);

            this.user.css({
                left: position.position().left,
                top:  position.position().top,
            }).show();
            $('.dice-wrapper').fadeIn(1000);


            // set Data information into info block
            this._info.set().size(this.a + " در " + this.b + " و با دشواری " + this.d);
            this._info.set().bads(this._bad);
            this._info.set().goods(this._good);
            this._info.set().bests(this._best);
            this._info.set().total(this._total);
        }, 0);

    }

    // set initial config
    Initial(...props) {
        this._info = new Info();

        this.LevelOfDifficulty = 5;
        
        // default param values

        let {a, b, d} = props;

        this.a = a || window.prompt("pleae Enter A") || 10;
        this.b = b || window.prompt("pleae Enter B") || 10;
        this.d = d || window.prompt("pleae Enter Difficulty level between 1 to 5") || this.LevelOfDifficulty;

        this.a = this.a > 10 ? 10 : this.a;
        this.b = this.b > 10 || this.b < 3 ? 10 : this.b;
        this.d = this.d > 5  || this.d < 1 ? this.LevelOfDifficulty : this.d;

        this._info.set().size(this.a + " در " + this.b + " و با دشواری " + this.d);

        // update store
        this._store.set("a", this.a);
        this._store.set("b", this.b);
        this._store.set("d", this.d);

        this.GetInitialCalc.call(this);
    }

    GetInitialCalc() {
        this.multi = this.a * this.b;
        this.selectRandom = Math.floor(this.d) * 10;
        this.percentage   = Math.floor((this.multi / 100) * this.selectRandom);
        this.percentage   = this.percentage > 50 ? 50 : this.percentage < 10 ? 10 : this.percentage;

        this._store.set("percentage", this.percentage);
    }

    // Draw and Create the base layoutes of game
    Draw() {
        const self = this;

        for(let row = 0; row < self.b; row++){
            self.game.find('.layouts').append($("<div />", {
                class: "row",
                html: function(){
                    for(let cell = 0; cell < self.a; cell++){
                        $(this).append($("<div />", {
                            html: " ",
                            class: "cell"
                        }))
                    }//end cells print

                }// end rows print
            }));
        }

        this.cells = this.game.find(".layouts").find('.cell') || (() => {})
        this.cell = Array.prototype.slice.call(document.querySelectorAll(".cell"));

        !this._binded ? this.Snakes.call(this) : "";
    }

    // make random position and set position of Snakes
    Snakes() {
        try{
            for(let i = 0; i <= this.percentage; i++){
                const rnd = Math.floor(1 + Math.random() * this.multi);

                if(this.cells.eq(rnd).hasClass("Snakes")){
                    continue;
                } else {
                    this.Store.add(rnd);
                    this.cells.eq(rnd).addClass("Snakes");

                    this.FindDuplicated.call(this);
                }

                this.cells.eq(-1).hasClass('Snakes') ? this.cells.eq(-1).removeClass('Snakes') : "";
            }

            let indexes = [];
            for(let keys of this.Store.values()){
                indexes.push(keys);
            }
            this._store.set("snakes", indexes);

            this.user.css({
                left: $(this.cell[this.cell.length - 1]).position().left,
                top: $(this.cell[this.cell.length - 1]).position().top,
            })
        } catch(e){}
    }

    DefaultSnakes(indexes) {
        const self = this;
        this.cells.removeClass("Snakes");

        indexes.map((index) => {
            self.cells.eq(index).addClass("Snakes");
        });
        this.cells.eq(-1).hasClass('Snakes') ? this.cells.eq(-1).removeClass('Snakes') : "";
        this.FindDuplicated.call(this);
    }

    // detect the Snake in next index, and if this index has Snake, the user can not be move and use should be back to first place
    detectSnakes(index, onSuccess, onFail) {
        let snakes = $(this.cell[this.cell.length - index]).hasClass('Snakes');

        return snakes == true ? onFail.call(this, "مار نیشت زد٬ دوباره امتحان کن") : onSuccess.call(this, index);
    }

    FindDuplicated() {
        let clone = {};
        let dup   = $(".row").each(() => {
            $(this).children('.cell.Snakes').filter(() => {
                return $(this).hasClass("Snakes");
            });  
        });
        if(dup.length == 6){
            dup.slice(-1).removeClass("Snakes");
            $('.cell').not('.Snakes').addClass('Snakes');
        }
    }

    // Trace the user action for go or back
    trace(action, index = 0, roll = 0) {
        const self = this;
        switch(action) {
            // Back to First trace
            case 0:
                this.switchTo(1);
                this._sound.init("fail");
                break;

            // move to front
            case 1:
                this.switchTo(index);
                break;

            default:
                self.user.hide();
                break;
        }
    }

    // switch user to item index
    switchTo(index, callback) {
        if(index == false) return;

        // user in last index of game positions
        if((this.cell.length - index) < 1){
            this._Reducers("WIN");
            this._sound.init("success");
            return;
        }

        let self = this;
        let position = (this.cell.length - index) + this.Roll < 0 ? 0 : (this.cell.length - index) + this.Roll;

        let timeout;
        for(let i = 0; i < this.Roll; i++){
            timeout = window.setTimeout(() => {
                let secondPosition = self.cell[position - i - 1];
                self.user.stop(true, false).animate({
                    left: $(secondPosition).position().left,
                    top:  $(secondPosition).position().top,
                }, 355, () => {
                    self.cells.removeClass('current');
                    $(self.cell[position - self.Roll]).addClass('current');

                    callback && callback.call(self, index);
                });
            }, 355 * i);

            if(i == self.Roll) window.clearTimeout(timeout);

        }
    }

    // controllers of system Reactions
    _Reducers(action) {
        switch(action) {
            case "ADD_BEST":
                ++this._best;
                break;

            case "ADD_GOOD":
                ++this._good;
                break;

            case "ADD_BAD":
                ++this._bad;
                break;

            case "GET_TOTAL":
                return this._good + this._bad;
                break;

            case "GET_BEST":
                return this._best;
                break;

            case "GET_GOOD":
                return this._good;
                break;

            case "GET_BAD":
                return this._bad;
                break;

            case "GET_HELPFUL":
                return this._bad - this.good;
                break;

            case "WIN":
                this._end = new Date();
                this._store.set("finished", true);
                this._info.end();

                this.ـonFinished("تمام شد", "کاربر گرامی شما موفق شدید٬ میتوانید بعد از فشردن دکمه شروع مجدد٬ مجدد بازی را شروع کنید");
                break;
        }
    }

    // Make and 
    Dice(roll) {
        const self = this;

        this.Roll = roll || 0;
        this.NextIndex   = this.Roll + this.NextIndex;

        this.detectSnakes(this.NextIndex, (index) => {

            // visible user
            self.user.show();

            // Go to next index
            self.trace(1, index, self.Roll);

            // detect the best rolls of user action and in finally, save it in the localStorage
            self.Roll > 5 ? self._Reducers("ADD_BEST") : "";

            // add a good action to store
            self._Reducers('ADD_GOOD');

            // set a Message Text for this Good Action
            // self.msgBox("خیلی خوب بود", "success");

        }, (msg) => {

            // set zero into current and next index of user action because this action has been bad
            self.NextIndex = 1;
            
            // Back to first place
            self.trace(0);

            // add a bad action to stroe
            self._Reducers('ADD_BAD');

            // set a Message Text for this Bad Action
            self.msgBox(msg, "fail");

        });

        this._store.set("currentIndex", this.NextIndex)
        
        this._store.set("best", this._Reducers("GET_BEST"));
        this._store.set("goods", this._Reducers("GET_GOOD"))
        this._store.set("bads", this._Reducers("GET_BAD"));
        this._store.set("total", this._Reducers("GET_TOTAL"));

        // update data into info block
        this._info.set().bads(this._Reducers("GET_BAD"));
        this._info.set().goods(this._Reducers("GET_GOOD"));
        this._info.set().bests(this._Reducers("GET_BEST"));
        this._info.set().total(this._Reducers("GET_TOTAL"));
    }

    // Restart Game
    restart() {
        this._store.clear();
        location.reload();
    }

    // system messages
    msgBox(msg, type)   {
        if(!$(".game > .detailBox .msgBox").length) this.game.children('.detailBox').prepend('<div class="msgBox" />'); 

        let message = msg || "";
        $(".game > .detailBox .msgBox").html(message).removeAttr("class").addClass("msgBox "+ type);
        setTimeout(() => {
            $('.game > .detailBox .msgBox').hide().remove();
        }, 3000)
    }

    init() {
        const self = this;
        const $selector = {
            start: $('.start'),
            dice:  '#dice',
            diceWrapper: $('.dice-wrapper'),
            contentInner: $('.container-holder .content-inner'),
        }

        const components = {
            start: function() {
                self.Initial();
                self.Draw();
                self.msgBox("شروع بازی٬ لطفا یک تاس پرتاب کنید!");
            },
            dice: function() {
                $selector.diceWrapper.fadeIn(1000, () => {
                    new Dice().roll((roll) => {
                        self.Dice(roll)
                    });
                });
            },
            btns: function() {
                $selector.start.hide().remove();
                $selector.contentInner.append('<a href="#" id="dice" class="button green full">پرتاب تاس</a>');
                $selector.contentInner.append('<a href="#" id="restart" class="button orange full">بارگذاری مجدد</a>');
            }
        }

        if(!this._store.get('a')){
            $selector.start.on('click', function(e){
                e.preventDefault();

                components.start();

                $(this).hide().remove();
                $selector.contentInner.append('<a href="#" id="dice" class="button green full">پرتاب تاس</a>');
            });
        }else{
            components.btns();
        }

        $('body').on('click', "#restart", function(e) {
            e.preventDefault();

            self.restart();
        });

        $('body').on('click', $selector.dice, function(e){
            e.preventDefault();
            
            components.dice();
        });

        $('html').on("keydown", function(e) {
            let key = e.keyCode ? e.keyCode : e.which;

            if(key == 13 || key == 32) e.preventDefault();

            if(key == 13) $selector.start.click();
            if(key == 32) components.dice();

        });
    }

    ـonFinished(title, content) {
        let tmp = '<div class="mod-container"><div class="sec-top center"><div class="mod-message"><h4>'+ title +'</h4><p>'+ content +'</p></div></div><div class="sec-bottom center"><a href="#" class="restart"><span>شروع مجدد</span></a></div></div>';
        $('.container-holder').append(tmp);

        const self = this;
        $('body').on('click', '.restart', function(e) {
            self.restart();
        });
    }
}

export default SnakesAndLadders;