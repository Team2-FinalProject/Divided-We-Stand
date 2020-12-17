import Phaser from "phaser";
import socket from "../connection/socket";

//socket variable
var gamePlayers;
var boneX1 = 400;
var boneY1 = 450;

var isPosUpdated = false;

var boneX2 = 1550;
var boneY2 = 450;

var scoreOne = 0;
var scoreTwo = 0;

var positionX1 
var positionY1 
var positionX2 
var positionY2 

socket.on("updateBone", (data) => {
  console.log(data, "ini update bone");
  if (data.user.team === "teamOne") {
    boneX1 = data.user.cordinatX;
    boneY1 = data.user.cordinatY;
  } else {
    boneX2 = data.user.cordinatX;
    boneY2 = data.user.cordinatY;
  }
  //   console.log(boneX1, boneY1, "char kiri")
  //   console.log(boneX2, boneY2, "char kanan")
  isPosUpdated = true;
});

socket.on("startGame", (data) => {
  // console.log(data, "geheheh");
  gamePlayers = data;
});

//end socket variable

var audio = new Audio(require("../sound/PUNCH.mp3"));
var scoreText;
var scorep1 = 0;
var scorep2 = 0;
var music;
var goalSound;
var bgm;
var char1;
var char2;
var rightGoal;
var leftGoal;
var ball1;
var ball2;
var ball3;
var finish = 3;
localStorage.removeItem("result");

const config = (socket) => {
  return {
    type: Phaser.AUTO,
    width: "100",
    height: "40",
    backgroundColor: "#cdcdcd",
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
        gravity: { y: 0 },
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
      extend: { data: { socket } },
    },
    socket: socket,
    audio: {
      disableWebAudio: false,
      context: audio.webkitMatchesSelector(true),
    },
  };
};

function preload() {
  this.load.setPath("assets/");
  this.load.image("player1", "./new/shipGreen_manned.png");
  this.load.image("player2", "./new/shipYellow_manned.png");
  this.load.image("ball", "./image/ball.png");
  this.load.image("particle", "./image/api.png");
  this.load.image("background", "./background/wallpaper.jpg");
  this.load.image("goal", "./image/blackhole.png");
  // this.load.image('hitarea', '../../image/hitround.png')
  this.load.audio("hit", ["./sound/PUNCH.ogg", "./sound/PUNCH.mp3"]);
  this.load.audio("goal", ["./sound/selected.ogg", "./sound/selected.mp3"]);
  this.load.audio("bgm", [
    "./sound/fightSoundtrack.ogg",
    "./sound/fightSoundtrack.mp3",
  ]);
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

  //SCORE
  scoreText = this.add.text(450, 25, `${scorep1}:${scorep2}`, {
    fontSize: "70px",
    fill: "#ffffff",
  });

  // MUSIC ASSIGN
  music = this.sound.add("hit", {
    volume: 0.09,
  });

  goalSound = this.sound.add("goal", {
    volume: 1,
  });

  bgm = this.sound.add("bgm", {
    volume: 0.5,
  });
  // ENDMUSIC ASSIGN
  let pX1
  if (!positionX1) {
    pX1 = 200
  }
  let pY1
  if (!positionY1) {
    pY1 = 200
  }
  let pX2
  if (!positionX2) {
    pX2 = 700
  }
  let pY2
  if (!positionY2) {
    pY2 = 200
  }
//   var positionX1 = 400;
//   var positionY1 = 450;
//   var positionX2 = 1550;
//   var positionY2 = 450;

  char1 = this.add.sprite(pX1, pY1, "player1");
  this.physics.add.existing(char1);
  char1.setScale(1, 1);
  char1.body.setCircle(60);
  char1.body.immovable = true;
  char1.setInteractive();

  char2 = this.add.sprite(pX2, pY2, "player2");
  this.physics.add.existing(char2);
  char2.setScale(1, 1);
  char2.body.setCircle(60);
  char2.body.immovable = true;
  char2.setInteractive();

  //GAWANG
  leftGoal = this.physics.add.image(100, 450, "goal").setScale(0.6, 0.6);
  leftGoal.body.setSize(100, 100);
  leftGoal.body.immovable = true;
  leftGoal.alpha = 0.9;
  rightGoal = this.physics.add.image(1800, 450, "goal").setScale(0.6, 0.6);
  rightGoal.body.setSize(100, 100);
  rightGoal.body.immovable = true;
  rightGoal.alpha = 0.9;
  //END GAWANG

  ball1 = this.physics.add.image(100, 100, "ball").setScale(0.3, 0.3);
  ball1.body.setCircle(110);
  ball1.enableBody = true;
  ball1.setVelocity(450, 50);
  ball1.setBounce(1.01, 1.01);
  ball1.setCollideWorldBounds(true);

  ball2 = this.physics.add.image(700, 600, "ball").setScale(0.3, 0.3);
  ball2.body.setCircle(110);
  ball2.enableBody = true;
  ball2.setVelocity(350, -450);
  ball2.setBounce(1.01, 1.01);
  ball2.setCollideWorldBounds(true);

  ball3 = this.physics.add.image(1200, 100, "ball").setScale(0.3, 0.3);
  ball3.body.setCircle(110);
  ball3.enableBody = true;
  ball3.setVelocity(-450, 50);
  ball3.setBounce(1.01, 1.01);
  ball3.setCollideWorldBounds(true);

  bgm.play();

  this.physics.add.collider(ball1, char1, () => {
    music.play();
  });
  this.physics.add.collider(ball2, char1, () => {
    music.play();
  });
  this.physics.add.collider(ball3, char1, () => {
    music.play();
  });
  this.physics.add.collider(ball1, char2, () => {
    music.play();
  });
  this.physics.add.collider(ball2, char2, () => {
    music.play();
  });
  this.physics.add.collider(ball3, char2, () => {
    music.play();
  });
  this.physics.add.collider(char1, char2, () => {
    music.play();
  });
  this.physics.add.collider(ball1, ball2, () => {
    music.play();
  });
  this.physics.add.collider(ball1, ball3, () => {
    music.play();
  });
  this.physics.add.collider(ball2, ball3, () => {
    music.play();
  });

  this.physics.add.collider(ball1, leftGoal, goalp2, () => {
    ball1.destroy();
    goalSound.play();
  });
  this.physics.add.collider(ball2, leftGoal, goalp2, () => {
    ball2.destroy();
    goalSound.play();
  });
  this.physics.add.collider(ball3, leftGoal, goalp2, () => {
    ball3.destroy();
    goalSound.play();
  });
  this.physics.add.collider(ball1, rightGoal, goalp1, () => {
    ball1.destroy();
    goalSound.play();
  });
  this.physics.add.collider(ball2, rightGoal, goalp1, () => {
    ball2.destroy();
    goalSound.play();
  });
  this.physics.add.collider(ball3, rightGoal, goalp1, () => {
    ball3.destroy();
    goalSound.play();
  });

  function goalp1() {
    scorep1 += 1;
    finish -= 1;
    let payload = {
      room: gamePlayers.room,
      score: scorep1,
      team: "teamOne",
    };
    socket.emit("score", payload);
    scoreText.text = `${scorep1}:${scorep2}`;
  }
  function goalp2() {
    scorep2 += 1;
    finish -= 1;
    let payload = {
      room: gamePlayers.room,
      score: scorep2,
      team: "teamTwo",
    };
    socket.emit("score", payload);
    scoreText.text = `${scorep1}:${scorep2}`;
  }
}

function update() {
  rightGoal.rotation += 0.005;
  leftGoal.rotation -= 0.005;
  ball1.rotation += 0.1;
  ball2.rotation += 0.1;
  ball3.rotation += 0.1;

  this.input.setDraggable(char1);
  this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;

    let cordinat = {
      x: dragX,
      y: dragY,
      username: localStorage.getItem("username"),
      room: gamePlayers.room,
      player: localStorage.getItem("username"),
    };

    socket.emit("moveBone", cordinat);

    // gameObject.x.update()
    // gameObject.y.update()
    // console.log(gameObject, 'ini game ee')
  });

  this.input.setDraggable(char2);
  this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;

    let cordinat = {
      x: dragX,
      y: dragY,
      username: localStorage.getItem("username"),
      room: gamePlayers.room,
      player: localStorage.getItem("username"),
    };

    socket.emit("moveBone", cordinat);

    // gameObject.x.update()
    // gameObject.y.update()
    // gameObject.update()
  });

  if (isPosUpdated) {
    char1.x = boneX1;
    char1.y = boneY1;

    char2.x = boneX2;
    char2.y = boneY2;
  }

  positionX1 = boneX1;
  positionY1 = boneY1;
  positionX2 = boneX2;
  positionY2 = boneY2;

  if (finish === 0) {
    console.log("selesai kampret");
    localStorage.setItem("result", "endgame");
    bgm.stop();
  }
}

export default config;
