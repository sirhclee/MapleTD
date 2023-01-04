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
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left'; 
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
        this.levelList = {1: ['wave1-5', 'wave1-1']}
        this.waveStart = false;
        this.waveInfo = __webpack_require__(/*! ./waveInfo.json */ "./src/waveInfo.json");
        this.waveList = [];
        this.toLoad =[]; 
        this.rowHeight = 90; 
        this.nextWave = false; 
        this.waveFinish = false; 
        this.gameTime = 0; 
    }

    waveClear(){ // checks if wave is cleared
        if (!this.nextWave && this.waveStart && 
            this.toLoad.length == 0  && this.mobObjects.length==0 ){
            this.upgrade.display = true; 
            this.waveFinish = true; 
            //this.upgrade.displayMenu(ctx);
        } 
    }

    nextWaveLoader(time ){
        if (this.nextWave){ //load next wave data from JSON
            this.waveList = this.waveInfo[this.levelList[this.level].shift()]; //
            this.gameTime = time; //update time 
            this.waveStart = false; 
            this.wave ++; 
            this.nextWave = false; 
            this.upgrade.display = false;
            this.waveFinish = false; 
        }
    }

    waveLoader(time){//loads each mob from waveList
        if (this.toLoad.length == 0 && this.waveList.length>0) this.toLoad = this.waveList.shift(); 
        if (this.toLoad[2] <=  (time - this.gameTime)/1000 ){
            this.waveStart = true; 
            if (this.toLoad[1].length>0){
                for (let i=0; i<this.toLoad[1].length; i++){
                    this.lane = this.toLoad[1][i]-1; //sets lane to load
                    this.createMob(this, this.toLoad[0], 1);}
                }
            
            else{
                this.lane = this.toLoad[1]-1; //sets lane to load
                console.log(this.lane);
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

    createMob(parent, type, side){
        if (side === 0){ //Summon unit
            if (!this.playerObjects.find(obj=> (obj.position.y === this.player.position.y) &&  //checks for existing unit 
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
        obj.knockbackForce = 12*direction; 
    }
    aggro(obj1, obj2){ // checks if obj1 range is within obj2
        for (const target of obj2){
            if (target.health>0){
                if (obj1.hitbox[0]+obj1.hitbox[2]+obj1.range>target.hitbox[0] && 
                    obj1.hitbox[0]-obj1.range<target.hitbox[0]+target.hitbox[2]){ //aggro from right
                    
                        if (obj1.hitbox[1]+obj1.hitbox[3]/2>target.hitbox[1] && obj1.hitbox[1]+obj1.hitbox[3]/2<target.hitbox[1]+target.hitbox[3]){
                           if (obj1.aggro){obj1.attack()}; //only aggro mobs have attack animations
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
            if (obj1.health>0 && target.health>0 && obj1.lane==target.lane){
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
        console.log(obj1.damage);
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
        this.startMenu.displayMenu(ctx); 
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
                    player.speedX = -player.speed; 
                    
                    player.left = true;
                    break;

                case 68: //D move right
                    player.speedX = player.speed; 
                    player.left = false;
                    break;

                case 87: //W teleport up
                    player.teleport(-1);
                    break
                case 83: //S teleport down
                    player.teleport(1);
                    break


                case 74:  //J 
                    if (!player.jump){
                    player.speedY = 12;
                    player.jump = true;}
                    //console.log('jump[!')
                    break 

                case 75: //K
                    player.attack();
                    break

                case 96:
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
        this.width = 50; //sprite size 
        this.height = 80; 
        this.type = type; 
         
        this.value = this.typeInfo[this.type]['value']; 
        this.lootDrop = false; 
        this.projectiles = [];
        this.speed = 1;
        this.upgrade = 0; 
        
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
            this.range = 50;
            this.left = true;
            this.health = this.typeInfo[this.type]['health'];
            this.maxHealth = this.health; 
            this.armor = 0;
            this.state = 'walk';
            this.position = {  //position (rightside)
                x: this.gameWidth-130, 
                y: this.gameHeight - 95 - 90*game.lane,
            }
        }
        else { // PC pets
            this.range = 550;
            this.health = 1; 
            this.armor = 1; 
            this.state = 'stand'
            this.left = false; 
            this.position = {  //position 
            x: (game.curTile*80)+game.width/2, 
            y: game.position.y
        }};  //offset for sprites 
        //if (this.typeInfo[this.type]['yOff']) (this.position.y -=this.typeInfo[this.type]['yOff']) ;
        if (this.typeInfo[this.type]['damage']){
                this.damage = this.typeInfo[this.type]['damage']
                this.aggro = true;
                }
        else {this.damage=1; this.aggro=false};

        if (this.typeInfo[this.type]['yOff']){this.yOff = this.typeInfo[this.type]['yOff']}
        else (this.yOff=0);
        if (this.typeInfo[this.type]['xOff']){this.xOff = this.typeInfo[this.type]['xOff']}
        else (this.xOff=0);
        
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
            this.die = new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_0__["default"](this.type+'/die1_?.png', this.typeInfo[this.type]['die'], 10, "die", true);
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
    
    attack(){
        this.speedX = 0; 
        if (this.attackCD <= 0){
            if (this.side == 0){
                this.proj = new _projectile__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.typeInfo[this.type]['proj']);
                this.projectiles.push(this.proj);
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
                 this.alive = false;} 
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
                if (this.knockbackForce>0){this.knockbackForce-=1;}
                else if (this.knockbackForce<0){this.knockbackForce+=1;}
                    
                this.position.x -= (this.speedX);//-this.knockbackForce); //knockback right

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
        this.popUp = 15; 
        this.dropDown = 18;
        this.speedY = 1; 
        this.delete = false;
        this.hitbox = [this.position.x, this.position.y, this.width, this.height]; 
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
            this.position.y -= 3; 
            this.popUp -= 1; 
        } else if (this.dropDown>0){
            this.speedY += 2;
            this.position.y += 3;//+this.speedY; 
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
        this.width = 80; //sprite size 
        this.height = 80; 
        this.position = {  //position 
            x: this.width/2, 
            y: this.gameHeight - 10 - 2*game.rowHeight,
        }
        this.playerX = this.position.x - this.width/2 +18; 
        this.elePositions = [ [this.playerX -60, this.position.y], [this.playerX -40, this.position.y-40],
            [this.playerX , this.position.y-60], [this.playerX +40, this.position.y-40], 
            [this.playerX +60, this.position.y] ];
        this.rowHeight = game.rowHeight;
        this.lane = 1; 
        this.floor =  this.gameHeight - 10 - (1+this.lane)*this.rowHeight
        this.maxSpeed = 15; 
        this.speed = 3;
        this.knockbackForce = 0; 
        this.left = true;
        
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
        this.money = 10000; 
        this.summonCost = [40, 80, 160, 320, 640,1000,1000,1000,1000,1000 ];
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

        //if (this.invulnTime%5>=2 && this.invulnTime>0) {ctx.filter = 'brightness(0.9)'};
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height) //hitbox
        ctx.fillRect(this.curTile*80, this.position.y, 80, 80); //selected tile
        if (this.left){
            ctx.scale(-1,1);
            ctx.drawImage(image, -this.position.x-this.width, this.position.y);}
        else {ctx.drawImage(image, this.position.x, this.position.y); }
        ctx.filter = 'none';
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
            this.floor =  this.gameHeight - 10 - (1+this.lane)*this.rowHeight}
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
        this.hitbox = [this.position.x, this.position.y, this.width, this.height]; 



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
        this.height = 230; // game.gameHeight - 3*90; 
        this.x = (game.gameWidth-this.width)/2; 
        this.y = 0;//(this.height)
        this.padding = 25; 
        this.font = "16px arial";
        this.font2 = "20px arial";
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

     
        displayMenu(ctx){ //upgrade window background
            if (this.display){
                ctx.fillStyle = "white";
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = 'black';
                ctx.textAlign = 'start'; 
                ctx.font = this.font;
                for (let i=0; i<this.controls.length; i++){
                    ctx.fillText(this.controls[i], this.x+this.padding, this.y+this.padding*(1+i), this.width); 
                }
                this.redraw(ctx); //draw button
    
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
        this.y = 0;//(this.height)
        this.display = false; 
        this.padding = 15; 
        this.paddingY = 5;
        this.buttonWidth = 150;
        this.buttonHeight = 30;
        this.font = "12px arial";              
        this.font2 = "16px arial";  

        this.button1 = document.createElement('button');
        this.button1.textContent = 'Summon Red Dragon';
        this.button2 = document.createElement('button');
        this.button2.textContent = 'Summon Blue Dragon';
        this.button3 = document.createElement('button');
        this.button3.textContent = 'Summon Green Dragon';
        this.button4 = document.createElement('button');
        this.button4.textContent = 'Summon M. Knight';
        this.buttonX1 = this.x + this.padding; 

        this.button5 = document.createElement('button');
        this.button5.textContent = 'Blaze Sprite'; //Blaze - Flame 
        this.button6 = document.createElement('button');
        this.button6.textContent = 'Dawn Sprite '; //Dawn - Light 
        this.button7 = document.createElement('button'); 
        this.button7.textContent = 'Night Sprite'; //Night - Dark
        this.button8 = document.createElement('button');
        this.button8.textContent = 'Wind Sprite ';  //Wind - Storm
        this.button9 = document.createElement('button'); 
        this.button9.textContent = 'Thunder Sprite'; //Thunder - Lightning       

        this.buttonX2 =  this.buttonX1 + this.buttonWidth+ this.padding ; 

        this.buttonNext = document.createElement('button');
        this.buttonNext.textContent = 'Next Wave!';
        

        this.buttonPositions = [ [this.buttonX1, 0], [this.buttonX1,1], [this.buttonX1,2], [this.buttonX1,3], 
                 [this.buttonX2,0], [this.buttonX2,1], [this.buttonX2,2], [this.buttonX2,3], [this.buttonX2,4]  ]; 
        this.buttonsList = [this.button1, this.button2, this.button3, this.button4,
                    this.button5, this.button6, this.button7, this.button8, this.button9]; 

        this.buttonPositions.push([this.width - 25, 5]);
        this.buttonsList.push(this.buttonNext); 

        this.costText = [ ['', 'Upgrade Shop', '',],
                        ['#', ' Summon', 'Element'],
                        ['1', '40', '50'],
                        ['2', '80', '100'],
                        ['3', '160', '200'],
                        ['4', '320', '400'],
                        ['5+', '640', '800']];

        this.costPosition = this.buttonX2 + this.buttonWidth+ 3*this.padding; 
        this.costHeight = 20; 
        this.costWidth = 275; 
        this.costPadding = 4; 

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

    upgradeFunctions(game, i){
        if (i==0) return game.createMob(game.player, 'redDragon', 0);
        else if (i==1) return game.createMob(game.player, 'blueDragon', 0);
        else if (i==2) return game.createMob(game.player, 'greenDragon', 0);
        else if (i==3) return game.createMob(game.player, 'blackDragon', 0);
        else if (i==4) return game.addElement('Blaze');
        else if (i==5) return game.addElement('Dawn');
        else if (i==6) return game.addElement('Night');
        else if (i==7) return game.addElement('Wind');
        else if (i==8) return game.addElement('Thunder');
            
        //last button
        else return game.nextWave = true;  



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
                this.upgradeFunctions(game, i); 
            }
        }
    
    }


    drawButton(e1, x, y, ctx, game){   
        let buttonColor ='steelblue';
        let textColor ='white';
        if (game){
            if (this.buttonX1==x) {
                if (game.player.money< game.player.summonCost[game.player.summonCount]){
                    buttonColor = 'lightgrey';
                    textColor = 'darkgrey'; 
                }
            }
            else if (this.buttonX2==x){
                if (game.player.money<game.player.elementCost[game.player.elementList.length]){
                    buttonColor = 'lightgrey';
                    textColor = 'darkgrey'; 
                    }
                // else{console.log(game.player.elementCost[game.player.elementList.length])}
                }    
            }

        ctx.fillStyle = buttonColor;  //button background
        ctx.fillRect(x,y,this.buttonWidth, this.buttonHeight); 
        ctx.font =  this.font; 
        
        ctx.textAlign = 'center'; //button text 
        ctx.fillStyle = textColor;
        ctx.fillText(e1.textContent, x+this.buttonWidth/2, y+this.buttonHeight/2); 

        ctx.beginPath(); //collision path 
        ctx.rect(x,y, this.buttonWidth, this.buttonHeight); 
        
    }

    toggleMenu(){ 
        this.display = !this.display; 
    }

    displayMenu(ctx, game){ //upgrade window background
        if (this.display){
            ctx.fillStyle = "white";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            this.redraw(ctx, game); //draw button

            ctx.fillStyle = "#282828";
            ctx.fillRect(this.costPosition-2*this.padding, 2*this.paddingY, 
                    this.costWidth, this.costHeight*8.5);
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'; 
            ctx.font =  this.font2; 
            for (let i=0; i<this.costText.length; i++){
                for (let j=0; j<this.costText[i].length; j++){
                    ctx.fillText(this.costText[i][j], this.costPosition+(this.costWidth/3)*j,
                        5*this.paddingY+(this.costPadding+this.costHeight)*i,
                        90); 
            }}      

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

module.exports = JSON.parse('{"zombie":{"speed":"1","health":"2","stand":2,"walk":2,"die":10,"angry":9,"sprite":"mob","atkSpd":100,"damage":1,"value":5},"spore":{"speed":"1","health":"2","stand":2,"walk":2,"die":3,"yOff":35,"sprite":"mob","value":1},"orangeMushroom":{"speed":"1","health":"2","stand":1,"walk":2,"die":2,"yOff":20,"sprite":"mob","value":2},"greenMushroom":{"speed":"2","health":"1","stand":1,"walk":2,"die":2,"yOff":30,"sprite":"mob","value":2},"blueMushroom":{"speed":"1","health":"5","stand":1,"walk":2,"die":2,"yOff":20,"sprite":"mob","value":5},"hornyMushroom":{"speed":"2","health":"3","stand":2,"walk":2,"die":3,"yOff":30,"sprite":"mob","value":2},"mushmom":{"speed":"1","health":"30","stand":0,"walk":5,"die":5,"angry":4,"sprite":"mob","atkSpd":100,"damage":1,"value":100}}');

/***/ }),

/***/ "./src/summonInfo.json":
/*!*****************************!*\
  !*** ./src/summonInfo.json ***!
  \*****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"redDragon":{"speed":"0","proj":"fireball","stand":9,"walk":0,"die":0,"angry":6,"sprite":"pet","xOff":-35,"yOff":-20,"atkSpd":100,"damage":2,"value":100},"blueDragon":{"speed":"0","proj":"iceball","stand":9,"walk":0,"die":0,"angry":6,"sprite":"pet","xOff":-35,"yOff":-20,"atkSpd":75,"damage":1.5,"value":100},"greenDragon":{"speed":"0","proj":"poisonball","stand":9,"walk":0,"die":0,"angry":6,"sprite":"pet","xOff":-35,"yOff":-20,"atkSpd":50,"damage":1,"value":100},"blackDragon":{"speed":"0","proj":"poisonball","stand":9,"walk":0,"die":0,"angry":6,"sprite":"pet","xOff":-35,"yOff":-20,"atkSpd":50,"damage":1,"value":100},"mushroomKnight":{"speed":"0","health":25,"stand":5,"walk":0,"die":0,"angry":10,"sprite":"mob","atkSpd":200,"damage":5,"value":100,"xOff":-135,"yOff":-40}}');

/***/ }),

/***/ "./src/waveInfo.json":
/*!***************************!*\
  !*** ./src/waveInfo.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"wave1-0":[["spore",2,1],["spore",3,2]],"wave1-1":[["spore",2,2],["spore",2,3],["spore",2,4],["spore",2,5],["spore",2,6],["spore",3,10],["spore",3,11],["spore",3,12],["spore",3,13],["spore",3,14],["spore",1,18],["spore",1,19],["spore",1,20],["spore",1,21],["spore",1,22]],"wave1-2":[["orangeMushroom",2,2],["spore",2,3],["orangeMushroom",2,5],["spore",2,6],["orangeMushroom",3,10],["spore",3,11],["orangeMushroom",3,13],["spore",3,14],["orangeMushroom",1,18],["spore",1,19],["orangeMushroom",1,21],["spore",1,22],["orangeMushroom",2,24],["orangeMushroom",2,26],["orangeMushroom",2,28]],"wave1-3":[["greenMushroom",2,2],["orangeMushroom",2,4],["orangeMushroom",2,5],["orangeMushroom",2,6],["greenMushroom",3,10],["orangeMushroom",3,12],["orangeMushroom",3,13],["orangeMushroom",3,14],["greenMushroom",1,18],["orangeMushroom",1,20],["orangeMushroom",1,21],["orangeMushroom",1,22],["greenMushroom",3,24],["greenMushroom",2,25],["greenMushroom",1,26],["greenMushroom",3,27],["greenMushroom",2,28],["greenMushroom",1,29]],"wave1-4":[["blueMushroom",2,2],["orangeMushroom",2,4],["orangeMushroom",2,5],["orangeMushroom",2,6],["blueMushroom",2,10],["greenMushroom",3,12],["greenMushroom",3,13],["orangeMushroom",3,14],["orangeMushroom",3,15],["spore",3,16],["spore",3,17],["spore",3,18],["blueMushroom",2,18],["greenMushroom",1,19],["greenMushroom",1,20],["orangeMushroom",1,21],["orangeMushroom",1,22],["spore",1,23],["spore",1,24],["spore",1,25],["blueMushroom",[1,2,3],30]],"wave1-5":[["mushmom",[1,2,3],2],["orangeMushroom",[1,2,3],3],["orangeMushroom",[1,2,3],4],["orangeMushroom",[1,2,3],5],["hornyMushroom",[1,2,3],6],["hornyMushroom",[1,2,3],7]]}');

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

function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime; 
    lastTime = timestamp; 
    ctx.clearRect(0,0, gameWidth, gameHeight);
    //console.log(timestamp);
    game.update(timestamp);
    game.nextWaveLoader(timestamp); //loads wave list
    game.waveLoader(timestamp); // loads each mob from wave list
    game.drawGrid(ctx);
    game.draw(ctx); 
    game.upgradeMenu(ctx)
    game.waveClear();
 
    
    

    requestAnimationFrame(gameLoop); 

}

requestAnimationFrame(gameLoop); 
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7QUNmMEI7OztBQUcxQixvREFBb0Q7QUFDcEQsbUNBQW1DOztBQUVuQztBQUNBOztBQUVBLGVBQWUsNkNBQUk7QUFDbkIsY0FBYztBQUNkLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxpQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2FkZS8uL3NyYy9IVUQuanMiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL1Nwcml0ZUFuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvaW1nLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9pbnB1dC5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvbW9iLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9tb25leS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2FyY2FkZS8uL3NyYy9zdGFydFNjcmVlbi5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvLi9zcmMvdXBncmFkZS5qcyIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXJjYWRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hcmNhZGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYXJjYWRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhVRHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDE1MDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA3NTsgXG4gICAgICAgIHRoaXMueCA9IDA7IFxuICAgICAgICB0aGlzLnkgPSAwOyBcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gMjA7IFxuICAgICAgICB0aGlzLmZvbnQgPSBcIjE2cHggYXJpYWxcIjtcbiAgICB9XG5cbiAgICBkaXNwbGF5SFVEKGN0eCwgZ2FtZSl7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JzsgXG4gICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuXG4gICAgICAgIHRoaXMubGl2ZXMgPSBcIkxpdmVzOiBcIiArIGdhbWUucGxheWVyLmhlYWx0aDsgXG4gICAgICAgIHRoaXMubW9uZXkgPSBcIk1lc29zOiBcIiArIGdhbWUucGxheWVyLm1vbmV5O1xuICAgICAgICB0aGlzLnN0YWdlID0gXCJXYXZlOiBcIiArIGdhbWUubGV2ZWwgKyAnLScgKyBnYW1lLndhdmU7IFxuICAgICAgICB0aGlzLnRleHQgPSBbdGhpcy5saXZlcywgdGhpcy5tb25leSwgdGhpcy5zdGFnZV07IFxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudGV4dC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy50ZXh0W2ldLCB0aGlzLngrdGhpcy5wYWRkaW5nLCB0aGlzLnkrdGhpcy5wYWRkaW5nKigxK2kpLCB0aGlzLndpZHRoKTsgXG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsImltcG9ydCBpbWcgZnJvbSAnLi9pbWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVBbmltYXRpb257XG4gICAgaW1hZ2VzID0gW107XG4gICAgY29uc3RydWN0b3IoZmlsZU5hbWUsIG51bWJlck9mSW1hZ2VzLCB0aW1lckNvdW50LCBzdGF0ZSwgc3RvcCl7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPD1udW1iZXJPZkltYWdlczsgaSsrKXsgLy8gbG9hZHMgaW1hZ2VzIGludG8gYXJyYXkgXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGltZyhmaWxlTmFtZS5yZXBsYWNlKFwiP1wiLCBpKSk7IFxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChpbWFnZSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50aW1lckNvdW50ID0gdGltZXJDb3VudDtcbiAgICAgICAgdGhpcy50aW1lckNvdW50RGVmYXVsdCA9IHRoaXMudGltZXJDb3VudDsgXG4gICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7IFxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7IFxuICAgICAgICB0aGlzLnN0b3AgPSBzdG9wOyBcbiAgICB9XG4gICAgXG4gICAgaXNGb3Ioc3RhdGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gc3RhdGU7IFxuICAgIH1cblxuICAgIHJlc2V0KCl7IC8vIGxvb3AgYW5pbWF0aW9uXG4gICAgICAgIHRoaXMuaW1hZ2VJbmRleCA9IDA7ICAgXG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKXsgIC8vcmV0dXJucyBmcmFtZVxuICAgICAgICB0aGlzLnNldEltYWdlSW5kZXgoKTsgXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlc1t0aGlzLmltYWdlSW5kZXhdOyBcbiAgICB9XG5cbiAgICBzZXRJbWFnZUluZGV4KCl7XG4gICAgICAgIHRoaXMudGltZXJDb3VudC0tO1xuICAgICAgICBpZiAodGhpcy50aW1lckNvdW50IDw9IDAgJiYgIXRoaXMuc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgIHRoaXMudGltZXJDb3VudD0gdGhpcy50aW1lckNvdW50RGVmYXVsdDsgXG4gICAgICAgICAgICB0aGlzLmltYWdlSW5kZXgrKzsgXG4gICAgICAgICAgICBpZiAodGhpcy5pbWFnZUluZGV4ID49IHRoaXMuaW1hZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUluZGV4ID0gMDsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRTdG9wKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3AgICYmIHRoaXMuaW1hZ2VJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoLTFcbiAgICB9XG59XG4iLCJpbXBvcnQgSW5wdXRIYW5kbGVyIGZyb20gJy4vaW5wdXQnOyBcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInOyBcbmltcG9ydCBNb2IgZnJvbSAnLi9tb2InO1xuaW1wb3J0IFVwZ3JhZGUgZnJvbSAnLi91cGdyYWRlJzsgXG5pbXBvcnQgTW9uZXkgZnJvbSAnLi9tb25leSc7IFxuaW1wb3J0IHN0YXJ0U2NyZWVuIGZyb20gJy4vc3RhcnRTY3JlZW4nOyBcbmltcG9ydCBIVUQgZnJvbSAnLi9IVUQnOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXtcbiAgICBjb25zdHJ1Y3RvcihnYW1lV2lkdGgsIGdhbWVIZWlnaHQpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodDtcbiAgICAgICAgdGhpcy5sb2FkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9W107XG4gICAgICAgIHRoaXMubW9iT2JqZWN0cyA9W107IFxuICAgICAgICB0aGlzLm1vbmV5T2JqZWN0cyA9IFtdOyBcbiAgICAgICAgdGhpcy5sZXZlbCA9IDE7IFxuICAgICAgICB0aGlzLndhdmUgPSAwOyBcbiAgICAgICAgdGhpcy5sYW5lID0gMTsgXG4gICAgICAgIHRoaXMubGV2ZWxMaXN0ID0gezE6IFsnd2F2ZTEtNScsICd3YXZlMS0xJ119XG4gICAgICAgIHRoaXMud2F2ZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2F2ZUluZm8gPSByZXF1aXJlKCcuL3dhdmVJbmZvLmpzb24nKTtcbiAgICAgICAgdGhpcy53YXZlTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnRvTG9hZCA9W107IFxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IDkwOyBcbiAgICAgICAgdGhpcy5uZXh0V2F2ZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy53YXZlRmluaXNoID0gZmFsc2U7IFxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gMDsgXG4gICAgfVxuXG4gICAgd2F2ZUNsZWFyKCl7IC8vIGNoZWNrcyBpZiB3YXZlIGlzIGNsZWFyZWRcbiAgICAgICAgaWYgKCF0aGlzLm5leHRXYXZlICYmIHRoaXMud2F2ZVN0YXJ0ICYmIFxuICAgICAgICAgICAgdGhpcy50b0xvYWQubGVuZ3RoID09IDAgICYmIHRoaXMubW9iT2JqZWN0cy5sZW5ndGg9PTAgKXtcbiAgICAgICAgICAgIHRoaXMudXBncmFkZS5kaXNwbGF5ID0gdHJ1ZTsgXG4gICAgICAgICAgICB0aGlzLndhdmVGaW5pc2ggPSB0cnVlOyBcbiAgICAgICAgICAgIC8vdGhpcy51cGdyYWRlLmRpc3BsYXlNZW51KGN0eCk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgbmV4dFdhdmVMb2FkZXIodGltZSApe1xuICAgICAgICBpZiAodGhpcy5uZXh0V2F2ZSl7IC8vbG9hZCBuZXh0IHdhdmUgZGF0YSBmcm9tIEpTT05cbiAgICAgICAgICAgIHRoaXMud2F2ZUxpc3QgPSB0aGlzLndhdmVJbmZvW3RoaXMubGV2ZWxMaXN0W3RoaXMubGV2ZWxdLnNoaWZ0KCldOyAvL1xuICAgICAgICAgICAgdGhpcy5nYW1lVGltZSA9IHRpbWU7IC8vdXBkYXRlIHRpbWUgXG4gICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IGZhbHNlOyBcbiAgICAgICAgICAgIHRoaXMud2F2ZSArKzsgXG4gICAgICAgICAgICB0aGlzLm5leHRXYXZlID0gZmFsc2U7IFxuICAgICAgICAgICAgdGhpcy51cGdyYWRlLmRpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMud2F2ZUZpbmlzaCA9IGZhbHNlOyBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdhdmVMb2FkZXIodGltZSl7Ly9sb2FkcyBlYWNoIG1vYiBmcm9tIHdhdmVMaXN0XG4gICAgICAgIGlmICh0aGlzLnRvTG9hZC5sZW5ndGggPT0gMCAmJiB0aGlzLndhdmVMaXN0Lmxlbmd0aD4wKSB0aGlzLnRvTG9hZCA9IHRoaXMud2F2ZUxpc3Quc2hpZnQoKTsgXG4gICAgICAgIGlmICh0aGlzLnRvTG9hZFsyXSA8PSAgKHRpbWUgLSB0aGlzLmdhbWVUaW1lKS8xMDAwICl7XG4gICAgICAgICAgICB0aGlzLndhdmVTdGFydCA9IHRydWU7IFxuICAgICAgICAgICAgaWYgKHRoaXMudG9Mb2FkWzFdLmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy50b0xvYWRbMV0ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhbmUgPSB0aGlzLnRvTG9hZFsxXVtpXS0xOyAvL3NldHMgbGFuZSB0byBsb2FkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9iKHRoaXMsIHRoaXMudG9Mb2FkWzBdLCAxKTt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubGFuZSA9IHRoaXMudG9Mb2FkWzFdLTE7IC8vc2V0cyBsYW5lIHRvIGxvYWRcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxhbmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9iKHRoaXMsIHRoaXMudG9Mb2FkWzBdLCAxKTt9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy50b0xvYWQgPSBbXTsgXG4gICAgICAgIH1cbiAgICB9ICAgIFxuICAgIFxuICAgIGFkZEVsZW1lbnQoZWxlbWVudCl7IC8vdXBncmFkZSBzaG9wIFxuICAgICAgIGlmICh0aGlzLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGg8NSl7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIubW9uZXk+IHRoaXMucGxheWVyLmVsZW1lbnRDb3N0WzBdKXtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5tb25leSAtPSB0aGlzLnBsYXllci5lbGVtZW50Q29zdFt0aGlzLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGhdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmVsZW1lbnRMaXN0LnB1c2goZWxlbWVudCk7IFxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmVsZW1lbnRhbHMoKTsgLy9sb2FkIHNwcml0ZXNcbiAgICAgICAgICAgICAgICAvL3RoaXMuZWxlbWVudENvc3Quc2hpZnQoKTsgIC8vZGVsZXRlIGNvc3QgXG4gICAgICAgICAgICB9XG4gICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZU1vYihwYXJlbnQsIHR5cGUsIHNpZGUpe1xuICAgICAgICBpZiAoc2lkZSA9PT0gMCl7IC8vU3VtbW9uIHVuaXRcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJPYmplY3RzLmZpbmQob2JqPT4gKG9iai5wb3NpdGlvbi55ID09PSB0aGlzLnBsYXllci5wb3NpdGlvbi55KSAmJiAgLy9jaGVja3MgZm9yIGV4aXN0aW5nIHVuaXQgXG4gICAgICAgICAgICAob2JqLnBvc2l0aW9uLnggPT09ICh0aGlzLnBsYXllci5jdXJUaWxlKjgwKSt0aGlzLnBsYXllci53aWR0aC8yKSAmJiAob2JqLm5hbWUhPT0nV2l6JykpKXtcbiAgICAgICAgICAgICAgICBsZXQgY29zdCA9IDEwMDA7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5zdW1tb25Db3N0W3RoaXMucGxheWVyLnN1bW1vbkNvdW50XSl7IFxuICAgICAgICAgICAgICAgICAgICBjb3N0ID0gdGhpcy5wbGF5ZXIuc3VtbW9uQ29zdFt0aGlzLnBsYXllci5zdW1tb25Db3VudF07IFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIubW9uZXk+PWNvc3Qpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJPYmplY3RzLnB1c2gobmV3IE1vYihwYXJlbnQsIHR5cGUsIDApKSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm1vbmV5IC09IGNvc3Q7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc3VtbW9uQ291bnQgKys7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UoY29uc29sZS5sb2coJ29jY3VwaWVkJykpOyBcbiAgICAgICAgfSBlbHNlIHt0aGlzLm1vYk9iamVjdHMucHVzaChuZXcgTW9iKHBhcmVudCwgdHlwZSwgMSkpfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBzdGFydCgpe1xuICAgICAgICB0aGlzLnN0YXJ0TWVudSA9IG5ldyBzdGFydFNjcmVlbih0aGlzKTtcbiAgICAgICAgdGhpcy5zdGFydE1lbnUuaW5pdGlhbGl6ZSh0aGlzKTsgXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzKTtcbiAgICAgICAgdGhpcy51cGdyYWRlID0gbmV3IFVwZ3JhZGUodGhpcyk7IFxuICAgICAgICB0aGlzLnVwZ3JhZGUuaW5pdGlhbGl6ZSh0aGlzKTsgXG4gICAgICAgIHRoaXMuSFVETWVudSA9IG5ldyBIVUQodGhpcyk7IFxuICAgICAgICBuZXcgSW5wdXRIYW5kbGVyKHRoaXMucGxheWVyLCB0aGlzLnVwZ3JhZGUsIHRoaXMpOyAgICAgICAgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cyA9IFt0aGlzLnBsYXllcl07XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpeyAvL3J1bnMgZHJhdyBmdW5jdGlvbiBmb3Igb2JqZWN0IGxpc3QgXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4KSApXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4KSApXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgpICk7IFxuICAgIFxuICAgIH0gXG5cbiAgICBrbm9ja2JhY2sob2JqLCBkaXJlY3Rpb24pe1xuICAgICAgICBpZiAob2JqLm5hbWUgPT0nV2l6Jyl7IC8vb25seSBwbGF5ZXIgcG9wcyB1cFxuICAgICAgICAgICAgb2JqLmp1bXAgPSB0cnVlO1xuICAgICAgICAgICAgb2JqLmludnVsblRpbWUgPSAxMDA7IFxuICAgICAgICAgICAgb2JqLnNwZWVkWSArPSA0O31cbiAgICBcbiAgICAgICAgb2JqLmhpdCA9IHRydWU7IFxuICAgICAgICBvYmoua25vY2tiYWNrRm9yY2UgPSAxMipkaXJlY3Rpb247IFxuICAgIH1cbiAgICBhZ2dybyhvYmoxLCBvYmoyKXsgLy8gY2hlY2tzIGlmIG9iajEgcmFuZ2UgaXMgd2l0aGluIG9iajJcbiAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygb2JqMil7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmhlYWx0aD4wKXtcbiAgICAgICAgICAgICAgICBpZiAob2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0rb2JqMS5yYW5nZT50YXJnZXQuaGl0Ym94WzBdICYmIFxuICAgICAgICAgICAgICAgICAgICBvYmoxLmhpdGJveFswXS1vYmoxLnJhbmdlPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSl7IC8vYWdncm8gZnJvbSByaWdodFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoxLmhpdGJveFsxXStvYmoxLmhpdGJveFszXS8yPnRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV0rb2JqMS5oaXRib3hbM10vMjx0YXJnZXQuaGl0Ym94WzFdK3RhcmdldC5oaXRib3hbM10pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEuYWdncm8pe29iajEuYXR0YWNrKCl9OyAvL29ubHkgYWdncm8gbW9icyBoYXZlIGF0dGFjayBhbmltYXRpb25zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgIH1cbiAgICBcbiAgICBsb290TW9uZXkob2JqMSwgb2JqMil7XG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIG9iajIpe1xuICAgICAgICAgICAgaWYgKCAob2JqMS5oaXRib3hbMF08dGFyZ2V0LmhpdGJveFswXSAmJiBvYmoxLmhpdGJveFswXStvYmoxLmhpdGJveFsyXT4gdGFyZ2V0LmhpdGJveFswXSkgfHwgLy9vYmoxIG9uIGxlZnRcbiAgICAgICAgICAgICAgICAob2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0+dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICYmIFxuICAgICAgICAgICAgICAgIG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0rdGFyZ2V0LmhpdGJveFsyXSApKXsgLy9vYmoxIG9uIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKG9iajEuaGl0Ym94WzFdPHRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV0rb2JqMS5oaXRib3hbM10+dGFyZ2V0LmhpdGJveFsxXSl7XG4gICAgICAgICAgICAgICAgICAgIG9iajEubW9uZXkgKz0gdGFyZ2V0LnZhbHVlOyBcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqMS5tb25leSk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5kZWxldGUgPSB0cnVlOy8vdHJ1ZTsgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuXG4gICAgICAgIHRoaXMubW9uZXlPYmplY3RzID0gdGhpcy5tb25leU9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGxvb3RlZCBjb2luc1xuICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtyZXR1cm4gb2JqZWN0LmRlbGV0ZSA9PSBmYWxzZTsgfSk7ICAgICBcbiAgICB9XG5cblxuICAgIGNvbGxpc2lvbihvYmoxLCBvYmoyKXsgLy8gY2hlY2tzIGlmIG9iajEgaXMgaGl0dGluZyBvYmoyIFxuICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBvYmoyKXtcbiAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0YXJnZXQpO1xuICAgICAgICAgICAgaWYgKG9iajEuaGVhbHRoPjAgJiYgdGFyZ2V0LmhlYWx0aD4wICYmIG9iajEubGFuZT09dGFyZ2V0LmxhbmUpe1xuICAgICAgICAgICAgICAgIGlmICggKG9iajEuaGl0Ym94WzBdPHRhcmdldC5oaXRib3hbMF0gJiYgb2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0+IHRhcmdldC5oaXRib3hbMF0pIHx8IC8vb2JqMSAtPnRhcmdldFxuICAgICAgICAgICAgICAgICAgICAob2JqMS5oaXRib3hbMF0rb2JqMS5oaXRib3hbMl0+dGFyZ2V0LmhpdGJveFswXSt0YXJnZXQuaGl0Ym94WzJdICYmIFxuICAgICAgICAgICAgICAgICAgICBvYmoxLmhpdGJveFswXTx0YXJnZXQuaGl0Ym94WzBdK3RhcmdldC5oaXRib3hbMl0gKSl7IC8vIHRhcmdldCA8LSBvYmoxXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iajEuaGl0Ym94WzFdPnRhcmdldC5oaXRib3hbMV0gJiYgb2JqMS5oaXRib3hbMV08dGFyZ2V0LmhpdGJveFsxXSt0YXJnZXQuaGl0Ym94WzNdKXsgLy95LWJvdW5kaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqMS5wcm9qZWN0aWxlICYmICFvYmoxLmV4cGxvZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuZXhwbG9kZSA9IHRydWU7IC8vZGVzdHJveSBwcm9qZWN0aWxlICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvYmoxLnByb2plY3RpbGUpIHRoaXMuZGFtYWdlQ2FsYyhvYmoxLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICBkYW1hZ2VDYWxjKG9iajEsIG9iajIpeyAvL29iajEgYXR0YWNraW5nIG9iajJcbiAgICAgICAgY29uc29sZS5sb2cob2JqMS5kYW1hZ2UpO1xuICAgICAgICBpZiAob2JqMi5pbnZ1bG5UaW1lID09IDAgJiYgb2JqMS50b3VjaEhpdCkge1xuICAgICAgICAgICAgb2JqMi5oZWFsdGggLT0gKG9iajEuZGFtYWdlLW9iajIuYXJtb3IpO1xuICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gKz0gKG9iajEuZGFtYWdlLW9iajIuYXJtb3IpXG4gICAgICAgICAgICBpZiAob2JqMi5rbm9ja2JhY2tUaHJlc2ggPD0gb2JqMi5rbm9ja2JhY2tTdW0pe1xuICAgICAgICAgICAgICAgIGlmIChvYmoxLnBvc2l0aW9uLng+b2JqMi5wb3NpdGlvbi54KXsgdGhpcy5rbm9ja2JhY2sob2JqMiwgMSl9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmtub2NrYmFjayhvYmoyLCAtMSk7XG4gICAgICAgICAgICAgICAgb2JqMi5rbm9ja2JhY2tTdW0gPSAwIFxuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuXG4gICAgfVxuICAgIGxvc2VMaWZlKCl7XG4gICAgICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMubW9iT2JqZWN0cyl7XG4gICAgICAgICAgICBpZiAob2JqLnBvc2l0aW9uLnggPD0gLW9iai53aWR0aCoyKXtcbiAgICAgICAgICAgICAgICBvYmouYWxpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5oZWFsdGggLT0gMTsgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wbGF5ZXIuaGVhbHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGRyYXdHcmlkKGN0eCl7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTsgIC8vIHRoaXMuZ2FtZUhlaWdodCA9IGdhbWVIZWlnaHRcbiAgICAgICAgY3R4Lm1vdmVUbygwLCB0aGlzLmdhbWVIZWlnaHQpO1xuICAgICAgICBjdHgubGluZVRvKDEwMDAsIHRoaXMuZ2FtZUhlaWdodCk7XG4gICAgICAgIGN0eC5saW5lVG8oMTAwMCwgdGhpcy5nYW1lSGVpZ2h0IC0gdGhpcy5yb3dIZWlnaHQpO1xuICAgICAgICBjdHgubGluZVRvKDAsIHRoaXMuZ2FtZUhlaWdodCAtIHRoaXMucm93SGVpZ2h0KTtcbiAgICAgICAgY3R4LmxpbmVUbygwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCoyKTtcbiAgICAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCoyKTtcbiAgICAgICAgY3R4LmxpbmVUbygxMDAwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCozKTtcbiAgICAgICAgY3R4LmxpbmVUbygwLCB0aGlzLmdhbWVIZWlnaHQgLSB0aGlzLnJvd0hlaWdodCozKTsgICAgICAgIFxuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgdXBncmFkZU1lbnUoY3R4KXtcbiAgICAgICAgdGhpcy5IVURNZW51LmRpc3BsYXlIVUQoY3R4LCB0aGlzKTsgXG4gICAgICAgIHRoaXMuc3RhcnRNZW51LmRpc3BsYXlNZW51KGN0eCk7IFxuICAgICAgICB0aGlzLnVwZ3JhZGUuZGlzcGxheU1lbnUoY3R4LCB0aGlzKTtcbiAgICB9XG4gICAgc3Bhd25Nb25leShvYmope1xuICAgICAgICBpZiAob2JqLnN0YXRlID09ICdkaWUnICYmICFvYmoubG9vdERyb3Ape1xuICAgICAgICAgICAgdGhpcy5tb25leU9iamVjdHMucHVzaChuZXcgTW9uZXkob2JqKSlcbiAgICAgICAgICAgIG9iai5sb290RHJvcCA9IHRydWU7IFxuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZSh0aW1lKXtcbiAgICAgICAgdGhpcy5tb2JPYmplY3RzLmZvckVhY2goIChvYmplY3QpPT50aGlzLnNwYXduTW9uZXkob2JqZWN0KSk7IFxuICAgICAgICB0aGlzLmxvc2VMaWZlKCk7IC8vZW5lbWllcyBwYXN0IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMgPSB0aGlzLm1vYk9iamVjdHMuZmlsdGVyKCAgLy9yZW1vdmVzIGRlYWQvcGFzc2luZyBvYmplY3RzXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0LmFsaXZlICE9PSBmYWxzZTt9KTsgICAgICAgIFxuICAgICAgICB0aGlzLmxvb3RNb25leSh0aGlzLnBsYXllciwgdGhpcy5tb25leU9iamVjdHMpO1xuXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LnVwZGF0ZSgpICk7IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgdGhpcy5tb25leU9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9Pm9iamVjdC51cGRhdGUoKSApOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+dGhpcy5hZ2dybyhvYmplY3QsIHRoaXMubW9iT2JqZWN0cykgKTsgXG4gICAgICAgIHRoaXMubW9iT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+dGhpcy5hZ2dybyhvYmplY3QsIHRoaXMucGxheWVyT2JqZWN0cykgKTsgXG5cbiAgICAgICAgdGhpcy5jb2xsaXNpb24odGhpcy5wbGF5ZXIsIHRoaXMubW9iT2JqZWN0cyk7IFxuICAgICAgICB0aGlzLm1vYk9iamVjdHMuZm9yRWFjaCggKG9iamVjdCk9PnRoaXMuY29sbGlzaW9uKG9iamVjdCwgdGhpcy5wbGF5ZXJPYmplY3RzKSApOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGxheWVyT2JqZWN0cy5mb3JFYWNoKCAob2JqZWN0KT0+XG4gICAgICAgICAgICBvYmplY3QucHJvamVjdGlsZXMuZm9yRWFjaCggKG9iamVjdDIpPT4gXG4gICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uKG9iamVjdDIsIHRoaXMubW9iT2JqZWN0cylcbiAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICk7IFxuXG4gICAgfVxuICAgXG5cbiAgICBcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbWcoZmlsZSl7XHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpOyBcclxuICAgIGltYWdlLnNyYyA9ICdpbWFnZXMvJytmaWxlOyBcclxuICAgIHJldHVybiBpbWFnZTsgXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRIYW5kbGVye1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgdXBncmFkZSwgR2FtZSl7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+eyAgICBcbiAgICAgICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKXsgLy9hOjY1OyBzOjgzOyBkOjY4LCB3OiA4NztcbiAgICAgICAgICAgICAgICBjYXNlIDY1OiAvL0EgbW92ZSBsZWZ0IFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc3BlZWRYID0gLXBsYXllci5zcGVlZDsgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA2ODogLy9EIG1vdmUgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNwZWVkWCA9IHBsYXllci5zcGVlZDsgXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5sZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA4NzogLy9XIHRlbGVwb3J0IHVwXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci50ZWxlcG9ydCgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSA4MzogLy9TIHRlbGVwb3J0IGRvd25cbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnRlbGVwb3J0KDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG5cbiAgICAgICAgICAgICAgICBjYXNlIDc0OiAgLy9KIFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBsYXllci5qdW1wKXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNwZWVkWSA9IDEyO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuanVtcCA9IHRydWU7fVxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdqdW1wWyEnKVxuICAgICAgICAgICAgICAgICAgICBicmVhayBcblxuICAgICAgICAgICAgICAgIGNhc2UgNzU6IC8vS1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuYXR0YWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDk2OlxuICAgICAgICAgICAgICAgICAgICB1cGdyYWRlLnRvZ2dsZU1lbnUoKTsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIDk3OiAvLzFcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAncmVkRHJhZ29uJywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSA5ODogLy8yXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ2JsdWVEcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDk5OiAvLzNcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5jcmVhdGVNb2IocGxheWVyLCAnZ3JlZW5EcmFnb24nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDogLy80XG4gICAgICAgICAgICAgICAgICAgIEdhbWUuY3JlYXRlTW9iKHBsYXllciwgJ211c2hyb29tS25pZ2h0JywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT57ICAgIFxuICAgICAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpeyAvL2E6NjU7IHM6ODM7IGQ6NjgsIHc6IDg3O1xuICAgICAgICAgICAgICAgIGNhc2UgNjU6ICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5zcGVlZFg8MCkgcGxheWVyLnNwZWVkWCA9IDA7IFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLnNwZWVkWD4wKSBwbGF5ZXIuc3BlZWRYID0gMDsgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQgU3ByaXRlQW5pbWF0aW9uIGZyb20gJy4vU3ByaXRlQW5pbWF0aW9uJzsgXG5pbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9ie1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHR5cGUsIHNpZGUpe1xuICAgICAgICB0aGlzLnNpZGUgPSBzaWRlO1xuICAgICAgICBpZiAodGhpcy5zaWRlID09IDApe3RoaXMudHlwZUluZm8gPSByZXF1aXJlKCcuL3N1bW1vbkluZm8uanNvbicpIH1cbiAgICAgICAgZWxzZSAodGhpcy50eXBlSW5mbyA9IHJlcXVpcmUoJy4vbW9iSW5mby5qc29uJykpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSA1MDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA4MDsgXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7IFxuICAgICAgICAgXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3ZhbHVlJ107IFxuICAgICAgICB0aGlzLmxvb3REcm9wID0gZmFsc2U7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgICAgICB0aGlzLnVwZ3JhZGUgPSAwOyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlOyAgXG4gICAgICAgIHRoaXMuaW52dWxuVGltZSA9ICAwOyBcbiAgICAgICAgdGhpcy5hdHRhY2tDRCA9IDA7IFxuICAgICAgICB0aGlzLm1heFNwZWVkID0gMTU7IFxuICAgICAgICB0aGlzLnNwZWVkID0gMjtcbiAgICAgICAgdGhpcy50b3VjaEhpdCA9IHRydWU7IFxuICAgICAgICB0aGlzLmtub2NrYmFja0ZvcmNlID0gMDsgXG4gICAgICAgIHRoaXMuc3ByaXRlID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzcHJpdGUnXTsgXG4gICAgICAgIC8vdGhpcy5kYW1hZ2UgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RhbWFnZSddOyBcbiAgICAgICAgdGhpcy5hdHRhY2tTcGVlZCA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYXRrU3BkJ107IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5zcGVlZFggPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3NwZWVkJ107XG4gICAgICAgIHRoaXMuc3BlZWRZID0gMDsgXG4gICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUgPSAxO1xuICAgICAgICB0aGlzLmxhbmUgPSBnYW1lLmxhbmU7ICAvLyB3aGljaCBsYW5lXG4gICAgICAgIGlmICh0aGlzLnNpZGUgPT0gMSl7IC8vRW5lbXkgTW9iIFxuICAgICAgICAgICAgdGhpcy5yYW5nZSA9IDUwO1xuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydoZWFsdGgnXTtcbiAgICAgICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5oZWFsdGg7IFxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhbGsnO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgIC8vcG9zaXRpb24gKHJpZ2h0c2lkZSlcbiAgICAgICAgICAgICAgICB4OiB0aGlzLmdhbWVXaWR0aC0xMzAsIFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuZ2FtZUhlaWdodCAtIDk1IC0gOTAqZ2FtZS5sYW5lLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBQQyBwZXRzXG4gICAgICAgICAgICB0aGlzLnJhbmdlID0gNTUwO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSAxOyBcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgPSAxOyBcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnXG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBmYWxzZTsgXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0geyAgLy9wb3NpdGlvbiBcbiAgICAgICAgICAgIHg6IChnYW1lLmN1clRpbGUqODApK2dhbWUud2lkdGgvMiwgXG4gICAgICAgICAgICB5OiBnYW1lLnBvc2l0aW9uLnlcbiAgICAgICAgfX07ICAvL29mZnNldCBmb3Igc3ByaXRlcyBcbiAgICAgICAgLy9pZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pICh0aGlzLnBvc2l0aW9uLnkgLT10aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3lPZmYnXSkgO1xuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydkYW1hZ2UnXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ2RhbWFnZSddXG4gICAgICAgICAgICAgICAgdGhpcy5hZ2dybyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIHt0aGlzLmRhbWFnZT0xOyB0aGlzLmFnZ3JvPWZhbHNlfTtcblxuICAgICAgICBpZiAodGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd5T2ZmJ10pe3RoaXMueU9mZiA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsneU9mZiddfVxuICAgICAgICBlbHNlICh0aGlzLnlPZmY9MCk7XG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3hPZmYnXSl7dGhpcy54T2ZmID0gdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd4T2ZmJ119XG4gICAgICAgIGVsc2UgKHRoaXMueE9mZj0wKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMua25vY2tiYWNrVGhyZXNoID0gTWF0aC5mbG9vcih0aGlzLm1heEhlYWx0aCAvIDEwKTtcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tTdW0gPSAwICBcbiAgICAgICAgdGhpcy5oaXQgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpOyBcbiAgICB9XG5cbiAgICBjcmVhdGVBbmltYXRpb25zKCl7IC8vaW1wb3J0IHNwcml0ZXMgXG4gICAgICAgIHRoaXMuZnJhbWVzID0gMzA7IFxuICAgICAgICBpZiAodGhpcy5zcHJpdGU9PSdtb2InKXsgLy8gRW5lbXkgbW9ic1xuICAgICAgICAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvc3RhbmRfPy5wbmcnLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3N0YW5kJ10sIDEwLCBcInN0YW5kXCIpOyAvL3N0YW5kaW5nIHNwcml0ZXM7IFxuICAgICAgICAgICAgdGhpcy53YWxrID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy9tb3ZlXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd3YWxrJ10sIDEwLCBcIndhbGtcIik7IC8vd2Fsa2luZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMuaGl0ID0gbmV3IFNwcml0ZUFuaW1hdGlvbih0aGlzLnR5cGUrJy9oaXQxXz8ucG5nJywwLCAxMCwgXCJoaXRcIik7XG4gICAgICAgICAgICB0aGlzLmRpZSA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvZGllMV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZGllJ10sIDEwLCBcImRpZVwiLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnN0YW5kLCB0aGlzLndhbGssIHRoaXMuaGl0LCB0aGlzLmRpZV07IFxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYW5ncnknXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdyeSA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvYXR0YWNrMV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnYW5ncnknXSwgMTAsIFwiYXR0YWNrXCIsIHRydWUpXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2godGhpcy5hbmdyeSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9ICAgICAgICAgICBcbiAgICAgICAgZWxzZSB7IFxuICAgICAgICAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvc3RhbmQxXz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydzdGFuZCddLCAxMCwgXCJzdGFuZFwiKTsgLy9zdGFuZGluZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMuYW5ncnkgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMudHlwZSsnL2FuZ3J5Xz8ucG5nJywgdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWydhbmdyeSddLCAxMCwgXCJhdHRhY2tcIiwgdHJ1ZSk7IC8vd2Fsa2luZyBzcHJpdGVzOyBcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFt0aGlzLnN0YW5kLCB0aGlzLmFuZ3J5XTsgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYXR0YWNrKCl7XG4gICAgICAgIHRoaXMuc3BlZWRYID0gMDsgXG4gICAgICAgIGlmICh0aGlzLmF0dGFja0NEIDw9IDApe1xuICAgICAgICAgICAgaWYgKHRoaXMuc2lkZSA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ogPSBuZXcgUHJvamVjdGlsZSh0aGlzLCB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3Byb2onXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKHRoaXMucHJvaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFuZ3J5LnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2F0dGFjayc7IFxuICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7ICBcbiAgICAgICAgICAgICAgICAgXG4gICAgfX1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgIC8vY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7IFxuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngtdGhpcy5yYW5nZSwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoKzIqdGhpcy5yYW5nZSwgdGhpcy5oZWlnaHQpOyAvL3JhbmdlXG4gICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnO30gXG5cbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoPD0wICYmIHRoaXMuc2lkZSA9PTEpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkaWUnOyAgLy9kZWF0aCBhbmltYXRpb24gICBcbiAgICAgICAgICAgIGlmIChhbmltYXRpb24uc2hvdWxkU3RvcCgpKXtcbiAgICAgICAgICAgICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO30gXG4gICAgICAgIH0gIFxuICAgICAgICBpZiAodGhpcy5zaWRlID09IDEgJiYgdGhpcy5zdGF0ZSAhPSdkaWUnKXsgLy9oZWFsdGggYmFyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMmIyYjJiXCI7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnktMjAsIDYwLCAxMik7IC8vZW1wdHkgYm94XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjOTkwYzAyXCI7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54KzEsIHRoaXMucG9zaXRpb24ueS0xOSwgTWF0aC5mbG9vcig1OCooMS0odGhpcy5tYXhIZWFsdGggLSB0aGlzLmhlYWx0aCkvdGhpcy5tYXhIZWFsdGgpKSwgMTApOyAvL2VtcHR5IGJveFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKCk7ICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMubGVmdCl7Ly9mbGlwIGJhc2VkIG9uIHNwcml0ZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgLXRoaXMucG9zaXRpb24ueC10aGlzLndpZHRoK3RoaXMueE9mZiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZiApO31cbiAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54K3RoaXMueE9mZiwgdGhpcy5wb3NpdGlvbi55K3RoaXMueU9mZik7IH1cbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7IFxuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QuZHJhdyhjdHgpIClcbiAgICAgICAgfSAgICAgICAgICAgIFxuICAgIHVwZGF0ZSgpe1xuICAgICAgICAvL3RoaXMucG9zaXRpb24ueCAtPSB0aGlzLnNwZWVkO1xuICAgICAgICBpZiAodGhpcy5zaWRlID09PSAxKXsgIC8vIE1vYiBcbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWx0aD4wKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZFghPTApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhbGsnOyBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT0gJ3dhbGsnKSB0aGlzLnN0YXRlID0gJ3N0YW5kJzsgXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PC10aGlzLndpZHRoKjIpIHt0aGlzLnBvc2l0aW9uLnggPSAtdGhpcy53aWR0aCoyfTsgLy9sZWZ0IGJvcmRlclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLng+dGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aCkge3RoaXMucG9zaXRpb24ueCA9IHRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGg7fSAvL3JpZ2h0IGJvcmRlclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5rbm9ja2JhY2tGb3JjZSk7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMua25vY2tiYWNrRm9yY2UpPjApIHt0aGlzLnN0YXRlID0gJ2hpdCd9OyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm9ja2JhY2tGb3JjZT4wKXt0aGlzLmtub2NrYmFja0ZvcmNlLT0xO31cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPDApe3RoaXMua25vY2tiYWNrRm9yY2UrPTE7fVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggLT0gKHRoaXMuc3BlZWRYKTsvLy10aGlzLmtub2NrYmFja0ZvcmNlKTsgLy9rbm9ja2JhY2sgcmlnaHRcblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSB0aGlzLnNwZWVkWTsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWRZPjApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkWS09MC41OyBcbiAgICAgICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5qdW1wKXsgLy9ncmF2aXR5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArPSAxKnRoaXMuZ3Jhdml0eVRpbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUrPTAuNTsgXG4gICAgICAgICAgICAgICAgLy90aGlzLnN0YXRlID0gJ2p1bXAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5wb3NpdGlvbi55ID4gdGhpcy5nYW1lSGVpZ2h0LTExMCApeyAvL2JvdHRvbSBib3JkZXIgKHVwZGF0ZSBmb3IgcGxhdGZvcm1zKVxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLmdhbWVIZWlnaHQtMTEwO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuanVtcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmdyYXZpdHlUaW1lID0gMTsgXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnO1xuICAgICAgICAgICAgICAgIC8vIH0gXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKCkgKTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSB0aGlzLnByb2plY3RpbGVzLmZpbHRlciggIC8vZGVsZXRlcyBwcm9qZWN0aWxlc1xuICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC5kZWxldGUgIT09IHRydWU7IFxuICAgICAgICB9KTtcbiAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RpbGVzKTsgXG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA+MCl7dGhpcy5hdHRhY2tDRC0tfTtcblxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuXG5cblxuICAgIH1cblxufSIsImltcG9ydCBTcHJpdGVBbmltYXRpb24gZnJvbSAnLi9TcHJpdGVBbmltYXRpb24nOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uZXl7XG4gICAgY29uc3RydWN0b3Iob2JqKXtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgIC8vcG9zaXRpb24gXG4gICAgICAgICAgICB4OiAob2JqLnBvc2l0aW9uLngpK29iai53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IG9iai5wb3NpdGlvbi55KzQwfVxuICAgICAgICB0aGlzLndpZHRoID0gMzU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMzU7IFxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG9iai52YWx1ZTsgXG4gICAgICAgIHRoaXMucG9wVXAgPSAxNTsgXG4gICAgICAgIHRoaXMuZHJvcERvd24gPSAxODtcbiAgICAgICAgdGhpcy5zcGVlZFkgPSAxOyBcbiAgICAgICAgdGhpcy5kZWxldGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG4gICAgICAgIGlmICh0aGlzLnZhbHVlPjEwMCl7dGhpcy50eXBlID0gJzQnO30gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWU+NTApe3RoaXMudHlwZSA9ICczJzt9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlPjEwKXt0aGlzLnR5cGUgPSAnMic7fSBcbiAgICAgICAgZWxzZSB0aGlzLnR5cGUgPSAnMSc7IFxuICAgICAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKTsgXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAgICAgdGhpcy5zdGFuZCA9IG5ldyBTcHJpdGVBbmltYXRpb24oJ2NvaW4vQ29pbicrdGhpcy50eXBlKydfPy5wbmcnLCAzLCA2LCBcInN0YW5kXCIpO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZF1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKCdzdGFuZCcpKTsgXG4gICAgICAgIGNvbnN0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKCk7IFxuICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSlcbiAgICB9XG5cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgaWYgKHRoaXMucG9wVXA+MCl7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLT0gMzsgXG4gICAgICAgICAgICB0aGlzLnBvcFVwIC09IDE7IFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcERvd24+MCl7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWSArPSAyO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IDM7Ly8rdGhpcy5zcGVlZFk7IFxuICAgICAgICAgICAgdGhpcy5kcm9wRG93biAtPSAxOyBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cbiAgICB9XG5cbiAgICBcbn1cbiIsImltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSc7IFxuaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSA4MDsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA4MDsgXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgeDogdGhpcy53aWR0aC8yLCBcbiAgICAgICAgICAgIHk6IHRoaXMuZ2FtZUhlaWdodCAtIDEwIC0gMipnYW1lLnJvd0hlaWdodCxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsYXllclggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLndpZHRoLzIgKzE4OyBcbiAgICAgICAgdGhpcy5lbGVQb3NpdGlvbnMgPSBbIFt0aGlzLnBsYXllclggLTYwLCB0aGlzLnBvc2l0aW9uLnldLCBbdGhpcy5wbGF5ZXJYIC00MCwgdGhpcy5wb3NpdGlvbi55LTQwXSxcbiAgICAgICAgICAgIFt0aGlzLnBsYXllclggLCB0aGlzLnBvc2l0aW9uLnktNjBdLCBbdGhpcy5wbGF5ZXJYICs0MCwgdGhpcy5wb3NpdGlvbi55LTQwXSwgXG4gICAgICAgICAgICBbdGhpcy5wbGF5ZXJYICs2MCwgdGhpcy5wb3NpdGlvbi55XSBdO1xuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGdhbWUucm93SGVpZ2h0O1xuICAgICAgICB0aGlzLmxhbmUgPSAxOyBcbiAgICAgICAgdGhpcy5mbG9vciA9ICB0aGlzLmdhbWVIZWlnaHQgLSAxMCAtICgxK3RoaXMubGFuZSkqdGhpcy5yb3dIZWlnaHRcbiAgICAgICAgdGhpcy5tYXhTcGVlZCA9IDE1OyBcbiAgICAgICAgdGhpcy5zcGVlZCA9IDM7XG4gICAgICAgIHRoaXMua25vY2tiYWNrRm9yY2UgPSAwOyBcbiAgICAgICAgdGhpcy5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3BlZWRYID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZFkgPSAwOyBcbiAgICAgICAgdGhpcy5qdW1wID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUgPSAxOyBcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IFtdO1xuICAgICAgICB0aGlzLm5hbWUgPSAnV2l6JztcbiAgICAgICAgdGhpcy5oZWFsdGggPSAxMDAwMDsgXG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTsgXG4gICAgICAgIHRoaXMuaW52dWxuVGltZSA9ICAwOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tUaHJlc2ggPSAxOyBcbiAgICAgICAgdGhpcy5rbm9ja2JhY2tTdW0gPSAwXG4gICAgICAgIHRoaXMuYXJtb3IgPSAwOyBcbiAgICAgICAgdGhpcy50b3VjaEhpdCA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5hdHRhY2tTcGVlZCA9IDM1OyBcbiAgICAgICAgdGhpcy5hdHRhY2tDRCA9IDA7IFxuICAgICAgICB0aGlzLmFsaXZlID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnOyBcbiAgICAgICAgdGhpcy5jdXJUaWxlID0gMDtcbiAgICAgICAgdGhpcy5lbGVtZW50TGlzdD0gW107IC8vYWRkIHNwcml0ZXMgaGVyZSBcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlcyA9IHt9O1xuICAgICAgICB0aGlzLmVsZW1lbnRMb2FkZWRTcHJpdGUgPSB7fSA7IFxuICAgICAgICB0aGlzLmVsZW1lbnRJbmZvID0geyAnQmxhemUnOiB7J3N0YW5kJzo3LCAnbW92ZSc6IDcsICdhdHRhY2snOiA4IH0sXG4gICAgICAgICAgICAnRGF3bic6IHsnc3RhbmQnOiAxNSwgJ21vdmUnOjE1LCAnYXR0YWNrJzogOH0sXG4gICAgICAgICAgICAnTmlnaHQnOiB7J3N0YW5kJzo3LCAnbW92ZSc6NywgJ2F0dGFjayc6IDh9LFxuICAgICAgICAgICAgJ1RodW5kZXInOiB7J3N0YW5kJzogNywgJ21vdmUnOjcsICdhdHRhY2snOiA3fSxcbiAgICAgICAgICAgICdXaW5kJzogeydzdGFuZCc6IDcsICdtb3ZlJzo3LCAnYXR0YWNrJzogOX0gfVxuICAgICAgICB0aGlzLmVsZW1lbnRTdGF0ZSA9IFsnc3RhbmQnLCdzdGFuZCcsJ3N0YW5kJ107IFxuICAgICAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKTsgXG4gICAgICAgIHRoaXMuZWxlbWVudGFscygpO1xuXG4gICAgICAgIHRoaXMuc3VtbW9uQ291bnQgPSAwOyBcbiAgICAgICAgdGhpcy5tb25leSA9IDEwMDAwOyBcbiAgICAgICAgdGhpcy5zdW1tb25Db3N0ID0gWzQwLCA4MCwgMTYwLCAzMjAsIDY0MCwxMDAwLDEwMDAsMTAwMCwxMDAwLDEwMDAgXTtcbiAgICAgICAgdGhpcy5lbGVtZW50Q29zdCA9IFs1MCwgMTAwLCAyMDAsIDQwMCwgODAwXTsgXG5cblxuICAgIH1cbiAgICBlbGVtZW50YWxzKCl7IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXsgLy8gTG9hZCBlbGVtZW50YWwgc3ByaXRlcyBcbiAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50U3ByaXRlc1t0aGlzLmVsZW1lbnRMaXN0W2ldXSl7XG4gICAgICAgICAgICAgICAgbGV0IGVsZVR5cGUgPSB0aGlzLmVsZW1lbnRMaXN0W2ldOyBcbiAgICAgICAgICAgICAgICB0aGlzLnN0YW5kRWxlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihlbGVUeXBlK1wiL3N0YW5kXz8ucG5nXCIsIHRoaXMuZWxlbWVudEluZm9bZWxlVHlwZV1bJ3N0YW5kJ10sIDYsIFwic3RhbmRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRWxlID0gbmV3IFNwcml0ZUFuaW1hdGlvbihlbGVUeXBlK1wiL21vdmVfPy5wbmdcIiwgdGhpcy5lbGVtZW50SW5mb1tlbGVUeXBlXVsnbW92ZSddLCA2LCBcIndhbGtcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tFbGUgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKGVsZVR5cGUrXCIvYXR0YWNrMV8/LnBuZ1wiLCB0aGlzLmVsZW1lbnRJbmZvW2VsZVR5cGVdWydhdHRhY2snXSwgNiwgXCJzd2luZzFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlc1tlbGVUeXBlXSA9IFt0aGlzLnN0YW5kRWxlLCB0aGlzLm1vdmVFbGUsIHRoaXMuYXR0YWNrRWxlXTsgXG4gICAgICAgICAgICAgICAgLy97J3N0YW5kJzogdGhpcy5zdGFuZEVsZSwgJ21vdmUnOiB0aGlzLm1vdmVFbGUsICdhdHRhY2snOiB0aGlzLmF0dGFja0VsZX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSAxNTsgXG4gICAgICAgIHRoaXMuc3RhbmQgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2FsZXJ0Xz8ucG5nXCIsIDMsIHRoaXMuZnJhbWVzLCBcInN0YW5kXCIpOyAvL3N0YW5kaW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLndhbGsgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3dhbGsxXz8ucG5nXCIsIDMsIDEwLCBcIndhbGtcIik7IC8vd2Fsa2luZyBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy5qdW1wID0gbmV3IFNwcml0ZUFuaW1hdGlvbihcIndpemFyZC9qdW1wXz8ucG5nXCIsIDEsIDEwLCBcImp1bXBcIik7IC8vanVtcCBzcHJpdGVzO1xuICAgICAgICB0aGlzLmNhc3QgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL2FsZXJ0Xz8ucG5nXCIsIDMsIDEwLCBcInN0YW5kXCIpOyBcbiAgICAgICAgdGhpcy5zd2luZzEgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFwid2l6YXJkL3N3aW5nTzFfPy5wbmdcIiwgMywgMTIsIFwic3dpbmcxXCIsIHRydWUpOyAvL2F0dGFjayBzcHJpdGVzO1xuICAgICAgICB0aGlzLnN3aW5nMiA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPMl8/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzJcIiwgdHJ1ZSk7IFxuICAgICAgICB0aGlzLnN3aW5nMyA9IG5ldyBTcHJpdGVBbmltYXRpb24oXCJ3aXphcmQvc3dpbmdPM18/LnBuZ1wiLCAzLCAxMiwgXCJzd2luZzNcIiwgdHJ1ZSk7IFxuICAgICAgICB0aGlzLmF0dGFja0FuaW0gPSBbJ3N3aW5nMScsICdzd2luZzInLCAnc3dpbmczJ107IFxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy5zdGFuZCwgdGhpcy53YWxrLCB0aGlzLmp1bXAsIHRoaXMuc3dpbmcxLCB0aGlzLnN3aW5nMiwgdGhpcy5zd2luZzMsIHRoaXMuY2FzdF07IFxuICAgIH1cblxuICAgIGF0dGFjaygpe1xuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA8PSAwKXtcbiAgICAgICAgICAgIHRoaXMucHJvaiA9IG5ldyBQcm9qZWN0aWxlKHRoaXMsICdsaWdodG5pbmdiYWxsJyk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuYXR0YWNrQW5pbS5zaGlmdCgpOyBcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrQW5pbS5wdXNoKHRoaXMuc3RhdGUpOyBcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpLnJlc2V0KCk7IFxuICAgICAgICAgICAgdGhpcy5hdHRhY2tDRCA9IHRoaXMuYXR0YWNrU3BlZWQ7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKTtcbiAgICAgICAgICAgIC8vc2V0VGltZW91dCgoKT0+IHt0aGlzLnByb2plY3RpbGVzLnB1c2godGhpcy5wcm9qKX0sIFwiMjAwXCIpOyAvL3NsaWdodCBkZWxheSBmb3IgYW5pbWF0aW9uXG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmVsZW1lbnRMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ogPSBuZXcgUHJvamVjdGlsZSh0aGlzLCAnZmlyZWJhbGwnLHRoaXMuZWxlUG9zaXRpb25zW2ldWzBdLCB0aGlzLmVsZVBvc2l0aW9uc1tpXVsxXSApO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaCh0aGlzLnByb2opO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBkcmF3KGN0eCl7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5kKChhbmltYXRpb24pPT5hbmltYXRpb24uaXNGb3IodGhpcy5zdGF0ZSkpXG4gICAgICAgIGNvbnN0IGltYWdlID0gYW5pbWF0aW9uLmdldEltYWdlKCk7ICAgLy9nZXQgc3ByaXRlXG5cbiAgICAgICAgLy9pZiAodGhpcy5pbnZ1bG5UaW1lJTU+PTIgJiYgdGhpcy5pbnZ1bG5UaW1lPjApIHtjdHguZmlsdGVyID0gJ2JyaWdodG5lc3MoMC45KSd9O1xuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8vaGl0Ym94XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLmN1clRpbGUqODAsIHRoaXMucG9zaXRpb24ueSwgODAsIDgwKTsgLy9zZWxlY3RlZCB0aWxlXG4gICAgICAgIGlmICh0aGlzLmxlZnQpe1xuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLDEpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgLXRoaXMucG9zaXRpb24ueC10aGlzLndpZHRoLCB0aGlzLnBvc2l0aW9uLnkpO31cbiAgICAgICAgZWxzZSB7Y3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpOyB9XG4gICAgICAgIGN0eC5maWx0ZXIgPSAnbm9uZSc7XG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApO1xuICAgICAgICBcbiAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpeyAvL3Jlc2V0cyBcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnc3RhbmQnO30gXG5cbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5mb3JFYWNoKCAob2JqZWN0KT0+b2JqZWN0LmRyYXcoY3R4KSApIC8vZHJhdyBwcm9qZWN0aWxlcyBcbiAgICAgICAgLy9lbGVtZW50YWxzIFxuICAgICAgICB0aGlzLnBsYXllclggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLndpZHRoLzIgKzE4OyBcbiAgICAgICAgdGhpcy5lbGVQb3NpdGlvbnMgPSBbIFt0aGlzLnBsYXllclggLTYwLCB0aGlzLnBvc2l0aW9uLnkrNV0sIFt0aGlzLnBsYXllclggLTQwLCB0aGlzLnBvc2l0aW9uLnktMzVdLFxuICAgICAgICAgICAgW3RoaXMucGxheWVyWCAsIHRoaXMucG9zaXRpb24ueS01NV0sIFt0aGlzLnBsYXllclggKzQwLCB0aGlzLnBvc2l0aW9uLnktMzVdLCBbdGhpcy5wbGF5ZXJYICs2MCwgdGhpcy5wb3NpdGlvbi55KzVdIF07XG4gICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5lbGVtZW50TGlzdC5sZW5ndGg7IGkrKyl7IC8vIExvYWQgZWxlbWVudGFsIHNwcml0ZXMgXG4gICAgICAgICAgICAgICAgbGV0IGVsZVR5cGUgPSB0aGlzLmVsZW1lbnRMaXN0W2ldOyBcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudExvYWRlZFNwcml0ZVtlbGVUeXBlXSl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRTdGF0ZVtpXSAhPSAnc3dpbmcxJyAmJiB0aGlzLnN0YXRlIT0nanVtcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFN0YXRlW2ldID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09ICdzd2luZzInIHx8dGhpcy5zdGF0ZSA9PSAnc3dpbmczJyl7dGhpcy5lbGVtZW50U3RhdGVbaV09J3N3aW5nMSd9fVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmVsZW1lbnRTcHJpdGVzW2VsZVR5cGVdLmZpbmQoKGFuaW1hdGlvbik9PmFuaW1hdGlvbi5pc0Zvcih0aGlzLmVsZW1lbnRTdGF0ZVtpXSkpIC8vIGNvcGllcyBwbGF5ZXIgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdID0gYW5pbWF0aW9uLmdldEltYWdlKCk7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uLnNob3VsZFN0b3AoKSl7IC8vcmVzZXRzIEF0dGFjayBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFN0YXRlW2ldPSAnc3RhbmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlc1tlbGVUeXBlXVsyXS5yZXNldCgpIC8vcmVzZXQgXG4gICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxlZnQpe1xuICAgICAgICAgICAgICAgICAgICBjdHguc2NhbGUoLTEsMSk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdLCAtdGhpcy5lbGVQb3NpdGlvbnNbaV1bMF0tdGhpcy53aWR0aC00NSwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMV0pOyBcbiAgICAgICAgICAgICAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7fVxuICAgICAgICAgICAgICAgIGVsc2UgKGN0eC5kcmF3SW1hZ2UodGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlW2VsZVR5cGVdLCB0aGlzLmVsZVBvc2l0aW9uc1tpXVswXSwgdGhpcy5lbGVQb3NpdGlvbnNbaV1bMV0pKTsgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGVtZW50TG9hZGVkU3ByaXRlID0ge30gLy9jbGVhciBsb2FkZWQgc3ByaXRlc1xuXG4gICAgfVxuXG4gICAgdGVsZXBvcnQoZGlyZWN0aW9uKXtcbiAgICAgICAgaWYgKHRoaXMubGFuZSAtIDEqZGlyZWN0aW9uPi0xICYmIHRoaXMubGFuZSAtIDEqZGlyZWN0aW9uPDMpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMucm93SGVpZ2h0KmRpcmVjdGlvbjsyXG4gICAgICAgICAgICB0aGlzLmxhbmUgKz0gLTEqZGlyZWN0aW9uOyBcbiAgICAgICAgICAgIHRoaXMuZmxvb3IgPSAgdGhpcy5nYW1lSGVpZ2h0IC0gMTAgLSAoMSt0aGlzLmxhbmUpKnRoaXMucm93SGVpZ2h0fVxuICAgIH1cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgaWYgKHRoaXMuaW52dWxuVGltZT4wKXt0aGlzLmludnVsblRpbWUtLX07IFxuICAgICAgICBpZiAodGhpcy5hdHRhY2tDRCA+MCl7dGhpcy5hdHRhY2tDRC0tfTtcblxuICAgICAgICB0aGlzLnByb2plY3RpbGVzLmZvckVhY2goIChvYmplY3QpPT5vYmplY3QudXBkYXRlKCkgKTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZXMgPSB0aGlzLnByb2plY3RpbGVzLmZpbHRlciggIC8vZGVsZXRlcyBwcm9qZWN0aWxlc1xuICAgICAgICAgICAgZnVuY3Rpb24gKG9iamVjdCl7cmV0dXJuIG9iamVjdC5kZWxldGUgIT09IHRydWU7IFxuICAgICAgICB9KTtcbiAgICAgICAgXG5cbiAgICAgICAgaWYgKHRoaXMuc3BlZWRYIT0wICYmICF0aGlzLmF0dGFja0FuaW0uaW5jbHVkZXModGhpcy5zdGF0ZSkpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICd3YWxrJzsgXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PSAnd2FsaycpIHRoaXMuc3RhdGUgPSAnc3RhbmQnOyBcblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PC0zMCkge3RoaXMucG9zaXRpb24ueCA9IC0zMH07IC8vbGVmdCBib3JkZXJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueD50aGlzLmdhbWVXaWR0aC10aGlzLndpZHRoKSB7dGhpcy5wb3NpdGlvbi54ID0gdGhpcy5nYW1lV2lkdGgtdGhpcy53aWR0aDt9IC8vcmlnaHQgYm9yZGVyXG4gICAgICAgIHRoaXMuY3VyVGlsZSA9IE1hdGguZmxvb3IoICh0aGlzLndpZHRoLzIgK3RoaXMucG9zaXRpb24ueCkvODApO1xuXG4gICAgICAgIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPjApe3RoaXMua25vY2tiYWNrRm9yY2UtPTE7fVxuICAgICAgICBlbHNlIGlmICh0aGlzLmtub2NrYmFja0ZvcmNlPDApe3RoaXMua25vY2tiYWNrRm9yY2UrPTE7fVxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy5zcGVlZFgtdGhpcy5rbm9ja2JhY2tGb3JjZTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55IC09IHRoaXMuc3BlZWRZOyBcbiAgICAgICAgaWYgKHRoaXMuc3BlZWRZPjApe1xuICAgICAgICAgICAgdGhpcy5zcGVlZFktPTAuNTsgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuanVtcCl7IC8vZ3Jhdml0eVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IDEqdGhpcy5ncmF2aXR5VGltZTtcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eVRpbWUrPTAuNTsgXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXR0YWNrQW5pbS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkgdGhpcy5zdGF0ZSA9ICdqdW1wJztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA+IHRoaXMuZmxvb3IpeyAvL2JvdHRvbSBib3JkZXIgKHVwZGF0ZSBmb3IgcGxhdGZvcm1zKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5mbG9vcjtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZID0gMDtcbiAgICAgICAgICAgIHRoaXMuanVtcCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5VGltZSA9IDE7IFxuICAgICAgICAgICAgaWYgKCF0aGlzLmF0dGFja0FuaW0uaW5jbHVkZXModGhpcy5zdGF0ZSkpIHRoaXMuc3RhdGUgPSAnc3RhbmQnO1xuICAgICAgICB9IFxuICAgICAgICB0aGlzLmhpdGJveCA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdOyBcblxuXG5cbiAgICAgICAgLy90aGlzLnBvc2l0aW9uLngrPSA1IC8gZGVsdGFUaW1lOyBcbiAgICB9XG59IiwiaW1wb3J0IHNub3diYWxsIGZyb20gJy4vaW1hZ2VzL3Nub3diYWxsMS5wbmcnO1xuaW1wb3J0IFNwcml0ZUFuaW1hdGlvbiBmcm9tICcuL1Nwcml0ZUFuaW1hdGlvbic7IFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0aWxle1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgdHlwZT0nTm9uZScseCA9IDAsIHk9MCl7XG4gICAgICAgIHRoaXMudHlwZUluZm8gPSB7ICdOb25lJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoxLCAnZXhwbG9kZSc6MiwgJ3hPZmYnOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdmaXJlYmFsbCc6IHsnc3BlZWQnOiAxMiwgJ3RyYXZlbCc6MSwgJ2V4cGxvZGUnOjIsICd4T2ZmJzogNTV9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICdwb2lzb25iYWxsJzogeydzcGVlZCc6IDEwLCAndHJhdmVsJzoyLCAnZXhwbG9kZSc6NCwgJ3hPZmYnOjU1fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpY2ViYWxsJzogeydzcGVlZCc6IDgsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo0LCAneE9mZic6NjV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpZ2h0bmluZ2JhbGwnOiB7J3NwZWVkJzogMTIsICd0cmF2ZWwnOjIsICdleHBsb2RlJzo3LCAneE9mZic6NjB9IH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gcGxheWVyLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gcGxheWVyLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAyNTsgLy9zcHJpdGUgc2l6ZSBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyNTsgXG4gICAgICAgIHRoaXMuZXhwbG9kZSA9IGZhbHNlOyBcbiAgICAgICAgdGhpcy5kZWxldGUgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucHJvamVjdGlsZSA9IHRydWU7XG4gICAgICAgIHRoaXMudG91Y2hIaXQ9IHRydWU7XG4gICAgICAgIHRoaXMucGllcmNlID0gMTtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBwbGF5ZXIuZGFtYWdlOyBcbiAgICAgICAgdGhpcy5oZWFsdGggPTE7IFxuICAgICAgICB0aGlzLnNpZGUgPSAwOyBcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgXG4gICAgICAgIHRoaXMubGFuZSA9IHBsYXllci5sYW5lO1xuICAgICAgICB0aGlzLnN0YXRlID0gJ3RyYXZlbCc7IFxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFwiTm9uZVwiKSB7dGhpcy5jcmVhdGVBbmltYXRpb25zKCkgfVxuICAgICAgICBlbHNlIHt0aGlzLnNwcml0ZSA9IG5ldyBJbWFnZSgpOyBcbiAgICAgICAgdGhpcy5zcHJpdGUuc3JjID0gc25vd2JhbGw7fSBcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGVmdCA9IHBsYXllci5sZWZ0OyAvLyBzaG9vdCBsZWZ0XG4gICAgICAgIGlmICh4ID09IDAgJiYgeSA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7ICAvL3Bvc2l0aW9uIFxuICAgICAgICAgICAgICAgIHg6IHBsYXllci5wb3NpdGlvbi54LCBcbiAgICAgICAgICAgICAgICB5OiBwbGF5ZXIucG9zaXRpb24ueSs0NVxuICAgICAgICAgICAgfX1cbiAgICAgICAgZWxzZSB7IHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogeCszNSxcbiAgICAgICAgICAgICAgICB5OiB5KzY1fVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zcGVlZCA9IHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnc3BlZWQnXTtcbiAgICAgICAgdGhpcy5oaXRib3ggPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTsgXG5cblxuICAgIH1cblxuICAgIGNyZWF0ZUFuaW1hdGlvbnMoKXtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSA1OyBcbiAgICAgICAgdGhpcy50cmF2ZWwgPSBuZXcgU3ByaXRlQW5pbWF0aW9uKHRoaXMudHlwZSsnL3RyYXZlbF8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsndHJhdmVsJ10sIHRoaXMuZnJhbWVzLCBcInRyYXZlbFwiKTsgLy9zdGFuZGluZyBzcHJpdGVzOyBcbiAgICAgICAgdGhpcy5idXJzdCA9IG5ldyBTcHJpdGVBbmltYXRpb24odGhpcy50eXBlKycvZXhwbG9kZV8/LnBuZycsIHRoaXMudHlwZUluZm9bdGhpcy50eXBlXVsnZXhwbG9kZSddLCB0aGlzLmZyYW1lcywgXCJidXJzdFwiLCB0cnVlKTsgLy93YWxraW5nIHNwcml0ZXM7IFxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbdGhpcy50cmF2ZWwsIHRoaXMuYnVyc3RdOyBcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICAvL2N0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpOyAvL3JlZmVyZW5jZVxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFwiTm9uZVwiKXsgXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluZCgoYW5pbWF0aW9uKT0+YW5pbWF0aW9uLmlzRm9yKHRoaXMuc3RhdGUpKVxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBhbmltYXRpb24uZ2V0SW1hZ2UoKTsgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5leHBsb2RlKXt0aGlzLnN0YXRlID0gJ2J1cnN0J307IFxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbi5zaG91bGRTdG9wKCkpe3RoaXMuZGVsZXRlID0gdHJ1ZTt9XG4gICAgXG4gICAgICAgICAgICBpZiAoIXRoaXMubGVmdCl7Ly9mbGlwIGJhc2VkIG9uIHNwcml0ZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwxKTtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAtdGhpcy5wb3NpdGlvbi54LSB0aGlzLnR5cGVJbmZvW3RoaXMudHlwZV1bJ3hPZmYnXS0xMCwgdGhpcy5wb3NpdGlvbi55LTc4KTt9XG4gICAgICAgICAgICBlbHNlIHtjdHguZHJhd0ltYWdlKGltYWdlLCB0aGlzLnBvc2l0aW9uLngtdGhpcy50eXBlSW5mb1t0aGlzLnR5cGVdWyd4T2ZmJ10rMTUsIHRoaXMucG9zaXRpb24ueS03OCk7IH1cblxuICAgICAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7IFxuICAgICAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnNwcml0ZSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkrMjUpOyAvL2RyYXcgbW9iICh4LCB5LCBoZWlnaHQsIHdpZHRoKVxuICAgICAgICBpZiAodGhpcy5leHBsb2RlKXt0aGlzLmRlbGV0ZSA9IHRydWV9OyBcbiAgICAgICAgfVxuXG4gICAgfSBcblxuXG4gICAgdXBkYXRlKCl7XG4gICAgICAgIGlmICghdGhpcy5leHBsb2RlKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnQpe3RoaXMucG9zaXRpb24ueCAtPSB0aGlzLnNwZWVkO30gLy8gZGlyZWN0aW9uXG4gICAgICAgICAgICBlbHNlIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLnNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueDwtdGhpcy53aWR0aCkge3RoaXMuZGVsZXRlID0gdHJ1ZSB9O1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54PnRoaXMuZ2FtZVdpZHRoLXRoaXMud2lkdGgpIHt0aGlzLmRlbGV0ZSA9IHRydWV9O1xuXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gW3RoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07IFxuXG5cblxuXG4gICAgfVxuXG59IiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzdGFydFNjcmVlbntcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lLmdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZS5nYW1lSGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gIDYwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyMzA7IC8vIGdhbWUuZ2FtZUhlaWdodCAtIDMqOTA7IFxuICAgICAgICB0aGlzLnggPSAoZ2FtZS5nYW1lV2lkdGgtdGhpcy53aWR0aCkvMjsgXG4gICAgICAgIHRoaXMueSA9IDA7Ly8odGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDI1OyBcbiAgICAgICAgdGhpcy5mb250ID0gXCIxNnB4IGFyaWFsXCI7XG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjIwcHggYXJpYWxcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTsgXG4gICAgICAgIHRoaXMuY29udHJvbHMgPSBbXCJTdG9wIHRoZSBtb25zdGVycyBmcm9tIGFkdmFuY2luZyFcIixcIiAtIFVzZSAoV0FTRCkgdG8gbW92ZSwgKEopIHRvIGp1bXAsIGFuZCAoSykgdG8gc2hvb3QuIFVzZSAoUCkgdG8gb3BlbiBzaG9wLiBcIiwgXG4gICAgICAgICAgICBcIiAtIENvbGxlY3QgdGhlIGNvaW5zIG1vbnN0ZXJzIGRyb3AgYmVmb3JlIHRoZXkgZXhwaXJlXCIsIFxuICAgICAgICAgICAgXCIgLSBTcGVuZCBtZXNvcyBvbiB1cGdyYWRlcyAmIHN1bW1vbnMgdG8gYm9sc3RlciB5b3VyIGRlZmVuc2VcIiwgXG4gICAgICAgICAgICBcIiAtIExvc2UgbGl2ZXMgd2hlbiBtb25zdGVycyBlc2NhcGUgb3IgdG91Y2ggeW91XCIsIFwiIC0gR2FtZSBvdmVyIHdoZW4gYWxsIGxpdmVzIGxvc3QhXCJdXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnU3RhcnQhJztcbiAgICAgICAgdGhpcy5idXR0b25YMSA9IHRoaXMuZ2FtZVdpZHRoLzI7XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSA2NTtcbiAgICAgICAgdGhpcy5idXR0b25IZWlnaHQgPSAzNTsgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMueCt0aGlzLndpZHRoLSB0aGlzLmJ1dHRvbldpZHRoLXRoaXMucGFkZGluZywgdGhpcy5oZWlnaHQtdGhpcy5idXR0b25IZWlnaHQtdGhpcy5wYWRkaW5nXV0gXG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QgPSBbdGhpcy5idXR0b24xXVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbGl6ZShnYW1lKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU2NyZWVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe2VsZW0uaGFuZGxlQ2xpY2soZSwgZ2FtZSkgfSwgZmFsc2UpOyAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcmVkcmF3KGN0eCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICB0aGlzLmRyYXdCdXR0b24odGhpcy5idXR0b25zTGlzdFtpXSwgdGhpcy5idXR0b25Qb3NpdGlvbnNbaV1bMF0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEZ1bmN0aW9ucyhnYW1lKXtcbiAgICAgICAgICAgIGdhbWUubmV4dFdhdmUgPSB0cnVlOyBcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlOyBcbiAgICAgICAgfVxuXG4gICAgICAgIGhhbmRsZUNsaWNrKGUsIGdhbWUpe1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgXG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5idXR0b25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkgJiYgY3R4LmlzUG9pbnRJblBhdGgoeCx5KSkgeyAvL2J1dHRvbiBjbGljayAob25seSB3aGVuIGRpc3BsYXllZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZ1bmN0aW9ucyhnYW1lLCBpKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgpeyAgIFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdzdGVlbGJsdWUnOyAvL2RyYXcgYm9yZGVyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoeCx5LHRoaXMuYnV0dG9uV2lkdGgsdGhpcy5idXR0b25IZWlnaHQpOyBcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLmZvbnQyOyAvL2RyYXcgdGV4dCBcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGUxLnRleHRDb250ZW50LCB4K3RoaXMuYnV0dG9uV2lkdGgvMiwgeSt0aGlzLmJ1dHRvbkhlaWdodC8yKTsgXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vc2V0cyBhcmVhIGZvciBjb2xsaXNpb24gKGlzUG9pbnRJblBhdGgpXG4gICAgICAgICAgICBjdHgucmVjdCh4LHksdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQpOyAgICAgICBcbiAgICAgICAgfVxuXG4gICAgIFxuICAgICAgICBkaXNwbGF5TWVudShjdHgpeyAvL3VwZ3JhZGUgd2luZG93IGJhY2tncm91bmRcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdzdGFydCc7IFxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmNvbnRyb2xzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuY29udHJvbHNbaV0sIHRoaXMueCt0aGlzLnBhZGRpbmcsIHRoaXMueSt0aGlzLnBhZGRpbmcqKDEraSksIHRoaXMud2lkdGgpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4KTsgLy9kcmF3IGJ1dHRvblxuICAgIFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAvLyBlbHNlIHtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgICAgICBcbiAgICBcbiAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG5cbiAgICBcbiAgICAgICAgXG59IiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGdyYWRle1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWUuZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lLmdhbWVIZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSAgNjUwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDIzMDsgLy8gZ2FtZS5nYW1lSGVpZ2h0IC0gMyo5MDtcbiAgICAgICAgdGhpcy54ID0gKGdhbWUuZ2FtZVdpZHRoLXRoaXMud2lkdGgpLzI7IFxuICAgICAgICB0aGlzLnkgPSAwOy8vKHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTsgXG4gICAgICAgIHRoaXMucGFkZGluZyA9IDE1OyBcbiAgICAgICAgdGhpcy5wYWRkaW5nWSA9IDU7XG4gICAgICAgIHRoaXMuYnV0dG9uV2lkdGggPSAxNTA7XG4gICAgICAgIHRoaXMuYnV0dG9uSGVpZ2h0ID0gMzA7XG4gICAgICAgIHRoaXMuZm9udCA9IFwiMTJweCBhcmlhbFwiOyAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZm9udDIgPSBcIjE2cHggYXJpYWxcIjsgIFxuXG4gICAgICAgIHRoaXMuYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjEudGV4dENvbnRlbnQgPSAnU3VtbW9uIFJlZCBEcmFnb24nO1xuICAgICAgICB0aGlzLmJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b24yLnRleHRDb250ZW50ID0gJ1N1bW1vbiBCbHVlIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjMudGV4dENvbnRlbnQgPSAnU3VtbW9uIEdyZWVuIERyYWdvbic7XG4gICAgICAgIHRoaXMuYnV0dG9uNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjQudGV4dENvbnRlbnQgPSAnU3VtbW9uIE0uIEtuaWdodCc7XG4gICAgICAgIHRoaXMuYnV0dG9uWDEgPSB0aGlzLnggKyB0aGlzLnBhZGRpbmc7IFxuXG4gICAgICAgIHRoaXMuYnV0dG9uNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmJ1dHRvbjUudGV4dENvbnRlbnQgPSAnQmxhemUgU3ByaXRlJzsgLy9CbGF6ZSAtIEZsYW1lIFxuICAgICAgICB0aGlzLmJ1dHRvbjYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b242LnRleHRDb250ZW50ID0gJ0Rhd24gU3ByaXRlICc7IC8vRGF3biAtIExpZ2h0IFxuICAgICAgICB0aGlzLmJ1dHRvbjcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTsgXG4gICAgICAgIHRoaXMuYnV0dG9uNy50ZXh0Q29udGVudCA9ICdOaWdodCBTcHJpdGUnOyAvL05pZ2h0IC0gRGFya1xuICAgICAgICB0aGlzLmJ1dHRvbjggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b244LnRleHRDb250ZW50ID0gJ1dpbmQgU3ByaXRlICc7ICAvL1dpbmQgLSBTdG9ybVxuICAgICAgICB0aGlzLmJ1dHRvbjkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTsgXG4gICAgICAgIHRoaXMuYnV0dG9uOS50ZXh0Q29udGVudCA9ICdUaHVuZGVyIFNwcml0ZSc7IC8vVGh1bmRlciAtIExpZ2h0bmluZyAgICAgICBcblxuICAgICAgICB0aGlzLmJ1dHRvblgyID0gIHRoaXMuYnV0dG9uWDEgKyB0aGlzLmJ1dHRvbldpZHRoKyB0aGlzLnBhZGRpbmcgOyBcblxuICAgICAgICB0aGlzLmJ1dHRvbk5leHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5idXR0b25OZXh0LnRleHRDb250ZW50ID0gJ05leHQgV2F2ZSEnO1xuICAgICAgICBcblxuICAgICAgICB0aGlzLmJ1dHRvblBvc2l0aW9ucyA9IFsgW3RoaXMuYnV0dG9uWDEsIDBdLCBbdGhpcy5idXR0b25YMSwxXSwgW3RoaXMuYnV0dG9uWDEsMl0sIFt0aGlzLmJ1dHRvblgxLDNdLCBcbiAgICAgICAgICAgICAgICAgW3RoaXMuYnV0dG9uWDIsMF0sIFt0aGlzLmJ1dHRvblgyLDFdLCBbdGhpcy5idXR0b25YMiwyXSwgW3RoaXMuYnV0dG9uWDIsM10sIFt0aGlzLmJ1dHRvblgyLDRdICBdOyBcbiAgICAgICAgdGhpcy5idXR0b25zTGlzdCA9IFt0aGlzLmJ1dHRvbjEsIHRoaXMuYnV0dG9uMiwgdGhpcy5idXR0b24zLCB0aGlzLmJ1dHRvbjQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uNSwgdGhpcy5idXR0b242LCB0aGlzLmJ1dHRvbjcsIHRoaXMuYnV0dG9uOCwgdGhpcy5idXR0b245XTsgXG5cbiAgICAgICAgdGhpcy5idXR0b25Qb3NpdGlvbnMucHVzaChbdGhpcy53aWR0aCAtIDI1LCA1XSk7XG4gICAgICAgIHRoaXMuYnV0dG9uc0xpc3QucHVzaCh0aGlzLmJ1dHRvbk5leHQpOyBcblxuICAgICAgICB0aGlzLmNvc3RUZXh0ID0gWyBbJycsICdVcGdyYWRlIFNob3AnLCAnJyxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgWycjJywgJyBTdW1tb24nLCAnRWxlbWVudCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWycxJywgJzQwJywgJzUwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJzInLCAnODAnLCAnMTAwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJzMnLCAnMTYwJywgJzIwMCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWyc0JywgJzMyMCcsICc0MDAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnNSsnLCAnNjQwJywgJzgwMCddXTtcblxuICAgICAgICB0aGlzLmNvc3RQb3NpdGlvbiA9IHRoaXMuYnV0dG9uWDIgKyB0aGlzLmJ1dHRvbldpZHRoKyAzKnRoaXMucGFkZGluZzsgXG4gICAgICAgIHRoaXMuY29zdEhlaWdodCA9IDIwOyBcbiAgICAgICAgdGhpcy5jb3N0V2lkdGggPSAyNzU7IFxuICAgICAgICB0aGlzLmNvc3RQYWRkaW5nID0gNDsgXG5cbiAgICB9XG5cbiAgICBpbml0aWFsaXplKGdhbWUpe1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVNjcmVlbicpO1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMucmVkcmF3KGN0eCksIHRydWUpOyBcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtlbGVtLmhhbmRsZUNsaWNrKGUsIGdhbWUpIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZWRyYXcoY3R4LCBnYW1lICl7XG5cbiAgICAgICAgbGV0IGJ1dHRvbkRyYXcgPSB0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgXG4gICAgICAgIGlmIChnYW1lKXsgLy9ydW5zIHByaW9yIHRvIGluaXRpYWxpemF0aW9uXG4gICAgICAgICAgICBpZiAoIWdhbWUud2F2ZUZpbmlzaCl7YnV0dG9uRHJhdy09MX07ICAgICAgIH1cbiAgICAgICBmb3IgKGxldCBpID0gMDsgaTxidXR0b25EcmF3IDsgaSsrKXtcbiAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCAyKnRoaXMucGFkZGluZ1krKHRoaXMuYnV0dG9uSGVpZ2h0K3RoaXMucGFkZGluZ1kpKnRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzFdLCBjdHgsIGdhbWUpXG4gICAgICAgfVxuICAgIH1cblxuICAgIHVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgaSl7XG4gICAgICAgIGlmIChpPT0wKSByZXR1cm4gZ2FtZS5jcmVhdGVNb2IoZ2FtZS5wbGF5ZXIsICdyZWREcmFnb24nLCAwKTtcbiAgICAgICAgZWxzZSBpZiAoaT09MSkgcmV0dXJuIGdhbWUuY3JlYXRlTW9iKGdhbWUucGxheWVyLCAnYmx1ZURyYWdvbicsIDApO1xuICAgICAgICBlbHNlIGlmIChpPT0yKSByZXR1cm4gZ2FtZS5jcmVhdGVNb2IoZ2FtZS5wbGF5ZXIsICdncmVlbkRyYWdvbicsIDApO1xuICAgICAgICBlbHNlIGlmIChpPT0zKSByZXR1cm4gZ2FtZS5jcmVhdGVNb2IoZ2FtZS5wbGF5ZXIsICdibGFja0RyYWdvbicsIDApO1xuICAgICAgICBlbHNlIGlmIChpPT00KSByZXR1cm4gZ2FtZS5hZGRFbGVtZW50KCdCbGF6ZScpO1xuICAgICAgICBlbHNlIGlmIChpPT01KSByZXR1cm4gZ2FtZS5hZGRFbGVtZW50KCdEYXduJyk7XG4gICAgICAgIGVsc2UgaWYgKGk9PTYpIHJldHVybiBnYW1lLmFkZEVsZW1lbnQoJ05pZ2h0Jyk7XG4gICAgICAgIGVsc2UgaWYgKGk9PTcpIHJldHVybiBnYW1lLmFkZEVsZW1lbnQoJ1dpbmQnKTtcbiAgICAgICAgZWxzZSBpZiAoaT09OCkgcmV0dXJuIGdhbWUuYWRkRWxlbWVudCgnVGh1bmRlcicpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vbGFzdCBidXR0b25cbiAgICAgICAgZWxzZSByZXR1cm4gZ2FtZS5uZXh0V2F2ZSA9IHRydWU7ICBcblxuXG5cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhlLCBnYW1lKXtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTY3JlZW4nKTtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBcbiAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcDtcbiAgICBcbiAgICAgICAgbGV0IGJ1dHRvbkRyYXcgPSB0aGlzLmJ1dHRvbnNMaXN0Lmxlbmd0aDsgXG4gICAgICAgIGlmICghZ2FtZS53YXZlRmluaXNoKXtidXR0b25EcmF3LT0xfTsgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPGJ1dHRvbkRyYXcgOyBpKyspe1xuICAgICAgICAgICAgdGhpcy5kcmF3QnV0dG9uKHRoaXMuYnV0dG9uc0xpc3RbaV0sIHRoaXMuYnV0dG9uUG9zaXRpb25zW2ldWzBdLCB0aGlzLnBhZGRpbmdZKyh0aGlzLmJ1dHRvbkhlaWdodCt0aGlzLnBhZGRpbmdZKSp0aGlzLmJ1dHRvblBvc2l0aW9uc1tpXVsxXSwgY3R4LCBnYW1lKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ICYmIGN0eC5pc1BvaW50SW5QYXRoKHgseSkpIHsgLy9idXR0b24gY2xpY2sgKG9ubHkgd2hlbiBkaXNwbGF5ZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zTGlzdFtpXS5mb2N1cygpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVGdW5jdGlvbnMoZ2FtZSwgaSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG5cbiAgICBkcmF3QnV0dG9uKGUxLCB4LCB5LCBjdHgsIGdhbWUpeyAgIFxuICAgICAgICBsZXQgYnV0dG9uQ29sb3IgPSdzdGVlbGJsdWUnO1xuICAgICAgICBsZXQgdGV4dENvbG9yID0nd2hpdGUnO1xuICAgICAgICBpZiAoZ2FtZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5idXR0b25YMT09eCkge1xuICAgICAgICAgICAgICAgIGlmIChnYW1lLnBsYXllci5tb25leTwgZ2FtZS5wbGF5ZXIuc3VtbW9uQ29zdFtnYW1lLnBsYXllci5zdW1tb25Db3VudF0pe1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Db2xvciA9ICdsaWdodGdyZXknO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3IgPSAnZGFya2dyZXknOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmJ1dHRvblgyPT14KXtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIubW9uZXk8Z2FtZS5wbGF5ZXIuZWxlbWVudENvc3RbZ2FtZS5wbGF5ZXIuZWxlbWVudExpc3QubGVuZ3RoXSl7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yID0gJ2xpZ2h0Z3JleSc7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvciA9ICdkYXJrZ3JleSc7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZXtjb25zb2xlLmxvZyhnYW1lLnBsYXllci5lbGVtZW50Q29zdFtnYW1lLnBsYXllci5lbGVtZW50TGlzdC5sZW5ndGhdKX1cbiAgICAgICAgICAgICAgICB9ICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBidXR0b25Db2xvcjsgIC8vYnV0dG9uIGJhY2tncm91bmRcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgseSx0aGlzLmJ1dHRvbldpZHRoLCB0aGlzLmJ1dHRvbkhlaWdodCk7IFxuICAgICAgICBjdHguZm9udCA9ICB0aGlzLmZvbnQ7IFxuICAgICAgICBcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyAvL2J1dHRvbiB0ZXh0IFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dENvbG9yO1xuICAgICAgICBjdHguZmlsbFRleHQoZTEudGV4dENvbnRlbnQsIHgrdGhpcy5idXR0b25XaWR0aC8yLCB5K3RoaXMuYnV0dG9uSGVpZ2h0LzIpOyBcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vY29sbGlzaW9uIHBhdGggXG4gICAgICAgIGN0eC5yZWN0KHgseSwgdGhpcy5idXR0b25XaWR0aCwgdGhpcy5idXR0b25IZWlnaHQpOyBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdG9nZ2xlTWVudSgpeyBcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gIXRoaXMuZGlzcGxheTsgXG4gICAgfVxuXG4gICAgZGlzcGxheU1lbnUoY3R4LCBnYW1lKXsgLy91cGdyYWRlIHdpbmRvdyBiYWNrZ3JvdW5kXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXkpe1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoY3R4LCBnYW1lKTsgLy9kcmF3IGJ1dHRvblxuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMjgyODI4XCI7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5jb3N0UG9zaXRpb24tMip0aGlzLnBhZGRpbmcsIDIqdGhpcy5wYWRkaW5nWSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdFdpZHRoLCB0aGlzLmNvc3RIZWlnaHQqOC41KTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInOyBcbiAgICAgICAgICAgIGN0eC5mb250ID0gIHRoaXMuZm9udDI7IFxuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuY29zdFRleHQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajx0aGlzLmNvc3RUZXh0W2ldLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuY29zdFRleHRbaV1bal0sIHRoaXMuY29zdFBvc2l0aW9uKyh0aGlzLmNvc3RXaWR0aC8zKSpqLFxuICAgICAgICAgICAgICAgICAgICAgICAgNSp0aGlzLnBhZGRpbmdZKyh0aGlzLmNvc3RQYWRkaW5nK3RoaXMuY29zdEhlaWdodCkqaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDkwKTsgXG4gICAgICAgICAgICB9fSAgICAgIFxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUnKS5pbm5lckhUTUw9XCJcIjt9XG4gICAgICAgIFxuXG5cbiAgICAgICAgICAgIFxuICAgIH1cblxuXG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVTY3JlZW5cIik7IC8vIGdldHMgY2FudmFzIGVsZW1lbnRcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgLy9jcmVhdGVzIDJEIHJlbmRlcmluZyBvYmplY3RcblxuY29uc3QgZ2FtZVdpZHRoID0gMTAwMDtcbmNvbnN0IGdhbWVIZWlnaHQgPSA1MDA7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KVxuZ2FtZS5zdGFydCgpOyAvL2NyZWF0ZXMgZ2FtZSBvYmplY3RzOyBcbmxldCBsYXN0VGltZSA9IDAgOyAvL2luaXRpYWxpemUgdGltZVxuXG5mdW5jdGlvbiBnYW1lTG9vcCh0aW1lc3RhbXApe1xuICAgIGxldCBkZWx0YVRpbWUgPSB0aW1lc3RhbXAgLSBsYXN0VGltZTsgXG4gICAgbGFzdFRpbWUgPSB0aW1lc3RhbXA7IFxuICAgIGN0eC5jbGVhclJlY3QoMCwwLCBnYW1lV2lkdGgsIGdhbWVIZWlnaHQpO1xuICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wKTtcbiAgICBnYW1lLnVwZGF0ZSh0aW1lc3RhbXApO1xuICAgIGdhbWUubmV4dFdhdmVMb2FkZXIodGltZXN0YW1wKTsgLy9sb2FkcyB3YXZlIGxpc3RcbiAgICBnYW1lLndhdmVMb2FkZXIodGltZXN0YW1wKTsgLy8gbG9hZHMgZWFjaCBtb2IgZnJvbSB3YXZlIGxpc3RcbiAgICBnYW1lLmRyYXdHcmlkKGN0eCk7XG4gICAgZ2FtZS5kcmF3KGN0eCk7IFxuICAgIGdhbWUudXBncmFkZU1lbnUoY3R4KVxuICAgIGdhbWUud2F2ZUNsZWFyKCk7XG4gXG4gICAgXG4gICAgXG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApOyBcblxufVxuXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApOyAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=