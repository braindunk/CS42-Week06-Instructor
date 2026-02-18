"use strict";
// my custom js file

// 1. define game settings in config variable
let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    scene: {
        preload: myPreload,
        create: myCreate,
        update: myUpdate
    }
};

// 2. declare any global variables
let boy;

// 3. define preload, create (and maybe update) code blocks
function myPreload() {
  // whenever we preload a bitmap asset file that is a spritesheet
  // we have to tell phaser the exact frame width and height in pixels

  // load manager's spritesheet() method to load the file
  // arguments: (1) asset key the nickname we give the asset (string)
  // (2) a path to the file we want to load (string)
  // (3) an object value in curlies that defines the width, height, and last frame #
  this.load.spritesheet(
    'runningboy',
    'boy-running.png',
    {
      frameWidth: 457,
      frameHeight: 754,
      endFrame: 5
    }
  );
}

function myCreate() {
  // to use a spritesheet as a sequence of animated frames with a game object
  // we have to complete 4 discrete steps

  // 1. make a game object
  // sprite() method takes 4 possible arguments:
  // (1) x horizontal coordinate to place the center of the game object (number)
  // (2) y vertical coordinate to place the center of the game object (number)
  // (3) the asset key or nickname for the bitmap image asset (string)
  // (4) OPTIONAL and really only used when loading a spritesheet asset into a game object
  //     the frame number to use from the spritesheet for the initial bitmap shown
  boy = this.add.sprite(400, 300, 'runningboy', 2);
  boy.setScale(0.3);
  
  // 2. define a collection of animation frames
  // generateFrameNumbers() takes 2 arguments
  // (1) the asset key or nickname for the bitmap image asset (string)
  // (2) object value, with start frame, end frame, first frame to begin sequence
  let myframes = this.anims.generateFrameNumbers(
    'runningboy',
    {
      start: 0,
      end: 5,
      first: 5
    }
  );
  
  // 3. use the collection of frames to define an animation sequence
  // create() takes 1 argument, but it is an object value w bunch of property names
  // key property: name for this animation sequence (use this to play it later on)
  // frames property: points to the collection of frames we made in step 2
  // frameRate property: frames per second, speed of playback
  // repeat property: set to -1 means repeat forever, or any other val > 0
  // yoyo property: set to true causes the loop to go fwd>backward>fwd>backward
  let anim_seq = this.anims.create(
    {
      key: 'running-animation',
      frames: myframes,
      frameRate: 15,
      repeat: -1,
      yoyo: false
    }
  );

  anim_seq.frameRate = 2;
  
  // 4. ask phaser's AnimationManager to play the animation sequence for our game object
  boy.anims.play('running-animation');
}

function myUpdate() {
  
}

// 4. create a new game instance
let game = new Phaser.Game( config );