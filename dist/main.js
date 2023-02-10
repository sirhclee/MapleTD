/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HUD.js":
/*!********************!*\
  !*** ./src/HUD.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HUD)
/* harmony export */ });
class HUD{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  150;
        this.height = 75; 
        this.x = 0; 
        this.y = 0; 
        this.padding = 20; 
        this.font = "16px arial";
    }

    displayHUD(ctx, game){
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = "5"; 
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 2);
        ctx.stroke();
        ctx.fill();
        
        ctx.textAlign = 'left'; 
        ctx.fillStyle ='black';
        ctx.font = this.font;

        this.lives = "Lives: " + game.player.health; 
        this.money = "Mesos: " + game.player.money;
        this.stage = "Wave: " + game.level + '-' + game.wave; 
        this.text = [this.lives, this.money, this.stage]; 
        
        for (let i=0; i<this.text.length; i++){
            ctx.fillText(this.text[i], this.x+this.padding, this.y+this.padding*(1+i), this.width); 
        }
    }


}

/***/ }),

/***/ "./src/SpriteAnimation.js":
/*!********************************!*\
  !*** ./src/SpriteAnimation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SpriteAnimation)
/* harmony export */ });
/* harmony import */ var _img__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img */ "./src/img.js");


class SpriteAnimation{
    images = [];
    constructor(fileName, numberOfImages, timerCount, state, stop){
        for (let i = 0; i<=numberOfImages; i++){ // loads images into array 
            const image = (0,_img__WEBPACK_IMPORTED_MODULE_0__["default"])(fileName.replace("?", i)); 
            this.images.push(image); 
        }
        this.numberOfImages = numberOfImages;
        this.timerCount = timerCount;
        this.timerCountDefault = this.timerCount; 
        this.imageIndex = 0; 
        this.state = state; 
        this.stop = stop; 
    }
    
    isFor(state){
        return this.state === state; 
    }

    reset(){ // loop animation
        this.imageIndex = 0;   
    }

    getFrame(){
        return this.imageIndex; 
    }

    getImage(pause){  //returns frame
        this.setImageIndex(pause); 
        return this.images[this.imageIndex]; 
    }

    imagebyFrame(frame){ //manual export image
        return this.images[frame]; 
    }

    moveFrame(obj, pause){
        obj.timerCount--;
        if (obj.timerCount <= 0 && !this.shouldStop()){
            obj.timerCount= this.timerCountDefault; 
            if (!pause) {obj.frame++;} //animate only when unpaused
            if (obj.frame >= this.images.length){
                obj.frame = 0; 
            }
        }
    }


    setImageIndex(pause){
        this.timerCount--;
        if (this.timerCount <= 0 && !this.shouldStop()){
            this.timerCount= this.timerCountDefault; 
            if (!pause) {this.imageIndex++;} //animate only when unpaused
            if (this.imageIndex >= this.images.length){
                this.imageIndex = 0; 
            }
        }
    }

    shouldStop(){
        return this.stop  && this.imageIndex === this.images.length-1
    }
}


/***/ }),

/***/ "./src/endScreen.js":
/*!**************************!*\
  !*** ./src/endScreen.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ endScreen)
/* harmony export */ });
class endScreen{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  600;
        this.height = 200; // game.gameHeight - 3*90; 
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.padding = 25; 
        this.font = "16px arial";
        this.font2 = "24px arial";
        this.display = true; 
        this.button1 = document.createElement('button');
        this.button1.textContent = 'Return to Main';
        this.buttonX1 = this.gameWidth/2;
        this.buttonWidth = 250;
        this.buttonHeight = 30; 
        
        
        this.stats1 = [];
        this.stats2 = [];
        this.statPosition = this.x; //starting x 
        this.statHeight = 20;
        this.statWidth = 200;

        this.buttonPositions = [ [this.x+(this.width-this.buttonWidth)/2, this.height-this.buttonHeight-this.padding]] 
        this.buttonsList = [this.button1]
        }

        initialize(game){
            const canvas = document.getElementById('gameScreen');
            var elem = this;
            canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);            
        }

        redraw(ctx){
            for (let i = 0; i<this.buttonsList.length; i++){
              this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
            }
        }

        startFunctions(game){
            game.nextWave = true; 
            this.display = false; 
        }

        handleClick(e, game){
            const canvas = document.getElementById('gameScreen');
            let ctx = canvas.getContext('2d'); 
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            
            for (let i = 0; i<this.buttonsList.length; i++){
               // this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                    if (game.gameOver){
                        this.display = false; 
                        game.fadeOut = true;
                        setTimeout(()=> {game.titleDisplay = true}, "2000")} // fade out transition }
                    else {game.levelFinish = true;}
                }
            }      
        }


        drawButton(e1, x, y, ctx){   
            ctx.fillStyle = 'steelblue'; //draw border
            ctx.beginPath(); //sets area for collision (isPointInPath)
            ctx.roundRect(x,y,this.buttonWidth, this.buttonHeight, 2);
            ctx.stroke();
            ctx.fill();

            ctx.font = this.font2; //draw text 
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(e1.textContent, x+this.buttonWidth/2, y+this.buttonHeight/2); 
        }

        loadStats(game){
            this.stats1 = [[ 'Monsters Defeated: '+ game.monsterKill],
                    ['Monsters Escaped: '+ game.monsterEscape],
                        ['Mesos Collected: '+ game.moneyCollected],['Mesos Lost: '+ game.moneyLost]
                    ];
            
            this.stats2 = []
            for (const obj of game.playerObjects){
                let statsObj = ''
                if (obj.type == 'greenDragon'){ //add poison
                    statsObj =  [obj.name+' Damage: '+ obj.damageDealt.toFixed(0) + " (+"+ game.poisonDamage.toFixed(0)+ ')']; }
                else if (obj.type == 'redDragon' || obj.type == 'blackDragon'){ //explode damage 
                    statsObj =  [obj.name+' Damage: '+ obj.damageDealt.toFixed(0) + " (+"+ obj.explodeDamageDealt.toFixed(0)+ ')']; }
                else {statsObj =  [obj.name+' Damage: '+ obj.damageDealt.toFixed(0)]; }
                this.stats2.push(statsObj); 
            }
        }
     

        displayMenu(ctx, game){ //upgrade window background
            if (this.display){
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "5"; 
                ctx.beginPath();
                ctx.roundRect(this.x, this.y, this.width, this.height, 2);
                ctx.stroke();
                ctx.fill();

               
                if (game.gameOver){
                        ctx.fillStyle = 'red';
                        ctx.font = this.font2; 
                        ctx.textAlign = 'center';
                        ctx.fillText('Game Over!', this.gameWidth/2, 25);
                        this.redraw(ctx); //return to main button 
                    }
                else {
                    if (game.waveFinish){
                        let text1='';
                        let text2='';
                        if (game.level == game.finalLevel && game.levelList.length == 0){ //final level
                            text1= 'Final Level Clear!'         
                            text2= 'Thanks for playing'
                            this.redraw(ctx);} //return to main button 
                        else{
                            if (game.levelList.length == 0){
                                text1='Level ' +game.level+ ' Clear!';
                            }
                            else { text1='Wave Clear!';}
                            text2 = 'Press [A] to open shop or [D] to start next wave';
                        }
                        ctx.fillStyle = 'black';
                        ctx.font = this.font2; 
                        ctx.textAlign = 'center'; 
                        ctx.fillText(text1, this.gameWidth/2, 25)
        
                        ctx.font = this.font2; 
                        ctx.textAlign = 'center'; 
                        ctx.fillStyle = 'blue';
                        ctx.fillText(text2, this.gameWidth/2, this.height-10)//
                    }
                }

            


                ctx.textAlign = 'start'; //stats 
                ctx.font = this.font;
                ctx.fillStyle = 'black';
                this.loadStats(game);
                for (let i=0; i<this.stats1.length; i++){
                    for (let j=0; j<this.stats1[i].length; j++){
                        ctx.fillText(this.stats1[i][j], this.padding+this.statPosition+(this.statWidth/4)*j,
                            25+ this.padding+(this.statHeight)*i, 300 ); 
                        }
                    }    
                for (let i=0; i<this.stats2.length; i++){
                    for (let j=0; j<this.stats2[i].length; j++){
                        ctx.fillText(this.stats2[i][j], this.padding+this.statPosition+this.statWidth*1.5,
                            25+ this.padding+(this.statHeight)*i, 300 ); 
                        }
                    }    
            }; 
            
                
    }
}


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/input.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _mob__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mob */ "./src/mob.js");
/* harmony import */ var _upgrade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./upgrade */ "./src/upgrade.js");
/* harmony import */ var _money__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./money */ "./src/money.js");
/* harmony import */ var _startScreen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./startScreen */ "./src/startScreen.js");
/* harmony import */ var _titleScreen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./titleScreen */ "./src/titleScreen.js");
/* harmony import */ var _restartScreen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./restartScreen */ "./src/restartScreen.js");
/* harmony import */ var _endScreen__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./endScreen */ "./src/endScreen.js");
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _img__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./img */ "./src/img.js");
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");
 
 

 
 
 
 
 
 
 

 

class Game{
    constructor(gameWidth, gameHeight){
        this.note = true;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.title = new _titleScreen__WEBPACK_IMPORTED_MODULE_6__["default"](this); 
        this.title.initialize(this);
        this.end = new _endScreen__WEBPACK_IMPORTED_MODULE_8__["default"](this); 
        this.end.initialize(this);
        this.restart = new _restartScreen__WEBPACK_IMPORTED_MODULE_7__["default"](this); 
        this.restart.initialize(this);
        this.gameOver = false; 
        this.restartWindow = false;
        this.titleDisplay = true;//false; //enable for release
        this.load = false;
        this.playerObjects =[];
        this.mobObjects =[]; 
        this.moneyObjects = []; 
        this.level = 1;
        this.finalLevel =3 ; 
        this.wave = 0; 
        this.lane = 1; 
        this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgSky'+this.level+'.png');
        this.bgStage = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgStage'+this.level+'.png');
        this.waveStart = false;
        this.waveInfo = __webpack_require__(/*! ./waveInfo.json */ "./src/waveInfo.json");
        this.waveNotes = __webpack_require__(/*! ./waveNotes.json */ "./src/waveNotes.json");
        this.levelNote = ''; 
        this.levelList = [...this.waveInfo['level'+this.level]];//{1: ['wave1-5', 'wave1-1']} //JSON
        this.waveList = [];
        this.toLoad =[]; 
        this.rowHeight = 90; //lane size
        this.nextWave = false; 
        this.levelStart = false;
        this.waveFinish = true; 
        this.levelFinish = false ; //close stats menu
        
        this.firstLoad = 0; 
        this.noteTime = 0; 
        this.gameTime = 0; //played game time for events; 
        this.gameTimeReal = 0; //tracks time against pauses 
        this.pausedTime = 0; 
        this.timeOffset = 0
        this.timeOffsetSum = 0; 
        this.setPoint = false; 

        this.fade = 0;
        this.fadeIn = false;
        this.fadeOut = false ;
        this.storage = []; 
        this.error = false; 
        this.mobCount = 0 ; 

        this.poisonDamage = 0; 
        this.monsterKill = 0; 
        this.monsterEscape = 0;
        this.damageDealt = {}; 
        this.moneyCollected = 0;
        this.moneyLost = 0; 
        this.pause = false; 
        this.recallStorage=false;

        //load coin sprites
        this.coinSprites = [];//[0] = 1, [1] = 2; 
        for (let i =1; i<=4;i++){
         this.coinSprites.push(new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_11__["default"]('coin/Coin'+i+'_?.png', 3, 6, "stand") );
        }

    }

    pauseHandler(time, ctx){

        if (this.pause ){ //snaps when time is paused; 
            if (!this.setPoint){
                this.pausedTime = time;
                this.setPoint = true; 
            }
            else {this.timeOffset = time - this.pausedTime} //runs up offset value 
        }
        else 
            {
            this.upgrade.display = false ;
            this.timeOffsetSum+= this.timeOffset; //sum of offset values 
            this.timeOffset = 0;  //reset 
            this.gameTimeReal = time -this.timeOffsetSum; //apply offset sum
            this.setPoint = false;        
        }

        if (this.pause){
            ctx.globalAlpha = 0.6
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,this.gameWidth, this.gameHeight); 
            ctx.globalAlpha = 1;

            if (!this.upgrade.display){
                ctx.font = "16px arial"; 
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center'; 
                ctx.fillText('Press ESC to unpause', this.gameWidth/2, this.gameHeight/2+20) 
            }
        }
    }

    togglePause(){   
        this.pause = !this.pause; 
    }

    resetEverything(){
        this.gameOver = false; 
        this.restartWindow = false;
        this.titleDisplay = false; //enable for release
        this.moneyObjects = []; 
        this.wave = 0; 
        this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgSky'+this.level+'.png');
        this.bgStage = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgStage'+this.level+'.png');
        this.waveStart = false;
        this.waveInfo = __webpack_require__(/*! ./waveInfo.json */ "./src/waveInfo.json");
        this.levelList = [...this.waveInfo['level'+this.level]];//{1: ['wave1-5', 'wave1-1']} //JSON

        this.waveList = [];
        this.toLoad =[]; 
        this.nextWave = false; 
        this.waveFinish = true; 
        this.levelFinish = false ; //close stats menu
        //this.gameTime = 0; 
        this.storage = []; 
        this.poisonDamage = 0; 
        this.monsterKill = 0; 
        this.monsterEscape = 0;
        this.damageDealt = {}; 
        this.moneyCollected = 0;
        this.moneyLost = 0; 
        this.recallStorage=false;
        this.loadBG();
        this.playerObjects = [this.player];
        this.player.money = 50;  //50
        if (this.level == 2) {this.player.money = 1200} //starting money based on level;
        else if (this.level == 3) {this.player.money = 5000}
    }
    
    titleMenu(ctx){ 

        this.title.displayMenu(ctx, this); 
    }

    waveClear(ctx){ // checks if wave is cleared
        if (!this.nextWave && this.waveStart && this.levelStart && 
            this.toLoad.length == 0  && this.mobObjects.length==0 ){
            this.waveFinish = true; 
            this.end.display = true;
            this.end.displayMenu(ctx, this);
        } 
    }
    nextLevelLoader(ctx){
        if (this.levelList.length == 0 && this.waveFinish){
            if (this.levelFinish){
                if (this.level==this.finalLevel){ 
                    this.gameOver = true; 
                }
                else {
                this.waveStart = false;
                this.waveFinish = false; 
                setTimeout(()=> {
                    this.fadeOut = true}, "2000") // fade out transition
                setTimeout(()=> { //load next content
                    this.level++;
                    this.levelList = [...this.waveInfo['level'+this.level]]; // load next level waves
                    this.levelFinish = false;
                    this.wave = 0;                 
                    this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgSky'+this.level+'.png'); //reload BG art 
                    this.bgStage = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgStage'+this.level+'.png');
                    this.moneyObjects = []; //clear floor money 
                    this.waveStart = false; 
                    this.waveFinish = true;
                    this.nextWave  = false 
                    
                    this.player.left = false;
                    this.player.lane = 1;
                    this.player.position = {x:25, y:this.gameHeight - 45 - 2*this.player.rowHeight};
                    this.player.floor = this.gameHeight - 45 - (1+this.player.lane)*this.player.rowHeight;
                    this.storage = this.playerObjects.splice(1);  //pulls everything expect player
                }, "4000"); 
            }
        }

        }
    }

    nextWaveLoader(){
        if (this.nextWave){ //load next wave data from JSON
            if (this.levelList.length>0){
                this.waveList = [...this.waveInfo[this.levelList.shift()]]; //
                this.gameTime = this.gameTimeReal; //start of wave;
                this.waveStart = false; 
                this.wave ++; 
                this.nextWave = false; 
                this.upgrade.display = false;
                this.waveFinish = false; 


                if (this.waveNotes['wave'+this.level+'-'+this.wave]){
                    this.levelNote = this.waveNotes['wave'+this.level+'-'+this.wave];
                    this.noteTime = this.gameTimeReal; 
                }
            }
            else this.levelFinish = true;
        }
    }

    screenTransition(ctx){
        if (this.fadeIn){ //fade in 
            if (this.fade>0){
                this.fade -= 0.03; 
                if (this.fade <= 0) {this.fadeIn = false;}
            } 
        }
        if (this.fadeOut){ //fade to black
            if (this.fade < 1){    
                this.fade += 0.03; 
                if (this.fade >= 1) { 
                    setTimeout(()=> {
                        this.fadeIn = true;
                        this.fadeOut = false;}, "1500")}
            } 
        }
        if (this.fadeIn || this.fadeOut){
            ctx.fillStyle = "black";
            ctx.globalAlpha = this.fade; 
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight); 
            ctx.globalAlpha = 1;
        }

    }
    waveLoader(){//loadds each mob from waveList
        if (this.toLoad.length == 0 && this.waveList.length>0) {this.toLoad = this.waveList.shift();}
        if (this.toLoad[2] <=  (this.gameTimeReal - this.gameTime)/1000 ){
            this.waveStart = true; 
            this.levelStart = true;
            if (this.toLoad[1].length>0){ //multiple entries 
                for (let i=0; i<this.toLoad[1].length; i++){
                    this.lane = this.toLoad[1][i]; //sets lane to load
                    this.createMob(this, this.toLoad[0], 1);
                    this.mobCount ++; }
                }
            
            else{
                this.lane = this.toLoad[1]-1; //sets lane to load
                this.createMob(this, this.toLoad[0], 1);
                this.mobCount ++; }           
            this.toLoad = []; 
        } 

    }    
    
    addElement(element){ //upgrade shop 
       if (this.player.elementList.length<5){
            if (this.player.money>= this.player.elementCost[this.player.elementList.length]){
                this.player.money -= this.player.elementCost[this.player.elementList.length];
                this.player.elementList.push(element); 
                this.player.elementals(); //load sprites
                //apply upgrades
                if (element == 'Blaze'){this.player.damageMulti+=0.4 }
                if (element =="Dawn"){this.player.lootMulti+=0.5; this.player.damageMulti+=0.2 };
                if (element =='Night'){this.player.knockbackMulti+=0.2; this.player.damageMulti+=0.2};
                if (element =='Wind'){this.player.speedMulti+=0.2};
                if (element =='Thunder'){this.player.pierce+=1;this.player.damageMulti+=0.2 };
                
            }
       }
    }

    resummon(type){
        let transfer = this.storage.findIndex(obj=>obj.type === type); 
        this.storage[transfer].position.x = (this.player.curTile*80)+this.player.width/2;
        this.storage[transfer].position.y = (this.player.floor+30); 
        this.storage[transfer].lane = this.player.lane;

        this.playerObjects.push(this.storage[transfer]); //copies object to list
        this.storage.splice(transfer); //deletes object from storage
    }
    recallCheck(){
        if (!this.recallStorage  && this.storage[0]){
            this.recallStorage = this.storage.shift() ;
        }
    }
    recall(){        
        if (!this.recallStorage){
            this.recallStorage = this.playerObjects.find(obj=> (obj.position.y-30 === this.player.floor)&&  //checks for existing unit 
            (obj.position.x === (this.player.curTile*80)+this.player.width/2) && (obj.name!=='Wiz' ))

            if (this.recallStorage)
            {
                let type = this.recallStorage.type;
                this.playerObjects = this.playerObjects.filter(  
                    function (object){return object.type != type; });    
            }
        }
        else {
            if (!this.playerObjects.find(obj=> (obj.position.y-30 === this.player.floor) &&  //checks for existing unit 
            (obj.position.x === (this.player.curTile*80)+this.player.width/2) && (obj.name!=='Wiz'))){
                    
                this.recallStorage.position.x = (this.player.curTile*80)+this.player.width/2;
                this.recallStorage.position.y = (this.player.floor+30); 
                this.recallStorage.left = (this.player.left); 
                this.recallStorage.lane = (this.player.lane); 

                this.playerObjects.push(this.recallStorage);
                this.recallStorage = false;
            }
        }
        

        // if (!this.recallStorage){
        //     this.recallStorage = this.playerObjects.find(obj=> (obj.position.y-30 === this.player.floor)&&  //checks for existing unit 
        //     (obj.position.x === (this.player.curTile*80)+this.player.width/2) && (obj.name!=='Wiz' ))

        //     if (this.recallStorage)
        //     {
        //         let type = this.recallStorage.type;
        //         this.playerObjects = this.playerObjects.filter(  //removes looted coins
        //             function (object){return object.type != type; });    
        //     }
        // }
        // else {
        //     this.recallStorage.position.x = (this.player.curTile*80)+this.player.width/2;
        //     this.recallStorage.position.y = (this.player.floor+30); 

        //     this.playerObjects.push(this.recallStorage);
        //     this.recallStorage = false;
        // }


    }

    createMob(parent, type, side, game = null ){
        if (side === 0 && !this.recallStorage){ //Summon unit
            if (!this.playerObjects.find(obj=> (obj.position.y-30 === this.player.floor) &&  //checks for existing unit 
            (obj.position.x === (this.player.curTile*80)+this.player.width/2) && (obj.name!=='Wiz'))){
                
                let cost = 1000; 
                if (this.player.summonCost[this.player.summonCount]){ 
                    cost = this.player.summonCost[this.player.summonCount]; 
                    if (this.player.money>=cost){
                        this.playerObjects.push(new _mob__WEBPACK_IMPORTED_MODULE_2__["default"](parent, type, 0)) 
                        this.player.money -= cost; 
                        this.player.summonCount ++; 
                    }
                }
                }
            else if (game){game.error = true; }; 

        } else {this.mobObjects.push(new _mob__WEBPACK_IMPORTED_MODULE_2__["default"](parent, type, 1))}
        
    }

    loadBG(){
        this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_10__["default"])('bg/bgSky'+this.level+'.png'); //load sky bg
    }

    start(){
        this.startMenu = new _startScreen__WEBPACK_IMPORTED_MODULE_5__["default"](this);
        this.startMenu.initialize(this); 
        this.upgrade = new _upgrade__WEBPACK_IMPORTED_MODULE_3__["default"](this); 
        this.upgrade.initialize(this); 
        this.HUDMenu = new _HUD__WEBPACK_IMPORTED_MODULE_9__["default"](this); 
        this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        this.playerObjects = [this.player];
        this.inputHandler = new _input__WEBPACK_IMPORTED_MODULE_0__["default"](this.player, this.upgrade, this);        

        // this.playerObjects.push(new Mob(this.player, 'redDragon', 0,4,5)); 
        // this.playerObjects.push(new Mob(this.player, 'blueDragon', 0,2,5)); 
        // this.playerObjects.push(new Mob(this.player, 'greenDragon', 0,3,5)); 
        // this.playerObjects.push(new Mob(this.player, 'blackDragon', 0,1,5)); 

    }



    draw(ctx){ //runs draw function for object list 

        ctx.drawImage(this.bgSky, 0, 0); 
        ctx.drawImage(this.bgStage, 0, 0); 
        this.startMenu.displayMenu(ctx, this );
        
        this.playerObjects.forEach( (object)=>object.emote(this)); 
        this.playerObjects.forEach( (object)=>object.draw(ctx,this.pause) )
        this.mobObjects.forEach( (object)=>object.draw(ctx, this.pause) );
        this.moneyObjects.forEach( (object)=>object.draw(ctx,this) ); 
        this.playerObjects.forEach( (object)=>object.drawProj(ctx,this.pause) ); //player proj
        this.mobObjects.forEach( (object)=>object.drawProj(ctx, this.pause) ); //mob proj 


        this.player.recallIcon(ctx, this);
    
    } 

    knockback(obj, direction, multi){
        if (obj.name =='Wiz'){ //only player pops up
            obj.jump = true;
            obj.invulnTime = 110; 
            obj.speedY += 4;
            obj.knockbackForce= -8*direction; }
        else{
            obj.hit = true; 
            obj.knockbackTime = this.gameTimeReal;  //stores when target knockback;
            if (obj.boss){-2*direction*(1+ (multi-1)/4)} //boss less knockback
            else {obj.knockbackForce = -4*direction*(1+ (multi-1)/4)}; //add as stat
            
        }
    }
    aggro(obj1, obj2){ // checks if obj1 range is within obj2
        for (const target of obj2){
            if (target.health>0){
                
                if (obj1.hitbox[0]+obj1.hitbox[2]+obj1.range>target.hitbox[0] || 
                    obj1.hitbox[0]-obj1.range<target.hitbox[0]+target.hitbox[2]){ //aggro from right
                        if (obj1.aggro && obj1.side == 1 && obj1.position.x+150<this.gameWidth){obj1.attack()} //enemies attack on CD
                        else if (obj1.side == 0 && 
                            obj1.hitbox[1]+15>=target.hitbox[1] && obj1.hitbox[1]<target.hitbox[1]+target.hitbox[3] ){obj1.attack()
                            }
                        }
                }

            }
    }
    
    lootMoney(obj1, obj2){
        for (const target of obj2){ //-(this.width*(-1+this.lootMulti))
            if ( (obj1.hitbox[0]<target.hitbox[0] && obj1.hitbox[0]+obj1.hitbox[2]+80*(obj1.lootMulti-0.8) > target.hitbox[0]) || // player -> money
                (obj1.hitbox[0] > target.hitbox[0]+target.hitbox[2] && obj1.hitbox[0]-80*(obj1.lootMulti-0.8)<target.hitbox[0]+target.hitbox[2] )){ //money <- player
                if (obj1.hitbox[1]<target.hitbox[1] && obj1.hitbox[1]+obj1.hitbox[3]>target.hitbox[1]){
                    if (!target.startFade){
                        obj1.money += target.value; 
                        this.moneyCollected += target.value;
                        target.startFade = true;//true; 
                        target.float = true; 
                    }
            }
            }
            if (target.lost){ 
                this.moneyLost+=target.value
                target.value=0 }; 
        }
            

        this.moneyObjects = this.moneyObjects.filter(  //removes looted coins
        function (object){return object.delete == false; });     
    }

    explodeDamage(obj1, obj2, obj3){
        for (const target of obj2){
            if (target.health>0){
                if ( (obj1.hitbox[0]<target.hitbox[0] && obj1.hitbox[0]+obj1.hitbox[2]+obj3.area > target.hitbox[0]) || //obj1 ->target
                    (obj1.hitbox[0]+obj1.hitbox[2]>target.hitbox[0]+target.hitbox[2] && obj1.hitbox[0]-obj3.area<target.hitbox[0]+target.hitbox[2] )){ 
                        if ((obj1.hitbox[1]>target.hitbox[1] && obj1.hitbox[1]<target.hitbox[1]+target.hitbox[3])||obj3.column>0){
                            if (obj1.poison>0){
                                if (target.poisonStack+1<obj1.poisonMax){ //add to max stacks
                                    target.poisonAmount += obj1.poison;
                                    target.poisonStack++;}
                                target.poisonTime = 5;  //four ticks                
                                } 
                            else{
                                target.health -= obj3.damage; 
                                obj3.explodeDamageDealt += obj3.damage;}
                         }
                }
            }
        }
    }
    

    collision(obj1, obj2, obj3 = null){ // checks if obj1 is hitting obj2 
        for (const target of obj2){
            if (obj1.health>0 && target.health>0){
                if ( (obj1.hitbox[0]<target.hitbox[0] && obj1.hitbox[0]+obj1.hitbox[2]> target.hitbox[0]) || //obj1 ->target
                    (obj1.hitbox[0]+obj1.hitbox[2]>target.hitbox[0]+target.hitbox[2] && 
                    obj1.hitbox[0]<target.hitbox[0]+target.hitbox[2] )){ // target <- obj1

                    if (obj1.hitbox[1]>target.hitbox[1] && obj1.hitbox[1]<target.hitbox[1]+target.hitbox[3]){ //y-bounding
                        if (obj1.projectile && !obj1.explode && !obj1.hitList.includes(target.name)){
                            if (target.side == 0){
                                if(target.lane == obj1.lane){ //player only can get hit from proj in lane
                                    this.damageCalc(obj1, target, obj3);
                                    obj1.pierce -= 1;  
                                    obj1.hitList.push(target.name);                                    
                                    }
                                }
                            else {
                                this.damageCalc(obj1, target, obj3);
                                obj1.pierce -= 1;  
                                obj1.hitList.push(target.name); 
                            }
                            if (obj3.area>0){this.explodeDamage(obj1, obj2, obj3)}; //area damage; checks for nearby targets 
                            if (obj1.pierce<=0){obj1.explode = true}; //destroy projectile      
                        } else if (!obj1.projectile) 
                            if (obj1.lane == target.lane){this.damageCalc(obj1, target)};
                       
                    }
                }
                }
            }
        }
        

    damageCalc(obj1, obj2, obj3 = null){ //obj1 (owned by obj3) attacking obj2 
        if (obj2.invulnTime == 0 && obj1.touchHit) {
            let damage = obj1.damage;
            let knockback = 1; 
            if (obj3){obj3.damageDealt+= damage;
                    knockback = obj3.knockbackMulti; 
                }
            if (obj1.chill>0){
                if ( Math.abs(obj2.speedX)-obj2.chillAmount>0){obj2.chillAmount+= obj1.chill}
                else obj2.chillAmount = Math.abs(obj2.speedX);
            }
            obj2.health -= damage;
            obj2.knockbackSum += damage*knockback;

            if (obj2.knockbackThresh <= obj2.knockbackSum){
                if (obj1.position.x>obj2.position.x){ this.knockback(obj2, 1, knockback )}
                else this.knockback(obj2, -1, knockback);
                obj2.knockbackSum = 0 
                // obj2.knockbackThresh *=1.2 //increase threshold each time

            }
         }


    }
    loseLife(ctx){ //mob escapes
        for (const obj of this.mobObjects){
            if (obj.position.x <= -obj.width*2){
                //this.player.health -= 1; 
                if (!obj.flip){
                    if (obj.value.length>0){
                        for (let i = 0; i<obj.value.length;i++){
                            this.moneyLost+=obj.value[i];
                            }
                        }
                    else {this.moneyLost += obj.value;} //lost money
                    obj.alive = false; //delete monser; 
                    this.monsterEscape ++; 
                } else {obj.speedX = -obj.speedX; obj.left=!obj.left;}
            }
            else if (obj.position.x >= this.gameWidth && obj.speedX<0)
                {obj.speedX = -obj.speedX
                obj.left=!obj.left};

        }

    }
    // drawGrid(ctx){
    //     ctx.beginPath();  // this.gameHeight = gameHeight
    //     ctx.moveTo(0, this.gameHeight);
    //     ctx.lineTo(1000, this.gameHeight);
    //     ctx.lineTo(1000, this.gameHeight - this.rowHeight);
    //     ctx.lineTo(0, this.gameHeight - this.rowHeight);
    //     ctx.lineTo(0, this.gameHeight - this.rowHeight*2);
    //     ctx.lineTo(1000, this.gameHeight - this.rowHeight*2);
    //     ctx.lineTo(1000, this.gameHeight - this.rowHeight*3);
    //     ctx.lineTo(0, this.gameHeight - this.rowHeight*3);        
    //     ctx.stroke();
    // }

    upgradeMenu(ctx){
        this.HUDMenu.displayHUD(ctx, this);  
        this.upgrade.displayMenu(ctx, this);

        if (this.player.health <= 0 ){
            this.gameOver = true; 
            this.end.display = true;
            this.end.displayMenu(ctx, this);
        }
    }
    spawnMoney(obj){
        if (obj.state == 'die' && !obj.lootDrop){
            if (obj.value.length>0){
                let x = -0.6*2 ; //money spread
                for (let i = 0; i<obj.value.length; i++){
                    this.moneyObjects.push(new _money__WEBPACK_IMPORTED_MODULE_4__["default"](this, obj, obj.value[i], x+i*0.6))
                }
            }
            else {this.moneyObjects.push(new _money__WEBPACK_IMPORTED_MODULE_4__["default"](this, obj, obj.value))}
            obj.lootDrop = true; 
            this.monsterKill++; 
        }
    }
    update(){
        this.mobObjects.forEach( (object)=>this.spawnMoney(object)); 
        this.loseLife(); //enemies past 
        this.mobObjects = this.mobObjects.filter(  //removes dead/passing objects
            function (object){
                return (object.alive !== false)});        
        this.lootMoney(this.player, this.moneyObjects);

        this.playerObjects.forEach( (object)=>object.update() ); 
        this.mobObjects.forEach( (object)=>object.update(this) ); 
        this.moneyObjects.forEach( (object)=>object.update(this) ); 
        
        if (this.player.alive){
            this.playerObjects.forEach( (object)=>this.aggro(object, this.mobObjects) );  //summon attacks
        }
        this.mobObjects.forEach( (object)=>this.aggro(object, this.playerObjects) ); //mob attacks

        this.collision(this.player, this.mobObjects); 
        this.mobObjects.forEach( (object)=>this.collision(object, this.playerObjects) ); 

        this.mobObjects.forEach( (object)=>object.mobAttack(this)); 
        this.playerObjects.forEach( (object)=>object.summonAttack(this)); 
        
        this.mobObjects.forEach( (object)=> //mob proj to player 
            object.projectiles.forEach( (object2)=> 
                this.collision(object2, [this.player], object)));
                
        
        this.playerObjects.forEach( (object)=> //player proj to mobs
            object.projectiles.forEach( (object2)=> 
                 this.collision(object2, this.mobObjects, object)
                 )
             ); 

    }
   

    
}

/***/ }),

/***/ "./src/img.js":
/*!********************!*\
  !*** ./src/img.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ img)
/* harmony export */ });
function img(file){
    const image = new Image(); 
    image.src = 'images/'+file; 
    return image; 
}


/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputHandler)
/* harmony export */ });
class InputHandler{
    constructor(player, upgrade, Game){
        document.addEventListener('keydown', (event) =>{    
            switch(event.keyCode){ //a:65; s:83; d:68, w: 87;

                case 37: //left arrow
                    if (Game.titleDisplay && !Game.fadeOut && Game.level>1){Game.level--}
                    else if (upgrade.display){
                        if(upgrade.selectionX>1){upgrade.selectionX-=1}
                    }
                    else {
                            player.speedX = -player.speed; 
                            player.left = true;}
                        break;

                case 39: //right arrow
                    if (Game.titleDisplay && !Game.fadeOut && Game.level<Game.finalLevel){Game.level++}
                    else if (upgrade.display){
                            if(upgrade.selectionX<2){upgrade.selectionX+=1};
                            }
                    else {
                            player.speedX = player.speed; 
                            player.left = false;}
                            break;
        

                case 38: // up arrow
                    if (upgrade.display){
                        if(upgrade.selectionY>1){upgrade.selectionY-=1};
                        }
                    else {player.teleport(-1);}
                break
                
                case 40: // down arrow
                    if (upgrade.display){
                        if(upgrade.selectionY<5){upgrade.selectionY+=1};
                        }
                    else {player.teleport(1);}
                break
                    
                case 90: //Z recall
                if (!Game.titleDisplay) {Game.recall(); }
                break

                case 88: //X jump
                    if (!player.jump){
                        player.speedY = 12;
                        player.jump = true;}
                        break     

                case 67: //C attack
                    player.attack(Game.pause);
                    break
          
                case 65: //A open shop
                        upgrade.toggleMenu(Game); 
                    break

                case 83: // S buy
                    if (upgrade.display && !Game.titleDisplay){upgrade.purchase(Game)}
                break

                case 68: //D start wave
                    if (Game.waveFinish && Game.storage.length==0){
                        if (Game.gameTimeReal-Game.firstLoad>5000){
                            Game.nextWave = true; 
                            Game.startMenu.display = false}; }
                    break

                case 27: // ESC
                    Game.togglePause(); 
                break
                ///////////old controls 
                // case 65: //A move left 
                //     if (upgrade.display){
                //         if(upgrade.selectionX>1){upgrade.selectionX-=1};
                //         }
                //     else {
                //         player.speedX = -player.speed; 
                //         player.left = true;}
                //     break;


                // case 68: //D move right
                // if (upgrade.display){
                //     if(upgrade.selectionX<2){upgrade.selectionX+=1};
                //     }
                // else {
                //     player.speedX = player.speed; 
                //     player.left = false;}
                //     break;

                // case 87: //W teleport up
                // if (upgrade.display){
                //     if(upgrade.selectionY>1){upgrade.selectionY-=1};
                //     }
                // else {player.teleport(-1);}
                //     break
                    
                // case 83: //S teleport down
                // if (upgrade.display){
                //     if(upgrade.selectionY<5){upgrade.selectionY+=1};
                //     }
                // else {player.teleport(1);}
                //     break


                // case 74:  //J 
                // if (upgrade.display){upgrade.purchase(Game)}    
                // else if (!player.jump){
                //     player.speedY = 12;
                //     player.jump = true;}
                //     break 

                // case 75: //K
                //     player.attack(Game.pause);
                //     break

                // case 79: //O
                //     if (Game.waveFinish && Game.storage.length==0){
                //         Game.nextWave = true; 
                //         Game.startMenu.display = false}; 
                //         break

    
                // case 96:
                //     upgrade.toggleMenu(); 
                //     break

                // case 97: //1
                //     Game.createMob(player, 'redDragon', 0);
                //     break
                // case 98: //2
                //     Game.createMob(player, 'blueDragon', 0);
                //     break
                // case 99: //3
                //     Game.createMob(player, 'greenDragon', 0);
                //     break
                // case 100: //4
                //     Game.createMob(player, 'blackDragon', 0);
                //     break

            }

        })
        document.addEventListener('keyup', (event) =>{    
            switch(event.keyCode){ //a:65; s:83; d:68, w: 87;
                default:
                    if (Game.titleDisplay){
                        Game.fadeOut = true;
                        Game.firstLoad = Game.gameTimeReal;
                        setTimeout(() =>{Game.titleDisplay = false;
                            Game.resetEverything(); 
                        }, 800)}
                break
                case 9:  
                case 18: 
                case 116: break; 

                case 37:   //A = 65
                    if (player.speedX<0) player.speedX = 0; 
                    break;
                case 39: // D = 68
                    if (player.speedX>0) player.speedX = 0; 
                    break;
                }

                
            })
        
    }
}

/***/ }),

/***/ "./src/mob.js":
/*!********************!*\
  !*** ./src/mob.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mob)
/* harmony export */ });
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectile */ "./src/projectile.js");
 
 

class Mob{
    constructor(game, type, side, test = 0, level=0){
        this.side = side;
        if (this.side == 0){this.typeInfo = __webpack_require__(/*! ./summonInfo.json */ "./src/summonInfo.json") }
        else (this.typeInfo = __webpack_require__(/*! ./mobInfo.json */ "./src/mobInfo.json"))
        
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.type = type; 
         
        this.value = this.typeInfo[this.type]['value']; 
        this.lootDrop = false; 
        this.projectiles = [];
        this.speed = 1;
        this.level = 1; 
        this.fade = 1; 
        
        this.alive = true;  
        this.attackCD = 0; 
        this.maxSpeed = 15; 
        this.speed = 2;
        this.touchHit = true; 
        this.knockbackForce = 0; 
        this.sprite = this.typeInfo[this.type]['sprite']; 
        //this.damage = this.typeInfo[this.type]['damage']; 
        this.attackSpeed = this.typeInfo[this.type]['atkSpd']; 
        
        this.speedX = this.typeInfo[this.type]['speed'];
        this.speedY = 0; 
        this.gravityTime = 1;
        this.lane = game.lane;  // which lane
        if (this.side == 1){ //Enemy Mob 
            this.invulnTime =  0; 
            this.name = this.type+game.mobCount; 
            this.width = 45; //sprite size 
            
            if (this.typeInfo[this.type]['height']){this.height = this.typeInfo[this.type]['height']}
            else this.height = 65;
            if (this.typeInfo[this.type]['range']){this.range = this.typeInfo[this.type]['range']}
            else {this.range = 10;}
            this.left = true;
            this.health = this.typeInfo[this.type]['health'];
            this.maxHealth = this.health; 
            this.armor = 0;
            this.state = 'walk';
            this.xOff=-70;
            this.yOff=-85;
            this.position = {  //position (rightside)
                x: this.gameWidth+50, 
                y: this.gameHeight - 105 - game.rowHeight*game.lane,
            }
        }
        else { // PC pets
            this.invulnTime = 1; 
            this.width = 50; //sprite size 
            this.height = 50; 
            this.range = 600; //whole lane?
            this.health = 1; 
            this.armor = 1; 
            this.state = 'stand'
            this.left = false; 
            this.yOff=0;
            this.xOff=0;
            this.damageDealt = 0;
            this.aggro = true;
            this.name = this.typeInfo[this.type]['name'];
            if (level!=0) {this.level = level}; 
            this.label = 'Lvl. ' + this.level; 
            this.emoteTime = 100;
            this.emoteLength = [];
            this.yStart = game.floor+30;
            this.position = {  //position 
            x: (game.curTile*80)+game.width/2, 
            y: game.floor+30
            }  
        };  //offset for sprites 
        //if (this.typeInfo[this.type]['yOff']) (this.position.y -=this.typeInfo[this.type]['yOff']) ;
        if (this.typeInfo[this.type]['spriteType']){this.loadSprite = this.typeInfo[this.type]['spriteType'][0]}
        else {this.loadSprite = this.type};
        this.form = 0; 
        if (this.typeInfo[this.type]['damage']){this.damage = this.typeInfo[this.type]['damage']}
        else this.damage = 1;
        if (this.typeInfo[this.type]['aggro'])this.aggro = true;

        if (this.typeInfo[this.type]['width2']){this.width2 = this.typeInfo[this.type]['width2']}
        else {this.width2=0};
        if (this.typeInfo[this.type]['height2']){this.height2 = this.typeInfo[this.type]['height2']}
        else this.height2 = 0;

        if (this.typeInfo[this.type]['yOff']){this.yOff = this.typeInfo[this.type]['yOff']}
        if (this.typeInfo[this.type]['xOff']){this.xOff = this.typeInfo[this.type]['xOff']}
        if (this.typeInfo[this.type]['boss']){this.boss = true; 
                this.position.y-=70; this.height+=100}; 
        if (this.typeInfo[this.type]['roam']){
            this.roam = true; 
            this.roamTime = 50;
            this.roamY = this.lane*game.rowHeight; 
            this.roamLimits = [0, game.rowHeight, game.rowHeight*2]; //0,1,2
            //this.destination = 0;
         }
        else {this.roam = false}; 
        
        this.xOff2 = 0; 
        this.knockbackTime = 0 ;  
        this.knockbackThresh = Math.floor(this.maxHealth / 3);
        this.knockbackSum = 0;  
        this.knockbackResist = 0.3
        this.hit = false; 
        this.createAnimations(); 
        this.emoteChange = true;
        this.emoteTimer = true;
        this.emoteTimeOut = [];
        this.posionGraphic = []; 
        this.hitBy = []; 
        this.damageMulti = 1; 
        this.lootMulti = 1;
        this.knockbackMulti = 1;
        this.speedMulti = 1; 
        this.pierce = 1; 

        this.projectileAmount = 0; 
        this.chillAmount = 0; 
        this.poisonLoaded = false; //load sprite 
        this.poisonTime = 0; 
        this.poisonAmount = 0; 
        this.poisonTick = 0;
        this.chill = 0;
        this.area = 0; 
        this.column = 0; 
        this.explodeDamageDealt = 0 
        this.poison = 0; 
        this.poisonStack = 0; 
        this.poisonMax = 0; 

        this.attacked = false ;
        this.attackStart = 0;
        this.delayAttack = false;

        if (this.typeInfo[this.type]['flip']){this.flip = true }
        if (this.typeInfo[this.type]['weird']){
            this.weird = true; 
            this.weirdStart = game.gameTimeReal; 
            this.weirdTime = Math.floor(Math.random()*3000)+2000;

        }

        if (test==1){
            this.position.x = 260; 
            this.position.y = 395; //bottom
            this.lane = 0;

        }
        else if (test==2){
            this.position.x = 260; 
            this.position.y = 305; //middle
            this.lane = 1;
            
        }
        else if (test==3){
            this.position.x = 260; 
            this.position.y = 215; //top 
            this.lane = 2;    
        }
        else if (test==4){
            this.position.x = 340; 
            this.position.y = 305; // middle #2
            this.lane = 1;
            
        }
        if (this.type == 'redDragon'){
            if (this.level>=2){this.projectileAmount++; this.damageMulti+=0.3}
            if (this.level>=3){this.area += 60; this.damageMulti+=0.3}
            if (this.level>=4){this.area +=40; this.projectileAmount++};
        };

        if (this.type == 'blueDragon'){
            if (this.level>=2){this.projectileAmount++; this.pierce += 1;}
            if (this.level>=3){this.chill += 0.2; this.pierce += 1}
            if (this.level>=4){this.chill += 0.1; this.projectileAmount++};
        };
        if (this.type == 'greenDragon'){
            if (this.level>=2){this.projectileAmount++;}
            if (this.level>=3){this.poison += 0.4; this.area += 20; this.poisonMax+=10;}
            if (this.level>=4 ){this.poison += 0.4; this.area += 10; this.poisonMax+=5; this.projectileAmount++}
        };
        if (this.type == 'blackDragon'){
            if (this.level>=2){this.projectileAmount++; this.damageMulti+=0.2}
            if (this.level>=3){this.area +=15; this.column=1;this.damageMulti+=0.2}
            if (this.level>=4){this.area +=15; this.projectileAmount++}
        };
        if (this.level>=3){this.evolve()} 

    }


    createAnimations(){ //import sprites 
        this.frames = 30; 
        if (this.sprite=='mob'){ // Enemy mobs
            this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/stand_?.png', this.typeInfo[this.type]['stand'], 10, "stand"); //standing sprites; 
            this.walk = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/move_?.png', this.typeInfo[this.type]['walk'], 10, "walk"); //walking sprites; 
            this.hit = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/hit1_?.png',0, 10, "hit");
            this.die = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/die1_?.png', this.typeInfo[this.type]['die'], 15, "die", true);
            this.animations = [this.stand, this.walk, this.hit, this.die]; 
            if (this.typeInfo[this.type]['angry']){
                this.angry = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite+'/attack1_?.png', this.typeInfo[this.type]['angry'], 10, "attack", true)
                this.animations.push(this.angry);
            };
        }           
        else { 
            this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite +'/stand1_?.png', this.typeInfo[this.type]['stand'][this.form], 10, "stand"); //standing sprites; 
            this.angry = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite +'/angry_?.png', this.typeInfo[this.type]['angry'][this.form], 10, "attack", true); //walking sprites; 
            this.animations = [this.stand, this.angry]; 
            let emotes = this.typeInfo[this.type]['emote'][this.form];
            for (let i = 0; i<emotes.length; i++){
                let emote = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.loadSprite +'/'+emotes[i][0]+'_?.png', emotes[i][1], 10, "emote"+(1+i) ); //emote; 
                this.animations.push(emote);
                this.emoteLength.push(emotes[i][2]);
            }
            //console.log(this.animations);
        }
    }
    evolve(){
        this.form++; 
        this.loadSprite = this.typeInfo[this.type]['spriteType'][this.form]; 
        this.emoteLength = []; 
        this.createAnimations(); // update sprites 

    }
    levelUp(player){ 
        let cost = player.upgradeCost[this.level-1];
        if (player.money>=cost){
            this.level++;  
            this.label = 'Lvl. ' + this.level; 
            this.value += cost; 
            player.money -= cost; 
            if (this.level==3){this.evolve()} 
            if (this.type == 'redDragon'){
                if (this.level==2){this.projectileAmount++; this.damageMulti+=0.5}
                if (this.level==3){this.area += 60; this.damageMulti+=0.5}
                if (this.level==4){this.area +=40; this.projectileAmount++};
            };
    
            if (this.type == 'blueDragon'){
                if (this.level==2){this.projectileAmount++; this.pierce += 1; this.damageMulti+=0.2}
                if (this.level==3){this.chill += 0.2; this.pierce += 1; this.damageMulti+=0.2}
                if (this.level==4){this.chill += 0.1; this.projectileAmount++};
            };
            if (this.type == 'greenDragon'){
                if (this.level==2){this.projectileAmount++;this.damageMulti+=0.2}
                if (this.level==3){this.poison += 0.7; this.area += 25; this.poisonMax+=10;}
                if (this.level==4 ){this.poison += 0.7; this.area += 10; this.poisonMax+=10; this.projectileAmount++}
            };
            if (this.type == 'blackDragon'){
                if (this.level==2){this.projectileAmount++; this.damageMulti+=0.3}
                if (this.level==3){this.area +=15; this.column=1;this.damageMulti+=0.3}
                if (this.level==4){this.area +=15; this.projectileAmount++}
        }
    }
        // stat updates .damageMulti
    }

    emote(game){
        let random = Math.floor(Math.random()*10);
        if (this.emoteChange){
            if (!game.player.alive){
                //this.state = 'emote5';
                if(random>5){this.state = 'emote5';} // cry
                else {this.state = 'emote2';} // bewilder
            }
            else if (game.waveFinish ){
                    if(random>5){this.state = 'emote3';} // sit
                    else {this.state = 'emote4';} // sleep
            }
            this.emoteTimer = false;
            this.emoteChange = false; 
        }

        else if (!this.emoteChange && !this.emoteTimer){ 
            this.emoteTimer = true;
            setTimeout(()=> {this.emoteChange = true}, "5000") ;}

    }

    attack(){ //triggers attack state 
        if (this.attackCD <= 0 && this.health>0){
            this.state = 'attack'; 
        }          
    }

    summonAttack(){ //summon attacks 
        if ( !this.attacked){
            if (this.angry.getFrame()==2){
                this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'][this.form], this.position.x, this.position.y-50));
                if (this.projectileAmount>0){ //extra projectiles 
                    for (let i=1; i<=this.projectileAmount; i++){ 
                    setTimeout( ()=> {this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'][this.form], this.position.x, this.position.y-50));
                        }, 120*i)
                    }
                }
                this.attacked = true;
                this.attackCD = this.attackSpeed;
               // this.angry.reset();
                this.emoteTime = 100+Math.floor(Math.random()*500); //reset random emote time
            }
        }
    }

    mobAttack(game){
        if (!this.attacked && game.player.alive && this.health>0){
            if (this.loadSprite=='stumpy'){
                if (this.angry.getFrame() == 9){
                    this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'], 
                    this.position.x-40, this.position.y+30));    
                     this.attacked = true;
                     this.attackCD = this.attackSpeed;
                };
            }

            else if (this.loadSprite=='ghostStump'){
                if (this.angry.getFrame() == 4){
                    this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'], 
                    this.position.x-40, this.position.y-27));    
                    this.attacked = true;
                    this.attackCD = this.attackSpeed;
                    
                };
            }
        
            if (this.loadSprite=='mushmom'){
                if (this.angry.getFrame() == 7){
                    this.attacked = true;
                    this.attackCD = this.attackSpeed;
                    // this.angry.reset();
                    if (!game.player.jump && game.player.lane == this.lane ){
                        game.player.health -= 1;
                        game.knockback(game.player, 1, 1);
                    } 
                } 
            }   
        }
    }

    draw(ctx, pause) {
        const animation = this.animations.find((animation)=>animation.isFor(this.state))
       // if (this.hitbox){ ctx.fillRect(this.hitbox[0],this.hitbox[1], this.hitbox[2], this.hitbox[3]);}
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height); 
        //ctx.fillRect(this.position.x-this.range, this.position.y, this.width+2*this.range, this.height); //range
        if (this.side == 0 && this.form==1 && this.state=='attack'){this.xOff2 = -51} //attack offset
        else this.xOff2=0;

        if (animation.shouldStop()){
            if (this.side == 0){this.state = 'stand'; } 
            else this.state='walk';}

        if (this.health<=0 && this.side ==1){
            this.state = 'die';  //death animation   
            if (animation.shouldStop()){
                if (this.fade>0) this.fade -= 0.03; //fade on death 
                ctx.globalAlpha = this.fade; 
                setTimeout(()=> {this.fade = 0}, "450") ;
                if (this.projectiles.length == 0){
                    setTimeout(()=> {this.alive = false}, "450") ;} 
                }
        }  
        if (this.side == 1 && this.state !='die'){ //health bar
            if (!this.typeInfo[this.type]['boss'])
                {ctx.fillStyle = "#2b2b2b";
                ctx.fillRect(this.position.x, this.position.y+70, 60, 12); //empty box
                ctx.fillStyle = "#990c02";
                ctx.fillRect(this.position.x+1, this.position.y+71, Math.floor(58*(1-(this.maxHealth - this.health)/this.maxHealth)), 10); // life bar
              }
            else { //boss health bar
                ctx.fillStyle = "#2b2b2b";
                ctx.fillRect(this.position.x-5, this.position.y+131, 65, 16); //empty box
                ctx.fillStyle = "#990c02";
                ctx.fillRect(this.position.x-4, this.position.y+132, Math.floor(63*(1-(this.maxHealth - this.health)/this.maxHealth)), 14); //empty box
 

            }
        } 
        else if (this.side == 0){ // summon name 
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.7; 
            ctx.beginPath();
            ctx.roundRect(this.position.x+15, this.position.y+this.height+17, 35, 15, 2);
            ctx.fill();
            ctx.globalAlpha = 1.0; 

            ctx.font = "11px arial"
            ctx.fillStyle = 'white'; 
            ctx.textAlign = 'center'; 
            ctx.fillText(this.label, this.position.x+32, this.position.y+this.height+27) ;          

        }

        let image = animation.getImage(pause);       
        //image = buffer; 

        if (!this.left){//flip based on sprite orientation
            ctx.scale(-1,1);
            ctx.drawImage(image, -this.position.x-this.width+this.xOff+this.xOff2, this.position.y+this.yOff );}
        else {ctx.drawImage(image, this.position.x+this.xOff+this.xOff2, this.position.y+this.yOff); }
    
        if (this.chillAmount>0){
            const buffer = document.createElement('canvas'); // Image tinting
            buffer.width = 200;//image.width;
            buffer.height = 400;//image.height;
            const btx = buffer.getContext('2d');
            btx.drawImage(image, 0,0);
            btx.fillStyle = "#2c68dc";
            btx.globalCompositeOperation = 'multiply';
            btx.fillRect(0,0,buffer.width, buffer.height);
            btx.globalAlpha = 0.8;
            btx.globalCompositeOperation = "destination-in";
            btx.drawImage(image,0,0); 

            if (!this.left){
                ctx.drawImage(buffer, -this.position.x-this.width+this.xOff, this.position.y+this.yOff)}
            else {ctx.drawImage(buffer, this.position.x+this.xOff, this.position.y+this.yOff)}
        }
        ctx.globalAlpha = 1;
        ctx.setTransform(1,0,0,1,0,0); 

        if (this.poisonAmount>0 && this.health>0){
            if (!this.poisonLoaded){
                this.poisonGraphic = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"]('poisonEffect/poison?.png', 4, 10, "poison");
                this.poisonLoaded = true; }
            else {
                    let poisonSpriteImage = this.poisonGraphic.getImage(pause); 
                    if (this.boss) {ctx.drawImage(poisonSpriteImage,this.position.x-10,this.position.y-this.height+75)}
                    else ctx.drawImage(poisonSpriteImage,this.position.x-10,this.position.y-this.height);
                }
            }

        }   
    
    drawProj(ctx, pause){
            this.projectiles.forEach( (object)=>object.draw(ctx, pause) ) //draw projectiles 
        }    
        
                
    update(game){
        if (this.side === 1){  // Mob 
            if (this.health>0){     
                let chillDirect = 1;  
                if (this.speedX<0)(chillDirect= -1);

                if (this.speedX-this.chillAmount*chillDirect>=0.4){
                    if (this.state !='attack') this.state = 'walk'; //cancels attack 
                }  
                else if (this.attackCD>0) this.state == 'hit'; 
                else this.state = 'walk';

                // if (this.position.x<-this.width*2) {this.position.x = -this.width*2}; //left border
                // if (this.position.x>this.gameWidth-this.width) {this.position.x = this.gameWidth-this.width;} //right border
                if (this.weird){
                    if (game.gameTimeReal-this.weirdStart> this.weirdTime){
                        this.weirdStart = game.gameTimeReal; 
                        this.weirdTime = Math.floor(Math.random()*2000)+500;
                        this.speedX  = -this.speedX;
                        if (this.speedX>0) {this.weirdTime+=700}; //bias moving forward
                    }
                    if (this.speedX<0 && this.position.x>this.gameWidth) this.speedX = abs(this.speedX); 
                }


            //     this.roam = true; 
            //     this.roamTime = 5000;
            //     this.roamY = this.lane*game.rowHeight; 
            //     this.roamLimits = [0, game.rowHeight, game.rowHeight*2]; //0,1,2
            //     this.destination = 0;
            //  }

                if (this.roam){
                    this.roamTime--;
                    if (this.roamTime == 0){
                        this.destination = Math.floor(Math.random()*3); //random 0,1,2
                        this.roamTime = Math.floor(Math.random()*250)+1000;
                    }

                    let speedY = 3;//
                    if (this.speedX-this.chillAmount*chillDirect<=1) {speedY=1}
                    else if (this.speedX-this.chillAmount*chillDirect<=2) {speedY=2};
                    if (this.roamY> this.roamLimits[this.destination]){
                        this.position.y+=speedY ;
                        this.roamY-=speedY ;
    
                    } else if (this.roamY<this.roamLimits[this.destination]){
                        this.position.y-=speedY ;
                        this.roamY+=speedY;
                    }

                    if (this.roamY+2> this.roamLimits[this.destination] && this.roamY-2<this.roamLimits[this.destination]){
                        this.position.y -= (this.roamY-this.roamLimits[this.destination]); 
                        this.roamY = this.roamLimits[this.destination];
                    }

                    if (this.roamY == this.roamLimits[this.destination]){
                        this.lane = this.roamLimits.indexOf(this.roamY)}; //update lane during move
            }

                if (this.poisonTime>0){ ///POISON
                    if (game.gameTimeReal-this.poisonTick>=1000){
                    this.health -= this.poisonAmount;
                    game.poisonDamage += this.poisonAmount;
                    this.poisonTime -= 1;  
                    this.poisonTick = game.gameTimeReal; //update tick time 
                    }
                }else if (this.poisonTime == 0){this.poisonAmount = 0;  
                    this.poisonStack = 0; }//drop poison stacks


                if (this.chillAmount>0){this.chillAmount-=0.005} //CHILL 
                else if (this.chillAmount<0){this.chillAmount=0};

                if (game.gameTimeReal-this.knockbackTime >1000){this.knockbackForce=0} //max 2s

                if (Math.abs(this.knockbackForce)>0) {
                    this.state = 'hit'
                    this.knockbackResist+=0.01;
                    this.position.x += this.knockbackForce;
                    if (this.knockbackForce>0){
                        this.knockbackForce-=this.knockbackResist;
                        if (this.position.x>this.gameWidth+50){this.position.x=this.gameWidth+50}
                        if (this.knockbackForce<0) this.knockbackForce = 0
                        } //backwards
                    else if (this.knockbackForce<0){
                        this.knockbackForce+=this.knockbackResist;
                        if (this.knockbackForce>0) this.knockbackForce = 0
                    }; //forwards 

                     
                } 
                else {
                    if (this.state !='attack'){this.position.x -= (this.speedX-this.chillAmount*chillDirect)}
                }
 
                
                this.position.y -= this.speedY; 
                if (this.speedY>0){
                    this.speedY-=0.5; 
                }        
                
                if (this.jump){ //gravity
                    this.position.y += 1*this.gravityTime;
                    this.gravityTime+=0.5; 
                }
                // if (this.position.y > this.gameHeight-110 ){ //bottom border (update for platforms)
                //     this.position.y = this.gameHeight-110;
                //     this.speedY = 0;
                //     this.jump = false;
                //     this.gravityTime = 1; 
                //     this.state = 'stand';
                // } 
            }
        } 
        else if (this.state=='stand'){   //emotes for summons
            if (this.emoteTime == 0 ){
                let random = Math.floor(Math.random()*10); //1: sleep, 2: ignore
                let time = 0; 
                if (random <5){this.state = 'emote1'; time = this.emoteLength[0];}
                else {this.state = 'emote6';time = this.emoteLength[5] };
                
                this.emoteTimeOut = setTimeout(()=> {
                    this.emoteTime = 600+Math.floor(Math.random()*500);
                    this.state = 'stand'}, time) ;//how long to run animation
                // if (game.pause){clearTimeout(this.emoteTimeOut)}; 
            }
            else this.emoteTime--; 
            
        }


        this.projectiles.forEach( (object)=>object.update() ); 
        this.projectiles = this.projectiles.filter(  //deletes projectiles
            function (object){return object.delete !== true; 
        });
       // console.log(this.projectiles); 
     

        if (this.attackCD >0){this.attackCD--}
        if (this.attackCD==0) {
            if (this.attacked){
                this.attacked = false;
                this.angry.reset(); 
            } 
            
        }

        this.hitbox = [this.position.x+this.width2/2, this.position.y+this.height2, 
                this.width-this.width2, this.height]; 
        




    }

}

/***/ }),

/***/ "./src/money.js":
/*!**********************!*\
  !*** ./src/money.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Money)
/* harmony export */ });
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");
 

class Money{
    constructor(game, obj, value, speedX = 0){
        this.yOff = 0 ;
        if (obj.boss){ this.yOff +=70}
        this.position = {  //position 
            x: (obj.position.x)+obj.width/2, 
            y: obj.position.y+40+this.yOff}
        if (this.position.x>game.gameWidth-10){this.position.x = game.gameWidth-30;} //killing off-screen (right)
        else if (this.position.x<10){this.position.x=30};
        this.width = 35;
        this.height = 35; 
        this.value = value; 
        this.spawnTime =  game.gameTimeReal; 
        this.popUp = 25; 
        this.dropDown = 23;
        this.speedX = speedX; 
        this.speedY = 1; 
        this.accelUp = 0;
        this.accelDown = 0;
        this.delete = false;
        this.fade = 1; 
        this.startFade = false; 
        this.float = false; 
        this.lost = false; 
        
        this.frame = 0 
        this.timerCount = 0; 

        this.hitbox = [this.position.x, this.position.y-25, this.width, this.height]; 
        if (this.value>=100){this.type = 4;} 
        else if (this.value>=50){this.type = 3;} 
        else if (this.value>=10){this.type = 2;} 
        else this.type = 1; 
        //this.createAnimations(); 
    }
    
    // createAnimations(){
    //     this.stand = new SpriteAnimation('coin/Coin'+this.type+'_?.png', 3, 6, "stand");
    //     this.animations = [this.stand]
    // }

    draw(ctx, game) {
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.startFade) {
            if (this.float){this.fade -= 0.015;} //slower fade when pickup
            else this.fade -= 0.03;
            ctx.globalAlpha = this.fade; 
            setTimeout( ()=>{this.delete = true}, "500"); 

        } 
        //game.coinSprites[this.type] 

       // const animation = this.animations.find((animation)=>animation.isFor('stand')); 
       // const image = animation.getImage(pause); 
       game.coinSprites[this.type-1].moveFrame(this, game.pause); 
       const image = game.coinSprites[this.type-1].imagebyFrame(this.frame);
       
        ctx.drawImage(image, this.position.x, this.position.y);
        ctx.globalAlpha = 1;


        


    }

    update(game){
        if (this.popUp>0){
            this.accelUp+=0.1;
            this.position.y -= (4.5-this.accelUp); 
            this.position.x -=this.speedX; 
            this.popUp -= 1; 
        } else if (this.dropDown>0){
            this.accelDown+=0.1;
            this.position.y += (2+this.accelDown);
            this.dropDown -= 1; 
            this.position.x -=this.speedX; 
        }
        if (this.float){
            this.position.y-=1; 
            if (game.player.position.x+game.player.width<this.position.x){this.position.x-=0.8  }
            else if (game.player.position.x>this.position.x) this.position.x+=0.8;
        }

        if (game.gameTimeReal-this.spawnTime>=20000){ //20 s fade start
            this.startFade=true; 
            this.lost = true; 
            
        } 


        this.hitbox = [this.position.x, this.position.y, this.width, this.height]; 

    }

    
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectile */ "./src/projectile.js");
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");
 
 

class Player {
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = 40; //sprite size 
        this.height = 80; 
        this.position = {  //position 
            x: this.width/2, 
            y: this.gameHeight - 45 - 2*game.rowHeight,
        }
        this.playerX = this.position.x - this.width/2 +18; 
        this.elePositions = [ [this.playerX -60, this.position.y], [this.playerX -40, this.position.y-40],
            [this.playerX , this.position.y-55], [this.playerX +40, this.position.y-40], 
            [this.playerX +60, this.position.y] ];
        this.rowHeight = game.rowHeight;
        this.lane = 1; 
        this.floor =  this.gameHeight - 45 - (1+this.lane)*this.rowHeight
        this.speed = 3.5;
        this.knockbackForce = 0; 
        this.left = false;
        this.side =0;
        this.speedX = 0;
        this.speedY = 0; 
        this.jump = false;
        this.gravityTime = 1; 
        this.projectiles = [];
        this.name = 'Wiz';
        this.health = 50; 
        this.damage = 1; 
        this.damageDealt = 0; 
        this.invulnTime =  0; 
        this.invulnDark = false; 
        this.invulnDarkTime = 0;
        this.knockbackThresh = 1; 
        this.knockbackSum = 0
        this.armor = 0; 
        this.touchHit = false; 
        this.attackSpeed = 35; 
        this.attackCD = 0; 
        this.alive = true; 
        this.state = 'stand'; 
        this.curTile = 0;
        this.elementList= []; //add sprites here 
        // this.elementList = ['Blaze','Dawn','Night','Thunder','Wind'];
        this.elementSprites = {};
        this.elementLoadedSprite = {} ; 
        this.elementInfo = { 'Blaze': {'stand':7, 'move': 7, 'attack': 8, 'proj':'redBall' },
            'Dawn': {'stand': 7, 'move':7, 'attack': 8, 'proj':'yellowBall'},
            'Night': {'stand':7, 'move':7, 'attack': 8, 'proj':'purpleBall'},
            'Thunder': {'stand': 7, 'move':7, 'attack': 8, 'proj':'greenBall',}, 
            'Wind': {'stand': 7, 'move':7, 'attack': 8, 'proj':'blueBall',} }
        this.elementState = ['stand','stand','stand','stand','stand']; 
        this.recallList = ['redDragon0', 'redDragon1', 'blueDragon0', 'blueDragon1', 
        'greenDragon0','greenDragon1','blackDragon0', 'blackDragon1'] ;
        this.recallImages ={};
        this.createAnimations(); 
        this.elementals();

        this.summonCount = 0; 
        this.money = 50;  //50
        if (game.level == 2) {this.money = 1200} //starting money based on level;
        else if (game.level == 3) {this.money = 5000}
        this.summonCost = [50, 100, 150, 200, 640];
        this.upgradeCost = [200, 400, 800, 1600, 3200]; 
        this.elementCost = [150, 500, 1000, 1500, 3000]; 

        this.damageTaken = 0; 
        
        this.float = 20;
        this.floatDirect = 1; 
        this.graveSpawn = false;
        this.graveX = 0 ;
        this.graveY = -20; 
        this.graveState = 'move'
        //upgrades
        this.damageMulti = 1; 
        this.lootMulti = 1;
        this.knockbackMulti = 1;
        this.speedMulti = 1; 
        this.pierce = 1; 

        this.chill = 0;
        this.area = 0; 
        this.poison = 2; 
        this.explodeDamageDealt = 0 



    }
    elementals(){ 
        for (let i = 0; i<this.elementList.length; i++){ // Load elemental sprites 
            if (!this.elementSprites[this.elementList[i]]){
                let eleType = this.elementList[i]; 
                this.standEle = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"](eleType+"/stand_?.png", this.elementInfo[eleType]['stand'], 6, "stand");
                this.moveEle = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"](eleType+"/move_?.png", this.elementInfo[eleType]['move'], 6, "walk");
                this.attackEle = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"](eleType+"/attack1_?.png", this.elementInfo[eleType]['attack'], 6, "swing1", true);
                this.elementSprites[eleType] = [this.standEle, this.moveEle, this.attackEle]; 
                //{'stand': this.standEle, 'move': this.moveEle, 'attack': this.attackEle}
            }
        }
    }

    createAnimations(){
        this.frames = 15; 
        this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/alert_?.png", 3, this.frames, "stand"); //combat sprites; 
        this.walk = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/walk1_?.png", 3, 10, "walk"); //walking sprites; 
        this.jump = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/jump_?.png", 1, 10, "jump"); //jump sprites;
        this.relax = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/stand1_?.png", 3, 30, "relax"); // idle pose 
        this.cast = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/alert_?.png", 3, 10, "stand"); 
        this.swing1 = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/swingO1_?.png", 3, 12, "swing1", true); //attack sprites;
        this.swing2 = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/swingO2_?.png", 3, 12, "swing2", true); 
        this.swing3 = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/swingO3_?.png", 3, 12, "swing3", true); 
        this.dead = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/dead_?.png", 3, 200, "dead"); 
        this.attackAnim = ['swing1', 'swing2', 'swing3']; 
        this.animations = [this.stand, this.walk, this.jump, this.swing1, this.swing2, this.swing3, this.cast, this.dead, this.relax ]; 
        this.graveMove = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("grave/move_?.png", 0, 300, "move"); 
        this.graveLand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("grave/stand_?.png", 5, 12, "land", true ); 
        this.graveAnimations = [this.graveMove, this.graveLand];

        // this.recallImages = ['redDragon0', 'redDragon1', 'blueDragon0', 'blueDragon1', 
        // 'greenDragon0','greenDragon1','blackDragon0', 'blackDragon1'] ;
        for (let i =0;i<this.recallList.length;i++){
            let image  = new Image(); 
            image.src = 'images/recall/'+this.recallList[i]+'.png'; 
            this.recallImages[this.recallList[i]] = image; 
        }
        


    }
    emote(game){
        if (game.waveFinish){
            if (this.state =='stand'){this.state = 'relax';} 
    }} 

    attack(pause){
        if (this.attackCD <= 0 && this.alive && !pause ){
            let x = this.position.x-25; 
            if (this.left){x +=50;}
            this.proj = new _projectile__WEBPACK_IMPORTED_MODULE_0__["default"](this, 'lightningball',x, this.position.y);

            
            this.state = this.attackAnim.shift(); 
            this.attackAnim.push(this.state); 
            this.animations.find((animation)=>animation.isFor(this.state)).reset(); 
            this.attackCD = this.attackSpeed;
            this.projectiles.push(this.proj);
            //setTimeout(()=> {this.projectiles.push(this.proj)}, "200"); //slight delay for animation

            for (let i=0; i<this.elementList.length; i++){
                let x = this.elePositions[i][0];//facing left
                if (this.left){x +=20};
                
                this.proj = new _projectile__WEBPACK_IMPORTED_MODULE_0__["default"](this, this.elementInfo[this.elementList[i]]['proj'],
                        x, this.elePositions[i][1]+18 );
                this.projectiles.push(this.proj);
            }
        }
    }

    recallIcon(ctx, game){
        if (game.recallStorage){
            let imageType = game.recallStorage.type + game.recallStorage.form;
            ctx.drawImage(this.recallImages[imageType], this.position.x+22, this.position.y-5); 

          //  this.recallImages[game.recallStorage.type]
        }

    }
    summonAttack(){}; 
    draw(ctx, pause){
        let animation = this.animations.find((animation)=>animation.isFor(this.state))
        let image = animation.getImage(pause);   //get sprite

        // if (this.invulnTime%4>=1 && this.invulnTime>0 && this.alive) {ctx.globalAlpha = 0.2};
        //if (this.hitbox){ ctx.fillRect(this.hitbox[0],this.hitbox[1], this.hitbox[2], this.hitbox[3]);}
        //ctx.fillRect(this.curTile*80, this.position.y, 80, 80); //selected tile
        // ctx.fillRect(this.hitbox[0]-(75*(-1+this.lootMulti)), this.position.y, this.width, 80); //loot range
        // ctx.fillRect(this.hitbox[0], this.position.y, this.width+75*(-1+this.lootMulti), 80); //loot range

        if (this.left){
            ctx.scale(-1,1);
            ctx.drawImage(image, -this.position.x-1.5*this.width-15, this.position.y);
        }
        else {ctx.drawImage(image, this.position.x-5, this.position.y); }
        
        ctx.setTransform(1,0,0,1,0,0);

        if (this.invulnDark && this.alive){
            const buffer = document.createElement('canvas'); // Image tinting
            buffer.width = 200;//image.width;
            buffer.height = 200;//image.height;
            const btx = buffer.getContext('2d');
            btx.drawImage(image, 0,0);
            btx.fillStyle = "#000000";
            btx.globalCompositeOperation = 'multiply';
            btx.fillRect(0,0,buffer.width, buffer.height);
            btx.globalAlpha = 0.6;
            btx.globalCompositeOperation = "destination-in";
            btx.drawImage(image,0,0); 

            if (this.left){
                ctx.scale(-1,1);
                ctx.drawImage(buffer, -this.position.x-1.5*this.width-10, this.position.y);
                ctx.setTransform(1,0,0,1,0,0);
            }
            else {ctx.drawImage(buffer, this.position.x-5, this.position.y); }
        }
        ctx.globalAlpha = 1;

        
        if (animation.shouldStop()){ //resets 
            this.state = 'stand';} 

        //elementals 
        this.playerX = this.position.x - this.width/2 +18; 
        this.elePositions = [ [this.playerX -60, this.position.y+5], [this.playerX -40, this.position.y-35],
            [this.playerX , this.position.y-55], [this.playerX +40, this.position.y-35], [this.playerX +60, this.position.y+5] ];
        
            for (let i = 0; i<this.elementList.length; i++){ // Load elemental sprites 
                let eleType = this.elementList[i]; 
                if (!this.elementLoadedSprite[eleType]){
                    // if (this.elementState[i] = 'stand') {
                        // this.elementState[i] = 'stand';
                        if (this.state == 'swing2' ||this.state == 'swing3'){this.elementState[i]='swing1'}
                       

                    const animation = this.elementSprites[eleType].find((animation)=>animation.isFor(this.elementState[i])) // copies player state
                    this.elementLoadedSprite[eleType] = animation.getImage(pause);                  
                    
                    if (animation.shouldStop()){ //resets Attack animation
                        this.elementState[i]= 'stand';
                        this.elementSprites[eleType][2].reset() //reset 
                    } 
                }

                   
                if (!this.left){
                    ctx.scale(-1,1);
                    ctx.drawImage(this.elementLoadedSprite[eleType], -this.elePositions[i][0]-this.width-45, this.elePositions[i][1]); 
                    ctx.setTransform(1,0,0,1,0,0);}
                else (ctx.drawImage(this.elementLoadedSprite[eleType], this.elePositions[i][0]-20, this.elePositions[i][1])); 
        }
        this.elementLoadedSprite = {} //clear loaded sprites

        if (this.graveSpawn) { 
            if (this.graveY >= this.floor+35){this.graveState ='land'}
            else {this.graveY += 8}; 

            let graveAnimation = this.graveAnimations.find((animation)=>animation.isFor(this.graveState))
            let graveImage = graveAnimation.getImage(pause);
            ctx.drawImage(graveImage, this.graveX, this.graveY);
            
        }
    }

    drawProj(ctx, pause){
        this.projectiles.forEach( (object)=>object.draw(ctx, pause) ) //draw projectiles 
    }

    teleport(direction){
        if (this.lane - 1*direction>-1 && this.lane - 1*direction<3 && this.alive){
            this.position.y += this.rowHeight*direction;2
            this.lane += -1*direction; 
            this.floor =  this.gameHeight - 45 - (1+this.lane)*this.rowHeight}
    }
    update(){
        if (this.invulnTime>0){
            this.invulnTime--
            if (this.invulnTime>0){
                this.invulnDarkTime ++

                if (this.invulnDarkTime>5) {this.invulnDark = false; this.invulnDarkTime = -3}
                else if (this.invulnDarkTime>0){this.invulnDark =true};
            } else {this.invulnDark = false};
        
        }; 
        if (this.attackCD >0){this.attackCD-= (1*this.speedMulti)};
        if (this.health<=0){this.state = 'dead'; 
                this.alive= false;
                this.graveSpawn = true
                this.graveX = this.position.x+20; 
            };

        this.projectiles.forEach( (object)=>object.update() ); 
        this.projectiles = this.projectiles.filter(  //deletes projectiles
            function (object){return object.delete !== true; 
        });
        
        if (this.alive){
            if (this.speedX!=0 && !this.attackAnim.includes(this.state)){
                this.state = 'walk'; 
            } else if (this.state == 'walk') this.state = 'stand'; 

            if (this.position.x<-30) {this.position.x = -30}; //left border
            if (this.position.x>this.gameWidth-this.width) {this.position.x = this.gameWidth-this.width;} //right border
            this.curTile = Math.floor( (this.width/2 +this.position.x)/80);
            if (Math.abs(this.knockbackForce)>0) {setTimeout(()=>{this.knockbackForce=0}, 1000)};  //DR 
            if (this.knockbackForce>0){this.knockbackForce-=0.5;}
            else if (this.knockbackForce<0){this.knockbackForce+=0.5;}
            this.position.x += (this.speedX*this.speedMulti);
            this.position.x += this.knockbackForce;
            this.position.y -= this.speedY; 

        } else {      
                if (this.float>0){
                    this.position.y -=0.1*this.floatDirect;
                    this.float --;
                } else {this.float = 20; 
                        this.floatDirect = -this.floatDirect}
                
            };


        if (this.position.y > this.floor){ //bottom border (update for platforms)
            this.position.y = this.floor;
            this.speedY = 0;
            this.jump = false;
            this.gravityTime = 1; 
            if (this.alive && !this.attackAnim.includes(this.state)) this.state = 'stand';
        } 
        if (this.speedY>0){
            this.speedY-=0.5; 
        }
        if (this.jump){ //gravity
            this.position.y += 1*this.gravityTime;
            this.gravityTime+=0.5; 
            if (!this.attackAnim.includes(this.state)) this.state = 'jump';
        }
        this.hitbox = [this.position.x+15, this.position.y, this.width, this.height]; 


        //this.position.x+= 5 / deltaTime; 
    }
}

/***/ }),

/***/ "./src/projectile.js":
/*!***************************!*\
  !*** ./src/projectile.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Projectile)
/* harmony export */ });
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");
 

class Projectile{
    constructor(player, type='energyball',x = 0, y=0, direction = 1 ){
        this.typeInfo = { 'energyball': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 90},
                        'yellowBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'purpleBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'redBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'greenBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'blueBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 50,'yOff':35},
                        'fireball': {'speed': 3, 'travel':1, 'explode':2, 'xOff': 70, 'yOff':-10 }, 
                        'batball': {'speed': 6, 'travel':3, 'explode':4, 'xOff': 105},
                        'fireball2': {'speed': 12, 'travel':1, 'explode':3, 'xOff': 95, 'yOff':-10 },  //-15, +20
                        'poisonball': {'speed': 7, 'travel':1, 'explode':5, 'xOff':85,  'yOff':-5 },
                        'iceball': {'speed': 8, 'travel':2, 'explode':4, 'xOff':95,  'yOff':-5 },
                        'lightningball': {'speed': 10, 'travel':2, 'explode':7, 'xOff':80}, //player ball
                        'thunderball': {'speed': 12, 'travel':2, 'explode':7, 'xOff':80,'yOff':-10 } }
        
        this.gameWidth = player.gameWidth;
        this.gameHeight = player.gameHeight;
        this.width = 20; //sprite size 
        this.height = 20; 
        this.explode = false; 
        this.delete = false; 
        this.projectile = true;
        this.touchHit= true;
        this.pierce = player.pierce;
        this.owner = player;
        this.damage = player.damage * player.damageMulti; 
        this.health =1; 
        this.side = 0; 
        this.type = type; 
        this.hitList = []; 
        this.lane = player.lane;
        this.state = 'travel'; 
        this.direction = direction; 
        

        this.chill = player.chill;
        this.area = player.area; 
        this.poison = player.poison; 
        this.poisonMax = player.poisonMax;

        this.xOff = this.typeInfo[this.type]['xOff'];
        if (this.typeInfo[this.type]['yOff']){this.yOff = this.typeInfo[this.type]['yOff']}
        else this.yOff =0;

        this.createAnimations()
        
        this.left = player.left; // shoot left
        if (x == 0 && y == 0){
            this.position = {  //position 
                x: player.position.x, 
                y: player.position.y+45
            }}
        else { this.position = {
                x: x+35,
                y: y+65}
        }

        this.speed = this.typeInfo[this.type]['speed'];
        this.hitbox = [this.position.x, this.position.y, this.width, this.height]; 


    }

    createAnimations(){
        this.frames = 6; 
        this.travel = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/travel_?.png', this.typeInfo[this.type]['travel'], this.frames, "travel"); //standing sprites; 
        this.burst = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/explode_?.png', this.typeInfo[this.type]['explode'], this.frames, "burst", true); //walking sprites; 
        this.animations = [this.travel, this.burst]; 

        if (this.type == 'thunderball'){
            this.bolt = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"]('thunderbolt/explode_?.png', 5, this.frames, "explode", true); //   
        }
    }

    draw(ctx, pause) {
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // hitbox
        if (this.type != "None"){ 
            const animation = this.animations.find((animation)=>animation.isFor(this.state))
            const image = animation.getImage(pause);       
            if (this.explode){
                this.state = 'burst'
                if(this.type =='thunderball'){
                    let boltImage = this.bolt.getImage(pause); 
                    ctx.drawImage(boltImage, this.position.x, 240)
                    }

                }; 
            if (animation.shouldStop()){this.delete = true;}
    
            if (this.type=='iceball' & this.state=='burst'){this.xOff=100};
            if (!this.left){//flip based on sprite orientation
                ctx.scale(-1,1);
                ctx.drawImage(image, -this.position.x- this.xOff+15, this.position.y-60+this.yOff);}
            else {ctx.drawImage(image, this.position.x-this.xOff+35, this.position.y-60+this.yOff); }

            ctx.setTransform(1,0,0,1,0,0); 
            }
        else {
            ctx.drawImage(this.sprite, this.position.x, this.position.y+25); //draw mob (x, y, height, width)
            if (this.explode){this.delete = true}; 
        }

    } 


    update(){
        if (!this.explode){
            if (this.left){this.position.x -= this.speed;} // direction
            else this.position.x += this.speed;
        }

        
        if (this.position.x<-this.width-100) {this.delete = true };
        if (this.position.x>this.gameWidth-this.width) {this.delete = true};

        this.hitbox = [this.position.x, this.position.y+5, this.width, this.height]; 




    }

}

/***/ }),

/***/ "./src/restartScreen.js":
/*!******************************!*\
  !*** ./src/restartScreen.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ restartScreen)
/* harmony export */ });
class restartScreen{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  600;
        this.height = 170; // game.gameHeight - 3*90; 
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.padding = 25; 
        this.font = "16px arial";
        this.font2 = "24px arial";
        this.display = false ; 
        this.button1 = document.createElement('button');
        this.button1.textContent = 'Return to Main';
        this.buttonX1 = this.gameWidth/2;
        this.buttonWidth = 250;
        this.buttonHeight = 50; 
        
        this.buttonPositions = [ [this.x+(this.width-this.buttonWidth)/2, this.height-this.buttonHeight-this.padding]] 
        this.buttonsList = [this.button1]
        }

        initialize(game){
            const canvas = document.getElementById('gameScreen');
            
            var elem = this;
            canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);            
        }

        redraw(ctx){
            for (let i = 0; i<this.buttonsList.length; i++){
             this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
            }
        }

        restartFunctions(game){
            this.display = false; 
            game.fadeOut = true;
            setTimeout(()=> {game.titleDisplay = true}, "2000") // fade out transition
           
        }


        handleClick(e, game){
            const canvas = document.getElementById('gameScreen');
            let ctx = canvas.getContext('2d'); 
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            
            for (let i = 0; i<this.buttonsList.length; i++){
               // this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                    this.restartFunctions(game, i); 
                }
            }      
        }


        drawButton(e1, x, y, ctx){   
            ctx.fillStyle = 'steelblue'; //draw border
            ctx.beginPath(); //sets area for collision (isPointInPath)
            ctx.roundRect(x,y,this.buttonWidth, this.buttonHeight, 2);
            ctx.stroke();
            ctx.fill();

            ctx.font = this.font2; //draw text 
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(e1.textContent, x+this.buttonWidth/2, y+this.buttonHeight/2); 



        }

     
        displayMenu(ctx, game){ //upgrade window background
            if (this.display){
                // ctx.fillStyle = "white";
                // ctx.strokeStyle = "black";
                // ctx.lineWidth = "5"; 
                // ctx.beginPath();
                // ctx.roundRect(this.x, this.y, this.width, this.height, 2);
                // ctx.stroke();
                // ctx.fill();

                this.redraw(ctx);

                ctx.font = this.font2; //defeat 
                ctx.fillStyle = 'red';
                ctx.textAlign = 'center'; 
                ctx.fillText('Game Over!', this.gameWidth/2, this.y + 25) //victory or defeat
            }


    
                
        }
    


    
        
}

/***/ }),

/***/ "./src/startScreen.js":
/*!****************************!*\
  !*** ./src/startScreen.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startScreen)
/* harmony export */ });
class startScreen{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  600;
        this.height = 120; // game.gameHeight - 3*90; 
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.padding = 15; 
        this.font = "16px arial";
        this.font2 = "24px arial";
        this.font3 = "20px arial";
        this.display = true; 
        this.controls = ["Stop the monsters from advancing!"," - Use (WASD) to move, (J) to jump, and (K) to shoot. Use (P) to open shop. ", 
            " - Collect the coins monsters drop before they expire", 
            " - Spend mesos on upgrades & summons to bolster your defense", 
            " - Lose lives when monsters escape or touch you", " - Game over when all lives lost!"];
        this.keyboard = new Image(); 
        this.keyboard.src = 'images/bg/keyboard.png';
        this.button1 = document.createElement('button');
        this.button1.textContent = 'Start!';
        this.buttonX1 = this.gameWidth/2;
        this.buttonWidth = 65;
        this.buttonHeight = 35; 
        
        this.buttonPositions = [ [this.x+this.width- this.buttonWidth-this.padding, this.height-this.buttonHeight-this.padding]] 
        this.buttonsList = [this.button1]
        }

        initialize(game){
            const canvas = document.getElementById('gameScreen');
            
            var elem = this;
            //canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);            
        }

        redraw(ctx){
            for (let i = 0; i<this.buttonsList.length; i++){
             this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
            }
        }

        startFunctions(game){
            game.nextWave = true; 
            this.display = false; 
        }


        handleClick(e, game){
            const canvas = document.getElementById('gameScreen');
            let ctx = canvas.getContext('2d'); 
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            
            for (let i = 0; i<this.buttonsList.length; i++){
                this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                    this.startFunctions(game, i); 
                }
            }      
        }

        drawButton(e1, x, y, ctx){   
            ctx.fillStyle = 'steelblue'; //draw border
            ctx.fillRect(x,y,this.buttonWidth,this.buttonHeight); 

            ctx.font = this.font2; //draw text 
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(e1.textContent, x+this.buttonWidth/2, y+this.buttonHeight/2); 
            ctx.beginPath(); //sets area for collision (isPointInPath)
            ctx.rect(x,y,this.buttonWidth, this.buttonHeight);       
        }

     
        displayMenu(ctx, game){ //upgrade window background
            if (this.display || game.waveFinish || game.levelFinish){
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "5"; 
                ctx.beginPath();
                ctx.roundRect(this.x+0.3*this.width, this.height+20, 0.5*this.width, 25, 2);
                ctx.stroke();
                ctx.fill();

                ctx.font = this.font; 
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center'; 
                ctx.fillText('Press [A] for shop, [D] to start', this.gameWidth/2, this.height+35) 
            }

            if (game.levelNote!=''){
                if (game.gameTimeReal - game.noteTime<4500){
                    ctx.fillStyle = "white";
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = "5"; 
                    ctx.beginPath();
                    ctx.roundRect(this.x+15, this.height*0.5, this.width-30, 50, 2);
                    ctx.stroke();
                    ctx.fill();

                    ctx.font = this.font3; 
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center'; 
                    ctx.fillText(game.levelNote, this.gameWidth/2, this.height/2+30);
                }
            }

            if (this.display || (game.pause && !game.upgrade.diplay)){
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "5"; 
                ctx.beginPath();
                ctx.roundRect(this.x, this.y, this.width, this.height, 2);
                ctx.stroke();
                ctx.fill();
                ctx.fillStyle = 'black';
                ctx.textAlign = 'start'; 
                ctx.font = this.font;
                ctx.drawImage(this.keyboard, 180,0);
                // for (let i=0; i<this.controls.length; i++){
                    
                //     ctx.fillText(this.controls[i], this.x+this.padding, this.y+this.padding*(1+i), this.width); 
                // }
                // this.redraw(ctx); //draw start button
                //
            }   
            // if (game.storage.length>0){
            //     ctx.fillStyle = "white";
            //     ctx.strokeStyle = "black";
            //     ctx.beginPath();
            //     ctx.roundRect(this.x, this.y, this.width, this.height, 2);
            //     ctx.stroke();
            //     ctx.fill();
            //     ctx.fillStyle = 'black';
            //     ctx.textAlign = 'start'; 
            //     ctx.font = this.font2;
            //     ctx.fillText('Resummon Dragons from shop!', this.x+this.padding, this.y+this.padding) 
            // }
            // else {document.getElementById('start').innerHTML="";}
            
    
    
                
        }
    


    
        
}

/***/ }),

/***/ "./src/titleScreen.js":
/*!****************************!*\
  !*** ./src/titleScreen.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ titleScreen)
/* harmony export */ });
/* harmony import */ var _img__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img */ "./src/img.js");

class titleScreen{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  600;
        this.height = 170; // game.gameHeight - 3*90; 
        this.bgArt = (0,_img__WEBPACK_IMPORTED_MODULE_0__["default"])('bg/bgTitle.png');
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.padding = 25; 
        this.fontTitle = "48px arial";
        this.font = "18px arial";
        this.font2 = "28px arial";
        this.font3 = "24px arial";
        this.display = true; 
        this.titleLogo = "MapleTD"; 
        this.button1 = document.createElement('button');
        this.button1.textContent = 'Play';
        this.button2 = document.createElement('button');
        this.button2.textContent = 'Level Select';
        this.button3 = document.createElement('button');
        this.button3.textContent = '<';   

        this.button4 = document.createElement('button');
        this.button4.textContent = '>';  

        this.selectionY = 1;

        this.aboutText = ["Unofficial fan game developed by Christopher Lee (sirhclee@gmail.com)",
                 "All MapleStory assets used are copyrighted materials & intellectual property belonging to NEXON"];
        this.buttonWidth = 175;
        this.buttonHeight = 35; 
        this.buttonX1 = this.gameWidth/2-(this.buttonWidth/2);
        
        this.buttonPositions = [ [this.buttonX1, this.padding+this.buttonHeight + 2*this.gameHeight/3-45], 
            [this.buttonX1, this.padding+this.buttonHeight + 2*this.gameHeight/3-25]] 
        this.buttonsList = [this.button2]

        this.levelButtons = [ this.button3, this.button4]; 
        this.levelButtonWidth = 50; 
        this.levelButtonHeight = 30; 
        this.levelButtonCenter = 70;  // middle number 
        this.levelButtonPositions = [ [this.gameWidth/2-this.levelButtonCenter/2-this.levelButtonWidth, this.buttonPositions[1][1]+40], 
        [this.gameWidth/2+this.levelButtonCenter/2, this.buttonPositions[1][1]+40]]; 

        this.fade = 1;
        this.fadeDirect =-1;
        }

        initialize(game){
            const canvas = document.getElementById('gameScreen');
            
            var elem = this;
            //canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);            
            //canvas.addEventListener('mouseover', function(e){elem.handleHover(e) }, false);
        }

        redraw(ctx){
            for (let i = 0; i<this.buttonsList.length; i++){
             this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
            } //        this.levelButtons = [ this.button3, this.button4]; 
            //this.levelButtonPositions = [ [10, this.buttonPositions[1][1]+10], [10, this.buttonPositions[1][1]+20]]; 

            for (let i = 0; i<this.levelButtons.length; i++){
                this.drawButton(this.levelButtons[i], this.levelButtonPositions[i][0], this.levelButtonPositions[i][1], ctx)
               }          


        }


        handleClick(e, game){
            const canvas = document.getElementById('gameScreen');
            let ctx = canvas.getContext('2d'); 
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            
            for (let i = 0; i<this.buttonsList.length; i++){
                this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                    if (this.buttonsList[i].textContent == "Play"){
                        game.fadeOut = true;
                        setTimeout(() =>{game.titleDisplay = false;
                            game.resetEverything(); 
                        }, 1000)}
                }
            }    

            for (let i = 0; i<this.levelButtons.length; i++){
                this.drawButton(this.levelButtons[i], this.levelButtonPositions[i][0], this.levelButtonPositions[i][1], ctx)
                if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                     if (this.levelButtons[i].textContent == "<"){ // reload bg art and level load
                        if (game.level>1){game.level--}
                    }
                    else if (this.levelButtons[i].textContent == ">"){
                        if (game.level<game.finalLevel){game.level++}
                    }
                }
            }           
            

        }


        drawButton(e1, x, y, ctx){   
            let buttonWidth = this.buttonWidth;
            let buttonHeight = this.buttonHeight;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'steelblue';
            if (e1.textContent=='Play'){
                ctx.font = this.font2;}
            else if (e1.textContent=='Level Select'){
                ctx.font = this.font3;
                //buttonHeight -=11;
                y+=10
            }
            else {ctx.font = this.font3;
                buttonWidth = this.levelButtonWidth;
                buttonHeight = this.levelButtonHeight ;}
                //draw text 
        


            ctx.beginPath();
            ctx.roundRect(x,y, buttonWidth,buttonHeight, 3) ;
            ctx.stroke();
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.fillText(e1.textContent, x+buttonWidth/2, y+buttonHeight/2); 
    
        }

     
        displayMenu(ctx, game){ //upgrade window background
                ctx.drawImage(this.bgArt, 0,0); 
                

                ctx.beginPath();
                ctx.fillStyle= 'white';
                ctx.roundRect(this.levelButtonPositions[0][0]+ 10+ this.levelButtonWidth,this.levelButtonPositions[0][1],
                    this.levelButtonWidth, this.levelButtonHeight, 3) ;
                // ctx.stroke();
                ctx.fill();

               ctx.fillStyle= 'black';
               ctx.fillText(game.level,  this.levelButtonPositions[0][0]+this.levelButtonCenter+15,  this.levelButtonPositions[0][1]+18); 

                this.redraw(ctx); //draw start button

                ctx.save();
                ctx.shadowOffsetX=1;
                ctx.shadowOffsetY=1;
                ctx.shadowColor="black";
                ctx.shadowBlur= 4; 
                
                ctx.textAlign = 'center';
                ctx.font =  this.fontTitle; 
                ctx.fillStyle= 'white';
                ctx.fillText(this.titleLogo, this.gameWidth/2, this.gameHeight/3);

                const canvas = document.getElementById('gameScreen');

                ctx.font =  this.font; //about
                ctx.globalAlpha = this.fade; 
                ctx.fillText('Use arrow keys to select level', this.gameWidth/2,this.gameHeight/2+55); 
                ctx.fillText('Press any other key to start', this.gameWidth/2,this.gameHeight/2+75); 
                this.fade-=0.015*this.fadeDirect ;
                if (this.fade<0.5 || this.fade>1){this.fadeDirect = -this.fadeDirect }
                ctx.globalAlpha = 1;

                for (let i=0; i<this.aboutText.length; i++){ 
                    ctx.fillText(this.aboutText[i], this.gameWidth/2,this.gameHeight-35+15*i); 
                    //ctx.strokeText(this.aboutText[i],this.gameWidth/2,this.gameHeight-35+15*i)
                }
                ctx.restore();

    
                //ctx.strokeStyle ="black"; 
                // ctx.lineWidth=5;
                // ctx.beginPath();
                // ctx.roundRect(this.buttonPositions[0][0], this.buttonPositions[0][1], this.buttonWidth, this.buttonHeight, 3) ;
                // ctx.stroke();

                //
            // else {document.getElementById('start').innerHTML="";}
            
    
    
                
        }
    


    
        
}

/***/ }),

/***/ "./src/upgrade.js":
/*!************************!*\
  !*** ./src/upgrade.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Upgrade)
/* harmony export */ });

class Upgrade{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width =  650;
        this.height = 230; // game.gameHeight - 3*90;
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.display = false; 
        this.padding = 15; 
        this.paddingY = 4;
        this.buttonWidth = 170;
        this.buttonHeight = 36;
        this.font = "13px arial";              
        this.font2 = "14px arial";  

        this.button1 = document.createElement('button');
        this.button1.textContent = 'Summon Red Dragon';
        this.button1.value = 'redDragon';
        this.button2 = document.createElement('button');
        this.button2.textContent = 'Summon Blue Dragon';
        this.button2.value = 'blueDragon';
        this.button3 = document.createElement('button');
        this.button3.textContent = 'Summon Green Dragon';
        this.button3.value = 'greenDragon';
        this.button4 = document.createElement('button');
        this.button4.textContent = 'Summon Black Dragon';
        this.button4.value = 'blackDragon';
        this.button10 = document.createElement('button');
        this.button10.textContent = 'WIP';
        this.button10.value = 'mushroomKnight';
        this.buttonX1 = this.x + this.padding; 
        this.nameHash = {'redDragon':'Red Dragon', 'blueDragon':'Blue Dragon',
        'greenDragon':'Green Dragon', 'blackDragon':'Black Dragon', 'mushroomKnight': 'Mushroom Knight'};
        this.summonList = ['redDragon', 'blueDragon','greenDragon','blackDragon'];
        this.elementList = ['Blaze','Dawn','Night','Wind','Thunder'];

        this.button5 = document.createElement('button');
        this.button5.textContent = 'Blaze Sprite'; //Blaze - Flame 
        this.button5.value = "Blaze";
        this.button6 = document.createElement('button');
        this.button6.textContent = 'Dawn Sprite '; //Dawn - Light 
        this.button6.value = "Dawn";
        this.button7 = document.createElement('button'); 
        this.button7.textContent = 'Night Sprite'; //Night - Dark
        this.button7.value = "Night";
        this.button8 = document.createElement('button');
        this.button8.textContent = 'Wind Sprite ';  //Wind - Storm
        this.button8.value = "Wind";
        this.button9 = document.createElement('button'); 
        this.button9.textContent = 'Thunder Sprite'; //Thunder - Lightning       
        this.button9.value = "Thunder"; 
        this.buttonX2 =  this.buttonX1 + this.buttonWidth+ this.padding ; 
        this.buttonPositions = [ [this.buttonX1, 0], [this.buttonX1,1], [this.buttonX1,2], [this.buttonX1,3],  [this.buttonX1,4], 
                 [this.buttonX2,0], [this.buttonX2,1], [this.buttonX2,2], [this.buttonX2,3], [this.buttonX2,4]  ]; 
        this.buttonsList = [this.button1, this.button2, this.button3, this.button4, this.button10,
                    this.button5, this.button6, this.button7, this.button8, this.button9]; 
       this.note = "Press [S] to buy, [A] to close menu"; 
       

        this.costPosition = this.buttonX2 + this.buttonWidth+ 2.5*this.padding; 
        this.costHeight = 20; 
        this.costWidth = 275; 
        this.costPadding = 4; 

        this.selectionX = 1;
        this.selectionY = 1;
        this.descriptionText = [];
        this.purchaseDescription = __webpack_require__(/*! ./purchase.json */ "./src/purchase.json"); 

        
    }

    initialize(game){
        const canvas = document.getElementById('gameScreen');
        let ctx = canvas.getContext('2d'); 
        document.addEventListener('focus', this.redraw(ctx), true); 
        var elem = this;
        canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);
    }

    redraw(ctx, game ){
        let buttonDraw = this.buttonsList.length; 
       for (let i = 0; i<buttonDraw ; i++){
        this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], 2*this.paddingY+(this.buttonHeight+this.paddingY)*this.buttonPositions[i][1], ctx, game)
       }
    }

    upgradeFunctions(game, button){
        //resummon;
        if (game.storage.find(obj=> (obj.type === button.value))){
            game.resummon(button.value);
            let unit = game.playerObjects.find(obj=> (obj.type === button.value));
            button.textContent =  'Upgrade '+this.nameHash[button.value]+ ' (Lvl '+unit.level+')';
        }
        else if (game.playerObjects.find(obj=> (obj.type === button.value))){ //upgrade summons 
            let unit = game.playerObjects.find(obj=> (obj.type === button.value));
            unit.levelUp(game.player); //add cost 

            if (unit.level<5){
            button.textContent =  'Upgrade '+this.nameHash[button.value]+ ' (Lvl '+unit.level+')';}
            else {button.textContent =  this.nameHash[button.value]+ ' (Lvl '+unit.level+')' }
        } 

        else if (this.summonList.includes(button.value)){
            if (button.value !='mushroomKnight'){
                game.createMob(game.player, button.value, 0, game); //summons ;
                if (game.playerObjects.find(obj=> (obj.type === button.value))){ //checks if created successfully 
                    button.textContent = 'Upgrade '+this.nameHash[button.value]+ ' (Lvl 1)';
                }}
            }
        else if (this.elementList.includes(button.value)){
                game.addElement(button.value); //elements
            }   
        // else if (button.textContent=='Next Wave!') game.nextWave = true; //next wave button

    }

    handleClick(e, game){
        const canvas = document.getElementById('gameScreen');
        let ctx = canvas.getContext('2d'); 
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;
    
        let buttonDraw = this.buttonsList.length; 
        if (!game.waveFinish){buttonDraw-=1}; 
        for (let i = 0; i<buttonDraw ; i++){
            // this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.paddingY+(this.buttonHeight+this.paddingY)*this.buttonPositions[i][1], ctx, game)
            
            if (this.display && ctx.isPointInPath(x,y)) { //button click (only when displayed)
                this.buttonsList[i].focus(); 
                this.upgradeFunctions(game, this.buttonsList[i]); 
            }
        }
    
    }


    drawButton(e1, x, y, ctx, game){   
        let buttonColor ='steelblue';
        let textColor ='white';
        let cost = 0; 
        if (game){
            if (this.buttonX1==x) { //summon buttons //check cost (if first or upgrade)
                if (game.playerObjects.find(obj=> (obj.type === e1.value))){
                    let unit = game.playerObjects.find(obj=> (obj.type === e1.value));
                    cost = game.player.upgradeCost[unit.level];
                }
                else ( cost = game.player.summonCost[game.player.summonCount]);
               
                if (game.player.money< cost){
                    buttonColor = 'lightgrey';
                    textColor = 'darkgrey'; 
                }
            }
            else if (this.buttonX2==x){ //elements
                cost = game.player.elementCost[game.player.elementList.length];
                if (game.player.money<game.player.elementCost[game.player.elementList.length] || 
                    game.player.elementList.length >=5){
                    buttonColor = 'lightgrey';
                    textColor = 'darkgrey'; 
                    }
                }    
            else {buttonColor = 'lightgrey'; //WIP
                textColor = 'darkgrey';}
            }
            
        ctx.fillStyle = buttonColor;  //button background
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.roundRect(x,y,this.buttonWidth, this.buttonHeight, 3); 
        ctx.stroke();
        ctx.fill();
       
        ctx.font =  this.font; 
        ctx.textAlign = 'center'; //button text 
        ctx.fillStyle = textColor;
        if (game){
             if (game.storage.length>0){

                let test = game.storage.find(obj=> obj.type==e1.value); 
                if (test){ 
                    e1.textContent = 'Resummon Lvl '+test.level+' '+this.nameHash[e1.value]; 
                    cost = 0; 
                }
            }
            }

        ctx.fillText(e1.textContent, x+this.buttonWidth/2, y+this.buttonHeight/3); 
        if (cost && e1.value!='mushroomKnight'){
            ctx.fillText('('+cost+' mesos)', x+this.buttonWidth/2, y+2*this.buttonHeight/3);}
        //else { ctx.fillText('MAX', x+this.buttonWidth/2, y+2*this.buttonHeight/3);}

        ctx.beginPath(); //collision path 
        ctx.rect(x,y, this.buttonWidth, this.buttonHeight); 
        
    }

    toggleMenu(game){ 
        this.display = !this.display; 
        if (this.display){game.pause = true}
        else game.pause = false
    }

    purchase(game){
        let i = (this.selectionX-1)*5 + (this.selectionY-1);
        this.upgradeFunctions(game, this.buttonsList[i]); 
    }

    selectedDescrip(){
        let i = (this.selectionX-1)*5 + (this.selectionY-1);
        this.descriptionText = this.purchaseDescription[this.buttonsList[i].value]; 
    }

    displayMenu(ctx, game){ //upgrade window background
        if (this.display){
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.roundRect(this.x, this.y, this.width, this.height, 3); //white window
            ctx.stroke();
            ctx.fill();
            this.redraw(ctx, game); //draw button

            ctx.fillStyle = "#282828";
            ctx.beginPath();
            ctx.roundRect(this.costPosition-2*this.padding, 2*this.paddingY, 
                    this.costWidth, this.costHeight*11, 3);
            ctx.stroke();
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'; 
            ctx.font =  this.font2; 

            ctx.beginPath(); //selection 
            ctx.strokeStyle = "green";
            ctx.lineWidth = "5"; 
            ctx.roundRect(this.buttonX1 + (this.selectionX-1)*(this.buttonWidth+ this.padding), 
                2*this.paddingY+(this.buttonHeight+this.paddingY)*(this.selectionY-1), 
                this.buttonWidth,this.buttonHeight, 3);
            ctx.stroke();

            this.selectedDescrip(); //shows selected summon detail 
            ctx.font =  this.font2; 
            ctx.textAlign = 'left';
            for (let i=0; i<this.descriptionText.length; i++){
                ctx.fillText(this.descriptionText[i], this.costPosition-25,
                6*this.paddingY+(this.costPadding+this.costHeight)*i); 
            } 

            //stats          this.damageMulti = 1; 
        // this.pickupMutli = 1;
        // this.knockbackMulti = 1;
        // this.speedMulti = 1; 
        // this.pierce = 0; 

            ctx.font =  this.font2; 
            ctx.textAlign = 'left';
            ctx.fillText('Damage: x'+game.player.damageMulti.toFixed(1), this.costPosition-25, 6*this.paddingY+(this.costPadding+this.costHeight)*7);       
            ctx.fillText('Speed: x'+game.player.speedMulti.toFixed(1), this.costPosition-25, 6*this.paddingY+(this.costPadding+this.costHeight)*7.6); 
            ctx.fillText('Knockback: x'+game.player.knockbackMulti.toFixed(1), this.costPosition-25, 6*this.paddingY+(this.costPadding+this.costHeight)*8.2); 
            ctx.fillText('Pierce: '+game.player.pierce, this.costPosition+100, 6*this.paddingY+(this.costPadding+this.costHeight)*7); 
            ctx.fillText('Loot Radius: x'+game.player.lootMulti.toFixed(1), this.costPosition+100, 6*this.paddingY+(this.costPadding+this.costHeight)*7.6); 


                


            ctx.textAlign = 'left';
            ctx.font =  this.font2; 
            ctx.fillStyle= 'black';
            ctx.fillText(this.note, this.buttonX1+10, this.height-10);

            if (game.error){
                ctx.textAlign = 'left';
                ctx.font =  this.font2; 
                ctx.fillStyle= 'red';
                ctx.fillText('Space occupied!', this.width-220, this.height-10); 
                setTimeout(()=> {game.error=false;}, "3000") ;

            }

        }
        else {document.getElementById('menu').innerHTML="";}
        


            
    }

}

/***/ }),

/***/ "./src/mobInfo.json":
/*!**************************!*\
  !*** ./src/mobInfo.json ***!
  \**************************/
/***/ ((module) => {

module.exports = JSON.parse('{"target":{"speed":"0.1","health":"100","stand":0,"walk":5,"die":5,"angry":12,"sprite":"mob","spriteType":["stumpy"],"proj":"batball","atkSpd":300,"damage":1,"range":500,"value":100},"zombie":{"speed":"0.1","health":"1000","stand":2,"walk":2,"die":10,"angry":9,"sprite":"mob","atkSpd":100,"damage":1,"value":5},"spore":{"speed":"1","health":"2","stand":2,"walk":2,"die":3,"sprite":"mob","value":1},"orangeMushroom":{"speed":"1","health":"5","stand":1,"walk":2,"die":2,"sprite":"mob","value":5},"greenMushroom":{"speed":"2","health":"2","stand":1,"walk":2,"die":2,"sprite":"mob","value":3},"blueMushroom":{"speed":"1","health":"12","stand":1,"walk":2,"die":2,"sprite":"mob","value":10},"hornyMushroom":{"speed":"2","health":"3","stand":2,"walk":2,"die":3,"sprite":"mob","value":2},"mushmom":{"speed":"0.3","health":"250","stand":0,"walk":5,"die":5,"angry":12,"aggro":true,"sprite":"mob","boss":"true","yOff":-10,"atkSpd":200,"damage":1,"range":350,"value":[50,50,50,50,50]},"goldMushroom1":{"speed":"3","health":"3","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[20,20,20,20,20]},"stump":{"speed":"1","health":"7","stand":0,"walk":3,"die":2,"sprite":"mob","value":10},"darkStump":{"speed":"1","health":"20","stand":0,"walk":3,"die":2,"sprite":"mob","value":15},"axeStump":{"speed":"1","health":"15","stand":0,"walk":3,"die":3,"sprite":"mob","value":15},"ghostStump":{"speed":"0.75","health":"20","stand":0,"walk":3,"die":2,"angry":6,"aggro":true,"atkSpd":200,"damage":1,"range":600,"proj":"fireball","sprite":"mob","value":20},"boar":{"speed":"2.5","health":"10","stand":0,"walk":2,"die":1,"height2":15,"sprite":"mob","value":10},"fireBoar":{"speed":"3.5","health":"10","stand":0,"walk":2,"die":1,"sprite":"mob","height2":15,"value":15},"ironBoar":{"speed":"1.5","health":"30","stand":0,"walk":1,"die":1,"sprite":"mob","height2":15,"value":30},"goldMushroom2":{"speed":"3.5","health":"15","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[50,50,50,50,50]},"stumpy":{"speed":"0.5","health":"750","stand":0,"walk":5,"die":9,"angry":13,"aggro":true,"sprite":"mob","boss":"true","proj":"batball","atkSpd":100,"damage":5,"range":600,"value":[80,80,80,80,80]},"neckiJr":{"speed":"2.5","health":"4","stand":0,"walk":2,"die":2,"sprite":"mob","height":50,"height2":35,"width2":25,"value":10},"stirge":{"speed":"2.5","health":"9","stand":0,"walk":1,"die":3,"sprite":"mob","roam":true,"value":15},"bubbling":{"speed":"1.5","health":"13","stand":0,"walk":6,"die":3,"sprite":"mob","value":10},"octopus":{"speed":"1.5","health":"100","stand":0,"walk":4,"die":3,"sprite":"mob","weird":true,"value":25},"wraith":{"speed":"4","health":"70","stand":0,"walk":3,"die":5,"width2":-20,"damage":2,"sprite":"mob","flip":true,"roam":true,"value":50},"jrWraith":{"speed":"4","health":"35","stand":0,"walk":3,"die":5,"sprite":"mob","flip":true,"value":25},"shade":{"speed":"3","health":"500","stand":0,"walk":5,"die":5,"damage":999,"sprite":"mob","roam":true,"flip":true,"value":[100,100,100,100,100]},"goldMushroom3":{"speed":"3","health":"25","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[100,100,100,100,100]}}');

/***/ }),

/***/ "./src/purchase.json":
/*!***************************!*\
  !*** ./src/purchase.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"redDragon":["Summons a Red Dragon to spit hot fire","","Level 1: Baby Dragon","Level 2: +30% Damage & +1 Projectile","Level 3: Evolve! Adds explosion damage","Level 4+: Increase explosion area + 1 Proj."],"blueDragon":["Summons a Blue Dragon to spew frost","","Level 1: Baby Dragon","Level 2: +1 Pierce & +1 Projectile","Level 3: Evolve! Adds chill effect","Level 4+: Increase chill effect + 1 Proj."],"greenDragon":["Summons a Green Dragon to spread poison","","Level 1: Baby Dragon","Level 2: +1 Projectile","Level 3: Evolve! Adds poison damage","Level 4+: Increase poison effect + 1 Proj."],"blackDragon":["Summons a Black Dragon to shoot bolts","","Level 1: Baby Dragon","Level 2: +20% Damage & +1 Projectile","Level 3: Evolve! Adds thunder pillar damage","Level 4+: Increase thunder area + 1 Proj."],"mushroomKnight":["Under development"],"Blaze":["Summons Elemental: Blaze","","Adds +1 projectile to attacks","Wiz & Elementals deal +40% damage","","Additional sprites further increase bonus"],"Dawn":["Summons Elemental: Dawn","","Adds +1 projectile to attacks","Wiz & Elementals deal +20% damage","Increases pick-up range by 50%","","Additional sprites further increase bonus"],"Night":["Summons Elemental: Night","","Adds +1 projectile to attacks","Wiz & Elementals deal +20% damage","Increases knockback effect by 20%","","Additional sprites further increase bonus"],"Wind":["Summons Elemental: Wind","","Adds +1 projectile to attacks","Increases speed by 20%","","Additional sprites further increase bonus"],"Thunder":["Summons Elemental: Dawn","","Adds +1 projectile to attacks","Wiz & Elementals deal +15% damage","Wiz & Elementals projectiles gain +1 pierce","","Additional sprites further increase bonus"]}');

/***/ }),

/***/ "./src/summonInfo.json":
/*!*****************************!*\
  !*** ./src/summonInfo.json ***!
  \*****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"redDragon":{"speed":"0","proj":["redBall","fireball2"],"name":"Red Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,8000],["cry",3,5000],["turn",8,3200]],"1":[["nothing",4,1500],["bewildered",4,1500],["sit",5,5000],["sleep",5,8000],["cry",4,5000],["nothing",4,1500]]},"spriteType":["redDragonBaby","redDragon"],"atkSpd":100,"damage":2,"value":100},"blueDragon":{"speed":"0","proj":["blueBall","iceball"],"name":"Blue Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,8000],["cry",3,5000],["turn",8,3200]],"1":[["nothing",4,1500],["bewildered",4,1500],["sit",5,5000],["sleep",5,8000],["cry",4,5000],["nothing",4,1500]]},"spriteType":["blueDragonBaby","blueDragon"],"atkSpd":100,"damage":2,"value":100},"greenDragon":{"speed":"0","proj":["greenBall","poisonball"],"name":"Green Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"spriteType":["greenDragonBaby","greenDragon"],"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,8000],["cry",3,5000],["turn",8,3200]],"1":[["nothing",4,1500],["bewildered",4,1500],["sit",5,5000],["sleep",5,8000],["cry",4,5000],["nothing",4,1500]]},"atkSpd":100,"damage":2,"value":100},"blackDragon":{"speed":"0","proj":["yellowBall","thunderball"],"name":"Black Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"spriteType":["blackDragonBaby","blackDragon"],"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,8000],["cry",3,5000],["turn",8,3200]],"1":[["sigh",6,760],["bewildered",4,1500],["sit",7,5000],["sleep",6,8000],["cry",4,5000],["sigh",6,750]]},"atkSpd":100,"damage":2,"value":100},"mushroomKnight":{"speed":"0","health":25,"name":"Mushroom Knight","stand":5,"walk":0,"die":0,"angry":10,"sprite":"mob","atkSpd":200,"damage":5,"value":100,"xOff":-135,"yOff":-40}}');

/***/ }),

/***/ "./src/waveInfo.json":
/*!***************************!*\
  !*** ./src/waveInfo.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"level1":["wave1-1","wave1-2","wave1-3","wave1-4","wave1-5","wave1-6","wave1-7","wave1-8","wave1-9","wave1-10"],"level2":["wave2-1","wave2-2","wave2-3","wave2-4","wave2-5","wave2-6","wave2-7","wave2-8","wave2-9","wave2-10"],"level3":["wave3-1","wave3-2","wave3-3","wave3-4","wave3-5","wave3-6","wave3-7","wave3-8","wave3-9","wave3-10"],"wave1-0":[["spore",2,2]],"wave1-1":[["spore",1,3],["spore",2,3],["spore",2,4],["spore",2,5],["spore",2,6],["spore",1,10],["spore",1,11],["spore",1,12],["spore",1,13],["spore",1,14]],"wave1-2":[["spore",2,2],["spore",2,3],["spore",2,4],["orangeMushroom",2,6],["spore",1,10],["spore",1,11],["spore",1,12],["orangeMushroom",1,14],["spore",1,18],["spore",1,19],["spore",1,20],["orangeMushroom",1,22]],"wave1-3":[["greenMushroom",2,3],["greenMushroom",3,4],["spore",2,5],["spore",2,6],["spore",2,7],["greenMushroom",1,10],["greenMushroom",3,11],["spore",1,12],["spore",1,13],["spore",1,14],["greenMushroom",3,17],["greenMushroom",1,18],["spore",3,19],["spore",3,20],["spore",3,21]],"wave1-4":[["greenMushroom",2,3],["greenMushroom",3,4],["orangeMushroom",[0,2],5],["orangeMushroom",[0,2],7],["greenMushroom",1,10],["greenMushroom",[0,2],11],["orangeMushroom",[0,1],12],["orangeMushroom",[0,1],14],["greenMushroom",[1,2],17],["greenMushroom",1,18],["orangeMushroom",[1,2],19],["orangeMushroom",[1,2],21]],"wave1-5":[["greenMushroom",2,3],["greenMushroom",3,4],["orangeMushroom",[0,1],5],["blueMushroom",2,8],["greenMushroom",[0,2],10],["greenMushroom",3,11],["orangeMushroom",1,12],["blueMushroom",1,15],["greenMushroom",[0,1],17],["greenMushroom",[0,2],18],["orangeMushroom",[1,2],19],["blueMushroom",3,22]],"wave1-6":[["spore",2,2],["spore",2,2.5],["spore",2,3],["spore",2,3.5],["spore",2,4],["spore",2,4.5],["spore",2,5],["spore",2,5.5],["spore",2,6],["spore",2,6.5],["blueMushroom",1,7],["orangeMushroom",[0,2],10],["spore",1,11],["spore",1,11.5],["spore",1,12],["spore",1,12.5],["spore",1,13],["spore",3,17],["spore",3,17.5],["spore",3,18],["spore",3,18.5],["spore",3,19],["orangeMushroom",2,22],["orangeMushroom",2,24],["orangeMushroom",2,26],["blueMushroom",[0,2],25]],"wave1-7":[["blueMushroom",2,2],["blueMushroom",2,4],["blueMushroom",2,6],["greenMushroom",[0,1],8],["greenMushroom",3,13],["blueMushroom",[0,2],16],["blueMushroom",3,18],["blueMushroom",[0,2],20],["greenMushroom",2,22],["greenMushroom",1,27],["blueMushroom",[0,2],30],["blueMushroom",1,32],["blueMushroom",[0,2],34],["greenMushroom",[0,1],36],["greenMushroom",[0,1,2],44]],"wave1-8":[["blueMushroom",3,2],["blueMushroom",3,3],["blueMushroom",3,4],["orangeMushroom",3,5],["blueMushroom",3,6],["greenMushroom",2,8],["greenMushroom",3,13],["orangeMushroom",1,14],["blueMushroom",[0,1],16],["orangeMushroom",[0,1],17],["blueMushroom",[0,1],18],["blueMushroom",[0,1],19],["greenMushroom",[0,1],22],["greenMushroom",[0,1],27],["orangeMushroom",3,28],["blueMushroom",[0,2],30],["orangeMushroom",1,31],["blueMushroom",[0,2],32],["blueMushroom",1,33],["blueMushroom",[0,2],34],["greenMushroom",3,36],["greenMushroom",[0,1,2],44]],"wave1-9":[["blueMushroom",[1,2],3],["orangeMushroom",[1,2],4],["blueMushroom",[1,2],5],["orangeMushroom",[1,2],5],["blueMushroom",[1,2],6],["greenMushroom",[1,2],14],["blueMushroom",2,20],["orangeMushroom",2,21],["blueMushroom",2,22],["goldMushroom1",1,23],["blueMushroom",2,24],["greenMushroom",3,28],["blueMushroom",1,35],["orangeMushroom",1,36],["blueMushroom",1,37],["orangeMushroom",1,38],["blueMushroom",1,39],["greenMushroom",3,37]],"wave1-10":[["mushmom",2,1],["orangeMushroom",[0,2],10],["orangeMushroom",[0,2],12],["blueMushroom",[0,2],14],["orangeMushroom",[0,2],16],["orangeMushroom",[0,2],18],["orangeMushroom",[0,2],24],["orangeMushroom",[0,2],26],["blueMushroom",[0,2],28],["orangeMushroom",[0,2],30],["orangeMushroom",[0,2],32]],"wave2-1":[["stump",[0,1,2],2],["stump",[0,1,2],3],["stump",[0,1,2],4],["stump",[0,1,2],5],["stump",[0,1,2],16],["stump",[0,1,2],17],["stump",[0,1,2],18],["stump",[0,1,2],19],["stump",[0,1,2],30],["stump",[0,1,2],31],["stump",[0,1,2],32],["stump",[0,1,2],33]],"wave2-2":[["stump",[0,1,2],2],["stump",[0,1,2],3],["darkStump",[0,1,2],4],["stump",[0,1,2],5],["stump",[0,1,2],15],["darkStump",[0,1,2],16],["stump",[0,1,2],17],["stump",[0,1,2],18],["darkStump",[0,1,2],28],["stump",[0,1,2],29],["stump",[0,1,2],30]],"wave2-3":[["stump",1,2],["darkStump",3,2],["stump",1,4],["darkStump",3,4],["stump",1,6],["darkStump",3,6],["stump",1,10],["darkStump",3,10],["stump",1,12],["darkStump",3,12],["stump",1,14],["darkStump",3,14],["stump",1,18],["darkStump",2,18],["stump",1,20],["darkStump",2,20],["stump",1,22],["darkStump",2,22],["stump",3,28],["darkStump",1,28],["stump",3,30],["darkStump",1,30],["stump",3,32],["darkStump",1,32]],"wave2-4":[["ghostStump",[0,1,2],2],["stump",[0,1,2],3],["darkStump",[0,1,2],4],["ghostStump",1,5],["ghostStump",[0,1,2],12],["stump",[0,1,2],13],["darkStump",[0,1,2],14],["ghostStump",2,15],["stump",[0,1,2],22],["ghostStump",[0,1,2],23],["darkStump",[0,1,2],24],["ghostStump",3,25]],"wave2-5":[["stump",[0,1,2],2],["ghostStump",[1,2],3],["darkStump",[0,2],3],["darkStump",[0,1,2],4],["ghostStump",1,5],["stump",[0,1,2],12],["ghostStump",[0,1],3],["darkStump",3,3],["darkStump",[0,1,2],14],["ghostStump",2,15],["stump",[0,1,2],22],["ghostStump",[1,2],23],["darkStump",[0,1],24],["ghostStump",3,25]],"wave2-6":[["boar",2,2],["boar",2,2.25],["boar",2,2.5],["boar",2,2.75],["boar",2,3],["boar",2,3.25],["boar",2,3.5],["boar",2,3.75],["boar",2,4],["boar",2,4.25],["boar",2,4.5],["boar",2,4.75],["boar",2,5],["boar",2,5.25],["boar",2,5.5],["boar",2,5.75],["boar",2,6],["boar",2,6.25],["boar",2,6.5],["boar",2,6.75],["boar",2,7]],"wave2-7":[["fireBoar",2,2],["fireBoar",2,2.5],["fireBoar",2,3],["fireBoar",2,3.5],["boar",[0,1,2],7.5],["boar",[0,1,2],13],["boar",[0,1,2],13.25],["boar",[0,1,2],13.5],["boar",[0,1,2],13.75],["ironBoar",2,16],["fireBoar",[0,2],22],["fireBoar",[0,2],24],["fireBoar",[0,2],26],["ironBoar",2,30]],"wave2-8":[["darkStump",[0,1,2],3],["darkStump",[0,1,2],3.5],["darkStump",[0,1,2],4],["fireBoar",[0,1,2],4.5],["fireBoar",[0,1,2],5],["ironBoar",[0,1,2],9],["goldMushroom2",2,10],["darkStump",[0,1,2],15],["darkStump",[0,1,2],15.5],["darkStump",[0,1,2],16],["ghostStump",[0,2],17],["boar",[0,1,2],24],["boar",[0,1,2],24.25],["boar",[0,1,2],24.5],["ghostStump",[0,2],24]],"wave2-9":[["darkStump",[0,1,2],3],["darkStump",[0,1,2],3.5],["ghostStump",[0,1,2],4],["darkStump",[0,1,2],4.5],["darkStump",[0,1,2],5],["darkStump",[0,1,2],5.5],["ironBoar",[0,1,2],11],["ironBoar",[0,1,2],12],["ghostStump",[0,1,2],14],["darkStump",[0,1,2],18],["darkStump",[0,1,2],18.5],["ghostStump",[0,1,2],19],["ironBoar",[0,1,2],22],["ironBoar",[0,1,2],24],["ironBoar",[0,1,2],26]],"wave2-10":[["stumpy",2,3],["ghostStump",[0,1,2],5],["boar",[0,2],6],["boar",[0,2],7],["boar",[0,2],8],["ghostStump",[0,1,2],14],["fireBoar",[0,1,2],17],["fireBoar",[0,1,2],19],["ironBoar",[0,1,2],26],["ghostStump",2,27],["ghostStump",[0,2],29],["fireBoar",1,31],["fireBoar",2,32],["fireBoar",3,33],["ghostStump",2,34],["fireBoar",[0,1,2],40],["ironBoar",[0,1,2],42]],"wave3-1":[["neckiJr",3,2],["neckiJr",2,3],["neckiJr",1,4],["bubbling",[0,1,2],4],["bubbling",[0,1,2],5],["bubbling",[0,1,2],6],["neckiJr",1,10],["neckiJr",2,11],["neckiJr",3,12],["bubbling",2,15],["bubbling",2,15.5],["bubbling",2,16],["bubbling",2,16.5],["neckiJr",[0,2],15],["neckiJr",[0,2],17]],"wave3-2":[["neckiJr",1,2],["neckiJr",2,3],["neckiJr",3,4],["bubbling",[0,1],4],["bubbling",[0,1],4.5],["bubbling",[0,1],5],["bubbling",[0,1],5.5],["neckiJr",3,7],["neckiJr",3,13],["bubbling",3,15],["bubbling",3,15.5],["bubbling",3,16],["bubbling",3,16.5],["bubbling",3,17],["bubbling",3,17.5],["neckiJr",[0,1],19],["neckiJr",[0,1],21],["neckiJr",[0,1],23]],"wave3-3":[["stirge",[0,2],1],["stirge",[0,2],1.5],["bubbling",2,2],["bubbling",2,2.5],["bubbling",2,3],["bubbling",2,4],["bubbling",2,4.5],["bubbling",2,5],["bubbling",2,6],["bubbling",2,6.5],["bubbling",2,7],["stirge",[0,1,2],8],["stirge",[0,1,2],10],["stirge",[0,1,2],12],["bubbling",[0,2],13],["stirge",2,13.5],["bubbling",[0,2],14],["stirge",2,14.5],["bubbling",[0,2],15]],"wave3-4":[["octopus",[0,1,2],2],["bubbling",2,7],["bubbling",2,7.5],["bubbling",2,8],["neckiJr",1,9],["neckiJr",2,9.5],["neckiJr",3,10],["stirge",[0,1,2],10],["bubbling",3,16],["bubbling",2,16.5],["bubbling",2,17],["neckiJr",3,18],["neckiJr",2,18.5],["neckiJr",1,19],["stirge",[0,1,2],16],["octopus",[0,1,2],23],["bubbling",1,24],["bubbling",1,24.5],["bubbling",1,25],["bubbling",1,25.5],["stirge",[0,1,2],27]],"wave3-5":[["octopus",1,2],["bubbling",2,2.5],["bubbling",2,3],["bubbling",2,3.5],["bubbling",2,4],["neckiJr",3,5],["neckiJr",3,6],["neckiJr",3,7],["octopus",1,5],["bubbling",2,5.5],["bubbling",2,5.5],["bubbling",2,6],["bubbling",2,6.5],["octopus",2,10],["stirge",[0,1,2],15],["octopus",[1,2],18],["bubbling",1,18.5],["bubbling",1,19],["bubbling",1,19.5],["bubbling",1,20],["octopus",[1,2],20],["stirge",[0,1,2],25],["neckiJr",2,27],["neckiJr",2,27.5],["neckiJr",2,28]],"wave3-6":[["jrWraith",2,3],["jrWraith",2,4],["jrWraith",2,5],["jrWraith",2,6],["jrWraith",[0,2],12],["jrWraith",[0,2],13],["jrWraith",[0,2],14],["jrWraith",[0,2],15],["wraith",2,23],["jrWraith",2,24],["jrWraith",2,25],["jrWraith",2,26]],"wave3-7":[["jrWraith",[0,1],3],["jrWraith",[0,1],4],["jrWraith",[0,1],5],["neckiJr",3,4],["neckiJr",3,5],["wraith",1,10],["jrWraith",2,11],["jrWraith",2,12],["jrWraith",[0,1],13],["octopus",[1,2],15],["wraith",2,18],["jrWraith",1,19],["jrWraith",2,20],["jrWraith",2,21],["jrWraith",2,22]],"wave3-8":[["wraith",[0,1],3],["jrWraith",[0,1,2],10],["jrWraith",[0,1,2],12],["goldMushroom3",1,12],["bubbling",[0,1],18],["bubbling",[0,1],18.5],["bubbling",[0,12],19],["wraith",[0,1],18],["jrWraith",[0,1,2],26],["jrWraith",[0,1,2],28]],"wave3-9":[["shade",1,3],["jrWraith",[0,2],10],["jrWraith",[0,2],14],["bubbling",[0,1,2],18],["bubbling",[0,1,2],18.5],["bubbling",[0,1,2],19],["wraith",[0,1],20],["jrWraith",[0,1,2],26],["jrWraith",[0,1,2],30]],"wave3-10":[["shade",1,3],["jrWraith",[0,2],10],["jrWraith",[0,2],14],["bubbling",[0,1,2],18],["bubbling",[0,1,2],18.5],["bubbling",[0,1,2],19],["shade",1,20],["octopus",3,22],["octopus",3,23],["octopus",3,24],["jrWraith",[0,1,2],28],["jrWraith",[0,1,2],32],["bubbling",[0,1,2],32],["bubbling",[0,1,2],32.5],["bubbling",[0,1,2],32.5],["octopus",1,33],["octopus",1,34],["octopus",1,36],["shade",1,38],["wraith",[0,2],40],["jrWraith",[0,2],44]],"wave3-0":[["neckiJr",2,1],["stirge",2,3],["jrWraith",1,3],["wraith",1,5],["shade",1,7]],"wave4-0":[["neckiJr",[0,1],1],["neckiJr",[0,1],1.5],["neckiJr",[0,1],2],["wraith",[0,1],4],["shade",[0,1],7],["wraith",[0,1],4],["shade",[0,1],7],["wraith",[0,1],4],["shade",[0,1],7],["shade",[0,1],8]]}');

/***/ }),

/***/ "./src/waveNotes.json":
/*!****************************!*\
  !*** ./src/waveNotes.json ***!
  \****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"wave1-1":"Defeat monsters! Pick up mesos before they disappear!","wave1-2":"Summon a companion to keep you company","wave1-3":"Dragons or Elementals? You choose! (but eventually get both)","wave1-5":"Press [Z] to reposition dragons to busier lanes","wave1-6":"Escaped monsters means escaped mesos!","wave1-7":"Here come the big boys!","wave1-9":"Thar be a Golden Mushroom!","wave1-10":"Jump to dodge Mushmom\'s slam attack!","wave2-1":"Divide & Conquer!","wave2-3":"Beware of enemy projectiles! (your dragons are fine though)","wave2-6":"Boar stampede incoming (middle!)","wave2-10":"Stumpy\'s bat-bolt packs a huge punch!","wave3-1":"Jr Neckis dodge your summons\' attacks!","wave3-3":"Stirges fly around wildly","wave3-4":"Those Octopus are strange, aren\'t they?","wave3-6":"Wraiths haunt the area...","wave3-9":"Do NOT let the Shade touch you!","wave3-10":"Many Shades of Black!"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");



let canvas = document.getElementById("gameScreen"); // gets canvas element
let ctx = canvas.getContext('2d'); //creates 2D rendering object

const gameWidth = 1000;
const gameHeight = 500;

let game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](gameWidth, gameHeight); 
game.start(); //creates game objects;

function gameLoop(timestamp){
    
    setTimeout(()=> {
        ctx.clearRect(0,0, gameWidth, gameHeight); //refresh screen
        //console.log(timestamp);
        
        if (game.titleDisplay){
            game.titleMenu(ctx);
        }
        else{
            if (!game.pause ){ game.update(timestamp);
            }
            game.nextWaveLoader(); //loads wave list
            game.waveLoader(); // loads each mob from wave list
            //game.pauseHandler() 
            
            game.draw(ctx); 
            game.waveClear(ctx);
            game.pauseHandler(timestamp, ctx); 
            game.upgradeMenu(ctx);
            game.nextLevelLoader(ctx); //if wave list empty, move to next level
            
            game.recallCheck();
            
        }

        game.screenTransition(ctx);

   requestAnimationFrame(gameLoop);}, 10  );  //fix framtes 
   //5 too fast
   // 10 a little too slow
   //60 too slow

}

requestAnimationFrame(gameLoop); 

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjBCOzs7QUFHMUIsb0RBQW9EO0FBQ3BELG1DQUFtQzs7QUFFbkM7QUFDQTs7QUFFQSxlQUFlLDZDQUFJO0FBQ25CLGNBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBLG1DQUFtQztBQUNuQywrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9DQUFvQyxVQUFVO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2FkZS8uL3NyYy9IVUQuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL1Nwcml0ZUFuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvZW5kU2NyZWVuLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9pbWcuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2lucHV0LmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9tb2IuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL21vbmV5LmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3Jlc3RhcnRTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3N0YXJ0U2NyZWVuLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy90aXRsZVNjcmVlbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvdXBncmFkZS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXJjYWRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFVEe1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgMTUwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDc1OyBcbiAgICAgICAgdGhpcy54ID0gMDsgXG4gICAgICAgIHRoaXMueSA9IDA7IFxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyMDsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgIH1cblxuICAgIGRpc3BsYXlIVUQoY3R4LCBnYW1lKXtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JzsgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSdibGFjayc7XG4gICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuXG4gICAgICAgIHRoaXMubGl2ZXMgPSBcIkxpdmVzOiBcIiArIGdhbWUucGxheWVyLmhlYWx0aDsgXG4gICAgICAgIHRoaXMubW9uZXkgPSBcIk1lc29zOiBcIiArIGdhbWUucGxheWVyLm1vbmV5O1xuICAgICAgICB0aGlzLnN0YWdlID0gXCJXYXZlOiBcIiArIGdhbWUubGV2ZWwgKyAnLScgKyBnYW1lLndhdmU7IFxuICAgICAgICB0aGlzLnRleHQgPSBbdGhpcy5saXZlcywgdGhpcy5tb25leSwgdGhpcy5zdGFnZV07IFxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudGV4dC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy50ZXh0W2ldLCB0aGlzLngrdGhpcy5wYWRkaW5nLCB0aGlzLnkrdGhpcy5wYWRkaW5nKigxK2kpLCB0aGlzLndpZHRoKTsgXG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsImltcG9ydCBpbWcgZnJvbSAnLi9pbWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVBbmltYXRpb257XG4gICAgaW1hZ2VzID0gW107XG4gICAgY29uc3RydWN0b3IoZmlsZU5hbWUsIG51bWJlck9mSW1hZ2VzLCB0aW1lckNvdW50LCBzdGF0ZSwgc3RvcCl7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPD1udW1iZXJPZkltYWdlczsgaSsrKXsgLy8gbG9hZHMgaW1hZ2VzIGludG8gYXJyYXkgXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGltZyhmaWxlTmFtZS5yZXBsYWNlKFwiP1wiLCBpKSk7IFxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChpbWFnZSk7IFxuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyT2ZJbWFnZXMgPSBudW1iZXJPZkltYWdlcztcbiAgICAgICAgdGhpcy50aW1lckNvdW50ID0gdGltZXJDb3VudDtcbiAgICAgICAgdGhpcy50aW1lckNvdW50RGVmYXVsdCA9IHRoaXMudGltZXJDb3VudDsgXG4gICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7IFxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7IFxuICAgICAgICB0aGlzLnN0b3AgPSBzdG9wOyBcbiAgICB9XG4gICAgXG4gICAgaXNGb3Ioc3RhdGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gc3RhdGU7IFxuICAgIH1cblxuICAgIHJlc2V0KCl7IC8vIGxvb3AgYW5pbWF0aW9uXG4gICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7ICAgXG4gICAgfVxuXG4gICAgZ2V0RnJhbWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VJbmRleDsgXG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UocGF1c2UpeyAgLy9yZXR1cm5zIGZyYW1lXG4gICAgICAgIHRoaXMuc2V0SW1hZ2VJbmRleChwYXVzZSk7IFxuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZXNbdGhpcy5pbWFnZUluZGV4XTsgXG4gICAgfVxuXG4gICAgaW1hZ2VieUZyYW1lKGZyYW1lKXsgLy9tYW51YWwgZXhwb3J0IGltYWdlXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlc1tmcmFtZV07IFxuICAgIH1cblxuICAgIG1vdmVGcmFtZShvYmosIHBhdXNlKXtcbiAgICAgICAgb2JqLnRpbWVyQ291bnQtLTtcbiAgICAgICAgaWYgKG9iai50aW1lckNvdW50IDw9IDAgJiYgIXRoaXMuc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgIG9iai50aW1lckNvdW50PSB0aGlzLnRpbWVyQ291bnREZWZhdWx0OyBcbiAgICAgICAgICAgIGlmICghcGF1c2UpIHtvYmouZnJhbWUrKzt9IC8vYW5pbWF0ZSBvbmx5IHdoZW4gdW5wYXVzZWRcbiAgICAgICAgICAgIGlmIChvYmouZnJhbWUgPj0gdGhpcy5pbWFnZXMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBvYmouZnJhbWUgPSAwOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc2V0SW1hZ2VJbmRleChwYXVzZSl7XG4gICAgICAgIHRoaXMudGltZXJDb3VudC0tO1xuICAgICAgICBpZiAodGhpcy50aW1lckNvdW50IDw9IDAgJiYgIXRoaXMuc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgIHRoaXMudGltZXJDb3VudD0gdGhpcy50aW1lckNvdW50RGVmYXVsdDsgXG4gICAgICAgICAgICBpZiAoIXBhdXNlKSB7dGhpcy5pbWFnZUluZGV4Kys7fSAvL2FuaW1hdGUgb25seSB3aGVuIHVucGF1c2VkXG4gICAgICAgICAgICBpZiAodGhpcy5pbWFnZUluZGV4ID49IHRoaXMuaW1hZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUluZGV4ID0gMDsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRTdG9wKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3AgICYmIHRoaXMuaW1hZ2VJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoLTFcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBlbmRTY3JlZW57XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMjAwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwOyBcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyNTsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQyID0gXCIyNHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7IFxuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1JldHVybiB0byBNYWluJztcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMuZ2FtZVdpZHRoLzI7XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSAyNTA7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzA7IFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3RhdHMxID0gW107XG4gICAgICAgIHRoaXMuc3RhdHMyID0gW107XG4gICAgICAgIHRoaXMuc3RhdFBvc2l0aW9uID0gdGhpcy54OyAvL3N0YXJ0aW5nIHggXG4gICAgICAgIHRoaXMuc3RhdEhlaWdodCA9IDIwO1xuICAgICAgICB0aGlzLnN0YXRXaWR0aCA9IDIwMDtcblxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMueCsodGhpcy53aWR0aC10aGlzLmJ1dHRvbldpZHRoKS8yLCB0aGlzLmhlaWdodC10aGlzLmJ1dHRvbkhlaWdodC10aGlzLnBhZGRpbmddXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjFdXG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpOyAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcmVkcmF3KGN0eCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRGdW5jdGlvbnMoZ2FtZSl7XG4gICAgICAgICAgICBnYW1lLm5leHRXYXZlID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgIH1cblxuICAgICAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgLy8gdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2FtZU92ZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5mYWRlT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7Z2FtZS50aXRsZURpc3BsYXkgPSB0cnVlfSwgXCIyMDAwXCIpfSAvLyBmYWRlIG91dCB0cmFuc2l0aW9uIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7Z2FtZS5sZXZlbEZpbmlzaCA9IHRydWU7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4KXsgICBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnc3RlZWxibHVlJzsgLy9kcmF3IGJvcmRlclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL3NldHMgYXJlYSBmb3IgY29sbGlzaW9uIChpc1BvaW50SW5QYXRoKVxuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQsIDIpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyAvL2RyYXcgdGV4dCBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGUxLnRleHRDb250ZW50LCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSt0aGlzLmJ1dHRvbkhlaWdodC8yKTsgXG4gICAgICAgIH1cblxuICAgICAgICBsb2FkU3RhdHMoZ2FtZSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRzMSA9IFtbICdNb25zdGVycyBEZWZlYXRlZDogJysgZ2FtZS5tb25zdGVyS2lsbF0sXG4gICAgICAgICAgICAgICAgICAgIFsnTW9uc3RlcnMgRXNjYXBlZDogJysgZ2FtZS5tb25zdGVyRXNjYXBlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTWVzb3MgQ29sbGVjdGVkOiAnKyBnYW1lLm1vbmV5Q29sbGVjdGVkXSxbJ01lc29zIExvc3Q6ICcrIGdhbWUubW9uZXlMb3N0XVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN0YXRzMiA9IFtdXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9iaiBvZiBnYW1lLnBsYXllck9iamVjdHMpe1xuICAgICAgICAgICAgICAgIGxldCBzdGF0c09iaiA9ICcnXG4gICAgICAgICAgICAgICAgaWYgKG9iai50eXBlID09ICdncmVlbkRyYWdvbicpeyAvL2FkZCBwb2lzb25cbiAgICAgICAgICAgICAgICAgICAgc3RhdHNPYmogPSAgW29iai5uYW1lKycgRGFtYWdlOiAnKyBvYmouZGFtYWdlRGVhbHQudG9GaXhlZCgwKSArIFwiICgrXCIrIGdhbWUucG9pc29uRGFtYWdlLnRvRml4ZWQoMCkrICcpJ107IH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoudHlwZSA9PSAncmVkRHJhZ29uJyB8fCBvYmoudHlwZSA9PSAnYmxhY2tEcmFnb24nKXsgLy9leHBsb2RlIGRhbWFnZSBcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNPYmogPSAgW29iai5uYW1lKycgRGFtYWdlOiAnKyBvYmouZGFtYWdlRGVhbHQudG9GaXhlZCgwKSArIFwiICgrXCIrIG9iai5leHBsb2RlRGFtYWdlRGVhbHQudG9GaXhlZCgwKSsgJyknXTsgfVxuICAgICAgICAgICAgICAgIGVsc2Uge3N0YXRzT2JqID0gIFtvYmoubmFtZSsnIERhbWFnZTogJysgb2JqLmRhbWFnZURlYWx0LnRvRml4ZWQoMCldOyB9XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0czIucHVzaChzdGF0c09iaik7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgIFxuXG4gICAgICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDIpO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lT3Zlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdHYW1lIE92ZXIhJywgdGhpcy5nYW1lV2lkdGgvMiwgMjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4KTsgLy9yZXR1cm4gdG8gbWFpbiBidXR0b24gXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUud2F2ZUZpbmlzaCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dDE9Jyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dDI9Jyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbCA9PSBnYW1lLmZpbmFsTGV2ZWwgJiYgZ2FtZS5sZXZlbExpc3QubGVuZ3RoID09IDApeyAvL2ZpbmFsIGxldmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDE9ICdGaW5hbCBMZXZlbCBDbGVhciEnICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDI9ICdUaGFua3MgZm9yIHBsYXlpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4KTt9IC8vcmV0dXJuIHRvIG1haW4gYnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbExpc3QubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0MT0nTGV2ZWwgJyArZ2FtZS5sZXZlbCsgJyBDbGVhciEnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgdGV4dDE9J1dhdmUgQ2xlYXIhJzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDIgPSAnUHJlc3MgW0FdIHRvIG9wZW4gc2hvcCBvciBbRF0gdG8gc3RhcnQgbmV4dCB3YXZlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGV4dDEsIHRoaXMuZ2FtZVdpZHRoLzIsIDI1KVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibHVlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0MiwgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5oZWlnaHQtMTApLy9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnc3RhcnQnOyAvL3N0YXRzIFxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFN0YXRzKGdhbWUpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnN0YXRzMS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajx0aGlzLnN0YXRzMVtpXS5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5zdGF0czFbaV1bal0sIHRoaXMucGFkZGluZyt0aGlzLnN0YXRQb3NpdGlvbisodGhpcy5zdGF0V2lkdGgvNCkqaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyNSsgdGhpcy5wYWRkaW5nKyh0aGlzLnN0YXRIZWlnaHQpKmksIDMwMCApOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zdGF0czIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7IGo8dGhpcy5zdGF0czJbaV0ubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuc3RhdHMyW2ldW2pdLCB0aGlzLnBhZGRpbmcrdGhpcy5zdGF0UG9zaXRpb24rdGhpcy5zdGF0V2lkdGgqMS41LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI1KyB0aGlzLnBhZGRpbmcrKHRoaXMuc3RhdEhlaWdodCkqaSwgMzAwICk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ICAgIFxuICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICB9XG59XG4iLCJpbXBvcnQgSW5wdXRIYW5kbGVyIGZyb20gJy4vaW5wdXQnOyBcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInOyBcbmltcG9ydCBNb2IgZnJvbSAnLi9tb2InO1xuaW1wb3J0IFVwZ3JhZGUgZnJvbSAnLi91cGdyYWRlJzsgXG5pbXBvcnQgTW9uZXkgZnJvbSAnLi9tb25leSc7IFxuaW1wb3J0IHN0YXJ0U2NyZWVuIGZyb20gJy4vc3RhcnRTY3JlZW4nOyBcbmltcG9ydCB0aXRsZVNjcmVlbiBmcm9tICcuL3RpdGxlU2NyZWVuJzsgXG5pbXBvcnQgcmVzdGFydFNjcmVlbiBmcm9tICcuL3Jlc3RhcnRTY3JlZW4nOyBcbmltcG9ydCBlbmRTY3JlZW4gZnJvbSAnLi9lbmRTY3JlZW4nOyBcbmltcG9ydCBIVUQgZnJvbSAnLi9IVUQnOyBcbmltcG9ydCBpbWcgZnJvbSAnLi9pbWcnO1xuaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1le1xuICAgIGNvbnN0cnVjdG9yKGdhbWVXaWR0aCwgZ2FtZUhlaWdodCl7XG4gICAgICAgIHRoaXMubm90ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLnRpdGxlID0gbmV3IHRpdGxlU2NyZWVuKHRoaXMpOyBcbiAgICAgICAgdGhpcy50aXRsZS5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICB0aGlzLmVuZCA9IG5ldyBlbmRTY3JlZW4odGhpcyk7IFxuICAgICAgICB0aGlzLmVuZC5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc3RhcnQgPSBuZXcgcmVzdGFydFNjcmVlbih0aGlzKTsgXG4gICAgICAgIHRoaXMucmVzdGFydC5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnJlc3RhcnRXaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aXRsZURpc3BsYXkgPSB0cnVlOy8vZmFsc2U7IC8vZW5hYmxlIGZvciByZWxlYXNlXG4gICAgICAgIHRoaXMubG9hZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMgPVtdO1xuICAgICAgICB0aGlzLm1vYk9iamVjdHMgPVtdOyBcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSBbXTsgXG4gICAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLmZpbmFsTGV2ZWwgPTMgOyBcbiAgICAgICAgdGhpcy53YXZlID0gMDsgXG4gICAgICAgIHRoaXMubGFuZSA9IDE7IFxuICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICB0aGlzLmJnU3RhZ2UgPSBpbWcoJ2JnL2JnU3RhZ2UnK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53YXZlSW5mbyA9IHJlcXVpcmUoJy4vd2F2ZUluZm8uanNvbicpO1xuICAgICAgICB0aGlzLndhdmVOb3RlcyA9IHJlcXVpcmUoJy4vd2F2ZU5vdGVzLmpzb24nKTtcbiAgICAgICAgdGhpcy5sZXZlbE5vdGUgPSAnJzsgXG4gICAgICAgIHRoaXMubGV2ZWxMaXN0ID0gWy4uLnRoaXMud2F2ZUluZm9bJ2xldmVsJyt0aGlzLmxldmVsXV07Ly97MTogWyd3YXZlMS01JywgJ3dhdmUxLTEnXX0gLy9KU09OXG4gICAgICAgIHRoaXMud2F2ZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy50b0xvYWQgPVtdOyBcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSA5MDsgLy9sYW5lIHNpemVcbiAgICAgICAgdGhpcy5uZXh0V2F2ZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5sZXZlbFN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IHRydWU7IFxuICAgICAgICB0aGlzLmxldmVsRmluaXNoID0gZmFsc2UgOyAvL2Nsb3NlIHN0YXRzIG1lbnVcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmlyc3RMb2FkID0gMDsgXG4gICAgICAgIHRoaXMubm90ZVRpbWUgPSAwOyBcbiAgICAgICAgdGhpcy5nYW1lVGltZSA9IDA7IC8vcGxheWVkIGdhbWUgdGltZSBmb3IgZXZlbnRzOyBcbiAgICAgICAgdGhpcy5nYW1lVGltZVJlYWwgPSAwOyAvL3RyYWNrcyB0aW1lIGFnYWluc3QgcGF1c2VzIFxuICAgICAgICB0aGlzLnBhdXNlZFRpbWUgPSAwOyBcbiAgICAgICAgdGhpcy50aW1lT2Zmc2V0ID0gMFxuICAgICAgICB0aGlzLnRpbWVPZmZzZXRTdW0gPSAwOyBcbiAgICAgICAgdGhpcy5zZXRQb2ludCA9IGZhbHNlOyBcblxuICAgICAgICB0aGlzLmZhZGUgPSAwO1xuICAgICAgICB0aGlzLmZhZGVJbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZhZGVPdXQgPSBmYWxzZSA7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IFtdOyBcbiAgICAgICAgdGhpcy5lcnJvciA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5tb2JDb3VudCA9IDAgOyBcblxuICAgICAgICB0aGlzLnBvaXNvbkRhbWFnZSA9IDA7IFxuICAgICAgICB0aGlzLm1vbnN0ZXJLaWxsID0gMDsgXG4gICAgICAgIHRoaXMubW9uc3RlckVzY2FwZSA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlRGVhbHQgPSB7fTsgXG4gICAgICAgIHRoaXMubW9uZXlDb2xsZWN0ZWQgPSAwO1xuICAgICAgICB0aGlzLm1vbmV5TG9zdCA9IDA7IFxuICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2U9ZmFsc2U7XG5cbiAgICAgICAgLy9sb2FkIGNvaW4gc3ByaXRlc1xuICAgICAgICB0aGlzLmNvaW5TcHJpdGVzID0gW107Ly9bMF0gPSAxLCBbMV0gPSAyOyBcbiAgICAgICAgZm9yIChsZXQgaSA9MTsgaTw9NDtpKyspe1xuICAgICAgICAgdGhpcy5jb2luU3ByaXRlcy5wdXNoKG5ldyBTcHJpdGVBbmltYXRpb24oJ2NvaW4vQ29pbicraSsnXz8ucG5nJywgMywgNiwgXCJzdGFuZFwiKSApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwYXVzZUhhbmRsZXIodGltZSwgY3R4KXtcblxuICAgICAgICBpZiAodGhpcy5wYXVzZSApeyAvL3NuYXBzIHdoZW4gdGltZSBpcyBwYXVzZWQ7IFxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldFBvaW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlZFRpbWUgPSB0aW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9pbnQgPSB0cnVlOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge3RoaXMudGltZU9mZnNldCA9IHRpbWUgLSB0aGlzLnBhdXNlZFRpbWV9IC8vcnVucyB1cCBvZmZzZXQgdmFsdWUgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5ID0gZmFsc2UgO1xuICAgICAgICAgICAgdGhpcy50aW1lT2Zmc2V0U3VtKz0gdGhpcy50aW1lT2Zmc2V0OyAvL3N1bSBvZiBvZmZzZXQgdmFsdWVzIFxuICAgICAgICAgICAgdGhpcy50aW1lT2Zmc2V0ID0gMDsgIC8vcmVzZXQgXG4gICAgICAgICAgICB0aGlzLmdhbWVUaW1lUmVhbCA9IHRpbWUgLXRoaXMudGltZU9mZnNldFN1bTsgLy9hcHBseSBvZmZzZXQgc3VtXG4gICAgICAgICAgICB0aGlzLnNldFBvaW50ID0gZmFsc2U7ICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBhdXNlKXtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNlxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLDAsdGhpcy5nYW1lV2lkdGgsIHRoaXMuZ2FtZUhlaWdodCk7IFxuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjE2cHggYXJpYWxcIjsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1ByZXNzIEVTQyB0byB1bnBhdXNlJywgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5nYW1lSGVpZ2h0LzIrMjApIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlUGF1c2UoKXsgICBcbiAgICAgICAgdGhpcy5wYXVzZSA9ICF0aGlzLnBhdXNlOyBcbiAgICB9XG5cbiAgICByZXNldEV2ZXJ5dGhpbmcoKXtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5yZXN0YXJ0V2luZG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGl0bGVEaXNwbGF5ID0gZmFsc2U7IC8vZW5hYmxlIGZvciByZWxlYXNlXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gW107IFxuICAgICAgICB0aGlzLndhdmUgPSAwOyBcbiAgICAgICAgdGhpcy5iZ1NreSA9IGltZygnYmcvYmdTa3knK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgdGhpcy5iZ1N0YWdlID0gaW1nKCdiZy9iZ1N0YWdlJyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2F2ZUluZm8gPSByZXF1aXJlKCcuL3dhdmVJbmZvLmpzb24nKTtcbiAgICAgICAgdGhpcy5sZXZlbExpc3QgPSBbLi4udGhpcy53YXZlSW5mb1snbGV2ZWwnK3RoaXMubGV2ZWxdXTsvL3sxOiBbJ3dhdmUxLTUnLCAnd2F2ZTEtMSddfSAvL0pTT05cblxuICAgICAgICB0aGlzLndhdmVMaXN0ID0gW107XG4gICAgICAgIHRoaXMudG9Mb2FkID1bXTsgXG4gICAgICAgIHRoaXMubmV4dFdhdmUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IHRydWU7IFxuICAgICAgICB0aGlzLmxldmVsRmluaXNoID0gZmFsc2UgOyAvL2Nsb3NlIHN0YXRzIG1lbnVcbiAgICAgICAgLy90aGlzLmdhbWVUaW1lID0gMDsgXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IFtdOyBcbiAgICAgICAgdGhpcy5wb2lzb25EYW1hZ2UgPSAwOyBcbiAgICAgICAgdGhpcy5tb25zdGVyS2lsbCA9IDA7IFxuICAgICAgICB0aGlzLm1vbnN0ZXJFc2NhcGUgPSAwO1xuICAgICAgICB0aGlzLmRhbWFnZURlYWx0ID0ge307IFxuICAgICAgICB0aGlzLm1vbmV5Q29sbGVjdGVkID0gMDtcbiAgICAgICAgdGhpcy5tb25leUxvc3QgPSAwOyBcbiAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlPWZhbHNlO1xuICAgICAgICB0aGlzLmxvYWRCRygpO1xuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMgPSBbdGhpcy5wbGF5ZXJdO1xuICAgICAgICB0aGlzLnBsYXllci5tb25leSA9IDUwOyAgLy81MFxuICAgICAgICBpZiAodGhpcy5sZXZlbCA9PSAyKSB7dGhpcy5wbGF5ZXIubW9uZXkgPSAxMjAwfSAvL3N0YXJ0aW5nIG1vbmV5IGJhc2VkIG9uIGxldmVsO1xuICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsID09IDMpIHt0aGlzLnBsYXllci5tb25leSA9IDUwMDB9XG4gICAgfVxuICAgIFxuICAgIHRpdGxlTWVudShjdHgpeyBcblxuICAgICAgICB0aGlzLnRpdGxlLmRpc3BsYXlNZW51KGN0eCwgdGhpcyk7IFxuICAgIH1cblxuICAgIHdhdmVDbGVhcihjdHgpeyAvLyBjaGVja3MgaWYgd2F2ZSBpcyBjbGVhcmVkXG4gICAgICAgIGlmICghdGhpcy5uZXh0V2F2ZSAmJiB0aGlzLndhdmVTdGFydCAmJiB0aGlzLmxldmVsU3RhcnQgJiYgXG4gICAgICAgICAgICB0aGlzLnRvTG9hZC5sZW5ndGggPT0gMCAgJiYgdGhpcy5tb2JPYmplY3RzLmxlbmd0aD09MCApe1xuICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmVuZC5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW5kLmRpc3BsYXlNZW51KGN0eCwgdGhpcyk7XG4gICAgICAgIH0gXG4gICAgfVxuICAgIG5leHRMZXZlbExvYWRlcihjdHgpe1xuICAgICAgICBpZiAodGhpcy5sZXZlbExpc3QubGVuZ3RoID09IDAgJiYgdGhpcy53YXZlRmluaXNoKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsRmluaXNoKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09dGhpcy5maW5hbExldmVsKXsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWRlT3V0ID0gdHJ1ZX0sIFwiMjAwMFwiKSAvLyBmYWRlIG91dCB0cmFuc2l0aW9uXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHsgLy9sb2FkIG5leHQgY29udGVudFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsKys7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxMaXN0ID0gWy4uLnRoaXMud2F2ZUluZm9bJ2xldmVsJyt0aGlzLmxldmVsXV07IC8vIGxvYWQgbmV4dCBsZXZlbCB3YXZlc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsRmluaXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F2ZSA9IDA7ICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZ1NreSA9IGltZygnYmcvYmdTa3knK3RoaXMubGV2ZWwrJy5wbmcnKTsgLy9yZWxvYWQgQkcgYXJ0IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnU3RhZ2UgPSBpbWcoJ2JnL2JnU3RhZ2UnK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSBbXTsgLy9jbGVhciBmbG9vciBtb25leSBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFdhdmUgID0gZmFsc2UgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5sZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxhbmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvbiA9IHt4OjI1LCB5OnRoaXMuZ2FtZUhlaWdodCAtIDQ1IC0gMip0aGlzLnBsYXllci5yb3dIZWlnaHR9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5mbG9vciA9IHRoaXMuZ2FtZUhlaWdodCAtIDQ1IC0gKDErdGhpcy5wbGF5ZXIubGFuZSkqdGhpcy5wbGF5ZXIucm93SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSB0aGlzLnBsYXllck9iamVjdHMuc3BsaWNlKDEpOyAgLy9wdWxscyBldmVyeXRoaW5nIGV4cGVjdCBwbGF5ZXJcbiAgICAgICAgICAgICAgICB9LCBcIjQwMDBcIik7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHRXYXZlTG9hZGVyKCl7XG4gICAgICAgIGlmICh0aGlzLm5leHRXYXZlKXsgLy9sb2FkIG5leHQgd2F2ZSBkYXRhIGZyb20gSlNPTlxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxMaXN0Lmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVMaXN0ID0gWy4uLnRoaXMud2F2ZUluZm9bdGhpcy5sZXZlbExpc3Quc2hpZnQoKV1dOyAvL1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVRpbWUgPSB0aGlzLmdhbWVUaW1lUmVhbDsgLy9zdGFydCBvZiB3YXZlO1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgIHRoaXMud2F2ZSArKzsgXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0V2F2ZSA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGUuZGlzcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IGZhbHNlOyBcblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2F2ZU5vdGVzWyd3YXZlJyt0aGlzLmxldmVsKyctJyt0aGlzLndhdmVdKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbE5vdGUgPSB0aGlzLndhdmVOb3Rlc1snd2F2ZScrdGhpcy5sZXZlbCsnLScrdGhpcy53YXZlXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RlVGltZSA9IHRoaXMuZ2FtZVRpbWVSZWFsOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHRoaXMubGV2ZWxGaW5pc2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2NyZWVuVHJhbnNpdGlvbihjdHgpe1xuICAgICAgICBpZiAodGhpcy5mYWRlSW4peyAvL2ZhZGUgaW4gXG4gICAgICAgICAgICBpZiAodGhpcy5mYWRlPjApe1xuICAgICAgICAgICAgICAgIHRoaXMuZmFkZSAtPSAwLjAzOyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWRlIDw9IDApIHt0aGlzLmZhZGVJbiA9IGZhbHNlO31cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmFkZU91dCl7IC8vZmFkZSB0byBibGFja1xuICAgICAgICAgICAgaWYgKHRoaXMuZmFkZSA8IDEpeyAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmZhZGUgKz0gMC4wMzsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFkZSA+PSAxKSB7IFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWRlSW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWRlT3V0ID0gZmFsc2U7fSwgXCIxNTAwXCIpfVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mYWRlSW4gfHwgdGhpcy5mYWRlT3V0KXtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmZhZGU7IFxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuZ2FtZVdpZHRoLCB0aGlzLmdhbWVIZWlnaHQpOyBcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICB3YXZlTG9hZGVyKCl7Ly9sb2FkZHMgZWFjaCBtb2IgZnJvbSB3YXZlTGlzdFxuICAgICAgICBpZiAodGhpcy50b0xvYWQubGVuZ3RoID09IDAgJiYgdGhpcy53YXZlTGlzdC5sZW5ndGg+MCkge3RoaXMudG9Mb2FkID0gdGhpcy53YXZlTGlzdC5zaGlmdCgpO31cbiAgICAgICAgaWYgKHRoaXMudG9Mb2FkWzJdIDw9ICAodGhpcy5nYW1lVGltZVJlYWwgLSB0aGlzLmdhbWVUaW1lKS8xMDAwICl7XG4gICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5sZXZlbFN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRvTG9hZFsxXS5sZW5ndGg+MCl7IC8vbXVsdGlwbGUgZW50cmllcyBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy50b0xvYWRbMV0ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhbmUgPSB0aGlzLnRvTG9hZFsxXVtpXTsgLy9zZXRzIGxhbmUgdG8gbG9hZFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vYih0aGlzLCB0aGlzLnRvTG9hZFswXSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9iQ291bnQgKys7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5sYW5lID0gdGhpcy50b0xvYWRbMV0tMTsgLy9zZXRzIGxhbmUgdG8gbG9hZFxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9iKHRoaXMsIHRoaXMudG9Mb2FkWzBdLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vYkNvdW50ICsrOyB9ICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMudG9Mb2FkID0gW107IFxuICAgICAgICB9IFxuXG4gICAgfSAgICBcbiAgICBcbiAgICBhZGRFbGVtZW50KGVsZW1lbnQpeyAvL3VwZ3JhZGUgc2hvcCBcbiAgICAgICBpZiAodGhpcy5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoPDUpe1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLm1vbmV5Pj0gdGhpcy5wbGF5ZXIuZWxlbWVudENvc3RbdGhpcy5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW9uZXkgLT0gdGhpcy5wbGF5ZXIuZWxlbWVudENvc3RbdGhpcy5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5lbGVtZW50TGlzdC5wdXNoKGVsZW1lbnQpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5lbGVtZW50YWxzKCk7IC8vbG9hZCBzcHJpdGVzXG4gICAgICAgICAgICAgICAgLy9hcHBseSB1cGdyYWRlc1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09ICdCbGF6ZScpe3RoaXMucGxheWVyLmRhbWFnZU11bHRpKz0wLjQgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09XCJEYXduXCIpe3RoaXMucGxheWVyLmxvb3RNdWx0aSs9MC41OyB0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC4yIH07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0nTmlnaHQnKXt0aGlzLnBsYXllci5rbm9ja2JhY2tNdWx0aSs9MC4yOyB0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC4yfTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSdXaW5kJyl7dGhpcy5wbGF5ZXIuc3BlZWRNdWx0aSs9MC4yfTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSdUaHVuZGVyJyl7dGhpcy5wbGF5ZXIucGllcmNlKz0xO3RoaXMucGxheWVyLmRhbWFnZU11bHRpKz0wLjIgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdW1tb24odHlwZSl7XG4gICAgICAgIGxldCB0cmFuc2ZlciA9IHRoaXMuc3RvcmFnZS5maW5kSW5kZXgob2JqPT5vYmoudHlwZSA9PT0gdHlwZSk7IFxuICAgICAgICB0aGlzLnN0b3JhZ2VbdHJhbnNmZXJdLnBvc2l0aW9uLnggPSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMjtcbiAgICAgICAgdGhpcy5zdG9yYWdlW3RyYW5zZmVyXS5wb3NpdGlvbi55ID0gKHRoaXMucGxheWVyLmZsb29yKzMwKTsgXG4gICAgICAgIHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0ubGFuZSA9IHRoaXMucGxheWVyLmxhbmU7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2godGhpcy5zdG9yYWdlW3RyYW5zZmVyXSk7IC8vY29waWVzIG9iamVjdCB0byBsaXN0XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zcGxpY2UodHJhbnNmZXIpOyAvL2RlbGV0ZXMgb2JqZWN0IGZyb20gc3RvcmFnZVxuICAgIH1cbiAgICByZWNhbGxDaGVjaygpe1xuICAgICAgICBpZiAoIXRoaXMucmVjYWxsU3RvcmFnZSAgJiYgdGhpcy5zdG9yYWdlWzBdKXtcbiAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IHRoaXMuc3RvcmFnZS5zaGlmdCgpIDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWNhbGwoKXsgICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMucmVjYWxsU3RvcmFnZSl7XG4gICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UgPSB0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSYmICAvL2NoZWNrcyBmb3IgZXhpc3RpbmcgdW5pdCBcbiAgICAgICAgICAgIChvYmoucG9zaXRpb24ueCA9PT0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzIpICYmIChvYmoubmFtZSE9PSdXaXonICkpXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlY2FsbFN0b3JhZ2UpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSB0aGlzLnJlY2FsbFN0b3JhZ2UudHlwZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMgPSB0aGlzLnBsYXllck9iamVjdHMuZmlsdGVyKCAgXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QudHlwZSAhPSB0eXBlOyB9KTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoucG9zaXRpb24ueS0zMCA9PT0gdGhpcy5wbGF5ZXIuZmxvb3IpICYmICAvL2NoZWNrcyBmb3IgZXhpc3RpbmcgdW5pdCBcbiAgICAgICAgICAgIChvYmoucG9zaXRpb24ueCA9PT0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzIpICYmIChvYmoubmFtZSE9PSdXaXonKSkpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueCA9ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZS5wb3NpdGlvbi55ID0gKHRoaXMucGxheWVyLmZsb29yKzMwKTsgXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLmxlZnQgPSAodGhpcy5wbGF5ZXIubGVmdCk7IFxuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZS5sYW5lID0gKHRoaXMucGxheWVyLmxhbmUpOyBcblxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKHRoaXMucmVjYWxsU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgLy8gaWYgKCF0aGlzLnJlY2FsbFN0b3JhZ2Upe1xuICAgICAgICAvLyAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai5wb3NpdGlvbi55LTMwID09PSB0aGlzLnBsYXllci5mbG9vcikmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgIC8vICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JyApKVxuXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5yZWNhbGxTdG9yYWdlKVxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGxldCB0eXBlID0gdGhpcy5yZWNhbGxTdG9yYWdlLnR5cGU7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbHRlciggIC8vcmVtb3ZlcyBsb290ZWQgY29pbnNcbiAgICAgICAgLy8gICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC50eXBlICE9IHR5cGU7IH0pOyAgICBcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICAgIHRoaXMucmVjYWxsU3RvcmFnZS5wb3NpdGlvbi54ID0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzI7XG4gICAgICAgIC8vICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueSA9ICh0aGlzLnBsYXllci5mbG9vciszMCk7IFxuXG4gICAgICAgIC8vICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaCh0aGlzLnJlY2FsbFN0b3JhZ2UpO1xuICAgICAgICAvLyAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gZmFsc2U7XG4gICAgICAgIC8vIH1cblxuXG4gICAgfVxuXG4gICAgY3JlYXRlTW9iKHBhcmVudCwgdHlwZSwgc2lkZSwgZ2FtZSA9IG51bGwgKXtcbiAgICAgICAgaWYgKHNpZGUgPT09IDAgJiYgIXRoaXMucmVjYWxsU3RvcmFnZSl7IC8vU3VtbW9uIHVuaXRcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai5wb3NpdGlvbi55LTMwID09PSB0aGlzLnBsYXllci5mbG9vcikgJiYgIC8vY2hlY2tzIGZvciBleGlzdGluZyB1bml0IFxuICAgICAgICAgICAgKG9iai5wb3NpdGlvbi54ID09PSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMikgJiYgKG9iai5uYW1lIT09J1dpeicpKSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGNvc3QgPSAxMDAwOyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuc3VtbW9uQ29zdFt0aGlzLnBsYXllci5zdW1tb25Db3VudF0peyBcbiAgICAgICAgICAgICAgICAgICAgY29zdCA9IHRoaXMucGxheWVyLnN1bW1vbkNvc3RbdGhpcy5wbGF5ZXIuc3VtbW9uQ291bnRdOyBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLm1vbmV5Pj1jb3N0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKG5ldyBNb2IocGFyZW50LCB0eXBlLCAwKSkgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5tb25leSAtPSBjb3N0OyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnN1bW1vbkNvdW50ICsrOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChnYW1lKXtnYW1lLmVycm9yID0gdHJ1ZTsgfTsgXG5cbiAgICAgICAgfSBlbHNlIHt0aGlzLm1vYk9iamVjdHMucHVzaChuZXcgTW9iKHBhcmVudCwgdHlwZSwgMSkpfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBsb2FkQkcoKXtcbiAgICAgICAgdGhpcy5iZ1NreSA9IGltZygnYmcvYmdTa3knK3RoaXMubGV2ZWwrJy5wbmcnKTsgLy9sb2FkIHNreSBiZ1xuICAgIH1cblxuICAgIHN0YXJ0KCl7XG4gICAgICAgIHRoaXMuc3RhcnRNZW51ID0gbmV3IHN0YXJ0U2NyZWVuKHRoaXMpO1xuICAgICAgICB0aGlzLnN0YXJ0TWVudS5pbml0aWFsaXplKHRoaXMpOyBcbiAgICAgICAgdGhpcy51cGdyYWRlID0gbmV3IFVwZ3JhZGUodGhpcyk7IFxuICAgICAgICB0aGlzLnVwZ3JhZGUuaW5pdGlhbGl6ZSh0aGlzKTsgXG4gICAgICAgIHRoaXMuSFVETWVudSA9IG5ldyBIVUQodGhpcyk7IFxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcyk7XG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9IFt0aGlzLnBsYXllcl07XG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyID0gbmV3IElucHV0SGFuZGxlcih0aGlzLnBsYXllciwgdGhpcy51cGdyYWRlLCB0aGlzKTsgICAgICAgIFxuXG4gICAgICAgIC8vIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKG5ldyBNb2IodGhpcy5wbGF5ZXIsICdyZWREcmFnb24nLCAwLDQsNSkpOyBcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ2JsdWVEcmFnb24nLCAwLDIsNSkpOyBcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ2dyZWVuRHJhZ29uJywgMCwzLDUpKTsgXG4gICAgICAgIC8vIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKG5ldyBNb2IodGhpcy5wbGF5ZXIsICdibGFja0RyYWdvbicsIDAsMSw1KSk7IFxuXG4gICAgfVxuXG5cblxuICAgIGRyYXcoY3R4KXsgLy9ydW5zIGRyYXcgZnVuY3Rpb24gZm9yIG9iamVjdCBsaXN0IFxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iZ1NreSwgMCwgMCk7IFxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmdTdGFnZSwgMCwgMCk7IFxuICAgICAgICB0aGlzLnN0YXJ0TWVudS5kaXNwbGF5TWVudShjdHgsIHRoaXMgKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmVtb3RlKHRoaXMpKTsgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4LHRoaXMucGF1c2UpIClcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsIHRoaXMucGF1c2UpICk7XG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsdGhpcykgKTsgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXdQcm9qKGN0eCx0aGlzLnBhdXNlKSApOyAvL3BsYXllciBwcm9qXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXdQcm9qKGN0eCwgdGhpcy5wYXVzZSkgKTsgLy9tb2IgcHJvaiBcblxuXG4gICAgICAgIHRoaXMucGxheWVyLnJlY2FsbEljb24oY3R4LCB0aGlzKTtcbiAgICBcbiAgICB9IFxuXG4gICAga25vY2tiYWNrKG9iaiwgZGlyZWN0aW9uLCBtdWx0aSl7XG4gICAgICAgIGlmIChvYmoubmFtZSA9PSdXaXonKXsgLy9vbmx5IHBsYXllciBwb3BzIHVwXG4gICAgICAgICAgICBvYmouanVtcCA9IHRydWU7XG4gICAgICAgICAgICBvYmouaW52dWxuVGltZSA9IDExMDsgXG4gICAgICAgICAgICBvYmouc3BlZWRZICs9IDQ7XG4gICAgICAgICAgICBvYmoua25vY2tiYWNrRm9yY2U9IC04KmRpcmVjdGlvbjsgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgb2JqLmhpdCA9IHRydWU7IFxuICAgICAgICAgICAgb2JqLmtub2NrYmFja1RpbWUgPSB0aGlzLmdhbWVUaW1lUmVhbDsgIC8vc3RvcmVzIHdoZW4gdGFyZ2V0IGtub2NrYmFjaztcbiAgICAgICAgICAgIGlmIChvYmouYm9zcyl7LTIqZGlyZWN0aW9uKigxKyAobXVsdGktMSkvNCl9IC8vYm9zcyBsZXNzIGtub2NrYmFja1xuICAgICAgICAgICAgZWxzZSB7b2JqLmtub2NrYmFja0ZvcmNlID0gLTQqZGlyZWN0aW9uKigxKyAobXVsdGktMSkvNCl9OyAvL2FkZCBhcyBzdGF0XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZ2dybyhvYmoxLCBvYmoyKXsgLy8gY2hlY2tzIGlmIG9iajEgcmFuZ2UgaXMgd2l0aGluIG9iajJcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmhlYWx0aD4wKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0rb2JqMS5yYW5nZT50YXJnZXQuaGl0Ym94WzBdIHx8IFxuICAgICAgICAgICAgICAgICAgICBvYmoxLmhpdGJveFswXS1vYmoxLnJhbmdlPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSl7IC8vYWdncm8gZnJvbSByaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEuYWdncm8gJiYgb2JqMS5zaWRlID09IDEgJiYgb2JqMS5wb3NpdGlvbi54KzE1MDx0aGlzLmdhbWVXaWR0aCl7b2JqMS5hdHRhY2soKX0gLy9lbmVtaWVzIGF0dGFjayBvbiBDRFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqMS5zaWRlID09IDAgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5oaXRib3hbMV0rMTU+PXRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSt0YXJnZXQuaGl0Ym94WzNdICl7b2JqMS5hdHRhY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbG9vdE1vbmV5KG9iajEsIG9iajIpe1xuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXsgLy8tKHRoaXMud2lkdGgqKC0xK3RoaXMubG9vdE11bHRpKSlcbiAgICAgICAgICAgIGlmICggKG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0gJiYgb2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0rODAqKG9iajEubG9vdE11bHRpLTAuOCkgPiB0YXJnZXQuaGl0Ym94WzBdKSB8fCAvLyBwbGF5ZXIgLT4gbW9uZXlcbiAgICAgICAgICAgICAgICAob2JqMS5oaXRib3hbMF0gPiB0YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gJiYgb2JqMS5oaXRib3hbMF0tODAqKG9iajEubG9vdE11bHRpLTAuOCk8dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICkpeyAvL21vbmV5IDwtIHBsYXllclxuICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFsxXTx0YXJnZXQuaGl0Ym94WzFdICYmIG9iajEuaGl0Ym94WzFdK29iajEuaGl0Ym94WzNdPnRhcmdldC5oaXRib3hbMV0pe1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5zdGFydEZhZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5tb25leSArPSB0YXJnZXQudmFsdWU7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leUNvbGxlY3RlZCArPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc3RhcnRGYWRlID0gdHJ1ZTsvL3RydWU7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmZsb2F0ID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YXJnZXQubG9zdCl7IFxuICAgICAgICAgICAgICAgIHRoaXMubW9uZXlMb3N0Kz10YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsdWU9MCB9OyBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG5cbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSB0aGlzLm1vbmV5T2JqZWN0cy5maWx0ZXIoICAvL3JlbW92ZXMgbG9vdGVkIGNvaW5zXG4gICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QuZGVsZXRlID09IGZhbHNlOyB9KTsgICAgIFxuICAgIH1cblxuICAgIGV4cGxvZGVEYW1hZ2Uob2JqMSwgb2JqMiwgb2JqMyl7XG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIG9iajIpe1xuICAgICAgICAgICAgaWYgKHRhcmdldC5oZWFsdGg+MCl7XG4gICAgICAgICAgICAgICAgaWYgKCAob2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSAmJiBvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXStvYmozLmFyZWEgPiB0YXJnZXQuaGl0Ym94WzBdKSB8fCAvL29iajEgLT50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgKG9iajEuaGl0Ym94WzBdK29iajEuaGl0Ym94WzJdPnRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSAmJiBvYmoxLmhpdGJveFswXS1vYmozLmFyZWE8dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICkpeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgob2JqMS5oaXRib3hbMV0+dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXTx0YXJnZXQuaGl0Ym94WzFdK3RhcmdldC5oaXRib3hbM10pfHxvYmozLmNvbHVtbj4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5wb2lzb24+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQucG9pc29uU3RhY2srMTxvYmoxLnBvaXNvbk1heCl7IC8vYWRkIHRvIG1heCBzdGFja3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wb2lzb25BbW91bnQgKz0gb2JqMS5wb2lzb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucG9pc29uU3RhY2srKzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wb2lzb25UaW1lID0gNTsgIC8vZm91ciB0aWNrcyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaGVhbHRoIC09IG9iajMuZGFtYWdlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMy5leHBsb2RlRGFtYWdlRGVhbHQgKz0gb2JqMy5kYW1hZ2U7fVxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICBjb2xsaXNpb24ob2JqMSwgb2JqMiwgb2JqMyA9IG51bGwpeyAvLyBjaGVja3MgaWYgb2JqMSBpcyBoaXR0aW5nIG9iajIgXG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIG9iajIpe1xuICAgICAgICAgICAgaWYgKG9iajEuaGVhbHRoPjAgJiYgdGFyZ2V0LmhlYWx0aD4wKXtcbiAgICAgICAgICAgICAgICBpZiAoIChvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdICYmIG9iajEuaGl0Ym94WzBdK29iajEuaGl0Ym94WzJdPiB0YXJnZXQuaGl0Ym94WzBdKSB8fCAvL29iajEgLT50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgKG9iajEuaGl0Ym94WzBdK29iajEuaGl0Ym94WzJdPnRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSAmJiBcbiAgICAgICAgICAgICAgICAgICAgb2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICkpeyAvLyB0YXJnZXQgPC0gb2JqMVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFsxXT50YXJnZXQuaGl0Ym94WzFdICYmIG9iajEuaGl0Ym94WzFdPHRhcmdldC5oaXRib3hbMV0rdGFyZ2V0LmhpdGJveFszXSl7IC8veS1ib3VuZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEucHJvamVjdGlsZSAmJiAhb2JqMS5leHBsb2RlICYmICFvYmoxLmhpdExpc3QuaW5jbHVkZXModGFyZ2V0Lm5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnNpZGUgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRhcmdldC5sYW5lID09IG9iajEubGFuZSl7IC8vcGxheWVyIG9ubHkgY2FuIGdldCBoaXQgZnJvbSBwcm9qIGluIGxhbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQsIG9iajMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5waWVyY2UgLT0gMTsgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5oaXRMaXN0LnB1c2godGFyZ2V0Lm5hbWUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQsIG9iajMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoxLnBpZXJjZSAtPSAxOyAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuaGl0TGlzdC5wdXNoKHRhcmdldC5uYW1lKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmozLmFyZWE+MCl7dGhpcy5leHBsb2RlRGFtYWdlKG9iajEsIG9iajIsIG9iajMpfTsgLy9hcmVhIGRhbWFnZTsgY2hlY2tzIGZvciBuZWFyYnkgdGFyZ2V0cyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5waWVyY2U8PTApe29iajEuZXhwbG9kZSA9IHRydWV9OyAvL2Rlc3Ryb3kgcHJvamVjdGlsZSAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghb2JqMS5wcm9qZWN0aWxlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5sYW5lID09IHRhcmdldC5sYW5lKXt0aGlzLmRhbWFnZUNhbGMob2JqMSwgdGFyZ2V0KX07XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIGRhbWFnZUNhbGMob2JqMSwgb2JqMiwgb2JqMyA9IG51bGwpeyAvL29iajEgKG93bmVkIGJ5IG9iajMpIGF0dGFja2luZyBvYmoyIFxuICAgICAgICBpZiAob2JqMi5pbnZ1bG5UaW1lID09IDAgJiYgb2JqMS50b3VjaEhpdCkge1xuICAgICAgICAgICAgbGV0IGRhbWFnZSA9IG9iajEuZGFtYWdlO1xuICAgICAgICAgICAgbGV0IGtub2NrYmFjayA9IDE7IFxuICAgICAgICAgICAgaWYgKG9iajMpe29iajMuZGFtYWdlRGVhbHQrPSBkYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIGtub2NrYmFjayA9IG9iajMua25vY2tiYWNrTXVsdGk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvYmoxLmNoaWxsPjApe1xuICAgICAgICAgICAgICAgIGlmICggTWF0aC5hYnMob2JqMi5zcGVlZFgpLW9iajIuY2hpbGxBbW91bnQ+MCl7b2JqMi5jaGlsbEFtb3VudCs9IG9iajEuY2hpbGx9XG4gICAgICAgICAgICAgICAgZWxzZSBvYmoyLmNoaWxsQW1vdW50ID0gTWF0aC5hYnMob2JqMi5zcGVlZFgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqMi5oZWFsdGggLT0gZGFtYWdlO1xuICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gKz0gZGFtYWdlKmtub2NrYmFjaztcblxuICAgICAgICAgICAgaWYgKG9iajIua25vY2tiYWNrVGhyZXNoIDw9IG9iajIua25vY2tiYWNrU3VtKXtcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5wb3NpdGlvbi54Pm9iajIucG9zaXRpb24ueCl7IHRoaXMua25vY2tiYWNrKG9iajIsIDEsIGtub2NrYmFjayApfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5rbm9ja2JhY2sob2JqMiwgLTEsIGtub2NrYmFjayk7XG4gICAgICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gPSAwIFxuICAgICAgICAgICAgICAgIC8vIG9iajIua25vY2tiYWNrVGhyZXNoICo9MS4yIC8vaW5jcmVhc2UgdGhyZXNob2xkIGVhY2ggdGltZVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG5cblxuICAgIH1cbiAgICBsb3NlTGlmZShjdHgpeyAvL21vYiBlc2NhcGVzXG4gICAgICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMubW9iT2JqZWN0cyl7XG4gICAgICAgICAgICBpZiAob2JqLnBvc2l0aW9uLnggPD0gLW9iai53aWR0aCoyKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyLmhlYWx0aCAtPSAxOyBcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5mbGlwKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxvYmoudmFsdWUubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leUxvc3QrPW9iai52YWx1ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMubW9uZXlMb3N0ICs9IG9iai52YWx1ZTt9IC8vbG9zdCBtb25leVxuICAgICAgICAgICAgICAgICAgICBvYmouYWxpdmUgPSBmYWxzZTsgLy9kZWxldGUgbW9uc2VyOyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyRXNjYXBlICsrOyBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge29iai5zcGVlZFggPSAtb2JqLnNwZWVkWDsgb2JqLmxlZnQ9IW9iai5sZWZ0O31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3NpdGlvbi54ID49IHRoaXMuZ2FtZVdpZHRoICYmIG9iai5zcGVlZFg8MClcbiAgICAgICAgICAgICAgICB7b2JqLnNwZWVkWCA9IC1vYmouc3BlZWRYXG4gICAgICAgICAgICAgICAgb2JqLmxlZnQ9IW9iai5sZWZ0fTtcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy8gZHJhd0dyaWQoY3R4KXtcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpOyAgLy8gdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodFxuICAgIC8vICAgICBjdHgubW92ZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0KTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjIpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjIpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjMpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjMpOyAgICAgICAgXG4gICAgLy8gICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyB9XG5cbiAgICB1cGdyYWRlTWVudShjdHgpe1xuICAgICAgICB0aGlzLkhVRE1lbnUuZGlzcGxheUhVRChjdHgsIHRoaXMpOyAgXG4gICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5oZWFsdGggPD0gMCApe1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5lbmQuZGlzcGxheSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVuZC5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNwYXduTW9uZXkob2JqKXtcbiAgICAgICAgaWYgKG9iai5zdGF0ZSA9PSAnZGllJyAmJiAhb2JqLmxvb3REcm9wKXtcbiAgICAgICAgICAgIGlmIChvYmoudmFsdWUubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgIGxldCB4ID0gLTAuNioyIDsgLy9tb25leSBzcHJlYWRcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxvYmoudmFsdWUubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5wdXNoKG5ldyBNb25leSh0aGlzLCBvYmosIG9iai52YWx1ZVtpXSwgeCtpKjAuNikpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7dGhpcy5tb25leU9iamVjdHMucHVzaChuZXcgTW9uZXkodGhpcywgb2JqLCBvYmoudmFsdWUpKX1cbiAgICAgICAgICAgIG9iai5sb290RHJvcCA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5tb25zdGVyS2lsbCsrOyBcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLnNwYXduTW9uZXkob2JqZWN0KSk7IFxuICAgICAgICB0aGlzLmxvc2VMaWZlKCk7IC8vZW5lbWllcyBwYXN0IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMgPSB0aGlzLm1vYk9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGRlYWQvcGFzc2luZyBvYmplY3RzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9iamVjdC5hbGl2ZSAhPT0gZmFsc2UpfSk7ICAgICAgICBcbiAgICAgICAgdGhpcy5sb290TW9uZXkodGhpcy5wbGF5ZXIsIHRoaXMubW9uZXlPYmplY3RzKTtcblxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKHRoaXMpICk7IFxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSh0aGlzKSApOyBcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSl7XG4gICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuYWdncm8ob2JqZWN0LCB0aGlzLm1vYk9iamVjdHMpICk7ICAvL3N1bW1vbiBhdHRhY2tzXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLmFnZ3JvKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyAvL21vYiBhdHRhY2tzXG5cbiAgICAgICAgdGhpcy5jb2xsaXNpb24odGhpcy5wbGF5ZXIsIHRoaXMubW9iT2JqZWN0cyk7IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuY29sbGlzaW9uKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyBcblxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5tb2JBdHRhY2sodGhpcykpOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3Quc3VtbW9uQXR0YWNrKHRoaXMpKTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PiAvL21vYiBwcm9qIHRvIHBsYXllciBcbiAgICAgICAgICAgIG9iamVjdC5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0Mik9PiBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbihvYmplY3QyLCBbdGhpcy5wbGF5ZXJdLCBvYmplY3QpKSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PiAvL3BsYXllciBwcm9qIHRvIG1vYnNcbiAgICAgICAgICAgIG9iamVjdC5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0Mik9PiBcbiAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb24ob2JqZWN0MiwgdGhpcy5tb2JPYmplY3RzLCBvYmplY3QpXG4gICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICApOyBcblxuICAgIH1cbiAgIFxuXG4gICAgXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1nKGZpbGUpe1xyXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTsgXHJcbiAgICBpbWFnZS5zcmMgPSAnaW1hZ2VzLycrZmlsZTsgXHJcbiAgICByZXR1cm4gaW1hZ2U7IFxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0SGFuZGxlcntcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIHVwZ3JhZGUsIEdhbWUpe1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PnsgICAgXG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7IC8vYTo2NTsgczo4MzsgZDo2OCwgdzogODc7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDM3OiAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUudGl0bGVEaXNwbGF5ICYmICFHYW1lLmZhZGVPdXQgJiYgR2FtZS5sZXZlbD4xKXtHYW1lLmxldmVsLS19XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblg+MSl7dXBncmFkZS5zZWxlY3Rpb25YLT0xfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zcGVlZFggPSAtcGxheWVyLnNwZWVkOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubGVmdCA9IHRydWU7fVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDM5OiAvL3JpZ2h0IGFycm93XG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLnRpdGxlRGlzcGxheSAmJiAhR2FtZS5mYWRlT3V0ICYmIEdhbWUubGV2ZWw8R2FtZS5maW5hbExldmVsKXtHYW1lLmxldmVsKyt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPDIpe3VwZ3JhZGUuc2VsZWN0aW9uWCs9MX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc3BlZWRYID0gcGxheWVyLnNwZWVkOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubGVmdCA9IGZhbHNlO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBjYXNlIDM4OiAvLyB1cCBhcnJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWT4xKXt1cGdyYWRlLnNlbGVjdGlvblktPTF9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoLTEpO31cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgNDA6IC8vIGRvd24gYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblk8NSl7dXBncmFkZS5zZWxlY3Rpb25ZKz0xfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7cGxheWVyLnRlbGVwb3J0KDEpO31cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYXNlIDkwOiAvL1ogcmVjYWxsXG4gICAgICAgICAgICAgICAgaWYgKCFHYW1lLnRpdGxlRGlzcGxheSkge0dhbWUucmVjYWxsKCk7IH1cbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSA4ODogLy9YIGp1bXBcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwbGF5ZXIuanVtcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc3BlZWRZID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuanVtcCA9IHRydWU7fVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgICAgIFxuXG4gICAgICAgICAgICAgICAgY2FzZSA2NzogLy9DIGF0dGFja1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuYXR0YWNrKEdhbWUucGF1c2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgNjU6IC8vQSBvcGVuIHNob3BcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZ3JhZGUudG9nZ2xlTWVudShHYW1lKTsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDgzOiAvLyBTIGJ1eVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBncmFkZS5kaXNwbGF5ICYmICFHYW1lLnRpdGxlRGlzcGxheSl7dXBncmFkZS5wdXJjaGFzZShHYW1lKX1cbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSA2ODogLy9EIHN0YXJ0IHdhdmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUud2F2ZUZpbmlzaCAmJiBHYW1lLnN0b3JhZ2UubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLmdhbWVUaW1lUmVhbC1HYW1lLmZpcnN0TG9hZD41MDAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lLm5leHRXYXZlID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5zdGFydE1lbnUuZGlzcGxheSA9IGZhbHNlfTsgfVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSAyNzogLy8gRVNDXG4gICAgICAgICAgICAgICAgICAgIEdhbWUudG9nZ2xlUGF1c2UoKTsgXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vL29sZCBjb250cm9scyBcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDY1OiAvL0EgbW92ZSBsZWZ0IFxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWD4xKXt1cGdyYWRlLnNlbGVjdGlvblgtPTF9O1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHBsYXllci5zcGVlZFggPSAtcGxheWVyLnNwZWVkOyBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHBsYXllci5sZWZ0ID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDY4OiAvL0QgbW92ZSByaWdodFxuICAgICAgICAgICAgICAgIC8vIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblg8Mil7dXBncmFkZS5zZWxlY3Rpb25YKz0xfTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBwbGF5ZXIuc3BlZWRYID0gcGxheWVyLnNwZWVkOyBcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLmxlZnQgPSBmYWxzZTt9XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA4NzogLy9XIHRlbGVwb3J0IHVwXG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWT4xKXt1cGdyYWRlLnNlbGVjdGlvblktPTF9O1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZSB7cGxheWVyLnRlbGVwb3J0KC0xKTt9XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNhc2UgODM6IC8vUyB0ZWxlcG9ydCBkb3duXG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWTw1KXt1cGdyYWRlLnNlbGVjdGlvblkrPTF9O1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZSB7cGxheWVyLnRlbGVwb3J0KDEpO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcblxuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA3NDogIC8vSiBcbiAgICAgICAgICAgICAgICAvLyBpZiAodXBncmFkZS5kaXNwbGF5KXt1cGdyYWRlLnB1cmNoYXNlKEdhbWUpfSAgICBcbiAgICAgICAgICAgICAgICAvLyBlbHNlIGlmICghcGxheWVyLmp1bXApe1xuICAgICAgICAgICAgICAgIC8vICAgICBwbGF5ZXIuc3BlZWRZID0gMTI7XG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5qdW1wID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrIFxuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA3NTogLy9LXG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5hdHRhY2soR2FtZS5wYXVzZSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDc5OiAvL09cbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKEdhbWUud2F2ZUZpbmlzaCAmJiBHYW1lLnN0b3JhZ2UubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIEdhbWUubmV4dFdhdmUgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIEdhbWUuc3RhcnRNZW51LmRpc3BsYXkgPSBmYWxzZX07IFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWtcblxuICAgIFxuICAgICAgICAgICAgICAgIC8vIGNhc2UgOTY6XG4gICAgICAgICAgICAgICAgLy8gICAgIHVwZ3JhZGUudG9nZ2xlTWVudSgpOyBcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgOTc6IC8vMVxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdyZWREcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDk4OiAvLzJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAnYmx1ZURyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgOTk6IC8vM1xuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdncmVlbkRyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgMTAwOiAvLzRcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAnYmxhY2tEcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PnsgICAgXG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7IC8vYTo2NTsgczo4MzsgZDo2OCwgdzogODc7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUudGl0bGVEaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUuZmFkZU91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lLmZpcnN0TG9hZCA9IEdhbWUuZ2FtZVRpbWVSZWFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntHYW1lLnRpdGxlRGlzcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUucmVzZXRFdmVyeXRoaW5nKCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgODAwKX1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgOTogIFxuICAgICAgICAgICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgICAgIGNhc2UgMTE2OiBicmVhazsgXG5cbiAgICAgICAgICAgICAgICBjYXNlIDM3OiAgIC8vQSA9IDY1XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuc3BlZWRYPDApIHBsYXllci5zcGVlZFggPSAwOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOTogLy8gRCA9IDY4XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuc3BlZWRYPjApIHBsYXllci5zcGVlZFggPSAwOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG59IiwiaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuaW1wb3J0IFByb2plY3RpbGUgZnJvbSAnLi9wcm9qZWN0aWxlJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vYntcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB0eXBlLCBzaWRlLCB0ZXN0ID0gMCwgbGV2ZWw9MCl7XG4gICAgICAgIHRoaXMuc2lkZSA9IHNpZGU7XG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMCl7dGhpcy50eXBlSW5mbyA9IHJlcXVpcmUoJy4vc3VtbW9uSW5mby5qc29uJykgfVxuICAgICAgICBlbHNlICh0aGlzLnR5cGVJbmZvID0gcmVxdWlyZSgnLi9tb2JJbmZvLmpzb24nKSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcblxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlOyBcbiAgICAgICAgIFxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd2YWx1ZSddOyBcbiAgICAgICAgdGhpcy5sb290RHJvcCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IFtdO1xuICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IDE7IFxuICAgICAgICB0aGlzLmZhZGUgPSAxOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlOyAgXG4gICAgICAgIHRoaXMuYXR0YWNrQ0QgPSAwOyBcbiAgICAgICAgdGhpcy5tYXhTcGVlZCA9IDE1OyBcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgICAgIHRoaXMudG91Y2hIaXQgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDA7IFxuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlJ107IFxuICAgICAgICAvL3RoaXMuZGFtYWdlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkYW1hZ2UnXTsgXG4gICAgICAgIHRoaXMuYXR0YWNrU3BlZWQgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2F0a1NwZCddOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3BlZWRYID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcGVlZCddO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7IFxuICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTtcbiAgICAgICAgdGhpcy5sYW5lID0gZ2FtZS5sYW5lOyAgLy8gd2hpY2ggbGFuZVxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDEpeyAvL0VuZW15IE1vYiBcbiAgICAgICAgICAgIHRoaXMuaW52dWxuVGltZSA9ICAwOyBcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMudHlwZStnYW1lLm1vYkNvdW50OyBcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSA0NTsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnaGVpZ2h0J10pe3RoaXMuaGVpZ2h0ID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWlnaHQnXX1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5oZWlnaHQgPSA2NTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3JhbmdlJ10pe3RoaXMucmFuZ2UgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3JhbmdlJ119XG4gICAgICAgICAgICBlbHNlIHt0aGlzLnJhbmdlID0gMTA7fVxuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWFsdGgnXTtcbiAgICAgICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5oZWFsdGg7IFxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhbGsnO1xuICAgICAgICAgICAgdGhpcy54T2ZmPS03MDtcbiAgICAgICAgICAgIHRoaXMueU9mZj0tODU7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiAocmlnaHRzaWRlKVxuICAgICAgICAgICAgICAgIHg6IHRoaXMuZ2FtZVdpZHRoKzUwLCBcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmdhbWVIZWlnaHQgLSAxMDUgLSBnYW1lLnJvd0hlaWdodCpnYW1lLmxhbmUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIFBDIHBldHNcbiAgICAgICAgICAgIHRoaXMuaW52dWxuVGltZSA9IDE7IFxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDUwOyAvL3Nwcml0ZSBzaXplIFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDsgXG4gICAgICAgICAgICB0aGlzLnJhbmdlID0gNjAwOyAvL3dob2xlIGxhbmU/XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDE7IFxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDE7IFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCdcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGZhbHNlOyBcbiAgICAgICAgICAgIHRoaXMueU9mZj0wO1xuICAgICAgICAgICAgdGhpcy54T2ZmPTA7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZURlYWx0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuYWdncm8gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyduYW1lJ107XG4gICAgICAgICAgICBpZiAobGV2ZWwhPTApIHt0aGlzLmxldmVsID0gbGV2ZWx9OyBcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSAnTHZsLiAnICsgdGhpcy5sZXZlbDsgXG4gICAgICAgICAgICB0aGlzLmVtb3RlVGltZSA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMuZW1vdGVMZW5ndGggPSBbXTtcbiAgICAgICAgICAgIHRoaXMueVN0YXJ0ID0gZ2FtZS5mbG9vciszMDtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogKGdhbWUuY3VyVGlsZSo4MCkrZ2FtZS53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IGdhbWUuZmxvb3IrMzBcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9OyAgLy9vZmZzZXQgZm9yIHNwcml0ZXMgXG4gICAgICAgIC8vaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddKSAodGhpcy5wb3NpdGlvbi55IC09dGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pIDtcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlVHlwZSddKXt0aGlzLmxvYWRTcHJpdGUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Nwcml0ZVR5cGUnXVswXX1cbiAgICAgICAgZWxzZSB7dGhpcy5sb2FkU3ByaXRlID0gdGhpcy50eXBlfTtcbiAgICAgICAgdGhpcy5mb3JtID0gMDsgXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RhbWFnZSddKXt0aGlzLmRhbWFnZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZGFtYWdlJ119XG4gICAgICAgIGVsc2UgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhZ2dybyddKXRoaXMuYWdncm8gPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3dpZHRoMiddKXt0aGlzLndpZHRoMiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2lkdGgyJ119XG4gICAgICAgIGVsc2Uge3RoaXMud2lkdGgyPTB9O1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWlnaHQyJ10pe3RoaXMuaGVpZ2h0MiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnaGVpZ2h0MiddfVxuICAgICAgICBlbHNlIHRoaXMuaGVpZ2h0MiA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddKXt0aGlzLnlPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXX1cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneE9mZiddKXt0aGlzLnhPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3hPZmYnXX1cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYm9zcyddKXt0aGlzLmJvc3MgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnktPTcwOyB0aGlzLmhlaWdodCs9MTAwfTsgXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3JvYW0nXSl7XG4gICAgICAgICAgICB0aGlzLnJvYW0gPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMucm9hbVRpbWUgPSA1MDtcbiAgICAgICAgICAgIHRoaXMucm9hbVkgPSB0aGlzLmxhbmUqZ2FtZS5yb3dIZWlnaHQ7IFxuICAgICAgICAgICAgdGhpcy5yb2FtTGltaXRzID0gWzAsIGdhbWUucm93SGVpZ2h0LCBnYW1lLnJvd0hlaWdodCoyXTsgLy8wLDEsMlxuICAgICAgICAgICAgLy90aGlzLmRlc3RpbmF0aW9uID0gMDtcbiAgICAgICAgIH1cbiAgICAgICAgZWxzZSB7dGhpcy5yb2FtID0gZmFsc2V9OyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMueE9mZjIgPSAwOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tUaW1lID0gMCA7ICBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tUaHJlc2ggPSBNYXRoLmZsb29yKHRoaXMubWF4SGVhbHRoIC8gMyk7XG4gICAgICAgIHRoaXMua25vY2tiYWNrU3VtID0gMDsgIFxuICAgICAgICB0aGlzLmtub2NrYmFja1Jlc2lzdCA9IDAuM1xuICAgICAgICB0aGlzLmhpdCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IFxuICAgICAgICB0aGlzLmVtb3RlQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbW90ZVRpbWVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbW90ZVRpbWVPdXQgPSBbXTtcbiAgICAgICAgdGhpcy5wb3Npb25HcmFwaGljID0gW107IFxuICAgICAgICB0aGlzLmhpdEJ5ID0gW107IFxuICAgICAgICB0aGlzLmRhbWFnZU11bHRpID0gMTsgXG4gICAgICAgIHRoaXMubG9vdE11bHRpID0gMTtcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMuc3BlZWRNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLnBpZXJjZSA9IDE7IFxuXG4gICAgICAgIHRoaXMucHJvamVjdGlsZUFtb3VudCA9IDA7IFxuICAgICAgICB0aGlzLmNoaWxsQW1vdW50ID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uTG9hZGVkID0gZmFsc2U7IC8vbG9hZCBzcHJpdGUgXG4gICAgICAgIHRoaXMucG9pc29uVGltZSA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvbkFtb3VudCA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvblRpY2sgPSAwO1xuICAgICAgICB0aGlzLmNoaWxsID0gMDtcbiAgICAgICAgdGhpcy5hcmVhID0gMDsgXG4gICAgICAgIHRoaXMuY29sdW1uID0gMDsgXG4gICAgICAgIHRoaXMuZXhwbG9kZURhbWFnZURlYWx0ID0gMCBcbiAgICAgICAgdGhpcy5wb2lzb24gPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25TdGFjayA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvbk1heCA9IDA7IFxuXG4gICAgICAgIHRoaXMuYXR0YWNrZWQgPSBmYWxzZSA7XG4gICAgICAgIHRoaXMuYXR0YWNrU3RhcnQgPSAwO1xuICAgICAgICB0aGlzLmRlbGF5QXR0YWNrID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZmxpcCddKXt0aGlzLmZsaXAgPSB0cnVlIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2VpcmQnXSl7XG4gICAgICAgICAgICB0aGlzLndlaXJkID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLndlaXJkU3RhcnQgPSBnYW1lLmdhbWVUaW1lUmVhbDsgXG4gICAgICAgICAgICB0aGlzLndlaXJkVGltZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozMDAwKSsyMDAwO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVzdD09MSl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAyNjA7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMzk1OyAvL2JvdHRvbVxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMDtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRlc3Q9PTIpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gMjYwOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IDMwNTsgLy9taWRkbGVcbiAgICAgICAgICAgIHRoaXMubGFuZSA9IDE7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXN0PT0zKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDI2MDsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAyMTU7IC8vdG9wIFxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMjsgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGVzdD09NCl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAzNDA7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMzA1OyAvLyBtaWRkbGUgIzJcbiAgICAgICAgICAgIHRoaXMubGFuZSA9IDE7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlID09ICdyZWREcmFnb24nKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4zfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuYXJlYSArPSA2MDsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4zfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuYXJlYSArPTQwOyB0aGlzLnByb2plY3RpbGVBbW91bnQrK307XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnYmx1ZURyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLnBpZXJjZSArPSAxO31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLmNoaWxsICs9IDAuMjsgdGhpcy5waWVyY2UgKz0gMX1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmNoaWxsICs9IDAuMTsgdGhpcy5wcm9qZWN0aWxlQW1vdW50Kyt9O1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy50eXBlID09ICdncmVlbkRyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrO31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLnBvaXNvbiArPSAwLjQ7IHRoaXMuYXJlYSArPSAyMDsgdGhpcy5wb2lzb25NYXgrPTEwO31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00ICl7dGhpcy5wb2lzb24gKz0gMC40OyB0aGlzLmFyZWEgKz0gMTA7IHRoaXMucG9pc29uTWF4Kz01OyB0aGlzLnByb2plY3RpbGVBbW91bnQrK31cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnYmxhY2tEcmFnb24nKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuYXJlYSArPTE1OyB0aGlzLmNvbHVtbj0xO3RoaXMuZGFtYWdlTXVsdGkrPTAuMn1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmFyZWEgKz0xNTsgdGhpcy5wcm9qZWN0aWxlQW1vdW50Kyt9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLmV2b2x2ZSgpfSBcblxuICAgIH1cblxuXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpeyAvL2ltcG9ydCBzcHJpdGVzIFxuICAgICAgICB0aGlzLmZyYW1lcyA9IDMwOyBcbiAgICAgICAgaWYgKHRoaXMuc3ByaXRlPT0nbW9iJyl7IC8vIEVuZW15IG1vYnNcbiAgICAgICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL3N0YW5kXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzdGFuZCddLCAxMCwgXCJzdGFuZFwiKTsgLy9zdGFuZGluZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMud2FsayA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvbW92ZV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2FsayddLCAxMCwgXCJ3YWxrXCIpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmhpdCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvaGl0MV8/LnBuZycsMCwgMTAsIFwiaGl0XCIpO1xuICAgICAgICAgICAgdGhpcy5kaWUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL2RpZTFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RpZSddLCAxNSwgXCJkaWVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy53YWxrLCB0aGlzLmhpdCwgdGhpcy5kaWVdOyBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J10pe1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ncnkgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL2F0dGFjazFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J10sIDEwLCBcImF0dGFja1wiLCB0cnVlKVxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKHRoaXMuYW5ncnkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSAgICAgICAgICAgXG4gICAgICAgIGVsc2UgeyBcbiAgICAgICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSArJy9zdGFuZDFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3N0YW5kJ11bdGhpcy5mb3JtXSwgMTAsIFwic3RhbmRcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmFuZ3J5ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUgKycvYW5ncnlfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J11bdGhpcy5mb3JtXSwgMTAsIFwiYXR0YWNrXCIsIHRydWUpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy5hbmdyeV07IFxuICAgICAgICAgICAgbGV0IGVtb3RlcyA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZW1vdGUnXVt0aGlzLmZvcm1dO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8ZW1vdGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZW1vdGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSArJy8nK2Vtb3Rlc1tpXVswXSsnXz8ucG5nJywgZW1vdGVzW2ldWzFdLCAxMCwgXCJlbW90ZVwiKygxK2kpICk7IC8vZW1vdGU7IFxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKGVtb3RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtb3RlTGVuZ3RoLnB1c2goZW1vdGVzW2ldWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5hbmltYXRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBldm9sdmUoKXtcbiAgICAgICAgdGhpcy5mb3JtKys7IFxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Nwcml0ZVR5cGUnXVt0aGlzLmZvcm1dOyBcbiAgICAgICAgdGhpcy5lbW90ZUxlbmd0aCA9IFtdOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IC8vIHVwZGF0ZSBzcHJpdGVzIFxuXG4gICAgfVxuICAgIGxldmVsVXAocGxheWVyKXsgXG4gICAgICAgIGxldCBjb3N0ID0gcGxheWVyLnVwZ3JhZGVDb3N0W3RoaXMubGV2ZWwtMV07XG4gICAgICAgIGlmIChwbGF5ZXIubW9uZXk+PWNvc3Qpe1xuICAgICAgICAgICAgdGhpcy5sZXZlbCsrOyAgXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gJ0x2bC4gJyArIHRoaXMubGV2ZWw7IFxuICAgICAgICAgICAgdGhpcy52YWx1ZSArPSBjb3N0OyBcbiAgICAgICAgICAgIHBsYXllci5tb25leSAtPSBjb3N0OyBcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmV2b2x2ZSgpfSBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3JlZERyYWdvbicpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC41fVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmFyZWEgKz0gNjA7IHRoaXMuZGFtYWdlTXVsdGkrPTAuNX1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09NCl7dGhpcy5hcmVhICs9NDA7IHRoaXMucHJvamVjdGlsZUFtb3VudCsrfTtcbiAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09ICdibHVlRHJhZ29uJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLnBpZXJjZSArPSAxOyB0aGlzLmRhbWFnZU11bHRpKz0wLjJ9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTMpe3RoaXMuY2hpbGwgKz0gMC4yOyB0aGlzLnBpZXJjZSArPSAxOyB0aGlzLmRhbWFnZU11bHRpKz0wLjJ9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTQpe3RoaXMuY2hpbGwgKz0gMC4xOyB0aGlzLnByb2plY3RpbGVBbW91bnQrK307XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnZ3JlZW5EcmFnb24nKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7dGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLnBvaXNvbiArPSAwLjc7IHRoaXMuYXJlYSArPSAyNTsgdGhpcy5wb2lzb25NYXgrPTEwO31cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09NCApe3RoaXMucG9pc29uICs9IDAuNzsgdGhpcy5hcmVhICs9IDEwOyB0aGlzLnBvaXNvbk1heCs9MTA7IHRoaXMucHJvamVjdGlsZUFtb3VudCsrfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2JsYWNrRHJhZ29uJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLmRhbWFnZU11bHRpKz0wLjN9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTMpe3RoaXMuYXJlYSArPTE1OyB0aGlzLmNvbHVtbj0xO3RoaXMuZGFtYWdlTXVsdGkrPTAuM31cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09NCl7dGhpcy5hcmVhICs9MTU7IHRoaXMucHJvamVjdGlsZUFtb3VudCsrfVxuICAgICAgICB9XG4gICAgfVxuICAgICAgICAvLyBzdGF0IHVwZGF0ZXMgLmRhbWFnZU11bHRpXG4gICAgfVxuXG4gICAgZW1vdGUoZ2FtZSl7XG4gICAgICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApO1xuICAgICAgICBpZiAodGhpcy5lbW90ZUNoYW5nZSl7XG4gICAgICAgICAgICBpZiAoIWdhbWUucGxheWVyLmFsaXZlKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMuc3RhdGUgPSAnZW1vdGU1JztcbiAgICAgICAgICAgICAgICBpZihyYW5kb20+NSl7dGhpcy5zdGF0ZSA9ICdlbW90ZTUnO30gLy8gY3J5XG4gICAgICAgICAgICAgICAgZWxzZSB7dGhpcy5zdGF0ZSA9ICdlbW90ZTInO30gLy8gYmV3aWxkZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdhbWUud2F2ZUZpbmlzaCApe1xuICAgICAgICAgICAgICAgICAgICBpZihyYW5kb20+NSl7dGhpcy5zdGF0ZSA9ICdlbW90ZTMnO30gLy8gc2l0XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMuc3RhdGUgPSAnZW1vdGU0Jzt9IC8vIHNsZWVwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtb3RlVGltZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW1vdGVDaGFuZ2UgPSBmYWxzZTsgXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmICghdGhpcy5lbW90ZUNoYW5nZSAmJiAhdGhpcy5lbW90ZVRpbWVyKXsgXG4gICAgICAgICAgICB0aGlzLmVtb3RlVGltZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHt0aGlzLmVtb3RlQ2hhbmdlID0gdHJ1ZX0sIFwiNTAwMFwiKSA7fVxuXG4gICAgfVxuXG4gICAgYXR0YWNrKCl7IC8vdHJpZ2dlcnMgYXR0YWNrIHN0YXRlIFxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA8PSAwICYmIHRoaXMuaGVhbHRoPjApe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdhdHRhY2snOyBcbiAgICAgICAgfSAgICAgICAgICBcbiAgICB9XG5cbiAgICBzdW1tb25BdHRhY2soKXsgLy9zdW1tb24gYXR0YWNrcyBcbiAgICAgICAgaWYgKCAhdGhpcy5hdHRhY2tlZCl7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpPT0yKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2goIG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddW3RoaXMuZm9ybV0sIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LTUwKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdGlsZUFtb3VudD4wKXsgLy9leHRyYSBwcm9qZWN0aWxlcyBcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0xOyBpPD10aGlzLnByb2plY3RpbGVBbW91bnQ7IGkrKyl7IFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCAoKT0+IHt0aGlzLnByb2plY3RpbGVzLnB1c2goIG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddW3RoaXMuZm9ybV0sIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LTUwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMjAqaSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgIC8vIHRoaXMuYW5ncnkucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtb3RlVGltZSA9IDEwMCtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTAwKTsgLy9yZXNldCByYW5kb20gZW1vdGUgdGltZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW9iQXR0YWNrKGdhbWUpe1xuICAgICAgICBpZiAoIXRoaXMuYXR0YWNrZWQgJiYgZ2FtZS5wbGF5ZXIuYWxpdmUgJiYgdGhpcy5oZWFsdGg+MCl7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkU3ByaXRlPT0nc3R1bXB5Jyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ncnkuZ2V0RnJhbWUoKSA9PSA5KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKCBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueC00MCwgdGhpcy5wb3NpdGlvbi55KzMwKSk7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxvYWRTcHJpdGU9PSdnaG9zdFN0dW1wJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ncnkuZ2V0RnJhbWUoKSA9PSA0KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKCBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueC00MCwgdGhpcy5wb3NpdGlvbi55LTI3KSk7ICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZFNwcml0ZT09J211c2htb20nKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpID09IDcpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYW5ncnkucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnYW1lLnBsYXllci5qdW1wICYmIGdhbWUucGxheWVyLmxhbmUgPT0gdGhpcy5sYW5lICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnBsYXllci5oZWFsdGggLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUua25vY2tiYWNrKGdhbWUucGxheWVyLCAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIHBhdXNlKSB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgLy8gaWYgKHRoaXMuaGl0Ym94KXsgY3R4LmZpbGxSZWN0KHRoaXMuaGl0Ym94WzBdLHRoaXMuaGl0Ym94WzFdLCB0aGlzLmhpdGJveFsyXSwgdGhpcy5oaXRib3hbM10pO31cbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTsgXG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueC10aGlzLnJhbmdlLCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgrMip0aGlzLnJhbmdlLCB0aGlzLmhlaWdodCk7IC8vcmFuZ2VcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAwICYmIHRoaXMuZm9ybT09MSAmJiB0aGlzLnN0YXRlPT0nYXR0YWNrJyl7dGhpcy54T2ZmMiA9IC01MX0gLy9hdHRhY2sgb2Zmc2V0XG4gICAgICAgIGVsc2UgdGhpcy54T2ZmMj0wO1xuXG4gICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMCl7dGhpcy5zdGF0ZSA9ICdzdGFuZCc7IH0gXG4gICAgICAgICAgICBlbHNlIHRoaXMuc3RhdGU9J3dhbGsnO31cblxuICAgICAgICBpZiAodGhpcy5oZWFsdGg8PTAgJiYgdGhpcy5zaWRlID09MSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RpZSc7ICAvL2RlYXRoIGFuaW1hdGlvbiAgIFxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGU+MCkgdGhpcy5mYWRlIC09IDAuMDM7IC8vZmFkZSBvbiBkZWF0aCBcbiAgICAgICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmZhZGU7IFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7dGhpcy5mYWRlID0gMH0sIFwiNDUwXCIpIDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlcy5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7dGhpcy5hbGl2ZSA9IGZhbHNlfSwgXCI0NTBcIikgO30gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9ICBcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAxICYmIHRoaXMuc3RhdGUgIT0nZGllJyl7IC8vaGVhbHRoIGJhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2Jvc3MnXSlcbiAgICAgICAgICAgICAgICB7Y3R4LmZpbGxTdHlsZSA9IFwiIzJiMmIyYlwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSs3MCwgNjAsIDEyKTsgLy9lbXB0eSBib3hcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjOTkwYzAyXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCsxLCB0aGlzLnBvc2l0aW9uLnkrNzEsIE1hdGguZmxvb3IoNTgqKDEtKHRoaXMubWF4SGVhbHRoIC0gdGhpcy5oZWFsdGgpL3RoaXMubWF4SGVhbHRoKSksIDEwKTsgLy8gbGlmZSBiYXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vYm9zcyBoZWFsdGggYmFyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzJiMmIyYlwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngtNSwgdGhpcy5wb3NpdGlvbi55KzEzMSwgNjUsIDE2KTsgLy9lbXB0eSBib3hcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjOTkwYzAyXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueC00LCB0aGlzLnBvc2l0aW9uLnkrMTMyLCBNYXRoLmZsb29yKDYzKigxLSh0aGlzLm1heEhlYWx0aCAtIHRoaXMuaGVhbHRoKS90aGlzLm1heEhlYWx0aCkpLCAxNCk7IC8vZW1wdHkgYm94XG4gXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zaWRlID09IDApeyAvLyBzdW1tb24gbmFtZSBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjc7IFxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLnBvc2l0aW9uLngrMTUsIHRoaXMucG9zaXRpb24ueSt0aGlzLmhlaWdodCsxNywgMzUsIDE1LCAyKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxLjA7IFxuXG4gICAgICAgICAgICBjdHguZm9udCA9IFwiMTFweCBhcmlhbFwiXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJzsgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMubGFiZWwsIHRoaXMucG9zaXRpb24ueCszMiwgdGhpcy5wb3NpdGlvbi55K3RoaXMuaGVpZ2h0KzI3KSA7ICAgICAgICAgIFxuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyAgICAgICBcbiAgICAgICAgLy9pbWFnZSA9IGJ1ZmZlcjsgXG5cbiAgICAgICAgaWYgKCF0aGlzLmxlZnQpey8vZmxpcCBiYXNlZCBvbiBzcHJpdGUgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC10aGlzLnBvc2l0aW9uLngtdGhpcy53aWR0aCt0aGlzLnhPZmYrdGhpcy54T2ZmMiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZiApO31cbiAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54K3RoaXMueE9mZit0aGlzLnhPZmYyLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy55T2ZmKTsgfVxuICAgIFxuICAgICAgICBpZiAodGhpcy5jaGlsbEFtb3VudD4wKXtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyAvLyBJbWFnZSB0aW50aW5nXG4gICAgICAgICAgICBidWZmZXIud2lkdGggPSAyMDA7Ly9pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIGJ1ZmZlci5oZWlnaHQgPSA0MDA7Ly9pbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBidHggPSBidWZmZXIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGJ0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsMCk7XG4gICAgICAgICAgICBidHguZmlsbFN0eWxlID0gXCIjMmM2OGRjXCI7XG4gICAgICAgICAgICBidHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ211bHRpcGx5JztcbiAgICAgICAgICAgIGJ0eC5maWxsUmVjdCgwLDAsYnVmZmVyLndpZHRoLCBidWZmZXIuaGVpZ2h0KTtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxBbHBoYSA9IDAuODtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLWluXCI7XG4gICAgICAgICAgICBidHguZHJhd0ltYWdlKGltYWdlLDAsMCk7IFxuXG4gICAgICAgICAgICBpZiAoIXRoaXMubGVmdCl7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXIsIC10aGlzLnBvc2l0aW9uLngtdGhpcy53aWR0aCt0aGlzLnhPZmYsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYpfVxuICAgICAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShidWZmZXIsIHRoaXMucG9zaXRpb24ueCt0aGlzLnhPZmYsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYpfVxuICAgICAgICB9XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApOyBcblxuICAgICAgICBpZiAodGhpcy5wb2lzb25BbW91bnQ+MCAmJiB0aGlzLmhlYWx0aD4wKXtcbiAgICAgICAgICAgIGlmICghdGhpcy5wb2lzb25Mb2FkZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMucG9pc29uR3JhcGhpYyA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ3BvaXNvbkVmZmVjdC9wb2lzb24/LnBuZycsIDQsIDEwLCBcInBvaXNvblwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaXNvbkxvYWRlZCA9IHRydWU7IH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9pc29uU3ByaXRlSW1hZ2UgPSB0aGlzLnBvaXNvbkdyYXBoaWMuZ2V0SW1hZ2UocGF1c2UpOyBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYm9zcykge2N0eC5kcmF3SW1hZ2UocG9pc29uU3ByaXRlSW1hZ2UsdGhpcy5wb3NpdGlvbi54LTEwLHRoaXMucG9zaXRpb24ueS10aGlzLmhlaWdodCs3NSl9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgY3R4LmRyYXdJbWFnZShwb2lzb25TcHJpdGVJbWFnZSx0aGlzLnBvc2l0aW9uLngtMTAsdGhpcy5wb3NpdGlvbi55LXRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSAgIFxuICAgIFxuICAgIGRyYXdQcm9qKGN0eCwgcGF1c2Upe1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4LCBwYXVzZSkgKSAvL2RyYXcgcHJvamVjdGlsZXMgXG4gICAgICAgIH0gICAgXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIHVwZGF0ZShnYW1lKXtcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PT0gMSl7ICAvLyBNb2IgXG4gICAgICAgICAgICBpZiAodGhpcy5oZWFsdGg+MCl7ICAgICBcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGxEaXJlY3QgPSAxOyAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRYPDApKGNoaWxsRGlyZWN0PSAtMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFgtdGhpcy5jaGlsbEFtb3VudCpjaGlsbERpcmVjdD49MC40KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT0nYXR0YWNrJykgdGhpcy5zdGF0ZSA9ICd3YWxrJzsgLy9jYW5jZWxzIGF0dGFjayBcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmF0dGFja0NEPjApIHRoaXMuc3RhdGUgPT0gJ2hpdCc7IFxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5zdGF0ZSA9ICd3YWxrJztcblxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLnBvc2l0aW9uLng8LXRoaXMud2lkdGgqMikge3RoaXMucG9zaXRpb24ueCA9IC10aGlzLndpZHRoKjJ9OyAvL2xlZnQgYm9yZGVyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoKSB7dGhpcy5wb3NpdGlvbi54ID0gdGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aDt9IC8vcmlnaHQgYm9yZGVyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2VpcmQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwtdGhpcy53ZWlyZFN0YXJ0PiB0aGlzLndlaXJkVGltZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlaXJkU3RhcnQgPSBnYW1lLmdhbWVUaW1lUmVhbDsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlaXJkVGltZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyMDAwKSs1MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkWCAgPSAtdGhpcy5zcGVlZFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFg+MCkge3RoaXMud2VpcmRUaW1lKz03MDB9OyAvL2JpYXMgbW92aW5nIGZvcndhcmRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFg8MCAmJiB0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgpIHRoaXMuc3BlZWRYID0gYWJzKHRoaXMuc3BlZWRYKTsgXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJvYW0gPSB0cnVlOyBcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJvYW1UaW1lID0gNTAwMDtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJvYW1ZID0gdGhpcy5sYW5lKmdhbWUucm93SGVpZ2h0OyBcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJvYW1MaW1pdHMgPSBbMCwgZ2FtZS5yb3dIZWlnaHQsIGdhbWUucm93SGVpZ2h0KjJdOyAvLzAsMSwyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IDA7XG4gICAgICAgICAgICAvLyAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9hbSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9hbVRpbWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9hbVRpbWUgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpOyAvL3JhbmRvbSAwLDEsMlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtVGltZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyNTApKzEwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BlZWRZID0gMzsvL1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFgtdGhpcy5jaGlsbEFtb3VudCpjaGlsbERpcmVjdDw9MSkge3NwZWVkWT0xfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KmNoaWxsRGlyZWN0PD0yKSB7c3BlZWRZPTJ9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtWT4gdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSs9c3BlZWRZIDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9hbVktPXNwZWVkWSA7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yb2FtWTx0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55LT1zcGVlZFkgO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtWSs9c3BlZWRZO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9hbVkrMj4gdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dICYmIHRoaXMucm9hbVktMjx0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09ICh0aGlzLnJvYW1ZLXRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtWSA9IHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvYW1ZID09IHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhbmUgPSB0aGlzLnJvYW1MaW1pdHMuaW5kZXhPZih0aGlzLnJvYW1ZKX07IC8vdXBkYXRlIGxhbmUgZHVyaW5nIG1vdmVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvaXNvblRpbWU+MCl7IC8vL1BPSVNPTlxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwtdGhpcy5wb2lzb25UaWNrPj0xMDAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gdGhpcy5wb2lzb25BbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgIGdhbWUucG9pc29uRGFtYWdlICs9IHRoaXMucG9pc29uQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaXNvblRpbWUgLT0gMTsgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaXNvblRpY2sgPSBnYW1lLmdhbWVUaW1lUmVhbDsgLy91cGRhdGUgdGljayB0aW1lIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMucG9pc29uVGltZSA9PSAwKXt0aGlzLnBvaXNvbkFtb3VudCA9IDA7ICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2lzb25TdGFjayA9IDA7IH0vL2Ryb3AgcG9pc29uIHN0YWNrc1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsbEFtb3VudD4wKXt0aGlzLmNoaWxsQW1vdW50LT0wLjAwNX0gLy9DSElMTCBcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNoaWxsQW1vdW50PDApe3RoaXMuY2hpbGxBbW91bnQ9MH07XG5cbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwtdGhpcy5rbm9ja2JhY2tUaW1lID4xMDAwKXt0aGlzLmtub2NrYmFja0ZvcmNlPTB9IC8vbWF4IDJzXG5cbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5rbm9ja2JhY2tGb3JjZSk+MCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2hpdCdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rbm9ja2JhY2tSZXNpc3QrPTAuMDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLmtub2NrYmFja0ZvcmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZT4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua25vY2tiYWNrRm9yY2UtPXRoaXMua25vY2tiYWNrUmVzaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aCs1MCl7dGhpcy5wb3NpdGlvbi54PXRoaXMuZ2FtZVdpZHRoKzUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U8MCkgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gLy9iYWNrd2FyZHNcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZTwwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua25vY2tiYWNrRm9yY2UrPXRoaXMua25vY2tiYWNrUmVzaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U+MCkgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDBcbiAgICAgICAgICAgICAgICAgICAgfTsgLy9mb3J3YXJkcyBcblxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT0nYXR0YWNrJyl7dGhpcy5wb3NpdGlvbi54IC09ICh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KmNoaWxsRGlyZWN0KX1cbiAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09IHRoaXMuc3BlZWRZOyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFk+MCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRZLT0wLjU7IFxuICAgICAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmp1bXApeyAvL2dyYXZpdHlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IDEqdGhpcy5ncmF2aXR5VGltZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5VGltZSs9MC41OyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMucG9zaXRpb24ueSA+IHRoaXMuZ2FtZUhlaWdodC0xMTAgKXsgLy9ib3R0b20gYm9yZGVyICh1cGRhdGUgZm9yIHBsYXRmb3JtcylcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5nYW1lSGVpZ2h0LTExMDtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJztcbiAgICAgICAgICAgICAgICAvLyB9IFxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlPT0nc3RhbmQnKXsgICAvL2Vtb3RlcyBmb3Igc3VtbW9uc1xuICAgICAgICAgICAgaWYgKHRoaXMuZW1vdGVUaW1lID09IDAgKXtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKTsgLy8xOiBzbGVlcCwgMjogaWdub3JlXG4gICAgICAgICAgICAgICAgbGV0IHRpbWUgPSAwOyBcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tIDw1KXt0aGlzLnN0YXRlID0gJ2Vtb3RlMSc7IHRpbWUgPSB0aGlzLmVtb3RlTGVuZ3RoWzBdO31cbiAgICAgICAgICAgICAgICBlbHNlIHt0aGlzLnN0YXRlID0gJ2Vtb3RlNic7dGltZSA9IHRoaXMuZW1vdGVMZW5ndGhbNV0gfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmVtb3RlVGltZU91dCA9IHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lID0gNjAwK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1MDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJ30sIHRpbWUpIDsvL2hvdyBsb25nIHRvIHJ1biBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAvLyBpZiAoZ2FtZS5wYXVzZSl7Y2xlYXJUaW1lb3V0KHRoaXMuZW1vdGVUaW1lT3V0KX07IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB0aGlzLmVtb3RlVGltZS0tOyBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKCkgKTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSB0aGlzLnByb2plY3RpbGVzLmZpbHRlciggIC8vZGVsZXRlcyBwcm9qZWN0aWxlc1xuICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC5kZWxldGUgIT09IHRydWU7IFxuICAgICAgICB9KTtcbiAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RpbGVzKTsgXG4gICAgIFxuXG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEID4wKXt0aGlzLmF0dGFja0NELS19XG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEPT0wKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRhY2tlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ncnkucmVzZXQoKTsgXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngrdGhpcy53aWR0aDIvMiwgdGhpcy5wb3NpdGlvbi55K3RoaXMuaGVpZ2h0MiwgXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aC10aGlzLndpZHRoMiwgdGhpcy5oZWlnaHRdOyBcbiAgICAgICAgXG5cblxuXG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmV5e1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIG9iaiwgdmFsdWUsIHNwZWVkWCA9IDApe1xuICAgICAgICB0aGlzLnlPZmYgPSAwIDtcbiAgICAgICAgaWYgKG9iai5ib3NzKXsgdGhpcy55T2ZmICs9NzB9XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogKG9iai5wb3NpdGlvbi54KStvYmoud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiBvYmoucG9zaXRpb24ueSs0MCt0aGlzLnlPZmZ9XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+Z2FtZS5nYW1lV2lkdGgtMTApe3RoaXMucG9zaXRpb24ueCA9IGdhbWUuZ2FtZVdpZHRoLTMwO30gLy9raWxsaW5nIG9mZi1zY3JlZW4gKHJpZ2h0KVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBvc2l0aW9uLng8MTApe3RoaXMucG9zaXRpb24ueD0zMH07XG4gICAgICAgIHRoaXMud2lkdGggPSAzNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAzNTsgXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTsgXG4gICAgICAgIHRoaXMuc3Bhd25UaW1lID0gIGdhbWUuZ2FtZVRpbWVSZWFsOyBcbiAgICAgICAgdGhpcy5wb3BVcCA9IDI1OyBcbiAgICAgICAgdGhpcy5kcm9wRG93biA9IDIzO1xuICAgICAgICB0aGlzLnNwZWVkWCA9IHNwZWVkWDsgXG4gICAgICAgIHRoaXMuc3BlZWRZID0gMTsgXG4gICAgICAgIHRoaXMuYWNjZWxVcCA9IDA7XG4gICAgICAgIHRoaXMuYWNjZWxEb3duID0gMDtcbiAgICAgICAgdGhpcy5kZWxldGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mYWRlID0gMTsgXG4gICAgICAgIHRoaXMuc3RhcnRGYWRlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmZsb2F0ID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmxvc3QgPSBmYWxzZTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmZyYW1lID0gMCBcbiAgICAgICAgdGhpcy50aW1lckNvdW50ID0gMDsgXG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnktMjUsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG4gICAgICAgIGlmICh0aGlzLnZhbHVlPj0xMDApe3RoaXMudHlwZSA9IDQ7fSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZT49NTApe3RoaXMudHlwZSA9IDM7fSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZT49MTApe3RoaXMudHlwZSA9IDI7fSBcbiAgICAgICAgZWxzZSB0aGlzLnR5cGUgPSAxOyBcbiAgICAgICAgLy90aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKTsgXG4gICAgfVxuICAgIFxuICAgIC8vIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAvLyAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ2NvaW4vQ29pbicrdGhpcy50eXBlKydfPy5wbmcnLCAzLCA2LCBcInN0YW5kXCIpO1xuICAgIC8vICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZF1cbiAgICAvLyB9XG5cbiAgICBkcmF3KGN0eCwgZ2FtZSkge1xuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBpZiAodGhpcy5zdGFydEZhZGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZsb2F0KXt0aGlzLmZhZGUgLT0gMC4wMTU7fSAvL3Nsb3dlciBmYWRlIHdoZW4gcGlja3VwXG4gICAgICAgICAgICBlbHNlIHRoaXMuZmFkZSAtPSAwLjAzO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5mYWRlOyBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpPT57dGhpcy5kZWxldGUgPSB0cnVlfSwgXCI1MDBcIik7IFxuXG4gICAgICAgIH0gXG4gICAgICAgIC8vZ2FtZS5jb2luU3ByaXRlc1t0aGlzLnR5cGVdIFxuXG4gICAgICAgLy8gY29uc3QgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcignc3RhbmQnKSk7IFxuICAgICAgIC8vIGNvbnN0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgXG4gICAgICAgZ2FtZS5jb2luU3ByaXRlc1t0aGlzLnR5cGUtMV0ubW92ZUZyYW1lKHRoaXMsIGdhbWUucGF1c2UpOyBcbiAgICAgICBjb25zdCBpbWFnZSA9IGdhbWUuY29pblNwcml0ZXNbdGhpcy50eXBlLTFdLmltYWdlYnlGcmFtZSh0aGlzLmZyYW1lKTtcbiAgICAgICBcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuXG5cbiAgICAgICAgXG5cblxuICAgIH1cblxuICAgIHVwZGF0ZShnYW1lKXtcbiAgICAgICAgaWYgKHRoaXMucG9wVXA+MCl7XG4gICAgICAgICAgICB0aGlzLmFjY2VsVXArPTAuMTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSAoNC41LXRoaXMuYWNjZWxVcCk7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54IC09dGhpcy5zcGVlZFg7IFxuICAgICAgICAgICAgdGhpcy5wb3BVcCAtPSAxOyBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyb3BEb3duPjApe1xuICAgICAgICAgICAgdGhpcy5hY2NlbERvd24rPTAuMTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSAoMit0aGlzLmFjY2VsRG93bik7XG4gICAgICAgICAgICB0aGlzLmRyb3BEb3duIC09IDE7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54IC09dGhpcy5zcGVlZFg7IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZsb2F0KXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueS09MTsgXG4gICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIucG9zaXRpb24ueCtnYW1lLnBsYXllci53aWR0aDx0aGlzLnBvc2l0aW9uLngpe3RoaXMucG9zaXRpb24ueC09MC44ICB9XG4gICAgICAgICAgICBlbHNlIGlmIChnYW1lLnBsYXllci5wb3NpdGlvbi54PnRoaXMucG9zaXRpb24ueCkgdGhpcy5wb3NpdGlvbi54Kz0wLjg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwtdGhpcy5zcGF3blRpbWU+PTIwMDAwKXsgLy8yMCBzIGZhZGUgc3RhcnRcbiAgICAgICAgICAgIHRoaXMuc3RhcnRGYWRlPXRydWU7IFxuICAgICAgICAgICAgdGhpcy5sb3N0ID0gdHJ1ZTsgXG4gICAgICAgICAgICBcbiAgICAgICAgfSBcblxuXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG4gICAgfVxuXG4gICAgXG59XG4iLCJpbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnOyBcbmltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gNDA7IC8vc3ByaXRlIHNpemUgXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gODA7IFxuICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgIHg6IHRoaXMud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtIDIqZ2FtZS5yb3dIZWlnaHQsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbGF5ZXJYID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yICsxODsgXG4gICAgICAgIHRoaXMuZWxlUG9zaXRpb25zID0gWyBbdGhpcy5wbGF5ZXJYIC02MCwgdGhpcy5wb3NpdGlvbi55XSwgW3RoaXMucGxheWVyWCAtNDAsIHRoaXMucG9zaXRpb24ueS00MF0sXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICwgdGhpcy5wb3NpdGlvbi55LTU1XSwgW3RoaXMucGxheWVyWCArNDAsIHRoaXMucG9zaXRpb24ueS00MF0sIFxuICAgICAgICAgICAgW3RoaXMucGxheWVyWCArNjAsIHRoaXMucG9zaXRpb24ueV0gXTtcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBnYW1lLnJvd0hlaWdodDtcbiAgICAgICAgdGhpcy5sYW5lID0gMTsgXG4gICAgICAgIHRoaXMuZmxvb3IgPSAgdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAoMSt0aGlzLmxhbmUpKnRoaXMucm93SGVpZ2h0XG4gICAgICAgIHRoaXMuc3BlZWQgPSAzLjU7XG4gICAgICAgIHRoaXMua25vY2tiYWNrRm9yY2UgPSAwOyBcbiAgICAgICAgdGhpcy5sZWZ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2lkZSA9MDtcbiAgICAgICAgdGhpcy5zcGVlZFggPSAwO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7IFxuICAgICAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgICAgIHRoaXMubmFtZSA9ICdXaXonO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDUwOyBcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxOyBcbiAgICAgICAgdGhpcy5kYW1hZ2VEZWFsdCA9IDA7IFxuICAgICAgICB0aGlzLmludnVsblRpbWUgPSAgMDsgXG4gICAgICAgIHRoaXMuaW52dWxuRGFyayA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5pbnZ1bG5EYXJrVGltZSA9IDA7XG4gICAgICAgIHRoaXMua25vY2tiYWNrVGhyZXNoID0gMTsgXG4gICAgICAgIHRoaXMua25vY2tiYWNrU3VtID0gMFxuICAgICAgICB0aGlzLmFybW9yID0gMDsgXG4gICAgICAgIHRoaXMudG91Y2hIaXQgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuYXR0YWNrU3BlZWQgPSAzNTsgXG4gICAgICAgIHRoaXMuYXR0YWNrQ0QgPSAwOyBcbiAgICAgICAgdGhpcy5hbGl2ZSA9IHRydWU7IFxuICAgICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJzsgXG4gICAgICAgIHRoaXMuY3VyVGlsZSA9IDA7XG4gICAgICAgIHRoaXMuZWxlbWVudExpc3Q9IFtdOyAvL2FkZCBzcHJpdGVzIGhlcmUgXG4gICAgICAgIC8vIHRoaXMuZWxlbWVudExpc3QgPSBbJ0JsYXplJywnRGF3bicsJ05pZ2h0JywnVGh1bmRlcicsJ1dpbmQnXTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlcyA9IHt9O1xuICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGUgPSB7fSA7IFxuICAgICAgICB0aGlzLmVsZW1lbnRJbmZvID0geyAnQmxhemUnOiB7J3N0YW5kJzo3LCAnbW92ZSc6IDcsICdhdHRhY2snOiA4LCAncHJvaic6J3JlZEJhbGwnIH0sXG4gICAgICAgICAgICAnRGF3bic6IHsnc3RhbmQnOiA3LCAnbW92ZSc6NywgJ2F0dGFjayc6IDgsICdwcm9qJzoneWVsbG93QmFsbCd9LFxuICAgICAgICAgICAgJ05pZ2h0JzogeydzdGFuZCc6NywgJ21vdmUnOjcsICdhdHRhY2snOiA4LCAncHJvaic6J3B1cnBsZUJhbGwnfSxcbiAgICAgICAgICAgICdUaHVuZGVyJzogeydzdGFuZCc6IDcsICdtb3ZlJzo3LCAnYXR0YWNrJzogOCwgJ3Byb2onOidncmVlbkJhbGwnLH0sIFxuICAgICAgICAgICAgJ1dpbmQnOiB7J3N0YW5kJzogNywgJ21vdmUnOjcsICdhdHRhY2snOiA4LCAncHJvaic6J2JsdWVCYWxsJyx9IH1cbiAgICAgICAgdGhpcy5lbGVtZW50U3RhdGUgPSBbJ3N0YW5kJywnc3RhbmQnLCdzdGFuZCcsJ3N0YW5kJywnc3RhbmQnXTsgXG4gICAgICAgIHRoaXMucmVjYWxsTGlzdCA9IFsncmVkRHJhZ29uMCcsICdyZWREcmFnb24xJywgJ2JsdWVEcmFnb24wJywgJ2JsdWVEcmFnb24xJywgXG4gICAgICAgICdncmVlbkRyYWdvbjAnLCdncmVlbkRyYWdvbjEnLCdibGFja0RyYWdvbjAnLCAnYmxhY2tEcmFnb24xJ10gO1xuICAgICAgICB0aGlzLnJlY2FsbEltYWdlcyA9e307XG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyBcbiAgICAgICAgdGhpcy5lbGVtZW50YWxzKCk7XG5cbiAgICAgICAgdGhpcy5zdW1tb25Db3VudCA9IDA7IFxuICAgICAgICB0aGlzLm1vbmV5ID0gNTA7ICAvLzUwXG4gICAgICAgIGlmIChnYW1lLmxldmVsID09IDIpIHt0aGlzLm1vbmV5ID0gMTIwMH0gLy9zdGFydGluZyBtb25leSBiYXNlZCBvbiBsZXZlbDtcbiAgICAgICAgZWxzZSBpZiAoZ2FtZS5sZXZlbCA9PSAzKSB7dGhpcy5tb25leSA9IDUwMDB9XG4gICAgICAgIHRoaXMuc3VtbW9uQ29zdCA9IFs1MCwgMTAwLCAxNTAsIDIwMCwgNjQwXTtcbiAgICAgICAgdGhpcy51cGdyYWRlQ29zdCA9IFsyMDAsIDQwMCwgODAwLCAxNjAwLCAzMjAwXTsgXG4gICAgICAgIHRoaXMuZWxlbWVudENvc3QgPSBbMTUwLCA1MDAsIDEwMDAsIDE1MDAsIDMwMDBdOyBcblxuICAgICAgICB0aGlzLmRhbWFnZVRha2VuID0gMDsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmZsb2F0ID0gMjA7XG4gICAgICAgIHRoaXMuZmxvYXREaXJlY3QgPSAxOyBcbiAgICAgICAgdGhpcy5ncmF2ZVNwYXduID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3JhdmVYID0gMCA7XG4gICAgICAgIHRoaXMuZ3JhdmVZID0gLTIwOyBcbiAgICAgICAgdGhpcy5ncmF2ZVN0YXRlID0gJ21vdmUnXG4gICAgICAgIC8vdXBncmFkZXNcbiAgICAgICAgdGhpcy5kYW1hZ2VNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLmxvb3RNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMua25vY2tiYWNrTXVsdGkgPSAxO1xuICAgICAgICB0aGlzLnNwZWVkTXVsdGkgPSAxOyBcbiAgICAgICAgdGhpcy5waWVyY2UgPSAxOyBcblxuICAgICAgICB0aGlzLmNoaWxsID0gMDtcbiAgICAgICAgdGhpcy5hcmVhID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uID0gMjsgXG4gICAgICAgIHRoaXMuZXhwbG9kZURhbWFnZURlYWx0ID0gMCBcblxuXG5cbiAgICB9XG4gICAgZWxlbWVudGFscygpeyBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5lbGVtZW50TGlzdC5sZW5ndGg7IGkrKyl7IC8vIExvYWQgZWxlbWVudGFsIHNwcml0ZXMgXG4gICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudFNwcml0ZXNbdGhpcy5lbGVtZW50TGlzdFtpXV0pe1xuICAgICAgICAgICAgICAgIGxldCBlbGVUeXBlID0gdGhpcy5lbGVtZW50TGlzdFtpXTsgXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFuZEVsZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oZWxlVHlwZStcIi9zdGFuZF8/LnBuZ1wiLCB0aGlzLmVsZW1lbnRJbmZvW2VsZVR5cGVdWydzdGFuZCddLCA2LCBcInN0YW5kXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUVsZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oZWxlVHlwZStcIi9tb3ZlXz8ucG5nXCIsIHRoaXMuZWxlbWVudEluZm9bZWxlVHlwZV1bJ21vdmUnXSwgNiwgXCJ3YWxrXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrRWxlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihlbGVUeXBlK1wiL2F0dGFjazFfPy5wbmdcIiwgdGhpcy5lbGVtZW50SW5mb1tlbGVUeXBlXVsnYXR0YWNrJ10sIDYsIFwic3dpbmcxXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZXNbZWxlVHlwZV0gPSBbdGhpcy5zdGFuZEVsZSwgdGhpcy5tb3ZlRWxlLCB0aGlzLmF0dGFja0VsZV07IFxuICAgICAgICAgICAgICAgIC8veydzdGFuZCc6IHRoaXMuc3RhbmRFbGUsICdtb3ZlJzogdGhpcy5tb3ZlRWxlLCAnYXR0YWNrJzogdGhpcy5hdHRhY2tFbGV9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVBbmltYXRpb25zKCl7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gMTU7IFxuICAgICAgICB0aGlzLnN0YW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9hbGVydF8/LnBuZ1wiLCAzLCB0aGlzLmZyYW1lcywgXCJzdGFuZFwiKTsgLy9jb21iYXQgc3ByaXRlczsgXG4gICAgICAgIHRoaXMud2FsayA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvd2FsazFfPy5wbmdcIiwgMywgMTAsIFwid2Fsa1wiKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLmp1bXAgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2p1bXBfPy5wbmdcIiwgMSwgMTAsIFwianVtcFwiKTsgLy9qdW1wIHNwcml0ZXM7XG4gICAgICAgIHRoaXMucmVsYXggPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3N0YW5kMV8/LnBuZ1wiLCAzLCAzMCwgXCJyZWxheFwiKTsgLy8gaWRsZSBwb3NlIFxuICAgICAgICB0aGlzLmNhc3QgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2FsZXJ0Xz8ucG5nXCIsIDMsIDEwLCBcInN0YW5kXCIpOyBcbiAgICAgICAgdGhpcy5zd2luZzEgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3N3aW5nTzFfPy5wbmdcIiwgMywgMTIsIFwic3dpbmcxXCIsIHRydWUpOyAvL2F0dGFjayBzcHJpdGVzO1xuICAgICAgICB0aGlzLnN3aW5nMiA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPMl8/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzJcIiwgdHJ1ZSk7IFxuICAgICAgICB0aGlzLnN3aW5nMyA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPM18/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzNcIiwgdHJ1ZSk7IFxuICAgICAgICB0aGlzLmRlYWQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2RlYWRfPy5wbmdcIiwgMywgMjAwLCBcImRlYWRcIik7IFxuICAgICAgICB0aGlzLmF0dGFja0FuaW0gPSBbJ3N3aW5nMScsICdzd2luZzInLCAnc3dpbmczJ107IFxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy53YWxrLCB0aGlzLmp1bXAsIHRoaXMuc3dpbmcxLCB0aGlzLnN3aW5nMiwgdGhpcy5zd2luZzMsIHRoaXMuY2FzdCwgdGhpcy5kZWFkLCB0aGlzLnJlbGF4IF07IFxuICAgICAgICB0aGlzLmdyYXZlTW92ZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJncmF2ZS9tb3ZlXz8ucG5nXCIsIDAsIDMwMCwgXCJtb3ZlXCIpOyBcbiAgICAgICAgdGhpcy5ncmF2ZUxhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwiZ3JhdmUvc3RhbmRfPy5wbmdcIiwgNSwgMTIsIFwibGFuZFwiLCB0cnVlICk7IFxuICAgICAgICB0aGlzLmdyYXZlQW5pbWF0aW9ucyA9IFt0aGlzLmdyYXZlTW92ZSwgdGhpcy5ncmF2ZUxhbmRdO1xuXG4gICAgICAgIC8vIHRoaXMucmVjYWxsSW1hZ2VzID0gWydyZWREcmFnb24wJywgJ3JlZERyYWdvbjEnLCAnYmx1ZURyYWdvbjAnLCAnYmx1ZURyYWdvbjEnLCBcbiAgICAgICAgLy8gJ2dyZWVuRHJhZ29uMCcsJ2dyZWVuRHJhZ29uMScsJ2JsYWNrRHJhZ29uMCcsICdibGFja0RyYWdvbjEnXSA7XG4gICAgICAgIGZvciAobGV0IGkgPTA7aTx0aGlzLnJlY2FsbExpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgID0gbmV3IEltYWdlKCk7IFxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJ2ltYWdlcy9yZWNhbGwvJyt0aGlzLnJlY2FsbExpc3RbaV0rJy5wbmcnOyBcbiAgICAgICAgICAgIHRoaXMucmVjYWxsSW1hZ2VzW3RoaXMucmVjYWxsTGlzdFtpXV0gPSBpbWFnZTsgXG4gICAgICAgIH1cbiAgICAgICAgXG5cblxuICAgIH1cbiAgICBlbW90ZShnYW1lKXtcbiAgICAgICAgaWYgKGdhbWUud2F2ZUZpbmlzaCl7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSdzdGFuZCcpe3RoaXMuc3RhdGUgPSAncmVsYXgnO30gXG4gICAgfX0gXG5cbiAgICBhdHRhY2socGF1c2Upe1xuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA8PSAwICYmIHRoaXMuYWxpdmUgJiYgIXBhdXNlICl7XG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMucG9zaXRpb24ueC0yNTsgXG4gICAgICAgICAgICBpZiAodGhpcy5sZWZ0KXt4ICs9NTA7fVxuICAgICAgICAgICAgdGhpcy5wcm9qID0gbmV3IFByb2plY3RpbGUodGhpcywgJ2xpZ2h0bmluZ2JhbGwnLHgsIHRoaXMucG9zaXRpb24ueSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuYXR0YWNrQW5pbS5zaGlmdCgpOyBcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrQW5pbS5wdXNoKHRoaXMuc3RhdGUpOyBcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpLnJlc2V0KCk7IFxuICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKTtcbiAgICAgICAgICAgIC8vc2V0VGltZW91dCgoKT0+IHt0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKX0sIFwiMjAwXCIpOyAvL3NsaWdodCBkZWxheSBmb3IgYW5pbWF0aW9uXG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMuZWxlUG9zaXRpb25zW2ldWzBdOy8vZmFjaW5nIGxlZnRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWZ0KXt4ICs9MjB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvaiA9IG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMuZWxlbWVudEluZm9bdGhpcy5lbGVtZW50TGlzdFtpXV1bJ3Byb2onXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHgsIHRoaXMuZWxlUG9zaXRpb25zW2ldWzFdKzE4ICk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKHRoaXMucHJvaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNhbGxJY29uKGN0eCwgZ2FtZSl7XG4gICAgICAgIGlmIChnYW1lLnJlY2FsbFN0b3JhZ2Upe1xuICAgICAgICAgICAgbGV0IGltYWdlVHlwZSA9IGdhbWUucmVjYWxsU3RvcmFnZS50eXBlICsgZ2FtZS5yZWNhbGxTdG9yYWdlLmZvcm07XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMucmVjYWxsSW1hZ2VzW2ltYWdlVHlwZV0sIHRoaXMucG9zaXRpb24ueCsyMiwgdGhpcy5wb3NpdGlvbi55LTUpOyBcblxuICAgICAgICAgIC8vICB0aGlzLnJlY2FsbEltYWdlc1tnYW1lLnJlY2FsbFN0b3JhZ2UudHlwZV1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHN1bW1vbkF0dGFjaygpe307IFxuICAgIGRyYXcoY3R4LCBwYXVzZSl7XG4gICAgICAgIGxldCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuc3RhdGUpKVxuICAgICAgICBsZXQgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyAgIC8vZ2V0IHNwcml0ZVxuXG4gICAgICAgIC8vIGlmICh0aGlzLmludnVsblRpbWUlND49MSAmJiB0aGlzLmludnVsblRpbWU+MCAmJiB0aGlzLmFsaXZlKSB7Y3R4Lmdsb2JhbEFscGhhID0gMC4yfTtcbiAgICAgICAgLy9pZiAodGhpcy5oaXRib3gpeyBjdHguZmlsbFJlY3QodGhpcy5oaXRib3hbMF0sdGhpcy5oaXRib3hbMV0sIHRoaXMuaGl0Ym94WzJdLCB0aGlzLmhpdGJveFszXSk7fVxuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLmN1clRpbGUqODAsIHRoaXMucG9zaXRpb24ueSwgODAsIDgwKTsgLy9zZWxlY3RlZCB0aWxlXG4gICAgICAgIC8vIGN0eC5maWxsUmVjdCh0aGlzLmhpdGJveFswXS0oNzUqKC0xK3RoaXMubG9vdE11bHRpKSksIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgODApOyAvL2xvb3QgcmFuZ2VcbiAgICAgICAgLy8gY3R4LmZpbGxSZWN0KHRoaXMuaGl0Ym94WzBdLCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgrNzUqKC0xK3RoaXMubG9vdE11bHRpKSwgODApOyAvL2xvb3QgcmFuZ2VcblxuICAgICAgICBpZiAodGhpcy5sZWZ0KXtcbiAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC10aGlzLnBvc2l0aW9uLngtMS41KnRoaXMud2lkdGgtMTUsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54LTUsIHRoaXMucG9zaXRpb24ueSk7IH1cbiAgICAgICAgXG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApO1xuXG4gICAgICAgIGlmICh0aGlzLmludnVsbkRhcmsgJiYgdGhpcy5hbGl2ZSl7XG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgLy8gSW1hZ2UgdGludGluZ1xuICAgICAgICAgICAgYnVmZmVyLndpZHRoID0gMjAwOy8vaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICBidWZmZXIuaGVpZ2h0ID0gMjAwOy8vaW1hZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgYnR4ID0gYnVmZmVyLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICBidHguZHJhd0ltYWdlKGltYWdlLCAwLDApO1xuICAgICAgICAgICAgYnR4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICAgICAgYnR4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdtdWx0aXBseSc7XG4gICAgICAgICAgICBidHguZmlsbFJlY3QoMCwwLGJ1ZmZlci53aWR0aCwgYnVmZmVyLmhlaWdodCk7XG4gICAgICAgICAgICBidHguZ2xvYmFsQWxwaGEgPSAwLjY7XG4gICAgICAgICAgICBidHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1pblwiO1xuICAgICAgICAgICAgYnR4LmRyYXdJbWFnZShpbWFnZSwwLDApOyBcblxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdCl7XG4gICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyLCAtdGhpcy5wb3NpdGlvbi54LTEuNSp0aGlzLndpZHRoLTEwLCB0aGlzLnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShidWZmZXIsIHRoaXMucG9zaXRpb24ueC01LCB0aGlzLnBvc2l0aW9uLnkpOyB9XG4gICAgICAgIH1cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcblxuICAgICAgICBcbiAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpeyAvL3Jlc2V0cyBcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnO30gXG5cbiAgICAgICAgLy9lbGVtZW50YWxzIFxuICAgICAgICB0aGlzLnBsYXllclggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLndpZHRoLzIgKzE4OyBcbiAgICAgICAgdGhpcy5lbGVQb3NpdGlvbnMgPSBbIFt0aGlzLnBsYXllclggLTYwLCB0aGlzLnBvc2l0aW9uLnkrNV0sIFt0aGlzLnBsYXllclggLTQwLCB0aGlzLnBvc2l0aW9uLnktMzVdLFxuICAgICAgICAgICAgW3RoaXMucGxheWVyWCAsIHRoaXMucG9zaXRpb24ueS01NV0sIFt0aGlzLnBsYXllclggKzQwLCB0aGlzLnBvc2l0aW9uLnktMzVdLCBbdGhpcy5wbGF5ZXJYICs2MCwgdGhpcy5wb3NpdGlvbi55KzVdIF07XG4gICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5lbGVtZW50TGlzdC5sZW5ndGg7IGkrKyl7IC8vIExvYWQgZWxlbWVudGFsIHNwcml0ZXMgXG4gICAgICAgICAgICAgICAgbGV0IGVsZVR5cGUgPSB0aGlzLmVsZW1lbnRMaXN0W2ldOyBcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudExvYWRlZFNwcml0ZVtlbGVUeXBlXSl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLmVsZW1lbnRTdGF0ZVtpXSA9ICdzdGFuZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudFN0YXRlW2ldID0gJ3N0YW5kJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09ICdzd2luZzInIHx8dGhpcy5zdGF0ZSA9PSAnc3dpbmczJyl7dGhpcy5lbGVtZW50U3RhdGVbaV09J3N3aW5nMSd9XG4gICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuZWxlbWVudFNwcml0ZXNbZWxlVHlwZV0uZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuZWxlbWVudFN0YXRlW2ldKSkgLy8gY29waWVzIHBsYXllciBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0gPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpeyAvL3Jlc2V0cyBBdHRhY2sgYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRTdGF0ZVtpXT0gJ3N0YW5kJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZXNbZWxlVHlwZV1bMl0ucmVzZXQoKSAvL3Jlc2V0IFxuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0KXtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZVtlbGVUeXBlXSwgLXRoaXMuZWxlUG9zaXRpb25zW2ldWzBdLXRoaXMud2lkdGgtNDUsIHRoaXMuZWxlUG9zaXRpb25zW2ldWzFdKTsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApO31cbiAgICAgICAgICAgICAgICBlbHNlIChjdHguZHJhd0ltYWdlKHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZVtlbGVUeXBlXSwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMF0tMjAsIHRoaXMuZWxlUG9zaXRpb25zW2ldWzFdKSk7IFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZSA9IHt9IC8vY2xlYXIgbG9hZGVkIHNwcml0ZXNcblxuICAgICAgICBpZiAodGhpcy5ncmF2ZVNwYXduKSB7IFxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JhdmVZID49IHRoaXMuZmxvb3IrMzUpe3RoaXMuZ3JhdmVTdGF0ZSA9J2xhbmQnfVxuICAgICAgICAgICAgZWxzZSB7dGhpcy5ncmF2ZVkgKz0gOH07IFxuXG4gICAgICAgICAgICBsZXQgZ3JhdmVBbmltYXRpb24gPSB0aGlzLmdyYXZlQW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5ncmF2ZVN0YXRlKSlcbiAgICAgICAgICAgIGxldCBncmF2ZUltYWdlID0gZ3JhdmVBbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShncmF2ZUltYWdlLCB0aGlzLmdyYXZlWCwgdGhpcy5ncmF2ZVkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3UHJvaihjdHgsIHBhdXNlKXtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4LCBwYXVzZSkgKSAvL2RyYXcgcHJvamVjdGlsZXMgXG4gICAgfVxuXG4gICAgdGVsZXBvcnQoZGlyZWN0aW9uKXtcbiAgICAgICAgaWYgKHRoaXMubGFuZSAtIDEqZGlyZWN0aW9uPi0xICYmIHRoaXMubGFuZSAtIDEqZGlyZWN0aW9uPDMgJiYgdGhpcy5hbGl2ZSl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy5yb3dIZWlnaHQqZGlyZWN0aW9uOzJcbiAgICAgICAgICAgIHRoaXMubGFuZSArPSAtMSpkaXJlY3Rpb247IFxuICAgICAgICAgICAgdGhpcy5mbG9vciA9ICB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtICgxK3RoaXMubGFuZSkqdGhpcy5yb3dIZWlnaHR9XG4gICAgfVxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBpZiAodGhpcy5pbnZ1bG5UaW1lPjApe1xuICAgICAgICAgICAgdGhpcy5pbnZ1bG5UaW1lLS1cbiAgICAgICAgICAgIGlmICh0aGlzLmludnVsblRpbWU+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZ1bG5EYXJrVGltZSArK1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW52dWxuRGFya1RpbWU+NSkge3RoaXMuaW52dWxuRGFyayA9IGZhbHNlOyB0aGlzLmludnVsbkRhcmtUaW1lID0gLTN9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pbnZ1bG5EYXJrVGltZT4wKXt0aGlzLmludnVsbkRhcmsgPXRydWV9O1xuICAgICAgICAgICAgfSBlbHNlIHt0aGlzLmludnVsbkRhcmsgPSBmYWxzZX07XG4gICAgICAgIFxuICAgICAgICB9OyBcbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0QgPjApe3RoaXMuYXR0YWNrQ0QtPSAoMSp0aGlzLnNwZWVkTXVsdGkpfTtcbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoPD0wKXt0aGlzLnN0YXRlID0gJ2RlYWQnOyBcbiAgICAgICAgICAgICAgICB0aGlzLmFsaXZlPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXZlU3Bhd24gPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5ncmF2ZVggPSB0aGlzLnBvc2l0aW9uLngrMjA7IFxuICAgICAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKCkgKTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSB0aGlzLnByb2plY3RpbGVzLmZpbHRlciggIC8vZGVsZXRlcyBwcm9qZWN0aWxlc1xuICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC5kZWxldGUgIT09IHRydWU7IFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmFsaXZlKXtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWCE9MCAmJiAhdGhpcy5hdHRhY2tBbmltLmluY2x1ZGVzKHRoaXMuc3RhdGUpKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhbGsnOyBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PSAnd2FsaycpIHRoaXMuc3RhdGUgPSAnc3RhbmQnOyBcblxuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueDwtMzApIHt0aGlzLnBvc2l0aW9uLnggPSAtMzB9OyAvL2xlZnQgYm9yZGVyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGgpIHt0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoO30gLy9yaWdodCBib3JkZXJcbiAgICAgICAgICAgIHRoaXMuY3VyVGlsZSA9IE1hdGguZmxvb3IoICh0aGlzLndpZHRoLzIgK3RoaXMucG9zaXRpb24ueCkvODApO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMua25vY2tiYWNrRm9yY2UpPjApIHtzZXRUaW1lb3V0KCgpPT57dGhpcy5rbm9ja2JhY2tGb3JjZT0wfSwgMTAwMCl9OyAgLy9EUiBcbiAgICAgICAgICAgIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPjApe3RoaXMua25vY2tiYWNrRm9yY2UtPTAuNTt9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPDApe3RoaXMua25vY2tiYWNrRm9yY2UrPTAuNTt9XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gKHRoaXMuc3BlZWRYKnRoaXMuc3BlZWRNdWx0aSk7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy5rbm9ja2JhY2tGb3JjZTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSB0aGlzLnNwZWVkWTsgXG5cbiAgICAgICAgfSBlbHNlIHsgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mbG9hdD4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09MC4xKnRoaXMuZmxvYXREaXJlY3Q7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxvYXQgLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHt0aGlzLmZsb2F0ID0gMjA7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbG9hdERpcmVjdCA9IC10aGlzLmZsb2F0RGlyZWN0fVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPiB0aGlzLmZsb29yKXsgLy9ib3R0b20gYm9yZGVyICh1cGRhdGUgZm9yIHBsYXRmb3JtcylcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IHRoaXMuZmxvb3I7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgICAgICAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUgPSAxOyBcbiAgICAgICAgICAgIGlmICh0aGlzLmFsaXZlICYmICF0aGlzLmF0dGFja0FuaW0uaW5jbHVkZXModGhpcy5zdGF0ZSkpIHRoaXMuc3RhdGUgPSAnc3RhbmQnO1xuICAgICAgICB9IFxuICAgICAgICBpZiAodGhpcy5zcGVlZFk+MCl7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWS09MC41OyBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5qdW1wKXsgLy9ncmF2aXR5XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gMSp0aGlzLmdyYXZpdHlUaW1lO1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5VGltZSs9MC41OyBcbiAgICAgICAgICAgIGlmICghdGhpcy5hdHRhY2tBbmltLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB0aGlzLnN0YXRlID0gJ2p1bXAnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCsxNSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG5cbiAgICAgICAgLy90aGlzLnBvc2l0aW9uLngrPSA1IC8gZGVsdGFUaW1lOyBcbiAgICB9XG59IiwiaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0aWxle1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgdHlwZT0nZW5lcmd5YmFsbCcseCA9IDAsIHk9MCwgZGlyZWN0aW9uID0gMSApe1xuICAgICAgICB0aGlzLnR5cGVJbmZvID0geyAnZW5lcmd5YmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogOTB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3llbGxvd0JhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDUwLCd5T2ZmJzozNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAncHVycGxlQmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogNTAsJ3lPZmYnOjM1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZWRCYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA1MCwneU9mZic6MzV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2dyZWVuQmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogNTAsJ3lPZmYnOjM1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdibHVlQmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogNTAsJ3lPZmYnOjM1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdmaXJlYmFsbCc6IHsnc3BlZWQnOiAzLCAndHJhdmVsJzoxLCAnZXhwbG9kZSc6MiwgJ3hPZmYnOiA3MCwgJ3lPZmYnOi0xMCB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICdiYXRiYWxsJzogeydzcGVlZCc6IDYsICd0cmF2ZWwnOjMsICdleHBsb2RlJzo0LCAneE9mZic6IDEwNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmlyZWJhbGwyJzogeydzcGVlZCc6IDEyLCAndHJhdmVsJzoxLCAnZXhwbG9kZSc6MywgJ3hPZmYnOiA5NSwgJ3lPZmYnOi0xMCB9LCAgLy8tMTUsICsyMFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BvaXNvbmJhbGwnOiB7J3NwZWVkJzogNywgJ3RyYXZlbCc6MSwgJ2V4cGxvZGUnOjUsICd4T2ZmJzo4NSwgICd5T2ZmJzotNSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ljZWJhbGwnOiB7J3NwZWVkJzogOCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjQsICd4T2ZmJzo5NSwgICd5T2ZmJzotNSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpZ2h0bmluZ2JhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo3LCAneE9mZic6ODB9LCAvL3BsYXllciBiYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAndGh1bmRlcmJhbGwnOiB7J3NwZWVkJzogMTIsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo3LCAneE9mZic6ODAsJ3lPZmYnOi0xMCB9IH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gcGxheWVyLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gcGxheWVyLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAyMDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyMDsgXG4gICAgICAgIHRoaXMuZXhwbG9kZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5kZWxldGUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZSA9IHRydWU7XG4gICAgICAgIHRoaXMudG91Y2hIaXQ9IHRydWU7XG4gICAgICAgIHRoaXMucGllcmNlID0gcGxheWVyLnBpZXJjZTtcbiAgICAgICAgdGhpcy5vd25lciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBwbGF5ZXIuZGFtYWdlICogcGxheWVyLmRhbWFnZU11bHRpOyBcbiAgICAgICAgdGhpcy5oZWFsdGggPTE7IFxuICAgICAgICB0aGlzLnNpZGUgPSAwOyBcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgXG4gICAgICAgIHRoaXMuaGl0TGlzdCA9IFtdOyBcbiAgICAgICAgdGhpcy5sYW5lID0gcGxheWVyLmxhbmU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAndHJhdmVsJzsgXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uOyBcbiAgICAgICAgXG5cbiAgICAgICAgdGhpcy5jaGlsbCA9IHBsYXllci5jaGlsbDtcbiAgICAgICAgdGhpcy5hcmVhID0gcGxheWVyLmFyZWE7IFxuICAgICAgICB0aGlzLnBvaXNvbiA9IHBsYXllci5wb2lzb247IFxuICAgICAgICB0aGlzLnBvaXNvbk1heCA9IHBsYXllci5wb2lzb25NYXg7XG5cbiAgICAgICAgdGhpcy54T2ZmID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd4T2ZmJ107XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXSl7dGhpcy55T2ZmID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ119XG4gICAgICAgIGVsc2UgdGhpcy55T2ZmID0wO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmxlZnQgPSBwbGF5ZXIubGVmdDsgLy8gc2hvb3QgbGVmdFxuICAgICAgICBpZiAoeCA9PSAwICYmIHkgPT0gMCl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgICAgICB4OiBwbGF5ZXIucG9zaXRpb24ueCwgXG4gICAgICAgICAgICAgICAgeTogcGxheWVyLnBvc2l0aW9uLnkrNDVcbiAgICAgICAgICAgIH19XG4gICAgICAgIGVsc2UgeyB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IHgrMzUsXG4gICAgICAgICAgICAgICAgeTogeSs2NX1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3NwZWVkJ107XG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG5cbiAgICB9XG5cbiAgICBjcmVhdGVBbmltYXRpb25zKCl7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gNjsgXG4gICAgICAgIHRoaXMudHJhdmVsID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy90cmF2ZWxfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3RyYXZlbCddLCB0aGlzLmZyYW1lcywgXCJ0cmF2ZWxcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgIHRoaXMuYnVyc3QgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMudHlwZSsnL2V4cGxvZGVfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2V4cGxvZGUnXSwgdGhpcy5mcmFtZXMsIFwiYnVyc3RcIiwgdHJ1ZSk7IC8vd2Fsa2luZyBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMudHJhdmVsLCB0aGlzLmJ1cnN0XTsgXG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAndGh1bmRlcmJhbGwnKXtcbiAgICAgICAgICAgIHRoaXMuYm9sdCA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ3RodW5kZXJib2x0L2V4cGxvZGVfPy5wbmcnLCA1LCB0aGlzLmZyYW1lcywgXCJleHBsb2RlXCIsIHRydWUpOyAvLyAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIHBhdXNlKSB7XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7IC8vIGhpdGJveFxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFwiTm9uZVwiKXsgXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuc3RhdGUpKVxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGxvZGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnYnVyc3QnXG4gICAgICAgICAgICAgICAgaWYodGhpcy50eXBlID09J3RodW5kZXJiYWxsJyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBib2x0SW1hZ2UgPSB0aGlzLmJvbHQuZ2V0SW1hZ2UocGF1c2UpOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShib2x0SW1hZ2UsIHRoaXMucG9zaXRpb24ueCwgMjQwKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXt0aGlzLmRlbGV0ZSA9IHRydWU7fVxuICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZT09J2ljZWJhbGwnICYgdGhpcy5zdGF0ZT09J2J1cnN0Jyl7dGhpcy54T2ZmPTEwMH07XG4gICAgICAgICAgICBpZiAoIXRoaXMubGVmdCl7Ly9mbGlwIGJhc2VkIG9uIHNwcml0ZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAtdGhpcy5wb3NpdGlvbi54LSB0aGlzLnhPZmYrMTUsIHRoaXMucG9zaXRpb24ueS02MCt0aGlzLnlPZmYpO31cbiAgICAgICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueC10aGlzLnhPZmYrMzUsIHRoaXMucG9zaXRpb24ueS02MCt0aGlzLnlPZmYpOyB9XG5cbiAgICAgICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSsyNSk7IC8vZHJhdyBtb2IgKHgsIHksIGhlaWdodCwgd2lkdGgpXG4gICAgICAgICAgICBpZiAodGhpcy5leHBsb2RlKXt0aGlzLmRlbGV0ZSA9IHRydWV9OyBcbiAgICAgICAgfVxuXG4gICAgfSBcblxuXG4gICAgdXBkYXRlKCl7XG4gICAgICAgIGlmICghdGhpcy5leHBsb2RlKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe3RoaXMucG9zaXRpb24ueCAtPSB0aGlzLnNwZWVkO30gLy8gZGlyZWN0aW9uXG4gICAgICAgICAgICBlbHNlIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLnNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng8LXRoaXMud2lkdGgtMTAwKSB7dGhpcy5kZWxldGUgPSB0cnVlIH07XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aCkge3RoaXMuZGVsZXRlID0gdHJ1ZX07XG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkrNSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuXG5cblxuICAgIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHJlc3RhcnRTY3JlZW57XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTcwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwOyBcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyNTsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQyID0gXCIyNHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlIDsgXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnUmV0dXJuIHRvIE1haW4nO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy5nYW1lV2lkdGgvMjtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDI1MDtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSA1MDsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMueCsodGhpcy53aWR0aC10aGlzLmJ1dHRvbldpZHRoKS8yLCB0aGlzLmhlaWdodC10aGlzLmJ1dHRvbkhlaWdodC10aGlzLnBhZGRpbmddXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjFdXG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3RhcnRGdW5jdGlvbnMoZ2FtZSl7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgICAgICBnYW1lLmZhZGVPdXQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtnYW1lLnRpdGxlRGlzcGxheSA9IHRydWV9LCBcIjIwMDBcIikgLy8gZmFkZSBvdXQgdHJhbnNpdGlvblxuICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgIC8vIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdGFydEZ1bmN0aW9ucyhnYW1lLCBpKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgpeyAgIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnOyAvL2RyYXcgYm9yZGVyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vc2V0cyBhcmVhIGZvciBjb2xsaXNpb24gKGlzUG9pbnRJblBhdGgpXG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCwgMik7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZHJhdyB0ZXh0IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzIpOyBcblxuXG5cbiAgICAgICAgfVxuXG4gICAgIFxuICAgICAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgICAgICAvLyBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgLy8gY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCk7XG5cbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZGVmZWF0IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnR2FtZSBPdmVyIScsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMueSArIDI1KSAvL3ZpY3Rvcnkgb3IgZGVmZWF0XG4gICAgICAgICAgICB9XG5cblxuICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG5cblxuICAgIFxuICAgICAgICBcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBzdGFydFNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMjA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDE1OyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI0cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MyA9IFwiMjBweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5jb250cm9scyA9IFtcIlN0b3AgdGhlIG1vbnN0ZXJzIGZyb20gYWR2YW5jaW5nIVwiLFwiIC0gVXNlIChXQVNEKSB0byBtb3ZlLCAoSikgdG8ganVtcCwgYW5kIChLKSB0byBzaG9vdC4gVXNlIChQKSB0byBvcGVuIHNob3AuIFwiLCBcbiAgICAgICAgICAgIFwiIC0gQ29sbGVjdCB0aGUgY29pbnMgbW9uc3RlcnMgZHJvcCBiZWZvcmUgdGhleSBleHBpcmVcIiwgXG4gICAgICAgICAgICBcIiAtIFNwZW5kIG1lc29zIG9uIHVwZ3JhZGVzICYgc3VtbW9ucyB0byBib2xzdGVyIHlvdXIgZGVmZW5zZVwiLCBcbiAgICAgICAgICAgIFwiIC0gTG9zZSBsaXZlcyB3aGVuIG1vbnN0ZXJzIGVzY2FwZSBvciB0b3VjaCB5b3VcIiwgXCIgLSBHYW1lIG92ZXIgd2hlbiBhbGwgbGl2ZXMgbG9zdCFcIl07XG4gICAgICAgIHRoaXMua2V5Ym9hcmQgPSBuZXcgSW1hZ2UoKTsgXG4gICAgICAgIHRoaXMua2V5Ym9hcmQuc3JjID0gJ2ltYWdlcy9iZy9rZXlib2FyZC5wbmcnO1xuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1N0YXJ0ISc7XG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLmdhbWVXaWR0aC8yO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gNjU7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzU7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLngrdGhpcy53aWR0aC0gdGhpcy5idXR0b25XaWR0aC10aGlzLnBhZGRpbmcsIHRoaXMuaGVpZ2h0LXRoaXMuYnV0dG9uSGVpZ2h0LXRoaXMucGFkZGluZ11dIFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMV1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICAvL2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpOyAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcmVkcmF3KGN0eCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEZ1bmN0aW9ucyhnYW1lKXtcbiAgICAgICAgICAgIGdhbWUubmV4dFdhdmUgPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnVuY3Rpb25zKGdhbWUsIGkpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgpeyAgIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnOyAvL2RyYXcgYm9yZGVyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsdGhpcy5idXR0b25IZWlnaHQpOyBcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyAvL2RyYXcgdGV4dCBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGUxLnRleHRDb250ZW50LCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSt0aGlzLmJ1dHRvbkhlaWdodC8yKTsgXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vc2V0cyBhcmVhIGZvciBjb2xsaXNpb24gKGlzUG9pbnRJblBhdGgpXG4gICAgICAgICAgICBjdHgucmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQpOyAgICAgICBcbiAgICAgICAgfVxuXG4gICAgIFxuICAgICAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgfHwgZ2FtZS53YXZlRmluaXNoIHx8IGdhbWUubGV2ZWxGaW5pc2gpe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54KzAuMyp0aGlzLndpZHRoLCB0aGlzLmhlaWdodCsyMCwgMC41KnRoaXMud2lkdGgsIDI1LCAyKTtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250OyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnUHJlc3MgW0FdIGZvciBzaG9wLCBbRF0gdG8gc3RhcnQnLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmhlaWdodCszNSkgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnYW1lLmxldmVsTm90ZSE9Jycpe1xuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbCAtIGdhbWUubm90ZVRpbWU8NDUwMCl7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCsxNSwgdGhpcy5oZWlnaHQqMC41LCB0aGlzLndpZHRoLTMwLCA1MCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDM7IFxuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGdhbWUubGV2ZWxOb3RlLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmhlaWdodC8yKzMwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgfHwgKGdhbWUucGF1c2UgJiYgIWdhbWUudXBncmFkZS5kaXBsYXkpKXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdzdGFydCc7IFxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5rZXlib2FyZCwgMTgwLDApO1xuICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGk9MDsgaTx0aGlzLmNvbnRyb2xzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsVGV4dCh0aGlzLmNvbnRyb2xzW2ldLCB0aGlzLngrdGhpcy5wYWRkaW5nLCB0aGlzLnkrdGhpcy5wYWRkaW5nKigxK2kpLCB0aGlzLndpZHRoKTsgXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVkcmF3KGN0eCk7IC8vZHJhdyBzdGFydCBidXR0b25cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgLy8gaWYgKGdhbWUuc3RvcmFnZS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgIC8vICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgIC8vICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIC8vICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgIC8vICAgICBjdHgudGV4dEFsaWduID0gJ3N0YXJ0JzsgXG4gICAgICAgICAgICAvLyAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsVGV4dCgnUmVzdW1tb24gRHJhZ29ucyBmcm9tIHNob3AhJywgdGhpcy54K3RoaXMucGFkZGluZywgdGhpcy55K3RoaXMucGFkZGluZykgXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgICAgICBcbiAgICBcbiAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBcbiAgICAgICAgXG59IiwiaW1wb3J0IGltZyBmcm9tICcuL2ltZyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0aXRsZVNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxNzA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLmJnQXJ0ID0gaW1nKCdiZy9iZ1RpdGxlLnBuZycpO1xuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDI1OyBcbiAgICAgICAgdGhpcy5mb250VGl0bGUgPSBcIjQ4cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250ID0gXCIxOHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI4cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MyA9IFwiMjRweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgdGhpcy50aXRsZUxvZ28gPSBcIk1hcGxlVERcIjsgXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnUGxheSc7XG4gICAgICAgIHRoaXMuYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjIudGV4dENvbnRlbnQgPSAnTGV2ZWwgU2VsZWN0JztcbiAgICAgICAgdGhpcy5idXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMy50ZXh0Q29udGVudCA9ICc8JzsgICBcblxuICAgICAgICB0aGlzLmJ1dHRvbjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b240LnRleHRDb250ZW50ID0gJz4nOyAgXG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25ZID0gMTtcblxuICAgICAgICB0aGlzLmFib3V0VGV4dCA9IFtcIlVub2ZmaWNpYWwgZmFuIGdhbWUgZGV2ZWxvcGVkIGJ5IENocmlzdG9waGVyIExlZSAoc2lyaGNsZWVAZ21haWwuY29tKVwiLFxuICAgICAgICAgICAgICAgICBcIkFsbCBNYXBsZVN0b3J5IGFzc2V0cyB1c2VkIGFyZSBjb3B5cmlnaHRlZCBtYXRlcmlhbHMgJiBpbnRlbGxlY3R1YWwgcHJvcGVydHkgYmVsb25naW5nIHRvIE5FWE9OXCJdO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gMTc1O1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDM1OyBcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMuZ2FtZVdpZHRoLzItKHRoaXMuYnV0dG9uV2lkdGgvMik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMuYnV0dG9uWDEsIHRoaXMucGFkZGluZyt0aGlzLmJ1dHRvbkhlaWdodCArIDIqdGhpcy5nYW1lSGVpZ2h0LzMtNDVdLCBcbiAgICAgICAgICAgIFt0aGlzLmJ1dHRvblgxLCB0aGlzLnBhZGRpbmcrdGhpcy5idXR0b25IZWlnaHQgKyAyKnRoaXMuZ2FtZUhlaWdodC8zLTI1XV0gXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24yXVxuXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25zID0gWyB0aGlzLmJ1dHRvbjMsIHRoaXMuYnV0dG9uNF07IFxuICAgICAgICB0aGlzLmxldmVsQnV0dG9uV2lkdGggPSA1MDsgXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25IZWlnaHQgPSAzMDsgXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25DZW50ZXIgPSA3MDsgIC8vIG1pZGRsZSBudW1iZXIgXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLmdhbWVXaWR0aC8yLXRoaXMubGV2ZWxCdXR0b25DZW50ZXIvMi10aGlzLmxldmVsQnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uUG9zaXRpb25zWzFdWzFdKzQwXSwgXG4gICAgICAgIFt0aGlzLmdhbWVXaWR0aC8yK3RoaXMubGV2ZWxCdXR0b25DZW50ZXIvMiwgdGhpcy5idXR0b25Qb3NpdGlvbnNbMV1bMV0rNDBdXTsgXG5cbiAgICAgICAgdGhpcy5mYWRlID0gMTtcbiAgICAgICAgdGhpcy5mYWRlRGlyZWN0ID0tMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICAvL2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVIb3ZlcihlKSB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH0gLy8gICAgICAgIHRoaXMubGV2ZWxCdXR0b25zID0gWyB0aGlzLmJ1dHRvbjMsIHRoaXMuYnV0dG9uNF07IFxuICAgICAgICAgICAgLy90aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zID0gWyBbMTAsIHRoaXMuYnV0dG9uUG9zaXRpb25zWzFdWzFdKzEwXSwgWzEwLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1sxXVsxXSsyMF1dOyBcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5sZXZlbEJ1dHRvbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmxldmVsQnV0dG9uc1tpXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgfSAgICAgICAgICBcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGhhbmRsZUNsaWNrKGUsIGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uc0xpc3RbaV0udGV4dENvbnRlbnQgPT0gXCJQbGF5XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5mYWRlT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57Z2FtZS50aXRsZURpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnJlc2V0RXZlcnl0aGluZygpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMubGV2ZWxCdXR0b25zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5sZXZlbEJ1dHRvbnNbaV0sIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbEJ1dHRvbnNbaV0udGV4dENvbnRlbnQgPT0gXCI8XCIpeyAvLyByZWxvYWQgYmcgYXJ0IGFuZCBsZXZlbCBsb2FkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbD4xKXtnYW1lLmxldmVsLS19XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbEJ1dHRvbnNbaV0udGV4dENvbnRlbnQgPT0gXCI+XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUubGV2ZWw8Z2FtZS5maW5hbExldmVsKXtnYW1lLmxldmVsKyt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgICAgICAgICBcbiAgICAgICAgICAgIFxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGRyYXdCdXR0b24oZTEsIHgsIHksIGN0eCl7ICAgXG4gICAgICAgICAgICBsZXQgYnV0dG9uV2lkdGggPSB0aGlzLmJ1dHRvbldpZHRoO1xuICAgICAgICAgICAgbGV0IGJ1dHRvbkhlaWdodCA9IHRoaXMuYnV0dG9uSGVpZ2h0O1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnO1xuICAgICAgICAgICAgaWYgKGUxLnRleHRDb250ZW50PT0nUGxheScpe1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250Mjt9XG4gICAgICAgICAgICBlbHNlIGlmIChlMS50ZXh0Q29udGVudD09J0xldmVsIFNlbGVjdCcpe1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MztcbiAgICAgICAgICAgICAgICAvL2J1dHRvbkhlaWdodCAtPTExO1xuICAgICAgICAgICAgICAgIHkrPTEwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtjdHguZm9udCA9IHRoaXMuZm9udDM7XG4gICAgICAgICAgICAgICAgYnV0dG9uV2lkdGggPSB0aGlzLmxldmVsQnV0dG9uV2lkdGg7XG4gICAgICAgICAgICAgICAgYnV0dG9uSGVpZ2h0ID0gdGhpcy5sZXZlbEJ1dHRvbkhlaWdodCA7fVxuICAgICAgICAgICAgICAgIC8vZHJhdyB0ZXh0IFxuICAgICAgICBcblxuXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHgseSwgYnV0dG9uV2lkdGgsYnV0dG9uSGVpZ2h0LCAzKSA7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCtidXR0b25XaWR0aC8yLCB5K2J1dHRvbkhlaWdodC8yKTsgXG4gICAgXG4gICAgICAgIH1cblxuICAgICBcbiAgICAgICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJnQXJ0LCAwLDApOyBcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVswXSsgMTArIHRoaXMubGV2ZWxCdXR0b25XaWR0aCx0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zWzBdWzFdLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsQnV0dG9uV2lkdGgsIHRoaXMubGV2ZWxCdXR0b25IZWlnaHQsIDMpIDtcbiAgICAgICAgICAgICAgICAvLyBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChnYW1lLmxldmVsLCAgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVswXSt0aGlzLmxldmVsQnV0dG9uQ2VudGVyKzE1LCAgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVsxXSsxOCk7IFxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4KTsgLy9kcmF3IHN0YXJ0IGJ1dHRvblxuXG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBjdHguc2hhZG93T2Zmc2V0WD0xO1xuICAgICAgICAgICAgICAgIGN0eC5zaGFkb3dPZmZzZXRZPTE7XG4gICAgICAgICAgICAgICAgY3R4LnNoYWRvd0NvbG9yPVwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHguc2hhZG93Qmx1cj0gNDsgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udFRpdGxlOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnRpdGxlTG9nbywgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5nYW1lSGVpZ2h0LzMpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcblxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDsgLy9hYm91dFxuICAgICAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuZmFkZTsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdVc2UgYXJyb3cga2V5cyB0byBzZWxlY3QgbGV2ZWwnLCB0aGlzLmdhbWVXaWR0aC8yLHRoaXMuZ2FtZUhlaWdodC8yKzU1KTsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQcmVzcyBhbnkgb3RoZXIga2V5IHRvIHN0YXJ0JywgdGhpcy5nYW1lV2lkdGgvMix0aGlzLmdhbWVIZWlnaHQvMis3NSk7IFxuICAgICAgICAgICAgICAgIHRoaXMuZmFkZS09MC4wMTUqdGhpcy5mYWRlRGlyZWN0IDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWRlPDAuNSB8fCB0aGlzLmZhZGU+MSl7dGhpcy5mYWRlRGlyZWN0ID0gLXRoaXMuZmFkZURpcmVjdCB9XG4gICAgICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmFib3V0VGV4dC5sZW5ndGg7IGkrKyl7IFxuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5hYm91dFRleHRbaV0sIHRoaXMuZ2FtZVdpZHRoLzIsdGhpcy5nYW1lSGVpZ2h0LTM1KzE1KmkpOyBcbiAgICAgICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlVGV4dCh0aGlzLmFib3V0VGV4dFtpXSx0aGlzLmdhbWVXaWR0aC8yLHRoaXMuZ2FtZUhlaWdodC0zNSsxNSppKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgXG4gICAgICAgICAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPVwiYmxhY2tcIjsgXG4gICAgICAgICAgICAgICAgLy8gY3R4LmxpbmVXaWR0aD01O1xuICAgICAgICAgICAgICAgIC8vIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAvLyBjdHgucm91bmRSZWN0KHRoaXMuYnV0dG9uUG9zaXRpb25zWzBdWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1swXVsxXSwgdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQsIDMpIDtcbiAgICAgICAgICAgICAgICAvLyBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gZWxzZSB7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0JykuaW5uZXJIVE1MPVwiXCI7fVxuICAgICAgICAgICAgXG4gICAgXG4gICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICBcblxuXG4gICAgXG4gICAgICAgIFxufSIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBncmFkZXtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDY1MDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyMzA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7XG4gICAgICAgIHRoaXMueCA9IChnYW1lLmdhbWVXaWR0aC10aGlzLndpZHRoKS8yOyBcbiAgICAgICAgdGhpcy55ID0gMzsvLyh0aGlzLmhlaWdodClcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAxNTsgXG4gICAgICAgIHRoaXMucGFkZGluZ1kgPSA0O1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gMTcwO1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDM2O1xuICAgICAgICB0aGlzLmZvbnQgPSBcIjEzcHggYXJpYWxcIjsgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmZvbnQyID0gXCIxNHB4IGFyaWFsXCI7ICBcblxuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1N1bW1vbiBSZWQgRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24xLnZhbHVlID0gJ3JlZERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjIudGV4dENvbnRlbnQgPSAnU3VtbW9uIEJsdWUgRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24yLnZhbHVlID0gJ2JsdWVEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24zLnRleHRDb250ZW50ID0gJ1N1bW1vbiBHcmVlbiBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjMudmFsdWUgPSAnZ3JlZW5EcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b240LnRleHRDb250ZW50ID0gJ1N1bW1vbiBCbGFjayBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjQudmFsdWUgPSAnYmxhY2tEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjEwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMTAudGV4dENvbnRlbnQgPSAnV0lQJztcbiAgICAgICAgdGhpcy5idXR0b24xMC52YWx1ZSA9ICdtdXNocm9vbUtuaWdodCc7XG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLnggKyB0aGlzLnBhZGRpbmc7IFxuICAgICAgICB0aGlzLm5hbWVIYXNoID0geydyZWREcmFnb24nOidSZWQgRHJhZ29uJywgJ2JsdWVEcmFnb24nOidCbHVlIERyYWdvbicsXG4gICAgICAgICdncmVlbkRyYWdvbic6J0dyZWVuIERyYWdvbicsICdibGFja0RyYWdvbic6J0JsYWNrIERyYWdvbicsICdtdXNocm9vbUtuaWdodCc6ICdNdXNocm9vbSBLbmlnaHQnfTtcbiAgICAgICAgdGhpcy5zdW1tb25MaXN0ID0gWydyZWREcmFnb24nLCAnYmx1ZURyYWdvbicsJ2dyZWVuRHJhZ29uJywnYmxhY2tEcmFnb24nXTtcbiAgICAgICAgdGhpcy5lbGVtZW50TGlzdCA9IFsnQmxhemUnLCdEYXduJywnTmlnaHQnLCdXaW5kJywnVGh1bmRlciddO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjUudGV4dENvbnRlbnQgPSAnQmxhemUgU3ByaXRlJzsgLy9CbGF6ZSAtIEZsYW1lIFxuICAgICAgICB0aGlzLmJ1dHRvbjUudmFsdWUgPSBcIkJsYXplXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uNiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjYudGV4dENvbnRlbnQgPSAnRGF3biBTcHJpdGUgJzsgLy9EYXduIC0gTGlnaHQgXG4gICAgICAgIHRoaXMuYnV0dG9uNi52YWx1ZSA9IFwiRGF3blwiO1xuICAgICAgICB0aGlzLmJ1dHRvbjcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTsgXG4gICAgICAgIHRoaXMuYnV0dG9uNy50ZXh0Q29udGVudCA9ICdOaWdodCBTcHJpdGUnOyAvL05pZ2h0IC0gRGFya1xuICAgICAgICB0aGlzLmJ1dHRvbjcudmFsdWUgPSBcIk5pZ2h0XCI7XG4gICAgICAgIHRoaXMuYnV0dG9uOCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjgudGV4dENvbnRlbnQgPSAnV2luZCBTcHJpdGUgJzsgIC8vV2luZCAtIFN0b3JtXG4gICAgICAgIHRoaXMuYnV0dG9uOC52YWx1ZSA9IFwiV2luZFwiO1xuICAgICAgICB0aGlzLmJ1dHRvbjkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTsgXG4gICAgICAgIHRoaXMuYnV0dG9uOS50ZXh0Q29udGVudCA9ICdUaHVuZGVyIFNwcml0ZSc7IC8vVGh1bmRlciAtIExpZ2h0bmluZyAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b245LnZhbHVlID0gXCJUaHVuZGVyXCI7IFxuICAgICAgICB0aGlzLmJ1dHRvblgyID0gIHRoaXMuYnV0dG9uWDEgKyB0aGlzLmJ1dHRvbldpZHRoKyB0aGlzLnBhZGRpbmcgOyBcbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLmJ1dHRvblgxLCAwXSwgW3RoaXMuYnV0dG9uWDEsMV0sIFt0aGlzLmJ1dHRvblgxLDJdLCBbdGhpcy5idXR0b25YMSwzXSwgIFt0aGlzLmJ1dHRvblgxLDRdLCBcbiAgICAgICAgICAgICAgICAgW3RoaXMuYnV0dG9uWDIsMF0sIFt0aGlzLmJ1dHRvblgyLDFdLCBbdGhpcy5idXR0b25YMiwyXSwgW3RoaXMuYnV0dG9uWDIsM10sIFt0aGlzLmJ1dHRvblgyLDRdICBdOyBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjEsIHRoaXMuYnV0dG9uMiwgdGhpcy5idXR0b24zLCB0aGlzLmJ1dHRvbjQsIHRoaXMuYnV0dG9uMTAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uNSwgdGhpcy5idXR0b242LCB0aGlzLmJ1dHRvbjcsIHRoaXMuYnV0dG9uOCwgdGhpcy5idXR0b245XTsgXG4gICAgICAgdGhpcy5ub3RlID0gXCJQcmVzcyBbU10gdG8gYnV5LCBbQV0gdG8gY2xvc2UgbWVudVwiOyBcbiAgICAgICBcblxuICAgICAgICB0aGlzLmNvc3RQb3NpdGlvbiA9IHRoaXMuYnV0dG9uWDIgKyB0aGlzLmJ1dHRvbldpZHRoKyAyLjUqdGhpcy5wYWRkaW5nOyBcbiAgICAgICAgdGhpcy5jb3N0SGVpZ2h0ID0gMjA7IFxuICAgICAgICB0aGlzLmNvc3RXaWR0aCA9IDI3NTsgXG4gICAgICAgIHRoaXMuY29zdFBhZGRpbmcgPSA0OyBcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblggPSAxO1xuICAgICAgICB0aGlzLnNlbGVjdGlvblkgPSAxO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uVGV4dCA9IFtdO1xuICAgICAgICB0aGlzLnB1cmNoYXNlRGVzY3JpcHRpb24gPSByZXF1aXJlKCcuL3B1cmNoYXNlLmpzb24nKTsgXG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZShnYW1lKXtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLnJlZHJhdyhjdHgpLCB0cnVlKTsgXG4gICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmVkcmF3KGN0eCwgZ2FtZSApe1xuICAgICAgICBsZXQgYnV0dG9uRHJhdyA9IHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaTxidXR0b25EcmF3IDsgaSsrKXtcbiAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCAyKnRoaXMucGFkZGluZ1krKHRoaXMuYnV0dG9uSGVpZ2h0K3RoaXMucGFkZGluZ1kpKnRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgsIGdhbWUpXG4gICAgICAgfVxuICAgIH1cblxuICAgIHVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgYnV0dG9uKXtcbiAgICAgICAgLy9yZXN1bW1vbjtcbiAgICAgICAgaWYgKGdhbWUuc3RvcmFnZS5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSkpe1xuICAgICAgICAgICAgZ2FtZS5yZXN1bW1vbihidXR0b24udmFsdWUpO1xuICAgICAgICAgICAgbGV0IHVuaXQgPSBnYW1lLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGJ1dHRvbi52YWx1ZSkpO1xuICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gICdVcGdyYWRlICcrdGhpcy5uYW1lSGFzaFtidXR0b24udmFsdWVdKyAnIChMdmwgJyt1bml0LmxldmVsKycpJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnYW1lLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGJ1dHRvbi52YWx1ZSkpKXsgLy91cGdyYWRlIHN1bW1vbnMgXG4gICAgICAgICAgICBsZXQgdW5pdCA9IGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSk7XG4gICAgICAgICAgICB1bml0LmxldmVsVXAoZ2FtZS5wbGF5ZXIpOyAvL2FkZCBjb3N0IFxuXG4gICAgICAgICAgICBpZiAodW5pdC5sZXZlbDw1KXtcbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICAnVXBncmFkZSAnK3RoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsICcrdW5pdC5sZXZlbCsnKSc7fVxuICAgICAgICAgICAgZWxzZSB7YnV0dG9uLnRleHRDb250ZW50ID0gIHRoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsICcrdW5pdC5sZXZlbCsnKScgfVxuICAgICAgICB9IFxuXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3VtbW9uTGlzdC5pbmNsdWRlcyhidXR0b24udmFsdWUpKXtcbiAgICAgICAgICAgIGlmIChidXR0b24udmFsdWUgIT0nbXVzaHJvb21LbmlnaHQnKXtcbiAgICAgICAgICAgICAgICBnYW1lLmNyZWF0ZU1vYihnYW1lLnBsYXllciwgYnV0dG9uLnZhbHVlLCAwLCBnYW1lKTsgLy9zdW1tb25zIDtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKSl7IC8vY2hlY2tzIGlmIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IFxuICAgICAgICAgICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAnVXBncmFkZSAnK3RoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsIDEpJztcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVsZW1lbnRMaXN0LmluY2x1ZGVzKGJ1dHRvbi52YWx1ZSkpe1xuICAgICAgICAgICAgICAgIGdhbWUuYWRkRWxlbWVudChidXR0b24udmFsdWUpOyAvL2VsZW1lbnRzXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIC8vIGVsc2UgaWYgKGJ1dHRvbi50ZXh0Q29udGVudD09J05leHQgV2F2ZSEnKSBnYW1lLm5leHRXYXZlID0gdHJ1ZTsgLy9uZXh0IHdhdmUgYnV0dG9uXG5cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICBcbiAgICAgICAgbGV0IGJ1dHRvbkRyYXcgPSB0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgXG4gICAgICAgIGlmICghZ2FtZS53YXZlRmluaXNoKXtidXR0b25EcmF3LT0xfTsgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPGJ1dHRvbkRyYXcgOyBpKyspe1xuICAgICAgICAgICAgLy8gdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLnBhZGRpbmdZKyh0aGlzLmJ1dHRvbkhlaWdodCt0aGlzLnBhZGRpbmdZKSp0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4LCBnYW1lKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zTGlzdFtpXS5mb2N1cygpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgdGhpcy5idXR0b25zTGlzdFtpXSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG5cbiAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgsIGdhbWUpeyAgIFxuICAgICAgICBsZXQgYnV0dG9uQ29sb3IgPSdzdGVlbGJsdWUnO1xuICAgICAgICBsZXQgdGV4dENvbG9yID0nd2hpdGUnO1xuICAgICAgICBsZXQgY29zdCA9IDA7IFxuICAgICAgICBpZiAoZ2FtZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5idXR0b25YMT09eCkgeyAvL3N1bW1vbiBidXR0b25zIC8vY2hlY2sgY29zdCAoaWYgZmlyc3Qgb3IgdXBncmFkZSlcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBlMS52YWx1ZSkpKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVuaXQgPSBnYW1lLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGUxLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvc3QgPSBnYW1lLnBsYXllci51cGdyYWRlQ29zdFt1bml0LmxldmVsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSAoIGNvc3QgPSBnYW1lLnBsYXllci5zdW1tb25Db3N0W2dhbWUucGxheWVyLnN1bW1vbkNvdW50XSk7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIubW9uZXk8IGNvc3Qpe1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Db2xvciA9ICdsaWdodGdyZXknO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSAnZGFya2dyZXknOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmJ1dHRvblgyPT14KXsgLy9lbGVtZW50c1xuICAgICAgICAgICAgICAgIGNvc3QgPSBnYW1lLnBsYXllci5lbGVtZW50Q29zdFtnYW1lLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGhdO1xuICAgICAgICAgICAgICAgIGlmIChnYW1lLnBsYXllci5tb25leTxnYW1lLnBsYXllci5lbGVtZW50Q29zdFtnYW1lLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGhdIHx8IFxuICAgICAgICAgICAgICAgICAgICBnYW1lLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGggPj01KXtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29sb3IgPSAnbGlnaHRncmV5JztcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbG9yID0gJ2RhcmtncmV5JzsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICAgIFxuICAgICAgICAgICAgZWxzZSB7YnV0dG9uQ29sb3IgPSAnbGlnaHRncmV5JzsgLy9XSVBcbiAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSAnZGFya2dyZXknO31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gYnV0dG9uQ29sb3I7ICAvL2J1dHRvbiBiYWNrZ3JvdW5kXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgY3R4LnJvdW5kUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQsIDMpOyBcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgIFxuICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQ7IFxuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IC8vYnV0dG9uIHRleHQgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0ZXh0Q29sb3I7XG4gICAgICAgIGlmIChnYW1lKXtcbiAgICAgICAgICAgICBpZiAoZ2FtZS5zdG9yYWdlLmxlbmd0aD4wKXtcblxuICAgICAgICAgICAgICAgIGxldCB0ZXN0ID0gZ2FtZS5zdG9yYWdlLmZpbmQob2JqPT4gb2JqLnR5cGU9PWUxLnZhbHVlKTsgXG4gICAgICAgICAgICAgICAgaWYgKHRlc3QpeyBcbiAgICAgICAgICAgICAgICAgICAgZTEudGV4dENvbnRlbnQgPSAnUmVzdW1tb24gTHZsICcrdGVzdC5sZXZlbCsnICcrdGhpcy5uYW1lSGFzaFtlMS52YWx1ZV07IFxuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gMDsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrdGhpcy5idXR0b25IZWlnaHQvMyk7IFxuICAgICAgICBpZiAoY29zdCAmJiBlMS52YWx1ZSE9J211c2hyb29tS25pZ2h0Jyl7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJygnK2Nvc3QrJyBtZXNvcyknLCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSsyKnRoaXMuYnV0dG9uSGVpZ2h0LzMpO31cbiAgICAgICAgLy9lbHNlIHsgY3R4LmZpbGxUZXh0KCdNQVgnLCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSsyKnRoaXMuYnV0dG9uSGVpZ2h0LzMpO31cblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vY29sbGlzaW9uIHBhdGggXG4gICAgICAgIGN0eC5yZWN0KHgseSwgdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQpOyBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdG9nZ2xlTWVudShnYW1lKXsgXG4gICAgICAgIHRoaXMuZGlzcGxheSA9ICF0aGlzLmRpc3BsYXk7IFxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5KXtnYW1lLnBhdXNlID0gdHJ1ZX1cbiAgICAgICAgZWxzZSBnYW1lLnBhdXNlID0gZmFsc2VcbiAgICB9XG5cbiAgICBwdXJjaGFzZShnYW1lKXtcbiAgICAgICAgbGV0IGkgPSAodGhpcy5zZWxlY3Rpb25YLTEpKjUgKyAodGhpcy5zZWxlY3Rpb25ZLTEpO1xuICAgICAgICB0aGlzLnVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgdGhpcy5idXR0b25zTGlzdFtpXSk7IFxuICAgIH1cblxuICAgIHNlbGVjdGVkRGVzY3JpcCgpe1xuICAgICAgICBsZXQgaSA9ICh0aGlzLnNlbGVjdGlvblgtMSkqNSArICh0aGlzLnNlbGVjdGlvblktMSk7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25UZXh0ID0gdGhpcy5wdXJjaGFzZURlc2NyaXB0aW9uW3RoaXMuYnV0dG9uc0xpc3RbaV0udmFsdWVdOyBcbiAgICB9XG5cbiAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheSl7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDMpOyAvL3doaXRlIHdpbmRvd1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCwgZ2FtZSk7IC8vZHJhdyBidXR0b25cblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzI4MjgyOFwiO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLmNvc3RQb3NpdGlvbi0yKnRoaXMucGFkZGluZywgMip0aGlzLnBhZGRpbmdZLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0V2lkdGgsIHRoaXMuY29zdEhlaWdodCoxMSwgMyk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcblxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL3NlbGVjdGlvbiBcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMuYnV0dG9uWDEgKyAodGhpcy5zZWxlY3Rpb25YLTEpKih0aGlzLmJ1dHRvbldpZHRoKyB0aGlzLnBhZGRpbmcpLCBcbiAgICAgICAgICAgICAgICAyKnRoaXMucGFkZGluZ1krKHRoaXMuYnV0dG9uSGVpZ2h0K3RoaXMucGFkZGluZ1kpKih0aGlzLnNlbGVjdGlvblktMSksIFxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uV2lkdGgsdGhpcy5idXR0b25IZWlnaHQsIDMpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGVzY3JpcCgpOyAvL3Nob3dzIHNlbGVjdGVkIHN1bW1vbiBkZXRhaWwgXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5kZXNjcmlwdGlvblRleHQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmRlc2NyaXB0aW9uVGV4dFtpXSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsXG4gICAgICAgICAgICAgICAgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqaSk7IFxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgLy9zdGF0cyAgICAgICAgICB0aGlzLmRhbWFnZU11bHRpID0gMTsgXG4gICAgICAgIC8vIHRoaXMucGlja3VwTXV0bGkgPSAxO1xuICAgICAgICAvLyB0aGlzLmtub2NrYmFja011bHRpID0gMTtcbiAgICAgICAgLy8gdGhpcy5zcGVlZE11bHRpID0gMTsgXG4gICAgICAgIC8vIHRoaXMucGllcmNlID0gMDsgXG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnRGFtYWdlOiB4JytnYW1lLnBsYXllci5kYW1hZ2VNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbi0yNSwgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqNyk7ICAgICAgIFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdTcGVlZDogeCcrZ2FtZS5wbGF5ZXIuc3BlZWRNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbi0yNSwgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqNy42KTsgXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ0tub2NrYmFjazogeCcrZ2FtZS5wbGF5ZXIua25vY2tiYWNrTXVsdGkudG9GaXhlZCgxKSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjguMik7IFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQaWVyY2U6ICcrZ2FtZS5wbGF5ZXIucGllcmNlLCB0aGlzLmNvc3RQb3NpdGlvbisxMDAsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcpOyBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnTG9vdCBSYWRpdXM6IHgnK2dhbWUucGxheWVyLmxvb3RNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbisxMDAsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcuNik7IFxuXG5cbiAgICAgICAgICAgICAgICBcblxuXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnYmxhY2snO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMubm90ZSwgdGhpcy5idXR0b25YMSsxMCwgdGhpcy5oZWlnaHQtMTApO1xuXG4gICAgICAgICAgICBpZiAoZ2FtZS5lcnJvcil7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAncmVkJztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1NwYWNlIG9jY3VwaWVkIScsIHRoaXMud2lkdGgtMjIwLCB0aGlzLmhlaWdodC0xMCk7IFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7Z2FtZS5lcnJvcj1mYWxzZTt9LCBcIjMwMDBcIikgO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudScpLmlubmVySFRNTD1cIlwiO31cbiAgICAgICAgXG5cblxuICAgICAgICAgICAgXG4gICAgfVxuXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVTY3JlZW5cIik7IC8vIGdldHMgY2FudmFzIGVsZW1lbnRcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgLy9jcmVhdGVzIDJEIHJlbmRlcmluZyBvYmplY3RcblxuY29uc3QgZ2FtZVdpZHRoID0gMTAwMDtcbmNvbnN0IGdhbWVIZWlnaHQgPSA1MDA7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KTsgXG5nYW1lLnN0YXJ0KCk7IC8vY3JlYXRlcyBnYW1lIG9iamVjdHM7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKHRpbWVzdGFtcCl7XG4gICAgXG4gICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLDAsIGdhbWVXaWR0aCwgZ2FtZUhlaWdodCk7IC8vcmVmcmVzaCBzY3JlZW5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXApO1xuICAgICAgICBcbiAgICAgICAgaWYgKGdhbWUudGl0bGVEaXNwbGF5KXtcbiAgICAgICAgICAgIGdhbWUudGl0bGVNZW51KGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGlmICghZ2FtZS5wYXVzZSApeyBnYW1lLnVwZGF0ZSh0aW1lc3RhbXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2FtZS5uZXh0V2F2ZUxvYWRlcigpOyAvL2xvYWRzIHdhdmUgbGlzdFxuICAgICAgICAgICAgZ2FtZS53YXZlTG9hZGVyKCk7IC8vIGxvYWRzIGVhY2ggbW9iIGZyb20gd2F2ZSBsaXN0XG4gICAgICAgICAgICAvL2dhbWUucGF1c2VIYW5kbGVyKCkgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGdhbWUuZHJhdyhjdHgpOyBcbiAgICAgICAgICAgIGdhbWUud2F2ZUNsZWFyKGN0eCk7XG4gICAgICAgICAgICBnYW1lLnBhdXNlSGFuZGxlcih0aW1lc3RhbXAsIGN0eCk7IFxuICAgICAgICAgICAgZ2FtZS51cGdyYWRlTWVudShjdHgpO1xuICAgICAgICAgICAgZ2FtZS5uZXh0TGV2ZWxMb2FkZXIoY3R4KTsgLy9pZiB3YXZlIGxpc3QgZW1wdHksIG1vdmUgdG8gbmV4dCBsZXZlbFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBnYW1lLnJlY2FsbENoZWNrKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGdhbWUuc2NyZWVuVHJhbnNpdGlvbihjdHgpO1xuXG4gICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO30sIDEwICApOyAgLy9maXggZnJhbXRlcyBcbiAgIC8vNSB0b28gZmFzdFxuICAgLy8gMTAgYSBsaXR0bGUgdG9vIHNsb3dcbiAgIC8vNjAgdG9vIHNsb3dcblxufVxuXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApOyBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==