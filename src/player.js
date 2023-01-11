import Projectile from './projectile'; 
import SpriteAnimation from './SpriteAnimation'; 

export default class Player {
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
                this.standEle = new SpriteAnimation(eleType+"/stand_?.png", this.elementInfo[eleType]['stand'], 6, "stand");
                this.moveEle = new SpriteAnimation(eleType+"/move_?.png", this.elementInfo[eleType]['move'], 6, "walk");
                this.attackEle = new SpriteAnimation(eleType+"/attack1_?.png", this.elementInfo[eleType]['attack'], 6, "swing1", true);
                this.elementSprites[eleType] = [this.standEle, this.moveEle, this.attackEle]; 
                //{'stand': this.standEle, 'move': this.moveEle, 'attack': this.attackEle}
            }
        }
    }

    createAnimations(){
        this.frames = 15; 
        this.stand = new SpriteAnimation("wizard/alert_?.png", 3, this.frames, "stand"); //standing sprites; 
        this.walk = new SpriteAnimation("wizard/walk1_?.png", 3, 10, "walk"); //walking sprites; 
        this.jump = new SpriteAnimation("wizard/jump_?.png", 1, 10, "jump"); //jump sprites;
        this.cast = new SpriteAnimation("wizard/alert_?.png", 3, 10, "stand"); 
        this.swing1 = new SpriteAnimation("wizard/swingO1_?.png", 3, 12, "swing1", true); //attack sprites;
        this.swing2 = new SpriteAnimation("wizard/swingO2_?.png", 3, 12, "swing2", true); 
        this.swing3 = new SpriteAnimation("wizard/swingO3_?.png", 3, 12, "swing3", true); 
        this.attackAnim = ['swing1', 'swing2', 'swing3']; 
        this.animations = [this.stand, this.walk, this.jump, this.swing1, this.swing2, this.swing3, this.cast]; 
    }

    attack(){
        if (this.attackCD <= 0){
            this.proj = new Projectile(this, 'lightningball');

            
            this.state = this.attackAnim.shift(); 
            this.attackAnim.push(this.state); 
            this.animations.find((animation)=>animation.isFor(this.state)).reset(); 
            this.attackCD = this.attackSpeed;
            this.projectiles.push(this.proj);
            //setTimeout(()=> {this.projectiles.push(this.proj)}, "200"); //slight delay for animation

            for (let i=0; i<this.elementList.length; i++){
                this.proj = new Projectile(this, 'fireball',this.elePositions[i][0], this.elePositions[i][1] );
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