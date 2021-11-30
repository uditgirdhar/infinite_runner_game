//global vars
var forestImg, ghostImg, manImg, obstacleImg,spookySound, deathSound;
var forestSprite, ghostSprite, manSprite, obstacleSprite;
var obstaclesGroup

//Game States
var PLAY=1;
var END=0;
var gameState=PLAY;
 
function preload(){
    //add all things requred for game to function
    //load background
    forestImg = loadImage("forest.jpeg");
    //load monster
    ghostImg = loadImage("ghost.png");
    //load character 
    manImg = loadImage("man.png");
    //load obstacles
    obstacleImg = loadImage("obstacle.jpeg");
    //load death noise
    deathSound = loadSound("deathnoise.mp3");
    //load overall game music
    spookySound = loadSound("spooky-music.mp3");
}

function setup() {
    //setup game
    //canvas setup
    createCanvas(800,800);

    //add img + createSprite
    forestSprite = createSprite(600,600);
    forestSprite.addImage("forest",forestImg)
    forestSprite.velocityX=-5
    //forestSprite.x = forestSprite.width/2

    //add img + createsprite
    ghostSprite=createSprite(600,400,5,5);
    ghostSprite.scale = 0.3
    ghostSprite.addImage("ghost", ghostImg);
    ghostSprite.setCollider("rectangle",0,0,40,40);

    //add img + createsprite
    manSprite = createSprite(100,700,5,5);
    manSprite.scale = 0.03
    manSprite.addImage("man", manImg); 
    var c = manSprite.setCollider("rectangle",100,100,40,100);
    
    

    //add img + createsprite
    obstacleSprite = createSprite(900,200,10,40);
    obstacleSprite.scale = 0.1
    obstacleSprite.addImage("obstacle", obstacleImg)
    obstacleSprite.setCollider("rectangle",60,60,80,50)

    //group(s)
    obstaclesGroup = createGroup();


    //add velocity
    ghostSprite.velocityX = 2;

    spookySound.play();
    //spookySound.loop();
  
}


function draw() {
     //drawsprites
    drawSprites();
    edges=createEdgeSprites();
    manSprite.bounceOff(edges); 
    ghostSprite.bounceOff(edges);

    if(gameState==PLAY){
        //move forest background
        forestSprite.velocityX=-5
        
        
        if(forestSprite.x < 0){
            forestSprite.x = forestSprite.width/2;
        }
        
        //spawn obstacles
        spawnObstacles();
         
        //keyboard controls
        if(keyDown("UP_ARROW")){
    
            manSprite.velocityY = -3;
        }
        if(keyDown("DOWN_ARROW")){
            manSprite.velocityY = 3;
            //add gravity
            manSprite.velocityY = manSprite.velocityY + 0.8
            
        }
    }
    if(obstaclesGroup.collide(manSprite)){
        gameState = END;
        manSprite.velocityY = 0;
        ghostSprite.velocityX=0
        forestSprite.velocityX=0;
        deathSound.play();
        spookySound.play();
        ghostSprite.x = manSprite.x -30;
        ghostSprite.y = manSprite.y - 20;
        manSprite.depth = ghostSprite.depth - 10;
    }
    if (gameState === END) {
        textSize(99);
        fill(255);
        text("You lost!", 200,400);
        spookySound.stop()
        forestSprite.velocityX = 0;
        manSprite.velocityY = 0;
    }

}

  
function spawnObstacles(){
    if (frameCount % 100 === 0){
        var obstacleSprite = createSprite(800,165,10,40);
        obstacleSprite.addImage("obstacle", obstacleImg)  
        obstacleSprite.scale = 0.05
        obstacleSprite.velocityX = -19;
        obstaclesGroup.add(obstacleSprite);
        obstacleSprite.y = Math.round(random(680,720));

    }
}
