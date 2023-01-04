export default class InputHandler{
    constructor(player, upgrade, Game){
        document.addEventListener('keydown', (event) =>{    
            switch(event.keyCode){ //a:65; s:83; d:68, w: 87;
                case 65: //A move left 
                    player.speedX = -player.speed; 
                    
                    player.left = true;
                    break;

                case 68: //D move right
                    player.speedX = player.speed; 
                    player.left = false;
                    break;

                case 87: //W teleport up
                    player.teleport(-1);
                    break
                case 83: //S teleport down
                    player.teleport(1);
                    break


                case 74:  //J 
                    if (!player.jump){
                    player.speedY = 12;
                    player.jump = true;}
                    //console.log('jump[!')
                    break 

                case 75: //K
                    player.attack();
                    break

                case 96:
                    upgrade.toggleMenu(); 
                    break

                case 97: //1
                    Game.createMob(player, 'redDragon', 0);
                    break
                case 98: //2
                    Game.createMob(player, 'blueDragon', 0);
                    break
                case 99: //3
                    Game.createMob(player, 'greenDragon', 0);
                    break
                case 100: //4
                    Game.createMob(player, 'mushroomKnight', 0);
                    break

            }

        })
        document.addEventListener('keyup', (event) =>{    
            switch(event.keyCode){ //a:65; s:83; d:68, w: 87;
                case 65:  
                    if (player.speedX<0) player.speedX = 0; 
                    break;
                case 68:
                    if (player.speedX>0) player.speedX = 0; 
                    break;
                }
            })
        
    }
}