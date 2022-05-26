var track, hurdle, man, trackImg, hurdleImg,manImg, hurdleGroup;
var PLAY= 1, END=0;
var gameState=PLAY;
var invisibleGround, score=0, restartButton, restartImg;
function preload(){
  hurdleImg = loadImage("assets/hurdle.png");
  trackImg = loadImage("assets/track.jpeg");
  manImg = loadAnimation("assets/man1.png", "assets/man2.png");
  man2Img = loadImage("assets/man1.png");
  restartImg = loadImage("assets/restart.png");
}
function setup() {
  createCanvas(800,400);
  track= createSprite(400, 200, 50, 50);
  track.addImage("track",trackImg);
  track.scale= 1.3;
  man = createSprite (150,300);
  man.addAnimation("man_running", manImg);
  man.scale = 0.2;
  hurdleGroup = new Group ()
  man.setCollider("rectangle",0,0,20,100);
  invisibleGround = createSprite(300,350,600,60)
  invisibleGround.visible = false;
  restartButton = createSprite(365,230,40,40);
  restartButton.addImage("restart",restartImg);
  restartButton.scale = 0.7;
  restartButton.visible= false;
}

function draw() {
  background(255,255,255);  
  if(gameState === PLAY){
    track.velocityX = -4;
if (track.x <100){
  track.x = track.width/2
}
if(keyDown(LEFT_ARROW)){
  man.x = man.x -3;
}
if(keyDown(RIGHT_ARROW)){
  man.x = man.x +3;
}
if(keyDown(UP_ARROW)){
  man.y = man.y -3;
}
if(keyDown(DOWN_ARROW)){
  man.y = man.y +3;
}
if((keyDown("SPACE")) && (man.y >250)){
  man.velocityY= -12;
  //man.velocityY= man.velocityY +5;
}
man.velocityY= man.velocityY +0.8;
spawnHurdles();
getScore();
if( man.collide(hurdleGroup)){
  gameState = END;
}
man.collide(invisibleGround); 

  }
  if(gameState === END){
    textSize(24)
    fill("BLACK");
    text ("Game Over!", 300,200);
    track.velocityX=0;
    track.visible = false;
    man.velocityX=0;
    man.velocityY=0;
    man.visible=false;
    hurdleGroup.setVelocityXEach(0);
    hurdleGroup.destroyEach();
    restartButton.visible= true;
    if(mousePressedOver(restartButton)){
      reset();
    }
  }
  drawSprites();
getScore();
}

function spawnHurdles(){
  if(World.frameCount % 60 === 0){
    var hurdle = createSprite(300,400,600,350);
    hurdle.y= Math.round(random(100,550));
    hurdle.addImage(hurdleImg);
    hurdle.scale =0.2; 
    hurdle.velocityX = -4;
   hurdleGroup.add(hurdle);
  }
} 
function getScore(){
  if(gameState === PLAY){
  score = score+ Math.round(getFrameRate()/60);
  fill ("BLACK");
  textSize(24);
  text("Score: "+score,40,50);
  }
  if(gameState === END){
    text("Final score: "+score,40,50);

  }
}
function reset(){
  gameState= PLAY;
  track.visible = true;
  man.visible = true;
  restartButton.visible= false;
  hurdleGroup.destroyEach();
  score=0;
}