var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var hour = 1

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  the=createButton("Feed The Dog");
  the.position(680,95);
  the.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
  if(hour < 12){
    fill("white");
    textSize(20);
    text("LAST FEED : 12 AM",500,20);
}else{
    fill("white");
    textSize(20);
    text("LAST FEED : 1 PM",300,33);
}
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
var food_stock_val = foodObj.getFoodStock();
if(food_stock_val <= 0){
  foodObj.updateFoodStock(food_stock_val * 0);
}else{ 
  foodObj.updateFoodStock(food_stock_val - 1) ;
}
  
foodS--;
database.ref('/').update({
  Food:foodS
})
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  dog.addImage(sadDog);
}
