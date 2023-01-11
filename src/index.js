import Game from './game';


let canvas = document.getElementById("gameScreen"); // gets canvas element
let ctx = canvas.getContext('2d'); //creates 2D rendering object

const gameWidth = 1000;
const gameHeight = 500;

let game = new Game(gameWidth, gameHeight)
game.start(); //creates game objects; 
let lastTime = 0 ; //initialize time
// setTimeout(()=> {game.fadeOut = true}, "3000")

function gameLoop(timestamp){
    //let deltaTime = timestamp - lastTime; 
    ///lastTime = timestamp; 
    ctx.clearRect(0,0, gameWidth, gameHeight); //refresh screen
    //console.log(timestamp);
    game.update(timestamp);
    game.nextWaveLoader(timestamp); //loads wave list
    game.waveLoader(timestamp); // loads each mob from wave list
    game.drawGrid(ctx);
    game.draw(ctx); 
    game.upgradeMenu(ctx)
    game.waveClear();
    game.nextLevelLoader();
    
    game.screenTransition(ctx);
       
    

    requestAnimationFrame(gameLoop); 

}

requestAnimationFrame(gameLoop); 
