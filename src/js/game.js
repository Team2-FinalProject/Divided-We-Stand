import Phaser from 'phaser'

var audio = new Audio(require("../sound/PUNCH.mp3"))
var music;
var meteor;
var meteor2;
var emitter;
var emitter2;
var rightGoal;
var leftGoal;
// let score = 0

export const config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    backgroundColor: '#cdcdcd',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        pack: {
            files: [
                { type: 'scenePlugin', key: 'SpinePlugin', url: 'plugins/SpinePlugin.js', sceneKey: 'spine' }
            ]
        }
    },
    audio:{
        disableWebAudio: false,
        context: audio.webkitMatchesSelector(true)
    }
}

function preload() {
    this.load.setPath('assets/spine/stretchyman/');
    this.load.spine('stretchyman', 'stretchyman-pro.json', ['stretchyman-pma.atlas'], true);
    this.load.image('meteor', '../../image/meteor-min.png');
    this.load.image('particle', '../../image/api.png');
    this.load.image('background', '../../background/blackhole.jpg');
    this.load.image('pow', '../../image/hit.gif');
    this.load.image('goal', '../../image/blackhole.png')
    this.load.image('hitarea', '../../image/hitround.png')
    this.load.audio('hit', ['../../sound/PUNCH.ogg','../../sound/PUNCH.mp3'])
}

function generateChar({ pos, scale, flipper }) {
    var char = this.add.spine(pos.x, pos.y, 'stretchyman').setScale(scale.x, scale.y).refresh();
    this.physics.add.existing(char)
    if (flipper === true) {
        char.body.setSize(char.width, char.height)
        char.body.immovable = true
        char.flipX = true
    } else {
        char.body.setSize(char.width, char.height)
        char.body.immovable = true
    }
    char.body.setCollideWorldBounds(true);
    char.body.setBounce(0.1, 0.1)
    // char.drawDebug = true
    char.refresh()
    return char
}

// function generateHitArea(char) {
//     var hitarea = this.add.spine(char.x, char.y, 'hitarea').setScale(0.5, 0.5).refresh();
//     this.physics.add.existing(hitarea)
//     hitarea.body.setSize(hitarea.width, hitarea.height)
//     hitarea.body.immovable = true
    
//     // hitarea.drawDebug = true
//     hitarea.refresh()
//     return hitarea
// }

function assignControlToChar(char) {
    var controlBones = ["front-leg-ik-target", "hip", "back-leg-ik-target"];
    for (let i = 0; i < controlBones.length; i++) {
        let bone = char.findBone(controlBones[i]);
        let color = controlBones[i] == "hip" ? eval("0xff00000") : eval("0xff00ff")
        let control = this.add.circle(bone.worldX, 800 - (bone.worldY), 10, color).setData('bone', bone);
        // let hitarea
        // if (controlBones[i] === "front-leg-ik-target" || controlBones[i] === "back-leg-ik-target") {
        //     hitarea = generateHitArea(char)
        // }

        control.setInteractive();

        this.input.setDraggable(control);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

            var bone = gameObject.getData('bone');

            var coords = this.spine.worldToLocal(dragX, dragY, char.skeleton, bone);

            bone.x = coords.x;
            bone.y = coords.y;

            bone.update();
            // hitarea.refresh()
            char.refresh()
        }, this);
    }
}

function create() {

    let image = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "background"
    );
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);

    image.setScale(scale).setScrollFactor(0);

    let char = generateChar.bind(this)
    let control = assignControlToChar.bind(this)

    let char1 = char({
        pos: { x: 400, y: 500 },
        scale: { x: 0.3, y: 0.3 },
        flipper: false
    })
    let char2 = char({
        pos: { x: 900, y: 500 },
        scale: { x: 0.3, y: 0.3 },
        flipper: true
    })
    char2.setFlipX((value) => {
        console.log(value, 'cmiiiw');
    })


    control(char1)
    control(char2)

    console.log('char----->', char1)
    console.log(this.sound.add('hit'), '<<<<<<<<<<audio bos')
    console.log('----->', this.children)

    // this.physics.add.collider(char2, char1, (parent, key, value) => {
    //     console.log('damage hero 1', parent, key, value)
    // })

    // this.physics.add.collider(char2, char1, () => {
    //     console.log('damage hero 1')
    // })

    //METEOR
    var particles = this.add.particles('particle');
    var particles2 = this.add.particles('particle');
    emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 0.03, end: 0 },
        blendMode: 'NORMAL'
    });
    emitter2 = particles2.createEmitter({
        speed: 100,
        scale: { start: 0.03, end: 0 },
        blendMode: 'NORMAL'
    });

    meteor = this.physics.add.image(100, 100, 'meteor').setScale(0.1, 0.1);
    meteor.enableBody = true
    meteor.setVelocity(330, 50);
    meteor.setBounce(1, 1);
    meteor.setCollideWorldBounds(true);

    emitter.startFollow(meteor);

    meteor2 = this.physics.add.image(1000, 100, 'meteor').setScale(0.1, 0.1);
    meteor2.enableBody = true
    meteor2.setVelocity(600, 50);
    meteor2.setBounce(1, 1);
    meteor2.setCollideWorldBounds(true);

    emitter2.startFollow(meteor2);

    //END METEOR

    //GAWANG
    leftGoal = this.physics.add.image(100, 350, 'goal').setScale(0.5, 0.5);
    leftGoal.body.setSize(100, 100)
    leftGoal.body.immovable = true
    rightGoal = this.physics.add.image(1250, 350, 'goal').setScale(0.5, 0.5);
    rightGoal.body.setSize(100, 100)
    rightGoal.body.immovable = true
    //END GAWANG

    music = this.sound.add('hit',{
        volume: 0.02
    })
    // this.sound.setDecodedCallback(music, this);
    var effect
    this.physics.add.collider(meteor,char1, () =>{
        music.play();
    })
    this.physics.add.collider(meteor2,char1, () =>{
        music.play();
    })
    this.physics.add.collider(meteor,char2, () =>{
        music.play();
    })
    this.physics.add.collider(meteor2,char2, () =>{
        music.play();
    })
    this.physics.add.collider(char1, char2, () => {
        console.log('kena');
    })
    
    this.physics.add.collider(meteor, leftGoal, () => {
        meteor.destroy()
        particles.destroy()
    })
    this.physics.add.collider(meteor2, leftGoal, () => {
        meteor2.destroy()
        particles2.destroy()
    })
    this.physics.add.collider(meteor, rightGoal, () => {
        meteor.destroy()
        particles.destroy()
    })
    this.physics.add.collider(meteor2, rightGoal, () => {
        meteor2.destroy()
        particles2.destroy()
    })
}

function update () {
    meteor.rotation += 0.10;
    meteor2.rotation += 0.10;
    emitter.rotation += 0.10;
    emitter2.rotation += 0.10;
    rightGoal.rotation += 0.002;
    leftGoal.rotation -= 0.002;
}

// function fadePicture(effect) {
//     this.add.tween(effect).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
// }

// function destroyMeteor (meteor, leftGoal) {
//     console.log('masuuuk');
//     meteor.destroy()
// }