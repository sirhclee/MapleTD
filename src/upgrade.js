
export default class Upgrade{
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