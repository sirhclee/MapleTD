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
        this.money = 50;  //50
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
                ctx.fillText('Use arrow Keys for level', this.gameWidth/2,this.gameHeight/2+55); 
                ctx.fillText('Press any key to Start', this.gameWidth/2,this.gameHeight/2+75); 
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

module.exports = JSON.parse('{"target":{"speed":"0.1","health":"100","stand":0,"walk":5,"die":5,"angry":12,"sprite":"mob","spriteType":["stumpy"],"proj":"batball","atkSpd":300,"damage":1,"range":500,"value":100},"zombie":{"speed":"0.1","health":"1000","stand":2,"walk":2,"die":10,"angry":9,"sprite":"mob","atkSpd":100,"damage":1,"value":5},"spore":{"speed":"1","health":"2","stand":2,"walk":2,"die":3,"sprite":"mob","value":1},"orangeMushroom":{"speed":"1","health":"4","stand":1,"walk":2,"die":2,"sprite":"mob","value":5},"greenMushroom":{"speed":"2","health":"1","stand":1,"walk":2,"die":2,"sprite":"mob","value":3},"blueMushroom":{"speed":"1","health":"8","stand":1,"walk":2,"die":2,"sprite":"mob","value":10},"hornyMushroom":{"speed":"2","health":"3","stand":2,"walk":2,"die":3,"sprite":"mob","value":2},"mushmom":{"speed":"0.3","health":"250","stand":0,"walk":5,"die":5,"angry":12,"aggro":true,"sprite":"mob","boss":"true","yOff":-10,"atkSpd":200,"damage":1,"range":350,"value":[50,50,50,50,50]},"goldMushroom1":{"speed":"3","health":"3","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[20,20,20,20,20]},"stump":{"speed":"1","health":"10","stand":0,"walk":3,"die":2,"sprite":"mob","value":10},"darkStump":{"speed":"1","health":"18","stand":0,"walk":3,"die":2,"sprite":"mob","value":15},"axeStump":{"speed":"1","health":"15","stand":0,"walk":3,"die":3,"sprite":"mob","value":15},"ghostStump":{"speed":"0.75","health":"15","stand":0,"walk":3,"die":2,"angry":6,"aggro":true,"atkSpd":250,"damage":1,"range":600,"proj":"fireball","sprite":"mob","value":20},"boar":{"speed":"2.5","health":"10","stand":0,"walk":2,"die":1,"height2":18,"sprite":"mob","value":10},"fireBoar":{"speed":"3.5","health":"10","stand":0,"walk":2,"die":1,"sprite":"mob","height2":18,"value":15},"ironBoar":{"speed":"1.5","health":"30","stand":0,"walk":1,"die":1,"sprite":"mob","height2":18,"value":30},"goldMushroom2":{"speed":"3.5","health":"10","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[50,50,50,50,50]},"stumpy":{"speed":"0.5","health":"750","stand":0,"walk":5,"die":9,"angry":13,"aggro":true,"sprite":"mob","boss":"true","proj":"batball","atkSpd":100,"damage":5,"range":600,"value":[80,80,80,80,80]},"neckiJr":{"speed":"2.5","health":"10","stand":0,"walk":2,"die":2,"sprite":"mob","height":50,"height2":35,"width2":25,"value":15},"stirge":{"speed":"2.5","health":"20","stand":0,"walk":1,"die":3,"sprite":"mob","roam":true,"value":15},"bubbling":{"speed":"1.5","health":"20","stand":0,"walk":6,"die":3,"sprite":"mob","value":15},"octopus":{"speed":"3","health":"70","stand":0,"walk":4,"die":3,"sprite":"mob","weird":true,"value":20},"wraith":{"speed":"4","health":"70","stand":0,"walk":3,"die":5,"width2":-20,"damage":2,"sprite":"mob","flip":true,"roam":true,"value":50},"jrWraith":{"speed":"4","health":"35","stand":0,"walk":3,"die":5,"sprite":"mob","flip":true,"value":25},"shade":{"speed":"3","health":"200","stand":0,"walk":5,"die":5,"damage":999,"sprite":"mob","roam":true,"flip":true,"value":[100,100,100,100,100]},"goldMushroom3":{"speed":"3","health":"25","stand":1,"walk":2,"die":2,"sprite":"mob","spriteType":["goldMushroom"],"value":[100,100,100,100,100]}}');

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
    setTimeout( function() {


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

    requestAnimationFrame(gameLoop);}, 1000 / 70); 

}

requestAnimationFrame(gameLoop); 

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUNBQXFDOztBQUVyQzs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2FkZS8uL3NyYy9IVUQuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL1Nwcml0ZUFuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvZW5kU2NyZWVuLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9pbWcuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2lucHV0LmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9tb2IuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL21vbmV5LmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3Jlc3RhcnRTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3N0YXJ0U2NyZWVuLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy90aXRsZVNjcmVlbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvdXBncmFkZS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXJjYWRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFVEe1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgMTUwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDc1OyBcbiAgICAgICAgdGhpcy54ID0gMDsgXG4gICAgICAgIHRoaXMueSA9IDA7IFxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyMDsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgIH1cblxuICAgIGRpc3BsYXlIVUQoY3R4LCBnYW1lKXtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JzsgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSdibGFjayc7XG4gICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuXG4gICAgICAgIHRoaXMubGl2ZXMgPSBcIkxpdmVzOiBcIiArIGdhbWUucGxheWVyLmhlYWx0aDsgXG4gICAgICAgIHRoaXMubW9uZXkgPSBcIk1lc29zOiBcIiArIGdhbWUucGxheWVyLm1vbmV5O1xuICAgICAgICB0aGlzLnN0YWdlID0gXCJXYXZlOiBcIiArIGdhbWUubGV2ZWwgKyAnLScgKyBnYW1lLndhdmU7IFxuICAgICAgICB0aGlzLnRleHQgPSBbdGhpcy5saXZlcywgdGhpcy5tb25leSwgdGhpcy5zdGFnZV07IFxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudGV4dC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy50ZXh0W2ldLCB0aGlzLngrdGhpcy5wYWRkaW5nLCB0aGlzLnkrdGhpcy5wYWRkaW5nKigxK2kpLCB0aGlzLndpZHRoKTsgXG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsImltcG9ydCBpbWcgZnJvbSAnLi9pbWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVBbmltYXRpb257XG4gICAgaW1hZ2VzID0gW107XG4gICAgY29uc3RydWN0b3IoZmlsZU5hbWUsIG51bWJlck9mSW1hZ2VzLCB0aW1lckNvdW50LCBzdGF0ZSwgc3RvcCl7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPD1udW1iZXJPZkltYWdlczsgaSsrKXsgLy8gbG9hZHMgaW1hZ2VzIGludG8gYXJyYXkgXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGltZyhmaWxlTmFtZS5yZXBsYWNlKFwiP1wiLCBpKSk7IFxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChpbWFnZSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50aW1lckNvdW50ID0gdGltZXJDb3VudDtcbiAgICAgICAgdGhpcy50aW1lckNvdW50RGVmYXVsdCA9IHRoaXMudGltZXJDb3VudDsgXG4gICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7IFxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7IFxuICAgICAgICB0aGlzLnN0b3AgPSBzdG9wOyBcbiAgICB9XG4gICAgXG4gICAgaXNGb3Ioc3RhdGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gc3RhdGU7IFxuICAgIH1cblxuICAgIHJlc2V0KCl7IC8vIGxvb3AgYW5pbWF0aW9uXG4gICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7ICAgXG4gICAgfVxuXG4gICAgZ2V0RnJhbWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VJbmRleDsgXG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UocGF1c2UpeyAgLy9yZXR1cm5zIGZyYW1lXG4gICAgICAgIHRoaXMuc2V0SW1hZ2VJbmRleChwYXVzZSk7IFxuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZXNbdGhpcy5pbWFnZUluZGV4XTsgXG4gICAgfVxuXG4gICAgc2V0SW1hZ2VJbmRleChwYXVzZSl7XG4gICAgICAgIHRoaXMudGltZXJDb3VudC0tO1xuICAgICAgICBpZiAodGhpcy50aW1lckNvdW50IDw9IDAgJiYgIXRoaXMuc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgIHRoaXMudGltZXJDb3VudD0gdGhpcy50aW1lckNvdW50RGVmYXVsdDsgXG4gICAgICAgICAgICBpZiAoIXBhdXNlKSB7dGhpcy5pbWFnZUluZGV4Kys7fSAvL2FuaW1hdGUgb25seSB3aGVuIHVucGF1c2VkXG4gICAgICAgICAgICBpZiAodGhpcy5pbWFnZUluZGV4ID49IHRoaXMuaW1hZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUluZGV4ID0gMDsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRTdG9wKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3AgICYmIHRoaXMuaW1hZ2VJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoLTFcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBlbmRTY3JlZW57XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMjAwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwOyBcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyNTsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQyID0gXCIyNHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7IFxuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1JldHVybiB0byBNYWluJztcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMuZ2FtZVdpZHRoLzI7XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSAyNTA7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzA7IFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3RhdHMxID0gW107XG4gICAgICAgIHRoaXMuc3RhdHMyID0gW107XG4gICAgICAgIHRoaXMuc3RhdFBvc2l0aW9uID0gdGhpcy54OyAvL3N0YXJ0aW5nIHggXG4gICAgICAgIHRoaXMuc3RhdEhlaWdodCA9IDIwO1xuICAgICAgICB0aGlzLnN0YXRXaWR0aCA9IDIwMDtcblxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMueCsodGhpcy53aWR0aC10aGlzLmJ1dHRvbldpZHRoKS8yLCB0aGlzLmhlaWdodC10aGlzLmJ1dHRvbkhlaWdodC10aGlzLnBhZGRpbmddXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjFdXG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpOyAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcmVkcmF3KGN0eCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRGdW5jdGlvbnMoZ2FtZSl7XG4gICAgICAgICAgICBnYW1lLm5leHRXYXZlID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgIH1cblxuICAgICAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgLy8gdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2FtZU92ZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5mYWRlT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7Z2FtZS50aXRsZURpc3BsYXkgPSB0cnVlfSwgXCIyMDAwXCIpfSAvLyBmYWRlIG91dCB0cmFuc2l0aW9uIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7Z2FtZS5sZXZlbEZpbmlzaCA9IHRydWU7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4KXsgICBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnc3RlZWxibHVlJzsgLy9kcmF3IGJvcmRlclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL3NldHMgYXJlYSBmb3IgY29sbGlzaW9uIChpc1BvaW50SW5QYXRoKVxuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQsIDIpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyAvL2RyYXcgdGV4dCBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGUxLnRleHRDb250ZW50LCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSt0aGlzLmJ1dHRvbkhlaWdodC8yKTsgXG4gICAgICAgIH1cblxuICAgICAgICBsb2FkU3RhdHMoZ2FtZSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRzMSA9IFtbICdNb25zdGVycyBEZWZlYXRlZDogJysgZ2FtZS5tb25zdGVyS2lsbF0sXG4gICAgICAgICAgICAgICAgICAgIFsnTW9uc3RlcnMgRXNjYXBlZDogJysgZ2FtZS5tb25zdGVyRXNjYXBlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTWVzb3MgQ29sbGVjdGVkOiAnKyBnYW1lLm1vbmV5Q29sbGVjdGVkXSxbJ01lc29zIExvc3Q6ICcrIGdhbWUubW9uZXlMb3N0XVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN0YXRzMiA9IFtdXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9iaiBvZiBnYW1lLnBsYXllck9iamVjdHMpe1xuICAgICAgICAgICAgICAgIGxldCBzdGF0c09iaiA9ICcnXG4gICAgICAgICAgICAgICAgaWYgKG9iai50eXBlID09ICdncmVlbkRyYWdvbicpeyAvL2FkZCBwb2lzb25cbiAgICAgICAgICAgICAgICAgICAgc3RhdHNPYmogPSAgW29iai5uYW1lKycgRGFtYWdlOiAnKyBvYmouZGFtYWdlRGVhbHQudG9GaXhlZCgwKSArIFwiICgrXCIrIGdhbWUucG9pc29uRGFtYWdlLnRvRml4ZWQoMCkrICcpJ107IH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmoudHlwZSA9PSAncmVkRHJhZ29uJyB8fCBvYmoudHlwZSA9PSAnYmxhY2tEcmFnb24nKXsgLy9leHBsb2RlIGRhbWFnZSBcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNPYmogPSAgW29iai5uYW1lKycgRGFtYWdlOiAnKyBvYmouZGFtYWdlRGVhbHQudG9GaXhlZCgwKSArIFwiICgrXCIrIG9iai5leHBsb2RlRGFtYWdlRGVhbHQudG9GaXhlZCgwKSsgJyknXTsgfVxuICAgICAgICAgICAgICAgIGVsc2Uge3N0YXRzT2JqID0gIFtvYmoubmFtZSsnIERhbWFnZTogJysgb2JqLmRhbWFnZURlYWx0LnRvRml4ZWQoMCldOyB9XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0czIucHVzaChzdGF0c09iaik7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgIFxuXG4gICAgICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDIpO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lT3Zlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdHYW1lIE92ZXIhJywgdGhpcy5nYW1lV2lkdGgvMiwgMjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4KTsgLy9yZXR1cm4gdG8gbWFpbiBidXR0b24gXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUud2F2ZUZpbmlzaCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dDE9Jyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dDI9Jyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbCA9PSBnYW1lLmZpbmFsTGV2ZWwgJiYgZ2FtZS5sZXZlbExpc3QubGVuZ3RoID09IDApeyAvL2ZpbmFsIGxldmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDE9ICdGaW5hbCBMZXZlbCBDbGVhciEnICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDI9ICdUaGFua3MgZm9yIHBsYXlpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4KTt9IC8vcmV0dXJuIHRvIG1haW4gYnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbExpc3QubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0MT0nTGV2ZWwgJyArZ2FtZS5sZXZlbCsgJyBDbGVhciEnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgdGV4dDE9J1dhdmUgQ2xlYXIhJzt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDIgPSAnUHJlc3MgW0RdIHRvIHN0YXJ0IG5leHQgd2F2ZSEnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0MSwgdGhpcy5nYW1lV2lkdGgvMiwgMjUpXG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQyLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmhlaWdodC0xMCkvL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcblxuXG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdzdGFydCc7IC8vc3RhdHMgXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQ7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU3RhdHMoZ2FtZSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc3RhdHMxLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqPHRoaXMuc3RhdHMxW2ldLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnN0YXRzMVtpXVtqXSwgdGhpcy5wYWRkaW5nK3RoaXMuc3RhdFBvc2l0aW9uKyh0aGlzLnN0YXRXaWR0aC80KSpqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI1KyB0aGlzLnBhZGRpbmcrKHRoaXMuc3RhdEhlaWdodCkqaSwgMzAwICk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ICAgIFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnN0YXRzMi5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajx0aGlzLnN0YXRzMltpXS5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5zdGF0czJbaV1bal0sIHRoaXMucGFkZGluZyt0aGlzLnN0YXRQb3NpdGlvbit0aGlzLnN0YXRXaWR0aCoxLjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMjUrIHRoaXMucGFkZGluZysodGhpcy5zdGF0SGVpZ2h0KSppLCAzMDAgKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH1cbn1cbiIsImltcG9ydCBJbnB1dEhhbmRsZXIgZnJvbSAnLi9pbnB1dCc7IFxuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7IFxuaW1wb3J0IE1vYiBmcm9tICcuL21vYic7XG5pbXBvcnQgVXBncmFkZSBmcm9tICcuL3VwZ3JhZGUnOyBcbmltcG9ydCBNb25leSBmcm9tICcuL21vbmV5JzsgXG5pbXBvcnQgc3RhcnRTY3JlZW4gZnJvbSAnLi9zdGFydFNjcmVlbic7IFxuaW1wb3J0IHRpdGxlU2NyZWVuIGZyb20gJy4vdGl0bGVTY3JlZW4nOyBcbmltcG9ydCByZXN0YXJ0U2NyZWVuIGZyb20gJy4vcmVzdGFydFNjcmVlbic7IFxuaW1wb3J0IGVuZFNjcmVlbiBmcm9tICcuL2VuZFNjcmVlbic7IFxuaW1wb3J0IEhVRCBmcm9tICcuL0hVRCc7IFxuaW1wb3J0IGltZyBmcm9tICcuL2ltZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWV7XG4gICAgY29uc3RydWN0b3IoZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KXtcbiAgICAgICAgdGhpcy5ub3RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMudGl0bGUgPSBuZXcgdGl0bGVTY3JlZW4odGhpcyk7IFxuICAgICAgICB0aGlzLnRpdGxlLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgIHRoaXMuZW5kID0gbmV3IGVuZFNjcmVlbih0aGlzKTsgXG4gICAgICAgIHRoaXMuZW5kLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgIHRoaXMucmVzdGFydCA9IG5ldyByZXN0YXJ0U2NyZWVuKHRoaXMpOyBcbiAgICAgICAgdGhpcy5yZXN0YXJ0LmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucmVzdGFydFdpbmRvdyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpdGxlRGlzcGxheSA9IHRydWU7Ly9mYWxzZTsgLy9lbmFibGUgZm9yIHJlbGVhc2VcbiAgICAgICAgdGhpcy5sb2FkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9W107XG4gICAgICAgIHRoaXMubW9iT2JqZWN0cyA9W107IFxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cyA9IFtdOyBcbiAgICAgICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgICAgIHRoaXMuZmluYWxMZXZlbCA9MyA7IFxuICAgICAgICB0aGlzLndhdmUgPSAwOyBcbiAgICAgICAgdGhpcy5sYW5lID0gMTsgXG4gICAgICAgIHRoaXMuYmdTa3kgPSBpbWcoJ2JnL2JnU2t5Jyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgIHRoaXMuYmdTdGFnZSA9IGltZygnYmcvYmdTdGFnZScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLndhdmVJbmZvID0gcmVxdWlyZSgnLi93YXZlSW5mby5qc29uJyk7XG4gICAgICAgIHRoaXMud2F2ZU5vdGVzID0gcmVxdWlyZSgnLi93YXZlTm90ZXMuanNvbicpO1xuICAgICAgICB0aGlzLmxldmVsTm90ZSA9ICcnOyBcbiAgICAgICAgdGhpcy5sZXZlbExpc3QgPSBbLi4udGhpcy53YXZlSW5mb1snbGV2ZWwnK3RoaXMubGV2ZWxdXTsvL3sxOiBbJ3dhdmUxLTUnLCAnd2F2ZTEtMSddfSAvL0pTT05cbiAgICAgICAgdGhpcy53YXZlTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnRvTG9hZCA9W107IFxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IDkwOyAvL2xhbmUgc2l6ZVxuICAgICAgICB0aGlzLm5leHRXYXZlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmxldmVsU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53YXZlRmluaXNoID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMubGV2ZWxGaW5pc2ggPSBmYWxzZSA7IC8vY2xvc2Ugc3RhdHMgbWVudVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ub3RlVGltZSA9IDA7IFxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gMDsgLy9wbGF5ZWQgZ2FtZSB0aW1lIGZvciBldmVudHM7IFxuICAgICAgICB0aGlzLmdhbWVUaW1lUmVhbCA9IDA7IC8vdHJhY2tzIHRpbWUgYWdhaW5zdCBwYXVzZXMgXG4gICAgICAgIHRoaXMucGF1c2VkVGltZSA9IDA7IFxuICAgICAgICB0aGlzLnRpbWVPZmZzZXQgPSAwXG4gICAgICAgIHRoaXMudGltZU9mZnNldFN1bSA9IDA7IFxuICAgICAgICB0aGlzLnNldFBvaW50ID0gZmFsc2U7IFxuXG4gICAgICAgIHRoaXMuZmFkZSA9IDA7XG4gICAgICAgIHRoaXMuZmFkZUluID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmFkZU91dCA9IGZhbHNlIDtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gW107IFxuICAgICAgICB0aGlzLmVycm9yID0gZmFsc2U7IFxuICAgICAgICB0aGlzLm1vYkNvdW50ID0gMCA7IFxuXG4gICAgICAgIHRoaXMucG9pc29uRGFtYWdlID0gMDsgXG4gICAgICAgIHRoaXMubW9uc3RlcktpbGwgPSAwOyBcbiAgICAgICAgdGhpcy5tb25zdGVyRXNjYXBlID0gMDtcbiAgICAgICAgdGhpcy5kYW1hZ2VEZWFsdCA9IHt9OyBcbiAgICAgICAgdGhpcy5tb25leUNvbGxlY3RlZCA9IDA7XG4gICAgICAgIHRoaXMubW9uZXlMb3N0ID0gMDsgXG4gICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZT1mYWxzZTtcblxuICAgIH1cblxuICAgIHBhdXNlSGFuZGxlcih0aW1lLCBjdHgpe1xuXG4gICAgICAgIGlmICh0aGlzLnBhdXNlICl7IC8vc25hcHMgd2hlbiB0aW1lIGlzIHBhdXNlZDsgXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0UG9pbnQpe1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2VkVGltZSA9IHRpbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb2ludCA9IHRydWU7IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7dGhpcy50aW1lT2Zmc2V0ID0gdGltZSAtIHRoaXMucGF1c2VkVGltZX0gLy9ydW5zIHVwIG9mZnNldCB2YWx1ZSBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGdyYWRlLmRpc3BsYXkgPSBmYWxzZSA7XG4gICAgICAgICAgICB0aGlzLnRpbWVPZmZzZXRTdW0rPSB0aGlzLnRpbWVPZmZzZXQ7IC8vc3VtIG9mIG9mZnNldCB2YWx1ZXMgXG4gICAgICAgICAgICB0aGlzLnRpbWVPZmZzZXQgPSAwOyAgLy9yZXNldCBcbiAgICAgICAgICAgIHRoaXMuZ2FtZVRpbWVSZWFsID0gdGltZSAtdGhpcy50aW1lT2Zmc2V0U3VtOyAvL2FwcGx5IG9mZnNldCBzdW1cbiAgICAgICAgICAgIHRoaXMuc2V0UG9pbnQgPSBmYWxzZTsgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGF1c2Upe1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC42XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCx0aGlzLmdhbWVXaWR0aCwgdGhpcy5nYW1lSGVpZ2h0KTsgXG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMudXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IFwiMTZweCBhcmlhbFwiOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnUHJlc3MgRVNDIHRvIHVucGF1c2UnLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmdhbWVIZWlnaHQvMisyMCkgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVQYXVzZSgpeyAgIFxuICAgICAgICB0aGlzLnBhdXNlID0gIXRoaXMucGF1c2U7IFxuICAgIH1cblxuICAgIHJlc2V0RXZlcnl0aGluZygpe1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnJlc3RhcnRXaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aXRsZURpc3BsYXkgPSBmYWxzZTsgLy9lbmFibGUgZm9yIHJlbGVhc2VcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSBbXTsgXG4gICAgICAgIHRoaXMud2F2ZSA9IDA7IFxuICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICB0aGlzLmJnU3RhZ2UgPSBpbWcoJ2JnL2JnU3RhZ2UnK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53YXZlSW5mbyA9IHJlcXVpcmUoJy4vd2F2ZUluZm8uanNvbicpO1xuICAgICAgICB0aGlzLmxldmVsTGlzdCA9IFsuLi50aGlzLndhdmVJbmZvWydsZXZlbCcrdGhpcy5sZXZlbF1dOy8vezE6IFsnd2F2ZTEtNScsICd3YXZlMS0xJ119IC8vSlNPTlxuXG4gICAgICAgIHRoaXMud2F2ZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy50b0xvYWQgPVtdOyBcbiAgICAgICAgdGhpcy5uZXh0V2F2ZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy53YXZlRmluaXNoID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMubGV2ZWxGaW5pc2ggPSBmYWxzZSA7IC8vY2xvc2Ugc3RhdHMgbWVudVxuICAgICAgICAvL3RoaXMuZ2FtZVRpbWUgPSAwOyBcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gW107IFxuICAgICAgICB0aGlzLnBvaXNvbkRhbWFnZSA9IDA7IFxuICAgICAgICB0aGlzLm1vbnN0ZXJLaWxsID0gMDsgXG4gICAgICAgIHRoaXMubW9uc3RlckVzY2FwZSA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlRGVhbHQgPSB7fTsgXG4gICAgICAgIHRoaXMubW9uZXlDb2xsZWN0ZWQgPSAwO1xuICAgICAgICB0aGlzLm1vbmV5TG9zdCA9IDA7IFxuICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2U9ZmFsc2U7XG4gICAgICAgIHRoaXMubG9hZEJHKCk7XG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9IFt0aGlzLnBsYXllcl07XG4gICAgfVxuICAgIFxuICAgIHRpdGxlTWVudShjdHgpeyBcblxuICAgICAgICB0aGlzLnRpdGxlLmRpc3BsYXlNZW51KGN0eCwgdGhpcyk7IFxuICAgIH1cblxuICAgIHdhdmVDbGVhcihjdHgpeyAvLyBjaGVja3MgaWYgd2F2ZSBpcyBjbGVhcmVkXG4gICAgICAgIGlmICghdGhpcy5uZXh0V2F2ZSAmJiB0aGlzLndhdmVTdGFydCAmJiB0aGlzLmxldmVsU3RhcnQgJiYgXG4gICAgICAgICAgICB0aGlzLnRvTG9hZC5sZW5ndGggPT0gMCAgJiYgdGhpcy5tb2JPYmplY3RzLmxlbmd0aD09MCApe1xuICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmVuZC5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW5kLmRpc3BsYXlNZW51KGN0eCwgdGhpcyk7XG4gICAgICAgIH0gXG4gICAgfVxuICAgIG5leHRMZXZlbExvYWRlcihjdHgpe1xuICAgICAgICBpZiAodGhpcy5sZXZlbExpc3QubGVuZ3RoID09IDAgJiYgdGhpcy53YXZlRmluaXNoKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsRmluaXNoKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09dGhpcy5maW5hbExldmVsKXsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWRlT3V0ID0gdHJ1ZX0sIFwiMjAwMFwiKSAvLyBmYWRlIG91dCB0cmFuc2l0aW9uXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHsgLy9sb2FkIG5leHQgY29udGVudFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsKys7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxMaXN0ID0gWy4uLnRoaXMud2F2ZUluZm9bJ2xldmVsJyt0aGlzLmxldmVsXV07IC8vIGxvYWQgbmV4dCBsZXZlbCB3YXZlc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsRmluaXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F2ZSA9IDA7ICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZ1NreSA9IGltZygnYmcvYmdTa3knK3RoaXMubGV2ZWwrJy5wbmcnKTsgLy9yZWxvYWQgQkcgYXJ0IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnU3RhZ2UgPSBpbWcoJ2JnL2JnU3RhZ2UnK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSBbXTsgLy9jbGVhciBmbG9vciBtb25leSBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFdhdmUgID0gZmFsc2UgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5sZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxhbmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvbiA9IHt4OjI1LCB5OnRoaXMuZ2FtZUhlaWdodCAtIDQ1IC0gMip0aGlzLnBsYXllci5yb3dIZWlnaHR9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5mbG9vciA9IHRoaXMuZ2FtZUhlaWdodCAtIDQ1IC0gKDErdGhpcy5wbGF5ZXIubGFuZSkqdGhpcy5wbGF5ZXIucm93SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSB0aGlzLnBsYXllck9iamVjdHMuc3BsaWNlKDEpOyAgLy9wdWxscyBldmVyeXRoaW5nIGV4cGVjdCBwbGF5ZXJcbiAgICAgICAgICAgICAgICB9LCBcIjQwMDBcIik7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHRXYXZlTG9hZGVyKCl7XG4gICAgICAgIGlmICh0aGlzLm5leHRXYXZlKXsgLy9sb2FkIG5leHQgd2F2ZSBkYXRhIGZyb20gSlNPTlxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxMaXN0Lmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVMaXN0ID0gWy4uLnRoaXMud2F2ZUluZm9bdGhpcy5sZXZlbExpc3Quc2hpZnQoKV1dOyAvL1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVRpbWUgPSB0aGlzLmdhbWVUaW1lUmVhbDsgLy9zdGFydCBvZiB3YXZlO1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgIHRoaXMud2F2ZSArKzsgXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0V2F2ZSA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGUuZGlzcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IGZhbHNlOyBcblxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2F2ZU5vdGVzWyd3YXZlJyt0aGlzLmxldmVsKyctJyt0aGlzLndhdmVdKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbE5vdGUgPSB0aGlzLndhdmVOb3Rlc1snd2F2ZScrdGhpcy5sZXZlbCsnLScrdGhpcy53YXZlXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RlVGltZSA9IHRoaXMuZ2FtZVRpbWVSZWFsOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHRoaXMubGV2ZWxGaW5pc2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2NyZWVuVHJhbnNpdGlvbihjdHgpe1xuICAgICAgICBpZiAodGhpcy5mYWRlSW4peyAvL2ZhZGUgaW4gXG4gICAgICAgICAgICBpZiAodGhpcy5mYWRlPjApe1xuICAgICAgICAgICAgICAgIHRoaXMuZmFkZSAtPSAwLjAzOyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWRlIDw9IDApIHt0aGlzLmZhZGVJbiA9IGZhbHNlO31cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmFkZU91dCl7IC8vZmFkZSB0byBibGFja1xuICAgICAgICAgICAgaWYgKHRoaXMuZmFkZSA8IDEpeyAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmZhZGUgKz0gMC4wMzsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFkZSA+PSAxKSB7IFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWRlSW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWRlT3V0ID0gZmFsc2U7fSwgXCIxNTAwXCIpfVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mYWRlSW4gfHwgdGhpcy5mYWRlT3V0KXtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmZhZGU7IFxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuZ2FtZVdpZHRoLCB0aGlzLmdhbWVIZWlnaHQpOyBcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICB3YXZlTG9hZGVyKCl7Ly9sb2FkZHMgZWFjaCBtb2IgZnJvbSB3YXZlTGlzdFxuICAgICAgICBpZiAodGhpcy50b0xvYWQubGVuZ3RoID09IDAgJiYgdGhpcy53YXZlTGlzdC5sZW5ndGg+MCkge3RoaXMudG9Mb2FkID0gdGhpcy53YXZlTGlzdC5zaGlmdCgpO31cbiAgICAgICAgaWYgKHRoaXMudG9Mb2FkWzJdIDw9ICAodGhpcy5nYW1lVGltZVJlYWwgLSB0aGlzLmdhbWVUaW1lKS8xMDAwICl7XG4gICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5sZXZlbFN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRvTG9hZFsxXS5sZW5ndGg+MCl7IC8vbXVsdGlwbGUgZW50cmllcyBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy50b0xvYWRbMV0ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhbmUgPSB0aGlzLnRvTG9hZFsxXVtpXTsgLy9zZXRzIGxhbmUgdG8gbG9hZFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vYih0aGlzLCB0aGlzLnRvTG9hZFswXSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9iQ291bnQgKys7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5sYW5lID0gdGhpcy50b0xvYWRbMV0tMTsgLy9zZXRzIGxhbmUgdG8gbG9hZFxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9iKHRoaXMsIHRoaXMudG9Mb2FkWzBdLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vYkNvdW50ICsrOyB9ICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMudG9Mb2FkID0gW107IFxuICAgICAgICB9IFxuXG4gICAgfSAgICBcbiAgICBcbiAgICBhZGRFbGVtZW50KGVsZW1lbnQpeyAvL3VwZ3JhZGUgc2hvcCBcbiAgICAgICBpZiAodGhpcy5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoPDUpe1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLm1vbmV5PiB0aGlzLnBsYXllci5lbGVtZW50Q29zdFt0aGlzLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGhdKXtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5tb25leSAtPSB0aGlzLnBsYXllci5lbGVtZW50Q29zdFt0aGlzLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGhdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmVsZW1lbnRMaXN0LnB1c2goZWxlbWVudCk7IFxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmVsZW1lbnRhbHMoKTsgLy9sb2FkIHNwcml0ZXNcbiAgICAgICAgICAgICAgICAvL2FwcGx5IHVwZ3JhZGVzXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gJ0JsYXplJyl7dGhpcy5wbGF5ZXIuZGFtYWdlTXVsdGkrPTAuNCB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT1cIkRhd25cIil7dGhpcy5wbGF5ZXIubG9vdE11bHRpKz0wLjU7IHRoaXMucGxheWVyLmRhbWFnZU11bHRpKz0wLjIgfTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSdOaWdodCcpe3RoaXMucGxheWVyLmtub2NrYmFja011bHRpKz0wLjI7IHRoaXMucGxheWVyLmRhbWFnZU11bHRpKz0wLjJ9O1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09J1dpbmQnKXt0aGlzLnBsYXllci5zcGVlZE11bHRpKz0wLjJ9O1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09J1RodW5kZXInKXt0aGlzLnBsYXllci5waWVyY2UrPTE7dGhpcy5wbGF5ZXIuZGFtYWdlTXVsdGkrPTAuMiB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN1bW1vbih0eXBlKXtcbiAgICAgICAgbGV0IHRyYW5zZmVyID0gdGhpcy5zdG9yYWdlLmZpbmRJbmRleChvYmo9Pm9iai50eXBlID09PSB0eXBlKTsgXG4gICAgICAgIHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0ucG9zaXRpb24ueCA9ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yO1xuICAgICAgICB0aGlzLnN0b3JhZ2VbdHJhbnNmZXJdLnBvc2l0aW9uLnkgPSAodGhpcy5wbGF5ZXIuZmxvb3IrMzApOyBcbiAgICAgICAgdGhpcy5zdG9yYWdlW3RyYW5zZmVyXS5sYW5lID0gdGhpcy5wbGF5ZXIubGFuZTtcblxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaCh0aGlzLnN0b3JhZ2VbdHJhbnNmZXJdKTsgLy9jb3BpZXMgb2JqZWN0IHRvIGxpc3RcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNwbGljZSh0cmFuc2Zlcik7IC8vZGVsZXRlcyBvYmplY3QgZnJvbSBzdG9yYWdlXG4gICAgfVxuICAgIHJlY2FsbENoZWNrKCl7XG4gICAgICAgIGlmICghdGhpcy5yZWNhbGxTdG9yYWdlICAmJiB0aGlzLnN0b3JhZ2VbMF0pe1xuICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gdGhpcy5zdG9yYWdlLnNoaWZ0KCkgO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlY2FsbCgpeyAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5yZWNhbGxTdG9yYWdlKXtcbiAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IHRoaXMucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoucG9zaXRpb24ueS0zMCA9PT0gdGhpcy5wbGF5ZXIuZmxvb3IpJiYgIC8vY2hlY2tzIGZvciBleGlzdGluZyB1bml0IFxuICAgICAgICAgICAgKG9iai5wb3NpdGlvbi54ID09PSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMikgJiYgKG9iai5uYW1lIT09J1dpeicgKSlcblxuICAgICAgICAgICAgaWYgKHRoaXMucmVjYWxsU3RvcmFnZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IHRoaXMucmVjYWxsU3RvcmFnZS50eXBlO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9IHRoaXMucGxheWVyT2JqZWN0cy5maWx0ZXIoICBcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC50eXBlICE9IHR5cGU7IH0pOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai5wb3NpdGlvbi55LTMwID09PSB0aGlzLnBsYXllci5mbG9vcikgJiYgIC8vY2hlY2tzIGZvciBleGlzdGluZyB1bml0IFxuICAgICAgICAgICAgKG9iai5wb3NpdGlvbi54ID09PSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMikgJiYgKG9iai5uYW1lIT09J1dpeicpKSl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZS5wb3NpdGlvbi54ID0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzI7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLnBvc2l0aW9uLnkgPSAodGhpcy5wbGF5ZXIuZmxvb3IrMzApOyBcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UubGVmdCA9ICh0aGlzLnBsYXllci5sZWZ0KTsgXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLmxhbmUgPSAodGhpcy5wbGF5ZXIubGFuZSk7IFxuXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2godGhpcy5yZWNhbGxTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICAvLyBpZiAoIXRoaXMucmVjYWxsU3RvcmFnZSl7XG4gICAgICAgIC8vICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UgPSB0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSYmICAvL2NoZWNrcyBmb3IgZXhpc3RpbmcgdW5pdCBcbiAgICAgICAgLy8gICAgIChvYmoucG9zaXRpb24ueCA9PT0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzIpICYmIChvYmoubmFtZSE9PSdXaXonICkpXG5cbiAgICAgICAgLy8gICAgIGlmICh0aGlzLnJlY2FsbFN0b3JhZ2UpXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IHR5cGUgPSB0aGlzLnJlY2FsbFN0b3JhZ2UudHlwZTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnBsYXllck9iamVjdHMgPSB0aGlzLnBsYXllck9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGxvb3RlZCBjb2luc1xuICAgICAgICAvLyAgICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LnR5cGUgIT0gdHlwZTsgfSk7ICAgIFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLnBvc2l0aW9uLnggPSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMjtcbiAgICAgICAgLy8gICAgIHRoaXMucmVjYWxsU3RvcmFnZS5wb3NpdGlvbi55ID0gKHRoaXMucGxheWVyLmZsb29yKzMwKTsgXG5cbiAgICAgICAgLy8gICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKHRoaXMucmVjYWxsU3RvcmFnZSk7XG4gICAgICAgIC8vICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UgPSBmYWxzZTtcbiAgICAgICAgLy8gfVxuXG5cbiAgICB9XG5cbiAgICBjcmVhdGVNb2IocGFyZW50LCB0eXBlLCBzaWRlLCBnYW1lID0gbnVsbCApe1xuICAgICAgICBpZiAoc2lkZSA9PT0gMCl7IC8vU3VtbW9uIHVuaXRcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai5wb3NpdGlvbi55LTMwID09PSB0aGlzLnBsYXllci5mbG9vcikgJiYgIC8vY2hlY2tzIGZvciBleGlzdGluZyB1bml0IFxuICAgICAgICAgICAgKG9iai5wb3NpdGlvbi54ID09PSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMikgJiYgKG9iai5uYW1lIT09J1dpeicpKSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGNvc3QgPSAxMDAwOyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuc3VtbW9uQ29zdFt0aGlzLnBsYXllci5zdW1tb25Db3VudF0peyBcbiAgICAgICAgICAgICAgICAgICAgY29zdCA9IHRoaXMucGxheWVyLnN1bW1vbkNvc3RbdGhpcy5wbGF5ZXIuc3VtbW9uQ291bnRdOyBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLm1vbmV5Pj1jb3N0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKG5ldyBNb2IocGFyZW50LCB0eXBlLCAwKSkgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5tb25leSAtPSBjb3N0OyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnN1bW1vbkNvdW50ICsrOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChnYW1lKXtnYW1lLmVycm9yID0gdHJ1ZTsgfTsgXG5cbiAgICAgICAgfSBlbHNlIHt0aGlzLm1vYk9iamVjdHMucHVzaChuZXcgTW9iKHBhcmVudCwgdHlwZSwgMSkpfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBsb2FkQkcoKXtcbiAgICAgICAgdGhpcy5iZ1NreSA9IGltZygnYmcvYmdTa3knK3RoaXMubGV2ZWwrJy5wbmcnKTsgLy9sb2FkIHNreSBiZ1xuICAgIH1cblxuICAgIHN0YXJ0KCl7XG4gICAgICAgIHRoaXMuc3RhcnRNZW51ID0gbmV3IHN0YXJ0U2NyZWVuKHRoaXMpO1xuICAgICAgICB0aGlzLnN0YXJ0TWVudS5pbml0aWFsaXplKHRoaXMpOyBcbiAgICAgICAgdGhpcy51cGdyYWRlID0gbmV3IFVwZ3JhZGUodGhpcyk7IFxuICAgICAgICB0aGlzLnVwZ3JhZGUuaW5pdGlhbGl6ZSh0aGlzKTsgXG4gICAgICAgIHRoaXMuSFVETWVudSA9IG5ldyBIVUQodGhpcyk7IFxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcyk7XG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9IFt0aGlzLnBsYXllcl07XG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyID0gbmV3IElucHV0SGFuZGxlcih0aGlzLnBsYXllciwgdGhpcy51cGdyYWRlLCB0aGlzKTsgICAgICAgIFxuXG4gICAgICAgIC8vIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKG5ldyBNb2IodGhpcy5wbGF5ZXIsICdyZWREcmFnb24nLCAwLDQsNSkpOyBcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ2JsdWVEcmFnb24nLCAwLDIsNSkpOyBcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ2dyZWVuRHJhZ29uJywgMCwzLDUpKTsgXG4gICAgICAgIC8vIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKG5ldyBNb2IodGhpcy5wbGF5ZXIsICdibGFja0RyYWdvbicsIDAsMSw1KSk7IFxuXG4gICAgfVxuXG5cblxuICAgIGRyYXcoY3R4KXsgLy9ydW5zIGRyYXcgZnVuY3Rpb24gZm9yIG9iamVjdCBsaXN0IFxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iZ1NreSwgMCwgMCk7IFxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmdTdGFnZSwgMCwgMCk7IFxuICAgICAgICB0aGlzLnN0YXJ0TWVudS5kaXNwbGF5TWVudShjdHgsIHRoaXMgKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmVtb3RlKHRoaXMpKTsgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4LHRoaXMucGF1c2UpIClcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsIHRoaXMucGF1c2UpICk7XG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsdGhpcy5wYXVzZSkgKTsgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXdQcm9qKGN0eCx0aGlzLnBhdXNlKSApOyAvL3BsYXllciBwcm9qXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXdQcm9qKGN0eCwgdGhpcy5wYXVzZSkgKTsgLy9tb2IgcHJvaiBcblxuXG4gICAgICAgIHRoaXMucGxheWVyLnJlY2FsbEljb24oY3R4LCB0aGlzKTtcbiAgICBcbiAgICB9IFxuXG4gICAga25vY2tiYWNrKG9iaiwgZGlyZWN0aW9uLCBtdWx0aSl7XG4gICAgICAgIGlmIChvYmoubmFtZSA9PSdXaXonKXsgLy9vbmx5IHBsYXllciBwb3BzIHVwXG4gICAgICAgICAgICBvYmouanVtcCA9IHRydWU7XG4gICAgICAgICAgICBvYmouaW52dWxuVGltZSA9IDExMDsgXG4gICAgICAgICAgICBvYmouc3BlZWRZICs9IDQ7XG4gICAgICAgICAgICBvYmoua25vY2tiYWNrRm9yY2U9IC04KmRpcmVjdGlvbjsgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgb2JqLmhpdCA9IHRydWU7IFxuICAgICAgICAgICAgb2JqLmtub2NrYmFja1RpbWUgPSB0aGlzLmdhbWVUaW1lUmVhbDsgIC8vc3RvcmVzIHdoZW4gdGFyZ2V0IGtub2NrYmFjaztcbiAgICAgICAgICAgIGlmIChvYmouYm9zcyl7LTIqZGlyZWN0aW9uKigxKyAobXVsdGktMSkvNCl9IC8vYm9zcyBsZXNzIGtub2NrYmFja1xuICAgICAgICAgICAgZWxzZSB7b2JqLmtub2NrYmFja0ZvcmNlID0gLTQqZGlyZWN0aW9uKigxKyAobXVsdGktMSkvNCl9OyAvL2FkZCBhcyBzdGF0XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZ2dybyhvYmoxLCBvYmoyKXsgLy8gY2hlY2tzIGlmIG9iajEgcmFuZ2UgaXMgd2l0aGluIG9iajJcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmhlYWx0aD4wKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0rb2JqMS5yYW5nZT50YXJnZXQuaGl0Ym94WzBdIHx8IFxuICAgICAgICAgICAgICAgICAgICBvYmoxLmhpdGJveFswXS1vYmoxLnJhbmdlPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSl7IC8vYWdncm8gZnJvbSByaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEuaGl0Ym94WzFdPHRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV0rb2JqMS5oaXRib3hbM10+dGFyZ2V0LmhpdGJveFsxXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEubGFuZSA9PSB0YXJnZXQubGFuZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAge2lmIChvYmoxLmFnZ3JvKXtvYmoxLmF0dGFjaygpfTsgLy9vbmx5IGFnZ3JvIG1vYnMgaGF2ZSBhdHRhY2sgYW5pbWF0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iajEuYWdncm8gJiYgb2JqMS5zaWRlID09IDEgKXtvYmoxLmF0dGFjaygpfTsgLy9lbmVtaWVzIGF0dGFjayBvbiBDRFxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgIH1cbiAgICBcbiAgICBsb290TW9uZXkob2JqMSwgb2JqMil7XG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIG9iajIpeyAvLy0odGhpcy53aWR0aCooLTErdGhpcy5sb290TXVsdGkpKVxuICAgICAgICAgICAgaWYgKCAob2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSAmJiBvYmoxLmhpdGJveFswXSs4MCoob2JqMS5sb290TXVsdGkpID4gdGFyZ2V0LmhpdGJveFswXSkgfHwgLy9vYmoxIG9uIGxlZnRcbiAgICAgICAgICAgICAgICAob2JqMS5oaXRib3hbMF0gPiB0YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gJiYgb2JqMS5oaXRib3hbMF0tODAqKG9iajEubG9vdE11bHRpLTEpPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSApKXsgLy9vYmoxIG9uIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKG9iajEuaGl0Ym94WzFdPHRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV0rb2JqMS5oaXRib3hbM10+dGFyZ2V0LmhpdGJveFsxXSl7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0LnN0YXJ0RmFkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoxLm1vbmV5ICs9IHRhcmdldC52YWx1ZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5Q29sbGVjdGVkICs9IHRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5zdGFydEZhZGUgPSB0cnVlOy8vdHJ1ZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZmxvYXQgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRhcmdldC5sb3N0KXsgXG4gICAgICAgICAgICAgICAgdGhpcy5tb25leUxvc3QrPXRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgIHRhcmdldC52YWx1ZT0wIH07IFxuICAgICAgICB9XG4gICAgICAgICAgICBcblxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cyA9IHRoaXMubW9uZXlPYmplY3RzLmZpbHRlciggIC8vcmVtb3ZlcyBsb290ZWQgY29pbnNcbiAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC5kZWxldGUgPT0gZmFsc2U7IH0pOyAgICAgXG4gICAgfVxuXG4gICAgZXhwbG9kZURhbWFnZShvYmoxLCBvYmoyLCBvYmozKXtcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmhlYWx0aD4wKXtcbiAgICAgICAgICAgICAgICBpZiAoIChvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdICYmIG9iajEuaGl0Ym94WzBdK29iajEuaGl0Ym94WzJdK29iajMuYXJlYSA+IHRhcmdldC5oaXRib3hbMF0pIHx8IC8vb2JqMSAtPnRhcmdldFxuICAgICAgICAgICAgICAgICAgICAob2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0+dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICYmIG9iajEuaGl0Ym94WzBdLW9iajMuYXJlYTx0YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gKSl7IFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChvYmoxLmhpdGJveFsxXT50YXJnZXQuaGl0Ym94WzFdICYmIG9iajEuaGl0Ym94WzFdPHRhcmdldC5oaXRib3hbMV0rdGFyZ2V0LmhpdGJveFszXSl8fG9iajMuY29sdW1uPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLnBvaXNvbj4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5wb2lzb25TdGFjaysxPG9iajEucG9pc29uTWF4KXsgLy9hZGQgdG8gbWF4IHN0YWNrc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBvaXNvbkFtb3VudCArPSBvYmoxLnBvaXNvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wb2lzb25TdGFjaysrO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBvaXNvblRpbWUgPSA1OyAgLy9mb3VyIHRpY2tzICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5oZWFsdGggLT0gb2JqMy5kYW1hZ2U7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmozLmV4cGxvZGVEYW1hZ2VEZWFsdCArPSBvYmozLmRhbWFnZTt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcblxuICAgIGNvbGxpc2lvbihvYmoxLCBvYmoyLCBvYmozID0gbnVsbCl7IC8vIGNoZWNrcyBpZiBvYmoxIGlzIGhpdHRpbmcgb2JqMiBcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7XG4gICAgICAgICAgICBpZiAob2JqMS5oZWFsdGg+MCAmJiB0YXJnZXQuaGVhbHRoPjApe1xuICAgICAgICAgICAgICAgIGlmICggKG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0gJiYgb2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0+IHRhcmdldC5oaXRib3hbMF0pIHx8IC8vb2JqMSAtPnRhcmdldFxuICAgICAgICAgICAgICAgICAgICAob2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0+dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICYmIFxuICAgICAgICAgICAgICAgICAgICBvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gKSl7IC8vIHRhcmdldCA8LSBvYmoxXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEuaGl0Ym94WzFdPnRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSt0YXJnZXQuaGl0Ym94WzNdKXsgLy95LWJvdW5kaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5wcm9qZWN0aWxlICYmICFvYmoxLmV4cGxvZGUgJiYgIW9iajEuaGl0TGlzdC5pbmNsdWRlcyh0YXJnZXQubmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuc2lkZSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGFyZ2V0LmxhbmUgPT0gb2JqMS5sYW5lKXsgLy9wbGF5ZXIgb25seSBjYW4gaGl0IGZyb20gcHJvaiBpbiBsYW5lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUNhbGMob2JqMSwgdGFyZ2V0LCBvYmozKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEucGllcmNlIC09IDE7ICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuaGl0TGlzdC5wdXNoKHRhcmdldC5uYW1lKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUNhbGMob2JqMSwgdGFyZ2V0LCBvYmozKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5waWVyY2UgLT0gMTsgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoxLmhpdExpc3QucHVzaCh0YXJnZXQubmFtZSk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMy5hcmVhPjApe3RoaXMuZXhwbG9kZURhbWFnZShvYmoxLCBvYmoyLCBvYmozKX07IC8vYXJlYSBkYW1hZ2U7IGNoZWNrcyBmb3IgbmVhcmJ5IHRhcmdldHMgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEucGllcmNlPD0wKXtvYmoxLmV4cGxvZGUgPSB0cnVlfTsgLy9kZXN0cm95IHByb2plY3RpbGUgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9iajEucHJvamVjdGlsZSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEubGFuZSA9PSB0YXJnZXQubGFuZSl7dGhpcy5kYW1hZ2VDYWxjKG9iajEsIHRhcmdldCl9O1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICBkYW1hZ2VDYWxjKG9iajEsIG9iajIsIG9iajMgPSBudWxsKXsgLy9vYmoxIChvd25lZCBieSBvYmozKSBhdHRhY2tpbmcgb2JqMiBcbiAgICAgICAgaWYgKG9iajIuaW52dWxuVGltZSA9PSAwICYmIG9iajEudG91Y2hIaXQpIHtcbiAgICAgICAgICAgIGxldCBkYW1hZ2UgPSBvYmoxLmRhbWFnZTtcbiAgICAgICAgICAgIGxldCBrbm9ja2JhY2sgPSAxOyBcbiAgICAgICAgICAgIGlmIChvYmozKXtvYmozLmRhbWFnZURlYWx0Kz0gZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICBrbm9ja2JhY2sgPSBvYmozLmtub2NrYmFja011bHRpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqMS5jaGlsbD4wKXtcbiAgICAgICAgICAgICAgICBpZiAoIE1hdGguYWJzKG9iajIuc3BlZWRYKS1vYmoyLmNoaWxsQW1vdW50PjApe29iajIuY2hpbGxBbW91bnQrPSBvYmoxLmNoaWxsfVxuICAgICAgICAgICAgICAgIGVsc2Ugb2JqMi5jaGlsbEFtb3VudCA9IE1hdGguYWJzKG9iajIuc3BlZWRYKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9iajIuaGVhbHRoIC09IGRhbWFnZTtcbiAgICAgICAgICAgIG9iajIua25vY2tiYWNrU3VtICs9IGRhbWFnZSprbm9ja2JhY2s7XG5cbiAgICAgICAgICAgIGlmIChvYmoyLmtub2NrYmFja1RocmVzaCA8PSBvYmoyLmtub2NrYmFja1N1bSl7XG4gICAgICAgICAgICAgICAgaWYgKG9iajEucG9zaXRpb24ueD5vYmoyLnBvc2l0aW9uLngpeyB0aGlzLmtub2NrYmFjayhvYmoyLCAxLCBrbm9ja2JhY2sgKX1cbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMua25vY2tiYWNrKG9iajIsIC0xLCBrbm9ja2JhY2spO1xuICAgICAgICAgICAgICAgIG9iajIua25vY2tiYWNrU3VtID0gMCBcbiAgICAgICAgICAgICAgICAvLyBvYmoyLmtub2NrYmFja1RocmVzaCAqPTEuMiAvL2luY3JlYXNlIHRocmVzaG9sZCBlYWNoIHRpbWVcblxuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgbG9zZUxpZmUoY3R4KXsgLy9tb2IgZXNjYXBlc1xuICAgICAgICBmb3IgKGNvbnN0IG9iaiBvZiB0aGlzLm1vYk9iamVjdHMpe1xuICAgICAgICAgICAgaWYgKG9iai5wb3NpdGlvbi54IDw9IC1vYmoud2lkdGgqMil7XG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllci5oZWFsdGggLT0gMTsgXG4gICAgICAgICAgICAgICAgaWYgKCFvYmouZmxpcCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8b2JqLnZhbHVlLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9uZXlMb3N0Kz1vYmoudmFsdWVbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHt0aGlzLm1vbmV5TG9zdCArPSBvYmoudmFsdWU7fSAvL2xvc3QgbW9uZXlcbiAgICAgICAgICAgICAgICAgICAgb2JqLmFsaXZlID0gZmFsc2U7IC8vZGVsZXRlIG1vbnNlcjsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlckVzY2FwZSArKzsgXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtvYmouc3BlZWRYID0gLW9iai5zcGVlZFg7IG9iai5sZWZ0PSFvYmoubGVmdDt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvYmoucG9zaXRpb24ueCA+PSB0aGlzLmdhbWVXaWR0aCAmJiBvYmouc3BlZWRYPDApXG4gICAgICAgICAgICAgICAge29iai5zcGVlZFggPSAtb2JqLnNwZWVkWFxuICAgICAgICAgICAgICAgIG9iai5sZWZ0PSFvYmoubGVmdH07XG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIC8vIGRyYXdHcmlkKGN0eCl7XG4gICAgLy8gICAgIGN0eC5iZWdpblBhdGgoKTsgIC8vIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWVIZWlnaHRcbiAgICAvLyAgICAgY3R4Lm1vdmVUbygwLCB0aGlzLmdhbWVIZWlnaHQpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCoyKTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCoyKTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCozKTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCozKTsgICAgICAgIFxuICAgIC8vICAgICBjdHguc3Ryb2tlKCk7XG4gICAgLy8gfVxuXG4gICAgdXBncmFkZU1lbnUoY3R4KXtcbiAgICAgICAgdGhpcy5IVURNZW51LmRpc3BsYXlIVUQoY3R4LCB0aGlzKTsgIFxuICAgICAgICB0aGlzLnVwZ3JhZGUuZGlzcGxheU1lbnUoY3R4LCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuaGVhbHRoIDw9IDAgKXtcbiAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMuZW5kLmRpc3BsYXkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbmQuZGlzcGxheU1lbnUoY3R4LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzcGF3bk1vbmV5KG9iail7XG4gICAgICAgIGlmIChvYmouc3RhdGUgPT0gJ2RpZScgJiYgIW9iai5sb290RHJvcCl7XG4gICAgICAgICAgICBpZiAob2JqLnZhbHVlLmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IC0wLjYqMiA7IC8vbW9uZXkgc3ByZWFkXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8b2JqLnZhbHVlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leU9iamVjdHMucHVzaChuZXcgTW9uZXkodGhpcywgb2JqLCBvYmoudmFsdWVbaV0sIHgraSowLjYpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge3RoaXMubW9uZXlPYmplY3RzLnB1c2gobmV3IE1vbmV5KHRoaXMsIG9iaiwgb2JqLnZhbHVlKSl9XG4gICAgICAgICAgICBvYmoubG9vdERyb3AgPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMubW9uc3RlcktpbGwrKzsgXG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlKCl7XG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+dGhpcy5zcGF3bk1vbmV5KG9iamVjdCkpOyBcbiAgICAgICAgdGhpcy5sb3NlTGlmZSgpOyAvL2VuZW1pZXMgcGFzdCBcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzID0gdGhpcy5tb2JPYmplY3RzLmZpbHRlciggIC8vcmVtb3ZlcyBkZWFkL3Bhc3Npbmcgb2JqZWN0c1xuICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChvYmplY3QuYWxpdmUgIT09IGZhbHNlKX0pOyAgICAgICAgXG4gICAgICAgIHRoaXMubG9vdE1vbmV5KHRoaXMucGxheWVyLCB0aGlzLm1vbmV5T2JqZWN0cyk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKCkgKTsgXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSh0aGlzKSApOyBcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUodGhpcykgKTsgXG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuYWxpdmUpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLmFnZ3JvKG9iamVjdCwgdGhpcy5tb2JPYmplY3RzKSApOyAgLy9zdW1tb24gYXR0YWNrc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+dGhpcy5hZ2dybyhvYmplY3QsIHRoaXMucGxheWVyT2JqZWN0cykgKTsgLy9tb2IgYXR0YWNrc1xuXG4gICAgICAgIHRoaXMuY29sbGlzaW9uKHRoaXMucGxheWVyLCB0aGlzLm1vYk9iamVjdHMpOyBcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLmNvbGxpc2lvbihvYmplY3QsIHRoaXMucGxheWVyT2JqZWN0cykgKTsgXG5cbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QubW9iQXR0YWNrKHRoaXMpKTsgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnN1bW1vbkF0dGFjayh0aGlzKSk7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT4gLy9tb2IgcHJvaiB0byBwbGF5ZXIgXG4gICAgICAgICAgICBvYmplY3QucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdDIpPT4gXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb24ob2JqZWN0MiwgW3RoaXMucGxheWVyXSwgb2JqZWN0KSkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT4gLy9wbGF5ZXIgcHJvaiB0byBtb2JzXG4gICAgICAgICAgICBvYmplY3QucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdDIpPT4gXG4gICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uKG9iamVjdDIsIHRoaXMubW9iT2JqZWN0cywgb2JqZWN0KVxuICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgKTsgXG5cbiAgICB9XG4gICBcblxuICAgIFxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltZyhmaWxlKXtcclxuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7IFxyXG4gICAgaW1hZ2Uuc3JjID0gJ2ltYWdlcy8nK2ZpbGU7IFxyXG4gICAgcmV0dXJuIGltYWdlOyBcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dEhhbmRsZXJ7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCB1cGdyYWRlLCBHYW1lKXtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT57ICAgIFxuICAgICAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpeyAvL2E6NjU7IHM6ODM7IGQ6NjgsIHc6IDg3O1xuXG4gICAgICAgICAgICAgICAgY2FzZSAzNzogLy9sZWZ0IGFycm93XG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLnRpdGxlRGlzcGxheSAmJiAhR2FtZS5mYWRlT3V0ICYmIEdhbWUubGV2ZWw+MSl7R2FtZS5sZXZlbC0tfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWC09MX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc3BlZWRYID0gLXBsYXllci5zcGVlZDsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmxlZnQgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAzOTogLy9yaWdodCBhcnJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS50aXRsZURpc3BsYXkgJiYgIUdhbWUuZmFkZU91dCAmJiBHYW1lLmxldmVsPEdhbWUuZmluYWxMZXZlbCl7R2FtZS5sZXZlbCsrfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWDwyKXt1cGdyYWRlLnNlbGVjdGlvblgrPTF9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNwZWVkWCA9IHBsYXllci5zcGVlZDsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmxlZnQgPSBmYWxzZTt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuXG4gICAgICAgICAgICAgICAgY2FzZSAzODogLy8gdXAgYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblk+MSl7dXBncmFkZS5zZWxlY3Rpb25ZLT0xfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7cGxheWVyLnRlbGVwb3J0KC0xKTt9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYXNlIDQwOiAvLyBkb3duIGFycm93XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPDUpe3VwZ3JhZGUuc2VsZWN0aW9uWSs9MX07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3BsYXllci50ZWxlcG9ydCgxKTt9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSA5MDogLy9aIHJlY2FsbFxuICAgICAgICAgICAgICAgIGlmICghR2FtZS50aXRsZURpc3BsYXkpIHtHYW1lLnJlY2FsbCgpOyB9XG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgODg6IC8vWCBqdW1wXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGxheWVyLmp1bXApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNwZWVkWSA9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmp1bXAgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrICAgICBcblxuICAgICAgICAgICAgICAgIGNhc2UgNjc6IC8vQyBhdHRhY2tcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmF0dGFjayhHYW1lLnBhdXNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYXNlIDY1OiAvL0Egb3BlbiBzaG9wXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGdyYWRlLnRvZ2dsZU1lbnUoR2FtZSk7IFxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSA4MzogLy8gUyBidXlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZ3JhZGUuZGlzcGxheSAmJiAhR2FtZS50aXRsZURpc3BsYXkpe3VwZ3JhZGUucHVyY2hhc2UoR2FtZSl9XG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgNjg6IC8vRCBzdGFydCB3YXZlXG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLndhdmVGaW5pc2ggJiYgR2FtZS5zdG9yYWdlLmxlbmd0aD09MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lLm5leHRXYXZlID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lLnN0YXJ0TWVudS5kaXNwbGF5ID0gZmFsc2V9OyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgMjc6IC8vIEVTQ1xuICAgICAgICAgICAgICAgICAgICBHYW1lLnRvZ2dsZVBhdXNlKCk7IFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy9vbGQgY29udHJvbHMgXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA2NTogLy9BIG1vdmUgbGVmdCBcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblg+MSl7dXBncmFkZS5zZWxlY3Rpb25YLT0xfTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBwbGF5ZXIuc3BlZWRYID0gLXBsYXllci5zcGVlZDsgXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBwbGF5ZXIubGVmdCA9IHRydWU7fVxuICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA2ODogLy9EIG1vdmUgcmlnaHRcbiAgICAgICAgICAgICAgICAvLyBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPDIpe3VwZ3JhZGUuc2VsZWN0aW9uWCs9MX07XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLnNwZWVkWCA9IHBsYXllci5zcGVlZDsgXG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5sZWZ0ID0gZmFsc2U7fVxuICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgODc6IC8vVyB0ZWxlcG9ydCB1cFxuICAgICAgICAgICAgICAgIC8vIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblk+MSl7dXBncmFkZS5zZWxlY3Rpb25ZLT0xfTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVsc2Uge3BsYXllci50ZWxlcG9ydCgtMSk7fVxuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDgzOiAvL1MgdGVsZXBvcnQgZG93blxuICAgICAgICAgICAgICAgIC8vIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblk8NSl7dXBncmFkZS5zZWxlY3Rpb25ZKz0xfTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVsc2Uge3BsYXllci50ZWxlcG9ydCgxKTt9XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG5cblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNzQ6ICAvL0ogXG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwZ3JhZGUuZGlzcGxheSl7dXBncmFkZS5wdXJjaGFzZShHYW1lKX0gICAgXG4gICAgICAgICAgICAgICAgLy8gZWxzZSBpZiAoIXBsYXllci5qdW1wKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLnNwZWVkWSA9IDEyO1xuICAgICAgICAgICAgICAgIC8vICAgICBwbGF5ZXIuanVtcCA9IHRydWU7fVxuICAgICAgICAgICAgICAgIC8vICAgICBicmVhayBcblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgNzU6IC8vS1xuICAgICAgICAgICAgICAgIC8vICAgICBwbGF5ZXIuYXR0YWNrKEdhbWUucGF1c2UpO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA3OTogLy9PXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChHYW1lLndhdmVGaW5pc2ggJiYgR2FtZS5zdG9yYWdlLmxlbmd0aD09MCl7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBHYW1lLm5leHRXYXZlID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBHYW1lLnN0YXJ0TWVudS5kaXNwbGF5ID0gZmFsc2V9OyBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrXG5cbiAgICBcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDk2OlxuICAgICAgICAgICAgICAgIC8vICAgICB1cGdyYWRlLnRvZ2dsZU1lbnUoKTsgXG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDk3OiAvLzFcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAncmVkRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA5ODogLy8yXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ2JsdWVEcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDk5OiAvLzNcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAnZ3JlZW5EcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDEwMDogLy80XG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ2JsYWNrRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT57ICAgIFxuICAgICAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpeyAvL2E6NjU7IHM6ODM7IGQ6NjgsIHc6IDg3O1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLnRpdGxlRGlzcGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lLmZhZGVPdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntHYW1lLnRpdGxlRGlzcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUucmVzZXRFdmVyeXRoaW5nKCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgODAwKX1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgOTogIFxuICAgICAgICAgICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgICAgIGNhc2UgMTE2OiBicmVhazsgXG5cbiAgICAgICAgICAgICAgICBjYXNlIDM3OiAgIC8vQSA9IDY1XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuc3BlZWRYPDApIHBsYXllci5zcGVlZFggPSAwOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOTogLy8gRCA9IDY4XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuc3BlZWRYPjApIHBsYXllci5zcGVlZFggPSAwOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG59IiwiaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuaW1wb3J0IFByb2plY3RpbGUgZnJvbSAnLi9wcm9qZWN0aWxlJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vYntcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB0eXBlLCBzaWRlLCB0ZXN0ID0gMCwgbGV2ZWw9MCl7XG4gICAgICAgIHRoaXMuc2lkZSA9IHNpZGU7XG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMCl7dGhpcy50eXBlSW5mbyA9IHJlcXVpcmUoJy4vc3VtbW9uSW5mby5qc29uJykgfVxuICAgICAgICBlbHNlICh0aGlzLnR5cGVJbmZvID0gcmVxdWlyZSgnLi9tb2JJbmZvLmpzb24nKSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcblxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlOyBcbiAgICAgICAgIFxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd2YWx1ZSddOyBcbiAgICAgICAgdGhpcy5sb290RHJvcCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IFtdO1xuICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IDE7IFxuICAgICAgICB0aGlzLmZhZGUgPSAxOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlOyAgXG4gICAgICAgIHRoaXMuYXR0YWNrQ0QgPSAwOyBcbiAgICAgICAgdGhpcy5tYXhTcGVlZCA9IDE1OyBcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgICAgIHRoaXMudG91Y2hIaXQgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDA7IFxuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlJ107IFxuICAgICAgICAvL3RoaXMuZGFtYWdlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkYW1hZ2UnXTsgXG4gICAgICAgIHRoaXMuYXR0YWNrU3BlZWQgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2F0a1NwZCddOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3BlZWRYID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcGVlZCddO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7IFxuICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTtcbiAgICAgICAgdGhpcy5sYW5lID0gZ2FtZS5sYW5lOyAgLy8gd2hpY2ggbGFuZVxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDEpeyAvL0VuZW15IE1vYiBcbiAgICAgICAgICAgIHRoaXMuaW52dWxuVGltZSA9ICAwOyBcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMudHlwZStnYW1lLm1vYkNvdW50OyBcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSA0NTsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnaGVpZ2h0J10pe3RoaXMuaGVpZ2h0ID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWlnaHQnXX1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5oZWlnaHQgPSA2NTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3JhbmdlJ10pe3RoaXMucmFuZ2UgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3JhbmdlJ119XG4gICAgICAgICAgICBlbHNlIHt0aGlzLnJhbmdlID0gMTA7fVxuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWFsdGgnXTtcbiAgICAgICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5oZWFsdGg7IFxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhbGsnO1xuICAgICAgICAgICAgdGhpcy54T2ZmPS03MDtcbiAgICAgICAgICAgIHRoaXMueU9mZj0tODU7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiAocmlnaHRzaWRlKVxuICAgICAgICAgICAgICAgIHg6IHRoaXMuZ2FtZVdpZHRoKzUwLCBcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmdhbWVIZWlnaHQgLSAxMDUgLSBnYW1lLnJvd0hlaWdodCpnYW1lLmxhbmUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIFBDIHBldHNcbiAgICAgICAgICAgIHRoaXMuaW52dWxuVGltZSA9IDE7IFxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDUwOyAvL3Nwcml0ZSBzaXplIFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDsgXG4gICAgICAgICAgICB0aGlzLnJhbmdlID0gNjAwOyAvL3dob2xlIGxhbmU/XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDE7IFxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDE7IFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCdcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGZhbHNlOyBcbiAgICAgICAgICAgIHRoaXMueU9mZj0wO1xuICAgICAgICAgICAgdGhpcy54T2ZmPTA7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZURlYWx0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuYWdncm8gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyduYW1lJ107XG4gICAgICAgICAgICBpZiAobGV2ZWwhPTApIHt0aGlzLmxldmVsID0gbGV2ZWx9OyBcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSAnTHZsLiAnICsgdGhpcy5sZXZlbDsgXG4gICAgICAgICAgICB0aGlzLmVtb3RlVGltZSA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMuZW1vdGVMZW5ndGggPSBbXTtcbiAgICAgICAgICAgIHRoaXMueVN0YXJ0ID0gZ2FtZS5mbG9vciszMDtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogKGdhbWUuY3VyVGlsZSo4MCkrZ2FtZS53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IGdhbWUuZmxvb3IrMzBcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9OyAgLy9vZmZzZXQgZm9yIHNwcml0ZXMgXG4gICAgICAgIC8vaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddKSAodGhpcy5wb3NpdGlvbi55IC09dGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pIDtcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlVHlwZSddKXt0aGlzLmxvYWRTcHJpdGUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Nwcml0ZVR5cGUnXVswXX1cbiAgICAgICAgZWxzZSB7dGhpcy5sb2FkU3ByaXRlID0gdGhpcy50eXBlfTtcbiAgICAgICAgdGhpcy5mb3JtID0gMDsgXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RhbWFnZSddKXt0aGlzLmRhbWFnZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZGFtYWdlJ119XG4gICAgICAgIGVsc2UgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhZ2dybyddKXRoaXMuYWdncm8gPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3dpZHRoMiddKXt0aGlzLndpZHRoMiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2lkdGgyJ119XG4gICAgICAgIGVsc2Uge3RoaXMud2lkdGgyPTB9O1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWlnaHQyJ10pe3RoaXMuaGVpZ2h0MiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnaGVpZ2h0MiddfVxuICAgICAgICBlbHNlIHRoaXMuaGVpZ2h0MiA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddKXt0aGlzLnlPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXX1cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneE9mZiddKXt0aGlzLnhPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3hPZmYnXX1cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYm9zcyddKXt0aGlzLmJvc3MgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnktPTcwOyB0aGlzLmhlaWdodCs9MTAwfTsgXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3JvYW0nXSl7XG4gICAgICAgICAgICB0aGlzLnJvYW0gPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMucm9hbVRpbWUgPSA1MDtcbiAgICAgICAgICAgIHRoaXMucm9hbVkgPSB0aGlzLmxhbmUqZ2FtZS5yb3dIZWlnaHQ7IFxuICAgICAgICAgICAgdGhpcy5yb2FtTGltaXRzID0gWzAsIGdhbWUucm93SGVpZ2h0LCBnYW1lLnJvd0hlaWdodCoyXTsgLy8wLDEsMlxuICAgICAgICAgICAgLy90aGlzLmRlc3RpbmF0aW9uID0gMDtcbiAgICAgICAgIH1cbiAgICAgICAgZWxzZSB7dGhpcy5yb2FtID0gZmFsc2V9OyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMueE9mZjIgPSAwOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tUaW1lID0gMCA7ICBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tUaHJlc2ggPSBNYXRoLmZsb29yKHRoaXMubWF4SGVhbHRoIC8gMyk7XG4gICAgICAgIHRoaXMua25vY2tiYWNrU3VtID0gMDsgIFxuICAgICAgICB0aGlzLmtub2NrYmFja1Jlc2lzdCA9IDAuM1xuICAgICAgICB0aGlzLmhpdCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IFxuICAgICAgICB0aGlzLmVtb3RlQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbW90ZVRpbWVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbW90ZVRpbWVPdXQgPSBbXTtcbiAgICAgICAgdGhpcy5wb3Npb25HcmFwaGljID0gW107IFxuICAgICAgICB0aGlzLmhpdEJ5ID0gW107IFxuICAgICAgICB0aGlzLmRhbWFnZU11bHRpID0gMTsgXG4gICAgICAgIHRoaXMubG9vdE11bHRpID0gMTtcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMuc3BlZWRNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLnBpZXJjZSA9IDE7IFxuXG4gICAgICAgIHRoaXMucHJvamVjdGlsZUFtb3VudCA9IDA7IFxuICAgICAgICB0aGlzLmNoaWxsQW1vdW50ID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uTG9hZGVkID0gZmFsc2U7IC8vbG9hZCBzcHJpdGUgXG4gICAgICAgIHRoaXMucG9pc29uVGltZSA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvbkFtb3VudCA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvblRpY2sgPSAwO1xuICAgICAgICB0aGlzLmNoaWxsID0gMDtcbiAgICAgICAgdGhpcy5hcmVhID0gMDsgXG4gICAgICAgIHRoaXMuY29sdW1uID0gMDsgXG4gICAgICAgIHRoaXMuZXhwbG9kZURhbWFnZURlYWx0ID0gMCBcbiAgICAgICAgdGhpcy5wb2lzb24gPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25TdGFjayA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvbk1heCA9IDA7IFxuXG4gICAgICAgIHRoaXMuYXR0YWNrZWQgPSBmYWxzZSA7XG4gICAgICAgIHRoaXMuYXR0YWNrU3RhcnQgPSAwO1xuICAgICAgICB0aGlzLmRlbGF5QXR0YWNrID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZmxpcCddKXt0aGlzLmZsaXAgPSB0cnVlIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2VpcmQnXSl7XG4gICAgICAgICAgICB0aGlzLndlaXJkID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLndlaXJkU3RhcnQgPSBnYW1lLmdhbWVUaW1lUmVhbDsgXG4gICAgICAgICAgICB0aGlzLndlaXJkVGltZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozMDAwKSsyMDAwO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVzdD09MSl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAyNjA7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMzk1OyAvL2JvdHRvbVxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMDtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRlc3Q9PTIpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gMjYwOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IDMwNTsgLy9taWRkbGVcbiAgICAgICAgICAgIHRoaXMubGFuZSA9IDE7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXN0PT0zKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDI2MDsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAyMTU7IC8vdG9wIFxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMjsgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGVzdD09NCl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAzNDA7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMzA1OyAvLyBtaWRkbGUgIzJcbiAgICAgICAgICAgIHRoaXMubGFuZSA9IDE7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlID09ICdyZWREcmFnb24nKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4zfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuYXJlYSArPSA2MDsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4zfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuYXJlYSArPTQwOyB0aGlzLnByb2plY3RpbGVBbW91bnQrK307XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnYmx1ZURyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLnBpZXJjZSArPSAxO31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLmNoaWxsICs9IDAuMjsgdGhpcy5waWVyY2UgKz0gMX1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmNoaWxsICs9IDAuMTsgdGhpcy5wcm9qZWN0aWxlQW1vdW50Kyt9O1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy50eXBlID09ICdncmVlbkRyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrO31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLnBvaXNvbiArPSAwLjQ7IHRoaXMuYXJlYSArPSAyMDsgdGhpcy5wb2lzb25NYXgrPTEwO31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00ICl7dGhpcy5wb2lzb24gKz0gMC40OyB0aGlzLmFyZWEgKz0gMTA7IHRoaXMucG9pc29uTWF4Kz01OyB0aGlzLnByb2plY3RpbGVBbW91bnQrK31cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnYmxhY2tEcmFnb24nKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuYXJlYSArPTE1OyB0aGlzLmNvbHVtbj0xO3RoaXMuZGFtYWdlTXVsdGkrPTAuMn1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmFyZWEgKz0xNTsgdGhpcy5wcm9qZWN0aWxlQW1vdW50Kyt9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLmV2b2x2ZSgpfSBcblxuICAgIH1cblxuXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpeyAvL2ltcG9ydCBzcHJpdGVzIFxuICAgICAgICB0aGlzLmZyYW1lcyA9IDMwOyBcbiAgICAgICAgaWYgKHRoaXMuc3ByaXRlPT0nbW9iJyl7IC8vIEVuZW15IG1vYnNcbiAgICAgICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL3N0YW5kXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzdGFuZCddLCAxMCwgXCJzdGFuZFwiKTsgLy9zdGFuZGluZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMud2FsayA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvbW92ZV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2FsayddLCAxMCwgXCJ3YWxrXCIpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmhpdCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvaGl0MV8/LnBuZycsMCwgMTAsIFwiaGl0XCIpO1xuICAgICAgICAgICAgdGhpcy5kaWUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL2RpZTFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RpZSddLCAxNSwgXCJkaWVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy53YWxrLCB0aGlzLmhpdCwgdGhpcy5kaWVdOyBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J10pe1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ncnkgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL2F0dGFjazFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J10sIDEwLCBcImF0dGFja1wiLCB0cnVlKVxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKHRoaXMuYW5ncnkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSAgICAgICAgICAgXG4gICAgICAgIGVsc2UgeyBcbiAgICAgICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSArJy9zdGFuZDFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3N0YW5kJ11bdGhpcy5mb3JtXSwgMTAsIFwic3RhbmRcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmFuZ3J5ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUgKycvYW5ncnlfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J11bdGhpcy5mb3JtXSwgMTAsIFwiYXR0YWNrXCIsIHRydWUpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy5hbmdyeV07IFxuICAgICAgICAgICAgbGV0IGVtb3RlcyA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZW1vdGUnXVt0aGlzLmZvcm1dO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8ZW1vdGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZW1vdGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSArJy8nK2Vtb3Rlc1tpXVswXSsnXz8ucG5nJywgZW1vdGVzW2ldWzFdLCAxMCwgXCJlbW90ZVwiKygxK2kpICk7IC8vZW1vdGU7IFxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKGVtb3RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtb3RlTGVuZ3RoLnB1c2goZW1vdGVzW2ldWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5hbmltYXRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBldm9sdmUoKXtcbiAgICAgICAgdGhpcy5mb3JtKys7IFxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Nwcml0ZVR5cGUnXVt0aGlzLmZvcm1dOyBcbiAgICAgICAgdGhpcy5lbW90ZUxlbmd0aCA9IFtdOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IC8vIHVwZGF0ZSBzcHJpdGVzIFxuXG4gICAgfVxuICAgIGxldmVsVXAocGxheWVyKXsgXG4gICAgICAgIGxldCBjb3N0ID0gcGxheWVyLnVwZ3JhZGVDb3N0W3RoaXMubGV2ZWwtMV07XG4gICAgICAgIGlmIChwbGF5ZXIubW9uZXk+PWNvc3Qpe1xuICAgICAgICAgICAgdGhpcy5sZXZlbCsrOyAgXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gJ0x2bC4gJyArIHRoaXMubGV2ZWw7IFxuICAgICAgICAgICAgdGhpcy52YWx1ZSArPSBjb3N0OyBcbiAgICAgICAgICAgIHBsYXllci5tb25leSAtPSBjb3N0OyBcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmV2b2x2ZSgpfSBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3JlZERyYWdvbicpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yNX1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmFyZWEgKz0gNjA7IHRoaXMuZGFtYWdlTXVsdGkrPTAuMjV9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5hcmVhICs9IDMwOyB0aGlzLnByb2plY3RpbGVBbW91bnQgKyt9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnYmx1ZURyYWdvbicpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzt9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD09Myl7dGhpcy5jaGlsbCArPSAwLjI7IHRoaXMucGllcmNlICs9IDF9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5jaGlsbCArPSAwLjE7IHRoaXMucHJvamVjdGlsZUFtb3VudCArK307XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnZ3JlZW5EcmFnb24nKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7fVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw9PTMpe3RoaXMucG9pc29uICs9IDAuNjsgdGhpcy5wb2lzb25NYXgrPTY7dGhpcy5waWVyY2UgKz0gMX1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPj00ICl7dGhpcy5wb2lzb24gKz0gMC42OyB0aGlzLnBvaXNvbk1heCs9MzsgdGhpcy5wcm9qZWN0aWxlQW1vdW50ICsrfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2JsYWNrRHJhZ29uJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLmRhbWFnZU11bHRpKz0wLjJ9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD09Myl7dGhpcy5hcmVhICs9MjA7IHRoaXMuY29sdW1uPTE7dGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuYXJlYSArPTIwOyB0aGlzLnByb2plY3RpbGVBbW91bnQgKyt9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0YXQgdXBkYXRlcyAuZGFtYWdlTXVsdGlcbiAgICB9XG5cbiAgICBlbW90ZShnYW1lKXtcbiAgICAgICAgbGV0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMCk7XG4gICAgICAgIGlmICh0aGlzLmVtb3RlQ2hhbmdlKXtcbiAgICAgICAgICAgIGlmICghZ2FtZS5wbGF5ZXIuYWxpdmUpe1xuICAgICAgICAgICAgICAgIC8vdGhpcy5zdGF0ZSA9ICdlbW90ZTUnO1xuICAgICAgICAgICAgICAgIGlmKHJhbmRvbT41KXt0aGlzLnN0YXRlID0gJ2Vtb3RlNSc7fSAvLyBjcnlcbiAgICAgICAgICAgICAgICBlbHNlIHt0aGlzLnN0YXRlID0gJ2Vtb3RlMic7fSAvLyBiZXdpbGRlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZ2FtZS53YXZlRmluaXNoICl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJhbmRvbT41KXt0aGlzLnN0YXRlID0gJ2Vtb3RlMyc7fSAvLyBzaXRcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7dGhpcy5zdGF0ZSA9ICdlbW90ZTQnO30gLy8gc2xlZXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbW90ZUNoYW5nZSA9IGZhbHNlOyBcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLmVtb3RlQ2hhbmdlICYmICF0aGlzLmVtb3RlVGltZXIpeyBcbiAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lciA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge3RoaXMuZW1vdGVDaGFuZ2UgPSB0cnVlfSwgXCI1MDAwXCIpIDt9XG5cbiAgICB9XG5cbiAgICBhdHRhY2soKXsgLy90cmlnZ2VycyBhdHRhY2sgc3RhdGUgXG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEIDw9IDAgJiYgdGhpcy5oZWFsdGg+MCl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2F0dGFjayc7IFxuICAgICAgICB9ICAgICAgICAgIFxuICAgIH1cblxuICAgIHN1bW1vbkF0dGFjaygpeyAvL3N1bW1vbiBhdHRhY2tzIFxuICAgICAgICBpZiAoICF0aGlzLmF0dGFja2VkKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuZ3J5LmdldEZyYW1lKCk9PTIpe1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCggbmV3IFByb2plY3RpbGUodGhpcywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydwcm9qJ11bdGhpcy5mb3JtXSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnktNTApKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlQW1vdW50PjApeyAvL2V4dHJhIHByb2plY3RpbGVzIFxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTE7IGk8PXRoaXMucHJvamVjdGlsZUFtb3VudDsgaSsrKXsgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoICgpPT4ge3RoaXMucHJvamVjdGlsZXMucHVzaCggbmV3IFByb2plY3RpbGUodGhpcywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydwcm9qJ11bdGhpcy5mb3JtXSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnktNTApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEyMCppKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrQ0QgPSB0aGlzLmF0dGFja1NwZWVkO1xuICAgICAgICAgICAgICAgLy8gdGhpcy5hbmdyeS5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lID0gMTAwK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1MDApOyAvL3Jlc2V0IHJhbmRvbSBlbW90ZSB0aW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb2JBdHRhY2soZ2FtZSl7XG4gICAgICAgIGlmICghdGhpcy5hdHRhY2tlZCAmJiBnYW1lLnBsYXllci5hbGl2ZSAmJiB0aGlzLmhlYWx0aD4wKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvYWRTcHJpdGU9PSdzdHVtcHknKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpID09IDkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2goIG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54LTQwLCB0aGlzLnBvc2l0aW9uLnkrMzApKTsgICAgXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrQ0QgPSB0aGlzLmF0dGFja1NwZWVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubG9hZFNwcml0ZT09J2dob3N0U3R1bXAnKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpID09IDQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2goIG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54LTQwLCB0aGlzLnBvc2l0aW9uLnktMjcpKTsgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkU3ByaXRlPT0nbXVzaG1vbScpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZ3J5LmdldEZyYW1lKCkgPT0gNyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hbmdyeS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWdhbWUucGxheWVyLmp1bXAgJiYgZ2FtZS5wbGF5ZXIubGFuZSA9PSB0aGlzLmxhbmUgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUucGxheWVyLmhlYWx0aCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5rbm9ja2JhY2soZ2FtZS5wbGF5ZXIsIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgcGF1c2UpIHtcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSlcbiAgICAgICAgLy9pZiAodGhpcy5oaXRib3gpeyBjdHguZmlsbFJlY3QodGhpcy5oaXRib3hbMF0sdGhpcy5oaXRib3hbMV0sIHRoaXMuaGl0Ym94WzJdLCB0aGlzLmhpdGJveFszXSk7fVxuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpOyBcbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LXRoaXMucmFuZ2UsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCsyKnRoaXMucmFuZ2UsIHRoaXMuaGVpZ2h0KTsgLy9yYW5nZVxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDAgJiYgdGhpcy5mb3JtPT0xICYmIHRoaXMuc3RhdGU9PSdhdHRhY2snKXt0aGlzLnhPZmYyID0gLTUxfSAvL2F0dGFjayBvZmZzZXRcbiAgICAgICAgZWxzZSB0aGlzLnhPZmYyPTA7XG5cbiAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpe1xuICAgICAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAwKXt0aGlzLnN0YXRlID0gJ3N0YW5kJzsgfSBcbiAgICAgICAgICAgIGVsc2UgdGhpcy5zdGF0ZT0nd2Fsayc7fVxuXG4gICAgICAgIGlmICh0aGlzLmhlYWx0aDw9MCAmJiB0aGlzLnNpZGUgPT0xKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGllJzsgIC8vZGVhdGggYW5pbWF0aW9uICAgXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFkZT4wKSB0aGlzLmZhZGUgLT0gMC4wMzsgLy9mYWRlIG9uIGRlYXRoIFxuICAgICAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuZmFkZTsgXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHt0aGlzLmZhZGUgPSAwfSwgXCI0NTBcIikgO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RpbGVzLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHt0aGlzLmFsaXZlID0gZmFsc2V9LCBcIjQ1MFwiKSA7fSBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0gIFxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDEgJiYgdGhpcy5zdGF0ZSAhPSdkaWUnKXsgLy9oZWFsdGggYmFyXG4gICAgICAgICAgICBpZiAoIXRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYm9zcyddKVxuICAgICAgICAgICAgICAgIHtjdHguZmlsbFN0eWxlID0gXCIjMmIyYjJiXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KzcwLCA2MCwgMTIpOyAvL2VtcHR5IGJveFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM5OTBjMDJcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54KzEsIHRoaXMucG9zaXRpb24ueSs3MSwgTWF0aC5mbG9vcig1OCooMS0odGhpcy5tYXhIZWFsdGggLSB0aGlzLmhlYWx0aCkvdGhpcy5tYXhIZWFsdGgpKSwgMTApOyAvLyBsaWZlIGJhclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy9ib3NzIGhlYWx0aCBiYXJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMmIyYjJiXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueC01LCB0aGlzLnBvc2l0aW9uLnkrMTMxLCA2NSwgMTYpOyAvL2VtcHR5IGJveFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM5OTBjMDJcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LTQsIHRoaXMucG9zaXRpb24ueSsxMzIsIE1hdGguZmxvb3IoNjMqKDEtKHRoaXMubWF4SGVhbHRoIC0gdGhpcy5oZWFsdGgpL3RoaXMubWF4SGVhbHRoKSksIDE0KTsgLy9lbXB0eSBib3hcbiBcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnNpZGUgPT0gMCl7IC8vIHN1bW1vbiBuYW1lIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNzsgXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMucG9zaXRpb24ueCsxNSwgdGhpcy5wb3NpdGlvbi55K3RoaXMuaGVpZ2h0KzE3LCAzNSwgMTUsIDIpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDEuMDsgXG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gXCIxMXB4IGFyaWFsXCJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnOyBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5sYWJlbCwgdGhpcy5wb3NpdGlvbi54KzMyLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy5oZWlnaHQrMjcpIDsgICAgICAgICAgXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbWFnZSA9IGFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7ICAgICAgIFxuICAgICAgICAvL2ltYWdlID0gYnVmZmVyOyBcblxuICAgICAgICBpZiAoIXRoaXMubGVmdCl7Ly9mbGlwIGJhc2VkIG9uIHNwcml0ZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgLXRoaXMucG9zaXRpb24ueC10aGlzLndpZHRoK3RoaXMueE9mZit0aGlzLnhPZmYyLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy55T2ZmICk7fVxuICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngrdGhpcy54T2ZmK3RoaXMueE9mZjIsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYpOyB9XG4gICAgXG4gICAgICAgIGlmICh0aGlzLmNoaWxsQW1vdW50PjApe1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IC8vIEltYWdlIHRpbnRpbmdcbiAgICAgICAgICAgIGJ1ZmZlci53aWR0aCA9IDIwMDsvL2ltYWdlLndpZHRoO1xuICAgICAgICAgICAgYnVmZmVyLmhlaWdodCA9IDQwMDsvL2ltYWdlLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGJ0eCA9IGJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgYnR4LmRyYXdJbWFnZShpbWFnZSwgMCwwKTtcbiAgICAgICAgICAgIGJ0eC5maWxsU3R5bGUgPSBcIiMyYzY4ZGNcIjtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbXVsdGlwbHknO1xuICAgICAgICAgICAgYnR4LmZpbGxSZWN0KDAsMCxidWZmZXIud2lkdGgsIGJ1ZmZlci5oZWlnaHQpO1xuICAgICAgICAgICAgYnR4Lmdsb2JhbEFscGhhID0gMC44O1xuICAgICAgICAgICAgYnR4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24taW5cIjtcbiAgICAgICAgICAgIGJ0eC5kcmF3SW1hZ2UoaW1hZ2UsMCwwKTsgXG5cbiAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0KXtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlciwgLXRoaXMucG9zaXRpb24ueC10aGlzLndpZHRoK3RoaXMueE9mZiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZil9XG4gICAgICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGJ1ZmZlciwgdGhpcy5wb3NpdGlvbi54K3RoaXMueE9mZiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZil9XG4gICAgICAgIH1cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7IFxuXG4gICAgICAgIGlmICh0aGlzLnBvaXNvbkFtb3VudD4wICYmIHRoaXMuaGVhbHRoPjApe1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBvaXNvbkxvYWRlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2lzb25HcmFwaGljID0gbmV3IFNwcml0ZUFuaW1hdGlvbigncG9pc29uRWZmZWN0L3BvaXNvbj8ucG5nJywgNCwgMTAsIFwicG9pc29uXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9pc29uTG9hZGVkID0gdHJ1ZTsgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb2lzb25TcHJpdGVJbWFnZSA9IHRoaXMucG9pc29uR3JhcGhpYy5nZXRJbWFnZShwYXVzZSk7IFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ib3NzKSB7Y3R4LmRyYXdJbWFnZShwb2lzb25TcHJpdGVJbWFnZSx0aGlzLnBvc2l0aW9uLngtMTAsdGhpcy5wb3NpdGlvbi55LXRoaXMuaGVpZ2h0Kzc1KX1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBjdHguZHJhd0ltYWdlKHBvaXNvblNwcml0ZUltYWdlLHRoaXMucG9zaXRpb24ueC0xMCx0aGlzLnBvc2l0aW9uLnktdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ICAgXG4gICAgXG4gICAgZHJhd1Byb2ooY3R4LCBwYXVzZSl7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsIHBhdXNlKSApIC8vZHJhdyBwcm9qZWN0aWxlcyBcbiAgICAgICAgfSAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgdXBkYXRlKGdhbWUpe1xuICAgICAgICBpZiAodGhpcy5zaWRlID09PSAxKXsgIC8vIE1vYiBcbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWx0aD4wKXsgICAgIFxuICAgICAgICAgICAgICAgIGxldCBjaGlsbERpcmVjdCA9IDE7ICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFg8MCkoY2hpbGxEaXJlY3Q9IC0xKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KmNoaWxsRGlyZWN0Pj0wLjQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPSdhdHRhY2snKSB0aGlzLnN0YXRlID0gJ3dhbGsnOyAvL2NhbmNlbHMgYXR0YWNrIFxuICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYXR0YWNrQ0Q+MCkgdGhpcy5zdGF0ZSA9PSAnaGl0JzsgXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnN0YXRlID0gJ3dhbGsnO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMucG9zaXRpb24ueDwtdGhpcy53aWR0aCoyKSB7dGhpcy5wb3NpdGlvbi54ID0gLXRoaXMud2lkdGgqMn07IC8vbGVmdCBib3JkZXJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGgpIHt0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoO30gLy9yaWdodCBib3JkZXJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53ZWlyZCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbC10aGlzLndlaXJkU3RhcnQ+IHRoaXMud2VpcmRUaW1lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2VpcmRTdGFydCA9IGdhbWUuZ2FtZVRpbWVSZWFsOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2VpcmRUaW1lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjIwMDApKzUwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRYICA9IC10aGlzLnNwZWVkWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWD4wKSB7dGhpcy53ZWlyZFRpbWUrPTcwMH07IC8vYmlhcyBtb3ZpbmcgZm9yd2FyZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWDwwICYmIHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aCkgdGhpcy5zcGVlZFggPSBhYnModGhpcy5zcGVlZFgpOyBcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gICAgIHRoaXMucm9hbSA9IHRydWU7IFxuICAgICAgICAgICAgLy8gICAgIHRoaXMucm9hbVRpbWUgPSA1MDAwO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucm9hbVkgPSB0aGlzLmxhbmUqZ2FtZS5yb3dIZWlnaHQ7IFxuICAgICAgICAgICAgLy8gICAgIHRoaXMucm9hbUxpbWl0cyA9IFswLCBnYW1lLnJvd0hlaWdodCwgZ2FtZS5yb3dIZWlnaHQqMl07IC8vMCwxLDJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmRlc3RpbmF0aW9uID0gMDtcbiAgICAgICAgICAgIC8vICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtVGltZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtVGltZSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7IC8vcmFuZG9tIDAsMSwyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1UaW1lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjI1MCkrMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcGVlZFkgPSAzOy8vXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KmNoaWxsRGlyZWN0PD0xKSB7c3BlZWRZPTF9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3BlZWRYLXRoaXMuY2hpbGxBbW91bnQqY2hpbGxEaXJlY3Q8PTIpIHtzcGVlZFk9Mn07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvYW1ZPiB0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55Kz1zcGVlZFkgO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtWS09c3BlZWRZIDtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvYW1ZPHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnktPXNwZWVkWSA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1ZKz1zcGVlZFk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtWSsyPiB0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0gJiYgdGhpcy5yb2FtWS0yPHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gKHRoaXMucm9hbVktdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1ZID0gdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9hbVkgPT0gdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZSA9IHRoaXMucm9hbUxpbWl0cy5pbmRleE9mKHRoaXMucm9hbVkpfTsgLy91cGRhdGUgbGFuZSBkdXJpbmcgbW92ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9pc29uVGltZT4wKXsgLy8vUE9JU09OXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbC10aGlzLnBvaXNvblRpY2s+PTEwMDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSB0aGlzLnBvaXNvbkFtb3VudDtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5wb2lzb25EYW1hZ2UgKz0gdGhpcy5wb2lzb25BbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pc29uVGltZSAtPSAxOyAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pc29uVGljayA9IGdhbWUuZ2FtZVRpbWVSZWFsOyAvL3VwZGF0ZSB0aWNrIHRpbWUgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5wb2lzb25UaW1lID09IDApe3RoaXMucG9pc29uQW1vdW50ID0gMDsgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaXNvblN0YWNrID0gMDsgfS8vZHJvcCBwb2lzb24gc3RhY2tzXG5cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxsQW1vdW50PjApe3RoaXMuY2hpbGxBbW91bnQtPTAuMDA1fSAvL0NISUxMIFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2hpbGxBbW91bnQ8MCl7dGhpcy5jaGlsbEFtb3VudD0wfTtcblxuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbC10aGlzLmtub2NrYmFja1RpbWUgPjEwMDApe3RoaXMua25vY2tiYWNrRm9yY2U9MH0gLy9tYXggMnNcblxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmtub2NrYmFja0ZvcmNlKT4wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnaGl0J1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtub2NrYmFja1Jlc2lzdCs9MC4wMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMua25vY2tiYWNrRm9yY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZS09dGhpcy5rbm9ja2JhY2tSZXNpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoKzUwKXt0aGlzLnBvc2l0aW9uLng9dGhpcy5nYW1lV2lkdGgrNTB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZTwwKSB0aGlzLmtub2NrYmFja0ZvcmNlID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSAvL2JhY2t3YXJkc1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSs9dGhpcy5rbm9ja2JhY2tSZXNpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZT4wKSB0aGlzLmtub2NrYmFja0ZvcmNlID0gMFxuICAgICAgICAgICAgICAgICAgICB9OyAvL2ZvcndhcmRzIFxuXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPSdhdHRhY2snKXt0aGlzLnBvc2l0aW9uLnggLT0gKHRoaXMuc3BlZWRYLXRoaXMuY2hpbGxBbW91bnQqY2hpbGxEaXJlY3QpfVxuICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gdGhpcy5zcGVlZFk7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWT4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZFktPTAuNTsgXG4gICAgICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanVtcCl7IC8vZ3Jhdml0eVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gMSp0aGlzLmdyYXZpdHlUaW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHlUaW1lKz0wLjU7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5wb3NpdGlvbi55ID4gdGhpcy5nYW1lSGVpZ2h0LTExMCApeyAvL2JvdHRvbSBib3JkZXIgKHVwZGF0ZSBmb3IgcGxhdGZvcm1zKVxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLmdhbWVIZWlnaHQtMTEwO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuanVtcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTsgXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnO1xuICAgICAgICAgICAgICAgIC8vIH0gXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGU9PSdzdGFuZCcpeyAgIC8vZW1vdGVzIGZvciBzdW1tb25zXG4gICAgICAgICAgICBpZiAodGhpcy5lbW90ZVRpbWUgPT0gMCApe1xuICAgICAgICAgICAgICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApOyAvLzE6IHNsZWVwLCAyOiBpZ25vcmVcbiAgICAgICAgICAgICAgICBsZXQgdGltZSA9IDA7IFxuICAgICAgICAgICAgICAgIGlmIChyYW5kb20gPDUpe3RoaXMuc3RhdGUgPSAnZW1vdGUxJzsgdGltZSA9IHRoaXMuZW1vdGVMZW5ndGhbMF07fVxuICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMuc3RhdGUgPSAnZW1vdGU2Jzt0aW1lID0gdGhpcy5lbW90ZUxlbmd0aFs1XSB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lT3V0ID0gc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbW90ZVRpbWUgPSA2MDArTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjUwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnfSwgdGltZSkgOy8vaG93IGxvbmcgdG8gcnVuIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIC8vIGlmIChnYW1lLnBhdXNlKXtjbGVhclRpbWVvdXQodGhpcy5lbW90ZVRpbWVPdXQpfTsgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHRoaXMuZW1vdGVUaW1lLS07IFxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IHRoaXMucHJvamVjdGlsZXMuZmlsdGVyKCAgLy9kZWxldGVzIHByb2plY3RpbGVzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LmRlbGV0ZSAhPT0gdHJ1ZTsgXG4gICAgICAgIH0pO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdGlsZXMpOyBcbiAgICAgXG5cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0QgPjApe3RoaXMuYXR0YWNrQ0QtLX1cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0Q9PTApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dGFja2VkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdyeS5yZXNldCgpOyBcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCt0aGlzLndpZHRoMi8yLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy5oZWlnaHQyLCBcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoLXRoaXMud2lkdGgyLCB0aGlzLmhlaWdodF07IFxuICAgICAgICBcblxuXG5cblxuICAgIH1cblxufSIsImltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uZXl7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgb2JqLCB2YWx1ZSwgc3BlZWRYID0gMCl7XG4gICAgICAgIHRoaXMueU9mZiA9IDAgO1xuICAgICAgICBpZiAob2JqLmJvc3MpeyB0aGlzLnlPZmYgKz03MH1cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgIC8vcG9zaXRpb24gXG4gICAgICAgICAgICB4OiAob2JqLnBvc2l0aW9uLngpK29iai53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IG9iai5wb3NpdGlvbi55KzQwK3RoaXMueU9mZn1cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueD5nYW1lLmdhbWVXaWR0aC0xMCl7dGhpcy5wb3NpdGlvbi54ID0gZ2FtZS5nYW1lV2lkdGgtMzA7fSAvL2tpbGxpbmcgb2ZmLXNjcmVlbiAocmlnaHQpXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucG9zaXRpb24ueDwxMCl7dGhpcy5wb3NpdGlvbi54PTMwfTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDM1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDM1OyBcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlOyBcbiAgICAgICAgdGhpcy5zcGF3blRpbWUgPSAgZ2FtZS5nYW1lVGltZVJlYWw7IFxuICAgICAgICB0aGlzLnBvcFVwID0gMjU7IFxuICAgICAgICB0aGlzLmRyb3BEb3duID0gMjM7XG4gICAgICAgIHRoaXMuc3BlZWRYID0gc3BlZWRYOyBcbiAgICAgICAgdGhpcy5zcGVlZFkgPSAxOyBcbiAgICAgICAgdGhpcy5hY2NlbFVwID0gMDtcbiAgICAgICAgdGhpcy5hY2NlbERvd24gPSAwO1xuICAgICAgICB0aGlzLmRlbGV0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZhZGUgPSAxOyBcbiAgICAgICAgdGhpcy5zdGFydEZhZGUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuZmxvYXQgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMubG9zdCA9IGZhbHNlOyBcblxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueS0yNSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcbiAgICAgICAgaWYgKHRoaXMudmFsdWU+PTEwMCl7dGhpcy50eXBlID0gJzQnO30gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWU+PTUwKXt0aGlzLnR5cGUgPSAnMyc7fSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZT49MTApe3RoaXMudHlwZSA9ICcyJzt9IFxuICAgICAgICBlbHNlIHRoaXMudHlwZSA9ICcxJzsgXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyBcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpe1xuICAgICAgICB0aGlzLnN0YW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbignY29pbi9Db2luJyt0aGlzLnR5cGUrJ18/LnBuZycsIDMsIDYsIFwic3RhbmRcIik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnN0YW5kXVxuICAgIH1cblxuICAgIGRyYXcoY3R4LCBwYXVzZSkge1xuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBpZiAodGhpcy5zdGFydEZhZGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZsb2F0KXt0aGlzLmZhZGUgLT0gMC4wMTU7fSAvL3Nsb3dlciBmYWRlIHdoZW4gcGlja3VwXG4gICAgICAgICAgICBlbHNlIHRoaXMuZmFkZSAtPSAwLjAzO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5mYWRlOyBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7dGhpcy5kZWxldGU9IHRydWV9LCBcIjQ1MFwiKSA7XG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKCdzdGFuZCcpKTsgXG4gICAgICAgIGNvbnN0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgXG5cblxuICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUoZ2FtZSl7XG4gICAgICAgIGlmICh0aGlzLnBvcFVwPjApe1xuICAgICAgICAgICAgdGhpcy5hY2NlbFVwKz0wLjE7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gKDQuNS10aGlzLmFjY2VsVXApOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCAtPXRoaXMuc3BlZWRYOyBcbiAgICAgICAgICAgIHRoaXMucG9wVXAgLT0gMTsgXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcm9wRG93bj4wKXtcbiAgICAgICAgICAgIHRoaXMuYWNjZWxEb3duKz0wLjE7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gKDIrdGhpcy5hY2NlbERvd24pO1xuICAgICAgICAgICAgdGhpcy5kcm9wRG93biAtPSAxOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCAtPXRoaXMuc3BlZWRYOyBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mbG9hdCl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnktPTE7IFxuICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLnBvc2l0aW9uLngrZ2FtZS5wbGF5ZXIud2lkdGg8dGhpcy5wb3NpdGlvbi54KXt0aGlzLnBvc2l0aW9uLngtPTAuOCAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZ2FtZS5wbGF5ZXIucG9zaXRpb24ueD50aGlzLnBvc2l0aW9uLngpIHRoaXMucG9zaXRpb24ueCs9MC44O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdhbWUuZ2FtZVRpbWVSZWFsLXRoaXMuc3Bhd25UaW1lPj0xODAwMCl7IC8vMTggcyBcbiAgICAgICAgICAgIHRoaXMuc3RhcnRGYWRlPXRydWU7XG4gICAgICAgICAgICB0aGlzLmxvc3QgPSB0cnVlOyBcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG4gICAgfVxuXG4gICAgXG59XG4iLCJpbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnOyBcbmltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gNDA7IC8vc3ByaXRlIHNpemUgXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gODA7IFxuICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgIHg6IHRoaXMud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtIDIqZ2FtZS5yb3dIZWlnaHQsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbGF5ZXJYID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yICsxODsgXG4gICAgICAgIHRoaXMuZWxlUG9zaXRpb25zID0gWyBbdGhpcy5wbGF5ZXJYIC02MCwgdGhpcy5wb3NpdGlvbi55XSwgW3RoaXMucGxheWVyWCAtNDAsIHRoaXMucG9zaXRpb24ueS00MF0sXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICwgdGhpcy5wb3NpdGlvbi55LTU1XSwgW3RoaXMucGxheWVyWCArNDAsIHRoaXMucG9zaXRpb24ueS00MF0sIFxuICAgICAgICAgICAgW3RoaXMucGxheWVyWCArNjAsIHRoaXMucG9zaXRpb24ueV0gXTtcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBnYW1lLnJvd0hlaWdodDtcbiAgICAgICAgdGhpcy5sYW5lID0gMTsgXG4gICAgICAgIHRoaXMuZmxvb3IgPSAgdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAoMSt0aGlzLmxhbmUpKnRoaXMucm93SGVpZ2h0XG4gICAgICAgIHRoaXMuc3BlZWQgPSAzO1xuICAgICAgICB0aGlzLmtub2NrYmFja0ZvcmNlID0gMDsgXG4gICAgICAgIHRoaXMubGVmdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpZGUgPTA7XG4gICAgICAgIHRoaXMuc3BlZWRYID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZFkgPSAwOyBcbiAgICAgICAgdGhpcy5qdW1wID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUgPSAxOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IFtdO1xuICAgICAgICB0aGlzLm5hbWUgPSAnV2l6JztcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1MDsgXG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTsgXG4gICAgICAgIHRoaXMuZGFtYWdlRGVhbHQgPSAwOyBcbiAgICAgICAgdGhpcy5pbnZ1bG5UaW1lID0gIDA7IFxuICAgICAgICB0aGlzLmludnVsbkRhcmsgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuaW52dWxuRGFya1RpbWUgPSAwO1xuICAgICAgICB0aGlzLmtub2NrYmFja1RocmVzaCA9IDE7IFxuICAgICAgICB0aGlzLmtub2NrYmFja1N1bSA9IDBcbiAgICAgICAgdGhpcy5hcm1vciA9IDA7IFxuICAgICAgICB0aGlzLnRvdWNoSGl0ID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmF0dGFja1NwZWVkID0gMzU7IFxuICAgICAgICB0aGlzLmF0dGFja0NEID0gMDsgXG4gICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7IFxuICAgICAgICB0aGlzLmN1clRpbGUgPSAwO1xuICAgICAgICB0aGlzLmVsZW1lbnRMaXN0PSBbXTsgLy9hZGQgc3ByaXRlcyBoZXJlIFxuICAgICAgICAvLyB0aGlzLmVsZW1lbnRMaXN0ID0gWydCbGF6ZScsJ0Rhd24nLCdOaWdodCcsJ1RodW5kZXInLCdXaW5kJ107XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlID0ge30gOyBcbiAgICAgICAgdGhpcy5lbGVtZW50SW5mbyA9IHsgJ0JsYXplJzogeydzdGFuZCc6NywgJ21vdmUnOiA3LCAnYXR0YWNrJzogOCwgJ3Byb2onOidyZWRCYWxsJyB9LFxuICAgICAgICAgICAgJ0Rhd24nOiB7J3N0YW5kJzogMTUsICdtb3ZlJzoxNSwgJ2F0dGFjayc6IDgsICdwcm9qJzoneWVsbG93QmFsbCd9LFxuICAgICAgICAgICAgJ05pZ2h0JzogeydzdGFuZCc6NywgJ21vdmUnOjcsICdhdHRhY2snOiA4LCAncHJvaic6J3B1cnBsZUJhbGwnfSxcbiAgICAgICAgICAgICdUaHVuZGVyJzogeydzdGFuZCc6IDcsICdtb3ZlJzo3LCAnYXR0YWNrJzogOCwgJ3Byb2onOidncmVlbkJhbGwnLH0sIFxuICAgICAgICAgICAgJ1dpbmQnOiB7J3N0YW5kJzogNywgJ21vdmUnOjcsICdhdHRhY2snOiA4LCAncHJvaic6J2JsdWVCYWxsJyx9IH1cbiAgICAgICAgdGhpcy5lbGVtZW50U3RhdGUgPSBbJ3N0YW5kJywnc3RhbmQnLCdzdGFuZCcsJ3N0YW5kJywnc3RhbmQnXTsgXG4gICAgICAgIHRoaXMucmVjYWxsTGlzdCA9IFsncmVkRHJhZ29uMCcsICdyZWREcmFnb24xJywgJ2JsdWVEcmFnb24wJywgJ2JsdWVEcmFnb24xJywgXG4gICAgICAgICdncmVlbkRyYWdvbjAnLCdncmVlbkRyYWdvbjEnLCdibGFja0RyYWdvbjAnLCAnYmxhY2tEcmFnb24xJ10gO1xuICAgICAgICB0aGlzLnJlY2FsbEltYWdlcyA9e307XG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyBcbiAgICAgICAgdGhpcy5lbGVtZW50YWxzKCk7XG5cbiAgICAgICAgdGhpcy5zdW1tb25Db3VudCA9IDA7IFxuICAgICAgICB0aGlzLm1vbmV5ID0gNTA7ICAvLzUwXG4gICAgICAgIGlmIChnYW1lLmxldmVsID09IDIpIHt0aGlzLm1vbmV5ID0gMTIwMH0gLy9zdGFydGluZyBtb25leSBiYXNlZCBvbiBsZXZlbDtcbiAgICAgICAgZWxzZSBpZiAoZ2FtZS5sZXZlbCA9PSAzKSB7dGhpcy5tb25leSA9IDUwMDB9XG4gICAgICAgIHRoaXMuc3VtbW9uQ29zdCA9IFs1MCwgMTAwLCAxNTAsIDIwMCwgNjQwXTtcbiAgICAgICAgdGhpcy51cGdyYWRlQ29zdCA9IFsyMDAsIDQwMCwgODAwLCAxNjAwLCAzMjAwXTsgXG4gICAgICAgIHRoaXMuZWxlbWVudENvc3QgPSBbNTAsIDEwMCwgMjAwLCA0MDAsIDgwMF07IFxuXG4gICAgICAgIHRoaXMuZGFtYWdlVGFrZW4gPSAwOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmxvYXQgPSAyMDtcbiAgICAgICAgdGhpcy5mbG9hdERpcmVjdCA9IDE7IFxuICAgICAgICB0aGlzLmdyYXZlU3Bhd24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ncmF2ZVggPSAwIDtcbiAgICAgICAgdGhpcy5ncmF2ZVkgPSAtMjA7IFxuICAgICAgICB0aGlzLmdyYXZlU3RhdGUgPSAnbW92ZSdcbiAgICAgICAgLy91cGdyYWRlc1xuICAgICAgICB0aGlzLmRhbWFnZU11bHRpID0gMTsgXG4gICAgICAgIHRoaXMubG9vdE11bHRpID0gMTtcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMuc3BlZWRNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLnBpZXJjZSA9IDA7IFxuXG4gICAgICAgIHRoaXMuY2hpbGwgPSAwO1xuICAgICAgICB0aGlzLmFyZWEgPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb24gPSAyOyBcbiAgICAgICAgdGhpcy5leHBsb2RlRGFtYWdlRGVhbHQgPSAwIFxuXG5cblxuICAgIH1cbiAgICBlbGVtZW50YWxzKCl7IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXsgLy8gTG9hZCBlbGVtZW50YWwgc3ByaXRlcyBcbiAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50U3ByaXRlc1t0aGlzLmVsZW1lbnRMaXN0W2ldXSl7XG4gICAgICAgICAgICAgICAgbGV0IGVsZVR5cGUgPSB0aGlzLmVsZW1lbnRMaXN0W2ldOyBcbiAgICAgICAgICAgICAgICB0aGlzLnN0YW5kRWxlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihlbGVUeXBlK1wiL3N0YW5kXz8ucG5nXCIsIHRoaXMuZWxlbWVudEluZm9bZWxlVHlwZV1bJ3N0YW5kJ10sIDYsIFwic3RhbmRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRWxlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihlbGVUeXBlK1wiL21vdmVfPy5wbmdcIiwgdGhpcy5lbGVtZW50SW5mb1tlbGVUeXBlXVsnbW92ZSddLCA2LCBcIndhbGtcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tFbGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKGVsZVR5cGUrXCIvYXR0YWNrMV8/LnBuZ1wiLCB0aGlzLmVsZW1lbnRJbmZvW2VsZVR5cGVdWydhdHRhY2snXSwgNiwgXCJzd2luZzFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlc1tlbGVUeXBlXSA9IFt0aGlzLnN0YW5kRWxlLCB0aGlzLm1vdmVFbGUsIHRoaXMuYXR0YWNrRWxlXTsgXG4gICAgICAgICAgICAgICAgLy97J3N0YW5kJzogdGhpcy5zdGFuZEVsZSwgJ21vdmUnOiB0aGlzLm1vdmVFbGUsICdhdHRhY2snOiB0aGlzLmF0dGFja0VsZX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSAxNTsgXG4gICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2FsZXJ0Xz8ucG5nXCIsIDMsIHRoaXMuZnJhbWVzLCBcInN0YW5kXCIpOyAvL2NvbWJhdCBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy53YWxrID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC93YWxrMV8/LnBuZ1wiLCAzLCAxMCwgXCJ3YWxrXCIpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgIHRoaXMuanVtcCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvanVtcF8/LnBuZ1wiLCAxLCAxMCwgXCJqdW1wXCIpOyAvL2p1bXAgc3ByaXRlcztcbiAgICAgICAgdGhpcy5yZWxheCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3RhbmQxXz8ucG5nXCIsIDMsIDMwLCBcInJlbGF4XCIpOyAvLyBpZGxlIHBvc2UgXG4gICAgICAgIHRoaXMuY2FzdCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvYWxlcnRfPy5wbmdcIiwgMywgMTAsIFwic3RhbmRcIik7IFxuICAgICAgICB0aGlzLnN3aW5nMSA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPMV8/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzFcIiwgdHJ1ZSk7IC8vYXR0YWNrIHNwcml0ZXM7XG4gICAgICAgIHRoaXMuc3dpbmcyID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9zd2luZ08yXz8ucG5nXCIsIDMsIDEyLCBcInN3aW5nMlwiLCB0cnVlKTsgXG4gICAgICAgIHRoaXMuc3dpbmczID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9zd2luZ08zXz8ucG5nXCIsIDMsIDEyLCBcInN3aW5nM1wiLCB0cnVlKTsgXG4gICAgICAgIHRoaXMuZGVhZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvZGVhZF8/LnBuZ1wiLCAzLCAyMDAsIFwiZGVhZFwiKTsgXG4gICAgICAgIHRoaXMuYXR0YWNrQW5pbSA9IFsnc3dpbmcxJywgJ3N3aW5nMicsICdzd2luZzMnXTsgXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnN0YW5kLCB0aGlzLndhbGssIHRoaXMuanVtcCwgdGhpcy5zd2luZzEsIHRoaXMuc3dpbmcyLCB0aGlzLnN3aW5nMywgdGhpcy5jYXN0LCB0aGlzLmRlYWQsIHRoaXMucmVsYXggXTsgXG4gICAgICAgIHRoaXMuZ3JhdmVNb3ZlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcImdyYXZlL21vdmVfPy5wbmdcIiwgMCwgMzAwLCBcIm1vdmVcIik7IFxuICAgICAgICB0aGlzLmdyYXZlTGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJncmF2ZS9zdGFuZF8/LnBuZ1wiLCA1LCAxMiwgXCJsYW5kXCIsIHRydWUgKTsgXG4gICAgICAgIHRoaXMuZ3JhdmVBbmltYXRpb25zID0gW3RoaXMuZ3JhdmVNb3ZlLCB0aGlzLmdyYXZlTGFuZF07XG5cbiAgICAgICAgLy8gdGhpcy5yZWNhbGxJbWFnZXMgPSBbJ3JlZERyYWdvbjAnLCAncmVkRHJhZ29uMScsICdibHVlRHJhZ29uMCcsICdibHVlRHJhZ29uMScsIFxuICAgICAgICAvLyAnZ3JlZW5EcmFnb24wJywnZ3JlZW5EcmFnb24xJywnYmxhY2tEcmFnb24wJywgJ2JsYWNrRHJhZ29uMSddIDtcbiAgICAgICAgZm9yIChsZXQgaSA9MDtpPHRoaXMucmVjYWxsTGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGxldCBpbWFnZSAgPSBuZXcgSW1hZ2UoKTsgXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSAnaW1hZ2VzL3JlY2FsbC8nK3RoaXMucmVjYWxsTGlzdFtpXSsnLnBuZyc7IFxuICAgICAgICAgICAgdGhpcy5yZWNhbGxJbWFnZXNbdGhpcy5yZWNhbGxMaXN0W2ldXSA9IGltYWdlOyBcbiAgICAgICAgfVxuICAgICAgICBcblxuXG4gICAgfVxuICAgIGVtb3RlKGdhbWUpe1xuICAgICAgICBpZiAoZ2FtZS53YXZlRmluaXNoKXtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09J3N0YW5kJyl7dGhpcy5zdGF0ZSA9ICdyZWxheCc7fSBcbiAgICB9fSBcblxuICAgIGF0dGFjayhwYXVzZSl7XG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEIDw9IDAgJiYgdGhpcy5hbGl2ZSAmJiAhcGF1c2UgKXtcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5wb3NpdGlvbi54LTI1OyBcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe3ggKz01MDt9XG4gICAgICAgICAgICB0aGlzLnByb2ogPSBuZXcgUHJvamVjdGlsZSh0aGlzLCAnbGlnaHRuaW5nYmFsbCcseCwgdGhpcy5wb3NpdGlvbi55KTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5hdHRhY2tBbmltLnNoaWZ0KCk7IFxuICAgICAgICAgICAgdGhpcy5hdHRhY2tBbmltLnB1c2godGhpcy5zdGF0ZSk7IFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSkucmVzZXQoKTsgXG4gICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCh0aGlzLnByb2opO1xuICAgICAgICAgICAgLy9zZXRUaW1lb3V0KCgpPT4ge3RoaXMucHJvamVjdGlsZXMucHVzaCh0aGlzLnByb2opfSwgXCIyMDBcIik7IC8vc2xpZ2h0IGRlbGF5IGZvciBhbmltYXRpb25cblxuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuZWxlbWVudExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5lbGVQb3NpdGlvbnNbaV1bMF07Ly9mYWNpbmcgbGVmdFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe3ggKz0yMH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qID0gbmV3IFByb2plY3RpbGUodGhpcywgdGhpcy5lbGVtZW50SW5mb1t0aGlzLmVsZW1lbnRMaXN0W2ldXVsncHJvaiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgeCwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMV0rMTggKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2FsbEljb24oY3R4LCBnYW1lKXtcbiAgICAgICAgaWYgKGdhbWUucmVjYWxsU3RvcmFnZSl7XG4gICAgICAgICAgICBsZXQgaW1hZ2VUeXBlID0gZ2FtZS5yZWNhbGxTdG9yYWdlLnR5cGUgKyBnYW1lLnJlY2FsbFN0b3JhZ2UuZm9ybTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5yZWNhbGxJbWFnZXNbaW1hZ2VUeXBlXSwgdGhpcy5wb3NpdGlvbi54KzIyLCB0aGlzLnBvc2l0aW9uLnktNSk7IFxuXG4gICAgICAgICAgLy8gIHRoaXMucmVjYWxsSW1hZ2VzW2dhbWUucmVjYWxsU3RvcmFnZS50eXBlXVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgc3VtbW9uQXR0YWNrKCl7fTsgXG4gICAgZHJhdyhjdHgsIHBhdXNlKXtcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgIGxldCBpbWFnZSA9IGFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7ICAgLy9nZXQgc3ByaXRlXG5cbiAgICAgICAgLy8gaWYgKHRoaXMuaW52dWxuVGltZSU0Pj0xICYmIHRoaXMuaW52dWxuVGltZT4wICYmIHRoaXMuYWxpdmUpIHtjdHguZ2xvYmFsQWxwaGEgPSAwLjJ9O1xuICAgICAgICAvL2lmICh0aGlzLmhpdGJveCl7IGN0eC5maWxsUmVjdCh0aGlzLmhpdGJveFswXSx0aGlzLmhpdGJveFsxXSwgdGhpcy5oaXRib3hbMl0sIHRoaXMuaGl0Ym94WzNdKTt9XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMuY3VyVGlsZSo4MCwgdGhpcy5wb3NpdGlvbi55LCA4MCwgODApOyAvL3NlbGVjdGVkIHRpbGVcbiAgICAgICAgLy8gY3R4LmZpbGxSZWN0KHRoaXMuaGl0Ym94WzBdLSg3NSooLTErdGhpcy5sb290TXVsdGkpKSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCA4MCk7IC8vbG9vdCByYW5nZVxuICAgICAgICAvLyBjdHguZmlsbFJlY3QodGhpcy5oaXRib3hbMF0sIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCs3NSooLTErdGhpcy5sb290TXVsdGkpLCA4MCk7IC8vbG9vdCByYW5nZVxuXG4gICAgICAgIGlmICh0aGlzLmxlZnQpe1xuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgLXRoaXMucG9zaXRpb24ueC0xLjUqdGhpcy53aWR0aC0xNSwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngtNSwgdGhpcy5wb3NpdGlvbi55KTsgfVxuICAgICAgICBcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW52dWxuRGFyayAmJiB0aGlzLmFsaXZlKXtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyAvLyBJbWFnZSB0aW50aW5nXG4gICAgICAgICAgICBidWZmZXIud2lkdGggPSAyMDA7Ly9pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIGJ1ZmZlci5oZWlnaHQgPSAyMDA7Ly9pbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBidHggPSBidWZmZXIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGJ0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsMCk7XG4gICAgICAgICAgICBidHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgICAgICAgICBidHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ211bHRpcGx5JztcbiAgICAgICAgICAgIGJ0eC5maWxsUmVjdCgwLDAsYnVmZmVyLndpZHRoLCBidWZmZXIuaGVpZ2h0KTtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxBbHBoYSA9IDAuNjtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLWluXCI7XG4gICAgICAgICAgICBidHguZHJhd0ltYWdlKGltYWdlLDAsMCk7IFxuXG4gICAgICAgICAgICBpZiAodGhpcy5sZWZ0KXtcbiAgICAgICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXIsIC10aGlzLnBvc2l0aW9uLngtMS41KnRoaXMud2lkdGgtMTAsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgICAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGJ1ZmZlciwgdGhpcy5wb3NpdGlvbi54LTUsIHRoaXMucG9zaXRpb24ueSk7IH1cbiAgICAgICAgfVxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICAgIFxuICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7IC8vcmVzZXRzIFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7fSBcblxuICAgICAgICAvL2VsZW1lbnRhbHMgXG4gICAgICAgIHRoaXMucGxheWVyWCA9IHRoaXMucG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMiArMTg7IFxuICAgICAgICB0aGlzLmVsZVBvc2l0aW9ucyA9IFsgW3RoaXMucGxheWVyWCAtNjAsIHRoaXMucG9zaXRpb24ueSs1XSwgW3RoaXMucGxheWVyWCAtNDAsIHRoaXMucG9zaXRpb24ueS0zNV0sXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICwgdGhpcy5wb3NpdGlvbi55LTU1XSwgW3RoaXMucGxheWVyWCArNDAsIHRoaXMucG9zaXRpb24ueS0zNV0sIFt0aGlzLnBsYXllclggKzYwLCB0aGlzLnBvc2l0aW9uLnkrNV0gXTtcbiAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXsgLy8gTG9hZCBlbGVtZW50YWwgc3ByaXRlcyBcbiAgICAgICAgICAgICAgICBsZXQgZWxlVHlwZSA9IHRoaXMuZWxlbWVudExpc3RbaV07IFxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuZWxlbWVudFN0YXRlW2ldID0gJ3N0YW5kJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50U3RhdGVbaV0gPSAnc3RhbmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gJ3N3aW5nMicgfHx0aGlzLnN0YXRlID09ICdzd2luZzMnKXt0aGlzLmVsZW1lbnRTdGF0ZVtpXT0nc3dpbmcxJ31cbiAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5lbGVtZW50U3ByaXRlc1tlbGVUeXBlXS5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5lbGVtZW50U3RhdGVbaV0pKSAvLyBjb3BpZXMgcGxheWVyIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZVtlbGVUeXBlXSA9IGFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7IC8vcmVzZXRzIEF0dGFjayBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFN0YXRlW2ldPSAnc3RhbmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlc1tlbGVUeXBlXVsyXS5yZXNldCgpIC8vcmVzZXQgXG4gICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxlZnQpe1xuICAgICAgICAgICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdLCAtdGhpcy5lbGVQb3NpdGlvbnNbaV1bMF0tdGhpcy53aWR0aC00NSwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMV0pOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7fVxuICAgICAgICAgICAgICAgIGVsc2UgKGN0eC5kcmF3SW1hZ2UodGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdLCB0aGlzLmVsZVBvc2l0aW9uc1tpXVswXS0yMCwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMV0pKTsgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlID0ge30gLy9jbGVhciBsb2FkZWQgc3ByaXRlc1xuXG4gICAgICAgIGlmICh0aGlzLmdyYXZlU3Bhd24pIHsgXG4gICAgICAgICAgICBpZiAodGhpcy5ncmF2ZVkgPj0gdGhpcy5mbG9vciszNSl7dGhpcy5ncmF2ZVN0YXRlID0nbGFuZCd9XG4gICAgICAgICAgICBlbHNlIHt0aGlzLmdyYXZlWSArPSA4fTsgXG5cbiAgICAgICAgICAgIGxldCBncmF2ZUFuaW1hdGlvbiA9IHRoaXMuZ3JhdmVBbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLmdyYXZlU3RhdGUpKVxuICAgICAgICAgICAgbGV0IGdyYXZlSW1hZ2UgPSBncmF2ZUFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGdyYXZlSW1hZ2UsIHRoaXMuZ3JhdmVYLCB0aGlzLmdyYXZlWSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdQcm9qKGN0eCwgcGF1c2Upe1xuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsIHBhdXNlKSApIC8vZHJhdyBwcm9qZWN0aWxlcyBcbiAgICB9XG5cbiAgICB0ZWxlcG9ydChkaXJlY3Rpb24pe1xuICAgICAgICBpZiAodGhpcy5sYW5lIC0gMSpkaXJlY3Rpb24+LTEgJiYgdGhpcy5sYW5lIC0gMSpkaXJlY3Rpb248MyAmJiB0aGlzLmFsaXZlKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSB0aGlzLnJvd0hlaWdodCpkaXJlY3Rpb247MlxuICAgICAgICAgICAgdGhpcy5sYW5lICs9IC0xKmRpcmVjdGlvbjsgXG4gICAgICAgICAgICB0aGlzLmZsb29yID0gIHRoaXMuZ2FtZUhlaWdodCAtIDQ1IC0gKDErdGhpcy5sYW5lKSp0aGlzLnJvd0hlaWdodH1cbiAgICB9XG4gICAgdXBkYXRlKCl7XG4gICAgICAgIGlmICh0aGlzLmludnVsblRpbWU+MCl7XG4gICAgICAgICAgICB0aGlzLmludnVsblRpbWUtLVxuICAgICAgICAgICAgaWYgKHRoaXMuaW52dWxuVGltZT4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmludnVsbkRhcmtUaW1lICsrXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnZ1bG5EYXJrVGltZT41KSB7dGhpcy5pbnZ1bG5EYXJrID0gZmFsc2U7IHRoaXMuaW52dWxuRGFya1RpbWUgPSAtM31cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmludnVsbkRhcmtUaW1lPjApe3RoaXMuaW52dWxuRGFyayA9dHJ1ZX07XG4gICAgICAgICAgICB9IGVsc2Uge3RoaXMuaW52dWxuRGFyayA9IGZhbHNlfTtcbiAgICAgICAgXG4gICAgICAgIH07IFxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA+MCl7dGhpcy5hdHRhY2tDRC09ICgxKnRoaXMuc3BlZWRNdWx0aSl9O1xuICAgICAgICBpZiAodGhpcy5oZWFsdGg8PTApe3RoaXMuc3RhdGUgPSAnZGVhZCc7IFxuICAgICAgICAgICAgICAgIHRoaXMuYWxpdmU9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JhdmVTcGF3biA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXZlWCA9IHRoaXMucG9zaXRpb24ueCsyMDsgXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IHRoaXMucHJvamVjdGlsZXMuZmlsdGVyKCAgLy9kZWxldGVzIHByb2plY3RpbGVzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LmRlbGV0ZSAhPT0gdHJ1ZTsgXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuYWxpdmUpe1xuICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRYIT0wICYmICF0aGlzLmF0dGFja0FuaW0uaW5jbHVkZXModGhpcy5zdGF0ZSkpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnd2Fsayc7IFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09ICd3YWxrJykgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7IFxuXG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PC0zMCkge3RoaXMucG9zaXRpb24ueCA9IC0zMH07IC8vbGVmdCBib3JkZXJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aCkge3RoaXMucG9zaXRpb24ueCA9IHRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGg7fSAvL3JpZ2h0IGJvcmRlclxuICAgICAgICAgICAgdGhpcy5jdXJUaWxlID0gTWF0aC5mbG9vciggKHRoaXMud2lkdGgvMiArdGhpcy5wb3NpdGlvbi54KS84MCk7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5rbm9ja2JhY2tGb3JjZSk+MCkge3NldFRpbWVvdXQoKCk9Pnt0aGlzLmtub2NrYmFja0ZvcmNlPTB9LCAxMDAwKX07ICAvL0RSIFxuICAgICAgICAgICAgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U+MCl7dGhpcy5rbm9ja2JhY2tGb3JjZS09MC41O31cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U8MCl7dGhpcy5rbm9ja2JhY2tGb3JjZSs9MC41O31cbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCArPSAodGhpcy5zcGVlZFgqdGhpcy5zcGVlZE11bHRpKTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLmtub2NrYmFja0ZvcmNlO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09IHRoaXMuc3BlZWRZOyBcblxuICAgICAgICB9IGVsc2UgeyAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZsb2F0PjApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0wLjEqdGhpcy5mbG9hdERpcmVjdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbG9hdCAtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge3RoaXMuZmxvYXQgPSAyMDsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsb2F0RGlyZWN0ID0gLXRoaXMuZmxvYXREaXJlY3R9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA+IHRoaXMuZmxvb3IpeyAvL2JvdHRvbSBib3JkZXIgKHVwZGF0ZSBmb3IgcGxhdGZvcm1zKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5mbG9vcjtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZID0gMDtcbiAgICAgICAgICAgIHRoaXMuanVtcCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICAgICAgaWYgKHRoaXMuYWxpdmUgJiYgIXRoaXMuYXR0YWNrQW5pbS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7XG4gICAgICAgIH0gXG4gICAgICAgIGlmICh0aGlzLnNwZWVkWT4wKXtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZLT0wLjU7IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmp1bXApeyAvL2dyYXZpdHlcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSAxKnRoaXMuZ3Jhdml0eVRpbWU7XG4gICAgICAgICAgICB0aGlzLmdyYXZpdHlUaW1lKz0wLjU7IFxuICAgICAgICAgICAgaWYgKCF0aGlzLmF0dGFja0FuaW0uaW5jbHVkZXModGhpcy5zdGF0ZSkpIHRoaXMuc3RhdGUgPSAnanVtcCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54KzE1LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cblxuICAgICAgICAvL3RoaXMucG9zaXRpb24ueCs9IDUgLyBkZWx0YVRpbWU7IFxuICAgIH1cbn0iLCJpbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RpbGV7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCB0eXBlPSdlbmVyZ3liYWxsJyx4ID0gMCwgeT0wLCBkaXJlY3Rpb24gPSAxICl7XG4gICAgICAgIHRoaXMudHlwZUluZm8gPSB7ICdlbmVyZ3liYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA5MH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAneWVsbG93QmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogNTAsJ3lPZmYnOjM1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwdXJwbGVCYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA1MCwneU9mZic6MzV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3JlZEJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDUwLCd5T2ZmJzozNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnZ3JlZW5CYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA1MCwneU9mZic6MzV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JsdWVCYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA1MCwneU9mZic6MzV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpcmViYWxsJzogeydzcGVlZCc6IDMsICd0cmF2ZWwnOjEsICdleHBsb2RlJzoyLCAneE9mZic6IDcwLCAneU9mZic6LTEwIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JhdGJhbGwnOiB7J3NwZWVkJzogNiwgJ3RyYXZlbCc6MywgJ2V4cGxvZGUnOjQsICd4T2ZmJzogMTA1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdmaXJlYmFsbDInOiB7J3NwZWVkJzogMTIsICd0cmF2ZWwnOjEsICdleHBsb2RlJzozLCAneE9mZic6IDk1LCAneU9mZic6LTEwIH0sICAvLy0xNSwgKzIwXG4gICAgICAgICAgICAgICAgICAgICAgICAncG9pc29uYmFsbCc6IHsnc3BlZWQnOiA3LCAndHJhdmVsJzoxLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOjg1LCAgJ3lPZmYnOi01IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWNlYmFsbCc6IHsnc3BlZWQnOiA4LCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NCwgJ3hPZmYnOjk1LCAgJ3lPZmYnOi01IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGlnaHRuaW5nYmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjcsICd4T2ZmJzo4MH0sIC8vcGxheWVyIGJhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0aHVuZGVyYmFsbCc6IHsnc3BlZWQnOiAxMiwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjcsICd4T2ZmJzo4MCwneU9mZic6LTEwIH0gfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBwbGF5ZXIuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBwbGF5ZXIuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDIwOyAvL3Nwcml0ZSBzaXplIFxuICAgICAgICB0aGlzLmhlaWdodCA9IDIwOyBcbiAgICAgICAgdGhpcy5leHBsb2RlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmRlbGV0ZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50b3VjaEhpdD0gdHJ1ZTtcbiAgICAgICAgdGhpcy5waWVyY2UgPSBwbGF5ZXIucGllcmNlO1xuICAgICAgICB0aGlzLm93bmVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IHBsYXllci5kYW1hZ2UgKiBwbGF5ZXIuZGFtYWdlTXVsdGk7IFxuICAgICAgICB0aGlzLmhlYWx0aCA9MTsgXG4gICAgICAgIHRoaXMuc2lkZSA9IDA7IFxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlOyBcbiAgICAgICAgdGhpcy5oaXRMaXN0ID0gW107IFxuICAgICAgICB0aGlzLmxhbmUgPSBwbGF5ZXIubGFuZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICd0cmF2ZWwnOyBcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247IFxuICAgICAgICBcblxuICAgICAgICB0aGlzLmNoaWxsID0gcGxheWVyLmNoaWxsO1xuICAgICAgICB0aGlzLmFyZWEgPSBwbGF5ZXIuYXJlYTsgXG4gICAgICAgIHRoaXMucG9pc29uID0gcGxheWVyLnBvaXNvbjsgXG4gICAgICAgIHRoaXMucG9pc29uTWF4ID0gcGxheWVyLnBvaXNvbk1heDtcblxuICAgICAgICB0aGlzLnhPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3hPZmYnXTtcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddKXt0aGlzLnlPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXX1cbiAgICAgICAgZWxzZSB0aGlzLnlPZmYgPTA7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGVmdCA9IHBsYXllci5sZWZ0OyAvLyBzaG9vdCBsZWZ0XG4gICAgICAgIGlmICh4ID09IDAgJiYgeSA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgICAgIHg6IHBsYXllci5wb3NpdGlvbi54LCBcbiAgICAgICAgICAgICAgICB5OiBwbGF5ZXIucG9zaXRpb24ueSs0NVxuICAgICAgICAgICAgfX1cbiAgICAgICAgZWxzZSB7IHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogeCszNSxcbiAgICAgICAgICAgICAgICB5OiB5KzY1fVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zcGVlZCA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3BlZWQnXTtcbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cblxuICAgIH1cblxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSA2OyBcbiAgICAgICAgdGhpcy50cmF2ZWwgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMudHlwZSsnL3RyYXZlbF8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsndHJhdmVsJ10sIHRoaXMuZnJhbWVzLCBcInRyYXZlbFwiKTsgLy9zdGFuZGluZyBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy5idXJzdCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvZXhwbG9kZV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZXhwbG9kZSddLCB0aGlzLmZyYW1lcywgXCJidXJzdFwiLCB0cnVlKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy50cmF2ZWwsIHRoaXMuYnVyc3RdOyBcblxuICAgICAgICBpZiAodGhpcy50eXBlID09ICd0aHVuZGVyYmFsbCcpe1xuICAgICAgICAgICAgdGhpcy5ib2x0ID0gbmV3IFNwcml0ZUFuaW1hdGlvbigndGh1bmRlcmJvbHQvZXhwbG9kZV8/LnBuZycsIDUsIHRoaXMuZnJhbWVzLCBcImV4cGxvZGVcIiwgdHJ1ZSk7IC8vICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgcGF1c2UpIHtcbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTsgLy8gaGl0Ym94XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gXCJOb25lXCIpeyBcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7ICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwbG9kZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdidXJzdCdcbiAgICAgICAgICAgICAgICBpZih0aGlzLnR5cGUgPT0ndGh1bmRlcmJhbGwnKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvbHRJbWFnZSA9IHRoaXMuYm9sdC5nZXRJbWFnZShwYXVzZSk7IFxuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJvbHRJbWFnZSwgdGhpcy5wb3NpdGlvbi54LCAyNDApXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpe3RoaXMuZGVsZXRlID0gdHJ1ZTt9XG4gICAgXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlPT0naWNlYmFsbCcgJiB0aGlzLnN0YXRlPT0nYnVyc3QnKXt0aGlzLnhPZmY9MTAwfTtcbiAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0KXsvL2ZsaXAgYmFzZWQgb24gc3ByaXRlIG9yaWVudGF0aW9uXG4gICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC10aGlzLnBvc2l0aW9uLngtIHRoaXMueE9mZisxNSwgdGhpcy5wb3NpdGlvbi55LTYwK3RoaXMueU9mZik7fVxuICAgICAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54LXRoaXMueE9mZiszNSwgdGhpcy5wb3NpdGlvbi55LTYwK3RoaXMueU9mZik7IH1cblxuICAgICAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7IFxuICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5zcHJpdGUsIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KzI1KTsgLy9kcmF3IG1vYiAoeCwgeSwgaGVpZ2h0LCB3aWR0aClcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGxvZGUpe3RoaXMuZGVsZXRlID0gdHJ1ZX07IFxuICAgICAgICB9XG5cbiAgICB9IFxuXG5cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgaWYgKCF0aGlzLmV4cGxvZGUpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGVmdCl7dGhpcy5wb3NpdGlvbi54IC09IHRoaXMuc3BlZWQ7fSAvLyBkaXJlY3Rpb25cbiAgICAgICAgICAgIGVsc2UgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueDwtdGhpcy53aWR0aC0xMDApIHt0aGlzLmRlbGV0ZSA9IHRydWUgfTtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoKSB7dGhpcy5kZWxldGUgPSB0cnVlfTtcblxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSs1LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG5cblxuXG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmVzdGFydFNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxNzA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDI1OyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI0cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2UgOyBcbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdSZXR1cm4gdG8gTWFpbic7XG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLmdhbWVXaWR0aC8yO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gMjUwO1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDUwOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy54Kyh0aGlzLndpZHRoLXRoaXMuYnV0dG9uV2lkdGgpLzIsIHRoaXMuaGVpZ2h0LXRoaXMuYnV0dG9uSGVpZ2h0LXRoaXMucGFkZGluZ11dIFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMV1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTsgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZHJhdyhjdHgpe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdGFydEZ1bmN0aW9ucyhnYW1lKXtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgICAgIGdhbWUuZmFkZU91dCA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge2dhbWUudGl0bGVEaXNwbGF5ID0gdHJ1ZX0sIFwiMjAwMFwiKSAvLyBmYWRlIG91dCB0cmFuc2l0aW9uXG4gICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgLy8gdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN0YXJ0RnVuY3Rpb25zKGdhbWUsIGkpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIGRyYXdCdXR0b24oZTEsIHgsIHksIGN0eCl7ICAgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3N0ZWVsYmx1ZSc7IC8vZHJhdyBib3JkZXJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy9zZXRzIGFyZWEgZm9yIGNvbGxpc2lvbiAoaXNQb2ludEluUGF0aClcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0LCAyKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgLy9kcmF3IHRleHQgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrdGhpcy5idXR0b25IZWlnaHQvMik7IFxuXG5cblxuICAgICAgICB9XG5cbiAgICAgXG4gICAgICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICAvLyBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgLy8gY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICAvLyBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDIpO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAvLyBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4KTtcblxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgLy9kZWZlYXQgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdHYW1lIE92ZXIhJywgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy55ICsgMjUpIC8vdmljdG9yeSBvciBkZWZlYXRcbiAgICAgICAgICAgIH1cblxuXG4gICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICBcblxuXG4gICAgXG4gICAgICAgIFxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0YXJ0U2NyZWVue1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDEyMDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDsgXG4gICAgICAgIHRoaXMueCA9IChnYW1lLmdhbWVXaWR0aC10aGlzLndpZHRoKS8yOyBcbiAgICAgICAgdGhpcy55ID0gMzsvLyh0aGlzLmhlaWdodClcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMTU7IFxuICAgICAgICB0aGlzLmZvbnQgPSBcIjE2cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MiA9IFwiMjRweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQzID0gXCIyMHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7IFxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gW1wiU3RvcCB0aGUgbW9uc3RlcnMgZnJvbSBhZHZhbmNpbmchXCIsXCIgLSBVc2UgKFdBU0QpIHRvIG1vdmUsIChKKSB0byBqdW1wLCBhbmQgKEspIHRvIHNob290LiBVc2UgKFApIHRvIG9wZW4gc2hvcC4gXCIsIFxuICAgICAgICAgICAgXCIgLSBDb2xsZWN0IHRoZSBjb2lucyBtb25zdGVycyBkcm9wIGJlZm9yZSB0aGV5IGV4cGlyZVwiLCBcbiAgICAgICAgICAgIFwiIC0gU3BlbmQgbWVzb3Mgb24gdXBncmFkZXMgJiBzdW1tb25zIHRvIGJvbHN0ZXIgeW91ciBkZWZlbnNlXCIsIFxuICAgICAgICAgICAgXCIgLSBMb3NlIGxpdmVzIHdoZW4gbW9uc3RlcnMgZXNjYXBlIG9yIHRvdWNoIHlvdVwiLCBcIiAtIEdhbWUgb3ZlciB3aGVuIGFsbCBsaXZlcyBsb3N0IVwiXTtcbiAgICAgICAgdGhpcy5rZXlib2FyZCA9IG5ldyBJbWFnZSgpOyBcbiAgICAgICAgdGhpcy5rZXlib2FyZC5zcmMgPSAnaW1hZ2VzL2JnL2tleWJvYXJkLnBuZyc7XG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnU3RhcnQhJztcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMuZ2FtZVdpZHRoLzI7XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSA2NTtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSAzNTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMueCt0aGlzLndpZHRoLSB0aGlzLmJ1dHRvbldpZHRoLXRoaXMucGFkZGluZywgdGhpcy5oZWlnaHQtdGhpcy5idXR0b25IZWlnaHQtdGhpcy5wYWRkaW5nXV0gXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24xXVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbGl6ZShnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIC8vY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0RnVuY3Rpb25zKGdhbWUpe1xuICAgICAgICAgICAgZ2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICB9XG5cblxuICAgICAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRGdW5jdGlvbnMoZ2FtZSwgaSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdCdXR0b24oZTEsIHgsIHksIGN0eCl7ICAgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3N0ZWVsYmx1ZSc7IC8vZHJhdyBib3JkZXJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCx0aGlzLmJ1dHRvbkhlaWdodCk7IFxuXG4gICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZHJhdyB0ZXh0IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzIpOyBcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy9zZXRzIGFyZWEgZm9yIGNvbGxpc2lvbiAoaXNQb2ludEluUGF0aClcbiAgICAgICAgICAgIGN0eC5yZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCk7ICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgXG4gICAgICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSB8fCBnYW1lLndhdmVGaW5pc2ggfHwgZ2FtZS5sZXZlbEZpbmlzaCl7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngrMC4zKnRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KzIwLCAwLjQqdGhpcy53aWR0aCwgMjUsIDIpO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQ7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQcmVzcyBbQV0gZm9yIHVwZ3JhZGVzJywgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5oZWlnaHQrMzUpIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbE5vdGUhPScnKXtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lVGltZVJlYWwgLSBnYW1lLm5vdGVUaW1lPDQ1MDApe1xuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngrMTUsIHRoaXMuaGVpZ2h0KjAuNSwgdGhpcy53aWR0aC0zMCwgNTAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQzOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChnYW1lLmxldmVsTm90ZSwgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5oZWlnaHQvMiszMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5IHx8IChnYW1lLnBhdXNlICYmICFnYW1lLnVwZ3JhZGUuZGlwbGF5KSl7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDIpO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnc3RhcnQnOyBcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMua2V5Ym9hcmQsIDE4MCwwKTtcbiAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpPTA7IGk8dGhpcy5jb250cm9scy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vICAgICBjdHguZmlsbFRleHQodGhpcy5jb250cm9sc1tpXSwgdGhpcy54K3RoaXMucGFkZGluZywgdGhpcy55K3RoaXMucGFkZGluZyooMStpKSwgdGhpcy53aWR0aCk7IFxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlZHJhdyhjdHgpOyAvL2RyYXcgc3RhcnQgYnV0dG9uXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgIC8vIGlmIChnYW1lLnN0b3JhZ2UubGVuZ3RoPjApe1xuICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAvLyAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIC8vICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgICAgICAvLyAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAvLyAgICAgY3R4LnRleHRBbGlnbiA9ICdzdGFydCc7IFxuICAgICAgICAgICAgLy8gICAgIGN0eC5mb250ID0gdGhpcy5mb250MjtcbiAgICAgICAgICAgIC8vICAgICBjdHguZmlsbFRleHQoJ1Jlc3VtbW9uIERyYWdvbnMgZnJvbSBzaG9wIScsIHRoaXMueCt0aGlzLnBhZGRpbmcsIHRoaXMueSt0aGlzLnBhZGRpbmcpIFxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZWxzZSB7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0JykuaW5uZXJIVE1MPVwiXCI7fVxuICAgICAgICAgICAgXG4gICAgXG4gICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICBcblxuXG4gICAgXG4gICAgICAgIFxufSIsImltcG9ydCBpbWcgZnJvbSAnLi9pbWcnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGl0bGVTY3JlZW57XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTcwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwOyBcbiAgICAgICAgdGhpcy5iZ0FydCA9IGltZygnYmcvYmdUaXRsZS5wbmcnKTtcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyNTsgXG4gICAgICAgIHRoaXMuZm9udFRpdGxlID0gXCI0OHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udCA9IFwiMThweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQyID0gXCIyOHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDMgPSBcIjI0cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMudGl0bGVMb2dvID0gXCJNYXBsZVREXCI7IFxuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1BsYXknO1xuICAgICAgICB0aGlzLmJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24yLnRleHRDb250ZW50ID0gJ0xldmVsIFNlbGVjdCc7XG4gICAgICAgIHRoaXMuYnV0dG9uMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjMudGV4dENvbnRlbnQgPSAnPCc7ICAgXG5cbiAgICAgICAgdGhpcy5idXR0b240ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNC50ZXh0Q29udGVudCA9ICc+JzsgIFxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWSA9IDE7XG5cbiAgICAgICAgdGhpcy5hYm91dFRleHQgPSBbXCJVbm9mZmljaWFsIGZhbiBnYW1lIGRldmVsb3BlZCBieSBDaHJpc3RvcGhlciBMZWUgKHNpcmhjbGVlQGdtYWlsLmNvbSlcIixcbiAgICAgICAgICAgICAgICAgXCJBbGwgTWFwbGVTdG9yeSBhc3NldHMgdXNlZCBhcmUgY29weXJpZ2h0ZWQgbWF0ZXJpYWxzICYgaW50ZWxsZWN0dWFsIHByb3BlcnR5IGJlbG9uZ2luZyB0byBORVhPTlwiXTtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDE3NTtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSAzNTsgXG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLmdhbWVXaWR0aC8yLSh0aGlzLmJ1dHRvbldpZHRoLzIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLmJ1dHRvblgxLCB0aGlzLnBhZGRpbmcrdGhpcy5idXR0b25IZWlnaHQgKyAyKnRoaXMuZ2FtZUhlaWdodC8zLTQ1XSwgXG4gICAgICAgICAgICBbdGhpcy5idXR0b25YMSwgdGhpcy5wYWRkaW5nK3RoaXMuYnV0dG9uSGVpZ2h0ICsgMip0aGlzLmdhbWVIZWlnaHQvMy0yNV1dIFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMl1cblxuICAgICAgICB0aGlzLmxldmVsQnV0dG9ucyA9IFsgdGhpcy5idXR0b24zLCB0aGlzLmJ1dHRvbjRdOyBcbiAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbldpZHRoID0gNTA7IFxuICAgICAgICB0aGlzLmxldmVsQnV0dG9uSGVpZ2h0ID0gMzA7IFxuICAgICAgICB0aGlzLmxldmVsQnV0dG9uQ2VudGVyID0gNzA7ICAvLyBtaWRkbGUgbnVtYmVyIFxuICAgICAgICB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy5nYW1lV2lkdGgvMi10aGlzLmxldmVsQnV0dG9uQ2VudGVyLzItdGhpcy5sZXZlbEJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1sxXVsxXSs0MF0sIFxuICAgICAgICBbdGhpcy5nYW1lV2lkdGgvMit0aGlzLmxldmVsQnV0dG9uQ2VudGVyLzIsIHRoaXMuYnV0dG9uUG9zaXRpb25zWzFdWzFdKzQwXV07IFxuXG4gICAgICAgIHRoaXMuZmFkZSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgLy9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlSG92ZXIoZSkgfSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVkcmF3KGN0eCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICB9IC8vICAgICAgICB0aGlzLmxldmVsQnV0dG9ucyA9IFsgdGhpcy5idXR0b24zLCB0aGlzLmJ1dHRvbjRdOyBcbiAgICAgICAgICAgIC8vdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9ucyA9IFsgWzEwLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1sxXVsxXSsxMF0sIFsxMCwgdGhpcy5idXR0b25Qb3NpdGlvbnNbMV1bMV0rMjBdXTsgXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMubGV2ZWxCdXR0b25zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5sZXZlbEJ1dHRvbnNbaV0sIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgIH0gICAgICAgICAgXG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1dHRvbnNMaXN0W2ldLnRleHRDb250ZW50ID09IFwiUGxheVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUuZmFkZU91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e2dhbWUudGl0bGVEaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5yZXNldEV2ZXJ5dGhpbmcoKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgIFxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmxldmVsQnV0dG9ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMubGV2ZWxCdXR0b25zW2ldLCB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxCdXR0b25zW2ldLnRleHRDb250ZW50ID09IFwiPFwiKXsgLy8gcmVsb2FkIGJnIGFydCBhbmQgbGV2ZWwgbG9hZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUubGV2ZWw+MSl7Z2FtZS5sZXZlbC0tfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWxCdXR0b25zW2ldLnRleHRDb250ZW50ID09IFwiPlwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmxldmVsPGdhbWUuZmluYWxMZXZlbCl7Z2FtZS5sZXZlbCsrfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgICAgICAgXG4gICAgICAgICAgICBcblxuICAgICAgICB9XG5cblxuICAgICAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgpeyAgIFxuICAgICAgICAgICAgbGV0IGJ1dHRvbldpZHRoID0gdGhpcy5idXR0b25XaWR0aDtcbiAgICAgICAgICAgIGxldCBidXR0b25IZWlnaHQgPSB0aGlzLmJ1dHRvbkhlaWdodDtcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnc3RlZWxibHVlJztcbiAgICAgICAgICAgIGlmIChlMS50ZXh0Q29udGVudD09J1BsYXknKXtcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7fVxuICAgICAgICAgICAgZWxzZSBpZiAoZTEudGV4dENvbnRlbnQ9PSdMZXZlbCBTZWxlY3QnKXtcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDM7XG4gICAgICAgICAgICAgICAgLy9idXR0b25IZWlnaHQgLT0xMTtcbiAgICAgICAgICAgICAgICB5Kz0xMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7Y3R4LmZvbnQgPSB0aGlzLmZvbnQzO1xuICAgICAgICAgICAgICAgIGJ1dHRvbldpZHRoID0gdGhpcy5sZXZlbEJ1dHRvbldpZHRoO1xuICAgICAgICAgICAgICAgIGJ1dHRvbkhlaWdodCA9IHRoaXMubGV2ZWxCdXR0b25IZWlnaHQgO31cbiAgICAgICAgICAgICAgICAvL2RyYXcgdGV4dCBcbiAgICAgICAgXG5cblxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh4LHksIGJ1dHRvbldpZHRoLGJ1dHRvbkhlaWdodCwgMykgO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrYnV0dG9uV2lkdGgvMiwgeStidXR0b25IZWlnaHQvMik7IFxuICAgIFxuICAgICAgICB9XG5cbiAgICAgXG4gICAgICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iZ0FydCwgMCwwKTsgXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ3doaXRlJztcbiAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbMF1bMF0rIDEwKyB0aGlzLmxldmVsQnV0dG9uV2lkdGgsdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVsxXSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbEJ1dHRvbldpZHRoLCB0aGlzLmxldmVsQnV0dG9uSGVpZ2h0LCAzKSA7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGU9ICdibGFjayc7XG4gICAgICAgICAgICAgICBjdHguZmlsbFRleHQoZ2FtZS5sZXZlbCwgIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbMF1bMF0rdGhpcy5sZXZlbEJ1dHRvbkNlbnRlcisxNSwgIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbMF1bMV0rMTgpOyBcblxuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCk7IC8vZHJhdyBzdGFydCBidXR0b25cblxuICAgICAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgY3R4LnNoYWRvd09mZnNldFg9MTtcbiAgICAgICAgICAgICAgICBjdHguc2hhZG93T2Zmc2V0WT0xO1xuICAgICAgICAgICAgICAgIGN0eC5zaGFkb3dDb2xvcj1cImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgY3R4LnNoYWRvd0JsdXI9IDQ7IFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnRUaXRsZTsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ3doaXRlJztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy50aXRsZUxvZ28sIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMuZ2FtZUhlaWdodC8zKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG5cbiAgICAgICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQ7IC8vYWJvdXRcbiAgICAgICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmZhZGU7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnVXNlIGFycm93IEtleXMgZm9yIGxldmVsJywgdGhpcy5nYW1lV2lkdGgvMix0aGlzLmdhbWVIZWlnaHQvMis1NSk7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnUHJlc3MgYW55IGtleSB0byBTdGFydCcsIHRoaXMuZ2FtZVdpZHRoLzIsdGhpcy5nYW1lSGVpZ2h0LzIrNzUpOyBcbiAgICAgICAgICAgICAgICB0aGlzLmZhZGUtPTAuMDEwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGU8MC4yNSl7dGhpcy5mYWRlID0gMX1cbiAgICAgICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuYWJvdXRUZXh0Lmxlbmd0aDsgaSsrKXsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmFib3V0VGV4dFtpXSwgdGhpcy5nYW1lV2lkdGgvMix0aGlzLmdhbWVIZWlnaHQtMzUrMTUqaSk7IFxuICAgICAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VUZXh0KHRoaXMuYWJvdXRUZXh0W2ldLHRoaXMuZ2FtZVdpZHRoLzIsdGhpcy5nYW1lSGVpZ2h0LTM1KzE1KmkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICBcbiAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9XCJibGFja1wiOyBcbiAgICAgICAgICAgICAgICAvLyBjdHgubGluZVdpZHRoPTU7XG4gICAgICAgICAgICAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5yb3VuZFJlY3QodGhpcy5idXR0b25Qb3NpdGlvbnNbMF1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zWzBdWzFdLCB0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCwgMykgO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5zdHJva2UoKTtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgICAgICBcbiAgICBcbiAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBcbiAgICAgICAgXG59IiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGdyYWRle1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjUwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDIzMDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDtcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDE1OyBcbiAgICAgICAgdGhpcy5wYWRkaW5nWSA9IDQ7XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSAxNzA7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzY7XG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTNweCBhcmlhbFwiOyAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjE0cHggYXJpYWxcIjsgIFxuXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnU3VtbW9uIFJlZCBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudmFsdWUgPSAncmVkRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMi50ZXh0Q29udGVudCA9ICdTdW1tb24gQmx1ZSBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjIudmFsdWUgPSAnYmx1ZURyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjMudGV4dENvbnRlbnQgPSAnU3VtbW9uIEdyZWVuIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMy52YWx1ZSA9ICdncmVlbkRyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjQudGV4dENvbnRlbnQgPSAnU3VtbW9uIEJsYWNrIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uNC52YWx1ZSA9ICdibGFja0RyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMTAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xMC50ZXh0Q29udGVudCA9ICdXSVAnO1xuICAgICAgICB0aGlzLmJ1dHRvbjEwLnZhbHVlID0gJ211c2hyb29tS25pZ2h0JztcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMueCArIHRoaXMucGFkZGluZzsgXG4gICAgICAgIHRoaXMubmFtZUhhc2ggPSB7J3JlZERyYWdvbic6J1JlZCBEcmFnb24nLCAnYmx1ZURyYWdvbic6J0JsdWUgRHJhZ29uJyxcbiAgICAgICAgJ2dyZWVuRHJhZ29uJzonR3JlZW4gRHJhZ29uJywgJ2JsYWNrRHJhZ29uJzonQmxhY2sgRHJhZ29uJywgJ211c2hyb29tS25pZ2h0JzogJ011c2hyb29tIEtuaWdodCd9O1xuICAgICAgICB0aGlzLnN1bW1vbkxpc3QgPSBbJ3JlZERyYWdvbicsICdibHVlRHJhZ29uJywnZ3JlZW5EcmFnb24nLCdibGFja0RyYWdvbiddO1xuICAgICAgICB0aGlzLmVsZW1lbnRMaXN0ID0gWydCbGF6ZScsJ0Rhd24nLCdOaWdodCcsJ1dpbmQnLCdUaHVuZGVyJ107XG5cbiAgICAgICAgdGhpcy5idXR0b241ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNS50ZXh0Q29udGVudCA9ICdCbGF6ZSBTcHJpdGUnOyAvL0JsYXplIC0gRmxhbWUgXG4gICAgICAgIHRoaXMuYnV0dG9uNS52YWx1ZSA9IFwiQmxhemVcIjtcbiAgICAgICAgdGhpcy5idXR0b242ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNi50ZXh0Q29udGVudCA9ICdEYXduIFNwcml0ZSAnOyAvL0Rhd24gLSBMaWdodCBcbiAgICAgICAgdGhpcy5idXR0b242LnZhbHVlID0gXCJEYXduXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uNyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpOyBcbiAgICAgICAgdGhpcy5idXR0b243LnRleHRDb250ZW50ID0gJ05pZ2h0IFNwcml0ZSc7IC8vTmlnaHQgLSBEYXJrXG4gICAgICAgIHRoaXMuYnV0dG9uNy52YWx1ZSA9IFwiTmlnaHRcIjtcbiAgICAgICAgdGhpcy5idXR0b244ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uOC50ZXh0Q29udGVudCA9ICdXaW5kIFNwcml0ZSAnOyAgLy9XaW5kIC0gU3Rvcm1cbiAgICAgICAgdGhpcy5idXR0b244LnZhbHVlID0gXCJXaW5kXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uOSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpOyBcbiAgICAgICAgdGhpcy5idXR0b245LnRleHRDb250ZW50ID0gJ1RodW5kZXIgU3ByaXRlJzsgLy9UaHVuZGVyIC0gTGlnaHRuaW5nICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvbjkudmFsdWUgPSBcIlRodW5kZXJcIjsgXG4gICAgICAgIHRoaXMuYnV0dG9uWDIgPSAgdGhpcy5idXR0b25YMSArIHRoaXMuYnV0dG9uV2lkdGgrIHRoaXMucGFkZGluZyA7IFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMuYnV0dG9uWDEsIDBdLCBbdGhpcy5idXR0b25YMSwxXSwgW3RoaXMuYnV0dG9uWDEsMl0sIFt0aGlzLmJ1dHRvblgxLDNdLCAgW3RoaXMuYnV0dG9uWDEsNF0sIFxuICAgICAgICAgICAgICAgICBbdGhpcy5idXR0b25YMiwwXSwgW3RoaXMuYnV0dG9uWDIsMV0sIFt0aGlzLmJ1dHRvblgyLDJdLCBbdGhpcy5idXR0b25YMiwzXSwgW3RoaXMuYnV0dG9uWDIsNF0gIF07IFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMSwgdGhpcy5idXR0b24yLCB0aGlzLmJ1dHRvbjMsIHRoaXMuYnV0dG9uNCwgdGhpcy5idXR0b24xMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b241LCB0aGlzLmJ1dHRvbjYsIHRoaXMuYnV0dG9uNywgdGhpcy5idXR0b244LCB0aGlzLmJ1dHRvbjldOyBcbiAgICAgICB0aGlzLm5vdGUgPSBcIlByZXNzIFtTXSB0byBidXksIFtBXSB0byBjbG9zZSBtZW51XCI7IFxuICAgICAgIFxuXG4gICAgICAgIHRoaXMuY29zdFBvc2l0aW9uID0gdGhpcy5idXR0b25YMiArIHRoaXMuYnV0dG9uV2lkdGgrIDIuNSp0aGlzLnBhZGRpbmc7IFxuICAgICAgICB0aGlzLmNvc3RIZWlnaHQgPSAyMDsgXG4gICAgICAgIHRoaXMuY29zdFdpZHRoID0gMjc1OyBcbiAgICAgICAgdGhpcy5jb3N0UGFkZGluZyA9IDQ7IFxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWCA9IDE7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWSA9IDE7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25UZXh0ID0gW107XG4gICAgICAgIHRoaXMucHVyY2hhc2VEZXNjcmlwdGlvbiA9IHJlcXVpcmUoJy4vcHVyY2hhc2UuanNvbicpOyBcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMucmVkcmF3KGN0eCksIHRydWUpOyBcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZWRyYXcoY3R4LCBnYW1lICl7XG4gICAgICAgIGxldCBidXR0b25EcmF3ID0gdGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IFxuICAgICAgIGZvciAobGV0IGkgPSAwOyBpPGJ1dHRvbkRyYXcgOyBpKyspe1xuICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIDIqdGhpcy5wYWRkaW5nWSsodGhpcy5idXR0b25IZWlnaHQrdGhpcy5wYWRkaW5nWSkqdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eCwgZ2FtZSlcbiAgICAgICB9XG4gICAgfVxuXG4gICAgdXBncmFkZUZ1bmN0aW9ucyhnYW1lLCBidXR0b24pe1xuICAgICAgICAvL3Jlc3VtbW9uO1xuICAgICAgICBpZiAoZ2FtZS5zdG9yYWdlLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKSl7XG4gICAgICAgICAgICBnYW1lLnJlc3VtbW9uKGJ1dHRvbi52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgdW5pdCA9IGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSk7XG4gICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAgJ1VwZ3JhZGUgJyt0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAnK3VuaXQubGV2ZWwrJyknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSkpeyAvL3VwZ3JhZGUgc3VtbW9ucyBcbiAgICAgICAgICAgIGxldCB1bml0ID0gZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKTtcbiAgICAgICAgICAgIHVuaXQubGV2ZWxVcChnYW1lLnBsYXllcik7IC8vYWRkIGNvc3QgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1bml0LmxldmVsKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHVuaXQubGV2ZWw8NSl7XG4gICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAgJ1VwZ3JhZGUgJyt0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAnK3VuaXQubGV2ZWwrJyknO31cbiAgICAgICAgICAgIGVsc2Uge2J1dHRvbi50ZXh0Q29udGVudCA9ICB0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAnK3VuaXQubGV2ZWwrJyknIH1cbiAgICAgICAgfSBcblxuICAgICAgICBlbHNlIGlmICh0aGlzLnN1bW1vbkxpc3QuaW5jbHVkZXMoYnV0dG9uLnZhbHVlKSl7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLnZhbHVlICE9J211c2hyb29tS25pZ2h0Jyl7XG4gICAgICAgICAgICAgICAgZ2FtZS5jcmVhdGVNb2IoZ2FtZS5wbGF5ZXIsIGJ1dHRvbi52YWx1ZSwgMCwgZ2FtZSk7IC8vc3VtbW9ucyA7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSkpeyAvL2NoZWNrcyBpZiBjcmVhdGVkIHN1Y2Nlc3NmdWxseSBcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1VwZ3JhZGUgJyt0aGlzLm5hbWVIYXNoW2J1dHRvbi52YWx1ZV0rICcgKEx2bCAxKSc7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbGVtZW50TGlzdC5pbmNsdWRlcyhidXR0b24udmFsdWUpKXtcbiAgICAgICAgICAgICAgICBnYW1lLmFkZEVsZW1lbnQoYnV0dG9uLnZhbHVlKTsgLy9lbGVtZW50c1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICAvLyBlbHNlIGlmIChidXR0b24udGV4dENvbnRlbnQ9PSdOZXh0IFdhdmUhJykgZ2FtZS5uZXh0V2F2ZSA9IHRydWU7IC8vbmV4dCB3YXZlIGJ1dHRvblxuXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgXG4gICAgICAgIGxldCBidXR0b25EcmF3ID0gdGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IFxuICAgICAgICBpZiAoIWdhbWUud2F2ZUZpbmlzaCl7YnV0dG9uRHJhdy09MX07IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxidXR0b25EcmF3IDsgaSsrKXtcbiAgICAgICAgICAgIC8vIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5wYWRkaW5nWSsodGhpcy5idXR0b25IZWlnaHQrdGhpcy5wYWRkaW5nWSkqdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eCwgZ2FtZSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc0xpc3RbaV0uZm9jdXMoKTsgXG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlRnVuY3Rpb25zKGdhbWUsIHRoaXMuYnV0dG9uc0xpc3RbaV0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgIH1cblxuXG4gICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4LCBnYW1lKXsgICBcbiAgICAgICAgbGV0IGJ1dHRvbkNvbG9yID0nc3RlZWxibHVlJztcbiAgICAgICAgbGV0IHRleHRDb2xvciA9J3doaXRlJztcbiAgICAgICAgbGV0IGNvc3QgPSAwOyBcbiAgICAgICAgaWYgKGdhbWUpe1xuICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uWDE9PXgpIHsgLy9zdW1tb24gYnV0dG9ucyAvL2NoZWNrIGNvc3QgKGlmIGZpcnN0IG9yIHVwZ3JhZGUpXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gZTEudmFsdWUpKSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1bml0ID0gZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBlMS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gZ2FtZS5wbGF5ZXIudXBncmFkZUNvc3RbdW5pdC5sZXZlbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgKCBjb3N0ID0gZ2FtZS5wbGF5ZXIuc3VtbW9uQ29zdFtnYW1lLnBsYXllci5zdW1tb25Db3VudF0pO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLm1vbmV5PCBjb3N0KXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yID0gJ2xpZ2h0Z3JleSc7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvciA9ICdkYXJrZ3JleSc7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYnV0dG9uWDI9PXgpeyAvL2VsZW1lbnRzXG4gICAgICAgICAgICAgICAgY29zdCA9IGdhbWUucGxheWVyLmVsZW1lbnRDb3N0W2dhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF07XG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLm1vbmV5PGdhbWUucGxheWVyLmVsZW1lbnRDb3N0W2dhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF0gfHwgXG4gICAgICAgICAgICAgICAgICAgIGdhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aCA+PTUpe1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Db2xvciA9ICdsaWdodGdyZXknO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSAnZGFya2dyZXknOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJ1dHRvbkNvbG9yOyAgLy9idXR0b24gYmFja2dyb3VuZFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5yb3VuZFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0LCAzKTsgXG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICBcbiAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250OyBcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyAvL2J1dHRvbiB0ZXh0IFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dENvbG9yO1xuICAgICAgICBpZiAoZ2FtZSl7XG4gICAgICAgICAgICAgaWYgKGdhbWUuc3RvcmFnZS5sZW5ndGg+MCl7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGVzdCA9IGdhbWUuc3RvcmFnZS5maW5kKG9iaj0+IG9iai50eXBlPT1lMS52YWx1ZSk7IFxuICAgICAgICAgICAgICAgIGlmICh0ZXN0KXsgXG4gICAgICAgICAgICAgICAgICAgIGUxLnRleHRDb250ZW50ID0gJ1Jlc3VtbW9uIEx2bCAnK3Rlc3QubGV2ZWwrJyAnK3RoaXMubmFtZUhhc2hbZTEudmFsdWVdOyBcbiAgICAgICAgICAgICAgICAgICAgY29zdCA9IDA7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzMpOyBcbiAgICAgICAgaWYgKGNvc3QgJiYgZTEudmFsdWUhPSdtdXNocm9vbUtuaWdodCcpe1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCcoJytjb3N0KycgbWVzb3MpJywgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrMip0aGlzLmJ1dHRvbkhlaWdodC8zKTt9XG4gICAgICAgIC8vZWxzZSB7IGN0eC5maWxsVGV4dCgnTUFYJywgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrMip0aGlzLmJ1dHRvbkhlaWdodC8zKTt9XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL2NvbGxpc2lvbiBwYXRoIFxuICAgICAgICBjdHgucmVjdCh4LHksIHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0KTsgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHRvZ2dsZU1lbnUoZ2FtZSl7IFxuICAgICAgICB0aGlzLmRpc3BsYXkgPSAhdGhpcy5kaXNwbGF5OyBcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheSl7Z2FtZS5wYXVzZSA9IHRydWV9XG4gICAgICAgIGVsc2UgZ2FtZS5wYXVzZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgcHVyY2hhc2UoZ2FtZSl7XG4gICAgICAgIGxldCBpID0gKHRoaXMuc2VsZWN0aW9uWC0xKSo1ICsgKHRoaXMuc2VsZWN0aW9uWS0xKTtcbiAgICAgICAgdGhpcy51cGdyYWRlRnVuY3Rpb25zKGdhbWUsIHRoaXMuYnV0dG9uc0xpc3RbaV0pOyBcbiAgICB9XG5cbiAgICBzZWxlY3RlZERlc2NyaXAoKXtcbiAgICAgICAgbGV0IGkgPSAodGhpcy5zZWxlY3Rpb25YLTEpKjUgKyAodGhpcy5zZWxlY3Rpb25ZLTEpO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uVGV4dCA9IHRoaXMucHVyY2hhc2VEZXNjcmlwdGlvblt0aGlzLmJ1dHRvbnNMaXN0W2ldLnZhbHVlXTsgXG4gICAgfVxuXG4gICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAzKTsgLy93aGl0ZSB3aW5kb3dcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICB0aGlzLnJlZHJhdyhjdHgsIGdhbWUpOyAvL2RyYXcgYnV0dG9uXG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMyODI4MjhcIjtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy5jb3N0UG9zaXRpb24tMip0aGlzLnBhZGRpbmcsIDIqdGhpcy5wYWRkaW5nWSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdFdpZHRoLCB0aGlzLmNvc3RIZWlnaHQqMTEsIDMpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG5cbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy9zZWxlY3Rpb24gXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLmJ1dHRvblgxICsgKHRoaXMuc2VsZWN0aW9uWC0xKSoodGhpcy5idXR0b25XaWR0aCsgdGhpcy5wYWRkaW5nKSwgXG4gICAgICAgICAgICAgICAgMip0aGlzLnBhZGRpbmdZKyh0aGlzLmJ1dHRvbkhlaWdodCt0aGlzLnBhZGRpbmdZKSoodGhpcy5zZWxlY3Rpb25ZLTEpLCBcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbldpZHRoLHRoaXMuYnV0dG9uSGVpZ2h0LCAzKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERlc2NyaXAoKTsgLy9zaG93cyBzZWxlY3RlZCBzdW1tb24gZGV0YWlsIFxuICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuZGVzY3JpcHRpb25UZXh0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5kZXNjcmlwdGlvblRleHRbaV0sIHRoaXMuY29zdFBvc2l0aW9uLTI1LFxuICAgICAgICAgICAgICAgIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKmkpOyBcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIC8vc3RhdHMgICAgICAgICAgdGhpcy5kYW1hZ2VNdWx0aSA9IDE7IFxuICAgICAgICAvLyB0aGlzLnBpY2t1cE11dGxpID0gMTtcbiAgICAgICAgLy8gdGhpcy5rbm9ja2JhY2tNdWx0aSA9IDE7XG4gICAgICAgIC8vIHRoaXMuc3BlZWRNdWx0aSA9IDE7IFxuICAgICAgICAvLyB0aGlzLnBpZXJjZSA9IDA7IFxuXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ0RhbWFnZTogeCcrZ2FtZS5wbGF5ZXIuZGFtYWdlTXVsdGkudG9GaXhlZCgxKSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcpOyAgICAgICBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnU3BlZWQ6IHgnK2dhbWUucGxheWVyLnNwZWVkTXVsdGkudG9GaXhlZCgxKSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcuNik7IFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdLbm9ja2JhY2s6IHgnK2dhbWUucGxheWVyLmtub2NrYmFja011bHRpLnRvRml4ZWQoMSksIHRoaXMuY29zdFBvc2l0aW9uLTI1LCA2KnRoaXMucGFkZGluZ1krKHRoaXMuY29zdFBhZGRpbmcrdGhpcy5jb3N0SGVpZ2h0KSo4LjIpOyBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnUGllcmNlOiAnK2dhbWUucGxheWVyLnBpZXJjZSwgdGhpcy5jb3N0UG9zaXRpb24rMTAwLCA2KnRoaXMucGFkZGluZ1krKHRoaXMuY29zdFBhZGRpbmcrdGhpcy5jb3N0SGVpZ2h0KSo3KTsgXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ0xvb3QgUmFkaXVzOiB4JytnYW1lLnBsYXllci5sb290TXVsdGkudG9GaXhlZCgxKSwgdGhpcy5jb3N0UG9zaXRpb24rMTAwLCA2KnRoaXMucGFkZGluZ1krKHRoaXMuY29zdFBhZGRpbmcrdGhpcy5jb3N0SGVpZ2h0KSo3LjYpOyBcblxuXG4gICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ2JsYWNrJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLm5vdGUsIHRoaXMuYnV0dG9uWDErMTAsIHRoaXMuaGVpZ2h0LTEwKTtcblxuICAgICAgICAgICAgaWYgKGdhbWUuZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdTcGFjZSBvY2N1cGllZCEnLCB0aGlzLndpZHRoLTIyMCwgdGhpcy5oZWlnaHQtMTApOyBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge2dhbWUuZXJyb3I9ZmFsc2U7fSwgXCIzMDAwXCIpIDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgIFxuXG5cbiAgICAgICAgICAgIFxuICAgIH1cblxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcblxuXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lU2NyZWVuXCIpOyAvLyBnZXRzIGNhbnZhcyBlbGVtZW50XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IC8vY3JlYXRlcyAyRCByZW5kZXJpbmcgb2JqZWN0XG5cbmNvbnN0IGdhbWVXaWR0aCA9IDEwMDA7XG5jb25zdCBnYW1lSGVpZ2h0ID0gNTAwO1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGdhbWVXaWR0aCwgZ2FtZUhlaWdodCk7IFxuZ2FtZS5zdGFydCgpOyAvL2NyZWF0ZXMgZ2FtZSBvYmplY3RzO1xuXG5mdW5jdGlvbiBnYW1lTG9vcCh0aW1lc3RhbXApe1xuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXG5cbiAgICBjdHguY2xlYXJSZWN0KDAsMCwgZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KTsgLy9yZWZyZXNoIHNjcmVlblxuICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wKTtcbiAgICBpZiAoZ2FtZS50aXRsZURpc3BsYXkpe1xuICAgICAgICBnYW1lLnRpdGxlTWVudShjdHgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZiAoIWdhbWUucGF1c2UgKXsgZ2FtZS51cGRhdGUodGltZXN0YW1wKTtcbiAgICAgICAgfVxuICAgICAgICBnYW1lLm5leHRXYXZlTG9hZGVyKCk7IC8vbG9hZHMgd2F2ZSBsaXN0XG4gICAgICAgIGdhbWUud2F2ZUxvYWRlcigpOyAvLyBsb2FkcyBlYWNoIG1vYiBmcm9tIHdhdmUgbGlzdFxuICAgICAgICAvL2dhbWUucGF1c2VIYW5kbGVyKCkgXG4gICAgICAgIFxuICAgICAgICBnYW1lLmRyYXcoY3R4KTsgXG4gICAgICAgIGdhbWUud2F2ZUNsZWFyKGN0eCk7XG4gICAgICAgIGdhbWUucGF1c2VIYW5kbGVyKHRpbWVzdGFtcCwgY3R4KTsgXG4gICAgICAgIGdhbWUudXBncmFkZU1lbnUoY3R4KTtcbiAgICAgICAgZ2FtZS5uZXh0TGV2ZWxMb2FkZXIoY3R4KTsgLy9pZiB3YXZlIGxpc3QgZW1wdHksIG1vdmUgdG8gbmV4dCBsZXZlbFxuICAgICAgICBcbiAgICAgICAgZ2FtZS5yZWNhbGxDaGVjaygpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBnYW1lLnNjcmVlblRyYW5zaXRpb24oY3R4KTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7fSwgMTAwMCAvIDcwKTsgXG5cbn1cblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTsgXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=