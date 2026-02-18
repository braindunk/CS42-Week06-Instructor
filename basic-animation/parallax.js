"use strict";

// simplified steps for making a Phaser-based game with one scene

// 1. defining a set of game configuration properties
const config = {
    type: Phaser.WEBGL,
    width: 900,
    height: 400,
    physics: {
      default: 'arcade'
    },
    scene: {
      preload: myPreload,
      create: myCreate,
      update: myUpdate
    }
  };

// 2. define global variables, if any

// 3. We have at least three functions to successfully create a single scene in our game: preload
function myPreload() {
    // load assets
    this.load.image('trees1','trees1.png');
    this.load.image('trees2','trees2.png');
    this.load.image('trees3','trees3.png');
    this.load.image('trees4','trees4.png');
}

// 4. create
function myCreate() {
    // make the first trees game object
    let trees1_obj = this.physics.add.sprite( 900, 100, 'trees1' );
    // animate it
    tweenMeAcross( trees1_obj, 4000, '-=450', this );

    // make the second trees game object
    let trees2_obj = this.physics.add.sprite( 900, 200, 'trees2' );
    tweenMeAcross( trees2_obj, 3000, '-=450', this );

    // make the third trees game object
    let trees3_obj = this.physics.add.sprite( 900, 300, 'trees3' );
    tweenMeAcross( trees3_obj, 2000, '-=450', this );

    // make the fourth trees game object
    let trees4_obj = this.physics.add.sprite( 900, 400, 'trees4' );
    tweenMeAcross( trees4_obj, 1000, '-=450', this );

    
}

// 5. update (run every frame of game loop)
function myUpdate() {
    
}

// 6. Create a new phaser game object
const mygame = new Phaser.Game( config );

// 7. We might also define other custom functions

// this custom function is used to apply a horizontal tween on any game object
function tweenMeAcross( game_obj, tween_time, tween_distance, game_scene ) {
    // create a programmatic animation aka tween for game object
    game_scene.tweens.add(
        {
            targets: game_obj, // a single game object or array of game objects
            duration: tween_time, // duration is in millisecs (1/1000th of sec)
            repeat: -1,
            yoyo: false, 
            x: tween_distance // '+=200'
        }
    );
}