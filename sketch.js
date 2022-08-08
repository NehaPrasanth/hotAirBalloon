var Canvas;
var backroundMg;
var balloon1Mg;
var balloon2Mg;
var balloonMg;
var balloons;
var balloon;
var ground;
var top;
var topObs1Mg;
var topObs2Mg;
var obsGrp;
var barsGrp;
var score = 0;
var bottomObs1Mg;
var bottomObs2Mg;
var bottomObs3Mg;
var bottomObsGrp;
var GameOverMg;
var restartMg;
var GameOver;
var restart;
var gameState = "play";
var dieSound;
var jumpSound;
var bg2;
var bgSprite;


function preload(){
  backroundMg = loadImage("assets/bg.png");
  balloons = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  topObs1Mg = loadImage("assets/obsTop1.png");
  topObs2Mg = loadImage("assets/obsTop2.png");
  bottomObs1Mg = loadImage("assets/obsBottom1.png");
  bottomObs2Mg = loadImage("assets/obsBottom2.png");
  bottomObs3Mg = loadImage("assets/obsBottom3.png");
  GameOverMg = loadImage("assets/gameOver.png");
  restartMg = loadImage("assets/restart.png");
  dieSound = loadSound("assets/die.mp3");
  jumpSound = loadSound("assets/jump.mp3");
  bg2 = loadImage("assets/bgImg2.jpg");

}

function setup(){
createCanvas(1200,500);

bgSprite = createSprite(100,100,1,1);
getBackgroundImg();

balloon = createSprite(200,250,20,20);
balloon.addAnimation("balloonAnm",balloons)
balloon.scale = 0.1;

ground = createSprite(600,590,1200,20);
ground.visible = false;

ground = createSprite(600,10,1200,20);
ground.visible = false;

obsGrp = createGroup();
barsGrp = createGroup();
bottomObsGrp = createGroup();

GameOver = createSprite(600,220);
GameOver.addImage("gameOver",GameOverMg);
GameOver.scale = 0.3;
GameOver.visible = false;

restart = createSprite(600,250);
restart.addImage("Restart",restartMg);
restart.scale = 0.3;
restart.visible = false;

}

function draw(){
  //background(backroundMg);

  if (gameState === "play"){

  

  if (keyDown("space")){
 balloon.velocityY = -4;
 jumpSound.play();

  }
  balloon.velocityY = balloon.velocityY+0.5;
  
  spawnObstacles();
  spawnBottomObstacles();
  bar();
  
  if (obsGrp.isTouching(balloon)||bottomObsGrp.isTouching(balloon)||balloon.isTouching(ground)){
    gameState = "end";
    dieSound.play();
  }
}

  if (gameState === "end"){
    GameOver.visible = true;
    restart.visible = true;
    balloon.velocityX = 0;
    balloon.velocityY = 0;
    obsGrp.setVelocityXEach(0);
    bottomObsGrp.setVelocityXEach(0);
    barsGrp.setVelocityXEach(0);
    obsGrp.setLifetimeEach(-1);
    bottomObsGrp.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
    }



  }
  drawSprites();
  Score();
  
  

  

}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,Math.round(random(10,100)),10,40);
    obstacle.velocityX = -7;
    obstacle.scale = 0.14;
    obstacle.lifetime = 80;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(topObs1Mg);
               break;
       case 2: obstacle.addImage(topObs2Mg);
               break;
       
       default: break;

     }
     obsGrp.add(obstacle);
     balloon.depth = obstacle.depth+1;
    }}

    function bar(){
      if (frameCount % 60 === 0){
        var obstacle = createSprite(600,200,10,1200);
        obstacle.velocityX = -7;
        obstacle.lifetime = 80;
         barsGrp.add(obstacle);
         obstacle.depth = balloon.depth;
         obstacle.visible = false;
        }
        }

        function Score(){
          if (balloon.isTouching(barsGrp)){
            score = score+1;
          }
          textSize(30);
          fill ("red");
          text("Score: "+score,1000,50);
        }

        function spawnBottomObstacles(){
          if (frameCount % 60 === 0){
            var obstacle = createSprite(600,350,10,40);
            obstacle.velocityX = -7;
            obstacle.scale = 0.15;
            obstacle.lifetime = 80;
            
             //generate random obstacles
             var rand = Math.round(random(1,3));
             switch(rand) {
               case 1: obstacle.addImage(bottomObs1Mg);
                       break;
               case 2: obstacle.addImage(bottomObs2Mg);
                       break;
               case 3: obstacle.addImage(bottomObs3Mg);
                        break;
               
               default: break;
        
             }
             bottomObsGrp.add(obstacle);
             balloon.depth = obstacle.depth+1;
            }}

            function reset(){
              gameState = "play";
              GameOver.visible = false;
              restart.visible = false;
              score = 0;
              obsGrp.destroyEach();
              bottomObsGrp.destroyEach();

            }

            async function getBackgroundImg(){
              var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
              var responseJSON = await response.json();
              var dateTime = responseJSON.datetime;
              var hour = dateTime.slice(11,13);
              if (hour>=06 && hour<=19){
                bgSprite.addImage(backroundMg);
                bgSprite.scale = 1.7;

              }

              else{
                bgSprite.addImage(bg2);
                bg2.scale = 1.5;
                bgSprite.x = 200;
                bgSprite.y = 200;
              }

            }
        

