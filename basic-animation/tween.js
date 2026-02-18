// my custom js file

// 1. define game settings in config variable
let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    scene: {
        preload: myPreload,
        create: myCreate
    }
};

// 2. create a new game instance and any other global variable
let game = new Phaser.Game( config );

// 3. define preload, create (and maybe update) code blocks
function myPreload() {
    this.load.spritesheet(
        'runningboy', // key or nickname
        'boy-running.png', // path to file
        {
            frameWidth: 457,
            frameHeight: 754,
            endFrame: 5
        }
    );
}

function myCreate() {
    // 1. make a sprite game object
    // if using a spritesheet asset, I can provide a 4th arg
    // for the frame # to use from the spritesheet to start
    let boy = this.add.sprite( 400, 300, 'runningboy', 2 );
    boy.setScale(0.3);

    // I am not going to use the Animation Manager in this example
    // Instead, I am going to change the property of the boy game object
    // over time using the TweenManager

    this.tweens.add(
        {
            targets: boy, // a single game object or array of game objects
            duration: 1000, // duration is in millisecs (1/1000th of sec)
            repeat: -1,
            yoyo: true,
            // we can provide ANY game object property(s) to change 
            angle: '+=180',
            x: '+=200',
            y: '-=150', // change vertical
            alpha: '-=0.9',
            scaleY: '-=0.25'
        }
    );
} // end of create block
