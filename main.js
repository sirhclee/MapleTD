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
        this.titleDisplay = true;//false; //enable for release
        this.load = false;
        this.playerObjects =[];
        this.mobObjects =[]; 
        this.moneyObjects = []; 
        this.level = 3;
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
        this.moneyObjects.forEach( (object)=>object.draw(ctx,this.pause) ); 
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
                        if (obj1.hitbox[1]<target.hitbox[1] && obj1.hitbox[1]+obj1.hitbox[3]>target.hitbox[1] ||
                            obj1.lane == target.lane){
                         {if (obj1.aggro){obj1.attack()}; //only aggro mobs have attack animations
                            }
                        }
                        else if (obj1.aggro && obj1.side == 1 ){obj1.attack()}; //enemies attack on CD

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
                if (this.level==2){this.projectileAmount++; this.damageMulti+=0.25}
                else if (this.level==3){this.area += 60; this.damageMulti+=0.25}
                else if (this.level>=4){this.area += 30; this.projectileAmount ++};
            };

            if (this.type == 'blueDragon'){
                if (this.level==2){this.projectileAmount++;}
                else if (this.level==3){this.chill += 0.2; this.pierce += 1}
                else if (this.level>=4){this.chill += 0.1; this.projectileAmount ++};
            };
            if (this.type == 'greenDragon'){
                if (this.level==2){this.projectileAmount++;}
                else if (this.level==3){this.poison += 0.6; this.poisonMax+=6;this.pierce += 1}
                else if (this.level>=4 ){this.poison += 0.6; this.poisonMax+=3; this.projectileAmount ++}
            };
            if (this.type == 'blackDragon'){
                if (this.level==2){this.projectileAmount++; this.damageMulti+=0.2}
                else if (this.level==3){this.area +=20; this.column=1;this.damageMulti+=0.2}
                else if (this.level>=4){this.area +=20; this.projectileAmount ++}
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
        //if (this.hitbox){ ctx.fillRect(this.hitbox[0],this.hitbox[1], this.hitbox[2], this.hitbox[3]);}
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

module.exports = JSON.parse('{"target":{"speed":"0.1","health":"100","stand":0,"walk":5,"die":5,"angry":12,"sprite":"mob","spriteType":["stumpy"],"proj":"batball","atkSpd":300,"damage":1,"range":500,"value":100},"zombie":{"speed":"0.1","health":"1000","stand":2,"walk":2,"die":10,"angry":9,"sprite":"mob","atkSpd":100,"damage":1,"value":5},"spore":{"speed":"1","health":"2","stand":2,"walk":2,"die":3,"sprite":"mob","value":1},"orangeMushroom":{"speed":"1","health":"4","stand":1,"walk":2,"die":2,"sprite":"mob","value":5},"greenMushroom":{"speed":"2","health":"1","stand":1,"walk":2,"die":2,"sprite":"mob","value":3},"blueMushroom":{"speed":"1","health":"8","stand":1,"walk":2,"die":2,"sprite":"mob","value":10},"hornyMushroom":{"speed":"2","health":"3","stand":2,"walk":2,"die":3,"sprite":"mob","value":2},"mushmom":{"speed":"0.3","health":"250","stand":0,"walk":5,"die":5,"angry":12,"aggro":true,"sprite":"mob","boss":"true","yOff":-10,"atkSpd":200,"damage":1,"range":350,"value":[50,50,50,50,50]},"goldMushroom1":{"speed":"3","health":"3","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[20,20,20,20,20]},"stump":{"speed":"1","health":"10","stand":0,"walk":3,"die":2,"sprite":"mob","value":10},"darkStump":{"speed":"1","health":"18","stand":0,"walk":3,"die":2,"sprite":"mob","value":15},"axeStump":{"speed":"1","health":"15","stand":0,"walk":3,"die":3,"sprite":"mob","value":15},"ghostStump":{"speed":"0.75","health":"15","stand":0,"walk":3,"die":2,"angry":6,"aggro":true,"atkSpd":250,"damage":1,"range":600,"proj":"fireball","sprite":"mob","value":20},"boar":{"speed":"2.5","health":"10","stand":0,"walk":2,"die":1,"height2":18,"sprite":"mob","value":10},"fireBoar":{"speed":"3.5","health":"10","stand":0,"walk":2,"die":1,"sprite":"mob","height2":18,"value":15},"ironBoar":{"speed":"1.5","health":"30","stand":0,"walk":1,"die":1,"sprite":"mob","height2":18,"value":30},"goldMushroom2":{"speed":"3.5","health":"10","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[50,50,50,50,50]},"stumpy":{"speed":"0.5","health":"750","stand":0,"walk":5,"die":9,"angry":13,"aggro":true,"sprite":"mob","boss":"true","proj":"batball","atkSpd":100,"damage":2,"range":600,"value":[80,80,80,80,80]},"neckiJr":{"speed":"2.5","health":"10","stand":0,"walk":2,"die":2,"sprite":"mob","height":50,"height2":35,"width2":25,"value":15},"stirge":{"speed":"2.5","health":"20","stand":0,"walk":1,"die":3,"sprite":"mob","roam":true,"value":15},"bubbling":{"speed":"1.5","health":"20","stand":0,"walk":6,"die":3,"sprite":"mob","value":15},"octopus":{"speed":"3","health":"70","stand":0,"walk":4,"die":3,"sprite":"mob","weird":true,"value":20},"wraith":{"speed":"4","health":"70","stand":0,"walk":3,"die":5,"width2":-20,"damage":2,"sprite":"mob","flip":true,"roam":true,"value":50},"jrWraith":{"speed":"4","health":"35","stand":0,"walk":3,"die":5,"sprite":"mob","flip":true,"value":25},"shade":{"speed":"3","health":"200","stand":0,"walk":5,"die":5,"damage":999,"sprite":"mob","roam":true,"flip":true,"value":[100,100,100,100,100]},"goldMushroom3":{"speed":"3","health":"25","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[100,100,100,100,100]}}');

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

module.exports = JSON.parse('{"level1":["wave1-1","wave1-2","wave1-3","wave1-4","wave1-5","wave1-6","wave1-7","wave1-8","wave1-9","wave1-10"],"level2":["wave2-1","wave2-2","wave2-3","wave2-4","wave2-5","wave2-6","wave2-7","wave2-8","wave2-9","wave2-10"],"level3":["wave3-1","wave3-2","wave3-3","wave3-4","wave3-5","wave3-6","wave3-7","wave3-8","wave3-9","wave3-10"],"wave1-0":[["spore",2,2]],"wave1-1":[["spore",2,2],["spore",2,3],["spore",2,4],["spore",2,5],["spore",2,6],["spore",1,10],["spore",1,11],["spore",1,12],["spore",1,13],["spore",1,14]],"wave1-2":[["spore",2,2],["spore",2,3],["spore",2,4],["orangeMushroom",2,6],["spore",1,10],["spore",1,11],["spore",1,12],["orangeMushroom",1,14],["spore",1,18],["spore",1,19],["spore",1,20],["orangeMushroom",1,22]],"wave1-3":[["greenMushroom",2,3],["greenMushroom",3,4],["spore",2,5],["spore",2,6],["spore",2,7],["greenMushroom",1,10],["greenMushroom",3,11],["spore",1,12],["spore",1,13],["spore",1,14],["greenMushroom",3,17],["greenMushroom",1,18],["spore",3,19],["spore",3,20],["spore",3,21]],"wave1-4":[["greenMushroom",2,3],["greenMushroom",3,4],["orangeMushroom",2,5],["orangeMushroom",2,7],["greenMushroom",1,10],["greenMushroom",3,11],["orangeMushroom",1,12],["orangeMushroom",1,14],["greenMushroom",3,17],["greenMushroom",1,18],["orangeMushroom",3,19],["orangeMushroom",3,21]],"wave1-5":[["greenMushroom",2,3],["greenMushroom",3,4],["orangeMushroom",2,5],["blueMushroom",2,8],["greenMushroom",1,10],["greenMushroom",3,11],["orangeMushroom",1,12],["blueMushroom",1,15],["greenMushroom",3,17],["greenMushroom",1,18],["orangeMushroom",3,19],["blueMushroom",3,22]],"wave1-6":[["spore",2,2],["spore",2,2.5],["spore",2,3],["spore",2,3.5],["spore",2,4],["spore",2,4.5],["spore",2,5],["spore",2,5.5],["spore",2,6],["spore",2,6.5],["blueMushroom",1,7],["spore",1,11],["spore",1,11.5],["spore",1,12],["spore",1,12.5],["spore",1,13],["spore",3,17],["spore",3,17.5],["spore",3,18],["spore",3,18.5],["spore",3,19],["blueMushroom",[0,2],25]],"wave1-7":[["blueMushroom",2,2],["blueMushroom",2,4],["blueMushroom",2,6],["greenMushroom",2,8],["greenMushroom",3,13],["blueMushroom",3,16],["blueMushroom",3,18],["blueMushroom",3,20],["greenMushroom",2,22],["greenMushroom",1,27],["blueMushroom",1,30],["blueMushroom",1,32],["blueMushroom",1,34],["greenMushroom",3,36],["greenMushroom",[0,1,2],44]],"wave1-8":[["blueMushroom",3,2],["orangeMushroom",3,3],["blueMushroom",3,4],["orangeMushroom",3,5],["blueMushroom",3,6],["greenMushroom",2,8],["greenMushroom",3,13],["orangeMushroom",1,14],["blueMushroom",2,16],["orangeMushroom",2,17],["blueMushroom",2,18],["blueMushroom",2,19],["greenMushroom",2,22],["greenMushroom",1,27],["orangeMushroom",3,28],["blueMushroom",1,30],["orangeMushroom",1,31],["blueMushroom",1,32],["orangeMushroom",1,33],["blueMushroom",1,34],["greenMushroom",3,36],["greenMushroom",[0,1,2],44]],"wave1-9":[["blueMushroom",[1,2],3],["orangeMushroom",[1,2],4],["blueMushroom",[1,2],5],["orangeMushroom",[1,2],5],["blueMushroom",[1,2],6],["greenMushroom",[1,2],14],["blueMushroom",2,20],["orangeMushroom",2,21],["blueMushroom",2,22],["goldMushroom1",1,23],["blueMushroom",2,24],["greenMushroom",3,28],["blueMushroom",1,35],["orangeMushroom",1,36],["blueMushroom",1,37],["orangeMushroom",1,38],["blueMushroom",1,39],["greenMushroom",3,37]],"wave1-10":[["mushmom",2,1],["orangeMushroom",[0,2],10],["orangeMushroom",[0,2],12],["orangeMushroom",[0,2],14],["orangeMushroom",[0,2],16],["orangeMushroom",[0,2],24],["orangeMushroom",[0,2],26],["orangeMushroom",[0,2],28],["orangeMushroom",[0,2],30]],"wave2-1":[["stump",[0,1,2],2],["stump",[0,1,2],3],["stump",[0,1,2],4],["stump",[0,1,2],16],["stump",[0,1,2],17],["stump",[0,1,2],18],["stump",[0,1,2],30],["stump",[0,1,2],31],["stump",[0,1,2],32]],"wave2-2":[["stump",[0,1,2],2],["stump",[0,1,2],3],["darkStump",[0,1,2],4],["stump",[0,1,2],16],["darkStump",[0,1,2],17],["stump",[0,1,2],18],["darkStump",[0,1,2],30],["stump",[0,1,2],31],["stump",[0,1,2],32]],"wave2-3":[["stump",1,2],["darkStump",3,2],["stump",1,4],["darkStump",3,4],["stump",1,6],["darkStump",3,6],["stump",1,18],["darkStump",2,18],["stump",1,20],["darkStump",2,20],["stump",1,22],["darkStump",2,22],["stump",3,34],["darkStump",1,34],["stump",3,36],["darkStump",1,36],["stump",3,38],["darkStump",1,38]],"wave2-4":[["stump",[0,1,2],2],["stump",[0,1,2],3],["darkStump",[0,1,2],4],["ghostStump",1,5],["stump",[0,1,2],12],["stump",[0,1,2],13],["darkStump",[0,1,2],14],["ghostStump",2,15],["stump",[0,1,2],22],["stump",[0,1,2],23],["darkStump",[0,1,2],24],["ghostStump",3,25]],"wave2-5":[["stump",[0,1,2],2],["ghostStump",[1,2],3],["darkStump",[0,2],3],["darkStump",[0,1,2],4],["ghostStump",1,5],["stump",[0,1,2],12],["ghostStump",[0,1],3],["darkStump",3,3],["darkStump",[0,1,2],14],["ghostStump",2,15],["stump",[0,1,2],22],["ghostStump",[1,2],23],["darkStump",[0,1],24],["ghostStump",3,25]],"wave2-6":[["boar",2,2],["boar",2,2.25],["boar",2,2.5],["boar",2,2.75],["boar",2,3],["boar",2,3.25],["boar",2,3.5],["boar",2,3.75],["boar",2,4],["boar",2,4.25],["boar",2,4.5],["boar",2,4.75],["boar",2,5],["boar",2,5.25],["boar",2,5.5],["boar",2,5.75],["boar",2,6],["boar",2,6.25],["boar",2,6.5],["boar",2,6.75],["boar",2,7]],"wave2-7":[["fireBoar",2,2],["fireBoar",2,2.5],["fireBoar",2,3],["fireBoar",2,3.5],["boar",[0,1,2],7.5],["boar",[0,1,2],13],["boar",[0,1,2],13.25],["boar",[0,1,2],13.5],["boar",[0,1,2],13.75],["ironBoar",2,16],["fireBoar",[0,2],22],["fireBoar",[0,2],24],["fireBoar",[0,2],26],["ironBoar",2,30]],"wave2-8":[["darkStump",[0,1,2],3],["darkStump",[0,1,2],3.5],["darkStump",[0,1,2],4],["fireBoar",[0,1,2],4.5],["fireBoar",[0,1,2],5],["ironBoar",[0,1,2],9],["goldMushroom2",2,10],["darkStump",[0,1,2],15],["darkStump",[0,1,2],15.5],["darkStump",[0,1,2],16],["ghostStump",[0,2],17],["boar",[0,1,2],24],["boar",[0,1,2],24.25],["boar",[0,1,2],24.5],["ghostStump",[0,2],24]],"wave2-9":[["darkStump",[0,1,2],3],["darkStump",[0,1,2],3.5],["ghostStump",[0,1,2],4],["darkStump",[0,1,2],4.5],["darkStump",[0,1,2],5],["darkStump",[0,1,2],5.5],["ironBoar",[0,1,2],11],["ironBoar",[0,1,2],12],["ghostStump",[0,1,2],14],["darkStump",[0,1,2],18],["darkStump",[0,1,2],18.5],["ghostStump",[0,1,2],19],["ironBoar",[0,1,2],22],["ironBoar",[0,1,2],24],["ironBoar",[0,1,2],26]],"wave2-10":[["stumpy",2,3],["ghostStump",[0,1,2],5],["boar",[0,2],6],["boar",[0,2],7],["boar",[0,2],8],["ghostStump",[0,1,2],14],["fireBoar",[0,1,2],17],["fireBoar",[0,1,2],19],["ironBoar",[0,1,2],26],["ghostStump",2,27],["ghostStump",[0,2],29],["fireBoar",1,31],["fireBoar",2,32],["fireBoar",3,33],["ghostStump",2,34],["fireBoar",[0,1,2],40],["ironBoar",[0,1,2],42]],"wave3-1":[["neckiJr",3,2],["neckiJr",2,3],["neckiJr",1,4],["bubbling",[0,1,2],4],["bubbling",[0,1,2],5],["bubbling",[0,1,2],6],["neckiJr",1,10],["neckiJr",2,11],["neckiJr",3,12],["bubbling",2,15],["bubbling",2,15.5],["bubbling",2,16],["bubbling",2,16.5],["neckiJr",[0,2],15],["neckiJr",[0,2],17]],"wave3-2":[["neckiJr",1,2],["neckiJr",2,3],["neckiJr",3,4],["bubbling",[0,1],4],["bubbling",[0,1],4.5],["bubbling",[0,1],5],["bubbling",[0,1],5.5],["neckiJr",3,7],["neckiJr",3,13],["bubbling",3,15],["bubbling",3,15.5],["bubbling",3,16],["bubbling",3,16.5],["bubbling",3,17],["bubbling",3,17.5],["neckiJr",[0,1],19],["neckiJr",[0,1],21],["neckiJr",[0,1],23]],"wave3-3":[["stirge",[0,2],1],["stirge",[0,2],1.5],["bubbling",2,2],["bubbling",2,2.5],["bubbling",2,3],["bubbling",2,4],["bubbling",2,4.5],["bubbling",2,5],["bubbling",2,6],["bubbling",2,6.5],["bubbling",2,7],["stirge",[0,1,2],8],["stirge",[0,1,2],10],["stirge",[0,1,2],12],["bubbling",[0,2],13],["stirge",2,13.5],["bubbling",[0,2],14],["stirge",2,14.5],["bubbling",[0,2],15]],"wave3-4":[["octopus",[0,1,2],2],["bubbling",2,7],["bubbling",2,7.5],["bubbling",2,8],["neckiJr",1,9],["neckiJr",2,9.5],["neckiJr",3,10],["stirge",[0,1,2],10],["bubbling",3,16],["bubbling",2,16.5],["bubbling",2,17],["neckiJr",3,18],["neckiJr",2,18.5],["neckiJr",1,19],["stirge",[0,1,2],16],["octopus",[0,1,2],23],["bubbling",1,24],["bubbling",1,24.5],["bubbling",1,25],["bubbling",1,25.5],["stirge",[0,1,2],27]],"wave3-5":[["octopus",1,2],["bubbling",2,2.5],["bubbling",2,3],["bubbling",2,3.5],["bubbling",2,4],["neckiJr",3,5],["neckiJr",3,6],["neckiJr",3,7],["octopus",1,5],["bubbling",2,5.5],["bubbling",2,5.5],["bubbling",2,6],["bubbling",2,6.5],["octopus",2,10],["stirge",[0,1,2],15],["octopus",[1,2],18],["bubbling",1,18.5],["bubbling",1,19],["bubbling",1,19.5],["bubbling",1,20],["octopus",[1,2],20],["stirge",[0,1,2],25],["neckiJr",2,27],["neckiJr",2,27.5],["neckiJr",2,28]],"wave3-6":[["jrWraith",2,3],["jrWraith",2,4],["jrWraith",2,5],["jrWraith",2,6],["jrWraith",[0,2],18],["jrWraith",[0,2],19],["jrWraith",[0,2],20],["jrWraith",[0,2],21],["wraith",2,24],["jrWraith",2,25],["jrWraith",2,26],["jrWraith",2,27]],"wave3-7":[["jrWraith",[0,1],3],["jrWraith",[0,1],4],["jrWraith",[0,1],5],["neckiJr",3,4],["neckiJr",3,5],["wraith",1,10],["jrWraith",2,11],["jrWraith",2,12],["jrWraith",[0,1],13],["octopus",[1,2],15],["wraith",2,18],["jrWraith",1,19],["jrWraith",2,20],["jrWraith",2,21],["jrWraith",2,22]],"wave3-8":[["wraith",[0,1],3],["jrWraith",[0,1,2],9],["jrWraith",[0,1,2],12],["goldMushroom3",1,12],["bubbling",[0,1,2],18],["bubbling",[0,1,2],18.5],["bubbling",[0,1,2],19],["wraith",[0,1],18],["jrWraith",[0,1,2],26],["jrWraith",[0,1,2],28]],"wave3-9":[["shade",1,3],["jrWraith",[0,2],10],["jrWraith",[0,2],14],["bubbling",[0,1,2],18],["bubbling",[0,1,2],18.5],["bubbling",[0,1,2],19],["wraith",[0,1],20],["jrWraith",[0,1,2],26],["jrWraith",[0,1,2],30]],"wave3-10":[["shade",1,3],["jrWraith",[0,2],10],["jrWraith",[0,2],14],["bubbling",[0,1,2],18],["bubbling",[0,1,2],18.5],["bubbling",[0,1,2],19],["shade",1,20],["octopus",3,22],["octopus",3,23],["octopus",3,24],["jrWraith",[0,1,2],28],["jrWraith",[0,1,2],32],["bubbling",[0,1,2],32],["bubbling",[0,1,2],32.5],["bubbling",[0,1,2],32.5],["octopus",1,33],["octopus",1,34],["octopus",1,36],["shade",1,38],["wraith",[0,2],40],["jrWraith",[0,2],44]],"wave3-0":[["neckiJr",2,1],["stirge",2,3],["jrWraith",1,3],["wraith",1,5],["shade",1,7]],"wave4-0":[["neckiJr",[0,1],1],["neckiJr",[0,1],1.5],["neckiJr",[0,1],2],["wraith",[0,1],4],["shade",[0,1],7],["wraith",[0,1],4],["shade",[0,1],7],["wraith",[0,1],4],["shade",[0,1],7],["shade",[0,1],8]]}');

/***/ }),

/***/ "./src/waveNotes.json":
/*!****************************!*\
  !*** ./src/waveNotes.json ***!
  \****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"wave1-1":"Defeat monsters! Pick up mesos before they disappear!","wave1-2":"Summon a companion to keep you company","wave1-3":"Dragons or Elementals? You choose! (but eventually get both)","wave1-5":"Reposition your dragons to busy lanes","wave1-6":"Escaped monsters means escaped mesos!","wave1-7":"Here come the big boys!","wave1-9":"Thar be a Golden Mushroom!","wave1-10":"Jump to dodge Mushmom\'s slam attack!","wave2-1":"Divide & Conquer!","wave2-3":"Beware of enemy projectiles! (your dragons are fine though)","wave2-6":"Boar stampede incoming (middle!)","wave2-10":"Stumpy\'s bat-bolt packs a huge punch!","wave3-1":"Jr Neckis dodge your summons\' attacks!","wave3-3":"Those Ocotpus are strange, aren\'t they?","wave3-6":"Wraiths haunt the area...","wave3-8":"Do NOT let the Shade touch you!","wave3-10":"Many Shades of Black!"}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvSFVELmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9TcHJpdGVBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2VuZFNjcmVlbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvaW1nLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9pbnB1dC5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvbW9iLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9tb25leS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9yZXN0YXJ0U2NyZWVuLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9zdGFydFNjcmVlbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvdGl0bGVTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3VwZ3JhZGUuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXJjYWRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXJjYWRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhVRHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDE1MDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA3NTsgXG4gICAgICAgIHRoaXMueCA9IDA7IFxuICAgICAgICB0aGlzLnkgPSAwOyBcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMjA7IFxuICAgICAgICB0aGlzLmZvbnQgPSBcIjE2cHggYXJpYWxcIjtcbiAgICB9XG5cbiAgICBkaXNwbGF5SFVEKGN0eCwgZ2FtZSl7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7IFxuICAgICAgICBjdHguZmlsbFN0eWxlID0nYmxhY2snO1xuICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDtcblxuICAgICAgICB0aGlzLmxpdmVzID0gXCJMaXZlczogXCIgKyBnYW1lLnBsYXllci5oZWFsdGg7IFxuICAgICAgICB0aGlzLm1vbmV5ID0gXCJNZXNvczogXCIgKyBnYW1lLnBsYXllci5tb25leTtcbiAgICAgICAgdGhpcy5zdGFnZSA9IFwiV2F2ZTogXCIgKyBnYW1lLmxldmVsICsgJy0nICsgZ2FtZS53YXZlOyBcbiAgICAgICAgdGhpcy50ZXh0ID0gW3RoaXMubGl2ZXMsIHRoaXMubW9uZXksIHRoaXMuc3RhZ2VdOyBcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnRleHQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMudGV4dFtpXSwgdGhpcy54K3RoaXMucGFkZGluZywgdGhpcy55K3RoaXMucGFkZGluZyooMStpKSwgdGhpcy53aWR0aCk7IFxuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQgaW1nIGZyb20gJy4vaW1nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlQW5pbWF0aW9ue1xuICAgIGltYWdlcyA9IFtdO1xuICAgIGNvbnN0cnVjdG9yKGZpbGVOYW1lLCBudW1iZXJPZkltYWdlcywgdGltZXJDb3VudCwgc3RhdGUsIHN0b3Ape1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTw9bnVtYmVyT2ZJbWFnZXM7IGkrKyl7IC8vIGxvYWRzIGltYWdlcyBpbnRvIGFycmF5IFxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBpbWcoZmlsZU5hbWUucmVwbGFjZShcIj9cIiwgaSkpOyBcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goaW1hZ2UpOyBcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGltZXJDb3VudCA9IHRpbWVyQ291bnQ7XG4gICAgICAgIHRoaXMudGltZXJDb3VudERlZmF1bHQgPSB0aGlzLnRpbWVyQ291bnQ7IFxuICAgICAgICB0aGlzLmltYWdlSW5kZXggPSAwOyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlOyBcbiAgICAgICAgdGhpcy5zdG9wID0gc3RvcDsgXG4gICAgfVxuICAgIFxuICAgIGlzRm9yKHN0YXRlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IHN0YXRlOyBcbiAgICB9XG5cbiAgICByZXNldCgpeyAvLyBsb29wIGFuaW1hdGlvblxuICAgICAgICB0aGlzLmltYWdlSW5kZXggPSAwOyAgIFxuICAgIH1cblxuICAgIGdldEZyYW1lKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlSW5kZXg7IFxuICAgIH1cblxuICAgIGdldEltYWdlKHBhdXNlKXsgIC8vcmV0dXJucyBmcmFtZVxuICAgICAgICB0aGlzLnNldEltYWdlSW5kZXgocGF1c2UpOyBcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzW3RoaXMuaW1hZ2VJbmRleF07IFxuICAgIH1cblxuICAgIHNldEltYWdlSW5kZXgocGF1c2Upe1xuICAgICAgICB0aGlzLnRpbWVyQ291bnQtLTtcbiAgICAgICAgaWYgKHRoaXMudGltZXJDb3VudCA8PSAwICYmICF0aGlzLnNob3VsZFN0b3AoKSl7XG4gICAgICAgICAgICB0aGlzLnRpbWVyQ291bnQ9IHRoaXMudGltZXJDb3VudERlZmF1bHQ7IFxuICAgICAgICAgICAgaWYgKCFwYXVzZSkge3RoaXMuaW1hZ2VJbmRleCsrO30gLy9hbmltYXRlIG9ubHkgd2hlbiB1bnBhdXNlZFxuICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2VJbmRleCA+PSB0aGlzLmltYWdlcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdWxkU3RvcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9wICAmJiB0aGlzLmltYWdlSW5kZXggPT09IHRoaXMuaW1hZ2VzLmxlbmd0aC0xXG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW5kU2NyZWVue1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDIwMDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDsgXG4gICAgICAgIHRoaXMueCA9IChnYW1lLmdhbWVXaWR0aC10aGlzLndpZHRoKS8yOyBcbiAgICAgICAgdGhpcy55ID0gMzsvLyh0aGlzLmhlaWdodClcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMjU7IFxuICAgICAgICB0aGlzLmZvbnQgPSBcIjE2cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MiA9IFwiMjRweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdSZXR1cm4gdG8gTWFpbic7XG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLmdhbWVXaWR0aC8yO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gMjUwO1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDMwOyBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnN0YXRzMSA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRzMiA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRQb3NpdGlvbiA9IHRoaXMueDsgLy9zdGFydGluZyB4IFxuICAgICAgICB0aGlzLnN0YXRIZWlnaHQgPSAyMDtcbiAgICAgICAgdGhpcy5zdGF0V2lkdGggPSAyMDA7XG5cbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLngrKHRoaXMud2lkdGgtdGhpcy5idXR0b25XaWR0aCkvMiwgdGhpcy5oZWlnaHQtdGhpcy5idXR0b25IZWlnaHQtdGhpcy5wYWRkaW5nXV0gXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24xXVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbGl6ZShnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTsgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZHJhdyhjdHgpe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRGdW5jdGlvbnMoZ2FtZSl7XG4gICAgICAgICAgICBnYW1lLm5leHRXYXZlID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgIH1cblxuICAgICAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVPdmVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUuZmFkZU91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge2dhbWUudGl0bGVEaXNwbGF5ID0gdHJ1ZX0sIFwiMjAwMFwiKX0gLy8gZmFkZSBvdXQgdHJhbnNpdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge2dhbWUubGV2ZWxGaW5pc2ggPSB0cnVlO31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIGRyYXdCdXR0b24oZTEsIHgsIHksIGN0eCl7ICAgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3N0ZWVsYmx1ZSc7IC8vZHJhdyBib3JkZXJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy9zZXRzIGFyZWEgZm9yIGNvbGxpc2lvbiAoaXNQb2ludEluUGF0aClcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0LCAyKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgLy9kcmF3IHRleHQgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrdGhpcy5idXR0b25IZWlnaHQvMik7IFxuICAgICAgICB9XG5cbiAgICAgICAgbG9hZFN0YXRzKGdhbWUpe1xuICAgICAgICAgICAgdGhpcy5zdGF0czEgPSBbWyAnTW9uc3RlcnMgRGVmZWF0ZWQ6ICcrIGdhbWUubW9uc3RlcktpbGxdLFxuICAgICAgICAgICAgICAgICAgICBbJ01vbnN0ZXJzIEVzY2FwZWQ6ICcrIGdhbWUubW9uc3RlckVzY2FwZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ01lc29zIENvbGxlY3RlZDogJysgZ2FtZS5tb25leUNvbGxlY3RlZF0sWydNZXNvcyBMb3N0OiAnKyBnYW1lLm1vbmV5TG9zdF1cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zdGF0czIgPSBbXVxuICAgICAgICAgICAgZm9yIChjb25zdCBvYmogb2YgZ2FtZS5wbGF5ZXJPYmplY3RzKXtcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHNPYmogPSAnJ1xuICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZSA9PSAnZ3JlZW5EcmFnb24nKXsgLy9hZGQgcG9pc29uXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzT2JqID0gIFtvYmoubmFtZSsnIERhbWFnZTogJysgb2JqLmRhbWFnZURlYWx0LnRvRml4ZWQoMCkgKyBcIiAoK1wiKyBnYW1lLnBvaXNvbkRhbWFnZS50b0ZpeGVkKDApKyAnKSddOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLnR5cGUgPT0gJ3JlZERyYWdvbicgfHwgb2JqLnR5cGUgPT0gJ2JsYWNrRHJhZ29uJyl7IC8vZXhwbG9kZSBkYW1hZ2UgXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzT2JqID0gIFtvYmoubmFtZSsnIERhbWFnZTogJysgb2JqLmRhbWFnZURlYWx0LnRvRml4ZWQoMCkgKyBcIiAoK1wiKyBvYmouZXhwbG9kZURhbWFnZURlYWx0LnRvRml4ZWQoMCkrICcpJ107IH1cbiAgICAgICAgICAgICAgICBlbHNlIHtzdGF0c09iaiA9ICBbb2JqLm5hbWUrJyBEYW1hZ2U6ICcrIG9iai5kYW1hZ2VEZWFsdC50b0ZpeGVkKDApXTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHMyLnB1c2goc3RhdHNPYmopOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICBcblxuICAgICAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2FtZU92ZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnR2FtZSBPdmVyIScsIHRoaXMuZ2FtZVdpZHRoLzIsIDI1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCk7IC8vcmV0dXJuIHRvIG1haW4gYnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLndhdmVGaW5pc2gpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQxPScnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQyPScnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUubGV2ZWwgPT0gZ2FtZS5maW5hbExldmVsICYmIGdhbWUubGV2ZWxMaXN0Lmxlbmd0aCA9PSAwKXsgLy9maW5hbCBsZXZlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQxPSAnRmluYWwgTGV2ZWwgQ2xlYXIhJyAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQyPSAnVGhhbmtzIGZvciBwbGF5aW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCk7fSAvL3JldHVybiB0byBtYWluIGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUubGV2ZWxMaXN0Lmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDE9J0xldmVsICcgK2dhbWUubGV2ZWwrICcgQ2xlYXIhJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IHRleHQxPSdXYXZlIENsZWFyISc7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQyID0gJ1ByZXNzIFtEXSB0byBzdGFydCBuZXh0IHdhdmUhJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGV4dDEsIHRoaXMuZ2FtZVdpZHRoLzIsIDI1KVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibHVlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0MiwgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5oZWlnaHQtMTApLy9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnc3RhcnQnOyAvL3N0YXRzIFxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFN0YXRzKGdhbWUpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnN0YXRzMS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajx0aGlzLnN0YXRzMVtpXS5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5zdGF0czFbaV1bal0sIHRoaXMucGFkZGluZyt0aGlzLnN0YXRQb3NpdGlvbisodGhpcy5zdGF0V2lkdGgvNCkqaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyNSsgdGhpcy5wYWRkaW5nKyh0aGlzLnN0YXRIZWlnaHQpKmksIDMwMCApOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zdGF0czIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7IGo8dGhpcy5zdGF0czJbaV0ubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuc3RhdHMyW2ldW2pdLCB0aGlzLnBhZGRpbmcrdGhpcy5zdGF0UG9zaXRpb24rdGhpcy5zdGF0V2lkdGgqMS41LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI1KyB0aGlzLnBhZGRpbmcrKHRoaXMuc3RhdEhlaWdodCkqaSwgMzAwICk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ICAgIFxuICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICB9XG59XG4iLCJpbXBvcnQgSW5wdXRIYW5kbGVyIGZyb20gJy4vaW5wdXQnOyBcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInOyBcbmltcG9ydCBNb2IgZnJvbSAnLi9tb2InO1xuaW1wb3J0IFVwZ3JhZGUgZnJvbSAnLi91cGdyYWRlJzsgXG5pbXBvcnQgTW9uZXkgZnJvbSAnLi9tb25leSc7IFxuaW1wb3J0IHN0YXJ0U2NyZWVuIGZyb20gJy4vc3RhcnRTY3JlZW4nOyBcbmltcG9ydCB0aXRsZVNjcmVlbiBmcm9tICcuL3RpdGxlU2NyZWVuJzsgXG5pbXBvcnQgcmVzdGFydFNjcmVlbiBmcm9tICcuL3Jlc3RhcnRTY3JlZW4nOyBcbmltcG9ydCBlbmRTY3JlZW4gZnJvbSAnLi9lbmRTY3JlZW4nOyBcbmltcG9ydCBIVUQgZnJvbSAnLi9IVUQnOyBcbmltcG9ydCBpbWcgZnJvbSAnLi9pbWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1le1xuICAgIGNvbnN0cnVjdG9yKGdhbWVXaWR0aCwgZ2FtZUhlaWdodCl7XG4gICAgICAgIHRoaXMubm90ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLnRpdGxlID0gbmV3IHRpdGxlU2NyZWVuKHRoaXMpOyBcbiAgICAgICAgdGhpcy50aXRsZS5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICB0aGlzLmVuZCA9IG5ldyBlbmRTY3JlZW4odGhpcyk7IFxuICAgICAgICB0aGlzLmVuZC5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc3RhcnQgPSBuZXcgcmVzdGFydFNjcmVlbih0aGlzKTsgXG4gICAgICAgIHRoaXMucmVzdGFydC5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnJlc3RhcnRXaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aXRsZURpc3BsYXkgPSB0cnVlOy8vZmFsc2U7IC8vZW5hYmxlIGZvciByZWxlYXNlXG4gICAgICAgIHRoaXMubG9hZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMgPVtdO1xuICAgICAgICB0aGlzLm1vYk9iamVjdHMgPVtdOyBcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSBbXTsgXG4gICAgICAgIHRoaXMubGV2ZWwgPSAzO1xuICAgICAgICB0aGlzLmZpbmFsTGV2ZWwgPTMgOyBcbiAgICAgICAgdGhpcy53YXZlID0gMDsgXG4gICAgICAgIHRoaXMubGFuZSA9IDE7IFxuICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICB0aGlzLmJnU3RhZ2UgPSBpbWcoJ2JnL2JnU3RhZ2UnK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53YXZlSW5mbyA9IHJlcXVpcmUoJy4vd2F2ZUluZm8uanNvbicpO1xuICAgICAgICB0aGlzLndhdmVOb3RlcyA9IHJlcXVpcmUoJy4vd2F2ZU5vdGVzLmpzb24nKTtcbiAgICAgICAgdGhpcy5sZXZlbE5vdGUgPSAnJzsgXG4gICAgICAgIHRoaXMubGV2ZWxMaXN0ID0gWy4uLnRoaXMud2F2ZUluZm9bJ2xldmVsJyt0aGlzLmxldmVsXV07Ly97MTogWyd3YXZlMS01JywgJ3dhdmUxLTEnXX0gLy9KU09OXG4gICAgICAgIHRoaXMud2F2ZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy50b0xvYWQgPVtdOyBcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSA5MDsgLy9sYW5lIHNpemVcbiAgICAgICAgdGhpcy5uZXh0V2F2ZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5sZXZlbFN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IHRydWU7IFxuICAgICAgICB0aGlzLmxldmVsRmluaXNoID0gZmFsc2UgOyAvL2Nsb3NlIHN0YXRzIG1lbnVcbiAgICAgICAgXG4gICAgICAgIHRoaXMubm90ZVRpbWUgPSAwOyBcbiAgICAgICAgdGhpcy5nYW1lVGltZSA9IDA7IC8vcGxheWVkIGdhbWUgdGltZSBmb3IgZXZlbnRzOyBcbiAgICAgICAgdGhpcy5nYW1lVGltZVJlYWwgPSAwOyAvL3RyYWNrcyB0aW1lIGFnYWluc3QgcGF1c2VzIFxuICAgICAgICB0aGlzLnBhdXNlZFRpbWUgPSAwOyBcbiAgICAgICAgdGhpcy50aW1lT2Zmc2V0ID0gMFxuICAgICAgICB0aGlzLnRpbWVPZmZzZXRTdW0gPSAwOyBcbiAgICAgICAgdGhpcy5zZXRQb2ludCA9IGZhbHNlOyBcblxuICAgICAgICB0aGlzLmZhZGUgPSAwO1xuICAgICAgICB0aGlzLmZhZGVJbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZhZGVPdXQgPSBmYWxzZSA7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IFtdOyBcbiAgICAgICAgdGhpcy5lcnJvciA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5tb2JDb3VudCA9IDAgOyBcblxuICAgICAgICB0aGlzLnBvaXNvbkRhbWFnZSA9IDA7IFxuICAgICAgICB0aGlzLm1vbnN0ZXJLaWxsID0gMDsgXG4gICAgICAgIHRoaXMubW9uc3RlckVzY2FwZSA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlRGVhbHQgPSB7fTsgXG4gICAgICAgIHRoaXMubW9uZXlDb2xsZWN0ZWQgPSAwO1xuICAgICAgICB0aGlzLm1vbmV5TG9zdCA9IDA7IFxuICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2U9ZmFsc2U7XG5cbiAgICB9XG5cbiAgICBwYXVzZUhhbmRsZXIodGltZSwgY3R4KXtcblxuICAgICAgICBpZiAodGhpcy5wYXVzZSApeyAvL3NuYXBzIHdoZW4gdGltZSBpcyBwYXVzZWQ7IFxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldFBvaW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlZFRpbWUgPSB0aW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9pbnQgPSB0cnVlOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge3RoaXMudGltZU9mZnNldCA9IHRpbWUgLSB0aGlzLnBhdXNlZFRpbWV9IC8vcnVucyB1cCBvZmZzZXQgdmFsdWUgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5ID0gZmFsc2UgO1xuICAgICAgICAgICAgdGhpcy50aW1lT2Zmc2V0U3VtKz0gdGhpcy50aW1lT2Zmc2V0OyAvL3N1bSBvZiBvZmZzZXQgdmFsdWVzIFxuICAgICAgICAgICAgdGhpcy50aW1lT2Zmc2V0ID0gMDsgIC8vcmVzZXQgXG4gICAgICAgICAgICB0aGlzLmdhbWVUaW1lUmVhbCA9IHRpbWUgLXRoaXMudGltZU9mZnNldFN1bTsgLy9hcHBseSBvZmZzZXQgc3VtXG4gICAgICAgICAgICB0aGlzLnNldFBvaW50ID0gZmFsc2U7ICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBhdXNlKXtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNlxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLDAsdGhpcy5nYW1lV2lkdGgsIHRoaXMuZ2FtZUhlaWdodCk7IFxuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjE2cHggYXJpYWxcIjsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1ByZXNzIEVTQyB0byB1bnBhdXNlJywgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5nYW1lSGVpZ2h0LzIrMjApIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlUGF1c2UoKXsgICBcbiAgICAgICAgdGhpcy5wYXVzZSA9ICF0aGlzLnBhdXNlOyBcbiAgICB9XG5cbiAgICByZXNldEV2ZXJ5dGhpbmcoKXtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5yZXN0YXJ0V2luZG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGl0bGVEaXNwbGF5ID0gZmFsc2U7IC8vZW5hYmxlIGZvciByZWxlYXNlXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gW107IFxuICAgICAgICB0aGlzLndhdmUgPSAwOyBcbiAgICAgICAgdGhpcy5iZ1NreSA9IGltZygnYmcvYmdTa3knK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgdGhpcy5iZ1N0YWdlID0gaW1nKCdiZy9iZ1N0YWdlJyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2F2ZUluZm8gPSByZXF1aXJlKCcuL3dhdmVJbmZvLmpzb24nKTtcbiAgICAgICAgdGhpcy5sZXZlbExpc3QgPSBbLi4udGhpcy53YXZlSW5mb1snbGV2ZWwnK3RoaXMubGV2ZWxdXTsvL3sxOiBbJ3dhdmUxLTUnLCAnd2F2ZTEtMSddfSAvL0pTT05cblxuICAgICAgICB0aGlzLndhdmVMaXN0ID0gW107XG4gICAgICAgIHRoaXMudG9Mb2FkID1bXTsgXG4gICAgICAgIHRoaXMubmV4dFdhdmUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IHRydWU7IFxuICAgICAgICB0aGlzLmxldmVsRmluaXNoID0gZmFsc2UgOyAvL2Nsb3NlIHN0YXRzIG1lbnVcbiAgICAgICAgLy90aGlzLmdhbWVUaW1lID0gMDsgXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IFtdOyBcbiAgICAgICAgdGhpcy5wb2lzb25EYW1hZ2UgPSAwOyBcbiAgICAgICAgdGhpcy5tb25zdGVyS2lsbCA9IDA7IFxuICAgICAgICB0aGlzLm1vbnN0ZXJFc2NhcGUgPSAwO1xuICAgICAgICB0aGlzLmRhbWFnZURlYWx0ID0ge307IFxuICAgICAgICB0aGlzLm1vbmV5Q29sbGVjdGVkID0gMDtcbiAgICAgICAgdGhpcy5tb25leUxvc3QgPSAwOyBcbiAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlPWZhbHNlO1xuICAgICAgICB0aGlzLmxvYWRCRygpO1xuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMgPSBbdGhpcy5wbGF5ZXJdO1xuICAgIH1cbiAgICBcbiAgICB0aXRsZU1lbnUoY3R4KXsgXG4gICAgICAgIHRoaXMudGl0bGUuZGlzcGxheU1lbnUoY3R4LCB0aGlzKTsgXG4gICAgfVxuXG4gICAgd2F2ZUNsZWFyKGN0eCl7IC8vIGNoZWNrcyBpZiB3YXZlIGlzIGNsZWFyZWRcbiAgICAgICAgaWYgKCF0aGlzLm5leHRXYXZlICYmIHRoaXMud2F2ZVN0YXJ0ICYmIHRoaXMubGV2ZWxTdGFydCAmJiBcbiAgICAgICAgICAgIHRoaXMudG9Mb2FkLmxlbmd0aCA9PSAwICAmJiB0aGlzLm1vYk9iamVjdHMubGVuZ3RoPT0wICl7XG4gICAgICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMuZW5kLmRpc3BsYXkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbmQuZGlzcGxheU1lbnUoY3R4LCB0aGlzKTtcbiAgICAgICAgfSBcbiAgICB9XG4gICAgbmV4dExldmVsTG9hZGVyKGN0eCl7XG4gICAgICAgIGlmICh0aGlzLmxldmVsTGlzdC5sZW5ndGggPT0gMCAmJiB0aGlzLndhdmVGaW5pc2gpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxGaW5pc2gpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT10aGlzLmZpbmFsTGV2ZWwpeyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQgPSB0cnVlfSwgXCIyMDAwXCIpIC8vIGZhZGUgb3V0IHRyYW5zaXRpb25cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4geyAvL2xvYWQgbmV4dCBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbExpc3QgPSBbLi4udGhpcy53YXZlSW5mb1snbGV2ZWwnK3RoaXMubGV2ZWxdXTsgLy8gbG9hZCBuZXh0IGxldmVsIHdhdmVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxGaW5pc2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlID0gMDsgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpOyAvL3JlbG9hZCBCRyBhcnQgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmdTdGFnZSA9IGltZygnYmcvYmdTdGFnZScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cyA9IFtdOyAvL2NsZWFyIGZsb29yIG1vbmV5IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0V2F2ZSAgPSBmYWxzZSBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubGFuZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uID0ge3g6MjUsIHk6dGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAyKnRoaXMucGxheWVyLnJvd0hlaWdodH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmZsb29yID0gdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAoMSt0aGlzLnBsYXllci5sYW5lKSp0aGlzLnBsYXllci5yb3dIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IHRoaXMucGxheWVyT2JqZWN0cy5zcGxpY2UoMSk7ICAvL3B1bGxzIGV2ZXJ5dGhpbmcgZXhwZWN0IHBsYXllclxuICAgICAgICAgICAgICAgIH0sIFwiNDAwMFwiKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dFdhdmVMb2FkZXIoKXtcbiAgICAgICAgaWYgKHRoaXMubmV4dFdhdmUpeyAvL2xvYWQgbmV4dCB3YXZlIGRhdGEgZnJvbSBKU09OXG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbExpc3QubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZUxpc3QgPSBbLi4udGhpcy53YXZlSW5mb1t0aGlzLmxldmVsTGlzdC5zaGlmdCgpXV07IC8vXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lVGltZSA9IHRoaXMuZ2FtZVRpbWVSZWFsOyAvL3N0YXJ0IG9mIHdhdmU7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgdGhpcy53YXZlICsrOyBcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRXYXZlID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gZmFsc2U7IFxuXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy53YXZlTm90ZXNbJ3dhdmUnK3RoaXMubGV2ZWwrJy0nK3RoaXMud2F2ZV0pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsTm90ZSA9IHRoaXMud2F2ZU5vdGVzWyd3YXZlJyt0aGlzLmxldmVsKyctJyt0aGlzLndhdmVdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGVUaW1lID0gdGhpcy5nYW1lVGltZVJlYWw7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5sZXZlbEZpbmlzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JlZW5UcmFuc2l0aW9uKGN0eCl7XG4gICAgICAgIGlmICh0aGlzLmZhZGVJbil7IC8vZmFkZSBpbiBcbiAgICAgICAgICAgIGlmICh0aGlzLmZhZGU+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWRlIC09IDAuMDM7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGUgPD0gMCkge3RoaXMuZmFkZUluID0gZmFsc2U7fVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mYWRlT3V0KXsgLy9mYWRlIHRvIGJsYWNrXG4gICAgICAgICAgICBpZiAodGhpcy5mYWRlIDwgMSl7ICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZmFkZSArPSAwLjAzOyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWRlID49IDEpIHsgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQgPSBmYWxzZTt9LCBcIjE1MDBcIil9XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZhZGVJbiB8fCB0aGlzLmZhZGVPdXQpe1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuZmFkZTsgXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5nYW1lV2lkdGgsIHRoaXMuZ2FtZUhlaWdodCk7IFxuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHdhdmVMb2FkZXIoKXsvL2xvYWRkcyBlYWNoIG1vYiBmcm9tIHdhdmVMaXN0XG4gICAgICAgIGlmICh0aGlzLnRvTG9hZC5sZW5ndGggPT0gMCAmJiB0aGlzLndhdmVMaXN0Lmxlbmd0aD4wKSB7dGhpcy50b0xvYWQgPSB0aGlzLndhdmVMaXN0LnNoaWZ0KCk7fVxuICAgICAgICBpZiAodGhpcy50b0xvYWRbMl0gPD0gICh0aGlzLmdhbWVUaW1lUmVhbCAtIHRoaXMuZ2FtZVRpbWUpLzEwMDAgKXtcbiAgICAgICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmxldmVsU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMudG9Mb2FkWzFdLmxlbmd0aD4wKXsgLy9tdWx0aXBsZSBlbnRyaWVzIFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnRvTG9hZFsxXS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZSA9IHRoaXMudG9Mb2FkWzFdW2ldOyAvL3NldHMgbGFuZSB0byBsb2FkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9iKHRoaXMsIHRoaXMudG9Mb2FkWzBdLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2JDb3VudCArKzsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmUgPSB0aGlzLnRvTG9hZFsxXS0xOyAvL3NldHMgbGFuZSB0byBsb2FkXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNb2IodGhpcywgdGhpcy50b0xvYWRbMF0sIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMubW9iQ291bnQgKys7IH0gICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy50b0xvYWQgPSBbXTsgXG4gICAgICAgIH0gXG5cbiAgICB9ICAgIFxuICAgIFxuICAgIGFkZEVsZW1lbnQoZWxlbWVudCl7IC8vdXBncmFkZSBzaG9wIFxuICAgICAgIGlmICh0aGlzLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGg8NSl7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIubW9uZXk+IHRoaXMucGxheWVyLmVsZW1lbnRDb3N0W3RoaXMucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF0pe1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm1vbmV5IC09IHRoaXMucGxheWVyLmVsZW1lbnRDb3N0W3RoaXMucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF07XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZWxlbWVudExpc3QucHVzaChlbGVtZW50KTsgXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZWxlbWVudGFscygpOyAvL2xvYWQgc3ByaXRlc1xuICAgICAgICAgICAgICAgIC8vYXBwbHkgdXBncmFkZXNcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSAnQmxhemUnKXt0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC40IH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PVwiRGF3blwiKXt0aGlzLnBsYXllci5sb290TXVsdGkrPTAuNTsgdGhpcy5wbGF5ZXIuZGFtYWdlTXVsdGkrPTAuMiB9O1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09J05pZ2h0Jyl7dGhpcy5wbGF5ZXIua25vY2tiYWNrTXVsdGkrPTAuMjsgdGhpcy5wbGF5ZXIuZGFtYWdlTXVsdGkrPTAuMn07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0nV2luZCcpe3RoaXMucGxheWVyLnNwZWVkTXVsdGkrPTAuMn07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0nVGh1bmRlcicpe3RoaXMucGxheWVyLnBpZXJjZSs9MTt0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC4yIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VtbW9uKHR5cGUpe1xuICAgICAgICBsZXQgdHJhbnNmZXIgPSB0aGlzLnN0b3JhZ2UuZmluZEluZGV4KG9iaj0+b2JqLnR5cGUgPT09IHR5cGUpOyBcbiAgICAgICAgdGhpcy5zdG9yYWdlW3RyYW5zZmVyXS5wb3NpdGlvbi54ID0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzI7XG4gICAgICAgIHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0ucG9zaXRpb24ueSA9ICh0aGlzLnBsYXllci5mbG9vciszMCk7IFxuICAgICAgICB0aGlzLnN0b3JhZ2VbdHJhbnNmZXJdLmxhbmUgPSB0aGlzLnBsYXllci5sYW5lO1xuXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0pOyAvL2NvcGllcyBvYmplY3QgdG8gbGlzdFxuICAgICAgICB0aGlzLnN0b3JhZ2Uuc3BsaWNlKHRyYW5zZmVyKTsgLy9kZWxldGVzIG9iamVjdCBmcm9tIHN0b3JhZ2VcbiAgICB9XG4gICAgcmVjYWxsQ2hlY2soKXtcbiAgICAgICAgaWYgKCF0aGlzLnJlY2FsbFN0b3JhZ2UgICYmIHRoaXMuc3RvcmFnZVswXSl7XG4gICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UgPSB0aGlzLnN0b3JhZ2Uuc2hpZnQoKSA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjYWxsKCl7ICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLnJlY2FsbFN0b3JhZ2Upe1xuICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai5wb3NpdGlvbi55LTMwID09PSB0aGlzLnBsYXllci5mbG9vcikmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JyApKVxuXG4gICAgICAgICAgICBpZiAodGhpcy5yZWNhbGxTdG9yYWdlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gdGhpcy5yZWNhbGxTdG9yYWdlLnR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbHRlciggIFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LnR5cGUgIT0gdHlwZTsgfSk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSAmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JykpKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLnBvc2l0aW9uLnggPSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueSA9ICh0aGlzLnBsYXllci5mbG9vciszMCk7IFxuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZS5sZWZ0ID0gKHRoaXMucGxheWVyLmxlZnQpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UubGFuZSA9ICh0aGlzLnBsYXllci5sYW5lKTsgXG5cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaCh0aGlzLnJlY2FsbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vIGlmICghdGhpcy5yZWNhbGxTdG9yYWdlKXtcbiAgICAgICAgLy8gICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IHRoaXMucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoucG9zaXRpb24ueS0zMCA9PT0gdGhpcy5wbGF5ZXIuZmxvb3IpJiYgIC8vY2hlY2tzIGZvciBleGlzdGluZyB1bml0IFxuICAgICAgICAvLyAgICAgKG9iai5wb3NpdGlvbi54ID09PSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMikgJiYgKG9iai5uYW1lIT09J1dpeicgKSlcblxuICAgICAgICAvLyAgICAgaWYgKHRoaXMucmVjYWxsU3RvcmFnZSlcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgdHlwZSA9IHRoaXMucmVjYWxsU3RvcmFnZS50eXBlO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9IHRoaXMucGxheWVyT2JqZWN0cy5maWx0ZXIoICAvL3JlbW92ZXMgbG9vdGVkIGNvaW5zXG4gICAgICAgIC8vICAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QudHlwZSAhPSB0eXBlOyB9KTsgICAgXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueCA9ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yO1xuICAgICAgICAvLyAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLnBvc2l0aW9uLnkgPSAodGhpcy5wbGF5ZXIuZmxvb3IrMzApOyBcblxuICAgICAgICAvLyAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2godGhpcy5yZWNhbGxTdG9yYWdlKTtcbiAgICAgICAgLy8gICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IGZhbHNlO1xuICAgICAgICAvLyB9XG5cblxuICAgIH1cblxuICAgIGNyZWF0ZU1vYihwYXJlbnQsIHR5cGUsIHNpZGUsIGdhbWUgPSBudWxsICl7XG4gICAgICAgIGlmIChzaWRlID09PSAwKXsgLy9TdW1tb24gdW5pdFxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSAmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JykpKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgY29zdCA9IDEwMDA7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5zdW1tb25Db3N0W3RoaXMucGxheWVyLnN1bW1vbkNvdW50XSl7IFxuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gdGhpcy5wbGF5ZXIuc3VtbW9uQ29zdFt0aGlzLnBsYXllci5zdW1tb25Db3VudF07IFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIubW9uZXk+PWNvc3Qpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYihwYXJlbnQsIHR5cGUsIDApKSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm1vbmV5IC09IGNvc3Q7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc3VtbW9uQ291bnQgKys7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdhbWUpe2dhbWUuZXJyb3IgPSB0cnVlOyB9OyBcblxuICAgICAgICB9IGVsc2Uge3RoaXMubW9iT2JqZWN0cy5wdXNoKG5ldyBNb2IocGFyZW50LCB0eXBlLCAxKSl9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGxvYWRCRygpe1xuICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpOyAvL2xvYWQgc2t5IGJnXG4gICAgfVxuXG4gICAgc3RhcnQoKXtcbiAgICAgICAgdGhpcy5zdGFydE1lbnUgPSBuZXcgc3RhcnRTY3JlZW4odGhpcyk7XG4gICAgICAgIHRoaXMuc3RhcnRNZW51LmluaXRpYWxpemUodGhpcyk7IFxuICAgICAgICB0aGlzLnVwZ3JhZGUgPSBuZXcgVXBncmFkZSh0aGlzKTsgXG4gICAgICAgIHRoaXMudXBncmFkZS5pbml0aWFsaXplKHRoaXMpOyBcbiAgICAgICAgdGhpcy5IVURNZW51ID0gbmV3IEhVRCh0aGlzKTsgXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gW3RoaXMucGxheWVyXTtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSBuZXcgSW5wdXRIYW5kbGVyKHRoaXMucGxheWVyLCB0aGlzLnVwZ3JhZGUsIHRoaXMpOyAgICAgICAgXG5cbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ3JlZERyYWdvbicsIDAsNCw1KSk7IFxuICAgICAgICAvLyB0aGlzLnBsYXllck9iamVjdHMucHVzaChuZXcgTW9iKHRoaXMucGxheWVyLCAnYmx1ZURyYWdvbicsIDAsMiw1KSk7IFxuICAgICAgICAvLyB0aGlzLnBsYXllck9iamVjdHMucHVzaChuZXcgTW9iKHRoaXMucGxheWVyLCAnZ3JlZW5EcmFnb24nLCAwLDMsNSkpOyBcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ2JsYWNrRHJhZ29uJywgMCwxLDUpKTsgXG5cbiAgICB9XG5cblxuXG4gICAgZHJhdyhjdHgpeyAvL3J1bnMgZHJhdyBmdW5jdGlvbiBmb3Igb2JqZWN0IGxpc3QgXG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJnU2t5LCAwLCAwKTsgXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iZ1N0YWdlLCAwLCAwKTsgXG4gICAgICAgIHRoaXMuc3RhcnRNZW51LmRpc3BsYXlNZW51KGN0eCwgdGhpcyApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZW1vdGUodGhpcykpOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsdGhpcy5wYXVzZSkgKVxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCwgdGhpcy5wYXVzZSkgKTtcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCx0aGlzLnBhdXNlKSApOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhd1Byb2ooY3R4LHRoaXMucGF1c2UpICk7IC8vcGxheWVyIHByb2pcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhd1Byb2ooY3R4LCB0aGlzLnBhdXNlKSApOyAvL21vYiBwcm9qIFxuXG5cbiAgICAgICAgdGhpcy5wbGF5ZXIucmVjYWxsSWNvbihjdHgsIHRoaXMpO1xuICAgIFxuICAgIH0gXG5cbiAgICBrbm9ja2JhY2sob2JqLCBkaXJlY3Rpb24sIG11bHRpKXtcbiAgICAgICAgaWYgKG9iai5uYW1lID09J1dpeicpeyAvL29ubHkgcGxheWVyIHBvcHMgdXBcbiAgICAgICAgICAgIG9iai5qdW1wID0gdHJ1ZTtcbiAgICAgICAgICAgIG9iai5pbnZ1bG5UaW1lID0gMTEwOyBcbiAgICAgICAgICAgIG9iai5zcGVlZFkgKz0gNDtcbiAgICAgICAgICAgIG9iai5rbm9ja2JhY2tGb3JjZT0gLTgqZGlyZWN0aW9uOyB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBvYmouaGl0ID0gdHJ1ZTsgXG4gICAgICAgICAgICBvYmoua25vY2tiYWNrVGltZSA9IHRoaXMuZ2FtZVRpbWVSZWFsOyAgLy9zdG9yZXMgd2hlbiB0YXJnZXQga25vY2tiYWNrO1xuICAgICAgICAgICAgaWYgKG9iai5ib3NzKXstMipkaXJlY3Rpb24qKDErIChtdWx0aS0xKS80KX0gLy9ib3NzIGxlc3Mga25vY2tiYWNrXG4gICAgICAgICAgICBlbHNlIHtvYmoua25vY2tiYWNrRm9yY2UgPSAtNCpkaXJlY3Rpb24qKDErIChtdWx0aS0xKS80KX07IC8vYWRkIGFzIHN0YXRcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIGFnZ3JvKG9iajEsIG9iajIpeyAvLyBjaGVja3MgaWYgb2JqMSByYW5nZSBpcyB3aXRoaW4gb2JqMlxuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGVhbHRoPjApe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXStvYmoxLnJhbmdlPnRhcmdldC5oaXRib3hbMF0gfHwgXG4gICAgICAgICAgICAgICAgICAgIG9iajEuaGl0Ym94WzBdLW9iajEucmFuZ2U8dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdKXsgLy9hZ2dybyBmcm9tIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXStvYmoxLmhpdGJveFszXT50YXJnZXQuaGl0Ym94WzFdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5sYW5lID09IHRhcmdldC5sYW5lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICB7aWYgKG9iajEuYWdncm8pe29iajEuYXR0YWNrKCl9OyAvL29ubHkgYWdncm8gbW9icyBoYXZlIGF0dGFjayBhbmltYXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqMS5hZ2dybyAmJiBvYmoxLnNpZGUgPT0gMSApe29iajEuYXR0YWNrKCl9OyAvL2VuZW1pZXMgYXR0YWNrIG9uIENEXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgfVxuICAgIFxuICAgIGxvb3RNb25leShvYmoxLCBvYmoyKXtcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7IC8vLSh0aGlzLndpZHRoKigtMSt0aGlzLmxvb3RNdWx0aSkpXG4gICAgICAgICAgICBpZiAoIChvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdICYmIG9iajEuaGl0Ym94WzBdKzgwKihvYmoxLmxvb3RNdWx0aSkgPiB0YXJnZXQuaGl0Ym94WzBdKSB8fCAvL29iajEgb24gbGVmdFxuICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXSA+IHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSAmJiBvYmoxLmhpdGJveFswXS04MCoob2JqMS5sb290TXVsdGktMSk8dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICkpeyAvL29iajEgb24gcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXStvYmoxLmhpdGJveFszXT50YXJnZXQuaGl0Ym94WzFdKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQuc3RhcnRGYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEubW9uZXkgKz0gdGFyZ2V0LnZhbHVlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9uZXlDb2xsZWN0ZWQgKz0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0YXJ0RmFkZSA9IHRydWU7Ly90cnVlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5mbG9hdCA9IHRydWU7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxvc3QpeyBcbiAgICAgICAgICAgICAgICB0aGlzLm1vbmV5TG9zdCs9dGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlPTAgfTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gdGhpcy5tb25leU9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGxvb3RlZCBjb2luc1xuICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LmRlbGV0ZSA9PSBmYWxzZTsgfSk7ICAgICBcbiAgICB9XG5cbiAgICBleHBsb2RlRGFtYWdlKG9iajEsIG9iajIsIG9iajMpe1xuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGVhbHRoPjApe1xuICAgICAgICAgICAgICAgIGlmICggKG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0gJiYgb2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0rb2JqMy5hcmVhID4gdGFyZ2V0LmhpdGJveFswXSkgfHwgLy9vYmoxIC0+dGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT50YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gJiYgb2JqMS5oaXRib3hbMF0tb2JqMy5hcmVhPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSApKXsgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG9iajEuaGl0Ym94WzFdPnRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSt0YXJnZXQuaGl0Ym94WzNdKXx8b2JqMy5jb2x1bW4+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEucG9pc29uPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnBvaXNvblN0YWNrKzE8b2JqMS5wb2lzb25NYXgpeyAvL2FkZCB0byBtYXggc3RhY2tzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucG9pc29uQW1vdW50ICs9IG9iajEucG9pc29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBvaXNvblN0YWNrKys7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucG9pc29uVGltZSA9IDU7ICAvL2ZvdXIgdGlja3MgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmhlYWx0aCAtPSBvYmozLmRhbWFnZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajMuZXhwbG9kZURhbWFnZURlYWx0ICs9IG9iajMuZGFtYWdlO31cbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgY29sbGlzaW9uKG9iajEsIG9iajIsIG9iajMgPSBudWxsKXsgLy8gY2hlY2tzIGlmIG9iajEgaXMgaGl0dGluZyBvYmoyIFxuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgIGlmIChvYmoxLmhlYWx0aD4wICYmIHRhcmdldC5oZWFsdGg+MCl7XG4gICAgICAgICAgICAgICAgaWYgKCAob2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSAmJiBvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT4gdGFyZ2V0LmhpdGJveFswXSkgfHwgLy9vYmoxIC0+dGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT50YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gJiYgXG4gICAgICAgICAgICAgICAgICAgIG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSApKXsgLy8gdGFyZ2V0IDwtIG9iajFcblxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMV0+dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXTx0YXJnZXQuaGl0Ym94WzFdK3RhcmdldC5oaXRib3hbM10peyAvL3ktYm91bmRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLnByb2plY3RpbGUgJiYgIW9iajEuZXhwbG9kZSAmJiAhb2JqMS5oaXRMaXN0LmluY2x1ZGVzKHRhcmdldC5uYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zaWRlID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXQubGFuZSA9PSBvYmoxLmxhbmUpeyAvL3BsYXllciBvbmx5IGNhbiBoaXQgZnJvbSBwcm9qIGluIGxhbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQsIG9iajMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5waWVyY2UgLT0gMTsgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5oaXRMaXN0LnB1c2godGFyZ2V0Lm5hbWUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQsIG9iajMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoxLnBpZXJjZSAtPSAxOyAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuaGl0TGlzdC5wdXNoKHRhcmdldC5uYW1lKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmozLmFyZWE+MCl7dGhpcy5leHBsb2RlRGFtYWdlKG9iajEsIG9iajIsIG9iajMpfTsgLy9hcmVhIGRhbWFnZTsgY2hlY2tzIGZvciBuZWFyYnkgdGFyZ2V0cyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5waWVyY2U8PTApe29iajEuZXhwbG9kZSA9IHRydWV9OyAvL2Rlc3Ryb3kgcHJvamVjdGlsZSAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghb2JqMS5wcm9qZWN0aWxlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5sYW5lID09IHRhcmdldC5sYW5lKXt0aGlzLmRhbWFnZUNhbGMob2JqMSwgdGFyZ2V0KX07XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIGRhbWFnZUNhbGMob2JqMSwgb2JqMiwgb2JqMyA9IG51bGwpeyAvL29iajEgKG93bmVkIGJ5IG9iajMpIGF0dGFja2luZyBvYmoyIFxuICAgICAgICBpZiAob2JqMi5pbnZ1bG5UaW1lID09IDAgJiYgb2JqMS50b3VjaEhpdCkge1xuICAgICAgICAgICAgbGV0IGRhbWFnZSA9IG9iajEuZGFtYWdlO1xuICAgICAgICAgICAgbGV0IGtub2NrYmFjayA9IDE7IFxuICAgICAgICAgICAgaWYgKG9iajMpe29iajMuZGFtYWdlRGVhbHQrPSBkYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIGtub2NrYmFjayA9IG9iajMua25vY2tiYWNrTXVsdGk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvYmoxLmNoaWxsPjApe1xuICAgICAgICAgICAgICAgIGlmICggTWF0aC5hYnMob2JqMi5zcGVlZFgpLW9iajIuY2hpbGxBbW91bnQ+MCl7b2JqMi5jaGlsbEFtb3VudCs9IG9iajEuY2hpbGx9XG4gICAgICAgICAgICAgICAgZWxzZSBvYmoyLmNoaWxsQW1vdW50ID0gTWF0aC5hYnMob2JqMi5zcGVlZFgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqMi5oZWFsdGggLT0gZGFtYWdlO1xuICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gKz0gZGFtYWdlKmtub2NrYmFjaztcblxuICAgICAgICAgICAgaWYgKG9iajIua25vY2tiYWNrVGhyZXNoIDw9IG9iajIua25vY2tiYWNrU3VtKXtcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5wb3NpdGlvbi54Pm9iajIucG9zaXRpb24ueCl7IHRoaXMua25vY2tiYWNrKG9iajIsIDEsIGtub2NrYmFjayApfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5rbm9ja2JhY2sob2JqMiwgLTEsIGtub2NrYmFjayk7XG4gICAgICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gPSAwIFxuICAgICAgICAgICAgICAgIC8vIG9iajIua25vY2tiYWNrVGhyZXNoICo9MS4yIC8vaW5jcmVhc2UgdGhyZXNob2xkIGVhY2ggdGltZVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG5cblxuICAgIH1cbiAgICBsb3NlTGlmZShjdHgpeyAvL21vYiBlc2NhcGVzXG4gICAgICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMubW9iT2JqZWN0cyl7XG4gICAgICAgICAgICBpZiAob2JqLnBvc2l0aW9uLnggPD0gLW9iai53aWR0aCoyKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyLmhlYWx0aCAtPSAxOyBcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5mbGlwKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxvYmoudmFsdWUubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leUxvc3QrPW9iai52YWx1ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMubW9uZXlMb3N0ICs9IG9iai52YWx1ZTt9IC8vbG9zdCBtb25leVxuICAgICAgICAgICAgICAgICAgICBvYmouYWxpdmUgPSBmYWxzZTsgLy9kZWxldGUgbW9uc2VyOyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyRXNjYXBlICsrOyBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge29iai5zcGVlZFggPSAtb2JqLnNwZWVkWDsgb2JqLmxlZnQ9IW9iai5sZWZ0O31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3NpdGlvbi54ID49IHRoaXMuZ2FtZVdpZHRoICYmIG9iai5zcGVlZFg8MClcbiAgICAgICAgICAgICAgICB7b2JqLnNwZWVkWCA9IC1vYmouc3BlZWRYXG4gICAgICAgICAgICAgICAgb2JqLmxlZnQ9IW9iai5sZWZ0fTtcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy8gZHJhd0dyaWQoY3R4KXtcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpOyAgLy8gdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodFxuICAgIC8vICAgICBjdHgubW92ZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0KTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjIpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjIpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjMpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjMpOyAgICAgICAgXG4gICAgLy8gICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyB9XG5cbiAgICB1cGdyYWRlTWVudShjdHgpe1xuICAgICAgICB0aGlzLkhVRE1lbnUuZGlzcGxheUhVRChjdHgsIHRoaXMpOyAgXG4gICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5oZWFsdGggPD0gMCApe1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5lbmQuZGlzcGxheSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVuZC5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNwYXduTW9uZXkob2JqKXtcbiAgICAgICAgaWYgKG9iai5zdGF0ZSA9PSAnZGllJyAmJiAhb2JqLmxvb3REcm9wKXtcbiAgICAgICAgICAgIGlmIChvYmoudmFsdWUubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgIGxldCB4ID0gLTAuNioyIDsgLy9tb25leSBzcHJlYWRcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxvYmoudmFsdWUubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5wdXNoKG5ldyBNb25leSh0aGlzLCBvYmosIG9iai52YWx1ZVtpXSwgeCtpKjAuNikpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7dGhpcy5tb25leU9iamVjdHMucHVzaChuZXcgTW9uZXkodGhpcywgb2JqLCBvYmoudmFsdWUpKX1cbiAgICAgICAgICAgIG9iai5sb290RHJvcCA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5tb25zdGVyS2lsbCsrOyBcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLnNwYXduTW9uZXkob2JqZWN0KSk7IFxuICAgICAgICB0aGlzLmxvc2VMaWZlKCk7IC8vZW5lbWllcyBwYXN0IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMgPSB0aGlzLm1vYk9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGRlYWQvcGFzc2luZyBvYmplY3RzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9iamVjdC5hbGl2ZSAhPT0gZmFsc2UpfSk7ICAgICAgICBcbiAgICAgICAgdGhpcy5sb290TW9uZXkodGhpcy5wbGF5ZXIsIHRoaXMubW9uZXlPYmplY3RzKTtcblxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKHRoaXMpICk7IFxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSh0aGlzKSApOyBcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSl7XG4gICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuYWdncm8ob2JqZWN0LCB0aGlzLm1vYk9iamVjdHMpICk7ICAvL3N1bW1vbiBhdHRhY2tzXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLmFnZ3JvKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyAvL21vYiBhdHRhY2tzXG5cbiAgICAgICAgdGhpcy5jb2xsaXNpb24odGhpcy5wbGF5ZXIsIHRoaXMubW9iT2JqZWN0cyk7IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuY29sbGlzaW9uKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyBcblxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5tb2JBdHRhY2sodGhpcykpOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3Quc3VtbW9uQXR0YWNrKHRoaXMpKTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PiAvL21vYiBwcm9qIHRvIHBsYXllciBcbiAgICAgICAgICAgIG9iamVjdC5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0Mik9PiBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbihvYmplY3QyLCBbdGhpcy5wbGF5ZXJdLCBvYmplY3QpKSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PiAvL3BsYXllciBwcm9qIHRvIG1vYnNcbiAgICAgICAgICAgIG9iamVjdC5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0Mik9PiBcbiAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb24ob2JqZWN0MiwgdGhpcy5tb2JPYmplY3RzLCBvYmplY3QpXG4gICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICApOyBcblxuICAgIH1cbiAgIFxuXG4gICAgXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1nKGZpbGUpe1xyXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTsgXHJcbiAgICBpbWFnZS5zcmMgPSAnaW1hZ2VzLycrZmlsZTsgXHJcbiAgICByZXR1cm4gaW1hZ2U7IFxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0SGFuZGxlcntcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIHVwZ3JhZGUsIEdhbWUpe1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PnsgICAgXG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7IC8vYTo2NTsgczo4MzsgZDo2OCwgdzogODc7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDM3OiAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUudGl0bGVEaXNwbGF5ICYmIEdhbWUubGV2ZWw+MSl7R2FtZS5sZXZlbC0tfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWC09MX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc3BlZWRYID0gLXBsYXllci5zcGVlZDsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmxlZnQgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAzOTogLy9yaWdodCBhcnJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS50aXRsZURpc3BsYXkgJiYgR2FtZS5sZXZlbDxHYW1lLmZpbmFsTGV2ZWwpe0dhbWUubGV2ZWwrK31cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblg8Mil7dXBncmFkZS5zZWxlY3Rpb25YKz0xfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zcGVlZFggPSBwbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5sZWZ0ID0gZmFsc2U7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcblxuICAgICAgICAgICAgICAgIGNhc2UgMzg6IC8vIHVwIGFycm93XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWS09MX07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3BsYXllci50ZWxlcG9ydCgtMSk7fVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSA0MDogLy8gZG93biBhcnJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWTw1KXt1cGdyYWRlLnNlbGVjdGlvblkrPTF9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoMSk7fVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgOTA6IC8vWiByZWNhbGxcbiAgICAgICAgICAgICAgICBpZiAoIUdhbWUudGl0bGVEaXNwbGF5KSB7R2FtZS5yZWNhbGwoKTsgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDg4OiAvL1gganVtcFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBsYXllci5qdW1wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zcGVlZFkgPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5qdW1wID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayAgICAgXG5cbiAgICAgICAgICAgICAgICBjYXNlIDY3OiAvL0MgYXR0YWNrXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5hdHRhY2soR2FtZS5wYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSA2NTogLy9BIG9wZW4gc2hvcFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBncmFkZS50b2dnbGVNZW51KEdhbWUpOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgODM6IC8vIFMgYnV5XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkgJiYgIUdhbWUudGl0bGVEaXNwbGF5KXt1cGdyYWRlLnB1cmNoYXNlKEdhbWUpfVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDY4OiAvL0Qgc3RhcnQgd2F2ZVxuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS53YXZlRmluaXNoICYmIEdhbWUuc3RvcmFnZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5zdGFydE1lbnUuZGlzcGxheSA9IGZhbHNlfTsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDI3OiAvLyBFU0NcbiAgICAgICAgICAgICAgICAgICAgR2FtZS50b2dnbGVQYXVzZSgpOyBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vb2xkIGNvbnRyb2xzIFxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNjU6IC8vQSBtb3ZlIGxlZnQgXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWC09MX07XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcGxheWVyLnNwZWVkWCA9IC1wbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcGxheWVyLmxlZnQgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNjg6IC8vRCBtb3ZlIHJpZ2h0XG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWDwyKXt1cGdyYWRlLnNlbGVjdGlvblgrPTF9O1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5zcGVlZFggPSBwbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgIC8vICAgICBwbGF5ZXIubGVmdCA9IGZhbHNlO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDg3OiAvL1cgdGVsZXBvcnQgdXBcbiAgICAgICAgICAgICAgICAvLyBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWS09MX07XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoLTEpO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA4MzogLy9TIHRlbGVwb3J0IGRvd25cbiAgICAgICAgICAgICAgICAvLyBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPDUpe3VwZ3JhZGUuc2VsZWN0aW9uWSs9MX07XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoMSk7fVxuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDc0OiAgLy9KIFxuICAgICAgICAgICAgICAgIC8vIGlmICh1cGdyYWRlLmRpc3BsYXkpe3VwZ3JhZGUucHVyY2hhc2UoR2FtZSl9ICAgIFxuICAgICAgICAgICAgICAgIC8vIGVsc2UgaWYgKCFwbGF5ZXIuanVtcCl7XG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5zcGVlZFkgPSAxMjtcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLmp1bXAgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWsgXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDc1OiAvL0tcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLmF0dGFjayhHYW1lLnBhdXNlKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNzk6IC8vT1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoR2FtZS53YXZlRmluaXNoICYmIEdhbWUuc3RvcmFnZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2FtZS5zdGFydE1lbnUuZGlzcGxheSA9IGZhbHNlfTsgXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBicmVha1xuXG4gICAgXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5NjpcbiAgICAgICAgICAgICAgICAvLyAgICAgdXBncmFkZS50b2dnbGVNZW51KCk7IFxuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5NzogLy8xXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ3JlZERyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgOTg6IC8vMlxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdibHVlRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5OTogLy8zXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ2dyZWVuRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgLy8gY2FzZSAxMDA6IC8vNFxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdibGFja0RyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+eyAgICBcbiAgICAgICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKXsgLy9hOjY1OyBzOjgzOyBkOjY4LCB3OiA4NztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS50aXRsZURpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5mYWRlT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57R2FtZS50aXRsZURpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lLnJlc2V0RXZlcnl0aGluZygpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDgwMCl9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDk6ICBcbiAgICAgICAgICAgICAgICBjYXNlIDE4OiBcbiAgICAgICAgICAgICAgICBjYXNlIDExNjogYnJlYWs7IFxuXG4gICAgICAgICAgICAgICAgY2FzZSAzNzogICAvL0EgPSA2NVxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLnNwZWVkWDwwKSBwbGF5ZXIuc3BlZWRYID0gMDsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzk6IC8vIEQgPSA2OFxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLnNwZWVkWD4wKSBwbGF5ZXIuc3BlZWRYID0gMDsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfVxufSIsImltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSc7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2J7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgdHlwZSwgc2lkZSwgdGVzdCA9IDAsIGxldmVsPTApe1xuICAgICAgICB0aGlzLnNpZGUgPSBzaWRlO1xuICAgICAgICBpZiAodGhpcy5zaWRlID09IDApe3RoaXMudHlwZUluZm8gPSByZXF1aXJlKCcuL3N1bW1vbkluZm8uanNvbicpIH1cbiAgICAgICAgZWxzZSAodGhpcy50eXBlSW5mbyA9IHJlcXVpcmUoJy4vbW9iSW5mby5qc29uJykpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgXG4gICAgICAgICBcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsndmFsdWUnXTsgXG4gICAgICAgIHRoaXMubG9vdERyb3AgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAxOyBcbiAgICAgICAgdGhpcy5mYWRlID0gMTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmFsaXZlID0gdHJ1ZTsgIFxuICAgICAgICB0aGlzLmF0dGFja0NEID0gMDsgXG4gICAgICAgIHRoaXMubWF4U3BlZWQgPSAxNTsgXG4gICAgICAgIHRoaXMuc3BlZWQgPSAyO1xuICAgICAgICB0aGlzLnRvdWNoSGl0ID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMua25vY2tiYWNrRm9yY2UgPSAwOyBcbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Nwcml0ZSddOyBcbiAgICAgICAgLy90aGlzLmRhbWFnZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZGFtYWdlJ107IFxuICAgICAgICB0aGlzLmF0dGFja1NwZWVkID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhdGtTcGQnXTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnNwZWVkWCA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3BlZWQnXTtcbiAgICAgICAgdGhpcy5zcGVlZFkgPSAwOyBcbiAgICAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7XG4gICAgICAgIHRoaXMubGFuZSA9IGdhbWUubGFuZTsgIC8vIHdoaWNoIGxhbmVcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAxKXsgLy9FbmVteSBNb2IgXG4gICAgICAgICAgICB0aGlzLmludnVsblRpbWUgPSAgMDsgXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLnR5cGUrZ2FtZS5tb2JDb3VudDsgXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gNDU7IC8vc3ByaXRlIHNpemUgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2hlaWdodCddKXt0aGlzLmhlaWdodCA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnaGVpZ2h0J119XG4gICAgICAgICAgICBlbHNlIHRoaXMuaGVpZ2h0ID0gNjU7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydyYW5nZSddKXt0aGlzLnJhbmdlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydyYW5nZSddfVxuICAgICAgICAgICAgZWxzZSB7dGhpcy5yYW5nZSA9IDEwO31cbiAgICAgICAgICAgIHRoaXMubGVmdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnaGVhbHRoJ107XG4gICAgICAgICAgICB0aGlzLm1heEhlYWx0aCA9IHRoaXMuaGVhbHRoOyBcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgPSAwO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICd3YWxrJztcbiAgICAgICAgICAgIHRoaXMueE9mZj0tNzA7XG4gICAgICAgICAgICB0aGlzLnlPZmY9LTg1O1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgIC8vcG9zaXRpb24gKHJpZ2h0c2lkZSlcbiAgICAgICAgICAgICAgICB4OiB0aGlzLmdhbWVXaWR0aCs1MCwgXG4gICAgICAgICAgICAgICAgeTogdGhpcy5nYW1lSGVpZ2h0IC0gMTA1IC0gZ2FtZS5yb3dIZWlnaHQqZ2FtZS5sYW5lLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBQQyBwZXRzXG4gICAgICAgICAgICB0aGlzLmludnVsblRpbWUgPSAxOyBcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSA1MDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7IFxuICAgICAgICAgICAgdGhpcy5yYW5nZSA9IDYwMDsgLy93aG9sZSBsYW5lP1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSAxOyBcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgPSAxOyBcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnXG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBmYWxzZTsgXG4gICAgICAgICAgICB0aGlzLnlPZmY9MDtcbiAgICAgICAgICAgIHRoaXMueE9mZj0wO1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2VEZWFsdCA9IDA7XG4gICAgICAgICAgICB0aGlzLmFnZ3JvID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnbmFtZSddO1xuICAgICAgICAgICAgaWYgKGxldmVsIT0wKSB7dGhpcy5sZXZlbCA9IGxldmVsfTsgXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gJ0x2bC4gJyArIHRoaXMubGV2ZWw7IFxuICAgICAgICAgICAgdGhpcy5lbW90ZVRpbWUgPSAxMDA7XG4gICAgICAgICAgICB0aGlzLmVtb3RlTGVuZ3RoID0gW107XG4gICAgICAgICAgICB0aGlzLnlTdGFydCA9IGdhbWUuZmxvb3IrMzA7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgIHg6IChnYW1lLmN1clRpbGUqODApK2dhbWUud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiBnYW1lLmZsb29yKzMwXG4gICAgICAgICAgICB9ICBcbiAgICAgICAgfTsgIC8vb2Zmc2V0IGZvciBzcHJpdGVzIFxuICAgICAgICAvL2lmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXSkgKHRoaXMucG9zaXRpb24ueSAtPXRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddKSA7XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Nwcml0ZVR5cGUnXSl7dGhpcy5sb2FkU3ByaXRlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcHJpdGVUeXBlJ11bMF19XG4gICAgICAgIGVsc2Uge3RoaXMubG9hZFNwcml0ZSA9IHRoaXMudHlwZX07XG4gICAgICAgIHRoaXMuZm9ybSA9IDA7IFxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkYW1hZ2UnXSl7dGhpcy5kYW1hZ2UgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RhbWFnZSddfVxuICAgICAgICBlbHNlIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYWdncm8nXSl0aGlzLmFnZ3JvID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd3aWR0aDInXSl7dGhpcy53aWR0aDIgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3dpZHRoMiddfVxuICAgICAgICBlbHNlIHt0aGlzLndpZHRoMj0wfTtcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnaGVpZ2h0MiddKXt0aGlzLmhlaWdodDIgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2hlaWdodDInXX1cbiAgICAgICAgZWxzZSB0aGlzLmhlaWdodDIgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXSl7dGhpcy55T2ZmID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ119XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3hPZmYnXSl7dGhpcy54T2ZmID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd4T2ZmJ119XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2Jvc3MnXSl7dGhpcy5ib3NzID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55LT03MDsgdGhpcy5oZWlnaHQrPTEwMH07IFxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydyb2FtJ10pe1xuICAgICAgICAgICAgdGhpcy5yb2FtID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLnJvYW1UaW1lID0gNTA7XG4gICAgICAgICAgICB0aGlzLnJvYW1ZID0gdGhpcy5sYW5lKmdhbWUucm93SGVpZ2h0OyBcbiAgICAgICAgICAgIHRoaXMucm9hbUxpbWl0cyA9IFswLCBnYW1lLnJvd0hlaWdodCwgZ2FtZS5yb3dIZWlnaHQqMl07IC8vMCwxLDJcbiAgICAgICAgICAgIC8vdGhpcy5kZXN0aW5hdGlvbiA9IDA7XG4gICAgICAgICB9XG4gICAgICAgIGVsc2Uge3RoaXMucm9hbSA9IGZhbHNlfTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnhPZmYyID0gMDsgXG4gICAgICAgIHRoaXMua25vY2tiYWNrVGltZSA9IDAgOyAgXG4gICAgICAgIHRoaXMua25vY2tiYWNrVGhyZXNoID0gTWF0aC5mbG9vcih0aGlzLm1heEhlYWx0aCAvIDMpO1xuICAgICAgICB0aGlzLmtub2NrYmFja1N1bSA9IDA7ICBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tSZXNpc3QgPSAwLjNcbiAgICAgICAgdGhpcy5oaXQgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyBcbiAgICAgICAgdGhpcy5lbW90ZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1vdGVUaW1lciA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1vdGVUaW1lT3V0ID0gW107XG4gICAgICAgIHRoaXMucG9zaW9uR3JhcGhpYyA9IFtdOyBcbiAgICAgICAgdGhpcy5oaXRCeSA9IFtdOyBcbiAgICAgICAgdGhpcy5kYW1hZ2VNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLmxvb3RNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMua25vY2tiYWNrTXVsdGkgPSAxO1xuICAgICAgICB0aGlzLnNwZWVkTXVsdGkgPSAxOyBcbiAgICAgICAgdGhpcy5waWVyY2UgPSAxOyBcblxuICAgICAgICB0aGlzLnByb2plY3RpbGVBbW91bnQgPSAwOyBcbiAgICAgICAgdGhpcy5jaGlsbEFtb3VudCA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvbkxvYWRlZCA9IGZhbHNlOyAvL2xvYWQgc3ByaXRlIFxuICAgICAgICB0aGlzLnBvaXNvblRpbWUgPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25BbW91bnQgPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25UaWNrID0gMDtcbiAgICAgICAgdGhpcy5jaGlsbCA9IDA7XG4gICAgICAgIHRoaXMuYXJlYSA9IDA7IFxuICAgICAgICB0aGlzLmNvbHVtbiA9IDA7IFxuICAgICAgICB0aGlzLmV4cGxvZGVEYW1hZ2VEZWFsdCA9IDAgXG4gICAgICAgIHRoaXMucG9pc29uID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uU3RhY2sgPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25NYXggPSAwOyBcblxuICAgICAgICB0aGlzLmF0dGFja2VkID0gZmFsc2UgO1xuICAgICAgICB0aGlzLmF0dGFja1N0YXJ0ID0gMDtcbiAgICAgICAgdGhpcy5kZWxheUF0dGFjayA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2ZsaXAnXSl7dGhpcy5mbGlwID0gdHJ1ZSB9XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3dlaXJkJ10pe1xuICAgICAgICAgICAgdGhpcy53ZWlyZCA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy53ZWlyZFN0YXJ0ID0gZ2FtZS5nYW1lVGltZVJlYWw7IFxuICAgICAgICAgICAgdGhpcy53ZWlyZFRpbWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMzAwMCkrMjAwMDtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRlc3Q9PTEpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gMjYwOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IDM5NTsgLy9ib3R0b21cbiAgICAgICAgICAgIHRoaXMubGFuZSA9IDA7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXN0PT0yKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDI2MDsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAzMDU7IC8vbWlkZGxlXG4gICAgICAgICAgICB0aGlzLmxhbmUgPSAxO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGVzdD09Myl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAyNjA7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMjE1OyAvL3RvcCBcbiAgICAgICAgICAgIHRoaXMubGFuZSA9IDI7ICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRlc3Q9PTQpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gMzQwOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IDMwNTsgLy8gbWlkZGxlICMyXG4gICAgICAgICAgICB0aGlzLmxhbmUgPSAxO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAncmVkRHJhZ29uJyl7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7IHRoaXMuZGFtYWdlTXVsdGkrPTAuM31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLmFyZWEgKz0gNjA7IHRoaXMuZGFtYWdlTXVsdGkrPTAuM31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmFyZWEgKz00MDsgdGhpcy5wcm9qZWN0aWxlQW1vdW50Kyt9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2JsdWVEcmFnb24nKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5waWVyY2UgKz0gMTt9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Myl7dGhpcy5jaGlsbCArPSAwLjI7IHRoaXMucGllcmNlICs9IDF9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5jaGlsbCArPSAwLjE7IHRoaXMucHJvamVjdGlsZUFtb3VudCsrfTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnZ3JlZW5EcmFnb24nKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzt9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Myl7dGhpcy5wb2lzb24gKz0gMC40OyB0aGlzLmFyZWEgKz0gMjA7IHRoaXMucG9pc29uTWF4Kz0xMDt9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49NCApe3RoaXMucG9pc29uICs9IDAuNDsgdGhpcy5hcmVhICs9IDEwOyB0aGlzLnBvaXNvbk1heCs9NTsgdGhpcy5wcm9qZWN0aWxlQW1vdW50Kyt9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2JsYWNrRHJhZ29uJyl7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7IHRoaXMuZGFtYWdlTXVsdGkrPTAuMn1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLmFyZWEgKz0xNTsgdGhpcy5jb2x1bW49MTt0aGlzLmRhbWFnZU11bHRpKz0wLjJ9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5hcmVhICs9MTU7IHRoaXMucHJvamVjdGlsZUFtb3VudCsrfVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5sZXZlbD49Myl7dGhpcy5ldm9sdmUoKX0gXG5cbiAgICB9XG5cblxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXsgLy9pbXBvcnQgc3ByaXRlcyBcbiAgICAgICAgdGhpcy5mcmFtZXMgPSAzMDsgXG4gICAgICAgIGlmICh0aGlzLnNwcml0ZT09J21vYicpeyAvLyBFbmVteSBtb2JzXG4gICAgICAgICAgICB0aGlzLnN0YW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUrJy9zdGFuZF8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3RhbmQnXSwgMTAsIFwic3RhbmRcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLndhbGsgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL21vdmVfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3dhbGsnXSwgMTAsIFwid2Fsa1wiKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICAgICAgdGhpcy5oaXQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL2hpdDFfPy5wbmcnLDAsIDEwLCBcImhpdFwiKTtcbiAgICAgICAgICAgIHRoaXMuZGllID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUrJy9kaWUxXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkaWUnXSwgMTUsIFwiZGllXCIsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMuc3RhbmQsIHRoaXMud2FsaywgdGhpcy5oaXQsIHRoaXMuZGllXTsgXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhbmdyeSddKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ3J5ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUrJy9hdHRhY2sxXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhbmdyeSddLCAxMCwgXCJhdHRhY2tcIiwgdHJ1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMucHVzaCh0aGlzLmFuZ3J5KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gICAgICAgICAgIFxuICAgICAgICBlbHNlIHsgXG4gICAgICAgICAgICB0aGlzLnN0YW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUgKycvc3RhbmQxXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzdGFuZCddW3RoaXMuZm9ybV0sIDEwLCBcInN0YW5kXCIpOyAvL3N0YW5kaW5nIHNwcml0ZXM7IFxuICAgICAgICAgICAgdGhpcy5hbmdyeSA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlICsnL2FuZ3J5Xz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhbmdyeSddW3RoaXMuZm9ybV0sIDEwLCBcImF0dGFja1wiLCB0cnVlKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMuc3RhbmQsIHRoaXMuYW5ncnldOyBcbiAgICAgICAgICAgIGxldCBlbW90ZXMgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2Vtb3RlJ11bdGhpcy5mb3JtXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPGVtb3Rlcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGVtb3RlID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUgKycvJytlbW90ZXNbaV1bMF0rJ18/LnBuZycsIGVtb3Rlc1tpXVsxXSwgMTAsIFwiZW1vdGVcIisoMStpKSApOyAvL2Vtb3RlOyBcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMucHVzaChlbW90ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbW90ZUxlbmd0aC5wdXNoKGVtb3Rlc1tpXVsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuYW5pbWF0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXZvbHZlKCl7XG4gICAgICAgIHRoaXMuZm9ybSsrOyBcbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcHJpdGVUeXBlJ11bdGhpcy5mb3JtXTsgXG4gICAgICAgIHRoaXMuZW1vdGVMZW5ndGggPSBbXTsgXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyAvLyB1cGRhdGUgc3ByaXRlcyBcblxuICAgIH1cbiAgICBsZXZlbFVwKHBsYXllcil7IFxuICAgICAgICBsZXQgY29zdCA9IHBsYXllci51cGdyYWRlQ29zdFt0aGlzLmxldmVsLTFdO1xuICAgICAgICBpZiAocGxheWVyLm1vbmV5Pj1jb3N0KXtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwrKzsgIFxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9ICdMdmwuICcgKyB0aGlzLmxldmVsOyBcbiAgICAgICAgICAgIHRoaXMudmFsdWUgKz0gY29zdDsgXG4gICAgICAgICAgICBwbGF5ZXIubW9uZXkgLT0gY29zdDsgXG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09Myl7dGhpcy5ldm9sdmUoKX0gXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09ICdyZWREcmFnb24nKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7IHRoaXMuZGFtYWdlTXVsdGkrPTAuMjV9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD09Myl7dGhpcy5hcmVhICs9IDYwOyB0aGlzLmRhbWFnZU11bHRpKz0wLjI1fVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuYXJlYSArPSAzMDsgdGhpcy5wcm9qZWN0aWxlQW1vdW50ICsrfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2JsdWVEcmFnb24nKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7fVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw9PTMpe3RoaXMuY2hpbGwgKz0gMC4yOyB0aGlzLnBpZXJjZSArPSAxfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuY2hpbGwgKz0gMC4xOyB0aGlzLnByb2plY3RpbGVBbW91bnQgKyt9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2dyZWVuRHJhZ29uJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrO31cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLnBvaXNvbiArPSAwLjY7IHRoaXMucG9pc29uTWF4Kz02O3RoaXMucGllcmNlICs9IDF9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD49NCApe3RoaXMucG9pc29uICs9IDAuNjsgdGhpcy5wb2lzb25NYXgrPTM7IHRoaXMucHJvamVjdGlsZUFtb3VudCArK31cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09ICdibGFja0RyYWdvbicpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw9PTMpe3RoaXMuYXJlYSArPTIwOyB0aGlzLmNvbHVtbj0xO3RoaXMuZGFtYWdlTXVsdGkrPTAuMn1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmFyZWEgKz0yMDsgdGhpcy5wcm9qZWN0aWxlQW1vdW50ICsrfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdGF0IHVwZGF0ZXMgLmRhbWFnZU11bHRpXG4gICAgfVxuXG4gICAgZW1vdGUoZ2FtZSl7XG4gICAgICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApO1xuICAgICAgICBpZiAodGhpcy5lbW90ZUNoYW5nZSl7XG4gICAgICAgICAgICBpZiAoIWdhbWUucGxheWVyLmFsaXZlKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMuc3RhdGUgPSAnZW1vdGU1JztcbiAgICAgICAgICAgICAgICBpZihyYW5kb20+NSl7dGhpcy5zdGF0ZSA9ICdlbW90ZTUnO30gLy8gY3J5XG4gICAgICAgICAgICAgICAgZWxzZSB7dGhpcy5zdGF0ZSA9ICdlbW90ZTInO30gLy8gYmV3aWxkZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdhbWUud2F2ZUZpbmlzaCApe1xuICAgICAgICAgICAgICAgICAgICBpZihyYW5kb20+NSl7dGhpcy5zdGF0ZSA9ICdlbW90ZTMnO30gLy8gc2l0XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMuc3RhdGUgPSAnZW1vdGU0Jzt9IC8vIHNsZWVwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtb3RlVGltZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW1vdGVDaGFuZ2UgPSBmYWxzZTsgXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmICghdGhpcy5lbW90ZUNoYW5nZSAmJiAhdGhpcy5lbW90ZVRpbWVyKXsgXG4gICAgICAgICAgICB0aGlzLmVtb3RlVGltZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHt0aGlzLmVtb3RlQ2hhbmdlID0gdHJ1ZX0sIFwiNTAwMFwiKSA7fVxuXG4gICAgfVxuXG4gICAgYXR0YWNrKCl7IC8vdHJpZ2dlcnMgYXR0YWNrIHN0YXRlIFxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA8PSAwICYmIHRoaXMuaGVhbHRoPjApe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdhdHRhY2snOyBcbiAgICAgICAgfSAgICAgICAgICBcbiAgICB9XG5cbiAgICBzdW1tb25BdHRhY2soKXsgLy9zdW1tb24gYXR0YWNrcyBcbiAgICAgICAgaWYgKCAhdGhpcy5hdHRhY2tlZCl7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpPT0yKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2goIG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddW3RoaXMuZm9ybV0sIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LTUwKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdGlsZUFtb3VudD4wKXsgLy9leHRyYSBwcm9qZWN0aWxlcyBcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0xOyBpPD10aGlzLnByb2plY3RpbGVBbW91bnQ7IGkrKyl7IFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCAoKT0+IHt0aGlzLnByb2plY3RpbGVzLnB1c2goIG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddW3RoaXMuZm9ybV0sIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LTUwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMjAqaSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgIC8vIHRoaXMuYW5ncnkucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtb3RlVGltZSA9IDEwMCtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTAwKTsgLy9yZXNldCByYW5kb20gZW1vdGUgdGltZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW9iQXR0YWNrKGdhbWUpe1xuICAgICAgICBpZiAoIXRoaXMuYXR0YWNrZWQgJiYgZ2FtZS5wbGF5ZXIuYWxpdmUgJiYgdGhpcy5oZWFsdGg+MCl7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkU3ByaXRlPT0nc3R1bXB5Jyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ncnkuZ2V0RnJhbWUoKSA9PSA5KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKCBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueC00MCwgdGhpcy5wb3NpdGlvbi55KzMwKSk7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxvYWRTcHJpdGU9PSdnaG9zdFN0dW1wJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ncnkuZ2V0RnJhbWUoKSA9PSA0KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKCBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueC00MCwgdGhpcy5wb3NpdGlvbi55LTI3KSk7ICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZFNwcml0ZT09J211c2htb20nKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpID09IDcpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYW5ncnkucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnYW1lLnBsYXllci5qdW1wICYmIGdhbWUucGxheWVyLmxhbmUgPT0gdGhpcy5sYW5lICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnBsYXllci5oZWFsdGggLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUua25vY2tiYWNrKGdhbWUucGxheWVyLCAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIHBhdXNlKSB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgIC8vaWYgKHRoaXMuaGl0Ym94KXsgY3R4LmZpbGxSZWN0KHRoaXMuaGl0Ym94WzBdLHRoaXMuaGl0Ym94WzFdLCB0aGlzLmhpdGJveFsyXSwgdGhpcy5oaXRib3hbM10pO31cbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTsgXG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueC10aGlzLnJhbmdlLCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgrMip0aGlzLnJhbmdlLCB0aGlzLmhlaWdodCk7IC8vcmFuZ2VcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAwICYmIHRoaXMuZm9ybT09MSAmJiB0aGlzLnN0YXRlPT0nYXR0YWNrJyl7dGhpcy54T2ZmMiA9IC01MX0gLy9hdHRhY2sgb2Zmc2V0XG4gICAgICAgIGVsc2UgdGhpcy54T2ZmMj0wO1xuXG4gICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMCl7dGhpcy5zdGF0ZSA9ICdzdGFuZCc7IH0gXG4gICAgICAgICAgICBlbHNlIHRoaXMuc3RhdGU9J3dhbGsnO31cblxuICAgICAgICBpZiAodGhpcy5oZWFsdGg8PTAgJiYgdGhpcy5zaWRlID09MSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RpZSc7ICAvL2RlYXRoIGFuaW1hdGlvbiAgIFxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGU+MCkgdGhpcy5mYWRlIC09IDAuMDM7IC8vZmFkZSBvbiBkZWF0aCBcbiAgICAgICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmZhZGU7IFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7dGhpcy5mYWRlID0gMH0sIFwiNDUwXCIpIDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlcy5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7dGhpcy5hbGl2ZSA9IGZhbHNlfSwgXCI0NTBcIikgO30gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9ICBcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAxICYmIHRoaXMuc3RhdGUgIT0nZGllJyl7IC8vaGVhbHRoIGJhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2Jvc3MnXSlcbiAgICAgICAgICAgICAgICB7Y3R4LmZpbGxTdHlsZSA9IFwiIzJiMmIyYlwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSs3MCwgNjAsIDEyKTsgLy9lbXB0eSBib3hcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjOTkwYzAyXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCsxLCB0aGlzLnBvc2l0aW9uLnkrNzEsIE1hdGguZmxvb3IoNTgqKDEtKHRoaXMubWF4SGVhbHRoIC0gdGhpcy5oZWFsdGgpL3RoaXMubWF4SGVhbHRoKSksIDEwKTsgLy8gbGlmZSBiYXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vYm9zcyBoZWFsdGggYmFyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzJiMmIyYlwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngtNSwgdGhpcy5wb3NpdGlvbi55KzEzMSwgNjUsIDE2KTsgLy9lbXB0eSBib3hcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjOTkwYzAyXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueC00LCB0aGlzLnBvc2l0aW9uLnkrMTMyLCBNYXRoLmZsb29yKDYzKigxLSh0aGlzLm1heEhlYWx0aCAtIHRoaXMuaGVhbHRoKS90aGlzLm1heEhlYWx0aCkpLCAxNCk7IC8vZW1wdHkgYm94XG4gXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zaWRlID09IDApeyAvLyBzdW1tb24gbmFtZSBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjc7IFxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLnBvc2l0aW9uLngrMTUsIHRoaXMucG9zaXRpb24ueSt0aGlzLmhlaWdodCsxNywgMzUsIDE1LCAyKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxLjA7IFxuXG4gICAgICAgICAgICBjdHguZm9udCA9IFwiMTFweCBhcmlhbFwiXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJzsgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMubGFiZWwsIHRoaXMucG9zaXRpb24ueCszMiwgdGhpcy5wb3NpdGlvbi55K3RoaXMuaGVpZ2h0KzI3KSA7ICAgICAgICAgIFxuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UocGF1c2UpOyAgICAgICBcbiAgICAgICAgLy9pbWFnZSA9IGJ1ZmZlcjsgXG5cbiAgICAgICAgaWYgKCF0aGlzLmxlZnQpey8vZmxpcCBiYXNlZCBvbiBzcHJpdGUgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC10aGlzLnBvc2l0aW9uLngtdGhpcy53aWR0aCt0aGlzLnhPZmYrdGhpcy54T2ZmMiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZiApO31cbiAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54K3RoaXMueE9mZit0aGlzLnhPZmYyLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy55T2ZmKTsgfVxuICAgIFxuICAgICAgICBpZiAodGhpcy5jaGlsbEFtb3VudD4wKXtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyAvLyBJbWFnZSB0aW50aW5nXG4gICAgICAgICAgICBidWZmZXIud2lkdGggPSAyMDA7Ly9pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIGJ1ZmZlci5oZWlnaHQgPSA0MDA7Ly9pbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBidHggPSBidWZmZXIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGJ0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsMCk7XG4gICAgICAgICAgICBidHguZmlsbFN0eWxlID0gXCIjMmM2OGRjXCI7XG4gICAgICAgICAgICBidHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ211bHRpcGx5JztcbiAgICAgICAgICAgIGJ0eC5maWxsUmVjdCgwLDAsYnVmZmVyLndpZHRoLCBidWZmZXIuaGVpZ2h0KTtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxBbHBoYSA9IDAuODtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLWluXCI7XG4gICAgICAgICAgICBidHguZHJhd0ltYWdlKGltYWdlLDAsMCk7IFxuXG4gICAgICAgICAgICBpZiAoIXRoaXMubGVmdCl7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXIsIC10aGlzLnBvc2l0aW9uLngtdGhpcy53aWR0aCt0aGlzLnhPZmYsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYpfVxuICAgICAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShidWZmZXIsIHRoaXMucG9zaXRpb24ueCt0aGlzLnhPZmYsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYpfVxuICAgICAgICB9XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApOyBcblxuICAgICAgICBpZiAodGhpcy5wb2lzb25BbW91bnQ+MCAmJiB0aGlzLmhlYWx0aD4wKXtcbiAgICAgICAgICAgIGlmICghdGhpcy5wb2lzb25Mb2FkZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMucG9pc29uR3JhcGhpYyA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ3BvaXNvbkVmZmVjdC9wb2lzb24/LnBuZycsIDQsIDEwLCBcInBvaXNvblwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaXNvbkxvYWRlZCA9IHRydWU7IH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9pc29uU3ByaXRlSW1hZ2UgPSB0aGlzLnBvaXNvbkdyYXBoaWMuZ2V0SW1hZ2UocGF1c2UpOyBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYm9zcykge2N0eC5kcmF3SW1hZ2UocG9pc29uU3ByaXRlSW1hZ2UsdGhpcy5wb3NpdGlvbi54LTEwLHRoaXMucG9zaXRpb24ueS10aGlzLmhlaWdodCs3NSl9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgY3R4LmRyYXdJbWFnZShwb2lzb25TcHJpdGVJbWFnZSx0aGlzLnBvc2l0aW9uLngtMTAsdGhpcy5wb3NpdGlvbi55LXRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSAgIFxuICAgIFxuICAgIGRyYXdQcm9qKGN0eCwgcGF1c2Upe1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4LCBwYXVzZSkgKSAvL2RyYXcgcHJvamVjdGlsZXMgXG4gICAgICAgIH0gICAgXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIHVwZGF0ZShnYW1lKXtcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PT0gMSl7ICAvLyBNb2IgXG4gICAgICAgICAgICBpZiAodGhpcy5oZWFsdGg+MCl7ICAgICBcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGxEaXJlY3QgPSAxOyAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRYPDApKGNoaWxsRGlyZWN0PSAtMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFgtdGhpcy5jaGlsbEFtb3VudCpjaGlsbERpcmVjdD49MC40KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT0nYXR0YWNrJykgdGhpcy5zdGF0ZSA9ICd3YWxrJzsgLy9jYW5jZWxzIGF0dGFjayBcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmF0dGFja0NEPjApIHRoaXMuc3RhdGUgPT0gJ2hpdCc7IFxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5zdGF0ZSA9ICd3YWxrJztcblxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLnBvc2l0aW9uLng8LXRoaXMud2lkdGgqMikge3RoaXMucG9zaXRpb24ueCA9IC10aGlzLndpZHRoKjJ9OyAvL2xlZnQgYm9yZGVyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoKSB7dGhpcy5wb3NpdGlvbi54ID0gdGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aDt9IC8vcmlnaHQgYm9yZGVyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2VpcmQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwtdGhpcy53ZWlyZFN0YXJ0PiB0aGlzLndlaXJkVGltZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlaXJkU3RhcnQgPSBnYW1lLmdhbWVUaW1lUmVhbDsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlaXJkVGltZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyMDAwKSs1MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkWCAgPSAtdGhpcy5zcGVlZFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFg+MCkge3RoaXMud2VpcmRUaW1lKz03MDB9OyAvL2JpYXMgbW92aW5nIGZvcndhcmRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFg8MCAmJiB0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgpIHRoaXMuc3BlZWRYID0gYWJzKHRoaXMuc3BlZWRYKTsgXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJvYW0gPSB0cnVlOyBcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJvYW1UaW1lID0gNTAwMDtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJvYW1ZID0gdGhpcy5sYW5lKmdhbWUucm93SGVpZ2h0OyBcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJvYW1MaW1pdHMgPSBbMCwgZ2FtZS5yb3dIZWlnaHQsIGdhbWUucm93SGVpZ2h0KjJdOyAvLzAsMSwyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IDA7XG4gICAgICAgICAgICAvLyAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9hbSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9hbVRpbWUtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9hbVRpbWUgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpOyAvL3JhbmRvbSAwLDEsMlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtVGltZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyNTApKzEwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BlZWRZID0gMzsvL1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFgtdGhpcy5jaGlsbEFtb3VudCpjaGlsbERpcmVjdDw9MSkge3NwZWVkWT0xfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KmNoaWxsRGlyZWN0PD0yKSB7c3BlZWRZPTJ9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtWT4gdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSs9c3BlZWRZIDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9hbVktPXNwZWVkWSA7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yb2FtWTx0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55LT1zcGVlZFkgO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtWSs9c3BlZWRZO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9hbVkrMj4gdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dICYmIHRoaXMucm9hbVktMjx0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09ICh0aGlzLnJvYW1ZLXRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtWSA9IHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvYW1ZID09IHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhbmUgPSB0aGlzLnJvYW1MaW1pdHMuaW5kZXhPZih0aGlzLnJvYW1ZKX07IC8vdXBkYXRlIGxhbmUgZHVyaW5nIG1vdmVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvaXNvblRpbWU+MCl7IC8vL1BPSVNPTlxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwtdGhpcy5wb2lzb25UaWNrPj0xMDAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gdGhpcy5wb2lzb25BbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgIGdhbWUucG9pc29uRGFtYWdlICs9IHRoaXMucG9pc29uQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaXNvblRpbWUgLT0gMTsgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaXNvblRpY2sgPSBnYW1lLmdhbWVUaW1lUmVhbDsgLy91cGRhdGUgdGljayB0aW1lIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMucG9pc29uVGltZSA9PSAwKXt0aGlzLnBvaXNvbkFtb3VudCA9IDA7ICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2lzb25TdGFjayA9IDA7IH0vL2Ryb3AgcG9pc29uIHN0YWNrc1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsbEFtb3VudD4wKXt0aGlzLmNoaWxsQW1vdW50LT0wLjAwNX0gLy9DSElMTCBcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNoaWxsQW1vdW50PDApe3RoaXMuY2hpbGxBbW91bnQ9MH07XG5cbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwtdGhpcy5rbm9ja2JhY2tUaW1lID4xMDAwKXt0aGlzLmtub2NrYmFja0ZvcmNlPTB9IC8vbWF4IDJzXG5cbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5rbm9ja2JhY2tGb3JjZSk+MCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2hpdCdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rbm9ja2JhY2tSZXNpc3QrPTAuMDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLmtub2NrYmFja0ZvcmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZT4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua25vY2tiYWNrRm9yY2UtPXRoaXMua25vY2tiYWNrUmVzaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aCs1MCl7dGhpcy5wb3NpdGlvbi54PXRoaXMuZ2FtZVdpZHRoKzUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U8MCkgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gLy9iYWNrd2FyZHNcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZTwwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua25vY2tiYWNrRm9yY2UrPXRoaXMua25vY2tiYWNrUmVzaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U+MCkgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDBcbiAgICAgICAgICAgICAgICAgICAgfTsgLy9mb3J3YXJkcyBcblxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT0nYXR0YWNrJyl7dGhpcy5wb3NpdGlvbi54IC09ICh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KmNoaWxsRGlyZWN0KX1cbiAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09IHRoaXMuc3BlZWRZOyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFk+MCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRZLT0wLjU7IFxuICAgICAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmp1bXApeyAvL2dyYXZpdHlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IDEqdGhpcy5ncmF2aXR5VGltZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5VGltZSs9MC41OyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMucG9zaXRpb24ueSA+IHRoaXMuZ2FtZUhlaWdodC0xMTAgKXsgLy9ib3R0b20gYm9yZGVyICh1cGRhdGUgZm9yIHBsYXRmb3JtcylcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5nYW1lSGVpZ2h0LTExMDtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJztcbiAgICAgICAgICAgICAgICAvLyB9IFxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlPT0nc3RhbmQnKXsgICAvL2Vtb3RlcyBmb3Igc3VtbW9uc1xuICAgICAgICAgICAgaWYgKHRoaXMuZW1vdGVUaW1lID09IDAgKXtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKTsgLy8xOiBzbGVlcCwgMjogaWdub3JlXG4gICAgICAgICAgICAgICAgbGV0IHRpbWUgPSAwOyBcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tIDw1KXt0aGlzLnN0YXRlID0gJ2Vtb3RlMSc7IHRpbWUgPSB0aGlzLmVtb3RlTGVuZ3RoWzBdO31cbiAgICAgICAgICAgICAgICBlbHNlIHt0aGlzLnN0YXRlID0gJ2Vtb3RlNic7dGltZSA9IHRoaXMuZW1vdGVMZW5ndGhbNV0gfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmVtb3RlVGltZU91dCA9IHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lID0gNjAwK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1MDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJ30sIHRpbWUpIDsvL2hvdyBsb25nIHRvIHJ1biBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAvLyBpZiAoZ2FtZS5wYXVzZSl7Y2xlYXJUaW1lb3V0KHRoaXMuZW1vdGVUaW1lT3V0KX07IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB0aGlzLmVtb3RlVGltZS0tOyBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKCkgKTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSB0aGlzLnByb2plY3RpbGVzLmZpbHRlciggIC8vZGVsZXRlcyBwcm9qZWN0aWxlc1xuICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC5kZWxldGUgIT09IHRydWU7IFxuICAgICAgICB9KTtcbiAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RpbGVzKTsgXG4gICAgIFxuXG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEID4wKXt0aGlzLmF0dGFja0NELS19XG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEPT0wKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRhY2tlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ncnkucmVzZXQoKTsgXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngrdGhpcy53aWR0aDIvMiwgdGhpcy5wb3NpdGlvbi55K3RoaXMuaGVpZ2h0MiwgXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aC10aGlzLndpZHRoMiwgdGhpcy5oZWlnaHRdOyBcbiAgICAgICAgXG5cblxuXG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmV5e1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIG9iaiwgdmFsdWUsIHNwZWVkWCA9IDApe1xuICAgICAgICB0aGlzLnlPZmYgPSAwIDtcbiAgICAgICAgaWYgKG9iai5ib3NzKXsgdGhpcy55T2ZmICs9NzB9XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogKG9iai5wb3NpdGlvbi54KStvYmoud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiBvYmoucG9zaXRpb24ueSs0MCt0aGlzLnlPZmZ9XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+Z2FtZS5nYW1lV2lkdGgtMTApe3RoaXMucG9zaXRpb24ueCA9IGdhbWUuZ2FtZVdpZHRoLTMwO30gLy9raWxsaW5nIG9mZi1zY3JlZW4gKHJpZ2h0KVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBvc2l0aW9uLng8MTApe3RoaXMucG9zaXRpb24ueD0zMH07XG4gICAgICAgIHRoaXMud2lkdGggPSAzNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAzNTsgXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTsgXG4gICAgICAgIHRoaXMuc3Bhd25UaW1lID0gIGdhbWUuZ2FtZVRpbWVSZWFsOyBcbiAgICAgICAgdGhpcy5wb3BVcCA9IDI1OyBcbiAgICAgICAgdGhpcy5kcm9wRG93biA9IDIzO1xuICAgICAgICB0aGlzLnNwZWVkWCA9IHNwZWVkWDsgXG4gICAgICAgIHRoaXMuc3BlZWRZID0gMTsgXG4gICAgICAgIHRoaXMuYWNjZWxVcCA9IDA7XG4gICAgICAgIHRoaXMuYWNjZWxEb3duID0gMDtcbiAgICAgICAgdGhpcy5kZWxldGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mYWRlID0gMTsgXG4gICAgICAgIHRoaXMuc3RhcnRGYWRlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmZsb2F0ID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmxvc3QgPSBmYWxzZTsgXG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnktMjUsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG4gICAgICAgIGlmICh0aGlzLnZhbHVlPj0xMDApe3RoaXMudHlwZSA9ICc0Jzt9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlPj01MCl7dGhpcy50eXBlID0gJzMnO30gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWU+PTEwKXt0aGlzLnR5cGUgPSAnMic7fSBcbiAgICAgICAgZWxzZSB0aGlzLnR5cGUgPSAnMSc7IFxuICAgICAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKTsgXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ2NvaW4vQ29pbicrdGhpcy50eXBlKydfPy5wbmcnLCAzLCA2LCBcInN0YW5kXCIpO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZF1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgcGF1c2UpIHtcbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRGYWRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mbG9hdCl7dGhpcy5mYWRlIC09IDAuMDE1O30gLy9zbG93ZXIgZmFkZSB3aGVuIHBpY2t1cFxuICAgICAgICAgICAgZWxzZSB0aGlzLmZhZGUgLT0gMC4wMztcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuZmFkZTsgXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge3RoaXMuZGVsZXRlPSB0cnVlfSwgXCI0NTBcIikgO1xuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcignc3RhbmQnKSk7IFxuICAgICAgICBjb25zdCBpbWFnZSA9IGFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7IFxuXG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlKGdhbWUpe1xuICAgICAgICBpZiAodGhpcy5wb3BVcD4wKXtcbiAgICAgICAgICAgIHRoaXMuYWNjZWxVcCs9MC4xO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09ICg0LjUtdGhpcy5hY2NlbFVwKTsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggLT10aGlzLnNwZWVkWDsgXG4gICAgICAgICAgICB0aGlzLnBvcFVwIC09IDE7IFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcERvd24+MCl7XG4gICAgICAgICAgICB0aGlzLmFjY2VsRG93bis9MC4xO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9ICgyK3RoaXMuYWNjZWxEb3duKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcERvd24gLT0gMTsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggLT10aGlzLnNwZWVkWDsgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmxvYXQpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55LT0xOyBcbiAgICAgICAgICAgIGlmIChnYW1lLnBsYXllci5wb3NpdGlvbi54K2dhbWUucGxheWVyLndpZHRoPHRoaXMucG9zaXRpb24ueCl7dGhpcy5wb3NpdGlvbi54LT0wLjggIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdhbWUucGxheWVyLnBvc2l0aW9uLng+dGhpcy5wb3NpdGlvbi54KSB0aGlzLnBvc2l0aW9uLngrPTAuODtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbC10aGlzLnNwYXduVGltZT49MTgwMDApeyAvLzE4IHMgXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RmFkZT10cnVlO1xuICAgICAgICAgICAgdGhpcy5sb3N0ID0gdHJ1ZTsgXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuICAgIH1cblxuICAgIFxufVxuIiwiaW1wb3J0IFByb2plY3RpbGUgZnJvbSAnLi9wcm9qZWN0aWxlJzsgXG5pbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDQwOyAvL3Nwcml0ZSBzaXplIFxuICAgICAgICB0aGlzLmhlaWdodCA9IDgwOyBcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgIC8vcG9zaXRpb24gXG4gICAgICAgICAgICB4OiB0aGlzLndpZHRoLzIsIFxuICAgICAgICAgICAgeTogdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAyKmdhbWUucm93SGVpZ2h0LFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxheWVyWCA9IHRoaXMucG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMiArMTg7IFxuICAgICAgICB0aGlzLmVsZVBvc2l0aW9ucyA9IFsgW3RoaXMucGxheWVyWCAtNjAsIHRoaXMucG9zaXRpb24ueV0sIFt0aGlzLnBsYXllclggLTQwLCB0aGlzLnBvc2l0aW9uLnktNDBdLFxuICAgICAgICAgICAgW3RoaXMucGxheWVyWCAsIHRoaXMucG9zaXRpb24ueS01NV0sIFt0aGlzLnBsYXllclggKzQwLCB0aGlzLnBvc2l0aW9uLnktNDBdLCBcbiAgICAgICAgICAgIFt0aGlzLnBsYXllclggKzYwLCB0aGlzLnBvc2l0aW9uLnldIF07XG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gZ2FtZS5yb3dIZWlnaHQ7XG4gICAgICAgIHRoaXMubGFuZSA9IDE7IFxuICAgICAgICB0aGlzLmZsb29yID0gIHRoaXMuZ2FtZUhlaWdodCAtIDQ1IC0gKDErdGhpcy5sYW5lKSp0aGlzLnJvd0hlaWdodFxuICAgICAgICB0aGlzLnNwZWVkID0gMztcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDA7IFxuICAgICAgICB0aGlzLmxlZnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaWRlID0wO1xuICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWRZID0gMDsgXG4gICAgICAgIHRoaXMuanVtcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1dpeic7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gMTAwOyBcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxOyBcbiAgICAgICAgdGhpcy5kYW1hZ2VEZWFsdCA9IDA7IFxuICAgICAgICB0aGlzLmludnVsblRpbWUgPSAgMDsgXG4gICAgICAgIHRoaXMuaW52dWxuRGFyayA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5pbnZ1bG5EYXJrVGltZSA9IDA7XG4gICAgICAgIHRoaXMua25vY2tiYWNrVGhyZXNoID0gMTsgXG4gICAgICAgIHRoaXMua25vY2tiYWNrU3VtID0gMFxuICAgICAgICB0aGlzLmFybW9yID0gMDsgXG4gICAgICAgIHRoaXMudG91Y2hIaXQgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuYXR0YWNrU3BlZWQgPSAzNTsgXG4gICAgICAgIHRoaXMuYXR0YWNrQ0QgPSAwOyBcbiAgICAgICAgdGhpcy5hbGl2ZSA9IHRydWU7IFxuICAgICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJzsgXG4gICAgICAgIHRoaXMuY3VyVGlsZSA9IDA7XG4gICAgICAgIHRoaXMuZWxlbWVudExpc3Q9IFtdOyAvL2FkZCBzcHJpdGVzIGhlcmUgXG4gICAgICAgIC8vIHRoaXMuZWxlbWVudExpc3QgPSBbJ0JsYXplJywnRGF3bicsJ05pZ2h0JywnVGh1bmRlcicsJ1dpbmQnXTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlcyA9IHt9O1xuICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGUgPSB7fSA7IFxuICAgICAgICB0aGlzLmVsZW1lbnRJbmZvID0geyAnQmxhemUnOiB7J3N0YW5kJzo3LCAnbW92ZSc6IDcsICdhdHRhY2snOiA4LCAncHJvaic6J3JlZEJhbGwnIH0sXG4gICAgICAgICAgICAnRGF3bic6IHsnc3RhbmQnOiAxNSwgJ21vdmUnOjE1LCAnYXR0YWNrJzogOCwgJ3Byb2onOid5ZWxsb3dCYWxsJ30sXG4gICAgICAgICAgICAnTmlnaHQnOiB7J3N0YW5kJzo3LCAnbW92ZSc6NywgJ2F0dGFjayc6IDgsICdwcm9qJzoncHVycGxlQmFsbCd9LFxuICAgICAgICAgICAgJ1RodW5kZXInOiB7J3N0YW5kJzogNywgJ21vdmUnOjcsICdhdHRhY2snOiA4LCAncHJvaic6J2dyZWVuQmFsbCcsfSwgXG4gICAgICAgICAgICAnV2luZCc6IHsnc3RhbmQnOiA3LCAnbW92ZSc6NywgJ2F0dGFjayc6IDgsICdwcm9qJzonYmx1ZUJhbGwnLH0gfVxuICAgICAgICB0aGlzLmVsZW1lbnRTdGF0ZSA9IFsnc3RhbmQnLCdzdGFuZCcsJ3N0YW5kJywnc3RhbmQnLCdzdGFuZCddOyBcbiAgICAgICAgdGhpcy5yZWNhbGxMaXN0ID0gWydyZWREcmFnb24wJywgJ3JlZERyYWdvbjEnLCAnYmx1ZURyYWdvbjAnLCAnYmx1ZURyYWdvbjEnLCBcbiAgICAgICAgJ2dyZWVuRHJhZ29uMCcsJ2dyZWVuRHJhZ29uMScsJ2JsYWNrRHJhZ29uMCcsICdibGFja0RyYWdvbjEnXSA7XG4gICAgICAgIHRoaXMucmVjYWxsSW1hZ2VzID17fTtcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IFxuICAgICAgICB0aGlzLmVsZW1lbnRhbHMoKTtcblxuICAgICAgICB0aGlzLnN1bW1vbkNvdW50ID0gMDsgXG4gICAgICAgIHRoaXMubW9uZXkgPSA4MDA7ICAvLzUwXG4gICAgICAgIGlmIChnYW1lLmxldmVsID09IDIpIHt0aGlzLm1vbmV5ID0gMTIwMH0gLy9zdGFydGluZyBtb25leSBiYXNlZCBvbiBsZXZlbDtcbiAgICAgICAgZWxzZSBpZiAoZ2FtZS5sZXZlbCA9PSAzKSB7dGhpcy5tb25leSA9IDUwMDB9XG4gICAgICAgIHRoaXMuc3VtbW9uQ29zdCA9IFs1MCwgMTAwLCAxNTAsIDIwMCwgNjQwXTtcbiAgICAgICAgdGhpcy51cGdyYWRlQ29zdCA9IFsyMDAsIDQwMCwgODAwLCAxNjAwLCAzMjAwXTsgXG4gICAgICAgIHRoaXMuZWxlbWVudENvc3QgPSBbNTAsIDEwMCwgMjAwLCA0MDAsIDgwMF07IFxuXG4gICAgICAgIHRoaXMuZGFtYWdlVGFrZW4gPSAwOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmxvYXQgPSAyMDtcbiAgICAgICAgdGhpcy5mbG9hdERpcmVjdCA9IDE7IFxuICAgICAgICB0aGlzLmdyYXZlU3Bhd24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ncmF2ZVggPSAwIDtcbiAgICAgICAgdGhpcy5ncmF2ZVkgPSAtMjA7IFxuICAgICAgICB0aGlzLmdyYXZlU3RhdGUgPSAnbW92ZSdcbiAgICAgICAgLy91cGdyYWRlc1xuICAgICAgICB0aGlzLmRhbWFnZU11bHRpID0gMTsgXG4gICAgICAgIHRoaXMubG9vdE11bHRpID0gMTtcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMuc3BlZWRNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLnBpZXJjZSA9IDA7IFxuXG4gICAgICAgIHRoaXMuY2hpbGwgPSAwO1xuICAgICAgICB0aGlzLmFyZWEgPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb24gPSAyOyBcbiAgICAgICAgdGhpcy5leHBsb2RlRGFtYWdlRGVhbHQgPSAwIFxuXG5cblxuICAgIH1cbiAgICBlbGVtZW50YWxzKCl7IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXsgLy8gTG9hZCBlbGVtZW50YWwgc3ByaXRlcyBcbiAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50U3ByaXRlc1t0aGlzLmVsZW1lbnRMaXN0W2ldXSl7XG4gICAgICAgICAgICAgICAgbGV0IGVsZVR5cGUgPSB0aGlzLmVsZW1lbnRMaXN0W2ldOyBcbiAgICAgICAgICAgICAgICB0aGlzLnN0YW5kRWxlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihlbGVUeXBlK1wiL3N0YW5kXz8ucG5nXCIsIHRoaXMuZWxlbWVudEluZm9bZWxlVHlwZV1bJ3N0YW5kJ10sIDYsIFwic3RhbmRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRWxlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihlbGVUeXBlK1wiL21vdmVfPy5wbmdcIiwgdGhpcy5lbGVtZW50SW5mb1tlbGVUeXBlXVsnbW92ZSddLCA2LCBcIndhbGtcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tFbGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKGVsZVR5cGUrXCIvYXR0YWNrMV8/LnBuZ1wiLCB0aGlzLmVsZW1lbnRJbmZvW2VsZVR5cGVdWydhdHRhY2snXSwgNiwgXCJzd2luZzFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlc1tlbGVUeXBlXSA9IFt0aGlzLnN0YW5kRWxlLCB0aGlzLm1vdmVFbGUsIHRoaXMuYXR0YWNrRWxlXTsgXG4gICAgICAgICAgICAgICAgLy97J3N0YW5kJzogdGhpcy5zdGFuZEVsZSwgJ21vdmUnOiB0aGlzLm1vdmVFbGUsICdhdHRhY2snOiB0aGlzLmF0dGFja0VsZX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSAxNTsgXG4gICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2FsZXJ0Xz8ucG5nXCIsIDMsIHRoaXMuZnJhbWVzLCBcInN0YW5kXCIpOyAvL2NvbWJhdCBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy53YWxrID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC93YWxrMV8/LnBuZ1wiLCAzLCAxMCwgXCJ3YWxrXCIpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgIHRoaXMuanVtcCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvanVtcF8/LnBuZ1wiLCAxLCAxMCwgXCJqdW1wXCIpOyAvL2p1bXAgc3ByaXRlcztcbiAgICAgICAgdGhpcy5yZWxheCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3RhbmQxXz8ucG5nXCIsIDMsIDMwLCBcInJlbGF4XCIpOyAvLyBpZGxlIHBvc2UgXG4gICAgICAgIHRoaXMuY2FzdCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvYWxlcnRfPy5wbmdcIiwgMywgMTAsIFwic3RhbmRcIik7IFxuICAgICAgICB0aGlzLnN3aW5nMSA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPMV8/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzFcIiwgdHJ1ZSk7IC8vYXR0YWNrIHNwcml0ZXM7XG4gICAgICAgIHRoaXMuc3dpbmcyID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9zd2luZ08yXz8ucG5nXCIsIDMsIDEyLCBcInN3aW5nMlwiLCB0cnVlKTsgXG4gICAgICAgIHRoaXMuc3dpbmczID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9zd2luZ08zXz8ucG5nXCIsIDMsIDEyLCBcInN3aW5nM1wiLCB0cnVlKTsgXG4gICAgICAgIHRoaXMuZGVhZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvZGVhZF8/LnBuZ1wiLCAzLCAyMDAsIFwiZGVhZFwiKTsgXG4gICAgICAgIHRoaXMuYXR0YWNrQW5pbSA9IFsnc3dpbmcxJywgJ3N3aW5nMicsICdzd2luZzMnXTsgXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnN0YW5kLCB0aGlzLndhbGssIHRoaXMuanVtcCwgdGhpcy5zd2luZzEsIHRoaXMuc3dpbmcyLCB0aGlzLnN3aW5nMywgdGhpcy5jYXN0LCB0aGlzLmRlYWQsIHRoaXMucmVsYXggXTsgXG4gICAgICAgIHRoaXMuZ3JhdmVNb3ZlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcImdyYXZlL21vdmVfPy5wbmdcIiwgMCwgMzAwLCBcIm1vdmVcIik7IFxuICAgICAgICB0aGlzLmdyYXZlTGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJncmF2ZS9zdGFuZF8/LnBuZ1wiLCA1LCAxMiwgXCJsYW5kXCIsIHRydWUgKTsgXG4gICAgICAgIHRoaXMuZ3JhdmVBbmltYXRpb25zID0gW3RoaXMuZ3JhdmVNb3ZlLCB0aGlzLmdyYXZlTGFuZF07XG5cbiAgICAgICAgLy8gdGhpcy5yZWNhbGxJbWFnZXMgPSBbJ3JlZERyYWdvbjAnLCAncmVkRHJhZ29uMScsICdibHVlRHJhZ29uMCcsICdibHVlRHJhZ29uMScsIFxuICAgICAgICAvLyAnZ3JlZW5EcmFnb24wJywnZ3JlZW5EcmFnb24xJywnYmxhY2tEcmFnb24wJywgJ2JsYWNrRHJhZ29uMSddIDtcbiAgICAgICAgZm9yIChsZXQgaSA9MDtpPHRoaXMucmVjYWxsTGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGxldCBpbWFnZSAgPSBuZXcgSW1hZ2UoKTsgXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSAnaW1hZ2VzL3JlY2FsbC8nK3RoaXMucmVjYWxsTGlzdFtpXSsnLnBuZyc7IFxuICAgICAgICAgICAgdGhpcy5yZWNhbGxJbWFnZXNbdGhpcy5yZWNhbGxMaXN0W2ldXSA9IGltYWdlOyBcbiAgICAgICAgfVxuICAgICAgICBcblxuXG4gICAgfVxuICAgIGVtb3RlKGdhbWUpe1xuICAgICAgICBpZiAoZ2FtZS53YXZlRmluaXNoKXtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09J3N0YW5kJyl7dGhpcy5zdGF0ZSA9ICdyZWxheCc7fSBcbiAgICB9fSBcblxuICAgIGF0dGFjayhwYXVzZSl7XG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEIDw9IDAgJiYgdGhpcy5hbGl2ZSAmJiAhcGF1c2UgKXtcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5wb3NpdGlvbi54LTI1OyBcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe3ggKz01MDt9XG4gICAgICAgICAgICB0aGlzLnByb2ogPSBuZXcgUHJvamVjdGlsZSh0aGlzLCAnbGlnaHRuaW5nYmFsbCcseCwgdGhpcy5wb3NpdGlvbi55KTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5hdHRhY2tBbmltLnNoaWZ0KCk7IFxuICAgICAgICAgICAgdGhpcy5hdHRhY2tBbmltLnB1c2godGhpcy5zdGF0ZSk7IFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSkucmVzZXQoKTsgXG4gICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCh0aGlzLnByb2opO1xuICAgICAgICAgICAgLy9zZXRUaW1lb3V0KCgpPT4ge3RoaXMucHJvamVjdGlsZXMucHVzaCh0aGlzLnByb2opfSwgXCIyMDBcIik7IC8vc2xpZ2h0IGRlbGF5IGZvciBhbmltYXRpb25cblxuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuZWxlbWVudExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5lbGVQb3NpdGlvbnNbaV1bMF07Ly9mYWNpbmcgbGVmdFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe3ggKz0yMH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qID0gbmV3IFByb2plY3RpbGUodGhpcywgdGhpcy5lbGVtZW50SW5mb1t0aGlzLmVsZW1lbnRMaXN0W2ldXVsncHJvaiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgeCwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMV0rMTggKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2FsbEljb24oY3R4LCBnYW1lKXtcbiAgICAgICAgaWYgKGdhbWUucmVjYWxsU3RvcmFnZSl7XG4gICAgICAgICAgICBsZXQgaW1hZ2VUeXBlID0gZ2FtZS5yZWNhbGxTdG9yYWdlLnR5cGUgKyBnYW1lLnJlY2FsbFN0b3JhZ2UuZm9ybTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5yZWNhbGxJbWFnZXNbaW1hZ2VUeXBlXSwgdGhpcy5wb3NpdGlvbi54KzIyLCB0aGlzLnBvc2l0aW9uLnktNSk7IFxuXG4gICAgICAgICAgLy8gIHRoaXMucmVjYWxsSW1hZ2VzW2dhbWUucmVjYWxsU3RvcmFnZS50eXBlXVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgc3VtbW9uQXR0YWNrKCl7fTsgXG4gICAgZHJhdyhjdHgsIHBhdXNlKXtcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgIGxldCBpbWFnZSA9IGFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7ICAgLy9nZXQgc3ByaXRlXG5cbiAgICAgICAgLy8gaWYgKHRoaXMuaW52dWxuVGltZSU0Pj0xICYmIHRoaXMuaW52dWxuVGltZT4wICYmIHRoaXMuYWxpdmUpIHtjdHguZ2xvYmFsQWxwaGEgPSAwLjJ9O1xuICAgICAgICAvL2lmICh0aGlzLmhpdGJveCl7IGN0eC5maWxsUmVjdCh0aGlzLmhpdGJveFswXSx0aGlzLmhpdGJveFsxXSwgdGhpcy5oaXRib3hbMl0sIHRoaXMuaGl0Ym94WzNdKTt9XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMuY3VyVGlsZSo4MCwgdGhpcy5wb3NpdGlvbi55LCA4MCwgODApOyAvL3NlbGVjdGVkIHRpbGVcbiAgICAgICAgLy8gY3R4LmZpbGxSZWN0KHRoaXMuaGl0Ym94WzBdLSg3NSooLTErdGhpcy5sb290TXVsdGkpKSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCA4MCk7IC8vbG9vdCByYW5nZVxuICAgICAgICAvLyBjdHguZmlsbFJlY3QodGhpcy5oaXRib3hbMF0sIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCs3NSooLTErdGhpcy5sb290TXVsdGkpLCA4MCk7IC8vbG9vdCByYW5nZVxuXG4gICAgICAgIGlmICh0aGlzLmxlZnQpe1xuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgLXRoaXMucG9zaXRpb24ueC0xLjUqdGhpcy53aWR0aC0xNSwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngtNSwgdGhpcy5wb3NpdGlvbi55KTsgfVxuICAgICAgICBcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW52dWxuRGFyayAmJiB0aGlzLmFsaXZlKXtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyAvLyBJbWFnZSB0aW50aW5nXG4gICAgICAgICAgICBidWZmZXIud2lkdGggPSAyMDA7Ly9pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIGJ1ZmZlci5oZWlnaHQgPSAyMDA7Ly9pbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBidHggPSBidWZmZXIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGJ0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsMCk7XG4gICAgICAgICAgICBidHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgICAgICAgICBidHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ211bHRpcGx5JztcbiAgICAgICAgICAgIGJ0eC5maWxsUmVjdCgwLDAsYnVmZmVyLndpZHRoLCBidWZmZXIuaGVpZ2h0KTtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxBbHBoYSA9IDAuNjtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLWluXCI7XG4gICAgICAgICAgICBidHguZHJhd0ltYWdlKGltYWdlLDAsMCk7IFxuXG4gICAgICAgICAgICBpZiAodGhpcy5sZWZ0KXtcbiAgICAgICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXIsIC10aGlzLnBvc2l0aW9uLngtMS41KnRoaXMud2lkdGgtMTAsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgICAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGJ1ZmZlciwgdGhpcy5wb3NpdGlvbi54LTUsIHRoaXMucG9zaXRpb24ueSk7IH1cbiAgICAgICAgfVxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICAgIFxuICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7IC8vcmVzZXRzIFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7fSBcblxuICAgICAgICAvL2VsZW1lbnRhbHMgXG4gICAgICAgIHRoaXMucGxheWVyWCA9IHRoaXMucG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMiArMTg7IFxuICAgICAgICB0aGlzLmVsZVBvc2l0aW9ucyA9IFsgW3RoaXMucGxheWVyWCAtNjAsIHRoaXMucG9zaXRpb24ueSs1XSwgW3RoaXMucGxheWVyWCAtNDAsIHRoaXMucG9zaXRpb24ueS0zNV0sXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICwgdGhpcy5wb3NpdGlvbi55LTU1XSwgW3RoaXMucGxheWVyWCArNDAsIHRoaXMucG9zaXRpb24ueS0zNV0sIFt0aGlzLnBsYXllclggKzYwLCB0aGlzLnBvc2l0aW9uLnkrNV0gXTtcbiAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXsgLy8gTG9hZCBlbGVtZW50YWwgc3ByaXRlcyBcbiAgICAgICAgICAgICAgICBsZXQgZWxlVHlwZSA9IHRoaXMuZWxlbWVudExpc3RbaV07IFxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuZWxlbWVudFN0YXRlW2ldID0gJ3N0YW5kJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50U3RhdGVbaV0gPSAnc3RhbmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gJ3N3aW5nMicgfHx0aGlzLnN0YXRlID09ICdzd2luZzMnKXt0aGlzLmVsZW1lbnRTdGF0ZVtpXT0nc3dpbmcxJ31cbiAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5lbGVtZW50U3ByaXRlc1tlbGVUeXBlXS5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5lbGVtZW50U3RhdGVbaV0pKSAvLyBjb3BpZXMgcGxheWVyIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZVtlbGVUeXBlXSA9IGFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7IC8vcmVzZXRzIEF0dGFjayBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFN0YXRlW2ldPSAnc3RhbmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlc1tlbGVUeXBlXVsyXS5yZXNldCgpIC8vcmVzZXQgXG4gICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxlZnQpe1xuICAgICAgICAgICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdLCAtdGhpcy5lbGVQb3NpdGlvbnNbaV1bMF0tdGhpcy53aWR0aC00NSwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMV0pOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7fVxuICAgICAgICAgICAgICAgIGVsc2UgKGN0eC5kcmF3SW1hZ2UodGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdLCB0aGlzLmVsZVBvc2l0aW9uc1tpXVswXS0yMCwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMV0pKTsgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlID0ge30gLy9jbGVhciBsb2FkZWQgc3ByaXRlc1xuXG4gICAgICAgIGlmICh0aGlzLmdyYXZlU3Bhd24pIHsgXG4gICAgICAgICAgICBpZiAodGhpcy5ncmF2ZVkgPj0gdGhpcy5mbG9vciszNSl7dGhpcy5ncmF2ZVN0YXRlID0nbGFuZCd9XG4gICAgICAgICAgICBlbHNlIHt0aGlzLmdyYXZlWSArPSA4fTsgXG5cbiAgICAgICAgICAgIGxldCBncmF2ZUFuaW1hdGlvbiA9IHRoaXMuZ3JhdmVBbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLmdyYXZlU3RhdGUpKVxuICAgICAgICAgICAgbGV0IGdyYXZlSW1hZ2UgPSBncmF2ZUFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGdyYXZlSW1hZ2UsIHRoaXMuZ3JhdmVYLCB0aGlzLmdyYXZlWSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdQcm9qKGN0eCwgcGF1c2Upe1xuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsIHBhdXNlKSApIC8vZHJhdyBwcm9qZWN0aWxlcyBcbiAgICB9XG5cbiAgICB0ZWxlcG9ydChkaXJlY3Rpb24pe1xuICAgICAgICBpZiAodGhpcy5sYW5lIC0gMSpkaXJlY3Rpb24+LTEgJiYgdGhpcy5sYW5lIC0gMSpkaXJlY3Rpb248MyAmJiB0aGlzLmFsaXZlKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSB0aGlzLnJvd0hlaWdodCpkaXJlY3Rpb247MlxuICAgICAgICAgICAgdGhpcy5sYW5lICs9IC0xKmRpcmVjdGlvbjsgXG4gICAgICAgICAgICB0aGlzLmZsb29yID0gIHRoaXMuZ2FtZUhlaWdodCAtIDQ1IC0gKDErdGhpcy5sYW5lKSp0aGlzLnJvd0hlaWdodH1cbiAgICB9XG4gICAgdXBkYXRlKCl7XG4gICAgICAgIGlmICh0aGlzLmludnVsblRpbWU+MCl7XG4gICAgICAgICAgICB0aGlzLmludnVsblRpbWUtLVxuICAgICAgICAgICAgaWYgKHRoaXMuaW52dWxuVGltZT4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmludnVsbkRhcmtUaW1lICsrXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnZ1bG5EYXJrVGltZT41KSB7dGhpcy5pbnZ1bG5EYXJrID0gZmFsc2U7IHRoaXMuaW52dWxuRGFya1RpbWUgPSAtM31cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmludnVsbkRhcmtUaW1lPjApe3RoaXMuaW52dWxuRGFyayA9dHJ1ZX07XG4gICAgICAgICAgICB9IGVsc2Uge3RoaXMuaW52dWxuRGFyayA9IGZhbHNlfTtcbiAgICAgICAgXG4gICAgICAgIH07IFxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA+MCl7dGhpcy5hdHRhY2tDRC09ICgxKnRoaXMuc3BlZWRNdWx0aSl9O1xuICAgICAgICBpZiAodGhpcy5oZWFsdGg8PTApe3RoaXMuc3RhdGUgPSAnZGVhZCc7IFxuICAgICAgICAgICAgICAgIHRoaXMuYWxpdmU9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JhdmVTcGF3biA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXZlWCA9IHRoaXMucG9zaXRpb24ueCsyMDsgXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IHRoaXMucHJvamVjdGlsZXMuZmlsdGVyKCAgLy9kZWxldGVzIHByb2plY3RpbGVzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LmRlbGV0ZSAhPT0gdHJ1ZTsgXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuYWxpdmUpe1xuICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRYIT0wICYmICF0aGlzLmF0dGFja0FuaW0uaW5jbHVkZXModGhpcy5zdGF0ZSkpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnd2Fsayc7IFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09ICd3YWxrJykgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7IFxuXG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PC0zMCkge3RoaXMucG9zaXRpb24ueCA9IC0zMH07IC8vbGVmdCBib3JkZXJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aCkge3RoaXMucG9zaXRpb24ueCA9IHRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGg7fSAvL3JpZ2h0IGJvcmRlclxuICAgICAgICAgICAgdGhpcy5jdXJUaWxlID0gTWF0aC5mbG9vciggKHRoaXMud2lkdGgvMiArdGhpcy5wb3NpdGlvbi54KS84MCk7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5rbm9ja2JhY2tGb3JjZSk+MCkge3NldFRpbWVvdXQoKCk9Pnt0aGlzLmtub2NrYmFja0ZvcmNlPTB9LCAxMDAwKX07ICAvL0RSIFxuICAgICAgICAgICAgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U+MCl7dGhpcy5rbm9ja2JhY2tGb3JjZS09MC41O31cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U8MCl7dGhpcy5rbm9ja2JhY2tGb3JjZSs9MC41O31cbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCArPSAodGhpcy5zcGVlZFgqdGhpcy5zcGVlZE11bHRpKTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLmtub2NrYmFja0ZvcmNlO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09IHRoaXMuc3BlZWRZOyBcblxuICAgICAgICB9IGVsc2UgeyAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZsb2F0PjApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0wLjEqdGhpcy5mbG9hdERpcmVjdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbG9hdCAtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge3RoaXMuZmxvYXQgPSAyMDsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsb2F0RGlyZWN0ID0gLXRoaXMuZmxvYXREaXJlY3R9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA+IHRoaXMuZmxvb3IpeyAvL2JvdHRvbSBib3JkZXIgKHVwZGF0ZSBmb3IgcGxhdGZvcm1zKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5mbG9vcjtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZID0gMDtcbiAgICAgICAgICAgIHRoaXMuanVtcCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICAgICAgaWYgKHRoaXMuYWxpdmUgJiYgIXRoaXMuYXR0YWNrQW5pbS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7XG4gICAgICAgIH0gXG4gICAgICAgIGlmICh0aGlzLnNwZWVkWT4wKXtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZLT0wLjU7IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmp1bXApeyAvL2dyYXZpdHlcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSAxKnRoaXMuZ3Jhdml0eVRpbWU7XG4gICAgICAgICAgICB0aGlzLmdyYXZpdHlUaW1lKz0wLjU7IFxuICAgICAgICAgICAgaWYgKCF0aGlzLmF0dGFja0FuaW0uaW5jbHVkZXModGhpcy5zdGF0ZSkpIHRoaXMuc3RhdGUgPSAnanVtcCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54KzE1LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cblxuICAgICAgICAvL3RoaXMucG9zaXRpb24ueCs9IDUgLyBkZWx0YVRpbWU7IFxuICAgIH1cbn0iLCJpbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RpbGV7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCB0eXBlPSdlbmVyZ3liYWxsJyx4ID0gMCwgeT0wLCBkaXJlY3Rpb24gPSAxICl7XG4gICAgICAgIHRoaXMudHlwZUluZm8gPSB7ICdlbmVyZ3liYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA5MH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAneWVsbG93QmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogNTAsJ3lPZmYnOjM1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwdXJwbGVCYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA1MCwneU9mZic6MzV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3JlZEJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDUwLCd5T2ZmJzozNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnZ3JlZW5CYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA1MCwneU9mZic6MzV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JsdWVCYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA1MCwneU9mZic6MzV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpcmViYWxsJzogeydzcGVlZCc6IDMsICd0cmF2ZWwnOjEsICdleHBsb2RlJzoyLCAneE9mZic6IDcwLCAneU9mZic6LTEwIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JhdGJhbGwnOiB7J3NwZWVkJzogNiwgJ3RyYXZlbCc6MywgJ2V4cGxvZGUnOjQsICd4T2ZmJzogMTA1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdmaXJlYmFsbDInOiB7J3NwZWVkJzogMTIsICd0cmF2ZWwnOjEsICdleHBsb2RlJzozLCAneE9mZic6IDk1LCAneU9mZic6LTEwIH0sICAvLy0xNSwgKzIwXG4gICAgICAgICAgICAgICAgICAgICAgICAncG9pc29uYmFsbCc6IHsnc3BlZWQnOiA3LCAndHJhdmVsJzoxLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOjg1LCAgJ3lPZmYnOi01IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWNlYmFsbCc6IHsnc3BlZWQnOiA4LCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NCwgJ3hPZmYnOjk1LCAgJ3lPZmYnOi01IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGlnaHRuaW5nYmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjcsICd4T2ZmJzo4MH0sIC8vcGxheWVyIGJhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0aHVuZGVyYmFsbCc6IHsnc3BlZWQnOiAxMiwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjcsICd4T2ZmJzo4MCwneU9mZic6LTEwIH0gfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBwbGF5ZXIuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBwbGF5ZXIuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDIwOyAvL3Nwcml0ZSBzaXplIFxuICAgICAgICB0aGlzLmhlaWdodCA9IDIwOyBcbiAgICAgICAgdGhpcy5leHBsb2RlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmRlbGV0ZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50b3VjaEhpdD0gdHJ1ZTtcbiAgICAgICAgdGhpcy5waWVyY2UgPSBwbGF5ZXIucGllcmNlO1xuICAgICAgICB0aGlzLm93bmVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IHBsYXllci5kYW1hZ2UgKiBwbGF5ZXIuZGFtYWdlTXVsdGk7IFxuICAgICAgICB0aGlzLmhlYWx0aCA9MTsgXG4gICAgICAgIHRoaXMuc2lkZSA9IDA7IFxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlOyBcbiAgICAgICAgdGhpcy5oaXRMaXN0ID0gW107IFxuICAgICAgICB0aGlzLmxhbmUgPSBwbGF5ZXIubGFuZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICd0cmF2ZWwnOyBcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247IFxuICAgICAgICBcblxuICAgICAgICB0aGlzLmNoaWxsID0gcGxheWVyLmNoaWxsO1xuICAgICAgICB0aGlzLmFyZWEgPSBwbGF5ZXIuYXJlYTsgXG4gICAgICAgIHRoaXMucG9pc29uID0gcGxheWVyLnBvaXNvbjsgXG4gICAgICAgIHRoaXMucG9pc29uTWF4ID0gcGxheWVyLnBvaXNvbk1heDtcblxuICAgICAgICB0aGlzLnhPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3hPZmYnXTtcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddKXt0aGlzLnlPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXX1cbiAgICAgICAgZWxzZSB0aGlzLnlPZmYgPTA7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGVmdCA9IHBsYXllci5sZWZ0OyAvLyBzaG9vdCBsZWZ0XG4gICAgICAgIGlmICh4ID09IDAgJiYgeSA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgICAgIHg6IHBsYXllci5wb3NpdGlvbi54LCBcbiAgICAgICAgICAgICAgICB5OiBwbGF5ZXIucG9zaXRpb24ueSs0NVxuICAgICAgICAgICAgfX1cbiAgICAgICAgZWxzZSB7IHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogeCszNSxcbiAgICAgICAgICAgICAgICB5OiB5KzY1fVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zcGVlZCA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3BlZWQnXTtcbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cblxuICAgIH1cblxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSA2OyBcbiAgICAgICAgdGhpcy50cmF2ZWwgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMudHlwZSsnL3RyYXZlbF8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsndHJhdmVsJ10sIHRoaXMuZnJhbWVzLCBcInRyYXZlbFwiKTsgLy9zdGFuZGluZyBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy5idXJzdCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvZXhwbG9kZV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZXhwbG9kZSddLCB0aGlzLmZyYW1lcywgXCJidXJzdFwiLCB0cnVlKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy50cmF2ZWwsIHRoaXMuYnVyc3RdOyBcblxuICAgICAgICBpZiAodGhpcy50eXBlID09ICd0aHVuZGVyYmFsbCcpe1xuICAgICAgICAgICAgdGhpcy5ib2x0ID0gbmV3IFNwcml0ZUFuaW1hdGlvbigndGh1bmRlcmJvbHQvZXhwbG9kZV8/LnBuZycsIDUsIHRoaXMuZnJhbWVzLCBcImV4cGxvZGVcIiwgdHJ1ZSk7IC8vICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgcGF1c2UpIHtcbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTsgLy8gaGl0Ym94XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gXCJOb25lXCIpeyBcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7ICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwbG9kZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdidXJzdCdcbiAgICAgICAgICAgICAgICBpZih0aGlzLnR5cGUgPT0ndGh1bmRlcmJhbGwnKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvbHRJbWFnZSA9IHRoaXMuYm9sdC5nZXRJbWFnZShwYXVzZSk7IFxuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJvbHRJbWFnZSwgdGhpcy5wb3NpdGlvbi54LCAyNDApXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpe3RoaXMuZGVsZXRlID0gdHJ1ZTt9XG4gICAgXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlPT0naWNlYmFsbCcgJiB0aGlzLnN0YXRlPT0nYnVyc3QnKXt0aGlzLnhPZmY9MTAwfTtcbiAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0KXsvL2ZsaXAgYmFzZWQgb24gc3ByaXRlIG9yaWVudGF0aW9uXG4gICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC10aGlzLnBvc2l0aW9uLngtIHRoaXMueE9mZisxNSwgdGhpcy5wb3NpdGlvbi55LTYwK3RoaXMueU9mZik7fVxuICAgICAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54LXRoaXMueE9mZiszNSwgdGhpcy5wb3NpdGlvbi55LTYwK3RoaXMueU9mZik7IH1cblxuICAgICAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7IFxuICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5zcHJpdGUsIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KzI1KTsgLy9kcmF3IG1vYiAoeCwgeSwgaGVpZ2h0LCB3aWR0aClcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGxvZGUpe3RoaXMuZGVsZXRlID0gdHJ1ZX07IFxuICAgICAgICB9XG5cbiAgICB9IFxuXG5cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgaWYgKCF0aGlzLmV4cGxvZGUpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGVmdCl7dGhpcy5wb3NpdGlvbi54IC09IHRoaXMuc3BlZWQ7fSAvLyBkaXJlY3Rpb25cbiAgICAgICAgICAgIGVsc2UgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueDwtdGhpcy53aWR0aC0xMDApIHt0aGlzLmRlbGV0ZSA9IHRydWUgfTtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoKSB7dGhpcy5kZWxldGUgPSB0cnVlfTtcblxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSs1LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG5cblxuXG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmVzdGFydFNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxNzA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDI1OyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI0cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2UgOyBcbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdSZXR1cm4gdG8gTWFpbic7XG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLmdhbWVXaWR0aC8yO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gMjUwO1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDUwOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy54Kyh0aGlzLndpZHRoLXRoaXMuYnV0dG9uV2lkdGgpLzIsIHRoaXMuaGVpZ2h0LXRoaXMuYnV0dG9uSGVpZ2h0LXRoaXMucGFkZGluZ11dIFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMV1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTsgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZHJhdyhjdHgpe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdGFydEZ1bmN0aW9ucyhnYW1lKXtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgICAgIGdhbWUuZmFkZU91dCA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge2dhbWUudGl0bGVEaXNwbGF5ID0gdHJ1ZX0sIFwiMjAwMFwiKSAvLyBmYWRlIG91dCB0cmFuc2l0aW9uXG4gICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdGFydEZ1bmN0aW9ucyhnYW1lLCBpKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgpeyAgIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnOyAvL2RyYXcgYm9yZGVyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vc2V0cyBhcmVhIGZvciBjb2xsaXNpb24gKGlzUG9pbnRJblBhdGgpXG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCwgMik7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZHJhdyB0ZXh0IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzIpOyBcblxuXG5cbiAgICAgICAgfVxuXG4gICAgIFxuICAgICAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgICAgICAvLyBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgLy8gY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCk7XG5cbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZGVmZWF0IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnR2FtZSBPdmVyIScsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMueSArIDI1KSAvL3ZpY3Rvcnkgb3IgZGVmZWF0XG4gICAgICAgICAgICB9XG5cblxuICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG5cblxuICAgIFxuICAgICAgICBcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBzdGFydFNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMjA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDE1OyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI0cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MyA9IFwiMjBweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5jb250cm9scyA9IFtcIlN0b3AgdGhlIG1vbnN0ZXJzIGZyb20gYWR2YW5jaW5nIVwiLFwiIC0gVXNlIChXQVNEKSB0byBtb3ZlLCAoSikgdG8ganVtcCwgYW5kIChLKSB0byBzaG9vdC4gVXNlIChQKSB0byBvcGVuIHNob3AuIFwiLCBcbiAgICAgICAgICAgIFwiIC0gQ29sbGVjdCB0aGUgY29pbnMgbW9uc3RlcnMgZHJvcCBiZWZvcmUgdGhleSBleHBpcmVcIiwgXG4gICAgICAgICAgICBcIiAtIFNwZW5kIG1lc29zIG9uIHVwZ3JhZGVzICYgc3VtbW9ucyB0byBib2xzdGVyIHlvdXIgZGVmZW5zZVwiLCBcbiAgICAgICAgICAgIFwiIC0gTG9zZSBsaXZlcyB3aGVuIG1vbnN0ZXJzIGVzY2FwZSBvciB0b3VjaCB5b3VcIiwgXCIgLSBHYW1lIG92ZXIgd2hlbiBhbGwgbGl2ZXMgbG9zdCFcIl07XG4gICAgICAgIHRoaXMua2V5Ym9hcmQgPSBuZXcgSW1hZ2UoKTsgXG4gICAgICAgIHRoaXMua2V5Ym9hcmQuc3JjID0gJ2ltYWdlcy9iZy9rZXlib2FyZC5wbmcnO1xuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1N0YXJ0ISc7XG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLmdhbWVXaWR0aC8yO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gNjU7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzU7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLngrdGhpcy53aWR0aC0gdGhpcy5idXR0b25XaWR0aC10aGlzLnBhZGRpbmcsIHRoaXMuaGVpZ2h0LXRoaXMuYnV0dG9uSGVpZ2h0LXRoaXMucGFkZGluZ11dIFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMV1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTsgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZHJhdyhjdHgpe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRGdW5jdGlvbnMoZ2FtZSl7XG4gICAgICAgICAgICBnYW1lLm5leHRXYXZlID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgIH1cblxuXG4gICAgICAgIGhhbmRsZUNsaWNrKGUsIGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZ1bmN0aW9ucyhnYW1lLCBpKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4KXsgICBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnc3RlZWxibHVlJzsgLy9kcmF3IGJvcmRlclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLHRoaXMuYnV0dG9uSGVpZ2h0KTsgXG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgLy9kcmF3IHRleHQgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrdGhpcy5idXR0b25IZWlnaHQvMik7IFxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL3NldHMgYXJlYSBmb3IgY29sbGlzaW9uIChpc1BvaW50SW5QYXRoKVxuICAgICAgICAgICAgY3R4LnJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0KTsgICAgICAgXG4gICAgICAgIH1cblxuICAgICBcbiAgICAgICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5IHx8IGdhbWUud2F2ZUZpbmlzaCB8fCBnYW1lLmxldmVsRmluaXNoKXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCswLjMqdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQrMjAsIDAuNCp0aGlzLndpZHRoLCAyNSwgMik7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1ByZXNzIFtBXSBmb3IgdXBncmFkZXMnLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmhlaWdodCszNSkgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnYW1lLmxldmVsTm90ZSE9Jycpe1xuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbCAtIGdhbWUubm90ZVRpbWU8NDUwMCl7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCsxNSwgdGhpcy5oZWlnaHQqMC41LCB0aGlzLndpZHRoLTMwLCA1MCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDM7IFxuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGdhbWUubGV2ZWxOb3RlLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmhlaWdodC8yKzMwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgfHwgKGdhbWUucGF1c2UgJiYgIWdhbWUudXBncmFkZS5kaXBsYXkpKXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdzdGFydCc7IFxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5rZXlib2FyZCwgMTgwLDApO1xuICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGk9MDsgaTx0aGlzLmNvbnRyb2xzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsVGV4dCh0aGlzLmNvbnRyb2xzW2ldLCB0aGlzLngrdGhpcy5wYWRkaW5nLCB0aGlzLnkrdGhpcy5wYWRkaW5nKigxK2kpLCB0aGlzLndpZHRoKTsgXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVkcmF3KGN0eCk7IC8vZHJhdyBzdGFydCBidXR0b25cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgLy8gaWYgKGdhbWUuc3RvcmFnZS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgIC8vICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgIC8vICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIC8vICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgIC8vICAgICBjdHgudGV4dEFsaWduID0gJ3N0YXJ0JzsgXG4gICAgICAgICAgICAvLyAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsVGV4dCgnUmVzdW1tb24gRHJhZ29ucyBmcm9tIHNob3AhJywgdGhpcy54K3RoaXMucGFkZGluZywgdGhpcy55K3RoaXMucGFkZGluZykgXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgICAgICBcbiAgICBcbiAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBcbiAgICAgICAgXG59IiwiaW1wb3J0IGltZyBmcm9tICcuL2ltZyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0aXRsZVNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxNzA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLmJnQXJ0ID0gaW1nKCdiZy9iZ1RpdGxlLnBuZycpO1xuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDI1OyBcbiAgICAgICAgdGhpcy5mb250VGl0bGUgPSBcIjQ4cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250ID0gXCIxOHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI4cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MyA9IFwiMjRweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgdGhpcy50aXRsZUxvZ28gPSBcIk1hcGxlVERcIjsgXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnUGxheSc7XG4gICAgICAgIHRoaXMuYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjIudGV4dENvbnRlbnQgPSAnTGV2ZWwgU2VsZWN0JztcbiAgICAgICAgdGhpcy5idXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMy50ZXh0Q29udGVudCA9ICc8JzsgICBcblxuICAgICAgICB0aGlzLmJ1dHRvbjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b240LnRleHRDb250ZW50ID0gJz4nOyAgXG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25ZID0gMTtcblxuICAgICAgICB0aGlzLmFib3V0VGV4dCA9IFtcIlVub2ZmaWNpYWwgZmFuIGdhbWUgZGV2ZWxvcGVkIGJ5IENocmlzdG9waGVyIExlZSAoc2lyaGNsZWVAZ21haWwuY29tKVwiLFxuICAgICAgICAgICAgICAgICBcIkFsbCBNYXBsZVN0b3J5IGFzc2V0cyB1c2VkIGFyZSBjb3B5cmlnaHRlZCBtYXRlcmlhbHMgJiBpbnRlbGxlY3R1YWwgcHJvcGVydHkgYmVsb25naW5nIHRvIE5FWE9OXCJdO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gMTc1O1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDM1OyBcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMuZ2FtZVdpZHRoLzItKHRoaXMuYnV0dG9uV2lkdGgvMik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMuYnV0dG9uWDEsIDIqdGhpcy5nYW1lSGVpZ2h0LzMtNV0sIFxuICAgICAgICAgICAgW3RoaXMuYnV0dG9uWDEsIHRoaXMucGFkZGluZyt0aGlzLmJ1dHRvbkhlaWdodCArIDIqdGhpcy5nYW1lSGVpZ2h0LzMtMjVdXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjEsIHRoaXMuYnV0dG9uMl1cblxuICAgICAgICB0aGlzLmxldmVsQnV0dG9ucyA9IFsgdGhpcy5idXR0b24zLCB0aGlzLmJ1dHRvbjRdOyBcbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbldpZHRoID0gNTA7IFxuICAgICAgICB0aGlzLmxldmVsQnV0dG9uSGVpZ2h0ID0gMzA7IFxuICAgICAgICB0aGlzLmxldmVsQnV0dG9uQ2VudGVyID0gNzA7ICAvLyBtaWRkbGUgbnVtYmVyIFxuICAgICAgICB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy5nYW1lV2lkdGgvMi10aGlzLmxldmVsQnV0dG9uQ2VudGVyLzItdGhpcy5sZXZlbEJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1sxXVsxXSs0MF0sIFxuICAgICAgICBbdGhpcy5nYW1lV2lkdGgvMit0aGlzLmxldmVsQnV0dG9uQ2VudGVyLzIsIHRoaXMuYnV0dG9uUG9zaXRpb25zWzFdWzFdKzQwXV07IFxuXG4gICAgICAgIHRoaXMuZmFkZSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUhvdmVyKGUpIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZHJhdyhjdHgpe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgfSAvLyAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbnMgPSBbIHRoaXMuYnV0dG9uMywgdGhpcy5idXR0b240XTsgXG4gICAgICAgICAgICAvL3RoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnMgPSBbIFsxMCwgdGhpcy5idXR0b25Qb3NpdGlvbnNbMV1bMV0rMTBdLCBbMTAsIHRoaXMuYnV0dG9uUG9zaXRpb25zWzFdWzFdKzIwXV07IFxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmxldmVsQnV0dG9ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMubGV2ZWxCdXR0b25zW2ldLCB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICB9ICAgICAgICAgIFxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idXR0b25zTGlzdFtpXS50ZXh0Q29udGVudCA9PSBcIlBsYXlcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLmZhZGVPdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntnYW1lLnRpdGxlRGlzcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUucmVzZXRFdmVyeXRoaW5nKCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCl9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICBcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5sZXZlbEJ1dHRvbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmxldmVsQnV0dG9uc1tpXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsQnV0dG9uc1tpXS50ZXh0Q29udGVudCA9PSBcIjxcIil7IC8vIHJlbG9hZCBiZyBhcnQgYW5kIGxldmVsIGxvYWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmxldmVsPjEpe2dhbWUubGV2ZWwtLX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsQnV0dG9uc1tpXS50ZXh0Q29udGVudCA9PSBcIj5cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbDxnYW1lLmZpbmFsTGV2ZWwpe2dhbWUubGV2ZWwrK31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgICAgICAgIFxuICAgICAgICAgICAgXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4KXsgICBcbiAgICAgICAgICAgIGxldCBidXR0b25XaWR0aCA9IHRoaXMuYnV0dG9uV2lkdGg7XG4gICAgICAgICAgICBsZXQgYnV0dG9uSGVpZ2h0ID0gdGhpcy5idXR0b25IZWlnaHQ7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3N0ZWVsYmx1ZSc7XG4gICAgICAgICAgICBpZiAoZTEudGV4dENvbnRlbnQ9PSdQbGF5Jyl7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyO31cbiAgICAgICAgICAgIGVsc2UgaWYgKGUxLnRleHRDb250ZW50PT0nTGV2ZWwgU2VsZWN0Jyl7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQzO1xuICAgICAgICAgICAgICAgIGJ1dHRvbkhlaWdodCAtPTExO1xuICAgICAgICAgICAgICAgIHkrPTEwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtjdHguZm9udCA9IHRoaXMuZm9udDM7XG4gICAgICAgICAgICAgICAgYnV0dG9uV2lkdGggPSB0aGlzLmxldmVsQnV0dG9uV2lkdGg7XG4gICAgICAgICAgICAgICAgYnV0dG9uSGVpZ2h0ID0gdGhpcy5sZXZlbEJ1dHRvbkhlaWdodCA7fVxuICAgICAgICAgICAgICAgIC8vZHJhdyB0ZXh0IFxuICAgICAgICBcblxuXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHgseSwgYnV0dG9uV2lkdGgsYnV0dG9uSGVpZ2h0LCAzKSA7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCtidXR0b25XaWR0aC8yLCB5K2J1dHRvbkhlaWdodC8yKTsgXG4gICAgXG4gICAgICAgIH1cblxuICAgICBcbiAgICAgICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJnQXJ0LCAwLDApOyBcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVswXSsgMTArIHRoaXMubGV2ZWxCdXR0b25XaWR0aCx0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zWzBdWzFdLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsQnV0dG9uV2lkdGgsIHRoaXMubGV2ZWxCdXR0b25IZWlnaHQsIDMpIDtcbiAgICAgICAgICAgICAgICAvLyBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChnYW1lLmxldmVsLCAgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVswXSt0aGlzLmxldmVsQnV0dG9uQ2VudGVyKzE1LCAgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVsxXSsxOCk7IFxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4KTsgLy9kcmF3IHN0YXJ0IGJ1dHRvblxuXG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBjdHguc2hhZG93T2Zmc2V0WD0xO1xuICAgICAgICAgICAgICAgIGN0eC5zaGFkb3dPZmZzZXRZPTE7XG4gICAgICAgICAgICAgICAgY3R4LnNoYWRvd0NvbG9yPVwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHguc2hhZG93Qmx1cj0gNDsgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udFRpdGxlOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnRpdGxlTG9nbywgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5nYW1lSGVpZ2h0LzMpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcblxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDsgLy9hYm91dFxuICAgICAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuZmFkZTsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQcmVzcyBhbnkga2V5JywgdGhpcy5nYW1lV2lkdGgvMix0aGlzLmdhbWVIZWlnaHQvMis1NSk7IFxuICAgICAgICAgICAgICAgIHRoaXMuZmFkZS09MC4wMTA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFkZTwwLjI1KXt0aGlzLmZhZGUgPSAxfVxuICAgICAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5hYm91dFRleHQubGVuZ3RoOyBpKyspeyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuYWJvdXRUZXh0W2ldLCB0aGlzLmdhbWVXaWR0aC8yLHRoaXMuZ2FtZUhlaWdodC0zNSsxNSppKTsgXG4gICAgICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVRleHQodGhpcy5hYm91dFRleHRbaV0sdGhpcy5nYW1lV2lkdGgvMix0aGlzLmdhbWVIZWlnaHQtMzUrMTUqaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIFxuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID1cImJsYWNrXCI7IFxuICAgICAgICAgICAgICAgIC8vIGN0eC5saW5lV2lkdGg9NTtcbiAgICAgICAgICAgICAgICAvLyBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnJvdW5kUmVjdCh0aGlzLmJ1dHRvblBvc2l0aW9uc1swXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbMF1bMV0sIHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0LCAzKSA7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGVsc2Uge2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpLmlubmVySFRNTD1cIlwiO31cbiAgICAgICAgICAgIFxuICAgIFxuICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG5cblxuICAgIFxuICAgICAgICBcbn0iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwZ3JhZGV7XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2NTA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMjMwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwO1xuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMTU7IFxuICAgICAgICB0aGlzLnBhZGRpbmdZID0gNDtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDE3MDtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSAzNjtcbiAgICAgICAgdGhpcy5mb250ID0gXCIxM3B4IGFyaWFsXCI7ICAgICAgICAgICAgICBcbiAgICAgICAgdGhpcy5mb250MiA9IFwiMTRweCBhcmlhbFwiOyAgXG5cbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdTdW1tb24gUmVkIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMS52YWx1ZSA9ICdyZWREcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24yLnRleHRDb250ZW50ID0gJ1N1bW1vbiBCbHVlIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMi52YWx1ZSA9ICdibHVlRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMy50ZXh0Q29udGVudCA9ICdTdW1tb24gR3JlZW4gRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24zLnZhbHVlID0gJ2dyZWVuRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b240ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNC50ZXh0Q29udGVudCA9ICdTdW1tb24gQmxhY2sgRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b240LnZhbHVlID0gJ2JsYWNrRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24xMCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEwLnRleHRDb250ZW50ID0gJ1dJUCc7XG4gICAgICAgIHRoaXMuYnV0dG9uMTAudmFsdWUgPSAnbXVzaHJvb21LbmlnaHQnO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy54ICsgdGhpcy5wYWRkaW5nOyBcbiAgICAgICAgdGhpcy5uYW1lSGFzaCA9IHsncmVkRHJhZ29uJzonUmVkIERyYWdvbicsICdibHVlRHJhZ29uJzonQmx1ZSBEcmFnb24nLFxuICAgICAgICAnZ3JlZW5EcmFnb24nOidHcmVlbiBEcmFnb24nLCAnYmxhY2tEcmFnb24nOidCbGFjayBEcmFnb24nLCAnbXVzaHJvb21LbmlnaHQnOiAnTXVzaHJvb20gS25pZ2h0J307XG4gICAgICAgIHRoaXMuc3VtbW9uTGlzdCA9IFsncmVkRHJhZ29uJywgJ2JsdWVEcmFnb24nLCdncmVlbkRyYWdvbicsJ2JsYWNrRHJhZ29uJ107XG4gICAgICAgIHRoaXMuZWxlbWVudExpc3QgPSBbJ0JsYXplJywnRGF3bicsJ05pZ2h0JywnV2luZCcsJ1RodW5kZXInXTtcblxuICAgICAgICB0aGlzLmJ1dHRvbjUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b241LnRleHRDb250ZW50ID0gJ0JsYXplIFNwcml0ZSc7IC8vQmxhemUgLSBGbGFtZSBcbiAgICAgICAgdGhpcy5idXR0b241LnZhbHVlID0gXCJCbGF6ZVwiO1xuICAgICAgICB0aGlzLmJ1dHRvbjYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b242LnRleHRDb250ZW50ID0gJ0Rhd24gU3ByaXRlICc7IC8vRGF3biAtIExpZ2h0IFxuICAgICAgICB0aGlzLmJ1dHRvbjYudmFsdWUgPSBcIkRhd25cIjtcbiAgICAgICAgdGhpcy5idXR0b243ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7IFxuICAgICAgICB0aGlzLmJ1dHRvbjcudGV4dENvbnRlbnQgPSAnTmlnaHQgU3ByaXRlJzsgLy9OaWdodCAtIERhcmtcbiAgICAgICAgdGhpcy5idXR0b243LnZhbHVlID0gXCJOaWdodFwiO1xuICAgICAgICB0aGlzLmJ1dHRvbjggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b244LnRleHRDb250ZW50ID0gJ1dpbmQgU3ByaXRlICc7ICAvL1dpbmQgLSBTdG9ybVxuICAgICAgICB0aGlzLmJ1dHRvbjgudmFsdWUgPSBcIldpbmRcIjtcbiAgICAgICAgdGhpcy5idXR0b245ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7IFxuICAgICAgICB0aGlzLmJ1dHRvbjkudGV4dENvbnRlbnQgPSAnVGh1bmRlciBTcHJpdGUnOyAvL1RodW5kZXIgLSBMaWdodG5pbmcgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uOS52YWx1ZSA9IFwiVGh1bmRlclwiOyBcbiAgICAgICAgdGhpcy5idXR0b25YMiA9ICB0aGlzLmJ1dHRvblgxICsgdGhpcy5idXR0b25XaWR0aCsgdGhpcy5wYWRkaW5nIDsgXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy5idXR0b25YMSwgMF0sIFt0aGlzLmJ1dHRvblgxLDFdLCBbdGhpcy5idXR0b25YMSwyXSwgW3RoaXMuYnV0dG9uWDEsM10sICBbdGhpcy5idXR0b25YMSw0XSwgXG4gICAgICAgICAgICAgICAgIFt0aGlzLmJ1dHRvblgyLDBdLCBbdGhpcy5idXR0b25YMiwxXSwgW3RoaXMuYnV0dG9uWDIsMl0sIFt0aGlzLmJ1dHRvblgyLDNdLCBbdGhpcy5idXR0b25YMiw0XSAgXTsgXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24xLCB0aGlzLmJ1dHRvbjIsIHRoaXMuYnV0dG9uMywgdGhpcy5idXR0b240LCB0aGlzLmJ1dHRvbjEwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbjUsIHRoaXMuYnV0dG9uNiwgdGhpcy5idXR0b243LCB0aGlzLmJ1dHRvbjgsIHRoaXMuYnV0dG9uOV07IFxuICAgICAgIHRoaXMubm90ZSA9IFwiUHJlc3MgW1NdIHRvIGJ1eSwgW0FdIHRvIGNsb3NlIG1lbnVcIjsgXG4gICAgICAgXG5cbiAgICAgICAgdGhpcy5jb3N0UG9zaXRpb24gPSB0aGlzLmJ1dHRvblgyICsgdGhpcy5idXR0b25XaWR0aCsgMi41KnRoaXMucGFkZGluZzsgXG4gICAgICAgIHRoaXMuY29zdEhlaWdodCA9IDIwOyBcbiAgICAgICAgdGhpcy5jb3N0V2lkdGggPSAyNzU7IFxuICAgICAgICB0aGlzLmNvc3RQYWRkaW5nID0gNDsgXG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25YID0gMTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25ZID0gMTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvblRleHQgPSBbXTtcbiAgICAgICAgdGhpcy5wdXJjaGFzZURlc2NyaXB0aW9uID0gcmVxdWlyZSgnLi9wdXJjaGFzZS5qc29uJyk7IFxuXG4gICAgICAgIFxuICAgIH1cblxuICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5yZWRyYXcoY3R4KSwgdHJ1ZSk7IFxuICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJlZHJhdyhjdHgsIGdhbWUgKXtcbiAgICAgICAgbGV0IGJ1dHRvbkRyYXcgPSB0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgXG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGk8YnV0dG9uRHJhdyA7IGkrKyl7XG4gICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgMip0aGlzLnBhZGRpbmdZKyh0aGlzLmJ1dHRvbkhlaWdodCt0aGlzLnBhZGRpbmdZKSp0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4LCBnYW1lKVxuICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGdyYWRlRnVuY3Rpb25zKGdhbWUsIGJ1dHRvbil7XG4gICAgICAgIC8vcmVzdW1tb247XG4gICAgICAgIGlmIChnYW1lLnN0b3JhZ2UuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGJ1dHRvbi52YWx1ZSkpKXtcbiAgICAgICAgICAgIGdhbWUucmVzdW1tb24oYnV0dG9uLnZhbHVlKTtcbiAgICAgICAgICAgIGxldCB1bml0ID0gZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKTtcbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICAnVXBncmFkZSAnK3RoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsICcrdW5pdC5sZXZlbCsnKSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKSl7IC8vdXBncmFkZSBzdW1tb25zIFxuICAgICAgICAgICAgbGV0IHVuaXQgPSBnYW1lLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGJ1dHRvbi52YWx1ZSkpO1xuICAgICAgICAgICAgdW5pdC5sZXZlbFVwKGdhbWUucGxheWVyKTsgLy9hZGQgY29zdCBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuaXQubGV2ZWwpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodW5pdC5sZXZlbDw1KXtcbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICAnVXBncmFkZSAnK3RoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsICcrdW5pdC5sZXZlbCsnKSc7fVxuICAgICAgICAgICAgZWxzZSB7YnV0dG9uLnRleHRDb250ZW50ID0gIHRoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsICcrdW5pdC5sZXZlbCsnKScgfVxuICAgICAgICB9IFxuXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3VtbW9uTGlzdC5pbmNsdWRlcyhidXR0b24udmFsdWUpKXtcbiAgICAgICAgICAgIGlmIChidXR0b24udmFsdWUgIT0nbXVzaHJvb21LbmlnaHQnKXtcbiAgICAgICAgICAgICAgICBnYW1lLmNyZWF0ZU1vYihnYW1lLnBsYXllciwgYnV0dG9uLnZhbHVlLCAwLCBnYW1lKTsgLy9zdW1tb25zIDtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKSl7IC8vY2hlY2tzIGlmIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IFxuICAgICAgICAgICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAnVXBncmFkZSAnK3RoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsIDEpJztcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVsZW1lbnRMaXN0LmluY2x1ZGVzKGJ1dHRvbi52YWx1ZSkpe1xuICAgICAgICAgICAgICAgIGdhbWUuYWRkRWxlbWVudChidXR0b24udmFsdWUpOyAvL2VsZW1lbnRzXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIC8vIGVsc2UgaWYgKGJ1dHRvbi50ZXh0Q29udGVudD09J05leHQgV2F2ZSEnKSBnYW1lLm5leHRXYXZlID0gdHJ1ZTsgLy9uZXh0IHdhdmUgYnV0dG9uXG5cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICBcbiAgICAgICAgbGV0IGJ1dHRvbkRyYXcgPSB0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgXG4gICAgICAgIGlmICghZ2FtZS53YXZlRmluaXNoKXtidXR0b25EcmF3LT0xfTsgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPGJ1dHRvbkRyYXcgOyBpKyspe1xuICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLnBhZGRpbmdZKyh0aGlzLmJ1dHRvbkhlaWdodCt0aGlzLnBhZGRpbmdZKSp0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4LCBnYW1lKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zTGlzdFtpXS5mb2N1cygpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgdGhpcy5idXR0b25zTGlzdFtpXSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG5cbiAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgsIGdhbWUpeyAgIFxuICAgICAgICBsZXQgYnV0dG9uQ29sb3IgPSdzdGVlbGJsdWUnO1xuICAgICAgICBsZXQgdGV4dENvbG9yID0nd2hpdGUnO1xuICAgICAgICBsZXQgY29zdCA9IDA7IFxuICAgICAgICBpZiAoZ2FtZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5idXR0b25YMT09eCkgeyAvL3N1bW1vbiBidXR0b25zIC8vY2hlY2sgY29zdCAoaWYgZmlyc3Qgb3IgdXBncmFkZSlcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBlMS52YWx1ZSkpKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVuaXQgPSBnYW1lLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGUxLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvc3QgPSBnYW1lLnBsYXllci51cGdyYWRlQ29zdFt1bml0LmxldmVsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSAoIGNvc3QgPSBnYW1lLnBsYXllci5zdW1tb25Db3N0W2dhbWUucGxheWVyLnN1bW1vbkNvdW50XSk7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIubW9uZXk8IGNvc3Qpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29sb3IgPSAnbGlnaHRncmV5JztcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbG9yID0gJ2RhcmtncmV5JzsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5idXR0b25YMj09eCl7IC8vZWxlbWVudHNcbiAgICAgICAgICAgICAgICBjb3N0ID0gZ2FtZS5wbGF5ZXIuZWxlbWVudENvc3RbZ2FtZS5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXTtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIubW9uZXk8Z2FtZS5wbGF5ZXIuZWxlbWVudENvc3RbZ2FtZS5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXSB8fCBcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoID49NSl7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yID0gJ2xpZ2h0Z3JleSc7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvciA9ICdkYXJrZ3JleSc7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gYnV0dG9uQ29sb3I7ICAvL2J1dHRvbiBiYWNrZ3JvdW5kXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgY3R4LnJvdW5kUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQsIDMpOyBcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgIFxuICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQ7IFxuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IC8vYnV0dG9uIHRleHQgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0ZXh0Q29sb3I7XG4gICAgICAgIGlmIChnYW1lKXtcbiAgICAgICAgICAgICBpZiAoZ2FtZS5zdG9yYWdlLmxlbmd0aD4wKXtcblxuICAgICAgICAgICAgICAgIGxldCB0ZXN0ID0gZ2FtZS5zdG9yYWdlLmZpbmQob2JqPT4gb2JqLnR5cGU9PWUxLnZhbHVlKTsgXG4gICAgICAgICAgICAgICAgaWYgKHRlc3QpeyBcbiAgICAgICAgICAgICAgICAgICAgZTEudGV4dENvbnRlbnQgPSAnUmVzdW1tb24gTHZsICcrdGVzdC5sZXZlbCsnICcrdGhpcy5uYW1lSGFzaFtlMS52YWx1ZV07IFxuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gMDsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrdGhpcy5idXR0b25IZWlnaHQvMyk7IFxuICAgICAgICBpZiAoY29zdCAmJiBlMS52YWx1ZSE9J211c2hyb29tS25pZ2h0Jyl7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJygnK2Nvc3QrJyBtZXNvcyknLCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSsyKnRoaXMuYnV0dG9uSGVpZ2h0LzMpO31cbiAgICAgICAgLy9lbHNlIHsgY3R4LmZpbGxUZXh0KCdNQVgnLCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSsyKnRoaXMuYnV0dG9uSGVpZ2h0LzMpO31cblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vY29sbGlzaW9uIHBhdGggXG4gICAgICAgIGN0eC5yZWN0KHgseSwgdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQpOyBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdG9nZ2xlTWVudShnYW1lKXsgXG4gICAgICAgIHRoaXMuZGlzcGxheSA9ICF0aGlzLmRpc3BsYXk7IFxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5KXtnYW1lLnBhdXNlID0gdHJ1ZX1cbiAgICAgICAgZWxzZSBnYW1lLnBhdXNlID0gZmFsc2UgO1xuICAgIH1cblxuICAgIHB1cmNoYXNlKGdhbWUpe1xuICAgICAgICBsZXQgaSA9ICh0aGlzLnNlbGVjdGlvblgtMSkqNSArICh0aGlzLnNlbGVjdGlvblktMSk7XG4gICAgICAgIHRoaXMudXBncmFkZUZ1bmN0aW9ucyhnYW1lLCB0aGlzLmJ1dHRvbnNMaXN0W2ldKTsgXG4gICAgfVxuXG4gICAgc2VsZWN0ZWREZXNjcmlwKCl7XG4gICAgICAgIGxldCBpID0gKHRoaXMuc2VsZWN0aW9uWC0xKSo1ICsgKHRoaXMuc2VsZWN0aW9uWS0xKTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvblRleHQgPSB0aGlzLnB1cmNoYXNlRGVzY3JpcHRpb25bdGhpcy5idXR0b25zTGlzdFtpXS52YWx1ZV07IFxuICAgIH1cblxuICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5KXtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMyk7IC8vd2hpdGUgd2luZG93XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4LCBnYW1lKTsgLy9kcmF3IGJ1dHRvblxuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMjgyODI4XCI7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMuY29zdFBvc2l0aW9uLTIqdGhpcy5wYWRkaW5nLCAyKnRoaXMucGFkZGluZ1ksIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RXaWR0aCwgdGhpcy5jb3N0SGVpZ2h0KjExLCAzKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDI7IFxuXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vc2VsZWN0aW9uIFxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy5idXR0b25YMSArICh0aGlzLnNlbGVjdGlvblgtMSkqKHRoaXMuYnV0dG9uV2lkdGgrIHRoaXMucGFkZGluZyksIFxuICAgICAgICAgICAgICAgIDIqdGhpcy5wYWRkaW5nWSsodGhpcy5idXR0b25IZWlnaHQrdGhpcy5wYWRkaW5nWSkqKHRoaXMuc2VsZWN0aW9uWS0xKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25XaWR0aCx0aGlzLmJ1dHRvbkhlaWdodCwgMyk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREZXNjcmlwKCk7IC8vc2hvd3Mgc2VsZWN0ZWQgc3VtbW9uIGRldGFpbCBcbiAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmRlc2NyaXB0aW9uVGV4dC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuZGVzY3JpcHRpb25UZXh0W2ldLCB0aGlzLmNvc3RQb3NpdGlvbi0yNSxcbiAgICAgICAgICAgICAgICA2KnRoaXMucGFkZGluZ1krKHRoaXMuY29zdFBhZGRpbmcrdGhpcy5jb3N0SGVpZ2h0KSppKTsgXG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICAvL3N0YXRzICAgICAgICAgIHRoaXMuZGFtYWdlTXVsdGkgPSAxOyBcbiAgICAgICAgLy8gdGhpcy5waWNrdXBNdXRsaSA9IDE7XG4gICAgICAgIC8vIHRoaXMua25vY2tiYWNrTXVsdGkgPSAxO1xuICAgICAgICAvLyB0aGlzLnNwZWVkTXVsdGkgPSAxOyBcbiAgICAgICAgLy8gdGhpcy5waWVyY2UgPSAwOyBcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdEYW1hZ2U6IHgnK2dhbWUucGxheWVyLmRhbWFnZU11bHRpLnRvRml4ZWQoMSksIHRoaXMuY29zdFBvc2l0aW9uLTI1LCA2KnRoaXMucGFkZGluZ1krKHRoaXMuY29zdFBhZGRpbmcrdGhpcy5jb3N0SGVpZ2h0KSo3KTsgICAgICAgXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ1NwZWVkOiB4JytnYW1lLnBsYXllci5zcGVlZE11bHRpLnRvRml4ZWQoMSksIHRoaXMuY29zdFBvc2l0aW9uLTI1LCA2KnRoaXMucGFkZGluZ1krKHRoaXMuY29zdFBhZGRpbmcrdGhpcy5jb3N0SGVpZ2h0KSo3LjYpOyBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnS25vY2tiYWNrOiB4JytnYW1lLnBsYXllci5rbm9ja2JhY2tNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbi0yNSwgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqOC4yKTsgXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ1BpZXJjZTogJytnYW1lLnBsYXllci5waWVyY2UsIHRoaXMuY29zdFBvc2l0aW9uKzEwMCwgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqNyk7IFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdMb290IFJhZGl1czogeCcrZ2FtZS5wbGF5ZXIubG9vdE11bHRpLnRvRml4ZWQoMSksIHRoaXMuY29zdFBvc2l0aW9uKzEwMCwgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqNy42KTsgXG5cblxuICAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGU9ICdibGFjayc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5ub3RlLCB0aGlzLmJ1dHRvblgxKzEwLCB0aGlzLmhlaWdodC0xMCk7XG5cbiAgICAgICAgICAgIGlmIChnYW1lLmVycm9yKXtcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGU9ICdyZWQnO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnU3BhY2Ugb2NjdXBpZWQhJywgdGhpcy53aWR0aC0yMjAsIHRoaXMuaGVpZ2h0LTEwKTsgXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtnYW1lLmVycm9yPWZhbHNlO30sIFwiMzAwMFwiKSA7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51JykuaW5uZXJIVE1MPVwiXCI7fVxuICAgICAgICBcblxuXG4gICAgICAgICAgICBcbiAgICB9XG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSc7XG5cblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZVNjcmVlblwiKTsgLy8gZ2V0cyBjYW52YXMgZWxlbWVudFxubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyAvL2NyZWF0ZXMgMkQgcmVuZGVyaW5nIG9iamVjdFxuXG5jb25zdCBnYW1lV2lkdGggPSAxMDAwO1xuY29uc3QgZ2FtZUhlaWdodCA9IDUwMDtcblxubGV0IGdhbWUgPSBuZXcgR2FtZShnYW1lV2lkdGgsIGdhbWVIZWlnaHQpOyBcbmdhbWUuc3RhcnQoKTsgLy9jcmVhdGVzIGdhbWUgb2JqZWN0cztcblxuZnVuY3Rpb24gZ2FtZUxvb3AodGltZXN0YW1wKXtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwwLCBnYW1lV2lkdGgsIGdhbWVIZWlnaHQpOyAvL3JlZnJlc2ggc2NyZWVuXG4gICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXApO1xuICAgIGlmIChnYW1lLnRpdGxlRGlzcGxheSl7XG4gICAgICAgIGdhbWUudGl0bGVNZW51KGN0eCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmICghZ2FtZS5wYXVzZSApeyBnYW1lLnVwZGF0ZSh0aW1lc3RhbXApO1xuICAgICAgICB9XG4gICAgICAgIGdhbWUubmV4dFdhdmVMb2FkZXIoKTsgLy9sb2FkcyB3YXZlIGxpc3RcbiAgICAgICAgZ2FtZS53YXZlTG9hZGVyKCk7IC8vIGxvYWRzIGVhY2ggbW9iIGZyb20gd2F2ZSBsaXN0XG4gICAgICAgIC8vZ2FtZS5wYXVzZUhhbmRsZXIoKSBcbiAgICAgICAgXG4gICAgICAgIGdhbWUuZHJhdyhjdHgpOyBcbiAgICAgICAgZ2FtZS53YXZlQ2xlYXIoY3R4KTtcbiAgICAgICAgZ2FtZS5wYXVzZUhhbmRsZXIodGltZXN0YW1wLCBjdHgpOyBcbiAgICAgICAgZ2FtZS51cGdyYWRlTWVudShjdHgpO1xuICAgICAgICBnYW1lLm5leHRMZXZlbExvYWRlcihjdHgpOyAvL2lmIHdhdmUgbGlzdCBlbXB0eSwgbW92ZSB0byBuZXh0IGxldmVsXG4gICAgICAgIFxuICAgICAgICBnYW1lLnJlY2FsbENoZWNrKCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdhbWUuc2NyZWVuVHJhbnNpdGlvbihjdHgpO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTsgXG5cbn1cblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTsgXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=