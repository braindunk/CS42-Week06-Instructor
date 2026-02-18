/*
 * BallObject subclass of the Phaser.Physics.Arcade.Image class
 *
 */

class BallObject extends Phaser.Physics.Arcade.Image {

  // every class needs its own constructor() method
  // which runs every time we use the js keyword "new" to create one new instance
  // of the object

  // new BallObject()

  constructor(scene, xpos, ypos) {
    // inside these curlies is the code that will run when new BallObject() happens somewhere

    // super() calls constructor() from the parent class we are extending
    super( scene, xpos, ypos, 'ball_image' );

    // we add the new instance of the ballobject to the scene
    scene.add.existing(this);
    // inside a constructor method for a class, the js keyword this refers to the instance of the class
    // so here in a subclass of Image, this is referring to the image game object we've just made

    // we add the new instance to the arcade physics simulation
    scene.physics.add.existing(this);

    // perform any special setup for this game object
    this.setCollideWorldBounds(true);
    this.setBounce(1);
  }
  
}