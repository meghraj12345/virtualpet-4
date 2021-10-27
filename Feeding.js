class Feed{
constructor(){

}
display(){
    fill("red");
    var button = createButton("feed the dog");
    button.position(400,125);

    if(button.mousePressed(function(){
      foodS -=1;//foodS =foodS -1
      gameState=1;
      database.ref('/').update({'gameState':gameState});
    }));      
    var addFood = createButton("add the food");
    addFood.position(500,125);
       
        if (addFood.mousePressed(function(){
            foodS =foodS+1;
            gameState =2;
            database.ref('/').update({'gameState':gameState})
        }));


}
}