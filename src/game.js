import InputHandler from './input'; 
import Player from './player'; 
import Mob from './mob';
import Upgrade from './upgrade'; 
import Money from './money'; 
import startScreen from './startScreen'; 
import HUD from './HUD'; 
import img from './img';

export default class Game{
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
        this.bgSky = img('bg/bgSky'+this.level+'.png');
        this.bgStage = img('bg/bgStage'+this.level+'.png');
        this.waveStart = false;
        this.waveInfo = require('./waveInfo.json');
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
                this.bgSky = img('bg/bgSky'+this.level+'.png'); //reload BG art 
                this.bgStage = img('bg/bgStage'+this.level+'.png');
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
                        this.playerObjects.push(new Mob(parent, type, 0)) 
                        this.player.money -= cost; 
                        this.player.summonCount ++; 
                    }
                }
                }
            else(console.log('occupied')); 

        } else {this.mobObjects.push(new Mob(parent, type, 1))}
        
    }

    loadBG(){
        this.bgSky = img('bg/bgSky'+this.level+'.png'); //load sky bg
    }

    start(){
        this.startMenu = new startScreen(this);
        this.startMenu.initialize(this); 
        this.player = new Player(this);
        this.upgrade = new Upgrade(this); 
        this.upgrade.initialize(this); 
        this.HUDMenu = new HUD(this); 
        new InputHandler(this.player, this.upgrade, this);        
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
            this.moneyObjects.push(new Money(obj))
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