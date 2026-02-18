"use strict";

/*
 * Seagull: custom sprite
 *
 * see: https://phaser.io/examples/v3/view/game-objects/sprites/custom-sprite-class-es6
 */
class Seagull extends Phaser.GameObjects.Sprite {

  // sprite subclass constructor called with js keyword new: new Seagull(this,x,y)
  constructor (scene,x,y) {
    // call the parent class constructor
    super(scene, x, y);

    // set the texture and position
    this.setTexture('seagull1');
    this.setPosition(x, y);

    // establish a property belonging to each custom sprite for storing custom values used in other methods
    this.custom = {
      scene:scene,
      originaly: y
    };

    // make a tween and target it to each custom sprite
    this.custom.scene.tweens.add({
      targets: this,
      paused: false,
      delay: 0,  
      duration: 1000 - ( Phaser.Math.Between(0, 150) ), 
      ease: 'Linear',
      // delay between tween and yoyo
      hold: 0,  
      yoyo: false,  // true to tween backward
      flipX: false,
      flipY: false,
      // repeat count (-1: infinite)
      repeat: -1, 
      // delay to next pass
      repeatDelay: 0,  
      // loop count (-1: infinite)
      loop: 0,
      // delay to onComplete callback
      completeDelay: 0,
      props: {
        x: {
          from: this.custom.scene.game.scale.gameSize.width,
          to: 0
        }
      }
  });

    // make an animation sequence
    this.anims.create({
      key: 'fly',
      frames: scene.custom.frames.seagull,
      frameRate: 8,
      repeat: -1
    });

    // play anim sequence for each custom sprite
    this.play('fly');
  }

  // special preUpdate stage runs before scene update in main game loop, 
  // receiving game time and delta between frames
  preUpdate (t,d) {
    super.preUpdate(t, d);
    let s = Math.sin( this.x / 100 ) * 30;
    this.y = this.custom.originaly + s;
  }
  
}

/*
 * Scene1: custom scene
 *
 */
class Scene1 extends Phaser.Scene {
  
  // scene subclass constructor called with js keyword new: new Scene1
  constructor () {
    // call the parent scene class constructor
    super();

    // establish a property belonging to custom scene for storing custom values used elsewhere in scene or game objects
    this.custom = {
      gameobjs: [],
      frames: {
        seagull: null,
        crow: null
      }
    };
  }

  // preload stage to load assets
  preload () {
    this.load.path = 'assets/';
    let f = [];
    for(let i = 1; i <= 8; i++) {
      this.load.svg( 'seagull'+i, 'seagull'+i+'.svg' );
      f.push( { key: 'seagull'+i } );
    }
    this.custom.frames.seagull = f;
  }

  // create stage to make game objects
  create () {
    for (let i = 0; i < 10; i++) {
      this.custom.gameobjs[i] = this.add.existing(new Seagull(this, this.game.scale.gameSize.width, this.game.scale.gameSize.height / 10 * i));
    }
  
  }

}

// Phaser.Game config values
const config = {
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#6FC8D1',
    scene: [ new Scene1 ]
};

// creat Phaser.Game instance to start game and first active scene
const game = new Phaser.Game(config);
