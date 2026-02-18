/*
 * BricksObject subclass of the Phaser.Physics.Arcade.StaticGroup class
 *
 */

class BricksObject extends Phaser.Physics.Arcade.StaticGroup {

  // every class needs its own constructor() method
  // which runs every time we use the js keyword "new" to create one new instance of the object
  constructor( scene, xpos, ypos ) {
    // super() calls the constructor() from the parent class StaticGroup we are extending 
    super(
      scene.physics.world,
      scene,
      {
        key: 'brick_image',
        quantity: 120,
        gridAlign: {
          width: 20,
          height: 6,
          cellWidth: 32,
          cellHeight: 48,
          x: xpos,
          y: ypos
        }
      }
    );

    // we add the instance to the scene, since staticGroup, we actually children to scene
    scene.add.existing( this.children );

    // we add object(s) in the new instance of group to the arcade physics sim
    scene.physics.add.existing( this.children );

    // perform any special setup
  }
  
}