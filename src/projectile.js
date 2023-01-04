import snowball from './images/snowball1.png';
import SpriteAnimation from './SpriteAnimation'; 

export default class Projectile{
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
        this.sprite.src = snowball;} 
        
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
        this.travel = new SpriteAnimation(this.type+'/travel_?.png', this.typeInfo[this.type]['travel'], this.frames, "travel"); //standing sprites; 
        this.burst = new SpriteAnimation(this.type+'/explode_?.png', this.typeInfo[this.type]['explode'], this.frames, "burst", true); //walking sprites; 
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