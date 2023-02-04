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
                this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
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
                            text2 = 'Press [D] to start next wave!';
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
        this.titleDisplay = false;//false; //enable for release
        this.load = false;
        this.playerObjects =[];
        this.mobObjects =[]; 
        this.moneyObjects = []; 
        this.level = 2;
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
            if (this.player.money> this.player.elementCost[this.player.elementList.length]){
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
        if (side === 0){ //Summon unit
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

        this.playerObjects.push(new _mob__WEBPACK_IMPORTED_MODULE_2__["default"](this.player, 'redDragon', 0,1,3)); 
        this.playerObjects.push(new _mob__WEBPACK_IMPORTED_MODULE_2__["default"](this.player, 'blueDragon', 0,2,3)); 
        this.playerObjects.push(new _mob__WEBPACK_IMPORTED_MODULE_2__["default"](this.player, 'greenDragon', 0,3,3)); 
        this.playerObjects.push(new _mob__WEBPACK_IMPORTED_MODULE_2__["default"](this.player, 'blackDragon', 0,4,3)); 

    }



    draw(ctx){ //runs draw function for object list 

        ctx.drawImage(this.bgSky, 0, 0); 
        ctx.drawImage(this.bgStage, 0, 0); 
        this.startMenu.displayMenu(ctx, this );
        this.mobObjects.forEach( (object)=>object.draw(ctx, this.pause) )
        this.playerObjects.forEach( (object)=>object.emote(this)); 
        this.playerObjects.forEach( (object)=>object.draw(ctx,this.pause) )
        this.moneyObjects.forEach( (object)=>object.draw(ctx,this.pause) ); 
        
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
            obj.knockbackForce = -4*direction*(1+ (multi-1)/4); //add as stat
        }
    }
    aggro(obj1, obj2){ // checks if obj1 range is within obj2
        for (const target of obj2){
            if (target.health>0){
                
                if (obj1.hitbox[0]+obj1.hitbox[2]+obj1.range>target.hitbox[0] && 
                    obj1.hitbox[0]-obj1.range<target.hitbox[0]+target.hitbox[2]){ //aggro from right
                        if (obj1.hitbox[1]<target.hitbox[1] && obj1.hitbox[1]+obj1.hitbox[3]>target.hitbox[1] ||
                            obj1.lane == target.lane){
                         {if (obj1.aggro){obj1.attack()}; //only aggro mobs have attack animations
                        }
                    }
                }
            }
         }
     }
    
    lootMoney(obj1, obj2){
        for (const target of obj2){ //-(this.width*(-1+this.lootMulti))
            if ( (obj1.hitbox[0]<target.hitbox[0] && obj1.hitbox[0]+80*(obj1.lootMulti) > target.hitbox[0]) || //obj1 on left
                (obj1.hitbox[0] > target.hitbox[0]+target.hitbox[2] && obj1.hitbox[0]-80*(obj1.lootMulti-1)<target.hitbox[0]+target.hitbox[2] )){ //obj1 on right
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
                            target.health -= obj3.damage; 
                            obj3.explodeDamageDealt += obj3.damage;
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
                                if(target.lane == obj1.lane){ //player only can hit from proj in lane
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

            if (obj1.poison>0){
                if (obj2.poisonStack+1<obj1.poisonMax){ //add to max stacks
                    obj2.poisonAmount += obj1.poison;
                    obj2.poisonStack++;}
                obj2.poisonTime = 5;  //four ticks                
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
                if (!obj.roam){
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
                    if (Game.titleDisplay && Game.level>1){Game.level--}
                    else if (upgrade.display){
                        if(upgrade.selectionX>1){upgrade.selectionX-=1}
                    }
                    else {
                            player.speedX = -player.speed; 
                            player.left = true;}
                        break;

                case 39: //right arrow
                    if (Game.titleDisplay && Game.level<Game.finalLevel){Game.level++}
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
                        Game.nextWave = true; 
                        Game.startMenu.display = false}; 
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
        this.invulnTime =  0; 
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
            this.name = this.type+game.mobCount; 
            this.width = 50; //sprite size 
            this.height = 65; 
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
            console.log(this.position); 
        };  //offset for sprites 
        //if (this.typeInfo[this.type]['yOff']) (this.position.y -=this.typeInfo[this.type]['yOff']) ;
        if (this.typeInfo[this.type]['spriteType']){this.loadSprite = this.typeInfo[this.type]['spriteType'][0]}
        else {this.loadSprite = this.type};
        this.form = 0; 
        if (this.typeInfo[this.type]['damage']){ //mob attacks
                this.damage = this.typeInfo[this.type]['damage']
                this.aggro = true;
                }
        else {this.damage=1; this.aggro=false};

        if (this.typeInfo[this.type]['yOff']){this.yOff = this.typeInfo[this.type]['yOff']}
        if (this.typeInfo[this.type]['xOff']){this.xOff = this.typeInfo[this.type]['xOff']}
        if (this.typeInfo[this.type]['boss']){this.boss = true; 
                this.position.y-=70; this.height+=100}; 
        if (this.typeInfo[this.type]['roam']){
            this.roam = true; 
            this.roamTime = 10;
            this.roamY = this.lane*game.rowHeight; 
            this.roamLimits = [0,game.rowHeight,game.rowHeight*2]; //0,1,2
            this.destination = 0;
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

        if (test==1){
            this.position.x = 270; 
            this.position.y = 395; //bottom
            this.lane = 0;

        }
        else if (test==2){
            this.position.x = 270; 
            this.position.y = 305; //middle
            this.lane = 1;
            
        }
        else if (test==3){
            this.position.x = 270; 
            this.position.y = 215; //top 
            this.lane = 2;    
        }
        else if (test==4){
            this.position.x = 330; 
            this.position.y = 305; // middle
            this.lane = 1;
            
        }
        if (this.type == 'redDragon'){
            if (this.level>=2){this.projectileAmount++; this.damageMulti+=0.25}
            if (this.level>=3){this.area += 80; this.damageMulti+=0.25}
            if (this.level>=4){this.area +=80; this.projectileAmount ++};
        };

        if (this.type == 'blueDragon'){
            if (this.level>=2){this.projectileAmount++;}
            if (this.level>=3){this.chill += 0.15; this.pierce += 1}
            if (this.level>=4){this.chill += 0.05; this.projectileAmount ++};
        };
        if (this.type == 'greenDragon'){
            if (this.level>=2){this.projectileAmount++;}
            if (this.level>=3){this.poison += 0.5; this.poisonMax+=6;this.pierce += 1}
            if (this.level>=4 ){this.poison += 0.5; this.poisonMax+=3; this.projectileAmount ++}
        };
        if (this.type == 'blackDragon'){
            if (this.level>=2){this.projectileAmount++; this.damageMulti+=0.2}
            if (this.level>=3){this.area +=50; this.column=1;this.damageMulti+=0.2}
            if (this.level>=4){this.area +=50; this.projectileAmount ++}
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
                if (this.level==2){this.projectileAmount++; this.damageMulti+=0.25}
                else if (this.level==3){this.area += 80; this.damageMulti+=0.25}
                else if (this.level>=4){this.area +=80; this.projectileAmount ++};
            };

            if (this.type == 'blueDragon'){
                if (this.level==2){this.projectileAmount++;}
                else if (this.level==3){this.chill += 0.15; this.pierce += 1}
                else if (this.level>=4){this.chill += 0.05; this.projectileAmount ++};
            };
            if (this.type == 'greenDragon'){
                if (this.level==2){this.projectileAmount++;}
                else if (this.level==3){this.poison += 0.5; this.poisonMax+=6;this.pierce += 1}
                else if (this.level>=4 ){this.poison += 0.5; this.poisonMax+=3; this.projectileAmount ++}
            };
            if (this.type == 'blackDragon'){
                if (this.level==2){this.projectileAmount++; this.damageMulti+=0.2}
                else if (this.level==3){this.area +=50; this.column=1;this.damageMulti+=0.2}
                else if (this.level>=4){this.area +=50; this.projectileAmount ++}
            };
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
                this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'][this.form]));
                if (this.projectileAmount>0){ //extra projectiles 
                    for (let i=1; i<=this.projectileAmount; i++){ 
                    setTimeout( ()=> {this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj'][this.form]));}, 130+130*i)
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
                    this.position.x-40, this.position.y-20));    
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
        else {ctx.drawImage(image, this.position.x+this.xOff, this.position.y+this.yOff); }
    
        if (this.chillAmount>0){
            const buffer = document.createElement('canvas'); // Image tinting
            buffer.width = 200;//image.width;
            buffer.height = 200;//image.height;
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

        if (this.poisonAmount>0){
            if (!this.poisonLoaded){
                this.poisonGraphic = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"]('poisonEffect/poison?.png', 4, 10, "poison");
                this.poisonLoaded = true; }
            else {
                    let poisonSpriteImage = this.poisonGraphic.getImage(pause); 
                    ctx.drawImage(poisonSpriteImage,this.position.x-10,this.position.y-this.height)
                }
            }

        this.projectiles.forEach( (object)=>object.draw(ctx, pause) )
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

                if (this.roam){
                    this.roamTime--;
                    
                    if (this.roamTime == 0){
                        this.destination = Math.floor(Math.random()*3); //random 0,1,2
                        this.roamTime = 200; 
                    }

                    if (this.roamY> this.roamLimits[this.destination]){
                        this.position.y-=2;//this.speedX+this.chillAmount)/2;
                        this.roamY-=2; //(this.speedX+this.chillAmount)/2;
    
                    } else if (this.roamY<this.roamLimits[this.destination]){
                        this.position.y+=2; //(this.speedX-this.chillAmount)/2;
                        this.roamY+=2;
                    }
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
                
                this.emoteTimeOut = setTimeout(()=> {this.emoteTime = 600+Math.floor(Math.random()*500);
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

        this.hitbox = [this.position.x, this.position.y, this.width, this.height]; 
        




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

        this.hitbox = [this.position.x, this.position.y-25, this.width, this.height]; 
        if (this.value>=100){this.type = '4';} 
        else if (this.value>=50){this.type = '3';} 
        else if (this.value>=10){this.type = '2';} 
        else this.type = '1'; 
        this.createAnimations(); 
    }
    
    createAnimations(){
        this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"]('coin/Coin'+this.type+'_?.png', 3, 6, "stand");
        this.animations = [this.stand]
    }

    draw(ctx, pause) {
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.startFade) {
            if (this.float){this.fade -= 0.015;} //slower fade when pickup
            else this.fade -= 0.03;
            ctx.globalAlpha = this.fade; 
            setTimeout(()=> {this.delete= true}, "450") ;
        } 
        
        const animation = this.animations.find((animation)=>animation.isFor('stand')); 
        const image = animation.getImage(pause); 


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

        if (game.gameTimeReal-this.spawnTime>=18000){ //18 s 
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
        this.width = 60; //sprite size 
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
        this.speed = 3;
        this.knockbackForce = 0; 
        this.left = false;
        this.side =0;
        this.speedX = 0;
        this.speedY = 0; 
        this.jump = false;
        this.gravityTime = 1; 
        this.projectiles = [];
        this.name = 'Wiz';
        this.health = 100; 
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
            'Dawn': {'stand': 15, 'move':15, 'attack': 8, 'proj':'yellowBall'},
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
        this.money = 800;  //50
        if (game.level == 2) {this.money = 1200} //starting money based on level;
        else if (game.level == 3) {this.money = 5000}
        this.summonCost = [50, 100, 150, 200, 640];
        this.upgradeCost = [200, 400, 800, 1600, 3200]; 
        this.elementCost = [50, 100, 200, 400, 800]; 

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
        this.pierce = 0; 

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
            let x = this.position.x-22; 
            if (this.left){x +=58;}
            this.proj = new _projectile__WEBPACK_IMPORTED_MODULE_0__["default"](this, 'lightningball',x, this.position.y-15);

            
            this.state = this.attackAnim.shift(); 
            this.attackAnim.push(this.state); 
            this.animations.find((animation)=>animation.isFor(this.state)).reset(); 
            this.attackCD = this.attackSpeed;
            this.projectiles.push(this.proj);
            //setTimeout(()=> {this.projectiles.push(this.proj)}, "200"); //slight delay for animation

            for (let i=0; i<this.elementList.length; i++){
                let x = this.elePositions[i][0]+70;//facing left
                if (!this.left){x = this.elePositions[i][0]-40};
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
        //ctx.fillRect(this.position.x+15, this.position.y, this.width, this.height) //hitbox
        //ctx.fillRect(this.curTile*80, this.position.y, 80, 80); //selected tile
        // ctx.fillRect(this.hitbox[0]-(75*(-1+this.lootMulti)), this.position.y, this.width, 80); //loot range
        // ctx.fillRect(this.hitbox[0], this.position.y, this.width+75*(-1+this.lootMulti), 80); //loot range

        if (this.left){
            ctx.scale(-1,1);
            ctx.drawImage(image, -this.position.x-1.5*this.width-10, this.position.y);
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
                else (ctx.drawImage(this.elementLoadedSprite[eleType], this.elePositions[i][0], this.elePositions[i][1])); 
        }
        this.elementLoadedSprite = {} //clear loaded sprites

        if (this.graveSpawn) { 
            if (this.graveY >= this.floor+35){this.graveState ='land'}
            else {this.graveY += 8}; 

            let graveAnimation = this.graveAnimations.find((animation)=>animation.isFor(this.graveState))
            let graveImage = graveAnimation.getImage(pause);
            ctx.drawImage(graveImage, this.graveX, this.graveY);
            
        }
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
                        'yellowBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 90,'yOff':12},
                        'purpleBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 90,'yOff':12},
                        'redBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 90,'yOff':12},
                        'greenBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 90,'yOff':12},
                        'blueBall': {'speed': 10, 'travel':2, 'explode':5, 'xOff': 90,'yOff':12},
                        'fireball': {'speed': 3, 'travel':1, 'explode':2, 'xOff': 70, 'yOff':-10 }, 
                        'fireball2': {'speed': 12, 'travel':1, 'explode':3, 'xOff': 115, 'yOff':-40 }, 
                        'batball': {'speed': 6, 'travel':3, 'explode':4, 'xOff': 105},
                        'poisonball': {'speed': 7, 'travel':1, 'explode':5, 'xOff':115,  'yOff':-40 },
                        'iceball': {'speed': 8, 'travel':2, 'explode':4, 'xOff':135,  'yOff':-40 },
                        'lightningball': {'speed': 10, 'travel':2, 'explode':7, 'xOff':80},
                        'thunderball': {'speed': 12, 'travel':2, 'explode':7, 'xOff':110,'yOff':-40 } }
        
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
            console.log('loadsprite')
   
        }
    }

    draw(ctx, pause) {
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height); //reference
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
            else {ctx.drawImage(image, this.position.x-this.xOff+20, this.position.y-60+this.yOff); }

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
                this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.buttonPositions[i][1], ctx)
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
                ctx.roundRect(this.x+0.3*this.width, this.height+20, 0.4*this.width, 25, 2);
                ctx.stroke();
                ctx.fill();

                ctx.font = this.font; 
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center'; 
                ctx.fillText('Press [A] for upgrades', this.gameWidth/2, this.height+35) 
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
        
        this.buttonPositions = [ [this.buttonX1, 2*this.gameHeight/3-5], 
            [this.buttonX1, this.padding+this.buttonHeight + 2*this.gameHeight/3-25]] 
        this.buttonsList = [this.button1, this.button2]

        this.levelButtons = [ this.button3, this.button4]; 
        this.levelButtonWidth = 50; 
        this.levelButtonHeight = 30; 
        this.levelButtonCenter = 70;  // middle number 
        this.levelButtonPositions = [ [this.gameWidth/2-this.levelButtonCenter/2-this.levelButtonWidth, this.buttonPositions[1][1]+40], 
        [this.gameWidth/2+this.levelButtonCenter/2, this.buttonPositions[1][1]+40]]; 

        this.fade = 1;
        }

        initialize(game){
            const canvas = document.getElementById('gameScreen');
            
            var elem = this;
            canvas.addEventListener('click', function(e){elem.handleClick(e, game) }, false);            
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
                buttonHeight -=11;
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
                ctx.fillText('Press any key', this.gameWidth/2,this.gameHeight/2+55); 
                this.fade-=0.010;
                if (this.fade<0.25){this.fade = 1}
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
            console.log(unit.level);
            
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
            this.drawButton(this.buttonsList[i], this.buttonPositions[i][0], this.paddingY+(this.buttonHeight+this.paddingY)*this.buttonPositions[i][1], ctx, game)
            
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
        else game.pause = false ;
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

module.exports = JSON.parse('{"target":{"speed":"0.1","health":"100","stand":0,"walk":5,"die":5,"angry":12,"sprite":"mob","spriteType":["stumpy"],"proj":"batball","atkSpd":300,"damage":1,"range":500,"value":100},"zombie":{"speed":"0.1","health":"1000","stand":2,"walk":2,"die":10,"angry":9,"sprite":"mob","atkSpd":100,"damage":1,"value":5},"spore":{"speed":"1","health":"2","stand":2,"walk":2,"die":3,"sprite":"mob","value":1},"orangeMushroom":{"speed":"1","health":"4","stand":1,"walk":2,"die":2,"sprite":"mob","value":5},"greenMushroom":{"speed":"2","health":"1","stand":1,"walk":2,"die":2,"sprite":"mob","value":3},"blueMushroom":{"speed":"1","health":"8","stand":1,"walk":2,"die":2,"sprite":"mob","value":10},"hornyMushroom":{"speed":"2","health":"3","stand":2,"walk":2,"die":3,"sprite":"mob","value":2},"mushmom":{"speed":"0.30","health":"220","stand":0,"walk":5,"die":5,"angry":12,"sprite":"mob","boss":"true","yOff":-10,"atkSpd":200,"damage":1,"range":350,"value":[50,50,50,50,50]},"goldMushroom1":{"speed":"3","health":"1","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[20,20,20,20,20]},"goldMushroom2":{"speed":"3","health":"1","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[50,50,50,50,50]},"stump":{"speed":"1","health":"10","stand":0,"walk":3,"die":2,"sprite":"mob","value":10},"darkStump":{"speed":"1","health":"18","stand":0,"walk":3,"die":2,"sprite":"mob","value":15},"axeStump":{"speed":"1","health":"15","stand":0,"walk":3,"die":3,"sprite":"mob","value":15},"ghostStump":{"speed":"0.75","health":"15","stand":0,"walk":3,"die":2,"angry":6,"atkSpd":250,"damage":1,"range":600,"proj":"fireball","sprite":"mob","value":20},"boar":{"speed":"2.5","health":"10","stand":0,"walk":2,"die":1,"sprite":"mob","value":10},"fireBoar":{"speed":"2.5","health":"4","stand":0,"walk":2,"die":1,"sprite":"mob","value":10},"ironBoar":{"speed":"1.5","health":"15","stand":0,"walk":1,"die":1,"sprite":"mob","value":20},"stumpy":{"speed":"0.2","health":"500","stand":0,"walk":5,"die":9,"angry":13,"sprite":"mob","boss":"true","proj":"batball","atkSpd":300,"damage":2,"range":600,"value":[100,100,100]},"neckiJr":{"speed":"2","health":"10","stand":0,"walk":2,"die":2,"sprite":"mob","value":15},"stirge":{"speed":"1","health":"15","stand":0,"walk":1,"die":3,"sprite":"mob","value":15},"bubbling":{"speed":"1","health":"15","stand":0,"walk":6,"die":3,"sprite":"mob","value":15},"octopus":{"speed":"1","health":"15","stand":0,"walk":4,"die":3,"sprite":"mob","value":15},"wraith":{"speed":"1","health":"30","stand":0,"walk":3,"die":5,"sprite":"mob","value":30},"jrWraith":{"speed":"1","health":"10","stand":0,"walk":3,"die":5,"sprite":"mob","value":10},"shade":{"speed":"5","health":"100","stand":0,"walk":5,"die":5,"sprite":"mob","roam":true,"value":1000}}');

/***/ }),

/***/ "./src/purchase.json":
/*!***************************!*\
  !*** ./src/purchase.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"redDragon":["Summons a Red Dragon to spit hot fire","","Level 1: Baby Dragon","Level 2: +25% Damage & +1 Projectile","Level 3: Evolve! Adds explosion damage","Level 4+: Increase explosion area + 1 Proj."],"blueDragon":["Summons a Blue Dragon to spew frost","","Level 1: Baby Dragon","Level 2: +1 Projectile & +1 Pierce","Level 3: Evolve! Chill enemies & +2 Pierce","Level 4+: Increase chill effect + 1 Proj."],"greenDragon":["Summons a Green Dragon to spread poison","","Level 1: Baby Dragon","Level 2: +1 Projectile","Level 3: Evolve! Adds damage over time","Level 4+: Increased poison effect + 1 Proj."],"blackDragon":["Summons a Black Dragon to shoot bolts","","Level 1: Baby Dragon","Level 2: +1 Projectile","Level 3: Evolve! Adds column damage","Level 4+: Increase column area + 1 Proj."],"mushroomKnight":["Under development"],"Blaze":["Summons Elemental: Blaze","","Adds +1 projectile to attacks","Wiz & Elementals deal +40% damage","","Additional sprites further increase bonus"],"Dawn":["Summons Elemental: Dawn","","Adds +1 projectile to attacks","Wiz & Elementals deal +20% damage","Increases pick-up range by 50%","","Additional sprites further increase bonus"],"Night":["Summons Elemental: Night","","Adds +1 projectile to attacks","Wiz & Elementals deal +20% damage","Increases knockback effect by 20%","","Additional sprites further increase bonus"],"Wind":["Summons Elemental: Wind","","Adds +1 projectile to attacks","Increases speed by 20%","","Additional sprites further increase bonus"],"Thunder":["Summons Elemental: Dawn","","Adds +1 projectile to attacks","Wiz & Elementals deal +15% damage","Wiz & Elementals projectiles gain +1 pierce","","Additional sprites further increase bonus"]}');

/***/ }),

/***/ "./src/summonInfo.json":
/*!*****************************!*\
  !*** ./src/summonInfo.json ***!
  \*****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"redDragon":{"speed":"0","proj":["redBall","fireball2"],"name":"Red Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,5000],["cry",3,5000],["turn",8,3200]],"1":[["nothing",4,1500],["bewildered",4,1500],["sit",5,5000],["sleep",5,6000],["cry",4,5000],["nothing",4,1500]]},"spriteType":["redDragonBaby","redDragon"],"atkSpd":110,"damage":2,"value":100},"blueDragon":{"speed":"0","proj":["blueBall","iceball"],"name":"Blue Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,5000],["cry",3,5000],["turn",8,3200]],"1":[["nothing",4,1500],["bewildered",4,1500],["sit",5,5000],["sleep",5,6000],["cry",4,5000],["nothing",4,1500]]},"spriteType":["blueDragonBaby","blueDragon"],"atkSpd":100,"damage":2,"value":100},"greenDragon":{"speed":"0","proj":["greenBall","poisonball"],"name":"Green Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"spriteType":["greenDragonBaby","greenDragon"],"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,5000],["cry",3,5000],["turn",8,3200]],"1":[["nothing",4,1500],["bewildered",4,1500],["sit",5,5000],["sleep",5,6000],["cry",4,5000],["nothing",4,1500]]},"atkSpd":100,"damage":2,"value":100},"blackDragon":{"speed":"0","proj":["yellowBall","thunderball"],"name":"Black Dragon","stand":[7,9],"walk":0,"die":0,"angry":[3,6],"sprite":"pet","xOff":-55,"yOff":-48,"spriteType":["blackDragonBaby","blackDragon"],"emote":{"0":[["ignore",3,2000],["bewildered",3,1500],["sit",4,5000],["sleep",4,5000],["cry",3,5000],["turn",8,3200]],"1":[["sigh",6,760],["bewildered",4,1500],["sit",7,5000],["sleep",6,6000],["cry",4,5000],["sigh",6,760]]},"atkSpd":110,"damage":2,"value":100},"mushroomKnight":{"speed":"0","health":25,"name":"Mushroom Knight","stand":5,"walk":0,"die":0,"angry":10,"sprite":"mob","atkSpd":200,"damage":5,"value":100,"xOff":-135,"yOff":-40}}');

/***/ }),

/***/ "./src/waveInfo.json":
/*!***************************!*\
  !*** ./src/waveInfo.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"level1":["wave1-1","wave1-2","wave1-3","wave1-4","wave1-5","wave1-6","wave1-7","wave1-8","wave1-9","wave1-10"],"level2":["wave2-6","wave2-2","wave2-3","wave2-4","wave2-5"],"level3":["wave1-0"],"wave1-0":[["spore",2,2]],"wave1-1":[["spore",2,2],["spore",2,3],["spore",2,4],["spore",2,5],["spore",2,6],["spore",1,10],["spore",1,11],["spore",1,12],["spore",1,13],["spore",1,14]],"wave1-2":[["spore",2,2],["spore",2,3],["spore",2,4],["orangeMushroom",2,6],["spore",1,10],["spore",1,11],["spore",1,12],["orangeMushroom",1,14],["spore",1,18],["spore",1,19],["spore",1,20],["orangeMushroom",1,22]],"wave1-3":[["greenMushroom",2,3],["greenMushroom",3,4],["spore",2,5],["spore",2,6],["spore",2,7],["greenMushroom",1,10],["greenMushroom",3,11],["spore",1,12],["spore",1,13],["spore",1,14],["greenMushroom",3,17],["greenMushroom",1,18],["spore",3,19],["spore",3,20],["spore",3,21]],"wave1-4":[["greenMushroom",2,3],["greenMushroom",3,4],["orangeMushroom",2,5],["orangeMushroom",2,7],["greenMushroom",1,10],["greenMushroom",3,11],["orangeMushroom",1,12],["orangeMushroom",1,14],["greenMushroom",3,17],["greenMushroom",1,18],["orangeMushroom",3,19],["orangeMushroom",3,21]],"wave1-5":[["greenMushroom",2,3],["greenMushroom",3,4],["orangeMushroom",2,5],["blueMushroom",2,8],["greenMushroom",1,10],["greenMushroom",3,11],["orangeMushroom",1,12],["blueMushroom",1,15],["greenMushroom",3,17],["greenMushroom",1,18],["orangeMushroom",3,19],["blueMushroom",3,22]],"wave1-6":[["spore",2,2],["spore",2,2.5],["spore",2,3],["spore",2,3.5],["spore",2,4],["spore",2,4.5],["spore",2,5],["spore",2,5.5],["spore",2,6],["spore",2,6.5],["blueMushroom",1,7],["spore",1,11],["spore",1,11.5],["spore",1,12],["spore",1,12.5],["spore",1,13],["spore",3,17],["spore",3,17.5],["spore",3,18],["spore",3,18.5],["spore",3,19],["blueMushroom",[0,2],25]],"wave1-7":[["blueMushroom",2,2],["blueMushroom",2,4],["blueMushroom",2,6],["greenMushroom",2,8],["greenMushroom",3,13],["blueMushroom",3,16],["blueMushroom",3,18],["blueMushroom",3,20],["greenMushroom",2,22],["greenMushroom",1,27],["blueMushroom",1,30],["blueMushroom",1,32],["blueMushroom",1,34],["greenMushroom",3,36],["greenMushroom",[0,1,2],44]],"wave1-8":[["blueMushroom",3,2],["orangeMushroom",3,3],["blueMushroom",3,4],["orangeMushroom",3,5],["blueMushroom",3,6],["greenMushroom",2,8],["greenMushroom",3,13],["orangeMushroom",1,14],["blueMushroom",2,16],["orangeMushroom",2,17],["blueMushroom",2,18],["blueMushroom",2,19],["greenMushroom",2,22],["greenMushroom",1,27],["orangeMushroom",3,28],["blueMushroom",1,30],["orangeMushroom",1,31],["blueMushroom",1,32],["orangeMushroom",1,33],["blueMushroom",1,34],["greenMushroom",3,36],["greenMushroom",[0,1,2],44]],"wave1-9":[["blueMushroom",[1,2],3],["orangeMushroom",[1,2],4],["blueMushroom",[1,2],5],["orangeMushroom",[1,2],5],["blueMushroom",[1,2],6],["greenMushroom",[1,2],14],["blueMushroom",2,20],["orangeMushroom",2,21],["blueMushroom",2,22],["goldMushroom1",1,23],["blueMushroom",2,24],["greenMushroom",3,28],["blueMushroom",1,35],["orangeMushroom",1,36],["blueMushroom",1,37],["orangeMushroom",1,38],["blueMushroom",1,39],["greenMushroom",3,37]],"wave1-10":[["mushmom",2,1],["orangeMushroom",[0,2],10],["orangeMushroom",[0,2],12],["orangeMushroom",[0,2],14],["orangeMushroom",[0,2],16],["orangeMushroom",[0,2],24],["orangeMushroom",[0,2],26],["orangeMushroom",[0,2],28],["orangeMushroom",[0,2],30]],"wave2-1":[["stump",[0,1,2],2],["stump",[0,1,2],3],["stump",[0,1,2],4],["stump",[0,1,2],16],["stump",[0,1,2],17],["stump",[0,1,2],18],["stump",[0,1,2],30],["stump",[0,1,2],31],["stump",[0,1,2],32]],"wave2-2":[["stump",[0,1,2],2],["stump",[0,1,2],3],["darkStump",[0,1,2],4],["stump",[0,1,2],16],["darkStump",[0,1,2],17],["stump",[0,1,2],18],["darkStump",[0,1,2],30],["stump",[0,1,2],31],["stump",[0,1,2],32]],"wave2-3":[["stump",1,2],["darkStump",3,2],["stump",1,4],["darkStump",3,4],["stump",1,6],["darkStump",3,6],["stump",1,18],["darkStump",2,18],["stump",1,20],["darkStump",2,20],["stump",1,22],["darkStump",2,22],["stump",3,34],["darkStump",1,34],["stump",3,36],["darkStump",1,36],["stump",3,38],["darkStump",1,38]],"wave2-4":[["stump",[0,1,2],2],["stump",[0,1,2],3],["darkStump",[0,1,2],4],["ghostStump",1,5],["stump",[0,1,2],12],["stump",[0,1,2],13],["darkStump",[0,1,2],14],["ghostStump",2,15],["stump",[0,1,2],22],["stump",[0,1,2],23],["darkStump",[0,1,2],24],["ghostStump",3,25]],"wave2-5":[["stump",[0,1,2],2],["ghostStump",[1,2],3],["darkStump",[0,2],3],["darkStump",[0,1,2],4],["ghostStump",1,5],["stump",[0,1,2],12],["ghostStump",[0,1],3],["darkStump",3,3],["darkStump",[0,1,2],14],["ghostStump",2,15],["stump",[0,1,2],22],["ghostStump",[1,2],23],["darkStump",[0,1],24],["ghostStump",3,25]],"wave2-6":[["boar",2,2],["boar",2,2.5],["boar",2,3],["boar",2,3.5],["boar",2,4],["boar",2,4.5],["boar",2,5],["boar",2,5.5],["boar",2,6.5],["boar",2,7],["boar",2,7.5],["boar",2,8],["boar",2,8.5],["boar",2,9],["boar",2,9.5]],"wave3-0":[["neckiJr",2,1],["stirge",2,3],["jrWraith",1,3],["wraith",1,5],["shade",1,7]],"wave4-0":[["neckiJr",[0,1],1],["neckiJr",[0,1],1.5],["neckiJr",[0,1],2],["wraith",[0,1],4],["shade",[0,1],7],["wraith",[0,1],4],["shade",[0,1],7],["wraith",[0,1],4],["shade",[0,1],7],["shade",[0,1],8]]}');

/***/ }),

/***/ "./src/waveNotes.json":
/*!****************************!*\
  !*** ./src/waveNotes.json ***!
  \****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"wave1-1":"Defeat monsters! Pick up mesos before they disappear!","wave1-2":"Summon a companion to keep you company","wave1-3":"Dragons or Elementals? You choose! (but eventually get both)","wave1-5":"Reposition your dragons to busy lanes","wave1-6":"Escaped monsters means escaped mesos!","wave1-7":"Here come the big boys!","wave1-9":"Thar be a Golden Mushroom!","wave1-10":"Jump to dodge Mushmom\'s slam attack!","wave2-1":"Divide & Conquer!","wave2-3":"Beware of enemy projectiles! (your dragons are fine though)","wave2-5":"Boar stampede incoming!","wave2-10":"Stumpy\'s bat-bolt packs a huge punch!","wave3-1":"Jr Neckis dodge your summons\' attacks!","wave3-3":"Those Ocotpus are strange, aren\'t they?","wave3-5":"Wraiths roam around aimlessly","wave3-7":"A Shade comes to haunt you","wave3-10":"Many Shades of Black!"}');

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

    requestAnimationFrame(gameLoop); 

}

requestAnimationFrame(gameLoop); 

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsaUNBQWlDLGtCQUFrQjs7QUFFbkQ7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7OztBQUdBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDcFNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEI7OztBQUcxQixvREFBb0Q7QUFDcEQsbUNBQW1DOztBQUVuQztBQUNBOztBQUVBLGVBQWUsNkNBQUk7QUFDbkIsY0FBYzs7QUFFZDs7QUFFQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLCtCQUErQjtBQUMvQiwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL0hVRC5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvU3ByaXRlQW5pbWF0aW9uLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9lbmRTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2ltZy5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL21vYi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvbW9uZXkuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvcHJvamVjdGlsZS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvcmVzdGFydFNjcmVlbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvc3RhcnRTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3RpdGxlU2NyZWVuLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy91cGdyYWRlLmpzIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBIVUR7XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICAxNTA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNzU7IFxuICAgICAgICB0aGlzLnggPSAwOyBcbiAgICAgICAgdGhpcy55ID0gMDsgXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDIwOyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgfVxuXG4gICAgZGlzcGxheUhVRChjdHgsIGdhbWUpe1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIFxuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnOyBcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9J2JsYWNrJztcbiAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQ7XG5cbiAgICAgICAgdGhpcy5saXZlcyA9IFwiTGl2ZXM6IFwiICsgZ2FtZS5wbGF5ZXIuaGVhbHRoOyBcbiAgICAgICAgdGhpcy5tb25leSA9IFwiTWVzb3M6IFwiICsgZ2FtZS5wbGF5ZXIubW9uZXk7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBcIldhdmU6IFwiICsgZ2FtZS5sZXZlbCArICctJyArIGdhbWUud2F2ZTsgXG4gICAgICAgIHRoaXMudGV4dCA9IFt0aGlzLmxpdmVzLCB0aGlzLm1vbmV5LCB0aGlzLnN0YWdlXTsgXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy50ZXh0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnRleHRbaV0sIHRoaXMueCt0aGlzLnBhZGRpbmcsIHRoaXMueSt0aGlzLnBhZGRpbmcqKDEraSksIHRoaXMud2lkdGgpOyBcbiAgICAgICAgfVxuICAgIH1cblxuXG59IiwiaW1wb3J0IGltZyBmcm9tICcuL2ltZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZUFuaW1hdGlvbntcbiAgICBpbWFnZXMgPSBbXTtcbiAgICBjb25zdHJ1Y3RvcihmaWxlTmFtZSwgbnVtYmVyT2ZJbWFnZXMsIHRpbWVyQ291bnQsIHN0YXRlLCBzdG9wKXtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8PW51bWJlck9mSW1hZ2VzOyBpKyspeyAvLyBsb2FkcyBpbWFnZXMgaW50byBhcnJheSBcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gaW1nKGZpbGVOYW1lLnJlcGxhY2UoXCI/XCIsIGkpKTsgXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKGltYWdlKTsgXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpbWVyQ291bnQgPSB0aW1lckNvdW50O1xuICAgICAgICB0aGlzLnRpbWVyQ291bnREZWZhdWx0ID0gdGhpcy50aW1lckNvdW50OyBcbiAgICAgICAgdGhpcy5pbWFnZUluZGV4ID0gMDsgXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTsgXG4gICAgICAgIHRoaXMuc3RvcCA9IHN0b3A7IFxuICAgIH1cbiAgICBcbiAgICBpc0ZvcihzdGF0ZSl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBzdGF0ZTsgXG4gICAgfVxuXG4gICAgcmVzZXQoKXsgLy8gbG9vcCBhbmltYXRpb25cbiAgICAgICAgdGhpcy5pbWFnZUluZGV4ID0gMDsgICBcbiAgICB9XG5cbiAgICBnZXRGcmFtZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZUluZGV4OyBcbiAgICB9XG5cbiAgICBnZXRJbWFnZShwYXVzZSl7ICAvL3JldHVybnMgZnJhbWVcbiAgICAgICAgdGhpcy5zZXRJbWFnZUluZGV4KHBhdXNlKTsgXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlc1t0aGlzLmltYWdlSW5kZXhdOyBcbiAgICB9XG5cbiAgICBzZXRJbWFnZUluZGV4KHBhdXNlKXtcbiAgICAgICAgdGhpcy50aW1lckNvdW50LS07XG4gICAgICAgIGlmICh0aGlzLnRpbWVyQ291bnQgPD0gMCAmJiAhdGhpcy5zaG91bGRTdG9wKCkpe1xuICAgICAgICAgICAgdGhpcy50aW1lckNvdW50PSB0aGlzLnRpbWVyQ291bnREZWZhdWx0OyBcbiAgICAgICAgICAgIGlmICghcGF1c2UpIHt0aGlzLmltYWdlSW5kZXgrKzt9IC8vYW5pbWF0ZSBvbmx5IHdoZW4gdW5wYXVzZWRcbiAgICAgICAgICAgIGlmICh0aGlzLmltYWdlSW5kZXggPj0gdGhpcy5pbWFnZXMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlSW5kZXggPSAwOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZFN0b3AoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcCAgJiYgdGhpcy5pbWFnZUluZGV4ID09PSB0aGlzLmltYWdlcy5sZW5ndGgtMVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIGVuZFNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyMDA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDI1OyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI0cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnUmV0dXJuIHRvIE1haW4nO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy5nYW1lV2lkdGgvMjtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDI1MDtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSAzMDsgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5zdGF0czEgPSBbXTtcbiAgICAgICAgdGhpcy5zdGF0czIgPSBbXTtcbiAgICAgICAgdGhpcy5zdGF0UG9zaXRpb24gPSB0aGlzLng7IC8vc3RhcnRpbmcgeCBcbiAgICAgICAgdGhpcy5zdGF0SGVpZ2h0ID0gMjA7XG4gICAgICAgIHRoaXMuc3RhdFdpZHRoID0gMjAwO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy54Kyh0aGlzLndpZHRoLXRoaXMuYnV0dG9uV2lkdGgpLzIsIHRoaXMuaGVpZ2h0LXRoaXMuYnV0dG9uSGVpZ2h0LXRoaXMucGFkZGluZ11dIFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMV1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0RnVuY3Rpb25zKGdhbWUpe1xuICAgICAgICAgICAgZ2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICB9XG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lT3Zlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLmZhZGVPdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtnYW1lLnRpdGxlRGlzcGxheSA9IHRydWV9LCBcIjIwMDBcIil9IC8vIGZhZGUgb3V0IHRyYW5zaXRpb24gfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtnYW1lLmxldmVsRmluaXNoID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgpeyAgIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnOyAvL2RyYXcgYm9yZGVyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vc2V0cyBhcmVhIGZvciBjb2xsaXNpb24gKGlzUG9pbnRJblBhdGgpXG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCwgMik7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZHJhdyB0ZXh0IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzIpOyBcbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRTdGF0cyhnYW1lKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdHMxID0gW1sgJ01vbnN0ZXJzIERlZmVhdGVkOiAnKyBnYW1lLm1vbnN0ZXJLaWxsXSxcbiAgICAgICAgICAgICAgICAgICAgWydNb25zdGVycyBFc2NhcGVkOiAnKyBnYW1lLm1vbnN0ZXJFc2NhcGVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydNZXNvcyBDb2xsZWN0ZWQ6ICcrIGdhbWUubW9uZXlDb2xsZWN0ZWRdLFsnTWVzb3MgTG9zdDogJysgZ2FtZS5tb25leUxvc3RdXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc3RhdHMyID0gW11cbiAgICAgICAgICAgIGZvciAoY29uc3Qgb2JqIG9mIGdhbWUucGxheWVyT2JqZWN0cyl7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXRzT2JqID0gJydcbiAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT0gJ2dyZWVuRHJhZ29uJyl7IC8vYWRkIHBvaXNvblxuICAgICAgICAgICAgICAgICAgICBzdGF0c09iaiA9ICBbb2JqLm5hbWUrJyBEYW1hZ2U6ICcrIG9iai5kYW1hZ2VEZWFsdC50b0ZpeGVkKDApICsgXCIgKCtcIisgZ2FtZS5wb2lzb25EYW1hZ2UudG9GaXhlZCgwKSsgJyknXTsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iai50eXBlID09ICdyZWREcmFnb24nIHx8IG9iai50eXBlID09ICdibGFja0RyYWdvbicpeyAvL2V4cGxvZGUgZGFtYWdlIFxuICAgICAgICAgICAgICAgICAgICBzdGF0c09iaiA9ICBbb2JqLm5hbWUrJyBEYW1hZ2U6ICcrIG9iai5kYW1hZ2VEZWFsdC50b0ZpeGVkKDApICsgXCIgKCtcIisgb2JqLmV4cGxvZGVEYW1hZ2VEZWFsdC50b0ZpeGVkKDApKyAnKSddOyB9XG4gICAgICAgICAgICAgICAgZWxzZSB7c3RhdHNPYmogPSAgW29iai5uYW1lKycgRGFtYWdlOiAnKyBvYmouZGFtYWdlRGVhbHQudG9GaXhlZCgwKV07IH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRzMi5wdXNoKHN0YXRzT2JqKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgXG5cbiAgICAgICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVPdmVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ0dhbWUgT3ZlciEnLCB0aGlzLmdhbWVXaWR0aC8yLCAyNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdyhjdHgpOyAvL3JldHVybiB0byBtYWluIGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS53YXZlRmluaXNoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0MT0nJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0Mj0nJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmxldmVsID09IGdhbWUuZmluYWxMZXZlbCAmJiBnYW1lLmxldmVsTGlzdC5sZW5ndGggPT0gMCl7IC8vZmluYWwgbGV2ZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0MT0gJ0ZpbmFsIExldmVsIENsZWFyIScgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Mj0gJ1RoYW5rcyBmb3IgcGxheWluZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdyhjdHgpO30gLy9yZXR1cm4gdG8gbWFpbiBidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmxldmVsTGlzdC5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQxPSdMZXZlbCAnICtnYW1lLmxldmVsKyAnIENsZWFyISc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyB0ZXh0MT0nV2F2ZSBDbGVhciEnO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0MiA9ICdQcmVzcyBbRF0gdG8gc3RhcnQgbmV4dCB3YXZlISc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQxLCB0aGlzLmdhbWVXaWR0aC8yLCAyNSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGV4dDIsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMuaGVpZ2h0LTEwKS8vXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ3N0YXJ0JzsgLy9zdGF0cyBcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTdGF0cyhnYW1lKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zdGF0czEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7IGo8dGhpcy5zdGF0czFbaV0ubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuc3RhdHMxW2ldW2pdLCB0aGlzLnBhZGRpbmcrdGhpcy5zdGF0UG9zaXRpb24rKHRoaXMuc3RhdFdpZHRoLzQpKmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMjUrIHRoaXMucGFkZGluZysodGhpcy5zdGF0SGVpZ2h0KSppLCAzMDAgKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc3RhdHMyLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqPHRoaXMuc3RhdHMyW2ldLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnN0YXRzMltpXVtqXSwgdGhpcy5wYWRkaW5nK3RoaXMuc3RhdFBvc2l0aW9uK3RoaXMuc3RhdFdpZHRoKjEuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyNSsgdGhpcy5wYWRkaW5nKyh0aGlzLnN0YXRIZWlnaHQpKmksIDMwMCApOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgfVxufVxuIiwiaW1wb3J0IElucHV0SGFuZGxlciBmcm9tICcuL2lucHV0JzsgXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJzsgXG5pbXBvcnQgTW9iIGZyb20gJy4vbW9iJztcbmltcG9ydCBVcGdyYWRlIGZyb20gJy4vdXBncmFkZSc7IFxuaW1wb3J0IE1vbmV5IGZyb20gJy4vbW9uZXknOyBcbmltcG9ydCBzdGFydFNjcmVlbiBmcm9tICcuL3N0YXJ0U2NyZWVuJzsgXG5pbXBvcnQgdGl0bGVTY3JlZW4gZnJvbSAnLi90aXRsZVNjcmVlbic7IFxuaW1wb3J0IHJlc3RhcnRTY3JlZW4gZnJvbSAnLi9yZXN0YXJ0U2NyZWVuJzsgXG5pbXBvcnQgZW5kU2NyZWVuIGZyb20gJy4vZW5kU2NyZWVuJzsgXG5pbXBvcnQgSFVEIGZyb20gJy4vSFVEJzsgXG5pbXBvcnQgaW1nIGZyb20gJy4vaW1nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXtcbiAgICBjb25zdHJ1Y3RvcihnYW1lV2lkdGgsIGdhbWVIZWlnaHQpe1xuICAgICAgICB0aGlzLm5vdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy50aXRsZSA9IG5ldyB0aXRsZVNjcmVlbih0aGlzKTsgXG4gICAgICAgIHRoaXMudGl0bGUuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5lbmQgPSBuZXcgZW5kU2NyZWVuKHRoaXMpOyBcbiAgICAgICAgdGhpcy5lbmQuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5yZXN0YXJ0ID0gbmV3IHJlc3RhcnRTY3JlZW4odGhpcyk7IFxuICAgICAgICB0aGlzLnJlc3RhcnQuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5yZXN0YXJ0V2luZG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGl0bGVEaXNwbGF5ID0gZmFsc2U7Ly9mYWxzZTsgLy9lbmFibGUgZm9yIHJlbGVhc2VcbiAgICAgICAgdGhpcy5sb2FkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9W107XG4gICAgICAgIHRoaXMubW9iT2JqZWN0cyA9W107IFxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cyA9IFtdOyBcbiAgICAgICAgdGhpcy5sZXZlbCA9IDI7XG4gICAgICAgIHRoaXMuZmluYWxMZXZlbCA9MyA7IFxuICAgICAgICB0aGlzLndhdmUgPSAwOyBcbiAgICAgICAgdGhpcy5sYW5lID0gMTsgXG4gICAgICAgIHRoaXMuYmdTa3kgPSBpbWcoJ2JnL2JnU2t5Jyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgIHRoaXMuYmdTdGFnZSA9IGltZygnYmcvYmdTdGFnZScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLndhdmVJbmZvID0gcmVxdWlyZSgnLi93YXZlSW5mby5qc29uJyk7XG4gICAgICAgIHRoaXMud2F2ZU5vdGVzID0gcmVxdWlyZSgnLi93YXZlTm90ZXMuanNvbicpO1xuICAgICAgICB0aGlzLmxldmVsTm90ZSA9ICcnOyBcbiAgICAgICAgdGhpcy5sZXZlbExpc3QgPSBbLi4udGhpcy53YXZlSW5mb1snbGV2ZWwnK3RoaXMubGV2ZWxdXTsvL3sxOiBbJ3dhdmUxLTUnLCAnd2F2ZTEtMSddfSAvL0pTT05cbiAgICAgICAgdGhpcy53YXZlTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnRvTG9hZCA9W107IFxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IDkwOyAvL2xhbmUgc2l6ZVxuICAgICAgICB0aGlzLm5leHRXYXZlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmxldmVsU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53YXZlRmluaXNoID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMubGV2ZWxGaW5pc2ggPSBmYWxzZSA7IC8vY2xvc2Ugc3RhdHMgbWVudVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ub3RlVGltZSA9IDA7IFxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gMDsgLy9wbGF5ZWQgZ2FtZSB0aW1lIGZvciBldmVudHM7IFxuICAgICAgICB0aGlzLmdhbWVUaW1lUmVhbCA9IDA7IC8vdHJhY2tzIHRpbWUgYWdhaW5zdCBwYXVzZXMgXG4gICAgICAgIHRoaXMucGF1c2VkVGltZSA9IDA7IFxuICAgICAgICB0aGlzLnRpbWVPZmZzZXQgPSAwXG4gICAgICAgIHRoaXMudGltZU9mZnNldFN1bSA9IDA7IFxuICAgICAgICB0aGlzLnNldFBvaW50ID0gZmFsc2U7IFxuXG4gICAgICAgIHRoaXMuZmFkZSA9IDA7XG4gICAgICAgIHRoaXMuZmFkZUluID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmFkZU91dCA9IGZhbHNlIDtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gW107IFxuICAgICAgICB0aGlzLmVycm9yID0gZmFsc2U7IFxuICAgICAgICB0aGlzLm1vYkNvdW50ID0gMCA7IFxuXG4gICAgICAgIHRoaXMucG9pc29uRGFtYWdlID0gMDsgXG4gICAgICAgIHRoaXMubW9uc3RlcktpbGwgPSAwOyBcbiAgICAgICAgdGhpcy5tb25zdGVyRXNjYXBlID0gMDtcbiAgICAgICAgdGhpcy5kYW1hZ2VEZWFsdCA9IHt9OyBcbiAgICAgICAgdGhpcy5tb25leUNvbGxlY3RlZCA9IDA7XG4gICAgICAgIHRoaXMubW9uZXlMb3N0ID0gMDsgXG4gICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZT1mYWxzZTtcblxuICAgIH1cblxuICAgIHBhdXNlSGFuZGxlcih0aW1lLCBjdHgpe1xuXG4gICAgICAgIGlmICh0aGlzLnBhdXNlICl7IC8vc25hcHMgd2hlbiB0aW1lIGlzIHBhdXNlZDsgXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0UG9pbnQpe1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2VkVGltZSA9IHRpbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb2ludCA9IHRydWU7IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7dGhpcy50aW1lT2Zmc2V0ID0gdGltZSAtIHRoaXMucGF1c2VkVGltZX0gLy9ydW5zIHVwIG9mZnNldCB2YWx1ZSBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGdyYWRlLmRpc3BsYXkgPSBmYWxzZSA7XG4gICAgICAgICAgICB0aGlzLnRpbWVPZmZzZXRTdW0rPSB0aGlzLnRpbWVPZmZzZXQ7IC8vc3VtIG9mIG9mZnNldCB2YWx1ZXMgXG4gICAgICAgICAgICB0aGlzLnRpbWVPZmZzZXQgPSAwOyAgLy9yZXNldCBcbiAgICAgICAgICAgIHRoaXMuZ2FtZVRpbWVSZWFsID0gdGltZSAtdGhpcy50aW1lT2Zmc2V0U3VtOyAvL2FwcGx5IG9mZnNldCBzdW1cbiAgICAgICAgICAgIHRoaXMuc2V0UG9pbnQgPSBmYWxzZTsgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGF1c2Upe1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC42XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCx0aGlzLmdhbWVXaWR0aCwgdGhpcy5nYW1lSGVpZ2h0KTsgXG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMudXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IFwiMTZweCBhcmlhbFwiOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnUHJlc3MgRVNDIHRvIHVucGF1c2UnLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmdhbWVIZWlnaHQvMisyMCkgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVQYXVzZSgpeyAgIFxuICAgICAgICB0aGlzLnBhdXNlID0gIXRoaXMucGF1c2U7IFxuICAgIH1cblxuICAgIHJlc2V0RXZlcnl0aGluZygpe1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnJlc3RhcnRXaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aXRsZURpc3BsYXkgPSBmYWxzZTsgLy9lbmFibGUgZm9yIHJlbGVhc2VcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSBbXTsgXG4gICAgICAgIHRoaXMud2F2ZSA9IDA7IFxuICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICB0aGlzLmJnU3RhZ2UgPSBpbWcoJ2JnL2JnU3RhZ2UnK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53YXZlSW5mbyA9IHJlcXVpcmUoJy4vd2F2ZUluZm8uanNvbicpO1xuICAgICAgICB0aGlzLmxldmVsTGlzdCA9IFsuLi50aGlzLndhdmVJbmZvWydsZXZlbCcrdGhpcy5sZXZlbF1dOy8vezE6IFsnd2F2ZTEtNScsICd3YXZlMS0xJ119IC8vSlNPTlxuXG4gICAgICAgIHRoaXMud2F2ZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy50b0xvYWQgPVtdOyBcbiAgICAgICAgdGhpcy5uZXh0V2F2ZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy53YXZlRmluaXNoID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMubGV2ZWxGaW5pc2ggPSBmYWxzZSA7IC8vY2xvc2Ugc3RhdHMgbWVudVxuICAgICAgICAvL3RoaXMuZ2FtZVRpbWUgPSAwOyBcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gW107IFxuICAgICAgICB0aGlzLnBvaXNvbkRhbWFnZSA9IDA7IFxuICAgICAgICB0aGlzLm1vbnN0ZXJLaWxsID0gMDsgXG4gICAgICAgIHRoaXMubW9uc3RlckVzY2FwZSA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlRGVhbHQgPSB7fTsgXG4gICAgICAgIHRoaXMubW9uZXlDb2xsZWN0ZWQgPSAwO1xuICAgICAgICB0aGlzLm1vbmV5TG9zdCA9IDA7IFxuICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2U9ZmFsc2U7XG4gICAgICAgIHRoaXMubG9hZEJHKCk7XG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9IFt0aGlzLnBsYXllcl07XG4gICAgfVxuICAgIFxuICAgIHRpdGxlTWVudShjdHgpeyBcbiAgICAgICAgdGhpcy50aXRsZS5kaXNwbGF5TWVudShjdHgsIHRoaXMpOyBcbiAgICB9XG5cbiAgICB3YXZlQ2xlYXIoY3R4KXsgLy8gY2hlY2tzIGlmIHdhdmUgaXMgY2xlYXJlZFxuICAgICAgICBpZiAoIXRoaXMubmV4dFdhdmUgJiYgdGhpcy53YXZlU3RhcnQgJiYgdGhpcy5sZXZlbFN0YXJ0ICYmIFxuICAgICAgICAgICAgdGhpcy50b0xvYWQubGVuZ3RoID09IDAgICYmIHRoaXMubW9iT2JqZWN0cy5sZW5ndGg9PTAgKXtcbiAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5lbmQuZGlzcGxheSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVuZC5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuICAgICAgICB9IFxuICAgIH1cbiAgICBuZXh0TGV2ZWxMb2FkZXIoY3R4KXtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWxMaXN0Lmxlbmd0aCA9PSAwICYmIHRoaXMud2F2ZUZpbmlzaCl7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbEZpbmlzaCl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PXRoaXMuZmluYWxMZXZlbCl7IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFkZU91dCA9IHRydWV9LCBcIjIwMDBcIikgLy8gZmFkZSBvdXQgdHJhbnNpdGlvblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7IC8vbG9hZCBuZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsTGlzdCA9IFsuLi50aGlzLndhdmVJbmZvWydsZXZlbCcrdGhpcy5sZXZlbF1dOyAvLyBsb2FkIG5leHQgbGV2ZWwgd2F2ZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbEZpbmlzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdmUgPSAwOyAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmdTa3kgPSBpbWcoJ2JnL2JnU2t5Jyt0aGlzLmxldmVsKycucG5nJyk7IC8vcmVsb2FkIEJHIGFydCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZ1N0YWdlID0gaW1nKCdiZy9iZ1N0YWdlJyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gW107IC8vY2xlYXIgZmxvb3IgbW9uZXkgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRXYXZlICA9IGZhbHNlIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5sYW5lID0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb24gPSB7eDoyNSwgeTp0aGlzLmdhbWVIZWlnaHQgLSA0NSAtIDIqdGhpcy5wbGF5ZXIucm93SGVpZ2h0fTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZmxvb3IgPSB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtICgxK3RoaXMucGxheWVyLmxhbmUpKnRoaXMucGxheWVyLnJvd0hlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gdGhpcy5wbGF5ZXJPYmplY3RzLnNwbGljZSgxKTsgIC8vcHVsbHMgZXZlcnl0aGluZyBleHBlY3QgcGxheWVyXG4gICAgICAgICAgICAgICAgfSwgXCI0MDAwXCIpOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0V2F2ZUxvYWRlcigpe1xuICAgICAgICBpZiAodGhpcy5uZXh0V2F2ZSl7IC8vbG9hZCBuZXh0IHdhdmUgZGF0YSBmcm9tIEpTT05cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsTGlzdC5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlTGlzdCA9IFsuLi50aGlzLndhdmVJbmZvW3RoaXMubGV2ZWxMaXN0LnNoaWZ0KCldXTsgLy9cbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVUaW1lID0gdGhpcy5nYW1lVGltZVJlYWw7IC8vc3RhcnQgb2Ygd2F2ZTtcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICB0aGlzLndhdmUgKys7IFxuICAgICAgICAgICAgICAgIHRoaXMubmV4dFdhdmUgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlLmRpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSBmYWxzZTsgXG5cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLndhdmVOb3Rlc1snd2F2ZScrdGhpcy5sZXZlbCsnLScrdGhpcy53YXZlXSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxOb3RlID0gdGhpcy53YXZlTm90ZXNbJ3dhdmUnK3RoaXMubGV2ZWwrJy0nK3RoaXMud2F2ZV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90ZVRpbWUgPSB0aGlzLmdhbWVUaW1lUmVhbDsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB0aGlzLmxldmVsRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcmVlblRyYW5zaXRpb24oY3R4KXtcbiAgICAgICAgaWYgKHRoaXMuZmFkZUluKXsgLy9mYWRlIGluIFxuICAgICAgICAgICAgaWYgKHRoaXMuZmFkZT4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZhZGUgLT0gMC4wMzsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFkZSA8PSAwKSB7dGhpcy5mYWRlSW4gPSBmYWxzZTt9XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZhZGVPdXQpeyAvL2ZhZGUgdG8gYmxhY2tcbiAgICAgICAgICAgIGlmICh0aGlzLmZhZGUgPCAxKXsgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5mYWRlICs9IDAuMDM7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGUgPj0gMSkgeyBcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFkZUluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFkZU91dCA9IGZhbHNlO30sIFwiMTUwMFwiKX1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmFkZUluIHx8IHRoaXMuZmFkZU91dCl7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5mYWRlOyBcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLmdhbWVXaWR0aCwgdGhpcy5nYW1lSGVpZ2h0KTsgXG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgd2F2ZUxvYWRlcigpey8vbG9hZGRzIGVhY2ggbW9iIGZyb20gd2F2ZUxpc3RcbiAgICAgICAgaWYgKHRoaXMudG9Mb2FkLmxlbmd0aCA9PSAwICYmIHRoaXMud2F2ZUxpc3QubGVuZ3RoPjApIHt0aGlzLnRvTG9hZCA9IHRoaXMud2F2ZUxpc3Quc2hpZnQoKTt9XG4gICAgICAgIGlmICh0aGlzLnRvTG9hZFsyXSA8PSAgKHRoaXMuZ2FtZVRpbWVSZWFsIC0gdGhpcy5nYW1lVGltZSkvMTAwMCApe1xuICAgICAgICAgICAgdGhpcy53YXZlU3RhcnQgPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMubGV2ZWxTdGFydCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy50b0xvYWRbMV0ubGVuZ3RoPjApeyAvL211bHRpcGxlIGVudHJpZXMgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudG9Mb2FkWzFdLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYW5lID0gdGhpcy50b0xvYWRbMV1baV07IC8vc2V0cyBsYW5lIHRvIGxvYWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNb2IodGhpcywgdGhpcy50b0xvYWRbMF0sIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vYkNvdW50ICsrOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubGFuZSA9IHRoaXMudG9Mb2FkWzFdLTE7IC8vc2V0cyBsYW5lIHRvIGxvYWRcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vYih0aGlzLCB0aGlzLnRvTG9hZFswXSwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2JDb3VudCArKzsgfSAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnRvTG9hZCA9IFtdOyBcbiAgICAgICAgfSBcblxuICAgIH0gICAgXG4gICAgXG4gICAgYWRkRWxlbWVudChlbGVtZW50KXsgLy91cGdyYWRlIHNob3AgXG4gICAgICAgaWYgKHRoaXMucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aDw1KXtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5tb25leT4gdGhpcy5wbGF5ZXIuZWxlbWVudENvc3RbdGhpcy5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW9uZXkgLT0gdGhpcy5wbGF5ZXIuZWxlbWVudENvc3RbdGhpcy5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5lbGVtZW50TGlzdC5wdXNoKGVsZW1lbnQpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5lbGVtZW50YWxzKCk7IC8vbG9hZCBzcHJpdGVzXG4gICAgICAgICAgICAgICAgLy9hcHBseSB1cGdyYWRlc1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09ICdCbGF6ZScpe3RoaXMucGxheWVyLmRhbWFnZU11bHRpKz0wLjQgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09XCJEYXduXCIpe3RoaXMucGxheWVyLmxvb3RNdWx0aSs9MC41OyB0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC4yIH07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0nTmlnaHQnKXt0aGlzLnBsYXllci5rbm9ja2JhY2tNdWx0aSs9MC4yOyB0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC4yfTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSdXaW5kJyl7dGhpcy5wbGF5ZXIuc3BlZWRNdWx0aSs9MC4yfTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSdUaHVuZGVyJyl7dGhpcy5wbGF5ZXIucGllcmNlKz0xO3RoaXMucGxheWVyLmRhbWFnZU11bHRpKz0wLjIgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdW1tb24odHlwZSl7XG4gICAgICAgIGxldCB0cmFuc2ZlciA9IHRoaXMuc3RvcmFnZS5maW5kSW5kZXgob2JqPT5vYmoudHlwZSA9PT0gdHlwZSk7IFxuICAgICAgICB0aGlzLnN0b3JhZ2VbdHJhbnNmZXJdLnBvc2l0aW9uLnggPSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMjtcbiAgICAgICAgdGhpcy5zdG9yYWdlW3RyYW5zZmVyXS5wb3NpdGlvbi55ID0gKHRoaXMucGxheWVyLmZsb29yKzMwKTsgXG4gICAgICAgIHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0ubGFuZSA9IHRoaXMucGxheWVyLmxhbmU7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2godGhpcy5zdG9yYWdlW3RyYW5zZmVyXSk7IC8vY29waWVzIG9iamVjdCB0byBsaXN0XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zcGxpY2UodHJhbnNmZXIpOyAvL2RlbGV0ZXMgb2JqZWN0IGZyb20gc3RvcmFnZVxuICAgIH1cbiAgICByZWNhbGxDaGVjaygpe1xuICAgICAgICBpZiAoIXRoaXMucmVjYWxsU3RvcmFnZSAgJiYgdGhpcy5zdG9yYWdlWzBdKXtcbiAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IHRoaXMuc3RvcmFnZS5zaGlmdCgpIDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWNhbGwoKXsgICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMucmVjYWxsU3RvcmFnZSl7XG4gICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UgPSB0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSYmICAvL2NoZWNrcyBmb3IgZXhpc3RpbmcgdW5pdCBcbiAgICAgICAgICAgIChvYmoucG9zaXRpb24ueCA9PT0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzIpICYmIChvYmoubmFtZSE9PSdXaXonICkpXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlY2FsbFN0b3JhZ2UpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSB0aGlzLnJlY2FsbFN0b3JhZ2UudHlwZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMgPSB0aGlzLnBsYXllck9iamVjdHMuZmlsdGVyKCAgXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QudHlwZSAhPSB0eXBlOyB9KTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoucG9zaXRpb24ueS0zMCA9PT0gdGhpcy5wbGF5ZXIuZmxvb3IpICYmICAvL2NoZWNrcyBmb3IgZXhpc3RpbmcgdW5pdCBcbiAgICAgICAgICAgIChvYmoucG9zaXRpb24ueCA9PT0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzIpICYmIChvYmoubmFtZSE9PSdXaXonKSkpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueCA9ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZS5wb3NpdGlvbi55ID0gKHRoaXMucGxheWVyLmZsb29yKzMwKTsgXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLmxlZnQgPSAodGhpcy5wbGF5ZXIubGVmdCk7IFxuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZS5sYW5lID0gKHRoaXMucGxheWVyLmxhbmUpOyBcblxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKHRoaXMucmVjYWxsU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgLy8gaWYgKCF0aGlzLnJlY2FsbFN0b3JhZ2Upe1xuICAgICAgICAvLyAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai5wb3NpdGlvbi55LTMwID09PSB0aGlzLnBsYXllci5mbG9vcikmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgIC8vICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JyApKVxuXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5yZWNhbGxTdG9yYWdlKVxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGxldCB0eXBlID0gdGhpcy5yZWNhbGxTdG9yYWdlLnR5cGU7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbHRlciggIC8vcmVtb3ZlcyBsb290ZWQgY29pbnNcbiAgICAgICAgLy8gICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC50eXBlICE9IHR5cGU7IH0pOyAgICBcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICAgIHRoaXMucmVjYWxsU3RvcmFnZS5wb3NpdGlvbi54ID0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzI7XG4gICAgICAgIC8vICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueSA9ICh0aGlzLnBsYXllci5mbG9vciszMCk7IFxuXG4gICAgICAgIC8vICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaCh0aGlzLnJlY2FsbFN0b3JhZ2UpO1xuICAgICAgICAvLyAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gZmFsc2U7XG4gICAgICAgIC8vIH1cblxuXG4gICAgfVxuXG4gICAgY3JlYXRlTW9iKHBhcmVudCwgdHlwZSwgc2lkZSwgZ2FtZSA9IG51bGwgKXtcbiAgICAgICAgaWYgKHNpZGUgPT09IDApeyAvL1N1bW1vbiB1bml0XG4gICAgICAgICAgICBpZiAoIXRoaXMucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoucG9zaXRpb24ueS0zMCA9PT0gdGhpcy5wbGF5ZXIuZmxvb3IpICYmICAvL2NoZWNrcyBmb3IgZXhpc3RpbmcgdW5pdCBcbiAgICAgICAgICAgIChvYmoucG9zaXRpb24ueCA9PT0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzIpICYmIChvYmoubmFtZSE9PSdXaXonKSkpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBjb3N0ID0gMTAwMDsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLnN1bW1vbkNvc3RbdGhpcy5wbGF5ZXIuc3VtbW9uQ291bnRdKXsgXG4gICAgICAgICAgICAgICAgICAgIGNvc3QgPSB0aGlzLnBsYXllci5zdW1tb25Db3N0W3RoaXMucGxheWVyLnN1bW1vbkNvdW50XTsgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5tb25leT49Y29zdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaChuZXcgTW9iKHBhcmVudCwgdHlwZSwgMCkpIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW9uZXkgLT0gY29zdDsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5zdW1tb25Db3VudCArKzsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZ2FtZSl7Z2FtZS5lcnJvciA9IHRydWU7IH07IFxuXG4gICAgICAgIH0gZWxzZSB7dGhpcy5tb2JPYmplY3RzLnB1c2gobmV3IE1vYihwYXJlbnQsIHR5cGUsIDEpKX1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgbG9hZEJHKCl7XG4gICAgICAgIHRoaXMuYmdTa3kgPSBpbWcoJ2JnL2JnU2t5Jyt0aGlzLmxldmVsKycucG5nJyk7IC8vbG9hZCBza3kgYmdcbiAgICB9XG5cbiAgICBzdGFydCgpe1xuICAgICAgICB0aGlzLnN0YXJ0TWVudSA9IG5ldyBzdGFydFNjcmVlbih0aGlzKTtcbiAgICAgICAgdGhpcy5zdGFydE1lbnUuaW5pdGlhbGl6ZSh0aGlzKTsgXG4gICAgICAgIHRoaXMudXBncmFkZSA9IG5ldyBVcGdyYWRlKHRoaXMpOyBcbiAgICAgICAgdGhpcy51cGdyYWRlLmluaXRpYWxpemUodGhpcyk7IFxuICAgICAgICB0aGlzLkhVRE1lbnUgPSBuZXcgSFVEKHRoaXMpOyBcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMpO1xuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMgPSBbdGhpcy5wbGF5ZXJdO1xuICAgICAgICB0aGlzLmlucHV0SGFuZGxlciA9IG5ldyBJbnB1dEhhbmRsZXIodGhpcy5wbGF5ZXIsIHRoaXMudXBncmFkZSwgdGhpcyk7ICAgICAgICBcblxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaChuZXcgTW9iKHRoaXMucGxheWVyLCAncmVkRHJhZ29uJywgMCwxLDMpKTsgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKG5ldyBNb2IodGhpcy5wbGF5ZXIsICdibHVlRHJhZ29uJywgMCwyLDMpKTsgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKG5ldyBNb2IodGhpcy5wbGF5ZXIsICdncmVlbkRyYWdvbicsIDAsMywzKSk7IFxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaChuZXcgTW9iKHRoaXMucGxheWVyLCAnYmxhY2tEcmFnb24nLCAwLDQsMykpOyBcblxuICAgIH1cblxuXG5cbiAgICBkcmF3KGN0eCl7IC8vcnVucyBkcmF3IGZ1bmN0aW9uIGZvciBvYmplY3QgbGlzdCBcblxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmdTa3ksIDAsIDApOyBcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJnU3RhZ2UsIDAsIDApOyBcbiAgICAgICAgdGhpcy5zdGFydE1lbnUuZGlzcGxheU1lbnUoY3R4LCB0aGlzICk7XG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4LCB0aGlzLnBhdXNlKSApXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmVtb3RlKHRoaXMpKTsgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4LHRoaXMucGF1c2UpIClcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCx0aGlzLnBhdXNlKSApOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGxheWVyLnJlY2FsbEljb24oY3R4LCB0aGlzKTtcbiAgICBcbiAgICB9IFxuXG4gICAga25vY2tiYWNrKG9iaiwgZGlyZWN0aW9uLCBtdWx0aSl7XG4gICAgICAgIGlmIChvYmoubmFtZSA9PSdXaXonKXsgLy9vbmx5IHBsYXllciBwb3BzIHVwXG4gICAgICAgICAgICBvYmouanVtcCA9IHRydWU7XG4gICAgICAgICAgICBvYmouaW52dWxuVGltZSA9IDExMDsgXG4gICAgICAgICAgICBvYmouc3BlZWRZICs9IDQ7XG4gICAgICAgICAgICBvYmoua25vY2tiYWNrRm9yY2U9IC04KmRpcmVjdGlvbjsgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgb2JqLmhpdCA9IHRydWU7IFxuICAgICAgICAgICAgb2JqLmtub2NrYmFja1RpbWUgPSB0aGlzLmdhbWVUaW1lUmVhbDsgIC8vc3RvcmVzIHdoZW4gdGFyZ2V0IGtub2NrYmFjaztcbiAgICAgICAgICAgIG9iai5rbm9ja2JhY2tGb3JjZSA9IC00KmRpcmVjdGlvbiooMSsgKG11bHRpLTEpLzQpOyAvL2FkZCBhcyBzdGF0XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWdncm8ob2JqMSwgb2JqMil7IC8vIGNoZWNrcyBpZiBvYmoxIHJhbmdlIGlzIHdpdGhpbiBvYmoyXG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIG9iajIpe1xuICAgICAgICAgICAgaWYgKHRhcmdldC5oZWFsdGg+MCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG9iajEuaGl0Ym94WzBdK29iajEuaGl0Ym94WzJdK29iajEucmFuZ2U+dGFyZ2V0LmhpdGJveFswXSAmJiBcbiAgICAgICAgICAgICAgICAgICAgb2JqMS5oaXRib3hbMF0tb2JqMS5yYW5nZTx0YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0peyAvL2FnZ3JvIGZyb20gcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFsxXTx0YXJnZXQuaGl0Ym94WzFdICYmIG9iajEuaGl0Ym94WzFdK29iajEuaGl0Ym94WzNdPnRhcmdldC5oaXRib3hbMV0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoxLmxhbmUgPT0gdGFyZ2V0LmxhbmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIHtpZiAob2JqMS5hZ2dybyl7b2JqMS5hdHRhY2soKX07IC8vb25seSBhZ2dybyBtb2JzIGhhdmUgYXR0YWNrIGFuaW1hdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgfVxuICAgIFxuICAgIGxvb3RNb25leShvYmoxLCBvYmoyKXtcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7IC8vLSh0aGlzLndpZHRoKigtMSt0aGlzLmxvb3RNdWx0aSkpXG4gICAgICAgICAgICBpZiAoIChvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdICYmIG9iajEuaGl0Ym94WzBdKzgwKihvYmoxLmxvb3RNdWx0aSkgPiB0YXJnZXQuaGl0Ym94WzBdKSB8fCAvL29iajEgb24gbGVmdFxuICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXSA+IHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSAmJiBvYmoxLmhpdGJveFswXS04MCoob2JqMS5sb290TXVsdGktMSk8dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICkpeyAvL29iajEgb24gcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXStvYmoxLmhpdGJveFszXT50YXJnZXQuaGl0Ym94WzFdKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQuc3RhcnRGYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEubW9uZXkgKz0gdGFyZ2V0LnZhbHVlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9uZXlDb2xsZWN0ZWQgKz0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0YXJ0RmFkZSA9IHRydWU7Ly90cnVlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5mbG9hdCA9IHRydWU7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxvc3QpeyBcbiAgICAgICAgICAgICAgICB0aGlzLm1vbmV5TG9zdCs9dGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlPTAgfTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gdGhpcy5tb25leU9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGxvb3RlZCBjb2luc1xuICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LmRlbGV0ZSA9PSBmYWxzZTsgfSk7ICAgICBcbiAgICB9XG5cbiAgICBleHBsb2RlRGFtYWdlKG9iajEsIG9iajIsIG9iajMpe1xuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGVhbHRoPjApe1xuICAgICAgICAgICAgICAgIGlmICggKG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0gJiYgb2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0rb2JqMy5hcmVhID4gdGFyZ2V0LmhpdGJveFswXSkgfHwgLy9vYmoxIC0+dGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT50YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gJiYgb2JqMS5oaXRib3hbMF0tb2JqMy5hcmVhPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSApKXsgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG9iajEuaGl0Ym94WzFdPnRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSt0YXJnZXQuaGl0Ym94WzNdKXx8b2JqMy5jb2x1bW4+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmhlYWx0aCAtPSBvYmozLmRhbWFnZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMy5leHBsb2RlRGFtYWdlRGVhbHQgKz0gb2JqMy5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgY29sbGlzaW9uKG9iajEsIG9iajIsIG9iajMgPSBudWxsKXsgLy8gY2hlY2tzIGlmIG9iajEgaXMgaGl0dGluZyBvYmoyIFxuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgIGlmIChvYmoxLmhlYWx0aD4wICYmIHRhcmdldC5oZWFsdGg+MCl7XG4gICAgICAgICAgICAgICAgaWYgKCAob2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSAmJiBvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT4gdGFyZ2V0LmhpdGJveFswXSkgfHwgLy9vYmoxIC0+dGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT50YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gJiYgXG4gICAgICAgICAgICAgICAgICAgIG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSApKXsgLy8gdGFyZ2V0IDwtIG9iajFcblxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMV0+dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXTx0YXJnZXQuaGl0Ym94WzFdK3RhcmdldC5oaXRib3hbM10peyAvL3ktYm91bmRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLnByb2plY3RpbGUgJiYgIW9iajEuZXhwbG9kZSAmJiAhb2JqMS5oaXRMaXN0LmluY2x1ZGVzKHRhcmdldC5uYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zaWRlID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXQubGFuZSA9PSBvYmoxLmxhbmUpeyAvL3BsYXllciBvbmx5IGNhbiBoaXQgZnJvbSBwcm9qIGluIGxhbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQsIG9iajMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5waWVyY2UgLT0gMTsgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5oaXRMaXN0LnB1c2godGFyZ2V0Lm5hbWUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQsIG9iajMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoxLnBpZXJjZSAtPSAxOyAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuaGl0TGlzdC5wdXNoKHRhcmdldC5uYW1lKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmozLmFyZWE+MCl7dGhpcy5leHBsb2RlRGFtYWdlKG9iajEsIG9iajIsIG9iajMpfTsgLy9hcmVhIGRhbWFnZTsgY2hlY2tzIGZvciBuZWFyYnkgdGFyZ2V0cyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5waWVyY2U8PTApe29iajEuZXhwbG9kZSA9IHRydWV9OyAvL2Rlc3Ryb3kgcHJvamVjdGlsZSAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghb2JqMS5wcm9qZWN0aWxlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5sYW5lID09IHRhcmdldC5sYW5lKXt0aGlzLmRhbWFnZUNhbGMob2JqMSwgdGFyZ2V0KX07XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIGRhbWFnZUNhbGMob2JqMSwgb2JqMiwgb2JqMyA9IG51bGwpeyAvL29iajEgKG93bmVkIGJ5IG9iajMpIGF0dGFja2luZyBvYmoyIFxuICAgICAgICBpZiAob2JqMi5pbnZ1bG5UaW1lID09IDAgJiYgb2JqMS50b3VjaEhpdCkge1xuICAgICAgICAgICAgbGV0IGRhbWFnZSA9IG9iajEuZGFtYWdlO1xuICAgICAgICAgICAgbGV0IGtub2NrYmFjayA9IDE7IFxuICAgICAgICAgICAgaWYgKG9iajMpe29iajMuZGFtYWdlRGVhbHQrPSBkYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIGtub2NrYmFjayA9IG9iajMua25vY2tiYWNrTXVsdGk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvYmoxLmNoaWxsPjApe1xuICAgICAgICAgICAgICAgIGlmICggTWF0aC5hYnMob2JqMi5zcGVlZFgpLW9iajIuY2hpbGxBbW91bnQ+MCl7b2JqMi5jaGlsbEFtb3VudCs9IG9iajEuY2hpbGx9XG4gICAgICAgICAgICAgICAgZWxzZSBvYmoyLmNoaWxsQW1vdW50ID0gTWF0aC5hYnMob2JqMi5zcGVlZFgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2JqMS5wb2lzb24+MCl7XG4gICAgICAgICAgICAgICAgaWYgKG9iajIucG9pc29uU3RhY2srMTxvYmoxLnBvaXNvbk1heCl7IC8vYWRkIHRvIG1heCBzdGFja3NcbiAgICAgICAgICAgICAgICAgICAgb2JqMi5wb2lzb25BbW91bnQgKz0gb2JqMS5wb2lzb247XG4gICAgICAgICAgICAgICAgICAgIG9iajIucG9pc29uU3RhY2srKzt9XG4gICAgICAgICAgICAgICAgb2JqMi5wb2lzb25UaW1lID0gNTsgIC8vZm91ciB0aWNrcyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2JqMi5oZWFsdGggLT0gZGFtYWdlO1xuICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gKz0gZGFtYWdlKmtub2NrYmFjaztcblxuICAgICAgICAgICAgaWYgKG9iajIua25vY2tiYWNrVGhyZXNoIDw9IG9iajIua25vY2tiYWNrU3VtKXtcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5wb3NpdGlvbi54Pm9iajIucG9zaXRpb24ueCl7IHRoaXMua25vY2tiYWNrKG9iajIsIDEsIGtub2NrYmFjayApfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5rbm9ja2JhY2sob2JqMiwgLTEsIGtub2NrYmFjayk7XG4gICAgICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gPSAwIFxuICAgICAgICAgICAgICAgIC8vIG9iajIua25vY2tiYWNrVGhyZXNoICo9MS4yIC8vaW5jcmVhc2UgdGhyZXNob2xkIGVhY2ggdGltZVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG5cblxuICAgIH1cbiAgICBsb3NlTGlmZShjdHgpeyAvL21vYiBlc2NhcGVzXG4gICAgICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMubW9iT2JqZWN0cyl7XG4gICAgICAgICAgICBpZiAob2JqLnBvc2l0aW9uLnggPD0gLW9iai53aWR0aCoyKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyLmhlYWx0aCAtPSAxOyBcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5yb2FtKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxvYmoudmFsdWUubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leUxvc3QrPW9iai52YWx1ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMubW9uZXlMb3N0ICs9IG9iai52YWx1ZTt9IC8vbG9zdCBtb25leVxuICAgICAgICAgICAgICAgICAgICBvYmouYWxpdmUgPSBmYWxzZTsgLy9kZWxldGUgbW9uc2VyOyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyRXNjYXBlICsrOyBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge29iai5zcGVlZFggPSAtb2JqLnNwZWVkWDsgb2JqLmxlZnQ9IW9iai5sZWZ0O31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3NpdGlvbi54ID49IHRoaXMuZ2FtZVdpZHRoICYmIG9iai5zcGVlZFg8MClcbiAgICAgICAgICAgICAgICB7b2JqLnNwZWVkWCA9IC1vYmouc3BlZWRYXG4gICAgICAgICAgICAgICAgb2JqLmxlZnQ9IW9iai5sZWZ0fTtcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy8gZHJhd0dyaWQoY3R4KXtcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpOyAgLy8gdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodFxuICAgIC8vICAgICBjdHgubW92ZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0KTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjIpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjIpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjMpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjMpOyAgICAgICAgXG4gICAgLy8gICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyB9XG5cbiAgICB1cGdyYWRlTWVudShjdHgpe1xuICAgICAgICB0aGlzLkhVRE1lbnUuZGlzcGxheUhVRChjdHgsIHRoaXMpOyAgXG4gICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5oZWFsdGggPD0gMCApe1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5lbmQuZGlzcGxheSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVuZC5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNwYXduTW9uZXkob2JqKXtcbiAgICAgICAgaWYgKG9iai5zdGF0ZSA9PSAnZGllJyAmJiAhb2JqLmxvb3REcm9wKXtcbiAgICAgICAgICAgIGlmIChvYmoudmFsdWUubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgIGxldCB4ID0gLTAuNioyIDsgLy9tb25leSBzcHJlYWRcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxvYmoudmFsdWUubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5wdXNoKG5ldyBNb25leSh0aGlzLCBvYmosIG9iai52YWx1ZVtpXSwgeCtpKjAuNikpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7dGhpcy5tb25leU9iamVjdHMucHVzaChuZXcgTW9uZXkodGhpcywgb2JqLCBvYmoudmFsdWUpKX1cbiAgICAgICAgICAgIG9iai5sb290RHJvcCA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5tb25zdGVyS2lsbCsrOyBcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLnNwYXduTW9uZXkob2JqZWN0KSk7IFxuICAgICAgICB0aGlzLmxvc2VMaWZlKCk7IC8vZW5lbWllcyBwYXN0IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMgPSB0aGlzLm1vYk9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGRlYWQvcGFzc2luZyBvYmplY3RzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9iamVjdC5hbGl2ZSAhPT0gZmFsc2UpfSk7ICAgICAgICBcbiAgICAgICAgdGhpcy5sb290TW9uZXkodGhpcy5wbGF5ZXIsIHRoaXMubW9uZXlPYmplY3RzKTtcblxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKHRoaXMpICk7IFxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSh0aGlzKSApOyBcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSl7XG4gICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuYWdncm8ob2JqZWN0LCB0aGlzLm1vYk9iamVjdHMpICk7ICAvL3N1bW1vbiBhdHRhY2tzXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLmFnZ3JvKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyAvL21vYiBhdHRhY2tzXG5cbiAgICAgICAgdGhpcy5jb2xsaXNpb24odGhpcy5wbGF5ZXIsIHRoaXMubW9iT2JqZWN0cyk7IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuY29sbGlzaW9uKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyBcblxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5tb2JBdHRhY2sodGhpcykpOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3Quc3VtbW9uQXR0YWNrKHRoaXMpKTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PiAvL21vYiBwcm9qIHRvIHBsYXllciBcbiAgICAgICAgICAgIG9iamVjdC5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0Mik9PiBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbihvYmplY3QyLCBbdGhpcy5wbGF5ZXJdLCBvYmplY3QpKSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PiAvL3BsYXllciBwcm9qIHRvIG1vYnNcbiAgICAgICAgICAgIG9iamVjdC5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0Mik9PiBcbiAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb24ob2JqZWN0MiwgdGhpcy5tb2JPYmplY3RzLCBvYmplY3QpXG4gICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICApOyBcblxuICAgIH1cbiAgIFxuXG4gICAgXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1nKGZpbGUpe1xyXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTsgXHJcbiAgICBpbWFnZS5zcmMgPSAnaW1hZ2VzLycrZmlsZTsgXHJcbiAgICByZXR1cm4gaW1hZ2U7IFxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0SGFuZGxlcntcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIHVwZ3JhZGUsIEdhbWUpe1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PnsgICAgXG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7IC8vYTo2NTsgczo4MzsgZDo2OCwgdzogODc7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDM3OiAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUudGl0bGVEaXNwbGF5ICYmIEdhbWUubGV2ZWw+MSl7R2FtZS5sZXZlbC0tfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWC09MX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc3BlZWRYID0gLXBsYXllci5zcGVlZDsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmxlZnQgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAzOTogLy9yaWdodCBhcnJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS50aXRsZURpc3BsYXkgJiYgR2FtZS5sZXZlbDxHYW1lLmZpbmFsTGV2ZWwpe0dhbWUubGV2ZWwrK31cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblg8Mil7dXBncmFkZS5zZWxlY3Rpb25YKz0xfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zcGVlZFggPSBwbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5sZWZ0ID0gZmFsc2U7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcblxuICAgICAgICAgICAgICAgIGNhc2UgMzg6IC8vIHVwIGFycm93XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWS09MX07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3BsYXllci50ZWxlcG9ydCgtMSk7fVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSA0MDogLy8gZG93biBhcnJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWTw1KXt1cGdyYWRlLnNlbGVjdGlvblkrPTF9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoMSk7fVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgOTA6IC8vWiByZWNhbGxcbiAgICAgICAgICAgICAgICBpZiAoIUdhbWUudGl0bGVEaXNwbGF5KSB7R2FtZS5yZWNhbGwoKTsgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDg4OiAvL1gganVtcFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBsYXllci5qdW1wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zcGVlZFkgPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5qdW1wID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayAgICAgXG5cbiAgICAgICAgICAgICAgICBjYXNlIDY3OiAvL0MgYXR0YWNrXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5hdHRhY2soR2FtZS5wYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSA2NTogLy9BIG9wZW4gc2hvcFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBncmFkZS50b2dnbGVNZW51KEdhbWUpOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgODM6IC8vIFMgYnV5XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkgJiYgIUdhbWUudGl0bGVEaXNwbGF5KXt1cGdyYWRlLnB1cmNoYXNlKEdhbWUpfVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDY4OiAvL0Qgc3RhcnQgd2F2ZVxuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS53YXZlRmluaXNoICYmIEdhbWUuc3RvcmFnZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5zdGFydE1lbnUuZGlzcGxheSA9IGZhbHNlfTsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDI3OiAvLyBFU0NcbiAgICAgICAgICAgICAgICAgICAgR2FtZS50b2dnbGVQYXVzZSgpOyBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vb2xkIGNvbnRyb2xzIFxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNjU6IC8vQSBtb3ZlIGxlZnQgXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWC09MX07XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcGxheWVyLnNwZWVkWCA9IC1wbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcGxheWVyLmxlZnQgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNjg6IC8vRCBtb3ZlIHJpZ2h0XG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWDwyKXt1cGdyYWRlLnNlbGVjdGlvblgrPTF9O1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5zcGVlZFggPSBwbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgIC8vICAgICBwbGF5ZXIubGVmdCA9IGZhbHNlO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDg3OiAvL1cgdGVsZXBvcnQgdXBcbiAgICAgICAgICAgICAgICAvLyBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWS09MX07XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoLTEpO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA4MzogLy9TIHRlbGVwb3J0IGRvd25cbiAgICAgICAgICAgICAgICAvLyBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPDUpe3VwZ3JhZGUuc2VsZWN0aW9uWSs9MX07XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoMSk7fVxuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDc0OiAgLy9KIFxuICAgICAgICAgICAgICAgIC8vIGlmICh1cGdyYWRlLmRpc3BsYXkpe3VwZ3JhZGUucHVyY2hhc2UoR2FtZSl9ICAgIFxuICAgICAgICAgICAgICAgIC8vIGVsc2UgaWYgKCFwbGF5ZXIuanVtcCl7XG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5zcGVlZFkgPSAxMjtcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLmp1bXAgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWsgXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDc1OiAvL0tcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLmF0dGFjayhHYW1lLnBhdXNlKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNzk6IC8vT1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoR2FtZS53YXZlRmluaXNoICYmIEdhbWUuc3RvcmFnZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2FtZS5zdGFydE1lbnUuZGlzcGxheSA9IGZhbHNlfTsgXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBicmVha1xuXG4gICAgXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5NjpcbiAgICAgICAgICAgICAgICAvLyAgICAgdXBncmFkZS50b2dnbGVNZW51KCk7IFxuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5NzogLy8xXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ3JlZERyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgOTg6IC8vMlxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdibHVlRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5OTogLy8zXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ2dyZWVuRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgLy8gY2FzZSAxMDA6IC8vNFxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdibGFja0RyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+eyAgICBcbiAgICAgICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKXsgLy9hOjY1OyBzOjgzOyBkOjY4LCB3OiA4NztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS50aXRsZURpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5mYWRlT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57R2FtZS50aXRsZURpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lLnJlc2V0RXZlcnl0aGluZygpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDgwMCl9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDk6ICBcbiAgICAgICAgICAgICAgICBjYXNlIDE4OiBcbiAgICAgICAgICAgICAgICBjYXNlIDExNjogYnJlYWs7IFxuXG4gICAgICAgICAgICAgICAgY2FzZSAzNzogICAvL0EgPSA2NVxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLnNwZWVkWDwwKSBwbGF5ZXIuc3BlZWRYID0gMDsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzk6IC8vIEQgPSA2OFxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLnNwZWVkWD4wKSBwbGF5ZXIuc3BlZWRYID0gMDsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfVxufSIsImltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSc7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2J7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgdHlwZSwgc2lkZSwgdGVzdCA9IDAsIGxldmVsPTApe1xuICAgICAgICB0aGlzLnNpZGUgPSBzaWRlO1xuICAgICAgICBpZiAodGhpcy5zaWRlID09IDApe3RoaXMudHlwZUluZm8gPSByZXF1aXJlKCcuL3N1bW1vbkluZm8uanNvbicpIH1cbiAgICAgICAgZWxzZSAodGhpcy50eXBlSW5mbyA9IHJlcXVpcmUoJy4vbW9iSW5mby5qc29uJykpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgXG4gICAgICAgICBcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsndmFsdWUnXTsgXG4gICAgICAgIHRoaXMubG9vdERyb3AgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAxOyBcbiAgICAgICAgdGhpcy5mYWRlID0gMTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmFsaXZlID0gdHJ1ZTsgIFxuICAgICAgICB0aGlzLmludnVsblRpbWUgPSAgMDsgXG4gICAgICAgIHRoaXMuYXR0YWNrQ0QgPSAwOyBcbiAgICAgICAgdGhpcy5tYXhTcGVlZCA9IDE1OyBcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgICAgIHRoaXMudG91Y2hIaXQgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDA7IFxuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlJ107IFxuICAgICAgICAvL3RoaXMuZGFtYWdlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkYW1hZ2UnXTsgXG4gICAgICAgIHRoaXMuYXR0YWNrU3BlZWQgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2F0a1NwZCddOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3BlZWRYID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcGVlZCddO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7IFxuICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTtcbiAgICAgICAgdGhpcy5sYW5lID0gZ2FtZS5sYW5lOyAgLy8gd2hpY2ggbGFuZVxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDEpeyAvL0VuZW15IE1vYiBcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMudHlwZStnYW1lLm1vYkNvdW50OyBcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSA1MDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gNjU7IFxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncmFuZ2UnXSl7dGhpcy5yYW5nZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncmFuZ2UnXX1cbiAgICAgICAgICAgIGVsc2Uge3RoaXMucmFuZ2UgPSAxMDt9XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2hlYWx0aCddO1xuICAgICAgICAgICAgdGhpcy5tYXhIZWFsdGggPSB0aGlzLmhlYWx0aDsgXG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnd2Fsayc7XG4gICAgICAgICAgICB0aGlzLnhPZmY9LTcwO1xuICAgICAgICAgICAgdGhpcy55T2ZmPS04NTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIChyaWdodHNpZGUpXG4gICAgICAgICAgICAgICAgeDogdGhpcy5nYW1lV2lkdGgrNTAsIFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuZ2FtZUhlaWdodCAtIDEwNSAtIGdhbWUucm93SGVpZ2h0KmdhbWUubGFuZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gUEMgcGV0c1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDUwOyAvL3Nwcml0ZSBzaXplIFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDsgXG4gICAgICAgICAgICB0aGlzLnJhbmdlID0gNjAwOyAvL3dob2xlIGxhbmU/XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDE7IFxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDE7IFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCdcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGZhbHNlOyBcbiAgICAgICAgICAgIHRoaXMueU9mZj0wO1xuICAgICAgICAgICAgdGhpcy54T2ZmPTA7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZURlYWx0ID0gMDtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnbmFtZSddO1xuICAgICAgICAgICAgaWYgKGxldmVsIT0wKSB7dGhpcy5sZXZlbCA9IGxldmVsfTsgXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gJ0x2bC4gJyArIHRoaXMubGV2ZWw7IFxuICAgICAgICAgICAgdGhpcy5lbW90ZVRpbWUgPSAxMDA7XG4gICAgICAgICAgICB0aGlzLmVtb3RlTGVuZ3RoID0gW107XG4gICAgICAgICAgICB0aGlzLnlTdGFydCA9IGdhbWUuZmxvb3IrMzA7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgIHg6IChnYW1lLmN1clRpbGUqODApK2dhbWUud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiBnYW1lLmZsb29yKzMwXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBvc2l0aW9uKTsgXG4gICAgICAgIH07ICAvL29mZnNldCBmb3Igc3ByaXRlcyBcbiAgICAgICAgLy9pZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pICh0aGlzLnBvc2l0aW9uLnkgLT10aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXSkgO1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcHJpdGVUeXBlJ10pe3RoaXMubG9hZFNwcml0ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlVHlwZSddWzBdfVxuICAgICAgICBlbHNlIHt0aGlzLmxvYWRTcHJpdGUgPSB0aGlzLnR5cGV9O1xuICAgICAgICB0aGlzLmZvcm0gPSAwOyBcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZGFtYWdlJ10peyAvL21vYiBhdHRhY2tzXG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RhbWFnZSddXG4gICAgICAgICAgICAgICAgdGhpcy5hZ2dybyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIHt0aGlzLmRhbWFnZT0xOyB0aGlzLmFnZ3JvPWZhbHNlfTtcblxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pe3RoaXMueU9mZiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddfVxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd4T2ZmJ10pe3RoaXMueE9mZiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneE9mZiddfVxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydib3NzJ10pe3RoaXMuYm9zcyA9IHRydWU7IFxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueS09NzA7IHRoaXMuaGVpZ2h0Kz0xMDB9OyBcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncm9hbSddKXtcbiAgICAgICAgICAgIHRoaXMucm9hbSA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5yb2FtVGltZSA9IDEwO1xuICAgICAgICAgICAgdGhpcy5yb2FtWSA9IHRoaXMubGFuZSpnYW1lLnJvd0hlaWdodDsgXG4gICAgICAgICAgICB0aGlzLnJvYW1MaW1pdHMgPSBbMCxnYW1lLnJvd0hlaWdodCxnYW1lLnJvd0hlaWdodCoyXTsgLy8wLDEsMlxuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IDA7XG4gICAgICAgICB9XG4gICAgICAgIGVsc2Uge3RoaXMucm9hbSA9IGZhbHNlfTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnhPZmYyID0gMDsgXG4gICAgICAgIHRoaXMua25vY2tiYWNrVGltZSA9IDAgOyAgXG4gICAgICAgIHRoaXMua25vY2tiYWNrVGhyZXNoID0gTWF0aC5mbG9vcih0aGlzLm1heEhlYWx0aCAvIDMpO1xuICAgICAgICB0aGlzLmtub2NrYmFja1N1bSA9IDA7ICBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tSZXNpc3QgPSAwLjNcbiAgICAgICAgdGhpcy5oaXQgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyBcbiAgICAgICAgdGhpcy5lbW90ZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1vdGVUaW1lciA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1vdGVUaW1lT3V0ID0gW107XG4gICAgICAgIHRoaXMucG9zaW9uR3JhcGhpYyA9IFtdOyBcbiAgICAgICAgdGhpcy5oaXRCeSA9IFtdOyBcbiAgICAgICAgdGhpcy5kYW1hZ2VNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLmxvb3RNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMua25vY2tiYWNrTXVsdGkgPSAxO1xuICAgICAgICB0aGlzLnNwZWVkTXVsdGkgPSAxOyBcbiAgICAgICAgdGhpcy5waWVyY2UgPSAxOyBcblxuICAgICAgICB0aGlzLnByb2plY3RpbGVBbW91bnQgPSAwOyBcbiAgICAgICAgdGhpcy5jaGlsbEFtb3VudCA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvbkxvYWRlZCA9IGZhbHNlOyAvL2xvYWQgc3ByaXRlIFxuICAgICAgICB0aGlzLnBvaXNvblRpbWUgPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25BbW91bnQgPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25UaWNrID0gMDtcbiAgICAgICAgdGhpcy5jaGlsbCA9IDA7XG4gICAgICAgIHRoaXMuYXJlYSA9IDA7IFxuICAgICAgICB0aGlzLmNvbHVtbiA9IDA7IFxuICAgICAgICB0aGlzLmV4cGxvZGVEYW1hZ2VEZWFsdCA9IDAgXG4gICAgICAgIHRoaXMucG9pc29uID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uU3RhY2sgPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25NYXggPSAwOyBcblxuICAgICAgICB0aGlzLmF0dGFja2VkID0gZmFsc2UgO1xuICAgICAgICB0aGlzLmF0dGFja1N0YXJ0ID0gMDtcbiAgICAgICAgdGhpcy5kZWxheUF0dGFjayA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0ZXN0PT0xKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDI3MDsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAzOTU7IC8vYm90dG9tXG4gICAgICAgICAgICB0aGlzLmxhbmUgPSAwO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGVzdD09Mil7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAyNzA7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMzA1OyAvL21pZGRsZVxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRlc3Q9PTMpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gMjcwOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IDIxNTsgLy90b3AgXG4gICAgICAgICAgICB0aGlzLmxhbmUgPSAyOyAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXN0PT00KXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDMzMDsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAzMDU7IC8vIG1pZGRsZVxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3JlZERyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLmRhbWFnZU11bHRpKz0wLjI1fVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuYXJlYSArPSA4MDsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yNX1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmFyZWEgKz04MDsgdGhpcy5wcm9qZWN0aWxlQW1vdW50ICsrfTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy50eXBlID09ICdibHVlRHJhZ29uJyl7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7fVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuY2hpbGwgKz0gMC4xNTsgdGhpcy5waWVyY2UgKz0gMX1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmNoaWxsICs9IDAuMDU7IHRoaXMucHJvamVjdGlsZUFtb3VudCArK307XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2dyZWVuRHJhZ29uJyl7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7fVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMucG9pc29uICs9IDAuNTsgdGhpcy5wb2lzb25NYXgrPTY7dGhpcy5waWVyY2UgKz0gMX1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00ICl7dGhpcy5wb2lzb24gKz0gMC41OyB0aGlzLnBvaXNvbk1heCs9MzsgdGhpcy5wcm9qZWN0aWxlQW1vdW50ICsrfVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy50eXBlID09ICdibGFja0RyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLmRhbWFnZU11bHRpKz0wLjJ9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Myl7dGhpcy5hcmVhICs9NTA7IHRoaXMuY29sdW1uPTE7dGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuYXJlYSArPTUwOyB0aGlzLnByb2plY3RpbGVBbW91bnQgKyt9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLmV2b2x2ZSgpfSBcblxuICAgIH1cblxuXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpeyAvL2ltcG9ydCBzcHJpdGVzIFxuICAgICAgICB0aGlzLmZyYW1lcyA9IDMwOyBcbiAgICAgICAgaWYgKHRoaXMuc3ByaXRlPT0nbW9iJyl7IC8vIEVuZW15IG1vYnNcbiAgICAgICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL3N0YW5kXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzdGFuZCddLCAxMCwgXCJzdGFuZFwiKTsgLy9zdGFuZGluZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMud2FsayA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvbW92ZV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2FsayddLCAxMCwgXCJ3YWxrXCIpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmhpdCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvaGl0MV8/LnBuZycsMCwgMTAsIFwiaGl0XCIpO1xuICAgICAgICAgICAgdGhpcy5kaWUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL2RpZTFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RpZSddLCAxNSwgXCJkaWVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy53YWxrLCB0aGlzLmhpdCwgdGhpcy5kaWVdOyBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J10pe1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ncnkgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL2F0dGFjazFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J10sIDEwLCBcImF0dGFja1wiLCB0cnVlKVxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKHRoaXMuYW5ncnkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSAgICAgICAgICAgXG4gICAgICAgIGVsc2UgeyBcbiAgICAgICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSArJy9zdGFuZDFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3N0YW5kJ11bdGhpcy5mb3JtXSwgMTAsIFwic3RhbmRcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmFuZ3J5ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUgKycvYW5ncnlfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J11bdGhpcy5mb3JtXSwgMTAsIFwiYXR0YWNrXCIsIHRydWUpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy5hbmdyeV07IFxuICAgICAgICAgICAgbGV0IGVtb3RlcyA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZW1vdGUnXVt0aGlzLmZvcm1dO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8ZW1vdGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZW1vdGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSArJy8nK2Vtb3Rlc1tpXVswXSsnXz8ucG5nJywgZW1vdGVzW2ldWzFdLCAxMCwgXCJlbW90ZVwiKygxK2kpICk7IC8vZW1vdGU7IFxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKGVtb3RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtb3RlTGVuZ3RoLnB1c2goZW1vdGVzW2ldWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5hbmltYXRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBldm9sdmUoKXtcbiAgICAgICAgdGhpcy5mb3JtKys7IFxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Nwcml0ZVR5cGUnXVt0aGlzLmZvcm1dOyBcbiAgICAgICAgdGhpcy5lbW90ZUxlbmd0aCA9IFtdOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IC8vIHVwZGF0ZSBzcHJpdGVzIFxuXG4gICAgfVxuICAgIGxldmVsVXAocGxheWVyKXsgXG4gICAgICAgIGxldCBjb3N0ID0gcGxheWVyLnVwZ3JhZGVDb3N0W3RoaXMubGV2ZWwtMV07XG4gICAgICAgIGlmIChwbGF5ZXIubW9uZXk+PWNvc3Qpe1xuICAgICAgICAgICAgdGhpcy5sZXZlbCsrOyAgXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gJ0x2bC4gJyArIHRoaXMubGV2ZWw7IFxuICAgICAgICAgICAgdGhpcy52YWx1ZSArPSBjb3N0OyBcbiAgICAgICAgICAgIHBsYXllci5tb25leSAtPSBjb3N0OyBcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmV2b2x2ZSgpfSBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3JlZERyYWdvbicpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yNX1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmFyZWEgKz0gODA7IHRoaXMuZGFtYWdlTXVsdGkrPTAuMjV9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5hcmVhICs9ODA7IHRoaXMucHJvamVjdGlsZUFtb3VudCArK307XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09ICdibHVlRHJhZ29uJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrO31cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmNoaWxsICs9IDAuMTU7IHRoaXMucGllcmNlICs9IDF9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5jaGlsbCArPSAwLjA1OyB0aGlzLnByb2plY3RpbGVBbW91bnQgKyt9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2dyZWVuRHJhZ29uJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrO31cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLnBvaXNvbiArPSAwLjU7IHRoaXMucG9pc29uTWF4Kz02O3RoaXMucGllcmNlICs9IDF9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD49NCApe3RoaXMucG9pc29uICs9IDAuNTsgdGhpcy5wb2lzb25NYXgrPTM7IHRoaXMucHJvamVjdGlsZUFtb3VudCArK31cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09ICdibGFja0RyYWdvbicpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw9PTMpe3RoaXMuYXJlYSArPTUwOyB0aGlzLmNvbHVtbj0xO3RoaXMuZGFtYWdlTXVsdGkrPTAuMn1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmFyZWEgKz01MDsgdGhpcy5wcm9qZWN0aWxlQW1vdW50ICsrfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdGF0IHVwZGF0ZXMgLmRhbWFnZU11bHRpXG4gICAgfVxuXG4gICAgZW1vdGUoZ2FtZSl7XG4gICAgICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApO1xuICAgICAgICBpZiAodGhpcy5lbW90ZUNoYW5nZSl7XG4gICAgICAgICAgICBpZiAoIWdhbWUucGxheWVyLmFsaXZlKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMuc3RhdGUgPSAnZW1vdGU1JztcbiAgICAgICAgICAgICAgICBpZihyYW5kb20+NSl7dGhpcy5zdGF0ZSA9ICdlbW90ZTUnO30gLy8gY3J5XG4gICAgICAgICAgICAgICAgZWxzZSB7dGhpcy5zdGF0ZSA9ICdlbW90ZTInO30gLy8gYmV3aWxkZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdhbWUud2F2ZUZpbmlzaCApe1xuICAgICAgICAgICAgICAgICAgICBpZihyYW5kb20+NSl7dGhpcy5zdGF0ZSA9ICdlbW90ZTMnO30gLy8gc2l0XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMuc3RhdGUgPSAnZW1vdGU0Jzt9IC8vIHNsZWVwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtb3RlVGltZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW1vdGVDaGFuZ2UgPSBmYWxzZTsgXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmICghdGhpcy5lbW90ZUNoYW5nZSAmJiAhdGhpcy5lbW90ZVRpbWVyKXsgXG4gICAgICAgICAgICB0aGlzLmVtb3RlVGltZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHt0aGlzLmVtb3RlQ2hhbmdlID0gdHJ1ZX0sIFwiNTAwMFwiKSA7fVxuXG4gICAgfVxuXG4gICAgYXR0YWNrKCl7IC8vdHJpZ2dlcnMgYXR0YWNrIHN0YXRlIFxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA8PSAwICYmIHRoaXMuaGVhbHRoPjApe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdhdHRhY2snOyBcbiAgICAgICAgfSAgICAgICAgICBcbiAgICB9XG5cbiAgICBzdW1tb25BdHRhY2soKXsgLy9zdW1tb24gYXR0YWNrcyBcbiAgICAgICAgaWYgKCAhdGhpcy5hdHRhY2tlZCl7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpPT0yKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2goIG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddW3RoaXMuZm9ybV0pKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlQW1vdW50PjApeyAvL2V4dHJhIHByb2plY3RpbGVzIFxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTE7IGk8PXRoaXMucHJvamVjdGlsZUFtb3VudDsgaSsrKXsgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoICgpPT4ge3RoaXMucHJvamVjdGlsZXMucHVzaCggbmV3IFByb2plY3RpbGUodGhpcywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydwcm9qJ11bdGhpcy5mb3JtXSkpO30sIDEzMCsxMzAqaSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgIC8vIHRoaXMuYW5ncnkucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtb3RlVGltZSA9IDEwMCtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTAwKTsgLy9yZXNldCByYW5kb20gZW1vdGUgdGltZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW9iQXR0YWNrKGdhbWUpe1xuICAgICAgICBpZiAoIXRoaXMuYXR0YWNrZWQgJiYgZ2FtZS5wbGF5ZXIuYWxpdmUgJiYgdGhpcy5oZWFsdGg+MCl7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkU3ByaXRlPT0nc3R1bXB5Jyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ncnkuZ2V0RnJhbWUoKSA9PSA5KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKCBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueC00MCwgdGhpcy5wb3NpdGlvbi55LTIwKSk7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxvYWRTcHJpdGU9PSdnaG9zdFN0dW1wJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ncnkuZ2V0RnJhbWUoKSA9PSA0KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKCBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueC00MCwgdGhpcy5wb3NpdGlvbi55LTI3KSk7ICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZFNwcml0ZT09J211c2htb20nKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpID09IDcpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYW5ncnkucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnYW1lLnBsYXllci5qdW1wICYmIGdhbWUucGxheWVyLmxhbmUgPT0gdGhpcy5sYW5lICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnBsYXllci5oZWFsdGggLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUua25vY2tiYWNrKGdhbWUucGxheWVyLCAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIHBhdXNlKSB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7IFxuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngtdGhpcy5yYW5nZSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoKzIqdGhpcy5yYW5nZSwgdGhpcy5oZWlnaHQpOyAvL3JhbmdlXG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMCAmJiB0aGlzLmZvcm09PTEgJiYgdGhpcy5zdGF0ZT09J2F0dGFjaycpe3RoaXMueE9mZjIgPSAtNTF9IC8vYXR0YWNrIG9mZnNldFxuICAgICAgICBlbHNlIHRoaXMueE9mZjI9MDtcblxuICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7XG4gICAgICAgICAgICBpZiAodGhpcy5zaWRlID09IDApe3RoaXMuc3RhdGUgPSAnc3RhbmQnOyB9IFxuICAgICAgICAgICAgZWxzZSB0aGlzLnN0YXRlPSd3YWxrJzt9XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoPD0wICYmIHRoaXMuc2lkZSA9PTEpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkaWUnOyAgLy9kZWF0aCBhbmltYXRpb24gICBcbiAgICAgICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWRlPjApIHRoaXMuZmFkZSAtPSAwLjAzOyAvL2ZhZGUgb24gZGVhdGggXG4gICAgICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5mYWRlOyBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge3RoaXMuZmFkZSA9IDB9LCBcIjQ1MFwiKSA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdGlsZXMubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge3RoaXMuYWxpdmUgPSBmYWxzZX0sIFwiNDUwXCIpIDt9IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSAgXG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMSAmJiB0aGlzLnN0YXRlICE9J2RpZScpeyAvL2hlYWx0aCBiYXJcbiAgICAgICAgICAgIGlmICghdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydib3NzJ10pXG4gICAgICAgICAgICAgICAge2N0eC5maWxsU3R5bGUgPSBcIiMyYjJiMmJcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkrNzAsIDYwLCAxMik7IC8vZW1wdHkgYm94XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzk5MGMwMlwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngrMSwgdGhpcy5wb3NpdGlvbi55KzcxLCBNYXRoLmZsb29yKDU4KigxLSh0aGlzLm1heEhlYWx0aCAtIHRoaXMuaGVhbHRoKS90aGlzLm1heEhlYWx0aCkpLCAxMCk7IC8vIGxpZmUgYmFyXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvL2Jvc3MgaGVhbHRoIGJhclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMyYjJiMmJcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LTUsIHRoaXMucG9zaXRpb24ueSsxMzEsIDY1LCAxNik7IC8vZW1wdHkgYm94XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzk5MGMwMlwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngtNCwgdGhpcy5wb3NpdGlvbi55KzEzMiwgTWF0aC5mbG9vcig2MyooMS0odGhpcy5tYXhIZWFsdGggLSB0aGlzLmhlYWx0aCkvdGhpcy5tYXhIZWFsdGgpKSwgMTQpOyAvL2VtcHR5IGJveFxuIFxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2lkZSA9PSAwKXsgLy8gc3VtbW9uIG5hbWUgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC43OyBcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy5wb3NpdGlvbi54KzE1LCB0aGlzLnBvc2l0aW9uLnkrdGhpcy5oZWlnaHQrMTcsIDM1LCAxNSwgMik7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMS4wOyBcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjExcHggYXJpYWxcIlxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCB0aGlzLnBvc2l0aW9uLngrMzIsIHRoaXMucG9zaXRpb24ueSt0aGlzLmhlaWdodCsyNykgOyAgICAgICAgICBcblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgICAgICAgXG4gICAgICAgIC8vaW1hZ2UgPSBidWZmZXI7IFxuXG4gICAgICAgIGlmICghdGhpcy5sZWZ0KXsvL2ZsaXAgYmFzZWQgb24gc3ByaXRlIG9yaWVudGF0aW9uXG4gICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAtdGhpcy5wb3NpdGlvbi54LXRoaXMud2lkdGgrdGhpcy54T2ZmK3RoaXMueE9mZjIsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYgKTt9XG4gICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueCt0aGlzLnhPZmYsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYpOyB9XG4gICAgXG4gICAgICAgIGlmICh0aGlzLmNoaWxsQW1vdW50PjApe1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IC8vIEltYWdlIHRpbnRpbmdcbiAgICAgICAgICAgIGJ1ZmZlci53aWR0aCA9IDIwMDsvL2ltYWdlLndpZHRoO1xuICAgICAgICAgICAgYnVmZmVyLmhlaWdodCA9IDIwMDsvL2ltYWdlLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGJ0eCA9IGJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgYnR4LmRyYXdJbWFnZShpbWFnZSwgMCwwKTtcbiAgICAgICAgICAgIGJ0eC5maWxsU3R5bGUgPSBcIiMyYzY4ZGNcIjtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbXVsdGlwbHknO1xuICAgICAgICAgICAgYnR4LmZpbGxSZWN0KDAsMCxidWZmZXIud2lkdGgsIGJ1ZmZlci5oZWlnaHQpO1xuICAgICAgICAgICAgYnR4Lmdsb2JhbEFscGhhID0gMC44O1xuICAgICAgICAgICAgYnR4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24taW5cIjtcbiAgICAgICAgICAgIGJ0eC5kcmF3SW1hZ2UoaW1hZ2UsMCwwKTsgXG5cbiAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0KXtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlciwgLXRoaXMucG9zaXRpb24ueC10aGlzLndpZHRoK3RoaXMueE9mZiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZil9XG4gICAgICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGJ1ZmZlciwgdGhpcy5wb3NpdGlvbi54K3RoaXMueE9mZiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZil9XG4gICAgICAgIH1cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7IFxuXG4gICAgICAgIGlmICh0aGlzLnBvaXNvbkFtb3VudD4wKXtcbiAgICAgICAgICAgIGlmICghdGhpcy5wb2lzb25Mb2FkZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMucG9pc29uR3JhcGhpYyA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ3BvaXNvbkVmZmVjdC9wb2lzb24/LnBuZycsIDQsIDEwLCBcInBvaXNvblwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaXNvbkxvYWRlZCA9IHRydWU7IH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9pc29uU3ByaXRlSW1hZ2UgPSB0aGlzLnBvaXNvbkdyYXBoaWMuZ2V0SW1hZ2UocGF1c2UpOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShwb2lzb25TcHJpdGVJbWFnZSx0aGlzLnBvc2l0aW9uLngtMTAsdGhpcy5wb3NpdGlvbi55LXRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsIHBhdXNlKSApXG4gICAgICAgIH0gICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgdXBkYXRlKGdhbWUpe1xuICAgICAgICBpZiAodGhpcy5zaWRlID09PSAxKXsgIC8vIE1vYiBcbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWx0aD4wKXsgICAgIFxuICAgICAgICAgICAgICAgIGxldCBjaGlsbERpcmVjdCA9IDE7ICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFg8MCkoY2hpbGxEaXJlY3Q9IC0xKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KmNoaWxsRGlyZWN0Pj0wLjQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPSdhdHRhY2snKSB0aGlzLnN0YXRlID0gJ3dhbGsnOyAvL2NhbmNlbHMgYXR0YWNrIFxuICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYXR0YWNrQ0Q+MCkgdGhpcy5zdGF0ZSA9PSAnaGl0JzsgXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnN0YXRlID0gJ3dhbGsnO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMucG9zaXRpb24ueDwtdGhpcy53aWR0aCoyKSB7dGhpcy5wb3NpdGlvbi54ID0gLXRoaXMud2lkdGgqMn07IC8vbGVmdCBib3JkZXJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGgpIHt0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoO30gLy9yaWdodCBib3JkZXJcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvYW0pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1UaW1lLS07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtVGltZSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7IC8vcmFuZG9tIDAsMSwyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1UaW1lID0gMjAwOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvYW1ZPiB0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55LT0yOy8vdGhpcy5zcGVlZFgrdGhpcy5jaGlsbEFtb3VudCkvMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9hbVktPTI7IC8vKHRoaXMuc3BlZWRYK3RoaXMuY2hpbGxBbW91bnQpLzI7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yb2FtWTx0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55Kz0yOyAvLyh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KS8yO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtWSs9MjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9pc29uVGltZT4wKXsgLy8vUE9JU09OXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbC10aGlzLnBvaXNvblRpY2s+PTEwMDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSB0aGlzLnBvaXNvbkFtb3VudDtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5wb2lzb25EYW1hZ2UgKz0gdGhpcy5wb2lzb25BbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pc29uVGltZSAtPSAxOyAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pc29uVGljayA9IGdhbWUuZ2FtZVRpbWVSZWFsOyAvL3VwZGF0ZSB0aWNrIHRpbWUgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5wb2lzb25UaW1lID09IDApe3RoaXMucG9pc29uQW1vdW50ID0gMDsgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaXNvblN0YWNrID0gMDsgfS8vZHJvcCBwb2lzb24gc3RhY2tzXG5cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxsQW1vdW50PjApe3RoaXMuY2hpbGxBbW91bnQtPTAuMDA1fSAvL0NISUxMIFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2hpbGxBbW91bnQ8MCl7dGhpcy5jaGlsbEFtb3VudD0wfTtcblxuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbC10aGlzLmtub2NrYmFja1RpbWUgPjEwMDApe3RoaXMua25vY2tiYWNrRm9yY2U9MH0gLy9tYXggMnNcblxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmtub2NrYmFja0ZvcmNlKT4wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnaGl0J1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtub2NrYmFja1Jlc2lzdCs9MC4wMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMua25vY2tiYWNrRm9yY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZS09dGhpcy5rbm9ja2JhY2tSZXNpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZTwwKSB0aGlzLmtub2NrYmFja0ZvcmNlID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSAvL2JhY2t3YXJkc1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSs9dGhpcy5rbm9ja2JhY2tSZXNpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZT4wKSB0aGlzLmtub2NrYmFja0ZvcmNlID0gMFxuICAgICAgICAgICAgICAgICAgICB9OyAvL2ZvcndhcmRzIFxuXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPSdhdHRhY2snKXt0aGlzLnBvc2l0aW9uLnggLT0gKHRoaXMuc3BlZWRYLXRoaXMuY2hpbGxBbW91bnQqY2hpbGxEaXJlY3QpfVxuICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gdGhpcy5zcGVlZFk7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWT4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZFktPTAuNTsgXG4gICAgICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanVtcCl7IC8vZ3Jhdml0eVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gMSp0aGlzLmdyYXZpdHlUaW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHlUaW1lKz0wLjU7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5wb3NpdGlvbi55ID4gdGhpcy5nYW1lSGVpZ2h0LTExMCApeyAvL2JvdHRvbSBib3JkZXIgKHVwZGF0ZSBmb3IgcGxhdGZvcm1zKVxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLmdhbWVIZWlnaHQtMTEwO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuanVtcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTsgXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnO1xuICAgICAgICAgICAgICAgIC8vIH0gXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGU9PSdzdGFuZCcpeyAgIC8vZW1vdGVzIGZvciBzdW1tb25zXG4gICAgICAgICAgICBpZiAodGhpcy5lbW90ZVRpbWUgPT0gMCApe1xuICAgICAgICAgICAgICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApOyAvLzE6IHNsZWVwLCAyOiBpZ25vcmVcbiAgICAgICAgICAgICAgICBsZXQgdGltZSA9IDA7IFxuICAgICAgICAgICAgICAgIGlmIChyYW5kb20gPDUpe3RoaXMuc3RhdGUgPSAnZW1vdGUxJzsgdGltZSA9IHRoaXMuZW1vdGVMZW5ndGhbMF07fVxuICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMuc3RhdGUgPSAnZW1vdGU2Jzt0aW1lID0gdGhpcy5lbW90ZUxlbmd0aFs1XSB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lT3V0ID0gc2V0VGltZW91dCgoKT0+IHt0aGlzLmVtb3RlVGltZSA9IDYwMCtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCd9LCB0aW1lKSA7Ly9ob3cgbG9uZyB0byBydW4gYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgLy8gaWYgKGdhbWUucGF1c2Upe2NsZWFyVGltZW91dCh0aGlzLmVtb3RlVGltZU91dCl9OyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5lbW90ZVRpbWUtLTsgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSgpICk7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gdGhpcy5wcm9qZWN0aWxlcy5maWx0ZXIoICAvL2RlbGV0ZXMgcHJvamVjdGlsZXNcbiAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QuZGVsZXRlICE9PSB0cnVlOyBcbiAgICAgICAgfSk7XG4gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9qZWN0aWxlcyk7IFxuICAgICBcblxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA+MCl7dGhpcy5hdHRhY2tDRC0tfVxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRD09MCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXR0YWNrZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ3J5LnJlc2V0KCk7IFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG4gICAgICAgIFxuXG5cblxuXG4gICAgfVxuXG59IiwiaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25leXtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBvYmosIHZhbHVlLCBzcGVlZFggPSAwKXtcbiAgICAgICAgdGhpcy55T2ZmID0gMCA7XG4gICAgICAgIGlmIChvYmouYm9zcyl7IHRoaXMueU9mZiArPTcwfVxuICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgIHg6IChvYmoucG9zaXRpb24ueCkrb2JqLndpZHRoLzIsIFxuICAgICAgICAgICAgeTogb2JqLnBvc2l0aW9uLnkrNDArdGhpcy55T2ZmfVxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PmdhbWUuZ2FtZVdpZHRoLTEwKXt0aGlzLnBvc2l0aW9uLnggPSBnYW1lLmdhbWVXaWR0aC0zMDt9IC8va2lsbGluZyBvZmYtc2NyZWVuIChyaWdodClcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wb3NpdGlvbi54PDEwKXt0aGlzLnBvc2l0aW9uLng9MzB9O1xuICAgICAgICB0aGlzLndpZHRoID0gMzU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMzU7IFxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7IFxuICAgICAgICB0aGlzLnNwYXduVGltZSA9ICBnYW1lLmdhbWVUaW1lUmVhbDsgXG4gICAgICAgIHRoaXMucG9wVXAgPSAyNTsgXG4gICAgICAgIHRoaXMuZHJvcERvd24gPSAyMztcbiAgICAgICAgdGhpcy5zcGVlZFggPSBzcGVlZFg7IFxuICAgICAgICB0aGlzLnNwZWVkWSA9IDE7IFxuICAgICAgICB0aGlzLmFjY2VsVXAgPSAwO1xuICAgICAgICB0aGlzLmFjY2VsRG93biA9IDA7XG4gICAgICAgIHRoaXMuZGVsZXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmFkZSA9IDE7IFxuICAgICAgICB0aGlzLnN0YXJ0RmFkZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5mbG9hdCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5sb3N0ID0gZmFsc2U7IFxuXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LTI1LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuICAgICAgICBpZiAodGhpcy52YWx1ZT49MTAwKXt0aGlzLnR5cGUgPSAnNCc7fSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZT49NTApe3RoaXMudHlwZSA9ICczJzt9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlPj0xMCl7dGhpcy50eXBlID0gJzInO30gXG4gICAgICAgIGVsc2UgdGhpcy50eXBlID0gJzEnOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IFxuICAgIH1cbiAgICBcbiAgICBjcmVhdGVBbmltYXRpb25zKCl7XG4gICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKCdjb2luL0NvaW4nK3RoaXMudHlwZSsnXz8ucG5nJywgMywgNiwgXCJzdGFuZFwiKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMuc3RhbmRdXG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIHBhdXNlKSB7XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RmFkZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmxvYXQpe3RoaXMuZmFkZSAtPSAwLjAxNTt9IC8vc2xvd2VyIGZhZGUgd2hlbiBwaWNrdXBcbiAgICAgICAgICAgIGVsc2UgdGhpcy5mYWRlIC09IDAuMDM7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmZhZGU7IFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHt0aGlzLmRlbGV0ZT0gdHJ1ZX0sIFwiNDUwXCIpIDtcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IoJ3N0YW5kJykpOyBcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyBcblxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcblxuICAgIH1cblxuICAgIHVwZGF0ZShnYW1lKXtcbiAgICAgICAgaWYgKHRoaXMucG9wVXA+MCl7XG4gICAgICAgICAgICB0aGlzLmFjY2VsVXArPTAuMTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSAoNC41LXRoaXMuYWNjZWxVcCk7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54IC09dGhpcy5zcGVlZFg7IFxuICAgICAgICAgICAgdGhpcy5wb3BVcCAtPSAxOyBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyb3BEb3duPjApe1xuICAgICAgICAgICAgdGhpcy5hY2NlbERvd24rPTAuMTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSAoMit0aGlzLmFjY2VsRG93bik7XG4gICAgICAgICAgICB0aGlzLmRyb3BEb3duIC09IDE7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54IC09dGhpcy5zcGVlZFg7IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZsb2F0KXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueS09MTsgXG4gICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIucG9zaXRpb24ueCtnYW1lLnBsYXllci53aWR0aDx0aGlzLnBvc2l0aW9uLngpe3RoaXMucG9zaXRpb24ueC09MC44ICB9XG4gICAgICAgICAgICBlbHNlIGlmIChnYW1lLnBsYXllci5wb3NpdGlvbi54PnRoaXMucG9zaXRpb24ueCkgdGhpcy5wb3NpdGlvbi54Kz0wLjg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwtdGhpcy5zcGF3blRpbWU+PTE4MDAwKXsgLy8xOCBzIFxuICAgICAgICAgICAgdGhpcy5zdGFydEZhZGU9dHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9zdCA9IHRydWU7IFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cbiAgICB9XG5cbiAgICBcbn1cbiIsImltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSc7IFxuaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSA2MDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA4MDsgXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogdGhpcy53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IHRoaXMuZ2FtZUhlaWdodCAtIDQ1IC0gMipnYW1lLnJvd0hlaWdodCxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsYXllclggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLndpZHRoLzIgKzE4OyBcbiAgICAgICAgdGhpcy5lbGVQb3NpdGlvbnMgPSBbIFt0aGlzLnBsYXllclggLTYwLCB0aGlzLnBvc2l0aW9uLnldLCBbdGhpcy5wbGF5ZXJYIC00MCwgdGhpcy5wb3NpdGlvbi55LTQwXSxcbiAgICAgICAgICAgIFt0aGlzLnBsYXllclggLCB0aGlzLnBvc2l0aW9uLnktNTVdLCBbdGhpcy5wbGF5ZXJYICs0MCwgdGhpcy5wb3NpdGlvbi55LTQwXSwgXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICs2MCwgdGhpcy5wb3NpdGlvbi55XSBdO1xuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGdhbWUucm93SGVpZ2h0O1xuICAgICAgICB0aGlzLmxhbmUgPSAxOyBcbiAgICAgICAgdGhpcy5mbG9vciA9ICB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtICgxK3RoaXMubGFuZSkqdGhpcy5yb3dIZWlnaHRcbiAgICAgICAgdGhpcy5zcGVlZCA9IDM7XG4gICAgICAgIHRoaXMua25vY2tiYWNrRm9yY2UgPSAwOyBcbiAgICAgICAgdGhpcy5sZWZ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2lkZSA9MDtcbiAgICAgICAgdGhpcy5zcGVlZFggPSAwO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7IFxuICAgICAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgICAgIHRoaXMubmFtZSA9ICdXaXonO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDEwMDsgXG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTsgXG4gICAgICAgIHRoaXMuZGFtYWdlRGVhbHQgPSAwOyBcbiAgICAgICAgdGhpcy5pbnZ1bG5UaW1lID0gIDA7IFxuICAgICAgICB0aGlzLmludnVsbkRhcmsgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuaW52dWxuRGFya1RpbWUgPSAwO1xuICAgICAgICB0aGlzLmtub2NrYmFja1RocmVzaCA9IDE7IFxuICAgICAgICB0aGlzLmtub2NrYmFja1N1bSA9IDBcbiAgICAgICAgdGhpcy5hcm1vciA9IDA7IFxuICAgICAgICB0aGlzLnRvdWNoSGl0ID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmF0dGFja1NwZWVkID0gMzU7IFxuICAgICAgICB0aGlzLmF0dGFja0NEID0gMDsgXG4gICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7IFxuICAgICAgICB0aGlzLmN1clRpbGUgPSAwO1xuICAgICAgICB0aGlzLmVsZW1lbnRMaXN0PSBbXTsgLy9hZGQgc3ByaXRlcyBoZXJlIFxuICAgICAgICAvLyB0aGlzLmVsZW1lbnRMaXN0ID0gWydCbGF6ZScsJ0Rhd24nLCdOaWdodCcsJ1RodW5kZXInLCdXaW5kJ107XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlID0ge30gOyBcbiAgICAgICAgdGhpcy5lbGVtZW50SW5mbyA9IHsgJ0JsYXplJzogeydzdGFuZCc6NywgJ21vdmUnOiA3LCAnYXR0YWNrJzogOCwgJ3Byb2onOidyZWRCYWxsJyB9LFxuICAgICAgICAgICAgJ0Rhd24nOiB7J3N0YW5kJzogMTUsICdtb3ZlJzoxNSwgJ2F0dGFjayc6IDgsICdwcm9qJzoneWVsbG93QmFsbCd9LFxuICAgICAgICAgICAgJ05pZ2h0JzogeydzdGFuZCc6NywgJ21vdmUnOjcsICdhdHRhY2snOiA4LCAncHJvaic6J3B1cnBsZUJhbGwnfSxcbiAgICAgICAgICAgICdUaHVuZGVyJzogeydzdGFuZCc6IDcsICdtb3ZlJzo3LCAnYXR0YWNrJzogOCwgJ3Byb2onOidncmVlbkJhbGwnLH0sIFxuICAgICAgICAgICAgJ1dpbmQnOiB7J3N0YW5kJzogNywgJ21vdmUnOjcsICdhdHRhY2snOiA4LCAncHJvaic6J2JsdWVCYWxsJyx9IH1cbiAgICAgICAgdGhpcy5lbGVtZW50U3RhdGUgPSBbJ3N0YW5kJywnc3RhbmQnLCdzdGFuZCcsJ3N0YW5kJywnc3RhbmQnXTsgXG4gICAgICAgIHRoaXMucmVjYWxsTGlzdCA9IFsncmVkRHJhZ29uMCcsICdyZWREcmFnb24xJywgJ2JsdWVEcmFnb24wJywgJ2JsdWVEcmFnb24xJywgXG4gICAgICAgICdncmVlbkRyYWdvbjAnLCdncmVlbkRyYWdvbjEnLCdibGFja0RyYWdvbjAnLCAnYmxhY2tEcmFnb24xJ10gO1xuICAgICAgICB0aGlzLnJlY2FsbEltYWdlcyA9e307XG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyBcbiAgICAgICAgdGhpcy5lbGVtZW50YWxzKCk7XG5cbiAgICAgICAgdGhpcy5zdW1tb25Db3VudCA9IDA7IFxuICAgICAgICB0aGlzLm1vbmV5ID0gODAwOyAgLy81MFxuICAgICAgICBpZiAoZ2FtZS5sZXZlbCA9PSAyKSB7dGhpcy5tb25leSA9IDEyMDB9IC8vc3RhcnRpbmcgbW9uZXkgYmFzZWQgb24gbGV2ZWw7XG4gICAgICAgIGVsc2UgaWYgKGdhbWUubGV2ZWwgPT0gMykge3RoaXMubW9uZXkgPSA1MDAwfVxuICAgICAgICB0aGlzLnN1bW1vbkNvc3QgPSBbNTAsIDEwMCwgMTUwLCAyMDAsIDY0MF07XG4gICAgICAgIHRoaXMudXBncmFkZUNvc3QgPSBbMjAwLCA0MDAsIDgwMCwgMTYwMCwgMzIwMF07IFxuICAgICAgICB0aGlzLmVsZW1lbnRDb3N0ID0gWzUwLCAxMDAsIDIwMCwgNDAwLCA4MDBdOyBcblxuICAgICAgICB0aGlzLmRhbWFnZVRha2VuID0gMDsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmZsb2F0ID0gMjA7XG4gICAgICAgIHRoaXMuZmxvYXREaXJlY3QgPSAxOyBcbiAgICAgICAgdGhpcy5ncmF2ZVNwYXduID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3JhdmVYID0gMCA7XG4gICAgICAgIHRoaXMuZ3JhdmVZID0gLTIwOyBcbiAgICAgICAgdGhpcy5ncmF2ZVN0YXRlID0gJ21vdmUnXG4gICAgICAgIC8vdXBncmFkZXNcbiAgICAgICAgdGhpcy5kYW1hZ2VNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLmxvb3RNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMua25vY2tiYWNrTXVsdGkgPSAxO1xuICAgICAgICB0aGlzLnNwZWVkTXVsdGkgPSAxOyBcbiAgICAgICAgdGhpcy5waWVyY2UgPSAwOyBcblxuICAgICAgICB0aGlzLmNoaWxsID0gMDtcbiAgICAgICAgdGhpcy5hcmVhID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uID0gMjsgXG4gICAgICAgIHRoaXMuZXhwbG9kZURhbWFnZURlYWx0ID0gMCBcblxuXG5cbiAgICB9XG4gICAgZWxlbWVudGFscygpeyBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5lbGVtZW50TGlzdC5sZW5ndGg7IGkrKyl7IC8vIExvYWQgZWxlbWVudGFsIHNwcml0ZXMgXG4gICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudFNwcml0ZXNbdGhpcy5lbGVtZW50TGlzdFtpXV0pe1xuICAgICAgICAgICAgICAgIGxldCBlbGVUeXBlID0gdGhpcy5lbGVtZW50TGlzdFtpXTsgXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFuZEVsZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oZWxlVHlwZStcIi9zdGFuZF8/LnBuZ1wiLCB0aGlzLmVsZW1lbnRJbmZvW2VsZVR5cGVdWydzdGFuZCddLCA2LCBcInN0YW5kXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUVsZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oZWxlVHlwZStcIi9tb3ZlXz8ucG5nXCIsIHRoaXMuZWxlbWVudEluZm9bZWxlVHlwZV1bJ21vdmUnXSwgNiwgXCJ3YWxrXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrRWxlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihlbGVUeXBlK1wiL2F0dGFjazFfPy5wbmdcIiwgdGhpcy5lbGVtZW50SW5mb1tlbGVUeXBlXVsnYXR0YWNrJ10sIDYsIFwic3dpbmcxXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZXNbZWxlVHlwZV0gPSBbdGhpcy5zdGFuZEVsZSwgdGhpcy5tb3ZlRWxlLCB0aGlzLmF0dGFja0VsZV07IFxuICAgICAgICAgICAgICAgIC8veydzdGFuZCc6IHRoaXMuc3RhbmRFbGUsICdtb3ZlJzogdGhpcy5tb3ZlRWxlLCAnYXR0YWNrJzogdGhpcy5hdHRhY2tFbGV9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVBbmltYXRpb25zKCl7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gMTU7IFxuICAgICAgICB0aGlzLnN0YW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9hbGVydF8/LnBuZ1wiLCAzLCB0aGlzLmZyYW1lcywgXCJzdGFuZFwiKTsgLy9jb21iYXQgc3ByaXRlczsgXG4gICAgICAgIHRoaXMud2FsayA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvd2FsazFfPy5wbmdcIiwgMywgMTAsIFwid2Fsa1wiKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLmp1bXAgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2p1bXBfPy5wbmdcIiwgMSwgMTAsIFwianVtcFwiKTsgLy9qdW1wIHNwcml0ZXM7XG4gICAgICAgIHRoaXMucmVsYXggPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3N0YW5kMV8/LnBuZ1wiLCAzLCAzMCwgXCJyZWxheFwiKTsgLy8gaWRsZSBwb3NlIFxuICAgICAgICB0aGlzLmNhc3QgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2FsZXJ0Xz8ucG5nXCIsIDMsIDEwLCBcInN0YW5kXCIpOyBcbiAgICAgICAgdGhpcy5zd2luZzEgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3N3aW5nTzFfPy5wbmdcIiwgMywgMTIsIFwic3dpbmcxXCIsIHRydWUpOyAvL2F0dGFjayBzcHJpdGVzO1xuICAgICAgICB0aGlzLnN3aW5nMiA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPMl8/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzJcIiwgdHJ1ZSk7IFxuICAgICAgICB0aGlzLnN3aW5nMyA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPM18/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzNcIiwgdHJ1ZSk7IFxuICAgICAgICB0aGlzLmRlYWQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2RlYWRfPy5wbmdcIiwgMywgMjAwLCBcImRlYWRcIik7IFxuICAgICAgICB0aGlzLmF0dGFja0FuaW0gPSBbJ3N3aW5nMScsICdzd2luZzInLCAnc3dpbmczJ107IFxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy53YWxrLCB0aGlzLmp1bXAsIHRoaXMuc3dpbmcxLCB0aGlzLnN3aW5nMiwgdGhpcy5zd2luZzMsIHRoaXMuY2FzdCwgdGhpcy5kZWFkLCB0aGlzLnJlbGF4IF07IFxuICAgICAgICB0aGlzLmdyYXZlTW92ZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJncmF2ZS9tb3ZlXz8ucG5nXCIsIDAsIDMwMCwgXCJtb3ZlXCIpOyBcbiAgICAgICAgdGhpcy5ncmF2ZUxhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwiZ3JhdmUvc3RhbmRfPy5wbmdcIiwgNSwgMTIsIFwibGFuZFwiLCB0cnVlICk7IFxuICAgICAgICB0aGlzLmdyYXZlQW5pbWF0aW9ucyA9IFt0aGlzLmdyYXZlTW92ZSwgdGhpcy5ncmF2ZUxhbmRdO1xuXG4gICAgICAgIC8vIHRoaXMucmVjYWxsSW1hZ2VzID0gWydyZWREcmFnb24wJywgJ3JlZERyYWdvbjEnLCAnYmx1ZURyYWdvbjAnLCAnYmx1ZURyYWdvbjEnLCBcbiAgICAgICAgLy8gJ2dyZWVuRHJhZ29uMCcsJ2dyZWVuRHJhZ29uMScsJ2JsYWNrRHJhZ29uMCcsICdibGFja0RyYWdvbjEnXSA7XG4gICAgICAgIGZvciAobGV0IGkgPTA7aTx0aGlzLnJlY2FsbExpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgID0gbmV3IEltYWdlKCk7IFxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJ2ltYWdlcy9yZWNhbGwvJyt0aGlzLnJlY2FsbExpc3RbaV0rJy5wbmcnOyBcbiAgICAgICAgICAgIHRoaXMucmVjYWxsSW1hZ2VzW3RoaXMucmVjYWxsTGlzdFtpXV0gPSBpbWFnZTsgXG4gICAgICAgIH1cbiAgICAgICAgXG5cblxuICAgIH1cbiAgICBlbW90ZShnYW1lKXtcbiAgICAgICAgaWYgKGdhbWUud2F2ZUZpbmlzaCl7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSdzdGFuZCcpe3RoaXMuc3RhdGUgPSAncmVsYXgnO30gXG4gICAgfX0gXG5cbiAgICBhdHRhY2socGF1c2Upe1xuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA8PSAwICYmIHRoaXMuYWxpdmUgJiYgIXBhdXNlICl7XG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMucG9zaXRpb24ueC0yMjsgXG4gICAgICAgICAgICBpZiAodGhpcy5sZWZ0KXt4ICs9NTg7fVxuICAgICAgICAgICAgdGhpcy5wcm9qID0gbmV3IFByb2plY3RpbGUodGhpcywgJ2xpZ2h0bmluZ2JhbGwnLHgsIHRoaXMucG9zaXRpb24ueS0xNSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuYXR0YWNrQW5pbS5zaGlmdCgpOyBcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrQW5pbS5wdXNoKHRoaXMuc3RhdGUpOyBcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpLnJlc2V0KCk7IFxuICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKTtcbiAgICAgICAgICAgIC8vc2V0VGltZW91dCgoKT0+IHt0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKX0sIFwiMjAwXCIpOyAvL3NsaWdodCBkZWxheSBmb3IgYW5pbWF0aW9uXG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMuZWxlUG9zaXRpb25zW2ldWzBdKzcwOy8vZmFjaW5nIGxlZnRcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubGVmdCl7eCA9IHRoaXMuZWxlUG9zaXRpb25zW2ldWzBdLTQwfTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ogPSBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLmVsZW1lbnRJbmZvW3RoaXMuZWxlbWVudExpc3RbaV1dWydwcm9qJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB4LCB0aGlzLmVsZVBvc2l0aW9uc1tpXVsxXSsxOCApO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCh0aGlzLnByb2opO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjYWxsSWNvbihjdHgsIGdhbWUpe1xuICAgICAgICBpZiAoZ2FtZS5yZWNhbGxTdG9yYWdlKXtcbiAgICAgICAgICAgIGxldCBpbWFnZVR5cGUgPSBnYW1lLnJlY2FsbFN0b3JhZ2UudHlwZSArIGdhbWUucmVjYWxsU3RvcmFnZS5mb3JtO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnJlY2FsbEltYWdlc1tpbWFnZVR5cGVdLCB0aGlzLnBvc2l0aW9uLngrMjIsIHRoaXMucG9zaXRpb24ueS01KTsgXG5cbiAgICAgICAgICAvLyAgdGhpcy5yZWNhbGxJbWFnZXNbZ2FtZS5yZWNhbGxTdG9yYWdlLnR5cGVdXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBzdW1tb25BdHRhY2soKXt9OyBcbiAgICBkcmF3KGN0eCwgcGF1c2Upe1xuICAgICAgICBsZXQgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSlcbiAgICAgICAgbGV0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgICAvL2dldCBzcHJpdGVcblxuICAgICAgICAvLyBpZiAodGhpcy5pbnZ1bG5UaW1lJTQ+PTEgJiYgdGhpcy5pbnZ1bG5UaW1lPjAgJiYgdGhpcy5hbGl2ZSkge2N0eC5nbG9iYWxBbHBoYSA9IDAuMn07XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCsxNSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLy9oaXRib3hcbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5jdXJUaWxlKjgwLCB0aGlzLnBvc2l0aW9uLnksIDgwLCA4MCk7IC8vc2VsZWN0ZWQgdGlsZVxuICAgICAgICAvLyBjdHguZmlsbFJlY3QodGhpcy5oaXRib3hbMF0tKDc1KigtMSt0aGlzLmxvb3RNdWx0aSkpLCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIDgwKTsgLy9sb290IHJhbmdlXG4gICAgICAgIC8vIGN0eC5maWxsUmVjdCh0aGlzLmhpdGJveFswXSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoKzc1KigtMSt0aGlzLmxvb3RNdWx0aSksIDgwKTsgLy9sb290IHJhbmdlXG5cbiAgICAgICAgaWYgKHRoaXMubGVmdCl7XG4gICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAtdGhpcy5wb3NpdGlvbi54LTEuNSp0aGlzLndpZHRoLTEwLCB0aGlzLnBvc2l0aW9uLnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueC01LCB0aGlzLnBvc2l0aW9uLnkpOyB9XG4gICAgICAgIFxuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTtcblxuICAgICAgICBpZiAodGhpcy5pbnZ1bG5EYXJrICYmIHRoaXMuYWxpdmUpe1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IC8vIEltYWdlIHRpbnRpbmdcbiAgICAgICAgICAgIGJ1ZmZlci53aWR0aCA9IDIwMDsvL2ltYWdlLndpZHRoO1xuICAgICAgICAgICAgYnVmZmVyLmhlaWdodCA9IDIwMDsvL2ltYWdlLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGJ0eCA9IGJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgYnR4LmRyYXdJbWFnZShpbWFnZSwgMCwwKTtcbiAgICAgICAgICAgIGJ0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbXVsdGlwbHknO1xuICAgICAgICAgICAgYnR4LmZpbGxSZWN0KDAsMCxidWZmZXIud2lkdGgsIGJ1ZmZlci5oZWlnaHQpO1xuICAgICAgICAgICAgYnR4Lmdsb2JhbEFscGhhID0gMC42O1xuICAgICAgICAgICAgYnR4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24taW5cIjtcbiAgICAgICAgICAgIGJ0eC5kcmF3SW1hZ2UoaW1hZ2UsMCwwKTsgXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe1xuICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlciwgLXRoaXMucG9zaXRpb24ueC0xLjUqdGhpcy53aWR0aC0xMCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoYnVmZmVyLCB0aGlzLnBvc2l0aW9uLngtNSwgdGhpcy5wb3NpdGlvbi55KTsgfVxuICAgICAgICB9XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgICAgXG4gICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXsgLy9yZXNldHMgXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJzt9IFxuXG4gICAgICAgIC8vZWxlbWVudGFscyBcbiAgICAgICAgdGhpcy5wbGF5ZXJYID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yICsxODsgXG4gICAgICAgIHRoaXMuZWxlUG9zaXRpb25zID0gWyBbdGhpcy5wbGF5ZXJYIC02MCwgdGhpcy5wb3NpdGlvbi55KzVdLCBbdGhpcy5wbGF5ZXJYIC00MCwgdGhpcy5wb3NpdGlvbi55LTM1XSxcbiAgICAgICAgICAgIFt0aGlzLnBsYXllclggLCB0aGlzLnBvc2l0aW9uLnktNTVdLCBbdGhpcy5wbGF5ZXJYICs0MCwgdGhpcy5wb3NpdGlvbi55LTM1XSwgW3RoaXMucGxheWVyWCArNjAsIHRoaXMucG9zaXRpb24ueSs1XSBdO1xuICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuZWxlbWVudExpc3QubGVuZ3RoOyBpKyspeyAvLyBMb2FkIGVsZW1lbnRhbCBzcHJpdGVzIFxuICAgICAgICAgICAgICAgIGxldCBlbGVUeXBlID0gdGhpcy5lbGVtZW50TGlzdFtpXTsgXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0pe1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5lbGVtZW50U3RhdGVbaV0gPSAnc3RhbmQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnRTdGF0ZVtpXSA9ICdzdGFuZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSAnc3dpbmcyJyB8fHRoaXMuc3RhdGUgPT0gJ3N3aW5nMycpe3RoaXMuZWxlbWVudFN0YXRlW2ldPSdzd2luZzEnfVxuICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmVsZW1lbnRTcHJpdGVzW2VsZVR5cGVdLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLmVsZW1lbnRTdGF0ZVtpXSkpIC8vIGNvcGllcyBwbGF5ZXIgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXsgLy9yZXNldHMgQXR0YWNrIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3RhdGVbaV09ICdzdGFuZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGVzW2VsZVR5cGVdWzJdLnJlc2V0KCkgLy9yZXNldCBcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubGVmdCl7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0sIC10aGlzLmVsZVBvc2l0aW9uc1tpXVswXS10aGlzLndpZHRoLTQ1LCB0aGlzLmVsZVBvc2l0aW9uc1tpXVsxXSk7IFxuICAgICAgICAgICAgICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTt9XG4gICAgICAgICAgICAgICAgZWxzZSAoY3R4LmRyYXdJbWFnZSh0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0sIHRoaXMuZWxlUG9zaXRpb25zW2ldWzBdLCB0aGlzLmVsZVBvc2l0aW9uc1tpXVsxXSkpOyBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGUgPSB7fSAvL2NsZWFyIGxvYWRlZCBzcHJpdGVzXG5cbiAgICAgICAgaWYgKHRoaXMuZ3JhdmVTcGF3bikgeyBcbiAgICAgICAgICAgIGlmICh0aGlzLmdyYXZlWSA+PSB0aGlzLmZsb29yKzM1KXt0aGlzLmdyYXZlU3RhdGUgPSdsYW5kJ31cbiAgICAgICAgICAgIGVsc2Uge3RoaXMuZ3JhdmVZICs9IDh9OyBcblxuICAgICAgICAgICAgbGV0IGdyYXZlQW5pbWF0aW9uID0gdGhpcy5ncmF2ZUFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuZ3JhdmVTdGF0ZSkpXG4gICAgICAgICAgICBsZXQgZ3JhdmVJbWFnZSA9IGdyYXZlQW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZ3JhdmVJbWFnZSwgdGhpcy5ncmF2ZVgsIHRoaXMuZ3JhdmVZKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCwgcGF1c2UpICkgLy9kcmF3IHByb2plY3RpbGVzIFxuICAgIH1cblxuICAgIHRlbGVwb3J0KGRpcmVjdGlvbil7XG4gICAgICAgIGlmICh0aGlzLmxhbmUgLSAxKmRpcmVjdGlvbj4tMSAmJiB0aGlzLmxhbmUgLSAxKmRpcmVjdGlvbjwzICYmIHRoaXMuYWxpdmUpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMucm93SGVpZ2h0KmRpcmVjdGlvbjsyXG4gICAgICAgICAgICB0aGlzLmxhbmUgKz0gLTEqZGlyZWN0aW9uOyBcbiAgICAgICAgICAgIHRoaXMuZmxvb3IgPSAgdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAoMSt0aGlzLmxhbmUpKnRoaXMucm93SGVpZ2h0fVxuICAgIH1cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgaWYgKHRoaXMuaW52dWxuVGltZT4wKXtcbiAgICAgICAgICAgIHRoaXMuaW52dWxuVGltZS0tXG4gICAgICAgICAgICBpZiAodGhpcy5pbnZ1bG5UaW1lPjApe1xuICAgICAgICAgICAgICAgIHRoaXMuaW52dWxuRGFya1RpbWUgKytcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmludnVsbkRhcmtUaW1lPjUpIHt0aGlzLmludnVsbkRhcmsgPSBmYWxzZTsgdGhpcy5pbnZ1bG5EYXJrVGltZSA9IC0zfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaW52dWxuRGFya1RpbWU+MCl7dGhpcy5pbnZ1bG5EYXJrID10cnVlfTtcbiAgICAgICAgICAgIH0gZWxzZSB7dGhpcy5pbnZ1bG5EYXJrID0gZmFsc2V9O1xuICAgICAgICBcbiAgICAgICAgfTsgXG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEID4wKXt0aGlzLmF0dGFja0NELT0gKDEqdGhpcy5zcGVlZE11bHRpKX07XG4gICAgICAgIGlmICh0aGlzLmhlYWx0aDw9MCl7dGhpcy5zdGF0ZSA9ICdkZWFkJzsgXG4gICAgICAgICAgICAgICAgdGhpcy5hbGl2ZT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmF2ZVNwYXduID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhdmVYID0gdGhpcy5wb3NpdGlvbi54KzIwOyBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSgpICk7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gdGhpcy5wcm9qZWN0aWxlcy5maWx0ZXIoICAvL2RlbGV0ZXMgcHJvamVjdGlsZXNcbiAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QuZGVsZXRlICE9PSB0cnVlOyBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5hbGl2ZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5zcGVlZFghPTAgJiYgIXRoaXMuYXR0YWNrQW5pbS5pbmNsdWRlcyh0aGlzLnN0YXRlKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICd3YWxrJzsgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT0gJ3dhbGsnKSB0aGlzLnN0YXRlID0gJ3N0YW5kJzsgXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng8LTMwKSB7dGhpcy5wb3NpdGlvbi54ID0gLTMwfTsgLy9sZWZ0IGJvcmRlclxuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoKSB7dGhpcy5wb3NpdGlvbi54ID0gdGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aDt9IC8vcmlnaHQgYm9yZGVyXG4gICAgICAgICAgICB0aGlzLmN1clRpbGUgPSBNYXRoLmZsb29yKCAodGhpcy53aWR0aC8yICt0aGlzLnBvc2l0aW9uLngpLzgwKTtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmtub2NrYmFja0ZvcmNlKT4wKSB7c2V0VGltZW91dCgoKT0+e3RoaXMua25vY2tiYWNrRm9yY2U9MH0sIDEwMDApfTsgIC8vRFIgXG4gICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZT4wKXt0aGlzLmtub2NrYmFja0ZvcmNlLT0wLjU7fVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZTwwKXt0aGlzLmtub2NrYmFja0ZvcmNlKz0wLjU7fVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9ICh0aGlzLnNwZWVkWCp0aGlzLnNwZWVkTXVsdGkpO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMua25vY2tiYWNrRm9yY2U7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gdGhpcy5zcGVlZFk7IFxuXG4gICAgICAgIH0gZWxzZSB7ICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvYXQ+MCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPTAuMSp0aGlzLmZsb2F0RGlyZWN0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsb2F0IC0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7dGhpcy5mbG9hdCA9IDIwOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxvYXREaXJlY3QgPSAtdGhpcy5mbG9hdERpcmVjdH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi55ID4gdGhpcy5mbG9vcil7IC8vYm90dG9tIGJvcmRlciAodXBkYXRlIGZvciBwbGF0Zm9ybXMpXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLmZsb29yO1xuICAgICAgICAgICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgICAgICAgICAgdGhpcy5qdW1wID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTsgXG4gICAgICAgICAgICBpZiAodGhpcy5hbGl2ZSAmJiAhdGhpcy5hdHRhY2tBbmltLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB0aGlzLnN0YXRlID0gJ3N0YW5kJztcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKHRoaXMuc3BlZWRZPjApe1xuICAgICAgICAgICAgdGhpcy5zcGVlZFktPTAuNTsgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuanVtcCl7IC8vZ3Jhdml0eVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IDEqdGhpcy5ncmF2aXR5VGltZTtcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUrPTAuNTsgXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXR0YWNrQW5pbS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkgdGhpcy5zdGF0ZSA9ICdqdW1wJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngrMTUsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuXG4gICAgICAgIC8vdGhpcy5wb3NpdGlvbi54Kz0gNSAvIGRlbHRhVGltZTsgXG4gICAgfVxufSIsImltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdGlsZXtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIHR5cGU9J2VuZXJneWJhbGwnLHggPSAwLCB5PTAsIGRpcmVjdGlvbiA9IDEgKXtcbiAgICAgICAgdGhpcy50eXBlSW5mbyA9IHsgJ2VuZXJneWJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDkwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd5ZWxsb3dCYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA5MCwneU9mZic6MTJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3B1cnBsZUJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDkwLCd5T2ZmJzoxMn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAncmVkQmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogOTAsJ3lPZmYnOjEyfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdncmVlbkJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDkwLCd5T2ZmJzoxMn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnYmx1ZUJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDkwLCd5T2ZmJzoxMn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmlyZWJhbGwnOiB7J3NwZWVkJzogMywgJ3RyYXZlbCc6MSwgJ2V4cGxvZGUnOjIsICd4T2ZmJzogNzAsICd5T2ZmJzotMTAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmlyZWJhbGwyJzogeydzcGVlZCc6IDEyLCAndHJhdmVsJzoxLCAnZXhwbG9kZSc6MywgJ3hPZmYnOiAxMTUsICd5T2ZmJzotNDAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAnYmF0YmFsbCc6IHsnc3BlZWQnOiA2LCAndHJhdmVsJzozLCAnZXhwbG9kZSc6NCwgJ3hPZmYnOiAxMDV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BvaXNvbmJhbGwnOiB7J3NwZWVkJzogNywgJ3RyYXZlbCc6MSwgJ2V4cGxvZGUnOjUsICd4T2ZmJzoxMTUsICAneU9mZic6LTQwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWNlYmFsbCc6IHsnc3BlZWQnOiA4LCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NCwgJ3hPZmYnOjEzNSwgICd5T2ZmJzotNDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdsaWdodG5pbmdiYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NywgJ3hPZmYnOjgwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0aHVuZGVyYmFsbCc6IHsnc3BlZWQnOiAxMiwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjcsICd4T2ZmJzoxMTAsJ3lPZmYnOi00MCB9IH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gcGxheWVyLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gcGxheWVyLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAyMDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyMDsgXG4gICAgICAgIHRoaXMuZXhwbG9kZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5kZWxldGUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZSA9IHRydWU7XG4gICAgICAgIHRoaXMudG91Y2hIaXQ9IHRydWU7XG4gICAgICAgIHRoaXMucGllcmNlID0gcGxheWVyLnBpZXJjZTtcbiAgICAgICAgdGhpcy5vd25lciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBwbGF5ZXIuZGFtYWdlICogcGxheWVyLmRhbWFnZU11bHRpOyBcbiAgICAgICAgdGhpcy5oZWFsdGggPTE7IFxuICAgICAgICB0aGlzLnNpZGUgPSAwOyBcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgXG4gICAgICAgIHRoaXMuaGl0TGlzdCA9IFtdOyBcbiAgICAgICAgdGhpcy5sYW5lID0gcGxheWVyLmxhbmU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAndHJhdmVsJzsgXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uOyBcbiAgICAgICAgXG5cbiAgICAgICAgdGhpcy5jaGlsbCA9IHBsYXllci5jaGlsbDtcbiAgICAgICAgdGhpcy5hcmVhID0gcGxheWVyLmFyZWE7IFxuICAgICAgICB0aGlzLnBvaXNvbiA9IHBsYXllci5wb2lzb247IFxuICAgICAgICB0aGlzLnBvaXNvbk1heCA9IHBsYXllci5wb2lzb25NYXg7XG5cbiAgICAgICAgdGhpcy54T2ZmID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd4T2ZmJ107XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXSl7dGhpcy55T2ZmID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ119XG4gICAgICAgIGVsc2UgdGhpcy55T2ZmID0wO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmxlZnQgPSBwbGF5ZXIubGVmdDsgLy8gc2hvb3QgbGVmdFxuICAgICAgICBpZiAoeCA9PSAwICYmIHkgPT0gMCl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgICAgICB4OiBwbGF5ZXIucG9zaXRpb24ueCwgXG4gICAgICAgICAgICAgICAgeTogcGxheWVyLnBvc2l0aW9uLnkrNDVcbiAgICAgICAgICAgIH19XG4gICAgICAgIGVsc2UgeyB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IHgrMzUsXG4gICAgICAgICAgICAgICAgeTogeSs2NX1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3NwZWVkJ107XG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG5cbiAgICB9XG5cbiAgICBjcmVhdGVBbmltYXRpb25zKCl7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gNjsgXG4gICAgICAgIHRoaXMudHJhdmVsID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy90cmF2ZWxfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3RyYXZlbCddLCB0aGlzLmZyYW1lcywgXCJ0cmF2ZWxcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgIHRoaXMuYnVyc3QgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMudHlwZSsnL2V4cGxvZGVfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2V4cGxvZGUnXSwgdGhpcy5mcmFtZXMsIFwiYnVyc3RcIiwgdHJ1ZSk7IC8vd2Fsa2luZyBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMudHJhdmVsLCB0aGlzLmJ1cnN0XTsgXG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAndGh1bmRlcmJhbGwnKXtcbiAgICAgICAgICAgIHRoaXMuYm9sdCA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ3RodW5kZXJib2x0L2V4cGxvZGVfPy5wbmcnLCA1LCB0aGlzLmZyYW1lcywgXCJleHBsb2RlXCIsIHRydWUpOyAvL1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvYWRzcHJpdGUnKVxuICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgcGF1c2UpIHtcbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTsgLy9yZWZlcmVuY2VcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBcIk5vbmVcIil7IFxuICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSlcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5leHBsb2RlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2J1cnN0J1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PSd0aHVuZGVyYmFsbCcpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgYm9sdEltYWdlID0gdGhpcy5ib2x0LmdldEltYWdlKHBhdXNlKTsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYm9sdEltYWdlLCB0aGlzLnBvc2l0aW9uLngsIDI0MClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpe3RoaXMuZGVsZXRlID0gdHJ1ZTt9XG4gICAgXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlPT0naWNlYmFsbCcgJiB0aGlzLnN0YXRlPT0nYnVyc3QnKXt0aGlzLnhPZmY9MTAwfTtcbiAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0KXsvL2ZsaXAgYmFzZWQgb24gc3ByaXRlIG9yaWVudGF0aW9uXG4gICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC10aGlzLnBvc2l0aW9uLngtIHRoaXMueE9mZisxNSwgdGhpcy5wb3NpdGlvbi55LTYwK3RoaXMueU9mZik7fVxuICAgICAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54LXRoaXMueE9mZisyMCwgdGhpcy5wb3NpdGlvbi55LTYwK3RoaXMueU9mZik7IH1cblxuICAgICAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7IFxuICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnNwcml0ZSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkrMjUpOyAvL2RyYXcgbW9iICh4LCB5LCBoZWlnaHQsIHdpZHRoKVxuICAgICAgICBpZiAodGhpcy5leHBsb2RlKXt0aGlzLmRlbGV0ZSA9IHRydWV9OyBcbiAgICAgICAgfVxuXG4gICAgfSBcblxuXG4gICAgdXBkYXRlKCl7XG4gICAgICAgIGlmICghdGhpcy5leHBsb2RlKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe3RoaXMucG9zaXRpb24ueCAtPSB0aGlzLnNwZWVkO30gLy8gZGlyZWN0aW9uXG4gICAgICAgICAgICBlbHNlIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLnNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng8LXRoaXMud2lkdGgtMTAwKSB7dGhpcy5kZWxldGUgPSB0cnVlIH07XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aCkge3RoaXMuZGVsZXRlID0gdHJ1ZX07XG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkrNSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuXG5cblxuICAgIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHJlc3RhcnRTY3JlZW57XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTcwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwOyBcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyNTsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQyID0gXCIyNHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlIDsgXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnUmV0dXJuIHRvIE1haW4nO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy5nYW1lV2lkdGgvMjtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDI1MDtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSA1MDsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMueCsodGhpcy53aWR0aC10aGlzLmJ1dHRvbldpZHRoKS8yLCB0aGlzLmhlaWdodC10aGlzLmJ1dHRvbkhlaWdodC10aGlzLnBhZGRpbmddXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjFdXG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3RhcnRGdW5jdGlvbnMoZ2FtZSl7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgICAgICBnYW1lLmZhZGVPdXQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtnYW1lLnRpdGxlRGlzcGxheSA9IHRydWV9LCBcIjIwMDBcIikgLy8gZmFkZSBvdXQgdHJhbnNpdGlvblxuICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRGdW5jdGlvbnMoZ2FtZSwgaSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4KXsgICBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnc3RlZWxibHVlJzsgLy9kcmF3IGJvcmRlclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL3NldHMgYXJlYSBmb3IgY29sbGlzaW9uIChpc1BvaW50SW5QYXRoKVxuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQsIDIpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyAvL2RyYXcgdGV4dCBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGUxLnRleHRDb250ZW50LCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSt0aGlzLmJ1dHRvbkhlaWdodC8yKTsgXG5cblxuXG4gICAgICAgIH1cblxuICAgICBcbiAgICAgICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAvLyBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgIC8vIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAvLyBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdyhjdHgpO1xuXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyAvL2RlZmVhdCBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ0dhbWUgT3ZlciEnLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLnkgKyAyNSkgLy92aWN0b3J5IG9yIGRlZmVhdFxuICAgICAgICAgICAgfVxuXG5cbiAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBcbiAgICAgICAgXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3RhcnRTY3JlZW57XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTIwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwOyBcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAxNTsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQyID0gXCIyNHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDMgPSBcIjIwcHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMuY29udHJvbHMgPSBbXCJTdG9wIHRoZSBtb25zdGVycyBmcm9tIGFkdmFuY2luZyFcIixcIiAtIFVzZSAoV0FTRCkgdG8gbW92ZSwgKEopIHRvIGp1bXAsIGFuZCAoSykgdG8gc2hvb3QuIFVzZSAoUCkgdG8gb3BlbiBzaG9wLiBcIiwgXG4gICAgICAgICAgICBcIiAtIENvbGxlY3QgdGhlIGNvaW5zIG1vbnN0ZXJzIGRyb3AgYmVmb3JlIHRoZXkgZXhwaXJlXCIsIFxuICAgICAgICAgICAgXCIgLSBTcGVuZCBtZXNvcyBvbiB1cGdyYWRlcyAmIHN1bW1vbnMgdG8gYm9sc3RlciB5b3VyIGRlZmVuc2VcIiwgXG4gICAgICAgICAgICBcIiAtIExvc2UgbGl2ZXMgd2hlbiBtb25zdGVycyBlc2NhcGUgb3IgdG91Y2ggeW91XCIsIFwiIC0gR2FtZSBvdmVyIHdoZW4gYWxsIGxpdmVzIGxvc3QhXCJdO1xuICAgICAgICB0aGlzLmtleWJvYXJkID0gbmV3IEltYWdlKCk7IFxuICAgICAgICB0aGlzLmtleWJvYXJkLnNyYyA9ICdpbWFnZXMvYmcva2V5Ym9hcmQucG5nJztcbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdTdGFydCEnO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy5nYW1lV2lkdGgvMjtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDY1O1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDM1OyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy54K3RoaXMud2lkdGgtIHRoaXMuYnV0dG9uV2lkdGgtdGhpcy5wYWRkaW5nLCB0aGlzLmhlaWdodC10aGlzLmJ1dHRvbkhlaWdodC10aGlzLnBhZGRpbmddXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjFdXG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0RnVuY3Rpb25zKGdhbWUpe1xuICAgICAgICAgICAgZ2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICB9XG5cblxuICAgICAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRGdW5jdGlvbnMoZ2FtZSwgaSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdCdXR0b24oZTEsIHgsIHksIGN0eCl7ICAgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3N0ZWVsYmx1ZSc7IC8vZHJhdyBib3JkZXJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCx0aGlzLmJ1dHRvbkhlaWdodCk7IFxuXG4gICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZHJhdyB0ZXh0IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzIpOyBcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy9zZXRzIGFyZWEgZm9yIGNvbGxpc2lvbiAoaXNQb2ludEluUGF0aClcbiAgICAgICAgICAgIGN0eC5yZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCk7ICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgXG4gICAgICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSB8fCBnYW1lLndhdmVGaW5pc2ggfHwgZ2FtZS5sZXZlbEZpbmlzaCl7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngrMC4zKnRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KzIwLCAwLjQqdGhpcy53aWR0aCwgMjUsIDIpO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQ7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQcmVzcyBbQV0gZm9yIHVwZ3JhZGVzJywgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5oZWlnaHQrMzUpIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbE5vdGUhPScnKXtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwgLSBnYW1lLm5vdGVUaW1lPDQ1MDApe1xuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngrMTUsIHRoaXMuaGVpZ2h0KjAuNSwgdGhpcy53aWR0aC0zMCwgNTAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQzOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChnYW1lLmxldmVsTm90ZSwgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5oZWlnaHQvMiszMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5IHx8IChnYW1lLnBhdXNlICYmICFnYW1lLnVwZ3JhZGUuZGlwbGF5KSl7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDIpO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnc3RhcnQnOyBcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMua2V5Ym9hcmQsIDE4MCwwKTtcbiAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpPTA7IGk8dGhpcy5jb250cm9scy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vICAgICBjdHguZmlsbFRleHQodGhpcy5jb250cm9sc1tpXSwgdGhpcy54K3RoaXMucGFkZGluZywgdGhpcy55K3RoaXMucGFkZGluZyooMStpKSwgdGhpcy53aWR0aCk7IFxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlZHJhdyhjdHgpOyAvL2RyYXcgc3RhcnQgYnV0dG9uXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgIC8vIGlmIChnYW1lLnN0b3JhZ2UubGVuZ3RoPjApe1xuICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAvLyAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIC8vICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgICAgICAvLyAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAvLyAgICAgY3R4LnRleHRBbGlnbiA9ICdzdGFydCc7IFxuICAgICAgICAgICAgLy8gICAgIGN0eC5mb250ID0gdGhpcy5mb250MjtcbiAgICAgICAgICAgIC8vICAgICBjdHguZmlsbFRleHQoJ1Jlc3VtbW9uIERyYWdvbnMgZnJvbSBzaG9wIScsIHRoaXMueCt0aGlzLnBhZGRpbmcsIHRoaXMueSt0aGlzLnBhZGRpbmcpIFxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZWxzZSB7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0JykuaW5uZXJIVE1MPVwiXCI7fVxuICAgICAgICAgICAgXG4gICAgXG4gICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICBcblxuXG4gICAgXG4gICAgICAgIFxufSIsImltcG9ydCBpbWcgZnJvbSAnLi9pbWcnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGl0bGVTY3JlZW57XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTcwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwOyBcbiAgICAgICAgdGhpcy5iZ0FydCA9IGltZygnYmcvYmdUaXRsZS5wbmcnKTtcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyNTsgXG4gICAgICAgIHRoaXMuZm9udFRpdGxlID0gXCI0OHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udCA9IFwiMThweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQyID0gXCIyOHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDMgPSBcIjI0cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMudGl0bGVMb2dvID0gXCJNYXBsZVREXCI7IFxuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1BsYXknO1xuICAgICAgICB0aGlzLmJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24yLnRleHRDb250ZW50ID0gJ0xldmVsIFNlbGVjdCc7XG4gICAgICAgIHRoaXMuYnV0dG9uMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjMudGV4dENvbnRlbnQgPSAnPCc7ICAgXG5cbiAgICAgICAgdGhpcy5idXR0b240ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNC50ZXh0Q29udGVudCA9ICc+JzsgIFxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWSA9IDE7XG5cbiAgICAgICAgdGhpcy5hYm91dFRleHQgPSBbXCJVbm9mZmljaWFsIGZhbiBnYW1lIGRldmVsb3BlZCBieSBDaHJpc3RvcGhlciBMZWUgKHNpcmhjbGVlQGdtYWlsLmNvbSlcIixcbiAgICAgICAgICAgICAgICAgXCJBbGwgTWFwbGVTdG9yeSBhc3NldHMgdXNlZCBhcmUgY29weXJpZ2h0ZWQgbWF0ZXJpYWxzICYgaW50ZWxsZWN0dWFsIHByb3BlcnR5IGJlbG9uZ2luZyB0byBORVhPTlwiXTtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDE3NTtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSAzNTsgXG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLmdhbWVXaWR0aC8yLSh0aGlzLmJ1dHRvbldpZHRoLzIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLmJ1dHRvblgxLCAyKnRoaXMuZ2FtZUhlaWdodC8zLTVdLCBcbiAgICAgICAgICAgIFt0aGlzLmJ1dHRvblgxLCB0aGlzLnBhZGRpbmcrdGhpcy5idXR0b25IZWlnaHQgKyAyKnRoaXMuZ2FtZUhlaWdodC8zLTI1XV0gXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24xLCB0aGlzLmJ1dHRvbjJdXG5cbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbnMgPSBbIHRoaXMuYnV0dG9uMywgdGhpcy5idXR0b240XTsgXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25XaWR0aCA9IDUwOyBcbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbkhlaWdodCA9IDMwOyBcbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbkNlbnRlciA9IDcwOyAgLy8gbWlkZGxlIG51bWJlciBcbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMuZ2FtZVdpZHRoLzItdGhpcy5sZXZlbEJ1dHRvbkNlbnRlci8yLXRoaXMubGV2ZWxCdXR0b25XaWR0aCwgdGhpcy5idXR0b25Qb3NpdGlvbnNbMV1bMV0rNDBdLCBcbiAgICAgICAgW3RoaXMuZ2FtZVdpZHRoLzIrdGhpcy5sZXZlbEJ1dHRvbkNlbnRlci8yLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1sxXVsxXSs0MF1dOyBcblxuICAgICAgICB0aGlzLmZhZGUgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbGl6ZShnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVIb3ZlcihlKSB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH0gLy8gICAgICAgIHRoaXMubGV2ZWxCdXR0b25zID0gWyB0aGlzLmJ1dHRvbjMsIHRoaXMuYnV0dG9uNF07IFxuICAgICAgICAgICAgLy90aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zID0gWyBbMTAsIHRoaXMuYnV0dG9uUG9zaXRpb25zWzFdWzFdKzEwXSwgWzEwLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1sxXVsxXSsyMF1dOyBcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5sZXZlbEJ1dHRvbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmxldmVsQnV0dG9uc1tpXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgfSAgICAgICAgICBcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGhhbmRsZUNsaWNrKGUsIGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uc0xpc3RbaV0udGV4dENvbnRlbnQgPT0gXCJQbGF5XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5mYWRlT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57Z2FtZS50aXRsZURpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnJlc2V0RXZlcnl0aGluZygpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMubGV2ZWxCdXR0b25zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5sZXZlbEJ1dHRvbnNbaV0sIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbEJ1dHRvbnNbaV0udGV4dENvbnRlbnQgPT0gXCI8XCIpeyAvLyByZWxvYWQgYmcgYXJ0IGFuZCBsZXZlbCBsb2FkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbD4xKXtnYW1lLmxldmVsLS19XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbEJ1dHRvbnNbaV0udGV4dENvbnRlbnQgPT0gXCI+XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUubGV2ZWw8Z2FtZS5maW5hbExldmVsKXtnYW1lLmxldmVsKyt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgICAgICAgICBcbiAgICAgICAgICAgIFxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGRyYXdCdXR0b24oZTEsIHgsIHksIGN0eCl7ICAgXG4gICAgICAgICAgICBsZXQgYnV0dG9uV2lkdGggPSB0aGlzLmJ1dHRvbldpZHRoO1xuICAgICAgICAgICAgbGV0IGJ1dHRvbkhlaWdodCA9IHRoaXMuYnV0dG9uSGVpZ2h0O1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnO1xuICAgICAgICAgICAgaWYgKGUxLnRleHRDb250ZW50PT0nUGxheScpe1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250Mjt9XG4gICAgICAgICAgICBlbHNlIGlmIChlMS50ZXh0Q29udGVudD09J0xldmVsIFNlbGVjdCcpe1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MztcbiAgICAgICAgICAgICAgICBidXR0b25IZWlnaHQgLT0xMTtcbiAgICAgICAgICAgICAgICB5Kz0xMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7Y3R4LmZvbnQgPSB0aGlzLmZvbnQzO1xuICAgICAgICAgICAgICAgIGJ1dHRvbldpZHRoID0gdGhpcy5sZXZlbEJ1dHRvbldpZHRoO1xuICAgICAgICAgICAgICAgIGJ1dHRvbkhlaWdodCA9IHRoaXMubGV2ZWxCdXR0b25IZWlnaHQgO31cbiAgICAgICAgICAgICAgICAvL2RyYXcgdGV4dCBcbiAgICAgICAgXG5cblxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh4LHksIGJ1dHRvbldpZHRoLGJ1dHRvbkhlaWdodCwgMykgO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrYnV0dG9uV2lkdGgvMiwgeStidXR0b25IZWlnaHQvMik7IFxuICAgIFxuICAgICAgICB9XG5cbiAgICAgXG4gICAgICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iZ0FydCwgMCwwKTsgXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ3doaXRlJztcbiAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbMF1bMF0rIDEwKyB0aGlzLmxldmVsQnV0dG9uV2lkdGgsdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVsxXSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbldpZHRoLCB0aGlzLmxldmVsQnV0dG9uSGVpZ2h0LCAzKSA7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGU9ICdibGFjayc7XG4gICAgICAgICAgICAgICBjdHguZmlsbFRleHQoZ2FtZS5sZXZlbCwgIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbMF1bMF0rdGhpcy5sZXZlbEJ1dHRvbkNlbnRlcisxNSwgIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbMF1bMV0rMTgpOyBcblxuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCk7IC8vZHJhdyBzdGFydCBidXR0b25cblxuICAgICAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgY3R4LnNoYWRvd09mZnNldFg9MTtcbiAgICAgICAgICAgICAgICBjdHguc2hhZG93T2Zmc2V0WT0xO1xuICAgICAgICAgICAgICAgIGN0eC5zaGFkb3dDb2xvcj1cImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgY3R4LnNoYWRvd0JsdXI9IDQ7IFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnRUaXRsZTsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ3doaXRlJztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy50aXRsZUxvZ28sIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMuZ2FtZUhlaWdodC8zKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG5cbiAgICAgICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQ7IC8vYWJvdXRcbiAgICAgICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmZhZGU7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnUHJlc3MgYW55IGtleScsIHRoaXMuZ2FtZVdpZHRoLzIsdGhpcy5nYW1lSGVpZ2h0LzIrNTUpOyBcbiAgICAgICAgICAgICAgICB0aGlzLmZhZGUtPTAuMDEwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGU8MC4yNSl7dGhpcy5mYWRlID0gMX1cbiAgICAgICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuYWJvdXRUZXh0Lmxlbmd0aDsgaSsrKXsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmFib3V0VGV4dFtpXSwgdGhpcy5nYW1lV2lkdGgvMix0aGlzLmdhbWVIZWlnaHQtMzUrMTUqaSk7IFxuICAgICAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VUZXh0KHRoaXMuYWJvdXRUZXh0W2ldLHRoaXMuZ2FtZVdpZHRoLzIsdGhpcy5nYW1lSGVpZ2h0LTM1KzE1KmkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICBcbiAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9XCJibGFja1wiOyBcbiAgICAgICAgICAgICAgICAvLyBjdHgubGluZVdpZHRoPTU7XG4gICAgICAgICAgICAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5yb3VuZFJlY3QodGhpcy5idXR0b25Qb3NpdGlvbnNbMF1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zWzBdWzFdLCB0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCwgMykgO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5zdHJva2UoKTtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgICAgICBcbiAgICBcbiAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBcbiAgICAgICAgXG59IiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGdyYWRle1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjUwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDIzMDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDtcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDE1OyBcbiAgICAgICAgdGhpcy5wYWRkaW5nWSA9IDQ7XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSAxNzA7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzY7XG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTNweCBhcmlhbFwiOyAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjE0cHggYXJpYWxcIjsgIFxuXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnU3VtbW9uIFJlZCBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudmFsdWUgPSAncmVkRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMi50ZXh0Q29udGVudCA9ICdTdW1tb24gQmx1ZSBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjIudmFsdWUgPSAnYmx1ZURyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjMudGV4dENvbnRlbnQgPSAnU3VtbW9uIEdyZWVuIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMy52YWx1ZSA9ICdncmVlbkRyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjQudGV4dENvbnRlbnQgPSAnU3VtbW9uIEJsYWNrIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uNC52YWx1ZSA9ICdibGFja0RyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMTAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xMC50ZXh0Q29udGVudCA9ICdXSVAnO1xuICAgICAgICB0aGlzLmJ1dHRvbjEwLnZhbHVlID0gJ211c2hyb29tS25pZ2h0JztcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMueCArIHRoaXMucGFkZGluZzsgXG4gICAgICAgIHRoaXMubmFtZUhhc2ggPSB7J3JlZERyYWdvbic6J1JlZCBEcmFnb24nLCAnYmx1ZURyYWdvbic6J0JsdWUgRHJhZ29uJyxcbiAgICAgICAgJ2dyZWVuRHJhZ29uJzonR3JlZW4gRHJhZ29uJywgJ2JsYWNrRHJhZ29uJzonQmxhY2sgRHJhZ29uJywgJ211c2hyb29tS25pZ2h0JzogJ011c2hyb29tIEtuaWdodCd9O1xuICAgICAgICB0aGlzLnN1bW1vbkxpc3QgPSBbJ3JlZERyYWdvbicsICdibHVlRHJhZ29uJywnZ3JlZW5EcmFnb24nLCdibGFja0RyYWdvbiddO1xuICAgICAgICB0aGlzLmVsZW1lbnRMaXN0ID0gWydCbGF6ZScsJ0Rhd24nLCdOaWdodCcsJ1dpbmQnLCdUaHVuZGVyJ107XG5cbiAgICAgICAgdGhpcy5idXR0b241ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNS50ZXh0Q29udGVudCA9ICdCbGF6ZSBTcHJpdGUnOyAvL0JsYXplIC0gRmxhbWUgXG4gICAgICAgIHRoaXMuYnV0dG9uNS52YWx1ZSA9IFwiQmxhemVcIjtcbiAgICAgICAgdGhpcy5idXR0b242ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNi50ZXh0Q29udGVudCA9ICdEYXduIFNwcml0ZSAnOyAvL0Rhd24gLSBMaWdodCBcbiAgICAgICAgdGhpcy5idXR0b242LnZhbHVlID0gXCJEYXduXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uNyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpOyBcbiAgICAgICAgdGhpcy5idXR0b243LnRleHRDb250ZW50ID0gJ05pZ2h0IFNwcml0ZSc7IC8vTmlnaHQgLSBEYXJrXG4gICAgICAgIHRoaXMuYnV0dG9uNy52YWx1ZSA9IFwiTmlnaHRcIjtcbiAgICAgICAgdGhpcy5idXR0b244ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uOC50ZXh0Q29udGVudCA9ICdXaW5kIFNwcml0ZSAnOyAgLy9XaW5kIC0gU3Rvcm1cbiAgICAgICAgdGhpcy5idXR0b244LnZhbHVlID0gXCJXaW5kXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uOSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpOyBcbiAgICAgICAgdGhpcy5idXR0b245LnRleHRDb250ZW50ID0gJ1RodW5kZXIgU3ByaXRlJzsgLy9UaHVuZGVyIC0gTGlnaHRuaW5nICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvbjkudmFsdWUgPSBcIlRodW5kZXJcIjsgXG4gICAgICAgIHRoaXMuYnV0dG9uWDIgPSAgdGhpcy5idXR0b25YMSArIHRoaXMuYnV0dG9uV2lkdGgrIHRoaXMucGFkZGluZyA7IFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMuYnV0dG9uWDEsIDBdLCBbdGhpcy5idXR0b25YMSwxXSwgW3RoaXMuYnV0dG9uWDEsMl0sIFt0aGlzLmJ1dHRvblgxLDNdLCAgW3RoaXMuYnV0dG9uWDEsNF0sIFxuICAgICAgICAgICAgICAgICBbdGhpcy5idXR0b25YMiwwXSwgW3RoaXMuYnV0dG9uWDIsMV0sIFt0aGlzLmJ1dHRvblgyLDJdLCBbdGhpcy5idXR0b25YMiwzXSwgW3RoaXMuYnV0dG9uWDIsNF0gIF07IFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMSwgdGhpcy5idXR0b24yLCB0aGlzLmJ1dHRvbjMsIHRoaXMuYnV0dG9uNCwgdGhpcy5idXR0b24xMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b241LCB0aGlzLmJ1dHRvbjYsIHRoaXMuYnV0dG9uNywgdGhpcy5idXR0b244LCB0aGlzLmJ1dHRvbjldOyBcbiAgICAgICB0aGlzLm5vdGUgPSBcIlByZXNzIFtTXSB0byBidXksIFtBXSB0byBjbG9zZSBtZW51XCI7IFxuICAgICAgIFxuXG4gICAgICAgIHRoaXMuY29zdFBvc2l0aW9uID0gdGhpcy5idXR0b25YMiArIHRoaXMuYnV0dG9uV2lkdGgrIDIuNSp0aGlzLnBhZGRpbmc7IFxuICAgICAgICB0aGlzLmNvc3RIZWlnaHQgPSAyMDsgXG4gICAgICAgIHRoaXMuY29zdFdpZHRoID0gMjc1OyBcbiAgICAgICAgdGhpcy5jb3N0UGFkZGluZyA9IDQ7IFxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWCA9IDE7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWSA9IDE7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25UZXh0ID0gW107XG4gICAgICAgIHRoaXMucHVyY2hhc2VEZXNjcmlwdGlvbiA9IHJlcXVpcmUoJy4vcHVyY2hhc2UuanNvbicpOyBcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMucmVkcmF3KGN0eCksIHRydWUpOyBcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZWRyYXcoY3R4LCBnYW1lICl7XG4gICAgICAgIGxldCBidXR0b25EcmF3ID0gdGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IFxuICAgICAgIGZvciAobGV0IGkgPSAwOyBpPGJ1dHRvbkRyYXcgOyBpKyspe1xuICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIDIqdGhpcy5wYWRkaW5nWSsodGhpcy5idXR0b25IZWlnaHQrdGhpcy5wYWRkaW5nWSkqdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eCwgZ2FtZSlcbiAgICAgICB9XG4gICAgfVxuXG4gICAgdXBncmFkZUZ1bmN0aW9ucyhnYW1lLCBidXR0b24pe1xuICAgICAgICAvL3Jlc3VtbW9uO1xuICAgICAgICBpZiAoZ2FtZS5zdG9yYWdlLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKSl7XG4gICAgICAgICAgICBnYW1lLnJlc3VtbW9uKGJ1dHRvbi52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgdW5pdCA9IGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSk7XG4gICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAgJ1VwZ3JhZGUgJyt0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAnK3VuaXQubGV2ZWwrJyknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSkpeyAvL3VwZ3JhZGUgc3VtbW9ucyBcbiAgICAgICAgICAgIGxldCB1bml0ID0gZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKTtcbiAgICAgICAgICAgIHVuaXQubGV2ZWxVcChnYW1lLnBsYXllcik7IC8vYWRkIGNvc3QgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1bml0LmxldmVsKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHVuaXQubGV2ZWw8NSl7XG4gICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAgJ1VwZ3JhZGUgJyt0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAnK3VuaXQubGV2ZWwrJyknO31cbiAgICAgICAgICAgIGVsc2Uge2J1dHRvbi50ZXh0Q29udGVudCA9ICB0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAnK3VuaXQubGV2ZWwrJyknIH1cbiAgICAgICAgfSBcblxuICAgICAgICBlbHNlIGlmICh0aGlzLnN1bW1vbkxpc3QuaW5jbHVkZXMoYnV0dG9uLnZhbHVlKSl7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLnZhbHVlICE9J211c2hyb29tS25pZ2h0Jyl7XG4gICAgICAgICAgICAgICAgZ2FtZS5jcmVhdGVNb2IoZ2FtZS5wbGF5ZXIsIGJ1dHRvbi52YWx1ZSwgMCwgZ2FtZSk7IC8vc3VtbW9ucyA7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSkpeyAvL2NoZWNrcyBpZiBjcmVhdGVkIHN1Y2Nlc3NmdWxseSBcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1VwZ3JhZGUgJyt0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAxKSc7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbGVtZW50TGlzdC5pbmNsdWRlcyhidXR0b24udmFsdWUpKXtcbiAgICAgICAgICAgICAgICBnYW1lLmFkZEVsZW1lbnQoYnV0dG9uLnZhbHVlKTsgLy9lbGVtZW50c1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICAvLyBlbHNlIGlmIChidXR0b24udGV4dENvbnRlbnQ9PSdOZXh0IFdhdmUhJykgZ2FtZS5uZXh0V2F2ZSA9IHRydWU7IC8vbmV4dCB3YXZlIGJ1dHRvblxuXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgXG4gICAgICAgIGxldCBidXR0b25EcmF3ID0gdGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IFxuICAgICAgICBpZiAoIWdhbWUud2F2ZUZpbmlzaCl7YnV0dG9uRHJhdy09MX07IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxidXR0b25EcmF3IDsgaSsrKXtcbiAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5wYWRkaW5nWSsodGhpcy5idXR0b25IZWlnaHQrdGhpcy5wYWRkaW5nWSkqdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eCwgZ2FtZSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc0xpc3RbaV0uZm9jdXMoKTsgXG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlRnVuY3Rpb25zKGdhbWUsIHRoaXMuYnV0dG9uc0xpc3RbaV0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgIH1cblxuXG4gICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4LCBnYW1lKXsgICBcbiAgICAgICAgbGV0IGJ1dHRvbkNvbG9yID0nc3RlZWxibHVlJztcbiAgICAgICAgbGV0IHRleHRDb2xvciA9J3doaXRlJztcbiAgICAgICAgbGV0IGNvc3QgPSAwOyBcbiAgICAgICAgaWYgKGdhbWUpe1xuICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uWDE9PXgpIHsgLy9zdW1tb24gYnV0dG9ucyAvL2NoZWNrIGNvc3QgKGlmIGZpcnN0IG9yIHVwZ3JhZGUpXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gZTEudmFsdWUpKSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1bml0ID0gZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBlMS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gZ2FtZS5wbGF5ZXIudXBncmFkZUNvc3RbdW5pdC5sZXZlbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgKCBjb3N0ID0gZ2FtZS5wbGF5ZXIuc3VtbW9uQ29zdFtnYW1lLnBsYXllci5zdW1tb25Db3VudF0pO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLm1vbmV5PCBjb3N0KXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yID0gJ2xpZ2h0Z3JleSc7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvciA9ICdkYXJrZ3JleSc7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYnV0dG9uWDI9PXgpeyAvL2VsZW1lbnRzXG4gICAgICAgICAgICAgICAgY29zdCA9IGdhbWUucGxheWVyLmVsZW1lbnRDb3N0W2dhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF07XG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLm1vbmV5PGdhbWUucGxheWVyLmVsZW1lbnRDb3N0W2dhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF0gfHwgXG4gICAgICAgICAgICAgICAgICAgIGdhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aCA+PTUpe1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Db2xvciA9ICdsaWdodGdyZXknO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSAnZGFya2dyZXknOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJ1dHRvbkNvbG9yOyAgLy9idXR0b24gYmFja2dyb3VuZFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5yb3VuZFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0LCAzKTsgXG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICBcbiAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250OyBcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyAvL2J1dHRvbiB0ZXh0IFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dENvbG9yO1xuICAgICAgICBpZiAoZ2FtZSl7XG4gICAgICAgICAgICAgaWYgKGdhbWUuc3RvcmFnZS5sZW5ndGg+MCl7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGVzdCA9IGdhbWUuc3RvcmFnZS5maW5kKG9iaj0+IG9iai50eXBlPT1lMS52YWx1ZSk7IFxuICAgICAgICAgICAgICAgIGlmICh0ZXN0KXsgXG4gICAgICAgICAgICAgICAgICAgIGUxLnRleHRDb250ZW50ID0gJ1Jlc3VtbW9uIEx2bCAnK3Rlc3QubGV2ZWwrJyAnK3RoaXMubmFtZUhhc2hbZTEudmFsdWVdOyBcbiAgICAgICAgICAgICAgICAgICAgY29zdCA9IDA7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzMpOyBcbiAgICAgICAgaWYgKGNvc3QgJiYgZTEudmFsdWUhPSdtdXNocm9vbUtuaWdodCcpe1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCcoJytjb3N0KycgbWVzb3MpJywgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrMip0aGlzLmJ1dHRvbkhlaWdodC8zKTt9XG4gICAgICAgIC8vZWxzZSB7IGN0eC5maWxsVGV4dCgnTUFYJywgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrMip0aGlzLmJ1dHRvbkhlaWdodC8zKTt9XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL2NvbGxpc2lvbiBwYXRoIFxuICAgICAgICBjdHgucmVjdCh4LHksIHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0KTsgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHRvZ2dsZU1lbnUoZ2FtZSl7IFxuICAgICAgICB0aGlzLmRpc3BsYXkgPSAhdGhpcy5kaXNwbGF5OyBcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheSl7Z2FtZS5wYXVzZSA9IHRydWV9XG4gICAgICAgIGVsc2UgZ2FtZS5wYXVzZSA9IGZhbHNlIDtcbiAgICB9XG5cbiAgICBwdXJjaGFzZShnYW1lKXtcbiAgICAgICAgbGV0IGkgPSAodGhpcy5zZWxlY3Rpb25YLTEpKjUgKyAodGhpcy5zZWxlY3Rpb25ZLTEpO1xuICAgICAgICB0aGlzLnVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgdGhpcy5idXR0b25zTGlzdFtpXSk7IFxuICAgIH1cblxuICAgIHNlbGVjdGVkRGVzY3JpcCgpe1xuICAgICAgICBsZXQgaSA9ICh0aGlzLnNlbGVjdGlvblgtMSkqNSArICh0aGlzLnNlbGVjdGlvblktMSk7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25UZXh0ID0gdGhpcy5wdXJjaGFzZURlc2NyaXB0aW9uW3RoaXMuYnV0dG9uc0xpc3RbaV0udmFsdWVdOyBcbiAgICB9XG5cbiAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheSl7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDMpOyAvL3doaXRlIHdpbmRvd1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCwgZ2FtZSk7IC8vZHJhdyBidXR0b25cblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzI4MjgyOFwiO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLmNvc3RQb3NpdGlvbi0yKnRoaXMucGFkZGluZywgMip0aGlzLnBhZGRpbmdZLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0V2lkdGgsIHRoaXMuY29zdEhlaWdodCoxMSwgMyk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcblxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL3NlbGVjdGlvbiBcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMuYnV0dG9uWDEgKyAodGhpcy5zZWxlY3Rpb25YLTEpKih0aGlzLmJ1dHRvbldpZHRoKyB0aGlzLnBhZGRpbmcpLCBcbiAgICAgICAgICAgICAgICAyKnRoaXMucGFkZGluZ1krKHRoaXMuYnV0dG9uSGVpZ2h0K3RoaXMucGFkZGluZ1kpKih0aGlzLnNlbGVjdGlvblktMSksIFxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uV2lkdGgsdGhpcy5idXR0b25IZWlnaHQsIDMpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGVzY3JpcCgpOyAvL3Nob3dzIHNlbGVjdGVkIHN1bW1vbiBkZXRhaWwgXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5kZXNjcmlwdGlvblRleHQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmRlc2NyaXB0aW9uVGV4dFtpXSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsXG4gICAgICAgICAgICAgICAgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqaSk7IFxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgLy9zdGF0cyAgICAgICAgICB0aGlzLmRhbWFnZU11bHRpID0gMTsgXG4gICAgICAgIC8vIHRoaXMucGlja3VwTXV0bGkgPSAxO1xuICAgICAgICAvLyB0aGlzLmtub2NrYmFja011bHRpID0gMTtcbiAgICAgICAgLy8gdGhpcy5zcGVlZE11bHRpID0gMTsgXG4gICAgICAgIC8vIHRoaXMucGllcmNlID0gMDsgXG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnRGFtYWdlOiB4JytnYW1lLnBsYXllci5kYW1hZ2VNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbi0yNSwgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqNyk7ICAgICAgIFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdTcGVlZDogeCcrZ2FtZS5wbGF5ZXIuc3BlZWRNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbi0yNSwgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqNy42KTsgXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ0tub2NrYmFjazogeCcrZ2FtZS5wbGF5ZXIua25vY2tiYWNrTXVsdGkudG9GaXhlZCgxKSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjguMik7IFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQaWVyY2U6ICcrZ2FtZS5wbGF5ZXIucGllcmNlLCB0aGlzLmNvc3RQb3NpdGlvbisxMDAsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcpOyBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnTG9vdCBSYWRpdXM6IHgnK2dhbWUucGxheWVyLmxvb3RNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbisxMDAsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcuNik7IFxuXG5cbiAgICAgICAgICAgICAgICBcblxuXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnYmxhY2snO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMubm90ZSwgdGhpcy5idXR0b25YMSsxMCwgdGhpcy5oZWlnaHQtMTApO1xuXG4gICAgICAgICAgICBpZiAoZ2FtZS5lcnJvcil7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAncmVkJztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1NwYWNlIG9jY3VwaWVkIScsIHRoaXMud2lkdGgtMjIwLCB0aGlzLmhlaWdodC0xMCk7IFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7Z2FtZS5lcnJvcj1mYWxzZTt9LCBcIjMwMDBcIikgO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudScpLmlubmVySFRNTD1cIlwiO31cbiAgICAgICAgXG5cblxuICAgICAgICAgICAgXG4gICAgfVxuXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVTY3JlZW5cIik7IC8vIGdldHMgY2FudmFzIGVsZW1lbnRcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgLy9jcmVhdGVzIDJEIHJlbmRlcmluZyBvYmplY3RcblxuY29uc3QgZ2FtZVdpZHRoID0gMTAwMDtcbmNvbnN0IGdhbWVIZWlnaHQgPSA1MDA7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KTsgXG5nYW1lLnN0YXJ0KCk7IC8vY3JlYXRlcyBnYW1lIG9iamVjdHM7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKHRpbWVzdGFtcCl7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsMCwgZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KTsgLy9yZWZyZXNoIHNjcmVlblxuICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wKTtcbiAgICBpZiAoZ2FtZS50aXRsZURpc3BsYXkpe1xuICAgICAgICBnYW1lLnRpdGxlTWVudShjdHgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZiAoIWdhbWUucGF1c2UgKXsgZ2FtZS51cGRhdGUodGltZXN0YW1wKTtcbiAgICAgICAgfVxuICAgICAgICBnYW1lLm5leHRXYXZlTG9hZGVyKCk7IC8vbG9hZHMgd2F2ZSBsaXN0XG4gICAgICAgIGdhbWUud2F2ZUxvYWRlcigpOyAvLyBsb2FkcyBlYWNoIG1vYiBmcm9tIHdhdmUgbGlzdFxuICAgICAgICAvL2dhbWUucGF1c2VIYW5kbGVyKCkgXG4gICAgICAgIFxuICAgICAgICBnYW1lLmRyYXcoY3R4KTsgXG4gICAgICAgIGdhbWUud2F2ZUNsZWFyKGN0eCk7XG4gICAgICAgIGdhbWUucGF1c2VIYW5kbGVyKHRpbWVzdGFtcCwgY3R4KTsgXG4gICAgICAgIGdhbWUudXBncmFkZU1lbnUoY3R4KTtcbiAgICAgICAgZ2FtZS5uZXh0TGV2ZWxMb2FkZXIoY3R4KTsgLy9pZiB3YXZlIGxpc3QgZW1wdHksIG1vdmUgdG8gbmV4dCBsZXZlbFxuICAgICAgICBcbiAgICAgICAgZ2FtZS5yZWNhbGxDaGVjaygpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBnYW1lLnNjcmVlblRyYW5zaXRpb24oY3R4KTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7IFxuXG59XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7IFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9