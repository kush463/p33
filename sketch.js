var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
var count=0;
var gameState="play";
var particle1;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  

  //create division objects
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  
  //create 1st row of plinko objects
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //create 3rd row of plinko objects
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,275));
  }
  
  //create 4th row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) { 
    plinkos.push(new Plinko(j,375));
  }

  
  }
function draw() {
  background("black");
  textSize(25)
  text("score: "+score,30,30)

  text("500",23,520);
  text("500",103,520)
  text("500",183,520)
  text("500",263,520)
  text("100",343,520)
  text("100",423,520)
  text("100",503,520)
  text("200",583,520)
  text("200",663,520)
  text("200",743,520)

  //fill("yellow");
  //line(0,760,width,760);


  Engine.update(engine);
  ground.display();
  
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //display the divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
    
  if(particle1!=null){
    particle1.display();
     if(particle1.body.position.y>760){
       if(particle1.body.position.x<300){
          score+= 500;
          particle1=null;
          if(count>=5){
            gameState= "end";
          }
       }else if(particle1.body.position.x<600 && particle1.body.position.x>301){
        score+= 100;
        particle1=null;
        if(count>=5){
          gameState= "end";
        }
     }
     else if(particle1.body.position.x<900 && particle1.body.position.x>600){
      score+= 200;
      particle1=null;
      if(count>=5){
        gameState= "end";
      }
   }
  }
}

}
function mousePressed(){
  if(gameState!=="end"){
     count++;
     particle1=new particle(mouseX,10,10);
  }
}