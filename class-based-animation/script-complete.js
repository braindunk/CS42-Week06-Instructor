"use strict";

/*
 * Scene1: custom scene
 *
 */
class Scene1 extends Phaser.Scene {

  // scene subclass constructor called with js keyword new: new Scene1
  constructor () {
    super();
    this.custom = {
      frames:8,
      mycustomvalue: "fred",
      score: 0,
      lives: 5
    };
  }

  // preload stage to load assets
  preload () {
    this.load.path = 'assets/';
    for(let i = 1; i <= this.custom.frames; i++) {
      this.load.svg('seagull'+i, 'seagull'+i+'.svg');
    }
  }

  // create stage to make game objects
  create () {
    let f = [];
    for(let i = 1; i <= this.custom.frames; i++) {
      f.push({ key: 'seagull'+i});
    }
    this.anims.create({
      key: 'fly',
      frames: f,
      frameRate: 8,
      repeat: -1
    });

    this.custom.gameobjs = [];
    for (let i = 0; i < 10; i++) {
      this.custom.gameobjs[i] = this.add.sprite(this.game.scale.gameSize.width, this.game.scale.gameSize.height / 10 * i, 'seagull1').play('fly');
      this.custom.gameobjs[i].originaly = this.game.scale.gameSize.height / 10 * i;
  
      this.custom.tween = this.tweens.add({
        targets: this.custom.gameobjs[i],
        paused: false,
        delay: 0,  
        duration: 1000 - (i * 10), 
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
            from: this.game.scale.gameSize.width,
            to: 0
          }
        }
    });
    }
  
  }

  // update stage for game loop, receiving game time and delta between frames
  
  update (t,d) {
    // console.log(s);
    for (let i = 0; i < 10; i++) {
      let s = Math.sin( this.custom.gameobjs[i].x / 100 ) * 30;
      console.log(s);
      // this.custom.gameobjs[i].y = (this.game.scale.gameSize.height / 2) + s;
      this.custom.gameobjs[i].y = this.custom.gameobjs[i].originaly + s;
    }
  }
  
}

// Phaser.Game config values
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#6FC8D1',
    scene: [ new Scene1 ]
};

// creat Phaser.Game instance to start game and first active scene
const game = new Phaser.Game(config);
