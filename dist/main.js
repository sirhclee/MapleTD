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

        if (game.gameTimeReal-this.spawnTime>=20000){ //18 s 
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

   requestAnimationFrame(gameLoop);}, 5 );  //fix framtes

}

requestAnimationFrame(gameLoop); 

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsbUNBQW1DO0FBQ25DLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0NBQW9DLFFBQVE7O0FBRTVDOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL0hVRC5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvU3ByaXRlQW5pbWF0aW9uLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9lbmRTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2ltZy5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL21vYi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvbW9uZXkuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvcHJvamVjdGlsZS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvcmVzdGFydFNjcmVlbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvc3RhcnRTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3RpdGxlU2NyZWVuLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy91cGdyYWRlLmpzIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBIVUR7XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICAxNTA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNzU7IFxuICAgICAgICB0aGlzLnggPSAwOyBcbiAgICAgICAgdGhpcy55ID0gMDsgXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDIwOyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgfVxuXG4gICAgZGlzcGxheUhVRChjdHgsIGdhbWUpe1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIFxuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnOyBcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9J2JsYWNrJztcbiAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQ7XG5cbiAgICAgICAgdGhpcy5saXZlcyA9IFwiTGl2ZXM6IFwiICsgZ2FtZS5wbGF5ZXIuaGVhbHRoOyBcbiAgICAgICAgdGhpcy5tb25leSA9IFwiTWVzb3M6IFwiICsgZ2FtZS5wbGF5ZXIubW9uZXk7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBcIldhdmU6IFwiICsgZ2FtZS5sZXZlbCArICctJyArIGdhbWUud2F2ZTsgXG4gICAgICAgIHRoaXMudGV4dCA9IFt0aGlzLmxpdmVzLCB0aGlzLm1vbmV5LCB0aGlzLnN0YWdlXTsgXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy50ZXh0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnRleHRbaV0sIHRoaXMueCt0aGlzLnBhZGRpbmcsIHRoaXMueSt0aGlzLnBhZGRpbmcqKDEraSksIHRoaXMud2lkdGgpOyBcbiAgICAgICAgfVxuICAgIH1cblxuXG59IiwiaW1wb3J0IGltZyBmcm9tICcuL2ltZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZUFuaW1hdGlvbntcbiAgICBpbWFnZXMgPSBbXTtcbiAgICBjb25zdHJ1Y3RvcihmaWxlTmFtZSwgbnVtYmVyT2ZJbWFnZXMsIHRpbWVyQ291bnQsIHN0YXRlLCBzdG9wKXtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8PW51bWJlck9mSW1hZ2VzOyBpKyspeyAvLyBsb2FkcyBpbWFnZXMgaW50byBhcnJheSBcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gaW1nKGZpbGVOYW1lLnJlcGxhY2UoXCI/XCIsIGkpKTsgXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKGltYWdlKTsgXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpbWVyQ291bnQgPSB0aW1lckNvdW50O1xuICAgICAgICB0aGlzLnRpbWVyQ291bnREZWZhdWx0ID0gdGhpcy50aW1lckNvdW50OyBcbiAgICAgICAgdGhpcy5pbWFnZUluZGV4ID0gMDsgXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTsgXG4gICAgICAgIHRoaXMuc3RvcCA9IHN0b3A7IFxuICAgIH1cbiAgICBcbiAgICBpc0ZvcihzdGF0ZSl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBzdGF0ZTsgXG4gICAgfVxuXG4gICAgcmVzZXQoKXsgLy8gbG9vcCBhbmltYXRpb25cbiAgICAgICAgdGhpcy5pbWFnZUluZGV4ID0gMDsgICBcbiAgICB9XG5cbiAgICBnZXRGcmFtZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZUluZGV4OyBcbiAgICB9XG5cbiAgICBnZXRJbWFnZShwYXVzZSl7ICAvL3JldHVybnMgZnJhbWVcbiAgICAgICAgdGhpcy5zZXRJbWFnZUluZGV4KHBhdXNlKTsgXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlc1t0aGlzLmltYWdlSW5kZXhdOyBcbiAgICB9XG5cbiAgICBzZXRJbWFnZUluZGV4KHBhdXNlKXtcbiAgICAgICAgdGhpcy50aW1lckNvdW50LS07XG4gICAgICAgIGlmICh0aGlzLnRpbWVyQ291bnQgPD0gMCAmJiAhdGhpcy5zaG91bGRTdG9wKCkpe1xuICAgICAgICAgICAgdGhpcy50aW1lckNvdW50PSB0aGlzLnRpbWVyQ291bnREZWZhdWx0OyBcbiAgICAgICAgICAgIGlmICghcGF1c2UpIHt0aGlzLmltYWdlSW5kZXgrKzt9IC8vYW5pbWF0ZSBvbmx5IHdoZW4gdW5wYXVzZWRcbiAgICAgICAgICAgIGlmICh0aGlzLmltYWdlSW5kZXggPj0gdGhpcy5pbWFnZXMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlSW5kZXggPSAwOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZFN0b3AoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcCAgJiYgdGhpcy5pbWFnZUluZGV4ID09PSB0aGlzLmltYWdlcy5sZW5ndGgtMVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIGVuZFNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyMDA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDI1OyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI0cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnUmV0dXJuIHRvIE1haW4nO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy5nYW1lV2lkdGgvMjtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDI1MDtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSAzMDsgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5zdGF0czEgPSBbXTtcbiAgICAgICAgdGhpcy5zdGF0czIgPSBbXTtcbiAgICAgICAgdGhpcy5zdGF0UG9zaXRpb24gPSB0aGlzLng7IC8vc3RhcnRpbmcgeCBcbiAgICAgICAgdGhpcy5zdGF0SGVpZ2h0ID0gMjA7XG4gICAgICAgIHRoaXMuc3RhdFdpZHRoID0gMjAwO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy54Kyh0aGlzLndpZHRoLXRoaXMuYnV0dG9uV2lkdGgpLzIsIHRoaXMuaGVpZ2h0LXRoaXMuYnV0dG9uSGVpZ2h0LXRoaXMucGFkZGluZ11dIFxuICAgICAgICB0aGlzLmJ1dHRvbnNMaXN0ID0gW3RoaXMuYnV0dG9uMV1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEZ1bmN0aW9ucyhnYW1lKXtcbiAgICAgICAgICAgIGdhbWUubmV4dFdhdmUgPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgfVxuXG4gICAgICAgIGhhbmRsZUNsaWNrKGUsIGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAvLyB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lT3Zlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLmZhZGVPdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtnYW1lLnRpdGxlRGlzcGxheSA9IHRydWV9LCBcIjIwMDBcIil9IC8vIGZhZGUgb3V0IHRyYW5zaXRpb24gfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtnYW1lLmxldmVsRmluaXNoID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgpeyAgIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnOyAvL2RyYXcgYm9yZGVyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vc2V0cyBhcmVhIGZvciBjb2xsaXNpb24gKGlzUG9pbnRJblBhdGgpXG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCwgMik7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZHJhdyB0ZXh0IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzIpOyBcbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRTdGF0cyhnYW1lKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdHMxID0gW1sgJ01vbnN0ZXJzIERlZmVhdGVkOiAnKyBnYW1lLm1vbnN0ZXJLaWxsXSxcbiAgICAgICAgICAgICAgICAgICAgWydNb25zdGVycyBFc2NhcGVkOiAnKyBnYW1lLm1vbnN0ZXJFc2NhcGVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydNZXNvcyBDb2xsZWN0ZWQ6ICcrIGdhbWUubW9uZXlDb2xsZWN0ZWRdLFsnTWVzb3MgTG9zdDogJysgZ2FtZS5tb25leUxvc3RdXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc3RhdHMyID0gW11cbiAgICAgICAgICAgIGZvciAoY29uc3Qgb2JqIG9mIGdhbWUucGxheWVyT2JqZWN0cyl7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXRzT2JqID0gJydcbiAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT0gJ2dyZWVuRHJhZ29uJyl7IC8vYWRkIHBvaXNvblxuICAgICAgICAgICAgICAgICAgICBzdGF0c09iaiA9ICBbb2JqLm5hbWUrJyBEYW1hZ2U6ICcrIG9iai5kYW1hZ2VEZWFsdC50b0ZpeGVkKDApICsgXCIgKCtcIisgZ2FtZS5wb2lzb25EYW1hZ2UudG9GaXhlZCgwKSsgJyknXTsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iai50eXBlID09ICdyZWREcmFnb24nIHx8IG9iai50eXBlID09ICdibGFja0RyYWdvbicpeyAvL2V4cGxvZGUgZGFtYWdlIFxuICAgICAgICAgICAgICAgICAgICBzdGF0c09iaiA9ICBbb2JqLm5hbWUrJyBEYW1hZ2U6ICcrIG9iai5kYW1hZ2VEZWFsdC50b0ZpeGVkKDApICsgXCIgKCtcIisgb2JqLmV4cGxvZGVEYW1hZ2VEZWFsdC50b0ZpeGVkKDApKyAnKSddOyB9XG4gICAgICAgICAgICAgICAgZWxzZSB7c3RhdHNPYmogPSAgW29iai5uYW1lKycgRGFtYWdlOiAnKyBvYmouZGFtYWdlRGVhbHQudG9GaXhlZCgwKV07IH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRzMi5wdXNoKHN0YXRzT2JqKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgXG5cbiAgICAgICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVPdmVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ0dhbWUgT3ZlciEnLCB0aGlzLmdhbWVXaWR0aC8yLCAyNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdyhjdHgpOyAvL3JldHVybiB0byBtYWluIGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS53YXZlRmluaXNoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0MT0nJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0Mj0nJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmxldmVsID09IGdhbWUuZmluYWxMZXZlbCAmJiBnYW1lLmxldmVsTGlzdC5sZW5ndGggPT0gMCl7IC8vZmluYWwgbGV2ZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0MT0gJ0ZpbmFsIExldmVsIENsZWFyIScgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Mj0gJ1RoYW5rcyBmb3IgcGxheWluZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdyhjdHgpO30gLy9yZXR1cm4gdG8gbWFpbiBidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmxldmVsTGlzdC5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQxPSdMZXZlbCAnICtnYW1lLmxldmVsKyAnIENsZWFyISc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyB0ZXh0MT0nV2F2ZSBDbGVhciEnO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0MiA9ICdQcmVzcyBbRF0gdG8gc3RhcnQgbmV4dCB3YXZlISc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQxLCB0aGlzLmdhbWVXaWR0aC8yLCAyNSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGV4dDIsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMuaGVpZ2h0LTEwKS8vXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ3N0YXJ0JzsgLy9zdGF0cyBcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTdGF0cyhnYW1lKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zdGF0czEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7IGo8dGhpcy5zdGF0czFbaV0ubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuc3RhdHMxW2ldW2pdLCB0aGlzLnBhZGRpbmcrdGhpcy5zdGF0UG9zaXRpb24rKHRoaXMuc3RhdFdpZHRoLzQpKmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMjUrIHRoaXMucGFkZGluZysodGhpcy5zdGF0SGVpZ2h0KSppLCAzMDAgKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc3RhdHMyLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqPHRoaXMuc3RhdHMyW2ldLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnN0YXRzMltpXVtqXSwgdGhpcy5wYWRkaW5nK3RoaXMuc3RhdFBvc2l0aW9uK3RoaXMuc3RhdFdpZHRoKjEuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyNSsgdGhpcy5wYWRkaW5nKyh0aGlzLnN0YXRIZWlnaHQpKmksIDMwMCApOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgfVxufVxuIiwiaW1wb3J0IElucHV0SGFuZGxlciBmcm9tICcuL2lucHV0JzsgXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJzsgXG5pbXBvcnQgTW9iIGZyb20gJy4vbW9iJztcbmltcG9ydCBVcGdyYWRlIGZyb20gJy4vdXBncmFkZSc7IFxuaW1wb3J0IE1vbmV5IGZyb20gJy4vbW9uZXknOyBcbmltcG9ydCBzdGFydFNjcmVlbiBmcm9tICcuL3N0YXJ0U2NyZWVuJzsgXG5pbXBvcnQgdGl0bGVTY3JlZW4gZnJvbSAnLi90aXRsZVNjcmVlbic7IFxuaW1wb3J0IHJlc3RhcnRTY3JlZW4gZnJvbSAnLi9yZXN0YXJ0U2NyZWVuJzsgXG5pbXBvcnQgZW5kU2NyZWVuIGZyb20gJy4vZW5kU2NyZWVuJzsgXG5pbXBvcnQgSFVEIGZyb20gJy4vSFVEJzsgXG5pbXBvcnQgaW1nIGZyb20gJy4vaW1nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXtcbiAgICBjb25zdHJ1Y3RvcihnYW1lV2lkdGgsIGdhbWVIZWlnaHQpe1xuICAgICAgICB0aGlzLm5vdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy50aXRsZSA9IG5ldyB0aXRsZVNjcmVlbih0aGlzKTsgXG4gICAgICAgIHRoaXMudGl0bGUuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5lbmQgPSBuZXcgZW5kU2NyZWVuKHRoaXMpOyBcbiAgICAgICAgdGhpcy5lbmQuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5yZXN0YXJ0ID0gbmV3IHJlc3RhcnRTY3JlZW4odGhpcyk7IFxuICAgICAgICB0aGlzLnJlc3RhcnQuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5yZXN0YXJ0V2luZG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGl0bGVEaXNwbGF5ID0gdHJ1ZTsvL2ZhbHNlOyAvL2VuYWJsZSBmb3IgcmVsZWFzZVxuICAgICAgICB0aGlzLmxvYWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID1bXTtcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzID1bXTsgXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gW107IFxuICAgICAgICB0aGlzLmxldmVsID0gMTtcbiAgICAgICAgdGhpcy5maW5hbExldmVsID0zIDsgXG4gICAgICAgIHRoaXMud2F2ZSA9IDA7IFxuICAgICAgICB0aGlzLmxhbmUgPSAxOyBcbiAgICAgICAgdGhpcy5iZ1NreSA9IGltZygnYmcvYmdTa3knK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgdGhpcy5iZ1N0YWdlID0gaW1nKCdiZy9iZ1N0YWdlJyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2F2ZUluZm8gPSByZXF1aXJlKCcuL3dhdmVJbmZvLmpzb24nKTtcbiAgICAgICAgdGhpcy53YXZlTm90ZXMgPSByZXF1aXJlKCcuL3dhdmVOb3Rlcy5qc29uJyk7XG4gICAgICAgIHRoaXMubGV2ZWxOb3RlID0gJyc7IFxuICAgICAgICB0aGlzLmxldmVsTGlzdCA9IFsuLi50aGlzLndhdmVJbmZvWydsZXZlbCcrdGhpcy5sZXZlbF1dOy8vezE6IFsnd2F2ZTEtNScsICd3YXZlMS0xJ119IC8vSlNPTlxuICAgICAgICB0aGlzLndhdmVMaXN0ID0gW107XG4gICAgICAgIHRoaXMudG9Mb2FkID1bXTsgXG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gOTA7IC8vbGFuZSBzaXplXG4gICAgICAgIHRoaXMubmV4dFdhdmUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMubGV2ZWxTdGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSB0cnVlOyBcbiAgICAgICAgdGhpcy5sZXZlbEZpbmlzaCA9IGZhbHNlIDsgLy9jbG9zZSBzdGF0cyBtZW51XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZpcnN0TG9hZCA9IDA7IFxuICAgICAgICB0aGlzLm5vdGVUaW1lID0gMDsgXG4gICAgICAgIHRoaXMuZ2FtZVRpbWUgPSAwOyAvL3BsYXllZCBnYW1lIHRpbWUgZm9yIGV2ZW50czsgXG4gICAgICAgIHRoaXMuZ2FtZVRpbWVSZWFsID0gMDsgLy90cmFja3MgdGltZSBhZ2FpbnN0IHBhdXNlcyBcbiAgICAgICAgdGhpcy5wYXVzZWRUaW1lID0gMDsgXG4gICAgICAgIHRoaXMudGltZU9mZnNldCA9IDBcbiAgICAgICAgdGhpcy50aW1lT2Zmc2V0U3VtID0gMDsgXG4gICAgICAgIHRoaXMuc2V0UG9pbnQgPSBmYWxzZTsgXG5cbiAgICAgICAgdGhpcy5mYWRlID0gMDtcbiAgICAgICAgdGhpcy5mYWRlSW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mYWRlT3V0ID0gZmFsc2UgO1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBbXTsgXG4gICAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMubW9iQ291bnQgPSAwIDsgXG5cbiAgICAgICAgdGhpcy5wb2lzb25EYW1hZ2UgPSAwOyBcbiAgICAgICAgdGhpcy5tb25zdGVyS2lsbCA9IDA7IFxuICAgICAgICB0aGlzLm1vbnN0ZXJFc2NhcGUgPSAwO1xuICAgICAgICB0aGlzLmRhbWFnZURlYWx0ID0ge307IFxuICAgICAgICB0aGlzLm1vbmV5Q29sbGVjdGVkID0gMDtcbiAgICAgICAgdGhpcy5tb25leUxvc3QgPSAwOyBcbiAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlPWZhbHNlO1xuXG4gICAgfVxuXG4gICAgcGF1c2VIYW5kbGVyKHRpbWUsIGN0eCl7XG5cbiAgICAgICAgaWYgKHRoaXMucGF1c2UgKXsgLy9zbmFwcyB3aGVuIHRpbWUgaXMgcGF1c2VkOyBcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXRQb2ludCl7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZWRUaW1lID0gdGltZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvaW50ID0gdHJ1ZTsgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHt0aGlzLnRpbWVPZmZzZXQgPSB0aW1lIC0gdGhpcy5wYXVzZWRUaW1lfSAvL3J1bnMgdXAgb2Zmc2V0IHZhbHVlIFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGUuZGlzcGxheSA9IGZhbHNlIDtcbiAgICAgICAgICAgIHRoaXMudGltZU9mZnNldFN1bSs9IHRoaXMudGltZU9mZnNldDsgLy9zdW0gb2Ygb2Zmc2V0IHZhbHVlcyBcbiAgICAgICAgICAgIHRoaXMudGltZU9mZnNldCA9IDA7ICAvL3Jlc2V0IFxuICAgICAgICAgICAgdGhpcy5nYW1lVGltZVJlYWwgPSB0aW1lIC10aGlzLnRpbWVPZmZzZXRTdW07IC8vYXBwbHkgb2Zmc2V0IHN1bVxuICAgICAgICAgICAgdGhpcy5zZXRQb2ludCA9IGZhbHNlOyAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYXVzZSl7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjZcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwwLHRoaXMuZ2FtZVdpZHRoLCB0aGlzLmdhbWVIZWlnaHQpOyBcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy51cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gXCIxNnB4IGFyaWFsXCI7IFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQcmVzcyBFU0MgdG8gdW5wYXVzZScsIHRoaXMuZ2FtZVdpZHRoLzIsIHRoaXMuZ2FtZUhlaWdodC8yKzIwKSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVBhdXNlKCl7ICAgXG4gICAgICAgIHRoaXMucGF1c2UgPSAhdGhpcy5wYXVzZTsgXG4gICAgfVxuXG4gICAgcmVzZXRFdmVyeXRoaW5nKCl7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucmVzdGFydFdpbmRvdyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpdGxlRGlzcGxheSA9IGZhbHNlOyAvL2VuYWJsZSBmb3IgcmVsZWFzZVxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cyA9IFtdOyBcbiAgICAgICAgdGhpcy53YXZlID0gMDsgXG4gICAgICAgIHRoaXMuYmdTa3kgPSBpbWcoJ2JnL2JnU2t5Jyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgIHRoaXMuYmdTdGFnZSA9IGltZygnYmcvYmdTdGFnZScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLndhdmVJbmZvID0gcmVxdWlyZSgnLi93YXZlSW5mby5qc29uJyk7XG4gICAgICAgIHRoaXMubGV2ZWxMaXN0ID0gWy4uLnRoaXMud2F2ZUluZm9bJ2xldmVsJyt0aGlzLmxldmVsXV07Ly97MTogWyd3YXZlMS01JywgJ3dhdmUxLTEnXX0gLy9KU09OXG5cbiAgICAgICAgdGhpcy53YXZlTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnRvTG9hZCA9W107IFxuICAgICAgICB0aGlzLm5leHRXYXZlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSB0cnVlOyBcbiAgICAgICAgdGhpcy5sZXZlbEZpbmlzaCA9IGZhbHNlIDsgLy9jbG9zZSBzdGF0cyBtZW51XG4gICAgICAgIC8vdGhpcy5nYW1lVGltZSA9IDA7IFxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBbXTsgXG4gICAgICAgIHRoaXMucG9pc29uRGFtYWdlID0gMDsgXG4gICAgICAgIHRoaXMubW9uc3RlcktpbGwgPSAwOyBcbiAgICAgICAgdGhpcy5tb25zdGVyRXNjYXBlID0gMDtcbiAgICAgICAgdGhpcy5kYW1hZ2VEZWFsdCA9IHt9OyBcbiAgICAgICAgdGhpcy5tb25leUNvbGxlY3RlZCA9IDA7XG4gICAgICAgIHRoaXMubW9uZXlMb3N0ID0gMDsgXG4gICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZT1mYWxzZTtcbiAgICAgICAgdGhpcy5sb2FkQkcoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gW3RoaXMucGxheWVyXTtcbiAgICB9XG4gICAgXG4gICAgdGl0bGVNZW51KGN0eCl7IFxuXG4gICAgICAgIHRoaXMudGl0bGUuZGlzcGxheU1lbnUoY3R4LCB0aGlzKTsgXG4gICAgfVxuXG4gICAgd2F2ZUNsZWFyKGN0eCl7IC8vIGNoZWNrcyBpZiB3YXZlIGlzIGNsZWFyZWRcbiAgICAgICAgaWYgKCF0aGlzLm5leHRXYXZlICYmIHRoaXMud2F2ZVN0YXJ0ICYmIHRoaXMubGV2ZWxTdGFydCAmJiBcbiAgICAgICAgICAgIHRoaXMudG9Mb2FkLmxlbmd0aCA9PSAwICAmJiB0aGlzLm1vYk9iamVjdHMubGVuZ3RoPT0wICl7XG4gICAgICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMuZW5kLmRpc3BsYXkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbmQuZGlzcGxheU1lbnUoY3R4LCB0aGlzKTtcbiAgICAgICAgfSBcbiAgICB9XG4gICAgbmV4dExldmVsTG9hZGVyKGN0eCl7XG4gICAgICAgIGlmICh0aGlzLmxldmVsTGlzdC5sZW5ndGggPT0gMCAmJiB0aGlzLndhdmVGaW5pc2gpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxGaW5pc2gpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT10aGlzLmZpbmFsTGV2ZWwpeyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQgPSB0cnVlfSwgXCIyMDAwXCIpIC8vIGZhZGUgb3V0IHRyYW5zaXRpb25cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4geyAvL2xvYWQgbmV4dCBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbExpc3QgPSBbLi4udGhpcy53YXZlSW5mb1snbGV2ZWwnK3RoaXMubGV2ZWxdXTsgLy8gbG9hZCBuZXh0IGxldmVsIHdhdmVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxGaW5pc2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlID0gMDsgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpOyAvL3JlbG9hZCBCRyBhcnQgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmdTdGFnZSA9IGltZygnYmcvYmdTdGFnZScrdGhpcy5sZXZlbCsnLnBuZycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cyA9IFtdOyAvL2NsZWFyIGZsb29yIG1vbmV5IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0V2F2ZSAgPSBmYWxzZSBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubGFuZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uID0ge3g6MjUsIHk6dGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAyKnRoaXMucGxheWVyLnJvd0hlaWdodH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmZsb29yID0gdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAoMSt0aGlzLnBsYXllci5sYW5lKSp0aGlzLnBsYXllci5yb3dIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IHRoaXMucGxheWVyT2JqZWN0cy5zcGxpY2UoMSk7ICAvL3B1bGxzIGV2ZXJ5dGhpbmcgZXhwZWN0IHBsYXllclxuICAgICAgICAgICAgICAgIH0sIFwiNDAwMFwiKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dFdhdmVMb2FkZXIoKXtcbiAgICAgICAgaWYgKHRoaXMubmV4dFdhdmUpeyAvL2xvYWQgbmV4dCB3YXZlIGRhdGEgZnJvbSBKU09OXG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbExpc3QubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZUxpc3QgPSBbLi4udGhpcy53YXZlSW5mb1t0aGlzLmxldmVsTGlzdC5zaGlmdCgpXV07IC8vXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lVGltZSA9IHRoaXMuZ2FtZVRpbWVSZWFsOyAvL3N0YXJ0IG9mIHdhdmU7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlU3RhcnQgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgdGhpcy53YXZlICsrOyBcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRXYXZlID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gZmFsc2U7IFxuXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy53YXZlTm90ZXNbJ3dhdmUnK3RoaXMubGV2ZWwrJy0nK3RoaXMud2F2ZV0pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsTm90ZSA9IHRoaXMud2F2ZU5vdGVzWyd3YXZlJyt0aGlzLmxldmVsKyctJyt0aGlzLndhdmVdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGVUaW1lID0gdGhpcy5nYW1lVGltZVJlYWw7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5sZXZlbEZpbmlzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JlZW5UcmFuc2l0aW9uKGN0eCl7XG4gICAgICAgIGlmICh0aGlzLmZhZGVJbil7IC8vZmFkZSBpbiBcbiAgICAgICAgICAgIGlmICh0aGlzLmZhZGU+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWRlIC09IDAuMDM7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGUgPD0gMCkge3RoaXMuZmFkZUluID0gZmFsc2U7fVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mYWRlT3V0KXsgLy9mYWRlIHRvIGJsYWNrXG4gICAgICAgICAgICBpZiAodGhpcy5mYWRlIDwgMSl7ICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZmFkZSArPSAwLjAzOyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWRlID49IDEpIHsgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQgPSBmYWxzZTt9LCBcIjE1MDBcIil9XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZhZGVJbiB8fCB0aGlzLmZhZGVPdXQpe1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuZmFkZTsgXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5nYW1lV2lkdGgsIHRoaXMuZ2FtZUhlaWdodCk7IFxuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHdhdmVMb2FkZXIoKXsvL2xvYWRkcyBlYWNoIG1vYiBmcm9tIHdhdmVMaXN0XG4gICAgICAgIGlmICh0aGlzLnRvTG9hZC5sZW5ndGggPT0gMCAmJiB0aGlzLndhdmVMaXN0Lmxlbmd0aD4wKSB7dGhpcy50b0xvYWQgPSB0aGlzLndhdmVMaXN0LnNoaWZ0KCk7fVxuICAgICAgICBpZiAodGhpcy50b0xvYWRbMl0gPD0gICh0aGlzLmdhbWVUaW1lUmVhbCAtIHRoaXMuZ2FtZVRpbWUpLzEwMDAgKXtcbiAgICAgICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmxldmVsU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMudG9Mb2FkWzFdLmxlbmd0aD4wKXsgLy9tdWx0aXBsZSBlbnRyaWVzIFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnRvTG9hZFsxXS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZSA9IHRoaXMudG9Mb2FkWzFdW2ldOyAvL3NldHMgbGFuZSB0byBsb2FkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9iKHRoaXMsIHRoaXMudG9Mb2FkWzBdLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2JDb3VudCArKzsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmUgPSB0aGlzLnRvTG9hZFsxXS0xOyAvL3NldHMgbGFuZSB0byBsb2FkXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNb2IodGhpcywgdGhpcy50b0xvYWRbMF0sIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMubW9iQ291bnQgKys7IH0gICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy50b0xvYWQgPSBbXTsgXG4gICAgICAgIH0gXG5cbiAgICB9ICAgIFxuICAgIFxuICAgIGFkZEVsZW1lbnQoZWxlbWVudCl7IC8vdXBncmFkZSBzaG9wIFxuICAgICAgIGlmICh0aGlzLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGg8NSl7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIubW9uZXk+IHRoaXMucGxheWVyLmVsZW1lbnRDb3N0W3RoaXMucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF0pe1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm1vbmV5IC09IHRoaXMucGxheWVyLmVsZW1lbnRDb3N0W3RoaXMucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF07XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZWxlbWVudExpc3QucHVzaChlbGVtZW50KTsgXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZWxlbWVudGFscygpOyAvL2xvYWQgc3ByaXRlc1xuICAgICAgICAgICAgICAgIC8vYXBwbHkgdXBncmFkZXNcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSAnQmxhemUnKXt0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC40IH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PVwiRGF3blwiKXt0aGlzLnBsYXllci5sb290TXVsdGkrPTAuNTsgdGhpcy5wbGF5ZXIuZGFtYWdlTXVsdGkrPTAuMiB9O1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09J05pZ2h0Jyl7dGhpcy5wbGF5ZXIua25vY2tiYWNrTXVsdGkrPTAuMjsgdGhpcy5wbGF5ZXIuZGFtYWdlTXVsdGkrPTAuMn07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0nV2luZCcpe3RoaXMucGxheWVyLnNwZWVkTXVsdGkrPTAuMn07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0nVGh1bmRlcicpe3RoaXMucGxheWVyLnBpZXJjZSs9MTt0aGlzLnBsYXllci5kYW1hZ2VNdWx0aSs9MC4yIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VtbW9uKHR5cGUpe1xuICAgICAgICBsZXQgdHJhbnNmZXIgPSB0aGlzLnN0b3JhZ2UuZmluZEluZGV4KG9iaj0+b2JqLnR5cGUgPT09IHR5cGUpOyBcbiAgICAgICAgdGhpcy5zdG9yYWdlW3RyYW5zZmVyXS5wb3NpdGlvbi54ID0gKHRoaXMucGxheWVyLmN1clRpbGUqODApK3RoaXMucGxheWVyLndpZHRoLzI7XG4gICAgICAgIHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0ucG9zaXRpb24ueSA9ICh0aGlzLnBsYXllci5mbG9vciszMCk7IFxuICAgICAgICB0aGlzLnN0b3JhZ2VbdHJhbnNmZXJdLmxhbmUgPSB0aGlzLnBsYXllci5sYW5lO1xuXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5wdXNoKHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0pOyAvL2NvcGllcyBvYmplY3QgdG8gbGlzdFxuICAgICAgICB0aGlzLnN0b3JhZ2Uuc3BsaWNlKHRyYW5zZmVyKTsgLy9kZWxldGVzIG9iamVjdCBmcm9tIHN0b3JhZ2VcbiAgICB9XG4gICAgcmVjYWxsQ2hlY2soKXtcbiAgICAgICAgaWYgKCF0aGlzLnJlY2FsbFN0b3JhZ2UgICYmIHRoaXMuc3RvcmFnZVswXSl7XG4gICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UgPSB0aGlzLnN0b3JhZ2Uuc2hpZnQoKSA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjYWxsKCl7ICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLnJlY2FsbFN0b3JhZ2Upe1xuICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai5wb3NpdGlvbi55LTMwID09PSB0aGlzLnBsYXllci5mbG9vcikmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JyApKVxuXG4gICAgICAgICAgICBpZiAodGhpcy5yZWNhbGxTdG9yYWdlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gdGhpcy5yZWNhbGxTdG9yYWdlLnR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gdGhpcy5wbGF5ZXJPYmplY3RzLmZpbHRlciggIFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LnR5cGUgIT0gdHlwZTsgfSk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSAmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JykpKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLnBvc2l0aW9uLnggPSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueSA9ICh0aGlzLnBsYXllci5mbG9vciszMCk7IFxuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZS5sZWZ0ID0gKHRoaXMucGxheWVyLmxlZnQpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UubGFuZSA9ICh0aGlzLnBsYXllci5sYW5lKTsgXG5cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaCh0aGlzLnJlY2FsbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vIGlmICghdGhpcy5yZWNhbGxTdG9yYWdlKXtcbiAgICAgICAgLy8gICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IHRoaXMucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoucG9zaXRpb24ueS0zMCA9PT0gdGhpcy5wbGF5ZXIuZmxvb3IpJiYgIC8vY2hlY2tzIGZvciBleGlzdGluZyB1bml0IFxuICAgICAgICAvLyAgICAgKG9iai5wb3NpdGlvbi54ID09PSAodGhpcy5wbGF5ZXIuY3VyVGlsZSo4MCkrdGhpcy5wbGF5ZXIud2lkdGgvMikgJiYgKG9iai5uYW1lIT09J1dpeicgKSlcblxuICAgICAgICAvLyAgICAgaWYgKHRoaXMucmVjYWxsU3RvcmFnZSlcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgdHlwZSA9IHRoaXMucmVjYWxsU3RvcmFnZS50eXBlO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9IHRoaXMucGxheWVyT2JqZWN0cy5maWx0ZXIoICAvL3JlbW92ZXMgbG9vdGVkIGNvaW5zXG4gICAgICAgIC8vICAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QudHlwZSAhPSB0eXBlOyB9KTsgICAgXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICB0aGlzLnJlY2FsbFN0b3JhZ2UucG9zaXRpb24ueCA9ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yO1xuICAgICAgICAvLyAgICAgdGhpcy5yZWNhbGxTdG9yYWdlLnBvc2l0aW9uLnkgPSAodGhpcy5wbGF5ZXIuZmxvb3IrMzApOyBcblxuICAgICAgICAvLyAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2godGhpcy5yZWNhbGxTdG9yYWdlKTtcbiAgICAgICAgLy8gICAgIHRoaXMucmVjYWxsU3RvcmFnZSA9IGZhbHNlO1xuICAgICAgICAvLyB9XG5cblxuICAgIH1cblxuICAgIGNyZWF0ZU1vYihwYXJlbnQsIHR5cGUsIHNpZGUsIGdhbWUgPSBudWxsICl7XG4gICAgICAgIGlmIChzaWRlID09PSAwKXsgLy9TdW1tb24gdW5pdFxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSAmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JykpKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgY29zdCA9IDEwMDA7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5zdW1tb25Db3N0W3RoaXMucGxheWVyLnN1bW1vbkNvdW50XSl7IFxuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gdGhpcy5wbGF5ZXIuc3VtbW9uQ29zdFt0aGlzLnBsYXllci5zdW1tb25Db3VudF07IFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIubW9uZXk+PWNvc3Qpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYihwYXJlbnQsIHR5cGUsIDApKSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm1vbmV5IC09IGNvc3Q7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc3VtbW9uQ291bnQgKys7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdhbWUpe2dhbWUuZXJyb3IgPSB0cnVlOyB9OyBcblxuICAgICAgICB9IGVsc2Uge3RoaXMubW9iT2JqZWN0cy5wdXNoKG5ldyBNb2IocGFyZW50LCB0eXBlLCAxKSl9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGxvYWRCRygpe1xuICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpOyAvL2xvYWQgc2t5IGJnXG4gICAgfVxuXG4gICAgc3RhcnQoKXtcbiAgICAgICAgdGhpcy5zdGFydE1lbnUgPSBuZXcgc3RhcnRTY3JlZW4odGhpcyk7XG4gICAgICAgIHRoaXMuc3RhcnRNZW51LmluaXRpYWxpemUodGhpcyk7IFxuICAgICAgICB0aGlzLnVwZ3JhZGUgPSBuZXcgVXBncmFkZSh0aGlzKTsgXG4gICAgICAgIHRoaXMudXBncmFkZS5pbml0aWFsaXplKHRoaXMpOyBcbiAgICAgICAgdGhpcy5IVURNZW51ID0gbmV3IEhVRCh0aGlzKTsgXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID0gW3RoaXMucGxheWVyXTtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSBuZXcgSW5wdXRIYW5kbGVyKHRoaXMucGxheWVyLCB0aGlzLnVwZ3JhZGUsIHRoaXMpOyAgICAgICAgXG5cbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ3JlZERyYWdvbicsIDAsNCw1KSk7IFxuICAgICAgICAvLyB0aGlzLnBsYXllck9iamVjdHMucHVzaChuZXcgTW9iKHRoaXMucGxheWVyLCAnYmx1ZURyYWdvbicsIDAsMiw1KSk7IFxuICAgICAgICAvLyB0aGlzLnBsYXllck9iamVjdHMucHVzaChuZXcgTW9iKHRoaXMucGxheWVyLCAnZ3JlZW5EcmFnb24nLCAwLDMsNSkpOyBcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYih0aGlzLnBsYXllciwgJ2JsYWNrRHJhZ29uJywgMCwxLDUpKTsgXG5cbiAgICB9XG5cblxuXG4gICAgZHJhdyhjdHgpeyAvL3J1bnMgZHJhdyBmdW5jdGlvbiBmb3Igb2JqZWN0IGxpc3QgXG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJnU2t5LCAwLCAwKTsgXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iZ1N0YWdlLCAwLCAwKTsgXG4gICAgICAgIHRoaXMuc3RhcnRNZW51LmRpc3BsYXlNZW51KGN0eCwgdGhpcyApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZW1vdGUodGhpcykpOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsdGhpcy5wYXVzZSkgKVxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCwgdGhpcy5wYXVzZSkgKTtcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCx0aGlzLnBhdXNlKSApOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhd1Byb2ooY3R4LHRoaXMucGF1c2UpICk7IC8vcGxheWVyIHByb2pcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhd1Byb2ooY3R4LCB0aGlzLnBhdXNlKSApOyAvL21vYiBwcm9qIFxuXG5cbiAgICAgICAgdGhpcy5wbGF5ZXIucmVjYWxsSWNvbihjdHgsIHRoaXMpO1xuICAgIFxuICAgIH0gXG5cbiAgICBrbm9ja2JhY2sob2JqLCBkaXJlY3Rpb24sIG11bHRpKXtcbiAgICAgICAgaWYgKG9iai5uYW1lID09J1dpeicpeyAvL29ubHkgcGxheWVyIHBvcHMgdXBcbiAgICAgICAgICAgIG9iai5qdW1wID0gdHJ1ZTtcbiAgICAgICAgICAgIG9iai5pbnZ1bG5UaW1lID0gMTEwOyBcbiAgICAgICAgICAgIG9iai5zcGVlZFkgKz0gNDtcbiAgICAgICAgICAgIG9iai5rbm9ja2JhY2tGb3JjZT0gLTgqZGlyZWN0aW9uOyB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBvYmouaGl0ID0gdHJ1ZTsgXG4gICAgICAgICAgICBvYmoua25vY2tiYWNrVGltZSA9IHRoaXMuZ2FtZVRpbWVSZWFsOyAgLy9zdG9yZXMgd2hlbiB0YXJnZXQga25vY2tiYWNrO1xuICAgICAgICAgICAgaWYgKG9iai5ib3NzKXstMipkaXJlY3Rpb24qKDErIChtdWx0aS0xKS80KX0gLy9ib3NzIGxlc3Mga25vY2tiYWNrXG4gICAgICAgICAgICBlbHNlIHtvYmoua25vY2tiYWNrRm9yY2UgPSAtNCpkaXJlY3Rpb24qKDErIChtdWx0aS0xKS80KX07IC8vYWRkIGFzIHN0YXRcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIGFnZ3JvKG9iajEsIG9iajIpeyAvLyBjaGVja3MgaWYgb2JqMSByYW5nZSBpcyB3aXRoaW4gb2JqMlxuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGVhbHRoPjApe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXStvYmoxLnJhbmdlPnRhcmdldC5oaXRib3hbMF0gfHwgXG4gICAgICAgICAgICAgICAgICAgIG9iajEuaGl0Ym94WzBdLW9iajEucmFuZ2U8dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdKXsgLy9hZ2dybyBmcm9tIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXStvYmoxLmhpdGJveFszXT50YXJnZXQuaGl0Ym94WzFdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5sYW5lID09IHRhcmdldC5sYW5lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICB7aWYgKG9iajEuYWdncm8pe29iajEuYXR0YWNrKCl9OyAvL29ubHkgYWdncm8gbW9icyBoYXZlIGF0dGFjayBhbmltYXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqMS5hZ2dybyAmJiBvYmoxLnNpZGUgPT0gMSApe29iajEuYXR0YWNrKCl9OyAvL2VuZW1pZXMgYXR0YWNrIG9uIENEXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgfVxuICAgIFxuICAgIGxvb3RNb25leShvYmoxLCBvYmoyKXtcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7IC8vLSh0aGlzLndpZHRoKigtMSt0aGlzLmxvb3RNdWx0aSkpXG4gICAgICAgICAgICBpZiAoIChvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdICYmIG9iajEuaGl0Ym94WzBdKzgwKihvYmoxLmxvb3RNdWx0aSkgPiB0YXJnZXQuaGl0Ym94WzBdKSB8fCAvL29iajEgb24gbGVmdFxuICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXSA+IHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSAmJiBvYmoxLmhpdGJveFswXS04MCoob2JqMS5sb290TXVsdGktMSk8dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICkpeyAvL29iajEgb24gcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXStvYmoxLmhpdGJveFszXT50YXJnZXQuaGl0Ym94WzFdKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQuc3RhcnRGYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEubW9uZXkgKz0gdGFyZ2V0LnZhbHVlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9uZXlDb2xsZWN0ZWQgKz0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0YXJ0RmFkZSA9IHRydWU7Ly90cnVlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5mbG9hdCA9IHRydWU7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxvc3QpeyBcbiAgICAgICAgICAgICAgICB0aGlzLm1vbmV5TG9zdCs9dGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlPTAgfTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gdGhpcy5tb25leU9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGxvb3RlZCBjb2luc1xuICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LmRlbGV0ZSA9PSBmYWxzZTsgfSk7ICAgICBcbiAgICB9XG5cbiAgICBleHBsb2RlRGFtYWdlKG9iajEsIG9iajIsIG9iajMpe1xuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGVhbHRoPjApe1xuICAgICAgICAgICAgICAgIGlmICggKG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0gJiYgb2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0rb2JqMy5hcmVhID4gdGFyZ2V0LmhpdGJveFswXSkgfHwgLy9vYmoxIC0+dGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT50YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gJiYgb2JqMS5oaXRib3hbMF0tb2JqMy5hcmVhPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSApKXsgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG9iajEuaGl0Ym94WzFdPnRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSt0YXJnZXQuaGl0Ym94WzNdKXx8b2JqMy5jb2x1bW4+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEucG9pc29uPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnBvaXNvblN0YWNrKzE8b2JqMS5wb2lzb25NYXgpeyAvL2FkZCB0byBtYXggc3RhY2tzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucG9pc29uQW1vdW50ICs9IG9iajEucG9pc29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBvaXNvblN0YWNrKys7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucG9pc29uVGltZSA9IDU7ICAvL2ZvdXIgdGlja3MgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmhlYWx0aCAtPSBvYmozLmRhbWFnZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajMuZXhwbG9kZURhbWFnZURlYWx0ICs9IG9iajMuZGFtYWdlO31cbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgY29sbGlzaW9uKG9iajEsIG9iajIsIG9iajMgPSBudWxsKXsgLy8gY2hlY2tzIGlmIG9iajEgaXMgaGl0dGluZyBvYmoyIFxuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgIGlmIChvYmoxLmhlYWx0aD4wICYmIHRhcmdldC5oZWFsdGg+MCl7XG4gICAgICAgICAgICAgICAgaWYgKCAob2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSAmJiBvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT4gdGFyZ2V0LmhpdGJveFswXSkgfHwgLy9vYmoxIC0+dGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT50YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gJiYgXG4gICAgICAgICAgICAgICAgICAgIG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSApKXsgLy8gdGFyZ2V0IDwtIG9iajFcblxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMV0+dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXTx0YXJnZXQuaGl0Ym94WzFdK3RhcmdldC5oaXRib3hbM10peyAvL3ktYm91bmRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLnByb2plY3RpbGUgJiYgIW9iajEuZXhwbG9kZSAmJiAhb2JqMS5oaXRMaXN0LmluY2x1ZGVzKHRhcmdldC5uYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zaWRlID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXQubGFuZSA9PSBvYmoxLmxhbmUpeyAvL3BsYXllciBvbmx5IGNhbiBoaXQgZnJvbSBwcm9qIGluIGxhbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQsIG9iajMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5waWVyY2UgLT0gMTsgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5oaXRMaXN0LnB1c2godGFyZ2V0Lm5hbWUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQsIG9iajMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoxLnBpZXJjZSAtPSAxOyAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuaGl0TGlzdC5wdXNoKHRhcmdldC5uYW1lKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmozLmFyZWE+MCl7dGhpcy5leHBsb2RlRGFtYWdlKG9iajEsIG9iajIsIG9iajMpfTsgLy9hcmVhIGRhbWFnZTsgY2hlY2tzIGZvciBuZWFyYnkgdGFyZ2V0cyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5waWVyY2U8PTApe29iajEuZXhwbG9kZSA9IHRydWV9OyAvL2Rlc3Ryb3kgcHJvamVjdGlsZSAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghb2JqMS5wcm9qZWN0aWxlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5sYW5lID09IHRhcmdldC5sYW5lKXt0aGlzLmRhbWFnZUNhbGMob2JqMSwgdGFyZ2V0KX07XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIGRhbWFnZUNhbGMob2JqMSwgb2JqMiwgb2JqMyA9IG51bGwpeyAvL29iajEgKG93bmVkIGJ5IG9iajMpIGF0dGFja2luZyBvYmoyIFxuICAgICAgICBpZiAob2JqMi5pbnZ1bG5UaW1lID09IDAgJiYgb2JqMS50b3VjaEhpdCkge1xuICAgICAgICAgICAgbGV0IGRhbWFnZSA9IG9iajEuZGFtYWdlO1xuICAgICAgICAgICAgbGV0IGtub2NrYmFjayA9IDE7IFxuICAgICAgICAgICAgaWYgKG9iajMpe29iajMuZGFtYWdlRGVhbHQrPSBkYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIGtub2NrYmFjayA9IG9iajMua25vY2tiYWNrTXVsdGk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvYmoxLmNoaWxsPjApe1xuICAgICAgICAgICAgICAgIGlmICggTWF0aC5hYnMob2JqMi5zcGVlZFgpLW9iajIuY2hpbGxBbW91bnQ+MCl7b2JqMi5jaGlsbEFtb3VudCs9IG9iajEuY2hpbGx9XG4gICAgICAgICAgICAgICAgZWxzZSBvYmoyLmNoaWxsQW1vdW50ID0gTWF0aC5hYnMob2JqMi5zcGVlZFgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqMi5oZWFsdGggLT0gZGFtYWdlO1xuICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gKz0gZGFtYWdlKmtub2NrYmFjaztcblxuICAgICAgICAgICAgaWYgKG9iajIua25vY2tiYWNrVGhyZXNoIDw9IG9iajIua25vY2tiYWNrU3VtKXtcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5wb3NpdGlvbi54Pm9iajIucG9zaXRpb24ueCl7IHRoaXMua25vY2tiYWNrKG9iajIsIDEsIGtub2NrYmFjayApfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5rbm9ja2JhY2sob2JqMiwgLTEsIGtub2NrYmFjayk7XG4gICAgICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gPSAwIFxuICAgICAgICAgICAgICAgIC8vIG9iajIua25vY2tiYWNrVGhyZXNoICo9MS4yIC8vaW5jcmVhc2UgdGhyZXNob2xkIGVhY2ggdGltZVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG5cblxuICAgIH1cbiAgICBsb3NlTGlmZShjdHgpeyAvL21vYiBlc2NhcGVzXG4gICAgICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMubW9iT2JqZWN0cyl7XG4gICAgICAgICAgICBpZiAob2JqLnBvc2l0aW9uLnggPD0gLW9iai53aWR0aCoyKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyLmhlYWx0aCAtPSAxOyBcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5mbGlwKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxvYmoudmFsdWUubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leUxvc3QrPW9iai52YWx1ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMubW9uZXlMb3N0ICs9IG9iai52YWx1ZTt9IC8vbG9zdCBtb25leVxuICAgICAgICAgICAgICAgICAgICBvYmouYWxpdmUgPSBmYWxzZTsgLy9kZWxldGUgbW9uc2VyOyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyRXNjYXBlICsrOyBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge29iai5zcGVlZFggPSAtb2JqLnNwZWVkWDsgb2JqLmxlZnQ9IW9iai5sZWZ0O31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3NpdGlvbi54ID49IHRoaXMuZ2FtZVdpZHRoICYmIG9iai5zcGVlZFg8MClcbiAgICAgICAgICAgICAgICB7b2JqLnNwZWVkWCA9IC1vYmouc3BlZWRYXG4gICAgICAgICAgICAgICAgb2JqLmxlZnQ9IW9iai5sZWZ0fTtcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy8gZHJhd0dyaWQoY3R4KXtcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpOyAgLy8gdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodFxuICAgIC8vICAgICBjdHgubW92ZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0KTtcbiAgICAvLyAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCk7XG4gICAgLy8gICAgIGN0eC5saW5lVG8oMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjIpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjIpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjMpO1xuICAgIC8vICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KjMpOyAgICAgICAgXG4gICAgLy8gICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyB9XG5cbiAgICB1cGdyYWRlTWVudShjdHgpe1xuICAgICAgICB0aGlzLkhVRE1lbnUuZGlzcGxheUhVRChjdHgsIHRoaXMpOyAgXG4gICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5oZWFsdGggPD0gMCApe1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5lbmQuZGlzcGxheSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVuZC5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNwYXduTW9uZXkob2JqKXtcbiAgICAgICAgaWYgKG9iai5zdGF0ZSA9PSAnZGllJyAmJiAhb2JqLmxvb3REcm9wKXtcbiAgICAgICAgICAgIGlmIChvYmoudmFsdWUubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgIGxldCB4ID0gLTAuNioyIDsgLy9tb25leSBzcHJlYWRcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxvYmoudmFsdWUubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5wdXNoKG5ldyBNb25leSh0aGlzLCBvYmosIG9iai52YWx1ZVtpXSwgeCtpKjAuNikpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7dGhpcy5tb25leU9iamVjdHMucHVzaChuZXcgTW9uZXkodGhpcywgb2JqLCBvYmoudmFsdWUpKX1cbiAgICAgICAgICAgIG9iai5sb290RHJvcCA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5tb25zdGVyS2lsbCsrOyBcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLnNwYXduTW9uZXkob2JqZWN0KSk7IFxuICAgICAgICB0aGlzLmxvc2VMaWZlKCk7IC8vZW5lbWllcyBwYXN0IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMgPSB0aGlzLm1vYk9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGRlYWQvcGFzc2luZyBvYmplY3RzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9iamVjdC5hbGl2ZSAhPT0gZmFsc2UpfSk7ICAgICAgICBcbiAgICAgICAgdGhpcy5sb290TW9uZXkodGhpcy5wbGF5ZXIsIHRoaXMubW9uZXlPYmplY3RzKTtcblxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKHRoaXMpICk7IFxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSh0aGlzKSApOyBcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5hbGl2ZSl7XG4gICAgICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuYWdncm8ob2JqZWN0LCB0aGlzLm1vYk9iamVjdHMpICk7ICAvL3N1bW1vbiBhdHRhY2tzXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLmFnZ3JvKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyAvL21vYiBhdHRhY2tzXG5cbiAgICAgICAgdGhpcy5jb2xsaXNpb24odGhpcy5wbGF5ZXIsIHRoaXMubW9iT2JqZWN0cyk7IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuY29sbGlzaW9uKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyBcblxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5tb2JBdHRhY2sodGhpcykpOyBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3Quc3VtbW9uQXR0YWNrKHRoaXMpKTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PiAvL21vYiBwcm9qIHRvIHBsYXllciBcbiAgICAgICAgICAgIG9iamVjdC5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0Mik9PiBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbihvYmplY3QyLCBbdGhpcy5wbGF5ZXJdLCBvYmplY3QpKSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PiAvL3BsYXllciBwcm9qIHRvIG1vYnNcbiAgICAgICAgICAgIG9iamVjdC5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0Mik9PiBcbiAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb24ob2JqZWN0MiwgdGhpcy5tb2JPYmplY3RzLCBvYmplY3QpXG4gICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICApOyBcblxuICAgIH1cbiAgIFxuXG4gICAgXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1nKGZpbGUpe1xyXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTsgXHJcbiAgICBpbWFnZS5zcmMgPSAnaW1hZ2VzLycrZmlsZTsgXHJcbiAgICByZXR1cm4gaW1hZ2U7IFxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0SGFuZGxlcntcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIHVwZ3JhZGUsIEdhbWUpe1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PnsgICAgXG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7IC8vYTo2NTsgczo4MzsgZDo2OCwgdzogODc7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDM3OiAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUudGl0bGVEaXNwbGF5ICYmICFHYW1lLmZhZGVPdXQgJiYgR2FtZS5sZXZlbD4xKXtHYW1lLmxldmVsLS19XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblg+MSl7dXBncmFkZS5zZWxlY3Rpb25YLT0xfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zcGVlZFggPSAtcGxheWVyLnNwZWVkOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubGVmdCA9IHRydWU7fVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDM5OiAvL3JpZ2h0IGFycm93XG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLnRpdGxlRGlzcGxheSAmJiAhR2FtZS5mYWRlT3V0ICYmIEdhbWUubGV2ZWw8R2FtZS5maW5hbExldmVsKXtHYW1lLmxldmVsKyt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPDIpe3VwZ3JhZGUuc2VsZWN0aW9uWCs9MX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc3BlZWRYID0gcGxheWVyLnNwZWVkOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubGVmdCA9IGZhbHNlO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBjYXNlIDM4OiAvLyB1cCBhcnJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWT4xKXt1cGdyYWRlLnNlbGVjdGlvblktPTF9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoLTEpO31cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgNDA6IC8vIGRvd24gYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblk8NSl7dXBncmFkZS5zZWxlY3Rpb25ZKz0xfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7cGxheWVyLnRlbGVwb3J0KDEpO31cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYXNlIDkwOiAvL1ogcmVjYWxsXG4gICAgICAgICAgICAgICAgaWYgKCFHYW1lLnRpdGxlRGlzcGxheSkge0dhbWUucmVjYWxsKCk7IH1cbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSA4ODogLy9YIGp1bXBcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwbGF5ZXIuanVtcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc3BlZWRZID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuanVtcCA9IHRydWU7fVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgICAgIFxuXG4gICAgICAgICAgICAgICAgY2FzZSA2NzogLy9DIGF0dGFja1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuYXR0YWNrKEdhbWUucGF1c2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgNjU6IC8vQSBvcGVuIHNob3BcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZ3JhZGUudG9nZ2xlTWVudShHYW1lKTsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDgzOiAvLyBTIGJ1eVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBncmFkZS5kaXNwbGF5ICYmICFHYW1lLnRpdGxlRGlzcGxheSl7dXBncmFkZS5wdXJjaGFzZShHYW1lKX1cbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSA2ODogLy9EIHN0YXJ0IHdhdmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUud2F2ZUZpbmlzaCAmJiBHYW1lLnN0b3JhZ2UubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLmdhbWVUaW1lUmVhbC1HYW1lLmZpcnN0TG9hZD41MDAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lLm5leHRXYXZlID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5zdGFydE1lbnUuZGlzcGxheSA9IGZhbHNlfTsgfVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSAyNzogLy8gRVNDXG4gICAgICAgICAgICAgICAgICAgIEdhbWUudG9nZ2xlUGF1c2UoKTsgXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vL29sZCBjb250cm9scyBcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDY1OiAvL0EgbW92ZSBsZWZ0IFxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWD4xKXt1cGdyYWRlLnNlbGVjdGlvblgtPTF9O1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHBsYXllci5zcGVlZFggPSAtcGxheWVyLnNwZWVkOyBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHBsYXllci5sZWZ0ID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDY4OiAvL0QgbW92ZSByaWdodFxuICAgICAgICAgICAgICAgIC8vIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIC8vICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblg8Mil7dXBncmFkZS5zZWxlY3Rpb25YKz0xfTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBwbGF5ZXIuc3BlZWRYID0gcGxheWVyLnNwZWVkOyBcbiAgICAgICAgICAgICAgICAvLyAgICAgcGxheWVyLmxlZnQgPSBmYWxzZTt9XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA4NzogLy9XIHRlbGVwb3J0IHVwXG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWT4xKXt1cGdyYWRlLnNlbGVjdGlvblktPTF9O1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZSB7cGxheWVyLnRlbGVwb3J0KC0xKTt9XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNhc2UgODM6IC8vUyB0ZWxlcG9ydCBkb3duXG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWTw1KXt1cGdyYWRlLnNlbGVjdGlvblkrPTF9O1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZSB7cGxheWVyLnRlbGVwb3J0KDEpO31cbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcblxuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA3NDogIC8vSiBcbiAgICAgICAgICAgICAgICAvLyBpZiAodXBncmFkZS5kaXNwbGF5KXt1cGdyYWRlLnB1cmNoYXNlKEdhbWUpfSAgICBcbiAgICAgICAgICAgICAgICAvLyBlbHNlIGlmICghcGxheWVyLmp1bXApe1xuICAgICAgICAgICAgICAgIC8vICAgICBwbGF5ZXIuc3BlZWRZID0gMTI7XG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5qdW1wID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrIFxuXG4gICAgICAgICAgICAgICAgLy8gY2FzZSA3NTogLy9LXG4gICAgICAgICAgICAgICAgLy8gICAgIHBsYXllci5hdHRhY2soR2FtZS5wYXVzZSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICAvLyBjYXNlIDc5OiAvL09cbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKEdhbWUud2F2ZUZpbmlzaCAmJiBHYW1lLnN0b3JhZ2UubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIEdhbWUubmV4dFdhdmUgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIEdhbWUuc3RhcnRNZW51LmRpc3BsYXkgPSBmYWxzZX07IFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWtcblxuICAgIFxuICAgICAgICAgICAgICAgIC8vIGNhc2UgOTY6XG4gICAgICAgICAgICAgICAgLy8gICAgIHVwZ3JhZGUudG9nZ2xlTWVudSgpOyBcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgOTc6IC8vMVxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdyZWREcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDk4OiAvLzJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAnYmx1ZURyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgOTk6IC8vM1xuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lLmNyZWF0ZU1vYihwbGF5ZXIsICdncmVlbkRyYWdvbicsIDApO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgMTAwOiAvLzRcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAnYmxhY2tEcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PnsgICAgXG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7IC8vYTo2NTsgczo4MzsgZDo2OCwgdzogODc7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUudGl0bGVEaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUuZmFkZU91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lLmZpcnN0TG9hZCA9IEdhbWUuZ2FtZVRpbWVSZWFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntHYW1lLnRpdGxlRGlzcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUucmVzZXRFdmVyeXRoaW5nKCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgODAwKX1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgOTogIFxuICAgICAgICAgICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgICAgIGNhc2UgMTE2OiBicmVhazsgXG5cbiAgICAgICAgICAgICAgICBjYXNlIDM3OiAgIC8vQSA9IDY1XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuc3BlZWRYPDApIHBsYXllci5zcGVlZFggPSAwOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOTogLy8gRCA9IDY4XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuc3BlZWRYPjApIHBsYXllci5zcGVlZFggPSAwOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG59IiwiaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuaW1wb3J0IFByb2plY3RpbGUgZnJvbSAnLi9wcm9qZWN0aWxlJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vYntcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB0eXBlLCBzaWRlLCB0ZXN0ID0gMCwgbGV2ZWw9MCl7XG4gICAgICAgIHRoaXMuc2lkZSA9IHNpZGU7XG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMCl7dGhpcy50eXBlSW5mbyA9IHJlcXVpcmUoJy4vc3VtbW9uSW5mby5qc29uJykgfVxuICAgICAgICBlbHNlICh0aGlzLnR5cGVJbmZvID0gcmVxdWlyZSgnLi9tb2JJbmZvLmpzb24nKSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcblxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlOyBcbiAgICAgICAgIFxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd2YWx1ZSddOyBcbiAgICAgICAgdGhpcy5sb290RHJvcCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IFtdO1xuICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IDE7IFxuICAgICAgICB0aGlzLmZhZGUgPSAxOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlOyAgXG4gICAgICAgIHRoaXMuYXR0YWNrQ0QgPSAwOyBcbiAgICAgICAgdGhpcy5tYXhTcGVlZCA9IDE1OyBcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgICAgIHRoaXMudG91Y2hIaXQgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDA7IFxuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlJ107IFxuICAgICAgICAvL3RoaXMuZGFtYWdlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkYW1hZ2UnXTsgXG4gICAgICAgIHRoaXMuYXR0YWNrU3BlZWQgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2F0a1NwZCddOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3BlZWRYID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcGVlZCddO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7IFxuICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTtcbiAgICAgICAgdGhpcy5sYW5lID0gZ2FtZS5sYW5lOyAgLy8gd2hpY2ggbGFuZVxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDEpeyAvL0VuZW15IE1vYiBcbiAgICAgICAgICAgIHRoaXMuaW52dWxuVGltZSA9ICAwOyBcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMudHlwZStnYW1lLm1vYkNvdW50OyBcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSA0NTsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnaGVpZ2h0J10pe3RoaXMuaGVpZ2h0ID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWlnaHQnXX1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5oZWlnaHQgPSA2NTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3JhbmdlJ10pe3RoaXMucmFuZ2UgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3JhbmdlJ119XG4gICAgICAgICAgICBlbHNlIHt0aGlzLnJhbmdlID0gMTA7fVxuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWFsdGgnXTtcbiAgICAgICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5oZWFsdGg7IFxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhbGsnO1xuICAgICAgICAgICAgdGhpcy54T2ZmPS03MDtcbiAgICAgICAgICAgIHRoaXMueU9mZj0tODU7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiAocmlnaHRzaWRlKVxuICAgICAgICAgICAgICAgIHg6IHRoaXMuZ2FtZVdpZHRoKzUwLCBcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmdhbWVIZWlnaHQgLSAxMDUgLSBnYW1lLnJvd0hlaWdodCpnYW1lLmxhbmUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIFBDIHBldHNcbiAgICAgICAgICAgIHRoaXMuaW52dWxuVGltZSA9IDE7IFxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDUwOyAvL3Nwcml0ZSBzaXplIFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDsgXG4gICAgICAgICAgICB0aGlzLnJhbmdlID0gNjAwOyAvL3dob2xlIGxhbmU/XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDE7IFxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDE7IFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCdcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGZhbHNlOyBcbiAgICAgICAgICAgIHRoaXMueU9mZj0wO1xuICAgICAgICAgICAgdGhpcy54T2ZmPTA7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZURlYWx0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuYWdncm8gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyduYW1lJ107XG4gICAgICAgICAgICBpZiAobGV2ZWwhPTApIHt0aGlzLmxldmVsID0gbGV2ZWx9OyBcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSAnTHZsLiAnICsgdGhpcy5sZXZlbDsgXG4gICAgICAgICAgICB0aGlzLmVtb3RlVGltZSA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMuZW1vdGVMZW5ndGggPSBbXTtcbiAgICAgICAgICAgIHRoaXMueVN0YXJ0ID0gZ2FtZS5mbG9vciszMDtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogKGdhbWUuY3VyVGlsZSo4MCkrZ2FtZS53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IGdhbWUuZmxvb3IrMzBcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9OyAgLy9vZmZzZXQgZm9yIHNwcml0ZXMgXG4gICAgICAgIC8vaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddKSAodGhpcy5wb3NpdGlvbi55IC09dGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pIDtcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlVHlwZSddKXt0aGlzLmxvYWRTcHJpdGUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Nwcml0ZVR5cGUnXVswXX1cbiAgICAgICAgZWxzZSB7dGhpcy5sb2FkU3ByaXRlID0gdGhpcy50eXBlfTtcbiAgICAgICAgdGhpcy5mb3JtID0gMDsgXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RhbWFnZSddKXt0aGlzLmRhbWFnZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZGFtYWdlJ119XG4gICAgICAgIGVsc2UgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhZ2dybyddKXRoaXMuYWdncm8gPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3dpZHRoMiddKXt0aGlzLndpZHRoMiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2lkdGgyJ119XG4gICAgICAgIGVsc2Uge3RoaXMud2lkdGgyPTB9O1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWlnaHQyJ10pe3RoaXMuaGVpZ2h0MiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnaGVpZ2h0MiddfVxuICAgICAgICBlbHNlIHRoaXMuaGVpZ2h0MiA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddKXt0aGlzLnlPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXX1cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneE9mZiddKXt0aGlzLnhPZmYgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3hPZmYnXX1cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYm9zcyddKXt0aGlzLmJvc3MgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnktPTcwOyB0aGlzLmhlaWdodCs9MTAwfTsgXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3JvYW0nXSl7XG4gICAgICAgICAgICB0aGlzLnJvYW0gPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMucm9hbVRpbWUgPSA1MDtcbiAgICAgICAgICAgIHRoaXMucm9hbVkgPSB0aGlzLmxhbmUqZ2FtZS5yb3dIZWlnaHQ7IFxuICAgICAgICAgICAgdGhpcy5yb2FtTGltaXRzID0gWzAsIGdhbWUucm93SGVpZ2h0LCBnYW1lLnJvd0hlaWdodCoyXTsgLy8wLDEsMlxuICAgICAgICAgICAgLy90aGlzLmRlc3RpbmF0aW9uID0gMDtcbiAgICAgICAgIH1cbiAgICAgICAgZWxzZSB7dGhpcy5yb2FtID0gZmFsc2V9OyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMueE9mZjIgPSAwOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tUaW1lID0gMCA7ICBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tUaHJlc2ggPSBNYXRoLmZsb29yKHRoaXMubWF4SGVhbHRoIC8gMyk7XG4gICAgICAgIHRoaXMua25vY2tiYWNrU3VtID0gMDsgIFxuICAgICAgICB0aGlzLmtub2NrYmFja1Jlc2lzdCA9IDAuM1xuICAgICAgICB0aGlzLmhpdCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IFxuICAgICAgICB0aGlzLmVtb3RlQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbW90ZVRpbWVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbW90ZVRpbWVPdXQgPSBbXTtcbiAgICAgICAgdGhpcy5wb3Npb25HcmFwaGljID0gW107IFxuICAgICAgICB0aGlzLmhpdEJ5ID0gW107IFxuICAgICAgICB0aGlzLmRhbWFnZU11bHRpID0gMTsgXG4gICAgICAgIHRoaXMubG9vdE11bHRpID0gMTtcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tNdWx0aSA9IDE7XG4gICAgICAgIHRoaXMuc3BlZWRNdWx0aSA9IDE7IFxuICAgICAgICB0aGlzLnBpZXJjZSA9IDE7IFxuXG4gICAgICAgIHRoaXMucHJvamVjdGlsZUFtb3VudCA9IDA7IFxuICAgICAgICB0aGlzLmNoaWxsQW1vdW50ID0gMDsgXG4gICAgICAgIHRoaXMucG9pc29uTG9hZGVkID0gZmFsc2U7IC8vbG9hZCBzcHJpdGUgXG4gICAgICAgIHRoaXMucG9pc29uVGltZSA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvbkFtb3VudCA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvblRpY2sgPSAwO1xuICAgICAgICB0aGlzLmNoaWxsID0gMDtcbiAgICAgICAgdGhpcy5hcmVhID0gMDsgXG4gICAgICAgIHRoaXMuY29sdW1uID0gMDsgXG4gICAgICAgIHRoaXMuZXhwbG9kZURhbWFnZURlYWx0ID0gMCBcbiAgICAgICAgdGhpcy5wb2lzb24gPSAwOyBcbiAgICAgICAgdGhpcy5wb2lzb25TdGFjayA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvbk1heCA9IDA7IFxuXG4gICAgICAgIHRoaXMuYXR0YWNrZWQgPSBmYWxzZSA7XG4gICAgICAgIHRoaXMuYXR0YWNrU3RhcnQgPSAwO1xuICAgICAgICB0aGlzLmRlbGF5QXR0YWNrID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZmxpcCddKXt0aGlzLmZsaXAgPSB0cnVlIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2VpcmQnXSl7XG4gICAgICAgICAgICB0aGlzLndlaXJkID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLndlaXJkU3RhcnQgPSBnYW1lLmdhbWVUaW1lUmVhbDsgXG4gICAgICAgICAgICB0aGlzLndlaXJkVGltZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozMDAwKSsyMDAwO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVzdD09MSl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAyNjA7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMzk1OyAvL2JvdHRvbVxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMDtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRlc3Q9PTIpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gMjYwOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IDMwNTsgLy9taWRkbGVcbiAgICAgICAgICAgIHRoaXMubGFuZSA9IDE7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXN0PT0zKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDI2MDsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAyMTU7IC8vdG9wIFxuICAgICAgICAgICAgdGhpcy5sYW5lID0gMjsgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGVzdD09NCl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAzNDA7IFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMzA1OyAvLyBtaWRkbGUgIzJcbiAgICAgICAgICAgIHRoaXMubGFuZSA9IDE7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlID09ICdyZWREcmFnb24nKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4zfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuYXJlYSArPSA2MDsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4zfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuYXJlYSArPTQwOyB0aGlzLnByb2plY3RpbGVBbW91bnQrK307XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnYmx1ZURyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLnBpZXJjZSArPSAxO31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLmNoaWxsICs9IDAuMjsgdGhpcy5waWVyY2UgKz0gMX1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmNoaWxsICs9IDAuMTsgdGhpcy5wcm9qZWN0aWxlQW1vdW50Kyt9O1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy50eXBlID09ICdncmVlbkRyYWdvbicpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrO31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLnBvaXNvbiArPSAwLjQ7IHRoaXMuYXJlYSArPSAyMDsgdGhpcy5wb2lzb25NYXgrPTEwO31cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00ICl7dGhpcy5wb2lzb24gKz0gMC40OyB0aGlzLmFyZWEgKz0gMTA7IHRoaXMucG9pc29uTWF4Kz01OyB0aGlzLnByb2plY3RpbGVBbW91bnQrK31cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnYmxhY2tEcmFnb24nKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw+PTMpe3RoaXMuYXJlYSArPTE1OyB0aGlzLmNvbHVtbj0xO3RoaXMuZGFtYWdlTXVsdGkrPTAuMn1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPj00KXt0aGlzLmFyZWEgKz0xNTsgdGhpcy5wcm9qZWN0aWxlQW1vdW50Kyt9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmxldmVsPj0zKXt0aGlzLmV2b2x2ZSgpfSBcblxuICAgIH1cblxuXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpeyAvL2ltcG9ydCBzcHJpdGVzIFxuICAgICAgICB0aGlzLmZyYW1lcyA9IDMwOyBcbiAgICAgICAgaWYgKHRoaXMuc3ByaXRlPT0nbW9iJyl7IC8vIEVuZW15IG1vYnNcbiAgICAgICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL3N0YW5kXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzdGFuZCddLCAxMCwgXCJzdGFuZFwiKTsgLy9zdGFuZGluZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMud2FsayA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvbW92ZV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnd2FsayddLCAxMCwgXCJ3YWxrXCIpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmhpdCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy5sb2FkU3ByaXRlKycvaGl0MV8/LnBuZycsMCwgMTAsIFwiaGl0XCIpO1xuICAgICAgICAgICAgdGhpcy5kaWUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL2RpZTFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RpZSddLCAxNSwgXCJkaWVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy53YWxrLCB0aGlzLmhpdCwgdGhpcy5kaWVdOyBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J10pe1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ncnkgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSsnL2F0dGFjazFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J10sIDEwLCBcImF0dGFja1wiLCB0cnVlKVxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKHRoaXMuYW5ncnkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSAgICAgICAgICAgXG4gICAgICAgIGVsc2UgeyBcbiAgICAgICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSArJy9zdGFuZDFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3N0YW5kJ11bdGhpcy5mb3JtXSwgMTAsIFwic3RhbmRcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmFuZ3J5ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLmxvYWRTcHJpdGUgKycvYW5ncnlfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J11bdGhpcy5mb3JtXSwgMTAsIFwiYXR0YWNrXCIsIHRydWUpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy5hbmdyeV07IFxuICAgICAgICAgICAgbGV0IGVtb3RlcyA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZW1vdGUnXVt0aGlzLmZvcm1dO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8ZW1vdGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZW1vdGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMubG9hZFNwcml0ZSArJy8nK2Vtb3Rlc1tpXVswXSsnXz8ucG5nJywgZW1vdGVzW2ldWzFdLCAxMCwgXCJlbW90ZVwiKygxK2kpICk7IC8vZW1vdGU7IFxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKGVtb3RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtb3RlTGVuZ3RoLnB1c2goZW1vdGVzW2ldWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5hbmltYXRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBldm9sdmUoKXtcbiAgICAgICAgdGhpcy5mb3JtKys7IFxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Nwcml0ZVR5cGUnXVt0aGlzLmZvcm1dOyBcbiAgICAgICAgdGhpcy5lbW90ZUxlbmd0aCA9IFtdOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IC8vIHVwZGF0ZSBzcHJpdGVzIFxuXG4gICAgfVxuICAgIGxldmVsVXAocGxheWVyKXsgXG4gICAgICAgIGxldCBjb3N0ID0gcGxheWVyLnVwZ3JhZGVDb3N0W3RoaXMubGV2ZWwtMV07XG4gICAgICAgIGlmIChwbGF5ZXIubW9uZXk+PWNvc3Qpe1xuICAgICAgICAgICAgdGhpcy5sZXZlbCsrOyAgXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gJ0x2bC4gJyArIHRoaXMubGV2ZWw7IFxuICAgICAgICAgICAgdGhpcy52YWx1ZSArPSBjb3N0OyBcbiAgICAgICAgICAgIHBsYXllci5tb25leSAtPSBjb3N0OyBcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmV2b2x2ZSgpfSBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3JlZERyYWdvbicpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzsgdGhpcy5kYW1hZ2VNdWx0aSs9MC4yNX1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPT0zKXt0aGlzLmFyZWEgKz0gNjA7IHRoaXMuZGFtYWdlTXVsdGkrPTAuMjV9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5hcmVhICs9IDMwOyB0aGlzLnByb2plY3RpbGVBbW91bnQgKyt9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnYmx1ZURyYWdvbicpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsPT0yKXt0aGlzLnByb2plY3RpbGVBbW91bnQrKzt9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD09Myl7dGhpcy5jaGlsbCArPSAwLjI7IHRoaXMucGllcmNlICs9IDF9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD49NCl7dGhpcy5jaGlsbCArPSAwLjE7IHRoaXMucHJvamVjdGlsZUFtb3VudCArK307XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnZ3JlZW5EcmFnb24nKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD09Mil7dGhpcy5wcm9qZWN0aWxlQW1vdW50Kys7fVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw9PTMpe3RoaXMucG9pc29uICs9IDAuNjsgdGhpcy5wb2lzb25NYXgrPTY7dGhpcy5waWVyY2UgKz0gMX1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsPj00ICl7dGhpcy5wb2lzb24gKz0gMC42OyB0aGlzLnBvaXNvbk1heCs9MzsgdGhpcy5wcm9qZWN0aWxlQW1vdW50ICsrfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2JsYWNrRHJhZ29uJyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWw9PTIpe3RoaXMucHJvamVjdGlsZUFtb3VudCsrOyB0aGlzLmRhbWFnZU11bHRpKz0wLjJ9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbD09Myl7dGhpcy5hcmVhICs9MjA7IHRoaXMuY29sdW1uPTE7dGhpcy5kYW1hZ2VNdWx0aSs9MC4yfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGV2ZWw+PTQpe3RoaXMuYXJlYSArPTIwOyB0aGlzLnByb2plY3RpbGVBbW91bnQgKyt9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0YXQgdXBkYXRlcyAuZGFtYWdlTXVsdGlcbiAgICB9XG5cbiAgICBlbW90ZShnYW1lKXtcbiAgICAgICAgbGV0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMCk7XG4gICAgICAgIGlmICh0aGlzLmVtb3RlQ2hhbmdlKXtcbiAgICAgICAgICAgIGlmICghZ2FtZS5wbGF5ZXIuYWxpdmUpe1xuICAgICAgICAgICAgICAgIC8vdGhpcy5zdGF0ZSA9ICdlbW90ZTUnO1xuICAgICAgICAgICAgICAgIGlmKHJhbmRvbT41KXt0aGlzLnN0YXRlID0gJ2Vtb3RlNSc7fSAvLyBjcnlcbiAgICAgICAgICAgICAgICBlbHNlIHt0aGlzLnN0YXRlID0gJ2Vtb3RlMic7fSAvLyBiZXdpbGRlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZ2FtZS53YXZlRmluaXNoICl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJhbmRvbT41KXt0aGlzLnN0YXRlID0gJ2Vtb3RlMyc7fSAvLyBzaXRcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7dGhpcy5zdGF0ZSA9ICdlbW90ZTQnO30gLy8gc2xlZXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbW90ZUNoYW5nZSA9IGZhbHNlOyBcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLmVtb3RlQ2hhbmdlICYmICF0aGlzLmVtb3RlVGltZXIpeyBcbiAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lciA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge3RoaXMuZW1vdGVDaGFuZ2UgPSB0cnVlfSwgXCI1MDAwXCIpIDt9XG5cbiAgICB9XG5cbiAgICBhdHRhY2soKXsgLy90cmlnZ2VycyBhdHRhY2sgc3RhdGUgXG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEIDw9IDAgJiYgdGhpcy5oZWFsdGg+MCl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2F0dGFjayc7IFxuICAgICAgICB9ICAgICAgICAgIFxuICAgIH1cblxuICAgIHN1bW1vbkF0dGFjaygpeyAvL3N1bW1vbiBhdHRhY2tzIFxuICAgICAgICBpZiAoICF0aGlzLmF0dGFja2VkKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuZ3J5LmdldEZyYW1lKCk9PTIpe1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCggbmV3IFByb2plY3RpbGUodGhpcywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydwcm9qJ11bdGhpcy5mb3JtXSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnktNTApKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlQW1vdW50PjApeyAvL2V4dHJhIHByb2plY3RpbGVzIFxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTE7IGk8PXRoaXMucHJvamVjdGlsZUFtb3VudDsgaSsrKXsgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoICgpPT4ge3RoaXMucHJvamVjdGlsZXMucHVzaCggbmV3IFByb2plY3RpbGUodGhpcywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydwcm9qJ11bdGhpcy5mb3JtXSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnktNTApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEyMCppKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrQ0QgPSB0aGlzLmF0dGFja1NwZWVkO1xuICAgICAgICAgICAgICAgLy8gdGhpcy5hbmdyeS5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lID0gMTAwK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1MDApOyAvL3Jlc2V0IHJhbmRvbSBlbW90ZSB0aW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb2JBdHRhY2soZ2FtZSl7XG4gICAgICAgIGlmICghdGhpcy5hdHRhY2tlZCAmJiBnYW1lLnBsYXllci5hbGl2ZSAmJiB0aGlzLmhlYWx0aD4wKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvYWRTcHJpdGU9PSdzdHVtcHknKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpID09IDkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2goIG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54LTQwLCB0aGlzLnBvc2l0aW9uLnkrMzApKTsgICAgXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrQ0QgPSB0aGlzLmF0dGFja1NwZWVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubG9hZFNwcml0ZT09J2dob3N0U3R1bXAnKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmdyeS5nZXRGcmFtZSgpID09IDQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2goIG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54LTQwLCB0aGlzLnBvc2l0aW9uLnktMjcpKTsgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkU3ByaXRlPT0nbXVzaG1vbScpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZ3J5LmdldEZyYW1lKCkgPT0gNyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hbmdyeS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWdhbWUucGxheWVyLmp1bXAgJiYgZ2FtZS5wbGF5ZXIubGFuZSA9PSB0aGlzLmxhbmUgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUucGxheWVyLmhlYWx0aCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5rbm9ja2JhY2soZ2FtZS5wbGF5ZXIsIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgcGF1c2UpIHtcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSlcbiAgICAgICAgLy9pZiAodGhpcy5oaXRib3gpeyBjdHguZmlsbFJlY3QodGhpcy5oaXRib3hbMF0sdGhpcy5oaXRib3hbMV0sIHRoaXMuaGl0Ym94WzJdLCB0aGlzLmhpdGJveFszXSk7fVxuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpOyBcbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LXRoaXMucmFuZ2UsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCsyKnRoaXMucmFuZ2UsIHRoaXMuaGVpZ2h0KTsgLy9yYW5nZVxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDAgJiYgdGhpcy5mb3JtPT0xICYmIHRoaXMuc3RhdGU9PSdhdHRhY2snKXt0aGlzLnhPZmYyID0gLTUxfSAvL2F0dGFjayBvZmZzZXRcbiAgICAgICAgZWxzZSB0aGlzLnhPZmYyPTA7XG5cbiAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpe1xuICAgICAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAwKXt0aGlzLnN0YXRlID0gJ3N0YW5kJzsgfSBcbiAgICAgICAgICAgIGVsc2UgdGhpcy5zdGF0ZT0nd2Fsayc7fVxuXG4gICAgICAgIGlmICh0aGlzLmhlYWx0aDw9MCAmJiB0aGlzLnNpZGUgPT0xKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGllJzsgIC8vZGVhdGggYW5pbWF0aW9uICAgXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFkZT4wKSB0aGlzLmZhZGUgLT0gMC4wMzsgLy9mYWRlIG9uIGRlYXRoIFxuICAgICAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuZmFkZTsgXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHt0aGlzLmZhZGUgPSAwfSwgXCI0NTBcIikgO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RpbGVzLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHt0aGlzLmFsaXZlID0gZmFsc2V9LCBcIjQ1MFwiKSA7fSBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0gIFxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDEgJiYgdGhpcy5zdGF0ZSAhPSdkaWUnKXsgLy9oZWFsdGggYmFyXG4gICAgICAgICAgICBpZiAoIXRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYm9zcyddKVxuICAgICAgICAgICAgICAgIHtjdHguZmlsbFN0eWxlID0gXCIjMmIyYjJiXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KzcwLCA2MCwgMTIpOyAvL2VtcHR5IGJveFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM5OTBjMDJcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54KzEsIHRoaXMucG9zaXRpb24ueSs3MSwgTWF0aC5mbG9vcig1OCooMS0odGhpcy5tYXhIZWFsdGggLSB0aGlzLmhlYWx0aCkvdGhpcy5tYXhIZWFsdGgpKSwgMTApOyAvLyBsaWZlIGJhclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy9ib3NzIGhlYWx0aCBiYXJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMmIyYjJiXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueC01LCB0aGlzLnBvc2l0aW9uLnkrMTMxLCA2NSwgMTYpOyAvL2VtcHR5IGJveFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM5OTBjMDJcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LTQsIHRoaXMucG9zaXRpb24ueSsxMzIsIE1hdGguZmxvb3IoNjMqKDEtKHRoaXMubWF4SGVhbHRoIC0gdGhpcy5oZWFsdGgpL3RoaXMubWF4SGVhbHRoKSksIDE0KTsgLy9lbXB0eSBib3hcbiBcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnNpZGUgPT0gMCl7IC8vIHN1bW1vbiBuYW1lIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNzsgXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMucG9zaXRpb24ueCsxNSwgdGhpcy5wb3NpdGlvbi55K3RoaXMuaGVpZ2h0KzE3LCAzNSwgMTUsIDIpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDEuMDsgXG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gXCIxMXB4IGFyaWFsXCJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnOyBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5sYWJlbCwgdGhpcy5wb3NpdGlvbi54KzMyLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy5oZWlnaHQrMjcpIDsgICAgICAgICAgXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbWFnZSA9IGFuaW1hdGlvbi5nZXRJbWFnZShwYXVzZSk7ICAgICAgIFxuICAgICAgICAvL2ltYWdlID0gYnVmZmVyOyBcblxuICAgICAgICBpZiAoIXRoaXMubGVmdCl7Ly9mbGlwIGJhc2VkIG9uIHNwcml0ZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgLXRoaXMucG9zaXRpb24ueC10aGlzLndpZHRoK3RoaXMueE9mZit0aGlzLnhPZmYyLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy55T2ZmICk7fVxuICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngrdGhpcy54T2ZmK3RoaXMueE9mZjIsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYpOyB9XG4gICAgXG4gICAgICAgIGlmICh0aGlzLmNoaWxsQW1vdW50PjApe1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IC8vIEltYWdlIHRpbnRpbmdcbiAgICAgICAgICAgIGJ1ZmZlci53aWR0aCA9IDIwMDsvL2ltYWdlLndpZHRoO1xuICAgICAgICAgICAgYnVmZmVyLmhlaWdodCA9IDQwMDsvL2ltYWdlLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGJ0eCA9IGJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgYnR4LmRyYXdJbWFnZShpbWFnZSwgMCwwKTtcbiAgICAgICAgICAgIGJ0eC5maWxsU3R5bGUgPSBcIiMyYzY4ZGNcIjtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbXVsdGlwbHknO1xuICAgICAgICAgICAgYnR4LmZpbGxSZWN0KDAsMCxidWZmZXIud2lkdGgsIGJ1ZmZlci5oZWlnaHQpO1xuICAgICAgICAgICAgYnR4Lmdsb2JhbEFscGhhID0gMC44O1xuICAgICAgICAgICAgYnR4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24taW5cIjtcbiAgICAgICAgICAgIGJ0eC5kcmF3SW1hZ2UoaW1hZ2UsMCwwKTsgXG5cbiAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0KXtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlciwgLXRoaXMucG9zaXRpb24ueC10aGlzLndpZHRoK3RoaXMueE9mZiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZil9XG4gICAgICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGJ1ZmZlciwgdGhpcy5wb3NpdGlvbi54K3RoaXMueE9mZiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZil9XG4gICAgICAgIH1cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7IFxuXG4gICAgICAgIGlmICh0aGlzLnBvaXNvbkFtb3VudD4wICYmIHRoaXMuaGVhbHRoPjApe1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBvaXNvbkxvYWRlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2lzb25HcmFwaGljID0gbmV3IFNwcml0ZUFuaW1hdGlvbigncG9pc29uRWZmZWN0L3BvaXNvbj8ucG5nJywgNCwgMTAsIFwicG9pc29uXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9pc29uTG9hZGVkID0gdHJ1ZTsgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb2lzb25TcHJpdGVJbWFnZSA9IHRoaXMucG9pc29uR3JhcGhpYy5nZXRJbWFnZShwYXVzZSk7IFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ib3NzKSB7Y3R4LmRyYXdJbWFnZShwb2lzb25TcHJpdGVJbWFnZSx0aGlzLnBvc2l0aW9uLngtMTAsdGhpcy5wb3NpdGlvbi55LXRoaXMuaGVpZ2h0Kzc1KX1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBjdHguZHJhd0ltYWdlKHBvaXNvblNwcml0ZUltYWdlLHRoaXMucG9zaXRpb24ueC0xMCx0aGlzLnBvc2l0aW9uLnktdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ICAgXG4gICAgXG4gICAgZHJhd1Byb2ooY3R4LCBwYXVzZSl7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgsIHBhdXNlKSApIC8vZHJhdyBwcm9qZWN0aWxlcyBcbiAgICAgICAgfSAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgdXBkYXRlKGdhbWUpe1xuICAgICAgICBpZiAodGhpcy5zaWRlID09PSAxKXsgIC8vIE1vYiBcbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWx0aD4wKXsgICAgIFxuICAgICAgICAgICAgICAgIGxldCBjaGlsbERpcmVjdCA9IDE7ICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFg8MCkoY2hpbGxEaXJlY3Q9IC0xKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KmNoaWxsRGlyZWN0Pj0wLjQpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPSdhdHRhY2snKSB0aGlzLnN0YXRlID0gJ3dhbGsnOyAvL2NhbmNlbHMgYXR0YWNrIFxuICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYXR0YWNrQ0Q+MCkgdGhpcy5zdGF0ZSA9PSAnaGl0JzsgXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnN0YXRlID0gJ3dhbGsnO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMucG9zaXRpb24ueDwtdGhpcy53aWR0aCoyKSB7dGhpcy5wb3NpdGlvbi54ID0gLXRoaXMud2lkdGgqMn07IC8vbGVmdCBib3JkZXJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGgpIHt0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoO30gLy9yaWdodCBib3JkZXJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53ZWlyZCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbC10aGlzLndlaXJkU3RhcnQ+IHRoaXMud2VpcmRUaW1lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2VpcmRTdGFydCA9IGdhbWUuZ2FtZVRpbWVSZWFsOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2VpcmRUaW1lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjIwMDApKzUwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRYICA9IC10aGlzLnNwZWVkWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWD4wKSB7dGhpcy53ZWlyZFRpbWUrPTcwMH07IC8vYmlhcyBtb3ZpbmcgZm9yd2FyZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWDwwICYmIHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aCkgdGhpcy5zcGVlZFggPSBhYnModGhpcy5zcGVlZFgpOyBcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gICAgIHRoaXMucm9hbSA9IHRydWU7IFxuICAgICAgICAgICAgLy8gICAgIHRoaXMucm9hbVRpbWUgPSA1MDAwO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucm9hbVkgPSB0aGlzLmxhbmUqZ2FtZS5yb3dIZWlnaHQ7IFxuICAgICAgICAgICAgLy8gICAgIHRoaXMucm9hbUxpbWl0cyA9IFswLCBnYW1lLnJvd0hlaWdodCwgZ2FtZS5yb3dIZWlnaHQqMl07IC8vMCwxLDJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmRlc3RpbmF0aW9uID0gMDtcbiAgICAgICAgICAgIC8vICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtVGltZS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtVGltZSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7IC8vcmFuZG9tIDAsMSwyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1UaW1lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjI1MCkrMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcGVlZFkgPSAzOy8vXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWC10aGlzLmNoaWxsQW1vdW50KmNoaWxsRGlyZWN0PD0xKSB7c3BlZWRZPTF9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3BlZWRYLXRoaXMuY2hpbGxBbW91bnQqY2hpbGxEaXJlY3Q8PTIpIHtzcGVlZFk9Mn07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvYW1ZPiB0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55Kz1zcGVlZFkgO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2FtWS09c3BlZWRZIDtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvYW1ZPHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnktPXNwZWVkWSA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1ZKz1zcGVlZFk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2FtWSsyPiB0aGlzLnJvYW1MaW1pdHNbdGhpcy5kZXN0aW5hdGlvbl0gJiYgdGhpcy5yb2FtWS0yPHRoaXMucm9hbUxpbWl0c1t0aGlzLmRlc3RpbmF0aW9uXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gKHRoaXMucm9hbVktdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvYW1ZID0gdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9hbVkgPT0gdGhpcy5yb2FtTGltaXRzW3RoaXMuZGVzdGluYXRpb25dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZSA9IHRoaXMucm9hbUxpbWl0cy5pbmRleE9mKHRoaXMucm9hbVkpfTsgLy91cGRhdGUgbGFuZSBkdXJpbmcgbW92ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9pc29uVGltZT4wKXsgLy8vUE9JU09OXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbC10aGlzLnBvaXNvblRpY2s+PTEwMDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSB0aGlzLnBvaXNvbkFtb3VudDtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5wb2lzb25EYW1hZ2UgKz0gdGhpcy5wb2lzb25BbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pc29uVGltZSAtPSAxOyAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pc29uVGljayA9IGdhbWUuZ2FtZVRpbWVSZWFsOyAvL3VwZGF0ZSB0aWNrIHRpbWUgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5wb2lzb25UaW1lID09IDApe3RoaXMucG9pc29uQW1vdW50ID0gMDsgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaXNvblN0YWNrID0gMDsgfS8vZHJvcCBwb2lzb24gc3RhY2tzXG5cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxsQW1vdW50PjApe3RoaXMuY2hpbGxBbW91bnQtPTAuMDA1fSAvL0NISUxMIFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2hpbGxBbW91bnQ8MCl7dGhpcy5jaGlsbEFtb3VudD0wfTtcblxuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbC10aGlzLmtub2NrYmFja1RpbWUgPjEwMDApe3RoaXMua25vY2tiYWNrRm9yY2U9MH0gLy9tYXggMnNcblxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmtub2NrYmFja0ZvcmNlKT4wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnaGl0J1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtub2NrYmFja1Jlc2lzdCs9MC4wMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMua25vY2tiYWNrRm9yY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZS09dGhpcy5rbm9ja2JhY2tSZXNpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoKzUwKXt0aGlzLnBvc2l0aW9uLng9dGhpcy5nYW1lV2lkdGgrNTB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZTwwKSB0aGlzLmtub2NrYmFja0ZvcmNlID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSAvL2JhY2t3YXJkc1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSs9dGhpcy5rbm9ja2JhY2tSZXNpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZT4wKSB0aGlzLmtub2NrYmFja0ZvcmNlID0gMFxuICAgICAgICAgICAgICAgICAgICB9OyAvL2ZvcndhcmRzIFxuXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPSdhdHRhY2snKXt0aGlzLnBvc2l0aW9uLnggLT0gKHRoaXMuc3BlZWRYLXRoaXMuY2hpbGxBbW91bnQqY2hpbGxEaXJlY3QpfVxuICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gdGhpcy5zcGVlZFk7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWT4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZFktPTAuNTsgXG4gICAgICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanVtcCl7IC8vZ3Jhdml0eVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gMSp0aGlzLmdyYXZpdHlUaW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHlUaW1lKz0wLjU7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5wb3NpdGlvbi55ID4gdGhpcy5nYW1lSGVpZ2h0LTExMCApeyAvL2JvdHRvbSBib3JkZXIgKHVwZGF0ZSBmb3IgcGxhdGZvcm1zKVxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLmdhbWVIZWlnaHQtMTEwO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuanVtcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTsgXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnO1xuICAgICAgICAgICAgICAgIC8vIH0gXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGU9PSdzdGFuZCcpeyAgIC8vZW1vdGVzIGZvciBzdW1tb25zXG4gICAgICAgICAgICBpZiAodGhpcy5lbW90ZVRpbWUgPT0gMCApe1xuICAgICAgICAgICAgICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApOyAvLzE6IHNsZWVwLCAyOiBpZ25vcmVcbiAgICAgICAgICAgICAgICBsZXQgdGltZSA9IDA7IFxuICAgICAgICAgICAgICAgIGlmIChyYW5kb20gPDUpe3RoaXMuc3RhdGUgPSAnZW1vdGUxJzsgdGltZSA9IHRoaXMuZW1vdGVMZW5ndGhbMF07fVxuICAgICAgICAgICAgICAgIGVsc2Uge3RoaXMuc3RhdGUgPSAnZW1vdGU2Jzt0aW1lID0gdGhpcy5lbW90ZUxlbmd0aFs1XSB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVUaW1lT3V0ID0gc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbW90ZVRpbWUgPSA2MDArTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjUwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnfSwgdGltZSkgOy8vaG93IGxvbmcgdG8gcnVuIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIC8vIGlmIChnYW1lLnBhdXNlKXtjbGVhclRpbWVvdXQodGhpcy5lbW90ZVRpbWVPdXQpfTsgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHRoaXMuZW1vdGVUaW1lLS07IFxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IHRoaXMucHJvamVjdGlsZXMuZmlsdGVyKCAgLy9kZWxldGVzIHByb2plY3RpbGVzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LmRlbGV0ZSAhPT0gdHJ1ZTsgXG4gICAgICAgIH0pO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdGlsZXMpOyBcbiAgICAgXG5cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0QgPjApe3RoaXMuYXR0YWNrQ0QtLX1cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0Q9PTApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dGFja2VkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdyeS5yZXNldCgpOyBcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCt0aGlzLndpZHRoMi8yLCB0aGlzLnBvc2l0aW9uLnkrdGhpcy5oZWlnaHQyLCBcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoLXRoaXMud2lkdGgyLCB0aGlzLmhlaWdodF07IFxuICAgICAgICBcblxuXG5cblxuICAgIH1cblxufSIsImltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uZXl7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgb2JqLCB2YWx1ZSwgc3BlZWRYID0gMCl7XG4gICAgICAgIHRoaXMueU9mZiA9IDAgO1xuICAgICAgICBpZiAob2JqLmJvc3MpeyB0aGlzLnlPZmYgKz03MH1cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgIC8vcG9zaXRpb24gXG4gICAgICAgICAgICB4OiAob2JqLnBvc2l0aW9uLngpK29iai53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IG9iai5wb3NpdGlvbi55KzQwK3RoaXMueU9mZn1cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueD5nYW1lLmdhbWVXaWR0aC0xMCl7dGhpcy5wb3NpdGlvbi54ID0gZ2FtZS5nYW1lV2lkdGgtMzA7fSAvL2tpbGxpbmcgb2ZmLXNjcmVlbiAocmlnaHQpXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucG9zaXRpb24ueDwxMCl7dGhpcy5wb3NpdGlvbi54PTMwfTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDM1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDM1OyBcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlOyBcbiAgICAgICAgdGhpcy5zcGF3blRpbWUgPSAgZ2FtZS5nYW1lVGltZVJlYWw7IFxuICAgICAgICB0aGlzLnBvcFVwID0gMjU7IFxuICAgICAgICB0aGlzLmRyb3BEb3duID0gMjM7XG4gICAgICAgIHRoaXMuc3BlZWRYID0gc3BlZWRYOyBcbiAgICAgICAgdGhpcy5zcGVlZFkgPSAxOyBcbiAgICAgICAgdGhpcy5hY2NlbFVwID0gMDtcbiAgICAgICAgdGhpcy5hY2NlbERvd24gPSAwO1xuICAgICAgICB0aGlzLmRlbGV0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZhZGUgPSAxOyBcbiAgICAgICAgdGhpcy5zdGFydEZhZGUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuZmxvYXQgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMubG9zdCA9IGZhbHNlOyBcblxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueS0yNSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcbiAgICAgICAgaWYgKHRoaXMudmFsdWU+PTEwMCl7dGhpcy50eXBlID0gJzQnO30gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWU+PTUwKXt0aGlzLnR5cGUgPSAnMyc7fSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZT49MTApe3RoaXMudHlwZSA9ICcyJzt9IFxuICAgICAgICBlbHNlIHRoaXMudHlwZSA9ICcxJzsgXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyBcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpe1xuICAgICAgICB0aGlzLnN0YW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbignY29pbi9Db2luJyt0aGlzLnR5cGUrJ18/LnBuZycsIDMsIDYsIFwic3RhbmRcIik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnN0YW5kXVxuICAgIH1cblxuICAgIGRyYXcoY3R4LCBwYXVzZSkge1xuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBpZiAodGhpcy5zdGFydEZhZGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZsb2F0KXt0aGlzLmZhZGUgLT0gMC4wMTU7fSAvL3Nsb3dlciBmYWRlIHdoZW4gcGlja3VwXG4gICAgICAgICAgICBlbHNlIHRoaXMuZmFkZSAtPSAwLjAzO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5mYWRlOyBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7dGhpcy5kZWxldGU9IHRydWV9LCBcIjQ1MFwiKSA7XG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKCdzdGFuZCcpKTsgXG4gICAgICAgIGNvbnN0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgXG5cblxuICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUoZ2FtZSl7XG4gICAgICAgIGlmICh0aGlzLnBvcFVwPjApe1xuICAgICAgICAgICAgdGhpcy5hY2NlbFVwKz0wLjE7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gKDQuNS10aGlzLmFjY2VsVXApOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCAtPXRoaXMuc3BlZWRYOyBcbiAgICAgICAgICAgIHRoaXMucG9wVXAgLT0gMTsgXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcm9wRG93bj4wKXtcbiAgICAgICAgICAgIHRoaXMuYWNjZWxEb3duKz0wLjE7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gKDIrdGhpcy5hY2NlbERvd24pO1xuICAgICAgICAgICAgdGhpcy5kcm9wRG93biAtPSAxOyBcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCAtPXRoaXMuc3BlZWRYOyBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mbG9hdCl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnktPTE7IFxuICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLnBvc2l0aW9uLngrZ2FtZS5wbGF5ZXIud2lkdGg8dGhpcy5wb3NpdGlvbi54KXt0aGlzLnBvc2l0aW9uLngtPTAuOCAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZ2FtZS5wbGF5ZXIucG9zaXRpb24ueD50aGlzLnBvc2l0aW9uLngpIHRoaXMucG9zaXRpb24ueCs9MC44O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdhbWUuZ2FtZVRpbWVSZWFsLXRoaXMuc3Bhd25UaW1lPj0yMDAwMCl7IC8vMTggcyBcbiAgICAgICAgICAgIHRoaXMuc3RhcnRGYWRlPXRydWU7XG4gICAgICAgICAgICB0aGlzLmxvc3QgPSB0cnVlOyBcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG4gICAgfVxuXG4gICAgXG59XG4iLCJpbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnOyBcbmltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gNDA7IC8vc3ByaXRlIHNpemUgXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gODA7IFxuICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgIHg6IHRoaXMud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtIDIqZ2FtZS5yb3dIZWlnaHQsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbGF5ZXJYID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yICsxODsgXG4gICAgICAgIHRoaXMuZWxlUG9zaXRpb25zID0gWyBbdGhpcy5wbGF5ZXJYIC02MCwgdGhpcy5wb3NpdGlvbi55XSwgW3RoaXMucGxheWVyWCAtNDAsIHRoaXMucG9zaXRpb24ueS00MF0sXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICwgdGhpcy5wb3NpdGlvbi55LTU1XSwgW3RoaXMucGxheWVyWCArNDAsIHRoaXMucG9zaXRpb24ueS00MF0sIFxuICAgICAgICAgICAgW3RoaXMucGxheWVyWCArNjAsIHRoaXMucG9zaXRpb24ueV0gXTtcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBnYW1lLnJvd0hlaWdodDtcbiAgICAgICAgdGhpcy5sYW5lID0gMTsgXG4gICAgICAgIHRoaXMuZmxvb3IgPSAgdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAoMSt0aGlzLmxhbmUpKnRoaXMucm93SGVpZ2h0XG4gICAgICAgIHRoaXMuc3BlZWQgPSAzLjU7XG4gICAgICAgIHRoaXMua25vY2tiYWNrRm9yY2UgPSAwOyBcbiAgICAgICAgdGhpcy5sZWZ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2lkZSA9MDtcbiAgICAgICAgdGhpcy5zcGVlZFggPSAwO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7IFxuICAgICAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgICAgIHRoaXMubmFtZSA9ICdXaXonO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDUwOyBcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxOyBcbiAgICAgICAgdGhpcy5kYW1hZ2VEZWFsdCA9IDA7IFxuICAgICAgICB0aGlzLmludnVsblRpbWUgPSAgMDsgXG4gICAgICAgIHRoaXMuaW52dWxuRGFyayA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5pbnZ1bG5EYXJrVGltZSA9IDA7XG4gICAgICAgIHRoaXMua25vY2tiYWNrVGhyZXNoID0gMTsgXG4gICAgICAgIHRoaXMua25vY2tiYWNrU3VtID0gMFxuICAgICAgICB0aGlzLmFybW9yID0gMDsgXG4gICAgICAgIHRoaXMudG91Y2hIaXQgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuYXR0YWNrU3BlZWQgPSAzNTsgXG4gICAgICAgIHRoaXMuYXR0YWNrQ0QgPSAwOyBcbiAgICAgICAgdGhpcy5hbGl2ZSA9IHRydWU7IFxuICAgICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJzsgXG4gICAgICAgIHRoaXMuY3VyVGlsZSA9IDA7XG4gICAgICAgIHRoaXMuZWxlbWVudExpc3Q9IFtdOyAvL2FkZCBzcHJpdGVzIGhlcmUgXG4gICAgICAgIC8vIHRoaXMuZWxlbWVudExpc3QgPSBbJ0JsYXplJywnRGF3bicsJ05pZ2h0JywnVGh1bmRlcicsJ1dpbmQnXTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlcyA9IHt9O1xuICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGUgPSB7fSA7IFxuICAgICAgICB0aGlzLmVsZW1lbnRJbmZvID0geyAnQmxhemUnOiB7J3N0YW5kJzo3LCAnbW92ZSc6IDcsICdhdHRhY2snOiA4LCAncHJvaic6J3JlZEJhbGwnIH0sXG4gICAgICAgICAgICAnRGF3bic6IHsnc3RhbmQnOiAxNSwgJ21vdmUnOjE1LCAnYXR0YWNrJzogOCwgJ3Byb2onOid5ZWxsb3dCYWxsJ30sXG4gICAgICAgICAgICAnTmlnaHQnOiB7J3N0YW5kJzo3LCAnbW92ZSc6NywgJ2F0dGFjayc6IDgsICdwcm9qJzoncHVycGxlQmFsbCd9LFxuICAgICAgICAgICAgJ1RodW5kZXInOiB7J3N0YW5kJzogNywgJ21vdmUnOjcsICdhdHRhY2snOiA4LCAncHJvaic6J2dyZWVuQmFsbCcsfSwgXG4gICAgICAgICAgICAnV2luZCc6IHsnc3RhbmQnOiA3LCAnbW92ZSc6NywgJ2F0dGFjayc6IDgsICdwcm9qJzonYmx1ZUJhbGwnLH0gfVxuICAgICAgICB0aGlzLmVsZW1lbnRTdGF0ZSA9IFsnc3RhbmQnLCdzdGFuZCcsJ3N0YW5kJywnc3RhbmQnLCdzdGFuZCddOyBcbiAgICAgICAgdGhpcy5yZWNhbGxMaXN0ID0gWydyZWREcmFnb24wJywgJ3JlZERyYWdvbjEnLCAnYmx1ZURyYWdvbjAnLCAnYmx1ZURyYWdvbjEnLCBcbiAgICAgICAgJ2dyZWVuRHJhZ29uMCcsJ2dyZWVuRHJhZ29uMScsJ2JsYWNrRHJhZ29uMCcsICdibGFja0RyYWdvbjEnXSA7XG4gICAgICAgIHRoaXMucmVjYWxsSW1hZ2VzID17fTtcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IFxuICAgICAgICB0aGlzLmVsZW1lbnRhbHMoKTtcblxuICAgICAgICB0aGlzLnN1bW1vbkNvdW50ID0gMDsgXG4gICAgICAgIHRoaXMubW9uZXkgPSA1MDsgIC8vNTBcbiAgICAgICAgaWYgKGdhbWUubGV2ZWwgPT0gMikge3RoaXMubW9uZXkgPSAxMjAwfSAvL3N0YXJ0aW5nIG1vbmV5IGJhc2VkIG9uIGxldmVsO1xuICAgICAgICBlbHNlIGlmIChnYW1lLmxldmVsID09IDMpIHt0aGlzLm1vbmV5ID0gNTAwMH1cbiAgICAgICAgdGhpcy5zdW1tb25Db3N0ID0gWzUwLCAxMDAsIDE1MCwgMjAwLCA2NDBdO1xuICAgICAgICB0aGlzLnVwZ3JhZGVDb3N0ID0gWzIwMCwgNDAwLCA4MDAsIDE2MDAsIDMyMDBdOyBcbiAgICAgICAgdGhpcy5lbGVtZW50Q29zdCA9IFs1MCwgMTAwLCAyMDAsIDQwMCwgODAwXTsgXG5cbiAgICAgICAgdGhpcy5kYW1hZ2VUYWtlbiA9IDA7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5mbG9hdCA9IDIwO1xuICAgICAgICB0aGlzLmZsb2F0RGlyZWN0ID0gMTsgXG4gICAgICAgIHRoaXMuZ3JhdmVTcGF3biA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdyYXZlWCA9IDAgO1xuICAgICAgICB0aGlzLmdyYXZlWSA9IC0yMDsgXG4gICAgICAgIHRoaXMuZ3JhdmVTdGF0ZSA9ICdtb3ZlJ1xuICAgICAgICAvL3VwZ3JhZGVzXG4gICAgICAgIHRoaXMuZGFtYWdlTXVsdGkgPSAxOyBcbiAgICAgICAgdGhpcy5sb290TXVsdGkgPSAxO1xuICAgICAgICB0aGlzLmtub2NrYmFja011bHRpID0gMTtcbiAgICAgICAgdGhpcy5zcGVlZE11bHRpID0gMTsgXG4gICAgICAgIHRoaXMucGllcmNlID0gMDsgXG5cbiAgICAgICAgdGhpcy5jaGlsbCA9IDA7XG4gICAgICAgIHRoaXMuYXJlYSA9IDA7IFxuICAgICAgICB0aGlzLnBvaXNvbiA9IDI7IFxuICAgICAgICB0aGlzLmV4cGxvZGVEYW1hZ2VEZWFsdCA9IDAgXG5cblxuXG4gICAgfVxuICAgIGVsZW1lbnRhbHMoKXsgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuZWxlbWVudExpc3QubGVuZ3RoOyBpKyspeyAvLyBMb2FkIGVsZW1lbnRhbCBzcHJpdGVzIFxuICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRTcHJpdGVzW3RoaXMuZWxlbWVudExpc3RbaV1dKXtcbiAgICAgICAgICAgICAgICBsZXQgZWxlVHlwZSA9IHRoaXMuZWxlbWVudExpc3RbaV07IFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhbmRFbGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKGVsZVR5cGUrXCIvc3RhbmRfPy5wbmdcIiwgdGhpcy5lbGVtZW50SW5mb1tlbGVUeXBlXVsnc3RhbmQnXSwgNiwgXCJzdGFuZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVFbGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKGVsZVR5cGUrXCIvbW92ZV8/LnBuZ1wiLCB0aGlzLmVsZW1lbnRJbmZvW2VsZVR5cGVdWydtb3ZlJ10sIDYsIFwid2Fsa1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0VsZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oZWxlVHlwZStcIi9hdHRhY2sxXz8ucG5nXCIsIHRoaXMuZWxlbWVudEluZm9bZWxlVHlwZV1bJ2F0dGFjayddLCA2LCBcInN3aW5nMVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGVzW2VsZVR5cGVdID0gW3RoaXMuc3RhbmRFbGUsIHRoaXMubW92ZUVsZSwgdGhpcy5hdHRhY2tFbGVdOyBcbiAgICAgICAgICAgICAgICAvL3snc3RhbmQnOiB0aGlzLnN0YW5kRWxlLCAnbW92ZSc6IHRoaXMubW92ZUVsZSwgJ2F0dGFjayc6IHRoaXMuYXR0YWNrRWxlfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpe1xuICAgICAgICB0aGlzLmZyYW1lcyA9IDE1OyBcbiAgICAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvYWxlcnRfPy5wbmdcIiwgMywgdGhpcy5mcmFtZXMsIFwic3RhbmRcIik7IC8vY29tYmF0IHNwcml0ZXM7IFxuICAgICAgICB0aGlzLndhbGsgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3dhbGsxXz8ucG5nXCIsIDMsIDEwLCBcIndhbGtcIik7IC8vd2Fsa2luZyBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy5qdW1wID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9qdW1wXz8ucG5nXCIsIDEsIDEwLCBcImp1bXBcIik7IC8vanVtcCBzcHJpdGVzO1xuICAgICAgICB0aGlzLnJlbGF4ID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9zdGFuZDFfPy5wbmdcIiwgMywgMzAsIFwicmVsYXhcIik7IC8vIGlkbGUgcG9zZSBcbiAgICAgICAgdGhpcy5jYXN0ID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9hbGVydF8/LnBuZ1wiLCAzLCAxMCwgXCJzdGFuZFwiKTsgXG4gICAgICAgIHRoaXMuc3dpbmcxID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9zd2luZ08xXz8ucG5nXCIsIDMsIDEyLCBcInN3aW5nMVwiLCB0cnVlKTsgLy9hdHRhY2sgc3ByaXRlcztcbiAgICAgICAgdGhpcy5zd2luZzIgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3N3aW5nTzJfPy5wbmdcIiwgMywgMTIsIFwic3dpbmcyXCIsIHRydWUpOyBcbiAgICAgICAgdGhpcy5zd2luZzMgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3N3aW5nTzNfPy5wbmdcIiwgMywgMTIsIFwic3dpbmczXCIsIHRydWUpOyBcbiAgICAgICAgdGhpcy5kZWFkID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9kZWFkXz8ucG5nXCIsIDMsIDIwMCwgXCJkZWFkXCIpOyBcbiAgICAgICAgdGhpcy5hdHRhY2tBbmltID0gWydzd2luZzEnLCAnc3dpbmcyJywgJ3N3aW5nMyddOyBcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMuc3RhbmQsIHRoaXMud2FsaywgdGhpcy5qdW1wLCB0aGlzLnN3aW5nMSwgdGhpcy5zd2luZzIsIHRoaXMuc3dpbmczLCB0aGlzLmNhc3QsIHRoaXMuZGVhZCwgdGhpcy5yZWxheCBdOyBcbiAgICAgICAgdGhpcy5ncmF2ZU1vdmUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwiZ3JhdmUvbW92ZV8/LnBuZ1wiLCAwLCAzMDAsIFwibW92ZVwiKTsgXG4gICAgICAgIHRoaXMuZ3JhdmVMYW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcImdyYXZlL3N0YW5kXz8ucG5nXCIsIDUsIDEyLCBcImxhbmRcIiwgdHJ1ZSApOyBcbiAgICAgICAgdGhpcy5ncmF2ZUFuaW1hdGlvbnMgPSBbdGhpcy5ncmF2ZU1vdmUsIHRoaXMuZ3JhdmVMYW5kXTtcblxuICAgICAgICAvLyB0aGlzLnJlY2FsbEltYWdlcyA9IFsncmVkRHJhZ29uMCcsICdyZWREcmFnb24xJywgJ2JsdWVEcmFnb24wJywgJ2JsdWVEcmFnb24xJywgXG4gICAgICAgIC8vICdncmVlbkRyYWdvbjAnLCdncmVlbkRyYWdvbjEnLCdibGFja0RyYWdvbjAnLCAnYmxhY2tEcmFnb24xJ10gO1xuICAgICAgICBmb3IgKGxldCBpID0wO2k8dGhpcy5yZWNhbGxMaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgbGV0IGltYWdlICA9IG5ldyBJbWFnZSgpOyBcbiAgICAgICAgICAgIGltYWdlLnNyYyA9ICdpbWFnZXMvcmVjYWxsLycrdGhpcy5yZWNhbGxMaXN0W2ldKycucG5nJzsgXG4gICAgICAgICAgICB0aGlzLnJlY2FsbEltYWdlc1t0aGlzLnJlY2FsbExpc3RbaV1dID0gaW1hZ2U7IFxuICAgICAgICB9XG4gICAgICAgIFxuXG5cbiAgICB9XG4gICAgZW1vdGUoZ2FtZSl7XG4gICAgICAgIGlmIChnYW1lLndhdmVGaW5pc2gpe1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0nc3RhbmQnKXt0aGlzLnN0YXRlID0gJ3JlbGF4Jzt9IFxuICAgIH19IFxuXG4gICAgYXR0YWNrKHBhdXNlKXtcbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0QgPD0gMCAmJiB0aGlzLmFsaXZlICYmICFwYXVzZSApe1xuICAgICAgICAgICAgbGV0IHggPSB0aGlzLnBvc2l0aW9uLngtMjU7IFxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdCl7eCArPTUwO31cbiAgICAgICAgICAgIHRoaXMucHJvaiA9IG5ldyBQcm9qZWN0aWxlKHRoaXMsICdsaWdodG5pbmdiYWxsJyx4LCB0aGlzLnBvc2l0aW9uLnkpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmF0dGFja0FuaW0uc2hpZnQoKTsgXG4gICAgICAgICAgICB0aGlzLmF0dGFja0FuaW0ucHVzaCh0aGlzLnN0YXRlKTsgXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuc3RhdGUpKS5yZXNldCgpOyBcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrQ0QgPSB0aGlzLmF0dGFja1NwZWVkO1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKHRoaXMucHJvaik7XG4gICAgICAgICAgICAvL3NldFRpbWVvdXQoKCk9PiB7dGhpcy5wcm9qZWN0aWxlcy5wdXNoKHRoaXMucHJvail9LCBcIjIwMFwiKTsgLy9zbGlnaHQgZGVsYXkgZm9yIGFuaW1hdGlvblxuXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5lbGVtZW50TGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IHggPSB0aGlzLmVsZVBvc2l0aW9uc1tpXVswXTsvL2ZhY2luZyBsZWZ0XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVmdCl7eCArPTIwfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ogPSBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLmVsZW1lbnRJbmZvW3RoaXMuZWxlbWVudExpc3RbaV1dWydwcm9qJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB4LCB0aGlzLmVsZVBvc2l0aW9uc1tpXVsxXSsxOCApO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCh0aGlzLnByb2opO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjYWxsSWNvbihjdHgsIGdhbWUpe1xuICAgICAgICBpZiAoZ2FtZS5yZWNhbGxTdG9yYWdlKXtcbiAgICAgICAgICAgIGxldCBpbWFnZVR5cGUgPSBnYW1lLnJlY2FsbFN0b3JhZ2UudHlwZSArIGdhbWUucmVjYWxsU3RvcmFnZS5mb3JtO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnJlY2FsbEltYWdlc1tpbWFnZVR5cGVdLCB0aGlzLnBvc2l0aW9uLngrMjIsIHRoaXMucG9zaXRpb24ueS01KTsgXG5cbiAgICAgICAgICAvLyAgdGhpcy5yZWNhbGxJbWFnZXNbZ2FtZS5yZWNhbGxTdG9yYWdlLnR5cGVdXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBzdW1tb25BdHRhY2soKXt9OyBcbiAgICBkcmF3KGN0eCwgcGF1c2Upe1xuICAgICAgICBsZXQgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSlcbiAgICAgICAgbGV0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgICAvL2dldCBzcHJpdGVcblxuICAgICAgICAvLyBpZiAodGhpcy5pbnZ1bG5UaW1lJTQ+PTEgJiYgdGhpcy5pbnZ1bG5UaW1lPjAgJiYgdGhpcy5hbGl2ZSkge2N0eC5nbG9iYWxBbHBoYSA9IDAuMn07XG4gICAgICAgIC8vaWYgKHRoaXMuaGl0Ym94KXsgY3R4LmZpbGxSZWN0KHRoaXMuaGl0Ym94WzBdLHRoaXMuaGl0Ym94WzFdLCB0aGlzLmhpdGJveFsyXSwgdGhpcy5oaXRib3hbM10pO31cbiAgICAgICAgLy9jdHguZmlsbFJlY3QodGhpcy5jdXJUaWxlKjgwLCB0aGlzLnBvc2l0aW9uLnksIDgwLCA4MCk7IC8vc2VsZWN0ZWQgdGlsZVxuICAgICAgICAvLyBjdHguZmlsbFJlY3QodGhpcy5oaXRib3hbMF0tKDc1KigtMSt0aGlzLmxvb3RNdWx0aSkpLCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIDgwKTsgLy9sb290IHJhbmdlXG4gICAgICAgIC8vIGN0eC5maWxsUmVjdCh0aGlzLmhpdGJveFswXSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoKzc1KigtMSt0aGlzLmxvb3RNdWx0aSksIDgwKTsgLy9sb290IHJhbmdlXG5cbiAgICAgICAgaWYgKHRoaXMubGVmdCl7XG4gICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAtdGhpcy5wb3NpdGlvbi54LTEuNSp0aGlzLndpZHRoLTE1LCB0aGlzLnBvc2l0aW9uLnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueC01LCB0aGlzLnBvc2l0aW9uLnkpOyB9XG4gICAgICAgIFxuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTtcblxuICAgICAgICBpZiAodGhpcy5pbnZ1bG5EYXJrICYmIHRoaXMuYWxpdmUpe1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IC8vIEltYWdlIHRpbnRpbmdcbiAgICAgICAgICAgIGJ1ZmZlci53aWR0aCA9IDIwMDsvL2ltYWdlLndpZHRoO1xuICAgICAgICAgICAgYnVmZmVyLmhlaWdodCA9IDIwMDsvL2ltYWdlLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGJ0eCA9IGJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgYnR4LmRyYXdJbWFnZShpbWFnZSwgMCwwKTtcbiAgICAgICAgICAgIGJ0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgICAgIGJ0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbXVsdGlwbHknO1xuICAgICAgICAgICAgYnR4LmZpbGxSZWN0KDAsMCxidWZmZXIud2lkdGgsIGJ1ZmZlci5oZWlnaHQpO1xuICAgICAgICAgICAgYnR4Lmdsb2JhbEFscGhhID0gMC42O1xuICAgICAgICAgICAgYnR4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24taW5cIjtcbiAgICAgICAgICAgIGJ0eC5kcmF3SW1hZ2UoaW1hZ2UsMCwwKTsgXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe1xuICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlciwgLXRoaXMucG9zaXRpb24ueC0xLjUqdGhpcy53aWR0aC0xMCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoYnVmZmVyLCB0aGlzLnBvc2l0aW9uLngtNSwgdGhpcy5wb3NpdGlvbi55KTsgfVxuICAgICAgICB9XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgICAgXG4gICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXsgLy9yZXNldHMgXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJzt9IFxuXG4gICAgICAgIC8vZWxlbWVudGFscyBcbiAgICAgICAgdGhpcy5wbGF5ZXJYID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yICsxODsgXG4gICAgICAgIHRoaXMuZWxlUG9zaXRpb25zID0gWyBbdGhpcy5wbGF5ZXJYIC02MCwgdGhpcy5wb3NpdGlvbi55KzVdLCBbdGhpcy5wbGF5ZXJYIC00MCwgdGhpcy5wb3NpdGlvbi55LTM1XSxcbiAgICAgICAgICAgIFt0aGlzLnBsYXllclggLCB0aGlzLnBvc2l0aW9uLnktNTVdLCBbdGhpcy5wbGF5ZXJYICs0MCwgdGhpcy5wb3NpdGlvbi55LTM1XSwgW3RoaXMucGxheWVyWCArNjAsIHRoaXMucG9zaXRpb24ueSs1XSBdO1xuICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuZWxlbWVudExpc3QubGVuZ3RoOyBpKyspeyAvLyBMb2FkIGVsZW1lbnRhbCBzcHJpdGVzIFxuICAgICAgICAgICAgICAgIGxldCBlbGVUeXBlID0gdGhpcy5lbGVtZW50TGlzdFtpXTsgXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0pe1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5lbGVtZW50U3RhdGVbaV0gPSAnc3RhbmQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnRTdGF0ZVtpXSA9ICdzdGFuZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSAnc3dpbmcyJyB8fHRoaXMuc3RhdGUgPT0gJ3N3aW5nMycpe3RoaXMuZWxlbWVudFN0YXRlW2ldPSdzd2luZzEnfVxuICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmVsZW1lbnRTcHJpdGVzW2VsZVR5cGVdLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLmVsZW1lbnRTdGF0ZVtpXSkpIC8vIGNvcGllcyBwbGF5ZXIgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXsgLy9yZXNldHMgQXR0YWNrIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3RhdGVbaV09ICdzdGFuZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGVzW2VsZVR5cGVdWzJdLnJlc2V0KCkgLy9yZXNldCBcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubGVmdCl7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0sIC10aGlzLmVsZVBvc2l0aW9uc1tpXVswXS10aGlzLndpZHRoLTQ1LCB0aGlzLmVsZVBvc2l0aW9uc1tpXVsxXSk7IFxuICAgICAgICAgICAgICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTt9XG4gICAgICAgICAgICAgICAgZWxzZSAoY3R4LmRyYXdJbWFnZSh0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0sIHRoaXMuZWxlUG9zaXRpb25zW2ldWzBdLTIwLCB0aGlzLmVsZVBvc2l0aW9uc1tpXVsxXSkpOyBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGUgPSB7fSAvL2NsZWFyIGxvYWRlZCBzcHJpdGVzXG5cbiAgICAgICAgaWYgKHRoaXMuZ3JhdmVTcGF3bikgeyBcbiAgICAgICAgICAgIGlmICh0aGlzLmdyYXZlWSA+PSB0aGlzLmZsb29yKzM1KXt0aGlzLmdyYXZlU3RhdGUgPSdsYW5kJ31cbiAgICAgICAgICAgIGVsc2Uge3RoaXMuZ3JhdmVZICs9IDh9OyBcblxuICAgICAgICAgICAgbGV0IGdyYXZlQW5pbWF0aW9uID0gdGhpcy5ncmF2ZUFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuZ3JhdmVTdGF0ZSkpXG4gICAgICAgICAgICBsZXQgZ3JhdmVJbWFnZSA9IGdyYXZlQW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZ3JhdmVJbWFnZSwgdGhpcy5ncmF2ZVgsIHRoaXMuZ3JhdmVZKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd1Byb2ooY3R4LCBwYXVzZSl7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCwgcGF1c2UpICkgLy9kcmF3IHByb2plY3RpbGVzIFxuICAgIH1cblxuICAgIHRlbGVwb3J0KGRpcmVjdGlvbil7XG4gICAgICAgIGlmICh0aGlzLmxhbmUgLSAxKmRpcmVjdGlvbj4tMSAmJiB0aGlzLmxhbmUgLSAxKmRpcmVjdGlvbjwzICYmIHRoaXMuYWxpdmUpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMucm93SGVpZ2h0KmRpcmVjdGlvbjsyXG4gICAgICAgICAgICB0aGlzLmxhbmUgKz0gLTEqZGlyZWN0aW9uOyBcbiAgICAgICAgICAgIHRoaXMuZmxvb3IgPSAgdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAoMSt0aGlzLmxhbmUpKnRoaXMucm93SGVpZ2h0fVxuICAgIH1cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgaWYgKHRoaXMuaW52dWxuVGltZT4wKXtcbiAgICAgICAgICAgIHRoaXMuaW52dWxuVGltZS0tXG4gICAgICAgICAgICBpZiAodGhpcy5pbnZ1bG5UaW1lPjApe1xuICAgICAgICAgICAgICAgIHRoaXMuaW52dWxuRGFya1RpbWUgKytcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmludnVsbkRhcmtUaW1lPjUpIHt0aGlzLmludnVsbkRhcmsgPSBmYWxzZTsgdGhpcy5pbnZ1bG5EYXJrVGltZSA9IC0zfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaW52dWxuRGFya1RpbWU+MCl7dGhpcy5pbnZ1bG5EYXJrID10cnVlfTtcbiAgICAgICAgICAgIH0gZWxzZSB7dGhpcy5pbnZ1bG5EYXJrID0gZmFsc2V9O1xuICAgICAgICBcbiAgICAgICAgfTsgXG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEID4wKXt0aGlzLmF0dGFja0NELT0gKDEqdGhpcy5zcGVlZE11bHRpKX07XG4gICAgICAgIGlmICh0aGlzLmhlYWx0aDw9MCl7dGhpcy5zdGF0ZSA9ICdkZWFkJzsgXG4gICAgICAgICAgICAgICAgdGhpcy5hbGl2ZT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmF2ZVNwYXduID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhdmVYID0gdGhpcy5wb3NpdGlvbi54KzIwOyBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSgpICk7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gdGhpcy5wcm9qZWN0aWxlcy5maWx0ZXIoICAvL2RlbGV0ZXMgcHJvamVjdGlsZXNcbiAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QuZGVsZXRlICE9PSB0cnVlOyBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5hbGl2ZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5zcGVlZFghPTAgJiYgIXRoaXMuYXR0YWNrQW5pbS5pbmNsdWRlcyh0aGlzLnN0YXRlKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICd3YWxrJzsgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT0gJ3dhbGsnKSB0aGlzLnN0YXRlID0gJ3N0YW5kJzsgXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng8LTMwKSB7dGhpcy5wb3NpdGlvbi54ID0gLTMwfTsgLy9sZWZ0IGJvcmRlclxuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoKSB7dGhpcy5wb3NpdGlvbi54ID0gdGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aDt9IC8vcmlnaHQgYm9yZGVyXG4gICAgICAgICAgICB0aGlzLmN1clRpbGUgPSBNYXRoLmZsb29yKCAodGhpcy53aWR0aC8yICt0aGlzLnBvc2l0aW9uLngpLzgwKTtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmtub2NrYmFja0ZvcmNlKT4wKSB7c2V0VGltZW91dCgoKT0+e3RoaXMua25vY2tiYWNrRm9yY2U9MH0sIDEwMDApfTsgIC8vRFIgXG4gICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZT4wKXt0aGlzLmtub2NrYmFja0ZvcmNlLT0wLjU7fVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZTwwKXt0aGlzLmtub2NrYmFja0ZvcmNlKz0wLjU7fVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9ICh0aGlzLnNwZWVkWCp0aGlzLnNwZWVkTXVsdGkpO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMua25vY2tiYWNrRm9yY2U7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gdGhpcy5zcGVlZFk7IFxuXG4gICAgICAgIH0gZWxzZSB7ICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvYXQ+MCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPTAuMSp0aGlzLmZsb2F0RGlyZWN0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsb2F0IC0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7dGhpcy5mbG9hdCA9IDIwOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxvYXREaXJlY3QgPSAtdGhpcy5mbG9hdERpcmVjdH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi55ID4gdGhpcy5mbG9vcil7IC8vYm90dG9tIGJvcmRlciAodXBkYXRlIGZvciBwbGF0Zm9ybXMpXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLmZsb29yO1xuICAgICAgICAgICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgICAgICAgICAgdGhpcy5qdW1wID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTsgXG4gICAgICAgICAgICBpZiAodGhpcy5hbGl2ZSAmJiAhdGhpcy5hdHRhY2tBbmltLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB0aGlzLnN0YXRlID0gJ3N0YW5kJztcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKHRoaXMuc3BlZWRZPjApe1xuICAgICAgICAgICAgdGhpcy5zcGVlZFktPTAuNTsgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuanVtcCl7IC8vZ3Jhdml0eVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IDEqdGhpcy5ncmF2aXR5VGltZTtcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUrPTAuNTsgXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXR0YWNrQW5pbS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkgdGhpcy5zdGF0ZSA9ICdqdW1wJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngrMTUsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuXG4gICAgICAgIC8vdGhpcy5wb3NpdGlvbi54Kz0gNSAvIGRlbHRhVGltZTsgXG4gICAgfVxufSIsImltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdGlsZXtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIHR5cGU9J2VuZXJneWJhbGwnLHggPSAwLCB5PTAsIGRpcmVjdGlvbiA9IDEgKXtcbiAgICAgICAgdGhpcy50eXBlSW5mbyA9IHsgJ2VuZXJneWJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDkwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd5ZWxsb3dCYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NSwgJ3hPZmYnOiA1MCwneU9mZic6MzV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3B1cnBsZUJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDUwLCd5T2ZmJzozNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAncmVkQmFsbCc6IHsnc3BlZWQnOiAxMCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjUsICd4T2ZmJzogNTAsJ3lPZmYnOjM1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdncmVlbkJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDUwLCd5T2ZmJzozNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnYmx1ZUJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo1LCAneE9mZic6IDUwLCd5T2ZmJzozNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmlyZWJhbGwnOiB7J3NwZWVkJzogMywgJ3RyYXZlbCc6MSwgJ2V4cGxvZGUnOjIsICd4T2ZmJzogNzAsICd5T2ZmJzotMTAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAnYmF0YmFsbCc6IHsnc3BlZWQnOiA2LCAndHJhdmVsJzozLCAnZXhwbG9kZSc6NCwgJ3hPZmYnOiAxMDV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpcmViYWxsMic6IHsnc3BlZWQnOiAxMiwgJ3RyYXZlbCc6MSwgJ2V4cGxvZGUnOjMsICd4T2ZmJzogOTUsICd5T2ZmJzotMTAgfSwgIC8vLTE1LCArMjBcbiAgICAgICAgICAgICAgICAgICAgICAgICdwb2lzb25iYWxsJzogeydzcGVlZCc6IDcsICd0cmF2ZWwnOjEsICdleHBsb2RlJzo1LCAneE9mZic6ODUsICAneU9mZic6LTUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpY2ViYWxsJzogeydzcGVlZCc6IDgsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo0LCAneE9mZic6OTUsICAneU9mZic6LTUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdsaWdodG5pbmdiYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NywgJ3hPZmYnOjgwfSwgLy9wbGF5ZXIgYmFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RodW5kZXJiYWxsJzogeydzcGVlZCc6IDEyLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NywgJ3hPZmYnOjgwLCd5T2ZmJzotMTAgfSB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IHBsYXllci5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IHBsYXllci5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gMjA7IC8vc3ByaXRlIHNpemUgXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMjA7IFxuICAgICAgICB0aGlzLmV4cGxvZGUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuZGVsZXRlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRvdWNoSGl0PSB0cnVlO1xuICAgICAgICB0aGlzLnBpZXJjZSA9IHBsYXllci5waWVyY2U7XG4gICAgICAgIHRoaXMub3duZXIgPSBwbGF5ZXI7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gcGxheWVyLmRhbWFnZSAqIHBsYXllci5kYW1hZ2VNdWx0aTsgXG4gICAgICAgIHRoaXMuaGVhbHRoID0xOyBcbiAgICAgICAgdGhpcy5zaWRlID0gMDsgXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7IFxuICAgICAgICB0aGlzLmhpdExpc3QgPSBbXTsgXG4gICAgICAgIHRoaXMubGFuZSA9IHBsYXllci5sYW5lO1xuICAgICAgICB0aGlzLnN0YXRlID0gJ3RyYXZlbCc7IFxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjsgXG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuY2hpbGwgPSBwbGF5ZXIuY2hpbGw7XG4gICAgICAgIHRoaXMuYXJlYSA9IHBsYXllci5hcmVhOyBcbiAgICAgICAgdGhpcy5wb2lzb24gPSBwbGF5ZXIucG9pc29uOyBcbiAgICAgICAgdGhpcy5wb2lzb25NYXggPSBwbGF5ZXIucG9pc29uTWF4O1xuXG4gICAgICAgIHRoaXMueE9mZiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneE9mZiddO1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pe3RoaXMueU9mZiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddfVxuICAgICAgICBlbHNlIHRoaXMueU9mZiA9MDtcblxuICAgICAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5sZWZ0ID0gcGxheWVyLmxlZnQ7IC8vIHNob290IGxlZnRcbiAgICAgICAgaWYgKHggPT0gMCAmJiB5ID09IDApe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgIC8vcG9zaXRpb24gXG4gICAgICAgICAgICAgICAgeDogcGxheWVyLnBvc2l0aW9uLngsIFxuICAgICAgICAgICAgICAgIHk6IHBsYXllci5wb3NpdGlvbi55KzQ1XG4gICAgICAgICAgICB9fVxuICAgICAgICBlbHNlIHsgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiB4KzM1LFxuICAgICAgICAgICAgICAgIHk6IHkrNjV9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNwZWVkID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcGVlZCddO1xuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuXG4gICAgfVxuXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpe1xuICAgICAgICB0aGlzLmZyYW1lcyA9IDY7IFxuICAgICAgICB0aGlzLnRyYXZlbCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvdHJhdmVsXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd0cmF2ZWwnXSwgdGhpcy5mcmFtZXMsIFwidHJhdmVsXCIpOyAvL3N0YW5kaW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLmJ1cnN0ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy9leHBsb2RlXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydleHBsb2RlJ10sIHRoaXMuZnJhbWVzLCBcImJ1cnN0XCIsIHRydWUpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnRyYXZlbCwgdGhpcy5idXJzdF07IFxuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3RodW5kZXJiYWxsJyl7XG4gICAgICAgICAgICB0aGlzLmJvbHQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKCd0aHVuZGVyYm9sdC9leHBsb2RlXz8ucG5nJywgNSwgdGhpcy5mcmFtZXMsIFwiZXhwbG9kZVwiLCB0cnVlKTsgLy8gICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4LCBwYXVzZSkge1xuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpOyAvLyBoaXRib3hcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBcIk5vbmVcIil7IFxuICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSlcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKHBhdXNlKTsgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5leHBsb2RlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2J1cnN0J1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PSd0aHVuZGVyYmFsbCcpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgYm9sdEltYWdlID0gdGhpcy5ib2x0LmdldEltYWdlKHBhdXNlKTsgXG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYm9sdEltYWdlLCB0aGlzLnBvc2l0aW9uLngsIDI0MClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7dGhpcy5kZWxldGUgPSB0cnVlO31cbiAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGU9PSdpY2ViYWxsJyAmIHRoaXMuc3RhdGU9PSdidXJzdCcpe3RoaXMueE9mZj0xMDB9O1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxlZnQpey8vZmxpcCBiYXNlZCBvbiBzcHJpdGUgb3JpZW50YXRpb25cbiAgICAgICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgLXRoaXMucG9zaXRpb24ueC0gdGhpcy54T2ZmKzE1LCB0aGlzLnBvc2l0aW9uLnktNjArdGhpcy55T2ZmKTt9XG4gICAgICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngtdGhpcy54T2ZmKzM1LCB0aGlzLnBvc2l0aW9uLnktNjArdGhpcy55T2ZmKTsgfVxuXG4gICAgICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnNwcml0ZSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkrMjUpOyAvL2RyYXcgbW9iICh4LCB5LCBoZWlnaHQsIHdpZHRoKVxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwbG9kZSl7dGhpcy5kZWxldGUgPSB0cnVlfTsgXG4gICAgICAgIH1cblxuICAgIH0gXG5cblxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBpZiAoIXRoaXMuZXhwbG9kZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5sZWZ0KXt0aGlzLnBvc2l0aW9uLnggLT0gdGhpcy5zcGVlZDt9IC8vIGRpcmVjdGlvblxuICAgICAgICAgICAgZWxzZSB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PC10aGlzLndpZHRoLTEwMCkge3RoaXMuZGVsZXRlID0gdHJ1ZSB9O1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGgpIHt0aGlzLmRlbGV0ZSA9IHRydWV9O1xuXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KzUsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cblxuXG5cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyByZXN0YXJ0U2NyZWVue1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDE3MDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDsgXG4gICAgICAgIHRoaXMueCA9IChnYW1lLmdhbWVXaWR0aC10aGlzLndpZHRoKS8yOyBcbiAgICAgICAgdGhpcy55ID0gMzsvLyh0aGlzLmhlaWdodClcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMjU7IFxuICAgICAgICB0aGlzLmZvbnQgPSBcIjE2cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MiA9IFwiMjRweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZSA7IFxuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1JldHVybiB0byBNYWluJztcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMuZ2FtZVdpZHRoLzI7XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSAyNTA7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gNTA7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLngrKHRoaXMud2lkdGgtdGhpcy5idXR0b25XaWR0aCkvMiwgdGhpcy5oZWlnaHQtdGhpcy5idXR0b25IZWlnaHQtdGhpcy5wYWRkaW5nXV0gXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24xXVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbGl6ZShnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpOyAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcmVkcmF3KGN0eCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN0YXJ0RnVuY3Rpb25zKGdhbWUpe1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICAgICAgZ2FtZS5mYWRlT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7Z2FtZS50aXRsZURpc3BsYXkgPSB0cnVlfSwgXCIyMDAwXCIpIC8vIGZhZGUgb3V0IHRyYW5zaXRpb25cbiAgICAgICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIGhhbmRsZUNsaWNrKGUsIGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAvLyB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRGdW5jdGlvbnMoZ2FtZSwgaSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4KXsgICBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnc3RlZWxibHVlJzsgLy9kcmF3IGJvcmRlclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL3NldHMgYXJlYSBmb3IgY29sbGlzaW9uIChpc1BvaW50SW5QYXRoKVxuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQsIDIpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyAvL2RyYXcgdGV4dCBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGUxLnRleHRDb250ZW50LCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSt0aGlzLmJ1dHRvbkhlaWdodC8yKTsgXG5cblxuXG4gICAgICAgIH1cblxuICAgICBcbiAgICAgICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAvLyBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAvLyBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgIC8vIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAvLyBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIC8vIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdyhjdHgpO1xuXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyAvL2RlZmVhdCBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ0dhbWUgT3ZlciEnLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLnkgKyAyNSkgLy92aWN0b3J5IG9yIGRlZmVhdFxuICAgICAgICAgICAgfVxuXG5cbiAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBcbiAgICAgICAgXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3RhcnRTY3JlZW57XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTIwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwOyBcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAzOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAxNTsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmZvbnQyID0gXCIyNHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDMgPSBcIjIwcHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMuY29udHJvbHMgPSBbXCJTdG9wIHRoZSBtb25zdGVycyBmcm9tIGFkdmFuY2luZyFcIixcIiAtIFVzZSAoV0FTRCkgdG8gbW92ZSwgKEopIHRvIGp1bXAsIGFuZCAoSykgdG8gc2hvb3QuIFVzZSAoUCkgdG8gb3BlbiBzaG9wLiBcIiwgXG4gICAgICAgICAgICBcIiAtIENvbGxlY3QgdGhlIGNvaW5zIG1vbnN0ZXJzIGRyb3AgYmVmb3JlIHRoZXkgZXhwaXJlXCIsIFxuICAgICAgICAgICAgXCIgLSBTcGVuZCBtZXNvcyBvbiB1cGdyYWRlcyAmIHN1bW1vbnMgdG8gYm9sc3RlciB5b3VyIGRlZmVuc2VcIiwgXG4gICAgICAgICAgICBcIiAtIExvc2UgbGl2ZXMgd2hlbiBtb25zdGVycyBlc2NhcGUgb3IgdG91Y2ggeW91XCIsIFwiIC0gR2FtZSBvdmVyIHdoZW4gYWxsIGxpdmVzIGxvc3QhXCJdO1xuICAgICAgICB0aGlzLmtleWJvYXJkID0gbmV3IEltYWdlKCk7IFxuICAgICAgICB0aGlzLmtleWJvYXJkLnNyYyA9ICdpbWFnZXMvYmcva2V5Ym9hcmQucG5nJztcbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdTdGFydCEnO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy5nYW1lV2lkdGgvMjtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDY1O1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDM1OyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy54K3RoaXMud2lkdGgtIHRoaXMuYnV0dG9uV2lkdGgtdGhpcy5wYWRkaW5nLCB0aGlzLmhlaWdodC10aGlzLmJ1dHRvbkhlaWdodC10aGlzLnBhZGRpbmddXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjFdXG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgLy9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTsgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZHJhdyhjdHgpe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRGdW5jdGlvbnMoZ2FtZSl7XG4gICAgICAgICAgICBnYW1lLm5leHRXYXZlID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgIH1cblxuXG4gICAgICAgIGhhbmRsZUNsaWNrKGUsIGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZ1bmN0aW9ucyhnYW1lLCBpKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4KXsgICBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnc3RlZWxibHVlJzsgLy9kcmF3IGJvcmRlclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLHRoaXMuYnV0dG9uSGVpZ2h0KTsgXG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgLy9kcmF3IHRleHQgXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrdGhpcy5idXR0b25IZWlnaHQvMik7IFxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL3NldHMgYXJlYSBmb3IgY29sbGlzaW9uIChpc1BvaW50SW5QYXRoKVxuICAgICAgICAgICAgY3R4LnJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0KTsgICAgICAgXG4gICAgICAgIH1cblxuICAgICBcbiAgICAgICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5IHx8IGdhbWUud2F2ZUZpbmlzaCB8fCBnYW1lLmxldmVsRmluaXNoKXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCswLjMqdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQrMjAsIDAuNCp0aGlzLndpZHRoLCAyNSwgMik7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1ByZXNzIFtBXSBmb3IgdXBncmFkZXMnLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmhlaWdodCszNSkgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnYW1lLmxldmVsTm90ZSE9Jycpe1xuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVUaW1lUmVhbCAtIGdhbWUubm90ZVRpbWU8NDUwMCl7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCsxNSwgdGhpcy5oZWlnaHQqMC41LCB0aGlzLndpZHRoLTMwLCA1MCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDM7IFxuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGdhbWUubGV2ZWxOb3RlLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmhlaWdodC8yKzMwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgfHwgKGdhbWUucGF1c2UgJiYgIWdhbWUudXBncmFkZS5kaXBsYXkpKXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMik7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdzdGFydCc7IFxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5rZXlib2FyZCwgMTgwLDApO1xuICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGk9MDsgaTx0aGlzLmNvbnRyb2xzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsVGV4dCh0aGlzLmNvbnRyb2xzW2ldLCB0aGlzLngrdGhpcy5wYWRkaW5nLCB0aGlzLnkrdGhpcy5wYWRkaW5nKigxK2kpLCB0aGlzLndpZHRoKTsgXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVkcmF3KGN0eCk7IC8vZHJhdyBzdGFydCBidXR0b25cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgLy8gaWYgKGdhbWUuc3RvcmFnZS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgIC8vICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgIC8vICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAvLyAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIC8vICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgIC8vICAgICBjdHgudGV4dEFsaWduID0gJ3N0YXJ0JzsgXG4gICAgICAgICAgICAvLyAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyO1xuICAgICAgICAgICAgLy8gICAgIGN0eC5maWxsVGV4dCgnUmVzdW1tb24gRHJhZ29ucyBmcm9tIHNob3AhJywgdGhpcy54K3RoaXMucGFkZGluZywgdGhpcy55K3RoaXMucGFkZGluZykgXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgICAgICBcbiAgICBcbiAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBcbiAgICAgICAgXG59IiwiaW1wb3J0IGltZyBmcm9tICcuL2ltZyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0aXRsZVNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxNzA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLmJnQXJ0ID0gaW1nKCdiZy9iZ1RpdGxlLnBuZycpO1xuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDI1OyBcbiAgICAgICAgdGhpcy5mb250VGl0bGUgPSBcIjQ4cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250ID0gXCIxOHB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjI4cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MyA9IFwiMjRweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgdGhpcy50aXRsZUxvZ28gPSBcIk1hcGxlVERcIjsgXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnUGxheSc7XG4gICAgICAgIHRoaXMuYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjIudGV4dENvbnRlbnQgPSAnTGV2ZWwgU2VsZWN0JztcbiAgICAgICAgdGhpcy5idXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMy50ZXh0Q29udGVudCA9ICc8JzsgICBcblxuICAgICAgICB0aGlzLmJ1dHRvbjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b240LnRleHRDb250ZW50ID0gJz4nOyAgXG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25ZID0gMTtcblxuICAgICAgICB0aGlzLmFib3V0VGV4dCA9IFtcIlVub2ZmaWNpYWwgZmFuIGdhbWUgZGV2ZWxvcGVkIGJ5IENocmlzdG9waGVyIExlZSAoc2lyaGNsZWVAZ21haWwuY29tKVwiLFxuICAgICAgICAgICAgICAgICBcIkFsbCBNYXBsZVN0b3J5IGFzc2V0cyB1c2VkIGFyZSBjb3B5cmlnaHRlZCBtYXRlcmlhbHMgJiBpbnRlbGxlY3R1YWwgcHJvcGVydHkgYmVsb25naW5nIHRvIE5FWE9OXCJdO1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gMTc1O1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDM1OyBcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMuZ2FtZVdpZHRoLzItKHRoaXMuYnV0dG9uV2lkdGgvMik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMuYnV0dG9uWDEsIHRoaXMucGFkZGluZyt0aGlzLmJ1dHRvbkhlaWdodCArIDIqdGhpcy5nYW1lSGVpZ2h0LzMtNDVdLCBcbiAgICAgICAgICAgIFt0aGlzLmJ1dHRvblgxLCB0aGlzLnBhZGRpbmcrdGhpcy5idXR0b25IZWlnaHQgKyAyKnRoaXMuZ2FtZUhlaWdodC8zLTI1XV0gXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24yXVxuXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25zID0gWyB0aGlzLmJ1dHRvbjMsIHRoaXMuYnV0dG9uNF07IFxuICAgICAgICB0aGlzLmxldmVsQnV0dG9uV2lkdGggPSA1MDsgXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25IZWlnaHQgPSAzMDsgXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25DZW50ZXIgPSA3MDsgIC8vIG1pZGRsZSBudW1iZXIgXG4gICAgICAgIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLmdhbWVXaWR0aC8yLXRoaXMubGV2ZWxCdXR0b25DZW50ZXIvMi10aGlzLmxldmVsQnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uUG9zaXRpb25zWzFdWzFdKzQwXSwgXG4gICAgICAgIFt0aGlzLmdhbWVXaWR0aC8yK3RoaXMubGV2ZWxCdXR0b25DZW50ZXIvMiwgdGhpcy5idXR0b25Qb3NpdGlvbnNbMV1bMV0rNDBdXTsgXG5cbiAgICAgICAgdGhpcy5mYWRlID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICAvL2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVIb3ZlcihlKSB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH0gLy8gICAgICAgIHRoaXMubGV2ZWxCdXR0b25zID0gWyB0aGlzLmJ1dHRvbjMsIHRoaXMuYnV0dG9uNF07IFxuICAgICAgICAgICAgLy90aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zID0gWyBbMTAsIHRoaXMuYnV0dG9uUG9zaXRpb25zWzFdWzFdKzEwXSwgWzEwLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1sxXVsxXSsyMF1dOyBcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5sZXZlbEJ1dHRvbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmxldmVsQnV0dG9uc1tpXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgfSAgICAgICAgICBcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGhhbmRsZUNsaWNrKGUsIGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uc0xpc3RbaV0udGV4dENvbnRlbnQgPT0gXCJQbGF5XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5mYWRlT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57Z2FtZS50aXRsZURpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnJlc2V0RXZlcnl0aGluZygpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMubGV2ZWxCdXR0b25zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5sZXZlbEJ1dHRvbnNbaV0sIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMubGV2ZWxCdXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbEJ1dHRvbnNbaV0udGV4dENvbnRlbnQgPT0gXCI8XCIpeyAvLyByZWxvYWQgYmcgYXJ0IGFuZCBsZXZlbCBsb2FkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5sZXZlbD4xKXtnYW1lLmxldmVsLS19XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZXZlbEJ1dHRvbnNbaV0udGV4dENvbnRlbnQgPT0gXCI+XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUubGV2ZWw8Z2FtZS5maW5hbExldmVsKXtnYW1lLmxldmVsKyt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgICAgICAgICBcbiAgICAgICAgICAgIFxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGRyYXdCdXR0b24oZTEsIHgsIHksIGN0eCl7ICAgXG4gICAgICAgICAgICBsZXQgYnV0dG9uV2lkdGggPSB0aGlzLmJ1dHRvbldpZHRoO1xuICAgICAgICAgICAgbGV0IGJ1dHRvbkhlaWdodCA9IHRoaXMuYnV0dG9uSGVpZ2h0O1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnO1xuICAgICAgICAgICAgaWYgKGUxLnRleHRDb250ZW50PT0nUGxheScpe1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250Mjt9XG4gICAgICAgICAgICBlbHNlIGlmIChlMS50ZXh0Q29udGVudD09J0xldmVsIFNlbGVjdCcpe1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MztcbiAgICAgICAgICAgICAgICAvL2J1dHRvbkhlaWdodCAtPTExO1xuICAgICAgICAgICAgICAgIHkrPTEwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtjdHguZm9udCA9IHRoaXMuZm9udDM7XG4gICAgICAgICAgICAgICAgYnV0dG9uV2lkdGggPSB0aGlzLmxldmVsQnV0dG9uV2lkdGg7XG4gICAgICAgICAgICAgICAgYnV0dG9uSGVpZ2h0ID0gdGhpcy5sZXZlbEJ1dHRvbkhlaWdodCA7fVxuICAgICAgICAgICAgICAgIC8vZHJhdyB0ZXh0IFxuICAgICAgICBcblxuXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHgseSwgYnV0dG9uV2lkdGgsYnV0dG9uSGVpZ2h0LCAzKSA7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCtidXR0b25XaWR0aC8yLCB5K2J1dHRvbkhlaWdodC8yKTsgXG4gICAgXG4gICAgICAgIH1cblxuICAgICBcbiAgICAgICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJnQXJ0LCAwLDApOyBcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVswXSsgMTArIHRoaXMubGV2ZWxCdXR0b25XaWR0aCx0aGlzLmxldmVsQnV0dG9uUG9zaXRpb25zWzBdWzFdLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsQnV0dG9uV2lkdGgsIHRoaXMubGV2ZWxCdXR0b25IZWlnaHQsIDMpIDtcbiAgICAgICAgICAgICAgICAvLyBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChnYW1lLmxldmVsLCAgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVswXSt0aGlzLmxldmVsQnV0dG9uQ2VudGVyKzE1LCAgdGhpcy5sZXZlbEJ1dHRvblBvc2l0aW9uc1swXVsxXSsxOCk7IFxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4KTsgLy9kcmF3IHN0YXJ0IGJ1dHRvblxuXG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBjdHguc2hhZG93T2Zmc2V0WD0xO1xuICAgICAgICAgICAgICAgIGN0eC5zaGFkb3dPZmZzZXRZPTE7XG4gICAgICAgICAgICAgICAgY3R4LnNoYWRvd0NvbG9yPVwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICBjdHguc2hhZG93Qmx1cj0gNDsgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udFRpdGxlOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnRpdGxlTG9nbywgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5nYW1lSGVpZ2h0LzMpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcblxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDsgLy9hYm91dFxuICAgICAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuZmFkZTsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdVc2UgYXJyb3cgS2V5cyBmb3IgbGV2ZWwnLCB0aGlzLmdhbWVXaWR0aC8yLHRoaXMuZ2FtZUhlaWdodC8yKzU1KTsgXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQcmVzcyBhbnkga2V5IHRvIFN0YXJ0JywgdGhpcy5nYW1lV2lkdGgvMix0aGlzLmdhbWVIZWlnaHQvMis3NSk7IFxuICAgICAgICAgICAgICAgIHRoaXMuZmFkZS09MC4wMTA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFkZTwwLjI1KXt0aGlzLmZhZGUgPSAxfVxuICAgICAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5hYm91dFRleHQubGVuZ3RoOyBpKyspeyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuYWJvdXRUZXh0W2ldLCB0aGlzLmdhbWVXaWR0aC8yLHRoaXMuZ2FtZUhlaWdodC0zNSsxNSppKTsgXG4gICAgICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVRleHQodGhpcy5hYm91dFRleHRbaV0sdGhpcy5nYW1lV2lkdGgvMix0aGlzLmdhbWVIZWlnaHQtMzUrMTUqaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIFxuICAgICAgICAgICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID1cImJsYWNrXCI7IFxuICAgICAgICAgICAgICAgIC8vIGN0eC5saW5lV2lkdGg9NTtcbiAgICAgICAgICAgICAgICAvLyBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnJvdW5kUmVjdCh0aGlzLmJ1dHRvblBvc2l0aW9uc1swXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbMF1bMV0sIHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0LCAzKSA7XG4gICAgICAgICAgICAgICAgLy8gY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGVsc2Uge2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpLmlubmVySFRNTD1cIlwiO31cbiAgICAgICAgICAgIFxuICAgIFxuICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG5cblxuICAgIFxuICAgICAgICBcbn0iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwZ3JhZGV7XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZS5nYW1lV2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWUuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9ICA2NTA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMjMwOyAvLyBnYW1lLmdhbWVIZWlnaHQgLSAzKjkwO1xuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDM7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMTU7IFxuICAgICAgICB0aGlzLnBhZGRpbmdZID0gNDtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDE3MDtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSAzNjtcbiAgICAgICAgdGhpcy5mb250ID0gXCIxM3B4IGFyaWFsXCI7ICAgICAgICAgICAgICBcbiAgICAgICAgdGhpcy5mb250MiA9IFwiMTRweCBhcmlhbFwiOyAgXG5cbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdTdW1tb24gUmVkIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMS52YWx1ZSA9ICdyZWREcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24yLnRleHRDb250ZW50ID0gJ1N1bW1vbiBCbHVlIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMi52YWx1ZSA9ICdibHVlRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMy50ZXh0Q29udGVudCA9ICdTdW1tb24gR3JlZW4gRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24zLnZhbHVlID0gJ2dyZWVuRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b240ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uNC50ZXh0Q29udGVudCA9ICdTdW1tb24gQmxhY2sgRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b240LnZhbHVlID0gJ2JsYWNrRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24xMCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEwLnRleHRDb250ZW50ID0gJ1dJUCc7XG4gICAgICAgIHRoaXMuYnV0dG9uMTAudmFsdWUgPSAnbXVzaHJvb21LbmlnaHQnO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy54ICsgdGhpcy5wYWRkaW5nOyBcbiAgICAgICAgdGhpcy5uYW1lSGFzaCA9IHsncmVkRHJhZ29uJzonUmVkIERyYWdvbicsICdibHVlRHJhZ29uJzonQmx1ZSBEcmFnb24nLFxuICAgICAgICAnZ3JlZW5EcmFnb24nOidHcmVlbiBEcmFnb24nLCAnYmxhY2tEcmFnb24nOidCbGFjayBEcmFnb24nLCAnbXVzaHJvb21LbmlnaHQnOiAnTXVzaHJvb20gS25pZ2h0J307XG4gICAgICAgIHRoaXMuc3VtbW9uTGlzdCA9IFsncmVkRHJhZ29uJywgJ2JsdWVEcmFnb24nLCdncmVlbkRyYWdvbicsJ2JsYWNrRHJhZ29uJ107XG4gICAgICAgIHRoaXMuZWxlbWVudExpc3QgPSBbJ0JsYXplJywnRGF3bicsJ05pZ2h0JywnV2luZCcsJ1RodW5kZXInXTtcblxuICAgICAgICB0aGlzLmJ1dHRvbjUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b241LnRleHRDb250ZW50ID0gJ0JsYXplIFNwcml0ZSc7IC8vQmxhemUgLSBGbGFtZSBcbiAgICAgICAgdGhpcy5idXR0b241LnZhbHVlID0gXCJCbGF6ZVwiO1xuICAgICAgICB0aGlzLmJ1dHRvbjYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b242LnRleHRDb250ZW50ID0gJ0Rhd24gU3ByaXRlICc7IC8vRGF3biAtIExpZ2h0IFxuICAgICAgICB0aGlzLmJ1dHRvbjYudmFsdWUgPSBcIkRhd25cIjtcbiAgICAgICAgdGhpcy5idXR0b243ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7IFxuICAgICAgICB0aGlzLmJ1dHRvbjcudGV4dENvbnRlbnQgPSAnTmlnaHQgU3ByaXRlJzsgLy9OaWdodCAtIERhcmtcbiAgICAgICAgdGhpcy5idXR0b243LnZhbHVlID0gXCJOaWdodFwiO1xuICAgICAgICB0aGlzLmJ1dHRvbjggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b244LnRleHRDb250ZW50ID0gJ1dpbmQgU3ByaXRlICc7ICAvL1dpbmQgLSBTdG9ybVxuICAgICAgICB0aGlzLmJ1dHRvbjgudmFsdWUgPSBcIldpbmRcIjtcbiAgICAgICAgdGhpcy5idXR0b245ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7IFxuICAgICAgICB0aGlzLmJ1dHRvbjkudGV4dENvbnRlbnQgPSAnVGh1bmRlciBTcHJpdGUnOyAvL1RodW5kZXIgLSBMaWdodG5pbmcgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uOS52YWx1ZSA9IFwiVGh1bmRlclwiOyBcbiAgICAgICAgdGhpcy5idXR0b25YMiA9ICB0aGlzLmJ1dHRvblgxICsgdGhpcy5idXR0b25XaWR0aCsgdGhpcy5wYWRkaW5nIDsgXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy5idXR0b25YMSwgMF0sIFt0aGlzLmJ1dHRvblgxLDFdLCBbdGhpcy5idXR0b25YMSwyXSwgW3RoaXMuYnV0dG9uWDEsM10sICBbdGhpcy5idXR0b25YMSw0XSwgXG4gICAgICAgICAgICAgICAgIFt0aGlzLmJ1dHRvblgyLDBdLCBbdGhpcy5idXR0b25YMiwxXSwgW3RoaXMuYnV0dG9uWDIsMl0sIFt0aGlzLmJ1dHRvblgyLDNdLCBbdGhpcy5idXR0b25YMiw0XSAgXTsgXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24xLCB0aGlzLmJ1dHRvbjIsIHRoaXMuYnV0dG9uMywgdGhpcy5idXR0b240LCB0aGlzLmJ1dHRvbjEwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbjUsIHRoaXMuYnV0dG9uNiwgdGhpcy5idXR0b243LCB0aGlzLmJ1dHRvbjgsIHRoaXMuYnV0dG9uOV07IFxuICAgICAgIHRoaXMubm90ZSA9IFwiUHJlc3MgW1NdIHRvIGJ1eSwgW0FdIHRvIGNsb3NlIG1lbnVcIjsgXG4gICAgICAgXG5cbiAgICAgICAgdGhpcy5jb3N0UG9zaXRpb24gPSB0aGlzLmJ1dHRvblgyICsgdGhpcy5idXR0b25XaWR0aCsgMi41KnRoaXMucGFkZGluZzsgXG4gICAgICAgIHRoaXMuY29zdEhlaWdodCA9IDIwOyBcbiAgICAgICAgdGhpcy5jb3N0V2lkdGggPSAyNzU7IFxuICAgICAgICB0aGlzLmNvc3RQYWRkaW5nID0gNDsgXG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25YID0gMTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25ZID0gMTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvblRleHQgPSBbXTtcbiAgICAgICAgdGhpcy5wdXJjaGFzZURlc2NyaXB0aW9uID0gcmVxdWlyZSgnLi9wdXJjaGFzZS5qc29uJyk7IFxuXG4gICAgICAgIFxuICAgIH1cblxuICAgIGluaXRpYWxpemUoZ2FtZSl7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5yZWRyYXcoY3R4KSwgdHJ1ZSk7IFxuICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJlZHJhdyhjdHgsIGdhbWUgKXtcbiAgICAgICAgbGV0IGJ1dHRvbkRyYXcgPSB0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgXG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGk8YnV0dG9uRHJhdyA7IGkrKyl7XG4gICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgMip0aGlzLnBhZGRpbmdZKyh0aGlzLmJ1dHRvbkhlaWdodCt0aGlzLnBhZGRpbmdZKSp0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4LCBnYW1lKVxuICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGdyYWRlRnVuY3Rpb25zKGdhbWUsIGJ1dHRvbil7XG4gICAgICAgIC8vcmVzdW1tb247XG4gICAgICAgIGlmIChnYW1lLnN0b3JhZ2UuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGJ1dHRvbi52YWx1ZSkpKXtcbiAgICAgICAgICAgIGdhbWUucmVzdW1tb24oYnV0dG9uLnZhbHVlKTtcbiAgICAgICAgICAgIGxldCB1bml0ID0gZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKTtcbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICAnVXBncmFkZSAnK3RoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsICcrdW5pdC5sZXZlbCsnKSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKSl7IC8vdXBncmFkZSBzdW1tb25zIFxuICAgICAgICAgICAgbGV0IHVuaXQgPSBnYW1lLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGJ1dHRvbi52YWx1ZSkpO1xuICAgICAgICAgICAgdW5pdC5sZXZlbFVwKGdhbWUucGxheWVyKTsgLy9hZGQgY29zdCBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuaXQubGV2ZWwpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodW5pdC5sZXZlbDw1KXtcbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICAnVXBncmFkZSAnK3RoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsICcrdW5pdC5sZXZlbCsnKSc7fVxuICAgICAgICAgICAgZWxzZSB7YnV0dG9uLnRleHRDb250ZW50ID0gIHRoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsICcrdW5pdC5sZXZlbCsnKScgfVxuICAgICAgICB9IFxuXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3VtbW9uTGlzdC5pbmNsdWRlcyhidXR0b24udmFsdWUpKXtcbiAgICAgICAgICAgIGlmIChidXR0b24udmFsdWUgIT0nbXVzaHJvb21LbmlnaHQnKXtcbiAgICAgICAgICAgICAgICBnYW1lLmNyZWF0ZU1vYihnYW1lLnBsYXllciwgYnV0dG9uLnZhbHVlLCAwLCBnYW1lKTsgLy9zdW1tb25zIDtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKSl7IC8vY2hlY2tzIGlmIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IFxuICAgICAgICAgICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAnVXBncmFkZSAnK3RoaXMubmFtZUhhc2hbYnV0dG9uLnZhbHVlXSsgJyAoTHZsIDEpJztcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVsZW1lbnRMaXN0LmluY2x1ZGVzKGJ1dHRvbi52YWx1ZSkpe1xuICAgICAgICAgICAgICAgIGdhbWUuYWRkRWxlbWVudChidXR0b24udmFsdWUpOyAvL2VsZW1lbnRzXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIC8vIGVsc2UgaWYgKGJ1dHRvbi50ZXh0Q29udGVudD09J05leHQgV2F2ZSEnKSBnYW1lLm5leHRXYXZlID0gdHJ1ZTsgLy9uZXh0IHdhdmUgYnV0dG9uXG5cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICBcbiAgICAgICAgbGV0IGJ1dHRvbkRyYXcgPSB0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgXG4gICAgICAgIGlmICghZ2FtZS53YXZlRmluaXNoKXtidXR0b25EcmF3LT0xfTsgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPGJ1dHRvbkRyYXcgOyBpKyspe1xuICAgICAgICAgICAgLy8gdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLnBhZGRpbmdZKyh0aGlzLmJ1dHRvbkhlaWdodCt0aGlzLnBhZGRpbmdZKSp0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4LCBnYW1lKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zTGlzdFtpXS5mb2N1cygpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgdGhpcy5idXR0b25zTGlzdFtpXSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG5cbiAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgsIGdhbWUpeyAgIFxuICAgICAgICBsZXQgYnV0dG9uQ29sb3IgPSdzdGVlbGJsdWUnO1xuICAgICAgICBsZXQgdGV4dENvbG9yID0nd2hpdGUnO1xuICAgICAgICBsZXQgY29zdCA9IDA7IFxuICAgICAgICBpZiAoZ2FtZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5idXR0b25YMT09eCkgeyAvL3N1bW1vbiBidXR0b25zIC8vY2hlY2sgY29zdCAoaWYgZmlyc3Qgb3IgdXBncmFkZSlcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBlMS52YWx1ZSkpKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVuaXQgPSBnYW1lLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGUxLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvc3QgPSBnYW1lLnBsYXllci51cGdyYWRlQ29zdFt1bml0LmxldmVsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSAoIGNvc3QgPSBnYW1lLnBsYXllci5zdW1tb25Db3N0W2dhbWUucGxheWVyLnN1bW1vbkNvdW50XSk7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIubW9uZXk8IGNvc3Qpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29sb3IgPSAnbGlnaHRncmV5JztcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbG9yID0gJ2RhcmtncmV5JzsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5idXR0b25YMj09eCl7IC8vZWxlbWVudHNcbiAgICAgICAgICAgICAgICBjb3N0ID0gZ2FtZS5wbGF5ZXIuZWxlbWVudENvc3RbZ2FtZS5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXTtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIubW9uZXk8Z2FtZS5wbGF5ZXIuZWxlbWVudENvc3RbZ2FtZS5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXSB8fCBcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoID49NSl7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yID0gJ2xpZ2h0Z3JleSc7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvciA9ICdkYXJrZ3JleSc7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gYnV0dG9uQ29sb3I7ICAvL2J1dHRvbiBiYWNrZ3JvdW5kXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgY3R4LnJvdW5kUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQsIDMpOyBcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgIFxuICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQ7IFxuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7IC8vYnV0dG9uIHRleHQgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0ZXh0Q29sb3I7XG4gICAgICAgIGlmIChnYW1lKXtcbiAgICAgICAgICAgICBpZiAoZ2FtZS5zdG9yYWdlLmxlbmd0aD4wKXtcblxuICAgICAgICAgICAgICAgIGxldCB0ZXN0ID0gZ2FtZS5zdG9yYWdlLmZpbmQob2JqPT4gb2JqLnR5cGU9PWUxLnZhbHVlKTsgXG4gICAgICAgICAgICAgICAgaWYgKHRlc3QpeyBcbiAgICAgICAgICAgICAgICAgICAgZTEudGV4dENvbnRlbnQgPSAnUmVzdW1tb24gTHZsICcrdGVzdC5sZXZlbCsnICcrdGhpcy5uYW1lSGFzaFtlMS52YWx1ZV07IFxuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gMDsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIGN0eC5maWxsVGV4dChlMS50ZXh0Q29udGVudCwgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrdGhpcy5idXR0b25IZWlnaHQvMyk7IFxuICAgICAgICBpZiAoY29zdCAmJiBlMS52YWx1ZSE9J211c2hyb29tS25pZ2h0Jyl7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJygnK2Nvc3QrJyBtZXNvcyknLCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSsyKnRoaXMuYnV0dG9uSGVpZ2h0LzMpO31cbiAgICAgICAgLy9lbHNlIHsgY3R4LmZpbGxUZXh0KCdNQVgnLCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSsyKnRoaXMuYnV0dG9uSGVpZ2h0LzMpO31cblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vY29sbGlzaW9uIHBhdGggXG4gICAgICAgIGN0eC5yZWN0KHgseSwgdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQpOyBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdG9nZ2xlTWVudShnYW1lKXsgXG4gICAgICAgIHRoaXMuZGlzcGxheSA9ICF0aGlzLmRpc3BsYXk7IFxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5KXtnYW1lLnBhdXNlID0gdHJ1ZX1cbiAgICAgICAgZWxzZSBnYW1lLnBhdXNlID0gZmFsc2VcbiAgICB9XG5cbiAgICBwdXJjaGFzZShnYW1lKXtcbiAgICAgICAgbGV0IGkgPSAodGhpcy5zZWxlY3Rpb25YLTEpKjUgKyAodGhpcy5zZWxlY3Rpb25ZLTEpO1xuICAgICAgICB0aGlzLnVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgdGhpcy5idXR0b25zTGlzdFtpXSk7IFxuICAgIH1cblxuICAgIHNlbGVjdGVkRGVzY3JpcCgpe1xuICAgICAgICBsZXQgaSA9ICh0aGlzLnNlbGVjdGlvblgtMSkqNSArICh0aGlzLnNlbGVjdGlvblktMSk7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25UZXh0ID0gdGhpcy5wdXJjaGFzZURlc2NyaXB0aW9uW3RoaXMuYnV0dG9uc0xpc3RbaV0udmFsdWVdOyBcbiAgICB9XG5cbiAgICBkaXNwbGF5TWVudShjdHgsIGdhbWUpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheSl7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDMpOyAvL3doaXRlIHdpbmRvd1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KGN0eCwgZ2FtZSk7IC8vZHJhdyBidXR0b25cblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzI4MjgyOFwiO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJvdW5kUmVjdCh0aGlzLmNvc3RQb3NpdGlvbi0yKnRoaXMucGFkZGluZywgMip0aGlzLnBhZGRpbmdZLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0V2lkdGgsIHRoaXMuY29zdEhlaWdodCoxMSwgMyk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcblxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL3NlbGVjdGlvbiBcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMuYnV0dG9uWDEgKyAodGhpcy5zZWxlY3Rpb25YLTEpKih0aGlzLmJ1dHRvbldpZHRoKyB0aGlzLnBhZGRpbmcpLCBcbiAgICAgICAgICAgICAgICAyKnRoaXMucGFkZGluZ1krKHRoaXMuYnV0dG9uSGVpZ2h0K3RoaXMucGFkZGluZ1kpKih0aGlzLnNlbGVjdGlvblktMSksIFxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uV2lkdGgsdGhpcy5idXR0b25IZWlnaHQsIDMpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGVzY3JpcCgpOyAvL3Nob3dzIHNlbGVjdGVkIHN1bW1vbiBkZXRhaWwgXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5kZXNjcmlwdGlvblRleHQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmRlc2NyaXB0aW9uVGV4dFtpXSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsXG4gICAgICAgICAgICAgICAgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqaSk7IFxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgLy9zdGF0cyAgICAgICAgICB0aGlzLmRhbWFnZU11bHRpID0gMTsgXG4gICAgICAgIC8vIHRoaXMucGlja3VwTXV0bGkgPSAxO1xuICAgICAgICAvLyB0aGlzLmtub2NrYmFja011bHRpID0gMTtcbiAgICAgICAgLy8gdGhpcy5zcGVlZE11bHRpID0gMTsgXG4gICAgICAgIC8vIHRoaXMucGllcmNlID0gMDsgXG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnRGFtYWdlOiB4JytnYW1lLnBsYXllci5kYW1hZ2VNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbi0yNSwgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqNyk7ICAgICAgIFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdTcGVlZDogeCcrZ2FtZS5wbGF5ZXIuc3BlZWRNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbi0yNSwgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqNy42KTsgXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ0tub2NrYmFjazogeCcrZ2FtZS5wbGF5ZXIua25vY2tiYWNrTXVsdGkudG9GaXhlZCgxKSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjguMik7IFxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdQaWVyY2U6ICcrZ2FtZS5wbGF5ZXIucGllcmNlLCB0aGlzLmNvc3RQb3NpdGlvbisxMDAsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcpOyBcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnTG9vdCBSYWRpdXM6IHgnK2dhbWUucGxheWVyLmxvb3RNdWx0aS50b0ZpeGVkKDEpLCB0aGlzLmNvc3RQb3NpdGlvbisxMDAsIDYqdGhpcy5wYWRkaW5nWSsodGhpcy5jb3N0UGFkZGluZyt0aGlzLmNvc3RIZWlnaHQpKjcuNik7IFxuXG5cbiAgICAgICAgICAgICAgICBcblxuXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnYmxhY2snO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMubm90ZSwgdGhpcy5idXR0b25YMSsxMCwgdGhpcy5oZWlnaHQtMTApO1xuXG4gICAgICAgICAgICBpZiAoZ2FtZS5lcnJvcil7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAncmVkJztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1NwYWNlIG9jY3VwaWVkIScsIHRoaXMud2lkdGgtMjIwLCB0aGlzLmhlaWdodC0xMCk7IFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7Z2FtZS5lcnJvcj1mYWxzZTt9LCBcIjMwMDBcIikgO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudScpLmlubmVySFRNTD1cIlwiO31cbiAgICAgICAgXG5cblxuICAgICAgICAgICAgXG4gICAgfVxuXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVTY3JlZW5cIik7IC8vIGdldHMgY2FudmFzIGVsZW1lbnRcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgLy9jcmVhdGVzIDJEIHJlbmRlcmluZyBvYmplY3RcblxuY29uc3QgZ2FtZVdpZHRoID0gMTAwMDtcbmNvbnN0IGdhbWVIZWlnaHQgPSA1MDA7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KTsgXG5nYW1lLnN0YXJ0KCk7IC8vY3JlYXRlcyBnYW1lIG9iamVjdHM7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKHRpbWVzdGFtcCl7XG4gICAgXG5cbiAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCwgZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KTsgLy9yZWZyZXNoIHNjcmVlblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRpbWVzdGFtcCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZ2FtZS50aXRsZURpc3BsYXkpe1xuICAgICAgICAgICAgZ2FtZS50aXRsZU1lbnUoY3R4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYgKCFnYW1lLnBhdXNlICl7IGdhbWUudXBkYXRlKHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnYW1lLm5leHRXYXZlTG9hZGVyKCk7IC8vbG9hZHMgd2F2ZSBsaXN0XG4gICAgICAgICAgICBnYW1lLndhdmVMb2FkZXIoKTsgLy8gbG9hZHMgZWFjaCBtb2IgZnJvbSB3YXZlIGxpc3RcbiAgICAgICAgICAgIC8vZ2FtZS5wYXVzZUhhbmRsZXIoKSBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZ2FtZS5kcmF3KGN0eCk7IFxuICAgICAgICAgICAgZ2FtZS53YXZlQ2xlYXIoY3R4KTtcbiAgICAgICAgICAgIGdhbWUucGF1c2VIYW5kbGVyKHRpbWVzdGFtcCwgY3R4KTsgXG4gICAgICAgICAgICBnYW1lLnVwZ3JhZGVNZW51KGN0eCk7XG4gICAgICAgICAgICBnYW1lLm5leHRMZXZlbExvYWRlcihjdHgpOyAvL2lmIHdhdmUgbGlzdCBlbXB0eSwgbW92ZSB0byBuZXh0IGxldmVsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGdhbWUucmVjYWxsQ2hlY2soKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZ2FtZS5zY3JlZW5UcmFuc2l0aW9uKGN0eCk7XG5cbiAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7fSwgNSApOyAgLy9maXggZnJhbXRlc1xuXG59XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7IFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9