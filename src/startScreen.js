
export default class startScreen{
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