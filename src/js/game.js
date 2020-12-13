import Phaser from 'phaser'

export const config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    backgroundColor: '#cdcdcd',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        pack: {
            files: [
                { type: 'scenePlugin', key: 'SpinePlugin', url: 'plugins/SpinePlugin.js', sceneKey: 'spine' }
            ]
        }
    }
}

function preload() {
    this.load.image('background', 'assets/background/spacex.jpg');
    this.load.setPath('assets/spine/stretchyman/');

    this.load.spine('stretchyman', 'stretchyman-pro.json', ['stretchyman-pma.atlas'], true);
    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('logo', 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png');
    this.load.image('red', 'https://webstockreview.net/images/red-smoke-png-2.png');
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

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'NORMAL'
    });

    var logo = this.physics.add.image(100, 100, 'logo');

    logo.setVelocity(330, 50);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);

    var logo2 = this.physics.add.image(1000, 100, 'logo');

    logo2.setVelocity(600, 50);
    logo2.setBounce(1, 1);
    logo2.setCollideWorldBounds(true);
   
    var man = this.add.spine(400, 550, 'stretchyman').setScale(0.5).refresh();
    var man2 = this.add.spine(800, 550, 'stretchyman').setScale(-0.5, 0.5).refresh();
    this.physics.add.existing(man)
    this.physics.add.existing(man2)
    man.body.setCollideWorldBounds(true);
    man2.body.setCollideWorldBounds(true);
    man.refresh()
    man2.refresh()
    
    // this.physics.add.collider(logo,logo2)
    this.physics.add.collider(logo,man2)
    this.physics.add.collider(man,man2)
    
    console.log(this.physics)
    // man.body : {gravity.y}
    // man.body.gravity.y = 800
    // man.player.collideWorldBounds = true
    // man.enableBody = true
    // man2.enableBody = true
    // man.drawDebug = true;
    // this.physics.ArcadePhysics.enable(man, man2)

    var controlBones = ["front-leg-ik-target", "hip", "back-leg-ik-target"];
    // this.physics.add.world.colliders = [man, man2]
    // console.log(this.physics.add.world.colliders, '<<<<nih');
    // man.disableBody(true, true)

    // //------------------------------FRONT LEG------------------------------------
    // var frontLeg = "front-leg-ik-target"
    // var frontLegBone = man.findBone(frontLeg)
    // var controlFrontLeg = this.add.circle(frontLegBone.worldX, 600 - (frontLegBone.worldY), 10, 0xff00ff).setData('frontLegBone',frontLegBone)
    // controlFrontLeg.setInteractive()
    // this.input.setDraggable(controlFrontLeg)
    // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

    //     gameObject.x = dragX;
    //     gameObject.y = dragY;

    //     var frontLegBone = gameObject.getData('frontLegfrontLegBone');

    //     // console.log(frontLegBone.data.name);

    //     var coords = this.spine.worldToLocal(dragX, dragY, man.skeleton, frontLegBone);

    //     frontLegBone.x = coords.x;
    //     frontLegBone.y = coords.y;

    //     frontLegBone.update();

    // }, this);
    // //-------------------------------END FRONT LEG-------------------------------

    // for (var i = 0; i < controlBones.length; i++) {
    //     var bone = man.findBone(controlBones[i]);
    //     var control = this.add.circle(bone.worldX, 600 - (bone.worldY), 10, 0xff00ff).setData('bone', bone);

    //     control.setInteractive();

    //     this.input.setDraggable(control);

    //     this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

    //         gameObject.x = dragX;
    //         gameObject.y = dragY;

    //         var bone = gameObject.getData('bone');

    //         var coords = this.spine.worldToLocal(dragX, dragY, man.skeleton, bone);

    //         bone.x = coords.x;
    //         bone.y = coords.y;

    //         bone.update();

    //     }, this);
    // }

    for (let i = 0; i < controlBones.length; i++) {
        let bone = man2.findBone(controlBones[i]);
        let control = this.add.circle(bone.worldX, 600 - (bone.worldY), 10, 0xff00ff).setData('bone', bone);

        control.setInteractive();

        this.input.setDraggable(control);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

            var bone = gameObject.getData('bone');

            var coords = this.spine.worldToLocal(dragX, dragY, man2.skeleton, bone);

            bone.x = coords.x;
            bone.y = coords.y;

            bone.update();

        }, this);
    }
}