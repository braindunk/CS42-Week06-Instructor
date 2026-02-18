// already in the web page we are running our code in, the browser has already executed the ENTIRE phaser.js file's code

// so we can follow a few steps to define a game that phaser will operate for us..

// Define the properties of a Phaser game object and create one instance of that object
let config = {
    // what underlying browser tech should be used to draw game in web page
    type: Phaser.WEBGL,
    // define game dimension using the width and height properties of the game object
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: {
      preload: myPreloadCode,
      create: myCreateCode,
      update: myUpdateCode
    }
};
// define a variable that holds a reference to the game object
let myGame = new Phaser.Game( config );

// any variable we define/declare outside of a function is a global variable
let ball;
let bricks;
let paddle;
let keyA, keyS;

let scoreValue = 0;
let scoreText;

// define the 3 blocks of code that phaser uses to generate the game as named functions
function myPreloadCode() {
  // use the phaser library to load into the browser all image files uses for sprite assets
  // this keyword in javascript refers in phaser to our game object we created
  // load.image() takes two arguments (values) separated by commas in the parens
  // 1: phaser asset key (name of the graphc after it's loaded)
  // 2: filepath to find the image file
  this.load.image( 'ball', 'img/ball.png' );
  this.load.image( 'brick', 'img/brick.png' );
  this.load.image( 'paddle', 'img/paddle.png' );
}

function myCreateCode() {
  // enable collisions with edges (world bounds), but not the bottom
  this.physics.world.setBoundsCollision(true, true, true, false);

  // create a group of brick sprites in a 10 x 6 grid using add.staticGroup()
  // add.staticGroup() takes 1 argument, a GroupCreateConfig object value with properties
  // key: asset key for texture for sprites made
  // quantity: number of sprites to create 
  // gridAlign: a GridAlignConfig object value with properties
  bricks = this.physics.add.staticGroup(
    {
      key: 'brick',
      quantity: 120,
      gridAlign: { width: 20, height: 6, cellWidth: 32, cellHeight: 48, x: 112, y: 100 }
    }
  );
  
/*
  bricks.children.iterate(
    function(brick) {
      brick.anims.play('');
    }
  );
*/
  
  // let's create a tween and apply it to each of the sprites in the bricks group
  // tweens.add() let's define a change in some sprite's properties over time
  this.tweens.add(
    {
      targets: bricks.getChildren(), // get an array containing each brick sprite inside of the bricks group
      duration: 1000, // duration and most time values in phaser are in milliseconds (1000ths of a second)
      repeat: -1, // repeat of -1 means forever
      yoyo: true, // yoyo replays the tween in reverse once the forward playing ends
      // define as many sprite properties as I want to be affected
      angle: '+=180',
      alpha: '-=0.5',
      x: '+=30',
      y: '+=10'
    }
  );

  // make a ball sprite game object with add.image() and 3 arguments
  // 1: x horizontal position inside our game stage (width)
  // 2: y vertical position (pixels)
  // 3: asset key name to use
  ball = this.physics.add.sprite(400, 500, 'ball');
  ball.setCollideWorldBounds(true);
  ball.setBounce(1);
  // OR use chained dot notation in one statement:
  // ball = this.physics.add.image(400, 500, 'ball').setCollideWorldBounds(true).setBounce(1);
  ball.setData('onPaddle', true);

  // made paddle sprite
  paddle = this.physics.add.sprite(400, 550, 'paddle').setImmovable();

  // tell arcade physics engine to detect collisions via collider():
  // 1: 1st game object (sprite or group) 
  // 2: 2nd game object (sprite or group)
  // 3: function to execute when collision detected
  // 4: optional function to perform before calling collision (process)
  // 5: context (game reference via this)
  // if ball + brick touch, call hitBrick()
  this.physics.add.collider(ball, bricks, hitBrick, null, this);
  // if ball + paddle touch, call hitPaddle()
  this.physics.add.collider(ball, paddle, hitPaddle, null, this);

  // POINTER set up input event: moving pointer (mouse or other device)
  // input.on() takes 3 arguments
  // 1: string name of event to detect
  // 2: function to execute when event happens
  // 3: reference to game object (use this)
  this.input.on('pointermove', movePaddle, this);
  // set up input event: mouse button up (or other device)
  this.input.on('pointerup', launchBall, this);

  // KEYBOARD set up keyboard capture and key up events
  // keep browser from responding to keys
  this.input.keyboard.addCapture('A,S');
  // request phaser monitor key up/down events for specific keys
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  // attach key up events
  keyA.on( "down", function() {
    paddle.setVelocityX(-80);
  }, this );
  keyA.on( "up", function() {
    paddle.setVelocityX(0);
  }, this );
  keyS.on( "down", function() {
    paddle.setVelocityX(80);
  }, this );
  keyS.on( "up", function() {
    paddle.setVelocityX(0);
  }, this );

  // create a text game object to display score value
  scoreText = this.add.text( 16, 16, scoreValue );
}

function myUpdateCode() {
  // let's add code in update loop to detect ball going off bottom of game world
  if (ball.y > 600) {
    resetBall();
  }
}

// extending the code functions with custom functions to respond to events phaser tells me happen
// hitBrick() called by arcade physics engine when ball hits any sprite in bricks group
function hitBrick(ballhit, brickhit) {
  // remove current brick that is hit by ball (disable body)
  // sprite.disableBody() takes 2 arguments
  // 1: deactivate this game object? yes!
  // 2: hide this game object? yes!
  brickhit.disableBody(true, true);
  // increase scorevalue 
  scoreValue++;
  // update the content displayed by the phaser text game object scoreText
  scoreText.setText( scoreValue );
  // check group to see if there are no active sprites left in it
  if (bricks.countActive() === 0) {
    resetLevel();
  }
}

// hitPaddle() called by arcade physics engine when ball hits paddle
function hitPaddle(ballhit, paddlehit) {
  var diff = 0;
  if (ballhit.x < paddlehit.x) {
    // ball is on the left-hand side of the paddle
    diff = paddlehit.x - ballhit.x;
    ballhit.setVelocityX(-10 * diff);
  } else if (ballhit.x > paddlehit.x) {
    // ball is on the right-hand side of the paddle
    diff = ballhit.x - paddlehit.x;
    ballhit.setVelocityX(10 * diff);
  } else {
    // ball is perfectly in the middle
    // so add a little random X to stop it bouncing straight up!
    ballhit.setVelocityX(2 + Math.random() * 8);
  }
}

// movePaddle() called by phaser for input.on() "pointermove" event
function movePaddle(pointer) {
  // keep the paddle within the game
  paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
  if (ball.getData('onPaddle')) {
    ball.x = paddle.x;
  }
}

// launchBall() called by phaser for input.on() "pointerup" event
function launchBall(pointer) {
  // if ball is stuck to paddle, launch ball
  if (ball.getData('onPaddle')) {
    ball.setVelocity(-75, -300);
    ball.setData('onPaddle', false);
  }
}

// resetBall() moves ball sprite onto paddle 
function resetBall() {
  ball.setVelocity(0);
  ball.setPosition(paddle.x, 500);
  ball.setData('onPaddle', true);
}

// resetLevel() calls resetBall() and enables body of each sprite in bricks group
function resetLevel() {
  resetBall();
  // each() takes a function as its argument that Phaser uses to process each child sprite in group
  bricks.children.each(
    function (brick) {
      // sprite.enableBody() method takes 5 arguments
      // 1: reset the body? if true, place it at (x, y)
      // 2: x horizontal position to place sprite/body
      // 3: y vertical position to place sprite/body
      // 4: activate the sprite?
      // 5: show the sprite?
      brick.enableBody(false, 0, 0, true, true);
    }
  );
}
