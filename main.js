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

    getImage(){  //returns frame
        this.setImageIndex(); 
        return this.images[this.imageIndex]; 
    }

    setImageIndex(){
        this.timerCount--;
        if (this.timerCount <= 0 && !this.shouldStop()){
            this.timerCount= this.timerCountDefault; 
            this.imageIndex++; 
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
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _img__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./img */ "./src/img.js");
 
 

 
 
 
 


class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.load = false;
        this.playerObjects =[];
        this.mobObjects =[]; 
        this.moneyObjects = []; 
        this.level = 1; 
        this.wave = 0; 
        this.lane = 1; 
        this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_7__["default"])('bg/bgSky'+this.level+'.png');
        this.bgStage = (0,_img__WEBPACK_IMPORTED_MODULE_7__["default"])('bg/bgStage'+this.level+'.png');
        this.waveStart = false;
        this.waveInfo = __webpack_require__(/*! ./waveInfo.json */ "./src/waveInfo.json");
        this.levelList = this.waveInfo['level'+this.level];//{1: ['wave1-5', 'wave1-1']} //JSON
        this.waveList = [];
        this.toLoad =[]; 
        this.rowHeight = 90; 
        this.nextWave = false; 
        this.waveFinish = true; 
        this.gameTime = 0; 
        this.fade = 1;
        this.fadeIn = true;
        this.fadeOut = false ;
        this.storage = []; 
    }

    waveClear(){ // checks if wave is cleared
        if (!this.nextWave && this.waveStart && 
            this.toLoad.length == 0  && this.mobObjects.length==0 ){
            //this.upgrade.display = true; 
            this.waveFinish = true; 
            //this.upgrade.displayMenu(ctx);
        } 
    }
    nextLevelLoader(){
        if (this.levelList.length == 0 && this.waveFinish){
            //special level clear banner

            this.waveStart = false;
            this.waveFinish = false; 
            setTimeout(()=> {
                this.fadeOut = true}, "2000") // fade out transition
            setTimeout(()=> { //load next content
                this.level++;
                this.levelList = this.waveInfo['level'+this.level]; // load next level waves
                this.wave = 0;                 
                this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_7__["default"])('bg/bgSky'+this.level+'.png'); //reload BG art 
                this.bgStage = (0,_img__WEBPACK_IMPORTED_MODULE_7__["default"])('bg/bgStage'+this.level+'.png');
                this.moneyObjects = []; //clear floor money 
                this.waveStart = true; 
                this.player.position = {x:25, y:this.gameHeight-45-2*this.rowHeight};
                this.player.left = false;
                this.player.floor =  this.gameHeight - 45 - 2*this.rowHeight
                this.storage = this.playerObjects.splice(1);  //pushes everything expect player
                //for (let i=1; i<this.playerObjects.length;i++ ){
                //     this.player.money += this.playerObjects[i].value; //refund value
                //     this.playerObjects[i] = null; 
                //}
                //this.//refunds player
                
            }, "4000"); 

        }
    }

    nextWaveLoader(time ){
        if (this.nextWave){ //load next wave data from JSON
            this.waveList = this.waveInfo[this.levelList.shift()]; //
            this.gameTime = time; //update time 
            this.waveStart = false; 
            this.wave ++; 
            this.nextWave = false; 
            this.upgrade.display = false;
            this.waveFinish = false; 
        }
    }

    screenTransition(ctx){
        if (this.fadeIn){ //fade in 
            if (this.fade>0){
                this.fade -= 0.02; 
                if (this.fade <= 0) {this.fadeIn = false;}
            } 
        }
        if (this.fadeOut){ //fade to black
            if (this.fade < 1){    
                this.fade += 0.02; 
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
    waveLoader(time){//loads each mob from waveList
        if (this.toLoad.length == 0 && this.waveList.length>0) this.toLoad = this.waveList.shift(); 
        if (this.toLoad[2] <=  (time - this.gameTime)/1000 ){
            this.waveStart = true; 
            if (this.toLoad[1].length>0){
                for (let i=0; i<this.toLoad[1].length; i++){
                    this.lane = this.toLoad[1][i]; //sets lane to load
                    this.createMob(this, this.toLoad[0], 1);}
                }
            
            else{
                this.lane = this.toLoad[1]-1; //sets lane to load
                this.createMob(this, this.toLoad[0], 1);}
           
            this.toLoad = []; 
        }
    }    
    
    addElement(element){ //upgrade shop 
       if (this.player.elementList.length<5){
            if (this.player.money> this.player.elementCost[0]){
                this.player.money -= this.player.elementCost[this.player.elementList.length];
                this.player.elementList.push(element); 
                this.player.elementals(); //load sprites
                //this.elementCost.shift();  //delete cost 
            }
       }
    }

    resummon(type){
        let transfer = this.storage.findIndex(obj=>obj.type === type); 
        this.storage[transfer].position.x = (this.player.curTile*80)+this.player.width/2;
        this.storage[transfer].position.y = (this.player.floor+30); 

        this.playerObjects.push(this.storage[transfer]); 
        this.storage[transfer] = '';
        console.log(this.playerObjects);
        //console.log(this.storage); 
    }
    createMob(parent, type, side){
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
            else(console.log('occupied')); 

        } else {this.mobObjects.push(new _mob__WEBPACK_IMPORTED_MODULE_2__["default"](parent, type, 1))}
        
    }

    loadBG(){
        this.bgSky = (0,_img__WEBPACK_IMPORTED_MODULE_7__["default"])('bg/bgSky'+this.level+'.png'); //load sky bg
    }

    start(){
        this.startMenu = new _startScreen__WEBPACK_IMPORTED_MODULE_5__["default"](this);
        this.startMenu.initialize(this); 
        this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        this.upgrade = new _upgrade__WEBPACK_IMPORTED_MODULE_3__["default"](this); 
        this.upgrade.initialize(this); 
        this.HUDMenu = new _HUD__WEBPACK_IMPORTED_MODULE_6__["default"](this); 
        new _input__WEBPACK_IMPORTED_MODULE_0__["default"](this.player, this.upgrade, this);        
        this.playerObjects = [this.player];
    }

    draw(ctx){ //runs draw function for object list 
        ctx.drawImage(this.bgSky, 0, 0); 
        ctx.drawImage(this.bgStage, 0, 0); 
        this.mobObjects.forEach( (object)=>object.draw(ctx) )
        this.playerObjects.forEach( (object)=>object.draw(ctx) )
        this.moneyObjects.forEach( (object)=>object.draw(ctx) ); 
    
    } 

    knockback(obj, direction){
        if (obj.name =='Wiz'){ //only player pops up
            obj.jump = true;
            obj.invulnTime = 100; 
            obj.speedY += 4;}
    
        obj.hit = true; 
        obj.knockbackForce = -5*direction; //add as stat
    }
    aggro(obj1, obj2){ // checks if obj1 range is within obj2
        for (const target of obj2){
            if (target.health>0){
                if (obj1.hitbox[0]+obj1.hitbox[2]+obj1.range>target.hitbox[0] && 
                    obj1.hitbox[0]-obj1.range<target.hitbox[0]+target.hitbox[2]){ //aggro from right
                    
                        if (obj1.hitbox[1]+obj1.hitbox[3]/2>target.hitbox[1] && obj1.hitbox[1]+obj1.hitbox[3]/2<target.hitbox[1]+target.hitbox[3])
                         //if (obj1.lane == obj2.lane)   
                        {if (obj1.aggro){obj1.attack()}; //only aggro mobs have attack animations
                    }
                }
            }
         }
     }
    
    lootMoney(obj1, obj2){
        for (const target of obj2){
            if ( (obj1.hitbox[0]<target.hitbox[0] && obj1.hitbox[0]+obj1.hitbox[2]> target.hitbox[0]) || //obj1 on left
                (obj1.hitbox[0]+obj1.hitbox[2]>target.hitbox[0]+target.hitbox[2] && 
                obj1.hitbox[0]<target.hitbox[0]+target.hitbox[2] )){ //obj1 on right
                if (obj1.hitbox[1]<target.hitbox[1] && obj1.hitbox[1]+obj1.hitbox[3]>target.hitbox[1]){
                    obj1.money += target.value; 
                    console.log(obj1.money);
                    target.delete = true;//true; 
            }
            }}

        this.moneyObjects = this.moneyObjects.filter(  //removes looted coins
        function (object){return object.delete == false; });     
    }


    collision(obj1, obj2){ // checks if obj1 is hitting obj2 
        for (const target of obj2){
           //console.log(target);
            if (obj1.health>0 && target.health>0){
                if ( (obj1.hitbox[0]<target.hitbox[0] && obj1.hitbox[0]+obj1.hitbox[2]> target.hitbox[0]) || //obj1 ->target
                    (obj1.hitbox[0]+obj1.hitbox[2]>target.hitbox[0]+target.hitbox[2] && 
                    obj1.hitbox[0]<target.hitbox[0]+target.hitbox[2] )){ // target <- obj1

                    if (obj1.hitbox[1]>target.hitbox[1] && obj1.hitbox[1]<target.hitbox[1]+target.hitbox[3]){ //y-bounding
                        if (obj1.projectile && !obj1.explode){
                            this.damageCalc(obj1, target) 
                            obj1.explode = true; //destroy projectile      
                        } else if (!obj1.projectile) this.damageCalc(obj1, target);

                    }
                }
                }
            }
        }

    damageCalc(obj1, obj2){ //obj1 attacking obj2
        if (obj2.invulnTime == 0 && obj1.touchHit) {
            obj2.health -= (obj1.damage-obj2.armor);
            obj2.knockbackSum += (obj1.damage-obj2.armor)
            if (obj2.knockbackThresh <= obj2.knockbackSum){
                if (obj1.position.x>obj2.position.x){ this.knockback(obj2, 1)}
                else this.knockback(obj2, -1);
                obj2.knockbackSum = 0 
            }
         }

    }
    loseLife(){
        for (const obj of this.mobObjects){
            if (obj.position.x <= -obj.width*2){
                obj.alive = false;
                this.player.health -= 1; 
                console.log(this.player.health);
            }
        }

    }
    drawGrid(ctx){
        ctx.beginPath();  // this.gameHeight = gameHeight
        ctx.moveTo(0, this.gameHeight);
        ctx.lineTo(1000, this.gameHeight);
        ctx.lineTo(1000, this.gameHeight - this.rowHeight);
        ctx.lineTo(0, this.gameHeight - this.rowHeight);
        ctx.lineTo(0, this.gameHeight - this.rowHeight*2);
        ctx.lineTo(1000, this.gameHeight - this.rowHeight*2);
        ctx.lineTo(1000, this.gameHeight - this.rowHeight*3);
        ctx.lineTo(0, this.gameHeight - this.rowHeight*3);        
        ctx.stroke();
    }

    upgradeMenu(ctx){
        this.HUDMenu.displayHUD(ctx, this); 
        this.startMenu.displayMenu(ctx, this ); 
        this.upgrade.displayMenu(ctx, this);
    }
    spawnMoney(obj){
        if (obj.state == 'die' && !obj.lootDrop){
            this.moneyObjects.push(new _money__WEBPACK_IMPORTED_MODULE_4__["default"](obj))
            obj.lootDrop = true; 
        }
    }
    update(time){
        this.mobObjects.forEach( (object)=>this.spawnMoney(object)); 
        this.loseLife(); //enemies past 
        this.mobObjects = this.mobObjects.filter(  //removes dead/passing objects
            function (object){
                return object.alive !== false;});        
        this.lootMoney(this.player, this.moneyObjects);

        this.playerObjects.forEach( (object)=>object.update() ); 
        this.mobObjects.forEach( (object)=>object.update() ); 
        this.moneyObjects.forEach( (object)=>object.update() ); 
        
        this.playerObjects.forEach( (object)=>this.aggro(object, this.mobObjects) ); 
        this.mobObjects.forEach( (object)=>this.aggro(object, this.playerObjects) ); 

        this.collision(this.player, this.mobObjects); 
        this.mobObjects.forEach( (object)=>this.collision(object, this.playerObjects) ); 
        
        this.playerObjects.forEach( (object)=>
            object.projectiles.forEach( (object2)=> 
                 this.collision(object2, this.mobObjects)
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
                case 65: //A move left 
                    if (upgrade.display){
                        if(upgrade.selectionX>1){upgrade.selectionX-=1};
                        }
                    else {
                        player.speedX = -player.speed; 
                        player.left = true;}
                    break;

                case 68: //D move right
                if (upgrade.display){
                    if(upgrade.selectionX<2){upgrade.selectionX+=1};
                    }
                else {
                    player.speedX = player.speed; 
                    player.left = false;}
                    break;

                case 87: //W teleport up
                if (upgrade.display){
                    if(upgrade.selectionY>1){upgrade.selectionY-=1};
                    }
                else {player.teleport(-1);}
                    break
                case 83: //S teleport down
                if (upgrade.display){
                    if(upgrade.selectionY<5){upgrade.selectionY+=1};
                    }
                else {player.teleport(1);}
                    break


                case 74:  //J 
                if (upgrade.display){upgrade.purchase(Game)}    
                else if (!player.jump){
                    player.speedY = 12;
                    player.jump = true;}
                    //console.log('jump[!')
                    break 

                case 75: //K
                    player.attack();
                    break

                case 79: //O
                    if (Game.waveFinish){Game.nextWave = true; 
                        Game.startMenu.display = false}; 
                case 96:
                    upgrade.toggleMenu(); 
                    break
                case 80: 
                upgrade.toggleMenu(); 
                    break

                case 97: //1
                    Game.createMob(player, 'redDragon', 0);
                    break
                case 98: //2
                    Game.createMob(player, 'blueDragon', 0);
                    break
                case 99: //3
                    Game.createMob(player, 'greenDragon', 0);
                    break
                case 100: //4
                    Game.createMob(player, 'mushroomKnight', 0);
                    break

            }

        })
        document.addEventListener('keyup', (event) =>{    
            switch(event.keyCode){ //a:65; s:83; d:68, w: 87;
                case 65:  
                    if (player.speedX<0) player.speedX = 0; 
                    break;
                case 68:
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
    constructor(game, type, side){
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
            this.width = 50; //sprite size 
            this.height = 80; 
            this.range = 50;
            this.left = true;
            this.health = this.typeInfo[this.type]['health'];
            this.maxHealth = this.health; 
            this.armor = 0;
            this.state = 'walk';
            this.xOff=-70;
            this.yOff=-95;
            this.position = {  //position (rightside)
                x: this.gameWidth-100, 
                y: this.gameHeight - 95 - 90*game.lane,
            }
        }
        else { // PC pets
            this.width = 50; //sprite size 
            this.height = 50; 
            this.range = 550;
            this.health = 1; 
            this.armor = 1; 
            this.state = 'stand'
            this.left = false; 
            this.yOff=0;
            this.xOff=0;
            this.position = {  //position 
            x: (game.curTile*80)+game.width/2, 
            y: game.floor+30
        }};  //offset for sprites 
        //if (this.typeInfo[this.type]['yOff']) (this.position.y -=this.typeInfo[this.type]['yOff']) ;
        if (this.typeInfo[this.type]['damage']){
                this.damage = this.typeInfo[this.type]['damage']
                this.aggro = true;
                }
        else {this.damage=1; this.aggro=false};

        if (this.typeInfo[this.type]['yOff']){this.yOff = this.typeInfo[this.type]['yOff']}
        if (this.typeInfo[this.type]['xOff']){this.xOff = this.typeInfo[this.type]['xOff']}
        
        this.knockbackThresh = Math.floor(this.maxHealth / 10);
        this.knockbackSum = 0  
        this.hit = false; 
        this.createAnimations(); 
    }

    createAnimations(){ //import sprites 
        this.frames = 30; 
        if (this.sprite=='mob'){ // Enemy mobs
            this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/stand_?.png', this.typeInfo[this.type]['stand'], 10, "stand"); //standing sprites; 
            this.walk = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/move_?.png', this.typeInfo[this.type]['walk'], 10, "walk"); //walking sprites; 
            this.hit = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/hit1_?.png',0, 10, "hit");
            this.die = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/die1_?.png', this.typeInfo[this.type]['die'], 15, "die", true);
            this.animations = [this.stand, this.walk, this.hit, this.die]; 
            if (this.typeInfo[this.type]['angry']){
                this.angry = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/attack1_?.png', this.typeInfo[this.type]['angry'], 10, "attack", true)
                this.animations.push(this.angry);
            };
        }           
        else { 
            this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/stand1_?.png', this.typeInfo[this.type]['stand'], 10, "stand"); //standing sprites; 
            this.angry = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/angry_?.png', this.typeInfo[this.type]['angry'], 10, "attack", true); //walking sprites; 
            this.animations = [this.stand, this.angry]; 
        }
    }
    
    levelUp(player){ 
        let cost = player.upgradeCost[this.level-1];
        if (player.money>=cost){
            this.level++;  
            this.value += cost; 
            player.money -= cost; 
        }
        //this.damage*=2; 
    }

    attack(){
        this.speedX = 0; 
        if (this.attackCD <= 0){
            if (this.side == 0){
                this.proj = new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj']);
                this.projectiles.push(this.proj);
                if (this.level>1){
                    for (let i=0; i<=this.level; i++){
                    //this.proj = new Projectile(this, this.typeInfo[this.type]['proj']);
                    setTimeout( ()=> {this.projectiles.push( new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj']));}, 80*i)
                    }
                }
            }
            this.angry.reset();
            this.state = 'attack'; 
            this.attackCD = this.attackSpeed;  
                 
    }}

    draw(ctx) {
        const animation = this.animations.find((animation)=>animation.isFor(this.state))
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height); 
        //ctx.fillRect(this.position.x-this.range, this.position.y, this.width+2*this.range, this.height); //range
        if (animation.shouldStop()){
            this.state = 'stand';} 

        if (this.health<=0 && this.side ==1){
            this.state = 'die';  //death animation   
            if (animation.shouldStop()){
                if (this.fade>0) this.fade -= 0.03; //fade on death 
                ctx.globalAlpha = this.fade; 
                setTimeout(()=> {this.alive = false}, "450") ;} 
        }  
        if (this.side == 1 && this.state !='die'){ //health bar
            ctx.fillStyle = "#2b2b2b";
            ctx.fillRect(this.position.x, this.position.y-20, 60, 12); //empty box
            ctx.fillStyle = "#990c02";
            ctx.fillRect(this.position.x+1, this.position.y-19, Math.floor(58*(1-(this.maxHealth - this.health)/this.maxHealth)), 10); //empty box
        }
        const image = animation.getImage();       
        if (!this.left){//flip based on sprite orientation
            ctx.scale(-1,1);
            ctx.drawImage(image, -this.position.x-this.width+this.xOff, this.position.y+this.yOff );}
        else {ctx.drawImage(image, this.position.x+this.xOff, this.position.y+this.yOff); }
        ctx.globalAlpha = 1;
        ctx.setTransform(1,0,0,1,0,0); 
        this.projectiles.forEach( (object)=>object.draw(ctx) )
        }            
    update(){
        //this.position.x -= this.speed;
        if (this.side === 1){  // Mob 
            if (this.health>0){
                if (this.speedX!=0){
                    this.state = 'walk'; 
                } else if (this.state == 'walk') this.state = 'stand'; 

                if (this.position.x<-this.width*2) {this.position.x = -this.width*2}; //left border
                if (this.position.x>this.gameWidth-this.width) {this.position.x = this.gameWidth-this.width;} //right border
                //console.log(this.knockbackForce);
                if (Math.abs(this.knockbackForce)>0) {this.state = 'hit'}; 
                if (this.knockbackForce>0){this.knockbackForce-=0.5;}
                else if (this.knockbackForce<0){this.knockbackForce+=0.5;}
                this.position.x += this.knockbackForce;
                this.position.x -= (this.speedX); //knockback right

                this.position.y -= this.speedY; 
                if (this.speedY>0){
                    this.speedY-=0.5; 
                }        
                
                if (this.jump){ //gravity
                    this.position.y += 1*this.gravityTime;
                    this.gravityTime+=0.5; 
                //this.state = 'jump';
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

        this.projectiles.forEach( (object)=>object.update() ); 
        this.projectiles = this.projectiles.filter(  //deletes projectiles
            function (object){return object.delete !== true; 
        });
       // console.log(this.projectiles); 
        
        if (this.attackCD >0){this.attackCD--};

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
    constructor(obj){
        this.position = {  //position 
            x: (obj.position.x)+obj.width/2, 
            y: obj.position.y+40}
        this.width = 35;
        this.height = 35; 
            this.value = obj.value; 
        this.popUp = 25; 
        this.dropDown = 15;
        this.speedY = 1; 
        this.accelUp = 0;
        this.accelDown = 0;
        this.delete = false;
        this.hitbox = [this.position.x, this.position.y-25, this.width, this.height]; 
        if (this.value>100){this.type = '4';} 
        else if (this.value>50){this.type = '3';} 
        else if (this.value>10){this.type = '2';} 
        else this.type = '1'; 
        this.createAnimations(); 
    }
    
    createAnimations(){
        this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"]('coin/Coin'+this.type+'_?.png', 3, 6, "stand");
        this.animations = [this.stand]
    }

    draw(ctx) {
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        const animation = this.animations.find((animation)=>animation.isFor('stand')); 
        const image = animation.getImage(); 
        ctx.drawImage(image, this.position.x, this.position.y)
    }

    update(){
        if (this.popUp>0){
            this.accelUp+=0.1;
            this.position.y -= (4-this.accelUp); 

            this.popUp -= 1; 
        } else if (this.dropDown>0){
            this.accelDown+=0.1;
            this.position.y += (2.5+this.accelDown);
            this.dropDown -= 1; 
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
        this.width = 50; //sprite size 
        this.height = 80; 
        this.position = {  //position 
            x: this.width/2, 
            y: this.gameHeight - 45 - 2*game.rowHeight,
        }
        this.playerX = this.position.x - this.width/2 +18; 
        this.elePositions = [ [this.playerX -60, this.position.y], [this.playerX -40, this.position.y-40],
            [this.playerX , this.position.y-60], [this.playerX +40, this.position.y-40], 
            [this.playerX +60, this.position.y] ];
        this.rowHeight = game.rowHeight;
        this.lane = 1; 
        this.floor =  this.gameHeight - 45 - (1+this.lane)*this.rowHeight
        this.maxSpeed = 15; 
        this.speed = 3;
        this.knockbackForce = 0; 
        this.left = false;
        
        this.speedX = 0;
        this.speedY = 0; 
        this.jump = false;
        this.gravityTime = 1; 
        this.projectiles = [];
        this.name = 'Wiz';
        this.health = 10000; 
        this.damage = 1; 
        this.invulnTime =  0; 
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
        this.elementSprites = {};
        this.elementLoadedSprite = {} ; 
        this.elementInfo = { 'Blaze': {'stand':7, 'move': 7, 'attack': 8 },
            'Dawn': {'stand': 15, 'move':15, 'attack': 8},
            'Night': {'stand':7, 'move':7, 'attack': 8},
            'Thunder': {'stand': 7, 'move':7, 'attack': 7},
            'Wind': {'stand': 7, 'move':7, 'attack': 9} }
        this.elementState = ['stand','stand','stand']; 
        this.createAnimations(); 
        this.elementals();

        this.summonCount = 0; 
        this.money = 1500; 
        this.summonCost = [40, 80, 160, 320, 640];
        this.upgradeCost = [100, 200, 400, 800, 1600]; 
        this.elementCost = [50, 100, 200, 400, 800]; 


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
        this.stand = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/alert_?.png", 3, this.frames, "stand"); //standing sprites; 
        this.walk = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/walk1_?.png", 3, 10, "walk"); //walking sprites; 
        this.jump = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/jump_?.png", 1, 10, "jump"); //jump sprites;
        this.cast = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/alert_?.png", 3, 10, "stand"); 
        this.swing1 = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/swingO1_?.png", 3, 12, "swing1", true); //attack sprites;
        this.swing2 = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/swingO2_?.png", 3, 12, "swing2", true); 
        this.swing3 = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"]("wizard/swingO3_?.png", 3, 12, "swing3", true); 
        this.attackAnim = ['swing1', 'swing2', 'swing3']; 
        this.animations = [this.stand, this.walk, this.jump, this.swing1, this.swing2, this.swing3, this.cast]; 
    }

    attack(){
        if (this.attackCD <= 0){
            this.proj = new _projectile__WEBPACK_IMPORTED_MODULE_0__["default"](this, 'lightningball');

            
            this.state = this.attackAnim.shift(); 
            this.attackAnim.push(this.state); 
            this.animations.find((animation)=>animation.isFor(this.state)).reset(); 
            this.attackCD = this.attackSpeed;
            this.projectiles.push(this.proj);
            //setTimeout(()=> {this.projectiles.push(this.proj)}, "200"); //slight delay for animation

            for (let i=0; i<this.elementList.length; i++){
                this.proj = new _projectile__WEBPACK_IMPORTED_MODULE_0__["default"](this, 'fireball',this.elePositions[i][0], this.elePositions[i][1] );
                this.projectiles.push(this.proj);
            }
        }
    }


    draw(ctx){
        const animation = this.animations.find((animation)=>animation.isFor(this.state))
        const image = animation.getImage();   //get sprite

        if (this.invulnTime%4>=1 && this.invulnTime>0) {ctx.globalAlpha = 0.2};
        //ctx.fillRect(this.position.x+15, this.position.y, this.width, this.height) //hitbox
        //ctx.fillRect(this.curTile*80, this.position.y, 80, 80); //selected tile
        if (this.left){
            ctx.scale(-1,1);
            ctx.drawImage(image, -this.position.x-1.5*this.width-10, this.position.y);}
        else {ctx.drawImage(image, this.position.x-5, this.position.y); }
        ctx.globalAlpha = 1;
        ctx.setTransform(1,0,0,1,0,0);
        
        if (animation.shouldStop()){ //resets 
            this.state = 'stand';} 

        this.projectiles.forEach( (object)=>object.draw(ctx) ) //draw projectiles 
        //elementals 
        this.playerX = this.position.x - this.width/2 +18; 
        this.elePositions = [ [this.playerX -60, this.position.y+5], [this.playerX -40, this.position.y-35],
            [this.playerX , this.position.y-55], [this.playerX +40, this.position.y-35], [this.playerX +60, this.position.y+5] ];
        
            for (let i = 0; i<this.elementList.length; i++){ // Load elemental sprites 
                let eleType = this.elementList[i]; 
                if (!this.elementLoadedSprite[eleType]){
                    if (this.elementState[i] != 'swing1' && this.state!='jump') {
                        this.elementState[i] = this.state;
                        if (this.state == 'swing2' ||this.state == 'swing3'){this.elementState[i]='swing1'}}
                    const animation = this.elementSprites[eleType].find((animation)=>animation.isFor(this.elementState[i])) // copies player state
                    this.elementLoadedSprite[eleType] = animation.getImage();                  
                    
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

    }

    teleport(direction){
        if (this.lane - 1*direction>-1 && this.lane - 1*direction<3){
            this.position.y += this.rowHeight*direction;2
            this.lane += -1*direction; 
            this.floor =  this.gameHeight - 45 - (1+this.lane)*this.rowHeight}
    }
    update(){
        if (this.invulnTime>0){this.invulnTime--}; 
        if (this.attackCD >0){this.attackCD--};

        this.projectiles.forEach( (object)=>object.update() ); 
        this.projectiles = this.projectiles.filter(  //deletes projectiles
            function (object){return object.delete !== true; 
        });
        

        if (this.speedX!=0 && !this.attackAnim.includes(this.state)){
            this.state = 'walk'; 
        } else if (this.state == 'walk') this.state = 'stand'; 

        if (this.position.x<-30) {this.position.x = -30}; //left border
        if (this.position.x>this.gameWidth-this.width) {this.position.x = this.gameWidth-this.width;} //right border
        this.curTile = Math.floor( (this.width/2 +this.position.x)/80);

        if (this.knockbackForce>0){this.knockbackForce-=1;}
        else if (this.knockbackForce<0){this.knockbackForce+=1;}
        this.position.x += this.speedX-this.knockbackForce;
        this.position.y -= this.speedY; 
        if (this.speedY>0){
            this.speedY-=0.5; 
        }
        if (this.jump){ //gravity
            this.position.y += 1*this.gravityTime;
            this.gravityTime+=0.5; 
            if (!this.attackAnim.includes(this.state)) this.state = 'jump';
        }


        if (this.position.y > this.floor){ //bottom border (update for platforms)
            this.position.y = this.floor;
            this.speedY = 0;
            this.jump = false;
            this.gravityTime = 1; 
            if (!this.attackAnim.includes(this.state)) this.state = 'stand';
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
/* harmony import */ var _images_snowball1_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/snowball1.png */ "./src/images/snowball1.png");
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/SpriteAnimation.js");

 

class Projectile{
    constructor(player, type='None',x = 0, y=0){
        this.typeInfo = { 'None': {'speed': 10, 'travel':1, 'explode':2, 'xOff': 0},
                        'fireball': {'speed': 12, 'travel':1, 'explode':2, 'xOff': 55}, 
                        'poisonball': {'speed': 10, 'travel':2, 'explode':4, 'xOff':55},
                        'iceball': {'speed': 8, 'travel':2, 'explode':4, 'xOff':65},
                        'lightningball': {'speed': 12, 'travel':2, 'explode':7, 'xOff':60} }
        
        this.gameWidth = player.gameWidth;
        this.gameHeight = player.gameHeight;
        this.width = 25; //sprite size 
        this.height = 25; 
        this.explode = false; 
        this.delete = false; 
        this.projectile = true;
        this.touchHit= true;
        this.pierce = 1;
        this.damage = player.damage; 
        this.health =1; 
        this.side = 0; 
        this.type = type; 
        this.lane = player.lane;
        this.state = 'travel'; 
        if (this.type != "None") {this.createAnimations() }
        else {this.sprite = new Image(); 
        this.sprite.src = _images_snowball1_png__WEBPACK_IMPORTED_MODULE_0__;} 
        
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
        this.frames = 5; 
        this.travel = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"](this.type+'/travel_?.png', this.typeInfo[this.type]['travel'], this.frames, "travel"); //standing sprites; 
        this.burst = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_1__["default"](this.type+'/explode_?.png', this.typeInfo[this.type]['explode'], this.frames, "burst", true); //walking sprites; 
        this.animations = [this.travel, this.burst]; 
    }

    draw(ctx) {
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height); //reference
        if (this.type != "None"){ 
            const animation = this.animations.find((animation)=>animation.isFor(this.state))
            const image = animation.getImage();       
            if (this.explode){this.state = 'burst'}; 
            if (animation.shouldStop()){this.delete = true;}
    
            if (!this.left){//flip based on sprite orientation
                ctx.scale(-1,1);
                ctx.drawImage(image, -this.position.x- this.typeInfo[this.type]['xOff']-10, this.position.y-78);}
            else {ctx.drawImage(image, this.position.x-this.typeInfo[this.type]['xOff']+15, this.position.y-78); }

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

        if (this.position.x<-this.width) {this.delete = true };
        if (this.position.x>this.gameWidth-this.width) {this.delete = true};

        this.hitbox = [this.position.x, this.position.y, this.width, this.height]; 




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
        this.height = 170; // game.gameHeight - 3*90; 
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 3;//(this.height)
        this.padding = 25; 
        this.font = "16px arial";
        this.font2 = "24px arial";
        this.display = true; 
        this.controls = ["Stop the monsters from advancing!"," - Use (WASD) to move, (J) to jump, and (K) to shoot. Use (P) to open shop. ", 
            " - Collect the coins monsters drop before they expire", 
            " - Spend mesos on upgrades & summons to bolster your defense", 
            " - Lose lives when monsters escape or touch you", " - Game over when all lives lost!"]
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
            if (this.display || game.waveFinish){
                ctx.font = this.font2; 
                ctx.textAlign = 'center'; 
                ctx.fillText('Press [P] to resummon allies', this.gameWidth/2, this.height-5) 
                ctx.fillText('Press [O] to start wave', this.gameWidth/2, this.height + 25) 
            }

            if (this.display){
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
                for (let i=0; i<this.controls.length; i++){
                    ctx.fillText(this.controls[i], this.x+this.padding, this.y+this.padding*(1+i), this.width); 
                }
                // this.redraw(ctx); //draw start button
                //
            }   

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
        this.buttonWidth = 165;
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
        this.button10.textContent = 'Summon M. Knight';
        this.button10.value = 'mushroomKnight';
        this.buttonX1 = this.x + this.padding; 
        this.nameHash = {'redDragon':'Red Dragon', 'blueDragon':'Blue Dragon',
        'greenDragon':'Green Dragon', 'blackDragon':'Black Dragon', 'mushroomKnight': 'Mushroom Knight'};
        this.summonList = ['redDragon', 'blueDragon','greenDragon','blackDragon','mushroomKnight'];
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
       this.note = "Press [J] to buy, [P] to close menu"; 
       
       // this.buttonNext = document.createElement('button');
        // this.buttonNext.textContent = 'Next Wave!';
        // this.buttonPositions.push([this.width - 25, 5]);
        // this.buttonsList.push(this.buttonNext); 

        this.costText = [ ['', 'Upgrade Shop', '',],
                        ['#', ' Summon', 'Element'],
                        ['1', '40', '50'],
                        ['2', '80', '100'],
                        ['3', '160', '200'],
                        ['4', '320', '400'],
                        ['5+', '640', '800']];

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
        if (game){ //runs prior to initialization
            if (!game.waveFinish){buttonDraw-=1};       }
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
            game.createMob(game.player, button.value, 0); //summons ;
            if (game.playerObjects.find(obj=> (obj.type === button.value))){ //checks if created successfully 
                button.textContent = 'Upgrade '+this.nameHash[button.value]+ ' (Lvl 1)';
            }}
        else if (this.elementList.includes(button.value)){
                game.addElement(button.value); //elements
            }   
        else if (button.textContent=='Next Wave!') game.nextWave = true; //next wave button

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
        if (cost){
            ctx.fillText('('+cost+' mesos)', x+this.buttonWidth/2, y+2*this.buttonHeight/3);}
        //else { ctx.fillText('MAX', x+this.buttonWidth/2, y+2*this.buttonHeight/3);}

        ctx.beginPath(); //collision path 
        ctx.rect(x,y, this.buttonWidth, this.buttonHeight); 
        
    }

    toggleMenu(){ 
        this.display = !this.display; 
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
                    this.costWidth, this.costHeight*8.5, 3);
            ctx.stroke();
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'; 
            ctx.font =  this.font2; 

            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.lineWidth = "5"; 
            ctx.roundRect(this.buttonX1 + (this.selectionX-1)*(this.buttonWidth+ this.padding), 
                2*this.paddingY+(this.buttonHeight+this.paddingY)*(this.selectionY-1), 
                this.buttonWidth,this.buttonHeight, 3);
            ctx.stroke();

            this.selectedDescrip(); //
            ctx.font =  this.font2; 
            ctx.textAlign = 'left';
            for (let i=0; i<this.descriptionText.length; i++){
                ctx.fillText(this.descriptionText[i], this.costPosition-25,
                6*this.paddingY+(this.costPadding+this.costHeight)*i); 
            }
                
            // for (let i=0; i<this.costText.length; i++){
            //     for (let j=0; j<this.costText[i].length; j++){
            //         ctx.fillText(this.costText[i][j], this.costPosition+(this.costWidth/3)*j,
            //             5*this.paddingY+(this.costPadding+this.costHeight)*i,
            //             90); 
            // }}      

            ctx.textAlign = 'left';
            ctx.font =  this.font2; 
            ctx.fillStyle= 'black';
            ctx.fillText(this.note, this.buttonX1+10, this.height-10);

        }
        else {document.getElementById('menu').innerHTML="";}
        


            
    }



}

/***/ }),

/***/ "./src/images/snowball1.png":
/*!**********************************!*\
  !*** ./src/images/snowball1.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e43b27e9f9a400457e27.png";

/***/ }),

/***/ "./src/mobInfo.json":
/*!**************************!*\
  !*** ./src/mobInfo.json ***!
  \**************************/
/***/ ((module) => {

module.exports = JSON.parse('{"zombie":{"speed":"1","health":"2","stand":2,"walk":2,"die":10,"angry":9,"sprite":"mob","atkSpd":100,"damage":1,"value":5},"spore":{"speed":"1","health":"2","stand":2,"walk":2,"die":3,"sprite":"mob","value":1},"orangeMushroom":{"speed":"1","health":"2","stand":1,"walk":2,"die":2,"sprite":"mob","value":2},"greenMushroom":{"speed":"2","health":"1","stand":1,"walk":2,"die":2,"sprite":"mob","value":2},"blueMushroom":{"speed":"1","health":"5","stand":1,"walk":2,"die":2,"sprite":"mob","value":5},"hornyMushroom":{"speed":"2","health":"3","stand":2,"walk":2,"die":3,"sprite":"mob","value":2},"mushmom":{"speed":"1","health":"30","stand":0,"walk":5,"die":5,"angry":4,"sprite":"mob","atkSpd":100,"damage":1,"value":100},"stump":{"speed":"1","health":"5","stand":0,"walk":3,"die":2,"sprite":"mob","value":5},"darkStump":{"speed":"1","health":"10","stand":0,"walk":3,"die":2,"sprite":"mob","value":10},"axeStump":{"speed":"1","health":"15","stand":0,"walk":3,"die":3,"sprite":"mob","value":15},"ghostStump":{"speed":"1","health":"25","stand":0,"walk":3,"die":2,"sprite":"mob","value":25},"boar":{"speed":"2","health":"5","stand":0,"walk":2,"die":1,"sprite":"mob","value":10},"fireBoar":{"speed":"2.5","health":"4","stand":0,"walk":2,"die":1,"sprite":"mob","value":10},"ironBoar":{"speed":"1.5","health":"15","stand":0,"walk":1,"die":1,"sprite":"mob","value":20}}');

/***/ }),

/***/ "./src/purchase.json":
/*!***************************!*\
  !*** ./src/purchase.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"redDragon":["Summons a Red Dragon to spit hot fire","","Level up increases explosion area"],"blueDragon":["Summons a Blue Dragon to spew frost","","Level up increases projectile pierce amount"],"greenDragon":["Summons a Green Dragon to spread poison","","Level up increases projectile spread"],"blackDragon":["Summons a Black Dragon to shoot bolts","","Level up increases knockback force"],"mushroomKnight":["Summons a Mushroom Knight to stall","","Level up increases stall duration"],"Blaze":["Summons Elemental: Blaze","","Adds burning projectiles to attacks","Additional sprites further increase bonus"],"Dawn":["Summons Elemental: Dawn","","Adds explosive projectiles to attacks","Additional sprites further increase bonus"],"Night":["Summons Elemental: Night","","Increases movement speed","Adds projectile that increases damage taken","Additional sprites further increase bonus"],"Wind":["Summons Elemental: Wind","","Increases movement speed","Adds projectiles with knockback to attacks","Additional sprites further increase bonus"],"Thunder":["Summons Elemental: Dawn","","Adds piercing projectiles to attacks","Additional sprites further increase bonus"]}');

/***/ }),

/***/ "./src/summonInfo.json":
/*!*****************************!*\
  !*** ./src/summonInfo.json ***!
  \*****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"redDragon":{"speed":"0","proj":"fireball","stand":9,"walk":0,"die":0,"angry":6,"sprite":"pet","xOff":-55,"yOff":-50,"atkSpd":100,"damage":2,"value":100},"blueDragon":{"speed":"0","proj":"iceball","stand":9,"walk":0,"die":0,"angry":6,"sprite":"pet","xOff":-55,"yOff":-50,"atkSpd":75,"damage":1.5,"value":100},"greenDragon":{"speed":"0","proj":"poisonball","stand":9,"walk":0,"die":0,"angry":6,"sprite":"pet","xOff":-55,"yOff":-50,"atkSpd":50,"damage":1,"value":100},"blackDragon":{"speed":"0","proj":"poisonball","stand":9,"walk":0,"die":0,"angry":6,"sprite":"pet","xOff":-55,"yOff":-50,"atkSpd":50,"damage":1,"value":100},"mushroomKnight":{"speed":"0","health":25,"stand":5,"walk":0,"die":0,"angry":10,"sprite":"mob","atkSpd":200,"damage":5,"value":100,"xOff":-135,"yOff":-40}}');

/***/ }),

/***/ "./src/waveInfo.json":
/*!***************************!*\
  !*** ./src/waveInfo.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"level1":["wave1-0"],"level2":["wave2-0"],"wave1-0":[["spore",2,1]],"wave2-0":[["stump",2,1]],"wave1-1":[["spore",2,2],["spore",2,3],["spore",2,4],["spore",2,5],["spore",2,6],["spore",3,10],["spore",3,11],["spore",3,12],["spore",3,13],["spore",3,14],["spore",1,18],["spore",1,19],["spore",1,20],["spore",1,21],["spore",1,22]],"wave1-2":[["orangeMushroom",2,2],["spore",2,3],["orangeMushroom",2,5],["spore",2,6],["orangeMushroom",3,10],["spore",3,11],["orangeMushroom",3,13],["spore",3,14],["orangeMushroom",1,18],["spore",1,19],["orangeMushroom",1,21],["spore",1,22],["orangeMushroom",2,24],["orangeMushroom",2,26],["orangeMushroom",2,28]],"wave1-3":[["greenMushroom",2,2],["orangeMushroom",2,4],["orangeMushroom",2,5],["orangeMushroom",2,6],["greenMushroom",3,10],["orangeMushroom",3,12],["orangeMushroom",3,13],["orangeMushroom",3,14],["greenMushroom",1,18],["orangeMushroom",1,20],["orangeMushroom",1,21],["orangeMushroom",1,22],["greenMushroom",3,24],["greenMushroom",2,25],["greenMushroom",1,26],["greenMushroom",3,27],["greenMushroom",2,28],["greenMushroom",1,29]],"wave1-4":[["blueMushroom",2,2],["orangeMushroom",2,4],["orangeMushroom",2,5],["orangeMushroom",2,6],["blueMushroom",2,10],["greenMushroom",3,12],["greenMushroom",3,13],["orangeMushroom",3,14],["orangeMushroom",3,15],["spore",3,16],["spore",3,17],["spore",3,18],["blueMushroom",2,18],["greenMushroom",1,19],["greenMushroom",1,20],["orangeMushroom",1,21],["orangeMushroom",1,22],["spore",1,23],["spore",1,24],["spore",1,25],["blueMushroom",[1,2,3],30]],"wave1-5":[["spore",1,2],["orangeMushroom",2,2],["greenMushroom",3,2],["blueMushroom",1,5],["hornyMushroom",2,5],["mushmom",3,5],["stump",1,8],["darkStump",2,8],["axeStump",3,8],["ghostStump",1,12],["boar",2,12],["fireBoar",3,12],["ironBoar",3,15]]}');

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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

let game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](gameWidth, gameHeight)
game.start(); //creates game objects; 
let lastTime = 0 ; //initialize time
// setTimeout(()=> {game.fadeOut = true}, "3000")

function gameLoop(timestamp){
    //let deltaTime = timestamp - lastTime; 
    ///lastTime = timestamp; 
    ctx.clearRect(0,0, gameWidth, gameHeight); //refresh screen
    //console.log(timestamp);
    game.update(timestamp);
    game.nextWaveLoader(timestamp); //loads wave list
    game.waveLoader(timestamp); // loads each mob from wave list
    game.drawGrid(ctx);
    game.draw(ctx); 
    game.upgradeMenu(ctx)
    game.waveClear();
    game.nextLevelLoader();
    
    game.screenTransition(ctx);
       
    

    requestAnimationFrame(gameLoop); 

}

requestAnimationFrame(gameLoop); 

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7QUNmMEI7OztBQUcxQixvREFBb0Q7QUFDcEQsbUNBQW1DOztBQUVuQztBQUNBOztBQUVBLGVBQWUsNkNBQUk7QUFDbkIsY0FBYztBQUNkLG1CQUFtQjtBQUNuQixvQkFBb0Isb0JBQW9COztBQUV4QztBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLG9DQUFvQztBQUNwQyxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL0hVRC5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvU3ByaXRlQW5pbWF0aW9uLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9pbWcuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2lucHV0LmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9tb2IuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL21vbmV5LmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL3N0YXJ0U2NyZWVuLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy91cGdyYWRlLmpzIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FyY2FkZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFVEe1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgMTUwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDc1OyBcbiAgICAgICAgdGhpcy54ID0gMDsgXG4gICAgICAgIHRoaXMueSA9IDA7IFxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAyMDsgXG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTZweCBhcmlhbFwiO1xuICAgIH1cblxuICAgIGRpc3BsYXlIVUQoY3R4LCBnYW1lKXtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gXCI1XCI7IFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JzsgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSdibGFjayc7XG4gICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuXG4gICAgICAgIHRoaXMubGl2ZXMgPSBcIkxpdmVzOiBcIiArIGdhbWUucGxheWVyLmhlYWx0aDsgXG4gICAgICAgIHRoaXMubW9uZXkgPSBcIk1lc29zOiBcIiArIGdhbWUucGxheWVyLm1vbmV5O1xuICAgICAgICB0aGlzLnN0YWdlID0gXCJXYXZlOiBcIiArIGdhbWUubGV2ZWwgKyAnLScgKyBnYW1lLndhdmU7IFxuICAgICAgICB0aGlzLnRleHQgPSBbdGhpcy5saXZlcywgdGhpcy5tb25leSwgdGhpcy5zdGFnZV07IFxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudGV4dC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy50ZXh0W2ldLCB0aGlzLngrdGhpcy5wYWRkaW5nLCB0aGlzLnkrdGhpcy5wYWRkaW5nKigxK2kpLCB0aGlzLndpZHRoKTsgXG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsImltcG9ydCBpbWcgZnJvbSAnLi9pbWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVBbmltYXRpb257XG4gICAgaW1hZ2VzID0gW107XG4gICAgY29uc3RydWN0b3IoZmlsZU5hbWUsIG51bWJlck9mSW1hZ2VzLCB0aW1lckNvdW50LCBzdGF0ZSwgc3RvcCl7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPD1udW1iZXJPZkltYWdlczsgaSsrKXsgLy8gbG9hZHMgaW1hZ2VzIGludG8gYXJyYXkgXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGltZyhmaWxlTmFtZS5yZXBsYWNlKFwiP1wiLCBpKSk7IFxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChpbWFnZSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50aW1lckNvdW50ID0gdGltZXJDb3VudDtcbiAgICAgICAgdGhpcy50aW1lckNvdW50RGVmYXVsdCA9IHRoaXMudGltZXJDb3VudDsgXG4gICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7IFxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7IFxuICAgICAgICB0aGlzLnN0b3AgPSBzdG9wOyBcbiAgICB9XG4gICAgXG4gICAgaXNGb3Ioc3RhdGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gc3RhdGU7IFxuICAgIH1cblxuICAgIHJlc2V0KCl7IC8vIGxvb3AgYW5pbWF0aW9uXG4gICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7ICAgXG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKXsgIC8vcmV0dXJucyBmcmFtZVxuICAgICAgICB0aGlzLnNldEltYWdlSW5kZXgoKTsgXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlc1t0aGlzLmltYWdlSW5kZXhdOyBcbiAgICB9XG5cbiAgICBzZXRJbWFnZUluZGV4KCl7XG4gICAgICAgIHRoaXMudGltZXJDb3VudC0tO1xuICAgICAgICBpZiAodGhpcy50aW1lckNvdW50IDw9IDAgJiYgIXRoaXMuc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgIHRoaXMudGltZXJDb3VudD0gdGhpcy50aW1lckNvdW50RGVmYXVsdDsgXG4gICAgICAgICAgICB0aGlzLmltYWdlSW5kZXgrKzsgXG4gICAgICAgICAgICBpZiAodGhpcy5pbWFnZUluZGV4ID49IHRoaXMuaW1hZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUluZGV4ID0gMDsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRTdG9wKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3AgICYmIHRoaXMuaW1hZ2VJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoLTFcbiAgICB9XG59XG4iLCJpbXBvcnQgSW5wdXRIYW5kbGVyIGZyb20gJy4vaW5wdXQnOyBcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInOyBcbmltcG9ydCBNb2IgZnJvbSAnLi9tb2InO1xuaW1wb3J0IFVwZ3JhZGUgZnJvbSAnLi91cGdyYWRlJzsgXG5pbXBvcnQgTW9uZXkgZnJvbSAnLi9tb25leSc7IFxuaW1wb3J0IHN0YXJ0U2NyZWVuIGZyb20gJy4vc3RhcnRTY3JlZW4nOyBcbmltcG9ydCBIVUQgZnJvbSAnLi9IVUQnOyBcbmltcG9ydCBpbWcgZnJvbSAnLi9pbWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1le1xuICAgIGNvbnN0cnVjdG9yKGdhbWVXaWR0aCwgZ2FtZUhlaWdodCl7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLmxvYWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzID1bXTtcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzID1bXTsgXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gW107IFxuICAgICAgICB0aGlzLmxldmVsID0gMTsgXG4gICAgICAgIHRoaXMud2F2ZSA9IDA7IFxuICAgICAgICB0aGlzLmxhbmUgPSAxOyBcbiAgICAgICAgdGhpcy5iZ1NreSA9IGltZygnYmcvYmdTa3knK3RoaXMubGV2ZWwrJy5wbmcnKTtcbiAgICAgICAgdGhpcy5iZ1N0YWdlID0gaW1nKCdiZy9iZ1N0YWdlJyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2F2ZUluZm8gPSByZXF1aXJlKCcuL3dhdmVJbmZvLmpzb24nKTtcbiAgICAgICAgdGhpcy5sZXZlbExpc3QgPSB0aGlzLndhdmVJbmZvWydsZXZlbCcrdGhpcy5sZXZlbF07Ly97MTogWyd3YXZlMS01JywgJ3dhdmUxLTEnXX0gLy9KU09OXG4gICAgICAgIHRoaXMud2F2ZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy50b0xvYWQgPVtdOyBcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSA5MDsgXG4gICAgICAgIHRoaXMubmV4dFdhdmUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IHRydWU7IFxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gMDsgXG4gICAgICAgIHRoaXMuZmFkZSA9IDE7XG4gICAgICAgIHRoaXMuZmFkZUluID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mYWRlT3V0ID0gZmFsc2UgO1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBbXTsgXG4gICAgfVxuXG4gICAgd2F2ZUNsZWFyKCl7IC8vIGNoZWNrcyBpZiB3YXZlIGlzIGNsZWFyZWRcbiAgICAgICAgaWYgKCF0aGlzLm5leHRXYXZlICYmIHRoaXMud2F2ZVN0YXJ0ICYmIFxuICAgICAgICAgICAgdGhpcy50b0xvYWQubGVuZ3RoID09IDAgICYmIHRoaXMubW9iT2JqZWN0cy5sZW5ndGg9PTAgKXtcbiAgICAgICAgICAgIC8vdGhpcy51cGdyYWRlLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IHRydWU7IFxuICAgICAgICAgICAgLy90aGlzLnVwZ3JhZGUuZGlzcGxheU1lbnUoY3R4KTtcbiAgICAgICAgfSBcbiAgICB9XG4gICAgbmV4dExldmVsTG9hZGVyKCl7XG4gICAgICAgIGlmICh0aGlzLmxldmVsTGlzdC5sZW5ndGggPT0gMCAmJiB0aGlzLndhdmVGaW5pc2gpe1xuICAgICAgICAgICAgLy9zcGVjaWFsIGxldmVsIGNsZWFyIGJhbm5lclxuXG4gICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy53YXZlRmluaXNoID0gZmFsc2U7IFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQgPSB0cnVlfSwgXCIyMDAwXCIpIC8vIGZhZGUgb3V0IHRyYW5zaXRpb25cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7IC8vbG9hZCBuZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbExpc3QgPSB0aGlzLndhdmVJbmZvWydsZXZlbCcrdGhpcy5sZXZlbF07IC8vIGxvYWQgbmV4dCBsZXZlbCB3YXZlc1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZSA9IDA7ICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpOyAvL3JlbG9hZCBCRyBhcnQgXG4gICAgICAgICAgICAgICAgdGhpcy5iZ1N0YWdlID0gaW1nKCdiZy9iZ1N0YWdlJyt0aGlzLmxldmVsKycucG5nJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSBbXTsgLy9jbGVhciBmbG9vciBtb25leSBcbiAgICAgICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IHRydWU7IFxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uID0ge3g6MjUsIHk6dGhpcy5nYW1lSGVpZ2h0LTQ1LTIqdGhpcy5yb3dIZWlnaHR9O1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5mbG9vciA9ICB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtIDIqdGhpcy5yb3dIZWlnaHRcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSB0aGlzLnBsYXllck9iamVjdHMuc3BsaWNlKDEpOyAgLy9wdXNoZXMgZXZlcnl0aGluZyBleHBlY3QgcGxheWVyXG4gICAgICAgICAgICAgICAgLy9mb3IgKGxldCBpPTE7IGk8dGhpcy5wbGF5ZXJPYmplY3RzLmxlbmd0aDtpKysgKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5wbGF5ZXIubW9uZXkgKz0gdGhpcy5wbGF5ZXJPYmplY3RzW2ldLnZhbHVlOyAvL3JlZnVuZCB2YWx1ZVxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnBsYXllck9iamVjdHNbaV0gPSBudWxsOyBcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAvL3RoaXMuLy9yZWZ1bmRzIHBsYXllclxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgXCI0MDAwXCIpOyBcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dFdhdmVMb2FkZXIodGltZSApe1xuICAgICAgICBpZiAodGhpcy5uZXh0V2F2ZSl7IC8vbG9hZCBuZXh0IHdhdmUgZGF0YSBmcm9tIEpTT05cbiAgICAgICAgICAgIHRoaXMud2F2ZUxpc3QgPSB0aGlzLndhdmVJbmZvW3RoaXMubGV2ZWxMaXN0LnNoaWZ0KCldOyAvL1xuICAgICAgICAgICAgdGhpcy5nYW1lVGltZSA9IHRpbWU7IC8vdXBkYXRlIHRpbWUgXG4gICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlOyBcbiAgICAgICAgICAgIHRoaXMud2F2ZSArKzsgXG4gICAgICAgICAgICB0aGlzLm5leHRXYXZlID0gZmFsc2U7IFxuICAgICAgICAgICAgdGhpcy51cGdyYWRlLmRpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IGZhbHNlOyBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcmVlblRyYW5zaXRpb24oY3R4KXtcbiAgICAgICAgaWYgKHRoaXMuZmFkZUluKXsgLy9mYWRlIGluIFxuICAgICAgICAgICAgaWYgKHRoaXMuZmFkZT4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZhZGUgLT0gMC4wMjsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFkZSA8PSAwKSB7dGhpcy5mYWRlSW4gPSBmYWxzZTt9XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZhZGVPdXQpeyAvL2ZhZGUgdG8gYmxhY2tcbiAgICAgICAgICAgIGlmICh0aGlzLmZhZGUgPCAxKXsgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5mYWRlICs9IDAuMDI7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhZGUgPj0gMSkgeyBcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFkZUluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFkZU91dCA9IGZhbHNlO30sIFwiMTUwMFwiKX1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmFkZUluIHx8IHRoaXMuZmFkZU91dCl7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5mYWRlOyBcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLmdhbWVXaWR0aCwgdGhpcy5nYW1lSGVpZ2h0KTsgXG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgd2F2ZUxvYWRlcih0aW1lKXsvL2xvYWRzIGVhY2ggbW9iIGZyb20gd2F2ZUxpc3RcbiAgICAgICAgaWYgKHRoaXMudG9Mb2FkLmxlbmd0aCA9PSAwICYmIHRoaXMud2F2ZUxpc3QubGVuZ3RoPjApIHRoaXMudG9Mb2FkID0gdGhpcy53YXZlTGlzdC5zaGlmdCgpOyBcbiAgICAgICAgaWYgKHRoaXMudG9Mb2FkWzJdIDw9ICAodGltZSAtIHRoaXMuZ2FtZVRpbWUpLzEwMDAgKXtcbiAgICAgICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gdHJ1ZTsgXG4gICAgICAgICAgICBpZiAodGhpcy50b0xvYWRbMV0ubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnRvTG9hZFsxXS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZSA9IHRoaXMudG9Mb2FkWzFdW2ldOyAvL3NldHMgbGFuZSB0byBsb2FkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9iKHRoaXMsIHRoaXMudG9Mb2FkWzBdLCAxKTt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubGFuZSA9IHRoaXMudG9Mb2FkWzFdLTE7IC8vc2V0cyBsYW5lIHRvIGxvYWRcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vYih0aGlzLCB0aGlzLnRvTG9hZFswXSwgMSk7fVxuICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMudG9Mb2FkID0gW107IFxuICAgICAgICB9XG4gICAgfSAgICBcbiAgICBcbiAgICBhZGRFbGVtZW50KGVsZW1lbnQpeyAvL3VwZ3JhZGUgc2hvcCBcbiAgICAgICBpZiAodGhpcy5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoPDUpe1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLm1vbmV5PiB0aGlzLnBsYXllci5lbGVtZW50Q29zdFswXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW9uZXkgLT0gdGhpcy5wbGF5ZXIuZWxlbWVudENvc3RbdGhpcy5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5lbGVtZW50TGlzdC5wdXNoKGVsZW1lbnQpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5lbGVtZW50YWxzKCk7IC8vbG9hZCBzcHJpdGVzXG4gICAgICAgICAgICAgICAgLy90aGlzLmVsZW1lbnRDb3N0LnNoaWZ0KCk7ICAvL2RlbGV0ZSBjb3N0IFxuICAgICAgICAgICAgfVxuICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN1bW1vbih0eXBlKXtcbiAgICAgICAgbGV0IHRyYW5zZmVyID0gdGhpcy5zdG9yYWdlLmZpbmRJbmRleChvYmo9Pm9iai50eXBlID09PSB0eXBlKTsgXG4gICAgICAgIHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0ucG9zaXRpb24ueCA9ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yO1xuICAgICAgICB0aGlzLnN0b3JhZ2VbdHJhbnNmZXJdLnBvc2l0aW9uLnkgPSAodGhpcy5wbGF5ZXIuZmxvb3IrMzApOyBcblxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMucHVzaCh0aGlzLnN0b3JhZ2VbdHJhbnNmZXJdKTsgXG4gICAgICAgIHRoaXMuc3RvcmFnZVt0cmFuc2Zlcl0gPSAnJztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wbGF5ZXJPYmplY3RzKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0b3JhZ2UpOyBcbiAgICB9XG4gICAgY3JlYXRlTW9iKHBhcmVudCwgdHlwZSwgc2lkZSl7XG4gICAgICAgIGlmIChzaWRlID09PSAwKXsgLy9TdW1tb24gdW5pdFxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnBvc2l0aW9uLnktMzAgPT09IHRoaXMucGxheWVyLmZsb29yKSAmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JykpKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgY29zdCA9IDEwMDA7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5zdW1tb25Db3N0W3RoaXMucGxheWVyLnN1bW1vbkNvdW50XSl7IFxuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gdGhpcy5wbGF5ZXIuc3VtbW9uQ29zdFt0aGlzLnBsYXllci5zdW1tb25Db3VudF07IFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIubW9uZXk+PWNvc3Qpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYihwYXJlbnQsIHR5cGUsIDApKSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm1vbmV5IC09IGNvc3Q7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc3VtbW9uQ291bnQgKys7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UoY29uc29sZS5sb2coJ29jY3VwaWVkJykpOyBcblxuICAgICAgICB9IGVsc2Uge3RoaXMubW9iT2JqZWN0cy5wdXNoKG5ldyBNb2IocGFyZW50LCB0eXBlLCAxKSl9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGxvYWRCRygpe1xuICAgICAgICB0aGlzLmJnU2t5ID0gaW1nKCdiZy9iZ1NreScrdGhpcy5sZXZlbCsnLnBuZycpOyAvL2xvYWQgc2t5IGJnXG4gICAgfVxuXG4gICAgc3RhcnQoKXtcbiAgICAgICAgdGhpcy5zdGFydE1lbnUgPSBuZXcgc3RhcnRTY3JlZW4odGhpcyk7XG4gICAgICAgIHRoaXMuc3RhcnRNZW51LmluaXRpYWxpemUodGhpcyk7IFxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcyk7XG4gICAgICAgIHRoaXMudXBncmFkZSA9IG5ldyBVcGdyYWRlKHRoaXMpOyBcbiAgICAgICAgdGhpcy51cGdyYWRlLmluaXRpYWxpemUodGhpcyk7IFxuICAgICAgICB0aGlzLkhVRE1lbnUgPSBuZXcgSFVEKHRoaXMpOyBcbiAgICAgICAgbmV3IElucHV0SGFuZGxlcih0aGlzLnBsYXllciwgdGhpcy51cGdyYWRlLCB0aGlzKTsgICAgICAgIFxuICAgICAgICB0aGlzLnBsYXllck9iamVjdHMgPSBbdGhpcy5wbGF5ZXJdO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KXsgLy9ydW5zIGRyYXcgZnVuY3Rpb24gZm9yIG9iamVjdCBsaXN0IFxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmdTa3ksIDAsIDApOyBcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJnU3RhZ2UsIDAsIDApOyBcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgpIClcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgpIClcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC5kcmF3KGN0eCkgKTsgXG4gICAgXG4gICAgfSBcblxuICAgIGtub2NrYmFjayhvYmosIGRpcmVjdGlvbil7XG4gICAgICAgIGlmIChvYmoubmFtZSA9PSdXaXonKXsgLy9vbmx5IHBsYXllciBwb3BzIHVwXG4gICAgICAgICAgICBvYmouanVtcCA9IHRydWU7XG4gICAgICAgICAgICBvYmouaW52dWxuVGltZSA9IDEwMDsgXG4gICAgICAgICAgICBvYmouc3BlZWRZICs9IDQ7fVxuICAgIFxuICAgICAgICBvYmouaGl0ID0gdHJ1ZTsgXG4gICAgICAgIG9iai5rbm9ja2JhY2tGb3JjZSA9IC01KmRpcmVjdGlvbjsgLy9hZGQgYXMgc3RhdFxuICAgIH1cbiAgICBhZ2dybyhvYmoxLCBvYmoyKXsgLy8gY2hlY2tzIGlmIG9iajEgcmFuZ2UgaXMgd2l0aGluIG9iajJcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmhlYWx0aD4wKXtcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0rb2JqMS5yYW5nZT50YXJnZXQuaGl0Ym94WzBdICYmIFxuICAgICAgICAgICAgICAgICAgICBvYmoxLmhpdGJveFswXS1vYmoxLnJhbmdlPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSl7IC8vYWdncm8gZnJvbSByaWdodFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFsxXStvYmoxLmhpdGJveFszXS8yPnRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV0rb2JqMS5oaXRib3hbM10vMjx0YXJnZXQuaGl0Ym94WzFdK3RhcmdldC5oaXRib3hbM10pXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAob2JqMS5sYW5lID09IG9iajIubGFuZSkgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpZiAob2JqMS5hZ2dybyl7b2JqMS5hdHRhY2soKX07IC8vb25seSBhZ2dybyBtb2JzIGhhdmUgYXR0YWNrIGFuaW1hdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgfVxuICAgIFxuICAgIGxvb3RNb25leShvYmoxLCBvYmoyKXtcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7XG4gICAgICAgICAgICBpZiAoIChvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdICYmIG9iajEuaGl0Ym94WzBdK29iajEuaGl0Ym94WzJdPiB0YXJnZXQuaGl0Ym94WzBdKSB8fCAvL29iajEgb24gbGVmdFxuICAgICAgICAgICAgICAgIChvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT50YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gJiYgXG4gICAgICAgICAgICAgICAgb2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICkpeyAvL29iajEgb24gcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSAmJiBvYmoxLmhpdGJveFsxXStvYmoxLmhpdGJveFszXT50YXJnZXQuaGl0Ym94WzFdKXtcbiAgICAgICAgICAgICAgICAgICAgb2JqMS5tb25leSArPSB0YXJnZXQudmFsdWU7IFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmoxLm1vbmV5KTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmRlbGV0ZSA9IHRydWU7Ly90cnVlOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG5cbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMgPSB0aGlzLm1vbmV5T2JqZWN0cy5maWx0ZXIoICAvL3JlbW92ZXMgbG9vdGVkIGNvaW5zXG4gICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QuZGVsZXRlID09IGZhbHNlOyB9KTsgICAgIFxuICAgIH1cblxuXG4gICAgY29sbGlzaW9uKG9iajEsIG9iajIpeyAvLyBjaGVja3MgaWYgb2JqMSBpcyBoaXR0aW5nIG9iajIgXG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIG9iajIpe1xuICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldCk7XG4gICAgICAgICAgICBpZiAob2JqMS5oZWFsdGg+MCAmJiB0YXJnZXQuaGVhbHRoPjApe1xuICAgICAgICAgICAgICAgIGlmICggKG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0gJiYgb2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0+IHRhcmdldC5oaXRib3hbMF0pIHx8IC8vb2JqMSAtPnRhcmdldFxuICAgICAgICAgICAgICAgICAgICAob2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0+dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICYmIFxuICAgICAgICAgICAgICAgICAgICBvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gKSl7IC8vIHRhcmdldCA8LSBvYmoxXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEuaGl0Ym94WzFdPnRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSt0YXJnZXQuaGl0Ym94WzNdKXsgLy95LWJvdW5kaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5wcm9qZWN0aWxlICYmICFvYmoxLmV4cGxvZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuZXhwbG9kZSA9IHRydWU7IC8vZGVzdHJveSBwcm9qZWN0aWxlICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvYmoxLnByb2plY3RpbGUpIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICBkYW1hZ2VDYWxjKG9iajEsIG9iajIpeyAvL29iajEgYXR0YWNraW5nIG9iajJcbiAgICAgICAgaWYgKG9iajIuaW52dWxuVGltZSA9PSAwICYmIG9iajEudG91Y2hIaXQpIHtcbiAgICAgICAgICAgIG9iajIuaGVhbHRoIC09IChvYmoxLmRhbWFnZS1vYmoyLmFybW9yKTtcbiAgICAgICAgICAgIG9iajIua25vY2tiYWNrU3VtICs9IChvYmoxLmRhbWFnZS1vYmoyLmFybW9yKVxuICAgICAgICAgICAgaWYgKG9iajIua25vY2tiYWNrVGhyZXNoIDw9IG9iajIua25vY2tiYWNrU3VtKXtcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5wb3NpdGlvbi54Pm9iajIucG9zaXRpb24ueCl7IHRoaXMua25vY2tiYWNrKG9iajIsIDEpfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5rbm9ja2JhY2sob2JqMiwgLTEpO1xuICAgICAgICAgICAgICAgIG9iajIua25vY2tiYWNrU3VtID0gMCBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cblxuICAgIH1cbiAgICBsb3NlTGlmZSgpe1xuICAgICAgICBmb3IgKGNvbnN0IG9iaiBvZiB0aGlzLm1vYk9iamVjdHMpe1xuICAgICAgICAgICAgaWYgKG9iai5wb3NpdGlvbi54IDw9IC1vYmoud2lkdGgqMil7XG4gICAgICAgICAgICAgICAgb2JqLmFsaXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaGVhbHRoIC09IDE7IFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGxheWVyLmhlYWx0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBkcmF3R3JpZChjdHgpe1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7ICAvLyB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lSGVpZ2h0XG4gICAgICAgIGN0eC5tb3ZlVG8oMCwgdGhpcy5nYW1lSGVpZ2h0KTtcbiAgICAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQpO1xuICAgICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KTtcbiAgICAgICAgY3R4LmxpbmVUbygwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCk7XG4gICAgICAgIGN0eC5saW5lVG8oMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQqMik7XG4gICAgICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQqMik7XG4gICAgICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQqMyk7XG4gICAgICAgIGN0eC5saW5lVG8oMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQqMyk7ICAgICAgICBcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHVwZ3JhZGVNZW51KGN0eCl7XG4gICAgICAgIHRoaXMuSFVETWVudS5kaXNwbGF5SFVEKGN0eCwgdGhpcyk7IFxuICAgICAgICB0aGlzLnN0YXJ0TWVudS5kaXNwbGF5TWVudShjdHgsIHRoaXMgKTsgXG4gICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5TWVudShjdHgsIHRoaXMpO1xuICAgIH1cbiAgICBzcGF3bk1vbmV5KG9iail7XG4gICAgICAgIGlmIChvYmouc3RhdGUgPT0gJ2RpZScgJiYgIW9iai5sb290RHJvcCl7XG4gICAgICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5wdXNoKG5ldyBNb25leShvYmopKVxuICAgICAgICAgICAgb2JqLmxvb3REcm9wID0gdHJ1ZTsgXG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlKHRpbWUpe1xuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuc3Bhd25Nb25leShvYmplY3QpKTsgXG4gICAgICAgIHRoaXMubG9zZUxpZmUoKTsgLy9lbmVtaWVzIHBhc3QgXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cyA9IHRoaXMubW9iT2JqZWN0cy5maWx0ZXIoICAvL3JlbW92ZXMgZGVhZC9wYXNzaW5nIG9iamVjdHNcbiAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3QuYWxpdmUgIT09IGZhbHNlO30pOyAgICAgICAgXG4gICAgICAgIHRoaXMubG9vdE1vbmV5KHRoaXMucGxheWVyLCB0aGlzLm1vbmV5T2JqZWN0cyk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKCkgKTsgXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSgpICk7IFxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSgpICk7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLmFnZ3JvKG9iamVjdCwgdGhpcy5tb2JPYmplY3RzKSApOyBcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLmFnZ3JvKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyBcblxuICAgICAgICB0aGlzLmNvbGxpc2lvbih0aGlzLnBsYXllciwgdGhpcy5tb2JPYmplY3RzKTsgXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+dGhpcy5jb2xsaXNpb24ob2JqZWN0LCB0aGlzLnBsYXllck9iamVjdHMpICk7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5cbiAgICAgICAgICAgIG9iamVjdC5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0Mik9PiBcbiAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb24ob2JqZWN0MiwgdGhpcy5tb2JPYmplY3RzKVxuICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgKTsgXG5cbiAgICB9XG4gICBcblxuICAgIFxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltZyhmaWxlKXtcclxuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7IFxyXG4gICAgaW1hZ2Uuc3JjID0gJ2ltYWdlcy8nK2ZpbGU7IFxyXG4gICAgcmV0dXJuIGltYWdlOyBcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dEhhbmRsZXJ7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCB1cGdyYWRlLCBHYW1lKXtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT57ICAgIFxuICAgICAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpeyAvL2E6NjU7IHM6ODM7IGQ6NjgsIHc6IDg3O1xuICAgICAgICAgICAgICAgIGNhc2UgNjU6IC8vQSBtb3ZlIGxlZnQgXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25YPjEpe3VwZ3JhZGUuc2VsZWN0aW9uWC09MX07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNwZWVkWCA9IC1wbGF5ZXIuc3BlZWQ7IFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmxlZnQgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDY4OiAvL0QgbW92ZSByaWdodFxuICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgICAgICBpZih1cGdyYWRlLnNlbGVjdGlvblg8Mil7dXBncmFkZS5zZWxlY3Rpb25YKz0xfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc3BlZWRYID0gcGxheWVyLnNwZWVkOyBcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmxlZnQgPSBmYWxzZTt9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA4NzogLy9XIHRlbGVwb3J0IHVwXG4gICAgICAgICAgICAgICAgaWYgKHVwZ3JhZGUuZGlzcGxheSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHVwZ3JhZGUuc2VsZWN0aW9uWT4xKXt1cGdyYWRlLnNlbGVjdGlvblktPTF9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7cGxheWVyLnRlbGVwb3J0KC0xKTt9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSA4MzogLy9TIHRlbGVwb3J0IGRvd25cbiAgICAgICAgICAgICAgICBpZiAodXBncmFkZS5kaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgaWYodXBncmFkZS5zZWxlY3Rpb25ZPDUpe3VwZ3JhZGUuc2VsZWN0aW9uWSs9MX07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtwbGF5ZXIudGVsZXBvcnQoMSk7fVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG5cbiAgICAgICAgICAgICAgICBjYXNlIDc0OiAgLy9KIFxuICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlLmRpc3BsYXkpe3VwZ3JhZGUucHVyY2hhc2UoR2FtZSl9ICAgIFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFwbGF5ZXIuanVtcCl7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5zcGVlZFkgPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmp1bXAgPSB0cnVlO31cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnanVtcFshJylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWsgXG5cbiAgICAgICAgICAgICAgICBjYXNlIDc1OiAvL0tcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmF0dGFjaygpO1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSA3OTogLy9PXG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLndhdmVGaW5pc2gpe0dhbWUubmV4dFdhdmUgPSB0cnVlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUuc3RhcnRNZW51LmRpc3BsYXkgPSBmYWxzZX07IFxuICAgICAgICAgICAgICAgIGNhc2UgOTY6XG4gICAgICAgICAgICAgICAgICAgIHVwZ3JhZGUudG9nZ2xlTWVudSgpOyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDgwOiBcbiAgICAgICAgICAgICAgICB1cGdyYWRlLnRvZ2dsZU1lbnUoKTsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDk3OiAvLzFcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAncmVkRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSA5ODogLy8yXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ2JsdWVEcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDk5OiAvLzNcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAnZ3JlZW5EcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDogLy80XG4gICAgICAgICAgICAgICAgICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ211c2hyb29tS25pZ2h0JywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT57ICAgIFxuICAgICAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpeyAvL2E6NjU7IHM6ODM7IGQ6NjgsIHc6IDg3O1xuICAgICAgICAgICAgICAgIGNhc2UgNjU6ICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5zcGVlZFg8MCkgcGxheWVyLnNwZWVkWCA9IDA7IFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLnNwZWVkWD4wKSBwbGF5ZXIuc3BlZWRYID0gMDsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5pbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9ie1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHR5cGUsIHNpZGUpe1xuICAgICAgICB0aGlzLnNpZGUgPSBzaWRlO1xuICAgICAgICBpZiAodGhpcy5zaWRlID09IDApe3RoaXMudHlwZUluZm8gPSByZXF1aXJlKCcuL3N1bW1vbkluZm8uanNvbicpIH1cbiAgICAgICAgZWxzZSAodGhpcy50eXBlSW5mbyA9IHJlcXVpcmUoJy4vbW9iSW5mby5qc29uJykpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgXG4gICAgICAgICBcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsndmFsdWUnXTsgXG4gICAgICAgIHRoaXMubG9vdERyb3AgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAxOyBcbiAgICAgICAgdGhpcy5mYWRlID0gMTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmFsaXZlID0gdHJ1ZTsgIFxuICAgICAgICB0aGlzLmludnVsblRpbWUgPSAgMDsgXG4gICAgICAgIHRoaXMuYXR0YWNrQ0QgPSAwOyBcbiAgICAgICAgdGhpcy5tYXhTcGVlZCA9IDE1OyBcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgICAgIHRoaXMudG91Y2hIaXQgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tGb3JjZSA9IDA7IFxuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3ByaXRlJ107IFxuICAgICAgICAvL3RoaXMuZGFtYWdlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkYW1hZ2UnXTsgXG4gICAgICAgIHRoaXMuYXR0YWNrU3BlZWQgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2F0a1NwZCddOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3BlZWRYID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcGVlZCddO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7IFxuICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTtcbiAgICAgICAgdGhpcy5sYW5lID0gZ2FtZS5sYW5lOyAgLy8gd2hpY2ggbGFuZVxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDEpeyAvL0VuZW15IE1vYiBcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSA1MDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gODA7IFxuICAgICAgICAgICAgdGhpcy5yYW5nZSA9IDUwO1xuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWFsdGgnXTtcbiAgICAgICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5oZWFsdGg7IFxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhbGsnO1xuICAgICAgICAgICAgdGhpcy54T2ZmPS03MDtcbiAgICAgICAgICAgIHRoaXMueU9mZj0tOTU7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiAocmlnaHRzaWRlKVxuICAgICAgICAgICAgICAgIHg6IHRoaXMuZ2FtZVdpZHRoLTEwMCwgXG4gICAgICAgICAgICAgICAgeTogdGhpcy5nYW1lSGVpZ2h0IC0gOTUgLSA5MCpnYW1lLmxhbmUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIFBDIHBldHNcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSA1MDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7IFxuICAgICAgICAgICAgdGhpcy5yYW5nZSA9IDU1MDtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gMTsgXG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMTsgXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJ1xuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gZmFsc2U7IFxuICAgICAgICAgICAgdGhpcy55T2ZmPTA7XG4gICAgICAgICAgICB0aGlzLnhPZmY9MDtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogKGdhbWUuY3VyVGlsZSo4MCkrZ2FtZS53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IGdhbWUuZmxvb3IrMzBcbiAgICAgICAgfX07ICAvL29mZnNldCBmb3Igc3ByaXRlcyBcbiAgICAgICAgLy9pZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pICh0aGlzLnBvc2l0aW9uLnkgLT10aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXSkgO1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkYW1hZ2UnXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RhbWFnZSddXG4gICAgICAgICAgICAgICAgdGhpcy5hZ2dybyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIHt0aGlzLmRhbWFnZT0xOyB0aGlzLmFnZ3JvPWZhbHNlfTtcblxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pe3RoaXMueU9mZiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddfVxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd4T2ZmJ10pe3RoaXMueE9mZiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneE9mZiddfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tUaHJlc2ggPSBNYXRoLmZsb29yKHRoaXMubWF4SGVhbHRoIC8gMTApO1xuICAgICAgICB0aGlzLmtub2NrYmFja1N1bSA9IDAgIFxuICAgICAgICB0aGlzLmhpdCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7IFxuICAgIH1cblxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXsgLy9pbXBvcnQgc3ByaXRlcyBcbiAgICAgICAgdGhpcy5mcmFtZXMgPSAzMDsgXG4gICAgICAgIGlmICh0aGlzLnNwcml0ZT09J21vYicpeyAvLyBFbmVteSBtb2JzXG4gICAgICAgICAgICB0aGlzLnN0YW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy9zdGFuZF8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3RhbmQnXSwgMTAsIFwic3RhbmRcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgICAgICB0aGlzLndhbGsgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMudHlwZSsnL21vdmVfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3dhbGsnXSwgMTAsIFwid2Fsa1wiKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICAgICAgdGhpcy5oaXQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMudHlwZSsnL2hpdDFfPy5wbmcnLDAsIDEwLCBcImhpdFwiKTtcbiAgICAgICAgICAgIHRoaXMuZGllID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy9kaWUxXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkaWUnXSwgMTUsIFwiZGllXCIsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMuc3RhbmQsIHRoaXMud2FsaywgdGhpcy5oaXQsIHRoaXMuZGllXTsgXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhbmdyeSddKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ3J5ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy9hdHRhY2sxXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhbmdyeSddLCAxMCwgXCJhdHRhY2tcIiwgdHJ1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMucHVzaCh0aGlzLmFuZ3J5KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gICAgICAgICAgIFxuICAgICAgICBlbHNlIHsgXG4gICAgICAgICAgICB0aGlzLnN0YW5kID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy9zdGFuZDFfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3N0YW5kJ10sIDEwLCBcInN0YW5kXCIpOyAvL3N0YW5kaW5nIHNwcml0ZXM7IFxuICAgICAgICAgICAgdGhpcy5hbmdyeSA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvYW5ncnlfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2FuZ3J5J10sIDEwLCBcImF0dGFja1wiLCB0cnVlKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW3RoaXMuc3RhbmQsIHRoaXMuYW5ncnldOyBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsZXZlbFVwKHBsYXllcil7IFxuICAgICAgICBsZXQgY29zdCA9IHBsYXllci51cGdyYWRlQ29zdFt0aGlzLmxldmVsLTFdO1xuICAgICAgICBpZiAocGxheWVyLm1vbmV5Pj1jb3N0KXtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwrKzsgIFxuICAgICAgICAgICAgdGhpcy52YWx1ZSArPSBjb3N0OyBcbiAgICAgICAgICAgIHBsYXllci5tb25leSAtPSBjb3N0OyBcbiAgICAgICAgfVxuICAgICAgICAvL3RoaXMuZGFtYWdlKj0yOyBcbiAgICB9XG5cbiAgICBhdHRhY2soKXtcbiAgICAgICAgdGhpcy5zcGVlZFggPSAwOyBcbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0QgPD0gMCl7XG4gICAgICAgICAgICBpZiAodGhpcy5zaWRlID09IDApe1xuICAgICAgICAgICAgICAgIHRoaXMucHJvaiA9IG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlbD4xKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPD10aGlzLmxldmVsOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMucHJvaiA9IG5ldyBQcm9qZWN0aWxlKHRoaXMsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsncHJvaiddKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggKCk9PiB7dGhpcy5wcm9qZWN0aWxlcy5wdXNoKCBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXSkpO30sIDgwKmkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFuZ3J5LnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2F0dGFjayc7IFxuICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7ICBcbiAgICAgICAgICAgICAgICAgXG4gICAgfX1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7IFxuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngtdGhpcy5yYW5nZSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoKzIqdGhpcy5yYW5nZSwgdGhpcy5oZWlnaHQpOyAvL3JhbmdlXG4gICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnO30gXG5cbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoPD0wICYmIHRoaXMuc2lkZSA9PTEpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkaWUnOyAgLy9kZWF0aCBhbmltYXRpb24gICBcbiAgICAgICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWRlPjApIHRoaXMuZmFkZSAtPSAwLjAzOyAvL2ZhZGUgb24gZGVhdGggXG4gICAgICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5mYWRlOyBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge3RoaXMuYWxpdmUgPSBmYWxzZX0sIFwiNDUwXCIpIDt9IFxuICAgICAgICB9ICBcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAxICYmIHRoaXMuc3RhdGUgIT0nZGllJyl7IC8vaGVhbHRoIGJhclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzJiMmIyYlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LTIwLCA2MCwgMTIpOyAvL2VtcHR5IGJveFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzk5MGMwMlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCsxLCB0aGlzLnBvc2l0aW9uLnktMTksIE1hdGguZmxvb3IoNTgqKDEtKHRoaXMubWF4SGVhbHRoIC0gdGhpcy5oZWFsdGgpL3RoaXMubWF4SGVhbHRoKSksIDEwKTsgLy9lbXB0eSBib3hcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbWFnZSA9IGFuaW1hdGlvbi5nZXRJbWFnZSgpOyAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmxlZnQpey8vZmxpcCBiYXNlZCBvbiBzcHJpdGUgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC10aGlzLnBvc2l0aW9uLngtdGhpcy53aWR0aCt0aGlzLnhPZmYsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYgKTt9XG4gICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueCt0aGlzLnhPZmYsIHRoaXMucG9zaXRpb24ueSt0aGlzLnlPZmYpOyB9XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4KSApXG4gICAgICAgIH0gICAgICAgICAgICBcbiAgICB1cGRhdGUoKXtcbiAgICAgICAgLy90aGlzLnBvc2l0aW9uLnggLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgaWYgKHRoaXMuc2lkZSA9PT0gMSl7ICAvLyBNb2IgXG4gICAgICAgICAgICBpZiAodGhpcy5oZWFsdGg+MCl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRYIT0wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICd3YWxrJzsgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09ICd3YWxrJykgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7IFxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueDwtdGhpcy53aWR0aCoyKSB7dGhpcy5wb3NpdGlvbi54ID0gLXRoaXMud2lkdGgqMn07IC8vbGVmdCBib3JkZXJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGgpIHt0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoO30gLy9yaWdodCBib3JkZXJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMua25vY2tiYWNrRm9yY2UpO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmtub2NrYmFja0ZvcmNlKT4wKSB7dGhpcy5zdGF0ZSA9ICdoaXQnfTsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U+MCl7dGhpcy5rbm9ja2JhY2tGb3JjZS09MC41O31cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPDApe3RoaXMua25vY2tiYWNrRm9yY2UrPTAuNTt9XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMua25vY2tiYWNrRm9yY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54IC09ICh0aGlzLnNwZWVkWCk7IC8va25vY2tiYWNrIHJpZ2h0XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gdGhpcy5zcGVlZFk7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkWT4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZFktPTAuNTsgXG4gICAgICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanVtcCl7IC8vZ3Jhdml0eVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gMSp0aGlzLmdyYXZpdHlUaW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHlUaW1lKz0wLjU7IFxuICAgICAgICAgICAgICAgIC8vdGhpcy5zdGF0ZSA9ICdqdW1wJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMucG9zaXRpb24ueSA+IHRoaXMuZ2FtZUhlaWdodC0xMTAgKXsgLy9ib3R0b20gYm9yZGVyICh1cGRhdGUgZm9yIHBsYXRmb3JtcylcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5nYW1lSGVpZ2h0LTExMDtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN0YXRlID0gJ3N0YW5kJztcbiAgICAgICAgICAgICAgICAvLyB9IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSgpICk7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gdGhpcy5wcm9qZWN0aWxlcy5maWx0ZXIoICAvL2RlbGV0ZXMgcHJvamVjdGlsZXNcbiAgICAgICAgICAgIGZ1bmN0aW9uIChvYmplY3Qpe3JldHVybiBvYmplY3QuZGVsZXRlICE9PSB0cnVlOyBcbiAgICAgICAgfSk7XG4gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9qZWN0aWxlcyk7IFxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrQ0QgPjApe3RoaXMuYXR0YWNrQ0QtLX07XG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cblxuXG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmV5e1xuICAgIGNvbnN0cnVjdG9yKG9iail7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogKG9iai5wb3NpdGlvbi54KStvYmoud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiBvYmoucG9zaXRpb24ueSs0MH1cbiAgICAgICAgdGhpcy53aWR0aCA9IDM1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDM1OyBcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBvYmoudmFsdWU7IFxuICAgICAgICB0aGlzLnBvcFVwID0gMjU7IFxuICAgICAgICB0aGlzLmRyb3BEb3duID0gMTU7XG4gICAgICAgIHRoaXMuc3BlZWRZID0gMTsgXG4gICAgICAgIHRoaXMuYWNjZWxVcCA9IDA7XG4gICAgICAgIHRoaXMuYWNjZWxEb3duID0gMDtcbiAgICAgICAgdGhpcy5kZWxldGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnktMjUsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG4gICAgICAgIGlmICh0aGlzLnZhbHVlPjEwMCl7dGhpcy50eXBlID0gJzQnO30gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWU+NTApe3RoaXMudHlwZSA9ICczJzt9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlPjEwKXt0aGlzLnR5cGUgPSAnMic7fSBcbiAgICAgICAgZWxzZSB0aGlzLnR5cGUgPSAnMSc7IFxuICAgICAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKTsgXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ2NvaW4vQ29pbicrdGhpcy50eXBlKydfPy5wbmcnLCAzLCA2LCBcInN0YW5kXCIpO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZF1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKCdzdGFuZCcpKTsgXG4gICAgICAgIGNvbnN0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKCk7IFxuICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSlcbiAgICB9XG5cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgaWYgKHRoaXMucG9wVXA+MCl7XG4gICAgICAgICAgICB0aGlzLmFjY2VsVXArPTAuMTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSAoNC10aGlzLmFjY2VsVXApOyBcblxuICAgICAgICAgICAgdGhpcy5wb3BVcCAtPSAxOyBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyb3BEb3duPjApe1xuICAgICAgICAgICAgdGhpcy5hY2NlbERvd24rPTAuMTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSAoMi41K3RoaXMuYWNjZWxEb3duKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcERvd24gLT0gMTsgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG4gICAgfVxuXG4gICAgXG59XG4iLCJpbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnOyBcbmltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gNTA7IC8vc3ByaXRlIHNpemUgXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gODA7IFxuICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgIHg6IHRoaXMud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtIDIqZ2FtZS5yb3dIZWlnaHQsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbGF5ZXJYID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yICsxODsgXG4gICAgICAgIHRoaXMuZWxlUG9zaXRpb25zID0gWyBbdGhpcy5wbGF5ZXJYIC02MCwgdGhpcy5wb3NpdGlvbi55XSwgW3RoaXMucGxheWVyWCAtNDAsIHRoaXMucG9zaXRpb24ueS00MF0sXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICwgdGhpcy5wb3NpdGlvbi55LTYwXSwgW3RoaXMucGxheWVyWCArNDAsIHRoaXMucG9zaXRpb24ueS00MF0sIFxuICAgICAgICAgICAgW3RoaXMucGxheWVyWCArNjAsIHRoaXMucG9zaXRpb24ueV0gXTtcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBnYW1lLnJvd0hlaWdodDtcbiAgICAgICAgdGhpcy5sYW5lID0gMTsgXG4gICAgICAgIHRoaXMuZmxvb3IgPSAgdGhpcy5nYW1lSGVpZ2h0IC0gNDUgLSAoMSt0aGlzLmxhbmUpKnRoaXMucm93SGVpZ2h0XG4gICAgICAgIHRoaXMubWF4U3BlZWQgPSAxNTsgXG4gICAgICAgIHRoaXMuc3BlZWQgPSAzO1xuICAgICAgICB0aGlzLmtub2NrYmFja0ZvcmNlID0gMDsgXG4gICAgICAgIHRoaXMubGVmdCA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zcGVlZFggPSAwO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7IFxuICAgICAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgICAgIHRoaXMubmFtZSA9ICdXaXonO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDEwMDAwOyBcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxOyBcbiAgICAgICAgdGhpcy5pbnZ1bG5UaW1lID0gIDA7IFxuICAgICAgICB0aGlzLmtub2NrYmFja1RocmVzaCA9IDE7IFxuICAgICAgICB0aGlzLmtub2NrYmFja1N1bSA9IDBcbiAgICAgICAgdGhpcy5hcm1vciA9IDA7IFxuICAgICAgICB0aGlzLnRvdWNoSGl0ID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmF0dGFja1NwZWVkID0gMzU7IFxuICAgICAgICB0aGlzLmF0dGFja0NEID0gMDsgXG4gICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7IFxuICAgICAgICB0aGlzLmN1clRpbGUgPSAwO1xuICAgICAgICB0aGlzLmVsZW1lbnRMaXN0PSBbXTsgLy9hZGQgc3ByaXRlcyBoZXJlIFxuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGVzID0ge307XG4gICAgICAgIHRoaXMuZWxlbWVudExvYWRlZFNwcml0ZSA9IHt9IDsgXG4gICAgICAgIHRoaXMuZWxlbWVudEluZm8gPSB7ICdCbGF6ZSc6IHsnc3RhbmQnOjcsICdtb3ZlJzogNywgJ2F0dGFjayc6IDggfSxcbiAgICAgICAgICAgICdEYXduJzogeydzdGFuZCc6IDE1LCAnbW92ZSc6MTUsICdhdHRhY2snOiA4fSxcbiAgICAgICAgICAgICdOaWdodCc6IHsnc3RhbmQnOjcsICdtb3ZlJzo3LCAnYXR0YWNrJzogOH0sXG4gICAgICAgICAgICAnVGh1bmRlcic6IHsnc3RhbmQnOiA3LCAnbW92ZSc6NywgJ2F0dGFjayc6IDd9LFxuICAgICAgICAgICAgJ1dpbmQnOiB7J3N0YW5kJzogNywgJ21vdmUnOjcsICdhdHRhY2snOiA5fSB9XG4gICAgICAgIHRoaXMuZWxlbWVudFN0YXRlID0gWydzdGFuZCcsJ3N0YW5kJywnc3RhbmQnXTsgXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyBcbiAgICAgICAgdGhpcy5lbGVtZW50YWxzKCk7XG5cbiAgICAgICAgdGhpcy5zdW1tb25Db3VudCA9IDA7IFxuICAgICAgICB0aGlzLm1vbmV5ID0gMTUwMDsgXG4gICAgICAgIHRoaXMuc3VtbW9uQ29zdCA9IFs0MCwgODAsIDE2MCwgMzIwLCA2NDBdO1xuICAgICAgICB0aGlzLnVwZ3JhZGVDb3N0ID0gWzEwMCwgMjAwLCA0MDAsIDgwMCwgMTYwMF07IFxuICAgICAgICB0aGlzLmVsZW1lbnRDb3N0ID0gWzUwLCAxMDAsIDIwMCwgNDAwLCA4MDBdOyBcblxuXG4gICAgfVxuICAgIGVsZW1lbnRhbHMoKXsgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuZWxlbWVudExpc3QubGVuZ3RoOyBpKyspeyAvLyBMb2FkIGVsZW1lbnRhbCBzcHJpdGVzIFxuICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRTcHJpdGVzW3RoaXMuZWxlbWVudExpc3RbaV1dKXtcbiAgICAgICAgICAgICAgICBsZXQgZWxlVHlwZSA9IHRoaXMuZWxlbWVudExpc3RbaV07IFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhbmRFbGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKGVsZVR5cGUrXCIvc3RhbmRfPy5wbmdcIiwgdGhpcy5lbGVtZW50SW5mb1tlbGVUeXBlXVsnc3RhbmQnXSwgNiwgXCJzdGFuZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVFbGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKGVsZVR5cGUrXCIvbW92ZV8/LnBuZ1wiLCB0aGlzLmVsZW1lbnRJbmZvW2VsZVR5cGVdWydtb3ZlJ10sIDYsIFwid2Fsa1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0VsZSA9IG5ldyBTcHJpdGVBbmltYXRpb24oZWxlVHlwZStcIi9hdHRhY2sxXz8ucG5nXCIsIHRoaXMuZWxlbWVudEluZm9bZWxlVHlwZV1bJ2F0dGFjayddLCA2LCBcInN3aW5nMVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGVzW2VsZVR5cGVdID0gW3RoaXMuc3RhbmRFbGUsIHRoaXMubW92ZUVsZSwgdGhpcy5hdHRhY2tFbGVdOyBcbiAgICAgICAgICAgICAgICAvL3snc3RhbmQnOiB0aGlzLnN0YW5kRWxlLCAnbW92ZSc6IHRoaXMubW92ZUVsZSwgJ2F0dGFjayc6IHRoaXMuYXR0YWNrRWxlfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpe1xuICAgICAgICB0aGlzLmZyYW1lcyA9IDE1OyBcbiAgICAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvYWxlcnRfPy5wbmdcIiwgMywgdGhpcy5mcmFtZXMsIFwic3RhbmRcIik7IC8vc3RhbmRpbmcgc3ByaXRlczsgXG4gICAgICAgIHRoaXMud2FsayA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvd2FsazFfPy5wbmdcIiwgMywgMTAsIFwid2Fsa1wiKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLmp1bXAgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2p1bXBfPy5wbmdcIiwgMSwgMTAsIFwianVtcFwiKTsgLy9qdW1wIHNwcml0ZXM7XG4gICAgICAgIHRoaXMuY2FzdCA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvYWxlcnRfPy5wbmdcIiwgMywgMTAsIFwic3RhbmRcIik7IFxuICAgICAgICB0aGlzLnN3aW5nMSA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPMV8/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzFcIiwgdHJ1ZSk7IC8vYXR0YWNrIHNwcml0ZXM7XG4gICAgICAgIHRoaXMuc3dpbmcyID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9zd2luZ08yXz8ucG5nXCIsIDMsIDEyLCBcInN3aW5nMlwiLCB0cnVlKTsgXG4gICAgICAgIHRoaXMuc3dpbmczID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9zd2luZ08zXz8ucG5nXCIsIDMsIDEyLCBcInN3aW5nM1wiLCB0cnVlKTsgXG4gICAgICAgIHRoaXMuYXR0YWNrQW5pbSA9IFsnc3dpbmcxJywgJ3N3aW5nMicsICdzd2luZzMnXTsgXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnN0YW5kLCB0aGlzLndhbGssIHRoaXMuanVtcCwgdGhpcy5zd2luZzEsIHRoaXMuc3dpbmcyLCB0aGlzLnN3aW5nMywgdGhpcy5jYXN0XTsgXG4gICAgfVxuXG4gICAgYXR0YWNrKCl7XG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEIDw9IDApe1xuICAgICAgICAgICAgdGhpcy5wcm9qID0gbmV3IFByb2plY3RpbGUodGhpcywgJ2xpZ2h0bmluZ2JhbGwnKTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5hdHRhY2tBbmltLnNoaWZ0KCk7IFxuICAgICAgICAgICAgdGhpcy5hdHRhY2tBbmltLnB1c2godGhpcy5zdGF0ZSk7IFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSkucmVzZXQoKTsgXG4gICAgICAgICAgICB0aGlzLmF0dGFja0NEID0gdGhpcy5hdHRhY2tTcGVlZDtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCh0aGlzLnByb2opO1xuICAgICAgICAgICAgLy9zZXRUaW1lb3V0KCgpPT4ge3RoaXMucHJvamVjdGlsZXMucHVzaCh0aGlzLnByb2opfSwgXCIyMDBcIik7IC8vc2xpZ2h0IGRlbGF5IGZvciBhbmltYXRpb25cblxuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuZWxlbWVudExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMucHJvaiA9IG5ldyBQcm9qZWN0aWxlKHRoaXMsICdmaXJlYmFsbCcsdGhpcy5lbGVQb3NpdGlvbnNbaV1bMF0sIHRoaXMuZWxlUG9zaXRpb25zW2ldWzFdICk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKHRoaXMucHJvaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGRyYXcoY3R4KXtcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLnN0YXRlKSlcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UoKTsgICAvL2dldCBzcHJpdGVcblxuICAgICAgICBpZiAodGhpcy5pbnZ1bG5UaW1lJTQ+PTEgJiYgdGhpcy5pbnZ1bG5UaW1lPjApIHtjdHguZ2xvYmFsQWxwaGEgPSAwLjJ9O1xuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngrMTUsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8vaGl0Ym94XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMuY3VyVGlsZSo4MCwgdGhpcy5wb3NpdGlvbi55LCA4MCwgODApOyAvL3NlbGVjdGVkIHRpbGVcbiAgICAgICAgaWYgKHRoaXMubGVmdCl7XG4gICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAtdGhpcy5wb3NpdGlvbi54LTEuNSp0aGlzLndpZHRoLTEwLCB0aGlzLnBvc2l0aW9uLnkpO31cbiAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54LTUsIHRoaXMucG9zaXRpb24ueSk7IH1cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7IC8vcmVzZXRzIFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7fSBcblxuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgpICkgLy9kcmF3IHByb2plY3RpbGVzIFxuICAgICAgICAvL2VsZW1lbnRhbHMgXG4gICAgICAgIHRoaXMucGxheWVyWCA9IHRoaXMucG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMiArMTg7IFxuICAgICAgICB0aGlzLmVsZVBvc2l0aW9ucyA9IFsgW3RoaXMucGxheWVyWCAtNjAsIHRoaXMucG9zaXRpb24ueSs1XSwgW3RoaXMucGxheWVyWCAtNDAsIHRoaXMucG9zaXRpb24ueS0zNV0sXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICwgdGhpcy5wb3NpdGlvbi55LTU1XSwgW3RoaXMucGxheWVyWCArNDAsIHRoaXMucG9zaXRpb24ueS0zNV0sIFt0aGlzLnBsYXllclggKzYwLCB0aGlzLnBvc2l0aW9uLnkrNV0gXTtcbiAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXsgLy8gTG9hZCBlbGVtZW50YWwgc3ByaXRlcyBcbiAgICAgICAgICAgICAgICBsZXQgZWxlVHlwZSA9IHRoaXMuZWxlbWVudExpc3RbaV07IFxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudFN0YXRlW2ldICE9ICdzd2luZzEnICYmIHRoaXMuc3RhdGUhPSdqdW1wJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3RhdGVbaV0gPSB0aGlzLnN0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gJ3N3aW5nMicgfHx0aGlzLnN0YXRlID09ICdzd2luZzMnKXt0aGlzLmVsZW1lbnRTdGF0ZVtpXT0nc3dpbmcxJ319XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuZWxlbWVudFNwcml0ZXNbZWxlVHlwZV0uZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuZWxlbWVudFN0YXRlW2ldKSkgLy8gY29waWVzIHBsYXllciBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0gPSBhbmltYXRpb24uZ2V0SW1hZ2UoKTsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXsgLy9yZXNldHMgQXR0YWNrIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3RhdGVbaV09ICdzdGFuZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGVzW2VsZVR5cGVdWzJdLnJlc2V0KCkgLy9yZXNldCBcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubGVmdCl7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0sIC10aGlzLmVsZVBvc2l0aW9uc1tpXVswXS10aGlzLndpZHRoLTQ1LCB0aGlzLmVsZVBvc2l0aW9uc1tpXVsxXSk7IFxuICAgICAgICAgICAgICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTt9XG4gICAgICAgICAgICAgICAgZWxzZSAoY3R4LmRyYXdJbWFnZSh0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGVbZWxlVHlwZV0sIHRoaXMuZWxlUG9zaXRpb25zW2ldWzBdLCB0aGlzLmVsZVBvc2l0aW9uc1tpXVsxXSkpOyBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGUgPSB7fSAvL2NsZWFyIGxvYWRlZCBzcHJpdGVzXG5cbiAgICB9XG5cbiAgICB0ZWxlcG9ydChkaXJlY3Rpb24pe1xuICAgICAgICBpZiAodGhpcy5sYW5lIC0gMSpkaXJlY3Rpb24+LTEgJiYgdGhpcy5sYW5lIC0gMSpkaXJlY3Rpb248Myl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy5yb3dIZWlnaHQqZGlyZWN0aW9uOzJcbiAgICAgICAgICAgIHRoaXMubGFuZSArPSAtMSpkaXJlY3Rpb247IFxuICAgICAgICAgICAgdGhpcy5mbG9vciA9ICB0aGlzLmdhbWVIZWlnaHQgLSA0NSAtICgxK3RoaXMubGFuZSkqdGhpcy5yb3dIZWlnaHR9XG4gICAgfVxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBpZiAodGhpcy5pbnZ1bG5UaW1lPjApe3RoaXMuaW52dWxuVGltZS0tfTsgXG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEID4wKXt0aGlzLmF0dGFja0NELS19O1xuXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IHRoaXMucHJvamVjdGlsZXMuZmlsdGVyKCAgLy9kZWxldGVzIHByb2plY3RpbGVzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LmRlbGV0ZSAhPT0gdHJ1ZTsgXG4gICAgICAgIH0pO1xuICAgICAgICBcblxuICAgICAgICBpZiAodGhpcy5zcGVlZFghPTAgJiYgIXRoaXMuYXR0YWNrQW5pbS5pbmNsdWRlcyh0aGlzLnN0YXRlKSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhbGsnOyBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09ICd3YWxrJykgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7IFxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng8LTMwKSB7dGhpcy5wb3NpdGlvbi54ID0gLTMwfTsgLy9sZWZ0IGJvcmRlclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGgpIHt0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoO30gLy9yaWdodCBib3JkZXJcbiAgICAgICAgdGhpcy5jdXJUaWxlID0gTWF0aC5mbG9vciggKHRoaXMud2lkdGgvMiArdGhpcy5wb3NpdGlvbi54KS84MCk7XG5cbiAgICAgICAgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U+MCl7dGhpcy5rbm9ja2JhY2tGb3JjZS09MTt9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMua25vY2tiYWNrRm9yY2U8MCl7dGhpcy5rbm9ja2JhY2tGb3JjZSs9MTt9XG4gICAgICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLnNwZWVkWC10aGlzLmtub2NrYmFja0ZvcmNlO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gdGhpcy5zcGVlZFk7IFxuICAgICAgICBpZiAodGhpcy5zcGVlZFk+MCl7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWS09MC41OyBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5qdW1wKXsgLy9ncmF2aXR5XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gMSp0aGlzLmdyYXZpdHlUaW1lO1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5VGltZSs9MC41OyBcbiAgICAgICAgICAgIGlmICghdGhpcy5hdHRhY2tBbmltLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB0aGlzLnN0YXRlID0gJ2p1bXAnO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi55ID4gdGhpcy5mbG9vcil7IC8vYm90dG9tIGJvcmRlciAodXBkYXRlIGZvciBwbGF0Zm9ybXMpXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLmZsb29yO1xuICAgICAgICAgICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgICAgICAgICAgdGhpcy5qdW1wID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTsgXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXR0YWNrQW5pbS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkgdGhpcy5zdGF0ZSA9ICdzdGFuZCc7XG4gICAgICAgIH0gXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCsxNSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG5cblxuICAgICAgICAvL3RoaXMucG9zaXRpb24ueCs9IDUgLyBkZWx0YVRpbWU7IFxuICAgIH1cbn0iLCJpbXBvcnQgc25vd2JhbGwgZnJvbSAnLi9pbWFnZXMvc25vd2JhbGwxLnBuZyc7XG5pbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RpbGV7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCB0eXBlPSdOb25lJyx4ID0gMCwgeT0wKXtcbiAgICAgICAgdGhpcy50eXBlSW5mbyA9IHsgJ05vbmUnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjEsICdleHBsb2RlJzoyLCAneE9mZic6IDB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpcmViYWxsJzogeydzcGVlZCc6IDEyLCAndHJhdmVsJzoxLCAnZXhwbG9kZSc6MiwgJ3hPZmYnOiA1NX0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BvaXNvbmJhbGwnOiB7J3NwZWVkJzogMTAsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo0LCAneE9mZic6NTV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ljZWJhbGwnOiB7J3NwZWVkJzogOCwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjQsICd4T2ZmJzo2NX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGlnaHRuaW5nYmFsbCc6IHsnc3BlZWQnOiAxMiwgJ3RyYXZlbCc6MiwgJ2V4cGxvZGUnOjcsICd4T2ZmJzo2MH0gfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBwbGF5ZXIuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBwbGF5ZXIuZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDI1OyAvL3Nwcml0ZSBzaXplIFxuICAgICAgICB0aGlzLmhlaWdodCA9IDI1OyBcbiAgICAgICAgdGhpcy5leHBsb2RlID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmRlbGV0ZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50b3VjaEhpdD0gdHJ1ZTtcbiAgICAgICAgdGhpcy5waWVyY2UgPSAxO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IHBsYXllci5kYW1hZ2U7IFxuICAgICAgICB0aGlzLmhlYWx0aCA9MTsgXG4gICAgICAgIHRoaXMuc2lkZSA9IDA7IFxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlOyBcbiAgICAgICAgdGhpcy5sYW5lID0gcGxheWVyLmxhbmU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAndHJhdmVsJzsgXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gXCJOb25lXCIpIHt0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKSB9XG4gICAgICAgIGVsc2Uge3RoaXMuc3ByaXRlID0gbmV3IEltYWdlKCk7IFxuICAgICAgICB0aGlzLnNwcml0ZS5zcmMgPSBzbm93YmFsbDt9IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5sZWZ0ID0gcGxheWVyLmxlZnQ7IC8vIHNob290IGxlZnRcbiAgICAgICAgaWYgKHggPT0gMCAmJiB5ID09IDApe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgIC8vcG9zaXRpb24gXG4gICAgICAgICAgICAgICAgeDogcGxheWVyLnBvc2l0aW9uLngsIFxuICAgICAgICAgICAgICAgIHk6IHBsYXllci5wb3NpdGlvbi55KzQ1XG4gICAgICAgICAgICB9fVxuICAgICAgICBlbHNlIHsgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiB4KzM1LFxuICAgICAgICAgICAgICAgIHk6IHkrNjV9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNwZWVkID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcGVlZCddO1xuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuXG4gICAgfVxuXG4gICAgY3JlYXRlQW5pbWF0aW9ucygpe1xuICAgICAgICB0aGlzLmZyYW1lcyA9IDU7IFxuICAgICAgICB0aGlzLnRyYXZlbCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvdHJhdmVsXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd0cmF2ZWwnXSwgdGhpcy5mcmFtZXMsIFwidHJhdmVsXCIpOyAvL3N0YW5kaW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLmJ1cnN0ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy9leHBsb2RlXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydleHBsb2RlJ10sIHRoaXMuZnJhbWVzLCBcImJ1cnN0XCIsIHRydWUpOyAvL3dhbGtpbmcgc3ByaXRlczsgXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnRyYXZlbCwgdGhpcy5idXJzdF07IFxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7IC8vcmVmZXJlbmNlXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gXCJOb25lXCIpeyBcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGFuaW1hdGlvbi5nZXRJbWFnZSgpOyAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGxvZGUpe3RoaXMuc3RhdGUgPSAnYnVyc3QnfTsgXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7dGhpcy5kZWxldGUgPSB0cnVlO31cbiAgICBcbiAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0KXsvL2ZsaXAgYmFzZWQgb24gc3ByaXRlIG9yaWVudGF0aW9uXG4gICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC10aGlzLnBvc2l0aW9uLngtIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneE9mZiddLTEwLCB0aGlzLnBvc2l0aW9uLnktNzgpO31cbiAgICAgICAgICAgIGVsc2Uge2N0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucG9zaXRpb24ueC10aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3hPZmYnXSsxNSwgdGhpcy5wb3NpdGlvbi55LTc4KTsgfVxuXG4gICAgICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSsyNSk7IC8vZHJhdyBtb2IgKHgsIHksIGhlaWdodCwgd2lkdGgpXG4gICAgICAgIGlmICh0aGlzLmV4cGxvZGUpe3RoaXMuZGVsZXRlID0gdHJ1ZX07IFxuICAgICAgICB9XG5cbiAgICB9IFxuXG5cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgaWYgKCF0aGlzLmV4cGxvZGUpe1xuICAgICAgICAgICAgaWYgKHRoaXMubGVmdCl7dGhpcy5wb3NpdGlvbi54IC09IHRoaXMuc3BlZWQ7fSAvLyBkaXJlY3Rpb25cbiAgICAgICAgICAgIGVsc2UgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PC10aGlzLndpZHRoKSB7dGhpcy5kZWxldGUgPSB0cnVlIH07XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aCkge3RoaXMuZGVsZXRlID0gdHJ1ZX07XG5cbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cblxuXG5cbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0YXJ0U2NyZWVue1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDE3MDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDsgXG4gICAgICAgIHRoaXMueCA9IChnYW1lLmdhbWVXaWR0aC10aGlzLndpZHRoKS8yOyBcbiAgICAgICAgdGhpcy55ID0gMzsvLyh0aGlzLmhlaWdodClcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMjU7IFxuICAgICAgICB0aGlzLmZvbnQgPSBcIjE2cHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5mb250MiA9IFwiMjRweCBhcmlhbFwiO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlOyBcbiAgICAgICAgdGhpcy5jb250cm9scyA9IFtcIlN0b3AgdGhlIG1vbnN0ZXJzIGZyb20gYWR2YW5jaW5nIVwiLFwiIC0gVXNlIChXQVNEKSB0byBtb3ZlLCAoSikgdG8ganVtcCwgYW5kIChLKSB0byBzaG9vdC4gVXNlIChQKSB0byBvcGVuIHNob3AuIFwiLCBcbiAgICAgICAgICAgIFwiIC0gQ29sbGVjdCB0aGUgY29pbnMgbW9uc3RlcnMgZHJvcCBiZWZvcmUgdGhleSBleHBpcmVcIiwgXG4gICAgICAgICAgICBcIiAtIFNwZW5kIG1lc29zIG9uIHVwZ3JhZGVzICYgc3VtbW9ucyB0byBib2xzdGVyIHlvdXIgZGVmZW5zZVwiLCBcbiAgICAgICAgICAgIFwiIC0gTG9zZSBsaXZlcyB3aGVuIG1vbnN0ZXJzIGVzY2FwZSBvciB0b3VjaCB5b3VcIiwgXCIgLSBHYW1lIG92ZXIgd2hlbiBhbGwgbGl2ZXMgbG9zdCFcIl1cbiAgICAgICAgdGhpcy5idXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMS50ZXh0Q29udGVudCA9ICdTdGFydCEnO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy5nYW1lV2lkdGgvMjtcbiAgICAgICAgdGhpcy5idXR0b25XaWR0aCA9IDY1O1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDM1OyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uUG9zaXRpb25zID0gWyBbdGhpcy54K3RoaXMud2lkdGgtIHRoaXMuYnV0dG9uV2lkdGgtdGhpcy5wYWRkaW5nLCB0aGlzLmhlaWdodC10aGlzLmJ1dHRvbkhlaWdodC10aGlzLnBhZGRpbmddXSBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjFdXG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ZWxlbS5oYW5kbGVDbGljayhlLCBnYW1lKSB9LCBmYWxzZSk7ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXcoY3R4KXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPHRoaXMuYnV0dG9uc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0RnVuY3Rpb25zKGdhbWUpe1xuICAgICAgICAgICAgZ2FtZS5uZXh0V2F2ZSA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICB9XG5cbiAgICAgICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnVuY3Rpb25zKGdhbWUsIGkpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIGRyYXdCdXR0b24oZTEsIHgsIHksIGN0eCl7ICAgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3N0ZWVsYmx1ZSc7IC8vZHJhdyBib3JkZXJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCx0aGlzLmJ1dHRvbkhlaWdodCk7IFxuXG4gICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuZm9udDI7IC8vZHJhdyB0ZXh0IFxuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzIpOyBcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy9zZXRzIGFyZWEgZm9yIGNvbGxpc2lvbiAoaXNQb2ludEluUGF0aClcbiAgICAgICAgICAgIGN0eC5yZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCk7ICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgXG4gICAgICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSB8fCBnYW1lLndhdmVGaW5pc2gpe1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250MjsgXG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1ByZXNzIFtQXSB0byByZXN1bW1vbiBhbGxpZXMnLCB0aGlzLmdhbWVXaWR0aC8yLCB0aGlzLmhlaWdodC01KSBcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1ByZXNzIFtPXSB0byBzdGFydCB3YXZlJywgdGhpcy5nYW1lV2lkdGgvMiwgdGhpcy5oZWlnaHQgKyAyNSkgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBcIjVcIjsgXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAyKTtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ3N0YXJ0JzsgXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQ7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuY29udHJvbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5jb250cm9sc1tpXSwgdGhpcy54K3RoaXMucGFkZGluZywgdGhpcy55K3RoaXMucGFkZGluZyooMStpKSwgdGhpcy53aWR0aCk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlZHJhdyhjdHgpOyAvL2RyYXcgc3RhcnQgYnV0dG9uXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH0gICBcblxuICAgICAgICAgICAgLy8gZWxzZSB7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0JykuaW5uZXJIVE1MPVwiXCI7fVxuICAgICAgICAgICAgXG4gICAgXG4gICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICBcblxuXG4gICAgXG4gICAgICAgIFxufSIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBncmFkZXtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDY1MDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyMzA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7XG4gICAgICAgIHRoaXMueCA9IChnYW1lLmdhbWVXaWR0aC10aGlzLndpZHRoKS8yOyBcbiAgICAgICAgdGhpcy55ID0gMzsvLyh0aGlzLmhlaWdodClcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnBhZGRpbmcgPSAxNTsgXG4gICAgICAgIHRoaXMucGFkZGluZ1kgPSA0O1xuICAgICAgICB0aGlzLmJ1dHRvbldpZHRoID0gMTY1O1xuICAgICAgICB0aGlzLmJ1dHRvbkhlaWdodCA9IDM2O1xuICAgICAgICB0aGlzLmZvbnQgPSBcIjEzcHggYXJpYWxcIjsgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmZvbnQyID0gXCIxNHB4IGFyaWFsXCI7ICBcblxuICAgICAgICB0aGlzLmJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24xLnRleHRDb250ZW50ID0gJ1N1bW1vbiBSZWQgRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24xLnZhbHVlID0gJ3JlZERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjIudGV4dENvbnRlbnQgPSAnU3VtbW9uIEJsdWUgRHJhZ29uJztcbiAgICAgICAgdGhpcy5idXR0b24yLnZhbHVlID0gJ2JsdWVEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24zLnRleHRDb250ZW50ID0gJ1N1bW1vbiBHcmVlbiBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjMudmFsdWUgPSAnZ3JlZW5EcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b240LnRleHRDb250ZW50ID0gJ1N1bW1vbiBCbGFjayBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjQudmFsdWUgPSAnYmxhY2tEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjEwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uMTAudGV4dENvbnRlbnQgPSAnU3VtbW9uIE0uIEtuaWdodCc7XG4gICAgICAgIHRoaXMuYnV0dG9uMTAudmFsdWUgPSAnbXVzaHJvb21LbmlnaHQnO1xuICAgICAgICB0aGlzLmJ1dHRvblgxID0gdGhpcy54ICsgdGhpcy5wYWRkaW5nOyBcbiAgICAgICAgdGhpcy5uYW1lSGFzaCA9IHsncmVkRHJhZ29uJzonUmVkIERyYWdvbicsICdibHVlRHJhZ29uJzonQmx1ZSBEcmFnb24nLFxuICAgICAgICAnZ3JlZW5EcmFnb24nOidHcmVlbiBEcmFnb24nLCAnYmxhY2tEcmFnb24nOidCbGFjayBEcmFnb24nLCAnbXVzaHJvb21LbmlnaHQnOiAnTXVzaHJvb20gS25pZ2h0J307XG4gICAgICAgIHRoaXMuc3VtbW9uTGlzdCA9IFsncmVkRHJhZ29uJywgJ2JsdWVEcmFnb24nLCdncmVlbkRyYWdvbicsJ2JsYWNrRHJhZ29uJywnbXVzaHJvb21LbmlnaHQnXTtcbiAgICAgICAgdGhpcy5lbGVtZW50TGlzdCA9IFsnQmxhemUnLCdEYXduJywnTmlnaHQnLCdXaW5kJywnVGh1bmRlciddO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjUudGV4dENvbnRlbnQgPSAnQmxhemUgU3ByaXRlJzsgLy9CbGF6ZSAtIEZsYW1lIFxuICAgICAgICB0aGlzLmJ1dHRvbjUudmFsdWUgPSBcIkJsYXplXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uNiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjYudGV4dENvbnRlbnQgPSAnRGF3biBTcHJpdGUgJzsgLy9EYXduIC0gTGlnaHQgXG4gICAgICAgIHRoaXMuYnV0dG9uNi52YWx1ZSA9IFwiRGF3blwiO1xuICAgICAgICB0aGlzLmJ1dHRvbjcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTsgXG4gICAgICAgIHRoaXMuYnV0dG9uNy50ZXh0Q29udGVudCA9ICdOaWdodCBTcHJpdGUnOyAvL05pZ2h0IC0gRGFya1xuICAgICAgICB0aGlzLmJ1dHRvbjcudmFsdWUgPSBcIk5pZ2h0XCI7XG4gICAgICAgIHRoaXMuYnV0dG9uOCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjgudGV4dENvbnRlbnQgPSAnV2luZCBTcHJpdGUgJzsgIC8vV2luZCAtIFN0b3JtXG4gICAgICAgIHRoaXMuYnV0dG9uOC52YWx1ZSA9IFwiV2luZFwiO1xuICAgICAgICB0aGlzLmJ1dHRvbjkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTsgXG4gICAgICAgIHRoaXMuYnV0dG9uOS50ZXh0Q29udGVudCA9ICdUaHVuZGVyIFNwcml0ZSc7IC8vVGh1bmRlciAtIExpZ2h0bmluZyAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b245LnZhbHVlID0gXCJUaHVuZGVyXCI7IFxuICAgICAgICB0aGlzLmJ1dHRvblgyID0gIHRoaXMuYnV0dG9uWDEgKyB0aGlzLmJ1dHRvbldpZHRoKyB0aGlzLnBhZGRpbmcgOyBcbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMgPSBbIFt0aGlzLmJ1dHRvblgxLCAwXSwgW3RoaXMuYnV0dG9uWDEsMV0sIFt0aGlzLmJ1dHRvblgxLDJdLCBbdGhpcy5idXR0b25YMSwzXSwgIFt0aGlzLmJ1dHRvblgxLDRdLCBcbiAgICAgICAgICAgICAgICAgW3RoaXMuYnV0dG9uWDIsMF0sIFt0aGlzLmJ1dHRvblgyLDFdLCBbdGhpcy5idXR0b25YMiwyXSwgW3RoaXMuYnV0dG9uWDIsM10sIFt0aGlzLmJ1dHRvblgyLDRdICBdOyBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjEsIHRoaXMuYnV0dG9uMiwgdGhpcy5idXR0b24zLCB0aGlzLmJ1dHRvbjQsIHRoaXMuYnV0dG9uMTAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uNSwgdGhpcy5idXR0b242LCB0aGlzLmJ1dHRvbjcsIHRoaXMuYnV0dG9uOCwgdGhpcy5idXR0b245XTsgXG4gICAgICAgdGhpcy5ub3RlID0gXCJQcmVzcyBbSl0gdG8gYnV5LCBbUF0gdG8gY2xvc2UgbWVudVwiOyBcbiAgICAgICBcbiAgICAgICAvLyB0aGlzLmJ1dHRvbk5leHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgLy8gdGhpcy5idXR0b25OZXh0LnRleHRDb250ZW50ID0gJ05leHQgV2F2ZSEnO1xuICAgICAgICAvLyB0aGlzLmJ1dHRvblBvc2l0aW9ucy5wdXNoKFt0aGlzLndpZHRoIC0gMjUsIDVdKTtcbiAgICAgICAgLy8gdGhpcy5idXR0b25zTGlzdC5wdXNoKHRoaXMuYnV0dG9uTmV4dCk7IFxuXG4gICAgICAgIHRoaXMuY29zdFRleHQgPSBbIFsnJywgJ1VwZ3JhZGUgU2hvcCcsICcnLF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJyMnLCAnIFN1bW1vbicsICdFbGVtZW50J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJzEnLCAnNDAnLCAnNTAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnMicsICc4MCcsICcxMDAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnMycsICcxNjAnLCAnMjAwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJzQnLCAnMzIwJywgJzQwMCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWyc1KycsICc2NDAnLCAnODAwJ11dO1xuXG4gICAgICAgIHRoaXMuY29zdFBvc2l0aW9uID0gdGhpcy5idXR0b25YMiArIHRoaXMuYnV0dG9uV2lkdGgrIDIuNSp0aGlzLnBhZGRpbmc7IFxuICAgICAgICB0aGlzLmNvc3RIZWlnaHQgPSAyMDsgXG4gICAgICAgIHRoaXMuY29zdFdpZHRoID0gMjc1OyBcbiAgICAgICAgdGhpcy5jb3N0UGFkZGluZyA9IDQ7IFxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWCA9IDE7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uWSA9IDE7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25UZXh0ID0gW107XG4gICAgICAgIHRoaXMucHVyY2hhc2VEZXNjcmlwdGlvbiA9IHJlcXVpcmUoJy4vcHVyY2hhc2UuanNvbicpOyBcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMucmVkcmF3KGN0eCksIHRydWUpOyBcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZWRyYXcoY3R4LCBnYW1lICl7XG5cbiAgICAgICAgbGV0IGJ1dHRvbkRyYXcgPSB0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgXG4gICAgICAgIGlmIChnYW1lKXsgLy9ydW5zIHByaW9yIHRvIGluaXRpYWxpemF0aW9uXG4gICAgICAgICAgICBpZiAoIWdhbWUud2F2ZUZpbmlzaCl7YnV0dG9uRHJhdy09MX07ICAgICAgIH1cbiAgICAgICBmb3IgKGxldCBpID0gMDsgaTxidXR0b25EcmF3IDsgaSsrKXtcbiAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCAyKnRoaXMucGFkZGluZ1krKHRoaXMuYnV0dG9uSGVpZ2h0K3RoaXMucGFkZGluZ1kpKnRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgsIGdhbWUpXG4gICAgICAgfVxuICAgIH1cblxuICAgIHVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgYnV0dG9uKXtcbiAgICAgICAgLy9yZXN1bW1vbjtcbiAgICAgICAgaWYgKGdhbWUuc3RvcmFnZS5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSkpe1xuICAgICAgICAgICAgZ2FtZS5yZXN1bW1vbihidXR0b24udmFsdWUpO1xuICAgICAgICAgICAgbGV0IHVuaXQgPSBnYW1lLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGJ1dHRvbi52YWx1ZSkpO1xuICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gICdVcGdyYWRlICcrdGhpcy5uYW1lSGFzaFtidXR0b24udmFsdWVdKyAnIChMdmwgJyt1bml0LmxldmVsKycpJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnYW1lLnBsYXllck9iamVjdHMuZmluZChvYmo9PiAob2JqLnR5cGUgPT09IGJ1dHRvbi52YWx1ZSkpKXsgLy91cGdyYWRlIHN1bW1vbnMgXG4gICAgICAgICAgICBsZXQgdW5pdCA9IGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gYnV0dG9uLnZhbHVlKSk7XG4gICAgICAgICAgICB1bml0LmxldmVsVXAoZ2FtZS5wbGF5ZXIpOyAvL2FkZCBjb3N0IFxuICAgICAgICAgICAgY29uc29sZS5sb2codW5pdC5sZXZlbCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh1bml0LmxldmVsPDUpe1xuICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gICdVcGdyYWRlICcrdGhpcy5uYW1lSGFzaFtidXR0b24udmFsdWVdKyAnIChMdmwgJyt1bml0LmxldmVsKycpJzt9XG4gICAgICAgICAgICBlbHNlIHtidXR0b24udGV4dENvbnRlbnQgPSAgdGhpcy5uYW1lSGFzaFtidXR0b24udmFsdWVdKyAnIChMdmwgJyt1bml0LmxldmVsKycpJyB9XG4gICAgICAgIH0gXG5cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdW1tb25MaXN0LmluY2x1ZGVzKGJ1dHRvbi52YWx1ZSkpe1xuICAgICAgICAgICAgZ2FtZS5jcmVhdGVNb2IoZ2FtZS5wbGF5ZXIsIGJ1dHRvbi52YWx1ZSwgMCk7IC8vc3VtbW9ucyA7XG4gICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBidXR0b24udmFsdWUpKSl7IC8vY2hlY2tzIGlmIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IFxuICAgICAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdVcGdyYWRlICcrdGhpcy5uYW1lSGFzaFtidXR0b24udmFsdWVdKyAnIChMdmwgMSknO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbGVtZW50TGlzdC5pbmNsdWRlcyhidXR0b24udmFsdWUpKXtcbiAgICAgICAgICAgICAgICBnYW1lLmFkZEVsZW1lbnQoYnV0dG9uLnZhbHVlKTsgLy9lbGVtZW50c1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICBlbHNlIGlmIChidXR0b24udGV4dENvbnRlbnQ9PSdOZXh0IFdhdmUhJykgZ2FtZS5uZXh0V2F2ZSA9IHRydWU7IC8vbmV4dCB3YXZlIGJ1dHRvblxuXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZSwgZ2FtZSl7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgXG4gICAgICAgIGxldCBidXR0b25EcmF3ID0gdGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IFxuICAgICAgICBpZiAoIWdhbWUud2F2ZUZpbmlzaCl7YnV0dG9uRHJhdy09MX07IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxidXR0b25EcmF3IDsgaSsrKXtcbiAgICAgICAgICAgIHRoaXMuZHJhd0J1dHRvbih0aGlzLmJ1dHRvbnNMaXN0W2ldLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVswXSwgdGhpcy5wYWRkaW5nWSsodGhpcy5idXR0b25IZWlnaHQrdGhpcy5wYWRkaW5nWSkqdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMV0sIGN0eCwgZ2FtZSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheSAmJiBjdHguaXNQb2ludEluUGF0aCh4LHkpKSB7IC8vYnV0dG9uIGNsaWNrIChvbmx5IHdoZW4gZGlzcGxheWVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc0xpc3RbaV0uZm9jdXMoKTsgXG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlRnVuY3Rpb25zKGdhbWUsIHRoaXMuYnV0dG9uc0xpc3RbaV0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgIH1cblxuXG4gICAgZHJhd0J1dHRvbihlMSwgeCwgeSwgY3R4LCBnYW1lKXsgICBcbiAgICAgICAgbGV0IGJ1dHRvbkNvbG9yID0nc3RlZWxibHVlJztcbiAgICAgICAgbGV0IHRleHRDb2xvciA9J3doaXRlJztcbiAgICAgICAgbGV0IGNvc3QgPSAwOyBcbiAgICAgICAgaWYgKGdhbWUpe1xuICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uWDE9PXgpIHsgLy9zdW1tb24gYnV0dG9ucyAvL2NoZWNrIGNvc3QgKGlmIGZpcnN0IG9yIHVwZ3JhZGUpXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyT2JqZWN0cy5maW5kKG9iaj0+IChvYmoudHlwZSA9PT0gZTEudmFsdWUpKSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1bml0ID0gZ2FtZS5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai50eXBlID09PSBlMS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gZ2FtZS5wbGF5ZXIudXBncmFkZUNvc3RbdW5pdC5sZXZlbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgKCBjb3N0ID0gZ2FtZS5wbGF5ZXIuc3VtbW9uQ29zdFtnYW1lLnBsYXllci5zdW1tb25Db3VudF0pO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLm1vbmV5PCBjb3N0KXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yID0gJ2xpZ2h0Z3JleSc7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvciA9ICdkYXJrZ3JleSc7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYnV0dG9uWDI9PXgpeyAvL2VsZW1lbnRzXG4gICAgICAgICAgICAgICAgY29zdCA9IGdhbWUucGxheWVyLmVsZW1lbnRDb3N0W2dhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF07XG4gICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLm1vbmV5PGdhbWUucGxheWVyLmVsZW1lbnRDb3N0W2dhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aF0gfHwgXG4gICAgICAgICAgICAgICAgICAgIGdhbWUucGxheWVyLmVsZW1lbnRMaXN0Lmxlbmd0aCA+PTUpe1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Db2xvciA9ICdsaWdodGdyZXknO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSAnZGFya2dyZXknOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJ1dHRvbkNvbG9yOyAgLy9idXR0b24gYmFja2dyb3VuZFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5yb3VuZFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0LCAzKTsgXG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICBcbiAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250OyBcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyAvL2J1dHRvbiB0ZXh0IFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dENvbG9yO1xuICAgICAgICBpZiAoZ2FtZSl7XG4gICAgICAgICAgICAgaWYgKGdhbWUuc3RvcmFnZS5sZW5ndGg+MCl7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGVzdCA9IGdhbWUuc3RvcmFnZS5maW5kKG9iaj0+IG9iai50eXBlPT1lMS52YWx1ZSk7IFxuICAgICAgICAgICAgICAgIGlmICh0ZXN0KXsgXG4gICAgICAgICAgICAgICAgICAgIGUxLnRleHRDb250ZW50ID0gJ1Jlc3VtbW9uIEx2bCAnK3Rlc3QubGV2ZWwrJyAnK3RoaXMubmFtZUhhc2hbZTEudmFsdWVdOyBcbiAgICAgICAgICAgICAgICAgICAgY29zdCA9IDA7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzMpOyBcbiAgICAgICAgaWYgKGNvc3Qpe1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCcoJytjb3N0KycgbWVzb3MpJywgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrMip0aGlzLmJ1dHRvbkhlaWdodC8zKTt9XG4gICAgICAgIC8vZWxzZSB7IGN0eC5maWxsVGV4dCgnTUFYJywgeCt0aGlzLmJ1dHRvbldpZHRoLzIsIHkrMip0aGlzLmJ1dHRvbkhlaWdodC8zKTt9XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL2NvbGxpc2lvbiBwYXRoIFxuICAgICAgICBjdHgucmVjdCh4LHksIHRoaXMuYnV0dG9uV2lkdGgsIHRoaXMuYnV0dG9uSGVpZ2h0KTsgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHRvZ2dsZU1lbnUoKXsgXG4gICAgICAgIHRoaXMuZGlzcGxheSA9ICF0aGlzLmRpc3BsYXk7IFxuICAgIH1cblxuICAgIHB1cmNoYXNlKGdhbWUpe1xuICAgICAgICBsZXQgaSA9ICh0aGlzLnNlbGVjdGlvblgtMSkqNSArICh0aGlzLnNlbGVjdGlvblktMSk7XG4gICAgICAgIHRoaXMudXBncmFkZUZ1bmN0aW9ucyhnYW1lLCB0aGlzLmJ1dHRvbnNMaXN0W2ldKTsgXG4gICAgfVxuXG4gICAgc2VsZWN0ZWREZXNjcmlwKCl7XG4gICAgICAgIGxldCBpID0gKHRoaXMuc2VsZWN0aW9uWC0xKSo1ICsgKHRoaXMuc2VsZWN0aW9uWS0xKTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvblRleHQgPSB0aGlzLnB1cmNoYXNlRGVzY3JpcHRpb25bdGhpcy5idXR0b25zTGlzdFtpXS52YWx1ZV07IFxuICAgIH1cblxuICAgIGRpc3BsYXlNZW51KGN0eCwgZ2FtZSl7IC8vdXBncmFkZSB3aW5kb3cgYmFja2dyb3VuZFxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5KXtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMyk7IC8vd2hpdGUgd2luZG93XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4LCBnYW1lKTsgLy9kcmF3IGJ1dHRvblxuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMjgyODI4XCI7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucm91bmRSZWN0KHRoaXMuY29zdFBvc2l0aW9uLTIqdGhpcy5wYWRkaW5nLCAyKnRoaXMucGFkZGluZ1ksIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RXaWR0aCwgdGhpcy5jb3N0SGVpZ2h0KjguNSwgMyk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsgXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcblxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IFwiNVwiOyBcbiAgICAgICAgICAgIGN0eC5yb3VuZFJlY3QodGhpcy5idXR0b25YMSArICh0aGlzLnNlbGVjdGlvblgtMSkqKHRoaXMuYnV0dG9uV2lkdGgrIHRoaXMucGFkZGluZyksIFxuICAgICAgICAgICAgICAgIDIqdGhpcy5wYWRkaW5nWSsodGhpcy5idXR0b25IZWlnaHQrdGhpcy5wYWRkaW5nWSkqKHRoaXMuc2VsZWN0aW9uWS0xKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25XaWR0aCx0aGlzLmJ1dHRvbkhlaWdodCwgMyk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREZXNjcmlwKCk7IC8vXG4gICAgICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQyOyBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5kZXNjcmlwdGlvblRleHQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmRlc2NyaXB0aW9uVGV4dFtpXSwgdGhpcy5jb3N0UG9zaXRpb24tMjUsXG4gICAgICAgICAgICAgICAgNip0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqaSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gZm9yIChsZXQgaT0wOyBpPHRoaXMuY29zdFRleHQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgLy8gICAgIGZvciAobGV0IGo9MDsgajx0aGlzLmNvc3RUZXh0W2ldLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgIC8vICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuY29zdFRleHRbaV1bal0sIHRoaXMuY29zdFBvc2l0aW9uKyh0aGlzLmNvc3RXaWR0aC8zKSpqLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgNSp0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqaSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIDkwKTsgXG4gICAgICAgICAgICAvLyB9fSAgICAgIFxuXG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAgdGhpcy5mb250MjsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlPSAnYmxhY2snO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMubm90ZSwgdGhpcy5idXR0b25YMSsxMCwgdGhpcy5oZWlnaHQtMTApO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgIFxuXG5cbiAgICAgICAgICAgIFxuICAgIH1cblxuXG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVTY3JlZW5cIik7IC8vIGdldHMgY2FudmFzIGVsZW1lbnRcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgLy9jcmVhdGVzIDJEIHJlbmRlcmluZyBvYmplY3RcblxuY29uc3QgZ2FtZVdpZHRoID0gMTAwMDtcbmNvbnN0IGdhbWVIZWlnaHQgPSA1MDA7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KVxuZ2FtZS5zdGFydCgpOyAvL2NyZWF0ZXMgZ2FtZSBvYmplY3RzOyBcbmxldCBsYXN0VGltZSA9IDAgOyAvL2luaXRpYWxpemUgdGltZVxuLy8gc2V0VGltZW91dCgoKT0+IHtnYW1lLmZhZGVPdXQgPSB0cnVlfSwgXCIzMDAwXCIpXG5cbmZ1bmN0aW9uIGdhbWVMb29wKHRpbWVzdGFtcCl7XG4gICAgLy9sZXQgZGVsdGFUaW1lID0gdGltZXN0YW1wIC0gbGFzdFRpbWU7IFxuICAgIC8vL2xhc3RUaW1lID0gdGltZXN0YW1wOyBcbiAgICBjdHguY2xlYXJSZWN0KDAsMCwgZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KTsgLy9yZWZyZXNoIHNjcmVlblxuICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wKTtcbiAgICBnYW1lLnVwZGF0ZSh0aW1lc3RhbXApO1xuICAgIGdhbWUubmV4dFdhdmVMb2FkZXIodGltZXN0YW1wKTsgLy9sb2FkcyB3YXZlIGxpc3RcbiAgICBnYW1lLndhdmVMb2FkZXIodGltZXN0YW1wKTsgLy8gbG9hZHMgZWFjaCBtb2IgZnJvbSB3YXZlIGxpc3RcbiAgICBnYW1lLmRyYXdHcmlkKGN0eCk7XG4gICAgZ2FtZS5kcmF3KGN0eCk7IFxuICAgIGdhbWUudXBncmFkZU1lbnUoY3R4KVxuICAgIGdhbWUud2F2ZUNsZWFyKCk7XG4gICAgZ2FtZS5uZXh0TGV2ZWxMb2FkZXIoKTtcbiAgICBcbiAgICBnYW1lLnNjcmVlblRyYW5zaXRpb24oY3R4KTtcbiAgICAgICBcbiAgICBcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7IFxuXG59XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7IFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9