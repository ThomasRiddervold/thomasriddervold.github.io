/* Project Configuration */

    
var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload, create: create, update: update })


var paddle1;
var paddle2;

var obstacle;

var ball_launched;
var ball_velocity;

var score1_text;
var score2_text;


function preload(){

    
game.load.image("obstacle", "assets/art/obstacle.png")
game.load.image("paddle", "assets/art/paddle.png")
game.load.image("ball", "assets/art/ball.png")
game.load.image("bg", "assets/art/BG.png")
    
}

function create(){
    
    
    game.add.image(0,0, "bg");

    paddle1 = create_paddle(0, game.world.centerY);
    paddle2 = create_paddle(game.world.width - 8,game.world.centerY);
    obstacle = create_obstacle(game.world.centerX - 8,game.world.centerY);
    
    
    ball_launced = false;
    ball_velocity = 400;
        
    

     ball = create_ball(game.world.centerX, game.world.centerY);
    game.input.onDown.add(launch_ball, this);

    
    score1_text = game.add.text(128, 128, "0",{
        font: "64px Verdana", 
        fill: "#F8F8FF",
        align: "center"
    });

        score2_text = game.add.text(game.world.width - 128, 128, "0",{
        font: "64px Verdana", 
        fill: "#F8F8FF",
        align: "center"
    });

    score1 = 0;
    score2 = 0;
}
function update(){
    

    control_paddle(paddle1,game.input.y);
    

    game.physics.arcade.collide(paddle1, ball);
    game.physics.arcade.collide(paddle2, ball);
    game.physics.arcade.collide(obstacle, ball);
    

    if(ball.body.blocked.left){
        score2+=1;
        
        
    }
    else if(ball.body.blocked.right){
        score1+=1;
    }
    

    paddle2.body.velocity.setTo(ball.body.velocity.y);
    paddle2.body.velocity.x = 0;
    paddle2.body.maxVelocity.y = 250;

    

    score1_text.text = score1;
    score2_text.text = score2;
}

    
function create_paddle(x,y){
    var paddle = game.add.sprite(x,y, "paddle");
    paddle.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    paddle.body.immovable = true;
    paddle.scale.setTo(0.5,0.5);

    return paddle;
}

function create_obstacle(x,y){
    var obstacle = game.add.sprite(x,y, "obstacle");
    obstacle.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(obstacle);
    obstacle.body.collideWorldBounds = true;
    obstacle.body.immovable = true;
    obstacle.scale.setTo(0.5,0.5);

    return obstacle;
}


function create_ball(x,y){
    var ball = game.add.sprite(x,y, "ball");
    ball.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1,1);

    return ball;
}


function launch_ball() {
    if (ball.launched) {
        ball.x = game.world.centerX;
        ball.y = game.world.center.Y;
        ball.body.velocity.setTo(0,0);
        ball_launced = false;
    } else {
        ball.body.velocity.x = -ball_velocity;
        ball.body.velocity.y = ball_velocity;
        ball_launched = true;
    }
}

function control_paddle(paddle,y){
    paddle.y = y;

    if(paddle.y < paddle.height / 2){
        paddle.y - paddle.height / 2;

    }

    else if (paddle.y > game.world.height - paddle.height / 2){
        paddle.y = game.world.height - paddle.height / 2;
    }
}

