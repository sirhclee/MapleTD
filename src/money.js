import SpriteAnimation from './SpriteAnimation'; 

export default class Money{
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
        this.stand = new SpriteAnimation('coin/Coin'+this.type+'_?.png', 3, 6, "stand");
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
