import img from './img';

export default class SpriteAnimation{
    images = [];
    constructor(fileName, numberOfImages, timerCount, state, stop){
        for (let i = 0; i<=numberOfImages; i++){ // loads images into array 
            const image = img(fileName.replace("?", i)); 
            this.images.push(image); 
        }
        this.numberOfImages = numberOfImages;
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

    imagebyFrame(frame){ //manual export image
        return this.images[frame]; 
    }

    moveFrame(obj, pause){
        obj.timerCount--;
        if (obj.timerCount <= 0 && !this.shouldStop()){
            obj.timerCount= this.timerCountDefault; 
            if (!pause) {obj.frame++;} //animate only when unpaused
            if (obj.frame >= this.images.length){
                obj.frame = 0; 
            }
        }
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
