import SpriteAnimation from './SpriteAnimation'; 
import Projectile from './projectile'; 

export default class Mob{
    constructor(game, type, side){
        this.side = side;
        if (this.side == 0){this.typeInfo = require('./summonInfo.json') }
        else (this.typeInfo = require('./mobInfo.json'))
        
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
            this.stand = new SpriteAnimation(this.type+'/stand_?.png', this.typeInfo[this.type]['stand'], 10, "stand"); //standing sprites; 
            this.walk = new SpriteAnimation(this.type+'/move_?.png', this.typeInfo[this.type]['walk'], 10, "walk"); //walking sprites; 
            this.hit = new SpriteAnimation(this.type+'/hit1_?.png',0, 10, "hit");
            this.die = new SpriteAnimation(this.type+'/die1_?.png', this.typeInfo[this.type]['die'], 10, "die", true);
            this.animations = [this.stand, this.walk, this.hit, this.die]; 
            if (this.typeInfo[this.type]['angry']){
                this.angry = new SpriteAnimation(this.type+'/attack1_?.png', this.typeInfo[this.type]['angry'], 10, "attack", true)
                this.animations.push(this.angry);
            };
        }           
        else { 
            this.stand = new SpriteAnimation(this.type+'/stand1_?.png', this.typeInfo[this.type]['stand'], 10, "stand"); //standing sprites; 
            this.angry = new SpriteAnimation(this.type+'/angry_?.png', this.typeInfo[this.type]['angry'], 10, "attack", true); //walking sprites; 
            this.animations = [this.stand, this.angry]; 
        }
    }
    
    attack(){
        this.speedX = 0; 
        if (this.attackCD <= 0){
            if (this.side == 0){
                this.proj = new Projectile(this, this.typeInfo[this.type]['proj']);
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