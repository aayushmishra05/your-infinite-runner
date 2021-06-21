var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  
  
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloudsImg.png");
  
  boy1Image = loadImage("boy1.jpg");
  obstacle1 = loadImage("obstacle1.jpg");
  obstacle2 = loadImage("obstacle2.jpg");
  obstacle3 = loadImage("obstacle3.jpg");
  obstacle4 = loadImage("obstacle4.jpg");
  obstacle5 = loadImage("obstacle5.jpg");
  obstacle6 = loadImage("obstacle6.jpg");
  backgroundImage = loadImage("background.png");

  
  
  restartImg = loadImage("restartImg.png")
  gameOverImg = loadImage("gameover.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(World.width, World.height);

  var message = "This is a message";
 console.log(message);
  
  boy1 = createSprite(50,100,20,50);
 boy1.addImage(boy1Image);
 boy1.scale = 0.1;
  //boy.addAnimation("collided", boy_collided);

  ground = createSprite(World.width/2,World.height-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(World.width/2,World.height/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(World.width/2,World.width-60);
  restart.addImage(restartImg);


  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(World.width/2,World.height-10,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  boy1.setCollider("rectangle",0,0,boy1.width,boy1.height);
  
  score = 0;
  
}

function draw() {
  
background("lightgreen");
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")){
        boy1.velocityY = -14
        jumpSound.play();
    }
    
    //add gravity
    boy1.velocityY = boy1.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy1)){
        //trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   
    if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
    
     //change the trex animation
      //boy.changeAnimation("collided", trex_collided);
    
    
     
      ground.velocityX = 0;
      boy1.velocityY = 0; 
    
    
     if(mousePressedOver(restart)) {
      reset();
    
     }
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
    
    }
 
  //stop trex from falling down
  boy1.collide(invisibleGround);
  obstaclesGroup.collide(invisibleGround);
  
  
    

  drawSprites();

}

function reset(){
  score = 0; 
  restart.visible = false; 
  gameOver.visible = false; 
  //boy.changeAnimation("running", boy_running); 
  obstaclesGroup.destroyEach(); 
  cloudsGroup.destroyEach(); 
  gameState = PLAY; 

}


function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(World.width,World.height-35,10,40);
   obstacle.velocityX = -(6 + score/150);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 3: obstacle.addImage(obstacle5);
              break;
      case 3: obstacle.addImage(obstacle6);
              break;

    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 130;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = boy1.depth;
    boy1.depth = boy1.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

