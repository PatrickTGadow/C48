const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var rope;
var bubble,bubble_img;

function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('walll.jpg');
  food = loadImage('dog bone.png');
  rabbit = loadImage('dog1.png');

  blink = loadAnimation("dog1.png");
  eating = loadAnimation("dog1.png","dog2.png","dog3.png","dog4.png");
  eating2 = loadAnimation("dog1.png","dog2.png","dog3.png","dog4.png");
  sad = loadAnimation("saddog.png");
  star_img = loadImage('star.png');
  
  blink.playing = true;
  eating.playing = true;
  eating2.playing = true;
  sad.playing = true;
  sad.looping= false;
  eating.looping = false; 
  eating2.looping = false;
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(200,400,15,fruit_options);
  World.add(world,fruit);

  star = createSprite(100,300,20,20);
  star.addImage(star_img);
  star.scale = 0.025


  bubble = createSprite(399,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.15;

  //bunny sprite
  blink.frameDelay = 20;
  eating.frameDelay = 18;
  bunny = createSprite(470,125,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.4;

  // bunny2 = createSprite(970,125,100,100);
  // bunny2.addImage(rabbit);
  // bunny2.scale = 0.4;

  higherground =new Ground(500,200,150,35);
 

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eating);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(4,{x:300,y:330});
  rope2 = new Rope(4,{x:150,y:450});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  rope3 = new Rope(4,{x:735,y:340});
  rope4 = new Rope(4,{x:490,y:450});
  con3 = new Link(rope3,fruit);
  con4 = new Link(rope4,fruit);




  //btn 1
  button = createImg('cut_btn.png');
  button.position(280,320);
  button.size(60,60);

  button2 = createImg('cut_btn.png');
  button2.position(130,420);
  button2.size(60,60);

  button3 = createImg('cut_btn.png');
  button3.position(700,320);
  button3.size(60,60);

  button4 = createImg('cut_btn.png');
  button4.position(480,420);
  button4.size(60,60);

  button.mouseClicked(drop);
  button2.mouseClicked(drop2);
  button3.mouseClicked(drop3);
  button4.mouseClicked(drop4);
  // button4.mouseClicked(drop2);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();

  if(collide(fruit,bunny,140)==true)
  {
   remove_rope();
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    // bunny.change('eating');

    bunny.changeAnimation("eating");

    //bunny.changeAnimation();

    // bunny.Animation('eating');
  }
  

  if(collide(fruit,bubble,80) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
    }

    if(collide(fruit,star,50) == true){
      console.log("star")
      star.visible = false;
      
    
    }

  drawSprites();

}



function drop()
{
  rope.break();
  con.dettach();
  con = null; 
}

function drop2()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function drop3()
{
  rope3.break();
  con3.dettach();
  con3 = null; 
}

function drop4()
{
  rope4.break();
  con4.dettach();
  con4 = null; 
}

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}



function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

