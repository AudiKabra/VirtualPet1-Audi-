var dog, happyDog, dogSprite; 
var database, foodS, foodStock;

function preload()
{
    dog = loadImage("images/dogImg.png");
    happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dogSprite = createSprite(250, 250, 50, 50);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.10;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {  
  background(96, 239, 97);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }
  drawSprites();
  fill("white");
  text("Food remaining: " + foodS, 250, 220);
  text("Press the up arrow key to feed ma boi daniel...He hungry", 50, 50);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=10){
    x=10;
    }else{ 
      x=x-1;
    }database.ref('/').update({
    Food:x
  })
}

