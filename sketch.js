var bird,birdflying;
var greenchilliGroup,redchilliGroup,pipe1Group,pipe2Group,eggsGroup;
var gamestate = "info";
var score = 0;
var life = 3;

function preload(){
   birdflying =  loadAnimation("images/birdImage1.png","images/birdImage2.png");
   backgroundImage = loadImage("images/skyImage.jpg")
   hitAnimation = loadAnimation("images/birdImage1hit.png","images/birdImage2hit.png")
   hitSound = loadSound("hit.ogg");
   loseSound = loadSound("lose.wav");
}

function setup(){
    var canvas = createCanvas(1000,400);
   
    
    bird = createSprite(200,200,20,20);
    bird.addAnimation("flying",birdflying);
    bird.addAnimation("hit",hitAnimation);
    bird.scale = 0.4;

    

    greenchilliGroup = new Group();
    redchilliGroup = new Group();
    pipe1Group = new Group();
    pipe2Group = new Group();
    eggsGroup = new Group();



    
   
   
}


function draw(){
  background(backgroundImage)
 if(gamestate == "info"){
    fill("yellow");
   
    textFont("cursive");
    textSize(20);
    text("Press spacebar to fly",500,100 );  
    text("Beware of the redchillies and  pipes ",500,150);
    text("Help the bird reach its eggs ",500,200);
    text("take the eggs back at the end to win",500,250);
    text("consume greenchillies to become smaller!",500,300);
    text("if you miss eggs at the end you lose!");
 
 
 if(keyCode == 32){
     gamestate = "Play";
     
 }
}

if(gamestate == "Play"){

 if(keyDown("Space")){
   bird.velocity.y =  - 11;
   
   
 }
// music.play();

 bird.velocity.y = bird.velocity.y + 1;
 spawnObstacles1();
 spawnObstacles2();

 var rand3 = Math.round(random(1,2))

 if(frameCount%300 == 0){
   switch(rand3){
     case 1 : spawnRedChilli();
     break;
     case 2 : spawnGreenChilli();
     break;
   }
 }

 if(redchilliGroup.isTouching(bird)){
   bird.scale = bird.scale+0.15;
   redchilliGroup[0].destroy();
 }

 if(greenchilliGroup.isTouching(bird)){
    bird.scale = bird.scale-0.15;
    greenchilliGroup[0].destroy();    
 }

 if (pipe1Group.bounceOff(bird)){

    bird.changeAnimation("hit",hitAnimation)
    life = life - 1;
    
    pipe1Group[0].destroy();
    hitSound.play();
 }

if (pipe2Group.bounceOff(bird)){
    bird.changeAnimation("hit",hitAnimation)
    life = life - 1;
    pipe2Group[0].destroy();
    hitSound.play();
}

if (life == 0){
  gamestate = "End"  
}

if(frameCount%10 == 0){
    score = score + 1;
};

spawnEggs();

if(bird.isTouching(eggsGroup)){
 gamestate = "win"   
}

}
if(gamestate == "win"){
    background(backgroundImage); 
    bird.velocityY = 0;
    textFont("cursive");
    textSize(50);
    fill("darkred");
    text("YOU WIN!",360,200);
    bird.destroy();
    pipe1Group.destroy();
    pipe2Group.destroy();
    eggsGroup.destroy();
    redchilliGroup.destroy();
    greenchilliGroup.destroy();  
}


if(bird.y>410){
 gamestate = "End"
}



 drawSprites();
 textSize(20);
 textFont("Arial");
 fill("darkred");
 text("score:"+score,50,50);
 text("life:"+life,50,70);
 
 if(gamestate == "End"){
    background(backgroundImage); 
    bird.velocityY = 0;
    textSize(50);
    textFont("cursive");
    fill("darkred");
    text("GAME OVER!",380,200);
    loseSound.play();
    sleep(10);
    loseSound.stop();    
 
  }  
}


function spawnObstacles1(){
 
 if(frameCount%150 == 0){
    obstacle1 = createSprite(1000,0,50,100);
   
  

    obstacle1.velocity.x = -2;
    var rand1 = Math.round(random(1,2))
    switch(rand1){
        case 1: obstacle1.addImage(loadImage("images/pipe1.png"));
        break
        case 2: obstacle1.addImage(loadImage("images/pipebigImage1.png"));
        break
    }
    obstacle1.scale =1.
    pipe1Group.add(obstacle1);
    obstacle1.lifetime = 1000;

    }
}



function spawnObstacles2(){

if(frameCount%120 == 0){
    obstacle2 = createSprite(1000,400,50,100);
    
    
    obstacle2.velocity.x = -2; 
    var rand2 = Math.round(random(1,2))
    switch(rand2){
        case 1: obstacle2.addImage(loadImage("images/pipe2.png"));
        break
        case 2: obstacle2.addImage(loadImage("images/pipebigImage2.png"));
        break
    }
    obstacle2.scale = 1.5;
    pipe2Group.add(obstacle2);
    obstacle2.lifetime = 500;

    }
   
}
function spawnGreenChilli(){ 
    greenChilli = createSprite(1000,Math.round(random(150,350)),50,100);
    greenChilli.addImage(loadImage("images/greenchilli.png"))
    greenChilli.scale = 0.2;

    greenChilli.velocity.x = -2; 
    greenchilliGroup.add(greenChilli);

    greenChilli.lifetime = 500;     
    
}

function spawnRedChilli(){  
    
        redChilli = createSprite(1000,Math.round(random(150,350)),50,100);        
        redChilli.addImage(loadImage("images/redchilli.png"))
        redChilli.scale = 0.08;        
        redChilli.velocity.x = -2;        
        redchilliGroup.add(redChilli);
        redChilli.lifetime = 500;        
       
    }
    
    function spawnEggs(){
      if(frameCount%1000 == 0){
        eggs = createSprite(1000,100);
        eggs.addImage(loadImage("images/eggs.png"));
        eggs.scale = 0.5;
        eggs.velocity.x = -2;

        eggsGroup.add(eggs);

      }
    }
    
    

    
