/*
 * Scene subclass
 *
 */

// we are subclassing or extending existing Phaser.Scene class
class Scene1 extends Phaser.Scene {

  // every class needs a constructor() method that runs when a new instance of the class is made
  constructor() {
    // super() calls the constructor() from the parent class we are extending 
    super(
      {
        key: 'scene1',
        active: true,
        physics: {
          default: 'arcade'
        }
      }
    );

    
  }

  preload() {
    // inside a method for a class, the js keyword this refers to the instance of the class
    // so here in a subclass of Scene, this works just like the function-based code examples
    this.load.image( 'ball_image', 'img/ball.png' );
    this.load.image( 'brick_image', 'img/brick.png' );
    this.load.image( 'paddle_image', 'img/paddle.png' );
    
  }

  create() {
    // make the edges of stage collidable in this scene
    this.physics.world.setBoundsCollision( true, true, true, false );

    // create ball instance and use this to 
    // save it in a property of the scene object (like a global var)
    this.ball = new BallObject(this, 400, 500);

    this.paddle = new PaddleObject(this, 400, 550);

    this.bricks = new BricksObject(this, 112, 100);

    // now establish the collisions we care about detecting
    this.physics.add.collider( this.ball, this.paddle, this.hitPaddle, null, this );
    this.physics.add.collider( this.ball, this.bricks, this.hitBrick, null, this );

    // manage user input
    this.input.on( 'pointermove', this.movePaddle, this );
    this.input.on( 'pointerup', this.launchBall, this );
  }

  update() {
    // i don't have any custom code for now of my own in the update method
  }

  // all the custom functions/methods also become part of the scene object
  hitPaddle() {
    
  }

  hitBrick(ball_hit, brick_hit) {
    brick_hit.disableBody(true, true);
  }

  movePaddle(pointer) {
    this.paddle.x = pointer.x;
  }

  launchBall() {
    this.ball.setVelocity( -75, -300 );
  }
  
}