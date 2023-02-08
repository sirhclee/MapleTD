import Game from './game';


let canvas = document.getElementById("gameScreen"); // gets canvas element
let ctx = canvas.getContext('2d'); //creates 2D rendering object

const gameWidth = 1000;
const gameHeight = 500;

let game = new Game(gameWidth, gameHeight); 
game.start(); //creates game objects;

function gameLoop(timestamp){
    
    setTimeout(()=> {
        ctx.clearRect(0,0, gameWidth, gameHeight); //refresh screen
        //console.log(timestamp);
        
        if (game.titleDisplay){
            game.titleMenu(ctx);
        }
        else{
            if (!game.pause ){ game.update(timestamp);
            }
            game.nextWaveLoader(); //loads wave list
            game.waveLoader(); // loads each mob from wave list
            //game.pauseHandler() 
            
            game.draw(ctx); 
            game.waveClear(ctx);
            game.pauseHandler(timestamp, ctx); 
            game.upgradeMenu(ctx);
            game.nextLevelLoader(ctx); //if wave list empty, move to next level
            
            game.recallCheck();
            
        }

        game.screenTransition(ctx);

   requestAnimationFrame(gameLoop);}, 10  );  //fix framtes 
   //5 too fast
   // 10 a little too slow
   //60 too slow

}

requestAnimationFrame(gameLoop); 
