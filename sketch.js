var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
 ghost = createSprite(150,300)
 ghost.addImage("walking",ghostImg)
 ghost.scale=0.3

 doorsGroup = new Group();
 climbersGroup = new Group();
}

function draw() {
  background(200);
  if(gameState === "play"){
  //to make the tower infinite 
  if(tower.y > 400){
    tower.y = 300
  }


  // to move the ghost according to keys 
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+2
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-2; 
  }
  if(keyDown("up_arrow")){
  ghost.velocityY=-10 ; 
  }
  ghost.velocityY = ghost.velocityY+0.8;


  drawSprites()
  infiniteDoor()

  if (climbersGroup.isTouching(ghost) ||ghost.y > 620 ) {
  gameState = "end"

  }

  }
  if(gameState === "end"){
      background(0);
      text("OOPS..!!! TRY AGAIN", 150,300)
  }
  
}


function infiniteDoor(){
if(frameCount%100 === 0){
door=createSprite(random(50,550),-50);
door.addImage(doorImg)
door.velocityY=1
door.lifetime=800
doorsGroup.add(door);

ghost.depth = door.depth;
ghost.depth +=1;


climber=createSprite(door.x,10);
climber.addImage(climberImg)
climber.velocityY=1
climber.lifetime=800
climbersGroup.add(climber);

   
}
}