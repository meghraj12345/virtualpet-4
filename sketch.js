var dog,saddog,happydog,garden,washroom,bedroom;
var foodObj;
var fedTime,currentTime,feed,lastFed,addFood;
var foodStock,foodS;
var gameState,readState;
var database;
function preload()
{
saddog= loadImage("images/Dog.png");
happydog = loadImage("images/Happy dog.png");
garden = loadImage("images/Garden.png");
bedroom = loadImage("images/Bed Room.png");
washroom = loadImage("images/Wash Room.png");
milkimg = loadImage("images/milk.png");
livingroom = loadImage("images/Living Room.png")
}

function setup() {
	database = firebase.database();
  createCanvas(800, 700);
  foodObj = new Food();

  foodStock = database.ref('Food');
 foodStock.on("value",readStock);
 foodStock.set(20);

 dog = createSprite(250,300,150,150);
 dog.addImage(saddog);
 dog.scale = 0.15;

 milkbottle1= createSprite(140,435,10,10);
 milkbottle1.addImage(milkimg);
 milkbottle1.scale=0.025;

 milkbottle2= createSprite(210,280,10,10);
 milkbottle2.addImage(milkimg);
 milkbottle2.scale=0.025;
 milkbottle2.visible=false;

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed= data.val();
})

 
 
}


function draw() {  
    background("yellow");
    foodObj.display();
    writeStock(foodS);

    if(foodS == 0){
    dog.addImage(happydog);
    milkbottle2.visible=false;
    }else {
      dog.addImage(saddog);
    milkbottle2.visible=true;
    }
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value",function(data){
      gameState = data.val();
    })
     if (gameState ===1){
      dog.addImage(happydog);
      dog.scale =0.175;
      dog.y=250;
     }
     if(gameState ===2){
       dog.addImage(saddog);
       dog.scale =0.175;
       milkbottle2.visible =false;
       dog.y =250;
     }
  var Bath = createButton("i want be bath");
  Bath.position(580,185);
  if(Bath.mousePressed(function(){
    gameState =3;
    database.ref('/').update({'gameState':gameState});
  }))
  if(gameState ===3){
    dog.addImage(washroom);
    dog.scale =1;
    milkbottle2.visible =false;
  }
  var Sleep = createButton("i very sleep");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
gameState = 4;
database.ref('/').update({"gameState":gameState});
  }))
  if(gameState ===4){
   dog.addImage(bedroom);
   dog.scale =1;
   milkbottle2.visible =false;
  }
  var Play = createButton("i want to play");
  Play.postion(500,160);
  if(Play.mousePressed(function(){
    gameState =5;
    database.ref('/').update({"gameState":gameState});
  }))
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkbottle2.visible =false;
  }
  var PlayInGarden =createButton("i want be play in garden");
  PlayInGarden.postion(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState =6;
    database.ref('/').update({"gameState":gameState});
  }))
  if (gameState===6){
    dog.y =175;
    dog.addImage(garden);
    dog.scale =1;
    milkbottle2.visible =false;
  }
  drawSprites();
 textSize(17);
 fill("black");
 text("milkBottle remainting"+foodS,170,440);
}
// function read the food
function readStock(data){
foodS= data.val();

}




function writeStock(x){
database.ref('/').update({
food:x,
});
}